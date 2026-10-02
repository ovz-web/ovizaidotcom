'use client';

import React from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import ServicesGrid from '@/components/ServicesGrid';
import LaunchOfferSection from '@/components/LaunchOfferSection';
import ProductionMethod from '@/components/ProductionMethod';
import HomeFaq from '@/components/HomeFaq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      {/* 35mm Silver Film Grain Filter */}
      <FilmGrain />

      {/* 1. Header with simple desktop nav + mobile drawer */}
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow relative z-10 pt-[var(--topbar-height,56px)]">
        {/* 1. HERO */}
        <HeroBrutalist lang={lang} />

        {/* 2. SELECTED WORK (renders ONLY when official projects are marked published in portfolio.ts) */}

        {/* 3. WHAT WE MAKE / SERVICES */}
        <ServicesGrid lang={lang} />

        {/* 4. OFFRE DE LANCEMENT (530 USD) */}
        <LaunchOfferSection lang={lang} />

        {/* 5. MÉTHODE EN 3 ÉTAPES */}
        <ProductionMethod lang={lang} />

        {/* 6. FAQ TRÈS COURTE */}
        <HomeFaq lang={lang} />

        {/* 7. CTA FINAL */}
        <FinalCta lang={lang} />
      </main>

      {/* 8. FOOTER */}
      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
