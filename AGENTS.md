# AGENTS.md — VOLTRONIX Engineering Agent Rules

This file is mandatory. Read it before making any code change.

## 1. Project identity

Project: **VOLTRONIX / Electro Grid Marketplace**  
Type: electrical, electronics, tools, wiring, lighting, power backup, circuit protection and smart electrical ecommerce marketplace.  
Current stage: **frontend-first prototype with mock product data**.  
Target: production ecommerce storefront plus internal operating system for catalog, orders, inventory, procurement, payment, delivery and accounting integration.

VOLTRONIX must feel like a real professional electrical supplier, not a generic SaaS template or decorative ecommerce mockup.

## 2. Non-negotiable rule

Do not rewrite the project unless explicitly asked.

Every change must be:

```txt
small
scoped
reversible
build-verified
compatible with existing routes and data
```

## 3. Forbidden by default

Do not add these unless the task explicitly requests them:

```txt
backend database
Prisma
API routes
server actions
authentication
payment gateway
real order submission
shipping integration
email/SMS provider
new UI framework
large design-system rewrite
new state management library
large dependency changes
```

Do not silently replace the app with a scaffold.

Do not modify unrelated routes while fixing one issue.

Do not change product data shape unless the task explicitly requires a data migration or compatibility layer.

## 4. Required workflow

Before editing:

```txt
1. inspect the actual files
2. identify exact files to modify
3. state the risk area
4. keep the change within scope
```

After editing:

```bash
pnpm build
```

Then verify routes:

```txt
/
/category/electrical-wiring
/category/switches-sockets
/category/lighting-fans
/category/circuit-protection
/category/tools-testers
/category/electronics-repair
/category/power-backup
/category/smart-electrical
/category/home-solutions
/search
/cart
/checkout
at least 2 product detail pages
```

Check for:

```txt
TypeScript errors
Tailwind/global CSS missing
valid category links returning 404
runtime 500 errors
missing module/vendor chunk errors
hydration errors caused by app code
broken Three.js hero rendering
broken ProductCard links
broken search/category pagination
cart context errors
```

## 5. Current frontend reality

Treat the current app as a prototype, not a working ecommerce system.

Current known properties:

```txt
products are mock/generated in lib/data.ts
many prices/images/brands/suppliers/specs may be placeholder or null
cart may be client-only and not persistent
checkout is mock unless explicitly implemented later
admin/dashboard pages may be decorative
no production inventory system exists yet
no payment verification exists yet
no accounting integration exists yet
```

## 6. Hero guardrail

The hero is important and fragile.

Do not:

```txt
replace the hero
move the animation to full background
touch Three.js internals unless specifically requested
create SSR access to browser APIs
increase hero height excessively
remove client boundary
```

Allowed:

```txt
tighten spacing
improve copy
improve CTA styling
reduce min-height
make mobile spacing more compact
```

Target hero feel:

```txt
desktop panel height around 480–520px
mobile animation around 260–320px
text left + animation right on desktop
animation below text on mobile if needed
```

## 7. Homepage rule

Homepage is not a catalog page.

Allowed homepage structure:

```txt
Header
Hero
Shop by Category
Featured Products preview
Trending/Popular Products preview
Price Challenge CTA
Home & Building Solutions CTA
Footer
```

Homepage limits:

```txt
categories: max 9
featured products: max 8
trending products: max 8
pagination: never
```

Remove or avoid:

```txt
all-products homepage grid
category-by-category product loops
long repeated showcases
dozen-section catalogue dump
```

## 8. Listing page rule

Pagination belongs only on:

```txt
/category/[slug]
/search
```

Default page size:

```txt
12 products per page
```

Pagination must use safe parsing:

```txt
missing page → page 1
non-integer → page 1
page < 1 → page 1
page > total pages → clamp or safe empty state
```

## 9. Navigation/category rule

Use one central mapping for customer-facing navigation categories.

Do not duplicate category slug lists across:

```txt
header
footer
homepage category cards
category route generation
category filtering
```

Required public category slugs:

```txt
electrical-wiring
switches-sockets
lighting-fans
circuit-protection
tools-testers
electronics-repair
power-backup
smart-electrical
home-solutions
```

If products exist outside these navigation categories, either map them safely into one of the public categories or make them discoverable through search. Do not leave important stock hidden from normal navigation without documenting why.

## 10. Product/card rule

Product cards must preserve navigation and data compatibility.

A product card should clearly show:

```txt
image or clean placeholder
brand if available
product name
main category/subcategory
price or quote-required state
stock/availability state
primary action
link to product page
```

Avoid:

```txt
fake reviews
fake ratings
fake discounts
too many badges
heavy gradients
unreadable names
random image assignment that changes between builds
```

## 11. Cart rule

Until backend exists, cart is frontend-only.

Do not claim real order placement.

Cart must not show misleading zero totals for quote-only products. Use explicit states:

```txt
priced item → can calculate subtotal
price missing/null → Request price / Quote required
mixed cart → show priced subtotal and quote-required notice
```

Currency must be consistent. For Bangladesh-facing launch, prefer BDT display unless project direction changes.

## 12. Production backend rule

When backend work begins, do not bolt random API routes directly onto UI components.

Use clear separation:

```txt
storefront UI
commerce API/service layer
database
admin dashboard
integration workers/webhooks
accounting/export layer
```

Critical backend requirements:

```txt
unique SKU constraint
idempotent order creation
idempotent payment webhooks
atomic stock reservation
audit logs for admin actions
role-based permissions
database backups
staging environment
```

## 13. Build output requirement

Every agent response after code work must include:

```txt
files changed
what changed
what was intentionally not changed
build result
manual verification status
remaining risks/limitations
```
