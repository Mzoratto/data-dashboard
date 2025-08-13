/**
 * Line Chart Component
 * Specialized line chart for time series and trend data
 * @author Data Dashboard Team
 */

import React from 'react';
import BaseChart from './BaseChart';
import { ChartDataPoint } from '../../types';
import { lightTheme } from '../../utils/theme';

interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  label?: string;
  color?: string;
  height?: number;
  showArea?: boolean;
  className?: string;
}

/**
 * Line Chart Component
 * Displays trend data with smooth curves and optional area fill
 */
const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  label = 'Value',
  color = lightTheme.colors.primary,
  height = 300,
  showArea = false,
  className,
}) => {
  const chartConfig = {
    type: (showArea ? 'area' : 'line') as 'area' | 'line',
    title,
    datasets: [
      {
        label,
        data,
        backgroundColor: showArea ? `${color}20` : 'transparent',
        borderColor: color,
        borderWidth: 3,
      },
    ],
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: 'category',
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

export default LineChart;
