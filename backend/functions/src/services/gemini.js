import { GoogleGenAI } from '@google/genai';
import { adminDb, FieldValue } from '../config/firebase.js';

let aiInstance = null;

function getAIClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in backend environment.');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

/**
 * Check if global or user-level Gemini budget has been reached
 */
async function checkBudgetLimits(userId) {
  const today = new Date().toISOString().split('T')[0];
  const statsDocRef = adminDb.collection('dashboardStats').doc(`daily_${today}`);
  const statsSnap = await statsDocRef.get();

  const dailyRequests = statsSnap.exists ? (statsSnap.data().totalAiRequests || 0) : 0;
  const maxDailyGlobal = 1500; // configurable threshold

  if (dailyRequests >= maxDailyGlobal) {
    return {
      allowed: false,
      reason: 'Global daily AI request quota reached. Please try again tomorrow.'
    };
  }

  // Check per-user daily threshold
  if (userId) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const userCallsToday = await adminDb.collection('aiUsage')
      .where('userId', '==', userId)
      .where('timestamp', '>=', startOfToday)
      .count()
      .get();

    if (userCallsToday.data().count >= 50) {
      return {
        allowed: false,
        reason: 'You have reached your daily personal AI request limit.'
      };
    }
  }

  return { allowed: true };
}

/**
 * Executes a Gemini 2.5 Flash prompt with budget check, latency tracking, retry & token logging
 */
export async function executeGeminiPrompt({
  userId,
  prompt,
  feature = 'general_assistance',
  systemInstruction = 'You are the intelligent business assistant for QUE Solutions (People • Process • Progress). Provide concise, accurate, executive-level insights.'
}) {
  const startTime = Date.now();
  const usageRef = adminDb.collection('aiUsage').doc();

  // 1. Budget enforcement check
  const budgetStatus = await checkBudgetLimits(userId);
  if (!budgetStatus.allowed) {
    const blockedRecord = {
      usageId: usageRef.id,
      userId: userId || 'anonymous',
      feature,
      model: 'gemini-2.5-flash',
      tokens: { promptTokens: 0, candidatesTokens: 0, totalTokens: 0 },
      estimatedCostUsd: 0,
      durationMs: Date.now() - startTime,
      status: 'BUDGET_EXCEEDED',
      errorMessage: budgetStatus.reason,
      timestamp: FieldValue.serverTimestamp()
    };
    await usageRef.set(blockedRecord);
    return {
      success: false,
      error: budgetStatus.reason,
      budgetExceeded: true
    };
  }

  // 2. Call Gemini with retry logic for transient errors
  const ai = getAIClient();
  let attempts = 0;
  const maxAttempts = 2;
  let responseText = '';
  let tokenCount = { promptTokens: 0, candidatesTokens: 0, totalTokens: 0 };
  let errorMsg = null;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      responseText = response.text || '';
      
      // Calculate token estimates (using usageMetadata if returned, or character approximation)
      if (response.usageMetadata) {
        tokenCount = {
          promptTokens: response.usageMetadata.promptTokenCount || 0,
          candidatesTokens: response.usageMetadata.candidatesTokenCount || 0,
          totalTokens: response.usageMetadata.totalTokenCount || 0
        };
      } else {
        const estPrompt = Math.ceil(prompt.length / 4);
        const estCandidate = Math.ceil(responseText.length / 4);
        tokenCount = {
          promptTokens: estPrompt,
          candidatesTokens: estCandidate,
          totalTokens: estPrompt + estCandidate
        };
      }
      errorMsg = null;
      break; // Success!
    } catch (err) {
      errorMsg = err.message || 'Gemini API call failed';
      console.warn(`[Gemini Service] Attempt ${attempts} failed:`, errorMsg);
      if (attempts < maxAttempts) {
        await new Promise((res) => setTimeout(res, 1000)); // wait 1s before retry
      }
    }
  }

  const durationMs = Date.now() - startTime;
  // Estimated cost based on Gemini 2.5 Flash pricing ($0.075/1M input, $0.30/1M output)
  const estimatedCostUsd = (
    (tokenCount.promptTokens * 0.000075 / 1000) + 
    (tokenCount.candidatesTokens * 0.00030 / 1000)
  );

  // 3. Log usage to Firestore /aiUsage
  const isSuccess = !errorMsg;
  const usageRecord = {
    usageId: usageRef.id,
    userId: userId || 'anonymous',
    feature,
    model: 'gemini-2.5-flash',
    tokens: tokenCount,
    estimatedCostUsd: Number(estimatedCostUsd.toFixed(6)),
    durationMs,
    status: isSuccess ? 'SUCCESS' : 'ERROR',
    errorMessage: errorMsg,
    timestamp: FieldValue.serverTimestamp()
  };

  await usageRef.set(usageRecord);

  // 4. Update daily aggregate stats
  const today = new Date().toISOString().split('T')[0];
  const dailyDocRef = adminDb.collection('dashboardStats').doc(`daily_${today}`);
  await dailyDocRef.set({
    date: today,
    totalAiRequests: FieldValue.increment(1),
    totalTokensUsed: FieldValue.increment(tokenCount.totalTokens),
    totalAiCostUsd: FieldValue.increment(estimatedCostUsd),
    lastCalculatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  if (!isSuccess) {
    return {
      success: false,
      error: `Gemini processing failed: ${errorMsg}`
    };
  }

  return {
    success: true,
    data: responseText,
    tokens: tokenCount,
    durationMs
  };
}
