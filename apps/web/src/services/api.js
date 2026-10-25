import { auth, db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/ai-news-bf2ce/us-central1/api';

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error('User is not authenticated');
  const token = await user.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export const AdminAPI = {
  /**
   * Get overview stats (total users, active, AI calls)
   */
  async getOverviewStats() {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}/api/admin/overview`, { headers });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('[AdminAPI] Cloud Function overview endpoint unavailable, reading direct Firestore...');
    }

    // Direct Firestore fallback
    const usersSnap = await getDocs(collection(db, 'users'));
    let active = 0;
    let disabled = 0;
    usersSnap.forEach(d => {
      const data = d.data();
      if (data.status === 'active') active++;
      else if (data.status === 'disabled') disabled++;
    });

    const aiSnap = await getDocs(collection(db, 'aiUsage'));

    return {
      totalUsers: usersSnap.size,
      activeUsers: active,
      disabledUsers: disabled,
      totalAiRequests: aiSnap.size,
      dailyAiRequestsToday: 0,
      dailyTokensUsedToday: 0,
      dailyEstimatedCostToday: 0,
      systemStatus: 'healthy',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * List users
   */
  async getUsers(params = {}) {
    try {
      const headers = await getAuthHeaders();
      const queryParams = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/api/admin/users?${queryParams}`, { headers });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('[AdminAPI] Cloud Function users endpoint unavailable, reading direct Firestore...');
    }

    // Direct Firestore fallback
    const q = query(collection(db, 'users'), firestoreLimit(50));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  },

  /**
   * Update user status (active, disabled)
   */
  async updateUserStatus(userId, status) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}/api/admin/users/${userId}/status`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('[AdminAPI] Updating via direct Firestore fallback...');
    }

    // Direct Firestore update fallback
    await updateDoc(doc(db, 'users', userId), { status });
    return { success: true };
  },

  /**
   * Assign role
   */
  async updateUserRole(userId, role) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}/role`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ role })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update role');
    }
    return await res.json();
  },

  /**
   * Delete user
   */
  async deleteUser(userId) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete user');
    }
    return await res.json();
  }
};
