/**
 * Enhanced Analytics Page
 * Advanced data visualization and analytics dashboard
 * @author Marco Zoratto
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRealTimeData, useLiveMetrics } from '../hooks/useRealTimeData';
import { useTheme } from '../contexts/ThemeContext';
import DashboardChart from '../components/Charts/DashboardChart';
import EnhancedMetricCard from '../components/UI/EnhancedMetricCard';
import EnhancedCard from '../components/UI/EnhancedCard';
import Button from '../components/UI/Button';

const AnalyticsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const StatusIndicator = styled.div<{ isLive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => props.isLive ? '#10B981' : '#6B7280'};
  color: white;
  font-size: 0.875rem;
  font-weight: 500;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: ${props => props.isLive ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AdvancedMetricsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const KeywordsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const KeywordItem = styled.div<{ category: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const KeywordTag = styled.span<{ category: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.category === 'trending' ? '#FEF3C7' : '#F3F4F6'};
  color: ${props => props.category === 'trending' ? '#92400E' : '#6B7280'};
`;

const ChangeIndicator = styled.span<{ change: number }>`
  color: ${props => props.change > 0 ? '#10B981' : props.change < 0 ? '#EF4444' : '#6B7280'};
  font-weight: 500;
  font-size: 0.875rem;
  
  &::before {
    content: '${props => props.change > 0 ? '↗' : props.change < 0 ? '↘' : '→'}';
    margin-right: 0.25rem;
  }
`;

/**
 * Enhanced Analytics Component
 */
const EnhancedAnalytics: React.FC = () => {
  const { theme } = useTheme();
  
  const { 
    data: realTimeData, 
    toggleStream, 
    refresh 
  } = useRealTimeData({
    interval: 3000,
    volatility: 0.4,
    trend: 'up'
  });

  const totalViews = useLiveMetrics(0, 50);
  const conversionRate = useLiveMetrics(2.4, 0.1);

  // Update metrics when real-time data changes
  useEffect(() => {
    if (realTimeData.performance.pageViews) {
      totalViews.animate(realTimeData.performance.pageViews);
    }
    if (realTimeData.performance.conversionRate) {
      conversionRate.animate(realTimeData.performance.conversionRate);
    }
  }, [realTimeData.performance, totalViews, conversionRate]);

  // const timeRangeOptions = [ // Removed unused variable
  //   { value: '7d', label: '7 Days' },
  //   { value: '30d', label: '30 Days' },
  //   { value: '90d', label: '90 Days' },
  //   { value: '1y', label: '1 Year' }
  // ];

  return (
    <AnalyticsContainer>
      <HeaderSection>
        <Title>Advanced Analytics</Title>
        <ControlsContainer>
          <StatusIndicator isLive={realTimeData.isLive}>
            {realTimeData.isLive ? 'Live' : 'Paused'}
          </StatusIndicator>
          
          <Button 
            onClick={toggleStream}
            variant={realTimeData.isLive ? 'secondary' : 'primary'}
          >
            {realTimeData.isLive ? 'Pause Live Data' : 'Start Live Data'}
          </Button>
          
          <Button onClick={refresh} variant="outline">
            Refresh Data
          </Button>
        </ControlsContainer>
      </HeaderSection>

      <MetricsGrid>
        <EnhancedMetricCard
          title="Real-time Page Views"
          value={Math.round(totalViews.value).toLocaleString()}
          change={12.5}
          trend="up"
          icon="👀"
          subtitle="Live tracking"
          isAnimating={totalViews.isAnimating}
        />
        
        <EnhancedMetricCard
          title="Conversion Rate"
          value={`${conversionRate.value.toFixed(2)}%`}
          change={2.1}
          trend="up"
          icon="📈"
          subtitle="Last 24h"
          isAnimating={conversionRate.isAnimating}
        />
        
        <EnhancedMetricCard
          title="Avg. Session Duration"
          value={`${Math.round((realTimeData.performance.avgSessionDuration || 0) / 60)}m ${Math.round((realTimeData.performance.avgSessionDuration || 0) % 60)}s`}
          change={8.3}
          trend="up"
          icon="⏱️"
          subtitle="User engagement"
        />
        
        <EnhancedMetricCard
          title="Bounce Rate"
          value={`${(realTimeData.performance.bounceRate || 0).toFixed(1)}%`}
          change={-4.2}
          trend="down"
          icon="🎯"
          subtitle="Quality traffic"
        />
      </MetricsGrid>

      <ChartsGrid>
        <EnhancedCard title="Revenue Analytics" subtitle={`Updated ${realTimeData.lastUpdated.toLocaleTimeString()}`}>
          <DashboardChart
            data={realTimeData.revenue}
            type="line"
            title="Monthly Revenue Trend"
            height={300}
          />
        </EnhancedCard>

        <EnhancedCard title="User Activity" subtitle="Real-time user engagement">
          <DashboardChart
            data={realTimeData.users}
            type="bar"
            title="Daily Active Users"
            height={300}
          />
        </EnhancedCard>
      </ChartsGrid>

      <AdvancedMetricsContainer>
        <EnhancedCard title="Trending Keywords" subtitle="Popular search terms">
          <KeywordsList>
            {realTimeData.keywords.map((keyword, index) => (
              <KeywordItem key={index} category={keyword.category}>
                <div>
                  <strong>{keyword.term}</strong>
                  <div style={{ fontSize: '0.875rem', color: theme.colors.textSecondary }}>
                    {keyword.count.toLocaleString()} searches
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <KeywordTag category={keyword.category}>
                    {keyword.category}
                  </KeywordTag>
                  <ChangeIndicator change={keyword.change}>
                    {Math.abs(keyword.change).toFixed(1)}%
                  </ChangeIndicator>
                </div>
              </KeywordItem>
            ))}
          </KeywordsList>
        </EnhancedCard>

        <EnhancedCard title="Performance Insights" subtitle="System metrics">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Page Load Time</span>
              <strong>{(realTimeData.performance.loadTime || 0).toFixed(2)}s</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Unique Visitors</span>
              <strong>{(realTimeData.performance.uniqueVisitors || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Total Page Views</span>
              <strong>{(realTimeData.performance.pageViews || 0).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Server Response</span>
              <strong style={{ color: '#10B981' }}>Fast (99.9%)</strong>
            </div>
          </div>
        </EnhancedCard>
      </AdvancedMetricsContainer>
    </AnalyticsContainer>
  );
};

export default EnhancedAnalytics;
