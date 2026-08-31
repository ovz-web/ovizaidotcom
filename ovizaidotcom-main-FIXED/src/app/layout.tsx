import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, Syne, Archivo_Black } from 'next/font/google';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LanguageProvider } from '@/context/LanguageContext';

// Self-hosted via next/font: removes the render-blocking @import round-trip
// to Google Fonts and eliminates CLS by injecting matched font metrics.
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
  title: 'OVIZai — AI Art Direction & Cinematography Studio',
  description: 'Direction artistique IA, films publicitaires narratifs, clips musicaux et pipelines vidéo haute fidélité.',
  keywords: ['AI Video', 'Direction Artistique IA', 'Cinéma Génératif', 'Runway Gen-3', 'Midjourney v6', 'Kling AI', 'OVIZai'],
  authors: [{ name: 'OVIZai' }],
  openGraph: {
    title: 'OVIZai — AI Art Direction & Cinematography',
    description: 'Cinematic AI video for visionaries, brands and artists. No templates, no noise.',
    url: 'https://ovizai.com',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVIZai — AI Video',
    description: 'Algorithmic Art Meets Narrative Cinema.',
  },
  icons: {
    icon: '/favicon.ico',
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
