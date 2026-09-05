import type { MetadataRoute } from 'next'
import { navigationCategories } from '@/lib/catalog/navigation'
import { products } from '@/lib/data'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  // A domain is intentionally required before public URLs are emitted.
  // Set NEXT_PUBLIC_SITE_URL in the deployment environment to activate this.
  if (!absoluteUrl('/')) return []

  const pages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/price-challenge', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/solutions', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/wholesale', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  return [
    ...pages.map((page) => ({ ...page, url: absoluteUrl(page.path)! })),
    ...navigationCategories.map((category) => ({
      url: absoluteUrl(`/category/${category.slug}`)!,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`)!,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
