'use client';

import React from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import LaunchOfferSection from '@/components/LaunchOfferSection';
import HomeFaq from '@/components/HomeFaq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main id="main-content" className="flex-grow relative z-10 pt-[var(--topbar-height,56px)]">
        {/* Core Pricing & Inclusions (530 USD + Sur devis) */}
        <LaunchOfferSection lang={lang} />

        {/* Compact 4-Question FAQ */}
        <HomeFaq lang={lang} />

        {/* Final Conversion CTA */}
        <FinalCta lang={lang} />
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
