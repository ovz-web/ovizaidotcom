import type { Metadata } from 'next';
import TarifsClient from './TarifsClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Tarifs — Offre de Lancement 530 USD | OVIZai',
  description: 'Offre de lancement : 1 publicité courte (10-15s), format 9:16, sound design et 1 série de corrections pour 530 USD. Projets complexes sur devis.',
  keywords: ['Offre de Lancement Vidéo', 'Tarifs OVIZai', 'Publicité Courte 9:16', 'Prix Publicité Vidéo', 'Studio Créatif OVIZai'],
  alternates: {
    canonical: 'https://www.ovizai.com/tarifs',
    languages: {
      fr: 'https://www.ovizai.com/tarifs',
      en: 'https://www.ovizai.com/tarifs',
      'x-default': 'https://www.ovizai.com/tarifs',
    },
  },
  openGraph: {
    title: 'Tarifs — Offre de Lancement 530 USD | OVIZai',
    description: 'Offre de lancement à 530 USD : 1 publicité courte (10-15s), format 9:16, sound design et première version visée sous 5 jours ouvrables.',
    url: 'https://www.ovizai.com/tarifs',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs — Offre de Lancement 530 USD | OVIZai',
    description: 'Offre de lancement publicitaire court à 530 USD. Projets plus complexes sur devis.',
  },
};

export default function TarifsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://www.ovizai.com' },
          { name: 'Tarifs', url: 'https://www.ovizai.com/tarifs' },
        ]}
      />
      <TarifsClient />
    </>
  );
}
