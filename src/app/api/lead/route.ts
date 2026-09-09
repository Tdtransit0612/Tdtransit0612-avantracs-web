import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// POST /api/lead — the contact form.
//
// Writes into the SAME Supabase project the TMS uses, so a lead lands in the
// dispatch queue rather than an inbox somebody has to remember to check.
//
// The service key is used here and only here. This site creates no browser-side
// Supabase client at all, so the anon key is never even needed — meaning there is
// no public write surface on the `leads` table to abuse.
//
// Degrades rather than fails: if Supabase isn't configured the submission still
// succeeds for the visitor as long as email notification works. Losing a lead
// because an env var is missing is worse than any alternative.

const MAX = { name: 120, company: 160, email: 160, phone: 40, mc: 24, message: 4000 }

// Naive in-memory throttle. Resets on cold start, which is fine — it exists to
// blunt a script hammering the form, not to be an airtight rate limiter.
const hits = new Map<string, { n: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

function throttled(ip: string): boolean {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { n: 1, resetAt: now + WINDOW_MS })
    return false
  }
  rec.n += 1
  return rec.n > LIMIT
}

const clean = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown'

  if (throttled(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Try again in a few minutes, or call us.' },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 })
  }

  // Honeypot: a hidden field no human fills in. Return 200 so a bot can't tell
  // it was caught and start probing for what gave it away.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const lead = {
    name:    clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    email:   clean(body.email, MAX.email),
    phone:   clean(body.phone, MAX.phone),
    mc_number: clean(body.mc_number, MAX.mc),
    equipment: clean(body.equipment, 80),
    trucks:    clean(body.trucks, 20),
    message:   clean(body.message, MAX.message),
  }

  if (!lead.name || !lead.email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 })
  }

  let stored = false
  let storeError: string | null = null
  // PostgREST error code, surfaced verbatim in the failure response. It names
  // no schema internals but says precisely which fault this is — PGRST205 is a
  // missing table, 42501 an RLS denial. Guessing between those from outside
  // cost real debugging time.
  let storeCode: string | null = null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      const db = createClient(url, key, { auth: { persistSession: false } })
      const { error } = await db.from('leads').insert({
        name: lead.name,
        company: lead.company || null,
        email: lead.email,
        phone: lead.phone || null,
        mc_number: lead.mc_number || null,
        equipment: lead.equipment || null,
        truck_count: lead.trucks ? Number.parseInt(lead.trucks, 10) || null : null,
        message: lead.message || null,
        source: 'website',
        // Kept for abuse triage only, never displayed.
        submitted_ip: ip === 'unknown' ? null : ip,
      })
      if (error) { storeError = error.message; storeCode = error.code || null }
      else stored = true
    } catch (e) {
      storeError = e instanceof Error ? e.message : 'unknown storage error'
    }
  } else {
    storeError = 'Supabase not configured'
  }

  // Email notification is best-effort and secondary to storing the lead.
  let notified = false
  const resendKey = process.env.RESEND_API_KEY
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL
  if (resendKey && notifyTo) {
    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Avantra <onboarding@resend.dev>',
          to: notifyTo,
          reply_to: lead.email,
          subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
          html: `
            <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
              <h2 style="margin:0 0 12px">New enquiry from avantracs.com</h2>
              <table style="border-collapse:collapse;font-size:14px">
                ${Object.entries({
                  Name: lead.name, Company: lead.company, Email: lead.email,
                  Phone: lead.phone, MC: lead.mc_number, Equipment: lead.equipment,
                  Trucks: lead.trucks,
                }).filter(([, v]) => v).map(([k, v]) =>
                  `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${k}</td><td style="padding:4px 0"><strong>${esc(String(v))}</strong></td></tr>`,
                ).join('')}
              </table>
              ${lead.message ? `<p style="margin-top:16px;white-space:pre-wrap">${esc(lead.message)}</p>` : ''}
              ${stored ? '' : '<p style="margin-top:16px;color:#b91c1c"><strong>Note:</strong> this lead was NOT saved to the database. Capture it from this email.</p>'}
            </div>`,
        }),
      })
      notified = res.ok
    } catch {
      notified = false
    }
  }

  // Only a total failure is worth telling the visitor about — if we stored it OR
  // emailed it, their message reached us.
  if (!stored && !notified) {
    console.error('[lead] LOST a submission —', storeError, JSON.stringify({ email: lead.email }))
    // Coarse reason code only. The visitor sees the friendly message; this tells
    // an operator WHICH branch failed without leaking a database error string to
    // the public. Without it, "misconfigured" and "insert rejected" are
    // indistinguishable from outside, which is exactly the hole that made this
    // undebuggable remotely.
    return NextResponse.json(
      {
        error: 'We could not record your message. Please email or call us directly.',
        reason: storeError === 'Supabase not configured' ? 'not_configured' : 'store_failed',
        code: storeCode,
      },
      { status: 500 },
    )
  }

  if (!stored) console.warn('[lead] not stored, emailed only:', storeError)

  return NextResponse.json({ ok: true })
}

