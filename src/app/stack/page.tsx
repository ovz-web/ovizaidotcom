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
              ? '4 étapes claires pour transformer vos idées en films de qualité cinéma.'
              : '4 clear steps turning your ideas into cinema-grade films.'
          }
        />

        {/* 2. Comparative Method Efficiency */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#CAA243] mb-1 font-mono font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#CAA243]" />
              <span>{isFr ? 'COMPARAISON MÉTHODE' : 'METHOD COMPARISON'}</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-2 leading-snug">
              {isFr ? 'L’Agilité Vidéo sans Frictions de Tournage' : 'Cinematic Agility without Filming Friction'}
            </h2>
            <p className="text-xs text-[#9C9384] leading-relaxed mb-4">
              {isFr
                ? 'Une vidéo de marque traditionnelle exige 5 000 € à 30 000 € et 2 à 6 semaines de tournage physique. Notre pipeline IA réduit le coût de 70 à 90 % et livre vos masters sous 48 à 72h ouvrées.'
                : 'A traditional brand video requires $5,000 to $30,000 and 2 to 6 weeks of filming logistics. Our AI pipeline cuts production costs by 70 to 90% and delivers final masters within 48 to 72 business hours.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] text-[#8C8375] uppercase block mb-1">
                  {isFr ? 'Tournage classique :' : 'Traditional shoot:'}
                </span>
                <p className="text-[#9C9384] text-[11px] leading-relaxed font-sans">
                  {isFr ? '2 à 6 semaines • Équipes & studios • Budget lourd' : '2 to 6 weeks • Crew & studios • High overhead'}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#CAA243]/10 border border-[#CAA243]/30">
                <span className="text-[10px] text-[#CAA243] uppercase font-bold block mb-1">
                  {isFr ? 'Pipeline OVIZai :' : 'OVIZai Pipeline:'}
                </span>
                <p className="text-[#ECE4D3] text-[11px] leading-relaxed font-sans">
                  {isFr ? '48-72h • Export 4K DaVinci • -70 à -90% de coût' : '48-72h • 4K DaVinci master • -70 to -90% cost'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 4-Step Production Process (Pipeline C1 to C4) */}
        <AIPipeline
          lang={lang}
          hideHeader={false}
          customEyebrow={isFr ? 'C // LE PIPELINE EN 4 ÉTAPES' : 'C // THE 4-STEP PIPELINE'}
          customTitle={isFr ? 'Du Concept Initial au Rendu Final' : 'From Initial Concept to Final Cut'}
          showConversionCard={false}
          stepPrefix="letterC"
          hideTechBadge={false}
        />

        {/* 4. Process Guarantees */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-[#CAA243]/30 bg-[#CAA243]/[0.03] p-4 sm:p-5">
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
              {isFr ? 'ENGAGEMENTS & QUALITÉ' : 'COMMITMENTS & QUALITY'}
            </span>
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3] mb-3">
              {isFr ? 'Garanties Incluses sur Chaque Production' : 'Guaranteed Across Every Production'}
            </h3>
            <ul className="space-y-2 text-xs text-[#9C9384]">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#CAA243] flex-shrink-0 mt-0.5" />
                <span className="text-[#ECE4D3]">
                  {isFr
                    ? 'Délais garantis : 48-72h ouvrées pour les formats Sprint, planning dédié pour les campagnes.'
                    : 'Guaranteed delivery: 48-72 business hours for Sprints, dedicated schedule for campaigns.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CAA243] flex-shrink-0 mt-0.5" />
                <span className="text-[#ECE4D3]">
                  {isFr
                    ? 'Rounds de révision inclus : validation sur prévisualisation (rythme, cadrages, colorimétrie).'
                    : 'Included revision rounds: approval on preview cut (pacing, framing, color grading).'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0 mt-0.5" />
                <span className="text-[#ECE4D3]">
                  {isFr
                    ? 'Master final 4K : calibré sur DaVinci Resolve Studio avec livrables multi-formats (16:9 et vertical 9:16).'
                    : '4K Final Master: DaVinci Resolve Studio color grading with multi-format delivery (16:9 & 9:16).'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Referral to central site-wide FAQ on /tarifs#faq */}
        <div className="max-w-xl mx-auto px-4 mb-6 text-center">
          <p className="text-xs text-[#9C9384]">
            {isFr
              ? 'Une question sur nos méthodes de travail ou notre politique de révision ?'
              : 'Have questions about our production workflow or revision policy?'}
          </p>
          <Link
            href="/tarifs#faq"
            className="inline-flex items-center gap-1 mono text-xs text-[#CAA243] hover:underline mt-1 font-semibold"
          >
            <span>{isFr ? 'Consulter notre FAQ complète →' : 'View our full FAQ →'}</span>
          </Link>
        </div>

        {/* 6. Dual Action CTA Footer */}
        <div className="max-w-xl mx-auto px-4 mb-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Consulter nos tarifs & formules →' : 'View pricing & packages →'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-white/[0.12] hover:border-[#CAA243]/50 text-[#ECE4D3] hover:text-[#f0c869] font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
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
