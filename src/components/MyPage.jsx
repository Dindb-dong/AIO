import React, { useState } from 'react';
import styled from 'styled-components';
import { useI18n } from '../i18n.jsx';
import { useTheme } from '../theme.jsx';
import Button from './common/Button.jsx';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: 700;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const ProfileEmail = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 15px;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 30px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SettingCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e0e0e0;
`;

const SettingTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  color: #5a6c7d;
  font-weight: 500;
`;

const Toggle = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 25px;
  border: none;
  background: ${props => props.active ? '#3498db' : '#bdc3c7'};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '27px' : '2px'};
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

// Replaced local Button with common Button

const PortfolioSection = styled.div`
  margin-top: 20px;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const PortfolioCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid ${props => props.color || '#e0e0e0'};
`;

const PortfolioValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.color || '#2c3e50'};
  margin-bottom: 5px;
`;

const PortfolioLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #3498db;
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 3px;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const ActivityValue = styled.div`
  font-weight: 600;
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
`;

function MyPage() {
  const { lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: theme === 'dark',
    autoSave: true,
    language: lang,
    timezone: 'Asia/Seoul'
  });

  const [portfolioStats] = useState({
    totalValue: 125000,
    totalReturn: 15.2,
    winRate: 68.5,
    totalTrades: 45
  });

  const [recentActivity] = useState([
    { title: 'AAPL Buy', time: '2 hours ago', value: '+$1,250', positive: true },
    { title: 'TSLA Sell', time: '1 day ago', value: '+$2,100', positive: true },
    { title: 'Portfolio Analysis Complete', time: '2 days ago', value: '', positive: null },
    { title: 'MSFT Buy', time: '3 days ago', value: '+$850', positive: true },
    { title: 'Backtesting Run', time: '1 week ago', value: '', positive: null }
  ]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <MyPageContainer>
      <Section>
        <SectionTitle>프로필</SectionTitle>
        
        <ProfileSection>
          <Avatar>JD</Avatar>
          <ProfileInfo>
            <ProfileName>John Doe</ProfileName>
            <ProfileEmail>john.doe@example.com</ProfileEmail>
            <ProfileStats>
              <StatItem>
                <StatValue>Premium</StatValue>
                <StatLabel>Membership</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>2 Years</StatValue>
                <StatLabel>Join Date</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>127</StatValue>
                <StatLabel>Analysis Count</StatLabel>
              </StatItem>
            </ProfileStats>
          </ProfileInfo>
        </ProfileSection>

        <Button
          background="linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
          fontSize="16px"
          padding="12px 24px"
          radius="8px"
          style={{ marginRight: '10px' }}
          help
          helpText="프로필 정보를 수정합니다."
        >
          Edit Profile
        </Button>
        <Button
          background="linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
          fontSize="16px"
          padding="12px 24px"
          radius="8px"
          help
          helpText="계정을 삭제하면 복구할 수 없습니다."
          helpBadgeColor="#c0392b"
        >
          Delete Account
        </Button>
      </Section>

      <Section>
        <SectionTitle>Portfolio Status</SectionTitle>
        
        <PortfolioGrid>
          <PortfolioCard color="#3498db">
            <PortfolioValue color="#3498db">
              ${portfolioStats.totalValue.toLocaleString()}
            </PortfolioValue>
            <PortfolioLabel>Total Assets</PortfolioLabel>
          </PortfolioCard>
          <PortfolioCard color="#27ae60">
            <PortfolioValue color="#27ae60">
              +{portfolioStats.totalReturn}%
            </PortfolioValue>
            <PortfolioLabel>Total Return</PortfolioLabel>
          </PortfolioCard>
          <PortfolioCard color="#f39c12">
            <PortfolioValue color="#f39c12">
              {portfolioStats.winRate}%
            </PortfolioValue>
            <PortfolioLabel>Win Rate</PortfolioLabel>
          </PortfolioCard>
          <PortfolioCard color="#9b59b6">
            <PortfolioValue color="#9b59b6">
              {portfolioStats.totalTrades}
            </PortfolioValue>
            <PortfolioLabel>Total Trades</PortfolioLabel>
          </PortfolioCard>
        </PortfolioGrid>
      </Section>

      <Section>
        <SectionTitle>Settings</SectionTitle>
        
        <SettingsGrid>
          <SettingCard>
            <SettingTitle>Notification Settings</SettingTitle>
            <SettingItem>
              <SettingLabel>Push Notifications</SettingLabel>
              <Toggle 
                active={settings.notifications}
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Email Notifications</SettingLabel>
              <Toggle 
                active={settings.emailAlerts}
                onClick={() => handleSettingChange('emailAlerts', !settings.emailAlerts)}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Auto Save</SettingLabel>
              <Toggle 
                active={settings.autoSave}
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              />
            </SettingItem>
          </SettingCard>

          <SettingCard>
            <SettingTitle>Display Settings</SettingTitle>
            <SettingItem>
              <SettingLabel>Dark Mode</SettingLabel>
              <Toggle 
                active={settings.darkMode}
                onClick={() => {
                  const next = !settings.darkMode;
                  handleSettingChange('darkMode', next);
                  setTheme(next ? 'dark' : 'light');
                }}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Language</SettingLabel>
              <Select 
                value={settings.language}
                onChange={(e) => {
                  const value = e.target.value;
                  handleSettingChange('language', value);
                  if (value === 'en' || value === 'ko') setLang(value);
                }}
              >
                <option value="en">English</option>
                <option value="ko">한국어</option>
              </Select>
            </SettingItem>
            <SettingItem>
              <SettingLabel>Timezone</SettingLabel>
              <Select 
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option value="Asia/Seoul">Seoul (UTC+9)</option>
                <option value="America/New_York">New York (UTC-5)</option>
                <option value="Europe/London">London (UTC+0)</option>
              </Select>
            </SettingItem>
          </SettingCard>
        </SettingsGrid>
      </Section>

      <Section>
        <SectionTitle>Recent Activity</SectionTitle>
        
        <ActivityList>
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityInfo>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityInfo>
              {activity.value && (
                <ActivityValue positive={activity.positive}>
                  {activity.value}
                </ActivityValue>
              )}
            </ActivityItem>
          ))}
        </ActivityList>
      </Section>
    </MyPageContainer>
  );
}

export default MyPage;
