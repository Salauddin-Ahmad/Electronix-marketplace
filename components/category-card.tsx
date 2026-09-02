import Link from 'next/link';
import { ArrowUpRight, BatteryCharging, Cable, Cpu, Home, Lightbulb, ShieldCheck, SlidersHorizontal, Wrench, Zap, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Cable,
  SlidersHorizontal,
  Lightbulb,
  ShieldCheck,
  Wrench,
  Cpu,
  BatteryCharging,
  Home,
  Zap,
};

export function CategoryCard({ cat }: { cat: { name: string; href: string; desc: string; icon?: string } }) {
  const Icon = (cat.icon && icons[cat.icon]) || Cable;
  return (
    <Link href={cat.href} className="group relative min-h-[148px] overflow-hidden border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center bg-blue-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white"><Icon size={22} strokeWidth={1.8} /></div>
        <ArrowUpRight size={17} className="text-slate-400 transition group-hover:text-slate-900" />
      </div>
      <h3 className="font-display mt-7 text-[20px] font-bold tracking-tight text-slate-900">{cat.name}</h3>
      <p className="mt-1 max-w-[250px] text-sm leading-5 text-slate-500">{cat.desc}</p>
    </Link>
  );
}