/**
 * GET /api/lead — configuration health.
 *
 * Reports WHICH fault, never any secret value.
 *
 * A key's own payload is not a secret to anyone already holding the key, so
 * decoding it to check the role and project claims leaks nothing while
 * answering the two questions that actually go wrong in a dashboard: is this
 * the service key or something pasted over it, and does it belong to the
 * project the URL points at? Those are invisible to a presence boolean, which
 * is how a "healthy" deploy dropped every submission.
 */

/** Read the `role` and `ref` claims out of a legacy Supabase JWT. Claims only. */
function inspectKey(key: string): { format: string; role: string | null; ref: string | null } {
  if (!key) return { format: 'missing', role: null, ref: null }
  if (key.startsWith('sb_secret_')) return { format: 'new_secret', role: 'secret', ref: null }
  if (key.startsWith('sb_publishable_')) return { format: 'new_publishable', role: 'publishable', ref: null }
  const parts = key.split('.')
  if (parts.length !== 3) return { format: 'unrecognised', role: null, ref: null }
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const claims = JSON.parse(atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4)))
    return { format: 'legacy_jwt', role: claims.role ?? null, ref: claims.ref ?? null }
  } catch {
    return { format: 'undecodable', role: null, ref: null }
  }
}

export async function GET() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim()
  const resendConfigured = !!process.env.RESEND_API_KEY && !!process.env.LEAD_NOTIFY_EMAIL

  const k = inspectKey(key)
  const urlRef = url.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1] ?? null

  let reachable = false
  let status: number | null = null
  let code: string | null = null
  let diagnosis = 'not_configured'
  // Two different faults both surface as a thrown fetch: an unresolvable host,
  // and a key that is illegal as an HTTP header value. Probing the URL with no
  // Authorization header at all separates them — an unauthenticated PostgREST
  // returns 401, so a REPLY of any kind proves the host is fine and the fault
  // is the key.
  let urlReachable: boolean | null = null
  let failure: string | null = null

  const redact = (t: string) =>
    (key ? t.split(key).join('<key>') : t).slice(0, 200)

  if (url && key) {
    try {
      // Raw fetch, not supabase-js: the HTTP status is the most diagnostic
      // signal here and the client library flattens it away. Also NOT a HEAD
      // request — a HEAD 404 has no body and reads back as an empty success,
      // which is precisely how a table that never existed was reported as
      // existing with 0 rows.
      const res = await fetch(`${url}/rest/v1/leads?select=id&limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store',
      })
      status = res.status
      if (res.ok) { reachable = true; diagnosis = 'ok' }
      else {
        const body = await res.json().catch(() => null)
        code = body?.code ?? null
        if (code === 'PGRST205') diagnosis = 'table_missing'
        else if (code === '42501') diagnosis = 'rls_denied'
        else if (res.status === 401) diagnosis = 'invalid_api_key'
        else diagnosis = `http_${res.status}`
      }
    } catch (e) {
      diagnosis = 'network_error'
      // Redacted against the key before it is ever returned.
      failure = redact(e instanceof Error ? `${e.name}: ${e.message}` : 'unknown')
    }

    try {
      const bare = await fetch(`${url}/rest/v1/`, { cache: 'no-store' })
      urlReachable = bare.status > 0
    } catch {
      urlReachable = false
    }
  }

  return NextResponse.json({
    supabaseUrlPresent: !!url,
    supabaseUrlLooksValid: !!urlRef,
    serviceKeyPresent: !!key,
    serviceKeyFormat: k.format,
    // Shape only. A length and a segment count cannot reconstruct a secret, but
    // they identify the mangling that a presence boolean cannot see: a healthy
    // legacy key is one line, roughly 200-250 chars, in exactly 3 dot-separated
    // segments, with no interior whitespace. Interior whitespace is fatal on its
    // own — a newline makes the value illegal as an HTTP header, so fetch throws
    // before a request is ever sent and the failure looks like a network outage.
    serviceKeyLength: key.length,
    serviceKeySegments: key ? key.split('.').length : 0,
    serviceKeyHasInteriorWhitespace: /s/.test(key),
    // A JWT is strictly [A-Za-z0-9._-]. Anything else means the value was
    // transformed on its way into the dashboard rather than merely mistyped,
    // and a non-Latin-1 character is what makes fetch throw before it sends.
    serviceKeyCharsetOk: /^[A-Za-z0-9._-]*$/.test(key),
    serviceKeyNonAsciiCount: (key.match(/[^ -~]/g) || []).length,
    // Should be "service_role". "anon" means the wrong key was pasted in.
    serviceKeyRole: k.role,
    // false means the key belongs to a DIFFERENT Supabase project than the URL.
    serviceKeyMatchesProject: k.ref && urlRef ? k.ref === urlRef : null,
    leadsTableReachable: reachable,
    // true here with leadsTableReachable false isolates the fault to the key.
    supabaseHostReachable: urlReachable,
    fetchFailure: failure,
    httpStatus: status,
    postgrestCode: code,
    diagnosis,
    resendConfigured,
    canAcceptLeads: reachable || resendConfigured,
  })
}
