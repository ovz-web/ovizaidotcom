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

      <main
        className="flex-grow relative z-10 pb-16 px-4"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        <div className="relative max-w-6xl mx-auto mb-4 sm:mb-6">
          {/* Back Link */}
          <div className="flex justify-start sm:absolute sm:left-4 lg:left-6 sm:top-0 mb-3 sm:mb-0 z-20">
            <Link
              href="/tarifs#masterclass"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border hover:border-gold/50 text-xs font-mono text-fg hover:text-gold-bright transition-all min-h-[36px] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>{isFr ? 'Retour aux Formules & Tarifs' : 'Back to Pricing & Packages'}</span>
            </Link>
          </div>
        </div>

        <div className="max-w-xl mx-auto">

          {/* Cancel Card */}
          <div className="ovizai-card border border-border bg-card/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-white/[0.04] border border-border rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7 text-muted" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-1 font-mono font-bold">
                {isFr ? 'COMMANDE INTERROMPUE' : 'CHECKOUT CANCELLED'}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-fg text-center mb-1.5 leading-snug">
                {isFr ? 'Inscription Interrompue' : 'Enrollment Cancelled'}
              </h1>
              <div className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed space-y-1">
                {isFr ? (
                  <>
                    <p>La procédure de paiement Stripe a été annulée</p>
                    <p>Aucun débit n’a été effectué sur votre compte</p>
                  </>
                ) : (
                  <>
                    <p>The Stripe payment session was cancelled</p>
                    <p>No charges were made to your account</p>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                href="/tarifs#masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-black" />
                <span>{isFr ? 'Réessayer l’inscription' : 'Retry Enrollment'}</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-white/[0.04] text-fg border border-border px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gold" />
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
