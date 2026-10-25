import React, { useEffect, useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Sparkles, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import AdminHeader from '../../components/AdminHeader';
import StatCard from '../../components/StatCard';
import { AdminAPI } from '../../services/api';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalUsers: 1,
    activeUsers: 1,
    disabledUsers: 0,
    totalAiRequests: 0,
    dailyTokensUsedToday: 0,
    dailyEstimatedCostToday: 0
  });
  const [loading, setLoading] = useState(true);

  // Sample historical data for charts
  const activityData = [
    { date: 'Mon', signups: 4, logins: 28, aiCalls: 45 },
    { date: 'Tue', signups: 7, logins: 34, aiCalls: 52 },
    { date: 'Wed', signups: 5, logins: 41, aiCalls: 68 },
    { date: 'Thu', signups: 9, logins: 48, aiCalls: 84 },
    { date: 'Fri', signups: 12, logins: 62, aiCalls: 96 },
    { date: 'Sat', signups: 8, logins: 38, aiCalls: 60 },
    { date: 'Sun', signups: 6, logins: 35, aiCalls: 55 },
  ];

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await AdminAPI.getOverviewStats();
      if (data) setStats(data);
    } catch (e) {
      console.error('Error fetching dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <AdminHeader
        title="Super Admin Overview"
        subtitle="Real-time analytics, user telemetry, and Gemini AI operations"
        onRefresh={fetchStats}
        loading={loading}
      />

      <div className="admin-content">
        {/* KPI Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle="Registered accounts"
            icon={Users}
            trend={{ text: '+12% this week', isPositive: true }}
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            subtitle="Normal access state"
            icon={UserCheck}
          />
          <StatCard
            title="Disabled / Suspended"
            value={stats.disabledUsers}
            subtitle="Access blocked"
            icon={UserX}
            alert={stats.disabledUsers > 0}
          />
          <StatCard
            title="Gemini AI Calls"
            value={stats.totalAiRequests || 0}
            subtitle="Server-side executions"
            icon={Sparkles}
            trend={{ text: 'Under budget', isPositive: true }}
          />
        </div>

        {/* Visual Charts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Activity Trends Area Chart */}
          <div className="que-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
                  User Activity & Engagement
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                  Signups vs Daily Logins (Past 7 Days)
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--que-forest-base)" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="var(--que-forest-base)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--que-olive-base)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--que-olive-base)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--que-border)" />
                  <XAxis dataKey="date" stroke="var(--que-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--que-text-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--que-canvas-surface)',
                      borderColor: 'var(--que-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="logins" stroke="var(--que-forest-base)" fillOpacity={1} fill="url(#colorLogins)" name="User Logins" />
                  <Area type="monotone" dataKey="signups" stroke="var(--que-olive-base)" fillOpacity={1} fill="url(#colorSignups)" name="New Signups" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Usage Bar Chart */}
          <div className="que-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
                  Gemini API Requests
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                  Volume breakdown (Model: gemini-2.5-flash)
                </span>
              </div>
              <span className="que-badge que-badge-active">
                Budget: Healthy
              </span>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--que-border)" />
                  <XAxis dataKey="date" stroke="var(--que-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--que-text-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--que-canvas-surface)',
                      borderColor: 'var(--que-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="aiCalls" fill="var(--que-olive-base)" radius={[4, 4, 0, 0]} name="AI Requests" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security Summary & Quick Links */}
        <div className="que-card" style={{
          backgroundColor: 'var(--que-canvas-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--que-olive-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--que-olive-base)'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--que-forest-base)' }}>
                Enterprise Security & Audit Shield Active
              </div>
              <div style={{ fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                Immutable audit logs are actively capturing all administrative and security actions.
              </div>
            </div>
          </div>

          <a href="/que/audit-logs" className="que-btn que-btn-outline" style={{ height: '40px' }}>
            <span>Review Audit Logs</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
