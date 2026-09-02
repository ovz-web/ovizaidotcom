'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface TrustSectionProps {
  lang: Language;
  hideProcessStep?: boolean;
}

export default function TrustSection({ lang, hideProcessStep = false }: TrustSectionProps) {
  const isFr = lang === 'fr';

  const PROCESS_STEPS = [
    {
      num: '01',
      title: { fr: 'Brief & Storyboard', en: 'Brief & Storyboard' },
      desc: {
        fr: 'Définition de la vision créative, du style visuel et découpage plan par plan.',
        en: 'Definition of creative vision, visual style, and shot outline.'
      }
    },
    {
      num: '02',
      title: { fr: 'Génération Moteurs IA', en: 'AI Generation Pipeline' },
      desc: {
        fr: 'Création des visuels clés et animation (Midjourney, Flux, Kling, Runway).',
        en: 'Master keyframe creation and motion synthesis (Midjourney, Flux, Kling, Runway).'
      }
    },
    {
      num: '03',
      title: { fr: 'Post-Production Cinéma', en: 'Pro Post-Production' },
      desc: {
        fr: 'Étalonnage DaVinci Resolve Studio, sound design et upscale master 4K.',
        en: 'DaVinci Resolve Studio color grading, sound design, and 4K master.'
      }
    },
    {
      num: '04',
      title: { fr: 'Livraison & Révisions', en: 'Delivery & Revisions' },
      desc: {
        fr: 'Livraison du Master et ajustements selon les rounds de révision inclus.',
        en: 'Master export delivery and adjustments covered by included revision rounds.'
      }
    }
  ];

  return (
    <section className="max-w-xl mx-auto mb-10 px-4 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="mono text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] font-mono font-bold mb-1 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'ENGAGEMENTS & TRANSPARENCE' : 'GUARANTEES & TRANSPARENCY'}</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-1">
          {isFr ? 'UNE MÉTHODE VÉRIFIABLE & SÉCURISÉE' : 'DOCUMENTED & SAFE PROCESS'}
        </h2>
        <p className="text-xs text-[#9C9384] max-w-md mx-auto leading-relaxed">
          {isFr
            ? 'Transparence totale : des garanties réelles et un workflow rigoureux.'
            : 'Total transparency: real guarantees and a documented workflow.'}
        </p>
      </div>

      {/* Grid of 2 Main Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        
        {/* Pillar 1: Studio en Lancement */}
        <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[10px] text-[#CAA243] bg-[#CAA243]/10 border border-[#CAA243]/20 px-2 py-0.5 rounded font-bold uppercase">
                01 // TRANSPARENCE
              </span>
            </div>
            <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Studio Indépendant en Lancement' : 'Independent Studio Launch'}
            </h3>
            <p className="text-xs text-[#9C9384] leading-relaxed">
              {isFr
                ? 'Studio indépendant spécialisé en cinéma IA, avec contrôle qualité sur chaque projet.'
                : 'Independent AI cinema studio with quality control on every project.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-[#8C8375]">
            <span>{isFr ? '◆ 0 avis artificiel — 100 % méthode factuelle' : '◆ 0 artificial reviews — 100% factual method'}</span>
          </div>
        </div>

        {/* Pillar 2: Engagements & Garanties */}
        <div className="ovizai-card border border-[#CAA243]/30 bg-[#CAA243]/[0.03] p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[10px] text-[#CAA243] bg-[#CAA243]/15 border border-[#CAA243]/30 px-2 py-0.5 rounded font-bold uppercase">
                02 // GARANTIES CONTRACTUELLES
              </span>
            </div>
            <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Révisions & Délais Garantis' : 'Guaranteed Revisions & Deadlines'}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#9C9384]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? 'Livraison sous 48-72h (Sprint)' : '48-72h delivery (Sprint)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? '1 à 3 rounds de révision inclus' : '1 to 3 revision rounds included'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? 'Master 4K calibré DaVinci' : 'Cinematic 4K Master'}</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-[#CAA243]">
            <Link href="/tarifs" className="hover:underline inline-flex items-center gap-1">
              <span>{isFr ? 'Voir le détail des formules →' : 'View packages detail →'}</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Pillar 3: Processus de Production en 4 Étapes (Optional) */}
      {!hideProcessStep && (
        <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 sm:p-6 rounded-2xl mb-4">
          <div className="mb-4">
            <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
              03 // PROCESSUS DE PRODUCTION
            </span>
            <h3 className="mono text-sm sm:text-base font-bold text-[#ECE4D3]">
              {isFr ? 'Les 4 Étapes de Production' : 'The 4 Production Steps'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="bg-black/40 border border-white/[0.06] p-3.5 rounded-xl">
                <span className="mono text-xs font-bold text-[#CAA243] bg-black/60 border border-[#CAA243]/30 px-2 py-0.5 rounded inline-block mb-2">
                  {step.num}
                </span>
                <h4 className="mono text-xs font-bold text-[#ECE4D3] mb-1">
                  {step.title[lang]}
                </h4>
                <p className="text-[11px] text-[#8C8375] leading-relaxed">
                  {step.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pillar 4: Contact Direct */}
      <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#CAA243]/10 border border-[#CAA243]/30 text-[#CAA243]">
            <Mail className="w-5 h-5 text-[#CAA243]" />
          </div>
          <div>
            <h4 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3]">
              {isFr ? 'Interlocuteur Direct & Réponse 24h' : 'Direct Contact & 24h Response'}
            </h4>
            <p className="text-[11px] text-[#8C8375] mt-0.5 leading-relaxed">
              {isFr ? 'Échange direct avec la direction artistique sur votre projet.' : 'Direct exchange with art direction on your project.'}
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
        >
          <span>{isFr ? 'Contacter l’équipe' : 'Contact team'}</span>
          <ArrowUpRight className="w-4 h-4 text-black" />
        </Link>
      </div>
    </section>
  );
}
