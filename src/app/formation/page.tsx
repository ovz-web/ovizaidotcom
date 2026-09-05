'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import MasterclassSection from '@/components/MasterclassSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE } from '@/lib/pricing';
import { trackEvent } from '@/lib/analytics';

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
    url: 'https://ovizai.com/formation',
  },
};

export default function FormationPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(true);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  const promoPrice = MASTERCLASS_PRICE[currency] || MASTERCLASS_PRICE.USD;
  const standardPrice = MASTERCLASS_ORIGINAL_PRICE[currency] || MASTERCLASS_ORIGINAL_PRICE.USD;
  const displayedPrice = showPromo ? promoPrice : standardPrice;

  const formattedDisplayedPrice = currency === 'EUR' ? `${displayedPrice} €` : `${displayedPrice} $ ${currency}`;
  const formattedOriginalPrice = currency === 'EUR' ? `${standardPrice} €` : `${standardPrice} $ ${currency}`;

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    trackEvent('checkout_started', {
      plan: 'masterclass',
      currency,
      price: displayedPrice,
      promoApplied: showPromo,
    });

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || (isFr ? 'Une erreur est survenue lors de l’initialisation' : 'An error occurred during checkout'));
      }
    } catch {
      setError(isFr ? 'Erreur de connexion au serveur de paiement' : 'Connection error to payment server');
    } finally {
      setLoading(false);
    }
  };

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
        className="flex-grow relative z-10 pb-3 sm:pb-4"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        {/* Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '02 // FORMATION VIDÉO IA' : '02 // AI VIDEO COURSE'}
          title={
            isFr ? (
              <>
                Formation Vidéo IA & <span className="text-gold-gradient">Masterclass</span>
              </>
            ) : (
              <>
                AI Video Course & <span className="text-gold-gradient">Masterclass</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Un programme pratique en 5 modules pour maîtriser la création de films cinématographiques 4K'
              : 'A practical 5-module program to master 4K cinematic film creation'
          }
        />

        {/* 1. 5 Expandable Modules Accordion */}
        <MasterclassSection lang={lang} />

        {/* 2. Direct Enrollment Card (Collapsible, closed by default) */}
        <div id="inscription" className="max-w-xl mx-auto px-4 mb-3 sm:mb-4">
          <div className="ovizai-card border border-border bg-card/90 rounded-xl overflow-hidden transition-all">
            {/* Clickable Card Header */}
            <button
              type="button"
              onClick={() => setIsEnrollOpen((prev) => !prev)}
              aria-expanded={isEnrollOpen}
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 text-left hover:bg-white/[0.025] transition-colors cursor-pointer group"
            >
              <div className="flex flex-col min-w-0">
                <span className="mono text-[10px] text-gold font-bold uppercase tracking-[0.2em] block mb-0.5">
                  {isFr ? 'INSCRIPTION IMMÉDIATE' : 'INSTANT ENROLLMENT'}
                </span>
                <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg group-hover:text-gold-bright transition-colors truncate">
                  {isFr ? 'Masterclass Cinéma & Vidéo IA 4K' : 'AI Cinema & Video Masterclass 4K'}
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                <span className="mono text-[10.5px] text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded font-mono font-medium">
                  {showPromo ? (isFr ? 'Offre −30%' : '−30% Offer') : (isFr ? 'Standard' : 'Standard')}
                </span>
                <span className="mono text-xs sm:text-[13px] text-gold group-hover:text-gold-bright transition-colors font-medium flex-shrink-0">
                  {isEnrollOpen ? '↑' : '↓'}
                </span>
              </div>
            </button>

            {/* Expandable Details Content */}
            {isEnrollOpen && (
              <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-border animate-fadeIn space-y-4">
                {/* iOS Style Promo Switch Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="mono text-xs text-muted font-mono">
                    {isFr ? 'Offre de lancement (−30%)' : 'Launch offer (−30%)'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="mono text-[10.5px] text-muted font-mono">
                      {showPromo
                        ? (isFr ? 'Offre −30%' : '−30% Offer')
                        : (isFr ? 'Standard' : 'Standard')}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={showPromo}
                      aria-label={isFr ? 'Activer ou désactiver l’offre de lancement' : 'Toggle launch offer discount'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPromo((prev) => !prev);
                      }}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                        showPromo ? 'bg-gold' : 'bg-white/[0.15]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full transition duration-200 ease-in-out ${
                          showPromo
                            ? 'translate-x-5 bg-black shadow-sm'
                            : 'translate-x-0 bg-white/80 shadow-sm'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Price block */}
                <div className="py-2 border-b border-border/60">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-semibold text-gold font-mono tracking-tight">
                      {formattedDisplayedPrice}
                    </span>
                    <span className="mono text-[10px] sm:text-xs text-muted font-bold uppercase tracking-wider">
                      {isFr ? 'TTC' : 'Incl. VAT'}
                    </span>
                    {showPromo && (
                      <span className="text-sm text-muted line-through font-mono ml-1">
                        {formattedOriginalPrice}
                      </span>
                    )}
                    <span className="mono text-xs text-muted ml-auto">
                      {isFr ? 'Paiement unique sans abonnement' : 'One-time fee, zero subscription'}
                    </span>
                  </div>
                  {showPromo && (
                    <p className="text-[11px] font-mono text-gold-bright mt-1.5 flex items-center gap-1">
                      <span>✓</span>
                      <span>
                        {isFr
                          ? 'Tarif de lancement appliqué : 30% de réduction immédiate'
                          : 'Launch rate applied: 30% immediate discount'}
                      </span>
                    </p>
                  )}
                </div>

                {/* What is included */}
                <div className="py-2 space-y-2 text-xs text-muted font-sans">
                  {[
                    isFr ? '5 modules vidéo complets en accès instantané illimité' : '5 complete video modules with instant unlimited lifetime access',
                    isFr ? 'Bibles de prompts certifiés cinéma & presets d’éclairage' : 'Certified cinema prompt bibles & studio lighting presets',
                    isFr ? 'Profils d’upscaling Topaz Video AI & templates DaVinci Resolve' : 'Topaz Video AI upscaling profiles & DaVinci Resolve templates',
                    isFr ? 'Toutes les futures mises à jour des nouveaux moteurs IA incluses' : 'All future updates for emerging generative video engines included',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-fg/90">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Legal guarantee note */}
                <div className="pt-2 border-t border-border/40 flex items-start gap-1.5 text-[10.5px] text-muted font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    {isFr
                      ? 'Accès immédiat garanti à vie — contenu numérique avec activation instantanée'
                      : 'Guaranteed lifetime access — instant digital delivery upon confirmation'}
                  </span>
                </div>

                {/* Stripe Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleCheckout}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold px-6 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 text-black animate-spin" />
                        <span>{isFr ? 'Redirection vers Stripe…' : 'Redirecting to Stripe…'}</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {isFr
                            ? `Accéder à la Masterclass (${formattedDisplayedPrice}) →`
                            : `Enroll in Masterclass (${formattedDisplayedPrice}) →`}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </div>

                {error && <p className="text-xs text-red-400 font-mono mt-2 text-center">{error}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Contact fallback */}
        <div className="max-w-xl mx-auto px-4 mb-4 text-center">
          <p className="text-xs text-muted">
            {isFr
              ? 'Une question sur le programme ou les modalités de formation ?'
              : 'Have a question about the curriculum or training details?'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 mono text-xs text-gold hover:underline mt-1.5"
          >
            <span>{isFr ? 'Poser une question à l’équipe →' : 'Ask our studio team →'}</span>
          </Link>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
