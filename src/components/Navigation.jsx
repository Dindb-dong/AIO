import React from 'react';
import styled from 'styled-components';
import { useI18n } from '../i18n.jsx';

const NavContainer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-right: none;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 5px 0;
`;

const NavButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  border-left: ${props => props.active ? '4px solid #3498db' : '4px solid transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  &:focus {
    outline: none;
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 18px;
`;

const Logo = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

const LogoText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #c9a227;
`;

function useNavItems(t) {
  return [
    { id: 'dashboard', label: t('nav_dashboard'), icon: '📊' },
    { id: 'backtesting', label: t('nav_backtesting'), icon: '🔬' },
    { id: 'backtestsetting', label: '백테스팅 설정', icon: '⚙️' },
    { id: 'stock-analysis', label: t('nav_stock'), icon: '📈' },
    { id: 'comparison', label: t('nav_comparison'), icon: '⚖️' },
    { id: 'learning', label: t('nav_learning'), icon: '📚' },
    { id: 'mypage', label: t('nav_mypage'), icon: '👤' }
  ];
}

function Navigation({ activeTab, setActiveTab }) {
  const { t } = useI18n();
  const navItems = useNavItems(t);
  return (
    <NavContainer>
      <Logo>
        <LogoText>AIO Finance Lab</LogoText>
      </Logo>
      <NavList>
        {navItems.map(item => (
          <NavItem key={item.id}>
            <NavButton
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavButton>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
}

export default Navigation;
