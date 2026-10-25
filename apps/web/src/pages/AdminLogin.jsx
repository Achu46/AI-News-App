import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('que.solutions.service@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, currentUser, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  // If already authenticated as Super Admin, redirect to dashboard
  useEffect(() => {
    if (currentUser && isSuperAdmin) {
      navigate('/que/dashboard', { replace: true });
    }
  }, [currentUser, isSuperAdmin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      // AuthContext listener will update isSuperAdmin and navigate
      navigate('/que/dashboard');
    } catch (err) {
      console.error('Super Admin Login Error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Invalid credentials. Please verify your email and password.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found for this email.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Access temporarily restricted. Try again later.');
      } else {
        setError(err.message || 'Authentication failed. Please verify your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--que-forest-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Return to public site link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          color: '#A4B3A6',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <ArrowLeft size={16} />
        <span>Return to Website</span>
      </Link>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--que-canvas-surface)',
        borderRadius: '16px',
        boxShadow: 'var(--que-shadow-modal)',
        border: '1px solid var(--que-border)',
        padding: '40px 32px',
        boxSizing: 'border-box'
      }}>
        {/* Emblem & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/que_logo.png"
            alt="QUE Solutions"
            style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '12px', display: 'inline-block' }}
          />
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--que-forest-base)',
            margin: '0 0 4px 0',
            letterSpacing: '-0.01em'
          }}>
            Super Admin Console
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--que-text-secondary)', margin: 0 }}>
            Restricted access portal for QUE Solutions executives
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            backgroundColor: 'var(--que-error-bg)',
            border: '1px solid #FFCDD2',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            color: 'var(--que-error)',
            fontSize: '13px'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="que-input-group">
            <label className="que-label">Administrator Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="que-input"
                style={{ paddingLeft: '40px' }}
                placeholder="que.solutions.service@gmail.com"
              />
              <Mail size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--que-text-muted)'
              }} />
            </div>
          </div>

          {/* Password input */}
          <div className="que-input-group" style={{ marginBottom: '24px' }}>
            <label className="que-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="que-input"
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
                placeholder="Enter password"
              />
              <Lock size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--que-text-muted)'
              }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--que-text-muted)'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="que-btn que-btn-forest"
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
          >
            <Shield size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In as Super Admin'}</span>
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--que-border)',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--que-text-secondary)'
        }}>
          Protected by Firebase Enterprise Auth & Cloud Functions RBAC
        </div>
      </div>
    </div>
  );
}
