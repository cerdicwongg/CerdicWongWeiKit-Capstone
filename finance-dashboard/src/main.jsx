import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import App from './App';  
import { StockProvider } from './StockContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StockProvider>
    <App />
  </StockProvider>
);
