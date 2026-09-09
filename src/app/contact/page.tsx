import type { Metadata } from 'next'
import { Mail, Phone, Clock, Check } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you run and where you are based. We will come back with what we ' +
    'can do for your truck and what it costs.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-950">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Tell us about your truck
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/75">
            The more you tell us up front, the more useful the first conversation is. No obligation
            and no call center — you will hear back from someone who dispatches.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ContactForm />

            <aside className="space-y-6">
              {(SITE.email || SITE.phone) && (
                <div className="rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Rather talk?
                  </h2>
                  <div className="mt-4 space-y-3">
                    {SITE.phone && (
                      <a
                        href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}
                        className="flex items-center gap-3 text-ink-900 hover:text-brand-600"
                      >
                        <Phone className="h-4 w-4 text-brand-500" aria-hidden />
                        <span className="font-medium">{SITE.phone}</span>
                      </a>
                    )}
                    {SITE.email && (
                      <a
                        href={`mailto:${SITE.email}`}
                        className="flex items-center gap-3 break-all text-ink-900 hover:text-brand-600"
                      >
                        <Mail className="h-4 w-4 text-brand-500" aria-hidden />
                        <span className="font-medium">{SITE.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <Clock className="h-4 w-4" aria-hidden />What happens next
                </h2>
                <ol className="mt-4 space-y-3.5">
                  {[
                    'We read what you sent and check your authority on the FMCSA record.',
                    'We come back with the lanes we think we can run and a fee quote.',
                    'If it works for you, we send the agreement and power of attorney.',
                    'Once signed, we start looking for your first load.',
                  ].map((t, i) => (
                    <li key={t} className="flex gap-3 text-sm text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-accent-500/25 bg-accent-50/40 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                  No catch
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'No setup fee',
                    'No monthly subscription',
                    'You keep your authority',
                    'Turn down any load',
                  ].map(t => (
                    <li key={t} className="flex gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
