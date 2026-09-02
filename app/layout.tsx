import './globals.css';
import { CartProvider } from '@/components/cart-provider';

export const metadata = { title: 'VOLTRONIX — Electrical Marketplace', description: 'Electrical products, electronics, tools, power and complete building solutions.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="bg-background"><body><CartProvider>{children}</CartProvider></body></html>;
}
