/**
 * Enhanced Dashboard Page Component
 * Main dashboard view with improved interactivity and theming
 * @author Marco Zoratto
 */

import React from 'react';
import styled from 'styled-components';
import { useDashboard } from '../contexts/DashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard from '../components/UI/MetricCard';
import Button from '../components/UI/Button';
import InteractiveChart from '../components/Charts/InteractiveChart';
import {
  generateRevenueData,
  generateUserAnalytics,
  generateCategoryData,
  generatePerformanceData
} from '../services/mockDataGenerator';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  transition: background-color 0.3s ease;
  padding: ${props => props.theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: color 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const WelcomeText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: ${props => props.theme.spacing.sm} 0 0 0;
  fontSize: 1.125rem;
  transition: color 0.3s ease;
`;

/**
 * Enhanced Dashboard Component
 */
const Dashboard: React.FC = () => {
  const { state, refreshAllData } = useDashboard();
  const { theme } = useTheme();
  const { metrics, loading } = state;

  // Handle refresh button click
  const handleRefresh = () => {
    refreshAllData();
  };

  // Handle chart data point clicks
  const handleChartClick = (dataPoint: any, chartType: string) => {
    console.log(`Clicked on ${chartType}:`, dataPoint);
    // You could open a modal, navigate to details, etc.
  };

  return (
    <DashboardContainer>
      <HeaderSection>
        <div>
          <PageTitle>Dashboard Overview</PageTitle>
          <WelcomeText>
            Welcome back! Here's what's happening with your business today.
          </WelcomeText>
        </div>
        <Button
          onClick={handleRefresh}
          loading={loading.isLoading}
          icon="🔄"
          variant="primary"
        >
          {loading.isLoading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </HeaderSection>

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
        <InteractiveChart
          title="Revenue Trend"
          type="line"
          data={generateRevenueData(12)}
          loading={loading.isLoading}
          onDataPointClick={(point) => handleChartClick(point, 'revenue')}
          exportable={true}
          zoomable={true}
        />

        <InteractiveChart
          title="Daily Active Users"
          type="bar"
          data={generateUserAnalytics(7)}
          loading={loading.isLoading}
          onDataPointClick={(point) => handleChartClick(point, 'users')}
          exportable={true}
        />

        <InteractiveChart
          title="Sales by Category"
          type="doughnut"
          data={generateCategoryData()}
          loading={loading.isLoading}
          onDataPointClick={(point) => handleChartClick(point, 'categories')}
          exportable={true}
        />

        <InteractiveChart
          title="Performance Metrics"
          type="line"
          data={generatePerformanceData(24)}
          loading={loading.isLoading}
          onDataPointClick={(point) => handleChartClick(point, 'performance')}
          exportable={true}
          zoomable={true}
        />
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
