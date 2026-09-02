'use client';

import Link from 'next/link';
import { ChevronDown, Menu, Search, ShoppingCart, UserCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './cart-provider';

const nav = [
  ['Electrical & Wiring', '/category/electrical-wiring'],
  ['Switches & Sockets', '/category/switches-sockets'],
  ['Lighting & Fans', '/category/lighting-fans'],
  ['Circuit Protection', '/category/circuit-protection'],
  ['Tools & Testers', '/category/tools-testers'],
  ['Electronics & Repair', '/category/electronics-repair'],
  ['Power & Backup', '/category/power-backup'],
  ['Smart Electrical', '/category/smart-electrical'],
  ['Home Solutions', '/category/home-solutions'],
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <>
      <div className="bg-[#161a20] text-white">
        <div className="container-shell flex min-h-8 items-center justify-between gap-4 text-[11px] text-slate-300">
          <div className="flex gap-5"><span>Nationwide Delivery</span><span className="hidden sm:block">Bulk & Wholesale Orders</span></div>
          <div className="flex gap-5"><Link href="/price-challenge" className="font-semibold text-blue-300 hover:text-white">Price Challenge</Link><span>Help & Support</span></div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fcfcfa]/95 backdrop-blur">
        <div className="container-shell">
          <div className="flex h-[76px] items-center gap-5">
            <Link href="/" className="shrink-0 font-display text-[27px] font-extrabold tracking-tight text-[#1b2026]">VOLTRONIX<span className="text-brand-500">.</span></Link>

            <form onSubmit={submit} className="hidden min-w-0 flex-1 md:flex">
              <div className="relative w-full max-w-3xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" className="h-12 w-full border border-slate-200 bg-[#f2f3f1] pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-blue-100" placeholder="Search products, brands, model or part number..." />
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1">
              <Link href="/account" aria-label="Account" className="icon-btn"><UserCircle size={20} /></Link>
              <Link href="/cart" aria-label="Cart" className="icon-btn relative"><ShoppingCart size={20} />{count > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[9px] font-extrabold text-white">{count}</span>}</Link>
              <button type="button" onClick={() => setMobileOpen((value) => !value)} className="icon-btn md:hidden" aria-label="Toggle navigation"><Menu size={21} /></button>
            </div>
          </div>

          <form onSubmit={submit} className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 w-full border border-slate-200 bg-[#f2f3f1] pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100" placeholder="Search products or part number..." aria-label="Search products" />
            </div>
          </form>

          <nav className={`${mobileOpen ? 'flex' : 'hidden'} flex-col border-t border-slate-200 py-3 md:flex md:flex-row md:items-center md:justify-between md:gap-3 md:overflow-x-auto`}>
            <button type="button" onClick={() => router.push('/search')} className="hidden items-center gap-1 px-1 py-3 text-xs font-bold uppercase tracking-wide text-slate-900 md:inline-flex">All Categories <ChevronDown size={14} /></button>
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`whitespace-nowrap border-b-2 px-1 py-3 text-xs font-semibold transition ${pathname.startsWith(href) ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-600 hover:text-slate-950'}`}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
