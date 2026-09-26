import type { Metadata } from 'next';
import TarifsClient from './TarifsClient';

export const metadata: Metadata = {
  title: 'Offre de Lancement & Tarifs — Publicités Courtes | OVIZai',
  description: 'Offre de lancement publicitaire court à 530 USD : 1 publicité 10-15s, concept créatif, format 9:16, sound design et 1 série de corrections. Projets sur-mesure sur devis.',
  keywords: ['Offre de Lancement Vidéo', 'Tarifs OVIZai', 'Publicité Courte 9:16', 'Prix Publicité IA', 'Studio Créatif OVIZai'],
  alternates: {
    canonical: 'https://ovizai.com/tarifs',
    languages: {
      fr: 'https://ovizai.com/tarifs',
      en: 'https://ovizai.com/tarifs',
      'x-default': 'https://ovizai.com/tarifs',
    },
  },
  openGraph: {
    title: 'Offre de Lancement & Tarifs — OVIZai Studio',
    description: 'Offre de lancement à 530 USD : 1 publicité courte (10-15s), format 9:16, sound design et première version sous 5 jours ouvrables.',
    url: 'https://ovizai.com/tarifs',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offre de Lancement & Tarifs — OVIZai',
    description: 'Offre de lancement publicitaire court à 530 USD. Projets plus complexes sur devis.',
  },
};

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export default function TarifsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://ovizai.com' },
          { name: 'Tarifs & Formules', url: 'https://ovizai.com/tarifs' },
        ]}
      />
      <TarifsClient />
    </>
  );
}
