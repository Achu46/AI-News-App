import { Router } from 'express';
import { adminAuth, adminDb, FieldValue } from '../config/firebase.js';
import { requireAdmin, requireSuperAdmin } from '../middleware/auth.js';
import { logAuditEvent } from '../services/auditLogger.js';

export const adminRouter = Router();

// Apply requireAdmin to all routes in this router
adminRouter.use(requireAdmin);

/**
 * GET /api/admin/overview
 * Real-time summary statistics for Super Admin dashboard
 */
adminRouter.get('/overview', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const dailySnap = await adminDb.collection('dashboardStats').doc(`daily_${today}`).get();
    const dailyData = dailySnap.exists ? dailySnap.data() : {};

    // Get live user counts
    const totalUsersSnap = await adminDb.collection('users').count().get();
    const activeUsersSnap = await adminDb.collection('users').where('status', '==', 'active').count().get();
    const disabledUsersSnap = await adminDb.collection('users').where('status', '==', 'disabled').count().get();

    // Total AI calls
    const totalAiSnap = await adminDb.collection('aiUsage').count().get();

    return res.json({
      success: true,
      data: {
        totalUsers: totalUsersSnap.data().count,
        activeUsers: activeUsersSnap.data().count,
        disabledUsers: disabledUsersSnap.data().count,
        totalAiRequests: totalAiSnap.data().count,
        dailyAiRequestsToday: dailyData.totalAiRequests || 0,
        dailyTokensUsedToday: dailyData.totalTokensUsed || 0,
        dailyEstimatedCostToday: dailyData.totalAiCostUsd || 0,
        systemStatus: 'healthy',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[Admin API] Error fetching overview:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/admin/users
 * Paginated and searchable users list
 */
adminRouter.get('/users', async (req, res) => {
  try {
    const { limit = 20, role, status, search } = req.query;
    let query = adminDb.collection('users').orderBy('metadata.createdAt', 'desc');

    if (role) {
      query = query.where('role', '==', role);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.limit(parseInt(limit, 10)).get();
    let users = snapshot.docs.map(doc => doc.data());

    if (search) {
      const term = search.toLowerCase();
      users = users.filter(u => 
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.displayName && u.displayName.toLowerCase().includes(term)) ||
        (u.uid && u.uid.toLowerCase().includes(term))
      );
    }

    return res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('[Admin API] Error fetching users:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/admin/users/:userId/status
 * Enable or disable a user account in both Auth and Firestore
 */
adminRouter.post('/users/:userId/status', async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // 'active' or 'disabled'

    if (!['active', 'disabled', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    // Prevent disabling oneself
    if (userId === req.user.uid) {
      return res.status(400).json({ success: false, error: 'Cannot modify your own account status' });
    }

    // 1. Update Firebase Auth user disabled state
    await adminAuth.updateUser(userId, { disabled: status === 'disabled' });

    // 2. Update Firestore profile
    await adminDb.collection('users').doc(userId).set({
      status,
      'metadata.updatedAt': FieldValue.serverTimestamp()
    }, { merge: true });

    // 3. Log to Audit Logs
    await logAuditEvent({
      actorId: req.user.uid,
      actorEmail: req.user.email,
      action: 'USER_STATUS_CHANGE',
      targetResource: `users/${userId}`,
      details: { newStatus: status }
    });

    return res.json({ success: true, message: `User status updated to ${status}` });
  } catch (error) {
    console.error('[Admin API] Error updating status:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/admin/users/:userId/role
 * Assign user role (Super Admin only can assign admin/superadmin roles)
 */
adminRouter.post('/users/:userId/role', requireSuperAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body; // 'user', 'staff', 'admin', 'superadmin'

    if (!['user', 'staff', 'admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role' });
    }

    // 1. Set Custom Claims in Firebase Auth
    await adminAuth.setCustomUserClaims(userId, {
      role,
      isSuperAdmin: role === 'superadmin'
    });

    // 2. Update Firestore
    await adminDb.collection('users').doc(userId).set({
      role,
      'metadata.updatedAt': FieldValue.serverTimestamp()
    }, { merge: true });

    // 3. Log Audit Event
    await logAuditEvent({
      actorId: req.user.uid,
      actorEmail: req.user.email,
      action: 'USER_ROLE_CHANGE',
      targetResource: `users/${userId}`,
      details: { assignedRole: role }
    });

    return res.json({ success: true, message: `Role changed to ${role}` });
  } catch (error) {
    console.error('[Admin API] Error updating role:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/admin/users/:userId
 * Permanently delete user from Auth and Firestore (Super Admin only)
 */
adminRouter.delete('/users/:userId', requireSuperAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.uid) {
      return res.status(400).json({ success: false, error: 'Cannot delete your own Super Admin account' });
    }

    // 1. Delete from Firebase Auth
    await adminAuth.deleteUser(userId);

    // 2. Delete from Firestore users collection
    await adminDb.collection('users').doc(userId).delete();

    // 3. Write immutable audit log
    await logAuditEvent({
      actorId: req.user.uid,
      actorEmail: req.user.email,
      action: 'USER_DELETED',
      targetResource: `users/${userId}`,
      details: { deletedAt: new Date().toISOString() }
    });

    return res.json({ success: true, message: 'User account successfully deleted' });
  } catch (error) {
    console.error('[Admin API] Error deleting user:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
