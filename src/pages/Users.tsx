/**
 * Users Page Component
 * User analytics and management interface
 * @author Data Dashboard Team
 */

import React from 'react';
import styled from 'styled-components';
import { lightTheme, getBorderRadius, getBoxShadow } from '../utils/theme';

const UsersContainer = styled.div`
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

const Users: React.FC = () => {
  return (
    <UsersContainer>
      <PageTitle>Users</PageTitle>
      <PlaceholderCard>
        <h2>👥 User Analytics</h2>
        <p>User metrics and analytics will be implemented here.</p>
      </PlaceholderCard>
    </UsersContainer>
  );
};

export default Users;
