import React from 'react';
import type { Metadata } from 'next';
import CgvClient from './CgvClient';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — OVIZai',
  description: 'Conditions Générales de Vente (CGV) des prestations et de la Masterclass OVIZai',
  alternates: {
    canonical: 'https://ovizai.com/cgv',
    languages: {
      fr: 'https://ovizai.com/cgv',
      en: 'https://ovizai.com/cgv',
      'x-default': 'https://ovizai.com/cgv',
    },
  },
};

export default function CGVPage() {
  return <CgvClient />;
}
