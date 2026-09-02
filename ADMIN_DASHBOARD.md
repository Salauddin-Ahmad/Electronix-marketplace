# ADMIN_DASHBOARD.md — VOLTRONIX Internal Dashboard Specification

## 1. Purpose

The admin dashboard is the operating control center for VOLTRONIX.

It should not be decorative analytics. It should help staff complete operational work accurately.

Core jobs:

```txt
manage products
manage prices
manage images
manage inventory
process orders
handle payment/delivery statuses
handle returns/refunds
manage suppliers and purchase orders
support customers
manage B2B quotes
export/reconcile accounting data
control staff permissions
review audit history
```

## 2. Dashboard navigation

Recommended sidebar:

```txt
Overview
Action Queue
Orders
Products
Inventory
Purchasing
Suppliers
Customers
B2B / Quotes
Returns
Payments
Delivery
Promotions
Reports
Accounting Export
Users & Roles
Settings
Audit Logs
```

Global header:

```txt
global search
alerts
current warehouse selector if multi-location
user/account menu
quick create actions
```

Global search should search:

```txt
order number
SKU
product name
customer phone
customer email
supplier name
purchase order number
tracking number
quote number
```

## 3. Role-based views

### Owner/Admin

Needs:

```txt
sales overview
order backlog
low-stock alerts
payment reconciliation issues
refund approvals
stock adjustment approvals
top products
cash/COD status
system health
user permissions
```

Permissions:

```txt
all modules
role management
critical approvals
settings
exports
```

### Catalog Manager

Needs:

```txt
products missing images
products missing prices
draft products
inactive products
category mapping issues
duplicate/invalid SKU warnings
bulk import status
```

Permissions:

```txt
create/edit products
create/edit categories
upload images
edit specs
request price changes
cannot issue refunds
cannot mark payments paid
cannot change user roles
```

### Warehouse/Inventory Staff

Needs:

```txt
pick queue
stock lookup
receiving queue
cycle count list
low stock
reserved stock
stock adjustments
transfers
damaged stock
```

Permissions:

```txt
receive goods
pick/pack orders
record stock counts
request adjustments
move stock between locations
cannot change selling price
cannot refund payments
```

### Procurement/Purchasing

Needs:

```txt
low-stock reorder list
supplier lead times
purchase orders
expected receipts
receiving discrepancies
supplier price history
```

Permissions:

```txt
create purchase orders
submit PO for approval
update supplier info
view cost prices
cannot edit customer order payments
```

### Sales/Order Fulfillment

Needs:

```txt
new orders
payment status
COD orders
ready-to-ship orders
failed delivery orders
customer notes
quote conversion queue
```

Permissions:

```txt
view/edit order status
create manual orders if allowed
add internal notes
assign courier/tracking
cannot adjust stock except through fulfillment flow
```

### Customer Support

Needs:

```txt
customer search
order status
delivery tracking
return requests
refund status
conversation notes
```

Permissions:

```txt
view orders/customers
create return requests
add notes
request refund
cannot approve refund
cannot change product prices
```

### Finance/Accounting

Needs:

```txt
paid orders
unpaid/COD orders
payment gateway reconciliation
refunds
shipping fees
daily sales export
purchase receipts
inventory valuation summary
B2B receivables
```

Permissions:

```txt
view financial reports
export accounting data
mark manual reconciliation status
approve financial corrections if assigned
cannot edit product content
```

### B2B/Wholesale

Needs:

```txt
quote requests
company accounts
negotiated pricing
credit limits
large order availability
project BOM requests
quote expiry
```

Permissions:

```txt
create quotes
edit quote line prices within limit
submit discount approval
convert quote to order
view B2B customers
```

## 4. Module specifications

### Overview

Should show actionable cards, not vanity numbers:

```txt
orders needing action
payments needing verification
low-stock SKUs
orders ready to ship
returns awaiting review
POs expected today/this week
products missing price/image
failed jobs/webhooks
```

