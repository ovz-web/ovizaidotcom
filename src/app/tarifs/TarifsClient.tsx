'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  HelpCircle,
  Zap,
  Loader2,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Film,
  Music2,
  Clapperboard,
  Palette,
  Globe2,
  Clock,
} from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE, PRICING_PLANS } from '@/lib/pricing';
import { trackEvent } from '@/lib/analytics';

const CUSTOM_SERVICES = [
  { id: 'films-series', num: '01', title: { fr: 'Réalisation de Films & Séries', en: 'Film & Series Direction' }, type: 'film-series', budget: 'tier-3', icon: Film },
  { id: 'clips-visualisers', num: '02', title: { fr: 'Clips Vidéos & Visualisers', en: 'Music Videos & Visualizers' }, type: 'clip-visualiser', budget: 'tier-2', icon: Music2 },
  { id: 'pub-brand-content', num: '03', title: { fr: 'Publicités & Brand Content', en: 'Commercials & Brand Content' }, type: 'pub-brand', budget: 'tier-2', icon: Clapperboard },
  { id: 'da-univers-visuels', num: '04', title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' }, type: 'da-univers', budget: 'tier-1', icon: Palette },
  { id: 'web-digital', num: '05', title: { fr: 'Création de Sites Web & Plateformes Digitales', en: 'Websites & Digital Experiences' }, type: 'web-digital', budget: 'tier-2', icon: Globe2 },
];

const FAQ_ITEMS = [
  {
    q: {
      fr: 'Quelles sont les modalités de règlement pour les formules et sur-mesure ?',
      en: 'What are the payment terms for packages and custom productions?',
    },
    a: {
      fr: 'Pour la Masterclass : règlement sécurisé Stripe en paiement unique sans abonnement.\nPour les formules et projets de marque : acompte de 50 % au lancement de la production, solde de 50 % réglé à la livraison finale du master 4K après votre validation.',
      en: 'For Masterclass: secure Stripe one-time payment with zero subscription.\nFor production packages & custom: 50% deposit upon production kickoff, 50% balance upon final 4K master delivery and approval.',
    },
  },
  {
    q: {
      fr: 'Comment se déroulent les validations et les rounds de révision inclus ?',
      en: 'How do project previews and included revision rounds work?',
    },
    a: {
      fr: 'Chaque formule inclut des rounds de révision complets. Nous vous soumettons une prévisualisation de montage rythmée pour ajuster le cadrage, le rythme et l’étalonnage avant tout export définitif 4K.',
      en: 'Every package includes complete revision rounds. We submit a paced preview cut to fine-tune framing, rhythm, and color grading prior to final 4K master export.',
    },
  },
  {
    q: {
      fr: 'Quels sont les délais garantis de livraison ?',
      en: 'What are the guaranteed turnaround times?',
    },
    a: {
      fr: 'Sprint Pilote : livraison garantie sous 48 à 72h ouvrées.\nCampagne de Marque : livraison sous 48 à 72h ouvrées avec accompagnement dédié.\nProjets sur-mesure d’envergure : calendrier de production personnalisé validé au devis sous 24h.',
      en: 'Pilot Sprint: guaranteed delivery in 48 to 72 business hours.\nBrand Campaign: delivery in 48 to 72 business hours with dedicated support.\nCustom projects: dedicated timeline agreed upon in custom quote within 24h.',
    },
  },
  {
    q: {
      fr: 'Les vidéos sont-elles libres de droits pour un usage commercial ?',
      en: 'Are videos fully cleared for commercial and broadcast use?',
    },
    a: {
      fr: 'Oui, 100 % des droits patrimoniaux et d’exploitation commerciale sont intégralement cédés à votre marque dès le règlement final du projet (diffusion web, réseaux sociaux, TV ou cinéma sans limite de durée).',
      en: 'Yes, 100% of intellectual property and commercial exploitation rights are assigned to your brand upon final delivery (unlimited web, social, TV, or cinema broadcast).',
    },
  },
];

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(true);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mcLoading, setMcLoading] = useState(false);
  const [mcError, setMcError] = useState<string | null>(null);

  const isFr = lang === 'fr';
  const showToast = (msg: string) => setToastMessage(msg);

  const promoPrice = MASTERCLASS_PRICE[currency] || MASTERCLASS_PRICE.USD;
  const standardPrice = MASTERCLASS_ORIGINAL_PRICE[currency] || MASTERCLASS_ORIGINAL_PRICE.USD;
  const currentMcPrice = showPromo ? promoPrice : standardPrice;

  const formattedMcCurrent = currency === 'EUR' ? `${currentMcPrice} €` : `${currentMcPrice} $ ${currency}`;
  const formattedMcOriginal = currency === 'EUR' ? `${standardPrice} €` : `${standardPrice} $ ${currency}`;

  const sprintPlan = PRICING_PLANS.find((p) => p.id === 'sprint')!;
  const campaignPlan = PRICING_PLANS.find((p) => p.id === 'premium')!;

  const handleMasterclassCheckout = async () => {
    setMcLoading(true);
    setMcError(null);
    trackEvent('checkout_started', {
      plan: 'masterclass',
      currency,
      price: currentMcPrice,
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
        setMcError(data.error || (isFr ? 'Une erreur est survenue' : 'An error occurred'));
      }
    } catch {
      setMcError(isFr ? 'Erreur de connexion au serveur' : 'Connection error');
    } finally {
      setMcLoading(false);
    }
  };

  const toggleCard = (id: string) => {
    setOpenCard((prev) => (prev === id ? null : id));
  };

  // 4 Offers arranged in STRICT ASCENDING PRICE ORDER
  const pricingItems: ListMenuItem[] = [
    // 01 // Masterclass (lowest price, launch offer highlight)
    {
      id: 'offer-masterclass',
      icon: GraduationCap,
      title: isFr ? '01 // Formation & Masterclass Vidéo IA 4K' : '01 // AI Video & Cinema Masterclass 4K',
      subtitle: isFr ? '5 modules pratiques & bibles de prompts cinéma' : '5 practical modules & cinema prompt bibles',
      trailing: formattedMcCurrent,
      onClick: () => toggleCard('offer-masterclass'),
      expanded: openCard === 'offer-masterclass',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/[0.06] flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-gold font-mono tracking-tight">
                {formattedMcCurrent}
              </span>
              <span className="mono text-[10.5px] text-muted font-bold uppercase">
                {isFr ? 'TTC' : 'Incl. VAT'}
              </span>
              {showPromo && (
                <span className="text-xs text-muted line-through font-mono ml-1">
                  {formattedMcOriginal}
                </span>
              )}
            </div>
            <span className="mono text-[11px] text-muted">
              {isFr ? 'Paiement unique sans abonnement' : 'One-time fee, zero subscription'}
            </span>
          </div>

          <div className="space-y-2 text-xs text-fg/90">
            {[
              isFr ? '5 modules complets : concept art 8K, animation physique et étalonnage ACES' : '5 complete practical modules: 8K art, physics motion and ACES grading',
              isFr ? 'Bibles de prompts certifiés cinéma et fichiers projets DaVinci Resolve' : 'Certified cinema prompt bibles and DaVinci Resolve project templates',
              isFr ? 'Accès immédiat garanti à vie et futures mises à jour des modèles IA incluses' : 'Guaranteed instant lifetime access and future generative engine updates included',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link href="/formation" className="mono text-xs text-gold hover:underline">
              {isFr ? 'Détail des 5 modules du programme →' : 'View the 5-module curriculum →'}
            </Link>

            <button
              type="button"
              disabled={mcLoading}
              onClick={handleMasterclassCheckout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              {mcLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                  <span>{isFr ? 'Redirection Stripe…' : 'Redirecting…'}</span>
                </>
              ) : (
                <>
                  <span>
                    {isFr
                      ? `S’inscrire à la Masterclass (${formattedMcCurrent}) →`
                      : `Enroll in Masterclass (${formattedMcCurrent}) →`}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>

          {mcError && <p className="text-xs text-red-400 font-mono text-center">{mcError}</p>}
        </div>
      ),
    },

    // 02 // Sprint Pilote 48-72h
    {
      id: 'offer-sprint',
      icon: Zap,
      title: isFr ? '02 // Formule Sprint Pilote (48-72h)' : '02 // Pilot Sprint Package (48-72h)',
      subtitle: isFr ? '1 asset publicitaire court (Reel/TikTok 15-30s)' : '1 short ad asset (Reel/TikTok 15-30s)',
      trailing: formatPrice(sprintPlan.minUsd, currency),
      onClick: () => toggleCard('offer-sprint'),
      expanded: openCard === 'offer-sprint',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/[0.06] flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-fg font-mono tracking-tight">
                {formatPrice(sprintPlan.minUsd, currency)}
              </span>
              <span className="mono text-[10.5px] text-muted font-bold uppercase">
                {isFr ? 'HT' : 'Excl. VAT'}
              </span>
            </div>
            <span className="mono text-[11px] text-gold font-bold">
              {isFr ? 'Livraison express sous 48-72h ouvrées' : 'Guaranteed 48-72h turnaround'}
            </span>
          </div>

          <div className="space-y-2 text-xs text-fg/90">
            {sprintPlan.includes[lang].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>
                {isFr
                  ? 'Garantie prévisualisation : validation du cut avant tout prélèvement'
                  : 'Preview guarantee: cut approved before final balance charge'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end">
            <Link
              href={`/contact?service=sprint&type=pub-brand&budget=${sprintPlan.budgetTierId}`}
              onClick={() => trackEvent('cta_reserve_sprint', { plan: 'sprint', currency })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Réserver un Sprint Pilote 48h →' : 'Book a 48h Pilot Sprint →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    },

    // 03 // Campagne de Marque (3 Films)
    {
      id: 'offer-campaign',
      icon: Film,
      title: isFr ? '03 // Formule Campagne de Marque (3 Films)' : '03 // Brand Campaign Package (3 Films)',
      subtitle: isFr ? '3 vidéos cinématographiques déclinées & DA dédiée' : '3 cinematic campaign videos & dedicated art direction',
      trailing: formatPrice(campaignPlan.minUsd, currency),
      onClick: () => toggleCard('offer-campaign'),
      expanded: openCard === 'offer-campaign',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/[0.06] flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-fg font-mono tracking-tight">
                {formatPrice(campaignPlan.minUsd, currency)}
              </span>
              <span className="mono text-[10.5px] text-muted font-bold uppercase">
                {isFr ? 'HT' : 'Excl. VAT'}
              </span>
            </div>
            <span className="mono text-[11px] text-gold font-bold">
              {isFr ? 'Direction artistique dédiée & 3 rounds de révisions' : 'Dedicated art direction & 3 revision rounds'}
            </span>
          </div>

          <div className="space-y-2 text-xs text-fg/90">
            {campaignPlan.includes[lang].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>
                {isFr
                  ? 'Garantie révisions : 3 rounds inclus jusqu’au master 4K validé'
                  : 'Revision guarantee: 3 rounds included until approved 4K master'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end">
            <Link
              href={`/contact?service=premium&type=pub-brand&budget=${campaignPlan.budgetTierId}`}
              onClick={() => trackEvent('cta_reserve_campaign', { plan: 'premium', currency })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Réserver une Campagne de Marque →' : 'Book a Brand Campaign →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    },

    // 04 // Prestations Sur-Mesure
    {
      id: 'offer-custom',
      icon: Palette,
      title: isFr ? '04 // Prestations Sur-Mesure (5 Services)' : '04 // Custom Services (5 Disciplines)',
      subtitle: isFr ? 'Films, clips, pubs, univers visuels & web digital' : 'Films, music videos, ads, brand worlds & digital',
      trailing: isFr ? 'Sur devis (24h) →' : 'Quote (24h) →',
      onClick: () => toggleCard('offer-custom'),
      expanded: openCard === 'offer-custom',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <p className="text-xs text-muted leading-relaxed">
            {isFr
              ? 'Pour les projets d’envergure, fictions narratives, clips artistiques ou univers de marque complets. Devis clair et chiffré remis sous 24h ouvrées.'
              : 'For ambitious cinematic projects, music videos, narrative fiction or complete brand identity worlds. Clear tailored quote delivered in 24 business hours.'}
          </p>

          <div className="divide-y divide-white/[0.04] border border-white/[0.06] rounded-lg bg-black/40 overflow-hidden">
            {CUSTOM_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.id}
                  href={`/contact?service=${srv.id}&type=${srv.type}&budget=${srv.budget}`}
                  className="group flex items-center justify-between gap-3 p-2.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="mono text-xs text-fg group-hover:text-gold transition-colors font-medium truncate">
                      {`${srv.num} // ${srv.title[lang]}`}
                    </span>
                  </div>
                  <span className="mono text-xs text-muted group-hover:text-gold transition-colors flex-shrink-0">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis personnalisé →' : 'Request a Custom Quote →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
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
        {/* Page Header */}
        <PageHeader
          lang={lang}
          eyebrow={isFr ? '04 // TARIFS & FORMULES DE PRODUCTION' : '04 // PRICING & PRODUCTION PACKAGES'}
          title={
            isFr ? (
              <>
                Tarifs & <span className="text-gold-gradient">Formules de Studio</span>
              </>
            ) : (
              <>
                Studio <span className="text-gold-gradient">Pricing & Packages</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Une grille tarifaire claire et ordonnée pour tous vos projets de vidéo et de formation'
              : 'A clear, structured pricing grid for all your video production and training projects'
          }
        />

        <div className="max-w-xl mx-auto px-4 mb-8">
          {/* iOS Style Promo Switch Toggle */}
          <div className="flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
              <div>
                <span className="mono text-xs text-fg font-semibold block">
                  {isFr ? 'Offre de Lancement (−30%)' : 'Launch Offer (−30%)'}
                </span>
                <span className="text-[10.5px] text-muted font-mono block mt-0.5">
                  {showPromo
                    ? (isFr ? 'Tarif réduit appliqué' : 'Discount active')
                    : (isFr ? 'Plein tarif standard' : 'Regular pricing')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="mono text-[10px] text-muted hidden sm:inline uppercase tracking-wider">
                {showPromo ? (isFr ? 'Activé' : 'On') : (isFr ? 'Désactivé' : 'Off')}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={showPromo}
                aria-label={isFr ? 'Activer ou désactiver l’offre de lancement' : 'Toggle launch offer discount'}
                onClick={() => setShowPromo((prev) => !prev)}
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

          {/* Unified Pricing Box (Ascending Order, Expandable Accordion) */}
          <div className="mb-8">
            <ListMenuCard items={pricingItems} />
          </div>

          {/* Centralized Clean FAQ (4 Questions without noise or scattering) */}
          <div className="mb-8">
            <div className="mb-3">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'QUESTIONS FRÉQUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg leading-snug">
                {isFr ? 'Facturation, Production & Délais' : 'Billing, Turnaround & Process'}
              </h2>
            </div>

            <div className="ovizai-card border border-border bg-card divide-y divide-white/[0.06] rounded-xl overflow-hidden">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
                    >
                      <span className="text-xs text-fg font-medium leading-snug">
                        {faq.q[lang]}
                      </span>
                      <HelpCircle
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isOpen ? 'text-gold' : 'text-muted'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 text-xs text-muted leading-relaxed border-t border-white/[0.04] pt-2 space-y-1">
                        {faq.a[lang].split('\n').map((line, lIdx) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Custom Quote Direct Link */}
          <div className="text-center pt-2">
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_request_custom_quote', { source: 'tarifs_bottom' })}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[48px]"
            >
              <span>{isFr ? 'Demander un devis sur-mesure (24h) →' : 'Request custom quote (24h) →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
            <p className="text-[11px] text-muted font-mono mt-2.5">
              {isFr
                ? 'Réponse détaillée et cadrage budgétaire sous 24h ouvrées'
                : 'Detailed response and budget scope within 24 business hours'}
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
