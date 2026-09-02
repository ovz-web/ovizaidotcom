'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';
import { DICTIONARY } from '@/lib/i18n';

interface SocialProofProps {
  lang: Language;
}

const CASE_STUDIES = [
  {
    placeholder: 'PLACEHOLDER_case_study_1.jpg',
    gradientFrom: 'from-[#1a1208]',
    gradientTo: 'to-[#0B0A08]',
    accentDot: 'bg-[#CAA243]',
    clientKey: 'socialProofCase1Client',
    typeKey: 'socialProofCase1Type',
    resultKey: 'socialProofCase1Result',
  },
  {
    placeholder: 'PLACEHOLDER_case_study_2.jpg',
    gradientFrom: 'from-[#0d1218]',
    gradientTo: 'to-[#0B0A08]',
    accentDot: 'bg-[#CAA243]',
    clientKey: 'socialProofCase2Client',
    typeKey: 'socialProofCase2Type',
    resultKey: 'socialProofCase2Result',
  },
  {
    placeholder: 'PLACEHOLDER_case_study_3.jpg',
    gradientFrom: 'from-[#121008]',
    gradientTo: 'to-[#0B0A08]',
    accentDot: 'bg-[#CAA243]',
    clientKey: 'socialProofCase3Client',
    typeKey: 'socialProofCase3Type',
    resultKey: 'socialProofCase3Result',
  },
];

export default function SocialProof({ lang }: SocialProofProps) {
  const t = DICTIONARY[lang];
  const isFr = lang === 'fr';

  const stats = [
    { number: t.socialProofStat1Number || '+30', label: t.socialProofStat1Label || (isFr ? 'Projets livrés' : 'Projects delivered') },
    { number: t.socialProofStat2Number || '24-48h', label: t.socialProofStat2Label || (isFr ? 'Délai garanti' : 'Guaranteed SLA') },
    { number: t.socialProofStat3Number || (isFr ? '5 ans' : '5 years'), label: t.socialProofStat3Label || (isFr ? "D'expertise IA" : 'AI expertise') },
  ];

  return (
    <section className="max-w-xl mx-auto mb-6 px-4">
      {/* Eyebrow */}
      <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-4 font-bold text-center">
        {t.socialProofEyebrow || (isFr ? 'ILS NOUS FONT CONFIANCE' : 'TRUSTED BY')}
      </p>

      {/* Stats Row — 3 chiffres clés */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {stats.map((stat, idx) => (
          <div
            key={`stat-${idx}`}
            className="flex flex-col items-center text-center p-3 rounded-xl border border-white/[0.08] bg-[#0B0A08]/80"
          >
            <span className="mono text-xl sm:text-2xl font-extrabold text-[#CAA243] leading-none mb-0.5">
              {stat.number}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#8C8375] leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Case Studies — 3 cards */}
      <div className="space-y-2.5">
        {CASE_STUDIES.map((cs, idx) => (
          <div
            key={`case-${idx}`}
            className={`rounded-xl border border-white/[0.08] bg-gradient-to-r ${cs.gradientFrom} ${cs.gradientTo} overflow-hidden flex items-stretch`}
          >
            {/* Placeholder image zone — replace src with real asset */}
            <div
              className="w-14 sm:w-20 flex-shrink-0 bg-[#1a1510] border-r border-white/[0.06] flex items-center justify-center"
              aria-label={cs.placeholder}
              title={`Replace with: /public/${cs.placeholder}`}
            >
              {/* Fallback visual until real asset is provided */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CAA243]/40 to-[#CAA243]/10 border border-[#CAA243]/30 flex items-center justify-center">
                <span className="mono text-[10px] font-bold text-[#CAA243]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center px-3.5 py-3 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="mono text-[10px] uppercase tracking-wider text-[#CAA243] font-bold">
                  {t[cs.clientKey] as string}
                </span>
                <span className="mono text-[10px] text-[#8C8375]">·</span>
                <span className="text-[10px] text-[#8C8375] truncate">
                  {t[cs.typeKey] as string}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#CAA243] flex-shrink-0" />
                <span className="text-xs text-[#ECE4D3] font-medium">
                  {t[cs.resultKey] as string}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer — anonymisé */}
      <p className="text-[10px] text-[#8C8375] text-center mt-2.5 font-mono">
        {isFr
          ? '* Clients anonymisés sur demande · Références disponibles sur demande'
          : '* Clients anonymised on request · References available on request'}
      </p>
    </section>
  );
}
