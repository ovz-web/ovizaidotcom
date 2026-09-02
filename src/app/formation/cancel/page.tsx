'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, XCircle, RefreshCw, MessageSquare } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function FormationCancelPage() {
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

      <main className="flex-grow relative z-10 pt-[92px] sm:pt-[96px] pb-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Back Link */}
          <Link
            href="/formation"
            className="font-mono text-xs text-[#8C8375] hover:text-[#CAA243] transition-colors inline-flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour Masterclass' : 'Back to Masterclass'}</span>
          </Link>

          {/* Cancel Card */}
          <div className="border border-white/[0.1] bg-[#0B0A08]/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.1] rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7 text-[#8C8375]" />
            </div>

            <div>
              <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#8C8375] font-mono font-bold mb-1">
                {isFr ? '02 // PAIEMENT NON FINALISÉ' : '02 // CHECKOUT CANCELLED'}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#ECE4D3] mb-2">
                {isFr ? 'INSCRIPTION INTERROMPUE' : 'ENROLLMENT CANCELLED'}
              </h1>
              <p className="text-xs sm:text-sm text-[#8c8375] max-w-sm mx-auto leading-relaxed">
                {isFr
                  ? 'La procédure de paiement Stripe a été annulée. Aucun débit n’a été effectué sur votre compte.'
                  : 'The Stripe payment session was cancelled. No charges were made to your card.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                href="/formation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-black" />
                <span>{isFr ? 'Réessayer l’inscription' : 'Retry Enrollment'}</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-white/[0.04] text-[#ECE4D3] border border-white/[0.1] px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#CAA243]" />
                <span>{isFr ? 'Poser une question' : 'Ask a Question'}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
