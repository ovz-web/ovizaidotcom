'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
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
        <div className="max-w-2xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour Accueil' : 'Back Home'}</span>
          </Link>
        </div>

        <AIPipeline
          lang={lang}
          customEyebrow={isFr ? '03 // STACK TECHNIQUE & PIPELINE' : '03 // TECH STACK & PIPELINE'}
          customTitle={isFr ? 'Moteurs Génératifs & Post-Production 4K' : 'Generative Engines & 4K Post-Production'}
        />

        {/* Primary CTA + secondary link — consistent pattern */}
        <div className="max-w-xl mx-auto px-4 mb-10 flex flex-col items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer"
          >
            <span>{isFr ? 'Demander un devis' : 'Get a quote'}</span>
          </Link>
          <p className="text-[11px] text-[#8C8375] font-mono text-center">
            {isFr ? 'Vous êtes créateur ?' : 'Are you a creator?'}
            {' '}
            <a
              href="/formation"
              className="text-[#CAA243] hover:text-[#f0c869] underline underline-offset-2 transition-colors"
            >
              {isFr ? 'Découvrez la Masterclass →' : 'Discover the Masterclass →'}
            </a>
          </p>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
