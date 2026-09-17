# Semantic Contexts, Anti-Synonyms & Gotchas

> **Navigation:** Studio → DABI → Semantic Contexts

A Semantic Context is a **curated collection of Data Models, Metrics, and business rules** scoped to a specific business unit, analytical domain, or departmental objective. AI Assistants operate strictly within the perimeter of an assigned Semantic Context — ensuring all answers adhere to domain-specific logic, terminology, and governance policies.

**Real-world enterprise scenarios:**
- **Sales Analytics Context:** Houses `orders`, `customers`, and `products` models → Assigned to Sales and Account Management teams.
- **Human Resources Context:** Houses `employees`, `payroll`, and `attendance` models → Assigned to HR Leadership.
- **Treasury & Finance Context:** Houses `general_ledger`, `invoices`, and `cash_flows` models → Assigned to Finance and Accounting controllers.

---

## 1. Why Are Semantic Contexts Essential?

Without isolated Semantic Contexts, an enterprise AI assistant suffers from critical limitations:
- **Model Ambiguity:** Fails to distinguish between competing tables representing "revenue" (e.g., booked sales vs. GAAP recognized revenue vs. cash collections).
- **Data Governance Breaches:** Risks leaking sensitive compensation or vendor pricing data to unauthorized departments.
- **Semantic Drift:** Cannot enforce department-specific definitions (e.g., Sales measures customer acquisition on deal signature, whereas Accounting recognizes customers upon first invoice payment).

---

## 2. Step-by-Step Context Configuration

### Step 1 — Basic Identification

1. Navigate to **Studio → DABI → Semantic Contexts → New Context**.
2. Define the core metadata:

| Attribute | Required | Example |
|---|---|---|
| **Name** | Yes | `sales_analytics` (strict `snake_case`) |
| **Label** | Yes | `Sales Performance & Pipeline` |
| **Description** | Recommended | Scope explanation parsed by AI (see template below) |

**High-Quality Description Template:**
```text
Analytical context for Commercial Sales and Revenue Operations teams.
Covers order transactions, customer accounts, and product performance.
Primary KPIs: Total Revenue, Order Volume, Average Order Value, and Customer Retention.
Data sourced from ERP and CRM, refreshed daily.
```

### Step 2 — Model Scoping

Switch to the **Models** tab → Click **Add Model** → Select the models relevant to this domain.

**Example for Sales Context:**
- `orders` (Primary fact table)
- `customers` (Dimension table)
- `products` (Dimension table)
- `product_categories` (Lookup hierarchy)

> [!IMPORTANT]
> **Minimalist Context Principle:** Include only models strictly necessary for the intended analytical domain. Exposing irrelevant or extraneous models increases prompt overhead, degrades token efficiency, and elevates AI hallucination risks.

### Step 3 — Metric Entitlements

Switch to the **Metrics** tab → Toggle which standardized Metrics are authorized for query synthesis within this Context.

- **Selective Visibility:** Hide internal cost or margin metrics from general sales reps while exposing top-line revenue and volume.
- **Context-Specific Metrics:** Declare auxiliary metrics that exist exclusively within this operational domain.

### Step 4 — Default Time Column

Designate the primary temporal anchor (e.g., `order_date`). When users query relative temporal periods like *"last month"*, *"Q3 to date"*, or *"this year"* without naming a date field, the semantic compiler automatically targets this default column:

$$\text{WHERE } \texttt{order\_date} \ge \text{'2026-06-01'} \text{ AND } \texttt{order\_date} \le \text{'2026-06-30'}$$

### Step 5 — Forbidden Combinations

Define explicit negative constraints to preempt logically invalid queries.

```text
Do not GROUP BY employee_id when filtering by store_branch, as employees 
are bound 1-to-1 with individual stores.

Do not combine transaction amounts from online_orders with physical_retail_orders 
in a single aggregation without an explicit UNION clause.

When evaluating "conversion rate", always generate a multi-stage funnel analysis 
rather than computing a naive row quotient.
```

### Step 6 — Advanced Analytical Modules

Configure specialized analytical engines under the **Advanced Analysis** tab:

| Analytical Module | Description | Required Configuration Fields |
|---|---|---|
| **Cohort Analysis** | User retention curves over time | Initial cohort acquisition date, recurring event date, entity ID |
| **RFM Analysis** | Recency, Frequency, Monetary customer segmentation | Transaction timestamp, order monetary value, customer ID |
| **Funnel Analysis** | Multi-stage conversion and abandonment rates | Pipeline stage order, user identifier, event timestamp |
| **Pareto Analysis** | 80/20 distribution analysis | Dimension entity (product/customer), metric measure |

---

## 3. Extended Semantics (Anti-Synonyms, Gotchas, AI Hints & Metadata)

To equip AI Assistants with deep industry domain knowledge and prevent catastrophic misinterpretations, Semantix introduces four advanced semantic constructs configurable at both the Column level (`ColumnContext`) and Metric level (`MetricContext`):

### 3.1. Anti-Synonyms ("X is not Y")

- **The Problem:** Standard synonym lists only inform an AI of what a term *means*. However, the costliest enterprise errors occur when an AI conflates superficially similar domain concepts (**Negative Disambiguation**).
- **Structure:** Each anti-synonym consists of a forbidden `term` and an explanatory contextual `note`.
- **Enterprise Examples:**
  - Column `outstanding_balance` (Loan Portfolio):
    - *Anti-synonym:* `term: "disbursement volume"`, `note: "disbursement represents newly issued credit in the loan contract ledger, not cumulative current balance"`.
  - Metric `gross_revenue` (Total Sales Revenue):
    - *Anti-synonym:* `term: "cash collection"`, `note: "accrual revenue includes uncollected accounts receivable and does not reflect actual liquid cash flow"`.
  - Column `is_active_customer` (Customer Status):
    - *Anti-synonym:* `term: "all registered customers"`, `note: "only flags users with a settled transaction within the trailing 30 days"`.
