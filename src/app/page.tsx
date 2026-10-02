'use client';

import React from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import CentralIndex from '@/components/CentralIndex';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      {/* 35mm Silver Film Grain Filter */}
      <FilmGrain />

      {/* 1. HEADER */}
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      {/* 2. MAIN CONTENT AREA */}
      <main id="main-content" className="flex-grow relative z-10 pt-[var(--topbar-height,56px)]">
        {/* HERO */}
        <HeroBrutalist lang={lang} />

        {/* INDEX CENTRAL (Logique Ohneis : Choix évident, destinations épurées) */}
        <CentralIndex lang={lang} />
      </main>

      {/* 3. FOOTER */}
      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
