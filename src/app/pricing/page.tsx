import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { PRICING, FAQ, pricingAnswer } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'How Avantra charges for dispatch: a percentage of the gross on loads we book ' +
    'for you, billed separately from your freight invoices.',
  alternates: { canonical: '/pricing' },
}

const INCLUDED = [
  'Load sourcing and rate negotiation',
  'Rate confirmations handled end to end',
  'Check calls and broker communication',
  'Invoicing the broker in your name',
  'Rate con, BOL and POD collected',
  'Factoring submissions',
  'Weekly AR review and collections',
  'Compliance and expiry monitoring',
]

const NOT_INCLUDED = [
  ['Government and third-party fees', 'UCR, 2290, permit and filing fees are passed through at cost — we never mark them up.'],
  ['Your insurance premiums', 'We track the dates and chase the certificate. The policy stays yours.'],
  ['Factoring fees', 'Your factor charges what it charges. We just submit and track.'],
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            One fee, on loads we actually book
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/75">
            No setup fee, no monthly subscription, no charge for a week you did not run. If we do
            not find you freight, we do not get paid.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="overflow-hidden rounded-3xl border-2 border-brand-500/30">
            <div className="bg-brand-50 px-8 py-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Dispatch fee
              </p>

              {PRICING.published && PRICING.rate ? (
                <>
                  <p className="mt-3 text-5xl font-bold tracking-tight text-ink-900">
                    {PRICING.rate}
                  </p>
                  {PRICING.minimum && (
                    <p className="mt-2 text-slate-600">Minimum {PRICING.minimum}</p>
                  )}
                  {PRICING.contractTerms && (
                    <p className="mt-3 font-medium text-accent-600">{PRICING.contractTerms}</p>
                  )}
                </>
              ) : (
                <>
                  <p className="mt-3 text-4xl font-bold tracking-tight text-ink-900">
                    A percentage of gross
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-slate-600">
                    Quoted per carrier once we know your equipment, your lanes, and how much
                    volume you want. Ask and we will give you a number, not a range.
                  </p>
                </>
              )}

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Get your quote<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="grid gap-8 px-8 py-10 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Included
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {INCLUDED.map(i => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />{i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Not included
                </h2>
                <ul className="mt-4 space-y-4">
                  {NOT_INCLUDED.map(([t, d]) => (
                    <li key={t} className="flex gap-2.5">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" aria-hidden />
                      <div>
                        <p className="text-sm font-medium text-ink-900">{t}</p>
                        <p className="mt-0.5 text-sm text-slate-600">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How billing actually works — the part that builds trust */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/70 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">
              What the bill looks like
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              You get a statement listing every load we booked in the period: the load number, the
              lane, what it grossed, and the fee on it. The total is what you owe us — nothing is
              deducted from your freight money, because your freight money never passes through us.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              The fee on a load is locked in the moment you accept it. If we later agree different
              terms, that applies to future loads — it never rewrites a load that already ran, so a
              statement you have already seen cannot change underneath you.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900">Common questions</h2>
            <dl className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
              {FAQ.map(f => (
                <div key={f.q} className="py-6">
                  <dt className="text-lg font-semibold text-ink-900">{f.q}</dt>
                  <dd className="mt-2.5 leading-relaxed text-slate-600">{f.a}</dd>
                </div>
              ))}
              <div className="py-6">
                <dt className="text-lg font-semibold text-ink-900">What does it cost?</dt>
                <dd className="mt-2.5 leading-relaxed text-slate-600">{pricingAnswer()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
