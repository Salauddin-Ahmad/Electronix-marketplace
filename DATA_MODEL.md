# DATA_MODEL.md — VOLTRONIX Data Model

## 1. Design principle

Separate what is browsed from what is sold.

```txt
Product = marketing/catalog entity
SKU/Variant = sellable inventory entity
Inventory = stock position by location
Order = customer purchase intent
Payment = money movement
Fulfillment = shipment/delivery work
Accounting = financial record
```

Do not treat one flat product object as the production database.

## 2. Product catalog entities

### Category

```txt
id
name
slug
parent_id nullable
description
sort_order
is_active
seo_title
seo_description
created_at
updated_at
```

Rules:

```txt
slug unique
public navigation categories centrally mapped
raw/internal categories may map into public navigation categories
inactive categories do not appear in storefront navigation
```

### Brand

```txt
id
name
slug
logo_url nullable
country nullable
website nullable
is_active
created_at
updated_at
```

### Product

Product is the public catalog page.

```txt
id
name
slug
brand_id nullable
category_id
short_description
long_description
status: draft | active | archived
warranty_text nullable
seo_title nullable
seo_description nullable
created_at
updated_at
```

Rules:

```txt
slug unique
active product must have at least one active SKU or be marked quote-only
no random generated production slug without review
```

### ProductSpecification

Electrical products need structured specs.

```txt
id
product_id
name
value
unit nullable
group_name nullable
sort_order
```

Examples:

```txt
Voltage: 220 V
Current: 16 A
Wire size: 2.5 mm²
Pole: 1P
Breaking capacity: 6 kA
Color: White
Material: Copper
```

### SKU / Variant

SKU is the sellable unit.

```txt
id
product_id
sku
barcode nullable
variant_name nullable
attributes jsonb
unit_of_measure
pack_size
status: active | inactive | discontinued
cost_price
selling_price
compare_at_price nullable
currency
min_order_qty default 1
is_quote_only boolean
created_at
updated_at
```

Rules:

```txt
sku unique, never reused
same product with different amp/watt/size/color/pack = different SKU
cost price not visible to customer
quote-only SKU can appear but cannot go through normal paid checkout
```

SKU examples:

```txt
MCB-16A-1P
MCB-32A-1P
WIRE-2.5MM-BLACK-100M
WIRE-4MM-RED-100M
LED-BULB-12W-E27-WARM
SOCKET-13A-WHITE
```

### ProductImage

```txt
id
product_id nullable
sku_id nullable
url
alt_text
position
is_primary
source: own_photo | supplier | manufacturer | placeholder
checksum nullable
created_at
```

Rules:

```txt
no external hotlinking
image URL must be durable
one primary image per product/SKU
fallback image allowed but must be obvious/clean
```

## 3. Inventory entities

### Warehouse

```txt
id
name
code
address
is_active
```

### StockLocation

```txt
id
warehouse_id
name
code
location_type: sellable | receiving | damaged | return | quarantine
is_active
```

### InventoryBalance

Current stock snapshot.

```txt
id
sku_id
location_id
on_hand_qty
reserved_qty
safety_stock_qty
updated_at
```

Computed:

```txt
available_qty = on_hand_qty - reserved_qty - safety_stock_qty
```

Rules:

```txt
available_qty must never be negative for normal checkout
reserved_qty increases when order stock is reserved
reserved_qty decreases when shipped/cancelled/expired
```

### InventoryMovement

Append-only stock ledger.

```txt
id
sku_id
from_location_id nullable
to_location_id nullable
quantity
movement_type:
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
reference_type
reference_id
reason nullable
created_by
created_at
```

Rules:

```txt
never edit old movements; create correction movement
all stock changes must create movement record
manual adjustment requires reason and audit log
```

## 4. Supplier and purchasing entities

### Supplier

```txt
id
name
contact_person
phone
email
address
payment_terms
lead_time_days
status
created_at
updated_at
```

### PurchaseOrder

```txt
id
po_number
supplier_id
status: draft | submitted | partially_received | received | cancelled
expected_date nullable
subtotal
discount
shipping_cost
other_cost
currency
created_by
approved_by nullable
created_at
updated_at
```

### PurchaseOrderLine

```txt
id
purchase_order_id
sku_id
ordered_qty
received_qty
unit_cost
line_total
```

### GoodsReceipt

```txt
id
purchase_order_id
received_by
received_at
status: draft | posted | cancelled
notes
```

### GoodsReceiptLine

```txt
id
goods_receipt_id
sku_id
received_qty
damaged_qty
accepted_qty
unit_cost
location_id
```

Rules:

```txt
receiving increases stock only when posted
damaged quantity goes to damaged/quarantine location
receiving discrepancy must be recorded
```

## 5. Customer/order entities

### Customer

```txt
id
name
phone
email nullable
customer_type: retail | b2b
status
created_at
updated_at
```

### Address

```txt
id
customer_id nullable
name
phone
address_line_1
address_line_2 nullable
city
zone nullable
postal_code nullable
country
```

