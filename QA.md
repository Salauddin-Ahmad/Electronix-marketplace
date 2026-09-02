# QA.md — VOLTRONIX Build, Release and Go-Live Checklist

## 1. Required build command

Run after code changes:

```bash
pnpm build
```

Do not treat a dev server as proof of correctness.

## 2. Required frontend route verification

Verify:

```txt
/
/category/electrical-wiring
/category/switches-sockets
/category/lighting-fans
/category/ion-circuit-protection
```

Correct route list:

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
/search
/cart
/checkout
```

Also verify at least two product detail pages.

## 3. Homepage QA

Pass criteria:

```txt
homepage is compact
hero renders
hero not oversized
next section appears quickly
max 9 category cards
max 8 featured products
max 8 trending/popular products
no all-products grid
no category-by-category loops
Price Challenge CTA present if intended
Home/Building Solutions CTA present if intended
all homepage links work
```

Fail criteria:

```txt
homepage becomes full catalog
hero animation broken
hero moved to background
mobile has huge whitespace
category cards link to 404
product cards lose links
```

## 4. Category/search QA

Category pages:

```txt
valid category slugs return page
invalid category slug returns notFound/404
products match category mapping
pagination works
?page=2 works
invalid ?page=abc safe fallback
?page=-1 safe fallback
oversized page safe behavior
```

Search:

```txt
empty query shows all products
/search?q=all shows all products if link exists
search by SKU works
search by product name works
search by category/subcategory works
pagination preserves query
no special header/footer link returns meaningless 0 results
```

## 5. Product card/page QA

Product card:

```txt
image or placeholder visible
name readable
category/subcategory visible
price or quote-required visible
CTA behavior correct
product detail link works
responsive grid okay
```

Product page:

```txt
valid product opens
invalid product safe 404
related products render
add-to-cart works for priced products if enabled
quote-required products do not show misleading buy flow
```

## 6. Cart/checkout QA

Cart:

```txt
visible UI can add product
quantity increase/decrease works
remove works
subtotal = price × quantity
BDT currency consistent
quote-only product handled explicitly
refresh behavior documented if cart is not persistent
```

Checkout:

```txt
clearly mock if no backend
does not claim payment captured
does not claim real stock reserved
does not claim real order placed
order summary matches cart
no hidden dollar/BDT mismatch
```

## 7. Image QA

```txt
no broken image URLs
no external hotlinked images
fallback placeholder works
image paths deterministic
same product does not get random image each build
public assets referenced correctly
```

## 8. Data QA before real launch

Product data:

```txt
SKU unique
product name present
category assigned
brand reviewed
price reviewed
cost reviewed privately
stock count verified
image present or intentional placeholder
specs reviewed for electrical accuracy
status active/draft correct
SEO title/description reviewed for important products
```

CSV import:

```txt
dry run available
duplicate SKU rejected
negative stock rejected
negative price rejected
unknown category rejected or mapped explicitly
invalid image filename rejected
import batch logged
rollback/correction plan exists
```

## 9. Backend QA before real order launch

```txt
server-side price validation
server-side stock validation
atomic stock reservation
unique order number
idempotency key for order creation
payment webhook verification
duplicate webhook ignored
order cancellation releases stock
refund does not automatically restock damaged goods
admin actions audit logged
RBAC enforced
```

## 10. Security QA

```txt
admin not publicly open
least privilege roles
no shared admin account
2FA for owner/admin recommended
secrets not committed
API rate limits for auth/checkout/payment webhook where appropriate
webhook signature/verification if provider supports it
input validation on CSV/import/forms
file upload type/size validation
```

## 11. Monitoring/backup QA

```txt
error monitoring active
payment webhook logs accessible
admin audit logs accessible
database backup scheduled
object storage backup/versioning strategy defined
restore test completed
uptime check configured
failed background jobs visible
```

## 12. Soft launch go/no-go

Go only if:

```txt
critical routes pass
real products/prices/images verified
payment/COD tested
order dashboard works
stock reservation works
manual delivery workflow works
return/refund process documented
accounting export/reconciliation process ready
backup restore tested
admin access secured
support contact/policies visible
```

No-go if:

```txt
mock product data still appears as real
stock count not verified
payment verification depends only on browser redirect
cart totals wrong
admin access unsecured
no backup/restore test
return/refund policy missing
```
