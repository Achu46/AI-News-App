import { adminDb, FieldValue } from '../config/firebase.js';

/**
 * Appends an immutable audit log document to Firestore /auditLogs
 */
export async function logAuditEvent({
  actorId = 'system',
  actorEmail = 'system',
  action,
  targetResource,
  details = {},
  outcome = 'SUCCESS',
  correlationId = null
}) {
  try {
    const logRef = adminDb.collection('auditLogs').doc();
    const event = {
      logId: logRef.id,
      actorId,
      actorEmail,
      action,
      targetResource,
      details,
      outcome,
      correlationId: correlationId || `corr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: FieldValue.serverTimestamp()
    };

    await logRef.set(event);
    return event;
  } catch (error) {
    console.error('[Audit Logger] Failed to write audit event:', error.message);
    // Don't crash caller if logging fails, but log error
    return null;
  }
}
