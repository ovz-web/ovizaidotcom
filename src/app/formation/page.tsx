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
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE } from '@/lib/pricing';

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
    <div id="stack" className="max-w-xl mx-auto mb-8 px-4">
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
  const [mcLoading, setMcLoading] = useState(false);
  const [mcError, setMcError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  const masterclassCurrent = MASTERCLASS_PRICE[currency] || 450;
  const masterclassOriginal = MASTERCLASS_ORIGINAL_PRICE[currency] || 900;

  const formattedCurrent = currency === 'EUR'
    ? `${masterclassCurrent} €`
    : currency === 'CAD'
    ? `${masterclassCurrent} $ CAD`
    : `${masterclassCurrent} $ USD`;

  const formattedOriginal = currency === 'EUR'
    ? `${masterclassOriginal} €`
    : currency === 'CAD'
    ? `${masterclassOriginal} $ CAD`
    : `${masterclassOriginal} $ USD`;

  const handleMasterclassCheckout = async () => {
    setMcLoading(true);
    setMcError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency: currency.toLowerCase() }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setMcError(data.error || (isFr ? 'Erreur lors de l’initialisation Stripe.' : 'Failed to create checkout session.'));
        setMcLoading(false);
      }
    } catch (err: any) {
      setMcError(isFr ? 'Erreur de connexion serveur.' : 'Server connection error.');
      setMcLoading(false);
    }
  };

  const FORMATION_FAQS = [
    {
      q: isFr
        ? 'L’accès à vie inclut-il les futures versions des modèles IA ?'
        : 'Does lifetime access include future AI model updates?',
      a: isFr
        ? 'Oui. Votre accès inclut toutes les futures mises à jour vidéo du curriculum sans surcoût (nouveaux modèles Runway Gen-4, Kling 2.0, Midjourney v7 et workflows d’upscale 4K).'
        : 'Yes. Your enrollment includes all future curriculum video updates at no extra charge (new models from Runway, Kling, Midjourney, and 4K upscale workflows).',
    },
    {
      q: isFr
        ? 'Faut-il des compétences préalables en montage ou en prompt engineering ?'
        : 'Are prior editing or prompt engineering skills required?',
      a: isFr
        ? 'Aucune compétence préalable n’est exigée. Le programme est conçu pour guider pas à pas depuis les bases de la génération jusqu’au montage et à l’étalonnage de niveau professionnel sur DaVinci Resolve Studio.'
        : 'No prior background required. The curriculum is structured step-by-step from foundational generative principles to pro-level editing and color grading in DaVinci Resolve Studio.',
    },
    {
      q: isFr
        ? 'Comment reçois-je mes accès après le règlement sécurisé ?'
        : 'How do I receive access after secure payment?',
      a: isFr
        ? 'Immédiatement après validation du règlement sur Stripe, un e-mail de confirmation contenant vos identifiants d’accès et les liens des 5 modules 4K vous est transmis automatiquement.'
        : 'Immediately following Stripe payment confirmation, an automated email containing your personal access link and credentials to all 5 4K modules is dispatched to your inbox.',
    },
  ];

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

        {/* Masterclass Direct Enrollment & Stripe Checkout Card (Transféré depuis Tarifs) */}
        <div id="inscription" className="max-w-xl mx-auto px-4 mb-8">
          <div className="ovizai-card border border-[#CAA243]/50 bg-[#0B0A08]/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_0_24px_rgba(202,162,67,0.1)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="mono text-[10px] text-[#CAA243] font-bold uppercase tracking-[0.25em] block mb-1">
                  {isFr ? 'TARIF & ACCÈS IMMÉDIAT' : 'PRICING & INSTANT ACCESS'}
                </span>
                <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">
                  {isFr ? 'Masterclass Cinéma & Vidéo IA' : 'AI Cinema & Video Masterclass'}
                </h3>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-semibold text-[#CAA243] font-mono">
                  {formattedCurrent}
                </span>
                <span className="text-xs text-[#9C9384] line-through font-mono">
                  {formattedOriginal}
                </span>
              </div>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-[#9C9384]">
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>{isFr ? '5 modules vidéo pratiques : Midjourney v6, Runway Gen-3, Kling, Topaz & DaVinci' : '5 practical modules: Midjourney v6, Runway Gen-3, Kling, Topaz & DaVinci'}</span>
              </p>
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>{isFr ? 'Accès illimité et à vie + toutes les mises à jour des futurs modèles incluses' : 'Unlimited lifetime access + all future model updates included'}</span>
              </p>
              <p className="flex items-center gap-2 text-[#ECE4D3]">
                <span className="text-[#CAA243] font-bold">✓</span>
                <span>{isFr ? 'Accès immédiat par e-mail après validation sécurisée via Stripe' : 'Instant email access upon secure Stripe checkout'}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="mono text-[10px] text-[#8C8375] font-mono">
                {isFr ? 'Paiement sécurisé Stripe • Facture avec TVA' : 'Secure Stripe checkout • VAT invoice'}
              </span>

              <button
                type="button"
                disabled={mcLoading}
                onClick={handleMasterclassCheckout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(202,162,67,0.25)] cursor-pointer min-h-[44px]"
              >
                {mcLoading ? (
                  <span>{isFr ? 'Redirection Stripe...' : 'Redirecting...'}</span>
                ) : (
                  <span>{isFr ? `S’inscrire à la Masterclass (${formattedCurrent}) →` : `Enroll in Masterclass (${formattedCurrent}) →`}</span>
                )}
              </button>
            </div>

            {mcError && (
              <p className="text-xs text-red-400 font-mono mt-3 text-center">{mcError}</p>
            )}
          </div>
        </div>

        {/* Masterclass FAQ */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="mb-4">
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
              {isFr ? 'FAQ // FORMATION' : 'FAQ // COURSE'}
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
              {isFr ? 'Questions sur la Formation' : 'Course FAQ'}
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.06] ovizai-card border border-white/[0.08] bg-[#0B0A08]">
            {FORMATION_FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#ECE4D3] font-medium leading-snug">{faq.q}</span>
                  <span className="mono text-xs text-[#CAA243] font-bold">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-4 sm:px-5 pb-4 text-xs text-[#9C9384] leading-relaxed border-t border-white/[0.04] pt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Outgoing Link to Pricing */}
        <div className="max-w-xl mx-auto px-4 mt-8 mb-4 text-center">
          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/60 border border-white/[0.12] hover:border-[#CAA243]/50 text-[#ECE4D3] hover:text-[#f0c869] font-bold px-8 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Consulter nos tarifs de production vidéo →' : 'View video production pricing →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
