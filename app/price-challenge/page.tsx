'use client'

import { useState } from 'react'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { buildPriceChallengeWhatsAppUrl } from '@/lib/whatsapp'

type PriceChallengeForm = {
  name: string
  phone: string
  productName: string
  brand: string
  sku: string
  competitorPrice: string
  productLink: string
  notes: string
}

const initialForm: PriceChallengeForm = {
  name: '',
  phone: '',
  productName: '',
  brand: '',
  sku: '',
  competitorPrice: '',
  productLink: '',
  notes: '',
}

export default function PriceChallengePage() {
  const [form, setForm] = useState<PriceChallengeForm>(initialForm)
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false)

  function updateField(field: keyof PriceChallengeForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget
    if (!formElement.reportValidity()) return

    setIsOpeningWhatsApp(true)
    window.open(buildPriceChallengeWhatsAppUrl(form), '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setIsOpeningWhatsApp(false), 700)
  }

  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-14">
        <div className="mx-auto max-w-3xl">
          <div className="technical-label text-brand-500">Price Challenge</div>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Found a better price?</h1>
          <p className="mt-4 text-lg text-[#656a64]">
            Share the item and competing price. We&apos;ll open WhatsApp with a clear request you can review and send directly to our team.
          </p>

          <div className="mt-8 border border-line bg-white p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <FormField label="Your name" value={form.name} onChange={(value) => updateField('name', value)} autoComplete="name" required />
              <FormField label="Phone number" value={form.phone} onChange={(value) => updateField('phone', value)} autoComplete="tel" inputMode="tel" type="tel" required />
              <FormField label="Product name" value={form.productName} onChange={(value) => updateField('productName', value)} required />
              <FormField label="Competitor price" value={form.competitorPrice} onChange={(value) => updateField('competitorPrice', value)} inputMode="decimal" placeholder="Example: ৳ 1,250" required />
              <FormField label="Brand (optional)" value={form.brand} onChange={(value) => updateField('brand', value)} />
              <FormField label="Model / SKU (optional)" value={form.sku} onChange={(value) => updateField('sku', value)} />
              <FormField label="Product link (optional)" value={form.productLink} onChange={(value) => updateField('productLink', value)} type="url" placeholder="https://" full />
              <label className="text-sm font-semibold sm:col-span-2">
                Notes (optional)
                <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} className="mt-1 min-h-28 w-full border border-line px-3 py-3" placeholder="Colour, size, quantity or any detail that helps us check the item." />
              </label>

              <div className="sm:col-span-2 border border-dashed border-line bg-panel px-4 py-3 text-sm leading-5 text-[#59605a]">
                Have a competitor screenshot? After WhatsApp opens, attach it there. This form does not upload or store files.
              </div>

              <button type="submit" disabled={isOpeningWhatsApp} className="inline-flex items-center justify-center gap-2 bg-yellow px-5 py-3.5 font-bold transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
                <MessageCircle size={18} aria-hidden="true" />
                {isOpeningWhatsApp ? 'Opening WhatsApp…' : 'Continue on WhatsApp'}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <p className="text-center text-xs leading-5 text-[#666b65] sm:col-span-2" aria-live="polite">
                A pre-filled draft opens in WhatsApp. Your request is sent only after you review and send that message.
              </p>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function FormField({ label, value, onChange, full = false, type = 'text', required = false, autoComplete, inputMode, placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  full?: boolean
  type?: React.HTMLInputTypeAttribute
  required?: boolean
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  placeholder?: string
}) {
  return (
    <label className={full ? 'text-sm font-semibold sm:col-span-2' : 'text-sm font-semibold'}>
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder} required={required} className="mt-1 w-full border border-line px-3 py-3" />
    </label>
  )
}
