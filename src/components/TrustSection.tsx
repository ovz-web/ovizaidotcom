'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface TrustSectionProps {
  lang: Language;
}

export default function TrustSection({ lang }: TrustSectionProps) {
  const isFr = lang === 'fr';

  const PROCESS_STEPS = [
    {
      num: '01',
      title: { fr: 'Brief & Storyboard', en: 'Brief & Storyboard' },
      desc: {
        fr: 'Définition de votre vision, intention créative, style visuel et découpage plan par plan.',
        en: 'Definition of creative vision, visual style, moodboards, and shot-by-shot outline.'
      }
    },
    {
      num: '02',
      title: { fr: 'Génération Moteurs IA', en: 'AI Generation Pipeline' },
      desc: {
        fr: 'Création des images clés et animation (Midjourney v6.1, Flux.1, Kling AI, Runway Gen-3).',
        en: 'Master keyframe creation and motion synthesis (Midjourney v6.1, Flux.1, Kling, Runway).'
      }
    },
    {
      num: '03',
      title: { fr: 'Post-Production Cinéma', en: 'Pro Post-Production' },
      desc: {
        fr: 'Étalonnage colorimétrique DaVinci Resolve Studio, sound design et upscale 4K/8K.',
        en: 'DaVinci Resolve Studio ACES color grading, spatial sound design, and 4K/8K upscale.'
      }
    },
    {
      num: '04',
      title: { fr: 'Livraison & Révisions', en: 'Delivery & Revisions' },
      desc: {
        fr: 'Livraison du Master et ajustements selon les rounds de révision inclus par contrat.',
        en: 'Master export delivery and adjustments covered by included revision rounds.'
      }
    }
  ];

  return (
    <section className="max-w-3xl mx-auto mb-12 px-4 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="mono text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] font-mono font-bold mb-1 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'MÉTHODE & ENGAGEMENTS DE TRANSPARENCE' : 'METHODOLOGY & TRANSPARENCY'}</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-2">
          {isFr ? 'UNE MÉTHODE DOCUMENTÉE & VÉRIFIABLE' : 'DOCUMENTED & TRANSPARENT PROCESS'}
        </h2>
        <p className="text-xs text-[#9C9384] max-w-lg mx-auto leading-relaxed">
          {isFr
            ? 'Transparence totale : nous privilégions des garanties réelles et un workflow rigoureux plutôt que des avis artificiels.'
            : 'Total transparency: we focus on real guarantees and a documented workflow over artificial social proof.'}
        </p>
      </div>

      {/* Grid of 2 Main Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Pillar 1: Studio en Lancement */}
        <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="mono text-[10px] text-[#CAA243] bg-[#CAA243]/10 border border-[#CAA243]/20 px-2 py-0.5 rounded font-bold uppercase">
                01 // TRANSPARENCE
              </span>
            </div>
            <h3 className="mono text-sm font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Studio Indépendant en Lancement' : 'Independent Studio Launch'}
            </h3>
            <p className="text-xs text-[#9C9384] leading-relaxed">
              {isFr
                ? 'OVIZai est un studio indépendant en phase de lancement. Nous appliquons une méthodologie de production vidéo IA documentée et un contrôle qualité rigoureux sur chaque projet.'
                : 'OVIZai is an independent studio currently launching. We apply a documented AI video production methodology and strict quality control on every project.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-[#8C8375]">
            {/* TODO: à compléter avec logos et références clients quand disponible */}
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
            <h3 className="mono text-sm font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Révisions & Délais Garantis' : 'Guaranteed Revisions & Deadlines'}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#9C9384]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? 'Livraison sous 48-72h garanties (Sprint)' : '48-72h guaranteed delivery (Sprint)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? '1 à 3 rounds de révision inclus par contrat' : '1 to 3 revision rounds included by contract'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                <span className="text-[#ECE4D3]">{isFr ? 'Master 4K cinématique calibré DaVinci' : 'Cinematic 4K Master graded in DaVinci'}</span>
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

      {/* Pillar 3: Processus de Production en 4 Étapes */}
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
            <p className="text-[11px] text-[#8C8375] mt-0.5">
              {isFr ? 'Pas d’intermédiaire ni d’assistant automatisé — échange direct sur votre projet.' : 'No middleman or automated assistant — direct conversation about your project.'}
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
