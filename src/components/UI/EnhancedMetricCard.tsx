/**
 * Enhanced Metric Card Component
 * Extended version of MetricCard with additional props for flexibility
 * @author Marco Zoratto
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme, getBorderRadius, getTransition, gradients } from '../../utils/theme';

interface EnhancedMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
  subtitle?: string;
  isAnimating?: boolean;
  color?: string;
}

const CardContainer = styled.div<{ color?: string }>`
  background: ${gradients.surface};
  border-radius: ${getBorderRadius('lg')};
  padding: ${lightTheme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: ${getTransition('all', '0.3s')};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${lightTheme.spacing.md};
`;

const MetricIcon = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${getBorderRadius('lg')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${props => props.color ? `${props.color}15` : `${lightTheme.colors.primary}15`};
  color: ${props => props.color || lightTheme.colors.primary};
  transition: ${getTransition('all')};
`;

const MetricContent = styled.div`
  flex: 1;
`;

const MetricTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${lightTheme.colors.textSecondary};
  margin: 0 0 ${lightTheme.spacing.sm} 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MetricValue = styled.div<{ isAnimating?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${lightTheme.colors.text};
  margin: ${lightTheme.spacing.sm} 0;
  transition: ${getTransition('all', '0.5s')};
  
  ${props => props.isAnimating && css`
    transform: scale(1.05);
    color: ${lightTheme.colors.primary};
  `}
`;

const MetricSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${lightTheme.colors.textSecondary};
  margin-bottom: ${lightTheme.spacing.sm};
`;

const MetricChange = styled.div<{ trend: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: ${lightTheme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 500;
  
  color: ${props => {
    switch (props.trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      default: return lightTheme.colors.textSecondary;
    }
  }};
`;

const ChangeIcon = styled.span<{ trend: 'up' | 'down' | 'stable' }>`
  font-size: 0.75rem;
  
  &::before {
    content: '${props => {
      switch (props.trend) {
        case 'up': return '↗';
        case 'down': return '↘';
        default: return '→';
      }
    }}';
  }
`;

/**
 * Enhanced Metric Card Component
 */
const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({
  title,
  value,
  change,
  trend = 'stable',
  icon,
  subtitle,
  isAnimating = false,
  color
}) => {
  return (
    <CardContainer color={color}>
      <MetricHeader>
        <MetricContent>
          <MetricTitle>{title}</MetricTitle>
          {subtitle && <MetricSubtitle>{subtitle}</MetricSubtitle>}
          <MetricValue isAnimating={isAnimating}>
            {value}
          </MetricValue>
        </MetricContent>
        {icon && (
          <MetricIcon color={color}>
            {icon}
          </MetricIcon>
        )}
      </MetricHeader>
      
      {change !== undefined && (
        <MetricChange trend={trend}>
          <ChangeIcon trend={trend} />
          <span>
            {change > 0 ? '+' : ''}{Math.abs(change)}%
          </span>
        </MetricChange>
      )}
    </CardContainer>
  );
};

export default EnhancedMetricCard;
