'use client';

import React, { useState } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import AIPipeline from '@/components/AIPipeline';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function StackPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main className="flex-grow relative z-10 pt-16 sm:pt-20 pb-12">
        {/* 1. Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD'}
          title={isFr ? 'Notre Méthode de Production' : 'Our Production Method'}
          subtitle={
            isFr
              ? '4 étapes claires pour transformer vos idées en films de qualité cinéma.'
              : '4 clear steps turning your ideas into cinema-grade films.'
          }
        />

        {/* 2. 4-Step Production Process */}
        <AIPipeline
          lang={lang}
          hideHeader={true}
          showConversionCard={false}
        />

        {/* 3. Single Unique Action Button */}
        <div className="max-w-xl mx-auto px-4 mt-8 mb-4 text-center">
          <a
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-8 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Voir nos tarifs →' : 'View pricing & packages →'}</span>
          </a>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
