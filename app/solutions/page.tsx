'use client'

import { useState } from 'react'
import { ArrowUpRight, FileText, MessageCircle } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { buildProjectQuoteWhatsAppUrl } from '@/lib/whatsapp'

type ProjectQuoteForm = {
  name: string
  phone: string
  location: string
  projectType: string
  requirements: string
}

const initialForm: ProjectQuoteForm = {
  name: '',
  phone: '',
  location: '',
  projectType: 'New Home',
  requirements: '',
}

export default function SolutionsPage() {
  const [form, setForm] = useState<ProjectQuoteForm>(initialForm)
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false)

  function updateField(field: keyof ProjectQuoteForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget
    if (!formElement.reportValidity()) return

    setIsOpeningWhatsApp(true)
    window.open(buildProjectQuoteWhatsAppUrl(form), '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setIsOpeningWhatsApp(false), 700)
  }

  return (
    <div>
      <SiteHeader />
      <main>
        <section className="bg-[#242725] text-white">
          <div className="container-shell grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="technical-label text-yellow">Home & Building Solutions</div>
              <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Building or renovating?</h1>
              <p className="mt-5 max-w-xl text-lg text-white/75">Tell us what you need. We&apos;ll prepare a WhatsApp-ready project supply request for our team.</p>
              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                {['New Home', 'Apartment', 'Shop', 'Office', 'Renovation', 'Commercial Project'].map((item) => (
                  <div key={item} className="border border-white/15 px-4 py-3">{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[4px] bg-white p-6 text-ink">
              <div className="technical-label text-brand-500">Request support</div>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <FormField label="Name" value={form.name} onChange={(value) => updateField('name', value)} autoComplete="name" required />
                <FormField label="Phone" value={form.phone} onChange={(value) => updateField('phone', value)} type="tel" inputMode="tel" autoComplete="tel" required />
                <FormField label="Project location / district" value={form.location} onChange={(value) => updateField('location', value)} autoComplete="address-level2" required />
                <label className="block text-sm font-semibold">
                  Project type
                  <select value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)} className="mt-1 w-full border border-line px-3 py-3">
                    <option>New Home</option>
                    <option>Apartment</option>
                    <option>Shop</option>
                    <option>Office</option>
                    <option>Renovation</option>
                    <option>Commercial Project</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold">
                  Requirements
                  <textarea value={form.requirements} onChange={(event) => updateField('requirements', event.target.value)} required className="mt-1 min-h-24 w-full border border-line px-3 py-3" placeholder="Tell us what you need, including quantities if known." />
                </label>
                <div className="flex items-start gap-3 border border-dashed border-line bg-panel p-4 text-sm leading-5 text-[#59605a]">
                  <FileText size={19} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />
                  <span>Have a BOQ, BOM or product list? Attach it in WhatsApp after the draft opens. This page does not upload or store documents.</span>
                </div>
                <button type="submit" disabled={isOpeningWhatsApp} className="inline-flex w-full items-center justify-center gap-2 bg-yellow py-3.5 font-bold transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70">
                  <MessageCircle size={18} aria-hidden="true" />
                  {isOpeningWhatsApp ? 'Opening WhatsApp…' : 'Continue on WhatsApp'}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
                <p className="text-center text-xs leading-5 text-[#666b65]" aria-live="polite">Review and send the draft in WhatsApp to submit your request.</p>
              </form>
            </div>
          </div>
        </section>

        <section className="container-shell py-14">
          <h2 className="font-display text-3xl font-bold">How it works</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {['Tell us about your project', 'Share your requirements', 'Get recommendations', 'Receive your quote'].map((item, index) => (
              <div className="border border-line p-6" key={item}>
                <div className="font-display text-3xl font-bold text-brand-500">0{index + 1}</div>
                <div className="mt-3 font-semibold">{item}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function FormField({ label, value, onChange, type = 'text', required = false, autoComplete, inputMode }: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: React.HTMLInputTypeAttribute
  required?: boolean
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} inputMode={inputMode} required={required} className="mt-1 w-full border border-line px-3 py-3" />
    </label>
  )
}
