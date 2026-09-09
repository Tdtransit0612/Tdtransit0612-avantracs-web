import Link from 'next/link'
import { Compass, Mail, Phone } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-800/60 bg-ink-950 text-brand-100/70">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Compass className="h-6 w-6 text-brand-400" aria-hidden />
              <span className="text-[15px] font-bold tracking-tight text-white">{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Dispatch and back-office services for owner-operators and small fleets. We work as
              your agent — you keep your authority, your freight, and your money.
            </p>

            {(SITE.email || SITE.phone) && (
              <div className="mt-5 space-y-2 text-sm">
                {SITE.email && (
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                    <Mail className="h-4 w-4" aria-hidden />{SITE.email}
                  </a>
                )}
                {SITE.phone && (
                  <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 hover:text-white">
                    <Phone className="h-4 w-4" aria-hidden />{SITE.phone}
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/what-we-do#dispatch" className="hover:text-white">Dispatch</Link></li>
              <li><Link href="/what-we-do#paperwork" className="hover:text-white">Paperwork &amp; invoicing</Link></li>
              <li><Link href="/what-we-do#collections" className="hover:text-white">Getting you paid</Link></li>
              <li><Link href="/what-we-do#compliance" className="hover:text-white">Compliance &amp; filings</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><a href={SITE.appUrl} className="hover:text-white">Client login</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-800/60 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>

        {/* Stated plainly because it is the legal basis of the whole service, and
            carriers are right to check it before signing anything. */}
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-brand-100/45">
          Avantra Carrier Services is a dispatch service, not a freight broker. We hold no broker
          authority and never take freight into our own name. We act as your agent under a written
          dispatch agreement and limited power of attorney; you remain the motor carrier of record
          on every load, and freight payments are made to you or your factoring company.
        </p>
      </div>
    </footer>
  )
}
