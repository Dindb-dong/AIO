import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from './common/Button.jsx';
import { useI18n } from '../i18n.jsx';

const StockAnalysisContainer = styled.div`
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

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

// Replaced local Button with common Button

const StockInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const InfoLabel = styled.span`
  color: #7f8c8d;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #2c3e50;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin: 20px 0;
`;

const IndicatorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const IndicatorCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid ${props => props.color || '#e0e0e0'};
`;

const IndicatorValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || '#2c3e50'};
  margin-bottom: 5px;
`;

const IndicatorLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const IndicatorStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#7f8c8d'};
  font-weight: 600;
`;

const NewsSection = styled.div`
  margin-top: 20px;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NewsItem = styled.div`
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

const NewsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
`;

const NewsMeta = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  display: flex;
  gap: 15px;
`;

// 샘플 데이터 생성
const generateStockData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: 150 + Math.random() * 20 + i * 0.5,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      rsi: 30 + Math.random() * 40,
      macd: -2 + Math.random() * 4
    });
  }
  
  return data;
};

const sampleNews = [
  {
    title: "AAPL, Q4 실적 발표 예정... 시장 기대감 고조",
    source: "Reuters",
    time: "2시간 전",
    sentiment: "positive"
  },
  {
    title: "테슬라, 중국 시장 점유율 확대 계획 발표",
    source: "Bloomberg",
    time: "4시간 전",
    sentiment: "positive"
  },
  {
    title: "마이크로소프트, 클라우드 사업부 매출 증가세 둔화",
    source: "CNBC",
    time: "6시간 전",
    sentiment: "negative"
  }
];

function StockAnalysis() {
  const { t } = useI18n();
  const [searchSymbol, setSearchSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = generateStockData();
    setStockData(data);
  }, [searchSymbol]);

  const handleSearch = () => {
    setIsLoading(true);
    // 실제로는 API 호출
    setTimeout(() => {
      const data = generateStockData();
      setStockData(data);
      setIsLoading(false);
    }, 1000);
  };

  const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;
  const currentRSI = stockData.length > 0 ? stockData[stockData.length - 1].rsi : 0;
  const currentMACD = stockData.length > 0 ? stockData[stockData.length - 1].macd : 0;

  const getRSIStatus = (rsi) => {
    if (rsi > 70) return { status: '과매수', color: '#e74c3c' };
    if (rsi < 30) return { status: '과매도', color: '#27ae60' };
    return { status: '중립', color: '#f39c12' };
  };

  const getMACDStatus = (macd) => {
    if (macd > 0) return { status: '상승', color: '#27ae60' };
    return { status: '하락', color: '#e74c3c' };
  };

  return (
    <StockAnalysisContainer>
      <Section>
        <SectionTitle>{t('stock_title')}</SectionTitle>
        
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder={t('stock_search_placeholder')}
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}
            help
            helpText="입력한 티커로 분석 데이터를 불러옵니다."
            fontSize="16px"
            padding="12px 24px"
          >
            {isLoading ? t('analyzing') : t('analyze')}
          </Button>
        </SearchContainer>

        <StockInfo>
          <InfoCard>
            <InfoTitle>기본 정보</InfoTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>현재가</InfoLabel>
                <InfoValue>${currentPrice.toFixed(2)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>전일 대비</InfoLabel>
                <InfoValue style={{ color: '#27ae60' }}>+2.45%</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>거래량</InfoLabel>
                <InfoValue>{(stockData.length > 0 ? stockData[stockData.length - 1].volume : 0).toLocaleString()}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>시가총액</InfoLabel>
                <InfoValue>$2.8T</InfoValue>
              </InfoItem>
            </InfoGrid>
          </InfoCard>

          <InfoCard>
            <InfoTitle>기술적 지표</InfoTitle>
            <IndicatorsContainer>
              <IndicatorCard color={getRSIStatus(currentRSI).color}>
                <IndicatorValue color={getRSIStatus(currentRSI).color}>
                  {currentRSI.toFixed(1)}
                </IndicatorValue>
                <IndicatorLabel>RSI</IndicatorLabel>
                <IndicatorStatus color={getRSIStatus(currentRSI).color}>
                  {getRSIStatus(currentRSI).status}
                </IndicatorStatus>
              </IndicatorCard>
              
              <IndicatorCard color={getMACDStatus(currentMACD).color}>
                <IndicatorValue color={getMACDStatus(currentMACD).color}>
                  {currentMACD.toFixed(2)}
                </IndicatorValue>
                <IndicatorLabel>MACD</IndicatorLabel>
                <IndicatorStatus color={getMACDStatus(currentMACD).color}>
                  {getMACDStatus(currentMACD).status}
                </IndicatorStatus>
              </IndicatorCard>
            </IndicatorsContainer>
          </InfoCard>
        </StockInfo>

        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3498db" 
                strokeWidth={3}
                name="주가"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <NewsSection>
          <InfoTitle>관련 뉴스</InfoTitle>
          <NewsList>
            {sampleNews.map((news, index) => (
              <NewsItem key={index}>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsMeta>
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                  <span style={{ 
                    color: news.sentiment === 'positive' ? '#27ae60' : '#e74c3c',
                    fontWeight: '600'
                  }}>
                    {news.sentiment === 'positive' ? '긍정적' : '부정적'}
                  </span>
                </NewsMeta>
              </NewsItem>
            ))}
          </NewsList>
        </NewsSection>
      </Section>
    </StockAnalysisContainer>
  );
}

export default StockAnalysis;
