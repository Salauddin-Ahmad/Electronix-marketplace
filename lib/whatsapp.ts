import type { Product } from '@/lib/data'
import { formatBDT } from '@/lib/currency'

export const WHATSAPP_NUMBER = '8801775297759'
export const WHATSAPP_DISPLAY_NUMBER = '+880 1775-297759'


const WHATSAPP_GAP = '\u200B'

type MessageLine = string | false | null | undefined

function createWhatsAppMessage(lines: MessageLine[]) {
  return lines
    .filter(
      (line): line is string =>
        typeof line === 'string' && line.length > 0,
    )
    .join('\n')
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildGeneralWhatsAppUrl() {
  const message = createWhatsAppMessage([
    'Hello VOLTRONIX,',

    WHATSAPP_GAP,

    'I need help with an electrical product or project.',

    WHATSAPP_GAP,

    'Could you please assist me with:',
    '1. Product availability',
    '2. Current pricing',
    '3. Estimated delivery time',
    '4. Delivery charge',

    WHATSAPP_GAP,

    'My delivery area/district: [Please add location]',

    WHATSAPP_GAP,

    'Thank you.',
  ])

  return buildWhatsAppUrl(message)
}

export function buildProductWhatsAppUrl(
  product: Product,
  productUrl?: string,
  quantity = 1,
) {
  const unit = product.availability.unit || 'pcs'

  const message = createWhatsAppMessage([
    'Hello VOLTRONIX,',

    WHATSAPP_GAP,

    'I am interested in this product:',

    WHATSAPP_GAP,

    `Product: ${product.name}`,
    `SKU: ${product.sku}`,
    `Category: ${product.category} / ${product.subcategory}`,
    `Quantity needed: ${quantity} ${unit}`,
    productUrl ? `Product page: ${productUrl}` : null,

    WHATSAPP_GAP,

    'Could you please confirm:',
    '1. Is this item currently available?',
    '2. What is the current price, and is it fixed?',
    '3. How long would delivery take to my area?',
    '4. What is the delivery charge?',

    WHATSAPP_GAP,

    'My delivery area/district: [Please add location]',

    WHATSAPP_GAP,

    'Thank you.',
  ])

  return buildWhatsAppUrl(message)
}

export function buildCartWhatsAppUrl(
  lines: ReadonlyArray<{
    product: Product
    qty: number
  }>,
) {
  const pricedSubtotal = lines.reduce((sum, { product, qty }) => {
    const price = product.pricing.sellingPrice

    return sum + (price === null ? 0 : price * qty)
  }, 0)

  const pricedLineCount = lines.filter(
    ({ product }) => product.pricing.sellingPrice !== null,
  ).length

  const quoteLineCount = lines.length - pricedLineCount

  const itemLines = lines.flatMap(({ product, qty }, index) => {
    const price = product.pricing.sellingPrice
    const unit = product.availability.unit || 'pcs'

    return [
      `${index + 1}. ${product.name}`,
      `SKU: ${product.sku}`,
      `Quantity: ${qty} ${unit}`,
      price === null
        ? 'Price: Please quote'
        : `Shown total: ${formatBDT(price * qty)}`,

      WHATSAPP_GAP,
    ]
  })

  const message = createWhatsAppMessage([
    'Hello VOLTRONIX,',

    WHATSAPP_GAP,

    'I would like a quotation for the following items:',

    WHATSAPP_GAP,

    ...itemLines,

    pricedLineCount > 0
      ? `Priced-item subtotal shown on the site: ${formatBDT(
          pricedSubtotal,
        )}`
      : null,

    quoteLineCount > 0
      ? `Items requiring a confirmed price: ${quoteLineCount}`
      : null,

    WHATSAPP_GAP,

    'Could you please confirm:',
    '1. Current availability for each item',
    '2. Final unit prices and any quantity-based rate',
    '3. Estimated delivery time',
    '4. Delivery charge',

    WHATSAPP_GAP,

    'My delivery area/district: [Please add location]',

    WHATSAPP_GAP,

    'Note: This is a quotation request, not a confirmed order.',

    WHATSAPP_GAP,

    'Thank you.',
  ])

  return buildWhatsAppUrl(message)
}
