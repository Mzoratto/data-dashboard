/**
 * Pie Chart Component
 * Specialized pie/doughnut chart for proportion data
 * @author Data Dashboard Team
 */

import React from 'react';
import BaseChart from './BaseChart';
import { ChartDataPoint } from '../../types';
import { lightTheme } from '../../utils/theme';

interface PieChartProps {
  title: string;
  data: ChartDataPoint[];
  label?: string;
  height?: number;
  doughnut?: boolean;
  className?: string;
}

/**
 * Pie Chart Component
 * Displays proportional data with modern colors and hover effects
 */
const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  label = 'Value',
  height = 300,
  doughnut = false,
  className,
}) => {
  const chartConfig = {
    type: (doughnut ? 'doughnut' : 'pie') as 'doughnut' | 'pie',
    title,
    datasets: [
      {
        label,
        data,
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          lightTheme.colors.primary,
          lightTheme.colors.success,
          lightTheme.colors.warning,
          lightTheme.colors.error,
          '#8b5cf6',
          '#06b6d4',
          '#ec4899',
          '#22c55e',
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
    options: {
      plugins: {
        legend: {
          position: 'right' as const,
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      cutout: doughnut ? '60%' : '0%',
      radius: '80%',
      animation: {
        animateRotate: true,
        animateScale: true,
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

export default PieChart;
