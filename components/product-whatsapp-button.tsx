'use client'

import { MessageCircle } from 'lucide-react'
import type { Product } from '@/lib/catalog/types'
import { buildProductWhatsAppUrl } from '@/lib/whatsapp'

export function ProductWhatsAppButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  function openWhatsApp() {
    const url = buildProductWhatsAppUrl(product, window.location.href, quantity)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={openWhatsApp}
      className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-bold text-[#0b2e18] transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#128c4a] focus:ring-offset-2"
      aria-label={`Ask about ${product.name} on WhatsApp`}
    >
      <MessageCircle size={17} aria-hidden="true" />
      Ask on WhatsApp
    </button>
  )
}
