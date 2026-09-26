'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Film, Music2, Clapperboard, Palette, Globe2, Building2, GraduationCap, Clock, Sparkles, Loader2, HelpCircle } from 'lucide-react';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';
import { Language, Currency } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { trackEvent } from '@/lib/analytics';

interface QualifiedContactProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
  initialServiceId?: string | null;
  initialType?: string | null;
  initialBudget?: string | null;
}

const PROJECT_TYPES = [
  { id: 'pub-restaurants', icon: Clapperboard, title: { fr: 'Publicité Restaurant / Marque Alimentaire', en: 'Restaurant / Food Brand Ad' } },
  { id: 'pub-produits', icon: Film, title: { fr: 'Publicité Produit & E-commerce', en: 'Product & E-commerce Ad' } },
  { id: 'da-univers', icon: Palette, title: { fr: 'Direction Artistique & Univers de Marque', en: 'Art Direction & Brand Worlds' } },
  { id: 'agence-whitelabel', icon: Building2, title: { fr: 'Partenariat Agences (Marque Blanche)', en: 'Agency Partner (White-Label)' } },
  { id: 'clips-surmesure', icon: Music2, title: { fr: 'Clips Vidéos & Projets Sur-Mesure', en: 'Music Video & Custom Projects' } },
  { id: 'formation-pro', icon: GraduationCap, title: { fr: 'Formation & Masterclass Vidéo IA', en: 'AI Video Masterclass Pro' } },
];

const SERVICE_ID_MAP: Record<string, string> = {
  'pub-restaurants': 'pub-restaurants',
  'pub-produits': 'pub-produits',
  'pub-brand-content': 'pub-restaurants',
  'pub-brand': 'pub-restaurants',
  'direction-artistique': 'da-univers',
  'da-univers': 'da-univers',
  'partenariat-agences': 'agence-whitelabel',
  'agence-whitelabel': 'agence-whitelabel',
  'clips-sur-mesure': 'clips-surmesure',
  'clips-visualisers': 'clips-surmesure',
  'clip-visualiser': 'clips-surmesure',
  'formation-pro': 'formation-pro',
  'launch': 'pub-restaurants',
  'sprint': 'pub-restaurants',
  'custom': 'pub-restaurants',
};

const BUDGET_TIERS = [
  { id: 'launch-530', title: { fr: 'Offre de Lancement (530 $ USD · Acompte 265 $)', en: 'Launch Offer ($530 USD · $265 Deposit)' } },
  { id: 'sur-devis', title: { fr: 'Projet Sur Devis (Formats complexes / Multi-formats)', en: 'Custom Quote (Scale / Multi-formats)' } },
  { id: 'agence', title: { fr: 'Partenariat Agence (Marque Blanche)', en: 'Agency Partner (White-Label)' } },
  { id: 'masterclass', title: { fr: 'Formation Vidéo IA (320 $ USD)', en: 'AI Video Masterclass ($320 USD)' } },
];

