import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';
import HelpModal from './HelpModal.jsx';

const TextCodingContainer = styled.div`
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
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#3498db' : '#e0e0e0'};
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
    background: ${props => props.active ? '#3498db' : '#f8f9fa'};
  }
`;

const StockSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StockName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
`;

const StockTicker = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const SelectedStock = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const StockInfo = styled.div`
  flex: 1;
`;

const StockTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const StockDetails = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const CodeEditorContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const EditorSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const EditorTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
`;

const HelpButton = styled.button`
  padding: 6px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ErrorDisplay = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  font-size: 0.9rem;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const DateLabel = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const StrategyNameContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
`;

const StrategyNameInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
`;

// 샘플 주식 데이터
const sampleStocks = [
  { ticker: 'AAPL', name: 'Apple Inc.', market: 'NASDAQ' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', market: 'NASDAQ' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', market: 'NASDAQ' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', market: 'NASDAQ' },
  { ticker: 'TSLA', name: 'Tesla Inc.', market: 'NASDAQ' },
  { ticker: 'META', name: 'Meta Platforms Inc.', market: 'NASDAQ' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', market: 'NASDAQ' },
  { ticker: 'NFLX', name: 'Netflix Inc.', market: 'NASDAQ' },
  { ticker: '005930', name: '삼성전자', market: 'KOSPI' },
  { ticker: '000660', name: 'SK하이닉스', market: 'KOSPI' },
  { ticker: '035420', name: 'NAVER', market: 'KOSPI' },
  { ticker: '207940', name: '삼성바이오로직스', market: 'KOSPI' }
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

function TextCoding({ onBacktestComplete }) {
  const [activeTab, setActiveTab] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [code, setCode] = useState(defaultCode);
  const [codeError, setCodeError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [strategyName, setStrategyName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // 날짜 초기화
  useEffect(() => {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(oneYearAgo.toISOString().split('T')[0]);
  }, []);

  // 주식 검색
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = sampleStocks.filter(stock => 
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setSearchQuery('');
    setSearchResults([]);
  };

  const validateCode = (code) => {
    // 간단한 파이썬 문법 검사
    const errors = [];
    
    // 필수 함수 체크
    if (!code.includes('def strategy(')) {
      errors.push('strategy 함수가 정의되어야 합니다.');
    }
    
    // 기본 변수 체크
    if (!code.includes('data[')) {
      errors.push('data 변수를 사용해야 합니다.');
    }
    
    // 신호 생성 체크
    if (!code.includes('signal')) {
      errors.push('매수/매도 신호를 생성해야 합니다.');
    }
    
    return errors;
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    const errors = validateCode(newCode);
    setCodeError(errors.length > 0 ? errors.join(' ') : '');
  };

  const handleRunBacktest = () => {
    if (!selectedStock) {
      alert('종목을 선택해주세요.');
      return;
    }
    
    if (!strategyName.trim()) {
      alert('전략 이름을 입력해주세요.');
      return;
    }
    
    if (codeError) {
      alert('코드에 오류가 있습니다. 수정 후 다시 시도해주세요.');
      return;
    }
    
    setIsRunning(true);
    
    // 시뮬레이션된 백테스팅 실행
    setTimeout(() => {
      setIsRunning(false);
      if (onBacktestComplete) {
        onBacktestComplete();
      }
    }, 3000);
  };

  return (
    <TextCodingContainer>
      <Section>
        <SectionTitle>백테스팅 전략 개발</SectionTitle>
        

        
          <>
            {/* 종목 선택 */}
            <StockSearchContainer>
              <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>종목 선택</h3>
              <SearchBox>
                <SearchInput
                  type="text"
                  placeholder="종목명 또는 티커를 입력하세요 (예: Apple, AAPL)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon>🔍</SearchIcon>
                {searchResults.length > 0 && (
                  <SearchResults>
                    {searchResults.map((stock, index) => (
                      <SearchResultItem
                        key={index}
                        onClick={() => handleStockSelect(stock)}
                      >
                        <StockName>{stock.name}</StockName>
                        <StockTicker>{stock.ticker} - {stock.market}</StockTicker>
                      </SearchResultItem>
                    ))}
                  </SearchResults>
                )}
              </SearchBox>
              
              {selectedStock && (
                <SelectedStock>
                  <StockInfo>
                    <StockTitle>{selectedStock.name}</StockTitle>
                    <StockDetails>{selectedStock.ticker} - {selectedStock.market}</StockDetails>
                  </StockInfo>
                  <Button 
                    background="#e74c3c" 
                    onClick={() => setSelectedStock(null)}
                    fontSize="14px"
                    padding="8px 16px"
                  >
                    선택 해제
                  </Button>
                </SelectedStock>
              )}
            </StockSearchContainer>

            {/* 코드 에디터 */}
            <CodeEditorContainer>
              <EditorSection>
                <EditorHeader>
                  <EditorTitle>전략 코드 작성</EditorTitle>
                  <HelpButton onClick={() => setShowHelpModal(true)}>
                    도움말
                  </HelpButton>
                </EditorHeader>
                <CodeEditor
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  placeholder="백테스팅 전략을 Python으로 작성하세요..."
                />
                {codeError && (
                  <ErrorDisplay>
                    ⚠️ {codeError}
                  </ErrorDisplay>
                )}
              </EditorSection>
            </CodeEditorContainer>

            {/* 날짜 범위 설정 */}
            <DateRangeContainer>
              <DateLabel>백테스팅 기간:</DateLabel>
              <DateInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>~</span>
              <DateInput
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </DateRangeContainer>

            {/* 전략 이름 */}
            <StrategyNameContainer>
              <DateLabel>전략 이름:</DateLabel>
              <StrategyNameInput
                type="text"
                placeholder="전략 이름을 입력하세요"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
              />
            </StrategyNameContainer>

            {/* 실행 버튼 */}
            <div style={{ textAlign: 'center' }}>
              <Button 
                onClick={handleRunBacktest}
                disabled={isRunning || !selectedStock || !strategyName.trim() || !!codeError}
                fontSize="18px"
                padding="15px 40px"
                help
                helpText="백테스팅을 실행합니다."
              >
                {isRunning ? '실행 중...' : '백테스팅 실행'}
              </Button>
            </div>
          </>
        

        
      </Section>

      {/* 로딩 오버레이 */}
      {isRunning && (
        <LoadingOverlay>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>백테스팅 실행 중...</LoadingText>
            <p style={{ color: '#7f8c8d', margin: 0 }}>
              {selectedStock?.name} 데이터를 분석하고 있습니다.
            </p>
          </LoadingContent>
        </LoadingOverlay>
      )}

      {/* 도움말 모달 */}
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)} 
      />
    </TextCodingContainer>
  );
}

export default TextCoding;
