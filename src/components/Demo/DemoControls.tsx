/**
 * Demo Controls Component
 * Provides interactive controls for demonstrating dashboard features
 * @author Marco Zoratto
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { useRealTimeMetrics } from '../../hooks/useRealTime';
import Button from '../UI/Button';
import Card from '../UI/Card';

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: relative;
    bottom: auto;
    right: auto;
    margin: ${props => props.theme.spacing.lg} 0;
  }
`;

const ControlsCard = styled(Card)`
  min-width: 200px;
  padding: ${props => props.theme.spacing.md};
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const ControlLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const ToggleButton = styled(Button)<{ active: boolean }>`
  background: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.backgroundSecondary};
  color: ${props => props.active 
    ? '#ffffff' 
    : props.theme.colors.text};
  
  &:hover {
    background: ${props => props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.border};
  }
`;

const StatusIndicator = styled.div<{ status: 'connected' | 'connecting' | 'disconnected' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => {
      switch (props.status) {
        case 'connected': return '#22c55e';
        case 'connecting': return '#f59e0b';
        case 'disconnected': return '#ef4444';
        default: return '#64748b';
      }
    }};
    
    ${props => props.status === 'connecting' && `
      animation: pulse 1.5s infinite;
    `}
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const DemoCounter = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.sm};
`;

interface DemoControlsProps {
  onDataUpdate?: (data: any) => void;
}

const DemoControls: React.FC<DemoControlsProps> = ({ onDataUpdate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);
  
  const realTimeData = useRealTimeMetrics(realTimeEnabled);

  // Handle real-time toggle
  const handleRealTimeToggle = () => {
    setRealTimeEnabled(!realTimeEnabled);
  };

  // Force data refresh
  const handleForceUpdate = () => {
    realTimeData.forceUpdate();
    onDataUpdate?.(realTimeData.metrics);
  };

  return (
    <ControlsContainer>
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          variant="primary"
          style={{ borderRadius: '50%', width: '50px', height: '50px' }}
        >
          ⚙️
        </Button>
      ) : (
        <ControlsCard>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Demo Controls</h4>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
            >
              ✕
            </Button>
          </div>

          <ControlGroup>
            <ControlLabel>Theme</ControlLabel>
            <ToggleButton
              onClick={toggleTheme}
              active={isDark}
              size="sm"
            >
              {isDark ? '🌙 Dark' : '☀️ Light'}
            </ToggleButton>
          </ControlGroup>

          <ControlGroup>
            <ControlLabel>Real-time Updates</ControlLabel>
            <ToggleButton
              onClick={handleRealTimeToggle}
              active={realTimeEnabled}
              size="sm"
            >
              {realTimeEnabled ? '⏸️ Stop' : '▶️ Start'}
            </ToggleButton>
            
            {realTimeEnabled && (
              <StatusIndicator status={realTimeData.connectionStatus}>
                {realTimeData.connectionStatus === 'connected' && 'Live data active'}
                {realTimeData.connectionStatus === 'connecting' && 'Connecting...'}
                {realTimeData.connectionStatus === 'disconnected' && 'Disconnected'}
              </StatusIndicator>
            )}
          </ControlGroup>

          <ControlGroup>
            <ControlLabel>Data Controls</ControlLabel>
            <Button
              onClick={handleForceUpdate}
              variant="outline"
              size="sm"
            >
              🔄 Refresh Data
            </Button>
          </ControlGroup>

          {realTimeEnabled && realTimeData.updateCount > 0 && (
            <DemoCounter>
              Updates: {realTimeData.updateCount}
              {realTimeData.lastUpdate && (
                <div>
                  Last: {realTimeData.lastUpdate.toLocaleTimeString()}
                </div>
              )}
            </DemoCounter>
          )}

          <div style={{
            fontSize: '0.75rem',
            color: 'inherit',
            opacity: 0.7,
            textAlign: 'center',
            marginTop: '12px',
            borderTop: '1px solid',
            borderColor: 'currentColor',
            paddingTop: '12px'
          }}>
            Portfolio Demo
          </div>
        </ControlsCard>
      )}
    </ControlsContainer>
  );
};

export default DemoControls;
