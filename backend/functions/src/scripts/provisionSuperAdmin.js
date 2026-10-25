/**
 * QUE Solutions — Super Admin Provisioning Script
 * Reads credentials strictly from backend/functions/.env
 * Creates or updates the user in Firebase Auth with custom claims: { role: 'superadmin', isSuperAdmin: true }
 * Creates or updates the user document in Cloud Firestore /users/{uid}
 * Writes an initial audit log entry
 */

import dotenv from 'dotenv';
import { adminAuth, adminDb, FieldValue } from '../config/firebase.js';

dotenv.config();

const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'que.solutions.service@gmail.com';
const INITIAL_PASSWORD = process.env.SUPERADMIN_INITIAL_PASSWORD;

if (!INITIAL_PASSWORD) {
  console.error('[Error] SUPERADMIN_INITIAL_PASSWORD must be defined in your .env file before provisioning.');
  process.exit(1);
}

async function provisionSuperAdmin() {
  console.log(`\n======================================================`);
  console.log(`[QUE Solutions] Provisioning Super Admin Account`);
  console.log(`Target Email: ${SUPERADMIN_EMAIL}`);
  console.log(`======================================================\n`);

  try {
    let userRecord;

    // 1. Check if user already exists in Firebase Auth
    try {
      userRecord = await adminAuth.getUserByEmail(SUPERADMIN_EMAIL);
      console.log(`[Auth] Existing Firebase Auth account found (UID: ${userRecord.uid}). Updating credentials & claims...`);
      
      // Update password and display name
      userRecord = await adminAuth.updateUser(userRecord.uid, {
        password: INITIAL_PASSWORD,
        displayName: 'QUE Super Admin',
        emailVerified: true
      });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.log(`[Auth] User does not exist. Creating new Firebase Auth account...`);
        userRecord = await adminAuth.createUser({
          email: SUPERADMIN_EMAIL,
          password: INITIAL_PASSWORD,
          displayName: 'QUE Super Admin',
          emailVerified: true
        });
        console.log(`[Auth] Successfully created user with UID: ${userRecord.uid}`);
      } else {
        throw err;
      }
    }

    // 2. Set Super Admin Custom Claims (Cryptographically verified in ID tokens)
    console.log(`[Claims] Setting custom claims: { role: 'superadmin', isSuperAdmin: true }...`);
    await adminAuth.setCustomUserClaims(userRecord.uid, {
      role: 'superadmin',
      isSuperAdmin: true,
      assignedAt: new Date().toISOString()
    });

    // 3. Create or update profile in Firestore /users/{uid}
    console.log(`[Firestore] Syncing profile document in /users/${userRecord.uid}...`);
    const userDocRef = adminDb.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      uid: userRecord.uid,
      email: SUPERADMIN_EMAIL,
      displayName: 'QUE Super Admin',
      role: 'superadmin',
      status: 'active',
      emailVerified: true,
      mustChangePassword: true, // Flag requiring password update after initial login
      preferences: {
        theme: 'dark',
        pushNotifications: true,
        emailAlerts: true
      },
      metadata: {
        createdAt: FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp(),
        lastActivePlatform: 'web',
        provisionedVia: 'cli-script'
      }
    }, { merge: true });

    // 4. Write Audit Log
    const auditRef = adminDb.collection('auditLogs').doc();
    await auditRef.set({
      logId: auditRef.id,
      actorId: 'system_provisioning_script',
      actorEmail: SUPERADMIN_EMAIL,
      action: 'SUPERADMIN_INITIAL_PROVISION',
      targetResource: `users/${userRecord.uid}`,
      details: {
        email: SUPERADMIN_EMAIL,
        role: 'superadmin',
        mustChangePassword: true
      },
      outcome: 'SUCCESS',
      correlationId: `init_${Date.now()}`,
      timestamp: FieldValue.serverTimestamp()
    });

    console.log(`\n======================================================`);
    console.log(` Super Admin account is READY!`);
    console.log(` Email: ${SUPERADMIN_EMAIL}`);
    console.log(` Role: superadmin`);
    console.log(` Must change password on first login: true`);
    console.log(`======================================================\n`);
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ [Provisioning Failed]:`, error);
    process.exit(1);
  }
}

provisionSuperAdmin();
