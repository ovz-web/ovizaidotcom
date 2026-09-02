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

function FormationToolsetCollapse({ lang }: { lang: 'fr' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFr = lang === 'fr';

  return (
    <div id="stack" className="max-w-2xl mx-auto mb-10 px-4">
      <div className="border border-white/[0.08] bg-[#0B0A08]/90 rounded-2xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="mono text-xs font-bold text-[#CAA243] bg-black/60 border border-[#CAA243]/30 px-2 py-1 rounded">
              TOOLSET
            </span>
            <div>
              <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3]">
                {isFr ? 'STACK TECHNIQUE & OUTILS DE LA MASTERCLASS' : 'MASTERCLASS TOOLSET & STACK'}
              </h3>
              <p className="text-[11px] text-[#8c8375] mt-0.5">
                {isFr ? 'Cliquez pour afficher les moteurs génératifs et logiciels étudiés' : 'Click to show generative engines and software included'}
              </p>
            </div>
          </div>

          <span className="mono text-xs text-[#CAA243] font-bold">
            {isOpen ? (isFr ? '[Masquer -]' : '[Hide -]') : (isFr ? '[Afficher +]' : '[Show +]')}
          </span>
        </button>

        {isOpen && (
          <div className="pt-4 border-t border-white/[0.06]">
            <AIPipeline
              lang={lang}
              customEyebrow={isFr ? 'OUTILS & LOGICIELS DU PROGRAMME' : 'PROGRAM TOOLSET & SOFTWARE'}
              customTitle={isFr ? 'Moteurs Génératifs, Lip-Sync & Post-Production 4K' : 'Generative Engines, Lip-Sync & 4K Post-Production'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormationPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

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

        {/* Masterclass Toolset (Collapsible) */}
        <FormationToolsetCollapse lang={lang} />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
