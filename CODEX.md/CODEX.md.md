# VOLTRONIX / Electro Grid Marketplace — Codex Project Brief

## 1. Project Identity

**Project name:** VOLTRONIX / Electro Grid Marketplace  
**Type:** Electrical, electronics, tools, wiring, lighting, circuit protection, power and smart electrical ecommerce marketplace.  
**Current stage:** Frontend-first prototype / mock-data ecommerce app.  
**Goal:** Turn the existing working Next.js frontend into a production-ready ecommerce storefront and later connect it to real backend, product data, inventory, operations dashboard, payment, delivery and accounting systems.

VOLTRONIX must feel like a **real professional electrical supplier marketplace**, not a generic SaaS landing page or random AI ecommerce template.

---

## 2. Current Technical Stack

Use and preserve the existing project stack unless explicitly instructed otherwise.

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
lucide-react
Three.js hero animation
Mock product data in lib/data.ts
Frontend-only ecommerce flow
```

Current app includes routes/components similar to:

```txt
app/page.tsx
app/layout.tsx
app/globals.css
app/category/[slug]/page.tsx
app/product/[slug]/page.tsx
app/search/page.tsx
app/cart/page.tsx
app/checkout/page.tsx
app/account/page.tsx
app/dashboard/page.tsx
app/solutions/page.tsx
app/wholesale/page.tsx
app/price-challenge/page.tsx
components/site-header.tsx
components/site-footer.tsx
components/home/hero.tsx
components/home/circuit-animator.tsx
components/three/electrical-circuit.tsx
components/product-card.tsx
components/showcase.tsx
components/category-card.tsx
lib/data.ts
```

---

## 3. Non-Negotiable Guardrails

### Do not break the working app

Before making changes, inspect the actual files. Do not assume structure.

```txt
Do not rewrite the entire project.
Do not generate a new app.
Do not replace the existing design system from scratch.
Do not remove working routes.
Do not change product data shape unless the task explicitly requires it.
Do not add backend unless explicitly requested.
Do not add database unless explicitly requested.
Do not add authentication unless explicitly requested.
Do not add payment unless explicitly requested.
Do not add Prisma/server actions/API routes unless explicitly requested.
Do not touch unrelated pages when working on one area.
Do not introduce risky dependencies.
Do not silently simplify the app into a scaffold.
```

### Always verify after changes

Run:

```bash
pnpm build
```

Then verify at minimum:

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
500 errors
404 errors for valid category links
missing module/vendor chunk errors
hydration errors caused by app code
broken Three.js rendering
broken ProductCard links
broken search/category pagination
```

---

## 4. Design Direction

VOLTRONIX should feel:

```txt
professional
premium but not flashy
technical
trustworthy
compact
product-first
supplier-grade
ecommerce-focused
clear for homeowners, technicians, electricians, contractors and small businesses
```

Avoid:

```txt
generic SaaS landing-page look
AI-generated template feel
huge gradients everywhere
excessive rounded cards
fake reviews
fake statistics
oversized marketing sections
unnecessary animations
long catalogue dump on homepage
cluttered wholesale brochure feeling
```

Brand feeling:

```txt
dark navy / technical background
white / clean surface areas
yellow accent for commerce/action
blue/magenta electrical animation may remain in hero
```

---

## 5. Homepage Specification

### Main problem

The homepage must not behave like a full catalogue page. It should be short, curated and conversion-focused.

### Correct homepage structure

```txt
1. SiteHeader
2. Existing Hero
3. Shop by Category / quick category discovery
4. Featured Products preview
5. Trending or Popular Products preview
6. Price Challenge CTA
7. Home & Building Solutions CTA
8. SiteFooter
```

### Homepage limits

```txt
Maximum categories shown: 8–9
Featured Products: max 8
Trending / Popular Products: max 8
Homepage pagination: never
```

Remove from homepage:

```txt
All Products grid
category-by-category product loops
huge repeated Showcase sections
full catalogue dump
long product list under every category
```

### Homepage pagination rule

Do **not** add pagination to homepage.

Pagination belongs only on:

