import React from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #7f8c8d;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #2c3e50;
  }
`;

const ModalBody = styled.div`
  padding: 25px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
`;

const VariableList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
`;

const VariableItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const VariableName = styled.div`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #e74c3c;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const VariableDescription = styled.div`
  font-size: 0.9rem;
  color: #495057;
  line-height: 1.5;
`;

const CodeExample = styled.div`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin: 15px 0;
  overflow-x: auto;
`;

const FunctionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FunctionItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const FunctionName = styled.div`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #27ae60;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const FunctionDescription = styled.div`
  font-size: 0.9rem;
  color: #495057;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const FunctionParams = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  background: #e9ecef;
  padding: 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 8px;
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  color: #424242;
  line-height: 1.5;
`;

function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dataVariables = [
    {
      name: 'data[\'close\']',
      description: '종목의 종가 데이터 (가장 기본적인 가격 데이터)'
    },
    {
      name: 'data[\'open\']',
      description: '종목의 시가 데이터'
    },
    {
      name: 'data[\'high\']',
      description: '종목의 고가 데이터'
    },
    {
      name: 'data[\'low\']',
      description: '종목의 저가 데이터'
    },
    {
      name: 'data[\'volume\']',
      description: '종목의 거래량 데이터'
    },
    {
      name: 'data[\'ma5\']',
      description: '5일 이동평균선 (자동 계산됨)'
    },
    {
      name: 'data[\'ma20\']',
      description: '20일 이동평균선 (자동 계산됨)'
    },
    {
      name: 'data[\'ma100\']',
      description: '100일 이동평균선 (자동 계산됨)'
    }
  ];

  const signalVariables = [
    {
      name: 'data[\'signal\']',
      description: '매수/매도 신호 (1: 매수, -1: 매도, 0: 관망)'
    },
    {
      name: 'data[\'position\']',
      description: '현재 포지션 상태 (1: 매수 포지션, 0: 현금)'
    }
  ];

  const functions = [
    {
      name: 'data[\'close\'].rolling(n).mean()',
      description: 'n일 이동평균선 계산',
      params: 'n: 기간 (예: 5, 20, 100)'
    },
    {
      name: 'data[\'close\'].rolling(n).std()',
      description: 'n일 표준편차 계산',
      params: 'n: 기간'
    },
    {
      name: 'data[\'close\'].pct_change()',
      description: '전일 대비 수익률 계산',
      params: '없음'
    },
    {
      name: 'data[\'close\'].shift(n)',
      description: 'n일 전 데이터 참조',
      params: 'n: 이전 일수'
    }
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>백테스팅 변수 및 함수 가이드</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <InfoBox>
            <InfoTitle>💡 기본 구조</InfoTitle>
            <InfoText>
              모든 백테스팅 전략은 <code>strategy(data)</code> 함수로 정의해야 합니다. 
              이 함수는 주가 데이터를 받아서 매수/매도 신호를 생성하고 반환합니다.
            </InfoText>
          </InfoBox>

          <Section>
            <SectionTitle>📊 데이터 변수</SectionTitle>
            <VariableList>
              {dataVariables.map((variable, index) => (
                <VariableItem key={index}>
                  <VariableName>{variable.name}</VariableName>
                  <VariableDescription>{variable.description}</VariableDescription>
                </VariableItem>
              ))}
            </VariableList>
          </Section>

          <Section>
            <SectionTitle>🎯 신호 변수</SectionTitle>
            <VariableList>
              {signalVariables.map((variable, index) => (
                <VariableItem key={index}>
                  <VariableName>{variable.name}</VariableName>
                  <VariableDescription>{variable.description}</VariableDescription>
                </VariableItem>
              ))}
            </VariableList>
          </Section>

          <Section>
            <SectionTitle>🔧 주요 함수</SectionTitle>
            <FunctionList>
              {functions.map((func, index) => (
                <FunctionItem key={index}>
                  <FunctionName>{func.name}</FunctionName>
                  <FunctionDescription>{func.description}</FunctionDescription>
                  <FunctionParams>매개변수: {func.params}</FunctionParams>
                </FunctionItem>
              ))}
            </FunctionList>
          </Section>

          <Section>
            <SectionTitle>📝 예시 코드</SectionTitle>
            <CodeExample>
{`def strategy(data):
    """
    이동평균선 골든크로스 전략
    """
    # 이동평균선 계산
    data['ma5'] = data['close'].rolling(5).mean()
    data['ma20'] = data['close'].rolling(20).mean()
    
    # 매수/매도 신호 생성
    data['signal'] = 0
    data.loc[data['ma5'] > data['ma20'], 'signal'] = 1  # 매수
    data.loc[data['ma5'] < data['ma20'], 'signal'] = -1  # 매도
    
    return data`}
            </CodeExample>
          </Section>

          <InfoBox>
            <InfoTitle>⚠️ 주의사항</InfoTitle>
            <InfoText>
              • <code>signal</code> 변수는 반드시 1(매수), -1(매도), 0(관망) 중 하나의 값이어야 합니다.<br/>
              • 함수 마지막에 <code>return data</code>를 반드시 포함해야 합니다.<br/>
              • 데이터는 pandas DataFrame 형태로 제공됩니다.
            </InfoText>
          </InfoBox>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default HelpModal;
