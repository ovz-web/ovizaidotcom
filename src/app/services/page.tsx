'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
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

      <main className="flex-grow relative z-10 pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
       <Link
  href="/"
  className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-6"
>
  <ArrowLeft className="w-3.5 h-3.5" />
  <span>{lang === 'fr' ? 'Retour Accueil' : 'Back Home'}</span>
</Link>

        </div>

        <ServicesGrid
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
        />

        {/* Secondary link — masterclass teaser */}
        <div className="max-w-3xl mx-auto px-4 mb-10 text-center">
          <p className="text-[11px] text-[#8C8375] font-mono">
            {isFr ? 'Vous êtes créateur indépendant ?' : 'Are you an independent creator?'}
            {' '}
            <a
              href="/formation"
              className="text-[#CAA243] hover:text-[#f0c869] underline underline-offset-2 transition-colors"
            >
              {isFr ? 'Découvrez la Masterclass IA →' : 'Discover the AI Masterclass →'}
            </a>
          </p>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
