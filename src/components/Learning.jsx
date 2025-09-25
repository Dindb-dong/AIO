import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button.jsx';

const LearningContainer = styled.div`
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

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  
  &:hover {
    background: ${props => props.active ? '#2980b9' : '#f8f9fa'};
  }
`;

const ContentArea = styled.div`
  min-height: 400px;
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const HistoryCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const HistoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const HistoryPeriod = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const HistoryDescription = styled.p`
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const HistoryTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FAQItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 15px 20px;
  background: #f8f9fa;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #e9ecef;
  }
`;

const FAQAnswer = styled.div`
  padding: 20px;
  background: white;
  color: #5a6c7d;
  line-height: 1.6;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

// Replaced local SearchButton with common Button

const financialHistory = [
  {
    id: 1,
    title: "닷컴 버블 (2000년)",
    period: "1995-2001",
    description: "인터넷 기업들의 과도한 기대와 투자로 인한 주식 시장 거품과 그 붕괴 과정을 분석합니다.",
    tags: ["기술주", "거품", "인터넷", "주식시장"]
  },
  {
    id: 2,
    title: "서브프라임 모기지 사태 (2008년)",
    period: "2007-2009",
    description: "부동산 거품과 금융 파생상품의 연쇄 반응으로 발생한 글로벌 금융위기를 다룹니다.",
    tags: ["부동산", "금융위기", "은행", "부채"]
  },
  {
    id: 3,
    title: "오일 쇼크 (1973년)",
    period: "1973-1974",
    description: "중동 전쟁으로 인한 석유 공급 중단과 그에 따른 경제적 파급효과를 분석합니다.",
    tags: ["석유", "에너지", "인플레이션", "경제위기"]
  },
  {
    id: 4,
    title: "대공황 (1929년)",
    period: "1929-1939",
    description: "20세기 최악의 경제 위기로 불리는 대공황의 원인과 극복 과정을 살펴봅니다.",
    tags: ["대공황", "경제위기", "뉴딜", "복구"]
  },
  {
    id: 5,
    title: "아시아 금융위기 (1997년)",
    period: "1997-1998",
    description: "태국 바트화 폭락으로 시작된 아시아 지역의 연쇄적 금융위기를 분석합니다.",
    tags: ["아시아", "외환위기", "IMF", "구제금융"]
  },
  {
    id: 6,
    title: "코로나19 팬데믹 (2020년)",
    period: "2020-2021",
    description: "전 세계적 팬데믹이 금융시장과 경제에 미친 영향과 정부의 대응을 다룹니다.",
    tags: ["팬데믹", "경기부양", "양적완화", "디지털화"]
  }
];

const faqData = [
  {
    question: "RSI란 무엇인가요?",
    answer: "RSI(Relative Strength Index)는 주가의 과매수/과매도 상태를 판단하는 기술적 지표입니다. 0-100 사이의 값으로 표시되며, 일반적으로 70 이상이면 과매수, 30 이하면 과매도로 판단합니다."
  },
  {
    question: "MACD는 어떻게 해석하나요?",
    answer: "MACD(Moving Average Convergence Divergence)는 두 개의 지수이동평균선의 차이를 나타내는 지표입니다. MACD 선이 시그널 선을 상향돌파하면 매수 신호, 하향돌파하면 매도 신호로 해석됩니다."
  },
  {
    question: "볼린저 밴드의 활용법은?",
    answer: "볼린저 밴드는 이동평균선을 중심으로 상하 2표준편차 범위를 표시합니다. 주가가 상단 밴드에 닿으면 과매수, 하단 밴드에 닿으면 과매도로 판단하며, 밴드 폭이 좁아지면 변동성 증가를 예상할 수 있습니다."
  },
  {
    question: "백테스팅이란 무엇인가요?",
    answer: "백테스팅은 과거 데이터를 사용하여 투자 전략의 성과를 시뮬레이션하는 방법입니다. 실제 투자 전에 전략의 유효성을 검증하고 위험을 평가할 수 있는 중요한 도구입니다."
  },
  {
    question: "샤프 비율은 어떻게 계산되나요?",
    answer: "샤프 비율은 (포트폴리오 수익률 - 무위험 수익률) / 포트폴리오 변동성으로 계산됩니다. 이 값이 높을수록 위험 대비 수익률이 우수한 전략으로 평가됩니다."
  }
];

function Learning() {
  const [activeTab, setActiveTab] = useState('history');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredHistory = financialHistory.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LearningContainer>
      <Section>
        <SectionTitle>금융 학습 센터</SectionTitle>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            📚 금융 역사
          </Tab>
          <Tab 
            active={activeTab === 'faq'} 
            onClick={() => setActiveTab('faq')}
          >
            ❓ 용어 설명
          </Tab>
        </TabContainer>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button fontSize="16px" padding="12px 24px">검색</Button>
        </SearchContainer>

        <ContentArea>
          {activeTab === 'history' && (
            <HistoryGrid>
              {filteredHistory.map(item => (
                <HistoryCard key={item.id}>
                  <HistoryTitle>{item.title}</HistoryTitle>
                  <HistoryPeriod>{item.period}</HistoryPeriod>
                  <HistoryDescription>{item.description}</HistoryDescription>
                  <HistoryTags>
                    {item.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </HistoryTags>
                </HistoryCard>
              ))}
            </HistoryGrid>
          )}

          {activeTab === 'faq' && (
            <FAQContainer>
              {filteredFAQ.map((item, index) => (
                <FAQItem key={index}>
                  <FAQQuestion onClick={() => toggleFAQ(index)}>
                    {item.question}
                    <span>{openFAQ === index ? '−' : '+'}</span>
                  </FAQQuestion>
                  <FAQAnswer isOpen={openFAQ === index}>
                    {item.answer}
                  </FAQAnswer>
                </FAQItem>
              ))}
            </FAQContainer>
          )}
        </ContentArea>
      </Section>
    </LearningContainer>
  );
}

export default Learning;
