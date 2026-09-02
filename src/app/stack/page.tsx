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

          {/* Client-Centric Intro Paragraph explaining toolset synergy */}
          <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 rounded-2xl mb-4">
            <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
              {isFr ? 'POURQUOI CETTE SYNERGIE D’OUTILS ?' : 'WHY THIS TOOLSET SYNERGY?'}
            </span>
            <h1 className="text-base sm:text-lg font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Une architecture pensée pour le résultat visuel' : 'An architecture built for visual excellence'}
            </h1>
            <p className="text-xs text-[#9C9384] leading-relaxed">
              {isFr
                ? 'Aucun modèle IA unique ne maîtrise l’ensemble du processus. Nous combinons Midjourney v6.1 pour la cohérence stylistique des personnages, Flux.1 Pro pour le photoréalisme des matières et du texte, Kling 1.5 pour la physique naturelle des mouvements, Runway Gen-3 pour le contrôle 3D de la caméra virtuelle, et DaVinci Resolve Studio pour l’étalonnage cinématique. Cette synergie garantit un rendu professionnel 4K sans les défauts visuels habituels.'
                : 'No single AI model excels at everything. We combine Midjourney v6.1 for character consistency, Flux.1 Pro for photorealistic textures and text, Kling 1.5 for natural physical motion, Runway Gen-3 for 3D virtual camera control, and DaVinci Resolve Studio for final cinematic color grading. This synergy delivers a pro 4K output free from common AI flaws.'}
            </p>
          </div>
        </div>

        <AIPipeline
          lang={lang}
          customEyebrow={isFr ? '03 // STACK TECHNIQUE & PIPELINE' : '03 // TECH STACK & PIPELINE'}
          customTitle={isFr ? 'Moteurs Génératifs & Post-Production 4K' : 'Generative Engines & 4K Post-Production'}
        />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
