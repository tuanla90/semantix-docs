# AI Optimization & Best Practices

The accuracy of AI depends directly on the quality of your Data Model and Context configuration. This is a complete guide to ensure the AI answers every question correctly.

---

## Why Does the AI Give Wrong Answers?

Semantix's AI doesn't "know" your database — it only reads what you describe in the Data Model. When the AI is wrong, the cause is usually one of:

1. **Missing Description** → AI guesses the wrong column for a calculation
2. **Missing Synonyms** → User types "sales" but the Metric is named "revenue" → AI doesn't match
3. **Technical column labels** → Column `trx_amt_vnd` has no Label → AI doesn't know this means "Transaction Amount"
4. **Metric missing a Filter** → Calculates revenue without excluding cancelled orders → result is inflated
5. **Wrong Relations** → AI JOINs the wrong table → data is multiplied or missing
6. **No Default Time Column set** → User asks "this month" → AI doesn't know which date column to use

---

## Principle 1: Write Detailed Descriptions

**Description is the most important signal** for the AI to understand what a column or metric is used for.

### Good Description Template for Columns

```
[Data name] — [Unit/Format] — [What's included/excluded] — [Calculation logic if needed]
```

**Real examples:**

| Column | Poor Description | Good Description |
|--------|-----------------|-----------------|
| `revenue` | "Revenue" | "Gross revenue from paid orders, in USD. Does not include cancelled orders (status='cancelled') or pending orders (status='pending'). This is the primary revenue metric for monthly reporting." |
| `status` | "Status" | "Order status. Values: 'pending'=awaiting confirmation, 'confirmed'=confirmed, 'shipping'=in transit, 'delivered'=delivered, 'cancelled'=cancelled, 'refunded'=refunded. Only count revenue where status IN ('confirmed','delivered')." |
| `created_at` | "Created date" | "Date and time the customer placed the order (UTC+7). This is the primary time column used for filtering and grouping by day/month/quarter/year." |
| `customer_type` | "Customer type" | "Customer classification: 'retail'=retail buyer, 'wholesale'=wholesale buyer, 'vip'=VIP customer. VIP customers receive an extra 5% discount and priority processing." |

### Good Description Template for Metrics

```
[Calculation formula] — [Filter conditions] — [Unit] — [When to use]
```

**Example:**
> "Net revenue = SUM(quantity × unit_price × (1 - discount / 100)) from successfully delivered orders. Measured in USD. Use for official revenue reporting."

---

## Principle 2: Add Synonyms Generously

Users ask questions in many different ways. Add Synonyms so the AI matches correctly regardless of the wording used.

**Metric: Total Revenue**

Synonyms should include:
- Common terms: `revenue`, `sales`, `income`, `earnings`, `top line`
- Abbreviations: `rev`, `GMV`
- Business-specific terms: `net revenue`, `gross sales`, `turnover`

**Metric: Order Count**

Synonyms: `orders`, `order count`, `number of orders`, `transactions`, `purchases`, `sales count`

> Add as many synonyms as possible — there is no downside, only benefit.

---

## Principle 3: Use Friendly Column Labels

Databases often have technical naming conventions. Set a **Label** to display a human-readable name:

| Database Column | Poor Label | Good Label |
|----------------|-----------|-----------|
| `cust_id_fk` | Cust Id Fk | Customer ID |
| `trx_amt_vnd` | Trx Amt Vnd | Transaction Amount (USD) |
| `is_actv` | Is Actv | Is Active |
| `usr_loc_cd` | Usr Loc Cd | Region Code |
| `dt_created_utc` | Dt Created Utc | Created Date (UTC+7) |
| `qty_sold_pcs` | Qty Sold Pcs | Units Sold |

---

## Principle 4: Add Filters to Metrics

The most common mistake: creating a `Total Revenue` Metric without any filter, causing it to include cancelled and erroneous orders.

**Metric without a filter:**
```sql
SUM(revenue)  -- Counts everything, including cancelled orders
```

**Metric with the correct filter:**
```sql
SUM(revenue) WHERE status IN ('delivered', 'confirmed')
-- Only counts delivered or confirmed orders
```

