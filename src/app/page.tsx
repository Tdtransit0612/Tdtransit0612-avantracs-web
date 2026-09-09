import Link from 'next/link'
import {
  ArrowRight, Check, FileText, Phone, ShieldCheck, Truck,
  Receipt, Eye, Lock, CalendarClock,
} from 'lucide-react'
import { SERVICES, DIFFERENTIATORS, STEPS, SITE } from '@/lib/site'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  dispatch:   <Truck className="h-5 w-5" aria-hidden />,
  paperwork:  <FileText className="h-5 w-5" aria-hidden />,
  collections:<Receipt className="h-5 w-5" aria-hidden />,
  compliance: <ShieldCheck className="h-5 w-5" aria-hidden />,
}

const DIFF_ICONS = [
  <Eye key="0" className="h-5 w-5" aria-hidden />,
  <Phone key="1" className="h-5 w-5" aria-hidden />,
  <Lock key="2" className="h-5 w-5" aria-hidden />,
  <CalendarClock key="3" className="h-5 w-5" aria-hidden />,
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-xs font-medium text-brand-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              A dispatch service — not a broker
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
              You drive.
              <br />
              <span className="text-brand-400">We handle the rest.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100/75">
              Finding the load is the easy part. It is the rate con, the BOL, the invoice, the
              broker who pays in 60 days, and the IFTA filing you forgot that eat your evenings.
              Avantra takes all of it — under your authority, in your name.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Get a quote<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                See how it works
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-brand-100/65">
              {[
                'You keep your MC and DOT',
                'Freight money goes to you, not us',
                'Turn down any load',
              ].map(t => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── The problem, named plainly ────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                The truck is the business. The paperwork is the tax.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Most owner-operators do not lose money on the road. They lose it in the hours
                after — negotiating a rate while tired, invoicing three days late, letting a
                60-day-old receivable sit because chasing it means another phone call.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                We do that part full-time, for a fee that comes out of loads we actually booked
                for you.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                What that looks like in a week
              </h3>
              <ul className="mt-5 space-y-4">
                {[
                  ['Hours on load boards', 'We source and negotiate. You get the rate con.'],
                  ['Invoices sent late', 'Invoiced the day the POD lands.'],
                  ['Receivables nobody chased', 'Worked weekly, every attempt logged.'],
                  ['A filing that quietly expired', 'Swept daily. You hear about it weeks early.'],
                ].map(([before, after]) => (
                  <li key={before} className="flex gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-400 line-through">{before}</p>
                      <p className="mt-0.5 text-sm font-medium text-ink-900">{after}</p>
                    </div>
                    <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Everything between the load board and the bank
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Four services, and you can use all of them or just the dispatch.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {SERVICES.map(s => (
              <div
                key={s.key}
                id={s.key}
                className="scroll-mt-24 rounded-2xl border border-slate-200 p-7 transition-shadow hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
                  {SERVICE_ICONS[s.key]}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map(p => (
                    <li key={p} className="flex gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us — every claim backed by the software ───────────────────── */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Run on our own software, so nothing is hidden
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-brand-100/70">
            We built the system we dispatch you from. That is why we can promise these
            specifically — they are properties of the software, not of our good intentions.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={d.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <div className="inline-flex rounded-xl bg-brand-500/15 p-3 text-brand-300">
                  {DIFF_ICONS[i]}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-2.5 leading-relaxed text-brand-100/70">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            How it works
          </h2>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(s => (
              <li key={s.n} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/how-it-works"
            className="mt-10 inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
          >
            The longer version<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-brand-50">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Tell us about your truck
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            What you run, where you are based, and the lanes you want. We will come back with what
            we can do and what it costs — no obligation, and no call center.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Get a quote<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {SITE.phone && (
            <p className="mt-5 text-sm text-slate-500">
              Or call{' '}
              <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} className="font-semibold text-brand-700 hover:underline">
                {SITE.phone}
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  )
}
