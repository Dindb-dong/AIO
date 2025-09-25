import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Button from './common/Button.jsx';
import OverlayLineChart from './OverlayLineChart.jsx';
import { useI18n } from '../i18n.jsx';

const ComparisonContainer = styled.div`
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

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

// Replaced local Button with common Button

const ViewToggle = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  margin-left: auto;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#2980b9' : '#e9ecef'};
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const OverlayChart = styled.div`
  height: 400px;
  margin: 20px 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const GridItem = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e0e0e0;
`;

const GridTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
  text-align: center;
`;

const GridChart = styled.div`
  height: 250px;
`;

const CorrelationSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const CorrelationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const CorrelationCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CorrelationValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    const value = Math.abs(props.value);
    if (value > 0.7) return '#e74c3c';
    if (value > 0.4) return '#f39c12';
    return '#27ae60';
  }};
  margin-bottom: 5px;
`;

const CorrelationLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

// 샘플 데이터 생성
const generateComparisonData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      stockPrice: 150 + Math.random() * 20 + i * 0.3,
      interestRate: 4.5 + Math.random() * 0.5,
      oilPrice: 70 + Math.random() * 10,
      goldPrice: 1800 + Math.random() * 100,
      inflation: 3.2 + Math.random() * 0.8,
      gdp: 2.1 + Math.random() * 0.5
    });
  }
  
  return data;
};

const stockOptions = [
  { value: 'AAPL', label: 'Apple (AAPL)' },
  { value: 'TSLA', label: 'Tesla (TSLA)' },
  { value: 'MSFT', label: 'Microsoft (MSFT)' },
  { value: 'GOOGL', label: 'Google (GOOGL)' },
  { value: 'AMZN', label: 'Amazon (AMZN)' }
];

const economicIndicators = [
  { value: 'interestRate', label: '기준금리' },
  { value: 'oilPrice', label: '유가 (WTI)' },
  { value: 'goldPrice', label: '금 가격' },
  { value: 'inflation', label: '인플레이션' },
  { value: 'gdp', label: 'GDP 성장률' }
];

function Comparison() {
  const { t } = useI18n();
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [selectedIndicators, setSelectedIndicators] = useState(['interestRate', 'oilPrice']);
  const [viewMode, setViewMode] = useState('overlay'); // 'overlay' or 'grid'
  const [useStandardize, setUseStandardize] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const sampleData = generateComparisonData();
    setData(sampleData);
  }, [selectedStock]);

  const handleIndicatorChange = (indicator) => {
    setSelectedIndicators(prev => {
      if (prev.includes(indicator)) {
        return prev.filter(item => item !== indicator);
      } else {
        return [...prev, indicator];
      }
    });
  };

  // Percent deviation from each series mid-mean ((max+min)/2)
  const transformToPercentDeviation = (source, keys) => {
    if (!Array.isArray(source) || source.length === 0) return source;
    const midMeans = {};
    keys.forEach(k => {
      const series = source.map(d => d[k]).filter(v => typeof v === 'number');
      const max = Math.max(...series);
      const min = Math.min(...series);
      const mid = (max + min) / 2;
      midMeans[k] = mid === 0 ? null : mid;
    });
    return source.map(item => {
      const next = { ...item };
      keys.forEach(k => {
        const v = item[k];
        const mid = midMeans[k];
        if (mid && typeof v === 'number') {
          next[k] = ((v - mid) / mid) * 100;
        }
      });
      return next;
    });
  };

  // Transform data for log scale
  const transformDataForLogScale = (source, keys) => {
    return source.map(item => {
      const next = { ...item };
      keys.forEach(k => {
        const v = item[k];
        if (typeof v === 'number' && v > 0) {
          next[k] = Math.log10(v);
        } else {
          next[k] = Math.log10(1e-6); // Very small value for log
        }
      });
      return next;
    });
  };

  const renderOverlayChart = () => {
    const seriesKeys = ["stockPrice", ...selectedIndicators];
    const chartData = useStandardize ? transformToPercentDeviation(data, seriesKeys) : data;
    const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
    const series = [
      { key: 'stockPrice', label: 'Price', color: colors[0] },
      ...selectedIndicators.map((indicator, index) => {
        const indicatorInfo = economicIndicators.find(ind => ind.value === indicator);
        return { key: indicator, label: indicatorInfo?.label, color: colors[(index + 1) % colors.length] };
      })
    ];
    return (
      <OverlayLineChart 
        data={chartData}
        series={series}
        xKey="date"
        percentageMode={useStandardize}
      />
    );
  };

  const renderGridCharts = () => {
    const seriesKeys = ["stockPrice", ...selectedIndicators];
    const chartData = useStandardize ? transformToPercentDeviation(data, seriesKeys) : data;
    
    return (
      <GridContainer>
        <GridItem>
          <GridTitle>주가 추이</GridTitle>
          <GridChart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (useLogScale) {
                      return [Math.pow(10, value).toFixed(2), name];
                    }
                    return [typeof value === 'number' ? value.toFixed(2) : value, name];
                  }}
                />
                <Line type="monotone" dataKey="stockPrice" stroke="#3498db" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GridChart>
        </GridItem>

        {selectedIndicators.map((indicator, index) => {
          const indicatorInfo = economicIndicators.find(ind => ind.value === indicator);
          const colors = ['#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
          
          return (
            <GridItem key={indicator}>
              <GridTitle>{indicatorInfo?.label}</GridTitle>
              <GridChart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["auto", "auto"]} tickFormatter={(v) => useStandardize ? `${v.toFixed(0)}%` : `${v}`} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (useStandardize) {
                          return [`${Number(value).toFixed(2)}%`, name];
                        }
                        return [typeof value === 'number' ? value.toFixed(2) : value, name];
                      }}
                    />
                    <YAxis domain={["auto", "auto"]} tickFormatter={(v) => useStandardize ? `${v.toFixed(0)}%` : `${v}`} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (useStandardize) {
                          return [`${Number(value).toFixed(2)}%`, name];
                        }
                        return [typeof value === 'number' ? value.toFixed(2) : value, name];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={indicator} 
                      stroke={colors[index % colors.length]} 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </GridChart>
            </GridItem>
          );
        })}
      </GridContainer>
    );
  };

  const correlations = [
    { indicator: '기준금리', value: -0.65 },
    { indicator: '유가', value: 0.42 },
    { indicator: '금 가격', value: 0.38 },
    { indicator: '인플레이션', value: -0.23 },
    { indicator: 'GDP 성장률', value: 0.71 }
  ];

  return (
    <ComparisonContainer>
      <Section>
        <SectionTitle>{t('comparison_title')}</SectionTitle>
        
        <ControlsContainer>
          <Select 
            value={selectedStock} 
            onChange={(e) => setSelectedStock(e.target.value)}
          >
            {stockOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <span style={{ color: '#7f8c8d', fontWeight: '500' }}>Indicators:</span>
          {economicIndicators.map(indicator => (
            <Button
              key={indicator.value}
              background={selectedIndicators.includes(indicator.value) ? '#27ae60' : '#95a5a6'}
              fontSize="12px"
              padding="6px 12px"
              onClick={() => handleIndicatorChange(indicator.value)}
            >
              {indicator.label}
            </Button>
          ))}

          <Button 
            onClick={() => setUseStandardize(!useStandardize)}
            background={useStandardize ? '#27ae60' : '#e67e22'}
            fontSize="12px"
            padding="8px 16px"
            help
            helpText="표준화(퍼센트 편차) 보기 전환"
          >
              {useStandardize ? t('standardize_off') : t('standardize_on')}
          </Button>

          <ViewToggle>
            <ToggleButton 
              active={viewMode === 'overlay'} 
              onClick={() => setViewMode('overlay')}
            >
              {t('overlay')}
            </ToggleButton>
            <ToggleButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              {t('grid')}
            </ToggleButton>
          </ViewToggle>
        </ControlsContainer>

        {viewMode === 'overlay' ? (
          <OverlayChart>
            {renderOverlayChart()}
          </OverlayChart>
        ) : (
          renderGridCharts()
        )}

        <CorrelationSection>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>{t('correlations')}</h3>
          <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '15px' }}>
            {selectedStock} 주가와 주요 경제 지표 간의 상관관계
          </p>
          <CorrelationGrid>
            {correlations.map((corr, index) => (
              <CorrelationCard key={index}>
                <CorrelationValue value={corr.value}>
                  {corr.value > 0 ? '+' : ''}{corr.value.toFixed(2)}
                </CorrelationValue>
                <CorrelationLabel>{corr.indicator}</CorrelationLabel>
              </CorrelationCard>
            ))}
          </CorrelationGrid>
        </CorrelationSection>
      </Section>
    </ComparisonContainer>
  );
}

export default Comparison;
