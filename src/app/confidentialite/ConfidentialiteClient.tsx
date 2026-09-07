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

export default function ConfidentialiteClient() {
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

  const sections = [
    {
      id: 'data-collection',
      title: isFr ? '1 // Collecte des Données' : '1 // Data Collection',
      content: (
        <div className="space-y-2 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'OVIZai collecte uniquement les données nécessaires au traitement de vos demandes :'
              : 'OVIZai strictly collects data essential to handling your project inquiries:'}
          </p>
          <ul className="space-y-1 text-fg/90 pl-2">
            <li>• {isFr ? 'Adresse e-mail de contact' : 'Contact email address'}</li>
            <li>• {isFr ? 'Nom ou organisation si renseigné' : 'Name or organization if provided'}</li>
            <li>• {isFr ? 'Détails du projet et enveloppe budgétaire estimée' : 'Brief details and estimated budget range'}</li>
            <li>• {isFr ? 'Données de règlement sécurisées traitées par Stripe' : 'Secure payment data processed by Stripe'}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-usage',
      title: isFr ? '2 // Utilisation des Données' : '2 // Use of Information',
      content: (
        <div className="space-y-1.5 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'Vos données sont exclusivement utilisées pour nos échanges professionnels'
              : 'Your data is solely used to facilitate professional collaboration'}
          </p>
          <p>
            {isFr
              ? 'Envoi de propositions commerciales et devis sous 24-48h'
              : 'Delivering tailored creative briefs and quotes within 24-48h'}
          </p>
          <p>
            {isFr
              ? 'Validation et activation de vos accès à la Masterclass'
              : 'Fulfilling and activating instant access to Masterclass curriculum'}
          </p>
          <p>
            {isFr
              ? 'Support direct et accompagnement technique'
              : 'Direct production support and client assistance'}
          </p>
          <p>
            {isFr
              ? 'Aucune donnée personnelle n’est cédée ni vendue à des tiers'
              : 'No personal data is ever rented, shared, or sold to third parties'}
          </p>
        </div>
      ),
    },
    {
      id: 'gdpr-rights',
      title: isFr ? '3 // Vos Droits RGPD' : '3 // GDPR Compliance & Rights',
      content: (
        <div className="space-y-1.5 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'Vous disposez d’un droit d’accès, de rectification et de suppression de vos données'
              : 'You hold full rights of access, rectification, portability, and deletion of your data'}
          </p>
          <p>
            {isFr ? 'Pour exercer vos droits, contactez-nous à : ' : 'To exercise your rights, email our team at: '}
            <a href="mailto:contact@ovizai.com" className="text-gold underline">
              contact@ovizai.com
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: isFr ? '4 // Stockage Local & Cookies' : '4 // Local Storage & Cookies',
      content: (
        <div className="space-y-1.5 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'Le site utilise uniquement le stockage local strictement nécessaire à la navigation'
              : 'The site only uses local storage strictly required for user navigation preferences'}
          </p>
          <p>
            {isFr
              ? 'Mémorisation de votre choix de langue FR/EN et de votre devise'
              : 'Saving your chosen display language (FR/EN) and billing currency'}
          </p>
          <p>
            {isFr
              ? 'Aucun cookie tiers à des fins publicitaires n’est déposé sur votre appareil'
              : 'Zero third-party marketing or profiling cookies are deployed on your browser'}
          </p>
        </div>
      ),
    },
  ];

  const items: ListMenuItem[] = sections.map((sec) => {
    const isOpen = openSection === sec.id;
    return {
      id: sec.id,
      title: sec.title,
      trailing: isOpen ? '↑' : '↓',
      onClick: () => toggleSection(sec.id),
      expanded: isOpen,
      expandedContent: sec.content,
    };
  });

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
        <PageHeader
          tag={isFr ? 'PROTECTION DES DONNÉES' : 'DATA PROTECTION'}
          title={
            isFr ? (
              <>
                POLITIQUE DE <span className="text-gold-gradient">CONFIDENTIALITÉ RGPD</span>
              </>
            ) : (
              <>
                PRIVACY POLICY & <span className="text-gold-gradient">DATA PROTECTION</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Protection de vos données et respect du RGPD'
              : 'Personal data protection & GDPR compliance'
          }
          showDetailsHint={true}
          lang={lang}
        />

        <div className="max-w-xl mx-auto px-4 mb-1 sm:mb-2">
          <ListMenuCard items={items} />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
