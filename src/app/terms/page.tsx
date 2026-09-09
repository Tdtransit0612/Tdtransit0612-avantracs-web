import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms governing use of the avantracs.com website.',
  alternates: { canonical: '/terms' },
}

// Scope note: these terms cover the WEBSITE only. The commercial relationship is
// governed by the signed dispatch service agreement, which takes precedence over
// anything here. Keeping those separate matters — a website disclaimer is not a
// substitute for the contract, and conflating them creates argument later.
export default function TermsPage() {
  const updated = 'September 2026'   // TODO: bump when these actually change

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Terms of use</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated {updated}</p>

        <div className="mt-8 flex gap-3.5 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <p className="text-sm leading-relaxed text-amber-900">
            These terms cover this website only. If you become a client, the{' '}
            <strong>signed dispatch service agreement</strong> governs the actual relationship and
            takes precedence over anything on this page.
          </p>
        </div>

        <div className="mt-10 space-y-10 leading-relaxed text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">What this site is</h2>
            <p className="mt-3">
              {SITE.url} describes the dispatch and back-office services offered by {SITE.name}. It
              is informational. Nothing here is a binding offer, and submitting the contact form
              does not create a business relationship — that begins only when a dispatch service
              agreement is signed by both parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Our role</h2>
            <p className="mt-3">
              {SITE.name} is a dispatch service. We do not hold broker authority, we do not take
              freight into our own name, and we do not operate as a motor carrier. We act as an
              agent for carriers who have engaged us in writing. Carriers remain the motor carrier
              of record on every load and are responsible for their own operating authority,
              insurance, safety compliance, and the operation of their equipment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Accuracy</h2>
            <p className="mt-3">
              We keep this site accurate, but service details, rates, and regulatory information
              change. Nothing here is a guarantee of a specific rate, a specific lane, or a specific
              volume of freight. Regulatory summaries on this site are general and are not a
              substitute for the current rules from FMCSA or your state.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Not legal or financial advice</h2>
            <p className="mt-3">
              Descriptions of operating authority, agency relationships, factoring, and compliance
              filings are provided to explain what we do. They are not legal, tax, or financial
              advice. Have your own attorney or accountant review anything you sign.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Acceptable use</h2>
            <p className="mt-3">
              Do not use this site to submit false information, attempt to gain unauthorised access,
              interfere with its operation, or scrape it at a volume that degrades it for others. We
              rate-limit the contact form and may block abusive traffic.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Client system</h2>
            <p className="mt-3">
              The client system at {SITE.appUrl} is restricted to authorised users. Credentials are
              personal and must not be shared. Access may be suspended where sharing or misuse is
              suspected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Changes</h2>
            <p className="mt-3">
              We may update these terms. The date at the top reflects the current version, and
              continued use of the site after a change means you accept it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Contact</h2>
            <p className="mt-3">
              {SITE.email
                ? <>Questions about these terms: <a href={`mailto:${SITE.email}`} className="font-medium text-brand-600 hover:underline">{SITE.email}</a>.</>
                : 'Questions about these terms can be sent through the contact form.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
