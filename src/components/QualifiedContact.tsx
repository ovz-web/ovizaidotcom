'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Film, Music2, Clapperboard, Palette, Globe2, GraduationCap, Clock } from 'lucide-react';
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
  { id: 'pub-brand', icon: Clapperboard, title: { fr: 'Publicité & Brand Content', en: 'Commercial & Brand Content' } },
  { id: 'clip-visualiser', icon: Music2, title: { fr: 'Clip Vidéo & Visualiser', en: 'Music Video & Visualiser' } },
  { id: 'film-series', icon: Film, title: { fr: 'Film & Série', en: 'Film & Series' } },
  { id: 'da-univers', icon: Palette, title: { fr: 'Direction Artistique', en: 'Art Direction & Branding' } },
  { id: 'web-digital', icon: Globe2, title: { fr: 'Site Web sur-mesure', en: 'Custom Website' } },
  { id: 'formation-pro', icon: GraduationCap, title: { fr: 'Formation & Masterclass', en: 'Masterclass Training' } },
];

const SERVICE_ID_MAP: Record<string, string> = {
  'pub-brand-content': 'pub-brand',
  'clips-visualisers': 'clip-visualiser',
  'films-series': 'film-series',
  'da-univers-visuels': 'da-univers',
  'web-digital': 'web-digital',
  'formation-pro': 'formation-pro',
};

