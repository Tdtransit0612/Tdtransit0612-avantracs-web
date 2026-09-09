'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Compass, Menu, X, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'

const LINKS = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/60 bg-ink-950/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <Compass className="h-6 w-6 text-brand-400" aria-hidden />
          <span className="text-[15px] font-bold tracking-tight text-white">
            Avantra<span className="ml-1.5 font-normal text-brand-200/70">Carrier Services</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-brand-100/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SITE.appUrl}
            className="ml-2 rounded-md px-3 py-2 text-sm text-brand-100/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            Client login
          </a>
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Get a quote<ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto rounded-md p-2 text-brand-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-800/60 bg-ink-950 px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-brand-100/80 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={SITE.appUrl}
              className="rounded-md px-3 py-2.5 text-sm text-brand-100/80 hover:bg-white/5 hover:text-white"
            >
              Client login
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Get a quote<ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
