import React from 'react';
import type { Metadata } from 'next';
import ConfidentialiteClient from './ConfidentialiteClient';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — OVIZai',
  description: 'Politique de protection des données personnelles et d’utilisation des cookies sur OVIZai',
  alternates: {
    canonical: 'https://ovizai.com/confidentialite',
    languages: {
      fr: 'https://ovizai.com/confidentialite',
      en: 'https://ovizai.com/confidentialite',
      'x-default': 'https://ovizai.com/confidentialite',
    },
  },
};

export default function ConfidentialitePage() {
  return <ConfidentialiteClient />;
}

