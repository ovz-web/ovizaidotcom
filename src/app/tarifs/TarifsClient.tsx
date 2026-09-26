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
  Building2,
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
import { MASTERCLASS_PRICE, MASTERCLASS_ORIGINAL_PRICE, PRICING_PLANS, LAUNCH_OFFER } from '@/lib/pricing';
import { trackEvent } from '@/lib/analytics';

const CUSTOM_SERVICES = [
  { id: 'pub-restaurants', num: '01', title: { fr: 'Publicités Restaurants & Marques Alimentaires', en: 'Commercials for Restaurants & Food Brands' }, type: 'pub-restaurant', budget: 'tier-launch', icon: Clapperboard },
  { id: 'pub-produits', num: '02', title: { fr: 'Publicités Produits & E-commerce', en: 'Product Commercials & E-commerce' }, type: 'pub-produit', budget: 'tier-launch', icon: Film },
  { id: 'direction-artistique', num: '03', title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' }, type: 'da-univers', budget: 'tier-custom', icon: Palette },
  { id: 'partenariat-agences', num: '04', title: { fr: 'Partenariat Agences (Marque Blanche)', en: 'Agency Partnership (White-Label)' }, type: 'agence-whitelabel', budget: 'tier-custom', icon: Building2 },
  { id: 'clips-sur-mesure', num: '05', title: { fr: 'Clips Vidéos & Projets Sur-Mesure', en: 'Music Videos & Custom Projects' }, type: 'clip-visualiser', budget: 'tier-custom', icon: Music2 },
];

const FAQ_ITEMS = [
  {
    q: {
      fr: 'Quelles sont les modalités de règlement pour l’Offre de Lancement et le sur-mesure ?',
      en: 'What are the payment terms for the Launch Offer and custom projects?',
    },
    a: {
      fr: 'Pour l’Offre de Lancement (530 USD) : un acompte de 265 USD à la commande pour lancer la production, et le solde de 265 USD avant la livraison du master final.\nPour les projets plus complexes : 50 % d’acompte à la validation du devis, solde à la livraison du master final.\nPour la Masterclass : paiement unique sécurisé via Stripe sans abonnement.',
      en: 'For the Launch Offer ($530 USD): $265 USD deposit upfront to initiate production, and $265 USD balance prior to final master delivery.\nFor custom projects: 50% deposit upon quote sign-off, balance upon final master delivery.\nFor Masterclass: secure one-time Stripe checkout, zero subscription.',
    },
  },
  {
    q: {
      fr: 'Comment se déroulent les validations et la série de corrections incluse ?',
      en: 'How do preview reviews and included revisions work?',
    },
    a: {
      fr: 'L’Offre de Lancement inclut 1 série de corrections complète. Nous vous remettons une prévisualisation rythmée pour valider le cadrage, l’enchaînement, le rythme, le sound design et l’étalonnage avant tout export master final. Les demandes dépassant ce cadre font l’objet d’un devis complémentaire.',
      en: 'The Launch Offer includes 1 complete revision round. We provide a paced preview cut to fine-tune framing, flow, pacing, sound design, and color grading prior to final master export. Additional revision requests are scoped via custom quote.',
    },
  },
  {
    q: {
      fr: 'Quels sont les délais de livraison pour l’Offre de Lancement ?',
      en: 'What is the delivery turnaround for the Launch Offer?',
    },
    a: {
      fr: 'La première version est livrée sous 5 jours ouvrables. Ce délai commence après réception de tous les éléments nécessaires (produit, marque, brief validé) et validation conjointe du planning de production.\nPour les projets sur-mesure plus complexes : calendrier dédié convenu au devis sous 24h.',
      en: 'The first cut is delivered within 5 business days. This timeframe begins once all required assets (product, brand guidelines, brief) are received and the production schedule is agreed upon.\nFor complex custom productions: dedicated schedule validated within 24h on quote.',
    },
  },
  {
    q: {
      fr: 'Les vidéos sont-elles libres de droits pour un usage commercial ?',
      en: 'Are delivered videos cleared for full commercial use?',
    },
    a: {
      fr: 'Oui, 100 % des droits patrimoniaux et d’exploitation commerciale vous sont intégralement cédés dès le règlement du solde final (diffusion réseaux sociaux, web, campagnes publicitaires sans limite de durée).',
      en: 'Yes, 100% of commercial exploitation and broadcast rights are fully assigned to your brand upon final balance payment (unlimited social media, web, paid ads).',
    },
  },
  {
    q: {
      fr: 'Travaillez-vous en marque blanche (white-label) avec des agences ?',
      en: 'Do you work in white-label with creative and media agencies?',
    },
    a: {
      fr: 'Oui, nous intervenons comme studio de production vidéo et générative externalisé pour les agences. Accord de confidentialité strict (NDA), cession totale des droits et livrables finaux prêts pour vos clients sous devis dédié.',
      en: 'Yes, we act as an outsourced video and generative production studio for creative agencies. Strict NDA, 100% IP rights transfer, and client-ready deliverables tailored on custom quote.',
    },
  },
];

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<string | null>('offer-launch');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFaqSectionOpen, setIsFaqSectionOpen] = useState(false);
  const [mcLoading, setMcLoading] = useState(false);
  const [mcError, setMcError] = useState<string | null>(null);

  const isFr = lang === 'fr';
  const showToast = (msg: string) => setToastMessage(msg);

  const currentMcPrice = MASTERCLASS_PRICE[currency] || MASTERCLASS_PRICE.USD;
  const formattedMcCurrent = currency === 'EUR' ? `${currentMcPrice} €` : `${currentMcPrice} $ ${currency}`;

  const launchTotal = formatPrice(LAUNCH_OFFER.totalUsd, currency);
  const launchDeposit = formatPrice(LAUNCH_OFFER.depositUsd, currency);
  const launchBalance = formatPrice(LAUNCH_OFFER.balanceUsd, currency);

  const handleMasterclassCheckout = async () => {
    setMcLoading(true);
    setMcError(null);
    trackEvent('checkout_started', {
      plan: 'masterclass',
      currency,
      price: currentMcPrice,
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

  const pricingItems: ListMenuItem[] = [
    {
      id: 'offer-launch',
      icon: Zap,
      title: isFr ? '01 // OFFRE DE LANCEMENT' : '01 // LAUNCH OFFER',
      subtitle: isFr ? '1 publicité courte (10-15s) · Format principal 9:16' : '1 short ad (10-15s) · Main 9:16 vertical format',
      trailing: (
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-gold font-bold">{launchTotal}</span>
          <span className="text-gold">{openCard === 'offer-launch' ? '↑' : '↓'}</span>
        </span>
      ),
      onClick: () => toggleCard('offer-launch'),
      expanded: openCard === 'offer-launch',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/[0.06] flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-fg font-mono tracking-tight">
                {launchTotal}
              </span>
              <span className="mono text-[10.5px] text-gold font-bold uppercase">
                {isFr ? 'Offre de lancement' : 'Introductory launch offer'}
              </span>
            </div>
            <span className="mono text-[11px] text-muted">
              {isFr
                ? `Acompte : ${launchDeposit} · Solde : ${launchBalance}`
                : `Deposit: ${launchDeposit} · Balance: ${launchBalance}`}
            </span>
          </div>

          <div className="space-y-2 text-xs text-fg/90">
            {LAUNCH_OFFER.includes[lang].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>
                {isFr
                  ? 'Solde à régler avant livraison du master final. Délai à compter de la réception des éléments et validation du planning.'
                  : 'Balance due prior to final master delivery. Turnaround begins upon receipt of assets & schedule sign-off.'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-muted">
              {isFr
                ? 'Projets plus complexes ou formats supplémentaires : sur devis.'
                : 'More complex projects or additional cuts: custom quote.'}
            </span>
            <Link
              href="/contact?service=launch&type=pub-brand&budget=launch-530"
              onClick={() => trackEvent('cta_reserve_launch', { plan: 'launch', currency })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Profiter de l’Offre de Lancement (530 $) →' : 'Book Launch Offer ($530) →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    },

    {
      id: 'offer-custom',
      icon: Palette,
      title: isFr ? '02 // PROJETS COMPLEXES & SUR-MESURE' : '02 // CUSTOM & SCALE PRODUCTIONS',
      subtitle: isFr ? 'Formats 16:9, multi-assets, DA & agences' : '16:9 widescreen, multi-assets, art direction & agencies',
      trailing: (
        <span className="flex items-center gap-1.5 font-medium">
          <span>{isFr ? 'Sur devis (24h)' : 'Custom quote (24h)'}</span>
          <span className="text-gold">{openCard === 'offer-custom' ? '↑' : '↓'}</span>
        </span>
      ),
      onClick: () => toggleCard('offer-custom'),
      expanded: openCard === 'offer-custom',
      expandedContent: (
        <div className="space-y-4 pt-1">
          <p className="text-xs text-muted leading-relaxed">
            {isFr
              ? 'Pour les projets dépassant le périmètre de l’offre de lancement : campagnes multi-formats (9:16 + 16:9), univers de marque complets, clips musicaux ou partenariats agences en marque blanche. Devis clair et chiffré remis sous 24h ouvrées.'
              : 'For projects exceeding the launch offer scope: multi-format campaigns (9:16 + 16:9), complete brand identity worlds, music videos, or white-label agency partnerships. Clear tailored quote delivered within 24 business hours.'}
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
              href="/contact?service=custom&type=pub-brand&budget=sur-devis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis personnalisé →' : 'Request a Custom Quote →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    },

    {
      id: 'offer-masterclass',
      icon: GraduationCap,
      title: isFr ? '03 // Formation & Masterclass Vidéo IA' : '03 // AI Video Masterclass Course',
      subtitle: isFr ? '5 modules pratiques & bibles de prompts certifiés' : '5 practical modules & certified prompt bibles',
      trailing: (
        <span className="flex items-center gap-1.5 font-medium">
          <span>{formattedMcCurrent}</span>
          <span className="text-gold">{openCard === 'offer-masterclass' ? '↑' : '↓'}</span>
        </span>
      ),
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
                {isFr ? 'Paiement unique' : 'One-time fee'}
              </span>
            </div>
            <span className="mono text-[11px] text-muted">
              {isFr ? 'Sans abonnement · Accès garanti' : 'No subscription · Lifetime access'}
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
  ];

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pt-[calc(var(--topbar-height,44px)+6px)] sm:pt-[calc(var(--topbar-height,44px)+8px)]"
      >
        {/* Page Header */}
        <PageHeader
          tag={isFr ? '04 // TARIFS & OFFRES' : '04 // PRICING & OFFERS'}
          title={
            isFr ? (
              <>
                OFFRE DE LANCEMENT & <span className="text-gold-gradient">PROJETS SUR DEVIS</span>
              </>
            ) : (
              <>
                LAUNCH OFFER & <span className="text-gold-gradient">CUSTOM QUOTES</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Offre de lancement à 530 USD & projets sur-mesure'
              : 'Launch offer at $530 USD & custom scoped projects'
          }
          showDetailsHint={true}
          lang={lang}
        />

        <div className="max-w-xl mx-auto px-4 mb-0.5 sm:mb-1.5">
          {/* Unified Pricing Box with integrated Promo Switch Header */}
          <div className="ovizai-card border border-border bg-card rounded-xl overflow-hidden mb-0.5 sm:mb-1.5">
            {/* Studio Guarantee Header */}
            <div className="flex items-center justify-between gap-3 px-3 py-1.5 border-b border-border bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="mono text-[11px] sm:text-xs text-fg font-semibold block leading-tight">
                  {isFr ? 'Offre de Lancement Studio' : 'Studio Launch Offer'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="mono text-[10px] text-gold uppercase tracking-wider font-bold">
                  {isFr ? '530 $ USD · 5 Jours Ouvrables' : '$530 USD · 5 Business Days'}
                </span>
              </div>
            </div>

            {/* Pricing Items */}
            <ListMenuCard
              items={pricingItems}
              className="border-0 bg-transparent rounded-none"
            />
          </div>

          {/* Centralized Clean FAQ (Collapsible accordion card) */}
          <div className="mb-0.5 sm:mb-1">
            <div className="ovizai-card border border-border bg-card rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setIsFaqSectionOpen((prev) => !prev)}
                aria-expanded={isFaqSectionOpen}
                className="w-full flex items-center justify-between gap-3 px-3 sm:px-3.5 py-1 sm:py-1.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <HelpCircle className="w-3.5 h-3.5 text-gold group-hover:text-gold-bright flex-shrink-0 transition-colors" />
                  <div className="flex flex-col min-w-0">
                    <span className="mono text-[11px] sm:text-xs font-semibold text-fg group-hover:text-gold-bright transition-colors truncate">
                      {isFr ? 'Questions Fréquentes (5)' : 'Frequently Asked Questions (5)'}
                    </span>
                    <span className="text-[10px] text-muted truncate">
                      {isFr ? 'Facturation, production & délais de livraison' : 'Billing, turnaround & production workflow'}
                    </span>
                  </div>
                </div>

                <span className="mono text-xs sm:text-[13px] text-gold group-hover:text-gold-bright transition-colors font-medium flex-shrink-0 ml-2">
                  {isFaqSectionOpen ? '↑' : '↓'}
                </span>
              </button>

              {isFaqSectionOpen && (
                <div className="divide-y divide-white/[0.06] border-t border-border animate-fadeIn">
                  {FAQ_ITEMS.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx}>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer group"
                        >
                          <span className="text-[11px] sm:text-xs text-fg font-medium leading-snug group-hover:text-gold-bright transition-colors">
                            {faq.q[lang]}
                          </span>
                          <span className="mono text-xs text-gold font-medium flex-shrink-0 ml-2">
                            {isOpen ? '↑' : '↓'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-3.5 sm:px-4 pb-3 text-[11px] sm:text-xs text-muted leading-relaxed border-t border-white/[0.04] pt-2 space-y-1">
                            {faq.a[lang].split('\n').map((line, lIdx) => (
                              <p key={lIdx}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Custom Quote Direct Link */}
          <div className="text-center pt-0.5 mb-0.5">
            <Link
              href="/contact"
              onClick={() => trackEvent('cta_request_custom_quote', { source: 'tarifs_bottom' })}
              className="inline-flex items-center gap-1 mono text-[10.5px] sm:text-[11px] text-gold hover:underline"
            >
              <span>{isFr ? 'Demander un devis sur-mesure (24h) →' : 'Request custom quote (24h) →'}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
