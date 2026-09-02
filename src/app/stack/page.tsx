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
        <div className="max-w-xl mx-auto px-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour Accueil' : 'Back Home'}</span>
          </Link>

          {/* Client-Centric Intro Paragraph */}
          <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 rounded-2xl mb-4">
            <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
              {isFr ? 'DE VOTRE IDÉE À LA VIDÉO FINALE' : 'FROM YOUR IDEA TO FINAL VIDEO'}
            </span>
            <h1 className="text-base sm:text-lg font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Une méthode de production pensée pour votre résultat' : 'A production workflow engineered for your result'}
            </h1>
            <p className="text-xs text-[#9C9384] leading-relaxed">
              {isFr
                ? 'Nous combinons les meilleures technologies pour transformer vos intentions créatives en films haute définition, sans les contraintes de coût ou d’organisation d’un tournage traditionnel.'
                : 'We combine top generative technologies to turn your creative vision into high-definition films, free from the cost and logistics of traditional shoots.'}
            </p>
          </div>
        </div>

        <AIPipeline
          lang={lang}
          customEyebrow={isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD'}
          customTitle={isFr ? 'Le Processus de votre Idée au Rendu Final' : 'The Process from Idea to Final Master'}
        />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
