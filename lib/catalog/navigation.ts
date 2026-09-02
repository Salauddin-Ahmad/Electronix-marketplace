export const navigationCategories = [
  {
    name: 'Electrical & Wiring',
    slug: 'electrical-wiring',
    sourceCategories: ['House Wiring & Cable'],
    desc: 'Wiring, cable and electrical installation essentials.',
  },
  {
    name: 'Switches & Sockets',
    slug: 'switches-sockets',
    sourceCategories: ['Switch, Socket & Electrical Accessories'],
    desc: 'Switches, sockets and everyday electrical accessories.',
  },
  {
    name: 'Lighting & Fans',
    slug: 'lighting-fans',
    sourceCategories: ['LED Lighting', 'Fan & Fan Spare Parts'],
    desc: 'Lighting products, fans and replacement fan parts.',
  },
  {
    name: 'Circuit Protection',
    slug: 'circuit-protection',
    sourceCategories: ['MCB, RCCB & Protection'],
    desc: 'MCBs, RCCBs and protection hardware.',
  },
  {
    name: 'Tools & Testers',
    slug: 'tools-testers',
    sourceCategories: ['Hand Tools', 'Multimeter & Test Equipment'],
    desc: 'Hand tools and electrical test equipment.',
  },
  {
    name: 'Electronics & Repair',
    slug: 'electronics-repair',
    sourceCategories: ['Soldering & Repair', 'Basic Electronic Components', 'Relay, Switch & Connector'],
    desc: 'Repair tools, soldering supplies and components.',
  },
  {
    name: 'Power & Backup',
    slug: 'power-backup',
    sourceCategories: ['Plugs, Adapters & Power Supply', 'Battery, Charging & BMS', 'DC-DC Converter Modules'],
    desc: 'Adapters, power supplies, batteries and charging modules.',
  },
  {
    name: 'Smart Electrical',
    slug: 'smart-electrical',
    sourceCategories: ['Smart Home & Automation', 'Arduino / ESP / DIY', 'Breadboard & Prototyping'],
    desc: 'Smart home, automation and DIY electronics.',
  },
  {
    name: 'Home Solutions',
    slug: 'home-solutions',
    sourceCategories: ['Enclosure & Small Hardware', 'CCTV & Low-Voltage Accessories', 'Electrical Consumables'],
    desc: 'Practical hardware and low-voltage home solutions.',
  },
] as const

export type NavigationCategory = (typeof navigationCategories)[number]
export type NavigationCategorySlug = NavigationCategory['slug']

export const navigationCategorySlugs = navigationCategories.map((category) => category.slug)

export const navigationLinks = navigationCategories.map((category) =>
  [category.name, `/category/${category.slug}`] as const,
)

export function getNavigationCategory(slug: string) {
  return navigationCategories.find((category) => category.slug === slug)
}

export function getNavigationCategoryForSource(sourceCategory: string) {
  return navigationCategories.find((category) =>
    category.sourceCategories.some((candidate) => candidate === sourceCategory),
  )
}
