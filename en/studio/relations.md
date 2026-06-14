# Relations

**Navigate to:** Studio → DABI → Data Models → select Model → Relations tab

Relations declare how to JOIN between Models. This lets AI automatically combine data from multiple tables when needed — without users writing SQL JOINs.

## Create a New Relation

1. In the Model editor, switch to the **Relations** tab
2. Click **Add Relation**
3. Fill in:

| Field | Example |
|-------|---------|
| **Source Model** | `sales_orders` (current model) |
| **Source Column** | `customer_id` (foreign key) |
| **Target Model** | `customers` (model to JOIN with) |
| **Target Column** | `id` (primary key of the target) |
| **Join Type** | `LEFT JOIN` or `INNER JOIN` |

## Relation Types

| Type | Example |
|------|---------|
| **One-to-Many (1:N)** | 1 Order → N Order Line Items |
| **Many-to-One (N:1)** | N Orders → 1 Customer |
| **Many-to-Many (N:N)** | Handled via a junction table |

## How It Works

Once the Relation is declared, when a user asks _"revenue by customer region"_, AI automatically JOINs `sales_orders` with `customers` to get address information — no manual intervention needed.

> Use `LEFT JOIN` for analytics to keep all records from the source table, even when the target has no matching data.
