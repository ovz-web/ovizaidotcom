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
        className="flex-grow relative z-10 pb-12"
        style={{ paddingTop: 'calc(var(--topbar-height, 80px) + 16px)' }}
      >
        {/* 1. Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '01 // NOS SERVICES' : '01 // OUR SERVICES'}
          title={
            isFr ? (
              <>
                Nos Services & <span className="text-gold-gradient text-gold-glow">Direction Artistique</span>
              </>
            ) : (
              <>
                Our Services & <span className="text-gold-gradient text-gold-glow">Art Direction</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'De la conception au master final, des films conçus pour votre marque.'
              : 'From concept to final master, films crafted for your brand.'
          }
        />

        {/* 2. Segmented 2-option tab AFTER PageHeader */}
        <div className="max-w-xl mx-auto px-4 mb-6">
          <div className="grid grid-cols-2 gap-1 bg-black/60 p-1 rounded-xl border border-white/[0.08] mono text-xs w-full">
            <Link
              href="/services"
              className="py-2.5 text-center font-bold rounded-lg transition-all bg-[#CAA243] text-black shadow cursor-default"
            >
              {isFr ? 'Nos Services' : 'Our Services'}
            </Link>
            <Link
              href="/tarifs"
              className="py-2.5 text-center font-bold rounded-lg transition-all text-[#8C8375] hover:text-[#ECE4D3] cursor-pointer"
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

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
