import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdaptiveProvider, useAdaptive } from '@aura-adaptive/aura-ui-adaptor';

import Layout from './components/Layout';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ApplyDocument = lazy(() => import('./pages/ApplyDocument'));
const StatusTracking = lazy(() => import('./pages/StatusTracking'));
const HelpFAQ = lazy(() => import('./pages/HelpFAQ'));

function RouteFallback() {
  return <div style={{ minHeight: 320 }} aria-hidden="true" />;
}

function AuraShell({ children }) {
  const { tokens } = useAdaptive();
  const { colors } = tokens;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: "100vh",
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function AppInner() {
  return (
    <AuraShell>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="apply" element={<ApplyDocument />} />
            <Route path="status" element={<StatusTracking />} />
            <Route path="help" element={<HelpFAQ />} />
          </Route>
        </Routes>
      </Suspense>
    </AuraShell>
  );
}

function App() {
  return (
    <Router>
      <AdaptiveProvider simulateExtensionInstalled={false}>
        <AppInner />
      </AdaptiveProvider>
    </Router>
  );
}

export default App;
