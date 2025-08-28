/**
 * Main App Component
 * Root component that sets up routing and global providers
 * @author Marco Zoratto
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import EnhancedAnalytics from './pages/EnhancedAnalytics';
import Sales from './pages/Sales';
import Users from './pages/Users';
import Settings from './pages/Settings';
import { DashboardProvider } from './contexts/DashboardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DemoControls from './components/Demo/DemoControls';
import './App.css';

/**
 * App Component
 * Main application component with routing and global state management
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DashboardProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/enhanced-analytics" element={<EnhancedAnalytics />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <DemoControls />
            </Layout>
          </Router>
        </DashboardProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