```txt
/category/[slug]
/search
```

Homepage purpose:

```txt
discovery
trust
category entry
curated products
project/quote CTAs
```

Listing page purpose:

```txt
full product browsing
filtering
pagination
search results
```

---

## 6. Hero Guardrails

The existing Three.js electrical circuit hero is valuable and must be preserved.

### Do not

```txt
Do not replace the Three.js animation.
Do not remove CircuitAnimator.
Do not move animation into a full-page background.
Do not rewrite Three.js internals.
Do not access window/document during SSR.
Do not add Math.random(), Date.now(), or new Date() in SSR-rendered JSX.
Do not make the hero taller.
Do not add heavy glow that hurts readability.
```

### Allowed safe improvements

```txt
Tighten copy.
Reduce excessive min-height.
Improve spacing.
Improve CTA styling.
Make search input feel more ecommerce-like.
Compress or remove stats if they make hero too tall.
Keep desktop hero around 480–520px visual height.
Keep mobile animation around 260–320px if possible.
Keep text left and animation right on desktop.
Allow animation below text on mobile.
```

### Client boundary rule

Browser-only Three.js code must remain inside a client component and/or `useEffect`.

Safe pattern:

```tsx
'use client'
```

or dynamic import:

```tsx
import dynamic from 'next/dynamic'

const ElectricalCircuit = dynamic(
  () => import('@/components/three/electrical-circuit'),
  { ssr: false }
)
```

---

## 7. Category Routing Specification

Category navigation must use stable slugs and aliases.

Expected navigation categories:

```txt
/category/electrical-wiring
/category/switches-sockets
/category/lighting-fans
/category/circuit-protection
/category/tools-testers
/category/electronics-repair
/category/power-backup
/category/smart-electrical
/category/home-solutions
```

Guardrails:

```txt
Preserve existing category aliases if present.
Do not break generateStaticParams.
Use notFound() only for truly invalid slugs.
Header, footer, homepage category cards and category pages must agree on the same slug mapping.
Do not hardcode links in one place and generate different slugs elsewhere.
Use a central navigationCategories/category alias mapping.
```

Recommended category mapping concept:

```txt
electrical-wiring       → House Wiring & Cable / wire-related products
switches-sockets        → Switch, Socket & Electrical Accessories
lighting-fans           → LED Lighting + Fan & Fan Spare Parts
circuit-protection      → MCB, RCCB & Protection
tools-testers           → Hand Tools + Measuring & Testing
electronics-repair      → Basic Electronic Components / repair items
power-backup            → Battery, Charging, BMS, DC-DC modules
smart-electrical        → Smart Home & Automation
home-solutions          → project/home electrical solution category or solutions entry
```

---

## 8. Product Listing and Pagination Specification

Pagination should be added only to:

```txt
/category/[slug]
/search
```

Requirements:

```txt
12 products per page
Use ?page=2 query param
Safe integer parsing
Invalid page falls back to page 1 or safe empty state
Previous / Next controls
Numbered page controls only if simple and safe
Preserve search/category behavior
Do not break static generation
Do not paginate homepage
```

Reusable component suggestion:

```txt
components/pagination.tsx
```

Pagination component should be frontend-safe, route-safe and minimal.

---

## 9. ProductCard Guardrails

Preserve existing ProductCard API and data model unless explicitly changing backend/data.

Product cards should show clearly:

```txt
image
brand if available
product name
important specs if available
price
stock status
CTA
product detail link
```

Avoid:

```txt
fake reviews
too many badges
excessive discount labels
unreadable text
large decorative gradients
breaking product links
changing slug logic casually
```

Responsive grid target:

```txt
Desktop: 4 columns
Tablet: 3 columns if safe
Mobile: 2 columns
```

---

## 10. Header and Footer Guardrails

### Header

Allowed:

```txt
fix nav overflow
clean spacing
ensure ecommerce search remains visible
ensure cart/account links remain working
ensure category links remain valid
```

Not allowed unless explicitly requested:

```txt
full header redesign
breaking mobile nav
removing existing core links
changing category routes casually
```

### Footer

