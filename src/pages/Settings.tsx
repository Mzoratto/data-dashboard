/**
 * Settings Page Component
 * Application settings and configuration
 * @author Data Dashboard Team
 */

import React from 'react';
import styled from 'styled-components';
import { lightTheme, getBorderRadius, getBoxShadow } from '../utils/theme';

const SettingsContainer = styled.div`
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

const Settings: React.FC = () => {
  return (
    <SettingsContainer>
      <PageTitle>Settings</PageTitle>
      <PlaceholderCard>
        <h2>⚙️ Dashboard Settings</h2>
        <p>Configuration options will be implemented here.</p>
      </PlaceholderCard>
    </SettingsContainer>
  );
};

export default Settings;
