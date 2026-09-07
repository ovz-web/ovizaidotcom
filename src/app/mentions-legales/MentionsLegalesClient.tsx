'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function MentionsLegalesClient() {
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
      id: 'editor',
      title: isFr ? '1 // Éditeur du Site' : '1 // Site Publisher',
      content: (
        <div className="space-y-2 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr ? 'Le site OVIZai est accessible sur ovizai.com' : 'The website is accessible at ovizai.com'}
            <br />
            {isFr ? 'Édité par l’équipe OVIZai Studio' : 'Published and maintained by OVIZai Studio'}
          </p>
          <p className="mt-1">
            {isFr ? 'Contact par email à ' : 'Contact via email at '}
            <a href="mailto:contact@ovizai.com" className="text-gold hover:underline">
              contact@ovizai.com
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'host',
      title: isFr ? '2 // Hébergement' : '2 // Hosting',
      content: (
        <div className="space-y-1 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr ? 'Site hébergé par la société Vercel Inc.' : 'Platform hosted by Vercel Inc.'}
            <br />
            440 N Barranca Ave #4133 Covina CA 91723 USA
            <br />
            {isFr ? 'Plateforme en ligne sur ' : 'Cloud infrastructure at '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              vercel.com
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'ip',
      title: isFr ? '3 // Propriété Intellectuelle & Projets Conceptuels' : '3 // Intellectual Property & Spec Concepts',
      content: (
        <div className="space-y-2 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'Contenus et créations originaux protégés par le droit d’auteur.'
              : 'All original content, designs, and animations are protected by copyright laws.'}
            <br />
            {isFr
              ? 'Textes, graphismes, identités visuelles et vidéos sous propriété intellectuelle exclusive.'
              : 'Copy, graphics, visual assets, and video renders remain exclusive intellectual property.'}
          </p>
          <p className="mt-1">
            {isFr
              ? 'Projets conceptuels et études de style présentés à titre de démonstration.'
              : 'Spec concepts, style frames, and mock case studies are presented for creative demonstration.'}
            <br />
            {isFr
              ? 'Réalisations sans affiliation commerciale tierce sauf mention explicite contraire.'
              : 'Produced without direct commercial affiliation or brand endorsement unless explicitly noted.'}
          </p>
        </div>
      ),
    },
    {
      id: 'privacy',
      title: isFr ? '4 // Données Personnelles' : '4 // Personal Data & Privacy',
      content: (
        <div className="space-y-1 text-xs text-muted leading-relaxed pt-1">
          <p>
            {isFr
              ? 'Gestion des données et respect strict de votre vie privée.'
              : 'Data collection is strictly limited and respects your digital privacy.'}
            <br />
            {isFr ? 'Consultez notre ' : 'Learn more in our '}
            <Link href="/confidentialite" className="text-gold hover:underline">
              {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </Link>
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
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />

      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pb-2 sm:pb-3"
        style={{ paddingTop: 'calc(var(--topbar-height, 44px) + 6px)' }}
      >
        <PageHeader
          tag={isFr ? 'INFORMATIONS LÉGALES' : 'LEGAL NOTICE'}
          title={
            isFr ? (
              <>
                MENTIONS LÉGALES & <span className="text-gold-gradient">ÉDITEUR DU SITE</span>
              </>
            ) : (
              <>
                LEGAL NOTICE & <span className="text-gold-gradient">SITE PUBLISHER</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Éditeur, hébergement et cadre légal du studio'
              : 'Publisher, hosting and legal framework'
          }
          showDetailsHint={true}
          lang={lang}
        />

        <div className="max-w-xl mx-auto px-4 mb-2 sm:mb-2.5">
          <ListMenuCard items={items} />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
