/**
 * Enhanced Card Component
 * Extended Card component with title and subtitle support
 * @author Marco Zoratto
 */

import React from 'react';
import styled from 'styled-components';
import { lightTheme, getBorderRadius, getTransition, gradients } from '../../utils/theme';

interface EnhancedCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const CardContainer = styled.div<{
  variant: 'default' | 'gradient' | 'glass';
  hover: boolean;
  padding: 'sm' | 'md' | 'lg';
  clickable: boolean;
}>`
  background: ${gradients.surface};
  border-radius: ${getBorderRadius('lg')};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: ${getTransition('all', '0.3s')};
  position: relative;
  overflow: hidden;
  
  ${props => {
    const paddingMap = {
      sm: lightTheme.spacing.md,
      md: lightTheme.spacing.lg,
      lg: lightTheme.spacing.xl,
    };
    return `padding: ${paddingMap[props.padding]};`;
  }}

  ${props => props.hover && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  `}

  ${props => props.clickable && `
    cursor: pointer;
  `}
`;

const CardHeader = styled.div`
  margin-bottom: ${lightTheme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: ${lightTheme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${lightTheme.colors.text};
  margin: 0 0 ${lightTheme.spacing.xs} 0;
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${lightTheme.colors.textSecondary};
  margin: 0;
`;

const CardContent = styled.div`
  color: ${lightTheme.colors.text};
`;

/**
 * Enhanced Card Component
 */
const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  subtitle,
  children,
  variant = 'gradient',
  hover = true,
  padding = 'lg',
  className,
  onClick
}) => {
  return (
    <CardContainer
      variant={variant}
      hover={hover}
      padding={padding}
      clickable={!!onClick}
      className={className}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default EnhancedCard;
