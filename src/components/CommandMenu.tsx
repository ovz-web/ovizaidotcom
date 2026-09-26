'use client';

import React from 'react';
import { Film, Tag, Cpu, Mail, GraduationCap } from 'lucide-react';
import { Language } from '@/types';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

/**
 * Navigation card — presents key studio destinations clearly using ListMenuCard.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';

  const items: ListMenuItem[] = [
    {
      id: 'nav-services',
      title: isFr ? '01 // Portfolio & Services' : '01 // Portfolio & Services',
      subtitle: isFr ? 'Concepts publicitaires, restaurants & marques' : 'Ad concepts, restaurants & brand visuals',
      href: '/services',
      icon: Film,
      trailing: '→',
    },
    {
      id: 'nav-tarifs',
      title: isFr ? '02 // Offre de Lancement (530 $)' : '02 // Launch Offer ($530)',
      subtitle: isFr ? 'Publicité 10-15s · 265 $ acompte · 5 jours' : '10-15s ad · $265 deposit · 5 days',
      href: '/tarifs',
      icon: Tag,
      trailing: '→',
    },
    {
      id: 'nav-pipeline',
      title: isFr ? '03 // Notre Méthode de Production' : '03 // Our Production Method',
      subtitle: isFr ? 'Direction créative, fidélité produit & pipeline 4K' : 'Creative direction, product fidelity & 4K',
      href: '/stack',
      icon: Cpu,
      trailing: '→',
    },
    {
      id: 'nav-contact',
      title: isFr ? '04 // Devis & Contact' : '04 // Contact & Quote',
      subtitle: isFr ? 'Démarrer votre projet publicitaire sous 24h' : 'Start your advertising project in 24h',
      href: '/contact',
      icon: Mail,
      trailing: '→',
    },
    {
      id: 'nav-formation',
      title: isFr ? '05 // Formation Vidéo IA' : '05 // AI Video Course',
      subtitle: isFr ? '5 modules pratiques & bibles de prompts cinéma' : '5 practical modules & cinema prompt bibles',
      href: '/formation',
      icon: GraduationCap,
      trailing: '→',
    },
  ];

  return (
    <div className="px-4 max-w-xl mx-auto mb-1.5 sm:mb-2">
      <ListMenuCard items={items} />
    </div>
  );
}
