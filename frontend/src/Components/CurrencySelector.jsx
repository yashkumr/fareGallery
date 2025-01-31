// src/components/CurrencySelector.js
import React, { useContext, useEffect } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';


const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  useEffect(() => {

  

  }, [])



  return (
    <select value={currency} onChange={handleChange} className="font_9  outline-none border-none bg-transparent text-light fw-normal" >

      <option value="INR" className="font_9 text-dark bg-transparent">INR</option>
      <option value="AED" className="font_9 text-dark bg-transparent">AED</option>
      <option value="USD" className="font_9 text-dark bg-transparent">USD</option>
      <option value="EUR" className="font_9 text-dark bg-transparent">EUR</option>
      <option value="GBP" className="font_9 text-dark bg-transparent">GBP</option>
      <option value="CAD" className="font_9 text-dark bg-transparent">CAD</option>
      <option value="AUD" className="font_9 text-dark bg-transparent">AUD</option>
    </select>
  );
};

export default CurrencySelector;
