# Building a Data Model — In Depth

A complete guide to building high-quality Data Models — the foundation of AI accuracy.

---

## What Is a Data Model?

A Data Model in Semantix is a semantic description of a table (or view) in the database. It does not modify the underlying data — it only adds a description layer that helps the AI understand the data.

**Structure:**
```
Data Model "Orders"
├── Connection: PostgreSQL Production
├── Table: public.orders
├── Columns:
│   ├── order_id → "Order ID" (Number, PK)
│   ├── customer_id → "Customer ID" (Number, FK)
│   ├── status → "Status" (Text, with description of enum values)
│   ├── revenue → "Revenue" (Number, USD, excludes cancelled orders)
│   └── created_at → "Order Date" (DateTime, UTC)
├── Calculated Fields:
│   └── gross_margin = (revenue - cost) / revenue * 100
├── Metrics:
│   ├── "Total Revenue" = SUM(revenue) WHERE status IN ('paid','delivered')
│   └── "Order Count" = COUNT(*) WHERE status != 'cancelled'
└── Relations:
    ├── customer_id → Customers.id (LEFT JOIN)
    └── product_id → Products.id (LEFT JOIN)
```

---

## Step 1: Create a New Data Model

1. **Studio → DABI → Data Models → New Data Model**
2. Fill in:
   - **Name**: A friendly name (e.g. "Orders", "Customers", "Products")
   - **Connection**: Select the database connection
   - **Table/View**: Select the source table or view
   - **Description**: 2-3 sentences describing what this model represents
3. Click **Save**

---

## Step 2: Configure Columns

This is the most important step. Go to the **Columns** tab:

### For Each Column, Fill In:

| Field | Importance | Guidance |
|-------|-----------|----------|
| **Label** | High | Friendly name, descriptive, no abbreviations |
| **Description** | Very High | Explain what the data represents, units, enum values |
| **Type** | High | Text / Number / Date / DateTime / Boolean |
| **Is Hidden** | Medium | Hide sensitive columns (salary, SSN...) from the AI |
| **Is Primary Key** | Low | Mark the main ID column |
| **Is Foreign Key** | Low | Mark columns that reference other tables |

### Example Descriptions for Different Column Types

**Numeric column (money):**
```
Net revenue for the order, in USD (after discounts, before costs).
Excludes: orders with status='cancelled' or status='refunded'.
Primary metric for monthly revenue reporting.
```

**Enum / categorical column:**
```
Order processing status.
Valid values:
- 'pending': Awaiting confirmation (placed but not yet paid)
- 'confirmed': Confirmed and paid
- 'shipping': Out for delivery
- 'delivered': Successfully delivered
- 'cancelled': Cancelled by customer or system
- 'refunded': Refund processed
Only count revenue for status IN ('confirmed','delivered').
```

**Datetime column:**
```
Timestamp when the customer placed the order (UTC timezone).
Used as the primary time column for day/week/month/quarter/year analysis.
Note: different from payment_date (actual payment date) and shipped_date (warehouse dispatch date).
```

**Boolean column:**
```
Whether this is the customer's first order.
TRUE = this is the first purchase by this customer_id.
FALSE = the customer has purchased before.
Used to analyze new vs returning customers.
```

---

## Step 3: Create Calculated Fields

**Navigation:** Tab **Calculated Fields** in Data Model

Calculated Fields are virtual columns computed from real columns — the AI can use them directly without needing to recalculate.

### Syntax

```sql
-- Arithmetic
revenue - cost

-- CASE WHEN
CASE 
  WHEN revenue > 10000 THEN 'High Value'
  WHEN revenue > 1000 THEN 'Medium Value'
  ELSE 'Low Value'
END

-- Handle NULL
COALESCE(discount, 0)

-- Date calculation
DATE_DIFF('day', created_at, delivered_at)

-- String
UPPER(TRIM(customer_name))
```

### Real-World Calculated Field Examples

