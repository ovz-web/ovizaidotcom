'use client';

import React, { useState } from 'react';
import { Send, Clock, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '@/types';

interface QualifiedContactProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
  onShowToast: (msg: string) => void;
}

const PROJECT_TYPES = [
  { id: 'film', label: { fr: 'Film / Série IA', en: 'AI Film / Series' } },
  { id: 'music-video', label: { fr: 'Clip Vidéo IA & Visualiser', en: 'AI Music Video & Visualiser' } },
  { id: 'ad', label: { fr: 'Publicité IA & Brand Content', en: 'AI Ad & Brand Content' } },
  { id: 'da', label: { fr: 'Direction Artistique & Branding', en: 'Art Direction & Branding' } },
  { id: 'web', label: { fr: 'Création de Site Web', en: 'Custom Web Design' } },
  { id: 'masterclass', label: { fr: 'Formation Vidéo IA', en: 'AI Video Masterclass' } },
];

const BUDGET_OPTIONS: Record<Currency, string[]> = {
  USD: [
    '1 000 $ – 3 000 $ USD',
    '3 000 $ – 8 000 $ USD',
    '8 000 $ – 15 000 $ USD',
    '15 000 $ + USD',
    'À définir / Quote'
  ],
  EUR: [
    '1 000 € – 3 000 €',
    '3 000 € – 8 000 €',
    '8 000 € – 15 000 €',
    '15 000 € +',
    'À définir / Quote'
  ],
  CAD: [
    '1 350 $ – 4 000 $ CAD',
    '4 000 $ – 10 500 $ CAD',
    '10 500 $ – 20 000 $ CAD',
    '20 000 $ + CAD',
    'À définir / Quote'
  ]
};

