'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import ServicesGrid from '@/components/ServicesGrid';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function ServicesPage() {
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

      <main
        className="flex-grow relative z-10 pb-2 sm:pb-3"
        style={{ paddingTop: 'calc(var(--topbar-height, 44px) + 6px)' }}
      >
        {/* 1. Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? 'SOLUTIONS & PIPELINE' : 'SOLUTIONS & WORKFLOW'}
          title={isFr ? 'CATALOGUE DE SERVICES' : 'SERVICES CATALOG'}
          subtitle={
            isFr
              ? 'Direction artistique, films de marque et post-production 4K générative'
              : 'Art direction, brand films and 4K generative post-production'
          }
        />

        {/* 2. Segmented 2-option tab AFTER PageHeader */}
        <div className="max-w-xl mx-auto px-4 mb-1.5 sm:mb-2.5">
          <div className="grid grid-cols-2 gap-1 bg-black/60 p-1 rounded-xl border border-border mono text-xs w-full">
            <Link
              href="/services"
              className="py-1.5 text-center font-bold rounded-lg transition-all bg-gold text-black shadow cursor-default"
            >
              {isFr ? 'Nos Services' : 'Our Services'}
            </Link>
            <Link
              href="/tarifs"
              className="py-1.5 text-center font-bold rounded-lg transition-all text-muted hover:text-fg cursor-pointer"
            >
              {isFr ? 'Tarifs & Formules' : 'Pricing & Packages'}
            </Link>
          </div>
        </div>

        {/* 3. Main Services Content */}
        <ServicesGrid
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
        />
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-black/85 backdrop-blur-md border-t border-border sm:hidden">
        <Link
          href="/contact"
          className="w-full py-2.5 px-4 rounded-xl bg-gold text-black font-semibold text-xs tracking-wider uppercase text-center block shadow-lg hover:bg-gold-bright transition-colors"
        >
          {isFr ? 'Demander un devis (24h)' : 'Request a quote (24h)'}
        </Link>
      </div>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
