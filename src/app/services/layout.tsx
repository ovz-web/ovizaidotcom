import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Services — Studio de Publicité Vidéo OVIZai',
  description: 'Trois formats vidéo essentiels : publicités courtes (Reels, TikTok, Shorts), films produit cinématiques et production externalisée en marque blanche pour agences.',
  keywords: ['Publicités courtes', 'Short-form Ads', 'Films Produits', 'Production Marque Blanche', 'Studio Publicitaire OVIZai'],
  alternates: {
    canonical: 'https://www.ovizai.com/services',
    languages: {
      fr: 'https://www.ovizai.com/services',
      en: 'https://www.ovizai.com/services',
      'x-default': 'https://www.ovizai.com/services',
    },
  },
  openGraph: {
    title: 'Services — Studio de Publicité Vidéo OVIZai',
    description: 'Trois formats vidéo essentiels : publicités courtes (Reels, TikTok, Shorts), films produit cinématiques et production externalisée en marque blanche pour agences.',
    url: 'https://www.ovizai.com/services',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — OVIZai Creative Ad Studio',
    description: 'Short-form ads, product films and white-label agency production.',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Studio de Création Publicitaire & Production Vidéo',
  serviceType: 'Advertising & Video Production',
  provider: {
    '@type': 'Organization',
    name: 'OVIZai',
    url: 'https://www.ovizai.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations OVIZai',
    itemListElement: [
      {
        '@type': 'Offer',
        price: '530',
        priceCurrency: 'USD',
        name: 'Offre de Lancement',
        description: '1 publicité courte (10-15s), format 9:16, sound design et 1 série de corrections.',
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
          { name: 'Accueil', url: 'https://www.ovizai.com' },
          { name: 'Services', url: 'https://www.ovizai.com/services' },
        ]}
      />
      {children}
    </>
  );
}
