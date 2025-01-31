// src/context/CurrencyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState({});

  //default axios

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('/api/v1/flights/exchange-rates');
        setRates(response.data.rates);
        
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = (amount, toCurrency) => {
    if (!rates[toCurrency]) return amount;
    return (amount * rates[toCurrency]).toFixed(2);
  };

  return (
    <CurrencyContext.Provider value={{ currency,rates, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
