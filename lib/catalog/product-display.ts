import type { Product, StockMode } from '@/lib/catalog/types'

export type ProductFact = {
  label: string
  value: string
}

const ATTRIBUTE_LABELS: Record<string, string> = {
  amp_rating: 'Rated current',
  cable_size_mm2: 'Cable size',
  cable_type: 'Cable type',
  cell_count: 'Cell configuration',
  component_type: 'Component type',
  component_value: 'Component value',
  connector_type: 'Connector type',
  cores: 'Number of cores',
  device_type: 'Device type',
  gang: 'Gang',
  measurement_type: 'Measurement type',
  poles: 'Poles',
  protection_type: 'Protection type',
  protocol: 'Protocol',
  required_group: 'Product group',
  switch_type: 'Switch type',
  tool_type: 'Tool type',
  voltage: 'Voltage',
}

function formatLabel(key: string) {
  return ATTRIBUTE_LABELS[key] ?? key
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatValue(key: string, value: string | number | boolean | string[]) {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (key === 'amp_rating') return `${value} A`
  if (key === 'cable_size_mm2') return `${value} mm²`
  if (key === 'cell_count') return `${value}S`
  if (key === 'voltage') return `${value} V`
  return String(value)
}

export function getTechnicalFacts(product: Product): ProductFact[] {
  const rows: ProductFact[] = []

  Object.entries(product.attributes ?? {}).forEach(([key, value]) => {
    rows.push({ label: formatLabel(key), value: formatValue(key, value) })
  })

  const existingLabels = new Set(rows.map((row) => row.label.toLowerCase()))
  Object.entries(product.specifications).forEach(([key, value]) => {
    if (value === null) return
    const label = formatLabel(key)
    if (existingLabels.has(label.toLowerCase())) return
    existingLabels.add(label.toLowerCase())
    rows.push({ label, value })
  })

  return rows
}

export function getProductFacts(product: Product): ProductFact[] {
  const identityFacts: ProductFact[] = [
    { label: 'SKU', value: product.sku },
    { label: 'Catalogue group', value: product.category },
    { label: 'Product type', value: product.subcategory },
    { label: 'Order unit', value: product.availability.unit || 'pcs' },
  ]

  if (product.brand) identityFacts.splice(1, 0, { label: 'Brand', value: product.brand })
  return [...identityFacts, ...getTechnicalFacts(product)]
}

export function getProductSummary(product: Product) {
  const isSourcePlaceholder = product.description.startsWith('A catalogue item listed in the source')
  if (!isSourcePlaceholder) return product.description

  return `Catalogued under ${product.category} / ${product.subcategory}. Confirm the exact brand, technical fit and current supply details before ordering.`
}

export function getAvailabilityText(product: Product) {
  if (product.availability.inStock === true) return 'Listed as available — confirm current stock'
  if (product.availability.inStock === false) return 'Currently unavailable — ask about restocking'
  return 'Availability requires confirmation'
}

export function stockLabel(mode: StockMode) {
  return mode === 'order' ? 'Order on request' : 'Confirm availability'
}
