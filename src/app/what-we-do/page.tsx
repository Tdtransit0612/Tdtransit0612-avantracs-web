import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, FileText, Receipt, ShieldCheck, Truck } from 'lucide-react'
import { SERVICES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Dispatch, paperwork and invoicing, collections, and compliance filings for ' +
    'owner-operators and small fleets. Use all four or just the dispatch.',
  alternates: { canonical: '/what-we-do' },
}

const ICONS: Record<string, React.ReactNode> = {
  dispatch:    <Truck className="h-6 w-6" aria-hidden />,
  paperwork:   <FileText className="h-6 w-6" aria-hidden />,
  collections: <Receipt className="h-6 w-6" aria-hidden />,
  compliance:  <ShieldCheck className="h-6 w-6" aria-hidden />,
}

// Spelled out because "compliance" is the vaguest word in trucking and carriers
// deserve to know exactly which filings are covered before they ask.
const FILINGS = [
  ['Operating authority (MC)', 'New applications, reinstatements, and monitoring for revocation notices.'],
  ['Insurance', 'Auto liability and cargo certificates tracked to their expiry date.'],
  ['IFTA', 'Registration and quarterly filings.'],
  ['UCR', 'Annual registration before the enforcement window opens.'],
  ['MCS-150', 'The biennial update that suspends your authority if you miss it.'],
  ['BOC-3', 'Process agent filing.'],
  ['Form 2290', 'Heavy vehicle use tax.'],
  ['Driver credentials', 'CDL and medical card expiry, per driver.'],
]

export default function WhatWeDoPage() {
  return (
    <>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Everything between the load board and the bank
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/75">
            Four services. Most carriers start with dispatch and add the rest once they see the
            week get shorter. You are not locked into all of it.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="space-y-20">
            {SERVICES.map(s => (
              <div key={s.key} id={s.key} className="scroll-mt-24">
                <div className="inline-flex rounded-xl bg-brand-50 p-3.5 text-brand-600">
                  {ICONS[s.key]}
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-900">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.blurb}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.points.map(p => (
                    <li key={p} className="flex gap-2.5 text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>

                {s.key === 'compliance' && (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-3.5">
                      <h3 className="text-sm font-semibold text-ink-900">
                        Filings we track, specifically
                      </h3>
                    </div>
                    <dl className="divide-y divide-slate-100">
                      {FILINGS.map(([name, detail]) => (
                        <div key={name} className="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-semibold text-ink-900">{name}</dt>
                          <dd className="text-sm text-slate-600 sm:col-span-2">{detail}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {s.key === 'collections' && (
                  <div className="mt-8 rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 px-6 py-5">
                    <p className="leading-relaxed text-slate-700">
                      <strong className="text-ink-900">Worth being specific about:</strong>{' '}
                      we log every collection attempt — the date, who we reached, what they said,
                      and any payment date they promised. When you ask why an invoice is 60 days
                      out, the answer is a record, not a recollection.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-brand-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Not sure which parts you need?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Tell us how you run now and we will tell you honestly where we would actually help.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Talk to us<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
