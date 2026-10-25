import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, alert }) {
  return (
    <div className="que-card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--que-text-secondary)'
          }}>
            {title}
          </span>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--que-forest-base)',
            marginTop: '4px',
            letterSpacing: '-0.02em'
          }}>
            {value}
          </div>
        </div>

        {Icon && (
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: alert ? 'var(--que-error-bg)' : 'var(--que-olive-tint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: alert ? 'var(--que-error)' : 'var(--que-olive-base)'
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
        {subtitle && (
          <span style={{ color: 'var(--que-text-secondary)' }}>
            {subtitle}
          </span>
        )}
        {trend && (
          <span style={{
            fontWeight: '600',
            color: trend.isPositive ? 'var(--que-success)' : 'var(--que-error)',
            backgroundColor: trend.isPositive ? 'var(--que-success-bg)' : 'var(--que-error-bg)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px'
          }}>
            {trend.text}
          </span>
        )}
      </div>
    </div>
  );
}
