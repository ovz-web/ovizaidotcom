import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Méthode — OVIZai Studio',
  description: 'De votre brief au film finalisé en trois étapes.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.ovizai.com/services',
  },
};

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
