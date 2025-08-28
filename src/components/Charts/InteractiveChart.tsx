/**
 * Interactive Chart Component
 * Enhanced chart with drill-down, tooltips, and data export
 * @author Marco Zoratto
 */

import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { lightTheme } from '../../utils/theme';
import Button from '../UI/Button';
import Card from '../UI/Card';

interface InteractiveChartProps {
  title: string;
  type: 'line' | 'bar' | 'doughnut' | 'pie';
  data: any[];
  loading?: boolean;
  onDataPointClick?: (dataPoint: any, index: number) => void;
  exportable?: boolean;
  zoomable?: boolean;
  animationDuration?: number;
}

const ChartContainer = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: ${lightTheme.spacing.md};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${lightTheme.spacing.lg};
  flex-wrap: wrap;
  gap: ${lightTheme.spacing.sm};
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${lightTheme.colors.text};
  margin: 0;
`;

const ChartActions = styled.div`
  display: flex;
  gap: ${lightTheme.spacing.sm};
  align-items: center;
`;

const ChartStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${lightTheme.spacing.md};
  margin-top: ${lightTheme.spacing.lg};
  padding-top: ${lightTheme.spacing.lg};
  border-top: 1px solid ${lightTheme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${lightTheme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${lightTheme.colors.textSecondary};
  margin-top: 4px;
`;

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title,
  type,
  data,
  loading = false,
  onDataPointClick,
  exportable = true,
  zoomable = false,
  animationDuration = 1000
}) => {
  const chartRef = useRef<ChartJS>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Calculate chart statistics
  const calculateStats = useCallback(() => {
    if (!data || data.length === 0) return {};

    const values = data.map(d => d.y).filter(v => typeof v === 'number');
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = values.length > 0 ? total / values.length : 0;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return {
      total: total.toLocaleString(),
      average: Math.round(average).toLocaleString(),
      max: max.toLocaleString(),
      min: min.toLocaleString(),
      count: values.length
    };
  }, [data]);

  const stats = calculateStats();

  // Enhanced chart configuration
  const chartData: ChartData<any> = {
    labels: data?.map(d => d.x) || [],
    datasets: [{
      label: title,
      data: data?.map(d => d.y) || [],
      backgroundColor: type === 'doughnut' || type === 'pie' 
        ? data?.map(d => d.backgroundColor) || [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
            '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
          ]
        : 'rgba(59, 130, 246, 0.1)',
      borderColor: type === 'doughnut' || type === 'pie'
        ? data?.map(d => d.backgroundColor) || '#3b82f6'
        : '#3b82f6',
      borderWidth: 2,
      fill: type === 'line',
      tension: type === 'line' ? 0.4 : 0,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: type === 'line' ? 4 : 0,
      pointHoverRadius: type === 'line' ? 6 : 0,
    }]
  };

  const chartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animationDuration,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: type === 'doughnut' || type === 'pie',
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: lightTheme.colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<any>) => {
            const value = context.parsed.y || context.parsed;
            return `${context.dataset.label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: type === 'doughnut' || type === 'pie' ? {} : {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: lightTheme.colors.textSecondary
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: lightTheme.colors.textSecondary,
          callback: (value: any) => value.toLocaleString()
        }
      }
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const dataPoint = data[elementIndex];
        setSelectedDataPoint(dataPoint);
        onDataPointClick?.(dataPoint, elementIndex);
      }
    },
    onHover: (event: any, elements: any[]) => {
      event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
    }
  };

  // Export functionality
  const exportChart = useCallback((format: 'png' | 'jpg' | 'csv') => {
    if (!chartRef.current) return;

    if (format === 'csv') {
      const csvContent = [
        ['Label', 'Value'],
        ...data.map(d => [d.x, d.y])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = chartRef.current.canvas;
      const link = document.createElement('a');
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    }
  }, [data, title]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    if (chartRef.current) {
      // Type assertion for zoom plugin methods
      (chartRef.current as any).resetZoom?.();
      setIsZoomed(false);
    }
  }, []);

  if (loading) {
    return (
      <Card>
        <ChartHeader>
          <ChartTitle>{title}</ChartTitle>
        </ChartHeader>
        <ChartContainer>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: lightTheme.colors.textSecondary
          }}>
            <div>Loading chart data...</div>
          </div>
        </ChartContainer>
      </Card>
    );
  }

  return (
    <Card>
      <ChartHeader>
        <ChartTitle>{title}</ChartTitle>
        <ChartActions>
          {zoomable && isZoomed && (
            <Button
              onClick={resetZoom}
              variant="outline"
              size="sm"
            >
              Reset Zoom
            </Button>
          )}
          {exportable && (
            <>
              <Button
                onClick={() => exportChart('png')}
                variant="outline"
                size="sm"
              >
                📷 PNG
              </Button>
              <Button
                onClick={() => exportChart('csv')}
                variant="outline"
                size="sm"
              >
                📊 CSV
              </Button>
            </>
          )}
        </ChartActions>
      </ChartHeader>

      <ChartContainer>
        <Chart
          ref={chartRef}
          type={type}
          data={chartData}
          options={chartOptions}
        />
      </ChartContainer>

      {selectedDataPoint && (
        <div style={{
          padding: lightTheme.spacing.md,
          backgroundColor: lightTheme.colors.backgroundSecondary,
          borderRadius: lightTheme.borderRadius.md,
          marginTop: lightTheme.spacing.md
        }}>
          <strong>Selected:</strong> {selectedDataPoint.label || selectedDataPoint.x} - {selectedDataPoint.y?.toLocaleString()}
        </div>
      )}

      <ChartStats>
        <StatItem>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.average}</StatValue>
          <StatLabel>Average</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.max}</StatValue>
          <StatLabel>Max</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.min}</StatValue>
          <StatLabel>Min</StatLabel>
        </StatItem>
      </ChartStats>
    </Card>
  );
};

export default InteractiveChart;
