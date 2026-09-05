/**
 * Transactional Email Dispatcher for OVIZai
 * Powered by Resend API (https://resend.com)
 */

import { MASTERCLASS_PRICE } from '@/lib/pricing';

export interface LeadEmailPayload {
  email: string;
  name?: string;
  projectType?: string;
  budgetRange?: string;
  currency?: string;
  message?: string;
}

export interface MasterclassSalePayload {
  email: string;
  name?: string;
  amount?: number;
  currency?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TEAM_NOTIFICATION_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL || 'contact@ovizai.com';
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'OVIZai <contact@ovizai.com>';

/**
 * Escapes unsafe HTML characters to prevent XSS / content injection when
 * embedding user inputs (name, email, message) inside transactional email HTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Masks email address for safe logging (e.g. a***e@domaine.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Send internal notification email to OVIZai team for new project brief
 */
export async function sendTeamNotification(payload: LeadEmailPayload) {
  if (!RESEND_API_KEY) {
    console.warn('[MAIL] RESEND_API_KEY is not set in environment variables.');
    return { success: false, reason: 'MISSING_API_KEY' };
  }

  const { email, name = 'Prospect Anonymous', projectType = 'N/A', budgetRange = 'N/A', currency = 'USD', message = '' } = payload;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProjectType = escapeHtml(projectType);
  const safeBudgetRange = escapeHtml(budgetRange);
  const safeCurrency = escapeHtml(currency);
  const safeMessage = escapeHtml(message);

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #CAA243; margin-top: 0;">⚡ NOUVELLE DEMANDE DE BRIEF — OVIZai</h2>
      <p style="font-size: 14px; color: #8C8375;">Nouvelle soumission de projet enregistrée sur le site</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Prospect :</td>
          <td style="padding: 8px 0; font-weight: bold; color: #ECE4D3;">${safeName} (${safeEmail})</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Type de Projet :</td>
          <td style="padding: 8px 0; color: #CAA243; font-weight: bold;">${safeProjectType}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Budget Estimé :</td>
          <td style="padding: 8px 0; color: #ECE4D3;">${safeBudgetRange} (${safeCurrency})</td>
        </tr>
      </table>

      ${safeMessage ? `
        <div style="margin-top: 16px; padding: 12px; background-color: #141210; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0; font-size: 12px; color: #8C8375; text-transform: uppercase;">Message / Brief :</p>
          <p style="margin-top: 4px; font-size: 13px; color: #ECE4D3; white-space: pre-wrap;">${safeMessage}</p>
        </div>
      ` : ''}

      <p style="margin-top: 24px; font-size: 11px; color: #8C8375; text-align: center;">OVIZai Direction Artistique & Production IA</p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [TEAM_NOTIFICATION_EMAIL],
        subject: `[LEAD OVIZAI] ${safeProjectType} — ${safeBudgetRange}`,
        html: htmlContent,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error(`[MAIL ERROR] Resend API HTTP ${res.status} for team notification (${maskEmail(email)}):`, JSON.stringify(data));
      return { success: false, status: res.status, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[MAIL] Failed to dispatch team email (${maskEmail(email)}):`, error);
    return { success: false, error };
  }
}

/**
 * Send automated confirmation email to prospect (Dark Luxury Theme)
 */
export async function sendProspectConfirmation(email: string, name?: string) {
  if (!RESEND_API_KEY) return { success: false, reason: 'MISSING_API_KEY' };

  const safeName = escapeHtml(name || '');

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; border-radius: 12px; border: 1px solid rgba(202,162,67,0.3); max-width: 560px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #CAA243; font-size: 24px; letter-spacing: 0.1em; margin: 0;">OVIZai</h1>
        <p style="color: #8C8375; font-size: 11px; text-transform: uppercase; margin-top: 4px;">Direction Artistique & Production IA</p>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #ECE4D3;">Bonjour ${safeName},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #8C8375;">Nous avons bien reçu votre demande de projet visuel</p>
      
      <div style="margin: 24px 0; padding: 16px; background-color: #141210; border-radius: 8px; border-left: 3px solid #CAA243;">
        <p style="margin: 0; font-size: 13px; color: #ECE4D3; font-weight: bold;">⚡ Engagement SLA :</p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #8C8375;">Notre équipe étudie votre brief<br/>Retour d'orientation créative sous 24h à 48h ouvrées</p>
      </div>

      <p style="font-size: 13px; color: #8C8375; margin-top: 24px;">Cordialement,<br/><strong style="color: #ECE4D3;">L'équipe OVIZai</strong></p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: `Accusé de réception de votre brief — OVIZai`,
        html: htmlContent,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error(`[MAIL ERROR] Resend API HTTP ${res.status} for prospect confirmation (${maskEmail(email)}):`, JSON.stringify(data));
      return { success: false, status: res.status, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[MAIL] Failed to dispatch prospect confirmation (${maskEmail(email)}):`, error);
    return { success: false, error };
  }
}

