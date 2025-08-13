/**
 * Main App Component
 * Root component that sets up routing and global providers
 * @author Data Dashboard Team
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Sales from './pages/Sales';
import Users from './pages/Users';
import Settings from './pages/Settings';
import { DashboardProvider } from './contexts/DashboardContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

/**
 * App Component
 * Main application component with routing and global state management
 */
function App() {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </DashboardProvider>
    </ErrorBoundary>
  );
}

export default App;
