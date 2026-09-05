'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, HelpCircle, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE } from '@/lib/pricing';

// Offre de lancement — nombre de places restantes modifiable manuellement
const PLACES_RESTANTES: number = 5;

const PLANS_DATA = [
  {
    id: 'sprint',
    badge: { fr: 'D01 // TARIF DE LANCEMENT', en: 'D01 // LAUNCH TIER' },
    name: { fr: 'Sprint Pilote 48-72h', en: '48-72h Pilot Sprint' },
    minUsd: 530,
    originalMinUsd: 750,
    launchOffer: true,
    budgetTierId: 'tier-0',
    tag: { fr: 'Sans engagement — validation sur prévisualisation', en: 'No commitment — preview validation' },
    includes: {
      fr: [
        '1 asset publicitaire court (Reel/TikTok 15-30s)',
        '1 round de révision inclus',
        'Livraison garantie sous 48-72h ouvrées',
        'Export 4K Master (16:9 & 9:16 vertical)',
        'Direction artistique, concept & étalonnage DaVinci',
      ],
      en: [
        '1 short ad asset (Reel/TikTok 15-30s)',
        '1 revision round included',
        'Guaranteed 48-72h delivery',
        '4K Master export (16:9 & 9:16 vertical)',
        'Art direction, concept & DaVinci Resolve grading',
      ],
    },
    primary: false,
    starterHighlight: true,
  },
  {
    id: 'premium',
    badge: { fr: 'D02 // CAMPAGNE DE MARQUE', en: 'D02 // BRAND CAMPAIGN' },
    name: { fr: 'Campagne de Marque (3 Films)', en: 'Brand Campaign (3 Films)' },
    minUsd: 2600,
    originalMinUsd: 3700,
    launchOffer: true,
    budgetTierId: 'tier-1',
    includes: {
      fr: [
        '3 vidéos cinématographiques (campagne déclinée)',
        '3 rounds de révision inclus',
        'Livraison prioritaire 48-72h',
        'Export multi-formats 4K (Ciné, Reel, YouTube)',
        'Direction artistique dédiée & accompagnement sur-mesure',
      ],
      en: [
        '3 finalised cinematic videos (campaign package)',
        '3 revision rounds included',
        'Priority delivery 48-72h',
        '4K multi-format export (Cinema, Reel, YouTube)',
        'Dedicated art direction & tailored support',
      ],
    },
    primary: true,
  },
];

