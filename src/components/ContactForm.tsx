'use client'

import { useState } from 'react'
import { Loader2, Send, CheckCircle2, AlertTriangle } from 'lucide-react'

const EQUIPMENT = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Hotshot', 'Box Truck', 'Other']

const BLANK = {
  name: '', company: '', email: '', phone: '',
  mc_number: '', equipment: '', trucks: '', message: '',
  website: '',   // honeypot — must stay empty
}

export default function ContactForm() {
  const [f, setF] = useState({ ...BLANK })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = <K extends keyof typeof BLANK>(k: K, v: string) => setF(s => ({ ...s, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending'); setError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      })
      const json = await res.json().catch(() => ({})) as { error?: string }
      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
        setState('error')
        return
      }
      setState('sent')
      setF({ ...BLANK })
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div
        className="rounded-2xl border-2 border-accent-500/30 bg-accent-50/50 p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent-600" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold text-ink-900">Got it</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Your details are in our queue. We will come back to you with what we can do and what it
          costs — usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Send another
        </button>
      </div>
    )
  }

  const input =
    'mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] text-ink-900 ' +
    'outline-none transition-colors placeholder:text-slate-400 ' +
    'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
  const label = 'text-sm font-medium text-ink-900'

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={f.website} onChange={e => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name *</label>
          <input id="name" required className={input} value={f.name}
            onChange={e => set('name', e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="company" className={label}>Company</label>
          <input id="company" className={input} value={f.company}
            onChange={e => set('company', e.target.value)} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" type="email" required className={input} value={f.email}
            onChange={e => set('email', e.target.value)} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" type="tel" className={input} value={f.phone}
            onChange={e => set('phone', e.target.value)} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="mc" className={label}>MC number</label>
          <input id="mc" className={input} value={f.mc_number}
            onChange={e => set('mc_number', e.target.value)} placeholder="If you have one yet" />
        </div>
        <div>
          <label htmlFor="trucks" className={label}>How many trucks</label>
          <input id="trucks" type="number" min="1" className={input} value={f.trucks}
            onChange={e => set('trucks', e.target.value)} placeholder="1" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="equipment" className={label}>What you run</label>
          <select id="equipment" className={input} value={f.equipment}
            onChange={e => set('equipment', e.target.value)}>
            <option value="">Select equipment</option>
            {EQUIPMENT.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Anything else</label>
          <textarea id="message" rows={5} className={input} value={f.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Lanes you want, home time, what is not working with your current setup — whatever helps us give you a straight answer." />
        </div>
      </div>

      {state === 'error' && (
        <div
          className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending'
          ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Sending…</>
          : <><Send className="h-4 w-4" aria-hidden />Send</>}
      </button>

      <p className="mt-4 text-xs text-slate-500">
        We use this to get back to you about dispatch services. We do not sell or share it, and we
        will not add you to a mailing list.
      </p>
    </form>
  )
}
