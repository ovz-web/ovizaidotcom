'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import MasterclassSection from '@/components/MasterclassSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE } from '@/lib/pricing';

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
    price: MASTERCLASS_PRICE.EUR,
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
      <div className="border border-border bg-card/90 rounded-xl p-4 sm:p-5">
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
          {isFr ? 'STACK DU PROGRAMME' : 'CURRICULUM STACK'}
        </span>
        <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-3">
          {isFr ? 'Moteurs Génératifs & Pipeline Étudiés' : 'Generative Engines & Pipeline Covered'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/60 border border-border text-fg"
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
              ? 'Un programme pratique en 5 modules pour maîtriser la création de films cinématographiques 4K'
              : 'A practical 5-module program to master 4K cinematic film creation'
          }
        />

        {/* 1. 5 Masterclass Modules */}
        <MasterclassSection lang={lang} />

        {/* 2. Masterclass Toolset Badges */}
        <FormationToolsetRow lang={lang} />

        {/* 3. Short Hook Card redirecting to /tarifs#masterclass (no price, no redundant bullet list) */}
        <div id="inscription" className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-border-strong bg-card/90 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="pb-3 border-b border-border flex items-center justify-between gap-2">
              <span className="mono text-[10px] text-gold font-bold uppercase tracking-[0.25em]">
                {isFr ? 'ACCÈS AU PROGRAMME' : 'PROGRAM ACCESS'}
              </span>
              <span className="mono text-[10px] text-muted flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                {isFr ? 'Accès à vie' : 'Lifetime access'}
              </span>
            </div>

            <div className="py-4 space-y-1.5 text-xs text-muted leading-relaxed font-sans">
              <p className="text-sm font-semibold text-fg mono">
                {isFr ? 'Rejoignez la Masterclass Vidéo IA 4K' : 'Join the 4K AI Video Masterclass'}
              </p>
              <p>
                {isFr
                  ? 'Accédez immédiatement aux 5 modules vidéo, aux bibles de prompts et aux méthodes de post-production 4K'
                  : 'Get instant access to all 5 video modules, prompt bibles, and 4K post-production workflows'}
              </p>
              <p className="text-[11px] text-muted font-mono pt-1">
                {isFr ? 'Règlement sécurisé Stripe en paiement unique sans abonnement' : 'Secure Stripe checkout with one-time payment and zero subscription'}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="mono text-[10.5px] text-muted">
                {isFr ? 'Tarif et inscription sur la grille officielle' : 'Pricing and enrollment on official grid'}
              </span>

              <Link
                href="/tarifs#masterclass"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-gold hover:scale-[1.01] cursor-pointer min-h-[44px]"
              >
                <span>{isFr ? 'Consulter le tarif & S’inscrire →' : 'View pricing & Enroll →'}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Referral to central site-wide FAQ on /tarifs#faq */}
        <div className="max-w-xl mx-auto px-4 mb-8 text-center">
          <p className="text-xs text-muted">
            {isFr
              ? 'Une question sur le programme ou les modalités d’accès ?'
              : 'Have a question about the curriculum or enrollment?'}
          </p>
          <Link
            href="/tarifs#faq"
            className="inline-flex items-center gap-1 mono text-xs text-gold hover:underline mt-1 font-semibold"
          >
            <span>{isFr ? 'Consulter notre FAQ complète →' : 'View our full FAQ →'}</span>
          </Link>
        </div>

        {/* 5. Final Outgoing Link to Pricing */}
        <div className="max-w-xl mx-auto px-4 mt-8 mb-4 text-center">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-border-strong hover:border-gold/50 text-fg hover:text-gold-bright font-bold px-8 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
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
