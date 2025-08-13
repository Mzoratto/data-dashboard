/**
 * Dashboard Chart Component
 * Unified chart component that can render different chart types
 * @author Data Dashboard Team
 */

import React from 'react';
import styled from 'styled-components';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Card from '../UI/Card';
import { ChartDataPoint } from '../../types';
import { lightTheme, getBorderRadius } from '../../utils/theme';

interface DashboardChartProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  data: ChartDataPoint[];
  label?: string;
  color?: string;
  height?: number;
  loading?: boolean;
  error?: string;
  className?: string;
}

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${lightTheme.colors.text};
  margin-bottom: ${lightTheme.spacing.lg};
  text-align: center;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${lightTheme.colors.textSecondary};
  font-size: 1rem;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${lightTheme.colors.primary}20;
    border-top: 2px solid ${lightTheme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: ${lightTheme.spacing.sm};
  }
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${lightTheme.colors.error};
  text-align: center;
  padding: ${lightTheme.spacing.lg};
  
  .error-icon {
    font-size: 2rem;
    margin-bottom: ${lightTheme.spacing.md};
  }
  
  .error-message {
    font-size: 1rem;
    margin-bottom: ${lightTheme.spacing.sm};
  }
  
  .error-details {
    font-size: 0.875rem;
    color: ${lightTheme.colors.textSecondary};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${lightTheme.colors.textSecondary};
  text-align: center;
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: ${lightTheme.spacing.md};
    opacity: 0.5;
  }
  
  .empty-message {
    font-size: 1rem;
    margin-bottom: ${lightTheme.spacing.sm};
  }
`;

/**
 * Dashboard Chart Component
 * Renders different chart types with loading, error, and empty states
 */
const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  type,
  data,
  label,
  color,
  height = 300,
  loading = false,
  error,
  className,
}) => {
  const renderChart = () => {
    if (loading) {
      return (
        <LoadingState>
          Loading chart data...
        </LoadingState>
      );
    }

    if (error) {
      return (
        <ErrorState>
          <div className="error-icon">⚠️</div>
          <div className="error-message">Failed to load chart</div>
          <div className="error-details">{error}</div>
        </ErrorState>
      );
    }

    if (!data || data.length === 0) {
      return (
        <EmptyState>
          <div className="empty-icon">📊</div>
          <div className="empty-message">No data available</div>
        </EmptyState>
      );
    }

    switch (type) {
      case 'line':
        return (
          <LineChart
            title=""
            data={data}
            label={label}
            color={color}
            height={height}
            showArea={false}
          />
        );
      
      case 'area':
        return (
          <LineChart
            title=""
            data={data}
            label={label}
            color={color}
            height={height}
            showArea={true}
          />
        );
      
      case 'bar':
        return (
          <BarChart
            title=""
            data={data}
            label={label}
            color={color}
            height={height}
          />
        );
      
      case 'pie':
        return (
          <PieChart
            title=""
            data={data}
            label={label}
            height={height}
            doughnut={false}
          />
        );
      
      case 'doughnut':
        return (
          <PieChart
            title=""
            data={data}
            label={label}
            height={height}
            doughnut={true}
          />
        );
      
      default:
        return (
          <ErrorState>
            <div className="error-icon">❌</div>
            <div className="error-message">Unsupported chart type</div>
            <div className="error-details">Chart type "{type}" is not supported</div>
          </ErrorState>
        );
    }
  };

  return (
    <Card variant="gradient" hover className={className}>
      <ChartWrapper>
        <ChartTitle>{title}</ChartTitle>
        {renderChart()}
      </ChartWrapper>
    </Card>
  );
};

export default DashboardChart;
