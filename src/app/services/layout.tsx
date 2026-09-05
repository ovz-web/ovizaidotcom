import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prestations & Services — Production Vidéo IA Cinématographique | OVIZai',
  description: 'Films publicitaires IA, clips musicaux, direction artistique et univers visuels cinématographiques haute fidélité. Livraison 48h à 5 jours.',
  keywords: ['Production Vidéo IA', 'Films Publicitaires IA', 'Direction Artistique IA', 'Clips Musicaux IA', 'OVIZai Services'],
  alternates: {
    canonical: 'https://ovizai.com/services',
    languages: {
      fr: 'https://ovizai.com/services',
      en: 'https://ovizai.com/services',
      'x-default': 'https://ovizai.com/services',
    },
  },
  openGraph: {
    title: 'Prestations & Services — OVIZai AI Video Studio',
    description: 'Films IA cinématographiques 4K pour marques et artistes. Direction artistique, clips, publicités et univers visuels.',
    url: 'https://ovizai.com/services',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Production Vidéo IA — OVIZai',
    description: 'Films, clips, publicités IA cinématographiques 4K. Livraison sous 48h à 5 jours.',
  },
};

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Production Vidéo IA Cinématographique & Direction Artistique',
  serviceType: 'AI Video Production',
  provider: {
    '@type': 'Organization',
    name: 'OVIZai',
    url: 'https://ovizai.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations Vidéo IA',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Publicités & Brand Content IA',
          description: 'Films publicitaires et campagnes de marque haute fidélité.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clips Musicaux & Visualisers',
          description: 'Clips vidéos immersifs, visualisers narratifs pour artistes.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Direction Artistique & Univers Visuels',
          description: 'Conception de brand worlds et univers cinématographiques uniques.',
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