### Order

```txt
id
order_number
customer_id nullable
status:
  draft
  pending_payment
  confirmed
  picking
  packed
  shipped
  delivered
  cancelled
  returned
payment_status:
  unpaid
  pending
  paid
  partially_refunded
  refunded
fulfillment_status:
  unfulfilled
  partial
  fulfilled
  returned
currency
subtotal
discount_total
shipping_total
tax_total
grand_total
source: web | admin | quote
created_at
updated_at
```

### OrderLine

```txt
id
order_id
sku_id
product_name_snapshot
sku_snapshot
quantity
unit_price
line_total
is_quote_only
```

Rules:

```txt
snapshot product name and SKU at order time
price changes after order must not alter old order lines
quote-only line cannot be paid through normal checkout unless quoted price is approved
```

## 6. Payment entities

### Payment

```txt
id
order_id
provider
provider_reference
method: card | mobile_banking | bank | cod | manual
status: initiated | authorized | paid | failed | cancelled | refunded
amount
currency
raw_response jsonb
created_at
updated_at
```

### PaymentWebhookEvent

```txt
id
provider
event_id
order_id nullable
payload jsonb
processed_at nullable
status: received | processed | ignored | failed
created_at
```

Rules:

```txt
event_id unique per provider
webhook processing idempotent
browser redirect does not confirm payment
server verification required
```

## 7. Fulfillment entities

### Fulfillment

```txt
id
order_id
status: pending | picking | packed | shipped | delivered | failed | returned
warehouse_id
courier_provider nullable
tracking_number nullable
shipping_cost nullable
created_at
updated_at
```

### FulfillmentLine

```txt
id
fulfillment_id
order_line_id
sku_id
quantity
```

Rules:

```txt
stock reservation happens before confirmed checkout
stock shipment movement happens when shipped/fulfilled
partial fulfillment allowed later, not required day one
```

## 8. Returns/refunds entities

### ReturnRequest

```txt
id
order_id
status: requested | approved | received | rejected | refunded | closed
reason
created_by
created_at
updated_at
```

### ReturnLine

```txt
id
return_request_id
order_line_id
sku_id
quantity
condition: resellable | damaged | missing
refund_amount
```

Rules:

```txt
refund and stock receipt are separate actions
resellable returns increase sellable stock
 damaged returns go to damaged/quarantine
refund without return receipt must require approval reason
```

## 9. Quote/B2B entities

### B2BAccount

```txt
id
customer_id
company_name
trade_license nullable
credit_limit
payment_terms
status
```

### Quote

```txt
id
quote_number
customer_id nullable
b2b_account_id nullable
status: draft | sent | accepted | rejected | expired | converted
valid_until
subtotal
discount_total
grand_total
created_by
approved_by nullable
created_at
updated_at
```

### QuoteLine

```txt
id
quote_id
sku_id
quantity
requested_note nullable
quoted_unit_price nullable
line_total nullable
```

Rules:

```txt
quote acceptance can convert to order
large discounts require approval
quote price snapshots must be preserved
```

## 10. Accounting integration records

Do not build full accounting ledger inside ecommerce app unless absolutely required.

Recommended ecommerce-side records:

```txt
AccountingExportBatch
AccountingExportLine
PaymentReconciliation
CODReconciliation
InventoryValuationSnapshot
```

Accounting system should own:

```txt
general ledger
journal entries
financial statements
tax/VAT reporting
supplier payable ledger
customer receivable ledger
```

Ecommerce system should provide:

```txt
sales order data
payment data
refund data
purchase receiving data
inventory movement summary
COGS estimate/inventory valuation input
```

## 11. Critical state machines

### Order

```txt
draft
→ pending_payment
→ confirmed
→ picking
→ packed
→ shipped
→ delivered
```

Cancellation paths:

```txt
draft → cancelled
pending_payment → cancelled
confirmed → cancelled with reservation release
```

### Payment

```txt
initiated
→ authorized/paid
→ refunded/partially_refunded
```

Failure path:

```txt
initiated → failed/cancelled
```

### Inventory reservation

```txt
available
→ reserved for order
→ shipped deducts on-hand/reserved
```

Release path:

```txt
reserved → released on cancellation/payment timeout
```

### Purchase order

```txt
draft
→ submitted
→ partially_received
→ received
```

### Return

```txt
requested
→ approved
→ received
→ refunded
→ closed
```

## 12. Import CSV minimum columns

For first production catalog import:

```csv
sku,product_name,brand,public_category,raw_category,subcategory,variant_name,unit_of_measure,pack_size,cost_price,selling_price,currency,stock_qty,safety_stock_qty,supplier_name,image_filename,status,short_description,spec_voltage,spec_current,spec_power,spec_size,spec_color,warranty
```

Import validation must reject:

```txt
duplicate SKU
missing product name
missing category
negative price
negative stock
invalid image filename
invalid currency
unknown supplier if supplier required
```
