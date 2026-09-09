# Avantra Carrier Services — marketing site

The public site at **avantracs.com**. The TMS is a separate project and deploy at
**avantracs.app** (repo: `Tdtransit0612/Avantra`).

## Why it is a separate project

Two domains, two risk profiles. This site is fully public, ships no auth and no
browser-side database client, and can be edited and redeployed without touching
the system that runs the business. A bad marketing deploy cannot take dispatch
down.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4. No analytics, no
tracking pixels, no cookie banner — because there are no tracking cookies.

> **This is NOT the Next.js you know.** Same heavily-versioned Next 16 as the TMS.
> Read the vendored guides in `node_modules/next/dist/docs/` before writing route
> or config code.

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Content lives in one file

`src/lib/site.ts` holds every claim the site makes — services, differentiators,
steps, FAQ, and pricing. Edit there and every page updates.

Anything marked `TODO` in that file is a real-world fact that cannot be invented:

| TODO | Where | Effect while blank |
|---|---|---|
| Pricing rate | `PRICING.published` / `.rate` | Pricing page says "a percentage of gross, quoted per carrier" and pushes to the quote form |
| Contract terms | `PRICING.contractTerms` | Line is omitted rather than claimed |
| Contact email / phone | `NEXT_PUBLIC_CONTACT_*` | Contact blocks are hidden rather than showing a fake number |
| Company story | `src/app/about/page.tsx` | Renders a generic but true version |

No testimonials, customer counts, or "trusted by N carriers" claims appear
anywhere, deliberately. Add them only when they are real.

## Lead capture

The contact form POSTs to `/api/lead`, which writes into the **same Supabase
project the TMS uses** so an enquiry lands in the dispatch queue rather than an
inbox. Requires migration `20260908_07_leads.sql` in the TMS repo.

The service key is used in that route and nowhere else — this site creates no
browser-side Supabase client, so the `leads` table has no public write surface.
Spam control is a honeypot field plus an in-memory rate limit.

If Supabase is unconfigured the form still succeeds provided Resend is set up,
because losing a lead to a missing env var is the worst outcome available.

## Deploy

Its own Vercel project, `avantracs.com`. `git push` → auto-deploy.

Build gate: `npm run typecheck` and `npm run build` must both pass.
