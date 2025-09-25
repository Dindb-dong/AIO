import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    app_title: 'AIO Finance Lab',
    app_subtitle: 'All-in-One Financial Analytics Platform',
    nav_dashboard: 'Dashboard',
    nav_backtesting: 'Backtesting',
    nav_stock: 'Stock Analysis',
    nav_comparison: 'Comparison',
    nav_learning: 'Learning',
    nav_mypage: 'My Page',

    dashboard_title: 'Market Dashboard',
    timeframe_1m: '1M',
    timeframe_3m: '3M',
    timeframe_6m: '6M',
    timeframe_1y: '1Y',
    preset_default: 'Default',
    preset_all: 'Select All',
    standardize_on: 'Standardized (±%)',
    standardize_off: 'Original Values',
    selected_series_title: 'Selected Series',

    comparison_title: 'Comparison',
    overlay: 'Overlay',
    grid: 'Grid',
    correlations: 'Correlation Analysis',

    stock_title: 'Stock Analysis',
    stock_search_placeholder: 'Enter a ticker (e.g., AAPL, TSLA, MSFT)',
    analyze: 'Analyze',
    analyzing: 'Analyzing...'
  },
  ko: {
    app_title: 'AIO Finance Lab',
    app_subtitle: 'All-in-One 금융 분석 플랫폼',
    nav_dashboard: '대시보드',
    nav_backtesting: '백테스팅',
    nav_stock: '주식 분석',
    nav_comparison: '비교 분석',
    nav_learning: '학습',
    nav_mypage: '마이페이지',

    dashboard_title: '시장 대시보드',
    timeframe_1m: '1개월',
    timeframe_3m: '3개월',
    timeframe_6m: '6개월',
    timeframe_1y: '1년',
    preset_default: '기본 설정',
    preset_all: '전체 선택',
    standardize_on: '표준화 (±%)',
    standardize_off: '원본 값',
    selected_series_title: '선택된 지표 추이',

    comparison_title: '비교 분석',
    overlay: '오버레이',
    grid: '그리드',
    correlations: '상관관계 분석',

    stock_title: '주식 분석',
    stock_search_placeholder: '주식 심볼을 입력하세요 (예: AAPL, TSLA, MSFT)',
    analyze: '분석 시작',
    analyzing: '분석 중...'
  }
};

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const [lang, setLang] = useState(defaultLang);
  const t = useMemo(() => (key) => translations[lang]?.[key] ?? key, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}


