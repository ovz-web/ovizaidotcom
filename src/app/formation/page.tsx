'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import MasterclassSection from '@/components/MasterclassSection';
import AIPipeline from '@/components/AIPipeline';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE } from '@/lib/pricing';

const COURSE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Masterclass Vidéo IA OVIZai",
  "description": "Formation complète et pratique à la création de films et publicités cinématographiques avec IA (Midjourney v6, Runway Gen-3, Kling AI, Topaz Video AI, DaVinci Resolve Studio).",
  "provider": {
    "@type": "Organization",
    "name": "OVIZai",
    "sameAs": "https://ovizai.com"
  },
  "educationalCredentialAwarded": "Certificat de Compétences Vidéo IA",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT10H"
  },
  "offers": {
    "@type": "Offer",
    "price": MASTERCLASS_PRICE.EUR,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://ovizai.com/formation"
  }
};

function FormationToolsetCollapse({ lang }: { lang: 'fr' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFr = lang === 'fr';

  return (
    <div id="stack" className="max-w-3xl mx-auto mb-8 px-4">
      <div className="border border-white/[0.08] bg-[#0B0A08]/90 rounded-2xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="mono text-xs font-bold text-[#CAA243] bg-black/60 border border-[#CAA243]/30 px-2 py-1 rounded">
              TOOLSET
            </span>
            <div>
              <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">
                {isFr ? 'DÉTAIL DES OUTILS & LOGICIELS DU PROGRAMME' : 'PROGRAM TOOLSET & SOFTWARE DETAILS'}
              </h3>
              <p className="text-[11px] text-[#8c8375] mt-0.5">
                {isFr ? 'Cliquez pour afficher les moteurs génératifs étudiés (Midjourney, Runway, Kling, DaVinci)' : 'Click to view generative engines (Midjourney, Runway, Kling, DaVinci)'}
              </p>
            </div>
          </div>

          <span className="mono text-xs text-[#CAA243] font-semibold">
            {isOpen ? (isFr ? 'Masquer -' : 'Hide -') : (isFr ? 'Afficher +' : 'Show +')}
          </span>
        </button>

        {isOpen && (
          <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-black/30">
            <AIPipeline
              lang={lang}
              hideHeader={true}
              showConversionCard={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormationPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSON_LD) }}
      />
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pb-12"
        style={{ paddingTop: 'calc(var(--topbar-height, 80px) + 16px)' }}
      >
        {/* Standardized Unified Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '02 // FORMATION VIDÉO IA' : '02 // AI VIDEO COURSE'}
          title={
            isFr ? (
              <>
                Formation Vidéo IA & <span className="text-gold-gradient text-gold-glow">Masterclass</span>
              </>
            ) : (
              <>
                AI Video Course & <span className="text-gold-gradient text-gold-glow">Masterclass</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Un programme pratique en 5 modules pour maîtriser la création de films cinématographiques 4K.'
              : 'A practical 5-module program to master 4K cinematic film creation.'
          }
        />

        {/* 5 Masterclass Modules */}
        <MasterclassSection lang={lang} />

        {/* Masterclass Toolset (Collapsible) */}
        <FormationToolsetCollapse lang={lang} />

        {/* Final Permanent Action CTA Button */}
        <div className="max-w-xl mx-auto px-4 mt-8 mb-4 text-center">
          <Link
            href="/tarifs#masterclass"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-8 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Voir tarifs & formules →' : 'View pricing & packages →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
