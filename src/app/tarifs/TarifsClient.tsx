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

// Offre de lancement — nombre de places restantes modifiable manuellement
const PLACES_RESTANTES: number = 5;

const PLANS_DATA = [
  {
    id: 'sprint',
    badge: { fr: '01 // STARTER', en: '01 // STARTER' },
    name: { fr: 'Sprint Pilote 48-72h', en: '48-72h Pilot Sprint' },
    minUsd: 530,
    budgetTierId: 'tier-0',
    tag: { fr: 'Sans engagement — paiement à la livraison', en: 'No commitment — payment on delivery' },
    includes: {
      fr: [
        '1 asset publicitaire court (Reel/TikTok 15-30s)',
        '1 round de révision inclus',
        'Livraison garantie sous 48-72h',
        'Export 4K optimisé réseaux sociaux',
        'Sans direction artistique dédiée',
      ],
      en: [
        '1 short ad asset (Reel/TikTok 15-30s)',
        '1 revision round included',
        'Guaranteed 48-72h delivery',
        '4K social media export',
        'Without dedicated art direction',
      ],
    },
    primary: false,
    starterHighlight: true,
  },
  {
    id: 'standard',
    badge: { fr: '02', en: '02' },
    name: { fr: 'Standard', en: 'Standard' },
    minUsd: 1030,
    budgetTierId: 'tier-1',
    includes: {
      fr: [
        '1 vidéo finalisée livrée',
        '2 rounds de révision inclus',
        'Livraison sous 3 à 5 jours ouvrés',
        'Export 4K + version réseaux sociaux',
      ],
      en: [
        '1 finalised video delivered',
        '2 revision rounds included',
        'Delivery within 3 to 5 business days',
        '4K export + social media version',
      ],
    },
    primary: false,
  },
  {
    id: 'premium',
    badge: { fr: '03', en: '03' },
    name: { fr: 'Premium', en: 'Premium' },
    minUsd: 2600,
    budgetTierId: 'tier-1',
    includes: {
      fr: [
        '3 vidéos finalisées (campagne déclinée)',
        '3 rounds de révision inclus',
        'Livraison prioritaire 48-72h',
        'Export multi-formats (4K, Reel, YouTube)',
        'Direction artistique dédiée incluse',
      ],
      en: [
        '3 finalised videos (campaign package)',
        '3 revision rounds included',
        'Priority delivery 48-72h',
        'Multi-format export (4K, Reel, YouTube)',
        'Dedicated art direction included',
      ],
    },
    primary: true,
  },
];

const copy = {
  fr: {
    back: 'Retour Accueil',
    eyebrow: 'TARIFS & FORMULES DE PRODUCTION',
    title: "Le même niveau de rendu qu'une production traditionnelle",
    titleHighlight: "sans le tournage, sans l'attente.",
    marketRef:
      "Une vidéo de marque professionnelle classique (crew, tournage, montage) coûte entre 5 000 € et 30 000 € en agence traditionnelle — jusqu'à 75 000 € pour un film haut de gamme — avec un délai habituel de 2 à 6 semaines entre le brief et la livraison.",
    plansTitle: 'Trois formules adaptées à votre vitesse et à votre budget',
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
    ctaLabel: 'Demander un devis ou réserver un sprint',
    ctaSub: 'Réponse et proposition sous 24-48h — sans engagement.',
  },
  en: {
    back: 'Back Home',
    eyebrow: 'PRICING & PRODUCTION PACKAGES',
    title: 'The same visual quality as traditional production',
    titleHighlight: 'without the shoot, without the wait.',
    marketRef:
      'A professional brand video (crew, shoot, edit) costs between €5,000 and €30,000 at a traditional agency — up to €75,000 for a premium brand film — with a typical timeline of 2 to 6 weeks from brief to delivery.',
    plansTitle: 'Three plans tailored to your speed and budget',
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
    ctaLabel: 'Request a quote or reserve a sprint',
    ctaSub: 'Reply and proposal within 24-48h — no commitment.',
  },
};