Keep compact and trustworthy.

Allowed:

```txt
minor spacing cleanup
better grouping
category/support/solutions links
```

Avoid:

```txt
huge footer
fake company details
long generic copy
```

---

## 11. Frontend-Only Stage Rules

The current app is frontend-only. Until backend work is explicitly requested:

```txt
Use existing mock data.
Do not add DB.
Do not add Prisma.
Do not add auth.
Do not add payments.
Do not add real checkout processing.
Do not add server mutations.
Keep cart/checkout as frontend mock/order-intent flow.
```

When improving frontend pages, focus on:

```txt
layout
flow
responsive behavior
clear CTAs
safe data slicing
navigation
pagination for listing pages
product browsing clarity
```

---

## 12. Production Ecommerce Target Architecture

When real launch/backend work begins, VOLTRONIX should evolve into:

```txt
Customer Website / Storefront
        ↓
Commerce Backend API
        ↓
PostgreSQL Database
        ↓
Inventory / Orders / Payments / Delivery / Accounting integrations
```

Recommended practical startup stack:

```txt
Next.js storefront
Supabase/Postgres database
NestJS or Next.js API layer depending scope
Cloudflare R2 or S3-compatible storage for product images
Cloudflare Images/CDN for optimized delivery
SSLCOMMERZ or shurjoPay for Bangladesh payment
COD support
Pathao / Steadfast courier workflow
Odoo for inventory, purchase, sales and accounting operations
Sentry for monitoring
Meilisearch or Postgres FTS for search initially
```

Core principle:

```txt
VOLTRONIX owns customer experience.
Database owns catalog/order records.
Inventory/ERP owns stock truth.
Payment provider owns payment authorization/settlement.
Courier owns shipment tracking.
Accounting software owns financial books.
```

Do not build a full ERP/accounting system inside the storefront.

---

## 13. Actual Product Image Strategy

Yes, production can and should use actual product images.

Sources:

```txt
manufacturer/supplier-authorized images
own product photography
authorized distributor media packs
```

Do not:

```txt
hotlink random images from other ecommerce websites
use copyrighted images without permission
store only external URLs as permanent dependency
overwrite existing image files after launch
```

Recommended flow:

```txt
Supplier/manufacturer image
→ import staging
→ validate file
→ normalize filename
→ upload original to R2/S3
→ generate optimized variants
→ save media record against product/SKU
→ render with Next Image/CDN URL
```

Recommended storage object pattern:

```txt
products/{brand}/{sku}/original/front.webp
products/{brand}/{sku}/original/side.webp
products/{brand}/{sku}/original/package.webp
```

Better versioned pattern:

```txt
products/{sku}/front-{checksum}.webp
```

---

## 14. Real Product Data Migration Plan

Current mock products in `lib/data.ts` should eventually be replaced by database-backed products.

Do not directly edit thousands of products into TypeScript.

Correct approach:

```txt
Master product spreadsheet / CSV
→ import validator
→ dry-run report
→ approval
→ transactional database import
→ search reindex
→ cache revalidation
```

Start with 50 real products, not 5,000.

Minimum production product fields:

```txt
SKU
Parent SKU
Barcode
Brand
Product name
Variant name
Category path
Slug
Price
Cost
Stock quantity
Warehouse/location
Supplier
Technical specs
Warranty
Product images
Status
```

SKU discipline:

```txt
Each sellable variant must have its own SKU.
Cable size/color/length variants need separate SKUs.
MCB amperage/pole variants need separate SKUs.
Socket color/series variants need separate SKUs.
```

Example:

```txt
MCB-16A-1P
MCB-32A-1P
WIRE-2.5MM-BLACK
WIRE-4MM-RED
```

---

## 15. Production Data Model Blueprint

Use relational product modeling.

Core entities:

```txt
products
skus / variants
brands
categories
category_aliases / slug_aliases
product_media
sku_attributes
warehouses / locations
inventory_levels
inventory_movements
inventory_reservations
suppliers
supplier_skus
customers
orders
order_lines
payments
payment_events
shipments
returns / RMA
refunds
quotes
quote_lines
price_lists
promotions
audit_logs
users
roles
permissions
```

