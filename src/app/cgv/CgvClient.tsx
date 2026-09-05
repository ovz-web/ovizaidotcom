'use client';

import React, { useState } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CgvClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isFr = lang === 'fr';

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const cgvSections = [
    {
      id: 'scope',
      title: isFr ? '1 // Objet & Champ d’Application' : '1 // Scope & Purpose',
      content: [
        isFr
          ? 'Les présentes conditions régissent les relations contractuelles avec OVIZai Studio.'
          : 'These terms govern all contractual relations with OVIZai Studio.',
        isFr
          ? 'Elles s’appliquent à l’ensemble de nos formules de production vidéo IA (Sprint Pilote et Campagne de Marque).'
          : 'They apply to all our AI video production packages (Pilot Sprint and Brand Campaign).',
        isFr
          ? 'Elles encadrent également toutes nos prestations sur-mesure ainsi que l’accès à la Masterclass Vidéo IA.'
          : 'They also govern all custom briefs and access to the AI Video Masterclass.',
      ],
    },
    {
      id: 'orders',
      title: isFr ? '2 // Commandes & Délais de Livraison' : '2 // Orders & Delivery Timelines',
      content: [
        isFr
          ? 'Sprint Pilote 48-72h : 1 asset publicitaire court livré en 48 à 72h ouvrées.'
          : 'Pilot Sprint 48-72h: 1 short commercial asset delivered within 48 to 72 business hours.',
        isFr
          ? 'Campagne de Marque : 3 vidéos cinématographiques livrées en 48 à 72h prioritaires.'
          : 'Brand Campaign: 3 cinematic videos delivered within 48 to 72 priority business hours.',
        isFr
          ? 'Prestations sur-mesure : délais fixés contractuellement selon le devis validé.'
          : 'Custom projects: timelines established in writing according to the validated quote.',
      ],
    },
    {
      id: 'pricing',
      title: isFr ? '3 // Tarifs & Règlement' : '3 // Pricing & Payment Terms',
      content: [
        isFr
          ? 'Les tarifs sont indiqués en USD, EUR et CAD selon votre sélection.'
          : 'Rates are specified in USD, EUR and CAD depending on your selection.',
        isFr
          ? 'Les paiements de la Masterclass sont traités de façon sécurisée via Stripe Checkout.'
          : 'Masterclass course orders are processed securely via Stripe Checkout.',
        isFr
          ? 'Pour les formules de production, le règlement s’effectue selon les modalités du devis validé.'
          : 'Production packages are settled according to terms stipulated in the formal brief quote.',
      ],
    },
    {
      id: 'withdrawal',
      title: isFr ? '4 // Droit de Rétractation & Renoncement Exprès' : '4 // Right of Withdrawal & Waiver',
      content: [
        isFr
          ? 'L’accès à la Masterclass constitue la fourniture d’un contenu numérique immédiat.'
          : 'Access to the Masterclass constitutes digital content delivered immediately.',
        isFr
          ? 'En validant votre commande, vous accédez au programme immédiatement et renoncez expressément à votre droit de rétractation (Code de la consommation).'
          : 'Upon order validation, access to course materials is granted immediately with express waiver of the withdrawal period.',
        isFr
          ? 'Pour les prestations vidéo personnalisées, le droit de rétractation ne s’applique pas une fois la production lancée.'
          : 'For custom video commissions, withdrawal rights do not apply once production pipeline is initiated.',
      ],
    },
  ];

  const items: ListMenuItem[] = cgvSections.map((sec) => {
    const isOpen = openSection === sec.id;
    return {
      id: sec.id,
      title: sec.title,
      trailing: isOpen ? '↑' : '↓',
      onClick: () => toggleSection(sec.id),
      expanded: isOpen,
      expandedContent: (
        <div className="space-y-1.5 text-xs text-muted leading-relaxed pt-1">
          {sec.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      ),
    };
  });

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
        className="flex-grow relative z-10 pb-3 sm:pb-4"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        <PageHeader
          lang={lang}
          eyebrow={isFr ? 'CADRE CONTRACTUEL' : 'LEGAL FRAMEWORK'}
          title={isFr ? 'CONDITIONS GÉNÉRALES DE VENTE' : 'TERMS OF SERVICE'}
          subtitle={
            isFr
              ? 'Modalités applicables aux prestations de production vidéo IA et à la Masterclass OVIZai'
              : 'Terms applicable to AI video production services and the OVIZai Masterclass'
          }
        />

        <div className="max-w-xl mx-auto px-4 mb-3 sm:mb-4">
          <ListMenuCard items={items} />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
