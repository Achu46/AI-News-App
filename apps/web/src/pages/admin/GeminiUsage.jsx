import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Cpu, 
  DollarSign, 
  Clock, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode 
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import AdminHeader from '../../components/AdminHeader';
import StatCard from '../../components/StatCard';
import { db, auth } from '../../firebase/config';

export default function GeminiUsage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Test Prompt Playground State
  const [testPrompt, setTestPrompt] = useState('Summarize our customer care call handling procedure for new staff.');
  const [testResponse, setTestResponse] = useState(null);
  const [testingAi, setTestingAi] = useState(false);
  const [testError, setTestError] = useState('');

  const loadAiLogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'aiUsage'), orderBy('timestamp', 'desc'), firestoreLimit(25));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.warn('Could not read direct aiUsage from firestore:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAiLogs();
  }, []);

  const handleRunAiTest = async (e) => {
    e.preventDefault();
    setTestingAi(true);
    setTestError('');
    setTestResponse(null);

    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('http://localhost:5001/ai-news-bf2ce/us-central1/api/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: testPrompt, feature: 'superadmin_console_test' })
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Server error calling Gemini');
      }
      setTestResponse(json);
      loadAiLogs(); // Refresh logs to show newly created usage document!
    } catch (err) {
      setTestError(err.message || 'AI request failed');
    } finally {
      setTestingAi(false);
    }
  };

  // Aggregated calculations
  const totalCalls = logs.length;
  const totalTokens = logs.reduce((acc, curr) => acc + (curr.tokens?.totalTokens || 0), 0);
  const totalCost = logs.reduce((acc, curr) => acc + (curr.estimatedCostUsd || 0), 0);

  return (
    <div>
      <AdminHeader
        title="Gemini AI Usage & Budget"
        subtitle="Server-side Gemini 2.5 Flash metrics, token accounting, latency, and live testing"
        onRefresh={loadAiLogs}
        loading={loading}
      />

      <div className="admin-content">
        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard
            title="Total Requests"
            value={totalCalls}
            subtitle="Recorded API executions"
            icon={Sparkles}
          />
          <StatCard
            title="Active Model"
            value="gemini-2.5-flash"
            subtitle="Enterprise fast reasoning"
            icon={Cpu}
          />
          <StatCard
            title="Total Tokens"
            value={totalTokens.toLocaleString()}
            subtitle="Input + output tokens"
            icon={FileCode}
          />
          <StatCard
            title="Estimated Cost"
            value={`$${totalCost.toFixed(4)}`}
            subtitle="Application-recorded cost"
            icon={DollarSign}
            trend={{ text: 'Cap: $50/mo', isPositive: true }}
          />
        </div>

        {/* Live Gemini Test Playground */}
        <div className="que-card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles size={20} color="var(--que-olive-base)" />
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
              Interactive Gemini 2.5 Flash Playground
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--que-text-secondary)', margin: '0 0 16px 0' }}>
            Test live server-side prompts. All requests are securely processed via Cloud Functions, logged in Firestore, and tracked against application budget limits.
          </p>

          <form onSubmit={handleRunAiTest}>
            <div className="que-input-group">
              <textarea
                rows={3}
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="que-input"
                style={{ height: 'auto', padding: '12px' }}
                placeholder="Ask Gemini anything regarding business processes or support..."
              />
            </div>

            <button
              type="submit"
              disabled={testingAi}
              className="que-btn que-btn-forest"
              style={{ height: '42px', padding: '0 20px' }}
            >
              <Send size={15} />
              <span>{testingAi ? 'Executing via Cloud Function...' : 'Send Prompt to Gemini'}</span>
            </button>
          </form>

          {testError && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'var(--que-error-bg)',
              color: 'var(--que-error)',
              borderRadius: '8px',
              fontSize: '13px'
            }}>
              {testError}
            </div>
          )}

          {testResponse && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'var(--que-canvas-base)',
              border: '1px solid var(--que-border)',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                <span><strong>Response from Gemini 2.5 Flash:</strong></span>
                <span>Latency: {testResponse.latencyMs}ms | Tokens: {testResponse.tokens?.totalTokens}</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap', color: 'var(--que-text-primary)' }}>
                {testResponse.data}
              </div>
            </div>
          )}
        </div>

        {/* Recent Usage Logs Table */}
        <div className="que-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--que-border)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
              Recent AI Request Telemetry (/aiUsage)
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--que-canvas-subtle)', borderBottom: '1px solid var(--que-border)' }}>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)' }}>Usage ID / Feature</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)' }}>Model</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)' }}>Tokens (In / Out)</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)' }}>Latency</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: 'var(--que-text-secondary)' }}>
                      No AI requests recorded yet. Try running a prompt above!
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--que-border)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '600', fontSize: '13px' }}>{log.feature}</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--que-text-muted)' }}>{log.id}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>{log.model}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                        {log.tokens?.promptTokens} / {log.tokens?.candidatesTokens} (Total: {log.tokens?.totalTokens})
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>{log.durationMs}ms</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className={`que-badge ${log.status === 'SUCCESS' ? 'que-badge-active' : 'que-badge-disabled'}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
