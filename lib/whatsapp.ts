import type { Product } from '@/lib/data'
import { formatBDT } from '@/lib/currency'

export const WHATSAPP_NUMBER = '8801775297759'
export const WHATSAPP_DISPLAY_NUMBER = '+880 1775-297759'

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildGeneralWhatsAppUrl() {
  return buildWhatsAppUrl([
    'Hello VOLTRONIX,',
    '',
    'I need help with an electrical product or project.',
    'Could you please assist me with availability, current pricing, and delivery time?',
    '',
    'Thank you.',
  ].join('\n'))
}

export function buildProductWhatsAppUrl(product: Product, productUrl?: string, quantity = 1) {
  return buildWhatsAppUrl([
    'Hello VOLTRONIX,',
    '',
    'I am interested in this product:',
    `Product: ${product.name}`,
    `SKU: ${product.sku}`,
    `Category: ${product.category} / ${product.subcategory}`,
    `Quantity needed: ${quantity} ${product.availability.unit || 'pcs'}`,
    productUrl ? `Product page: ${productUrl}` : '',
    '',
    'Could you please confirm:',
    '1. Is this item currently available?',
    '2. What is the current price, and is it fixed?',
    '3. How long would delivery take to my area?',
    '4. What is the delivery charge?',
    '',
    'My delivery area/district: [Please add location]',
    '',
    'Thank you.',
  ].filter(Boolean).join('\n'))
}

export function buildCartWhatsAppUrl(lines: ReadonlyArray<{ product: Product; qty: number }>) {
  const pricedSubtotal = lines.reduce((sum, { product, qty }) => {
    const price = product.pricing.sellingPrice
    return sum + (price === null ? 0 : price * qty)
  }, 0)
  const pricedLineCount = lines.filter(({ product }) => product.pricing.sellingPrice !== null).length
  const quoteLineCount = lines.length - pricedLineCount
  const itemLines = lines.flatMap(({ product, qty }, index) => {
    const price = product.pricing.sellingPrice
    return [
      `${index + 1}. ${product.name}`,
      `   SKU: ${product.sku}`,
      `   Quantity: ${qty} ${product.availability.unit || 'pcs'}`,
      `   ${price === null ? 'Price: Please quote' : `Shown total: ${formatBDT(price * qty)}`}`,
    ]
  })

  return buildWhatsAppUrl([
    'Hello VOLTRONIX,',
    '',
    'I would like a quotation for these items:',
    '',
    ...itemLines,
    '',
    pricedLineCount ? `Priced-item subtotal shown on the site: ${formatBDT(pricedSubtotal)}` : '',
    quoteLineCount ? `Items requiring a confirmed price: ${quoteLineCount}` : '',
    '',
    'Could you please confirm:',
    '1. Current availability for each item',
    '2. Final unit prices and any quantity-based rate',
    '3. Estimated delivery time and delivery charge',
    '',
    'My delivery area/district: [Please add location]',
    '',
    'This is a quotation request, not a confirmed order.',
    'Thank you.',
  ].filter(Boolean).join('\n'))
}
