'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import MasterclassSection from '@/components/MasterclassSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

const COURSE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Masterclass Vidéo IA OVIZai',
  description:
    'Formation complète et pratique à la création de films et publicités cinématographiques avec intelligence artificielle générative et post-production 4K.',
  provider: {
    '@type': 'Organization',
    name: 'OVIZai',
    sameAs: 'https://ovizai.com',
  },
  educationalCredentialAwarded: 'Certificat de Compétences Vidéo IA',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT10H',
  },
  offers: {
    '@type': 'Offer',
    price: 490,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://ovizai.com/tarifs#masterclass',
  },
};

function FormationToolsetRow({ lang }: { lang: 'fr' | 'en' }) {
  const isFr = lang === 'fr';
  const tools = isFr
    ? [
        'Génération Visuelle 8K',
        'Animation & Caméra 3D',
        'Simulation Physique & Fluides',
        'Upscaling Neuronal 4K/8K',
        'Étalonnage & Mastering ACES',
        'Sound Design & Voix IA',
      ]
    : [
        '8K Visual Generation',
        '3D Camera & Motion',
        'Physics & Fluid Simulation',
        'Neural 4K/8K Upscaling',
        'ACES Grading & Mastering',
        'Spatial Audio & AI Voice',
      ];

  return (
    <div className="max-w-xl mx-auto mb-8 px-4">
      <div className="border border-white/[0.08] bg-[#0B0A08]/90 rounded-xl p-4 sm:p-5">
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
          {isFr ? 'STACK DU PROGRAMME' : 'CURRICULUM STACK'}
        </span>
        <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3] mb-3">
          {isFr ? 'Moteurs Génératifs & Pipeline Étudiés' : 'Generative Engines & Pipeline Covered'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/60 border border-white/[0.1] text-[#ECE4D3]"
            >
              {tool}
            </span>
          ))}
        </div>
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
        className="flex-grow relative z-10 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
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

        {/* 1. 5 Masterclass Modules */}
        <MasterclassSection lang={lang} />

        {/* 2. Masterclass Toolset Badges */}
        <FormationToolsetRow lang={lang} />

        {/* 3. Masterclass Inscription & Referral Card (ZÉRO prix, renvoi vers /tarifs#masterclass) */}
        <div id="inscription" className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-[#CAA243]/50 bg-[#0B0A08]/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_0_24px_rgba(202,162,67,0.1)]">
            <div className="pb-3 border-b border-white/[0.06]">
              <span className="mono text-[10px] text-[#CAA243] font-bold uppercase tracking-[0.25em] block mb-1">
                {isFr ? 'ACCÈS ILLIMITÉ & TARIFICATION' : 'LIFETIME ACCESS & PRICING'}
              </span>
              <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">
                {isFr ? 'Masterclass Complète Cinéma & Vidéo IA 4K' : 'Complete 4K AI Cinema & Video Masterclass'}
              </h3>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-[#9C9384]">
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>
                  {isFr
                    ? '5 modules vidéo pratiques : concept art 8K, caméra virtuelle 3D, animation, sound design et étalonnage 4K'
                    : '5 practical modules: 8K concept art, 3D virtual camera, motion, sound design and 4K color grading'}
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>
                  {isFr
                    ? 'Accès illimité et à vie + toutes les mises à jour des futurs modèles d’IA incluses'
                    : 'Unlimited lifetime access + all future AI model updates included'}
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>
                  {isFr
                    ? 'Fichiers projets de post-production cinéma & bibliothèque de prompts certifiés'
                    : 'Cinema post-production project files & verified prompt library'}
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>
                  {isFr
                    ? 'Délivrance immédiate des identifiants et vidéos par e-mail après règlement'
                    : 'Instant credentials and video access delivered via email upon payment'}
                </span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="mono text-[10.5px] text-[#8C8375]">
                {isFr ? 'Tarif unique sans abonnement disponible sur la grille' : 'One-time pricing available on pricing page'}
              </span>

              <Link
                href="/tarifs#masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[44px]"
              >
                <span>{isFr ? 'Consulter le tarif & S’inscrire →' : 'View pricing & Enroll →'}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Referral to central site-wide FAQ on /tarifs#faq */}
        <div className="max-w-xl mx-auto px-4 mb-8 text-center">
          <p className="text-xs text-[#9C9384]">
            {isFr
              ? 'Une question sur le programme ou les modalités d’accès ?'
              : 'Have a question about the curriculum or enrollment?'}
          </p>
          <Link
            href="/tarifs#faq"
            className="inline-flex items-center gap-1 mono text-xs text-[#CAA243] hover:underline mt-1 font-semibold"
          >
            <span>{isFr ? 'Consulter notre FAQ complète →' : 'View our full FAQ →'}</span>
          </Link>
        </div>

        {/* 5. Final Outgoing Link to Pricing */}
        <div className="max-w-xl mx-auto px-4 mt-8 mb-4 text-center">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-white/[0.12] hover:border-[#CAA243]/50 text-[#ECE4D3] hover:text-[#f0c869] font-bold px-8 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Consulter nos formules de production vidéo →' : 'View video production packages →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
