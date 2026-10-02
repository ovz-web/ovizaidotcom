'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function FormationPage() {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main id="main-content" className="flex-grow flex items-center justify-center relative z-10 px-4 py-24 sm:py-32">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <span className="mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
              {isFr ? 'OVIZai METHOD' : 'OVIZai METHOD'}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-fg uppercase tracking-tight">
            {isFr ? 'GUIDE EN PRÉPARATION.' : 'GUIDE IN PROGRESS.'}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-md mx-auto leading-relaxed">
            {isFr
              ? 'La méthode complète de production OVIZai sera publiée prochainement.'
              : 'The complete OVIZai production methodology will be released soon.'}
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-muted hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isFr ? 'Retour à l’accueil' : 'Back to home'}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