export default function TarifsClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      <main className="flex-grow relative z-10 pt-20 pb-16">
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

          {/* ── Plans Grid ────────────────────────────────────────────── */}
          <p className="mono text-[11px] uppercase tracking-widest text-[#9C9384] mb-4 font-semibold">
            {t.plansTitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {PLANS_DATA.map((plan) => {
              const formattedPrice = formatPrice(plan.minUsd, currency);

              return (
                <div
                  key={plan.id}
                  className={`ovizai-card flex flex-col justify-between gap-4 p-5 sm:p-6 transition-all ${
                    plan.primary
                      ? 'border border-[#CAA243]/70 bg-[#0B0A08]/95 shadow-[0_0_24px_rgba(202,162,67,0.12)]'
                      : plan.starterHighlight
                      ? 'border border-[#CAA243]/40 bg-[#0B0A08]/80'
                      : 'border border-white/[0.08] bg-[#0B0A08]/60'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="mono text-[10px] text-[#CAA243] mb-0.5 font-bold tracking-wider">
                          {plan.badge[lang]}
                        </p>
                        <h2 className="text-base font-bold text-[#ECE4D3]">{plan.name[lang]}</h2>
                      </div>
                      {plan.primary ? (
                        <span className="mono text-[9px] uppercase tracking-widest bg-[#CAA243]/20 text-[#f0c869] px-2 py-1 rounded-full border border-[#CAA243]/40 font-semibold">
                          {lang === 'fr' ? 'Recommandé' : 'Recommended'}
                        </span>
                      ) : plan.starterHighlight ? (
                        <span className="mono text-[9px] uppercase tracking-widest bg-[#CAA243]/10 text-[#CAA243] px-2 py-1 rounded-full border border-[#CAA243]/30">
                          {lang === 'fr' ? 'Starter' : 'Starter'}
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
                          ? (lang === 'fr' ? '/ asset 15-30s' : '/ 15-30s asset')
                          : plan.id === 'premium'
                          ? (lang === 'fr' ? '/ campagne 3 vidéos' : '/ 3-video campaign')
                          : (lang === 'fr' ? '/ vidéo' : '/ video')}
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
                  </div>

                  {/* CTA Link with Query Params */}
                  <Link
                    href={`/contact?service=${plan.id}&type=pub-brand&budget=${plan.budgetTierId}`}
                    className={`w-full min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      plan.primary
                        ? 'bg-[#CAA243] hover:bg-[#f0c869] text-black shadow-[0_0_18px_rgba(202,162,67,0.25)] hover:scale-[1.01]'
                        : 'bg-black/50 border border-[#CAA243]/50 hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#f0c869]'
                    }`}
                  >
                    <span>{lang === 'fr' ? 'Réserver / Devis +' : 'Book / Quote +'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ── Sample Production Showcase Video ────────────────────── */}
          <div className="mb-8">
            <div className="mb-3">
              <p className="mono text-[10px] uppercase tracking-widest text-[#CAA243] font-bold">
                {lang === 'fr' ? 'DÉMONSTRATION DE RENDU' : 'PRODUCTION SAMPLE'}
              </p>
              <h3 className="text-sm font-bold text-[#ECE4D3]">
                {lang === 'fr' ? 'Voir un exemple de vidéo avant de réserver' : 'See a sample video before booking'}
              </h3>
            </div>
            <VideoShowcase
              lang={lang}
              compact
              video={{
                youtubeId: '', // À remplir avec l'ID YouTube
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

          {/* ── Offre de Lancement ───────────────────────────────────── */}
          <div className="mb-8 rounded-2xl border border-[#CAA243]/30 bg-[#CAA243]/[0.05] p-4.5 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#CAA243] flex-shrink-0 mt-0.5" />
              <div>
                <p className="mono text-[10.5px] uppercase tracking-widest text-[#CAA243] font-bold mb-1">
                  {lang === 'fr' ? 'OFFRE DE LANCEMENT — LIMITÉE' : 'LAUNCH OFFER — LIMITED'}
                </p>
                <p className="text-xs text-[#ECE4D3] leading-relaxed">
                  {lang === 'fr' ? (
                    <>
                      Offre de lancement : <strong>−30 % sur les 3 formules</strong> pour les 5 premiers clients.&nbsp;
                      <span className="text-[#CAA243] font-semibold">{PLACES_RESTANTES} place{PLACES_RESTANTES > 1 ? 's' : ''} restante{PLACES_RESTANTES > 1 ? 's' : ''}</span>
                      &nbsp;— retour au tarif normal ensuite.
                    </>
                  ) : (
                    <>
                      Launch offer: <strong>&minus;30 % on all 3 plans</strong> for the first 5 clients.&nbsp;
                      <span className="text-[#CAA243] font-semibold">{PLACES_RESTANTES} spot{PLACES_RESTANTES > 1 ? 's' : ''} remaining</span>
                      &nbsp;— full price applies after.
                    </>
                  )}
                </p>
              </div>
            </div>
            <Link
              href={`/contact?service=sprint&type=pub-brand&budget=tier-0`}
              className="flex-shrink-0 min-h-[48px] inline-flex items-center justify-center gap-1.5 bg-black/60 border border-[#CAA243]/50 hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#f0c869] font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>{lang === 'fr' ? "Profiter de l'offre" : 'Claim launch offer'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#CAA243]" />
            </Link>
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

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <div className="text-center pt-2">
            <Link
              href="/contact?service=standard&type=pub-brand&budget=tier-1"
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
