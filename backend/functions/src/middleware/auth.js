import { adminAuth } from '../config/firebase.js';

/**
 * Middleware to authenticate Firebase ID Token
 */
export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Missing or invalid Authorization header'
      });
    }

    const idToken = authHeader.split('Bearer ')[1].trim();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('[Auth Middleware] Verification failed:', error.message);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Token verification failed',
      details: error.message
    });
  }
}

/**
 * Middleware to require Super Admin role
 */
export function requireSuperAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No active user session' });
  }

  const isSuperAdminEmail = req.user.email === (process.env.SUPERADMIN_EMAIL || 'que.solutions.service@gmail.com');
  const hasSuperAdminRole = req.user.role === 'superadmin' || req.user.isSuperAdmin === true;

  if (isSuperAdminEmail || hasSuperAdminRole) {
    return next();
  }

  return res.status(403).json({
    success: false,
    error: 'Forbidden: Super Admin privileges required for this operation'
  });
}

/**
 * Middleware to require Admin or Super Admin role
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No active user session' });
  }

  const isSuperAdminEmail = req.user.email === (process.env.SUPERADMIN_EMAIL || 'que.solutions.service@gmail.com');
  const isAdminRole = req.user.role === 'admin' || req.user.role === 'superadmin';

  if (isSuperAdminEmail || isAdminRole) {
    return next();
  }

  return res.status(403).json({
    success: false,
    error: 'Forbidden: Administrator privileges required'
  });
}