const BUDGET_TIERS = [
  { id: 'tier-0', title: { fr: 'Sprint Pilote (Asset court 15-30s)', en: 'Pilot Sprint (Short asset 15-30s)' } },
  { id: 'tier-1', title: { fr: 'Direction Artistique & Pack Visuels', en: 'Art Direction & Key Visuals' } },
  { id: 'tier-2', title: { fr: 'Campagne / Clip Vidéo / Site Web', en: 'Brand Campaign / Music Video / Web' } },
  { id: 'tier-3', title: { fr: 'Production Majeure (Film / Série)', en: 'Scale Production (Film / Series)' } },
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

  const [selectedProject, setSelectedProject] = useState<string>('pub-brand');
  const [selectedBudget, setSelectedBudget] = useState<string>('tier-2');
  const [originPlan, setOriginPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialServiceId) {
      setOriginPlan(initialServiceId);
    }

    if (initialType && PROJECT_TYPES.some(p => p.id === initialType)) {
      setSelectedProject(initialType);
    } else if (initialServiceId && SERVICE_ID_MAP[initialServiceId]) {
      setSelectedProject(SERVICE_ID_MAP[initialServiceId]);
    }

    if (initialBudget && BUDGET_TIERS.some(b => b.id === initialBudget)) {
      setSelectedBudget(initialBudget);
    }
  }, [initialServiceId, initialType, initialBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(isFr ? 'Adresse e-mail invalide' : 'Invalid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const projectObj = PROJECT_TYPES.find(p => p.id === selectedProject);
    const budgetObj = BUDGET_TIERS.find(b => b.id === selectedBudget);
    const formattedBudget = budgetObj ? budgetObj.title[lang] : selectedBudget;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          projectType: projectObj ? projectObj.title[lang] : selectedProject,
          budgetRange: formattedBudget,
          currency: activeCurrency,
          message: brief || undefined,
          company: company || undefined,
          website: website || undefined,
          originPlan: originPlan || undefined,
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
          ? 'Une erreur est survenue lors de l\'envoi\nVeuillez réessayer'
          : 'An error occurred while submitting\nPlease try again'
      );
    }
  };

  return (
    <section id="contact" className="max-w-xl mx-auto mb-8 px-4">
      {/* Card Wrapper */}
      <div className="border border-border bg-card/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl">
        <div className="text-center mb-6">
          {/* 3-Step Indicator Bar */}
          <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-gold bg-gold/10 border border-gold/20 py-1 px-3 rounded-full max-w-md mx-auto mb-4">
            <span>{isFr ? '1 // Projet' : '1 // Project'}</span>
            <span className="text-muted">•</span>
            <span>{isFr ? '2 // Budget' : '2 // Budget'}</span>
            <span className="text-muted">•</span>
            <span>{isFr ? '3 // Coordonnées' : '3 // Contact'}</span>
          </div>
        </div>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="ovizai-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center space-y-4"
          >
            <CheckCircle2 className="w-12 h-12 text-gold mx-auto animate-pulse" />
            <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg tracking-wide">
              {isFr ? 'BRIEF TRANSMIS AVEC SUCCÈS' : 'BRIEF SUBMITTED SUCCESSFULLY'}
            </h3>
            
            <div className="bg-black/60 border border-border p-4 sm:p-5 rounded-xl text-left max-w-md mx-auto space-y-2 font-mono">
              <p className="text-xs font-semibold text-gold uppercase flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span>{isFr ? 'Engagement Réponse (SLA OVIZai) :' : 'Response Commitment (OVIZai SLA):'}</span>
              </p>
              <div className="text-xs text-fg leading-relaxed font-sans space-y-1">
                {isFr ? (
                  <>
                    <p>Merci pour votre confiance</p>
                    <p>Notre équipe artistique examine votre brief avec attention</p>
                    <p>Proposition d’orientation et devis personnalisé sous 24h à 48h ouvrées</p>
                  </>
                ) : (
                  <>
                    <p>Thank you for your trust</p>
                    <p>Our art direction team is reviewing your brief carefully</p>
                    <p>Tailored proposal and custom quote delivered within 24 to 48 business hours</p>
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="hidden"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
            />
            {/* Step: Project Type Cards */}
            <fieldset>
              <legend className="mono text-xs uppercase tracking-wider font-semibold text-fg block mb-3">
                {isFr ? 'Quel type de projet souhaitez-vous réaliser ?' : 'What type of project do you want to create?'}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROJECT_TYPES.map(pt => {
                  const Icon = pt.icon;
                  const isSelected = selectedProject === pt.id;

                  return (
                    <button
                      key={pt.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedProject(pt.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                        isSelected
                          ? 'border-gold bg-gold/10 text-fg'
                          : 'border-border bg-black/40 text-muted hover:border-white/[0.2] hover:text-fg'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-gold' : 'text-muted'}`} />
                      <span className="mono text-xs font-semibold">{pt.title[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step: Dynamic Budget Cards */}
            <fieldset>
              <legend className="mono text-xs uppercase tracking-wider font-semibold text-fg block mb-3">
                {isFr ? 'Quelle est votre enveloppe budgétaire estimée ?' : 'What is your estimated budget tier?'}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUDGET_TIERS.map(tier => {
                  const isSelected = selectedBudget === tier.id;

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedBudget(tier.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] flex items-center ${
                        isSelected
                          ? 'border-gold bg-gold/10 text-fg'
                          : 'border-border bg-black/40 text-muted hover:border-white/[0.2] hover:text-fg'
                      }`}
                    >
                      <span className="mono text-xs font-semibold block">{tier.title[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step: Contact Inputs */}
            <div className="space-y-3 pt-2">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className="hidden absolute opacity-0 pointer-events-none"
              />
              <legend className="mono text-xs uppercase tracking-wider font-semibold text-fg block mb-1">
                {isFr ? 'Vos coordonnées pour recevoir notre proposition :' : 'Your details to receive our proposal:'}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="mono text-[11px] text-muted uppercase block mb-1">
                    {isFr ? 'Nom / Organisation (facultatif) :' : 'Name / Company (optional):'}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={isFr ? 'ex: Jean Dupont (Studio X)' : 'e.g. Sarah Jenkins (Studio X)'}
                    className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-fg focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mono text-[11px] text-muted uppercase block mb-1">
                    {isFr ? 'Adresse E-mail * :' : 'Email Address *:'}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@domaine.com"
                    className="w-full min-h-[44px] bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-fg focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mono text-[11px] text-muted uppercase block mb-1">
                  {isFr ? 'Détails du projet (facultatif) :' : 'Project details (optional):'}
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  placeholder={isFr ? 'Objectifs visuels, références, délais souhaités (facultatif)' : 'Visual goals, references, timelines (optional)'}
                  className="w-full bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-fg focus:border-gold outline-none transition-colors"
                />
              </div>
            </div>

            {errorMsg && (
              <p
                role="alert"
                aria-live="polite"
                className="text-xs text-red-400 font-mono text-center"
              >
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full min-h-[48px] bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold py-3 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold cursor-pointer"
            >
              <span>
                {status === 'loading'
                  ? (isFr ? 'Envoi en cours…' : 'Sending…')
                  : (isFr ? 'Envoyer mon Brief Qualifié +' : 'Submit Qualified Brief +')}
              </span>
              <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
