# Business Metrics & Formula Templates

> **Navigation:** Studio → DABI → Data Models → Select Model → **Metrics** tab

A Metric is the standardized, single-source-of-truth definition of a business Key Performance Indicator (KPI). Defined **once**, Metrics are consumed **consistently** across AI Chat, Dashboards, Scheduled Reports, and Semantic Contexts.

**Why standardize Metrics?** Without explicit Metrics, an AI engine guessing the meaning of "revenue" must infer which column to aggregate, which SQL function to apply, and whether to filter out cancelled orders. With a defined Metric `Total Revenue`, the system deterministically compiles the exact same verified formula every time.

---

## 1. Creating a New Metric

### Step 1 — Open the Metrics Tab

1. Navigate to **Studio → DABI → Data Models**.
2. Select the Data Model you want to enrich.
3. Switch to the **Metrics** tab.
4. Click **New Metric**.

### Step 2 — Configure Metric Properties

#### Mandatory Fields

| Field | Example | Rules & Constraints |
|---|---|---|
| **Name** | `total_revenue` | Strict `snake_case`, lowercase, alphanumeric and underscores only |
| **Label** | `Total Revenue` | Human-friendly display label used in charts and UI |
| **Aggregation** | `SUM` | SQL aggregate function (see Aggregation Functions table below) |
| **Column** | `revenue` | Physical or virtual column to aggregate |

#### Recommended Fields (Crucial for AI Semantic Accuracy)

| Field | Description | Example |
|---|---|---|
| **Description** | Contextual explanation: business definition, filters, units | *"Total value of successfully paid orders, excluding cancellations and refunds. Currency: USD."* |
| **Synonyms** | Alternate terminology business users frequently query | `sales`, `turnover`, `gross revenue`, `billings` |
| **Format** | Display formatter for rendered numbers | `currency`, `number`, `percent`, `decimal` |

#### Optional Modifiers

| Field | Description |
|---|---|
| **Filter** | Pre-aggregation SQL filter clause (e.g., `status = 'paid'`) |
| **Prefix** | Prepended symbol or string (e.g., `$`, `€`) |
| **Suffix** | Appended unit or descriptor (e.g., `orders`, `units`, `%`) |
| **Round** | Decimal precision places |

---

## 2. Aggregation Functions

| Function | Mathematical Operation | Typical Applications |
|---|---|---|
| **SUM** | Total sum of all matching row values | Revenue, sales quantity, operating costs |
| **COUNT** | Total record count (includes NULLs) | Event frequency, audit occurrences |
| **COUNT_DISTINCT** | Count of unique, non-duplicate values | Active customers, distinct orders, unique SKUs |
| **AVG** | Arithmetic mean | Average Order Value (AOV), average user rating |
| **MIN** | Lowest scalar value | Minimum purchase price, first onboarding date |
| **MAX** | Highest scalar value | Peak order value, latest transaction timestamp |

> [!NOTE]
> **Cardinality Distinctions: `SUM` vs `COUNT` vs `COUNT_DISTINCT`**
> - In a sales table of 1,000 rows where Customer A placed 5 orders:
>   - `COUNT(order_id)` = `1000` (total row transactions).
>   - `COUNT_DISTINCT(customer_id)` = unique customer count across all orders.
>   - `COUNT_DISTINCT(order_id)` = deduplicated orders (essential if raw data contains multi-item order lines).

---

## 3. Formatting Rules

| Format | Formatted Output Example | Intended Data Type |
|---|---|---|
| `number` | `1,234,567` | Integer quantities, counts, volume |
| `currency` | `$1,234,567` | Financial valuations, revenue, expenditure |
| `percent` | `23.5%` | Conversion rates, gross margins, growth percentages |
| `decimal` | `1234567.89` | Raw fractional measurements, weights |

---

## 4. Two-Sided Metric Formula Templates