- **Prompt Clamping Strategy:** To prevent token inflation, Semantix automatically clamps injection to the **top 3 most critical anti-synonyms** per field into the Assistant system prompt.

### 3.2. Business Gotchas

- **Definition:** High-priority cautions, edge cases, and algorithmic constraints injected into the AI's generation context.
- **Enterprise Examples:**
  - *"Ratios, averages, and percentages must NEVER be aggregated with the SUM function."*
  - *"Outstanding balance is a point-in-time snapshot; NEVER sum balances across multiple months."*
  - *"NULL values in the customer_rating column represent unrated orders, NOT a numerical score of zero."*
  - *"Exclude records where branch_code = 'TEST_SANDBOX' to prevent skewing official figures."*
- **Prompt Clamping Strategy:** Clamped to a maximum of **2 concise gotchas** (maximum 120 characters per entry) within the runtime model schema prompt.

### 3.3. AI Behavioral Hints (`aiHint`)

- **Definition:** Prescriptive directives dictating how the AI Assistant should interpret queries, construct groupings, or handle specific columns.
- **Enterprise Examples:**
  - `aiHint`: *"When users ask generic questions about revenue trends, default to monthly aggregation using order_settlement_date."*
  - `aiHint`: *"Always wrap promotional_discount in COALESCE(..., 0) because un-discounted transactions contain NULL."*

### 3.4. Synonym Governance Metadata (`synonymMeta`)

- **Definition:** Comprehensive audit trails tracking the provenance, statistical confidence, and lifecycle of every semantic synonym:
  - `source`: Provenance indicator — `'human'` (entered by verified domain expert) or `'learned'` (distilled automatically by AI from recurring user feedback).
  - `confidence`: Calibrated confidence score between `0.0` and `1.0` (manual entries default to `1.0`).
  - `evidenceCount`: Number of observed conversational instances where users utilized this term.
  - `updatedAt`: ISO timestamp of latest modification.
- **Zero-Prompt Overhead Guarantee:** `synonymMeta` is strictly reserved for administrative auditing, review dashboards, and Change Request diffs. It is **never injected into runtime LLM prompts**, preserving minimal token consumption.

---

## 4. Binding Contexts to AI Assistants

Creating a Context establishes the semantic boundaries; you must attach it to an AI Assistant to expose it to end users:

1. Navigate to **Studio → DSAI → AI Assistants**.
2. Select the target Assistant (or create a new Assistant).
3. In the **Context** dropdown, assign the configured Semantic Context.
4. Click **Save**.

Conversations with this Assistant will now strictly execute within the scoped models, metrics, and business gotchas of that Context.

---

## 5. Row-Level Security (RLS) Integration

Semantic Contexts natively integrate with user-level and group-level data access policies. 

Even when team members across Northern and Southern sales territories share the same `sales_analytics` Context, the Semantix 3-Layer Compiler pushes RLS predicates down to the base table scan:

```sql
WHERE branch_code = 'NORTH_BRANCH' -- Dynamically injected for northern branch reps
```

For complete implementation instructions, refer to [Row-Level Security](../contexts/rls.md).

---

## 6. Enterprise Configuration Example

```yaml
Context:
  name: enterprise_sales_ops
  label: Enterprise Sales Operations
  description: Operational analytics for regional sales leadership and executive reporting.
  
  models:
    - sales_orders (Primary transactional fact table)
    - customer_accounts (Enterprise account dimension)
    - regional_offices (Geographic dimension)

  metrics:
    - total_revenue (Enabled)
    - deal_count (Enabled)
    - average_deal_size (Enabled)
    - internal_rep_commission (Disabled / Restricted)

  default_time_column: order_settled_at

  extended_semantics:
    column: sales_orders.outstanding_receivables
      anti_synonyms:
        - term: "unrealized pipeline"
          note: "receivables represent invoiced orders pending payment, not unclosed pipeline deals"
      gotchas:
        - "Outstanding receivables is a balance metric; do not sum across reporting quarters."
      ai_hint: "Filter for status = 'INVOICED' when calculating receivables."
```

---

## 7. Context Administration & Lifecycle

- **Context Overview:** Access **Studio → DABI → Semantic Contexts** to audit active models, linked AI Assistants, status, and author details.
- **Safe Inactivation:** Toggle the **Active** switch off to temporarily suspend an Assistant's access to a Context without deleting rules or mappings.
- **Context Duplication:** Use **Duplicate** to clone established contexts as foundational templates for newly onboarded business departments.

---

## 8. Production Readiness Checklist

Before publishing a Semantic Context to production users, verify:

- [ ] Minimalist model selection: All unneeded physical tables excluded.
- [ ] Default Time Column explicitly assigned.
- [ ] Metric entitlements audited (sensitive internal metrics toggled off).
- [ ] Anti-synonyms defined for frequently confused industry terms.
- [ ] Critical Gotchas added for snapshot balances and non-additive metrics.
- [ ] Attached to designated AI Assistant and verified across representative test prompts.
- [ ] Row-Level Security rules verified across disparate user roles.
