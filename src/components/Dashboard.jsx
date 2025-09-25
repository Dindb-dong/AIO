import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Button from './common/Button.jsx';
import OverlayLineChart from './OverlayLineChart.jsx';
import { useI18n } from '../i18n.jsx';

const DashboardContainer = styled.div`
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

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const MetricCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color || '#3498db'} 0%, ${props => props.color2 || '#2980b9'} 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 5px;
`;

const MetricChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#2ecc71' : '#e74c3c'};
  font-weight: 600;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-top: 20px;
`;

const IndicatorSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const IndicatorButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e0e0e0'};
  background: ${props => props.selected ? '#3498db' : 'white'};
  color: ${props => props.selected ? 'white' : '#7f8c8d'};
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
    color: #3498db;
  }
`;

// 샘플 데이터 생성 함수
const generateMarketData = (days = 30) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sp500: 4500 + Math.random() * 200 + i * 2,
      nasdaq: 14000 + Math.random() * 500 + i * 5,
      dow: 34000 + Math.random() * 1000 + i * 10,
      gold: 1900 + Math.random() * 100 + i * 1,
      oil: 70 + Math.random() * 10 + i * 0.1,
      bitcoin: 30000 + Math.random() * 10000 + i * 100,
      vix: 15 + Math.random() * 10 + i * 0.05,
      aapl: 150 + Math.random() * 20 + i * 0.2,
      msft: 300 + Math.random() * 30 + i * 0.3,
      googl: 120 + Math.random() * 15 + i * 0.15,
      tsla: 200 + Math.random() * 50 + i * 0.5
    });
  }
  
  return data;
};

const marketIndicators = [
  { key: 'sp500', label: 'S&P 500', color: '#3498db' },
  { key: 'nasdaq', label: 'NASDAQ', color: '#e74c3c' },
  { key: 'dow', label: 'DOW', color: '#27ae60' },
  { key: 'gold', label: '금', color: '#f39c12' },
  { key: 'oil', label: '유가(WTI)', color: '#9b59b6' },
  { key: 'bitcoin', label: '비트코인', color: '#e67e22' },
  { key: 'vix', label: 'VIX', color: '#1abc9c' },
  { key: 'aapl', label: 'Apple', color: '#34495e' },
  { key: 'msft', label: 'Microsoft', color: '#2c3e50' },
  { key: 'googl', label: 'Google', color: '#16a085' },
  { key: 'tsla', label: 'Tesla', color: '#8e44ad' }
];

