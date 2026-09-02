'use client';

import React, { useState, useEffect } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import SocialProof from '@/components/SocialProof';
import HeroActions from '@/components/HeroActions';
import CommandMenu from '@/components/CommandMenu';
import ServicesGrid from '@/components/ServicesGrid';
import AIPipeline from '@/components/AIPipeline';
import MasterclassSection from '@/components/MasterclassSection';
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

      <main className="flex-grow relative z-10 pt-16 sm:pt-20">
        {/* ── SCREEN 1 — Promise + Proof + CTA ──────────────────────── */}

        {/* 2. Hero — nouvelle accroche résultat + délai */}
        <HeroBrutalist lang={lang} />

        {/* 3. Social Proof — chiffres & case studies (visible dès l'écran 1) */}
        <SocialProof lang={lang} />

        {/* 4. CTA Principal unique — "Demander un devis" */}
        <HeroActions lang={lang} />

        {/* ── SCREEN 2 — Navigation & Services ──────────────────────── */}

        {/* 5. Navigation secondaire — 4 destinations */}
        <CommandMenu lang={lang} onShowToast={showToast} />

        {/* 6. Services — preuve concrète de ce qu'on livre */}
        <ServicesGrid lang={lang} currency={currency} onSelectCurrency={setCurrency} />

        {/* ── SCREEN 3 — Technique & Formation (secondaire) ─────────── */}

        {/* 7. Stack technique — en preuve secondaire */}
        <AIPipeline lang={lang} />

        {/* 8. Masterclass — clairement secondaire, séparée du flux clients */}
        <MasterclassSection lang={lang} currency={currency} />

        {/* 9. Newsletter — capture créateurs */}
        <NewsletterForm lang={lang} onShowToast={showToast} />
      </main>

      {/* 10. Footer */}
      <Footer lang={lang} onShowToast={showToast} />

      {/* Gold Toast Notification Bar */}
      <Toast message={toastMessage} />
    </div>
  );
}
