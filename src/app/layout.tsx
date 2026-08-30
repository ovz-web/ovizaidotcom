import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OVIZai — AI Art Direction & Cinematography Studio',
  description: 'Studio de direction artistique IA, films publicitaires narratifs, clips musicaux et pipelines vidéo haute fidélité.',
  keywords: ['AI Video Studio', 'Direction Artistique IA', 'Cinéma Génératif', 'Runway Gen-3', 'Midjourney v6', 'Kling AI', 'OVIZai'],
  authors: [{ name: 'OVIZai Studio' }],
  openGraph: {
    title: 'OVIZai — AI Art Direction & Cinematography Studio',
    description: 'Cinematic AI video for visionaries, brands and artists. No templates, no noise.',
    url: 'https://ovizaidotcom.vercel.app',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVIZai — AI Video Studio',
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
    <html lang="fr" className="dark">
      <body className="antialiased bg-bg text-fg selection:bg-gold/25 selection:text-gold-bright">
        {children}
      </body>
    </html>
  );
}