const CUSTOM_SERVICES_SUMMARY = [
  {
    id: 'films-series',
    number: 'E01',
    title: { fr: 'Réalisation de Films & Séries', en: 'Film & Series Direction' },
    minUsd: 8000,
    maxUsd: 15000,
    type: 'film-series',
    budget: 'tier-3',
  },
  {
    id: 'clips-visualisers',
    number: 'E02',
    title: { fr: 'Clips Vidéos & Visualisers', en: 'Music Videos & Visualizers' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'clip-visualiser',
    budget: 'tier-2',
  },
  {
    id: 'pub-brand-content',
    number: 'E03',
    title: { fr: 'Publicités & Brand Content', en: 'Commercials & Brand Content' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'pub-brand',
    budget: 'tier-2',
  },
  {
    id: 'da-univers-visuels',
    number: 'E04',
    title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' },
    minUsd: 1000,
    maxUsd: 3000,
    type: 'da-univers',
    budget: 'tier-1',
  },
  {
    id: 'web-digital',
    number: 'E05',
    title: { fr: 'Création de Sites Web & Plateformes Digitales', en: 'Websites & Digital Experiences' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'web-digital',
    budget: 'tier-2',
  },
];

const copy = {
  fr: {
    back: 'Retour Accueil',
    eyebrow: '04 // TARIFS & FORMULES',
    title: 'Tarifs & Formules de Production',
    sectionA: 'D. Formules Clés en Main',
    sectionASub: 'Sprint Pilote et Campagne de Marque avec révisions et délais garantis.',
    sectionB: 'E. Prestations Sur-Mesure',
    sectionBSub: 'Projets complexes et productions d’envergure avec accompagnement dédié.',
    sectionC: 'F. Formation & Masterclass Pro',
    sectionCSub: 'Programme complet de production vidéo IA 4K pour créateurs et studios.',
    faqTitle: 'G. Questions Fréquentes',
    faqSub: 'Toutes les réponses sur nos tarifs, nos modalités de règlement, nos délais et la formation.',
    faqCategories: [
      {
        category: 'Facturation & Règlements',
        items: [
          {
            q: 'Comment fonctionne le paiement du Sprint Pilote 48-72h ?',
            a: "Le Sprint Pilote est sans engagement : le règlement s'effectue après validation de l'aperçu visuel de votre asset.",
          },
          {
            q: 'Quelles sont les modalités de paiement pour les projets sur-mesure ?',
            a: "Pour les campagnes et projets sur-mesure (E01 à E05), un acompte de 50 % est requis au lancement de la production, le solde étant réglé à la livraison finale du master 4K.",
          },
          {
            q: 'Le paiement est-il sécurisé et émettez-vous des factures professionnelles ?',
            a: "Oui, tous les règlements sont sécurisés par Stripe et vous recevez automatiquement une facture pro conforme avec mentions légales de TVA.",
          },
        ],
      },
      {
        category: 'Production, Délais & Process',
        items: [
          {
            q: 'Comment se déroulent les validations et les rounds de révision inclus ?',
            a: "Chaque formule et projet sur-mesure comprend des rounds de révision intégrés (1 pour le Sprint 48h, 3 pour les Campagnes). Vous validez d’abord une prévisualisation de l’asset pour ajuster le rythme, les cadrages ou la colorimétrie avant l’export final 4K.",
          },
          {
            q: 'Pourquoi les tarifs sont-ils 70 à 90 % inférieurs à une agence classique ?',
            a: "En remplaçant les tournages physiques (équipes de 10 personnes, location de studios, matériel lourd, déplacements) par notre pipeline génératif combinant Midjourney, Flux, Kling et Runway avec un étalonnage DaVinci Resolve Studio, nous éliminons 80 % de la logistique conventionnelle tout en conservant une direction artistique de niveau cinéma.",
          },
        ],
      },
      {
        category: 'Formation & Masterclass',
        items: [
          {
            q: 'L’accès à la Masterclass inclut-il les futures versions des modèles IA ?',
            a: "Oui. Votre accès est illimité et à vie. Il inclut toutes les futures mises à jour vidéo du curriculum sans surcoût (nouveaux modèles Runway Gen-4, Kling 2.0, Midjourney v7 et workflows d’upscale 4K).",
          },
          {
            q: 'Faut-il du matériel lourd ou des compétences préalables en montage ?',
            a: "Aucune compétence préalable ni matériel puissant n'est exigé. Les calculs IA s'effectuent sur le cloud, un ordinateur standard suffit. Le programme vous guide pas à pas depuis les bases de la génération jusqu’à l’étalonnage pro.",
          },
          {
            q: 'Comment reçois-je mes accès après le règlement sécurisé ?',
            a: "Immédiatement après validation du règlement sur Stripe, un e-mail de confirmation contenant vos identifiants d’accès et les liens des 5 modules 4K vous est transmis automatiquement.",
          },
        ],
      },
    ],
    ctaLabel: 'Demander un devis sur-mesure (24h)',
    ctaSub: 'Réponse et proposition sous 24-48h — sans engagement.',
  },
  en: {
    back: 'Back Home',
    eyebrow: '04 // PRICING & PACKAGES',
    title: 'Production Pricing & Packages',
    sectionA: 'D. Turnkey Packages',
    sectionASub: 'Pilot Sprint and Brand Campaign with guaranteed delivery & revisions.',
    sectionB: 'E. Custom Services',
    sectionBSub: 'Complex productions and custom campaigns with dedicated art direction.',
    sectionC: 'F. Pro Training & Masterclass',
    sectionCSub: 'Complete 4K AI video production training for creators and studios.',
    faqTitle: 'G. FAQ',
    faqSub: 'All answers regarding pricing, payment terms, production turnaround, and training access.',
    faqCategories: [
      {
        category: 'Billing & Payments',
        items: [
          {
            q: 'How does payment work for the 48-72h Pilot Sprint?',
            a: 'The Pilot Sprint is zero-risk: payment is settled upon preview approval of your initial video cut.',
          },
          {
            q: 'What are the payment terms for custom projects?',
            a: 'For custom campaigns and productions (E01 to E05), a 50% deposit is required at kickoff, with the balance settled upon final 4K master delivery.',
          },
          {
            q: 'Are payments secure and do you issue corporate invoices?',
            a: 'Yes, all payments are processed securely via Stripe and VAT-compliant corporate invoices are generated automatically.',
          },
        ],
      },
      {
        category: 'Production, Turnaround & Process',
        items: [
          {
            q: 'How do project previews and included revision rounds work?',
            a: 'Each turnkey package and custom production includes built-in revision rounds (1 for 48h Sprint, 3 for Campaigns). You first review a watermarked preview to fine-tune pacing, camera framing, or color grading prior to final 4K master delivery.',
          },
          {
            q: 'Why are prices 70 to 90% lower than traditional agency productions?',
            a: 'By replacing physical shoots (10-person crews, studio rentals, heavy camera gear, travel) with our generative pipeline combining Midjourney, Flux, Kling, and Runway with pro DaVinci Resolve Studio grading, we eliminate 80% of conventional friction while retaining cinema-grade visual identity.',
          },
        ],
      },
      {
        category: 'Masterclass & Training',
        items: [
          {
            q: 'Does Masterclass enrollment include future AI model updates?',
            a: 'Yes. Your access is unlimited and lifetime. It includes all future curriculum video updates at no extra charge (new models from Runway, Kling, Midjourney, and 4K upscale workflows).',
          },
          {
            q: 'Is heavy hardware or prior editing experience required?',
            a: 'No prior experience or powerful hardware is required. AI processing runs in the cloud, so a standard laptop suffices. The curriculum guides you step-by-step from generative basics to pro grading.',
          },
          {
            q: 'How do I receive access after secure payment?',
            a: 'Immediately following Stripe payment confirmation, an automated email containing your personal access link and credentials to all 5 4K modules is dispatched to your inbox.',
          },
        ],
      },
    ],
    ctaLabel: 'Request a custom quote (24h)',
    ctaSub: 'Reply and proposal within 24-48h — no commitment.',
  },
};

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showLaunchDiscount, setShowLaunchDiscount] = useState<boolean>(true);
  const [mcLoading, setMcLoading] = useState(false);
  const [mcError, setMcError] = useState<string | null>(null);

  const isFr = lang === 'fr';
  const t = copy[lang];
  const showToast = (msg: string) => setToastMessage(msg);

  const masterclassCurrent = MASTERCLASS_PRICE[currency] || 490;
  const masterclassOriginal = MASTERCLASS_ORIGINAL_PRICE[currency] || 990;

  const formattedMasterclassCurrent =
    currency === 'EUR'
      ? `${masterclassCurrent} €`
      : currency === 'CAD'
      ? `${masterclassCurrent} $ CAD`
      : `${masterclassCurrent} $ USD`;

  const formattedMasterclassOriginal =
    currency === 'EUR'
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
        setMcError(
          data.error ||
            (isFr
              ? 'Erreur lors de l’initialisation Stripe.'
              : 'Failed to create checkout session.')
        );
        setMcLoading(false);
      }
    } catch (err: any) {
      setMcError(isFr ? 'Erreur de connexion serveur.' : 'Server connection error.');
      setMcLoading(false);
    }
  };

  const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'OVIZai',
    url: 'https://ovizai.com/tarifs',
    logo: 'https://ovizai.com/logo.png',
    description: 'Studio de direction artistique et production vidéo IA cinématographique.',
    priceRange: '$$$',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Formules de Production Vidéo IA',
      itemListElement: PLANS_DATA.map((plan) => {
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: plan.name[lang],
            description: plan.includes[lang].join(', '),
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: plan.minUsd,
            priceCurrency: 'USD',
          },
        };
      }),
    },
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-[#080808] text-[#ECE4D3]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
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
          eyebrow={isFr ? '04 // TARIFS & FORMULES' : '04 // PRICING & PACKAGES'}
          title={
            isFr ? (
              <>
                Tarifs & <span className="text-gold-gradient text-gold-glow">Formules de Production</span>
              </>
            ) : (
              <>
                Production <span className="text-gold-gradient text-gold-glow">Pricing & Packages</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Des tarifs clairs et transparents pour tous vos projets de création vidéo IA.'
              : 'Clear and transparent pricing for all your AI video creation projects.'
          }
        />

        <div className="max-w-xl mx-auto px-4">
          {/* ── SECTION D — FORMULES CLÉS EN MAIN ─────────────────────── */}
          <section className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
                SECTION D
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
                {t.sectionA}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.sectionASub}
              </p>
            </div>

            {/* Toggle: Normal Price vs Launch Discount (-30%) */}
            <div className="mb-5 p-3 sm:p-4 rounded-xl bg-[#0B0A08] border border-white/[0.08] flex items-center justify-between gap-4 flex-wrap">
              <span className="mono text-xs text-[#ECE4D3] font-semibold">
                {isFr ? 'TARIFICATION APPLIQUÉE' : 'PRICING MODE'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowLaunchDiscount(false)}
                  className={`mono text-xs transition-colors cursor-pointer ${
                    !showLaunchDiscount ? 'text-[#CAA243] font-semibold' : 'text-[#9C9384] hover:text-[#ECE4D3]'
                  }`}
                >
                  {isFr ? 'Tarif standard' : 'Standard rate'}
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showLaunchDiscount}
                  onClick={() => setShowLaunchDiscount(!showLaunchDiscount)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer border focus:outline-none ${
                    showLaunchDiscount
                      ? 'bg-[#CAA243] border-[#CAA243]'
                      : 'bg-black/60 border-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                      showLaunchDiscount ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setShowLaunchDiscount(true)}
                  className={`mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                    showLaunchDiscount ? 'text-[#f0c869] font-semibold' : 'text-[#9C9384] hover:text-[#ECE4D3]'
                  }`}
                >
                  <span>{isFr ? 'Offre de lancement (-30%)' : 'Launch offer (-30%)'}</span>
                  {showLaunchDiscount && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CAA243] animate-pulse" />
                  )}
                </button>
              </div>
            </div>

            {/* Embedded Launch Offer Callout (only if showLaunchDiscount) */}
            {showLaunchDiscount && (
              <div className="mb-6 rounded-xl border border-[#CAA243]/30 bg-[#CAA243]/[0.05] p-3.5 sm:p-4 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#ECE4D3] leading-relaxed">
                  <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-0.5">
                    {isFr ? 'OFFRE DE LANCEMENT — LIMITÉE (−30%)' : 'LAUNCH OFFER — LIMITED (−30%)'}
                  </span>
                  <p className="text-xs text-[#ECE4D3]">
                    {isFr ? (
                      <>
                        Offre de lancement : −30 % sur nos 2 formules pour les 5 premiers clients.
                        <br className="hidden sm:inline" />
                        <span className="text-[#CAA243] font-semibold"> {PLACES_RESTANTES} places restantes</span> — retour au tarif normal ensuite.
                      </>
                    ) : (
                      <>
                        Launch offer: −30% on both plans for the first 5 clients.
                        <br className="hidden sm:inline" />
                        <span className="text-[#CAA243] font-semibold"> {PLACES_RESTANTES} spots remaining</span> — full price applies after.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Vertical Packaged Cards Stack (matching unified max-w-xl design system) */}
            <div className="flex flex-col gap-5">
              {PLANS_DATA.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`ovizai-card flex flex-col justify-between gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all ${
                      plan.primary
                        ? 'border border-[#CAA243]/70 bg-[#0B0A08]/95 shadow-[0_0_24px_rgba(202,162,67,0.12)]'
                        : 'border border-[#CAA243]/40 bg-[#0B0A08]/80'
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                        <div>
                          <p className="mono text-[10px] text-[#CAA243] mb-0.5 font-bold tracking-wider">
                            {plan.badge[lang]}
                          </p>
                          <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">{plan.name[lang]}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {showLaunchDiscount && plan.launchOffer && (
                            <span className="mono text-[9px] uppercase tracking-wider bg-[#CAA243]/20 text-[#f0c869] px-2 py-0.5 rounded-full border border-[#CAA243]/50 font-bold shadow-[0_0_8px_rgba(202,162,67,0.2)]">
                              {isFr ? 'Offre de lancement -30%' : 'Launch offer -30%'}
                            </span>
                          )}
                          {plan.primary ? (
                            <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-[#ECE4D3] px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                              {isFr ? 'Recommandé' : 'Recommended'}
                            </span>
                          ) : plan.starterHighlight ? (
                            <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-[#ECE4D3] px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                              {isFr ? 'Starter' : 'Starter'}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="my-3 pb-3 border-b border-white/[0.06]">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <p className="text-2xl sm:text-3xl font-semibold font-mono text-[#ECE4D3] leading-none tracking-tight">
                            {showLaunchDiscount
                              ? formatPrice(plan.minUsd, currency)
                              : formatPrice(plan.originalMinUsd || plan.minUsd, currency)}
                          </p>
                          {showLaunchDiscount && plan.originalMinUsd && (
                            <p className="text-sm sm:text-base text-[#9C9384] line-through font-mono font-medium">
                              {formatPrice(plan.originalMinUsd, currency)}
                            </p>
                          )}
                        </div>
                        <p className="text-[11px] text-[#9C9384] mt-1.5 font-mono">
                          {plan.id === 'sprint'
                            ? (isFr ? '/ asset 15-30s' : '/ 15-30s asset')
                            : (isFr ? '/ campagne 3 films' : '/ 3-film campaign')}
                        </p>
                      </div>

                      {/* Tag if present */}
                      {plan.tag && (
                        <div className="mb-3 flex items-center gap-1.5 text-[10.5px] font-mono text-[#CAA243] bg-[#CAA243]/10 px-2.5 py-1 rounded border border-[#CAA243]/20">
                          <Zap className="w-3 h-3 flex-shrink-0" />
                          <span>{plan.tag[lang]}</span>
                        </div>
                      )}

                      {/* Includes List */}
                      <ul className="flex flex-col gap-2.5 my-3">
                        {plan.includes[lang].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#9C9384] leading-snug">
                            <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0 mt-0.5" />
                            <span className="text-[#ECE4D3]/90">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Revision Policy Notice */}
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[10.5px] text-[#9C9384] leading-relaxed">
                        <span className="text-[#CAA243] font-semibold block font-mono mb-0.5">
                          {isFr ? 'Si le résultat nécessite des ajustements :' : 'If adjustments are needed:'}
                        </span>
                        {plan.id === 'sprint'
                          ? (isFr
                              ? '1 round de révision inclus pour ajuster le rythme ou la couleur, avec validation sur prévisualisation.'
                              : '1 revision round included to adjust pacing or color grading, with preview approval.')
                          : (isFr
                              ? '3 rounds de révision inclus pour affiner chaque plan et déclinaison selon vos retours.'
                              : '3 revision rounds included to fine-tune every shot and variation based on feedback.')}
                      </div>
                    </div>

                    {/* Single CTA Link per Card */}
                    <Link
                      href={`/contact?service=${plan.id}&type=pub-brand&budget=${plan.budgetTierId}`}
                      className={`w-full min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                        plan.primary
                          ? 'bg-[#CAA243] hover:bg-[#f0c869] text-black shadow-[0_0_18px_rgba(202,162,67,0.25)] hover:scale-[1.01]'
                          : 'bg-black/50 border border-[#CAA243]/50 hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#f0c869]'
                      }`}
                    >
                      <span>
                        {plan.id === 'sprint'
                          ? (isFr ? 'Réserver Sprint 48h →' : 'Book 48h Sprint →')
                          : (isFr ? 'Réserver Campagne →' : 'Book Campaign →')}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SECTION E — PRESTATIONS SUR-MESURE ───────────────────── */}
          <section className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
                SECTION E
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
                {t.sectionB}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.sectionBSub}
              </p>
            </div>

            {/* Synthetic 5-Row Table */}
            <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08] divide-y divide-white/[0.06] rounded-xl overflow-hidden mb-4">
              {CUSTOM_SERVICES_SUMMARY.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="mono text-xs font-bold text-[#CAA243] bg-black/50 border border-[#CAA243]/30 px-2.5 py-1 rounded flex-shrink-0">
                        {service.number}
                      </span>
                      <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3] truncate">
                        {service.title[lang]}
                      </h3>
                    </div>

                    <div className="flex items-center justify-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                      <Link
                        href={`/contact?service=${service.id}&type=${service.type}&budget=${service.budget}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#CAA243]/10 hover:bg-[#CAA243]/20 border border-[#CAA243]/30 hover:border-[#CAA243]/60 mono text-xs text-[#CAA243] hover:text-[#f0c869] font-bold transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>{isFr ? 'Sur devis (24h) →' : 'Custom quote (24h) →'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SECTION F — FORMATION & MASTERCLASS PRO ─────────────── */}
          <section id="masterclass" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
                SECTION F
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
                {t.sectionC}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.sectionCSub}
              </p>
            </div>

            <div className="ovizai-card border border-[#CAA243]/50 bg-[#0B0A08]/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-[0_0_24px_rgba(202,162,67,0.1)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <span className="mono text-[10px] text-[#CAA243] font-bold uppercase tracking-[0.25em] block mb-0.5">
                    {isFr ? 'F // FORMATION VIDÉO IA' : 'F // AI VIDEO TRAINING'}
                  </span>
                  <h3 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">
                    {isFr ? 'Masterclass Cinéma & Vidéo IA 4K' : 'AI Cinema & Video Masterclass 4K'}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#CAA243] font-mono">
                    {showLaunchDiscount ? formattedMasterclassCurrent : formattedMasterclassOriginal}
                  </span>
                  {showLaunchDiscount && (
                    <span className="text-xs text-[#9C9384] line-through font-mono">
                      {formattedMasterclassOriginal}
                    </span>
                  )}
                </div>
              </div>

              <div className="py-3 space-y-2 text-xs text-[#9C9384]">
                <p className="flex items-center gap-2 text-[#ECE4D3]">
                  <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                  <span>
                    {isFr
                      ? '5 modules vidéo pratiques : Midjourney v6, Runway Gen-3, Kling, Topaz & DaVinci'
                      : '5 practical modules: Midjourney v6, Runway Gen-3, Kling, Topaz & DaVinci'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-[#ECE4D3]">
                  <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Accès illimité et à vie + toutes les mises à jour des futurs modèles incluses'
                      : 'Unlimited lifetime access + all future model updates included'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-[#ECE4D3]">
                  <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Fichiers projets DaVinci Resolve Studio & prompts certifiés fournis'
                      : 'DaVinci Resolve Studio project files & certified prompts provided'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-[#ECE4D3]">
                  <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Délivrance immédiate par e-mail après règlement sécurisé Stripe'
                      : 'Instant access delivered via email upon secure Stripe checkout'}
                  </span>
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href="/formation"
                  className="mono text-xs text-[#CAA243] hover:underline"
                >
                  {isFr ? 'Consulter le détail des 5 modules →' : 'View the 5-module curriculum →'}
                </Link>

                <button
                  type="button"
                  disabled={mcLoading}
                  onClick={handleMasterclassCheckout}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(202,162,67,0.25)] cursor-pointer min-h-[44px]"
                >
                  {mcLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                      <span>{isFr ? 'Redirection Stripe...' : 'Redirecting...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isFr
                          ? `S’inscrire à la Masterclass (${showLaunchDiscount ? formattedMasterclassCurrent : formattedMasterclassOriginal}) →`
                          : `Enroll in Masterclass (${showLaunchDiscount ? formattedMasterclassCurrent : formattedMasterclassOriginal}) →`}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </div>

              {mcError && (
                <p className="text-xs text-red-400 font-mono mt-3 text-center">{mcError}</p>
              )}
            </div>
          </section>

          {/* ── SECTION G — LA FAQ UNIQUE ET CENTRALE DU SITE ─────────── */}
          <section id="faq" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#CAA243] font-bold block mb-1">
                SECTION G // FAQ GLOBALE
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
                {t.faqTitle}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.faqSub}
              </p>
            </div>

            <div className="space-y-4">
              {t.faqCategories.map((cat, catIdx) => (
                <div key={cat.category} className="ovizai-card border border-white/[0.08] bg-[#0B0A08] overflow-hidden">
                  <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
                    <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#CAA243] font-bold">
                      {cat.category}
                    </span>
                    <span className="mono text-[10px] text-[#8C8375]">
                      {cat.items.length} {isFr ? 'questions' : 'questions'}
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.06]">
                    {cat.items.map((faq, itemIdx) => {
                      const faqKey = `${catIdx}-${itemIdx}`;
                      const isOpen = openFaq === faqKey;
                      return (
                        <div key={faq.q}>
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : faqKey)}
                            className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
                          >
                            <span className="text-xs text-[#ECE4D3] font-medium leading-snug">{faq.q}</span>
                            <HelpCircle
                              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                                isOpen ? 'text-[#CAA243]' : 'text-[#9C9384]'
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <p className="px-4 sm:px-5 pb-4 text-xs text-[#9C9384] leading-relaxed border-t border-white/[0.04] pt-2">
                              {faq.a}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Bottom Single CTA ───────────────────────────────────────────── */}
          <div className="text-center pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
            >
              <span>{t.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
            <p className="text-[11px] text-[#9C9384] font-mono mt-2.5">{t.ctaSub}</p>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
