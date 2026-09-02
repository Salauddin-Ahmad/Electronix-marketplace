import type { Product } from '@/lib/data'

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

export function buildProductWhatsAppUrl(product: Product, productUrl?: string) {
  return buildWhatsAppUrl([
    'Hello VOLTRONIX,',
    '',
    'I am interested in this product:',
    `Product: ${product.name}`,
    `SKU: ${product.sku}`,
    `Category: ${product.category} / ${product.subcategory}`,
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
