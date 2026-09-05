import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware with Cryptographic Nonce-based Content Security Policy (CSP).
 * Eliminates 'unsafe-inline' and 'unsafe-eval' from script-src to prevent XSS attacks.
 *
 * NOTE on style-src:
 * 'unsafe-inline' is intentionally preserved for style-src because modern utility-first CSS engines
 * (Tailwind CSS) and React dynamic inline style attributes (e.g. style={{ backgroundImage: ... }})
 * cannot accept nonces on HTML style attributes per the W3C CSP Level 2/3 specification.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.stripe.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.supabase.co https://i.ytimg.com https://images.unsplash.com;
    font-src 'self' data:;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://www.youtube.com https://www.youtube-nocookie.com;
    connect-src 'self' https://api.stripe.com https://*.supabase.co https://*.vercel-insights.com https://va.vercel-scripts.com;
    media-src 'self' blob: https://*.supabase.co;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://checkout.stripe.com;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|videos|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
