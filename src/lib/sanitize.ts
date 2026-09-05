/**
 * Server-side input sanitization utility for API routes and form submissions.
 * Protects against XSS, HTML injection, and payload bloat.
 */

export function sanitizeString(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .slice(0, maxLength)
    // Strip script and iframe tags completely
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
    // Strip dangerous event handler attributes
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/on\w+\s*=\s*[^>\s]+/gi, '')
    // Strip javascript: pseudo-protocols
    .replace(/javascript\s*:/gi, '')
    // Encode HTML special chars
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null;
  const trimmed = email.trim().toLowerCase().slice(0, 254);
  const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!RFC5322_EMAIL_REGEX.test(trimmed)) return null;
  return trimmed;
}
