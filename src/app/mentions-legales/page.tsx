import React from 'react';
import type { Metadata } from 'next';
import MentionsLegalesClient from './MentionsLegalesClient';

export const metadata: Metadata = {
  title: 'Mentions Légales — OVIZai',
  description: 'Informations légales et éditoriales du site OVIZai Studio',
  alternates: {
    canonical: 'https://ovizai.com/mentions-legales',
    languages: {
      fr: 'https://ovizai.com/mentions-legales',
      en: 'https://ovizai.com/mentions-legales',
      'x-default': 'https://ovizai.com/mentions-legales',
    },
  },
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesClient />;
}