Important rule:

```txt
Inventory belongs to SKU, not generic product.
```

Inventory formula:

```txt
Available to sell = on_hand - reserved - safety_stock
```

---

## 16. Admin / Operations Dashboard Specification

The admin dashboard is not optional for real ecommerce.

It should be an operations control panel, not decorative analytics.

### Roles

```txt
Owner / Super Admin
Catalog Manager
Warehouse / Inventory Staff
Procurement / Purchasing
Sales / Order Fulfillment
Customer Support
Finance / Accounting
B2B / Wholesale Sales
Read-only Analyst
```

### Core modules

```txt
Overview
Products
SKUs / Variants
Categories
Brands
Product Images / Media
Import Center
Inventory
Stock Ledger
Stock Reservations
Stock Adjustments
Warehouse Transfers
Cycle Counts
Damaged Stock
Low-stock Alerts
Suppliers
Purchase Orders
Goods Receiving
Landed Cost
Orders
Fulfillment
Shipping / Tracking
Returns / RMA
Refunds
Customers
B2B Accounts
Quotes
Negotiated Pricing
Promotions
Price History
Payments
Reports
Audit Logs
Settings
```

### Dashboard UX rules

```txt
Use dense operational tables.
Support filters/search/sort.
Use bulk actions carefully.
Show role-specific action queues.
Show exceptions before vanity metrics.
Show audit history for sensitive records.
Require reason notes for stock/price/order changes.
Use confirmation for destructive actions.
```

### Role-specific KPI examples

Owner:

```txt
net sales
gross margin
orders
AOV
payment success rate
stockout rate
return rate
cash/COD pending
```

Catalog manager:

```txt
active products
draft products
missing images
missing specs
duplicate SKUs
broken slugs
import errors
```

Warehouse:

```txt
orders to pick
orders packed
late fulfillment
stock discrepancies
cycle count tasks
damaged stock
```

Procurement:

```txt
low-stock SKUs
reorder suggestions
open purchase orders
supplier lead time
receiving delays
```

Finance:

```txt
paid orders
COD pending
refunds pending
payment reconciliation gaps
courier COD settlement gaps
sales vs accounting sync status
```

Customer support:

```txt
open tickets
return requests
cancel requests
failed payments
late deliveries
```

---

## 17. Order, Payment, Fulfillment State Machines

### Order status

```txt
DRAFT
PLACED
CONFIRMED
PROCESSING
COMPLETED
CANCELLED
```

### Payment status

```txt
UNPAID
PENDING
PAID
FAILED
PARTIALLY_REFUNDED
REFUNDED
```

### Fulfillment status

```txt
UNFULFILLED
RESERVED
PICKING
PACKED
SHIPPED
DELIVERED
RETURNED
```

### Return / RMA status

```txt
REQUESTED
APPROVED
IN_TRANSIT
RECEIVED
INSPECTED
RESTOCKED
SCRAPPED
REFUND_PENDING
REFUNDED
REJECTED
```

Payment webhook rule:

```txt
Never confirm an order from browser success page only.
Always verify server-side with payment provider.
Webhook handlers must be idempotent.
provider_event_id must be unique.
```

---

## 18. Inventory and Operations Rules

Critical inventory model:

```txt
on_hand
reserved
available_to_sell
incoming
safety_stock
```

Never do only:

```sql
UPDATE product SET stock = stock - 1;
```

Use:

```txt
inventory ledger
reservation records
atomic transaction during checkout confirmation
stock movement audit trail
```

Stock movement types:

```txt
purchase_receive
sale_reserve
sale_release
sale_ship
return_receive
adjustment_plus
adjustment_minus
transfer_out
transfer_in
damage_writeoff
cycle_count_correction
```

Controls:

```txt
All manual stock changes require reason.
All stock changes create inventory_movement record.
Low-stock rules trigger reorder suggestions.
Returns only increase stock after inspection.
Damaged goods must not return to available stock.
```

---

## 19. Accounting and Finance Rules

