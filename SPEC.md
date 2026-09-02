# SPEC.md — Current Frontend Specification

## 1. Scope

This specification governs the current Next.js frontend prototype.

Default assumption:

```txt
frontend-only
mock data
no real backend
no real payment
no real inventory
no real account/auth
```

When improving the project, preserve this boundary unless explicitly implementing a backend phase.

## 2. Homepage specification

Homepage purpose:

```txt
category discovery
supplier trust
curated product previews
project/quote entry points
```

Correct structure:

```txt
1. SiteHeader
2. Hero
3. Shop by Category
4. Featured Products preview
5. Trending/Popular Products preview
6. Price Challenge CTA
7. Home & Building Solutions CTA
8. SiteFooter
```

Homepage limits:

```txt
category cards: max 9
featured products: max 8
trending/popular products: max 8
pagination: never
```

Forbidden homepage behavior:

```txt
all products grid
category-by-category product grid loops
hundreds of products rendered
long duplicated showcases
full catalog experience
```

## 3. Hero specification

Hero must retain existing circuit animation behavior.

Allowed changes:

```txt
copy tightening
CTA styling
search styling
spacing reduction
min-height tuning
mobile whitespace reduction
```

Forbidden changes:

```txt
remove animation
replace animation
move animation to full background
touch Three.js internals without task scope
access browser APIs during SSR
increase hero height
```

Target sizing:

```txt
desktop hero panel: approx. 480–520px tall
mobile animation block: approx. 260–320px tall
```

Hero message should communicate:

```txt
Everything electrical, electronics, tools, wiring, lighting and project supplies in one place.
```

## 4. Category/listing specification

Category routes must support:

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

Category page behavior:

```txt
validate slug against navigation category mapping
map navigation category to raw source categories
filter products
paginate results
return notFound() only for invalid category slug
```

Pagination:

```txt
page size: 12
query param: ?page=2
invalid page → page 1 or safe clamp
Previous/Next required
page numbers optional if simple
```

## 5. Search specification

Search must support:

```txt
product name
SKU
category
subcategory
tags
```

Search page behavior:

```txt
empty query shows all products
/search?q=all should show all products if links use it
pagination preserved when query changes
invalid page handled safely
```

Avoid broken shortcuts:

```txt
/search?q=best returning 0
/search?q=brands returning 0
/search?q=compare returning 0
```

If shortcuts exist, either make them meaningful or remove/change them.

## 6. Product card specification

ProductCard must preserve:

```txt
product detail link
existing product model compatibility
responsive layout
homepage/listing usage
```

ProductCard should show:

```txt
image or placeholder
brand if available
product name
category/subcategory
price or quote-required state
stock/availability
primary action
```

Primary action rules:

```txt
priced item → Add to cart
price missing/null → Request quote / View details
```

Do not show fake:

```txt
reviews
ratings
discounts
stock numbers
supplier promises
```

## 7. Product page specification

Product detail page should support:

```txt
breadcrumb
image area
name
SKU
brand if available
category/subcategory
price or quote-required state
availability
quantity selector if priced
add-to-cart if priced
quote/request action if not priced
specification table
related products
```

Until backend exists:

```txt
no real order claim
no real payment claim
no persistent inventory promise
```

## 8. Cart specification

Cart is frontend-only until backend phase.

Correct behavior:

```txt
add item from ProductCard/product page
increase/decrease quantity
remove item
calculate subtotal using price × quantity
use consistent BDT currency
handle quote-required products explicitly
```

Incorrect behavior:

```txt
cart always empty through visible UI
subtotal zero for products that are actually quote-only
currency mismatch between product cards and checkout
shipping/tax rules inconsistent across cart and checkout
```

## 9. Checkout specification

Until backend exists, checkout is mock.

It may collect/display:

```txt
contact info
address info
order summary
mock payment section
quote-required notice
```

It must not claim:

```txt
real payment captured
real order placed
real stock reserved
real courier booking created
```

## 10. Image specification

Current allowed image sources:

```txt
local public assets
future object storage/CDN URLs
```

Do not hotlink external product images.

If assigning existing images:

```txt
inspect public/products
use stable deterministic mapping
avoid build-time randomness
avoid broken image paths
fallback to clean placeholder
```

Future production media workflow:

```txt
supplier/manufacturer image with permission OR own product photo
→ upload to object storage
→ generate optimized sizes
→ attach to SKU/product image records
→ serve through CDN
```

## 11. Styling specification

Maintain:

```txt
Tailwind global CSS import
responsive grids
clean ecommerce hierarchy
accessible contrast
compact section spacing
```

Product grids:

```txt
desktop: 4 columns where supported
tablet: 3 columns where supported
mobile: 2 columns where supported
```

Avoid:

```txt
design reset
huge global style changes
random colors
uncontrolled gradients
excessive shadows
```

## 12. Safe implementation sequence

For the current frontend, the next best sequence is:

```txt
1. centralize navigation mappings
2. fix search shortcuts
3. map hidden products into navigation or document them
4. add usable image mapping
5. add add-to-cart actions
6. fix cart currency/totals
7. keep checkout mock but honest
8. build and route verify
```
