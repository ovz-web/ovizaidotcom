/**
 * Transactional Email Dispatcher for OVIZai
 * Powered by Resend API (https://resend.com)
 */

export interface LeadEmailPayload {
  email: string;
  name?: string;
  projectType?: string;
  budgetRange?: string;
  currency?: string;
  message?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TEAM_NOTIFICATION_EMAIL = 'cinemaaistudio.contact@gmail.com';
const SENDER_EMAIL = 'OVIZai <contact@ovizai.com>';

/**
 * Send internal notification email to OVIZai team
 */
export async function sendTeamNotification(payload: LeadEmailPayload) {
  if (!RESEND_API_KEY) {
    console.warn('[MAIL] RESEND_API_KEY is not set in environment variables.');
    return { success: false, reason: 'MISSING_API_KEY' };
  }

  const { email, name = 'Prospect Anonymous', projectType = 'N/A', budgetRange = 'N/A', currency = 'USD', message = '' } = payload;

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #CAA243; margin-top: 0;">⚡ NOUVELLE DEMANDE DE BRIEF — OVIZai</h2>
      <p style="font-size: 14px; color: #8C8375;">Une nouvelle soumission de projet a été enregistrée sur le site.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Prospect :</td>
          <td style="padding: 8px 0; font-weight: bold; color: #ECE4D3;">${name} (${email})</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Type de Projet :</td>
          <td style="padding: 8px 0; color: #CAA243; font-weight: bold;">${projectType}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 8px 0; color: #8C8375;">Budget Estimé :</td>
          <td style="padding: 8px 0; color: #ECE4D3;">${budgetRange} (${currency})</td>
        </tr>
      </table>

      ${message ? `
        <div style="margin-top: 16px; padding: 12px; background-color: #141210; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0; font-size: 12px; color: #8C8375; text-transform: uppercase;">Message / Brief :</p>
          <p style="margin-top: 4px; font-size: 13px; color: #ECE4D3; white-space: pre-wrap;">${message}</p>
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
        subject: `[LEAD OVIZAI] ${projectType} — ${budgetRange}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.error('[MAIL] Failed to dispatch team email:', error);
    return { success: false, error };
  }
}

/**
 * Send automated confirmation email to prospect (Dark Luxury Theme)
 */
export async function sendProspectConfirmation(email: string, name?: string) {
  if (!RESEND_API_KEY) return { success: false, reason: 'MISSING_API_KEY' };

  const htmlContent = `
    <div style="background-color: #080808; color: #ECE4D3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; border-radius: 12px; border: 1px solid rgba(202,162,67,0.3); max-width: 560px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #CAA243; font-size: 24px; tracking: 0.1em; margin: 0;">OVIZai</h1>
        <p style="color: #8C8375; font-size: 11px; text-transform: uppercase; margin-top: 4px;">Direction Artistique & Production IA</p>
      </div>

      <p style="font-size: 14px; leading: 1.6; color: #ECE4D3;">Bonjour ${name || ''},</p>
      <p style="font-size: 14px; leading: 1.6; color: #8C8375;">Nous avons bien reçu votre demande concernant votre projet visuel.</p>
      
      <div style="margin: 24px 0; padding: 16px; background-color: #141210; border-radius: 8px; border-left: 3px solid #CAA243;">
        <p style="margin: 0; font-size: 13px; color: #ECE4D3; font-weight: bold;">⚡ Engagement SLA :</p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #8C8375;">Notre équipe étudie votre brief et revient vers vous avec un retour d'orientation créative sous 24h à 48h ouvrées.</p>
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

    return { success: res.ok };
  } catch (error) {
    console.error('[MAIL] Failed to dispatch prospect confirmation:', error);
    return { success: false, error };
  }
}
