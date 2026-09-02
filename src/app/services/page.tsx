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
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Retour Accueil' : 'Back Home'}</span>
          </Link>

          <Link
            href="/tarifs"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#CAA243] hover:text-[#f0c869] transition-colors font-semibold"
          >
            <span>{lang === 'fr' ? 'Grille Tarifaire & Offres →' : 'Pricing Grid & Offers →'}</span>
          </Link>
        </div>

        <ServicesGrid
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
        />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />

      {/* Sticky Mobile CTA — visible only on small screens */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none">
        <Link
          href="/contact?service=sprint&type=pub-brand&budget=tier-0"
          className="pointer-events-auto w-full min-h-[52px] flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold rounded-xl mono text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(202,162,67,0.4)] transition-all"
        >
          <span>{lang === 'fr' ? 'Demander un devis (24h)' : 'Request a Quote (24h)'}</span>
        </Link>
      </div>
    </div>
  );
}
