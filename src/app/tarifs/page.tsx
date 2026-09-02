'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Check, HelpCircle } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

// Prix finaux — modifier ici pour mettre à jour les tarifs affichés sur la page
const PRIX_STANDARD: string = '950 €';
const PRIX_PREMIUM: string = '2 400 €';

// Offre de lancement — met à jour PLACES_RESTANTES manuellement à mesure que les places partent
const PLACES_RESTANTES: number = 5;

const copy = {
  fr: {
    back: 'Retour Accueil',
    eyebrow: 'TARIFS & PRODUCTION',
    title: "Le même niveau de rendu qu'une production traditionnelle",
    titleHighlight: "sans le tournage, sans l'attente.",
    marketRef:
      "Une vidéo de marque professionnelle classique (crew, tournage, montage) coûte entre 5 000 € et 30 000 € en agence traditionnelle — jusqu'à 75 000 € pour un film de marque haut de gamme — avec un délai habituel de 2 à 6 semaines entre le brief et la livraison.",
    plansTitle: 'Deux formules, un seul interlocuteur',
    plans: [
      {
        id: 'standard',
        name: 'Standard',
        badge: '01',
        price: PRIX_STANDARD,
        priceFallback: 'Sur devis',
        period: '/ vidéo',
        includes: [
          '1 vidéo finalisée livrée',
          '2 rounds de révision inclus',
          'Livraison sous 3 à 5 jours ouvrés',
          'Export 4K + version réseaux sociaux',
        ],
        cta: 'Demander un devis',
        primary: false,
      },
      {
        id: 'premium',
        name: 'Premium',
        badge: '02',
        price: PRIX_PREMIUM,
        priceFallback: 'Sur devis',
        period: '/ campagne 3 vidéos',
        includes: [
          '3 vidéos finalisées (800 € / vidéo)',
          '3 rounds de révision inclus',
          'Livraison prioritaire 48-72h',
          'Export multi-formats (4K, Reel, YouTube)',
          'Direction artistique dédiée incluse',
        ],
        cta: 'Demander un devis',
        primary: true,
      },
    ],
    comparison:
      "À titre de référence de marché : la production vidéo IA réduit le coût par vidéo de 70 à 90 % par rapport à la production traditionnelle en éliminant les coûts d'équipe, de matériel et de studio — une fourchette documentée dans les études sectorielles sur l'adoption de l'IA en production audiovisuelle (2024-2026).",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Pourquoi ne pas passer par un freelance moins cher ?',
        a: 'Un freelance en montage vidéo classique ne produit pas les mêmes rendus visuels — il a besoin de rushes filmés. Ce que nous livrons est une production complète, de la création des images à la post-production, sans tournage à organiser. Le gain principal est le délai : 5 à 7 jours au lieu de 2 à 6 semaines.',
      },
      {
        q: 'La qualité est-elle comparable à une production traditionnelle ?',
        a: "Les outils utilisés (Midjourney v6, Runway Gen-3, DaVinci Resolve Studio) permettent une qualité d'image 4K avec étalonnage cinématographique. Le résultat est différent d'un tournage réel — c'est un choix esthétique, pas une limitation technique.",
      },
      {
        q: 'Que comprend exactement "révision" ?',
        a: 'Une révision couvre un ajustement de montage, de cadrage ou de colorimétrie sur la vidéo livrée. Les changements de concept ou de direction artistique en cours de production sont traités comme un nouveau projet.',
      },
    ],
    ctaLabel: 'Demander un devis',
    ctaSub: 'Réponse sous 24-48h — sans engagement.',
    metaTitle: 'Tarifs — OVIZai',
    metaDesc:
      'Tarifs de production vidéo IA cinématographique OVIZai. Comparaison avec la production traditionnelle (5 000–30 000 € / vidéo). Deux formules, livraison 3-7 jours.',
  },
  en: {
    back: 'Back Home',
    eyebrow: 'PRICING & PRODUCTION',
    title: 'The same visual quality as traditional production',
    titleHighlight: 'without the shoot, without the wait.',
    marketRef:
      'A professional brand video (crew, shoot, edit) costs between €5,000 and €30,000 at a traditional agency — up to €75,000 for a premium brand film — with a typical timeline of 2 to 6 weeks from brief to delivery.',
    plansTitle: 'Two plans, one point of contact',
    plans: [
      {
        id: 'standard',
        name: 'Standard',
        badge: '01',
        price: PRIX_STANDARD,
        priceFallback: 'Quote-based',
        period: '/ video',
        includes: [
          '1 finalised video delivered',
          '2 revision rounds included',
          'Delivery within 3 to 5 business days',
          '4K export + social media version',
        ],
        cta: 'Request a quote',
        primary: false,
      },
      {
        id: 'premium',
        name: 'Premium',
        badge: '02',
        price: PRIX_PREMIUM,
        priceFallback: 'Quote-based',
        period: '/ 3-video campaign',
        includes: [
          '3 finalised videos (€800 / video)',
          '3 revision rounds included',
          'Priority delivery 48-72h',
          'Multi-format export (4K, Reel, YouTube)',
          'Dedicated art direction included',
        ],
        cta: 'Request a quote',
        primary: true,
      },
    ],
    comparison:
      'For market reference: AI video production reduces the cost per video by 70 to 90% compared to traditional production by eliminating crew, equipment and studio costs — a range documented in sector studies on AI adoption in audiovisual production (2024-2026).',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Why not hire a cheaper freelancer?',
        a: 'A freelance video editor cannot produce the same visuals — they need filmed footage. What we deliver is a complete production, from image creation to post-production, with no shoot to organise. The main advantage is speed: 5 to 7 days instead of 2 to 6 weeks.',
      },
      {
        q: 'Is the quality comparable to traditional production?',
        a: 'The tools used (Midjourney v6, Runway Gen-3, DaVinci Resolve Studio) deliver 4K image quality with cinematic colour grading. The result is different from a live-action shoot — an aesthetic choice, not a technical limitation.',
      },
      {
        q: 'What exactly counts as a "revision"?',
        a: 'A revision covers a cut, framing, or colour adjustment on the delivered video. Concept or art direction changes mid-production are treated as a new project.',
      },
    ],
    ctaLabel: 'Request a quote',
    ctaSub: 'Reply within 24-48h — no commitment.',
    metaTitle: 'Pricing — OVIZai',
    metaDesc:
      'OVIZai cinematic AI video production pricing. Market comparison with traditional production (€5,000–30,000 / video). Two plans, 3-7 day delivery.',
  },
};

