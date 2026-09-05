import { track as vercelTrack } from '@vercel/analytics';

/**
 * Safe conversion and custom event tracking wrapper for Vercel Analytics.
 * Silently handles SSR, local development, and ad-blockers without throwing.
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    if (typeof window !== 'undefined') {
      vercelTrack(eventName, properties);
    }
  } catch (err) {
    // Fail silently in development or when blocked
  }
}
