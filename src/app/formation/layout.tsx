import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OVIZai METHOD — Guide de Production',
  description: 'La méthode de production publicitaire OVIZai.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.ovizai.com/formation',
  },
};

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
