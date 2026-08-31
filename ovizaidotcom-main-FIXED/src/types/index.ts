export type Language = 'fr' | 'en';
export type Currency = 'USD' | 'EUR' | 'CAD';

// Flat i18n dictionary shape consumed via DICTIONARY[lang].key.
// Every key here must exist in BOTH the `fr` and `en` entries of
// DICTIONARY (src/lib/i18n.ts) or `tsc --noEmit` will fail the build.
export interface Dictionary {
  status: string;
  eyebrow: string;
  heroTitle: string;
  heroTagline: string;
  heroSub: string;
  searchPlaceholder: string;
  searchTrigger: string;
  commandsTitle: string;
  freePromptsTitle: string;
  freePromptsDesc: string;
  emailPlaceholder: string;
  joinBtn: string;
  submitting: string;
  subscribedMsg: string;
  alreadySubscribedMsg: string;
  errorMsg: string;
  followLabel: string;
  pressCmd: string;
  pressEsc: string;
  toastContact: string;
  toastResources: string;
  toastCopied: string;
  rights: string;
  privacy: string;
  terms: string;
  pipelineTitle: string;
  pipelineSub: string;
}

export interface CommandItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  sub: {
    fr: string;
    en: string;
  };
  key: string;
  action: {
    fr: string;
    en: string;
  };
  icon: 'video' | 'art' | 'workflow' | 'contact';
  type: 'contact' | 'scroll' | 'link';
  target?: string;
  mailtoSubject?: string;
}

export interface PipelineTool {
  id: string;
  name: string;
  category: string;
  version: string;
  desc: {
    fr: string;
    en: string;
  };
  badge: string;
  features: {
    fr: string[];
    en: string[];
  };
}

export interface LeadSubmission {
  email: string;
}
