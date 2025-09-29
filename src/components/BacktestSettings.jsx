import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const SettingGroup = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const SettingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SettingLabel = styled.label`
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
`;

const SettingInput = styled.input`
  width: 80px;
  padding: 6px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const SettingSelect = styled.select`
  width: 100px;
  padding: 6px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 5px;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const PresetButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const PresetButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #3498db;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#3498db'};
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3498db;
    color: white;
  }
`;

function BacktestSettings() {
  const [settings, setSettings] = useState({
    // MACD 설정
    macd: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    // 엔벨로프 설정
    envelope: {
      period: 20,
      deviation: 2.0
    },
    // 이격도 설정
    displacement: {
      period: 20,
      threshold: 100
    },
    // RSI 설정
    rsi: {
      period: 14,
      overbought: 70,
      oversold: 30
    },
    // 볼린저 밴드 설정
    bollinger: {
      period: 20,
      deviation: 2.0
    },
    // 스토캐스틱 설정
    stochastic: {
      kPeriod: 14,
      dPeriod: 3,
      overbought: 80,
      oversold: 20
    },
    // 윌리엄스 %R 설정
    williams: {
      period: 14,
      overbought: -20,
      oversold: -80
    }
  });

  const [activePreset, setActivePreset] = useState('conservative');

  const presets = {
    conservative: {
      name: '보수적',
      description: '안정적인 매매를 위한 설정',
      settings: {
        macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
        envelope: { period: 20, deviation: 2.0 },
        displacement: { period: 20, threshold: 100 },
        rsi: { period: 14, overbought: 70, oversold: 30 },
        bollinger: { period: 20, deviation: 2.0 },
        stochastic: { kPeriod: 14, dPeriod: 3, overbought: 80, oversold: 20 },
        williams: { period: 14, overbought: -20, oversold: -80 }
      }
    },
    aggressive: {
      name: '공격적',
      description: '빠른 신호를 위한 설정',
      settings: {
        macd: { fastPeriod: 8, slowPeriod: 21, signalPeriod: 5 },
        envelope: { period: 14, deviation: 1.5 },
        displacement: { period: 14, threshold: 100 },
        rsi: { period: 10, overbought: 75, oversold: 25 },
        bollinger: { period: 14, deviation: 1.5 },
        stochastic: { kPeriod: 10, dPeriod: 3, overbought: 85, oversold: 15 },
        williams: { period: 10, overbought: -15, oversold: -85 }
      }
    },
    balanced: {
      name: '균형',
      description: '균형잡힌 매매를 위한 설정',
      settings: {
        macd: { fastPeriod: 10, slowPeriod: 24, signalPeriod: 7 },
        envelope: { period: 18, deviation: 1.8 },
        displacement: { period: 18, threshold: 100 },
        rsi: { period: 12, overbought: 72, oversold: 28 },
        bollinger: { period: 18, deviation: 1.8 },
        stochastic: { kPeriod: 12, dPeriod: 3, overbought: 82, oversold: 18 },
        williams: { period: 12, overbought: -18, oversold: -82 }
      }
    }
  };

  const handleSettingChange = (indicator, field, value) => {
    setSettings(prev => ({
      ...prev,
      [indicator]: {
        ...prev[indicator],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const applyPreset = (presetName) => {
    setActivePreset(presetName);
    setSettings(prev => ({
      ...prev,
      ...presets[presetName].settings
    }));
  };

  const resetToDefault = () => {
    setSettings({
      macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
      envelope: { period: 20, deviation: 2.0 },
      displacement: { period: 20, threshold: 100 },
      rsi: { period: 14, overbought: 70, oversold: 30 },
      bollinger: { period: 20, deviation: 2.0 },
      stochastic: { kPeriod: 14, dPeriod: 3, overbought: 80, oversold: 20 },
      williams: { period: 14, overbought: -20, oversold: -80 }
    });
    setActivePreset('conservative');
  };

  const saveSettings = () => {
    localStorage.setItem('backtestSettings', JSON.stringify(settings));
    alert('설정이 저장되었습니다.');
  };

  return (
    <SettingsContainer>
      <Section>
        <SectionTitle>백테스팅 지표 설정</SectionTitle>
        
        <PresetButtons>
          {Object.entries(presets).map(([key, preset]) => (
            <PresetButton
              key={key}
              active={activePreset === key}
              onClick={() => applyPreset(key)}
            >
              {preset.name}
            </PresetButton>
          ))}
        </PresetButtons>

        <SettingsGrid>
          {/* MACD 설정 */}
          <SettingGroup>
            <SettingTitle>MACD (이동평균 수렴확산)</SettingTitle>
            <SettingRow>
              <SettingLabel>빠른 기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.macd.fastPeriod}
                onChange={(e) => handleSettingChange('macd', 'fastPeriod', e.target.value)}
                min="1"
                max="50"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>느린 기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.macd.slowPeriod}
                onChange={(e) => handleSettingChange('macd', 'slowPeriod', e.target.value)}
                min="1"
                max="100"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>시그널 기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.macd.signalPeriod}
                onChange={(e) => handleSettingChange('macd', 'signalPeriod', e.target.value)}
                min="1"
                max="20"
              />
            </SettingRow>
            <Description>
              MACD는 두 이동평균선의 차이를 나타내는 지표입니다. 빠른 기간이 느린 기간보다 작아야 합니다.
            </Description>
          </SettingGroup>

          {/* 엔벨로프 설정 */}
          <SettingGroup>
            <SettingTitle>엔벨로프</SettingTitle>
            <SettingRow>
              <SettingLabel>기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.envelope.period}
                onChange={(e) => handleSettingChange('envelope', 'period', e.target.value)}
                min="1"
                max="100"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>편차율 (%)</SettingLabel>
              <SettingInput
                type="number"
                step="0.1"
                value={settings.envelope.deviation}
                onChange={(e) => handleSettingChange('envelope', 'deviation', e.target.value)}
                min="0.1"
                max="10"
              />
            </SettingRow>
            <Description>
              이동평균선을 중심으로 상하로 일정 비율의 밴드를 그리는 지표입니다.
            </Description>
          </SettingGroup>

          {/* 이격도 설정 */}
          <SettingGroup>
            <SettingTitle>이격도</SettingTitle>
            <SettingRow>
              <SettingLabel>기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.displacement.period}
                onChange={(e) => handleSettingChange('displacement', 'period', e.target.value)}
                min="1"
                max="100"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>기준선</SettingLabel>
              <SettingInput
                type="number"
                value={settings.displacement.threshold}
                onChange={(e) => handleSettingChange('displacement', 'threshold', e.target.value)}
                min="50"
                max="200"
              />
            </SettingRow>
            <Description>
              현재가가 이동평균선에서 얼마나 떨어져 있는지를 백분율로 나타내는 지표입니다.
            </Description>
          </SettingGroup>

          {/* RSI 설정 */}
          <SettingGroup>
            <SettingTitle>RSI (상대강도지수)</SettingTitle>
            <SettingRow>
              <SettingLabel>기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.rsi.period}
                onChange={(e) => handleSettingChange('rsi', 'period', e.target.value)}
                min="1"
                max="50"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매수 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.rsi.overbought}
                onChange={(e) => handleSettingChange('rsi', 'overbought', e.target.value)}
                min="60"
                max="90"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매도 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.rsi.oversold}
                onChange={(e) => handleSettingChange('rsi', 'oversold', e.target.value)}
                min="10"
                max="40"
              />
            </SettingRow>
            <Description>
              0-100 사이의 값으로 과매수/과매도 상태를 판단하는 지표입니다.
            </Description>
          </SettingGroup>

          {/* 볼린저 밴드 설정 */}
          <SettingGroup>
            <SettingTitle>볼린저 밴드</SettingTitle>
            <SettingRow>
              <SettingLabel>기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.bollinger.period}
                onChange={(e) => handleSettingChange('bollinger', 'period', e.target.value)}
                min="1"
                max="100"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>표준편차</SettingLabel>
              <SettingInput
                type="number"
                step="0.1"
                value={settings.bollinger.deviation}
                onChange={(e) => handleSettingChange('bollinger', 'deviation', e.target.value)}
                min="0.5"
                max="5"
              />
            </SettingRow>
            <Description>
              이동평균선을 중심으로 표준편차를 이용해 상하 밴드를 그리는 지표입니다.
            </Description>
          </SettingGroup>

          {/* 스토캐스틱 설정 */}
          <SettingGroup>
            <SettingTitle>스토캐스틱</SettingTitle>
            <SettingRow>
              <SettingLabel>%K 기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.stochastic.kPeriod}
                onChange={(e) => handleSettingChange('stochastic', 'kPeriod', e.target.value)}
                min="1"
                max="50"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>%D 기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.stochastic.dPeriod}
                onChange={(e) => handleSettingChange('stochastic', 'dPeriod', e.target.value)}
                min="1"
                max="20"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매수 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.stochastic.overbought}
                onChange={(e) => handleSettingChange('stochastic', 'overbought', e.target.value)}
                min="70"
                max="95"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매도 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.stochastic.oversold}
                onChange={(e) => handleSettingChange('stochastic', 'oversold', e.target.value)}
                min="5"
                max="30"
              />
            </SettingRow>
            <Description>
              현재가가 일정 기간 내 고가-저가 범위에서 어느 위치에 있는지를 나타내는 지표입니다.
            </Description>
          </SettingGroup>

          {/* 윌리엄스 %R 설정 */}
          <SettingGroup>
            <SettingTitle>윌리엄스 %R</SettingTitle>
            <SettingRow>
              <SettingLabel>기간</SettingLabel>
              <SettingInput
                type="number"
                value={settings.williams.period}
                onChange={(e) => handleSettingChange('williams', 'period', e.target.value)}
                min="1"
                max="50"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매수 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.williams.overbought}
                onChange={(e) => handleSettingChange('williams', 'overbought', e.target.value)}
                min="-30"
                max="0"
              />
            </SettingRow>
            <SettingRow>
              <SettingLabel>과매도 기준</SettingLabel>
              <SettingInput
                type="number"
                value={settings.williams.oversold}
                onChange={(e) => handleSettingChange('williams', 'oversold', e.target.value)}
                min="-100"
                max="-70"
              />
            </SettingRow>
            <Description>
              -100에서 0 사이의 값으로 과매수/과매도 상태를 판단하는 지표입니다.
            </Description>
          </SettingGroup>
        </SettingsGrid>

        <ActionButtons>
          <Button 
            background="#95a5a6" 
            onClick={resetToDefault}
            help
            helpText="모든 설정을 기본값으로 되돌립니다."
          >
            기본값으로 리셋
          </Button>
          <Button 
            background="#27ae60" 
            onClick={saveSettings}
            help
            helpText="현재 설정을 저장합니다."
          >
            설정 저장
          </Button>
        </ActionButtons>
      </Section>
    </SettingsContainer>
  );
}

export default BacktestSettings;
