'use client';

import React, { useState } from 'react';
import { GraduationCap, ArrowUpRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { Language, Currency } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';

interface MasterclassSectionProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
}

const MODULES = [
  {
    num: '01',
    title: { fr: 'Ingénierie de Prompts & Direction Visuelle 8K', en: 'Prompt Engineering & 8K Visual Direction' },
    desc: { fr: 'Maîtriser Midjourney v6.1 et Flux.1 Dev pour générer des images cinématiques ultradétaillées.', en: 'Master Midjourney v6.1 and Flux.1 Dev to generate ultra-detailed cinematic imagery.' }
  },
  {
    num: '02',
    title: { fr: 'Cinéma Génératif & Caméra Virtuelle', en: 'Generative Cinema & Virtual Camera' },
    desc: { fr: 'Contrôler Runway Gen-3 Alpha, Kling AI et Luma Dream Machine pour animer vos plans avec une fluidité 60fps.', en: 'Control Runway Gen-3 Alpha, Kling AI, and Luma Dream Machine for 60fps camera movements.' }
  },
  {
    num: '03',
    title: { fr: 'Post-Production & Upscaling 4K/8K', en: 'Post-Production & 4K/8K Upscaling' },
    desc: { fr: 'Utiliser Topaz Video AI, DaVinci Resolve Studio et l’étalonnage colorimétrique ACES pour un rendu pro.', en: 'Leverage Topaz Video AI, DaVinci Resolve Studio, and ACES color grading for pro finish.' }
  },
  {
    num: '04',
    title: { fr: 'Sound Design & Doublage Voix IA', en: 'Sound Design & AI Voice Synchronization' },
    desc: { fr: 'Créer des bandes-son immersives avec ElevenLabs, Suno v4 et Adobe Audition.', en: 'Build immersive soundtracks with ElevenLabs, Suno v4, and spatial audio editing.' }
  },
  {
    num: '05',
    title: { fr: 'Monétisation & Workflow Client Pro', en: 'Monetization & Professional Client Pipeline' },
    desc: { fr: 'Structures de devis, gestion des droits d’auteur IA et méthodes pour signer vos premiers contrats.', en: 'Quote structures, AI copyright frameworks, and methods to land your first commercial contracts.' }
  }
];

export default function MasterclassSection({ lang, currency: propCurrency }: MasterclassSectionProps) {
  const isFr = lang === 'fr';
  const { currency: ctxCurrency, formatPrice } = useCurrency();
  const activeCurrency = propCurrency || ctxCurrency;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const formattedPrice = formatPrice(490, activeCurrency);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency: activeCurrency.toLowerCase() }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('[CHECKOUT ERROR]', data);
        setErrorMsg(data.error || (isFr ? 'Erreur lors de l’initialisation de la session Stripe.' : 'Failed to create checkout session.'));
        setLoading(false);
      }
    } catch (err: any) {
      console.error('[CHECKOUT FETCH ERROR]', err);
      setErrorMsg(isFr ? 'Erreur de connexion serveur.' : 'Server connection error.');
      setLoading(false);
    }
  };

  return (
    <section id="masterclass" className="max-w-3xl mx-auto mb-14 px-4">
      {/* Container Card */}
      <div className="relative border border-[#CAA243]/40 bg-[#0B0A08]/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_0_35px_rgba(202,162,67,0.1)] overflow-hidden">
        {/* Ambient Radial Aura */}
        <div
          className="absolute top-0 right-0 w-80 h-80 blur-3xl pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgba(202,162,67,0.15) 0%, transparent 70%)' }}
        />

        {/* Section Eyebrow */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#CAA243]" />
            {isFr ? '02 // FORMATION & MASTERCLASS IA' : '02 // AI MASTERCLASS & TRAINING'}
          </span>
          <span className="mono text-[10px] uppercase font-bold text-black bg-[#CAA243] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            {isFr ? 'PROGRAMME PRO' : 'PRO CURRICULUM'}
          </span>
        </div>

        {/* Header Title */}
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#ECE4D3] mb-3 leading-tight">
          {isFr ? (
            <>
              MAÎTRISEZ LE CINÉMA IA <br />
              <span className="text-gold-gradient text-gold-glow">DU PROMPT AU MASTER FINAL</span>
            </>
          ) : (
            <>
              MASTER AI CINEMATOGRAPHY <br />
              <span className="text-gold-gradient text-gold-glow">FROM PROMPT TO FINAL MASTER</span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-[#8c8375] leading-relaxed max-w-xl mb-6">
          {isFr
            ? 'Une formation ultra-pratique conçue pour les créateurs, réalisateurs et directeurs artistiques souhaitant intégrer l’IA générative dans leurs productions.'
            : 'An ultra-practical masterclass built for creators, directors, and art directors looking to integrate generative AI into high-end film pipelines.'}
        </p>

        {/* Modules List */}
        <div className="space-y-3 mb-8">
          <h3 className="mono text-xs font-bold uppercase text-[#ECE4D3] tracking-wider mb-2">
            {isFr ? 'LES 5 MODULES DU PROGRAMME :' : 'CURRICULUM 5 MODULES:'}
          </h3>

          {MODULES.map(mod => (
            <div
              key={mod.num}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:border-[#CAA243]/30 transition-all"
            >
              <span className="mono text-xs font-bold text-[#CAA243] bg-black/60 border border-[#CAA243]/30 px-2 py-0.5 rounded">
                {mod.num}
              </span>
              <div>
                <h4 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3]">
                  {mod.title[lang]}
                </h4>
                <p className="text-[11.5px] text-[#8c8375] mt-0.5 leading-normal">
                  {mod.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Guarantee Box */}
        <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#CAA243] font-mono">
                {formattedPrice}
              </span>
              <span className="text-xs text-[#8c8375] line-through font-mono">
                {activeCurrency === 'EUR' ? '900 €' : activeCurrency === 'CAD' ? '1 300 $ CAD' : '990 $ USD'}
              </span>
            </div>
            <p className="text-[11px] text-[#8c8375] mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CAA243]" />
              {isFr ? 'Accès à vie + Mises à jour des modèles incluses' : 'Lifetime Access + Model Updates Included'}
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleCheckout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-black animate-spin" />
                <span>{isFr ? 'Redirection Stripe...' : 'Redirecting...'}</span>
              </>
            ) : (
              <>
                <span>{isFr ? 'S’inscrire à la Masterclass +' : 'Enroll in Masterclass +'}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-400 font-mono mt-3 text-center">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