/**
 * Send automated Masterclass Welcome & Access email to paying student (Dark Luxury Theme)
 */
export async function sendMasterclassWelcome(email: string, name?: string) {
  if (!RESEND_API_KEY) return { success: false, reason: 'MISSING_API_KEY' };

  const safeName = escapeHtml(name || '');

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; border-radius: 12px; border: 1px solid rgba(202,162,67,0.3); max-width: 560px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #CAA243; font-size: 24px; letter-spacing: 0.1em; margin: 0;">OVIZai</h1>
        <p style="color: #8C8375; font-size: 11px; text-transform: uppercase; margin-top: 4px;">Masterclass Cinéma IA — Confirmation d'accès</p>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #ECE4D3;">Bonjour ${safeName ? safeName : ''},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #8C8375;">Félicitations ! Votre inscription à la Masterclass Cinéma IA est validée</p>
      
      <div style="margin: 24px 0; padding: 20px; background-color: #141210; border-radius: 8px; border-left: 3px solid #CAA243;">
        <p style="margin: 0; font-size: 13px; color: #CAA243; font-weight: bold;">⚡ Votre accès direct au programme :</p>
        <p style="margin: 8px 0 12px 0; font-size: 12.5px; color: #ECE4D3; line-height: 1.5;">
          Accès immédiat et à vie aux 5 modules du programme<br/>Génération cinématique, animation, caméra 3D, upscaling et mastering 4K
        </p>
        <div style="text-align: center; margin: 16px 0 8px 0;">
          <a href="https://ovizai.com/formation" style="display: inline-block; background-color: #CAA243; color: #000000; font-weight: bold; font-size: 12px; text-transform: uppercase; tracking: 0.05em; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
            Accéder à la Masterclass →
          </a>
        </div>
      </div>

      <p style="font-size: 13px; color: #8C8375; margin-top: 24px;">Pour toute question, contactez notre équipe support : <a href="mailto:contact@ovizai.com" style="color: #CAA243; text-decoration: underline;">contact@ovizai.com</a></p>

      <p style="font-size: 13px; color: #8C8375; margin-top: 24px;">À très bientôt,<br/><strong style="color: #ECE4D3;">L'équipe OVIZai Studio</strong></p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: `⚡ Accès Masterclass Cinéma IA — OVIZai`,
        html: htmlContent,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error(`[MAIL ERROR] Resend API HTTP ${res.status} for Masterclass welcome (${maskEmail(email)}):`, JSON.stringify(data));
      return { success: false, status: res.status, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[MAIL] Failed to dispatch Masterclass welcome email (${maskEmail(email)}):`, error);
    return { success: false, error };
  }
}

/**
 * Send internal notification email to OVIZai team when a Masterclass sale occurs
 */
export async function sendMasterclassSaleNotification(payload: MasterclassSalePayload) {
  if (!RESEND_API_KEY) {
    console.warn('[MAIL] RESEND_API_KEY is not set in environment variables.');
    return { success: false, reason: 'MISSING_API_KEY' };
  }

  const { email, name = 'Étudiant Masterclass', amount = MASTERCLASS_PRICE.CAD, currency = 'CAD' } = payload;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeAmount = escapeHtml(String(amount));
  const safeCurrency = escapeHtml(currency.toUpperCase());

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border-radius: 12px; border: 1px solid rgba(202,162,67,0.4);">
      <h2 style="color: #CAA243; margin-top: 0;">🎉 NOUVELLE VENTE MASTERCLASS — OVIZai</h2>
      <p style="font-size: 14px; color: #8C8375;">Nouveau règlement validé avec succès via Stripe Checkout</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Client / Étudiant :</td>
          <td style="padding: 8px 0; font-weight: bold; color: #ECE4D3;">${safeName} (${safeEmail})</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Montant Encaissé :</td>
          <td style="padding: 8px 0; color: #CAA243; font-weight: bold;">${safeAmount} ${safeCurrency}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Programme :</td>
          <td style="padding: 8px 0; color: #ECE4D3;">Masterclass Cinéma IA OVIZai (Accès à vie)</td>
        </tr>
      </table>

      <p style="margin-top: 24px; font-size: 11px; color: #8C8375; text-align: center;">OVIZai Direction Artistique & Production IA</p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [TEAM_NOTIFICATION_EMAIL],
        subject: `[VENTE MASTERCLASS] ${safeName} — ${safeAmount} ${safeCurrency}`,
        html: htmlContent,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error(`[MAIL ERROR] Resend API HTTP ${res.status} for Masterclass sale notification (${maskEmail(email)}):`, JSON.stringify(data));
      return { success: false, status: res.status, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[MAIL] Failed to dispatch Masterclass sale notification email (${maskEmail(email)}):`, error);
    return { success: false, error };
  }
}
