import React from 'react';
import { Shield, Activity, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminHeader({ title, subtitle, onRefresh, loading }) {
  const { currentUser } = useAuth();

  return (
    <header style={{
      backgroundColor: 'var(--que-canvas-surface)',
      borderBottom: '1px solid var(--que-border)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      <div>
        <h1 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: 'var(--que-forest-base)',
          margin: 0,
          letterSpacing: '-0.01em'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '13px', color: 'var(--que-text-secondary)', margin: '4px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* System Health Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--que-success-bg)',
          color: 'var(--que-success)',
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '600',
          border: '1px solid #C8E6C9'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--que-success)',
            display: 'inline-block'
          }} />
          <span>System Healthy</span>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="que-btn que-btn-outline"
            style={{ height: '36px', padding: '0 12px', fontSize: '13px' }}
            title="Refresh Data"
          >
            <RefreshCw size={14} className={loading ? 'que-spin' : ''} />
            <span>Refresh</span>
          </button>
        )}

        {/* Role Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--que-forest-base)',
          color: '#FFF',
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          <Shield size={14} color="var(--que-olive-tint)" />
          <span>Verified Super Admin</span>
        </div>
      </div>
    </header>
  );
}
