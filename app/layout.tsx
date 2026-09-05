import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/cart-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { getSiteUrl } from '@/lib/seo';

const configuredSiteUrl = getSiteUrl();
// This fallback is used only for local/preview metadata resolution. A real
// deployment must set NEXT_PUBLIC_SITE_URL before public SEO is enabled.
const metadataBase = configuredSiteUrl ?? new URL('http://localhost:3000');

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'VOLTRONIX — Electrical Marketplace',
    template: '%s | VOLTRONIX',
  },
  description: 'Browse electrical products, electronics, tools, power and building supplies. Confirm pricing, availability and delivery through VOLTRONIX.',
  applicationName: 'VOLTRONIX',
  keywords: ['electrical products', 'electronics', 'tools', 'wiring', 'lighting', 'Bangladesh'],
  alternates: configuredSiteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    siteName: 'VOLTRONIX',
    type: 'website',
    title: 'VOLTRONIX — Electrical Marketplace',
    description: 'Electrical products and project sourcing with quote-first support.',
    url: configuredSiteUrl ? '/' : undefined,
    images: configuredSiteUrl ? [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'VOLTRONIX — Electrical Marketplace' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOLTRONIX — Electrical Marketplace',
    description: 'Electrical products and project sourcing with quote-first support.',
    images: configuredSiteUrl ? ['/opengraph-image'] : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = configuredSiteUrl
    ? {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VOLTRONIX',
      url: configuredSiteUrl.toString(),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+8801775297759',
        contactType: 'customer support',
        areaServed: 'BD',
      },
    }
    : null;
  const websiteSchema = configuredSiteUrl
    ? {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'VOLTRONIX',
      url: configuredSiteUrl.toString(),
      potentialAction: {
        '@type': 'SearchAction',
        target: `${configuredSiteUrl.origin}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
    : null;

  return <html lang="en" className="bg-background"><body>{organizationSchema ? <JsonLd data={organizationSchema} /> : null}{websiteSchema ? <JsonLd data={websiteSchema} /> : null}<CartProvider>{children}</CartProvider></body></html>;
}
