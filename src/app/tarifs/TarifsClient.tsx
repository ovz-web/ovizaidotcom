'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, HelpCircle, Zap, Loader2 } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE, PRICING_PLANS } from '@/lib/pricing';

const CUSTOM_SERVICES_SUMMARY = [
  {
    id: 'films-series',
    number: '01',
    title: { fr: 'Réalisation de Films & Séries', en: 'Film & Series Direction' },
    type: 'film-series',
    budget: 'tier-3',
  },
  {
    id: 'clips-visualisers',
    number: '02',
    title: { fr: 'Clips Vidéos & Visualisers', en: 'Music Videos & Visualizers' },
    type: 'clip-visualiser',
    budget: 'tier-2',
  },
  {
    id: 'pub-brand-content',
    number: '03',
    title: { fr: 'Publicités & Brand Content', en: 'Commercials & Brand Content' },
    type: 'pub-brand',
    budget: 'tier-2',
  },
  {
    id: 'da-univers-visuels',
    number: '04',
    title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' },
    type: 'da-univers',
    budget: 'tier-1',
  },
  {
    id: 'web-digital',
    number: '05',
    title: { fr: 'Création de Sites Web & Plateformes Digitales', en: 'Websites & Digital Experiences' },
    type: 'web-digital',
    budget: 'tier-2',
  },
];

