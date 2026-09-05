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
        className="flex-grow relative z-10 pb-3 sm:pb-4"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
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
        <div className="max-w-xl mx-auto px-4 mb-3 sm:mb-4">
          <div className="ovizai-card border border-border bg-card/90 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                {isFr ? 'STANDARDS DU STUDIO' : 'STUDIO STANDARDS'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="mono text-[11px] font-bold text-fg">
                    {isFr ? 'Délais 48-72h' : '48-72h Turnaround'}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-snug">
                  {isFr
                    ? 'Livraison express garantie sur le Sprint Pilote'
                    : 'Guaranteed express delivery on Pilot Sprint'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="mono text-[11px] font-bold text-fg">
                    {isFr ? 'Droits Complets' : 'Full Commercial Rights'}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-snug">
                  {isFr
                    ? 'Cession intégrale et libre exploitation commerciale'
                    : '100% intellectual property transfer to your brand'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="mono text-[11px] font-bold text-fg">
                    {isFr ? 'Qualité 4K Native' : 'Native 4K Master'}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-snug">
                  {isFr
                    ? 'Export ProRes ou H.265 étalonné aux normes cinéma'
                    : 'ProRes / H.265 delivery calibrated to cinema specs'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Action CTAs */}
        <div className="max-w-xl mx-auto px-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Consulter les tarifs & formules →' : 'View pricing & packages →'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-border-strong hover:border-gold/50 text-fg hover:text-gold-bright font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Demander un devis sous 24h →' : 'Request 24h quote →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
