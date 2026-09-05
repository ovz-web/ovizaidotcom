'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowUpRight, Mail } from 'lucide-react';
import { Language } from '@/types';

interface TrustSectionProps {
  lang: Language;
  hideProcessStep?: boolean;
}

const PROCESS_STEPS = [
  {
    num: '01',
    title: { fr: 'Brief & Faisabilité', en: 'Brief & Feasibility' },
    desc: {
      fr: 'Analyse de votre projet\nDéfinition du style et des délais garantis',
      en: 'Project analysis and scoping\nValidation of style and turnaround',
    },
  },
  {
    num: '02',
    title: { fr: 'Génération & Concept', en: 'Generation & Concept' },
    desc: {
      fr: 'Création des visuels clés\nAnimation des scènes et direction artistique',
      en: 'Key visual generation\nScene animation and art direction',
    },
  },
  {
    num: '03',
    title: { fr: 'Validation & Révision', en: 'Review & Revision' },
    desc: {
      fr: 'Aperçu vidéo pour ajustements\nPrise en compte de vos retours sur le montage',
      en: 'Video preview for adjustments\nPacing, framing and color grading revisions',
    },
  },
  {
    num: '04',
    title: { fr: 'Master 4K & Livraison', en: '4K Master & Delivery' },
    desc: {
      fr: 'Export final 4K calibré cinéma\nFormats requis en 16:9 et vertical 9:16',
      en: 'Final 4K cinema master export\nMulti-format delivery in 16:9 and 9:16',
    },
  },
];

export default function TrustSection({ lang, hideProcessStep = false }: TrustSectionProps) {
  const isFr = lang === 'fr';

  return (
    <section className="w-full max-w-xl mx-auto mb-10 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>{isFr ? 'ENGAGEMENTS & TRANSPARENCE' : 'GUARANTEES & TRANSPARENCY'}</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
          {isFr ? 'Une Méthode Documentée & Sécurisée' : 'Documented & Safe Process'}
        </h2>
        <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
          {isFr
            ? 'Transparence totale : des garanties réelles et un workflow rigoureux'
            : 'Total transparency: real guarantees and a documented workflow'}
        </p>
      </div>

      {/* Grid of 2 Main Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        
        {/* Pillar 1: Studio en Lancement */}
        <div className="ovizai-card border border-border bg-card/90 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[10px] text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded font-bold uppercase tracking-[0.2em]">
                {isFr ? 'TRANSPARENCE' : 'TRANSPARENCY'}
              </span>
            </div>
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-2">
              {isFr ? 'Studio Indépendant en Lancement' : 'Independent Studio Launch'}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {isFr
                ? 'Studio indépendant spécialisé en cinéma IA avec contrôle qualité sur chaque projet'
                : 'Independent AI cinema studio with quality control on every project'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-muted">
            <span>{isFr ? '◆ 0 avis artificiel — 100 % méthode factuelle' : '◆ 0 artificial reviews — 100% factual method'}</span>
          </div>
        </div>

        {/* Pillar 2: Engagements & Garanties */}
        <div className="ovizai-card border border-border-gold bg-gold/[0.03] p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[10px] text-gold bg-gold/15 border border-border-gold px-2 py-0.5 rounded font-bold uppercase tracking-[0.2em]">
                {isFr ? 'GARANTIES CONTRACTUELLES' : 'CONTRACTUAL GUARANTEES'}
              </span>
            </div>
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-2">
              {isFr ? 'Révisions & Délais Garantis' : 'Guaranteed Revisions & Deadlines'}
            </h3>
            <ul className="space-y-1.5 text-xs text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="text-fg">{isFr ? 'Livraison sous 48-72h (Sprint)' : '48-72h delivery (Sprint)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="text-fg">{isFr ? '1 à 3 rounds de révision inclus' : '1 to 3 revision rounds included'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="text-fg">{isFr ? 'Master 4K calibré cinéma' : 'Cinematic 4K Master'}</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-gold">
            <Link href="/tarifs" className="hover:underline inline-flex items-center gap-1">
              <span>{isFr ? 'Voir le détail des formules →' : 'View packages detail →'}</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Pillar 3: Processus de Production en 4 Étapes (Optional) */}
      {!hideProcessStep && (
        <div className="ovizai-card border border-border bg-card/90 p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-4">
          <div className="mb-4">
            <span className="mono text-[10px] text-gold uppercase tracking-[0.25em] font-bold block mb-1">
              {isFr ? 'PROCESSUS DE PRODUCTION' : 'PRODUCTION PROCESS'}
            </span>
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg">
              {isFr ? 'Les 4 Étapes de Production' : 'The 4 Production Steps'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="bg-black/40 border border-white/[0.06] p-3.5 rounded-xl">
                <span className="mono text-xs font-bold text-gold bg-black/60 border border-border-gold px-2 py-0.5 rounded inline-block mb-2">
                  {step.num}
                </span>
                <h4 className="mono text-xs font-semibold text-fg mb-1">
                  {step.title[lang]}
                </h4>
                <div className="text-[11px] text-muted leading-relaxed space-y-0.5">
                  {step.desc[lang].split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pillar 4: Contact Direct */}
      <div className="ovizai-card border border-border bg-card/90 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gold/10 border border-border-gold text-gold">
            <Mail className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h4 className="mono text-xs sm:text-[13px] font-semibold text-fg">
              {isFr ? 'Interlocuteur Direct & Réponse 24h' : 'Direct Contact & 24h Response'}
            </h4>
            <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
              {isFr ? 'Échange direct avec la direction artistique sur votre projet' : 'Direct exchange with art direction on your project'}
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
        >
          <span>{isFr ? 'Contacter l’équipe' : 'Contact team'}</span>
          <ArrowUpRight className="w-4 h-4 text-black" />
        </Link>
      </div>
    </section>
  );
}
