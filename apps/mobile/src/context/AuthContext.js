import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY } from '../config/env';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = '@que_mobile_user';
const STORAGE_KEY_ONBOARDING = '@que_onboarding_completed';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPersistedState();
  }, []);

  const loadPersistedState = async () => {
    try {
      const [onboardingVal, userVal] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_ONBOARDING),
        AsyncStorage.getItem(STORAGE_KEY_USER)
      ]);

      if (onboardingVal === 'true') {
        setHasCompletedOnboarding(true);
      }
      if (userVal) {
        setUser(JSON.parse(userVal));
      }
    } catch (e) {
      console.warn('Error reading persisted auth state:', e);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_ONBOARDING, 'true');
      setHasCompletedOnboarding(true);
    } catch (e) {
      console.warn('Failed to save onboarding state:', e);
    }
  };

  const login = async (email, password) => {
    // Authenticate via Firebase Identity Platform REST API (Guarantees zero native-link crash)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password,
        returnSecureToken: true
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const errCode = data.error?.message || 'Login failed';
      if (errCode.includes('INVALID_LOGIN_CREDENTIALS') || errCode.includes('EMAIL_NOT_FOUND') || errCode.includes('INVALID_PASSWORD')) {
        throw new Error('Invalid email or password.');
      } else if (errCode.includes('USER_DISABLED')) {
        throw new Error('This account has been disabled. Please contact QUE Solutions support.');
      } else {
        throw new Error(errCode);
      }
    }

    const userData = {
      uid: data.localId,
      email: data.email,
      displayName: data.displayName || email.split('@')[0],
      idToken: data.idToken,
      refreshToken: data.refreshToken
    };

    await AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password,
        returnSecureToken: true
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const errCode = data.error?.message || 'Registration failed';
      if (errCode.includes('EMAIL_EXISTS')) {
        throw new Error('An account already exists with this email address.');
      } else if (errCode.includes('WEAK_PASSWORD')) {
        throw new Error('Password should be at least 6 characters.');
      } else {
        throw new Error(errCode);
      }
    }

    // Set display name
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: data.idToken,
        displayName: name,
        returnSecureToken: true
      })
    });

    const userData = {
      uid: data.localId,
      email: data.email,
      displayName: name,
      idToken: data.idToken,
      refreshToken: data.refreshToken
    };

    await AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const forgotPassword = async (email) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: email.trim()
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error?.message || 'Failed to send password reset email.');
    }
    return true;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_USER);
      setUser(null);
    } catch (e) {
      console.warn('Logout error:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        hasCompletedOnboarding,
        loading,
        login,
        register,
        forgotPassword,
        logout,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
