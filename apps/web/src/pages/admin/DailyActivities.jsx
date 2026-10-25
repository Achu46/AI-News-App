import React, { useState, useEffect } from 'react';
import { Activity, Clock, Smartphone, Globe, User } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import AdminHeader from '../../components/AdminHeader';
import { db } from '../../firebase/config';

export default function DailyActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'userActivities'), orderBy('timestamp', 'desc'), firestoreLimit(50));
      const snap = await getDocs(q);
      setActivities(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.warn('Could not read userActivities:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <div>
      <AdminHeader
        title="Daily Activities Telemetry"
        subtitle="Real-time timeline of user sessions, platform usage, and client interactions"
        onRefresh={loadActivities}
        loading={loading}
      />

      <div className="admin-content">
        <div className="que-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Activity size={20} color="var(--que-olive-base)" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
              Activity Event Stream
            </h3>
          </div>

          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--que-text-secondary)' }}>
              Loading user stream...
            </div>
          ) : activities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--que-forest-base)', marginBottom: '4px' }}>
                No activity events logged yet
              </div>
              <div style={{ fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                User actions from the React Native mobile app and Web client will appear here automatically.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--que-canvas-subtle)',
                    border: '1px solid var(--que-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--que-canvas-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--que-forest-base)',
                      border: '1px solid var(--que-border)'
                    }}>
                      {act.platform === 'android' || act.platform === 'ios' ? <Smartphone size={18} /> : <Globe size={18} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--que-text-primary)' }}>
                        {act.eventType}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                        User ID: {act.userId} | Platform: {act.platform}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--que-text-muted)' }}>
                    <Clock size={14} />
                    <span>
                      {act.timestamp ? new Date(act.timestamp.seconds ? act.timestamp.seconds * 1000 : act.timestamp).toLocaleTimeString() : 'Recent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