export default function TarifsPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const t = copy[lang];
  const showToast = (msg: string) => setToastMessage(msg);

  return (
    <>
      {/* SEO Meta — static fallback, real meta via generateMetadata if needed */}
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDesc} />

      <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
        <FilmGrain />

        <TopBar
          lang={lang}
          onToggleLang={toggleLanguage}
          currency={currency}
          onSelectCurrency={setCurrency}
        />

        <main className="flex-grow relative z-10 pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4">

            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.back}</span>
            </Link>

            {/* ── Eyebrow + Title ──────────────────────────────────────── */}
            <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] mb-3 font-mono font-bold">
              {t.eyebrow}
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] leading-snug mb-2">
              {t.title}{' '}
              <span className="text-gold-gradient text-gold-glow">{t.titleHighlight}</span>
            </h1>

            {/* Market reference */}
            <p className="text-xs text-[#8C8375] leading-relaxed mb-10 border-l-2 border-[#CAA243]/30 pl-3">
              {t.marketRef}
            </p>

            {/* ── Plans ────────────────────────────────────────────────── */}
            <p className="mono text-[11px] uppercase tracking-widest text-[#8C8375] mb-4">
              {t.plansTitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {t.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`ovizai-card flex flex-col gap-4 p-5 ${
                    plan.primary
                      ? 'border border-[#CAA243]/60 shadow-[0_0_24px_rgba(202,162,67,0.10)]'
                      : 'border border-white/[0.06]'
                  }`}
                >
                  {/* Plan header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="mono text-[10px] text-[#CAA243] mb-0.5">{plan.badge}</p>
                      <p className="text-sm font-semibold text-[#ECE4D3]">{plan.name}</p>
                    </div>
                    {plan.primary && (
                      <span className="mono text-[9.5px] uppercase tracking-widest bg-[#CAA243]/15 text-[#CAA243] px-2 py-0.5 rounded-full border border-[#CAA243]/30">
                        {lang === 'fr' ? 'Recommandé' : 'Recommended'}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-2xl font-bold text-[#ECE4D3] leading-none">
                      {plan.price ?? plan.priceFallback}
                    </p>
                    {plan.price && (
                      <p className="text-[11px] text-[#8C8375] mt-0.5">{plan.period}</p>
                    )}
                  </div>

                  {/* Includes */}
                  <ul className="flex flex-col gap-2">
                    {plan.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11.5px] text-[#8C8375]">
                        <Check className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider font-semibold transition-all mt-auto ${
                      plan.primary
                        ? 'bg-[#CAA243] hover:bg-[#f0c869] text-black shadow-[0_0_18px_rgba(202,162,67,0.25)] hover:scale-[1.01]'
                        : 'bg-black/40 border border-[#CAA243]/50 hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#f0c869]'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            {/* ── Offre de lancement ───────────────────────────────────── */}
            <div className="mb-8 rounded-xl border border-[#CAA243]/25 bg-[#CAA243]/[0.04] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="mono text-[10px] uppercase tracking-widest text-[#CAA243] mb-1">
                  {lang === 'fr' ? 'Offre de lancement — limitée' : 'Launch offer — limited'}
                </p>
                <p className="text-xs text-[#ECE4D3] leading-snug">
                  {lang === 'fr'
                    ? <>−30 % sur les deux formules pour les premiers clients.&nbsp;
                        <span className="text-[#CAA243] font-semibold">{PLACES_RESTANTES} place{PLACES_RESTANTES > 1 ? 's' : ''} restante{PLACES_RESTANTES > 1 ? 's' : ''}</span>
                        &nbsp;— retour au tarif normal ensuite.
                      </>
                    : <>&minus;30 % on both plans for early clients.&nbsp;
                        <span className="text-[#CAA243] font-semibold">{PLACES_RESTANTES} spot{PLACES_RESTANTES > 1 ? 's' : ''} remaining</span>
                        &nbsp;— full price applies after.
                      </>}
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-1.5 bg-black/40 border border-[#CAA243]/40 hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#f0c869] font-semibold px-3 py-2 rounded-lg mono text-[11px] uppercase tracking-wider transition-all"
              >
                <span>{lang === 'fr' ? 'En profiter' : 'Claim offer'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* ── Market comparison note ────────────────────────────────── */}
            <p className="text-[11px] text-[#8C8375] leading-relaxed mb-10 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#CAA243]/60 flex-shrink-0 mt-0.5" />
              {t.comparison}
            </p>

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            <p className="mono text-[11px] uppercase tracking-widest text-[#8C8375] mb-4">
              {t.faqTitle}
            </p>

            <div className="flex flex-col divide-y divide-white/[0.06] ovizai-card mb-10">
              {t.faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-[#ECE4D3] font-medium leading-snug">{faq.q}</span>
                    <HelpCircle
                      className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-colors ${
                        openFaq === i ? 'text-[#CAA243]' : 'text-[#8C8375]'
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="px-4 pb-4 text-[11.5px] text-[#8C8375] leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ── Bottom CTA ───────────────────────────────────────────── */}
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer"
              >
                <span>{t.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-[11px] text-[#8C8375] font-mono mt-2">{t.ctaSub}</p>
            </div>
          </div>
        </main>

        <Footer lang={lang} onShowToast={showToast} />
        <Toast message={toastMessage} />
      </div>
    </>
  );
}
