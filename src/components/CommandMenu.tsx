'use client';

import React from 'react';
import { Film, GraduationCap, Cpu, Tag, Mail } from 'lucide-react';
import { Language } from '@/types';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

/**
 * Navigation card — presents 5 key destinations clearly using ListMenuCard.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';

  const items: ListMenuItem[] = [
    {
      id: 'nav-services',
      title: isFr ? '01 // Nos Services' : '01 // Our Services',
      subtitle: isFr ? 'Films, pubs, clips & direction artistique' : 'Films, ads, music videos & art direction',
      href: '/services',
      icon: Film,
      trailing: '→',
    },
    {
      id: 'nav-formation',
      title: isFr ? '02 // Formation Vidéo IA' : '02 // AI Video Course',
      subtitle: isFr ? '5 modules pratiques & méthode 4K' : '5 practical modules & 4K workflow',
      href: '/formation',
      icon: GraduationCap,
      trailing: '→',
    },
    {
      id: 'nav-pipeline',
      title: isFr ? '03 // Notre Méthode de Production' : '03 // Our Production Method',
      subtitle: isFr ? 'Création générative 4K & étalonnage pro' : '4K generative workflow & pro grading',
      href: '/stack',
      icon: Cpu,
      trailing: '→',
    },
    {
      id: 'nav-tarifs',
      title: isFr ? '04 // Tarifs & Formules' : '04 // Pricing & Packages',
      subtitle: isFr ? 'Formules Sprint 48h & projets sur-mesure' : '48h Sprint packages & custom projects',
      href: '/tarifs',
      icon: Tag,
      trailing: '→',
    },
    {
      id: 'nav-contact',
      title: isFr ? '05 // Devis & Contact' : '05 // Contact & Quote',
      subtitle: isFr ? 'Formulaire de demande de devis & contact sous 24h' : 'Quote request & 24h direct response form',
      href: '/contact',
      icon: Mail,
      trailing: '→',
    },
  ];

  return <ListMenuCard items={items} className="mb-3" />;
}

