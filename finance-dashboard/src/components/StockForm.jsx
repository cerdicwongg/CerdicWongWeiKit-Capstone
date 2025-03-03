import React, { useState, useContext } from 'react';
import { AllStockList } from '../AllStockList';

const StockForm = () => {
  const { addStock } = useContext(AllStockList);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before submission
    setError('');

    // Input validation for quantity and price
    if (quantity <= 0 || isNaN(quantity)) {
      setError('Quantity must be a positive number.');
      return;
    }

    if (price <= 0 || isNaN(price)) {
      setError('Purchase price must be a positive number.');
      return;
    }

    const apiKey = 'KW7GTMKGG60VGQFT';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data["Global Quote"]) {
        const currentPrice = parseFloat(data["Global Quote"]["05. price"]);
        addStock({
          symbol,
          quantity,
          price,
          currentPrice,
        });

        // Reset form fields after successful submission
        setSymbol('');
        setQuantity('');
        setPrice('');
      } else {
        setError('Invalid stock symbol or data not found');
      }
    } catch (error) {
      setError('Error fetching stock data');
    }
  };

  return (
    <div className="stock-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Stock Symbol"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Purchase Price"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default StockForm;
