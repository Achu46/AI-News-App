import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  FileText, 
  Activity, 
  Settings, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of Super Admin?')) {
      await logout();
      navigate('/que');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/que/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/que/users', icon: Users },
    { name: 'Gemini AI Monitoring', path: '/que/ai-usage', icon: Sparkles },
    { name: 'Security Audit Logs', path: '/que/audit-logs', icon: FileText },
    { name: 'Daily Activities', path: '/que/activities', icon: Activity },
    { name: 'System Settings', path: '/que/settings', icon: Settings },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Branding Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img
          src="/que_logo.png"
          alt="QUE Solutions"
          style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF' }}
        />
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.01em', color: '#FFF' }}>
            QUE Solutions
          </div>
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            backgroundColor: 'var(--que-olive-base)',
            color: '#FFF',
            padding: '2px 6px',
            borderRadius: '4px',
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginTop: '2px'
          }}>
            Super Admin
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                color: isActive ? '#FFFFFF' : '#A4B3A6',
                backgroundColor: isActive ? 'var(--que-olive-base)' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease, color 0.15s ease'
              })}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Footer Actions */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#8E9E90',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          Logged in as:<br />
          <strong style={{ color: '#E0E8E1' }}>{currentUser?.email}</strong>
        </div>

        <NavLink
          to="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#A4B3A6',
            textDecoration: 'none',
            padding: '8px',
            borderRadius: '6px'
          }}
        >
          <ExternalLink size={15} />
          <span>View Public Site</span>
        </NavLink>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#FF8A80',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