function Dashboard() {
  const { t } = useI18n();
  const [timeframe, setTimeframe] = useState('1M');
  const [selectedIndicators, setSelectedIndicators] = useState(['sp500', 'nasdaq', 'gold', 'bitcoin']);
  const [data, setData] = useState([]);

  useEffect(() => {
    const days = timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : timeframe === '6M' ? 180 : 365;
    const sampleData = generateMarketData(days);
    setData(sampleData);
  }, [timeframe]);

  const timeframes = [
    { label: t('timeframe_1m'), value: '1M' },
    { label: t('timeframe_3m'), value: '3M' },
    { label: t('timeframe_6m'), value: '6M' },
    { label: t('timeframe_1y'), value: '1Y' }
  ];

  const toggleIndicator = (indicator) => {
    setSelectedIndicators(prev => {
      if (prev.includes(indicator)) {
        return prev.filter(item => item !== indicator);
      } else {
        return [...prev, indicator];
      }
    });
  };

  const getCurrentValue = (indicator) => {
    return data.length > 0 ? data[data.length - 1][indicator] : 0;
  };

  const getChange = (indicator) => {
    if (data.length < 2) return { value: 0, positive: true };
    const current = data[data.length - 1][indicator];
    const previous = data[data.length - 2][indicator];
    const change = ((current - previous) / previous) * 100;
    return { value: change, positive: change >= 0 };
  };

  const [useStandardize, setUseStandardize] = useState(false);

  // Compute percent deviation from mid-mean ((max+min)/2) per series
  const transformToPercentDeviation = (source) => {
    if (!Array.isArray(source) || source.length === 0) return source;
    // Pre-compute mid-mean per selected indicator
    const midMeans = {};
    selectedIndicators.forEach(key => {
      const series = source.map(d => d[key]).filter(v => typeof v === 'number');
      const max = Math.max(...series);
      const min = Math.min(...series);
      const mid = (max + min) / 2;
      midMeans[key] = mid === 0 ? null : mid;
    });
    return source.map(item => {
      const next = { ...item };
      selectedIndicators.forEach(key => {
        const v = item[key];
        const mid = midMeans[key];
        if (mid && typeof v === 'number') {
          next[key] = ((v - mid) / mid) * 100;
        }
      });
      return next;
    });
  };

  // (removed log transform; using percent deviation standardization instead)

  const renderChart = () => {
    const lines = selectedIndicators.map((indicator, index) => {
      const indicatorInfo = marketIndicators.find(ind => ind.key === indicator);
      const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#2c3e50', '#16a085', '#8e44ad'];
      
      return (
        <Line 
          key={indicator}
          type="monotone" 
          dataKey={indicator} 
          stroke={colors[index % colors.length]} 
          strokeWidth={2}
          name={indicatorInfo?.label}
          dot={false}
        />
      );
    });

    const chartData = useStandardize ? transformToPercentDeviation(data) : data;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} tickFormatter={(v) => useStandardize ? `${v.toFixed(0)}%` : `${v}`}/>
          <Tooltip 
            formatter={(value, name) => {
              if (useStandardize) {
                return [`${Number(value).toFixed(2)}%`, name];
              }
              return [typeof value === 'number' ? value.toFixed(2) : value, name];
            }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <DashboardContainer>
      <Section>
        <SectionTitle>{t('dashboard_title')}</SectionTitle>
        
        <ControlsContainer>
          <Select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </Select>
          
          <Button onClick={() => setSelectedIndicators(['sp500', 'nasdaq', 'gold', 'bitcoin'])}
            help
            helpText="대표 4개 지표로 빠르게 전환"
          >
            {t('preset_default')}
          </Button>
          <Button onClick={() => setSelectedIndicators(marketIndicators.map(ind => ind.key))}
            help
            helpText="모든 지표를 한 번에 선택"
          >
            {t('preset_all')}
          </Button>
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
        </ControlsContainer>

        <IndicatorSelector>
          {marketIndicators.map(indicator => (
            <IndicatorButton
              key={indicator.key}
              selected={selectedIndicators.includes(indicator.key)}
              onClick={() => toggleIndicator(indicator.key)}
            >
              {indicator.label}
            </IndicatorButton>
          ))}
        </IndicatorSelector>
        
        <MetricsGrid>
          {selectedIndicators.map(indicator => {
            const indicatorInfo = marketIndicators.find(ind => ind.key === indicator);
            const currentValue = getCurrentValue(indicator);
            const change = getChange(indicator);
            
            return (
              <MetricCard 
                key={indicator}
                color={indicatorInfo?.color}
                color2={indicatorInfo?.color}
                onClick={() => toggleIndicator(indicator)}
              >
                <MetricValue>
                  {indicator === 'bitcoin' ? `$${currentValue.toLocaleString()}` : 
                   indicator === 'gold' ? `$${currentValue.toFixed(0)}` :
                   indicator === 'oil' ? `$${currentValue.toFixed(1)}` :
                   currentValue.toLocaleString()}
                </MetricValue>
                <MetricLabel>{indicatorInfo?.label}</MetricLabel>
                <MetricChange positive={change.positive}>
                  {change.positive ? '+' : ''}{change.value.toFixed(2)}%
                </MetricChange>
              </MetricCard>
            );
          })}
        </MetricsGrid>
      </Section>

      <Section>
        <SectionTitle>{t('selected_series_title')}</SectionTitle>
        <ChartContainer>
          <OverlayLineChart 
            data={useStandardize ? transformToPercentDeviation(data) : data}
            series={selectedIndicators.map((indicator, index) => {
              const indicatorInfo = marketIndicators.find(ind => ind.key === indicator);
              const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#2c3e50', '#16a085', '#8e44ad'];
              return {
                key: indicator,
                label: indicatorInfo?.label,
                color: colors[index % colors.length]
              };
            })}
            xKey="date"
            percentageMode={useStandardize}
          />
        </ChartContainer>
      </Section>
    </DashboardContainer>
  );
}

export default Dashboard;
