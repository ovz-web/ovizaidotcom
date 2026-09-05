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
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pb-12"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        {/* Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '05 // DEVIS & CONTACT' : '05 // CONTACT & QUOTE'}
          title={
            isFr ? (
              <>
                Démarrer un <span className="text-gold-gradient">Projet Vidéo IA</span>
              </>
            ) : (
              <>
                Start an <span className="text-gold-gradient">AI Video Project</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Déposez votre brief en 3 étapes et recevez une proposition sous 24h'
              : 'Submit your brief in 3 simple steps and get a proposal within 24h'
          }
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
        <div className="max-w-xl mx-auto px-4 mt-2 mb-8">
          <div className="ovizai-card border border-border bg-card/80 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs text-muted font-mono">
                  {isFr ? 'Réponse 24-48h' : '24-48h Response'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs text-muted font-mono">
                  {isFr ? 'Confidentialité totale' : 'Strict Confidentiality'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <FileText className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs text-muted font-mono">
                  {isFr ? 'Devis sans engagement' : 'No-obligation quote'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
              <span className="text-muted">
                {isFr ? 'Envie de comparer nos formules ?' : 'Want to compare packages?'}
              </span>
              <Link
                href="/tarifs"
                className="text-gold hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>{isFr ? 'Consulter la grille des tarifs →' : 'View pricing grid →'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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
