import { NextResponse, type NextRequest } from 'next/server'

/**
 * Per-request CSP nonce.
 *
 * The CSP used to be a static header in next.config.ts with `script-src 'self'`
 * and the note "this site ships no inline scripts of its own". That was wrong in
 * a way that took the whole site down silently: the App Router emits the RSC
 * payload as INLINE <script> tags, so `'self'` blocked every one of them. The
 * pages still rendered and read perfectly, but React never hydrated — verified
 * in a real browser, where the contact form had 0 RSC payload chunks, no React
 * fiber on the form element, and a Send button that did nothing. Nothing about
 * that is visible in a build, a typecheck, or a curl of the HTML.
 *
 * Next injects this nonce into its own script tags automatically, but only when
 * it renders per-request — a page prerendered at build time has no request to
 * take a nonce from. That is why the root layout awaits connection().
 *
 * Middleware in this version of Next is `proxy.ts`, not `middleware.ts`.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // React uses eval in development to rebuild server error stacks. Production
  // needs no such allowance, so it does not get one.
  const isDev = process.env.NODE_ENV === 'development'

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' means trust flows from these nonced scripts to whatever
    // they load, rather than from a host allowlist.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    // Styles keep 'unsafe-inline' deliberately, and must NOT also carry a nonce:
    // a nonce on style-src causes browsers to ignore 'unsafe-inline', which would
    // break the inline critical CSS Next emits. Inline style is a far smaller
    // risk than inline script, and this is the trade the site can afford.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    // Same-origin only: the contact form POSTs to /api/lead on this origin.
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ')

  // Next reads the nonce off the REQUEST headers to stamp its own script tags.
  // Setting it only on the response would ship a CSP that blocks the very
  // scripts the page needs.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: [
    {
      /*
       * Everything except:
       *  - api            JSON responses; no scripts to police, and the lead
       *                   route should not pay for a nonce it cannot use
       *  - _next/static   build output
       *  - _next/image    image optimizer
       *  - favicon.ico    favicon
       *  - image files    served as-is
       */
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',

      /*
       * Skip next/link prefetches. Every request through here mints a FRESH
       * nonce, so a prefetched payload carries a nonce that no longer matches
       * the CSP of the page the visitor actually lands on — the browser then
       * refuses the scripts and client-side navigation breaks, while a hard
       * reload works fine. Production prefetches far more aggressively than dev,
       * so this does not reproduce locally. This is the matcher shape Next's own
       * CSP guide prescribes.
       */
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
