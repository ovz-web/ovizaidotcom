'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('fr');

  // Load persisted language preference on mount (same pattern as CurrencyContext)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selected_lang') as Language;
      if (saved === 'fr' || saved === 'en') {
        setLangState(saved);
      }
    } catch (e) {
      console.warn('[LANGUAGE] localStorage access failed:', e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('selected_lang', newLang);
    } catch (e) {
      console.warn('[LANGUAGE] Failed to save language preference:', e);
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
