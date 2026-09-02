import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/data'
import { stockLabel } from '@/lib/data'
import { formatBDT } from '@/lib/currency'
import { AddToCartButton } from '@/components/add-to-cart-button'

export function ProductCard({product}:{product:Product}){return <article className="group flex h-full flex-col border border-slate-200 bg-white p-4 transition hover:border-brand-500 hover:shadow-lg"><Link href={`/product/${product.slug}`}><div className="relative h-44 overflow-hidden bg-[#f1f2ef]"><Image src={product.images.primary??'/placeholder.svg'} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-contain p-5"/></div><div className="pt-4"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-600">{product.priority} · {product.subcategory}</div><h3 className="font-display mt-1 line-clamp-2 text-xl font-bold text-slate-900 group-hover:text-brand-600">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.shortDescription}</p></div></Link><div className="mt-auto flex items-end justify-between gap-3 pt-5"><div><div className="text-xs font-semibold text-slate-600">{stockLabel(product.stockMode)}</div><div className="font-display mt-1 text-lg font-bold text-slate-950">{product.pricing.sellingPrice===null?'Request price':formatBDT(product.pricing.sellingPrice)}</div></div><AddToCartButton product={product} compact/></div></article>}

export function ProductGrid({products}:{products:Product[]}){return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>}
