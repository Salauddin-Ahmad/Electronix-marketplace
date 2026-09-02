import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '@/lib/whatsapp';

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#11161d] text-white">
      <div className="container-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr_.75fr_.85fr]">
          <div>
            <div className="font-display text-2xl font-extrabold tracking-tight">VOLTRONIX<span className="text-blue-400">.</span></div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Everything electrical. One place. Electrical products, electronics, tools, power solutions and complete home & building supply.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <MessageCircle size={15} className="text-[#25D366]" /> WhatsApp: {WHATSAPP_DISPLAY_NUMBER}
              </a>
              <div className="flex items-center gap-2"><Mail size={15} className="text-blue-400" /> hello@voltronix.example</div>
              <div className="flex items-center gap-2"><MapPin size={15} className="text-blue-400" /> Bangladesh</div>
            </div>
          </div>

          <FooterColumn title="Shop" links={[
            ['Electrical & Wiring', '/category/electrical-wiring'], ['Switches & Sockets', '/category/switches-sockets'], ['Lighting & Fans', '/category/lighting-fans'], ['Circuit Protection', '/category/circuit-protection'], ['Tools & Testers', '/category/tools-testers'],
          ]} />
          <FooterColumn title="Explore" links={[
            ['Electronics & Repair', '/category/electronics-repair'], ['Power & Backup', '/category/power-backup'], ['Smart Electrical', '/category/smart-electrical'], ['Best Sellers', '/search?q=best'], ['All Products', '/search'],
          ]} />
          <FooterColumn title="Business" links={[
            ['Home & Building Solutions', '/category/home-solutions'], ['Wholesale & Bulk', '/wholesale'], ['Price Challenge', '/price-challenge'], ['Customer Account', '/account'], ['Support', '/account'],
          ]} />
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 VOLTRONIX. All rights reserved.</span>
          <div className="flex flex-wrap gap-5"><span>Secure checkout</span><span>Nationwide delivery</span><span>Bulk orders</span></div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return <div><h3 className="font-display text-base font-bold tracking-wide text-white">{title}</h3><div className="mt-4 space-y-3">{links.map(([label, href]) => <Link key={href + label} href={href} className="block text-sm text-slate-400 transition hover:text-white">{label}</Link>)}</div><Link href="/" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">Explore <ArrowRight size={13} /></Link></div>;
}
