import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout() {
  const { currentUser, isSuperAdmin, loading, logout } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--que-canvas-base)',
        gap: '16px'
      }}>
        <img src="/que_logo.png" alt="Loading" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
        <div style={{ fontSize: '15px', color: 'var(--que-text-secondary)', fontWeight: '500' }}>
          Verifying Super Admin Authorization...
        </div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!currentUser) {
    return <Navigate to="/que" replace />;
  }

  // Logged in, but unauthorized (not Super Admin)
  if (!isSuperAdmin) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--que-canvas-base)',
        padding: '20px'
      }}>
        <div className="que-card" style={{ maxWidth: '440px', textAlign: 'center', padding: '36px 24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--que-error-bg)',
            color: 'var(--que-error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <ShieldAlert size={28} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--que-forest-base)', margin: '0 0 8px 0' }}>
            Access Denied
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--que-text-secondary)', lineHeight: '20px', margin: '0 0 24px 0' }}>
            The account <strong>{currentUser.email}</strong> does not possess verified Super Admin privileges to access this console.
          </p>
          <button
            onClick={() => logout()}
            className="que-btn que-btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <LogOut size={16} />
            <span>Sign Out & Return</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
