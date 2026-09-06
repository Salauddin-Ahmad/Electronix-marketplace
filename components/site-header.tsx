'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, Search, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { BrandLogo } from '@/components/brand-logo';
import {
  catalogueNavigationGroups,
  type CatalogueNavigationGroupId,
} from '@/lib/catalog/navigation';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { useCart } from './cart-provider';

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const navigationRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<CatalogueNavigationGroupId | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveGroup(null);
        setMobileOpen(false);
      }
    };

    const closeOnOutsidePress = (event: MouseEvent) => {
      if (event.target instanceof Node && !navigationRef.current?.contains(event.target)) {
        setActiveGroup(null);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('mousedown', closeOnOutsidePress);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('mousedown', closeOnOutsidePress);
    };
  }, []);

  const closeNavigation = () => {
    setActiveGroup(null);
    setMobileOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
    closeNavigation();
  };

  const toggleGroup = (groupId: CatalogueNavigationGroupId) => {
    setActiveGroup((current) => (current === groupId ? null : groupId));
  };

  const toggleMobileNavigation = () => {
    if (mobileOpen) {
      closeNavigation();
      return;
    }

    setActiveGroup(null);
    setMobileOpen(true);
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
              <button type="button" onClick={toggleMobileNavigation} className="icon-btn md:hidden" aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="primary-navigation"><Menu size={21} /></button>
            </div>
          </div>

          <form onSubmit={submit} className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 w-full border border-slate-200 bg-[#f2f3f1] pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100" placeholder="Search products or part number..." aria-label="Search products" />
            </div>
          </form>
        </div>

        <div ref={navigationRef} className={`${mobileOpen ? 'block' : 'hidden'} border-y border-[#25344d] bg-[#172033] md:block`}>
          <div className="container-shell">
            <nav id="primary-navigation" aria-label="Product categories" className="flex flex-col py-1 md:flex-row md:items-center md:gap-1">
              {catalogueNavigationGroups.map((group) => {
                const isOpen = activeGroup === group.id;
                const containsCurrentRoute = group.categories.some(
                  (category) => pathname === `/category/${category.slug}`,
                ) || pathname === group.viewAll?.href;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    aria-controls={`catalogue-group-${group.id}`}
                    className={`group flex w-full items-center justify-between gap-1 px-3 py-3 text-left text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172033] md:w-auto md:justify-start md:text-xs xl:text-[13px] ${
                      isOpen || containsCurrentRoute ? 'text-[#f6c90e]' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={15}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {catalogueNavigationGroups.map((group) => {
            const isOpen = activeGroup === group.id;

            return (
              <section
                key={group.id}
                id={`catalogue-group-${group.id}`}
                aria-label={`Browse ${group.label}`}
                aria-hidden={!isOpen}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="border-t border-white/10 bg-[#111827]">
                    <div className="container-shell py-3">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {group.categories.map((category) => {
                          const href = `/category/${category.slug}`;
                          const isCurrent = pathname === href;

                          return (
                            <Link
                              key={category.slug}
                              href={href}
                              tabIndex={isOpen ? 0 : -1}
                              aria-current={isCurrent ? 'page' : undefined}
                              onClick={closeNavigation}
                              className={`group flex min-h-12 items-center justify-between gap-3 border px-4 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] ${
                                isCurrent
                                  ? 'border-slate-400 bg-white/[0.05] text-white'
                                  : 'border-white/10 bg-white/[0.02] text-slate-200 hover:border-slate-500 hover:text-white'
                              }`}
                            >
                              <span>{category.name}</span>
                              <ChevronRight
                                size={16}
                                aria-hidden="true"
                                className="shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-200"
                              />
                            </Link>
                          );
                        })}

                        {group.viewAll && (
                          <Link
                            href={group.viewAll.href}
                            tabIndex={isOpen ? 0 : -1}
                            aria-current={pathname === group.viewAll.href ? 'page' : undefined}
                            onClick={closeNavigation}
                            className="group flex min-h-12 items-center justify-between gap-3 border border-[#f6c90e]/50 bg-[#f6c90e]/[0.06] px-4 py-3 text-sm font-semibold text-[#f6c90e] transition-colors duration-200 hover:border-[#f6c90e] hover:text-[#fff0a6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c90e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
                          >
                            <span>{group.viewAll.label}</span>
                            <ChevronRight
                              size={16}
                              aria-hidden="true"
                              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </header>
    </>
  );
}
