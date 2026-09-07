'use client';

import React, { useState } from 'react';
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
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pt-[calc(var(--topbar-height,44px)+6px)] sm:pt-[calc(var(--topbar-height,44px)+8px)]"
      >
        {/* Unified Page Header */}
        <PageHeader
          tag={isFr ? '01 // NOS SERVICES' : '01 // OUR SERVICES'}
          title={
            isFr ? (
              <>
                OFFRES & PRESTATIONS <span className="text-gold-gradient">CINÉMATOGRAPHIQUES</span>
              </>
            ) : (
              <>
                SERVICES & CINEMATIC <span className="text-gold-gradient">PRODUCTIONS</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Direction artistique et films de marque'
              : 'Art direction and brand films'
          }
          showDetailsHint={true}
          lang={lang}
        />

        {/* Main Services Content */}
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