const copy = {
  fr: {
    back: 'Retour Accueil',
    eyebrow: '04 // TARIFS & FORMULES',
    title: 'Tarifs & Formules de Production',
    sectionA: 'Formules Clés en Main',
    sectionASub: 'Sprint Pilote et Campagne de Marque avec révisions et délais garantis',
    sectionB: 'Prestations Sur-Mesure',
    sectionBSub: 'Projets complexes et productions d’envergure avec accompagnement dédié',
    sectionC: 'Formation & Masterclass Pro',
    sectionCSub: 'Programme complet de production vidéo IA 4K pour créateurs et studios',
    faqTitle: 'Questions Fréquentes',
    faqSub: 'Toutes les réponses sur nos tarifs, nos modalités de règlement et nos délais',
    faqCategories: [
      {
        category: 'Facturation & Règlements',
        items: [
          {
            q: 'Comment fonctionne le paiement du Sprint Pilote 48-72h ?',
            a: 'Le Sprint Pilote est totalement sans engagement\nVous découvrez d’abord l’aperçu visuel de votre asset\nLe règlement s’effectue uniquement après votre validation',
          },
          {
            q: 'Quelles sont les modalités de paiement pour les projets sur-mesure ?',
            a: 'Pour les campagnes et projets sur-mesure\nAcompte de 50 % au lancement de la production\nSolde réglé à la livraison finale du master 4K',
          },
          {
            q: 'Le paiement est-il sécurisé et émettez-vous des factures professionnelles ?',
            a: 'Tous les règlements sont sécurisés par Stripe\nFacture professionnelle conforme avec TVA émise automatiquement',
          },
        ],
      },
      {
        category: 'Production, Délais & Process',
        items: [
          {
            q: 'Comment se déroulent les validations et les rounds de révision inclus ?',
            a: 'Rounds de révision inclus sur chaque formule\nValidation sur prévisualisation pour ajuster rythme et cadrages\nFinalisation et étalonnage avant l’export 4K',
          },
          {
            q: 'Quels sont les délais garantis de livraison ?',
            a: 'Livraison sous 48 à 72h ouvrées pour le Sprint Pilote\nLivraison prioritaire 48 à 72h pour la Campagne de Marque\nPlanning dédié validé au devis pour les projets sur-mesure',
          },
        ],
      },
      {
        category: 'Formation & Masterclass',
        items: [
          {
            q: 'L’inscription à la Masterclass inclut-elle les futures mises à jour ?',
            a: 'Votre accès est illimité et garanti à vie\nToutes les futures mises à jour vidéo sont incluses sans supplément\nNouveaux modèles de génération, 3D et méthodes d’upscaling 4K',
          },
          {
            q: 'Faut-il du matériel puissant ou une expérience préalable en montage ?',
            a: 'Aucune expérience préalable ni matériel lourd requis\nLes générations s’exécutent sur serveurs cloud distants\nUn simple ordinateur portable connecté suffit',
          },
          {
            q: 'Comment reçoit-on les accès après le règlement ?',
            a: 'Délivrance immédiate par e-mail dès confirmation Stripe\nIdentifiants personnels et liens d’accès direct aux 5 modules 4K\nAccès instantané à l’ensemble des ressources privées',
          },
        ],
      },
    ],
    ctaLabel: 'Demander un devis sur-mesure (24h)',
    ctaSub: 'Réponse et proposition sous 24-48h — sans engagement',
  },
  en: {
    back: 'Back Home',
    eyebrow: '04 // PRICING & PACKAGES',
    title: 'Production Pricing & Packages',
    sectionA: 'Turnkey Packages',
    sectionASub: 'Pilot Sprint and Brand Campaign with guaranteed revisions and turnaround',
    sectionB: 'Custom Services',
    sectionBSub: 'Scale productions and custom projects with dedicated art direction',
    sectionC: 'Pro Training & Masterclass',
    sectionCSub: 'Complete 4K AI video production curriculum for creators and studios',
    faqTitle: 'Frequently Asked Questions',
    faqSub: 'All answers regarding pricing, payment terms, and delivery turnaround',
    faqCategories: [
      {
        category: 'Billing & Payments',
        items: [
          {
            q: 'How does payment work for the 48-72h Pilot Sprint?',
            a: 'The Pilot Sprint is completely commitment-free\nYou first review the visual preview of your asset\nPayment takes place after your final approval',
          },
          {
            q: 'What are the payment terms for custom projects?',
            a: 'For campaigns and custom projects\n50% initial deposit upon production kickoff\nRemaining balance paid upon final 4K master delivery',
          },
          {
            q: 'Are payments secure and do you issue corporate invoices?',
            a: 'All payments are securely handled by Stripe\nCompliant invoice with legal tax details issued automatically',
          },
        ],
      },
      {
        category: 'Production, Turnaround & Process',
        items: [
          {
            q: 'How do project previews and included revision rounds work?',
            a: 'Included revision rounds across every package\nApproval on preview cut to fine-tune pacing and framing\nFinal grading and mastering before 4K delivery',
          },
          {
            q: 'What are the guaranteed turnaround times?',
            a: '48 to 72 business hours for the Pilot Sprint\n48 to 72 business hours priority for the Brand Campaign\nDedicated production schedule agreed upon for custom projects',
          },
        ],
      },
      {
        category: 'Masterclass & Training',
        items: [
          {
            q: 'Does Masterclass enrollment include future AI model updates?',
            a: 'Your access is unlimited and lifetime\nAll future video updates included at zero extra charge\nNew generation, 3D motion, and 4K upscale workflows',
          },
          {
            q: 'Is heavy hardware or prior editing experience required?',
            a: 'No prior experience or powerful computer required\nGenerative computing runs on remote cloud servers\nA standard laptop with internet connection is sufficient',
          },
          {
            q: 'How do I receive access after secure payment?',
            a: 'Instant email delivery upon Stripe checkout confirmation\nPersonal login credentials and direct links to all 5 4K modules\nImmediate access to all private prompt libraries',
          },
        ],
      },
    ],
    ctaLabel: 'Request a custom quote (24h)',
    ctaSub: 'Reply and proposal within 24-48h — no commitment',
  },
};

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [mcLoading, setMcLoading] = useState(false);
  const [mcError, setMcError] = useState<string | null>(null);

  const isFr = lang === 'fr';
  const t = copy[lang];
  const showToast = (msg: string) => setToastMessage(msg);

  const masterclassCurrent = MASTERCLASS_PRICE[currency] || MASTERCLASS_PRICE.USD;

  const formattedMasterclassCurrent =
    currency === 'EUR'
      ? `${masterclassCurrent} €`
      : currency === 'CAD'
      ? `${masterclassCurrent} $ CAD`
      : `${masterclassCurrent} $ USD`;

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
              ? 'Erreur lors de l’initialisation Stripe'
              : 'Failed to create checkout session')
        );
        setMcLoading(false);
      }
    } catch (err: any) {
      setMcError(isFr ? 'Erreur de connexion serveur' : 'Server connection error');
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
      itemListElement: PRICING_PLANS.map((plan) => {
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
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
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
              ? 'Des tarifs clairs et transparents pour tous vos projets de création vidéo IA'
              : 'Clear and transparent pricing for all your AI video creation projects'
          }
        />

        <div className="max-w-xl mx-auto px-4">
          {/* ── FORMULES CLÉS EN MAIN ─────────────────────── */}
          <section className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'FORMULES CLÉS EN MAIN' : 'TURNKEY PACKAGES'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.sectionA}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.sectionASub}
              </p>
            </div>

            {/* Vertical Packaged Cards Stack (matching unified max-w-xl design system) */}
            <div className="flex flex-col gap-5">
              {PRICING_PLANS.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`ovizai-card flex flex-col justify-between gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all ${
                      plan.primary
                        ? 'border border-gold/70 bg-card/95 shadow-gold'
                        : 'border border-border-gold bg-card/80'
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                        <div>
                          <p className="mono text-[10px] text-gold mb-0.5 font-bold tracking-wider">
                            {plan.badge[lang]}
                          </p>
                          <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg">{plan.name[lang]}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {plan.primary ? (
                            <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-fg px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                              {isFr ? 'Recommandé' : 'Recommended'}
                            </span>
                          ) : plan.starterHighlight ? (
                            <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-fg px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                              {isFr ? 'Starter' : 'Starter'}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="my-3 pb-3 border-b border-border">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <p className="text-2xl sm:text-3xl font-semibold font-mono text-fg leading-none tracking-tight">
                            {formatPrice(plan.minUsd, currency)}
                          </p>
                        </div>
                        <p className="text-[11px] text-muted mt-1.5 font-mono">
                          {plan.period[lang]}
                        </p>
                        {plan.id === 'premium' && (
                          <p className="text-[10px] text-gold mt-1 font-mono">
                            {isFr
                              ? 'Pack 3 films : tarif optimisé avec direction artistique dédiée'
                              : '3-film package: bundled rate with dedicated art direction'}
                          </p>
                        )}
                      </div>

                      {/* Tag if present */}
                      {plan.tag && (
                        <div className="mb-3 flex items-center gap-1.5 text-[10.5px] font-mono text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                          <Zap className="w-3 h-3 flex-shrink-0" />
                          <span>{plan.tag[lang]}</span>
                        </div>
                      )}

                      {/* Includes List */}
                      <ul className="flex flex-col gap-2.5 my-3">
                        {plan.includes[lang].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted leading-snug">
                            <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-fg/90">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Revision Policy Notice */}
                      <div className="mt-3 pt-2.5 border-t border-border text-[10.5px] text-muted leading-relaxed">
                        <span className="text-gold font-semibold block font-mono mb-0.5">
                          {isFr ? 'Si le résultat nécessite des ajustements :' : 'If adjustments are needed:'}
                        </span>
                        {plan.id === 'sprint'
                          ? (isFr
                              ? '1 round de révision inclus pour ajuster le rythme ou la couleur\nValidation directe sur prévisualisation'
                              : '1 revision round included to adjust pacing or color grading\nDirect approval on preview cut')
                          : (isFr
                              ? '3 rounds de révision inclus pour affiner chaque plan\nPrise en compte de vos retours sur chaque déclinaison'
                              : '3 revision rounds included to fine-tune every shot\nDedicated feedback integrated across all cuts')}
                      </div>
                    </div>

                    {/* Single CTA Link per Card */}
                    <Link
                      href={`/contact?service=${plan.id}&type=pub-brand&budget=${plan.budgetTierId}`}
                      className={`w-full min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                        plan.primary
                          ? 'bg-gold hover:bg-gold-bright text-black shadow-gold hover:scale-[1.01]'
                          : 'bg-black/50 border border-border-gold hover:border-gold text-fg hover:text-gold-bright'
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

          {/* ── PRESTATIONS SUR-MESURE ───────────────────── */}
          <section className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'PRESTATIONS SUR-MESURE' : 'CUSTOM SERVICES'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.sectionB}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.sectionBSub}
              </p>
            </div>

            {/* Synthetic 5-Row Table */}
            <div className="ovizai-card border border-border bg-card divide-y divide-border rounded-xl overflow-hidden mb-4">
              {CUSTOM_SERVICES_SUMMARY.map((service) => {
                return (
                  <div
                    key={service.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="mono text-xs font-bold text-gold bg-black/50 border border-border-gold px-2.5 py-1 rounded flex-shrink-0">
                        {service.number}
                      </span>
                      <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg truncate">
                        {service.title[lang]}
                      </h3>
                    </div>

                    <div className="flex items-center justify-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                      <Link
                        href={`/contact?service=${service.id}&type=${service.type}&budget=${service.budget}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 border border-border-gold hover:border-gold mono text-xs text-gold hover:text-gold-bright font-bold transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>{isFr ? 'Sur devis (24h) →' : 'Custom quote (24h) →'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── FORMATION & MASTERCLASS PRO ─────────────── */}
          <section id="masterclass" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'FORMATION & MASTERCLASS' : 'TRAINING & MASTERCLASS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.sectionC}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.sectionCSub}
              </p>
            </div>

            <div className="ovizai-card border border-border-gold bg-card/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-gold">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <span className="mono text-[10px] text-gold font-bold uppercase tracking-[0.25em] block mb-0.5">
                    {isFr ? 'FORMATION VIDÉO IA' : 'AI VIDEO TRAINING'}
                  </span>
                  <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg">
                    {isFr ? 'Masterclass Cinéma & Vidéo IA 4K' : 'AI Cinema & Video Masterclass 4K'}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold text-gold font-mono">
                    {formattedMasterclassCurrent}
                  </span>
                  <span className="mono text-[11px] text-muted">
                    {isFr ? 'paiement unique' : 'one-time'}
                  </span>
                </div>
              </div>

              <div className="py-3 space-y-2 text-xs text-muted">
                <p className="flex items-center gap-2 text-fg">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>
                    {isFr
                      ? '5 modules vidéo pratiques : concept art 8K, animation et étalonnage 4K'
                      : '5 practical modules: 8K concept art, motion and 4K color grading'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-fg">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Accès illimité à vie et futures mises à jour des modèles incluses'
                      : 'Unlimited lifetime access and future model updates included'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-fg">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Fichiers projets de post-production cinéma et prompts certifiés'
                      : 'Cinema post-production project files and certified prompts provided'}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-fg">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>
                    {isFr
                      ? 'Délivrance immédiate par e-mail après règlement sécurisé Stripe'
                      : 'Instant access delivered via email upon secure Stripe checkout'}
                  </span>
                </p>
              </div>

              <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href="/formation"
                  className="mono text-xs text-gold hover:underline"
                >
                  {isFr ? 'Consulter le détail des 5 modules →' : 'View the 5-module curriculum →'}
                </Link>

                <button
                  type="button"
                  disabled={mcLoading}
                  onClick={handleMasterclassCheckout}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-gold cursor-pointer min-h-[44px]"
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
                          ? `S’inscrire à la Masterclass (${formattedMasterclassCurrent}) →`
                          : `Enroll in Masterclass (${formattedMasterclassCurrent}) →`}
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

          {/* ── QUESTIONS FRÉQUENTES ─────────── */}
          <section id="faq" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'QUESTIONS FRÉQUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.faqTitle}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.faqSub}
              </p>
            </div>

            <div className="space-y-4">
              {t.faqCategories.map((cat, catIdx) => (
                <div key={cat.category} className="ovizai-card border border-border bg-card overflow-hidden">
                  <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-border flex items-center justify-between">
                    <span className="mono text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                      {cat.category}
                    </span>
                    <span className="mono text-[10px] text-muted">
                      {cat.items.length} {isFr ? 'questions' : 'questions'}
                    </span>
                  </div>

                  <div className="divide-y divide-border">
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
                            <span className="text-xs text-fg font-medium leading-snug">{faq.q}</span>
                            <HelpCircle
                              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                                isOpen ? 'text-gold' : 'text-muted'
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-4 text-xs text-muted leading-relaxed border-t border-white/[0.04] pt-2 space-y-1">
                              {faq.a.split('\n').map((line, lIdx) => (
                                <p key={lIdx}>{line}</p>
                              ))}
                            </div>
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
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3.5 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-gold hover:scale-[1.01] cursor-pointer min-h-[48px]"
            >
              <span>{t.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
            <p className="text-[11px] text-muted font-mono mt-2.5">{t.ctaSub}</p>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
