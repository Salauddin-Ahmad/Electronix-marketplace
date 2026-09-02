# OPERATIONS.md — Backend and Operating System Blueprint

## 1. Operating system goal

VOLTRONIX needs two products:

```txt
1. Customer storefront
2. Internal operating system
```

The internal operating system is not optional. Real ecommerce needs control over:

```txt
catalog
images
prices
stock
orders
payments
delivery
returns
suppliers
purchase orders
accounting reconciliation
staff permissions
```

## 2. MVP architecture

Recommended MVP architecture:

```txt
Next.js storefront
Next.js/admin or separate admin area
Commerce API/service layer
PostgreSQL database
Object storage/CDN for product images
Payment gateway integration
Manual/semiautomated courier workflow
Accounting export or ERP integration
Monitoring + backups
```

Logical diagram:

```txt
Customer Browser
  ↓
Next.js Storefront
  ↓
Commerce API
  ↓
PostgreSQL
  ↓
┌──────────────────────┬─────────────────┬────────────────┬──────────────────┐
│ Admin Dashboard      │ Image Storage   │ Payment Gateway│ Courier Provider │
│ operations control   │ product media   │ verification   │ shipping/tracking│
└──────────────────────┴─────────────────┴────────────────┴──────────────────┘
  ↓
Accounting / ERP integration
```

## 3. Day-one essentials

Must exist before public launch:

```txt
real product database
real image storage
unique SKU discipline
admin product editing/import
basic stock count
cart and checkout flow
order creation
payment/COD method
order dashboard
manual fulfillment status updates
customer notification
admin roles
backup
monitoring
legal policy pages
```

Can be manual at launch:

```txt
supplier purchasing
courier booking
accounting journal entry
product photography workflow
stock cycle counting
B2B quotation approval
```

Should not be manual for public launch:

```txt
SKU uniqueness
order number generation
payment verification
stock reservation for online orders
admin audit log
database backup
```

## 4. Source-of-truth ownership

| Domain | Source of truth | Rule |
|---|---|---|
| Product browsing | Commerce DB | Storefront reads from DB/API, not static mock file. |
| SKU identity | Commerce DB | SKU unique and never reused. |
| Product images | Object storage + DB metadata | DB stores URLs/metadata; storage holds files. |
| Online order record | Commerce DB | Provider/courier updates attach to order. |
| Payment authorization | Payment provider | Commerce DB stores verified result. |
| Stock availability | MVP: Commerce DB. Later: ERP/inventory system | Only one system can own stock truth. |
| Shipment tracking | Courier provider | Commerce stores tracking snapshot/status. |
| Accounting books | Accounting/ERP software | Ecommerce exports/syncs sales, payments, stock and refund data. |

## 5. Inventory operation

Core quantities:

```txt
on_hand_qty      = physically present
reserved_qty     = committed to order but not shipped
safety_stock_qty = buffer not exposed online
available_qty    = on_hand_qty - reserved_qty - safety_stock_qty
```

Checkout must use available_qty, not on_hand_qty.

Stock movement types:

```txt
purchase_receipt
sale_reservation
sale_shipment
reservation_release
return_receipt
adjustment_in
adjustment_out
transfer
damaged
stock_count_correction
```

Controls:

```txt
all stock changes append to ledger
manual adjustment requires reason
large adjustment requires approval
cycle count corrections tracked
shipping deducts/resolves reservation
cancellation releases reservation
```

## 6. Order operation

Safe online order flow:

```txt
validate cart
→ create order draft
→ reserve stock atomically
→ create payment session or mark COD pending
→ receive payment webhook / COD confirmation
→ confirm order
→ pick
→ pack
→ ship
→ deliver
→ reconcile payment/delivery/accounting
```

Rules:

```txt
browser success page never confirms payment
payment webhook must be idempotent
same order cannot reserve stock twice
order number must be unique
checkout must revalidate price and stock server-side
```

## 7. Payment operation

Supported launch modes:

