import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/site'
import './globals.css'

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    'Truck dispatch and back-office services for owner-operators and small fleets. ' +
    'We source your freight, handle the paperwork, invoice the broker in your name, ' +
    'chase the money, and keep your compliance current. You keep your authority.',
  keywords: [
    'truck dispatch service', 'owner operator dispatch', 'freight dispatching',
    'carrier back office', 'trucking invoicing', 'IFTA filing', 'MC authority',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      'Dispatch, paperwork, invoicing, collections and compliance for owner-operators ' +
      'and small fleets. You keep your authority and your freight money.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'Dispatch and back office for owner-operators and small fleets.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        {/* Keyboard users land here first; the nav is long on mobile. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
