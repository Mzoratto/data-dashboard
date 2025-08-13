/**
 * Bar Chart Component
 * Specialized bar chart for categorical data comparison
 * @author Data Dashboard Team
 */

import React from 'react';
import BaseChart from './BaseChart';
import { ChartDataPoint } from '../../types';
import { lightTheme, gradients } from '../../utils/theme';

interface BarChartProps {
  title: string;
  data: ChartDataPoint[];
  label?: string;
  color?: string;
  height?: number;
  horizontal?: boolean;
  className?: string;
}

/**
 * Bar Chart Component
 * Displays categorical data with modern gradient bars
 */
const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  label = 'Value',
  color = lightTheme.colors.primary,
  height = 300,
  horizontal = false,
  className,
}) => {
  const chartConfig = {
    type: 'bar' as const,
    title,
    datasets: [
      {
        label,
        data,
        backgroundColor: data.map((_, index) => {
          const colors = [
            'rgba(99, 102, 241, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ];
          return colors[index % colors.length];
        }),
        borderColor: data.map((_, index) => {
          const colors = [
            lightTheme.colors.primary,
            lightTheme.colors.success,
            lightTheme.colors.warning,
            lightTheme.colors.error,
            '#8b5cf6',
          ];
          return colors[index % colors.length];
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
    options: {
      indexAxis: horizontal ? 'y' as const : 'x' as const,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: false,
          },
        },
        y: {
          title: {
            display: false,
          },
        },
      },
    },
  };

  return (
    <BaseChart
      config={chartConfig}
      height={height}
      className={className}
    />
  );
};

export default BarChart;
