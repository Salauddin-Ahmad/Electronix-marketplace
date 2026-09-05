# VOLTRONIX Frontend Architecture

## Current boundary

This repository is a frontend-first prototype. It has no backend, database,
authentication, payment processing, inventory ledger or real order creation.
Customer quote requests are handed off to WhatsApp.

## Catalogue flow

```text
New page / dashboard feature
  -> service interface in lib/services
  -> mock implementation in lib/services/mock
  -> compatibility adapter in lib/adapters
  -> legacy mock catalogue in lib/data.ts
```

`lib/data.ts` remains the current source of mock product rows. It is not the
future API contract. Existing storefront routes continue using their stable
legacy display selectors during this transition, so current URLs and product
cards do not break. New work should use services. The adapter converts each
legacy product into one product record with one deterministic default SKU.

## Contracts

`lib/contracts` contains backend-facing frontend contracts:

- `catalog.ts` — Product, SKU, Variant and image records.
- `cart.ts` — SKU-based cart line and summary contracts.
- `checkout.ts` — frontend-only checkout preview; it cannot create an order.
- `dashboard.ts` — catalogue-readiness metrics and rows.
- `common.ts` — money, stock and pagination primitives.

The storefront keeps its existing display model while the API contract evolves
alongside it. This avoids a risky full data migration before real product data
exists.

## Services

Import service entry points from `@/lib/services`:

- `catalogService`
- `cartService`
- `checkoutService`
- `dashboardService`

They currently resolve mock data. When the NestJS backend is ready, replace the
mock implementation behind a service interface; do not call HTTP endpoints
directly from page components.

## Cart rule

Browser storage persists only `{ skuId, quantity }`. It never persists a price
as an authoritative value. The service resolves current display information and
price state from the catalogue. Existing v1 product-id carts are migrated when
they are read.

## Dashboard rule

The dashboard is an internal frontend shell. Until authentication and an
operations API exist, it must show catalogue-derived readiness data or a clear
"backend not connected" empty state. It must not imply real revenue, orders,
inventory quantities, users or mutations.

## SEO configuration

Set this only in a real deployment environment:

```text
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

Without it, canonical URLs and sitemap entries are intentionally omitted rather
than publishing an incorrect domain. Public catalogue pages are indexable;
account, quote cart, checkout, dashboard and search result pages are noindex.

## Backend handoff checklist

1. Freeze actual Product/SKU/Variant payloads with the backend team.
2. Add an HTTP implementation for each service interface.
3. Keep cart and checkout requests SKU-based.
4. Add server-side price and stock validation.
5. Add real authentication and role checks before exposing dashboard data.
6. Add audit logging before dashboard mutations.
