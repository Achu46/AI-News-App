import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult
} from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        try {
          // 1. Check custom claims
          const tokenResult = await getIdTokenResult(user, true);
          const hasSuperAdminClaim = tokenResult.claims.role === 'superadmin' || tokenResult.claims.isSuperAdmin === true;
          const isSuperAdminEmail = user.email === 'que.solutions.service@gmail.com';
          
          setIsSuperAdmin(hasSuperAdminClaim || isSuperAdminEmail);

          // 2. Fetch or subscribe to user doc in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            // Default fallback if profile is initializing
            setUserProfile({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'Administrator',
              role: (hasSuperAdminClaim || isSuperAdminEmail) ? 'superadmin' : 'user',
              status: 'active'
            });
          }
        } catch (err) {
          console.error('[AuthContext] Error retrieving user profile/claims:', err);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setIsSuperAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userProfile,
    isSuperAdmin,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
