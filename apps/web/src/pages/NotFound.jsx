import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: '800', color: 'var(--que-forest-base)', margin: '0 0 12px 0' }}>
        404
      </h1>
      <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--que-text-primary)', margin: '0 0 12px 0' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--que-text-secondary)', maxWidth: '400px', margin: '0 0 24px 0' }}>
        The requested page does not exist or has been moved.
      </p>
      <Link to="/" className="que-btn que-btn-forest">
        <ArrowLeft size={16} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
