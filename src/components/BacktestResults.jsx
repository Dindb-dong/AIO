import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Section = styled.section`
  background: white;
  border-radius: 10px;
  padding: 25px;
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

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 8px 8px 0 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#3498db' : '#f8f9fa'};
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e9ecef;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.positive ? '#27ae60' : props.negative ? '#e74c3c' : '#2c3e50'};
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 500;
`;

const MetricDescription = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 5px;
`;

const ChartContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
  color: #7f8c8d;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: #3498db;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

const StrategyNameInput = styled.input`
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  margin-right: 15px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ComparisonSection = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

const ComparisonTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const ComparisonCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

const ComparisonName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const ComparisonMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

function BacktestResults({ onNewBacktest }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [strategyName, setStrategyName] = useState('내 전략');
  const [isSaved, setIsSaved] = useState(false);

  // 샘플 결과 데이터
  const results = {
    overview: {
      netProfit: '+14.7%',
      cagr: '+16.2%',
      winRate: '58.3%',
      profitFactor: '1.45',
      sharpeRatio: '1.34'
    },
    risk: {
      maxDrawdown: '-9.8%',
      mddPeriod: '15일',
      avgLosingTrade: '-2.1%',
      maxConsecutiveLosses: '4회',
      volatility: '18.5%'
    },
    trades: {
      totalTrades: 127,
      avgHoldingPeriod: '8.5일',
      largestWin: '+12.3%',
      largestLoss: '-5.7%',
      totalFees: '₩45,200'
    }
  };

  const topStrategies = [
    { name: 'RSI 과매수/과매도', profitFactor: '1.67', returns: '+18.5%' },
    { name: '볼린저 밴드 전략', profitFactor: '1.52', returns: '+15.2%' },
    { name: '이동평균선 골든크로스', profitFactor: '1.38', returns: '+12.8%' }
  ];

  const handleSaveStrategy = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const renderOverview = () => (
    <TabContent>
      <MetricsGrid>
        <MetricCard>
          <MetricValue positive>{results.overview.netProfit}</MetricValue>
          <MetricLabel>총 손익</MetricLabel>
          <MetricDescription>전체 기간 동안의 수익률</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue positive>{results.overview.cagr}</MetricValue>
          <MetricLabel>연평균 수익률 (CAGR)</MetricLabel>
          <MetricDescription>연간 복리 수익률</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue positive>{results.overview.winRate}</MetricValue>
          <MetricLabel>승률</MetricLabel>
          <MetricDescription>수익 거래 비율</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue positive>{results.overview.profitFactor}</MetricValue>
          <MetricLabel>손익비</MetricLabel>
          <MetricDescription>총 수익 / 총 손실</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue positive>{results.overview.sharpeRatio}</MetricValue>
          <MetricLabel>샤프 지수</MetricLabel>
          <MetricDescription>위험 대비 수익률</MetricDescription>
        </MetricCard>
      </MetricsGrid>
    </TabContent>
  );

  const renderRiskAnalysis = () => (
    <TabContent>
      <MetricsGrid>
        <MetricCard>
          <MetricValue negative>{results.risk.maxDrawdown}</MetricValue>
          <MetricLabel>최대 낙폭 (MDD)</MetricLabel>
          <MetricDescription>최대 손실 구간</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue>{results.risk.mddPeriod}</MetricValue>
          <MetricLabel>MDD 기간</MetricLabel>
          <MetricDescription>최대 낙폭 지속 기간</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue negative>{results.risk.avgLosingTrade}</MetricValue>
          <MetricLabel>평균 손실률</MetricLabel>
          <MetricDescription>손실 거래 평균</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue>{results.risk.maxConsecutiveLosses}</MetricValue>
          <MetricLabel>최대 연속 손실</MetricLabel>
          <MetricDescription>연속 손실 최대 횟수</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue>{results.risk.volatility}</MetricValue>
          <MetricLabel>변동성</MetricLabel>
          <MetricDescription>가격 변동의 정도</MetricDescription>
        </MetricCard>
      </MetricsGrid>
    </TabContent>
  );

  const renderTradeDetails = () => (
    <TabContent>
      <MetricsGrid>
        <MetricCard>
          <MetricValue>{results.trades.totalTrades}</MetricValue>
          <MetricLabel>총 거래 횟수</MetricLabel>
          <MetricDescription>전체 매매 횟수</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue>{results.trades.avgHoldingPeriod}</MetricValue>
          <MetricLabel>평균 보유 기간</MetricLabel>
          <MetricDescription>거래당 평균 보유일</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue positive>{results.trades.largestWin}</MetricValue>
          <MetricLabel>최대 이익 거래</MetricLabel>
          <MetricDescription>단일 거래 최대 수익</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue negative>{results.trades.largestLoss}</MetricValue>
          <MetricLabel>최대 손실 거래</MetricLabel>
          <MetricDescription>단일 거래 최대 손실</MetricDescription>
        </MetricCard>
        <MetricCard>
          <MetricValue>{results.trades.totalFees}</MetricValue>
          <MetricLabel>수수료 총합</MetricLabel>
          <MetricDescription>거래 수수료 및 슬리피지</MetricDescription>
        </MetricCard>
      </MetricsGrid>

      <SectionTitle>매수/매도 시점 Top 5</SectionTitle>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>순위</TableHeader>
              <TableHeader>날짜</TableHeader>
              <TableHeader>가격</TableHeader>
              <TableHeader>수익률</TableHeader>
              <TableHeader>유형</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2024-01-15</TableCell>
              <TableCell>₩185,000</TableCell>
              <TableCell style={{ color: '#27ae60' }}>+12.3%</TableCell>
              <TableCell>매도</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>2024-02-08</TableCell>
              <TableCell>₩192,000</TableCell>
              <TableCell style={{ color: '#27ae60' }}>+9.8%</TableCell>
              <TableCell>매도</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>2024-03-12</TableCell>
              <TableCell>₩178,000</TableCell>
              <TableCell style={{ color: '#27ae60' }}>+8.5%</TableCell>
              <TableCell>매도</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>2024-01-03</TableCell>
              <TableCell>₩165,000</TableCell>
              <TableCell style={{ color: '#e74c3c' }}>-3.2%</TableCell>
              <TableCell>매수</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>2024-02-20</TableCell>
              <TableCell>₩188,000</TableCell>
              <TableCell style={{ color: '#27ae60' }}>+7.1%</TableCell>
              <TableCell>매도</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
    </TabContent>
  );

  const renderVisualization = () => (
    <TabContent>
      <ChartContainer>
        <h3>누적 수익률 곡선</h3>
        <p>차트가 여기에 표시됩니다.</p>
      </ChartContainer>
      
      <ChartContainer>
        <h3>MDD 구간 표시 차트</h3>
        <p>차트가 여기에 표시됩니다.</p>
      </ChartContainer>
      
      <ChartContainer>
        <h3>월별/연도별 수익률</h3>
        <p>차트가 여기에 표시됩니다.</p>
      </ChartContainer>
      
      <ChartContainer>
        <h3>매매 시점 표시 차트</h3>
        <p>차트가 여기에 표시됩니다.</p>
      </ChartContainer>
    </TabContent>
  );

  return (
    <ResultsContainer>
      <Section>
        <SectionTitle>백테스팅 결과</SectionTitle>
        
        <TabContainer>
          <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            핵심 성과 요약
          </Tab>
          <Tab active={activeTab === 'risk'} onClick={() => setActiveTab('risk')}>
            상세 위험 분석
          </Tab>
          <Tab active={activeTab === 'trades'} onClick={() => setActiveTab('trades')}>
            매매 상세 분석
          </Tab>
          <Tab active={activeTab === 'visualization'} onClick={() => setActiveTab('visualization')}>
            시각화 자료
          </Tab>
        </TabContainer>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'risk' && renderRiskAnalysis()}
        {activeTab === 'trades' && renderTradeDetails()}
        {activeTab === 'visualization' && renderVisualization()}

        <ActionButtons>
          <StrategyNameInput
            type="text"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            placeholder="전략 이름"
          />
          <Button 
            background={isSaved ? "#27ae60" : "#3498db"}
            onClick={handleSaveStrategy}
            help
            helpText="현재 전략을 저장합니다."
          >
            {isSaved ? '저장됨!' : '전략 저장'}
          </Button>
          <Button 
            background="#95a5a6"
            onClick={onNewBacktest}
            help
            helpText="새로운 백테스팅을 시작합니다."
          >
            새 백테스팅
          </Button>
        </ActionButtons>

        <ComparisonSection>
          <ComparisonTitle>🏆 TOP3 전략 비교 (손익비 기준)</ComparisonTitle>
          <ComparisonGrid>
            {topStrategies.map((strategy, index) => (
              <ComparisonCard key={index}>
                <ComparisonName>{strategy.name}</ComparisonName>
                <ComparisonMetrics>
                  <span>수익률: {strategy.returns}</span>
                  <span>손익비: {strategy.profitFactor}</span>
                </ComparisonMetrics>
              </ComparisonCard>
            ))}
          </ComparisonGrid>
        </ComparisonSection>
      </Section>
    </ResultsContainer>
  );
}

export default BacktestResults;