| Field Name | Formula | Description |
|-----------|---------|-------------|
| `gross_margin_pct` | `(revenue - cost) / revenue * 100` | Gross profit margin (%) |
| `customer_tier` | `CASE WHEN total_spent > 5000 THEN 'VIP' WHEN total_spent > 1000 THEN 'Gold' ELSE 'Standard' END` | Customer classification |
| `days_to_deliver` | `DATEDIFF(delivered_at, order_date)` | Number of delivery days |
| `order_month` | `DATE_FORMAT(created_at, '%Y-%m')` | Order month (YYYY-MM) |
| `item_subtotal` | `unit_price * quantity * (1 - discount/100)` | Line item total |

### Calculated Field Limitations

- Computed per **row** (row-level) only, not as aggregations
- Cannot reference other fields within the same Data Model
- Cannot reference other tables (use Relations + Metrics for that)

---

## Step 4: Create Metrics

**Navigation:** Tab **Metrics** in Data Model

Metrics are aggregate measures — the AI uses them directly when answering KPI questions.

### Metric Configuration

| Field | Description |
|-------|-------------|
| **Name** | Technical name (no spaces): `total_revenue` |
| **Label** | Display name: "Total Revenue" |
| **Aggregation** | SUM / COUNT / COUNT_DISTINCT / AVG / MIN / MAX |
| **Column** | Column to aggregate |
| **Filter** | Conditions to apply BEFORE aggregation |
| **Format** | Number, Currency, Percentage, Date |
| **Description** | Detailed explanation |
| **Synonyms** | Alternative terms users might use |

### Common Metric Examples

**Revenue:**
```
Name: total_revenue
Label: Total Revenue
Aggregation: SUM
Column: revenue
Filter: status IN ('confirmed', 'delivered')
Format: Currency (USD)
Synonyms: revenue, sales, income, earnings, total sales
```

**Unique customers:**
```
Name: unique_customers
Label: Unique Customers
Aggregation: COUNT_DISTINCT
Column: customer_id
Filter: (none — count all)
Format: Number
Synonyms: customers, number of customers, customer count
```

**Average order value:**
```
Name: avg_order_value
Label: Average Order Value (AOV)
Aggregation: AVG
Column: revenue
Filter: status IN ('confirmed', 'delivered')
Format: Currency (USD)
Synonyms: AOV, average order, average basket size
```

---

## Step 5: Declare Relations

**Navigation:** Tab **Relations** in Data Model

Relations define how tables connect to each other — the AI uses this information to write correct SQL JOINs.

### Creating a Relation

1. Tab Relations → **Add Relation**
2. Fill in:
   - **From Model/Column**: Current model, foreign key column
   - **To Model/Column**: Target model, primary key column
   - **Join Type**: LEFT JOIN (recommended) or INNER JOIN

**Examples:**
- Model "Orders": `customer_id` → Model "Customers": `id`
- Model "Orders": `product_id` → Model "Products": `id`

### LEFT vs INNER JOIN

| Use LEFT JOIN | Use INNER JOIN |
|---------------|----------------|
| Want to keep orders even when no matching customer | Only want orders with a valid customer |
| Typical analytics (count everything) | Cases requiring strict matching |
| **Default recommendation for most cases** | Use with intention |

---

## Step 6: Configure the Context

After building Data Models with complete configuration, create a Context to tie everything together:

1. Tab **Contexts** in Data Model → **New Context** (or add to an existing Context)
2. Select the Context → configure:
   - **Default Time Column**: Primary date column
   - **Instructions**: Specific business rules
   - **Advanced Analysis**: Cohort/RFM/Funnel if needed
   - **Access Control**: RLS rules

---

## Pre-Launch Checklist

### Verification Checklist

- [ ] Every column has a clear Description
- [ ] Every column has a friendly Label (not raw technical names)
- [ ] Enum columns have full explanations of all valid values
- [ ] Every Metric has an appropriate Filter and Synonyms
- [ ] Relations are correctly declared between tables that need to JOIN
- [ ] Default Time Column is set in the Context
- [ ] Tested 10+ questions and reviewed the generated SQL

### Test Queries

In the **Contexts** tab → **Query Preview**: Type a question and inspect the generated SQL. This is the fastest way to catch configuration issues.
