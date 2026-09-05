'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductWhatsAppButton } from '@/components/product-whatsapp-button'
import type { Product } from '@/lib/catalog/types'

const MAX_QUANTITY = 99

export function ProductPurchaseActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const quantityLabel = product.pricing.sellingPrice === null ? 'Quantity needed' : 'Quantity'

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-3 sm:justify-start">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{quantityLabel}</span>
        <div className="inline-flex items-center border border-slate-300 bg-white" role="group" aria-label={`${product.name} quantity`}>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity === 1}
            className="grid size-10 place-items-center text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
            aria-label={`Decrease ${product.name} quantity`}
          >
            <Minus size={15} aria-hidden="true" />
          </button>
          <output className="grid min-w-11 place-items-center border-x border-slate-300 px-2 text-sm font-bold tabular-nums" aria-live="polite">
            {quantity}
          </output>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.min(MAX_QUANTITY, current + 1))}
            disabled={quantity === MAX_QUANTITY}
            className="grid size-10 place-items-center text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
            aria-label={`Increase ${product.name} quantity`}
          >
            <Plus size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <AddToCartButton product={product} quantity={quantity} electric className="min-h-11 w-full" />
        <div className="[&>button]:h-full [&>button]:min-h-11 [&>button]:w-full">
          <ProductWhatsAppButton product={product} quantity={quantity} />
        </div>
      </div>
    </div>
  )
}