export default function QualifiedContact({
  lang,
  currency: propCurrency,
  onSelectCurrency,
  initialServiceId,
  initialType,
  initialBudget,
}: QualifiedContactProps) {
  const isFr = lang === 'fr';
  const { currency: ctxCurrency } = useCurrency();
  const activeCurrency = propCurrency || ctxCurrency;

  const [selectedProject, setSelectedProject] = useState<string>('pub-restaurants');
  const [selectedBudget, setSelectedBudget] = useState<string>('launch-530');
  const [originPlan, setOriginPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [botHp, setBotHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Closed by default; multi-open accordion: opening a new step keeps previous steps OPEN
  const [openSections, setOpenSections] = useState<string[]>(['step-project']);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const ensureOpen = (id: string) => {
    setOpenSections((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  useEffect(() => {
    if (initialServiceId) {
      setOriginPlan(initialServiceId);
    }

    if (initialType && PROJECT_TYPES.some((p) => p.id === initialType)) {
      setSelectedProject(initialType);
    } else if (initialServiceId && SERVICE_ID_MAP[initialServiceId]) {
      setSelectedProject(SERVICE_ID_MAP[initialServiceId]);
    }

    if (initialBudget && BUDGET_TIERS.some((b) => b.id === initialBudget)) {
      setSelectedBudget(initialBudget);
    } else if (initialBudget === 'tier-launch' || initialServiceId === 'launch') {
      setSelectedBudget('launch-530');
    }
  }, [initialServiceId, initialType, initialBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(isFr ? 'Adresse e-mail valide requise' : 'Valid email address required');
      setStatus('error');
      ensureOpen('step-contact');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const projectObj = PROJECT_TYPES.find((p) => p.id === selectedProject);
    const budgetObj = BUDGET_TIERS.find((b) => b.id === selectedBudget);
    const formattedBudget = budgetObj ? budgetObj.title[lang] : selectedBudget;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          company: company || undefined,
          website: website || undefined,
          projectType: projectObj ? projectObj.title[lang] : selectedProject,
          budgetRange: formattedBudget,
          currency: activeCurrency,
          message: brief || undefined,
          sourcePlan: originPlan || undefined,
          originPlan: originPlan || undefined,
          bot_hp: botHp || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      trackEvent('cta_submit_brief', {
        projectType: projectObj ? projectObj.id : selectedProject,
        budgetRange: selectedBudget,
        currency: activeCurrency,
      });

      setStatus('success');
      setEmail('');
      setName('');
      setBrief('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        isFr
          ? 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
          : 'An error occurred while submitting. Please try again.'
      );
    }
  };

  const projectObj = PROJECT_TYPES.find((p) => p.id === selectedProject);
  const budgetObj = BUDGET_TIERS.find((b) => b.id === selectedBudget);

  const isStep1Open = openSections.includes('step-project');
  const isStep2Open = openSections.includes('step-budget');
  const isStep3Open = openSections.includes('step-contact');

  if (status === 'success') {
    return (
      <section id="contact" className="max-w-xl mx-auto mb-1.5 sm:mb-2 px-4">
        <div
          role="status"
          aria-live="polite"
          className="ovizai-card p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto text-gold">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-fg">
              {isFr ? 'Demande de projet transmise' : 'Project inquiry submitted'}
            </h3>
            <p className="text-xs text-muted mt-1 font-mono">
              {isFr
                ? 'Un e-mail de confirmation a été envoyé à '
                : 'A confirmation email has been sent to '}
              <span className="text-gold font-semibold">{email}</span>
            </p>
          </div>

          <div className="bg-black/60 border border-border p-4 sm:p-5 rounded-xl text-left max-w-md mx-auto space-y-2 font-mono">
            <p className="text-xs font-semibold text-gold uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>{isFr ? 'Engagement Réponse (SLA OVIZai) :' : 'Response Commitment (OVIZai SLA):'}</span>
            </p>
            <div className="text-xs text-fg leading-relaxed font-sans space-y-1">
              {isFr ? (
                <>
                  <p>Merci pour votre confiance.</p>
                  <p>Notre équipe artistique examine votre brief avec attention.</p>
                  <p>Proposition d’orientation et devis personnalisé sous 24h à 48h ouvrées.</p>
                </>
              ) : (
                <>
                  <p>Thank you for your trust.</p>
                  <p>Our art direction team is reviewing your brief carefully.</p>
                  <p>Tailored proposal and custom quote delivered within 24 to 48 business hours.</p>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 text-xs text-gold hover:text-gold-bright underline font-mono cursor-pointer transition-colors"
          >
            {isFr ? 'Envoyer une autre demande' : 'Submit another inquiry'}
          </button>
        </div>
      </section>
    );
  }

  const contactItems: ListMenuItem[] = [
    {
      id: 'step-project',
      icon: Clapperboard,
      title: isFr ? '01 // Type de Projet' : '01 // Project Type',
      subtitle: projectObj
        ? projectObj.title[lang]
        : (isFr ? 'Format & intention de production' : 'Format & production intent'),
      trailing: isStep1Open ? '↑' : '↓',
      onClick: () => toggleSection('step-project'),
      expanded: isStep1Open,
      expandedContent: (
        <div>
          <p className="mono text-[10.5px] text-gold font-bold uppercase tracking-wider mb-2.5">
            {isFr ? 'Sélectionnez le format souhaité :' : 'Select your desired format:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECT_TYPES.map((pt) => {
              const Icon = pt.icon;
              const isSelected = selectedProject === pt.id;

              return (
                <button
                  key={pt.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedProject(pt.id);
                    ensureOpen('step-budget');
                  }}
                  className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'border-gold bg-gold/15 text-fg font-bold'
                      : 'border-white/[0.08] bg-black/40 text-muted hover:border-white/[0.2] hover:text-fg'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-gold' : 'text-muted'}`} />
                  <span className="mono text-xs">{pt.title[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'step-budget',
      icon: Clock,
      title: isFr ? '02 // Enveloppe Budgétaire' : '02 // Budget Tier',
      subtitle: budgetObj
        ? budgetObj.title[lang]
        : (isFr ? 'Enveloppe estimée pour votre projet' : 'Estimated budget tier'),
      trailing: isStep2Open ? '↑' : '↓',
      onClick: () => toggleSection('step-budget'),
      expanded: isStep2Open,
      expandedContent: (
        <div>
          <p className="mono text-[10.5px] text-gold font-bold uppercase tracking-wider mb-2.5">
            {isFr ? 'Sélectionnez votre palier budgétaire :' : 'Select your budget tier:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BUDGET_TIERS.map((tier) => {
              const isSelected = selectedBudget === tier.id;

              return (
                <button
                  key={tier.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedBudget(tier.id);
                    ensureOpen('step-contact');
                  }}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] flex items-center ${
                    isSelected
                      ? 'border-gold bg-gold/15 text-fg font-bold'
                      : 'border-white/[0.08] bg-black/40 text-muted hover:border-white/[0.2] hover:text-fg'
                  }`}
                >
                  <span className="mono text-xs block">{tier.title[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'step-contact',
      icon: Send,
      title: isFr ? '03 // Coordonnées & Envoi du Brief' : '03 // Contact Details & Submit',
      subtitle: email
        ? `${name ? `${name} · ` : ''}${email}`
        : (isFr ? 'Nom, marque, e-mail & détails de votre projet' : 'Name, brand, email & project notes'),
      trailing: isStep3Open ? '↑' : '↓',
      onClick: () => toggleSection('step-contact'),
      expanded: isStep3Open,
      expandedContent: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="contact-name" className="mono text-[11px] text-muted uppercase block mb-1">
                {isFr ? 'Votre Nom (facultatif) :' : 'Your Name (optional):'}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isFr ? 'ex: Jean Dupont' : 'e.g. Sarah Jenkins'}
                className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-base sm:text-xs text-fg focus:border-gold outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="mono text-[11px] text-muted uppercase block mb-1">
                {isFr ? 'Entreprise / Marque / Établissement :' : 'Company / Brand / Venue:'}
              </label>
              <input
                id="contact-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={isFr ? 'ex: Le Bistro Gourmand / Maison X' : 'e.g. Atelier Gourmet / Brand X'}
                className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-base sm:text-xs text-fg focus:border-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="contact-email" className="mono text-[11px] text-muted uppercase block mb-1">
                {isFr ? 'Adresse E-mail * :' : 'Email Address *:'}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@domaine.com"
                className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-base sm:text-xs text-fg focus:border-gold outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-website" className="mono text-[11px] text-muted uppercase block mb-1">
                {isFr ? 'Site web / Instagram / Références :' : 'Website / Instagram / Links:'}
              </label>
              <input
                id="contact-website"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://... ou @instagram"
                className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-base sm:text-xs text-fg focus:border-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="mono text-[11px] text-muted uppercase block mb-1">
              {isFr ? 'Courte description du projet :' : 'Short project description:'}
            </label>
            <textarea
              id="contact-message"
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder={isFr ? 'Produit à mettre en valeur, atmosphère souhaitée, attentes particulières' : 'Product to feature, desired mood, specific requirements'}
              className="w-full bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-base sm:text-xs text-fg focus:border-gold outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <p
              role="alert"
              aria-live="polite"
              className="text-xs text-red-400 font-mono text-center pt-1"
            >
              {errorMsg}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full min-h-[48px] bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold py-3 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                  <span>{isFr ? 'Transmission en cours…' : 'Submitting…'}</span>
                </>
              ) : (
                <>
                  <span>{isFr ? 'Transmettre mon Brief au Studio →' : 'Submit Brief to Studio →'}</span>
                  <Send className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="contact" className="max-w-xl mx-auto mb-1.5 sm:mb-2 px-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bot_hp"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={botHp}
          onChange={(e) => setBotHp(e.target.value)}
          className="hidden"
          style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        />

        <ListMenuCard items={contactItems} />
      </form>
    </section>
  );
}
