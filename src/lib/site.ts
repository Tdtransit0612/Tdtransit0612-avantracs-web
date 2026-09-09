// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for everything the site says about the business.
//
// Anything marked TODO is a real-world fact that can't be invented — a price, a
// phone number, a claim about how long you've been operating. Fabricated social
// proof on a real company's site is a liability, not a feature, so those render
// as visible placeholders rather than plausible-looking fiction. Fill them in
// here once and every page updates.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Read a config value from the environment, trimmed, treating whitespace-only
 * as absent so the fallback wins.
 *
 * Values pasted into a hosting dashboard arrive mangled more often than you
 * would think, and NEXT_PUBLIC_ values are inlined at BUILD time — so a stray
 * character is baked into every page and cannot be fixed without a redeploy.
 * NEXT_PUBLIC_APP_URL really did arrive here with a leading tab, which rendered
 * as href="<TAB>https://avantracs.app". Browsers strip leading whitespace in a
 * URL attribute so the link still worked, which is exactly why it went unnoticed
 * — but the same value read as a plain string would have carried the tab into
 * prose and into any new URL() call.
 */
const env = (name: string, fallback = ''): string =>
  (process.env[name] ?? '').trim() || fallback

export const SITE = {
  name: 'Avantra Carrier Services',
  shortName: 'Avantra',
  tagline: 'Dispatch and back office for owner-operators and small fleets',
  // WWW, not the apex. The apex 308-redirects to www, and this value becomes
  // metadataBase — so an apex default puts a redirecting URL in every canonical
  // tag, every og:url, and every sitemap entry, which asks search engines to
  // index one host while the site insists on another.
  url: env('NEXT_PUBLIC_SITE_URL', 'https://www.avantracs.com'),
  // For prose. Rendering a full URL mid-sentence reads badly.
  domain: 'avantracs.com',
  appUrl: env('NEXT_PUBLIC_APP_URL', 'https://avantracs.app'),

  // TODO: real contact details. Blank renders nothing rather than a fake number.
  email: env('NEXT_PUBLIC_CONTACT_EMAIL'),
  phone: env('NEXT_PUBLIC_CONTACT_PHONE'),
}

/**
 * Pricing. TODO — decide whether you publish a rate.
 *
 * `published: false` renders a "percentage of gross, quoted per carrier" line
 * plus a quote CTA. Flip to true and set `rate` to show a hard number. Left
 * false because publishing the wrong rate is worse than publishing none.
 */
export const PRICING = {
  published: false,
  rate: '',            // e.g. '10% of gross'
  minimum: '',         // e.g. '$50 per load'
  contractTerms: '',   // TODO: e.g. 'No long-term contract.' Leave blank if untrue.
}

/** What Avantra actually does — each of these is backed by the TMS. */
export const SERVICES = [
  {
    key: 'dispatch',
    title: 'Dispatch',
    blurb:
      'We find your freight, negotiate the rate, and send the rate confirmation. ' +
      'You get a lane that fits your truck, your home time, and your rate floor — ' +
      'not whatever was left on the board.',
    points: [
      'Load sourcing and rate negotiation',
      'Rate confirmations handled end to end',
      'Lane and equipment preferences kept on file',
      'Your minimum rate per mile is enforced, not suggested',
    ],
  },
  {
    key: 'paperwork',
    title: 'Paperwork and invoicing',
    blurb:
      'We invoice the broker in your name, under your authority, and assemble the ' +
      'packet — rate con, BOL, POD — so nothing bounces back a week later.',
    points: [
      'Invoices issued in your name, under your MC',
      'Rate con, BOL and POD collected and filed',
      'Factoring submissions when you factor',
      'Broker setup packets',
    ],
  },
  {
    key: 'collections',
    title: 'Getting you paid',
    blurb:
      'Chasing brokers is the part nobody signs up for. We work your aging every ' +
      'week and log every call, so you can see exactly what was done and when.',
    points: [
      'Weekly review of everything outstanding',
      'Every collection attempt logged with its outcome',
      'Promised-payment dates tracked and followed up',
      'Broker payment history kept, so slow payers get flagged',
    ],
  },
  {
    key: 'compliance',
    title: 'Compliance and filings',
    blurb:
      'Authority, insurance, and the filings that quietly expire. We watch the ' +
      'dates so a lapse never takes you off the road.',
    points: [
      'Operating authority and insurance monitoring',
      'IFTA, UCR, MCS-150, BOC-3, Form 2290',
      'CDL and medical card expiry tracking',
      'New authority setup and reinstatement',
    ],
  },
] as const

