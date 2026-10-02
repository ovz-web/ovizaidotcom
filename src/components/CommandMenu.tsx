'use client';

import React from 'react';
import { Film, Tag, Cpu, Mail, GraduationCap } from 'lucide-react';
import { Language } from '@/types';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface CommandMenuProps {
  lang: Language;
  onShowToast?: (msg: string) => void;
}

/**
 * Boîte de menu principale OVIZai — Navigation claire et tactile au centre de la page.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';

  const items: ListMenuItem[] = [
    {
      id: 'nav-services',
      title: isFr ? '01 // Services Publicitaires' : '01 // Advertising Services',
      subtitle: isFr ? 'Publicités courtes, films produit & marque blanche' : 'Short-form ads, product films & agency',
      href: '/services',
      icon: Film,
      trailing: '→',
    },
    {
      id: 'nav-tarifs',
      title: isFr ? '02 // Offre de Lancement (530 USD)' : '02 // Launch Offer (530 USD)',
      subtitle: isFr ? '10–15 s · Format 9:16 · 265 USD d’acompte' : '10–15 sec · 9:16 format · $265 deposit',
      href: '/tarifs',
      icon: Tag,
      trailing: '→',
    },
    {
      id: 'nav-method',
      title: isFr ? '03 // Méthode de Production' : '03 // Production Method',
      subtitle: isFr ? 'Brief → Direction visuelle → Production' : 'Brief → Creative direction → Production',
      href: '#methode',
      icon: Cpu,
      trailing: '→',
    },
    {
      id: 'nav-contact',
      title: isFr ? '04 // Démarrer un Projet' : '04 // Start a Project',
      subtitle: isFr ? 'Devis gratuit & réponse sous 24h ouvrées' : 'Free quote & response within 24 business hours',
      href: '/contact',
      icon: Mail,
      trailing: '→',
    },
  ];

  return (
    <section className="px-4 max-w-xl mx-auto my-6 sm:my-10" aria-label={isFr ? 'Accès rapide aux sections' : 'Quick navigation'}>
      <ListMenuCard items={items} />
    </section>
  );
}
