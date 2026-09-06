import {
  getNavigationCategoryForSource,
  type NavigationCategorySlug,
} from '@/lib/catalog/navigation'

const categoryIllustrations: Partial<Record<NavigationCategorySlug, string>> = {
  'electrical-wiring': '/products/generated/electrical-wiring.webp',
  'switches-sockets': '/products/generated/switches-sockets.webp',
  'lighting-fans': '/products/generated/lighting-fans.webp',
  'circuit-protection': '/products/generated/circuit-protection.webp',
  'tools-testers': '/products/generated/tools-testers.webp',
  'electronics-repair': '/products/generated/electronics-repair.webp',
  'power-backup': '/products/generated/power-backup.webp',
  'smart-electrical': '/products/generated/smart-electrical.webp',
  'home-solutions': '/products/generated/home-solutions.webp',
} as const

export function productImage(category: string) {
  const publicCategory = getNavigationCategoryForSource(category)
  return publicCategory
    ? categoryIllustrations[publicCategory.slug] ?? '/products/dummy-product.svg'
    : '/products/dummy-product.svg'
}
