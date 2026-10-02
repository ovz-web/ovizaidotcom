'use client';

import React, { Suspense } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import QualifiedContact from '@/components/QualifiedContact';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

function ContactContent() {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main id="main-content" className="flex-grow relative z-10 pt-[var(--topbar-height,56px)] pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto pt-12 sm:pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-bold">
              {isFr ? '03 // DEVIS & CONTACT' : '03 // BRIEF & CONTACT'}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-fg tracking-tight uppercase leading-tight mb-4">
            {isFr ? 'DÉMARRER UN PROJET' : 'START A PROJECT'}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-lg mx-auto">
            {isFr
              ? 'Décrivez votre produit ou établissement en quelques lignes — nous revenons vers vous avec une orientation créative et les prochaines étapes'
              : 'Outline your product or brand in a few lines — we will get back to you promptly with creative guidance and next steps'}
          </p>
        </div>

        <QualifiedContact lang={lang} />
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-[#080808]" />}>
      <ContactContent />
    </Suspense>
  );
}
