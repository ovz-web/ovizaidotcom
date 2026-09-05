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
        className="flex-grow relative z-10 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        {/* 1. Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD'}
          title={
            isFr ? (
              <>
                Notre Méthode de <span className="text-gold-gradient text-gold-glow">Production</span>
              </>
            ) : (
              <>
                Our <span className="text-gold-gradient text-gold-glow">Production</span> Method
              </>
            )
          }
          subtitle={
            isFr
              ? '4 étapes claires pour transformer vos idées en films de qualité cinéma'
              : '4 clear steps turning your ideas into cinema-grade films'
          }
        />

        {/* 2. Comparative Method Efficiency */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-border bg-card/90 p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{isFr ? 'COMPARAISON MÉTHODE' : 'METHOD COMPARISON'}</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-2 leading-snug">
              {isFr ? 'L’Agilité Vidéo sans Frictions de Tournage' : 'Cinematic Agility without Filming Friction'}
            </h2>
            <div className="text-xs text-muted leading-relaxed mb-4 space-y-1">
              {isFr ? (
                <>
                  <p>Un tournage classique mobilise une équipe sur plateau</p>
                  <p>Il demande 2 à 4 semaines de logistique</p>
                  <p>Son budget varie souvent entre 5 000 € et 20 000 €</p>
                  <p>Notre méthode de production IA divise les délais par 4</p>
                  <p>Elle réduit significativement les coûts logistiques</p>
                  <p>Votre premier master 4K est prêt en 48 à 72h ouvrées</p>
                </>
              ) : (
                <>
                  <p>A traditional shoot requires a full film crew on set</p>
                  <p>It involves 2 to 4 weeks of heavy logistics</p>
                  <p>Production budgets often range from $5,000 to $20,000</p>
                  <p>Our generative workflow speeds up turnaround by 4x</p>
                  <p>It eliminates traditional production overhead</p>
                  <p>Your first 4K master is delivered within 48 to 72 business hours</p>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] text-muted uppercase block mb-1">
                  {isFr ? 'Tournage classique :' : 'Traditional shoot:'}
                </span>
                <p className="text-muted text-[11px] leading-relaxed font-sans">
                  {isFr ? '2 à 6 semaines • Équipes & studios • Budget lourd' : '2 to 6 weeks • Crew & studios • High overhead'}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-gold/10 border border-border-gold">
                <span className="text-[10px] text-gold uppercase font-bold block mb-1">
                  {isFr ? 'Pipeline OVIZai :' : 'OVIZai Pipeline:'}
                </span>
                <p className="text-fg text-[11px] leading-relaxed font-sans">
                  {isFr ? '48-72h ouvrées • Délais divisés par 4 • Budget optimisé' : '48-72h turnaround • 4x faster delivery • Zero crew overhead'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 4-Step Production Process (Pipeline 01 to 04) */}
        <AIPipeline
          lang={lang}
          hideHeader={false}
          customEyebrow={isFr ? 'LE PROCESSUS EN 4 ÉTAPES' : 'THE 4-STEP PROCESS'}
          customTitle={isFr ? 'Du Concept Initial au Rendu Final' : 'From Initial Concept to Final Cut'}
          showConversionCard={false}
          stepPrefix="numeric"
          hideTechBadge={false}
        />

        {/* 4. Process Guarantees */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-border-gold bg-gold/[0.03] p-4 sm:p-5">
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
              {isFr ? 'ENGAGEMENTS & QUALITÉ' : 'COMMITMENTS & QUALITY'}
            </span>
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-3">
              {isFr ? 'Garanties Incluses sur Chaque Production' : 'Guaranteed Across Every Production'}
            </h3>
            <ul className="space-y-2 text-xs text-muted">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-fg">
                  {isFr
                    ? 'Délais garantis : 48-72h ouvrées pour les formats Sprint, planning dédié pour les campagnes'
                    : 'Guaranteed delivery: 48-72 business hours for Sprints, dedicated schedule for campaigns'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-fg">
                  {isFr
                    ? 'Rounds de révision inclus : validation sur prévisualisation (rythme, cadrages, colorimétrie)'
                    : 'Included revision rounds: approval on preview cut (pacing, framing, color grading)'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-fg">
                  {isFr
                    ? 'Master final 4K : étalonnage cinématographique calibré avec livrables multi-formats (16:9 et vertical 9:16)'
                    : '4K Final Master: Calibrated cinema grading with multi-format delivery (16:9 & 9:16)'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Referral to central site-wide FAQ on /tarifs#faq */}
        <div className="max-w-xl mx-auto px-4 mb-6 text-center">
          <p className="text-xs text-muted">
            {isFr
              ? 'Une question sur nos méthodes de travail ou notre politique de révision ?'
              : 'Have questions about our production workflow or revision policy?'}
          </p>
          <Link
            href="/tarifs#faq"
            className="inline-flex items-center gap-1 mono text-xs text-gold hover:underline mt-1 font-semibold"
          >
            <span>{isFr ? 'Consulter notre FAQ complète →' : 'View our full FAQ →'}</span>
          </Link>
        </div>

        {/* 6. Dual Action CTA Footer */}
        <div className="max-w-xl mx-auto px-4 mb-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-gold hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Consulter nos tarifs & formules →' : 'View pricing & packages →'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-border-strong hover:border-gold/50 text-fg hover:text-gold-bright font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Demander un devis 24h →' : 'Request 24h quote →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
