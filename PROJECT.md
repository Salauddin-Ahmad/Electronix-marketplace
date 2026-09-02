# PROJECT.md — VOLTRONIX Project Definition

## 1. Product definition

VOLTRONIX / Electro Grid Marketplace is an electrical and electronics ecommerce marketplace for:

```txt
homeowners
technicians
electricians
contractors
small businesses
builders
repair shops
wholesale buyers
```

Product scope:

```txt
electrical wiring and cable
switches and sockets
lighting and fans
circuit protection
hand tools and testers
electronics repair items
battery, charging and BMS products
DC power modules
smart electrical and automation
home/building project solutions
```

Positioning:

```txt
professional supplier marketplace
technical but easy to shop
real product browsing
quote and project-supply capability
retail + B2B-ready
```

Not the positioning:

```txt
generic SaaS landing page
AI template ecommerce
flashy tech startup site
fake marketplace with no operating backbone
full ERP built from scratch on day one
```

## 2. Current state

Current app is a frontend prototype.

Current architecture:

```txt
Browser
→ Next.js App Router pages
→ shared React components
→ lib/data.ts mock/generated catalog
→ client-only cart/forms/state
```

Current limitations:

```txt
no database
no API
no auth
no real customer accounts
no payment verification
no persistent cart
no real order processing
no real stock reservation
no inventory ledger
no supplier/purchase workflow
no accounting integration
no production admin operations system
```

Do not confuse a good frontend prototype with a functioning ecommerce business.

## 3. Current technical stack

Preserve unless explicitly asked:

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
lucide-react
Three.js/circuit hero boundary
mock data in lib/data.ts
frontend-only routes
```

Important route groups:

```txt
/                         homepage
/category/[slug]          category listing
/product/[id or slug]     product detail
/search                   catalog search
/cart                     client cart
/checkout                 mock checkout
/account                  placeholder account
/dashboard                mock admin dashboard
/solutions                project quotation form
/wholesale                wholesale page
/price-challenge          price challenge form
```

## 4. Product experience target

User should understand within 5 seconds:

```txt
what VOLTRONIX sells
where to start shopping
main categories available
that the business is supplier-grade
that project quotation/price challenge exists
```

Correct frontend flow:

```txt
Homepage = discovery + trust + curated products
Category page = browsing + pagination
Search page = search results + pagination
Product page = decision + conversion
Cart = review
Checkout = order intent / later real order flow
Dashboard = later operational control center
```

## 5. Public category model

Nine customer-facing navigation categories:

```txt
Electrical & Wiring          /category/electrical-wiring
Switches & Sockets           /category/switches-sockets
Lighting & Fans              /category/lighting-fans
Circuit Protection           /category/circuit-protection
Tools & Testers              /category/tools-testers
Electronics & Repair         /category/electronics-repair
Power & Backup               /category/power-backup
Smart Electrical             /category/smart-electrical
Home Solutions               /category/home-solutions
```

These must be centrally defined and reused by:

```txt
header
footer
homepage category grid
category route generation
category filter logic
admin category selectors later
```

## 6. Design target

Visual character:

```txt
premium
compact
technical
supplier-grade
trustworthy
clear hierarchy
fast scanning
product-first
```

Preferred brand feel:

```txt
dark navy / technical background
white product surfaces
yellow commerce/action accent
blue/magenta electrical hero acceptable
controlled shadows
restrained borders
```

Avoid:

```txt
excessive gradients
fake reviews
fake stats
oversized marketing copy
huge empty sections
cluttered cards
complex animation outside hero
roundness everywhere
```

## 7. Business launch target architecture

Production target:

```txt
Next.js storefront
→ Commerce API / service layer
→ PostgreSQL database
→ Admin operations dashboard
→ object storage/CDN for images
→ payment provider
→ courier/delivery provider
→ accounting/ERP integration
→ monitoring/backups/security
```

Source-of-truth rule:

```txt
Storefront owns customer experience.
Commerce DB owns catalog/order records.
Inventory/ERP or commerce DB owns stock truth depending phase.
Payment provider owns payment authorization/settlement truth.
Courier owns shipment tracking truth.
Accounting system owns financial books.
```

Never allow two systems to independently own the same truth without reconciliation.

## 8. Production philosophy

Day-one startup ecommerce should be operationally correct before it is feature-rich.

Build first:

```txt
real catalog
real images
real prices
SKU discipline
cart/order path
admin product/order management
stock visibility
manual fulfillment workflow
payment/COD verification
basic accounting export
backups/monitoring
```

Postpone:

```txt
full ERP clone
advanced AI recommendations
mobile app
multi-vendor marketplace logic
complex promotions engine
advanced warehouse optimization
custom accounting ledger
```
