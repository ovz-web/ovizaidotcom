import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ovizai.com'),
  title: {
    default: 'OVIZai — Studio de Publicité Vidéo pour Marques',
    template: '%s | OVIZai',
  },
  description: 'OVIZai conçoit des publicités courtes pour marques, produits et établissements — de l’idée au film final.',
  keywords: [
    'Publicité Vidéo',
    'Short-form Ads',
    'Studio Créatif Publicitaire',
    'Production Vidéo Marques',
    'Films Produits',
    'OVIZai',
  ],
  authors: [{ name: 'OVIZai' }],
  alternates: {
    canonical: 'https://www.ovizai.com',
    languages: {
      fr: 'https://www.ovizai.com',
      en: 'https://www.ovizai.com',
      'x-default': 'https://www.ovizai.com',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'OVIZai — Studio de Publicité Vidéo pour Marques',
    description: 'OVIZai conçoit des publicités courtes pour marques, produits et établissements — de l’idée au film final.',
    url: 'https://www.ovizai.com',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OVIZai — Studio Créatif Publicitaire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVIZai — Creative Video Ads for Brands',
    description: 'From impossible ideas to real commercial ads. Short-form video for brands and venues.',
    images: ['/og-image.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OVIZai',
  url: 'https://www.ovizai.com',
  logo: 'https://www.ovizai.com/logo.png',
  description: 'Studio de création publicitaire : publicités courtes, films produit et production en marque blanche.',
  sameAs: [
    'https://instagram.com/ovizai.co',
    'https://youtube.com/@ovizaidotcom',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: 'https://www.ovizai.com/contact',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${syne.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="fr" href="https://www.ovizai.com" />
        <link rel="alternate" hrefLang="en" href="https://www.ovizai.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ovizai.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg text-fg selection:bg-gold/25 selection:text-gold-bright min-h-[100dvh]">
        {/* WCAG 2.2 AA Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-gold focus:text-black focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none"
        >
          Aller au contenu principal / Skip to content
        </a>
        <CurrencyProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </CurrencyProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
