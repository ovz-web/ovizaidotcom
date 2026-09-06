'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
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

      <main
        className="flex-grow relative z-10 pb-2 sm:pb-3"
        style={{ paddingTop: 'calc(var(--topbar-height, 44px) + 6px)' }}
      >
        {/* Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD'}
          title={
            isFr ? (
              <>
                Notre Méthode de <span className="text-gold-gradient">Production 4K</span>
              </>
            ) : (
              <>
                Our 4K <span className="text-gold-gradient">Production Method</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Le workflow technique complet de notre studio : de la conception 8K au master cinéma'
              : 'Our studio’s complete technical pipeline: from 8K visual design to final cinema master'
          }
        />

        {/* 1. Interactive 4-Phase Pipeline Box (Exact same style as services) */}
        <AIPipeline lang={lang} />

        {/* 2. Compact Studio Standards & Commitments Card */}
        <div className="max-w-xl mx-auto px-4 mb-1.5 sm:mb-2.5">
          <div className="ovizai-card border border-border bg-card/90 rounded-xl p-2.5 sm:p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-gold font-bold">
                {isFr ? 'STANDARDS DU STUDIO' : 'STUDIO STANDARDS'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-center sm:text-left">
              <div className="p-1.5 sm:p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-0.5">
                  <Clock className="w-3 h-3 text-gold flex-shrink-0" />
                  <span className="mono text-[10px] sm:text-[11px] font-bold text-fg">
                    {isFr ? '48-72h' : '48-72h'}
                  </span>
                </div>
                <p className="text-[9.5px] sm:text-[10.5px] text-muted leading-tight">
                  {isFr ? 'Livraison express' : 'Express delivery'}
                </p>
              </div>

              <div className="p-1.5 sm:p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-0.5">
                  <ShieldCheck className="w-3 h-3 text-gold flex-shrink-0" />
                  <span className="mono text-[10px] sm:text-[11px] font-bold text-fg">
                    {isFr ? 'Droits 100%' : 'Full Rights'}
                  </span>
                </div>
                <p className="text-[9.5px] sm:text-[10.5px] text-muted leading-tight">
                  {isFr ? 'Exploitation libre' : 'Full IP transfer'}
                </p>
              </div>

              <div className="p-1.5 sm:p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-0.5">
                  <CheckCircle2 className="w-3 h-3 text-gold flex-shrink-0" />
                  <span className="mono text-[10px] sm:text-[11px] font-bold text-fg">
                    {isFr ? 'Master 4K' : '4K Master'}
                  </span>
                </div>
                <p className="text-[9.5px] sm:text-[10.5px] text-muted leading-tight">
                  {isFr ? 'Normes cinéma' : 'Cinema specs'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Action CTAs */}
        <div className="max-w-xl mx-auto px-4 mb-1.5 sm:mb-2 flex flex-row items-center justify-center gap-2">
          <Link
            href="/tarifs"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-bright text-black font-bold px-3 py-2 rounded-lg mono text-[11px] sm:text-xs uppercase tracking-wider transition-all min-h-[38px]"
          >
            <span>{isFr ? 'Tarifs & formules →' : 'View pricing →'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black/60 border border-border-strong hover:border-gold/50 text-fg hover:text-gold-bright font-bold px-3 py-2 rounded-lg mono text-[11px] sm:text-xs uppercase tracking-wider transition-all min-h-[38px]"
          >
            <span>{isFr ? 'Devis sous 24h →' : '24h quote →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
