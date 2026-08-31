'use client';

import React, { useState, useEffect } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import CommandMenu from '@/components/CommandMenu';
import NewsletterForm from '@/components/NewsletterForm';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import { Language } from '@/types';

export default function Home() {
  const [lang, setLang] = useState<Language>('fr');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

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
      {/* 35mm Silver Film Grain Filter & Ambient Gold Aura */}
      <FilmGrain />

      {/* 1. Single Unified Sticky TopBar */}
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {/* 2. Minimalist Hero Section */}
        <HeroBrutalist lang={lang} />

        {/* 3. Central Bento Command Card Hub */}
        <CommandMenu lang={lang} onShowToast={showToast} />

        {/* 4. Newsletter & Free Prompts Capture (Supabase Integration) */}
        <NewsletterForm lang={lang} onShowToast={showToast} />
      </main>

      {/* 5. Footer with social links & legal */}
      <Footer lang={lang} onShowToast={showToast} />

      {/* Gold Toast Notification Bar */}
      <Toast message={toastMessage} />
    </div>
  );
}
