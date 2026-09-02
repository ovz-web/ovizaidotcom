'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Check, HelpCircle, Zap, ShieldCheck } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import VideoShowcase from '@/components/VideoShowcase';
import { YOUTUBE_VIDEOS } from '@/lib/videos';

// Offre de lancement — nombre de places restantes modifiable manuellement
const PLACES_RESTANTES: number = 5;

const PLANS_DATA = [
  {
    id: 'sprint',
    badge: { fr: '01 // TARIF DE LANCEMENT', en: '01 // LAUNCH TIER' },
    name: { fr: 'Sprint Pilote 48-72h', en: '48-72h Pilot Sprint' },
    minUsd: 530,
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
    badge: { fr: '02 // CAMPAGNE DE MARQUE', en: '02 // BRAND CAMPAIGN' },
    name: { fr: 'Campagne de Marque (3 Films)', en: 'Brand Campaign (3 Films)' },
    minUsd: 2600,
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
    number: '01',
    title: { fr: 'Réalisation de Films & Séries', en: 'Film & Series Direction' },
    minUsd: 8000,
    maxUsd: 15000,
    type: 'film-series',
    budget: 'tier-3',
  },
  {
    id: 'clips-visualisers',
    number: '02',
    title: { fr: 'Clips Vidéos & Visualisers', en: 'Music Videos & Stage Visualisers' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'clip-visualiser',
    budget: 'tier-2',
  },
  {
    id: 'pub-brand-content',
    number: '03',
    title: { fr: 'Publicités & Brand Content', en: 'Commercials & Brand Content' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'pub-brand',
    budget: 'tier-2',
  },
  {
    id: 'da-univers-visuels',
    number: '04',
    title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Universes' },
    minUsd: 1000,
    maxUsd: 3000,
    type: 'da-univers',
    budget: 'tier-1',
  },
  {
    id: 'web-digital',
    number: '05',
    title: { fr: 'Création de Sites Web & Plateformes Digitales', en: 'Custom Web & Digital Platforms' },
    minUsd: 3000,
    maxUsd: 8000,
    type: 'web-digital',
    budget: 'tier-2',
  },
];

const copy = {
  fr: {
    back: 'Retour Accueil',
    eyebrow: 'GRILLE TARIFAIRE & FORMULES DE PRODUCTION',
    title: "Le même niveau de rendu qu'une production traditionnelle",
    titleHighlight: "sans le tournage, sans l'attente.",
    marketRef:
      "Une vidéo de marque professionnelle classique (crew, tournage, montage) coûte entre 5 000 € et 30 000 € en agence traditionnelle — jusqu'à 75 000 € pour un film haut de gamme — avec un délai habituel de 2 à 6 semaines entre le brief et la livraison.",
    sectionA: 'Chemin A — Commande immédiate',
    sectionASub: 'Formules clés en main pour un besoin rapide ou une première collaboration.',
    sectionB: 'Chemin B — Sur-mesure, devis sous 24h',
    sectionBSub: 'Projets complexes et productions d’envergure sur devis personnalisé.',
    comparison:
      "À titre de référence de marché : la production vidéo IA réduit le coût par vidéo de 70 à 90 % par rapport à la production traditionnelle en éliminant les coûts d'équipe, de matériel et de studio — une fourchette documentée dans les études sectorielles sur l'adoption de l'IA en production audiovisuelle.",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Pourquoi commencer par le Sprint Pilote 48-72h ?',
        a: "Le Sprint Pilote permet de tester la vitesse et la qualité d'OVIZai sur un premier asset court sans engagement. Le paiement s'effectue à la livraison après validation de l'aperçu.",
      },
      {
        q: 'Pourquoi ne pas passer par un freelance classique ?',
        a: "Un monteur freelance a besoin de rushes tournés. OVIZai gère la création visuelle complète de A à Z (génération d'images 8K, mouvements virtuels, montage et étalonnage), sans aucun tournage à organiser. Le gain est de 3 semaines de délai.",
      },
      {
        q: 'La qualité est-elle suffisante pour une campagne de marque ?',
        a: "Les moteurs utilisés (Midjourney v6, Runway Gen-3, Kling AI, Topaz Video AI 5) couplés à un étalonnage DaVinci Resolve Studio offrent un rendu cinématographique 4K calibré pour le grand écran et les réseaux sociaux.",
      },
      {
        q: 'Que comprend exactement un "round de révision" ?',
        a: "Un round de révision couvre des ajustements de rythme, de cadrage ou de colorimétrie sur la vidéo livrée. Les changements radicaux de concept en cours de route font l'objet d'un réajustement.",
      },
    ],
    ctaLabel: 'Demander un devis sur-mesure (24h)',
    ctaSub: 'Réponse et proposition sous 24-48h — sans engagement.',
  },
  en: {
    back: 'Back Home',
    eyebrow: 'PRICING & PRODUCTION PACKAGES',
    title: 'The same visual quality as traditional production',
    titleHighlight: 'without the shoot, without the wait.',
    marketRef:
      'A professional brand video (crew, shoot, edit) costs between €5,000 and €30,000 at a traditional agency — up to €75,000 for a premium brand film — with a typical timeline of 2 to 6 weeks from brief to delivery.',
    sectionA: 'Path A — Immediate Ordering',
    sectionASub: 'Turnkey packages engineered for quick turnarounds or initial engagements.',
    sectionB: 'Path B — Custom Project, Quote within 24h',
    sectionBSub: 'Tailored productions and full campaigns on custom proposal.',
    comparison:
      'For market reference: AI video production reduces the cost per video by 70 to 90% compared to traditional production by eliminating crew, equipment and studio costs — a range documented in sector adoption studies.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Why start with the 48-72h Pilot Sprint?',
        a: 'The Pilot Sprint allows you to test OVIZai speed and quality on a single short asset with zero commitment. Payment is settled on delivery upon preview approval.',
      },
      {
        q: 'Why not hire a traditional video freelancer?',
        a: 'A video editor needs filmed footage. OVIZai manages end-to-end visual creation (8K image gen, camera motion, editing & ACES grading) with no shoot to organise, saving 3+ weeks.',
      },
      {
        q: 'Is the quality high enough for a brand campaign?',
        a: 'Our generative stack (Midjourney v6, Runway Gen-3, Kling AI, Topaz Video AI 5) paired with DaVinci Resolve Studio delivers 4K cinematic visuals ready for broadcast & digital.',
      },
      {
        q: 'What does a "revision round" cover?',
        a: 'A revision round includes pacing, framing, or colour grading adjustments on delivered cuts. Complete pivot of concept mid-production is quoted separately.',
      },
    ],
    ctaLabel: 'Request a custom quote (24h)',
    ctaSub: 'Reply and proposal within 24-48h — no commitment.',
  },
};

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice, formatRange } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isFr = lang === 'fr';
  const t = copy[lang];
  const showToast = (msg: string) => setToastMessage(msg);

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
          'itemOffered': {
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

      <main className="flex-grow relative z-10 pt-16 sm:pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors mb-8 min-h-[48px] py-2"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{t.back}</span>
          </Link>

          {/* ── Eyebrow + Title ──────────────────────────────────────── */}
          <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] mb-3 font-mono font-bold">
            {t.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#ECE4D3] leading-snug mb-3">
            {t.title}{' '}
            <span className="text-gold-gradient text-gold-glow">{t.titleHighlight}</span>
          </h1>

          {/* Market reference */}
          <p className="text-xs text-[#9C9384] leading-relaxed mb-10 border-l-2 border-[#CAA243]/40 pl-3.5">
            {t.marketRef}
          </p>

          {/* ── SECTION A — COMMANDE IMMÉDIATE ────────────────────────── */}
          <section className="mb-14">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#CAA243] font-bold block mb-1">
                OPTION 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#ECE4D3]">
                {t.sectionA}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.sectionASub}
              </p>
            </div>

            {/* Embedded Launch Offer Callout — max 2 lines on mobile 375px */}
            <div className="mb-6 rounded-xl border border-[#CAA243]/30 bg-[#CAA243]/[0.05] p-3.5 sm:p-4 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#ECE4D3] leading-relaxed">
                <span className="mono text-[10px] uppercase tracking-widest text-[#CAA243] font-bold block mb-0.5">
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

            {/* 2 Packaged Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PLANS_DATA.map((plan) => {
                const formattedPrice = formatPrice(plan.minUsd, currency);

                return (
                  <div
                    key={plan.id}
                    className={`ovizai-card flex flex-col justify-between gap-4 p-5 sm:p-6 transition-all ${
                      plan.primary
                        ? 'border border-[#CAA243]/70 bg-[#0B0A08]/95 shadow-[0_0_24px_rgba(202,162,67,0.12)]'
                        : 'border border-[#CAA243]/40 bg-[#0B0A08]/80'
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="mono text-[10px] text-[#CAA243] mb-0.5 font-bold tracking-wider">
                            {plan.badge[lang]}
                          </p>
                          <h3 className="text-base font-bold text-[#ECE4D3]">{plan.name[lang]}</h3>
                        </div>
                        {plan.primary ? (
                          <span className="mono text-[9px] uppercase tracking-widest bg-[#CAA243]/20 text-[#f0c869] px-2 py-1 rounded-full border border-[#CAA243]/40 font-semibold">
                            {isFr ? 'Recommandé' : 'Recommended'}
                          </span>
                        ) : plan.starterHighlight ? (
                          <span className="mono text-[9px] uppercase tracking-widest bg-[#CAA243]/10 text-[#CAA243] px-2 py-1 rounded-full border border-[#CAA243]/30">
                            {isFr ? 'Starter' : 'Starter'}
                          </span>
                        ) : null}
                      </div>

                      {/* Price */}
                      <div className="my-3 pb-3 border-b border-white/[0.06]">
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#ECE4D3] leading-none tracking-tight">
                          {formattedPrice}
                        </p>
                        <p className="text-[11px] text-[#9C9384] mt-1 font-mono">
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

          {/* ── SECTION B — SUR-MESURE, DEVIS SOUS 24H ────────────────── */}
          <section className="mb-14">
            <div className="mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#CAA243] font-bold block mb-1">
                OPTION 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#ECE4D3]">
                {t.sectionB}
              </h2>
              <p className="text-xs text-[#9C9384] mt-1">
                {t.sectionBSub}
              </p>
            </div>

            {/* Synthetic 5-Row Price Table */}
            <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08] divide-y divide-white/[0.06] rounded-xl overflow-hidden mb-4">
              {CUSTOM_SERVICES_SUMMARY.map((service) => {
                const rangeStr = formatRange(service.minUsd, service.maxUsd, currency);

                return (
                  <div
                    key={service.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="mono text-xs font-bold text-[#CAA243] bg-black/50 border border-[#CAA243]/30 px-2 py-0.5 rounded flex-shrink-0">
                        {service.number}
                      </span>
                      <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3] truncate">
                        {service.title[lang]}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                      <span className="mono text-xs text-[#CAA243] font-semibold">
                        {rangeStr}
                      </span>
                      <Link
                        href={`/contact?service=${service.id}&type=${service.type}&budget=${service.budget}`}
                        className="inline-flex items-center gap-1 mono text-[11px] text-[#ECE4D3] hover:text-[#f0c869] font-medium transition-colors cursor-pointer"
                      >
                        <span>{isFr ? 'Devis 24h →' : 'Quote 24h →'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Sample Production Showcase Video ────────────────────── */}
          <div className="mb-10">
            <div className="mb-3">
              <p className="mono text-[10px] uppercase tracking-widest text-[#CAA243] font-bold">
                {isFr ? 'DÉMONSTRATION DE RENDU' : 'PRODUCTION SAMPLE'}
              </p>
              <h3 className="text-sm font-bold text-[#ECE4D3]">
                {isFr ? 'Voir un exemple de vidéo avant de réserver' : 'See a sample video before booking'}
              </h3>
            </div>
            <VideoShowcase
              lang={lang}
              compact
              video={{
                youtubeId: YOUTUBE_VIDEOS.tarifsSample,
                title: {
                  fr: 'Exemple de Production & Film de Marque OVIZai',
                  en: 'OVIZai Brand Film & Production Sample',
                },
                description: {
                  fr: 'Aperçu du rendu cinématographique 4K obtenu avec nos formules de production.',
                  en: '4K cinematic visual sample achieved with our production packages.',
                },
                uploadDate: '2026-09-01',
                badge: { fr: '01 // REEL PROD', en: '01 // PROD REEL' },
              }}
            />
          </div>

          {/* ── Market comparison note ────────────────────────────────── */}
          <p className="text-xs text-[#9C9384] leading-relaxed mb-10 flex items-start gap-2 bg-[#0B0A08] p-3.5 rounded-xl border border-white/[0.06]">
            <Clock className="w-4 h-4 text-[#CAA243]/80 flex-shrink-0 mt-0.5" />
            <span>{t.comparison}</span>
          </p>

          {/* ── FAQ ──────────────────────────────────────────────────── */}
          <p className="mono text-[11px] uppercase tracking-widest text-[#9C9384] mb-4 font-semibold">
            {t.faqTitle}
          </p>

          <div className="flex flex-col divide-y divide-white/[0.06] ovizai-card mb-10 border border-white/[0.08] bg-[#0B0A08]">
            {t.faqs.map((faq, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
                >
                  <span className="text-xs text-[#ECE4D3] font-medium leading-snug">{faq.q}</span>
                  <HelpCircle
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      openFaq === i ? 'text-[#CAA243]' : 'text-[#9C9384]'
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="px-4 sm:px-5 pb-4 text-xs text-[#9C9384] leading-relaxed border-t border-white/[0.04] pt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

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
