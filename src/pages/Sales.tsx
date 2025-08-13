/**
 * Sales Page Component
 * Sales data visualization and metrics
 * @author Data Dashboard Team
 */

import React from 'react';
import styled from 'styled-components';
import { lightTheme, getBorderRadius, getBoxShadow } from '../utils/theme';

const SalesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${lightTheme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${lightTheme.colors.text};
  margin-bottom: ${lightTheme.spacing.md};
`;

const PlaceholderCard = styled.div`
  background-color: ${lightTheme.colors.surface};
  padding: ${lightTheme.spacing.xl};
  border-radius: ${getBorderRadius('lg')};
  box-shadow: ${getBoxShadow('md')};
  text-align: center;
  color: ${lightTheme.colors.textSecondary};
`;

const Sales: React.FC = () => {
  return (
    <SalesContainer>
      <PageTitle>Sales</PageTitle>
      <PlaceholderCard>
        <h2>💰 Sales Dashboard</h2>
        <p>Sales charts and metrics will be implemented here.</p>
      </PlaceholderCard>
    </SalesContainer>
  );
};

export default Sales;
