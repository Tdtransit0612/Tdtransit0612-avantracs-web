import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileSignature, ShieldCheck, AlertTriangle } from 'lucide-react'
import { STEPS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How a dispatch service works: the agreement and power of attorney, what we ' +
    'book, who invoices, and who the broker actually pays. You stay the motor ' +
    'carrier of record on every load.',
  alternates: { canonical: '/how-it-works' },
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            How it works
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/75">
            No mystery to it. Here is the arrangement in plain terms, including the part most
            dispatch services are vague about: whose authority, and whose money.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <ol className="space-y-14">
            {STEPS.map(s => (
              <li key={s.n} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
                  {s.n}
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900">{s.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The money flow — the thing carriers most need to understand */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900">
            Where the money actually goes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Two separate flows, and we keep them separate on purpose. Mixing them is how carriers
            end up unable to tell what they earned.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-accent-500/30 bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                Flow 1 — the freight
              </p>
              <p className="mt-3 text-xl font-bold text-ink-900">
                Broker → you
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                The broker pays the full gross for the load. It goes to you, or to your factoring
                company if you factor. <strong className="text-ink-900">We never touch it.</strong>{' '}
                We only issue the invoice in your name and chase it until it lands.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-brand-500/30 bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Flow 2 — our fee
              </p>
              <p className="mt-3 text-xl font-bold text-ink-900">
                You → Avantra
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                We bill you separately, on a statement listing every load we booked, what it
                grossed, and the fee on it. That is the only money we get, and it only exists on
                loads we actually found for you.
              </p>
            </div>
          </div>

          <p className="mt-8 text-slate-600">
            This is why you get two documents rather than a single net settlement. You can always
            answer &ldquo;what did I haul, and what did I pay for it&rdquo; without reverse-engineering
            anything.
          </p>
        </div>
      </section>

      {/* The legal basis — stated rather than glossed */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900">
            The paperwork that makes it legal
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            A dispatch service is an agent, not a carrier and not a broker. Two documents make
            that real, and we will not book a load before both are signed.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
                <FileSignature className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">Dispatch service agreement</h3>
              <p className="mt-2.5 leading-relaxed text-slate-600">
                Sets out what we do, what it costs, and that we act on your behalf rather than as a
                principal. It is what makes us your agent instead of a party to your freight.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">Limited power of attorney</h3>
              <p className="mt-2.5 leading-relaxed text-slate-600">
                Narrow, and limited on purpose: it lets us sign rate confirmations and issue
                invoices in your name. It does not give us access to your bank accounts and it does
                not let us bind you to anything outside dispatch.
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-3.5 rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <div>
              <p className="font-semibold text-amber-900">Read it before you sign it</p>
              <p className="mt-1.5 leading-relaxed text-amber-800">
                That goes for our agreement and anyone else&rsquo;s. If a dispatch service will not
                put the fee, the term, and the cancellation in writing, that tells you something.
                Nothing on this page is legal advice — have your own attorney look at anything you
                sign.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-brand-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Ready to see what we would find you?
          </h2>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Get a quote<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
