import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/cart-provider';

export const metadata: Metadata = {
  title: {
    default: 'VOLTRONIX — Electrical Marketplace',
    template: '%s | VOLTRONIX',
  },
  description: 'Browse electrical products, electronics, tools, power and building supplies. Confirm pricing, availability and delivery through VOLTRONIX.',
  openGraph: {
    siteName: 'VOLTRONIX',
    type: 'website',
    title: 'VOLTRONIX — Electrical Marketplace',
    description: 'Electrical products and project sourcing with quote-first support.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="bg-background"><body><CartProvider>{children}</CartProvider></body></html>;
}
