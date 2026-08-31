'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import MasterclassSection from '@/components/MasterclassSection';
import AIPipeline from '@/components/AIPipeline';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function FormationPage() {
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

        {/* The 5 Masterclass Modules */}
        <MasterclassSection
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
        />

        {/* 06 // STACK TECHNIQUE & OUTILS DE LA MASTERCLASS */}
        <div id="stack">
          <AIPipeline
            lang={lang}
            customEyebrow={isFr ? '06 // STACK TECHNIQUE & OUTILS DE LA MASTERCLASS' : '06 // MASTERCLASS TOOLSET & STACK'}
            customTitle={isFr ? 'Moteurs Génératifs, Lip-Sync & Post-Production 4K' : 'Generative Engines, Lip-Sync & 4K Post-Production'}
          />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
