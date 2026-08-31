'use client';

import React, { useState, useEffect } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import CommandMenu from '@/components/CommandMenu';
import ProofBanner from '@/components/ProofBanner';
import ServicesGrid from '@/components/ServicesGrid';
import AIPipeline from '@/components/AIPipeline';
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
      {/* 35mm Silver Film Grain Filter & Gold Aura */}
      <FilmGrain />

      {/* TopBar with status and language switch */}
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Command Menu & Interactive ⌘K Palette */}
        <CommandMenu lang={lang} onShowToast={showToast} />

        {/* Proof of Excellence & Credibility Banner */}
        <ProofBanner lang={lang} />

        {/* Core Services Grid (DA & Ads, Visualisers, Masterclasses) */}
        <ServicesGrid lang={lang} />

        {/* AI Generative Video Stack & Technical Pipeline */}
        <AIPipeline lang={lang} />

        {/* Newsletter & Free Workflows Capture (Supabase integration) */}
        <NewsletterForm lang={lang} onShowToast={showToast} />
      </main>

      {/* Footer with social links & shortcuts */}
      <Footer lang={lang} onShowToast={showToast} />

      {/* Gold Toast Notification Bar */}
      <Toast message={toastMessage} />
    </div>
  );
}
