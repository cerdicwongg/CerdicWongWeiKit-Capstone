// src/App.jsx
import React from 'react';
import './App.css';
import { StockProvider } from './AllStockList.jsx';
import StockForm from './components/StockForm.jsx';
import StockList from './components/StockList.jsx';

function App() {
  return (
    <StockProvider>
      <div className="app-container">
        <h1>Finance Dashboard <img src="finance-image.png" alt="Finance Image" height="32" width="32" /></h1>
        <StockForm />
        <StockList />
      </div>
    </StockProvider>
  );
}

export default App;
