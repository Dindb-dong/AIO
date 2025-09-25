import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';

const BacktestingContainer = styled.div`
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

const StrategyBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const StrategyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StrategyItem = styled.div`
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
  }
`;

const StrategyName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
`;

const StrategyDesc = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const StrategyMetrics = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
`;

const Metric = styled.span`
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
  font-weight: 600;
`;

// Replaced local Button with common Button

const ResultsSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ResultCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
  margin-bottom: 5px;
`;

const ResultLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const sampleStrategies = [
  {
    id: 1,
    name: "RSI 과매수/과매도 전략",
    description: "RSI 30 이하에서 매수, 70 이상에서 매도",
    returns: "+15.2%",
    sharpe: "1.45",
    maxDrawdown: "-8.3%"
  },
  {
    id: 2,
    name: "이동평균선 골든크로스",
    description: "5일선이 20일선을 상향돌파할 때 매수",
    returns: "+12.8%",
    sharpe: "1.23",
    maxDrawdown: "-12.1%"
  },
  {
    id: 3,
    name: "볼린저 밴드 전략",
    description: "하단 터치 시 매수, 상단 터치 시 매도",
    returns: "+18.5%",
    sharpe: "1.67",
    maxDrawdown: "-6.8%"
  }
];

const defaultCode = `# 백테스팅 전략 예시
def strategy(data):
    """
    간단한 이동평균선 전략
    """
    # 5일, 20일 이동평균선 계산
    data['ma5'] = data['close'].rolling(5).mean()
    data['ma20'] = data['close'].rolling(20).mean()
    
    # 매수/매도 신호 생성
    data['signal'] = 0
    data.loc[data['ma5'] > data['ma20'], 'signal'] = 1  # 매수
    data.loc[data['ma5'] < data['ma20'], 'signal'] = -1  # 매도
    
    return data`;

function Backtesting() {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [code, setCode] = useState(defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const handleRunBacktest = () => {
    setIsRunning(true);
    
    // 시뮬레이션된 백테스팅 실행
    setTimeout(() => {
      setResults({
        totalReturn: "+14.7%",
        annualReturn: "+16.2%",
        sharpeRatio: "1.34",
        maxDrawdown: "-9.8%",
        winRate: "58.3%",
        totalTrades: 127
      });
      setIsRunning(false);
    }, 2000);
  };

  return (
    <BacktestingContainer>
      <Section>
        <SectionTitle>전략 백테스팅</SectionTitle>
        
        <StrategyBuilder>
          <div>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>전략 코드 작성</h3>
            <CodeEditor
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="백테스팅 전략을 Python으로 작성하세요..."
            />
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <Button onClick={handleRunBacktest} disabled={isRunning}
                help
                helpText="작성한 전략으로 시뮬레이션을 실행합니다."
                fontSize="16px"
                padding="12px 24px"
              >
                {isRunning ? '실행 중...' : '백테스트 실행'}
              </Button>
              <Button background="#95a5a6" fontSize="16px" padding="12px 24px" help helpText="현재 전략 코드를 저장합니다.">전략 저장</Button>
            </div>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>저장된 전략</h3>
            <StrategyList>
              {sampleStrategies.map(strategy => (
                <StrategyItem 
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy)}
                  style={{ 
                    borderColor: selectedStrategy?.id === strategy.id ? '#3498db' : '#e0e0e0',
                    backgroundColor: selectedStrategy?.id === strategy.id ? '#f8f9fa' : 'white'
                  }}
                >
                  <StrategyName>{strategy.name}</StrategyName>
                  <StrategyDesc>{strategy.description}</StrategyDesc>
                  <StrategyMetrics>
                    <Metric positive>수익률: {strategy.returns}</Metric>
                    <Metric>샤프비율: {strategy.sharpe}</Metric>
                    <Metric>최대손실: {strategy.maxDrawdown}</Metric>
                  </StrategyMetrics>
                </StrategyItem>
              ))}
            </StrategyList>
          </div>
        </StrategyBuilder>

        {results && (
          <ResultsSection>
            <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>백테스팅 결과</h3>
            <ResultsGrid>
              <ResultCard>
                <ResultValue positive>{results.totalReturn}</ResultValue>
                <ResultLabel>총 수익률</ResultLabel>
              </ResultCard>
              <ResultCard>
                <ResultValue positive>{results.annualReturn}</ResultValue>
                <ResultLabel>연간 수익률</ResultLabel>
              </ResultCard>
              <ResultCard>
                <ResultValue positive>{results.sharpeRatio}</ResultValue>
                <ResultLabel>샤프 비율</ResultLabel>
              </ResultCard>
              <ResultCard>
                <ResultValue>{results.maxDrawdown}</ResultValue>
                <ResultLabel>최대 손실</ResultLabel>
              </ResultCard>
              <ResultCard>
                <ResultValue positive>{results.winRate}</ResultValue>
                <ResultLabel>승률</ResultLabel>
              </ResultCard>
              <ResultCard>
                <ResultValue>{results.totalTrades}</ResultValue>
                <ResultLabel>총 거래 횟수</ResultLabel>
              </ResultCard>
            </ResultsGrid>
          </ResultsSection>
        )}
      </Section>
    </BacktestingContainer>
  );
}

export default Backtesting;
