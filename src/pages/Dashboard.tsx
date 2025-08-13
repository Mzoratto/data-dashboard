/**
 * Dashboard Page Component
 * Main dashboard view with overview metrics and charts
 * @author Data Dashboard Team
 */

import React from 'react';
import styled from 'styled-components';
import { lightTheme, getBorderRadius, gradients } from '../utils/theme';
import { useDashboard } from '../contexts/DashboardContext';
import MetricCard from '../components/UI/MetricCard';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import DashboardChart from '../components/Charts/DashboardChart';
import { ChartDataPoint } from '../types';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${lightTheme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${lightTheme.colors.text};
  margin: 0;
  background: ${gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${lightTheme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${lightTheme.spacing.xl};
  margin-bottom: ${lightTheme.spacing.xl};

  @media (max-width: ${lightTheme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${lightTheme.spacing.lg};
  }
`;



const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: ${lightTheme.spacing.xl};

  @media (max-width: ${lightTheme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${lightTheme.spacing.lg};
  }
`;



/**
 * Dashboard Component
 * Main dashboard page displaying key metrics and charts
 */
const Dashboard: React.FC = () => {
  const { state, refreshAllData } = useDashboard();
  const { metrics, loading } = state;

  // Handle refresh button click
  const handleRefresh = () => {
    refreshAllData();
  };

  // Generate sample chart data
  const generateRevenueData = (): ChartDataPoint[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      x: month,
      y: Math.floor(Math.random() * 50000) + 20000 + (index * 5000),
      label: month,
    }));
  };

  const generateUserData = (): ChartDataPoint[] => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({
      x: day,
      y: Math.floor(Math.random() * 2000) + 500,
      label: day,
    }));
  };

  const generateCategoryData = (): ChartDataPoint[] => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
    return categories.map((category) => ({
      x: category,
      y: Math.floor(Math.random() * 30) + 10,
      label: category,
    }));
  };

  const generatePerformanceData = (): ChartDataPoint[] => {
    const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}:00`);
    return hours.map((hour) => ({
      x: hour,
      y: Math.floor(Math.random() * 100) + 20,
      label: hour,
    }));
  };

  return (
    <DashboardContainer>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: lightTheme.spacing.xl,
        flexWrap: 'wrap',
        gap: lightTheme.spacing.md
      }}>
        <div>
          <PageTitle>Dashboard Overview</PageTitle>
          <p style={{
            color: lightTheme.colors.textSecondary,
            margin: `${lightTheme.spacing.sm} 0 0 0`,
            fontSize: '1.125rem'
          }}>
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          loading={loading.isLoading}
          icon="🔄"
          variant="primary"
        >
          {loading.isLoading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      <MetricsGrid>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            variant="gradient"
          />
        ))}
      </MetricsGrid>

      <ChartsGrid>
        <DashboardChart
          title="Revenue Trend"
          type="area"
          data={generateRevenueData()}
          label="Revenue ($)"
          color={lightTheme.colors.primary}
          loading={loading.isLoading}
        />

        <DashboardChart
          title="Daily Active Users"
          type="bar"
          data={generateUserData()}
          label="Users"
          color={lightTheme.colors.success}
          loading={loading.isLoading}
        />

        <DashboardChart
          title="Sales by Category"
          type="doughnut"
          data={generateCategoryData()}
          label="Sales (%)"
          loading={loading.isLoading}
        />

        <DashboardChart
          title="Performance Metrics"
          type="line"
          data={generatePerformanceData()}
          label="Response Time (ms)"
          color={lightTheme.colors.warning}
          loading={loading.isLoading}
        />
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
