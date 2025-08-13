/**
 * Modern Metric Card Component
 * Displays key metrics with modern design and animations
 * @author Data Dashboard Team
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme, getBorderRadius, getTransition, gradients } from '../../utils/theme';
import Card from './Card';
import { MetricCard as MetricCardType } from '../../types';

interface MetricCardProps {
  metric: MetricCardType;
  variant?: 'default' | 'gradient';
}

const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${lightTheme.spacing.md};
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

const MetricTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${lightTheme.colors.textSecondary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
`;

const MetricValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${lightTheme.colors.text};
  margin: ${lightTheme.spacing.sm} 0;
  line-height: 1;
  
  @media (max-width: ${lightTheme.breakpoints.mobile}) {
    font-size: 1.875rem;
  }
`;

const MetricUnit = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${lightTheme.colors.textSecondary};
  margin-left: ${lightTheme.spacing.xs};
`;

const MetricChange = styled.div<{ changeType: 'increase' | 'decrease' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: ${lightTheme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${lightTheme.spacing.xs} ${lightTheme.spacing.sm};
  border-radius: ${getBorderRadius('md')};
  
  ${props => props.changeType === 'increase' && css`
    color: ${lightTheme.colors.success};
    background: rgba(16, 185, 129, 0.1);
  `}
  
  ${props => props.changeType === 'decrease' && css`
    color: ${lightTheme.colors.error};
    background: rgba(239, 68, 68, 0.1);
  `}
  
  ${props => props.changeType === 'neutral' && css`
    color: ${lightTheme.colors.textSecondary};
    background: rgba(100, 116, 139, 0.1);
  `}
`;

const ChangeIcon = styled.span<{ changeType: 'increase' | 'decrease' | 'neutral' }>`
  font-size: 0.75rem;
  
  ${props => props.changeType === 'increase' && css`
    &::before {
      content: '↗️';
    }
  `}
  
  ${props => props.changeType === 'decrease' && css`
    &::before {
      content: '↘️';
    }
  `}
  
  ${props => props.changeType === 'neutral' && css`
    &::before {
      content: '➡️';
    }
  `}
`;

const GradientCard = styled(Card)<{ color?: string }>`
  background: ${props => props.color ? 
    `linear-gradient(135deg, ${props.color}15 0%, ${props.color}05 100%)` : 
    gradients.surface
  };
  border: 1px solid ${props => props.color ? `${props.color}20` : 'rgba(255, 255, 255, 0.2)'};
  
  &:hover {
    ${MetricIcon} {
      transform: scale(1.1);
      background: ${props => props.color ? `${props.color}25` : `${lightTheme.colors.primary}25`};
    }
  }
`;

/**
 * Modern Metric Card Component
 * Displays a metric with icon, value, change indicator, and modern styling
 */
const MetricCard: React.FC<MetricCardProps> = ({ metric, variant = 'default' }) => {
  const CardComponent = variant === 'gradient' ? GradientCard : Card;
  
  return (
    <CardComponent color={metric.color} hover>
      <MetricContainer>
        <MetricHeader>
          <div>
            <MetricTitle>{metric.title}</MetricTitle>
            <MetricValue>
              {metric.value}
              {metric.unit && <MetricUnit>{metric.unit}</MetricUnit>}
            </MetricValue>
          </div>
          {metric.icon && (
            <MetricIcon color={metric.color}>
              {metric.icon}
            </MetricIcon>
          )}
        </MetricHeader>
        
        {metric.change !== undefined && metric.changeType && (
          <MetricChange changeType={metric.changeType}>
            <ChangeIcon changeType={metric.changeType} />
            <span>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </MetricChange>
        )}
      </MetricContainer>
    </CardComponent>
  );
};

export default MetricCard;
