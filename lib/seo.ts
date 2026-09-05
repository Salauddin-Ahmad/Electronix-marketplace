import type { Metadata } from 'next'

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

/**
 * Returns a production URL only when one has been deliberately configured.
 * This keeps local builds and preview deployments from publishing a false
 * canonical domain.
 */
export function getSiteUrl() {
  if (!configuredSiteUrl) return undefined

  try {
    return new URL(configuredSiteUrl.endsWith('/') ? configuredSiteUrl : `${configuredSiteUrl}/`)
  } catch {
    return undefined
  }
}

export function absoluteUrl(path: string) {
  const siteUrl = getSiteUrl()
  if (!siteUrl) return undefined

  return new URL(path, siteUrl).toString()
}

export function canonicalMetadata(path: string): Pick<Metadata, 'alternates'> {
  const canonical = absoluteUrl(path)
  return canonical ? { alternates: { canonical } } : {}
}

export function productSeoDescription(name: string, summary: string) {
  const description = `${summary} Ask VOLTRONIX to confirm current pricing, availability and delivery.`
  return description.length <= 160 ? description : `${description.slice(0, 157).trimEnd()}…`
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