In addition to single-column Basic Metrics, Semantix provides a standardized **Two-Sided Metric Formula Templates** framework. Rather than allowing unrestricted, error-prone manual SQL expressions that break when grain levels shift, Semantix standardizes composite KPI calculations across two distinct sides: **Side A (Numerator / Primary Metric)** and **Side B (Denominator / Secondary Metric)**.

This architectural pattern preserves the dependency DAG between metrics, enforces Row-Level Security across both operands, prevents zero-division runtime panics, and integrates directly with semi-additive snapshot wrapping.

### 4.1. The 4 Standard Formula Templates

| Template | UI Symbol | Mathematical Definition | Auto-Compiled SQL | Resulting Unit |
|---|---|---|---|---|
| **Sum** | `A + B` | $[A] + [B]$ | `(COALESCE(A, 0) + COALESCE(B, 0))` | Inherits unit of A & B (`currency`, `number`) |
| **Difference** | `A − B` | $[A] - [B]$ | `(COALESCE(A, 0) - COALESCE(B, 0))` | Inherits unit of A & B (`currency`, `number`) |
| **Growth %** | `A ÷ B − 1` | $\frac{[A] - [B]}{[B]}$ | `(A / NULLIF(B, 0) - 1)` | Percentage (`percent`) |
| **Margin %** | `(A − B) ÷ A` | $\frac{[A] - [B]}{[A]}$ | `((A - B) / NULLIF(A, 0))` | Percentage (`percent`) |
| *(Default) Ratio* | `A ÷ B` | $\frac{[A]}{[B]}$ | `A / NULLIF(B, 0)` | Percentage (`percent`) or decimal |

> [!IMPORTANT]
> **Data Integrity & Robustness Guarantees:**
> - **Division-by-Zero Elimination:** All fractional templates (`growth`, `margin`, `ratio`) inject `NULLIF(..., 0)` into the denominator, preventing database query execution exceptions.
> - **Null Value Imputation:** Additive operations (`sum`, `difference`) automatically inject `COALESCE(..., 0)` wrappers. If cash outflow has no transactions on a given day, net cash flow reflects total inflows rather than collapsing into `NULL`.
> - **Temporal Conflict Guard:** The semantic compiler actively rejects configurations attempting to combine a point-in-time Snapshot Balance Metric (e.g., end-of-month bank balance, inventory count) with a Period Flow Metric (e.g., daily sales revenue) in an additive template, preventing mathematically corrupt aggregations.

---

### 4.2. Studio UI Configuration Workflow

1. Open the Data Model editor → Navigate to the **Metrics** tab → Click **New Metric**.
2. In **Formula Type**, select **Two-Metric Formula** (or Ratio).
3. Under **Template**, choose the mathematical relationship:
   - `Sum (A + B)`
   - `Difference (A - B)`
   - `Growth % ((A - B) / B)`
   - `Margin % ((A - B) / A)`
4. Select **Metric Side A** and **Metric Side B** from the registered metrics catalog.
5. Inspect the live SQL Preview generated automatically by the compiler.
6. Click **Save Metric**.

---

### 4.3. Natural Language AI Auto-Detection

When users invoke **Generate Metrics by AI** or interact through conversational analytical prompts, Semantix automatically maps natural language intent to structured two-sided templates:

#### Semantic Intent Matching:
- **Sum (`template: "sum"`):** Triggers on keywords such as *"sum of A and B"*, *"A plus B"*, *"total transactions = inbound + outbound"*.
- **Difference (`template: "difference"`):** Triggers on keywords like *"profit = revenue minus cost"*, *"net cash flow"*, *"discrepancy between budget and actuals"*, *"net amount = A - B"*.
- **Growth (`template: "growth"`):** Triggers on keywords like *"revenue growth rate"*, *"month-over-month increase"*, *"growth of current vs base period"*.
- **Margin (`template: "margin"`):** Triggers on phrases like *"gross margin"*, *"profit margin percentage"*, *"return on revenue"*.
- **Ratio (`template: "ratio"`):** Triggers on phrases like *"average per customer"*, *"revenue per unit"*, *"conversion rate"*, *"A per B"*.

