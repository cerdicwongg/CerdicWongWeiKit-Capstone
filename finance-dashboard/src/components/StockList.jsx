import React, { useContext } from 'react';
import { AllStockList } from '../AllStockList';

const StockList = () => {
  const { stocks } = useContext(AllStockList);

  return (
    <div>
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => {
              const profitLoss = (stock.currentPrice - stock.price) * stock.quantity;
              const isProfit = profitLoss > 0;

              return (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price}</td>
                  <td>{stock.currentPrice}</td>
                  <td className={isProfit ? 'profit' : 'loss'}>
                    {isProfit ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockList;
