'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '@/types';

interface QualifiedContactProps {
  lang: Language;
}

export default function QualifiedContact({ lang }: QualifiedContactProps) {
  const isFr = lang === 'fr';
  const searchParams = useSearchParams();
  const initialOffer = searchParams.get('offer') || 'launch';

  // Core essential fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [promotionTarget, setPromotionTarget] = useState('');
  const [offerType, setOfferType] = useState(initialOffer);

  // Progressive disclosure optional details
  const [showDetails, setShowDetails] = useState(false);
  const [links, setLinks] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  // Honeypot anti-spam
  const [botHp, setBotHp] = useState('');

  // Submission state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !promotionTarget) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          company: company.trim() || undefined,
          promotionTarget: promotionTarget.trim(),
          projectType: offerType === 'launch' ? 'Offre de Lancement (530 USD)' : 'Projet Sur-Mesure',
          budgetRange: offerType === 'launch' ? '530 USD' : 'Sur devis',
          currency: 'USD',
          links: links.trim() || undefined,
          deadline: deadline.trim() || undefined,
          message: notes.trim() || undefined,
          bot_hp: botHp,
          source: 'project_inquiry',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(
          data.error ||
            (isFr
              ? 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou écrire à contact@ovizai.com'
              : 'An error occurred. Please try again or write to contact@ovizai.com')
        );
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        isFr
          ? 'Connexion interrompue. Veuillez vérifier votre réseau ou écrire à contact@ovizai.com'
          : 'Network error. Please check your connection or contact contact@ovizai.com directly'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#11100e] border border-gold/40 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto text-gold mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-fg uppercase mb-3">
          {isFr ? 'Brief reçu' : 'Brief received'}
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-md mx-auto leading-relaxed mb-6 font-sans">
          {isFr
            ? 'Nous revenons vers vous avec la prochaine étape'
            : 'We will review your project and get back to you with the next step'}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setPromotionTarget('');
            setNotes('');
          }}
          className="text-xs mono uppercase text-gold hover:underline"
        >
          {isFr ? 'Envoyer un autre message →' : 'Send another project brief →'}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#11100e] border border-white/[0.08] rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-xl"
      noValidate
    >
      {/* Honeypot for bots (strictly hidden from genuine users) */}
      <input
        type="text"
        name="bot_hp"
        value={botHp}
        onChange={(e) => setBotHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {/* Offer selector badge */}
        <div>
          <label className="mono text-xs uppercase tracking-wider text-muted block mb-2 font-semibold">
            {isFr ? 'Format envisagé :' : 'Intended format:'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOfferType('launch')}
              className={`p-3 rounded-xl border text-left text-xs sm:text-sm mono transition-all ${
                offerType === 'launch'
                  ? 'border-gold bg-gold/10 text-gold-bright font-bold'
                  : 'border-white/[0.08] bg-black/40 text-muted hover:text-fg'
              }`}
            >
              <div className="font-bold">{isFr ? 'Offre de Lancement' : 'Launch Offer'}</div>
              <div className="text-[11px] opacity-80">530 USD · 10–15s (9:16)</div>
            </button>

            <button
              type="button"
              onClick={() => setOfferType('custom')}
              className={`p-3 rounded-xl border text-left text-xs sm:text-sm mono transition-all ${
                offerType === 'custom'
                  ? 'border-gold bg-gold/10 text-gold-bright font-bold'
                  : 'border-white/[0.08] bg-black/40 text-muted hover:text-fg'
              }`}
            >
              <div className="font-bold">{isFr ? 'Projet Sur-Mesure' : 'Custom Project'}</div>
              <div className="text-[11px] opacity-80">{isFr ? 'Sur devis · Multi-formats' : 'On quote · Multi-asset'}</div>
            </button>
          </div>
        </div>

        {/* Row: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs mono uppercase text-muted mb-1.5 font-medium">
              {isFr ? 'Votre Nom :' : 'Your Name:'}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isFr ? 'ex: Alex Martin' : 'e.g. Alex Morgan'}
              className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-3 text-fg text-sm sm:text-base focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs mono uppercase text-muted mb-1.5 font-medium">
              {isFr ? 'Votre Email * :' : 'Your Email *:'}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@domaine.com"
              className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-3 text-fg text-sm sm:text-base focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Company (Optional) */}
        <div>
          <label htmlFor="contact-company" className="block text-xs mono uppercase text-muted mb-1.5 font-medium">
            {isFr ? 'Entreprise / Marque (optionnel) :' : 'Company / Brand (optional):'}
          </label>
          <input
            id="contact-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={isFr ? 'ex: Maison X / Restaurant Le Bistrot' : 'e.g. Atelier Gourmet / Brand Studio'}
            className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-3 text-fg text-sm sm:text-base focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        {/* Que souhaitez-vous promouvoir ? */}
        <div>
          <label htmlFor="contact-target" className="block text-xs mono uppercase text-muted mb-1.5 font-medium">
            {isFr ? 'Que souhaitez-vous promouvoir ? * :' : 'What do you want to promote? *:'}
          </label>
          <textarea
            id="contact-target"
            required
            rows={2}
            value={promotionTarget}
            onChange={(e) => setPromotionTarget(e.target.value)}
            placeholder={
              isFr
                ? 'ex: Notre nouveau burger signature / Notre gamme de sneakers / Vidéo pour notre campagne agence'
                : 'e.g. Our new signature dish / Seasonal product launch / Short-form ad for client campaign'
            }
            className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-3 text-fg text-sm sm:text-base focus:border-gold focus:outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Progressive disclosure toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 text-xs mono uppercase text-muted hover:text-gold transition-colors py-1 cursor-pointer"
            aria-expanded={showDetails}
          >
            <span>
              {showDetails
                ? (isFr ? '– Moins d’options' : '– Fewer options')
                : (isFr ? '+ Ajouter des liens ou détails (optionnel)' : '+ Add links or details (optional)')}
            </span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Revealed details */}
        {showDetails && (
          <div className="space-y-4 pt-2 border-t border-white/[0.06] animate-fadeIn">
            <div>
              <label htmlFor="contact-links" className="block text-xs mono uppercase text-muted mb-1.5">
                {isFr ? 'Lien produit / Instagram / Références :' : 'Product link / Instagram / References:'}
              </label>
              <input
                id="contact-links"
                type="text"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder="https://... ou @votre_compte"
                className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-fg text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-deadline" className="block text-xs mono uppercase text-muted mb-1.5">
                {isFr ? 'Délai ou date de diffusion souhaitée :' : 'Desired timeline or launch date:'}
              </label>
              <input
                id="contact-deadline"
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder={isFr ? 'ex: fin du mois / urgent 5 jours' : 'e.g. end of month / standard 5 days'}
                className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-fg text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-notes" className="block text-xs mono uppercase text-muted mb-1.5">
                {isFr ? 'Informations complémentaires :' : 'Additional notes:'}
              </label>
              <textarea
                id="contact-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isFr ? 'Attentes visuelles, tonalité, contraintes' : 'Visual mood, tone, specifics'}
                className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-fg text-sm focus:border-gold focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Error notification */}
        {status === 'error' && (
          <div role="alert" className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs sm:text-sm text-red-300 font-sans">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-50 text-black font-bold text-sm sm:text-base mono uppercase tracking-wider py-4 rounded-full transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-gold/15 cursor-pointer min-h-[48px]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>{isFr ? 'Transmission en cours…' : 'Sending…'}</span>
            </>
          ) : (
            <>
              <span>{isFr ? 'Envoyer mon projet' : 'Submit project'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-muted/70 mono">
          {isFr
            ? 'Sans engagement · Vos éléments restent confidentiels'
            : 'No commitment · Your assets remain strictly confidential'}
        </p>
      </div>
    </form>
  );
}
