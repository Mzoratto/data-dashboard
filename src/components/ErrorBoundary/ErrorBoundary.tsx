/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Provides graceful error handling and user-friendly error messages
 * @author Data Dashboard Team
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { lightTheme, getBoxShadow, getBorderRadius } from '../../utils/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: ${lightTheme.spacing.xl};
  text-align: center;
`;

const ErrorCard = styled.div`
  background-color: ${lightTheme.colors.surface};
  border: 2px solid ${lightTheme.colors.error};
  border-radius: ${getBorderRadius('lg')};
  padding: ${lightTheme.spacing.xl};
  box-shadow: ${getBoxShadow('lg')};
  max-width: 600px;
  width: 100%;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${lightTheme.spacing.lg};
`;

const ErrorTitle = styled.h2`
  color: ${lightTheme.colors.error};
  margin-bottom: ${lightTheme.spacing.md};
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: ${lightTheme.colors.textSecondary};
  margin-bottom: ${lightTheme.spacing.lg};
  line-height: 1.6;
`;

const RetryButton = styled.button`
  background-color: ${lightTheme.colors.primary};
  color: white;
  border: none;
  padding: ${lightTheme.spacing.md} ${lightTheme.spacing.lg};
  border-radius: ${getBorderRadius('md')};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ErrorDetails = styled.details`
  margin-top: ${lightTheme.spacing.lg};
  text-align: left;
  
  summary {
    cursor: pointer;
    color: ${lightTheme.colors.textSecondary};
    margin-bottom: ${lightTheme.spacing.sm};
  }
  
  pre {
    background-color: ${lightTheme.colors.background};
    padding: ${lightTheme.spacing.md};
    border-radius: ${getBorderRadius('sm')};
    overflow-x: auto;
    font-size: 0.875rem;
    color: ${lightTheme.colors.text};
  }
`;

/**
 * Error Boundary Class Component
 * Implements React's error boundary pattern for graceful error handling
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Static method called when an error is thrown
   * Updates state to trigger error UI
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  /**
   * Called when an error is caught
   * Logs error details and updates state
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Here you could send error details to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Handles retry action
   * Resets error state to attempt recovery
   */
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            <ErrorMessage>
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </ErrorMessage>
            <RetryButton onClick={this.handleRetry}>
              Try Again
            </RetryButton>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <ErrorDetails>
                <summary>Error Details (Development Mode)</summary>
                <pre>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </ErrorDetails>
            )}
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
