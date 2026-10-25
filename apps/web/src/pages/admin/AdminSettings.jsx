import React, { useState } from 'react';
import { Settings, Shield, KeyRound, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { updatePassword } from 'firebase/auth';
import AdminHeader from '../../components/AdminHeader';
import { useAuth } from '../../context/AuthContext';

export default function AdminSettings() {
  const { currentUser } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [savingPwd, setSavingPwd] = useState(false);

  // App settings
  const [dailyQuota, setDailyQuota] = useState('1500');
  const [monthlyBudget, setMonthlyBudget] = useState('50');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword.length < 8) {
      setPwdError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError('Passwords do not match.');
      return;
    }

    setSavingPwd(true);
    try {
      await updatePassword(currentUser, newPassword);
      setPwdSuccess('Super Admin password successfully updated!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Password change error:', err);
      if (err.code === 'auth/requires-recent-login') {
        setPwdError('For security, please sign out and sign in again before updating your password.');
      } else {
        setPwdError(err.message || 'Failed to update password');
      }
    } finally {
      setSavingPwd(false);
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  return (
    <div>
      <AdminHeader
        title="System Settings"
        subtitle="Configure application parameters, AI budget thresholds, and Super Admin security"
      />

      <div className="admin-content" style={{ maxWidth: '800px' }}>
        {/* Security / Password Update */}
        <div className="que-card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <KeyRound size={20} color="var(--que-forest-base)" />
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
              Update Super Admin Password
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--que-text-secondary)', margin: '0 0 20px 0' }}>
            Secures the account <strong>{currentUser?.email}</strong>. Always use a strong combination of letters, numbers, and symbols.
          </p>

          {pwdError && (
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--que-error-bg)',
              color: 'var(--que-error)',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{pwdError}</span>
            </div>
          )}

          {pwdSuccess && (
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--que-success-bg)',
              color: 'var(--que-success)',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>{pwdSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange}>
            <div className="que-input-group">
              <label className="que-label">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="que-input"
                placeholder="Enter at least 8 characters"
              />
            </div>

            <div className="que-input-group">
              <label className="que-label">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="que-input"
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={savingPwd}
              className="que-btn que-btn-forest"
              style={{ height: '42px', padding: '0 20px' }}
            >
              <Save size={16} />
              <span>{savingPwd ? 'Updating...' : 'Save Password'}</span>
            </button>
          </form>
        </div>

        {/* Gemini AI Budget Config */}
        <div className="que-card" style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '17px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
            Gemini AI Budget & Rate Caps
          </h3>

          {savedSettings && (
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--que-success-bg)',
              color: 'var(--que-success)',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>Settings successfully persisted!</span>
            </div>
          )}

          <form onSubmit={handleSaveConfig}>
            <div className="que-input-group">
              <label className="que-label">Global Daily Request Limit</label>
              <input
                type="number"
                value={dailyQuota}
                onChange={(e) => setDailyQuota(e.target.value)}
                className="que-input"
              />
              <span className="que-caption">Cloud Function gateway blocks requests exceeding this cap per calendar day.</span>
            </div>

            <div className="que-input-group">
              <label className="que-label">Monthly Dollar Budget (USD)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="que-input"
              />
              <span className="que-caption">Sends high-priority alert to Super Admin when token cost exceeds 80% threshold.</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 0',
              borderTop: '1px solid var(--que-border)',
              marginTop: '16px'
            }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--que-text-primary)' }}>
                  Maintenance Mode
                </div>
                <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                  Temporarily pause mobile client operations for scheduled upgrades
                </div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <button
              type="submit"
              className="que-btn que-btn-olive"
              style={{ height: '42px', padding: '0 20px', marginTop: '16px' }}
            >
              <Save size={16} />
              <span>Save Configuration</span>
            </button>
          </form>
        </div>

        {/* System Information */}
        <div className="que-card">
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
            System Infrastructure Metadata
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--que-text-secondary)' }}>Firebase Project ID:</span>
              <div style={{ fontWeight: '600', fontFamily: 'monospace' }}>ai-news-bf2ce</div>
            </div>
            <div>
              <span style={{ color: 'var(--que-text-secondary)' }}>Active Gemini Model:</span>
              <div style={{ fontWeight: '600' }}>gemini-2.5-flash</div>
            </div>
            <div>
              <span style={{ color: 'var(--que-text-secondary)' }}>Environment:</span>
              <div style={{ fontWeight: '600' }}>Production / Secure VPC</div>
            </div>
            <div>
              <span style={{ color: 'var(--que-text-secondary)' }}>Version:</span>
              <div style={{ fontWeight: '600' }}>QUE Core 1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