**In Semantix Metric configuration:**
- Field: **Filter**
- Value: `status IN ('delivered', 'confirmed')`

### Common Filters

| Metric | Required Filter |
|--------|----------------|
| Revenue | `status IN ('paid','delivered')` |
| Valid orders | `status != 'cancelled'` |
| Active customers | `is_active = true` |
| In-stock products | `stock > 0 AND is_discontinued = false` |
| Active users | `last_login IS NOT NULL` |

---

## Principle 5: Set a Default Time Column

When users ask "this month", "last week", "last year" — the AI needs to know which date column to use.

**Configure in Context:**
- Studio → DABI → Data Models → Select model → Contexts → Select Context
- Field: **Default Time Column**
- Value: `order_date` (or the most relevant date column in the table)

**If the table has multiple date columns:**

| Date Column | Meaning | Default? |
|-------------|---------|---------|
| `order_date` | Date order was placed | ✅ (most commonly used) |
| `payment_date` | Date payment was made | ❌ |
| `shipped_date` | Date order was shipped | ❌ |
| `created_at` | Record creation date | ❌ |

Set `order_date` as default. When a user asks "revenue this month" → query uses `WHERE order_date BETWEEN...`

---

## Principle 6: Use Calculated Fields for Complex Logic

Don't let the AI re-compute complex business logic on every query — define it once in Calculated Fields:

| Instead of | Do This |
|-----------|---------|
| AI computing: `(revenue - cost) / revenue × 100` | Create Calculated Field `gross_margin_pct` |
| AI classifying: `IF revenue > 10000 THEN 'VIP'` | Create Calculated Field `customer_tier` |
| AI computing dates: `DATEDIFF(current, last_order)` | Create Calculated Field `days_since_last_order` |

---

## Principle 7: Context Instructions for Business-Specific Rules

In the **Context → Instructions** section, write rules the AI cannot infer on its own:

**Examples of good instructions:**
```
- When the user asks about "revenue", always use the "Net Revenue" metric (net_revenue), not "gross_revenue"
- "This month" means from the 1st to today of the current month
- When asking about "branch", use the "branch_code" column, not "warehouse_code"
- Do not GROUP BY "customer_id" when calculating "Online Revenue" as it causes duplication
- "Quantity" when referring to products means "qty_sold"; when referring to orders means "order_count"
- "Profit margin" always refers to gross margin (not net margin) unless the user specifies otherwise
- Regional comparisons must always filter out records where region IS NULL
```

---

## Pre-Launch Checklist

### Data Model

- [ ] Every column has a clear Description (especially columns with enum values)
- [ ] Every column has a friendly Label (not the technical database name)
- [ ] Calculated Fields defined for all complex formulas

### Metrics

- [ ] Every Metric has a Description explaining the formula and conditions
- [ ] Every Metric has at least 3-5 Synonyms
- [ ] Every Metric has the correct Filter (excluding cancelled orders, erroneous records)
- [ ] Aggregation function is appropriate (SUM / COUNT / COUNT_DISTINCT / AVG)

### Context

- [ ] Default Time Column is set
- [ ] Instructions/Rules document business-specific logic
- [ ] Suggestions created (5-10 representative sample questions)

### Testing Before Go-Live

- [ ] Test at least the 10 most common questions
- [ ] Check View SQL for each question — is the SQL logic correct?
- [ ] Test questions phrased in multiple different ways
- [ ] Test with real end users (not just admins)

---

## Diagnosing AI Errors

| Symptom | Check | Fix Location |
|---------|-------|-------------|
| AI calculates the wrong number | View SQL → check filters | Add Filter to the Metric |
| AI doesn't understand the user's wording | AI can't match to a Metric | Add Synonyms to the Metric |
| AI uses the wrong column | View SQL → see which column was used | Improve the column's Description |
| AI JOINs the wrong table | View SQL → check JOIN clause | Fix Relations in the Data Model |
| AI doesn't know what "this month" means | Empty or incorrect date results | Set Default Time Column in Context |
| Results are doubled | View SQL → JOIN creates duplicate rows | Switch COUNT to COUNT_DISTINCT, review Relations |
| AI applies wrong business rule | Result is logically incorrect but SQL looks right | Add the rule to Context Instructions |
