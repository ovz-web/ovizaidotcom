'use client';

import React, { useState, useEffect } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import CommandMenu from '@/components/CommandMenu';
import NewsletterForm from '@/components/NewsletterForm';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      {/* 35mm Silver Film Grain Filter */}
      <FilmGrain />

      {/* 1. Single 100% Fixed Persistent TopBar */}
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main
        className="flex-grow relative z-10"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        {/* 1. Minimalist Hero Section (Enlarged Logo + Main Title + Tagline) */}
        <HeroBrutalist lang={lang} />

        {/* 2. Central Bento Command Card Hub (4 Navigation Links) */}
        <CommandMenu lang={lang} onShowToast={showToast} />

        {/* 3. Newsletter & Free Prompts Capture */}
        <NewsletterForm lang={lang} onShowToast={showToast} />
      </main>

      {/* 4. Footer with social links & legal */}
      <Footer lang={lang} onShowToast={showToast} />

      {/* Gold Toast Notification Bar */}
      <Toast message={toastMessage} />
    </div>
  );
}
