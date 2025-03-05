import React, { useState, useContext } from 'react';
import { StockContext } from '../StockContext';

const StockForm = () => {
  const { addStock } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState({ symbol: '', quantity: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ symbol: '', quantity: '', price: '' });

    let hasError = false;

    if (!symbol.trim()) {
      setError((prev) => ({ ...prev, symbol: 'Stock symbol is required.' }));
      hasError = true;
    }

    if (quantity <= 0 || isNaN(quantity)) {
      setError((prev) => ({ ...prev, quantity: 'Quantity must be a positive number.' }));
      hasError = true;
    }

    if (price <= 0 || isNaN(price)) {
      setError((prev) => ({ ...prev, price: 'Purchase price must be a positive number.' }));
      hasError = true;
    }

    if (hasError) return;

    const apiKey = 'KW7GTMKGG60VGQFT';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        const currentPrice = parseFloat(data["Global Quote"]["05. price"]);
        if (isNaN(currentPrice)) {
          throw new Error('Invalid stock data received');
        }

        addStock({
          symbol,
          quantity: parseFloat(quantity),
          price: parseFloat(price),
          currentPrice,
        });

        setSymbol('');
        setQuantity('');
        setPrice('');
      } else {
        setError((prev) => ({ ...prev, symbol: 'Invalid stock symbol or data not found.' }));
      }
    } catch (error) {
      setError((prev) => ({ ...prev, symbol: 'Error fetching stock data. Please check the symbol and try again.' }));
    }
  };

  return (
    <div className="stock-form-container">
      <form onSubmit={handleSubmit} className="stock-form">
        <div className="input-group">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Stock Symbol"
            required
          />
          {error.symbol && <p className="error">{error.symbol}</p>}
        </div>

        <div className="input-group">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
          />
          {error.quantity && <p className="error">{error.quantity}</p>}
        </div>

        <div className="input-group">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Purchase Price"
            required
          />
          {error.price && <p className="error">{error.price}</p>}
        </div>

        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default StockForm;
