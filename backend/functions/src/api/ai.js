import { Router } from 'express';
import { executeGeminiPrompt } from '../services/gemini.js';

export const aiRouter = Router();

/**
 * POST /api/ai/generate
 * Authenticated user calls Gemini AI with budget enforcement & usage logging
 */
aiRouter.post('/generate', async (req, res) => {
  try {
    const { prompt, feature = 'business_assistant' } = req.body;
    const userId = req.user?.uid || 'anonymous';

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    if (prompt.length > 4000) {
      return res.status(400).json({ success: false, error: 'Prompt exceeds 4000 character limit' });
    }

    const result = await executeGeminiPrompt({
      userId,
      prompt: prompt.trim(),
      feature
    });

    if (!result.success) {
      const statusCode = result.budgetExceeded ? 429 : 500;
      return res.status(statusCode).json(result);
    }

    return res.json({
      success: true,
      data: result.data,
      tokens: result.tokens,
      latencyMs: result.durationMs
    });
  } catch (error) {
    console.error('[AI Router] Error processing generation:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
