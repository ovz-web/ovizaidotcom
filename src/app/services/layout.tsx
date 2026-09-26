import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Portfolio — Studio Publicitaire OVIZai',
  description: 'Studio de création publicitaire : publicités courtes 10-15s pour restaurants, marques alimentaires et produits. Direction créative humaine et production générative.',
  keywords: ['Publicité Restaurant', 'Publicité Produit', 'Studio Publicitaire OVIZai', 'Publicité Courte 9:16', 'Direction Créative IA'],
  alternates: {
    canonical: 'https://ovizai.com/services',
    languages: {
      fr: 'https://ovizai.com/services',
      en: 'https://ovizai.com/services',
      'x-default': 'https://ovizai.com/services',
    },
  },
  openGraph: {
    title: 'Services & Portfolio — OVIZai Studio',
    description: 'Publicités courtes à forte qualité visuelle pour marques et commerces. Offre de lancement à 530 USD.',
    url: 'https://ovizai.com/services',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Portfolio — OVIZai',
    description: 'Publicités courtes et direction artistique pour marques et restaurants. Offre de lancement à 530 USD.',
  },
};

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Studio de Création Publicitaire & Production Vidéo',
  serviceType: 'Advertising & Video Production',
  provider: {
    '@type': 'Organization',
    name: 'OVIZai',
    url: 'https://ovizai.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Offres & Prestations OVIZai',
    itemListElement: [
      {
        '@type': 'Offer',
        price: '530',
        priceCurrency: 'USD',
        name: 'Offre de Lancement Publicitaire',
        description: '1 publicité courte (10-15s), format 9:16, sound design et 1 série de corrections.',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Publicités Restaurants & Marques Alimentaires',
          description: 'Mise en valeur culinaire, textures, appétence et identité de lieu.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Publicités Produits & E-commerce',
          description: 'Packshots cinématiques et publicités courtes pour réseaux sociaux.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Direction Artistique & Univers de Marque',
          description: 'Conception de brand worlds et univers visuels distinctifs.',
        },
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://ovizai.com' },
          { name: 'Prestations & Services', url: 'https://ovizai.com/services' },
        ]}
      />
      {children}
    </>
  );
}