Do not build full accounting/general ledger inside VOLTRONIX.

Recommended:

```txt
Odoo Accounting
or accountant-approved accounting software
or export/sync to accounting system
```

VOLTRONIX should record commercial events:

```txt
order created
payment received
refund created
shipment cost
return received
stock movement
```

Accounting system should own:

```txt
sales journals
COGS
inventory valuation
purchases/AP
B2B AR/credit
VAT/tax
refund accounting
payment reconciliation
bank/COD reconciliation
financial reports
```

Finance guardrails:

```txt
Do not treat payment success page as accounting truth.
Do not refund without linking to order/payment/return.
Do not restock returned item before inspection.
Do not allow manual price/stock edits without audit log.
Do not let ecommerce DB and accounting books diverge silently.
```

---

## 20. Payment and Delivery Specification

### Payment providers for Bangladesh-first launch

Prefer:

```txt
SSLCOMMERZ
shurjoPay
COD
```

Do not assume Stripe is available for Bangladesh direct merchant setup.

Payment architecture:

```txt
PaymentProvider interface
SSLCommerzProvider
ShurjoPayProvider
CashOnDeliveryProvider
```

Payment flow:

```txt
checkout
→ create payment session
→ customer pays
→ provider webhook/IPN
→ backend verifies payment
→ order confirmed
→ stock reservation/allocation finalized
```

### Delivery

Start with:

```txt
Pathao
Steadfast
manual courier booking acceptable for MVP
```

Later:

```txt
create shipment from admin
save tracking number
sync tracking status
notify customer
handle return delivery
```

Shipment fields:

```txt
carrier
service
tracking_number
tracking_url
label_url
cost
status
shipped_at
delivered_at
```

---

## 21. Security, Reliability and Environment Rules

Production environments:

```txt
local
development
staging
production
```

Rules:

```txt
Separate production and staging databases.
Separate production and staging storage buckets.
Separate sandbox and live payment credentials.
Never send staging orders to real courier accidentally.
No secrets in NEXT_PUBLIC_* unless intentionally public.
MFA for admin users.
RBAC for all admin modules.
Audit logs for sensitive actions.
Rate limit public APIs.
Validate all CSV imports.
Validate all webhook signatures or provider verification flows.
Use idempotency keys for payment/order operations.
Backups must be tested, not just enabled.
```

Monitoring:

```txt
Sentry errors
structured logs
payment webhook failure alert
checkout failure alert
database backup alert
uptime monitoring
```

Backup target:

```txt
RPO launch: <= 24 hours
RTO launch: <= 4 hours
Growth RPO: 5–15 minutes
Growth RTO: <= 1 hour
```

---

## 22. Build-vs-Buy Decision

Build custom:

```txt
VOLTRONIX storefront
product browsing UX
category/search pages
cart/checkout UI
admin control dashboard
catalog import tool
order operations screen
quote request workflow
B2B frontend experience
```

Buy/integrate:

```txt
payment gateway
courier/delivery system
object storage/CDN
error monitoring
email/SMS provider
accounting software
ERP/inventory backend if possible
```

Do not build from scratch at launch:

```txt
full ERP
full WMS
full accounting ledger
payment gateway
courier network
advanced BI platform
marketplace sync engine
```

---

## 23. Launch Roadmap

### First 30 days — Catalog foundation

```txt
Create production product schema
Create master product CSV
Collect 50 real products
Collect authorized images
Build product import dry-run
Store images in proper storage
Connect staging storefront to database catalog
Keep checkout mock or disabled
```

Acceptance:

```txt
50 products imported
all SKUs unique
no broken primary images
category links work
search works
product pages render from database
mock fallback available if needed
```

### 60 days — Orders and inventory

```txt
Backend order creation
Cart validation
Checkout validation
Inventory reservation
Admin order dashboard
Payment sandbox
COD flow
Manual courier workflow
Customer email/SMS placeholder
```

Acceptance:

```txt
20–50 internal test orders pass
stock reserves correctly
failed payment releases reservation
duplicate webhook does not duplicate order
admin can process order
```

### 90 days — Soft launch

