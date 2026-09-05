'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrandLogo } from '@/components/brand-logo';
import { navigationLinks } from '@/lib/catalog/navigation';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { useCart } from './cart-provider';

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHover, setNavHover] = useState({ left: 0, width: 0, visible: false });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
    setMobileOpen(false);
  };

  const positionNavHover = (event: React.SyntheticEvent<HTMLElement>) => {
    const item = event.currentTarget;
    const left = item.offsetLeft;
    const width = item.offsetWidth;
    setNavHover((current) => (
      current.left === left && current.width === width && current.visible
        ? current
        : { left, width, visible: true }
    ));
  };

  return (
    <>
      <div className="bg-[#161a20] text-white">
        <div className="container-shell flex min-h-8 items-center justify-between gap-4 text-[11px] text-slate-300">
          <div className="flex gap-5"><span>Nationwide Delivery</span><span className="hidden sm:block">Bulk & Wholesale Orders</span></div>
          <div className="flex gap-5"><Link href="/price-challenge" className="font-semibold text-blue-300 hover:text-white">Price Challenge</Link><a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Help &amp; Support</a></div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fcfcfa]/95 backdrop-blur">
        <div className="container-shell">
          <div className="flex h-[76px] items-center gap-5">
            <BrandLogo />

            <form onSubmit={submit} className="hidden min-w-0 flex-1 md:flex">
              <div className="relative w-full max-w-3xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" className="h-12 w-full border border-slate-200 bg-[#f2f3f1] pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-blue-100" placeholder="Search products, brands, model or part number..." />
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1">
              <Link href="/cart" aria-label="Quote list" className="icon-btn relative"><ShoppingCart size={20} />{count > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[9px] font-extrabold text-white">{count}</span>}</Link>
              <button type="button" onClick={() => setMobileOpen((value) => !value)} className="icon-btn md:hidden" aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="primary-navigation"><Menu size={21} /></button>
            </div>
          </div>

          <form onSubmit={submit} className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 w-full border border-slate-200 bg-[#f2f3f1] pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100" placeholder="Search products or part number..." aria-label="Search products" />
            </div>
          </form>
        </div>

        <div className={`${mobileOpen ? 'block' : 'hidden'} border-y border-[#25344d] bg-[#172033] md:block`}>
          <div className="container-shell">
            <nav
              id="primary-navigation"
              onPointerLeave={() => setNavHover((current) => ({ ...current, visible: false }))}
              className="scrollbar-none relative flex flex-col py-2 md:flex-row md:items-center md:justify-between md:gap-2 md:overflow-x-auto md:py-1"
            >
              <span
                aria-hidden="true"
                style={{ width: navHover.width, transform: `translateX(${navHover.left}px)`, opacity: navHover.visible ? 1 : 0 }}
                className="pointer-events-none absolute inset-y-1 left-0 z-0 hidden border border-white/10 bg-white/[0.08] shadow-[0_5px_16px_rgba(2,6,23,0.18)] transition-[width,transform,opacity] duration-300 ease-out md:block"
              />
              <button type="button" onPointerMove={positionNavHover} onFocus={positionNavHover} onClick={() => router.push('/search')} className="relative z-10 hidden shrink-0 items-center gap-1 px-2 py-3 text-xs font-extrabold uppercase tracking-wide text-blue-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172033] md:inline-flex xl:text-[13px]">All Products</button>
              {navigationLinks.map(([label, href]) => (
                <Link key={href} href={href} onPointerMove={positionNavHover} onFocus={positionNavHover} onClick={() => setMobileOpen(false)} aria-current={pathname.startsWith(href) ? 'page' : undefined} className={`relative z-10 shrink-0 whitespace-nowrap border-b-2 px-2 py-3 text-[13px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172033] md:text-xs xl:text-[13px] ${pathname.startsWith(href) ? 'border-blue-400 text-white' : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white md:hover:bg-transparent'}`}>{label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