### Action Queue

Single operational queue for urgent tasks:

```txt
payment mismatch
stock below reorder point
new return request
PO receiving discrepancy
product import failed
refund approval required
order stuck in pending payment
shipment without tracking number
```

Each item:

```txt
type
priority
created time
owner/role
linked record
recommended action
status
```

### Products

Product table columns:

```txt
image
name
SKU count
brand
category
status
price completeness
image completeness
stock status
updated at
```

Product detail admin tabs:

```txt
General
SKUs/Variants
Images
Specifications
Pricing
Inventory
SEO
Related products
Audit history
```

Bulk actions:

```txt
activate/deactivate
assign category
export selected
import updates
mark quote-only
```

### Inventory

Inventory views:

```txt
stock by SKU
stock by warehouse
reserved stock
low stock
damaged/quarantine
stock movements ledger
cycle counts
transfers
adjustments
```

Stock adjustment form requires:

```txt
SKU
location
quantity
reason
attachment optional
approval if above threshold
```

### Orders

Order table filters:

```txt
status
payment status
fulfillment status
date
delivery method
COD/prepaid
customer
warehouse
```

Order detail tabs:

```txt
Summary
Items
Payment
Fulfillment
Customer
Timeline
Internal notes
Returns/refunds
Audit history
```

Order timeline must show:

```txt
created
stock reserved
payment initiated
payment verified
confirmed
picked
packed
shipped
delivered
cancelled/refunded if applicable
```

### Purchasing

PO list columns:

```txt
PO number
supplier
status
expected date
ordered qty
received qty
value
created by
```

Receiving screen:

```txt
scan/select PO
show ordered lines
enter received qty
enter damaged qty
select destination location
post receipt
create discrepancy note
```

### Returns

Return detail:

```txt
order
customer
items
reason
approval status
received condition
refund decision
stock destination
timeline
```

Rules:

```txt
refund approval separate from physical receipt
damaged items cannot return to sellable stock
all actions audit logged
```

### Payments

Payment dashboard:

```txt
paid orders
pending payments
failed payments
duplicate webhook events
manual mark-paid requests
refunds
COD collections
payment provider settlement batches
```

Manual mark-paid requires:

```txt
role permission
reference number
attachment/note
audit log
approval if high amount
```

### Accounting Export

Export batches:

```txt
daily sales
payments
refunds
COD collections
purchase receipts
inventory movement summary
COGS/valuation summary
```

Each batch:

```txt
period
record count
total value
status: draft | exported | reconciled | failed
file/API reference
created by
created at
```

## 5. Dashboard UX rules

Tables must support:

```txt
search
filters
sorting
pagination
saved views later
bulk selection
export where allowed
clear empty states
```

Forms must support:

```txt
validation
required fields
error messages
draft where useful
submit confirmation for dangerous actions
audit trail
```

Dangerous actions require confirmation:

```txt
delete/archive product
large stock adjustment
refund
cancel confirmed order
mark payment paid manually
change role/permission
bulk import overwrite
```

## 6. Audit log requirements

Audit record:

```txt
id
actor_user_id
action
entity_type
entity_id
before jsonb nullable
after jsonb nullable
ip_address nullable
user_agent nullable
created_at
```

Audit these actions:

```txt
login failures
role changes
product price changes
SKU changes
stock adjustments
order status changes
payment status changes
refunds
purchase order approval
bulk imports
settings changes
```

## 7. MVP dashboard build order

Build in this order:

```txt
1. Admin shell + RBAC skeleton
2. Products/SKUs/categories/images
3. CSV import with validation
4. Inventory balances + stock ledger
5. Orders dashboard
6. Payment/COD status management
7. Fulfillment/shipping tracking fields
8. Returns/refunds workflow
9. Purchasing/PO receiving
10. Accounting export
11. Advanced reports
```