```txt
Live payment
COD live
Courier workflow
Return/refund process
Accounting export or Odoo sync
Backup test
Security check
Monitoring
Legal pages
Soft launch with limited users
```

Acceptance:

```txt
payment success/fail tested
refund tested
return tested
courier tracking tested
stock reconciliation passes
finance reconciliation works
checkout can be disabled by emergency flag
```

---

## 24. Go-Live Checklist

Do not public launch until these are done:

```txt
All SKUs unique
No broken category route
No broken product slug
No broken primary product image
Prices verified
Stock count verified
Payment success tested
Payment failure tested
Duplicate payment webhook tested
COD tested
Courier booking tested
Order email/SMS tested
Return/refund tested
Admin roles secured
Audit logs enabled
Database backup tested
Image backup/retention strategy ready
Terms page ready
Privacy policy ready
Return/refund policy ready
Delivery policy ready
Contact/support page ready
Domain connected
Business email ready
Analytics connected
Sentry/monitoring connected
Production secrets secured
```

Emergency flags:

```txt
CHECKOUT_ENABLED=false
PAYMENT_ENABLED=false
COD_ENABLED=false
```

---

## 25. Failure Modes to Avoid

```txt
Launching with mock product data
Duplicate SKUs
Random manual stock edits
Overselling due to no reservations
Confirming orders from browser success page
Non-idempotent payment webhooks
Duplicate orders from retries
CSV imports without validation
Hotlinking product images
Losing image originals
Changing slugs without redirects
Frontend and inventory system having different stock truth
Refunding without stock/payment reconciliation
Admin users with excessive permissions
No audit trail
No backup restore test
Building accounting from scratch
Overbuilding ERP before first real orders
```

---

## 26. Coding Style and Implementation Rules for Codex

When editing code:

```txt
Make the smallest safe change that solves the task.
Prefer existing components and patterns.
Preserve public component APIs when possible.
Keep data centralized.
Avoid duplicated hardcoded category lists unless creating one official central source.
Use explicit lucide-react imports only.
Avoid dynamic icon maps that can cause build instability.
Do not add unused dependencies.
Do not introduce browser-only code into server components.
Do not use Date.now(), Math.random(), or new Date() in SSR-rendered JSX.
Do not suppress real errors.
Fix the exact build error if build fails.
```

When a task is ambiguous:

```txt
Choose stability over redesign.
Choose frontend-only if backend was not requested.
Choose compact professional ecommerce UI over flashy marketing.
Choose central mapping over scattered hardcoded slugs.
Choose route safety over visual experimentation.
```

---

## 27. Current Best Next Task

If no specific task is given, the safest high-value next task is:

```txt
Shorten and polish the homepage without breaking the existing hero or routes.
```

Scope:

```txt
Remove long homepage catalogue loops.
Keep Hero.
Add/clean category discovery.
Limit featured/trending previews to 8 each.
Add compact Price Challenge CTA.
Add compact Home & Building Solutions CTA.
Keep homepage unpaginated.
Run pnpm build.
Verify all category/search/cart/checkout routes.
```

---

## 28. Preferred Final Product Flow

```txt
Homepage
  = discovery + trust + curated products

Category page
  = full browsing + pagination

Search page
  = query results + pagination + filters later

Product page
  = buying decision + specs + conversion

Cart
  = order review

Checkout
  = order intent / payment later

Admin dashboard
  = operations control panel

ERP/accounting
  = inventory, purchase, finance truth
```

---

## 29. Advisor Recommendation

Build VOLTRONIX in this order:

```txt
1. Stabilize frontend
2. Compact professional homepage
3. Reliable category/search/product browsing
4. Real catalog schema
5. Product import + actual images
6. Admin catalog dashboard
7. Orders + inventory reservations
8. Payment sandbox
9. Courier workflow
10. Accounting/ERP integration
11. Soft launch
12. Scale search, B2B, procurement and reporting
```

Do not jump directly from mock frontend to full ERP-scale system.

The first real production foundation is:

```txt
50 real products
real SKU system
real images
real stock count
safe import process
database-backed catalog
```

