'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '@/types';

interface HomeFaqProps {
  lang: Language;
}

interface FaqItem {
  id: string;
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    q: {
      fr: 'Quels sont les délais de production de l’offre de lancement ?',
      en: 'What is the production turnaround for the launch offer?',
    },
    a: {
      fr: 'La première version est visée sous 5 jours ouvrables — ce délai commence dès réception de l’ensemble des éléments nécessaires de votre brief (produit, identité, logo) et après confirmation conjointe du planning',
      en: 'The first cut is targeted within 5 business days — this timeframe begins once all required brief assets (product, brand, logo) are received and the production schedule is mutually confirmed',
    },
  },
  {
    id: 'faq-02',
    q: {
      fr: 'Comment s’articule le règlement des 530 USD ?',
      en: 'How does payment work for the $530 USD offer?',
    },
    a: {
      fr: 'Le paiement est divisé en deux étapes claires : un acompte de 265 USD exigible à la commande pour engager la production, et le solde de 265 USD avant la remise du master final en haute définition',
      en: 'Payment is structured in two clear milestones: a $265 USD deposit upon ordering to initiate production, and the $265 USD balance prior to releasing the high-definition final master',
    },
  },
  {
    id: 'faq-03',
    q: {
      fr: 'Que comprend la série de corrections incluse ?',
      en: 'What does the included revision round cover?',
    },
    a: {
      fr: 'L’offre comprend une série de retours consolidés sur la première version (ajustements de montage, équilibrage audio, sound design ou texte) — les changements radicaux de concept hors brief initial font l’objet d’un devis complémentaire',
      en: 'The offer includes one consolidated round of revisions on the initial cut (editing pace, audio mix, sound design or text tweaks) — foundational concept changes outside the approved brief are quoted separately',
    },
  },
  {
    id: 'faq-04',
    q: {
      fr: 'Quels sont les droits d’utilisation cédés ?',
      en: 'What usage rights and licenses are included?',
    },
    a: {
      fr: 'Les droits et licences applicables pour vos campagnes publicitaires (réseaux sociaux, diffusion digitale) sont clairement définis et formalisés dans votre devis et contrat de production',
      en: 'Applicable usage rights and licenses for your advertising campaigns (social channels, digital marketing) are clearly specified and formalized in your production quote and agreement',
    },
  },
];

export default function HomeFaq({ lang }: HomeFaqProps) {
  const isFr = lang === 'fr';
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-bold">
            {isFr ? '04 // QUESTIONS FRÉQUENTES' : '04 // FREQUENT QUESTIONS'}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-fg tracking-tight uppercase leading-tight">
          {isFr ? 'RÉPONSES DIRECTES' : 'DIRECT ANSWERS'}
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#11100e] border border-white/[0.08] hover:border-white/[0.14] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-fg">
                  {item.q[lang]}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-white/[0.04] animate-fadeIn"
                >
                  {item.a[lang]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
