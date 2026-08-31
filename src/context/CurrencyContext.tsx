'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';

interface ExchangeRates {
  USD: number;
  EUR: number;
  CAD: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  rates: ExchangeRates;
  convertAmount: (usdAmount: number, overrideCurr?: Currency) => number;
  formatPrice: (usdAmount: number, overrideCurr?: Currency) => string;
  formatRange: (minUsd: number, maxUsd: number | null, overrideCurr?: Currency) => string;
}

const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  CAD: 1.36,
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  rates: DEFAULT_RATES,
  convertAmount: (amt) => amt,
  formatPrice: (amt) => `${amt} $ USD`,
  formatRange: (min, max) => `${min} $ – ${max} $ USD`,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES);

  // Load persisted currency preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selected_currency') as Currency;
      if (saved && (saved === 'USD' || saved === 'EUR' || saved === 'CAD')) {
        setCurrencyState(saved);
      }
    } catch (e) {
      console.warn('[CURRENCY] localStorage access failed:', e);
    }
  }, []);

  // Fetch live exchange rates from internal API endpoint
  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('/api/rates');
        const data = await res.json();
        if (data?.rates) {
          setRates({
            USD: 1,
            EUR: data.rates.EUR || 0.92,
            CAD: data.rates.CAD || 1.36,
          });
        }
      } catch (err) {
        console.warn('[CURRENCY] Failed to fetch live rates, using fallback:', err);
      }
    }
    fetchRates();
  }, []);

  const setCurrency = (newCurr: Currency) => {
    setCurrencyState(newCurr);
    try {
      localStorage.setItem('selected_currency', newCurr);
    } catch (e) {
      console.warn('[CURRENCY] Failed to save currency preference:', e);
    }
  };

  /**
   * Commercial Luxury Rounding Logic:
   * - < 1,000 $: Rounded to nearest 10 (e.g. 492 -> 490)
   * - >= 1,000 $: Rounded to nearest 50 or 100 (e.g. 1,364 -> 1,350)
   */
  const convertAmount = (usdAmount: number, overrideCurr?: Currency): number => {
    const activeCurr = overrideCurr || currency;
    const rate = rates[activeCurr] || 1;
    const rawConverted = usdAmount * rate;

    if (rawConverted < 1000) {
      return Math.round(rawConverted / 10) * 10;
    } else {
      return Math.round(rawConverted / 50) * 50;
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const formatPrice = (usdAmount: number, overrideCurr?: Currency): string => {
    const activeCurr = overrideCurr || currency;
    const converted = convertAmount(usdAmount, activeCurr);
    const formattedNum = formatNumber(converted);

    if (activeCurr === 'EUR') {
      return `${formattedNum} €`;
    } else if (activeCurr === 'CAD') {
      return `${formattedNum} $ CAD`;
    }
    return `${formattedNum} $ USD`;
  };

  const formatRange = (minUsd: number, maxUsd: number | null, overrideCurr?: Currency): string => {
    const activeCurr = overrideCurr || currency;
    const convertedMin = convertAmount(minUsd, activeCurr);
    const formattedMin = formatNumber(convertedMin);

    if (!maxUsd) {
      if (activeCurr === 'EUR') return `${formattedMin} € +`;
      if (activeCurr === 'CAD') return `${formattedMin} $ + CAD`;
      return `${formattedMin} $ + USD`;
    }

    const convertedMax = convertAmount(maxUsd, activeCurr);
    const formattedMax = formatNumber(convertedMax);

    if (activeCurr === 'EUR') {
      return `${formattedMin} € – ${formattedMax} €`;
    } else if (activeCurr === 'CAD') {
      return `${formattedMin} $ – ${formattedMax} $ CAD`;
    }
    return `${formattedMin} $ – ${formattedMax} $ USD`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        convertAmount,
        formatPrice,
        formatRange,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
