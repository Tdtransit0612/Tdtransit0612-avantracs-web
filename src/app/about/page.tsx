import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { DIFFERENTIATORS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Avantra Carrier Services is a dispatch service for owner-operators and small ' +
    'fleets, running on software we built ourselves.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="inline-flex rounded-2xl bg-brand-600 p-3.5">
            <Compass className="h-7 w-7 text-white" aria-hidden />
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            A dispatch service that shows its work
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/75">
            Most carriers have been burned by a dispatcher at least once — a fee that moved, an
            invoice nobody sent, a load that was never really booked. We built Avantra so those
            things are visible instead of arguable.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          {/*
            TODO — your story. This section is deliberately generic because
            inventing a founding story, a years-in-business number, or a driver
            background for a real company would be fabrication. Replace the two
            paragraphs below with the true version; the rest of the page stands
            on its own.
          */}
          <h2 className="text-3xl font-bold tracking-tight text-ink-900">Why we exist</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Dispatch is not complicated work, but it is relentless. Someone has to be on the boards
            early, argue about a rate, remember which broker pays in 30 days and which takes 75,
            and notice that a UCR expires next month. Doing that well for one truck is a job. Doing
            it while driving that truck is not really possible.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            So we do it for you, and we charge only on the loads we actually find. When we are not
            producing, we are not earning — which is the incentive you want your dispatcher to have.
          </p>

          <h2 className="mt-16 text-3xl font-bold tracking-tight text-ink-900">
            We built our own software
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Most dispatch services run on spreadsheets and a shared inbox. We run on a system we
            wrote for this specific job: your loads, your invoices, your compliance dates, and every
            collection call we make on your behalf, in one place.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            That is not a marketing detail. It is why we can make the following promises concretely
            rather than sincerely.
          </p>

          <div className="mt-10 space-y-6">
            {DIFFERENTIATORS.map(d => (
              <div key={d.title} className="border-l-4 border-brand-500 pl-6">
                <h3 className="text-lg font-semibold text-ink-900">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{d.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-3xl font-bold tracking-tight text-ink-900">
            What we are not
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            We are not a broker. We hold no broker authority, we never take your freight into our
            own name, and we never handle your freight money. We are your agent, working under a
            written agreement and a limited power of attorney, and you remain the motor carrier of
            record on every load we book.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            If a dispatch service is cagey about that distinction, ask harder. It determines who is
            liable when something goes wrong.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-brand-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Want to see if we are a fit?
          </h2>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Get in touch<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
