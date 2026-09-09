import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What Avantra Carrier Services collects, why, and what we do not do with it.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

// NOTE: this describes what the site and the TMS actually do, which is the only
// honest basis for a privacy policy. It is not a lawyer's document — have counsel
// review it before you rely on it, particularly if you start operating in states
// with their own privacy statutes.
export default function PrivacyPage() {
  const updated = 'September 2026'   // TODO: bump when the policy actually changes

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Privacy policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated {updated}</p>

        <div className="mt-10 space-y-10 leading-relaxed text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">What we collect</h2>
            <p className="mt-3">
              From this website, only what you type into the contact form: your name, company,
              email, phone, MC number, equipment type, fleet size, and your message. We also record
              the IP address a submission came from, purely so we can identify abuse of the form.
            </p>
            <p className="mt-3">
              If you become a client, we hold what is needed to dispatch and bill for you —
              authority and insurance details, driver and equipment records, load and invoice
              history, and documents you send us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">What we do not do</h2>
            <p className="mt-3">
              We do not sell your information. We do not share it with data brokers or advertisers.
              We do not add you to a mailing list because you filled in a contact form.
            </p>
            <p className="mt-3">
              This site runs no analytics, no advertising pixels, and no third-party trackers. There
              is no cookie banner because there are no tracking cookies to consent to.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Who we share it with</h2>
            <p className="mt-3">Only where it is necessary to do the work you hired us for:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Brokers and shippers</strong> — the details needed to book and invoice a load in your name.</li>
              <li><strong>Your factoring company</strong> — invoices and supporting paperwork, if you factor.</li>
              <li><strong>Filing agencies and insurers</strong> — where you have asked us to file or obtain something on your behalf.</li>
              <li><strong>Our infrastructure providers</strong> — hosting and database services that store the data so we can operate the system.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">How it is protected</h2>
            <p className="mt-3">
              Client data sits behind authentication with row-level security enforced at the
              database, so a signed-in user only reaches records they are entitled to. Documents are
              held in private storage and served only through short-lived signed links — never a
              public URL. Access to the system is logged.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">How long we keep it</h2>
            <p className="mt-3">
              Enquiries that do not become clients are kept while they are still commercially
              relevant, then deleted. Client records are retained for as long as you are a client
              and afterwards for as long as tax, insurance, and transportation record-keeping rules
              require.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Your choices</h2>
            <p className="mt-3">
              Ask us what we hold about you and we will tell you. Ask us to correct it and we will.
              Ask us to delete it and we will, except where we are required to keep it — and we will
              say plainly which parts those are and why.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Contact</h2>
            <p className="mt-3">
              {SITE.email
                ? <>Questions about this policy: <a href={`mailto:${SITE.email}`} className="font-medium text-brand-600 hover:underline">{SITE.email}</a>.</>
                : 'Questions about this policy can be sent through the contact form.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
