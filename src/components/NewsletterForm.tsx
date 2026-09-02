'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface NewsletterFormProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

export default function NewsletterForm({ lang, onShowToast }: NewsletterFormProps) {
  const t = DICTIONARY[lang];
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'already' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, company }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === 'already_subscribed') {
          setStatus('already');
          onShowToast(t.alreadySubscribedMsg);
        } else {
          setStatus('success');
          onShowToast(t.subscribedMsg);
        }
        setEmail('');
      } else {
        setStatus('error');
        onShowToast(data.error || t.errorMsg);
      }
    } catch (err) {
      console.error('Newsletter Error:', err);
      setStatus('error');
      onShowToast(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="resources" className="max-w-xl mx-auto mb-8 px-4">
      <div className="ovizai-card p-5 sm:p-6 bg-black/20 relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="mono text-xs sm:text-[13px] font-bold text-fg tracking-wide uppercase">
            {t.freePromptsTitle}
          </h3>
          <span className="w-2 h-2 rounded-full bg-gold inline-block animate-ping" />
        </div>

        <p className="text-xs text-fg-muted leading-relaxed mb-4">
          {t.freePromptsDesc}
        </p>

        {status === 'success' || status === 'already' ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2.5 bg-gold/10 border border-gold/30 rounded-lg p-3 text-gold-bright mono text-xs"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-gold-bright" />
            <span>
              {status === 'already' ? t.alreadySubscribedMsg : t.subscribedMsg}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
            <label htmlFor="newsletter-email" className="sr-only">
              {t.emailPlaceholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              disabled={loading}
              className="flex-1 bg-bg-inset border border-border-strong rounded-lg px-3.5 py-2.5 text-fg mono text-xs focus:outline-none focus:border-gold placeholder:text-fg-muted transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-fg hover:bg-white text-bg-dark font-bold rounded-lg px-5 py-2.5 mono text-xs whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{t.submitting}</span>
              ) : (
                <>
                  <span>{t.joinBtn}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div
            role="alert"
            aria-live="polite"
            className="mt-2.5 flex items-center gap-2 text-red-400 mono text-[11px]"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{t.errorMsg}</span>
          </div>
        )}
      </div>
    </section>
  );
}