```txt
COD
local payment gateway
manual bank/mobile payment verification if needed
```

Payment records must store:

```txt
provider
provider reference
amount
currency
status
raw response
verification timestamp
```

Webhook controls:

```txt
unique webhook event id
signature/verification check if provider supports it
idempotent processing
order amount/currency match
log ignored/duplicate events
```

## 8. Delivery operation

MVP can start manual:

```txt
admin marks order ready
staff books courier manually
tracking number saved in order
customer notified
status updated manually or via courier callback later
```

Later automation:

```txt
create courier shipment from admin
fetch/update tracking
shipping label
failed delivery handling
return shipment
COD reconciliation
```

## 9. Procurement operation

Procurement flow:

```txt
low stock alert
→ purchase order draft
→ approval if needed
→ send to supplier
→ goods receipt
→ discrepancy/damaged recording
→ stock update
→ supplier bill/accounting export
```

MVP can use simple purchase orders; full supplier portal is not needed.

## 10. Returns/refunds operation

Return flow:

```txt
customer requests return
→ support reviews
→ return approved/rejected
→ goods received
→ condition checked
→ stock destination selected
→ refund processed if applicable
→ accounting reconciliation
```

Important distinction:

```txt
Return = physical goods movement
Refund = money movement
```

Never process refund without recording stock/accounting outcome.

## 11. Accounting architecture

Do not build a full accounting system inside VOLTRONIX.

Recommended:

```txt
VOLTRONIX owns ecommerce operations.
Accounting/ERP software owns books.
```

Ecommerce must export/sync:

```txt
sales summary
order lines
payment settlements
COD collections
refunds
purchase receipts
inventory movements
COGS/inventory valuation summary
supplier payable data
B2B receivable data
```

Accounting needs:

```txt
Sales
COGS
Inventory asset
Payment gateway clearing
COD clearing
Cash/bank
Shipping expense/revenue
Supplier payable
Customer receivable
Refunds/returns
Tax/VAT if applicable
```

## 12. Security requirements

Admin security minimum:

```txt
role-based access control
strong passwords or SSO later
no shared admin accounts
2FA recommended for owner/admin
all sensitive actions audit logged
least privilege roles
no public access to admin APIs
rate limit login and critical endpoints
```

Sensitive actions:

```txt
price change
stock adjustment
refund
order cancellation
manual payment mark-paid
supplier payment/export
role change
bulk import
```

## 13. Monitoring and backups

Minimum production controls:

```txt
application error monitoring
database backup daily at minimum
backup restore test before launch
server logs
payment webhook logs
admin audit logs
failed job queue visibility
uptime monitoring
```

Backups are not real until restore has been tested.

## 14. Build vs buy

Build/customize:

```txt
storefront
catalog browsing
product detail/cart/checkout UI
admin dashboard for catalog/orders/stock views
CSV import
quote request flow
basic inventory ledger if not using ERP day one
```

Buy/integrate:

```txt
payment gateway
courier network
object storage/CDN
email/SMS provider
accounting/ERP software
monitoring/error tracking
```

Do not custom-build:

```txt
payment gateway
courier system
full accounting ledger
large ERP from scratch
advanced warehouse management before volume exists
```

## 15. Failure modes and controls

| Failure | Control |
|---|---|
| Overselling | atomic stock reservation, available_qty calculation, reservation expiry |
| Duplicate order | idempotency key at checkout |
| Duplicate payment webhook | unique provider event id, idempotent processing |
| Wrong stock adjustment | ledger-only movement, reason, approval, audit |
| Bad CSV import | validation, dry run, import report, rollback batch |
| Broken images | image validation, fallback, storage checksum |
| Unauthorized admin action | RBAC + audit log + 2FA for admin |
| Refund without stock/accounting reconciliation | return/refund workflow separation |
| COD mismatch | courier/COD reconciliation report |
| Accounting mismatch | daily sales/payment/refund export reconciliation |
| Backup failure | scheduled backup + restore drill |
