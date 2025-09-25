import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './i18n.jsx';
import { ThemeProvider } from './theme.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <LanguageProvider defaultLang="en">
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