/** The honest differentiators — every one is something the software genuinely does. */
export const DIFFERENTIATORS = [
  {
    title: 'You see the whole file',
    body:
      'Every load shows the gross the broker pays, our fee, and your net — on the ' +
      'same screen, before you accept it. No reconciling a statement at the end of ' +
      'the week to work out what actually happened.',
  },
  {
    title: 'The chasing is on the record',
    body:
      'Each collection attempt on your invoices is logged with who we spoke to, ' +
      'what they said, and what they promised. When a broker is 60 days late, you ' +
      'can see precisely what was done about it.',
  },
  {
    title: 'Your fee is fixed when you book',
    body:
      'The rate you agreed is written onto the load at booking. Changing terms ' +
      'later never rewrites a load that already ran, so a settlement you already ' +
      'accepted cannot quietly change.',
  },
  {
    title: 'Expiries are watched, not remembered',
    body:
      'Insurance, authority, IFTA, medical cards — all of it is swept daily. You ' +
      'hear about a lapse weeks ahead, not at a scale house.',
  },
] as const

/** How the relationship actually works, start to finish. */
export const STEPS = [
  {
    n: 1,
    title: 'We sign the paperwork',
    body:
      'A dispatch service agreement and a limited power of attorney. That is what ' +
      'lets us book freight and invoice in your name, under your authority — you ' +
      'stay the motor carrier of record on every load.',
  },
  {
    n: 2,
    title: 'We learn your truck',
    body:
      'Equipment, home base, the lanes you want and the ones you refuse, your rate ' +
      'floor, your home time. It goes on file so the loads we bring already fit.',
  },
  {
    n: 3,
    title: 'We book and dispatch',
    body:
      'We source the load, negotiate, and send you the rate con. You drive. We ' +
      'handle check calls, the broker, and anything that goes sideways at a dock.',
  },
  {
    n: 4,
    title: 'We invoice and collect',
    body:
      'The broker is invoiced in your name the day the paperwork lands, and we ' +
      'chase it until it pays. Our fee comes on a separate statement, so freight ' +
      'money and our money never get tangled.',
  },
] as const

/**
 * FAQ — written to answer what a carrier actually asks before signing, and to be
 * precise about the agency relationship rather than vague about it.
 * The pricing answer is filled at render from PRICING, so there is one source.
 */
export const FAQ = [
  {
    q: 'Are you a broker?',
    a:
      'No. We hold no broker authority and we never take your freight into our own ' +
      'name. We work as your agent under a signed dispatch agreement and a limited ' +
      'power of attorney: the load is yours, the authority is yours, the invoice ' +
      'goes out in your name, and the money comes to you or your factor.',
  },
  {
    q: 'Who gets paid by the broker?',
    a:
      'You do — or your factoring company, if you factor. We never touch the ' +
      'freight money. We bill you separately for the dispatch fee, which is why ' +
      'your invoices and our statement are two different documents.',
  },
  {
    q: 'Do I have to give up my authority?',
    a:
      'No. You keep your MC and your DOT number. If anything, we spend time making ' +
      'sure they stay in good standing.',
  },
  {
    q: 'What if I already have a factoring company?',
    a:
      'Common, and fine. We submit your invoices to them and track the funding. ' +
      'Remit instructions point at your factor, because with an assigned ' +
      'receivable, paying you directly would not settle the debt.',
  },
  {
    q: 'Can I turn down a load?',
    a:
      'Always. Nothing is booked until you say yes. Your rate floor and lane ' +
      'preferences are on file specifically so you are saying no less often.',
  },
] as const

/** Rendered as the pricing FAQ answer, derived so it can never contradict the page. */
export function pricingAnswer(): string {
  if (PRICING.published && PRICING.rate) {
    return [
      `Our dispatch fee is ${PRICING.rate}`,
      PRICING.minimum ? ` with a minimum of ${PRICING.minimum} per load` : '',
      '. It is billed on a statement separate from your freight invoices, so you can always ',
      'see what you hauled and what you paid us side by side.',
      PRICING.contractTerms ? ` ${PRICING.contractTerms}` : '',
    ].join('')
  }
  return (
    'A percentage of the gross on the loads we book for you, quoted per carrier ' +
    'once we know your equipment and lanes. It is billed on a statement separate ' +
    'from your freight invoices, so you can always see what you hauled and what ' +
    'you paid us side by side. Get in touch and we will quote you.'
  )
}
