import React, { useState, useEffect } from 'react';
import { FileText, Search, Shield, Eye } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import AdminHeader from '../../components/AdminHeader';
import Modal from '../../components/Modal';
import { db } from '../../firebase/config';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'auditLogs'), orderBy('timestamp', 'desc'), firestoreLimit(50));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.warn('Could not read audit logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (log.action && log.action.toLowerCase().includes(term)) ||
      (log.actorEmail && log.actorEmail.toLowerCase().includes(term)) ||
      (log.targetResource && log.targetResource.toLowerCase().includes(term)) ||
      (log.correlationId && log.correlationId.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <AdminHeader
        title="Security Audit Logs"
        subtitle="Append-only, immutable record of all administrative actions and security modifications"
        onRefresh={loadAuditLogs}
        loading={loading}
      />

      <div className="admin-content">
        {/* Search */}
        <div className="que-card" style={{ marginBottom: '24px', padding: '16px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by action, actor email, target resource, or correlation ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="que-input"
              style={{ paddingLeft: '38px', height: '40px' }}
            />
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--que-text-muted)'
            }} />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="que-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--que-canvas-subtle)', borderBottom: '1px solid var(--que-border)' }}>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>Action</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>Actor</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>Target</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>Outcome</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>Timestamp</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase', textAlign: 'right' }}>Inspect</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--que-text-secondary)' }}>
                      Loading audit events...
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--que-forest-base)', marginBottom: '4px' }}>
                        No audit events found
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                        All administrative operations are automatically logged when executed.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--que-border)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--que-forest-base)' }}>
                          {log.action}
                        </span>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--que-text-muted)' }}>
                          {log.correlationId}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                        <div>{log.actorEmail || 'System'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--que-text-muted)' }}>{log.actorId}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'monospace' }}>
                        {log.targetResource}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className={`que-badge ${log.outcome === 'SUCCESS' ? 'que-badge-active' : 'que-badge-disabled'}`}>
                          {log.outcome}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                        {log.timestamp ? new Date(log.timestamp.seconds ? log.timestamp.seconds * 1000 : log.timestamp).toLocaleString() : 'Recent'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="que-btn que-btn-outline"
                          style={{ height: '32px', width: '32px', padding: 0 }}
                          title="Inspect Event Details"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Audit Log Detail Modal */}
      <Modal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="Audit Log Event Inspection"
        footer={(
          <button onClick={() => setSelectedLog(null)} className="que-btn que-btn-outline">
            Close
          </button>
        )}
      >
        {selectedLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div>
              <strong style={{ color: 'var(--que-text-secondary)' }}>Event Action:</strong>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--que-forest-base)' }}>{selectedLog.action}</div>
            </div>
            <div>
              <strong style={{ color: 'var(--que-text-secondary)' }}>Actor Email:</strong>
              <div>{selectedLog.actorEmail} ({selectedLog.actorId})</div>
            </div>
            <div>
              <strong style={{ color: 'var(--que-text-secondary)' }}>Correlation ID:</strong>
              <div style={{ fontFamily: 'monospace' }}>{selectedLog.correlationId}</div>
            </div>
            <div>
              <strong style={{ color: 'var(--que-text-secondary)' }}>Event Payload / Details:</strong>
              <pre style={{
                backgroundColor: 'var(--que-canvas-subtle)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                overflowX: 'auto',
                margin: '6px 0 0 0'
              }}>
                {JSON.stringify(selectedLog.details || {}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
