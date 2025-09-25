import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation.jsx';
import { useI18n } from './i18n.jsx';
import Dashboard from './components/Dashboard.jsx';
import Backtesting from './components/Backtesting.jsx';
import StockAnalysis from './components/StockAnalysis.jsx';
import Comparison from './components/Comparison.jsx';
import Learning from './components/Learning.jsx';
import MyPage from './components/MyPage.jsx';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  margin-left: 250px;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

function App() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'backtesting':
        return <Backtesting />;
      case 'stock-analysis':
        return <StockAnalysis />;
      case 'comparison':
        return <Comparison />;
      case 'learning':
        return <Learning />;
      case 'mypage':
        return <MyPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContainer>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent>
        <Header>
          <Title>{t('app_title')}</Title>
          <Subtitle>{t('app_subtitle')}</Subtitle>
        </Header>
        {renderContent()}
      </MainContent>
    </AppContainer>
  );
}

export default App;
