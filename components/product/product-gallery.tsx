'use client'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/catalog/types'

export function ProductGallery({ product }: { product: Product }) {
  const images = Array.from(new Set([
    product.images.primary ?? '/placeholder.svg',
    ...product.images.gallery,
  ]))
  const [activeImage, setActiveImage] = useState(images[0])
  const isIllustrative = activeImage.includes('/products/generated/') || activeImage.includes('dummy-product') || activeImage.includes('placeholder')

  return (
    <section aria-label={`${product.name} product images`}>
      <div className="relative min-h-[360px] overflow-hidden border border-slate-200 bg-[#f1f2ef] sm:min-h-[460px] lg:min-h-[520px]">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-contain p-8 sm:p-12"
        />
        {isIllustrative ? (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 border border-slate-200/90 bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-600 backdrop-blur-sm">
            <ImageIcon size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
            Illustrative catalogue image — verify the exact model before ordering
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Choose product image">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeImage === image}
              className={`relative size-20 shrink-0 border bg-[#f1f2ef] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${activeImage === image ? 'border-brand-500' : 'border-slate-200 hover:border-slate-400'}`}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}
