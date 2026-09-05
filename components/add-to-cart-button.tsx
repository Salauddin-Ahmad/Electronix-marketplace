'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Product } from '@/lib/catalog/types'
import { useCart } from '@/components/cart-provider'

export function AddToCartButton({
  product,
  className = '',
  compact = false,
  electric = false,
  quantity = 1,
}: {
  product: Product
  className?: string
  compact?: boolean
  electric?: boolean
  quantity?: number
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const [feedbackKey, setFeedbackKey] = useState(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const baseClassName = `inline-flex items-center justify-center gap-2 font-bold text-white ${compact ? 'px-3 py-2 text-sm' : 'px-5 py-3 text-sm'} ${className}`
  const feedbackButtonClassName = `${baseClassName} ${electric ? 'min-w-[10.5rem]' : ''} bg-brand-500 focus:outline-none focus-visible:brightness-95`
  const isQuoteItem = product.pricing.sellingPrice === null
  const label = isQuoteItem ? (compact ? 'Quote' : 'Add to quote list') : 'Add to cart'
  const addedLabel = compact ? 'Added' : isQuoteItem ? 'Added to quote list' : 'Added to cart'
  const iconSize = compact ? 15 : 17
  const safeQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const handleAdd = () => {
    add(product, safeQuantity)
    setAdded(true)
    setFeedbackKey((value) => value + 1)
    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setAdded(false), 1350)
  }

  const content = (
    <>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={added ? `added-${feedbackKey}` : 'idle'}
          className="inline-flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
        >
          {added ? <Check size={iconSize} strokeWidth={2.6} aria-hidden="true" /> : <ShoppingCart size={iconSize} aria-hidden="true" />}
          {added ? addedLabel : label}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{added ? `${safeQuantity} ${product.name} ${isQuoteItem ? 'added to the quote list' : 'added to cart'}` : ''}</span>
    </>
  )

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      className={feedbackButtonClassName}
      aria-label={added ? `${safeQuantity} ${product.name} ${isQuoteItem ? 'added to the quote list' : 'added to cart'}` : isQuoteItem ? `Add ${safeQuantity} ${product.name} to the quote list` : `Add ${safeQuantity} ${product.name} to cart`}
      initial={false}
      animate={{ backgroundColor: added ? '#1e3a5f' : '#2563eb' }}
      whileHover={{ y: -1, boxShadow: compact ? '0 5px 12px rgba(15, 35, 65, 0.16)' : '0 7px 16px rgba(15, 35, 65, 0.18)' }}
      whileTap={{ scale: 0.975, y: 0, boxShadow: '0 2px 6px rgba(15, 35, 65, 0.14)' }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
    >
      {content}
    </motion.button>
  )
}
