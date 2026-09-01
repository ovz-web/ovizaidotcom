import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, Syne, Archivo_Black } from 'next/font/google';
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
  keywords: ['AI Video', 'Direction Artistique IA', 'Cinéma Génératif', 'Runway Gen-3', 'Midjourney v6', 'Kling AI', 'OVIZai'],
  authors: [{ name: 'OVIZai' }],
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
      <body className="antialiased bg-bg text-fg selection:bg-gold/25 selection:text-gold-bright">
        <CurrencyProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
