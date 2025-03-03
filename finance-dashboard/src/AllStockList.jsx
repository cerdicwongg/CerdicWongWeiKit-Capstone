import React, { createContext, useState } from 'react';

export const AllStockList = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  const addStock = (stock) => {
    setStocks((prevStocks) => [...prevStocks, stock]);
  };

  return (
    <AllStockList.Provider value={{ stocks, addStock }}>
      {children}
    </AllStockList.Provider>
  );
};
