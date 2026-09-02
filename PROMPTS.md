# PROMPTS.md — Controlled Codex Prompts

Use these prompts one task at a time. Do not combine unrelated work.

## 1. Frontend buying path stabilization

```text
Read AGENTS.md, PROJECT.md and SPEC.md first.

Task: Stabilize the current frontend ecommerce buying path with minimal safe changes.

Do NOT redesign the whole app.
Do NOT add backend, database, Prisma, API routes, auth, payment, or server actions.
Do NOT touch Three.js internals.
Do NOT rewrite the homepage.
Do NOT change the product data shape unless absolutely necessary and safe.
Keep the project frontend-only.

Scope:
1. Add missing homepage Price Challenge and Home/Building Solutions CTA panels only if still missing.
2. Fix search shortcut behavior:
   - empty search shows all products
   - /search?q=all shows all products if that link exists
   - remove or correct broken shortcuts like best/brands/compare if they return 0 meaningless results
3. Ensure all products are reachable by category or search.
4. Connect existing public product images if safe:
   - inspect public/products
   - use deterministic mapping
   - no hotlinking
   - no broken image paths
5. Add Add-to-Cart behavior from ProductCard and product detail page where appropriate.
6. Fix cart display consistency:
   - BDT currency
   - subtotal = price × quantity
   - quote-required state for missing prices
7. Keep checkout explicitly mock.

Run pnpm build.
Return files changed, exact fixes, build result and remaining limitations.
```

## 2. Category/navigation centralization

```text
Read AGENTS.md and SPEC.md first.

Task: Centralize public category/navigation mapping.

Do not redesign UI.
Do not change unrelated pages.
Do not remove existing valid routes.

Create or improve one central navigation category mapping used by:
- header
- footer
- homepage category grid
- category route generation
- category filtering

Required public slugs:
- electrical-wiring
- switches-sockets
- lighting-fans
- circuit-protection
- tools-testers
- electronics-repair
- power-backup
- smart-electrical
- home-solutions

If raw categories exist outside the public mapping, map them intentionally or document them.

Run pnpm build and verify category routes.
```

## 3. Product image connection

```text
Read SPEC.md first.

Task: Connect existing local product images safely.

Inspect public/products.
Do not use external image hotlinks.
Do not add new dependencies.
Do not use Math.random or non-deterministic assignment.
Do not break product data shape.

Implement stable image mapping or fallback placeholder behavior.
No product card should show a broken image.

Run pnpm build.
Return image mapping strategy and files changed.
```

## 4. Cart and checkout honesty

```text
Read AGENTS.md and SPEC.md first.

Task: Make cart and checkout behavior internally consistent while staying frontend-only.

Do not add backend.
Do not add payment.
Do not claim real order placement.

Fix:
- visible Add-to-Cart path if missing
- quantity calculation
- subtotal = price × quantity
- BDT currency consistency
- quote-required behavior for products without prices
- cart empty state
- checkout mock labeling

Run pnpm build.
```

## 5. Database-backed catalog planning only

```text
Read PROJECT.md, DATA_MODEL.md and OPERATIONS.md first.

Task: Plan the migration from lib/data.ts mock catalog to database-backed catalog.

Do not implement database yet.
Do not add Prisma yet.
Do not modify app code.

Return:
- recommended tables
- migration steps
- CSV columns
- compatibility layer plan so frontend components do not need a full rewrite
- first 50-product staging import plan
- risks and validation checks
```

## 6. Backend MVP implementation plan

```text
Read DATA_MODEL.md, OPERATIONS.md and ROADMAP.md first.

Task: Create a backend MVP implementation plan for catalog, order and inventory.

Do not code yet.

Include:
- modules
- database tables
- API boundaries
- service-layer responsibilities
- stock reservation rules
- order state machine
- payment webhook idempotency rules
- admin dashboard dependencies
- acceptance tests
```

## 7. Admin dashboard MVP plan

```text
Read ADMIN_DASHBOARD.md, DATA_MODEL.md and OPERATIONS.md first.

Task: Create an implementation plan for the internal admin dashboard MVP.

Do not code yet.

Prioritize:
1. admin shell + RBAC skeleton
2. products/SKUs/categories/images
3. CSV import validation
4. inventory balances + stock ledger
5. orders dashboard
6. payment/COD status management
7. fulfillment tracking fields
8. returns/refunds workflow

Return:
- route/module structure
- data dependencies
- role permissions
- key table columns
- acceptance tests
```

## 8. Release verification

```text
Read QA.md first.

Task: Run release verification for the current frontend.

Do not change code unless a clear build/runtime issue is found.

Run pnpm build.
Verify required routes.
Check homepage, category/search pagination, product pages, cart, checkout, hero rendering, Tailwind styling.

Return:
- build result
- route status table
- issues found
- recommended next fixes ranked by severity
```
