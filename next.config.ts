import type { NextConfig } from 'next'

// Marketing site: fully public, no auth, no session cookies. The TMS lives on a
// separate deploy at avantracs.app, so nothing here touches user data beyond the
// contact form, which POSTs to its own server route.
//
// The Content-Security-Policy is NOT here. It lives in src/proxy.ts, because it
// needs a per-request nonce for the inline scripts the App Router emits to carry
// its RSC payload. It was previously a static header in this file with
// `script-src 'self'` and no nonce, which blocked those scripts and left the
// entire site server-rendered but never hydrated.
//
// Do not add a CSP back to this list. Two CSP headers are enforced as their
// INTERSECTION, so a static one here would silently re-block the nonced scripts
// the proxy just allowed, and the site would break exactly as it did before.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
