'use client';

import React from 'react';
import { Award, Film, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';

interface ProofBannerProps {
  lang: Language;
}

export default function ProofBanner({ lang }: ProofBannerProps) {
  const isFr = lang === 'fr';

  const STATS = [
    {
      icon: Award,
      title: isFr ? 'Artistes de Renom' : 'A-List Artists',
      desc: isFr ? 'Visualisers pour artistes majeurs (Rap Français & scène internationale)' : 'Visualisers for major artists & international stages'
    },
    {
      icon: Film,
      title: isFr ? 'Broadcast & Scène' : 'Broadcast & Stage',
      desc: isFr ? 'Visuels diffusés en concert (Bercy / Accor Arena) et télévision (France 2)' : 'Stage visuals for Accor Arena (Bercy) & TV broadcast'
    },
    {
      icon: Sparkles,
      title: isFr ? 'Génération 4K Master' : '4K Master Generation',
      desc: isFr ? 'Rendu vidéo haute fidélité sans bruit générique ni perte de texture' : 'High-fidelity video rendering without generic noise'
    },
    {
      icon: ShieldCheck,
      title: isFr ? 'Zéro Template' : 'Zero Templates',
      desc: isFr ? 'Chaque projet est conçu sur-mesure pour une identité visuelle unique' : 'Custom-engineered project for a unique visual identity'
    }
  ];

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      <div className="border border-white/[0.08] bg-[#141210] rounded-xl p-5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#CAA243]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CAA243] animate-pulse inline-block" />
          <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono font-bold">
            {isFr ? 'PROOF OF EXCELLENCE // CRÉDIBILITÉ & ENGAGEMENT' : 'PROOF OF EXCELLENCE // CREDIBILITY'}
          </p>
        </div>

        {/* 2x2 Grid of Proof Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STATS.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div key={`proof-${idx}`} className="flex items-start gap-3 p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="p-2 rounded bg-[#CAA243]/10 border border-[#CAA243]/20 text-[#CAA243] flex-shrink-0 mt-0.5">
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="mono text-xs font-bold text-[#ECE4D3] mb-0.5">
                    {stat.title}
                  </h4>
                  <p className="text-[11px] text-[#8c8375] leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
