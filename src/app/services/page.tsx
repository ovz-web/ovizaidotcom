'use client';

import React from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import ServicesEditorial from '@/components/ServicesEditorial';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main id="main-content" className="flex-grow relative z-10 pt-[var(--topbar-height,56px)]">
        {/* Présentation éditoriale verticale des 4 expertises (Inspiration Le Labo Noir, identité OVIZai) */}
        <ServicesEditorial lang={lang} />
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
