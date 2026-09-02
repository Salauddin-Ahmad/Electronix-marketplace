# ROADMAP.md — VOLTRONIX Implementation Roadmap

## 1. Current priority

Do not start production backend before the frontend buying path is stable.

Current highest-value frontend stabilization:

```txt
centralize category/navigation mapping
fix search shortcut behavior
connect available product images safely
add Add-to-Cart actions
fix cart subtotal/currency consistency
make checkout clearly mock
verify build/routes
```

## 2. Phase 0 — Frontend stabilization

Goal: existing prototype behaves like a coherent frontend ecommerce demo.

Tasks:

```txt
1. Preserve compact homepage.
2. Add missing homepage Price Challenge and Home Solutions CTAs if absent.
3. Ensure all nine category routes work.
4. Fix hidden/unmapped product access if safe.
5. Fix /search empty/all behavior.
6. Add visible Add-to-Cart path.
7. Fix BDT currency consistency.
8. Avoid fake checkout claims.
9. Run pnpm build.
```

Acceptance:

```txt
homepage not long
hero works
category/search pagination works
cart can receive items through UI
cart totals correct for priced products
quote-only products handled honestly
checkout does not pretend to be real
all required routes build
```

## 3. Phase 1 — Real catalog foundation

Goal: replace mock catalog with real structured data source without redesigning frontend.

Tasks:

```txt
create product master CSV format
choose database
create product/category/brand/SKU/image schema
build import validation
import 50 real products first
upload/connect actual product images
add cost/selling price fields
add stock quantity fields
add product status workflow
```

Acceptance:

```txt
50 real products visible on staging
all SKUs unique
no broken images
prices verified
categories correct
search works against database data
frontend components unchanged or minimally adapted
```

## 4. Phase 2 — Cart, order and inventory MVP

Goal: turn storefront into controlled order-intent system.

Tasks:

```txt
backend cart/order validation
server-side price validation
server-side stock validation
order draft creation
stock reservation logic
admin order dashboard
basic inventory balance
stock movement ledger
customer email/notification placeholder
```

Acceptance:

```txt
order cannot be created with invalid SKU
order cannot use stale frontend price
order cannot reserve more than available stock
order number unique
stock reservation visible in admin
cancelled order releases reservation
```

## 5. Phase 3 — Payment and delivery MVP

Goal: accept real payment/COD and fulfill manually.

Tasks:

```txt
payment provider integration
payment webhook verification
COD option
payment status dashboard
manual courier/tracking workflow
order status timeline
customer confirmation messages
failed payment handling
```

Acceptance:

```txt
payment success verified server-side
payment failure does not confirm order
duplicate webhook ignored safely
COD order clearly marked unpaid/pending collection
tracking number can be saved
customer can receive order status update
```

## 6. Phase 4 — Admin operations dashboard

Goal: staff can manage daily operations.

Tasks:

```txt
admin auth/RBAC
product/SKU management
CSV import/export
image management
inventory view
stock adjustments with audit log
order fulfillment workflow
returns/refunds workflow
suppliers and purchase orders
basic reports
```

Acceptance:

```txt
staff sees role-specific modules
dangerous actions audit logged
stock movements are ledger-based
PO receiving updates inventory
refund requires permission
bulk import has dry-run validation
```

## 7. Phase 5 — Accounting and reconciliation

Goal: business books do not diverge from ecommerce operations.

Tasks:

```txt
choose accounting/ERP package
create sales export
create payment reconciliation export
create COD reconciliation report
create refund report
create purchase/receiving export
create inventory valuation snapshot
```

Acceptance:

```txt
daily sales total matches order report
payment gateway settlement matches paid orders
COD collection report matches courier/cash receipt
refund report matches refunded orders
inventory movement summary matches stock balance changes
```

## 8. Phase 6 — Soft launch

Goal: launch with controlled scope.

Tasks:

```txt
finalize 100–300 real products
verify stock counts
verify prices
verify legal/policy pages
configure domain/email
configure monitoring/backups
run payment sandbox/live test
run courier workflow test
run refund/return test
train staff
soft launch with limited traffic
```

Acceptance:

```txt
no broken critical route
no broken product image
order lifecycle tested end-to-end
backup restore tested
admin access secured
support process ready
manual operations documented
```

## 9. 30/60/90-day plan

### First 30 days

```txt
stabilize frontend buying path
prepare real product CSV
define SKU rules
collect 50 real products
collect real images
choose database/storage
prototype catalog import
show database-backed catalog on staging
```

### 60 days

```txt
admin product management
basic inventory balances
cart/order backend
order dashboard
stock reservation
payment sandbox
manual courier workflow
basic customer notification
```

### 90 days

```txt
payment live
COD process
returns/refunds process
accounting export
backup/restore test
security review
staff training
limited soft launch
```

## 10. Task sequencing rules

Do not do this:

```txt
build payment before order validation
build order validation before SKU/stock model
build accounting before order/payment records are stable
build advanced dashboard before basic product/order/inventory modules
launch with mock images/prices
```

Correct dependency order:

```txt
SKU/product data
→ stock model
→ order model
→ payment verification
→ fulfillment workflow
→ returns/refunds
→ accounting reconciliation
```
