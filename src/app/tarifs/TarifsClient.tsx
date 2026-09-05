'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, HelpCircle, Zap, Loader2, ShieldCheck } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE, PRICING_PLANS } from '@/lib/pricing';
import { trackEvent } from '@/lib/analytics';

const CUSTOM_SERVICES = [
  { id: 'films-series', num: '01', title: { fr: 'Réalisation de Films & Séries', en: 'Film & Series Direction' }, type: 'film-series', budget: 'tier-3' },
  { id: 'clips-visualisers', num: '02', title: { fr: 'Clips Vidéos & Visualisers', en: 'Music Videos & Visualizers' }, type: 'clip-visualiser', budget: 'tier-2' },
  { id: 'pub-brand-content', num: '03', title: { fr: 'Publicités & Brand Content', en: 'Commercials & Brand Content' }, type: 'pub-brand', budget: 'tier-2' },
  { id: 'da-univers-visuels', num: '04', title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' }, type: 'da-univers', budget: 'tier-1' },
  { id: 'web-digital', num: '05', title: { fr: 'Création de Sites Web & Plateformes Digitales', en: 'Websites & Digital Experiences' }, type: 'web-digital', budget: 'tier-2' },
];

const copy = {
  fr: {
    eyebrow: '04 // TARIFS & FORMULES',
    sectionA: 'Formules Clés en Main',
    sectionASub: 'Sprint Pilote et Campagne de Marque avec révisions et délais garantis',
    sectionB: 'Prestations Sur-Mesure',
    sectionBSub: 'Projets complexes et productions d’envergure avec accompagnement dédié',
    sectionC: 'Formation & Masterclass Pro',
    sectionCSub: 'Programme complet de production vidéo IA 4K pour créateurs et studios',
    faqTitle: 'Questions Fréquentes — Facturation & Règlements',
    faqSub: 'Toutes les réponses sur nos tarifs, acomptes et modalités de règlement',
    ctaLabel: 'Demander un devis sur-mesure (24h)',
    ctaSub: 'Réponse et proposition sous 24-48h — sans engagement',
    billingFaq: [
      { q: 'Comment fonctionne le paiement du Sprint Pilote 48-72h ?', a: 'Le Sprint Pilote est totalement sans engagement\nVous découvrez d’abord l’aperçu visuel de votre asset\nLe règlement s’effectue uniquement après votre validation' },
      { q: 'Quelles sont les modalités de paiement pour les projets sur-mesure ?', a: 'Pour les campagnes et projets sur-mesure\nAcompte de 50 % au lancement de la production\nSolde réglé à la livraison finale du master 4K' },
      { q: 'Le paiement est-il sécurisé et émettez-vous des factures professionnelles ?', a: 'Tous les règlements sont sécurisés par Stripe\nFacture professionnelle conforme avec TVA émise automatiquement' },
    ],
    masterclassFaq: [
      { q: 'L’inscription à la Masterclass inclut-elle les futures mises à jour ?', a: 'Votre accès est illimité et garanti à vie\nToutes les futures mises à jour vidéo sont incluses sans supplément\nNouveaux modèles de génération, 3D et méthodes d’upscaling 4K' },
      { q: 'Faut-il du matériel puissant ou une expérience préalable en montage ?', a: 'Aucune expérience préalable ni matériel lourd requis\nLes générations s’exécutent sur serveurs cloud distants\nUn simple ordinateur portable connecté suffit' },
      { q: 'Comment reçoit-on les accès après le règlement ?', a: 'Délivrance immédiate par e-mail dès confirmation Stripe\nIdentifiants personnels et liens d’accès direct aux 5 modules 4K\nAccès instantané à l’ensemble des ressources privées' },
    ],
  },
  en: {
    eyebrow: '04 // PRICING & PACKAGES',
    sectionA: 'Turnkey Packages',
    sectionASub: 'Pilot Sprint and Brand Campaign with guaranteed revisions and turnaround',
    sectionB: 'Custom Services',
    sectionBSub: 'Scale productions and custom projects with dedicated art direction',
    sectionC: 'Pro Training & Masterclass',
    sectionCSub: 'Complete 4K AI video production curriculum for creators and studios',
    faqTitle: 'Frequently Asked Questions — Billing & Payments',
    faqSub: 'All answers regarding pricing, deposits, and payment terms',
    ctaLabel: 'Request a custom quote (24h)',
    ctaSub: 'Reply and proposal within 24-48h — no commitment',
    billingFaq: [
      { q: 'How does payment work for the 48-72h Pilot Sprint?', a: 'The Pilot Sprint is completely commitment-free\nYou first review the visual preview of your asset\nPayment takes place after your final approval' },
      { q: 'What are the payment terms for custom projects?', a: 'For campaigns and custom projects\n50% initial deposit upon production kickoff\nRemaining balance paid upon final 4K master delivery' },
      { q: 'Are payments secure and do you issue corporate invoices?', a: 'All payments are securely handled by Stripe\nCompliant invoice with legal tax details issued automatically' },
    ],
    masterclassFaq: [
      { q: 'Does Masterclass enrollment include future AI model updates?', a: 'Your access is unlimited and lifetime\nAll future video updates included at zero extra charge\nNew generation, 3D motion, and 4K upscale workflows' },
      { q: 'Is heavy hardware or prior editing experience required?', a: 'No prior experience or powerful computer required\nGenerative computing runs on remote cloud servers\nA standard laptop with internet connection is sufficient' },
      { q: 'How do I receive access after secure payment?', a: 'Instant email delivery upon Stripe checkout confirmation\nPersonal login credentials and direct links to all 5 4K modules\nImmediate access to all private prompt libraries' },
    ],
  },
};

function FaqAccordion({
  category,
  items,
  openFaq,
  setOpenFaq,
  prefix,
  isFr,
}: {
  category: string;
  items: { q: string; a: string }[];
  openFaq: string | null;
  setOpenFaq: (key: string | null) => void;
  prefix: string;
  isFr: boolean;
}) {
  return (
    <div className="ovizai-card border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-border flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{category}</span>
        <span className="mono text-[10px] text-muted">{items.length} questions</span>
      </div>
      <div className="divide-y divide-border">
        {items.map((faq, idx) => {
          const key = `${prefix}-${idx}`;
          const isOpen = openFaq === key;
          return (
            <div key={faq.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? (isFr ? `Fermer : ${faq.q}` : `Close: ${faq.q}`) : (isFr ? `Ouvrir : ${faq.q}` : `Open: ${faq.q}`)}
                onClick={() => setOpenFaq(isOpen ? null : key)}
                className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
              >
                <span className="text-xs text-fg font-medium leading-snug">{faq.q}</span>
                <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? 'text-gold' : 'text-muted'}`} />
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
  );
}

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

  const mcCurrent = MASTERCLASS_PRICE[currency] || MASTERCLASS_PRICE.USD;
  const mcOriginal = MASTERCLASS_ORIGINAL_PRICE[currency] || MASTERCLASS_ORIGINAL_PRICE.USD;
  const formattedMcCurrent = currency === 'EUR' ? `${mcCurrent} €` : `${mcCurrent} $ ${currency}`;
  const formattedMcOriginal = currency === 'EUR' ? `${mcOriginal} €` : `${mcOriginal} $ ${currency}`;

  const handleMasterclassCheckout = async () => {
    trackEvent('cta_enroll_masterclass', { currency, source: 'tarifs_page' });
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
        setMcError(data.error || (isFr ? 'Erreur lors de l’initialisation Stripe' : 'Failed to create checkout session'));
        setMcLoading(false);
      }
    } catch (err: any) {
      setMcError(isFr ? 'Erreur de connexion serveur' : 'Server connection error');
      setMcLoading(false);
    }
  };

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
        <PageHeader
          lang={lang}
          eyebrow={t.eyebrow}
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

        {/* Quick Anchors Navigation Bar */}
        <nav aria-label={isFr ? 'Sommaire des rubriques tarifaires' : 'Pricing sections navigation'} className="max-w-xl mx-auto px-4 mb-6">
          <div className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 rounded-xl bg-card border border-border">
            <a href="#formules" className="flex-1 text-center py-2 px-2 rounded-lg mono text-[11px] sm:text-xs text-muted hover:text-gold-bright hover:bg-white/[0.03] transition-all font-medium">
              {isFr ? 'Formules' : 'Packages'}
            </a>
            <span className="text-border text-xs">•</span>
            <a href="#sur-mesure" className="flex-1 text-center py-2 px-2 rounded-lg mono text-[11px] sm:text-xs text-muted hover:text-gold-bright hover:bg-white/[0.03] transition-all font-medium">
              {isFr ? 'Sur-mesure' : 'Custom'}
            </a>
            <span className="text-border text-xs">•</span>
            <a href="#masterclass" className="flex-1 text-center py-2 px-2 rounded-lg mono text-[11px] sm:text-xs text-muted hover:text-gold-bright hover:bg-white/[0.03] transition-all font-medium">
              {isFr ? 'Formation' : 'Training'}
            </a>
            <span className="text-border text-xs">•</span>
            <a href="#faq" className="flex-1 text-center py-2 px-2 rounded-lg mono text-[11px] sm:text-xs text-muted hover:text-gold-bright hover:bg-white/[0.03] transition-all font-medium">
              FAQ
            </a>
          </div>
        </nav>

        <div className="max-w-xl mx-auto px-4">
          {/* ── FORMULES CLÉS EN MAIN ─────────────────────── */}
          <section id="formules" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'FORMULES CLÉS EN MAIN' : 'TURNKEY PACKAGES'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.sectionA}
              </h2>
              <p className="text-xs text-muted mt-1">{t.sectionASub}</p>
            </div>

            <div className="flex flex-col gap-5">
              {PRICING_PLANS.map((plan) => {
                const isSprint = plan.id === 'sprint';
                const guaranteeItem = isSprint
                  ? (isFr ? 'Garantie prévisualisation : validation du cut avant tout prélèvement' : 'Preview guarantee: cut approved before final charge')
                  : (isFr ? 'Garantie révisions : 3 rounds inclus jusqu’au master 4K validé' : 'Revision guarantee: 3 rounds included until approved 4K master');
                const bundleItem = !isSprint
                  ? (isFr ? 'Pack 3 films : tarif optimisé avec direction artistique dédiée' : '3-film package: bundled rate with dedicated art direction')
                  : null;

                const allInclusions = [
                  ...plan.includes[lang],
                  ...(bundleItem ? [bundleItem] : []),
                  guaranteeItem,
                ];

                return (
                  <div
                    key={plan.id}
                    className={`ovizai-card flex flex-col justify-between gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all ${
                      plan.primary ? 'border border-border-strong bg-card/95' : 'border border-border bg-card/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                        <div>
                          <p className="mono text-[10px] text-gold mb-0.5 font-bold tracking-wider">{plan.badge[lang]}</p>
                          <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg">{plan.name[lang]}</h3>
                        </div>
                        {plan.primary ? (
                          <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-fg px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                            {isFr ? 'Recommandé' : 'Recommended'}
                          </span>
                        ) : (
                          <span className="mono text-[9px] uppercase tracking-widest bg-white/[0.06] text-fg px-2 py-0.5 rounded-full border border-white/[0.1] font-medium">
                            Starter
                          </span>
                        )}
                      </div>

                      {/* Price: Always promo with strike-through */}
                      <div className="my-3 pb-3 border-b border-border">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-2xl sm:text-3xl font-semibold font-mono text-fg leading-none tracking-tight">
                            {formatPrice(plan.minUsd, currency)}
                          </p>
                          <span className="mono text-[10px] sm:text-xs text-muted font-bold uppercase tracking-wider">
                            {isFr ? 'HT' : 'Excl. VAT'}
                          </span>
                          {plan.originalMinUsd && (
                            <p className="text-sm sm:text-base text-muted line-through font-mono font-medium ml-1">
                              {formatPrice(plan.originalMinUsd, currency)}
                            </p>
                          )}
                        </div>
                        <p className="text-[11px] text-muted mt-1.5 font-mono">{plan.period[lang]}</p>
                      </div>

                      {/* Tag if present */}
                      {plan.tag && (
                        <div className="mb-3 flex items-center gap-1.5 text-[10.5px] font-mono text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                          <Zap className="w-3 h-3 flex-shrink-0" />
                          <span>{plan.tag[lang]}</span>
                        </div>
                      )}

                      {/* Inclusions List with merged guarantee and bundle notices */}
                      <ul className="flex flex-col gap-2.5 my-3">
                        {allInclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted leading-snug">
                            <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-fg/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/contact?service=${plan.id}&type=pub-brand&budget=${plan.budgetTierId}`}
                      onClick={() => {
                        trackEvent(isSprint ? 'cta_reserve_sprint' : 'cta_reserve_campaign', {
                          plan: plan.id,
                          currency,
                        });
                      }}
                      className={`w-full min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                        plan.primary
                          ? 'bg-gold hover:bg-gold-bright text-black shadow-gold hover:scale-[1.01]'
                          : 'bg-black/50 border border-border-gold hover:border-gold text-fg hover:text-gold-bright'
                      }`}
                    >
                      <span>
                        {isSprint
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
          <section id="sur-mesure" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'PRESTATIONS SUR-MESURE' : 'CUSTOM SERVICES'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.sectionB}
              </h2>
              <p className="text-xs text-muted mt-1">{t.sectionBSub}</p>
            </div>

            <div className="ovizai-card border border-border bg-card divide-y divide-border rounded-xl overflow-hidden mb-4">
              {CUSTOM_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="mono text-xs font-bold text-gold bg-black/50 border border-border-gold px-2.5 py-1 rounded flex-shrink-0">
                      {service.num}
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
              ))}
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
              <p className="text-xs text-muted mt-1">{t.sectionCSub}</p>
            </div>

            <div className="ovizai-card border border-border-strong bg-card/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div>
                  <span className="mono text-[10px] text-gold font-bold uppercase tracking-[0.25em] block mb-0.5">
                    {isFr ? 'FORMATION VIDÉO IA' : 'AI VIDEO TRAINING'}
                  </span>
                  <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg">
                    {isFr ? 'Masterclass Cinéma & Vidéo IA 4K' : 'AI Cinema & Video Masterclass 4K'}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-semibold text-gold font-mono">
                    {formattedMcCurrent}
                  </span>
                  <span className="mono text-[10px] sm:text-xs text-muted font-bold uppercase tracking-wider">
                    {isFr ? 'TTC' : 'Incl. VAT'}
                  </span>
                  <span className="text-xs text-muted line-through font-mono ml-1">
                    {formattedMcOriginal}
                  </span>
                  <span className="mono text-[11px] text-muted">
                    {isFr ? 'paiement unique' : 'one-time'}
                  </span>
                </div>
              </div>

              {/* Guarantee / Refund policy short notice */}
              <div className="mt-2.5 pt-2 border-t border-border/50 flex items-start gap-1.5 text-[10.5px] text-muted font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  {isFr
                    ? 'Accès immédiat garanti à vie — contenu numérique sans rétractation (CGV art. 4)'
                    : 'Lifetime instant access guaranteed — digital content with immediate activation (Terms art. 4)'}
                </span>
              </div>

              <div className="py-3 space-y-2 text-xs text-muted">
                {[
                  isFr ? '5 modules vidéo pratiques : concept art 8K, animation et étalonnage 4K' : '5 practical modules: 8K concept art, motion and 4K color grading',
                  isFr ? 'Accès illimité à vie et futures mises à jour des modèles incluses' : 'Unlimited lifetime access and future model updates included',
                  isFr ? 'Fichiers projets de post-production cinéma et prompts certifiés' : 'Cinema post-production project files and certified prompts provided',
                  isFr ? 'Délivrance immédiate par e-mail après règlement sécurisé Stripe' : 'Instant access delivered via email upon secure Stripe checkout',
                ].map((feat, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-fg">
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{feat}</span>
                  </p>
                ))}
              </div>

              <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link href="/formation" className="mono text-xs text-gold hover:underline">
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
                          ? `S’inscrire à la Masterclass (${formattedMcCurrent}) →`
                          : `Enroll in Masterclass (${formattedMcCurrent}) →`}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </div>

              {mcError && <p className="text-xs text-red-400 font-mono mt-3 text-center">{mcError}</p>}
            </div>

            {/* Category FAQ: Formation & Masterclass relocated under #masterclass */}
            <FaqAccordion
              category={isFr ? 'Formation & Masterclass' : 'Masterclass & Training'}
              items={t.masterclassFaq}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
              prefix="mc"
              isFr={isFr}
            />
          </section>

          {/* ── QUESTIONS FRÉQUENTES (Facturation & Règlements exclusivement) ─────────── */}
          <section id="faq" className="mb-12 scroll-mt-24">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                {isFr ? 'QUESTIONS FRÉQUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
                {t.faqTitle}
              </h2>
              <p className="text-xs text-muted mt-1">{t.faqSub}</p>
            </div>

            <FaqAccordion
              category={isFr ? 'Facturation & Règlements' : 'Billing & Payments'}
              items={t.billingFaq}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
              prefix="billing"
              isFr={isFr}
            />
          </section>

          {/* ── Bottom Single CTA ───────────────────────────────────────────── */}
          <div className="text-center pt-2">
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_request_custom_quote', { source: 'tarifs_bottom' })}
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
