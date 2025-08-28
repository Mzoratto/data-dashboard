/**
 * Main Layout Component
 * Provides the overall structure for the dashboard application
 * Includes header, sidebar navigation, and main content area
 * @author Data Dashboard Team
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { lightTheme, getBoxShadow, getBorderRadius, getTransition, gradients } from '../../utils/theme';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${gradients.background};
  color: ${lightTheme.colors.text};
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: ${props => props.isOpen ? '280px' : '70px'};
  background: ${gradients.surface};
  backdrop-filter: blur(10px);
  box-shadow: ${getBoxShadow('lg')};
  transition: ${getTransition('all', '0.3s')};
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${lightTheme.breakpoints.tablet}) {
    width: ${props => props.isOpen ? '280px' : '0'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '280px' : '70px'};
  transition: ${getTransition('margin-left', '0.3s')};
  min-height: 100vh;

  @media (max-width: ${lightTheme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: ${getBoxShadow('sm')};
  padding: ${lightTheme.spacing.lg} ${lightTheme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${lightTheme.colors.text};
  padding: ${lightTheme.spacing.sm};
  border-radius: ${getBorderRadius('md')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${lightTheme.colors.background};
  }

  @media (min-width: ${lightTheme.breakpoints.desktop}) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${lightTheme.colors.primary};
`;

const ContentArea = styled.div`
  padding: ${lightTheme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${lightTheme.breakpoints.mobile}) {
    padding: ${lightTheme.spacing.md};
  }
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  padding: ${lightTheme.spacing.lg};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;

  @media (max-width: ${lightTheme.breakpoints.tablet}) {
    opacity: 1;
  }
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  padding: ${lightTheme.spacing.md};
  margin: ${lightTheme.spacing.sm} 0;
  border-radius: ${getBorderRadius('md')};
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${lightTheme.spacing.md};
  text-decoration: none;
  color: ${props => props.$isActive ? 'white' : lightTheme.colors.text};

  &:hover {
    background-color: ${lightTheme.colors.background};
    color: ${lightTheme.colors.text};
  }

  background-color: ${props => props.$isActive ? lightTheme.colors.primary : 'transparent'};
`;

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};

  @media (min-width: ${lightTheme.breakpoints.tablet}) {
    display: none;
  }
`;

/**
 * Layout Component
 * Main layout wrapper that provides responsive navigation and content structure
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigationItems = [
    { path: '/', icon: '📈', label: 'Dashboard' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
    { path: '/enhanced-analytics', icon: '🚀', label: 'Enhanced Analytics' },
    { path: '/sales', icon: '💰', label: 'Sales' },
    { path: '/users', icon: '👥', label: 'Users' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <LayoutContainer>
      <Overlay show={sidebarOpen} onClick={closeSidebar} />
      
      <Sidebar isOpen={sidebarOpen}>
        <SidebarContent isOpen={sidebarOpen}>
          <Logo>📊 Dashboard</Logo>
          <nav style={{ marginTop: lightTheme.spacing.xl }}>
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
                onClick={closeSidebar}
              >
                <span>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </NavItem>
            ))}
          </nav>
        </SidebarContent>
      </Sidebar>

      <MainContent sidebarOpen={sidebarOpen}>
        <Header>
          <MenuButton onClick={toggleSidebar}>
            ☰
          </MenuButton>
          <div>
            <span>Welcome to Data Dashboard</span>
          </div>
        </Header>
        
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
