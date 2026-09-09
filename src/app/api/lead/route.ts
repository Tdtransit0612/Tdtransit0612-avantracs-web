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
      if (error) storeError = error.message
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
 * Booleans only: whether each variable is PRESENT, never its value. Enough to
 * diagnose a misconfigured deploy from outside without exposing anything. The
 * equivalent question was previously unanswerable without dashboard access.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return NextResponse.json({
    supabaseUrlPresent: !!url,
    supabaseUrlLooksValid: url.startsWith('https://') && url.includes('.supabase.co'),
    serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    resendConfigured: !!process.env.RESEND_API_KEY && !!process.env.LEAD_NOTIFY_EMAIL,
    // If storage is unconfigured AND email is unconfigured, a real submission
    // has nowhere to go and will 500.
    canAcceptLeads:
      (!!url && !!process.env.SUPABASE_SERVICE_ROLE_KEY) ||
      (!!process.env.RESEND_API_KEY && !!process.env.LEAD_NOTIFY_EMAIL),
  })
}
