export type FacetValueType = 'text' | 'number' | 'boolean'

export type FacetDefinition = {
  key: string
  label: string
  type: FacetValueType
  unit?: string
  categorySlugs: readonly string[]
  maxOptions?: number
}

export const facetConfig = [
  { key: 'cable_size_mm2', label: 'Cable size', type: 'number', unit: 'mm²', categorySlugs: ['electrical-wiring'] },
  { key: 'cores', label: 'Number of cores', type: 'number', categorySlugs: ['electrical-wiring'] },
  { key: 'conductor', label: 'Conductor', type: 'text', categorySlugs: ['electrical-wiring'] },
  { key: 'cable_type', label: 'Product type', type: 'text', categorySlugs: ['electrical-wiring'] },
  { key: 'insulation', label: 'Insulation', type: 'text', categorySlugs: ['electrical-wiring'] },
  { key: 'color', label: 'Color', type: 'text', categorySlugs: ['electrical-wiring', 'switches-sockets', 'lighting-fans'] },
  { key: 'switch_type', label: 'Switch / socket type', type: 'text', categorySlugs: ['switches-sockets'] },
  { key: 'gang', label: 'Gang', type: 'number', categorySlugs: ['switches-sockets'] },
  { key: 'module_count', label: 'Module count', type: 'number', categorySlugs: ['switches-sockets'] },
  { key: 'amp_rating', label: 'Amp rating', type: 'number', unit: 'A', categorySlugs: ['switches-sockets', 'circuit-protection'] },
  { key: 'mount_type', label: 'Mount type', type: 'text', categorySlugs: ['switches-sockets', 'smart-electrical'] },
  { key: 'wattage', label: 'Wattage', type: 'number', unit: 'W', categorySlugs: ['lighting-fans'] },
  { key: 'color_temperature', label: 'Color temperature', type: 'number', unit: 'K', categorySlugs: ['lighting-fans'] },
  { key: 'base_type', label: 'Base type', type: 'text', categorySlugs: ['lighting-fans'] },
  { key: 'ip_rating', label: 'IP rating', type: 'text', categorySlugs: ['lighting-fans'] },
  { key: 'lumens', label: 'Brightness', type: 'number', unit: 'lm', categorySlugs: ['lighting-fans'] },
  { key: 'fan_size', label: 'Fan size', type: 'number', unit: 'in', categorySlugs: ['lighting-fans'] },
  { key: 'protection_type', label: 'Protection type', type: 'text', categorySlugs: ['circuit-protection'] },
  { key: 'poles', label: 'Poles', type: 'text', categorySlugs: ['circuit-protection'] },
  { key: 'curve', label: 'Trip curve', type: 'text', categorySlugs: ['circuit-protection'] },
  { key: 'breaking_capacity_ka', label: 'Breaking capacity', type: 'number', unit: 'kA', categorySlugs: ['circuit-protection'] },
  { key: 'rccb_sensitivity_ma', label: 'RCCB sensitivity', type: 'number', unit: 'mA', categorySlugs: ['circuit-protection'] },
  { key: 'voltage', label: 'Voltage', type: 'number', unit: 'V', categorySlugs: ['circuit-protection', 'electronics-repair', 'power-backup'] },
  { key: 'tool_type', label: 'Tool type', type: 'text', categorySlugs: ['tools-testers'] },
  { key: 'measurement_type', label: 'Measurement type', type: 'text', categorySlugs: ['tools-testers'] },
  { key: 'voltage_range', label: 'Voltage range', type: 'text', categorySlugs: ['tools-testers'] },
  { key: 'current_range', label: 'Current range', type: 'text', categorySlugs: ['tools-testers'] },
  { key: 'material', label: 'Material', type: 'text', categorySlugs: ['tools-testers'] },
  { key: 'component_type', label: 'Component type', type: 'text', categorySlugs: ['electronics-repair'] },
  { key: 'component_value', label: 'Component value', type: 'text', categorySlugs: ['electronics-repair'], maxOptions: 10 },
  { key: 'package_type', label: 'Package', type: 'text', categorySlugs: ['electronics-repair'] },
  { key: 'voltage_rating', label: 'Voltage rating', type: 'number', unit: 'V', categorySlugs: ['electronics-repair'] },
  { key: 'current_rating', label: 'Current rating', type: 'number', unit: 'A', categorySlugs: ['electronics-repair'] },
  { key: 'tolerance', label: 'Tolerance', type: 'text', categorySlugs: ['electronics-repair'] },
  { key: 'capacity_ah', label: 'Capacity', type: 'number', unit: 'Ah', categorySlugs: ['power-backup'] },
  { key: 'battery_chemistry', label: 'Battery chemistry', type: 'text', categorySlugs: ['power-backup'] },
  { key: 'output_current', label: 'Output current', type: 'number', unit: 'A', categorySlugs: ['power-backup'] },
  { key: 'cell_count', label: 'Cell count', type: 'number', unit: 'S', categorySlugs: ['power-backup'] },
  { key: 'connector_type', label: 'Connector type', type: 'text', categorySlugs: ['electronics-repair', 'power-backup'], maxOptions: 10 },
  { key: 'device_type', label: 'Device type', type: 'text', categorySlugs: ['lighting-fans', 'power-backup', 'smart-electrical'] },
  { key: 'protocol', label: 'Protocol', type: 'text', categorySlugs: ['smart-electrical'] },
  { key: 'load_rating', label: 'Load rating', type: 'text', categorySlugs: ['smart-electrical'] },
  { key: 'app_support', label: 'App support', type: 'boolean', categorySlugs: ['smart-electrical'] },
  { key: 'voice_assistant', label: 'Voice assistant', type: 'text', categorySlugs: ['smart-electrical'] },
  { key: 'required_group', label: 'Solution group', type: 'text', categorySlugs: ['home-solutions'] },
  { key: 'brand', label: 'Brand', type: 'text', categorySlugs: navigationCategorySlugs },
  { key: 'price', label: 'Price', type: 'number', unit: 'BDT', categorySlugs: navigationCategorySlugs },
] as const satisfies readonly FacetDefinition[]

export type FacetKey = (typeof facetConfig)[number]['key']
export type CatalogSort = 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'trending' | 'priority'

export const sortOptions: ReadonlyArray<{ value: CatalogSort; label: string }> = [
  { value: 'relevance', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest catalogue items' },
  { value: 'trending', label: 'Trending first' },
  { value: 'priority', label: 'Procurement priority' },
]

export const facetKeys = new Set<string>(facetConfig.map((facet) => facet.key))
export const sortKeys = new Set<string>(sortOptions.map((option) => option.value))
export const facetsForCategory = (categorySlug?: string) => categorySlug
  ? facetConfig.filter((facet) => facet.categorySlugs.includes(categorySlug as never))
  : facetConfig
import { navigationCategorySlugs } from '@/lib/catalog/navigation'