#### Dependency Resolution Workflow:
1. **Catalog Verification:** The AI engine verifies whether Metric A and Metric B already exist in the target Data Model.
2. **Automated Base Metric Provisioning:** If either operand is missing (e.g., the user requests *Gross Profit = Revenue - Expense*, but the model only possesses physical columns `sales_amount` and `cost_amount`):
   - The AI engine generates the prerequisite Basic Metrics first: `Total Revenue` (`SUM(sales_amount)`) and `Total Expense` (`SUM(cost_amount)`).
   - Next, it constructs the composite Two-Metric Formula referencing the persistent identifiers of both generated metrics.
3. The engine avoids unstructured, brittle ad-hoc SQL snippets, keeping the semantic catalog fully maintainable.

---

## 5. Production Metric Examples

### E-Commerce & Order Analytics

```yaml
Metric: total_revenue
Label: Total Revenue
Aggregation: SUM
Column: revenue
Filter: status IN ('paid', 'delivered')
Format: currency
Description: >
  Total monetary value of successfully paid and delivered customer orders.
  Excludes cancelled and refunded transactions. Currency: USD.
Synonyms: sales, turnover, gross revenue, top line
```

```yaml
Metric: order_count
Label: Order Count
Aggregation: COUNT_DISTINCT
Column: order_id
Filter: status != 'cancelled'
Format: number
Description: Count of unique order records, excluding cancelled orders.
Synonyms: number of orders, total orders, completed orders
```

```yaml
Metric: avg_order_value
Label: Average Order Value (AOV)
Aggregation: AVG
Column: revenue
Filter: status IN ('paid', 'delivered')
Format: currency
Description: Average monetary value per successfully settled order.
Synonyms: AOV, basket size, avg ticket
```

```yaml
Metric: unique_customers
Label: Unique Customers
Aggregation: COUNT_DISTINCT
Column: customer_id
Format: number
Description: Count of distinct customers who completed at least one order.
Synonyms: customer reach, buyers, active shoppers
```

### Inventory & Financial Balance Tracking

```yaml
Metric: ending_inventory_units
Label: Ending Inventory Units
Aggregation: SUM
Column: stock_qty
Format: number
Suffix: units
Description: >
  Semi-additive snapshot balance representing closing stock on hand.
  Compiled with Snapshot Last-in-Bucket to avoid cross-temporal double counting.
```

---

## 6. Recommended Metric Modeling Hierarchy

When modeling a new enterprise dataset, register metrics in the following sequence:

1. **Unique Entity Counters** (`COUNT_DISTINCT` on primary keys): Total Orders, Total Customers, Unique Vendors.
2. **Primary Flow Aggregates** (`SUM` on financial/volume columns): Total Revenue, Total Cost, Quantity Sold.
3. **Distribution Averages** (`AVG` on unit values): Average Order Value, Average Unit Price.
4. **Composite KPIs** (Two-Sided Templates): Gross Margin %, Net Profit, Revenue Growth %.
5. **Boundary Indicators** (`MIN`, `MAX`): Earliest Transaction Date, Maximum Single Order Value.

---

## 7. Troubleshooting & Common Pitfalls

| Issue | Root Cause | Remediation |
|---|---|---|
| Inflated revenue figures | Cancelled/refunded orders included | Add explicit filter: `Filter: status != 'cancelled'` |
| Multiplied totals upon joining tables | Fan-out caused by 1-to-N lines | Change aggregation to `COUNT_DISTINCT` or compile via 3-Layer Architecture |
| AI fails to match queries to KPI | Missing natural language synonyms | Add business synonyms (e.g., `turnover`, `billings`, `sales`) |
| Division-by-zero database error | Unprotected manual divisor | Switch to Semantix Two-Sided Ratio/Margin template with auto-`NULLIF` |
| Point-in-time balance totals multiplied over time | Semi-additive metric summed across months | Enable snapshot metric designation to trigger Last-in-Bucket aggregation |
