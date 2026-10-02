'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function FormationCancelPage() {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main
        id="main-content"
        className="flex-grow relative z-10 pb-16 px-4 flex items-center justify-center pt-24"
      >
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-[#11100e] border border-white/[0.08] rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-white/[0.04] border border-white/[0.1] rounded-full flex items-center justify-center mx-auto text-muted">
              <XCircle className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-2">
                {isFr ? 'Commande interrompue' : 'Order cancelled'}
              </h1>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                {isFr
                  ? 'Aucun débit n’a été effectué.'
                  : 'No payment has been processed.'}
              </p>
            </div>

            <div>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-gold text-black font-bold px-8 py-3.5 rounded-full mono text-xs uppercase tracking-wider"
              >
                {isFr ? 'Retour à l’Accueil' : 'Return to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
