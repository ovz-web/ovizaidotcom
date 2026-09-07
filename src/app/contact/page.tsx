'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Clock, FileText, ArrowUpRight } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import QualifiedContact from '@/components/QualifiedContact';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

function ContactPageContent() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const typeParam = searchParams.get('type');
  const budgetParam = searchParams.get('budget');

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
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
        {/* Standardized Unified Page Header */}
        <PageHeader
          tag={isFr ? '05 // DEVIS & CONTACT' : '05 // QUOTE & CONTACT'}
          title={
            isFr ? (
              <>
                LANCER UN PROJET AVEC <span className="text-gold-gradient">OVIZAI</span>
              </>
            ) : (
              <>
                START A PROJECT WITH <span className="text-gold-gradient">OVIZAI</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Déposez votre brief en 3 étapes'
              : 'Submit your brief in 3 steps'
          }
          showDetailsHint={true}
          lang={lang}
        />

        <QualifiedContact
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
          initialServiceId={serviceId}
          initialType={typeParam}
          initialBudget={budgetParam}
        />

        {/* Sober Reassurance & Link Hub balancing page density */}
        <div className="max-w-xl mx-auto px-4 mt-0.5 sm:mt-1 mb-0.5 sm:mb-1.5">
          <div className="ovizai-card border border-border bg-card/80 p-1.5 sm:p-2.5">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="flex items-center justify-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.04]">
                <Clock className="w-3 h-3 text-gold flex-shrink-0" />
                <span className="text-[9.5px] sm:text-[11px] text-muted font-mono truncate">
                  {isFr ? 'Réponse 24-48h' : '24-48h response'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.04]">
                <ShieldCheck className="w-3 h-3 text-gold flex-shrink-0" />
                <span className="text-[9.5px] sm:text-[11px] text-muted font-mono truncate">
                  {isFr ? 'Confidentialité' : 'Confidential'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.04]">
                <FileText className="w-3 h-3 text-gold flex-shrink-0" />
                <span className="text-[9.5px] sm:text-[11px] text-muted font-mono truncate">
                  {isFr ? 'Devis gratuit' : 'Free quote'}
                </span>
              </div>
            </div>

            <div className="mt-1.5 pt-1.5 border-t border-border flex items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono">
              <span className="text-muted truncate">
                {isFr ? 'Comparer les formules ?' : 'Compare packages?'}
              </span>
              <Link
                href="/tarifs"
                className="text-gold hover:underline inline-flex items-center gap-0.5 font-semibold shrink-0"
              >
                <span>{isFr ? 'Grille des tarifs →' : 'Pricing grid →'}</span>
                <ArrowUpRight className="w-3 h-3" />
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

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ContactPageContent />
    </Suspense>
  );
}