export default function QualifiedContact({ lang, currency = 'USD', onSelectCurrency, onShowToast }: QualifiedContactProps) {
  const isFr = lang === 'fr';

  const currentBudgetRanges = BUDGET_OPTIONS[currency];
  const [selectedType, setSelectedType] = useState('film');
  const [selectedBudget, setSelectedBudget] = useState(currentBudgetRanges[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const subject = `Demande de Devis — ${selectedType} (${selectedBudget})`;
      const bodyText = `Bonjour OVIZai,\n\nNom: ${name}\nEmail: ${email}\nType de Projet: ${selectedType}\nBudget Estimé: ${selectedBudget}\nDevise: ${currency}\n\nMessage / Brief:\n${message}\n`;
      const mailtoUrl = `mailto:contact@ovizai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      setSubmitted(true);
      onShowToast(isFr ? 'Brief préparé. Ouverture du client mail...' : 'Brief ready. Opening email client...');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    } catch (err) {
      console.error('Contact Form Error:', err);
      onShowToast(isFr ? 'Erreur d’envoi' : 'Error sending brief');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto mb-14 px-4">
      <div className="border border-white/[0.12] bg-[#0B0A08] rounded-xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono font-bold mb-1">
            {isFr ? '03 // DEMANDE DE DEVIS & BRIEF' : '03 // PROJECT BRIEF & CONTACT'}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ECE4D3] mb-2">
            {isFr ? 'DÉMARRER UN PROJET' : 'START A PROJECT'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8c8375] max-w-md mx-auto mb-3">
            {isFr
              ? 'Remplissez les détails de votre vision. Nous étudions votre brief sous 24h à 48h ouvrées.'
              : 'Fill in your project details. We review your brief within 24 to 48 business hours.'}
          </p>

          {/* Currency Switcher */}
          {onSelectCurrency && (
            <div className="inline-flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/[0.08] mono text-xs">
              <span className="text-[10px] text-[#8C8375] px-2 font-mono">
                {isFr ? 'Devise :' : 'Currency:'}
              </span>
              {(['USD', 'EUR', 'CAD'] as Currency[]).map(curr => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onSelectCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-[#CAA243] text-black'
                      : 'text-[#8C8375] hover:text-[#ECE4D3]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          )}
        </div>

        {submitted ? (
          <div className="p-6 rounded-lg bg-[#CAA243]/10 border border-[#CAA243]/30 text-center text-[#f0c869] mono text-xs">
            <CheckCircle2 className="w-8 h-8 text-[#f0c869] mx-auto mb-2" />
            <p className="font-bold text-sm mb-1">
              {isFr ? 'Brief transmis avec succès !' : 'Brief submitted successfully!'}
            </p>
            <p className="text-xs text-[#8c8375]">
              {isFr ? 'Vérifiez votre boîte mail pour finaliser l’envoi de votre brief.' : 'Check your inbox to finalize sending your brief.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step A: Project Type Selector */}
            <div>
              <label className="mono text-xs uppercase font-bold text-[#ECE4D3] block mb-2">
                1. {isFr ? 'Type de Projet :' : 'Select Project Type:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROJECT_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.label[lang])}
                    className={`p-2.5 rounded-lg border text-left mono text-xs transition-all cursor-pointer ${
                      selectedType === type.label[lang]
                        ? 'border-[#CAA243] bg-[#CAA243]/15 text-[#f0c869] font-bold'
                        : 'border-white/[0.08] bg-black/40 text-[#8c8375] hover:border-white/[0.2]'
                    }`}
                  >
                    {type.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step B: Clickable Budget Cards */}
            <div>
              <label className="mono text-xs uppercase font-bold text-[#ECE4D3] block mb-2">
                2. {isFr ? `Fourchette Budgétaire Estimée (${currency}) :` : `Estimated Budget Range (${currency}):`}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {currentBudgetRanges.map(bRange => (
                  <button
                    key={bRange}
                    type="button"
                    onClick={() => setSelectedBudget(bRange)}
                    className={`p-2 rounded-lg border text-center mono text-[11px] transition-all cursor-pointer ${
                      selectedBudget === bRange
                        ? 'border-[#CAA243] bg-[#CAA243]/15 text-[#f0c869] font-bold'
                        : 'border-white/[0.08] bg-black/40 text-[#8c8375] hover:border-white/[0.2]'
                    }`}
                  >
                    {bRange}
                  </button>
                ))}
              </div>
            </div>

            {/* Step C: Name, Email & Message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mono text-xs text-[#ECE4D3] block mb-1">
                  {isFr ? 'Votre Nom / Structure :' : 'Your Name / Company:'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isFr ? 'ex: Alex Morgan' : 'e.g. Alex Morgan'}
                  className="w-full bg-black/60 border border-white/[0.1] rounded-lg p-2.5 text-xs text-[#ECE4D3] mono focus:outline-none focus:border-[#CAA243]"
                />
              </div>

              <div>
                <label className="mono text-xs text-[#ECE4D3] block mb-1">
                  {isFr ? 'Votre E-mail :' : 'Your Email:'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="contact@domaine.com"
                  className="w-full bg-black/60 border border-white/[0.1] rounded-lg p-2.5 text-xs text-[#ECE4D3] mono focus:outline-none focus:border-[#CAA243]"
                />
              </div>
            </div>

            <div>
              <label className="mono text-xs text-[#ECE4D3] block mb-1">
                {isFr ? 'Description du projet / Brief :' : 'Project Description / Brief:'}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={isFr ? 'Décrivez vos attentes, délais et références visuelles...' : 'Describe your vision, timeline, and reference links...'}
                className="w-full bg-black/60 border border-white/[0.1] rounded-lg p-2.5 text-xs text-[#ECE4D3] mono focus:outline-none focus:border-[#CAA243]"
              />
            </div>

            {/* SLA Reassurance */}
            <div className="flex items-center gap-2 text-xs text-[#8c8375] bg-black/40 p-2.5 rounded-lg border border-white/[0.06]">
              <Clock className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
              <span>
                {isFr
                  ? 'Engagement SLA : Réponse et étude de brief garanties sous 24h à 48h ouvrées.'
                  : 'SLA Reassurance: Guaranteed brief review within 24-48 business hours.'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold py-3.5 rounded-lg mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(202,162,67,0.3)] disabled:opacity-50"
            >
              <span>{loading ? (isFr ? 'Transmission...' : 'Sending...') : (isFr ? 'Envoyer le Brief & Demander un Devis +' : 'Submit Brief & Request Quote +')}</span>
              <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
