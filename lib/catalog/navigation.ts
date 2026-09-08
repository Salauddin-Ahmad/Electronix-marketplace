import { gadgetSourceCategories } from '@/lib/catalog/gadget-seed-data'

const leafNavigationCategories = [
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
  {
    name: 'Mobile Accessories',
    slug: 'mobile-accessories',
    sourceCategories: [gadgetSourceCategories.mobileAccessories],
    desc: 'Phone cases, screen protection and compatible mobile essentials.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
  {
    name: 'Charging & Power',
    slug: 'charging-power',
    sourceCategories: [gadgetSourceCategories.chargingPower],
    desc: 'Charging accessories and portable power for everyday devices.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
  {
    name: 'Computer & Desk',
    slug: 'computer-desk',
    sourceCategories: [gadgetSourceCategories.computerDesk],
    desc: 'Practical computer peripherals and desk setup accessories.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
  {
    name: 'Wearables & Personal Care',
    slug: 'wearables-personal-care',
    sourceCategories: [gadgetSourceCategories.wearablesPersonalCare],
    desc: 'Wearables and rechargeable personal-care devices.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
  {
    name: 'Portable Fans & Lights',
    slug: 'portable-fans-lights',
    sourceCategories: [gadgetSourceCategories.portableFansLights],
    desc: 'Rechargeable fans and portable lighting for personal use.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
  {
    name: 'Device Care & Utility',
    slug: 'device-care-utility',
    sourceCategories: [gadgetSourceCategories.deviceCareUtility],
    desc: 'Cleaning and utility essentials for devices and workspaces.',
    section: 'gadgets',
    isHub: false,
    navVisible: false,
  },
] as const

// Hubs and navigation groups derive their membership from these leaf categories.
export const electricalCategories = leafNavigationCategories.filter(
  (category) => !('section' in category && category.section === 'gadgets'),
)

export const gadgetCategories = leafNavigationCategories.filter(
  (category) => 'section' in category && category.section === 'gadgets',
)

const electricalHub = {
  name: 'Electrical',
  slug: 'electrical',
  sourceCategories: [...new Set(electricalCategories.flatMap((category) => [...category.sourceCategories]))],
  desc: 'Electrical supplies, electronics, tools and project essentials.',
  section: 'electrical',
  isHub: true,
  navVisible: false,
} as const

const gadgetHub = {
  name: 'Gadgets',
  slug: 'gadgets',
  sourceCategories: gadgetCategories.flatMap((category) => [...category.sourceCategories]),
  desc: 'Everyday gadgets, accessories, portable power and device care essentials.',
  section: 'gadgets',
  isHub: true,
  navVisible: true,
} as const

export const navigationCategories = [
  ...electricalCategories,
  electricalHub,
  gadgetHub,
  ...gadgetCategories,
] as const

export type NavigationCategory = (typeof navigationCategories)[number]
export type NavigationCategorySlug = NavigationCategory['slug']

export const navigationCategorySlugs = navigationCategories.map((category) => category.slug)

export const navigationLinks = navigationCategories
  .filter((category) => !('navVisible' in category) || category.navVisible)
  .map((category) => [category.name, `/category/${category.slug}`] as const)

export type CatalogueNavigationGroup = {
  id: 'electrical' | 'gadgets'
  label: string
  href: string
  categories: readonly NavigationCategory[]
  viewAll?: {
    href: string
    label: string
  }
}

export const catalogueNavigationGroups: readonly CatalogueNavigationGroup[] = [
  {
    id: 'electrical',
    label: electricalHub.name,
    href: `/category/${electricalHub.slug}`,
    categories: electricalCategories,
    viewAll: {
      href: `/category/${electricalHub.slug}`,
      label: 'View all Electrical',
    },
  },
  {
    id: 'gadgets',
    label: gadgetHub.name,
    href: `/category/${gadgetHub.slug}`,
    categories: gadgetCategories,
    viewAll: {
      href: `/category/${gadgetHub.slug}`,
      label: 'View all Gadgets',
    },
  },
]

export type CatalogueNavigationGroupId = CatalogueNavigationGroup['id']

export function getCatalogueNavigationGroup(slug: string) {
  return catalogueNavigationGroups.find((group) =>
    group.id === slug || group.categories.some((category) => category.slug === slug),
  )
}

export function isGadgetCategory(slug: string) {
  return gadgetCategories.some((category) => category.slug === slug)
}

export function getNavigationCategory(slug: string) {
  return navigationCategories.find((category) => category.slug === slug)
}

export function getNavigationCategoryForSource(sourceCategory: string) {
  return navigationCategories.find((category) =>
    (!('isHub' in category) || !category.isHub) &&
    category.sourceCategories.some((candidate) => candidate === sourceCategory),
  )
}
