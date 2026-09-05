import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, Syne, Archivo_Black } from 'next/font/google';
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

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo-black',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ovizai.com'),
  title: 'OVIZai — AI Art Direction & Cinematography Studio',
  description: 'Direction artistique IA, films publicitaires narratifs, clips musicaux et pipelines vidéo haute fidélité.',
  keywords: ['AI Video', 'Direction Artistique IA', 'Cinéma Génératif', 'Production Vidéo IA', 'Animation Virtuelle', 'Post-Production 4K', 'OVIZai'],
  authors: [{ name: 'OVIZai' }],
  alternates: {
    canonical: 'https://ovizai.com',
    languages: {
      fr: 'https://ovizai.com',
      en: 'https://ovizai.com',
      'x-default': 'https://ovizai.com',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'OVIZai — AI Art Direction & Cinematography',
    description: 'Cinematic AI video for visionaries, brands and artists. No templates, no noise.',
    url: 'https://ovizai.com',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OVIZai — AI Art Direction & Cinematography Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVIZai — AI Video',
    description: 'Algorithmic Art Meets Narrative Cinema.',
    images: ['/og-image.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OVIZai',
  url: 'https://ovizai.com',
  logo: 'https://ovizai.com/logo.png',
  description: 'Studio de production vidéo et direction artistique IA cinématographique.',
  sameAs: [
    'https://youtube.com/@ovizaidotcom',
    'https://instagram.com/ovizai.co',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://ovizai.com/contact',
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
      className={`dark ${inter.variable} ${plexMono.variable} ${syne.variable} ${archivoBlack.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="fr" href="https://ovizai.com" />
        <link rel="alternate" hrefLang="en" href="https://ovizai.com" />
        <link rel="alternate" hrefLang="x-default" href="https://ovizai.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg text-fg selection:bg-gold/25 selection:text-gold-bright">
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
