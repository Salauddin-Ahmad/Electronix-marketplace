# VOLTRONIX Electrical Marketplace

Frontend-only electrical catalogue and quote-request prototype built with the Next.js App Router.

## Technology

- Next.js 16 and React 19
- TypeScript in strict mode (`.ts` and `.tsx` application source)
- Tailwind CSS
- React Three Fiber for the interactive hero
- Framer Motion for selected CTA feedback

The `.mjs` files at the project root are normal JavaScript configuration files. Product and application code is TypeScript; `allowJs` is disabled in `tsconfig.json`.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```

Opening the folder in VS Code does not conflict with Codex. If a dependency command fails because a running dev server has a file open, stop that server, run the command, then start it again.

## Where to make common changes

| Change | Primary file or folder |
| --- | --- |
| Add, remove or rename a catalogue item | `lib/data.ts` (`source` list) |
| Product data type | `lib/catalog/types.ts` |
| Public category names and source-category mapping | `lib/catalog/navigation.ts` |
| Product/category image selection | `lib/catalog/product-images.ts` |
| Generated category illustrations | `public/products/generated/` |
| Original screenshots and image sources | `assets/reference/` (not served by the app) |
| Filter definitions | `lib/facet-config.ts` |
| Filter/search behavior | `lib/catalog-filter.ts` |
| WhatsApp number and message templates | `lib/whatsapp.ts` |
| Cart storage and totals | `components/cart-provider.tsx` |
| Interactive hero scene | `components/home/lumen-circuit/` |
| Global colors and utility classes | `tailwind.config.ts`, `app/globals.css` |

`lib/data.ts` remains the compatibility entry point for catalogue queries, so existing page imports stay stable. Navigation and image rules are separated because those are the two areas most often edited manually.

## Catalogue rules

- The raw source list is kept intact so existing IDs, SKUs and product URLs remain stable.
- The launch catalogue intentionally displays every second item within each source category, reducing 280 source rows to 146 while keeping every category represented.
- Exact local product photos are used only where the match is clear. Other items use a deterministic category illustration; no external images are hotlinked.
- Pricing, supplier, brand and live stock are not invented. Missing prices remain `Request price` and are handled as quotation lines.

## Frontend-only boundary

There is no backend, database, API route, authentication, real payment or order submission. Cart and recently viewed data use browser storage only. Checkout is explicitly a preview; WhatsApp is the practical quotation handoff.

## Project guardrails

Read these before structural work:

1. `AGENTS.md`
2. `PROJECT.md`
3. `SPEC.md`
4. `QA.md`

Supporting planning and operations documents remain at the project root for now. They are reference material, not runtime code.
