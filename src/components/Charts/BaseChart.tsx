/**
 * Base Chart Component
 * Wrapper component for Chart.js with modern styling and responsive design
 * @author Data Dashboard Team
 */

import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
import { lightTheme, gradients } from '../../utils/theme';
import { ChartConfig } from '../../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface BaseChartProps {
  config: ChartConfig;
  height?: number;
  className?: string;
}

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  canvas {
    border-radius: 8px;
  }
`;

/**
 * Base Chart Component
 * Provides a consistent wrapper for all chart types with modern styling
 */
const BaseChart: React.FC<BaseChartProps> = ({ config, height = 300, className }) => {
  const chartRef = useRef<ChartJS>(null);

  // Default chart options with modern styling
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: lightTheme.colors.text,
            size: 12,
          },
          color: lightTheme.colors.textSecondary,
        },
      },
      title: {
        display: !!config.title,
        text: config.title,
        font: {
          size: 16,
          weight: '600',
        },
        color: lightTheme.colors.text,
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: lightTheme.colors.text,
        bodyColor: lightTheme.colors.text,
        borderColor: lightTheme.colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: config.type !== 'pie' && config.type !== 'doughnut' ? {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: lightTheme.colors.textSecondary,
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: lightTheme.colors.textSecondary,
          font: {
            size: 11,
          },
        },
        beginAtZero: true,
      },
    } : undefined,
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Merge custom options with defaults
  const chartOptions = {
    ...defaultOptions,
    ...config.options,
  };

  // Transform data for Chart.js format
  const chartData = {
    labels: config.datasets[0]?.data.map(point => point.x) || [],
    datasets: config.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data.map(point => point.y),
      backgroundColor: dataset.backgroundColor || getDefaultColors(config.type, index),
      borderColor: dataset.borderColor || getDefaultBorderColors(config.type, index),
      borderWidth: dataset.borderWidth || (config.type === 'line' ? 3 : 1),
      fill: config.type === 'area',
      tension: config.type === 'line' ? 0.4 : 0,
    })),
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <ChartContainer className={className} style={{ height }}>
      <Chart
        ref={chartRef}
        type={config.type === 'area' ? 'line' : config.type}
        data={chartData}
        options={chartOptions}
      />
    </ChartContainer>
  );
};

/**
 * Get default colors based on chart type and index
 */
const getDefaultColors = (type: string, index: number) => {
  const colors = [
    gradients.primary,
    lightTheme.colors.success,
    lightTheme.colors.warning,
    lightTheme.colors.error,
    lightTheme.colors.secondary,
  ];

  if (type === 'pie' || type === 'doughnut') {
    return [
      'rgba(99, 102, 241, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
    ];
  }

  return colors[index % colors.length];
};

/**
 * Get default border colors based on chart type and index
 */
const getDefaultBorderColors = (type: string, index: number) => {
  const colors = [
    lightTheme.colors.primary,
    lightTheme.colors.success,
    lightTheme.colors.warning,
    lightTheme.colors.error,
    lightTheme.colors.secondary,
  ];

  return colors[index % colors.length];
};

export default BaseChart;
