import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import DashboardOverview from './pages/admin/DashboardOverview';
import UserManagement from './pages/admin/UserManagement';
import GeminiUsage from './pages/admin/GeminiUsage';
import AuditLogs from './pages/admin/AuditLogs';
import DailyActivities from './pages/admin/DailyActivities';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Website */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
          </Route>

          {/* Super Admin Login Screen */}
          <Route path="/que" element={<AdminLogin />} />

          {/* Protected Super Admin Console */}
          <Route path="/que" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="ai-usage" element={<GeminiUsage />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="activities" element={<DailyActivities />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
