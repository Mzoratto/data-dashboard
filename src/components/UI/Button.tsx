/**
 * Modern Button Component
 * Reusable button component with multiple variants and states
 * @author Data Dashboard Team
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme, getBorderRadius, getTransition, gradients } from '../../utils/theme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const ButtonContainer = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'loading'].includes(prop),
})<{
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${lightTheme.spacing.sm};
  border: none;
  border-radius: ${getBorderRadius('md')};
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: ${getTransition('all')};
  position: relative;
  overflow: hidden;

  ${props => {
    const sizeMap = {
      sm: {
        padding: `${lightTheme.spacing.sm} ${lightTheme.spacing.md}`,
        fontSize: '0.875rem',
        height: '2rem',
      },
      md: {
        padding: `${lightTheme.spacing.md} ${lightTheme.spacing.lg}`,
        fontSize: '1rem',
        height: '2.5rem',
      },
      lg: {
        padding: `${lightTheme.spacing.lg} ${lightTheme.spacing.xl}`,
        fontSize: '1.125rem',
        height: '3rem',
      },
    };
    const size = sizeMap[props.size];
    return css`
      padding: ${size.padding};
      font-size: ${size.fontSize};
      min-height: ${size.height};
    `;
  }}

  ${props => props.variant === 'primary' && css`
    background: ${gradients.primary};
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background: ${lightTheme.colors.secondary};
    color: white;
    
    &:hover:not(:disabled) {
      background: #475569;
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'outline' && css`
    background: transparent;
    color: ${lightTheme.colors.primary};
    border: 2px solid ${lightTheme.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${lightTheme.colors.primary};
      color: white;
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'ghost' && css`
    background: transparent;
    color: ${lightTheme.colors.text};
    
    &:hover:not(:disabled) {
      background: rgba(99, 102, 241, 0.1);
      color: ${lightTheme.colors.primary};
    }
  `}

  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  `}

  ${props => props.loading && css`
    cursor: wait;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }
`;

const ButtonContent = styled.span<{ loading: boolean }>`
  opacity: ${props => props.loading ? 0 : 1};
  transition: ${getTransition('opacity')};
  display: flex;
  align-items: center;
  gap: ${lightTheme.spacing.sm};
`;

/**
 * Modern Button Component
 * Provides a flexible button with multiple variants, sizes, and states
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className,
  type = 'button',
  style,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      className={className}
      type={type}
      style={style}
    >
      <ButtonContent loading={loading}>
        {icon && <span>{icon}</span>}
        {children}
      </ButtonContent>
    </ButtonContainer>
  );
};

export default Button;
