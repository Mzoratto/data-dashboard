/**
 * Modern Card Component
 * Reusable card component with modern design and animations
 * @author Data Dashboard Team
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme, getBoxShadow, getBorderRadius, getTransition, gradients } from '../../utils/theme';

interface CardProps {
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
  border-radius: ${getBorderRadius('lg')};
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

  ${props => props.variant === 'default' && css`
    background: ${lightTheme.colors.surface};
    box-shadow: ${getBoxShadow('md')};
    border: 1px solid rgba(0, 0, 0, 0.05);
  `}

  ${props => props.variant === 'gradient' && css`
    background: ${gradients.surface};
    box-shadow: ${getBoxShadow('lg')};
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}

  ${props => props.variant === 'glass' && css`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: ${getBoxShadow('lg')};
  `}

  ${props => props.hover && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${getBoxShadow('lg')};
      
      ${props.variant === 'default' && css`
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      `}
    }
  `}

  ${props => props.clickable && css`
    cursor: pointer;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${gradients.primary};
    opacity: 0;
    transition: ${getTransition('opacity')};
  }

  ${props => props.hover && css`
    &:hover::before {
      opacity: 1;
    }
  `}
`;

/**
 * Modern Card Component
 * Provides a flexible card container with multiple variants and hover effects
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className,
  onClick,
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
      {children}
    </CardContainer>
  );
};

export default Card;
