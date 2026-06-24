# Advanced Analysis

Beyond answering free-form questions, Semantix provides built-in **specialized analytical models** — enabling Cohort, RFM, Funnel, and other complex analysis types with just a few clicks and no SQL required.

---

## Analysis Types

| Type | Question It Answers | See Details |
|------|---------------------|-------------|
| **Cohort Analysis** | "What % of January customers are still buying after 3 months?" | [Cohort](cohort.md) |
| **RFM Analysis** | "Segment customers by purchase behavior: Champions, At Risk, Lost" | [RFM](rfm.md) |
| **Funnel Analysis** | "Conversion rate through each step: View → Cart → Checkout" | [Funnel](funnel.md) |
| **Growth Analysis** | "Automatic MoM and YoY growth rates" | (integrated into Cohort) |
| **Pareto Analysis** | "Which 20% of products/customers generate 80% of revenue?" | (in AI Chat) |
| **Vintage Analysis** | "Performance of each loan batch or cohort over time" | (in AI Chat) |

---

## Enabling Advanced Analysis

Advanced analysis is configured at the **Context level** — Admins set it up once, and users can access it anytime.

### Step 1: Configure in a Context

1. Go to **Studio → DABI → Data Models** → select a Model
2. Go to the **Contexts** tab → select the Context to enable it on
3. Tab **Advanced Analysis**
4. Click **Add** → choose the analysis type

Or navigate directly to a Context:
1. Studio → DABI → Data Models → Select model → Semantic Contexts
2. Select the Context → Tab **Advanced Analysis**
3. Click **Add Analysis**

### Step 2: Configure the Parameters

Each analysis type requires basic parameters (see each type's page for details):
- **Entity Column**: The user/customer identifier column (`user_id`, `customer_id`)
- **Time Dimension**: The date/time column of the event
- **Value Metric**: The metric to measure (optional, e.g. revenue)

### Step 3: Access from AI Chat

After configuration, users can access the analysis:

1. Go to **AI Chat**
2. Select the Assistant with the configured Context
3. Click the **Analysis** tab (or ask directly: "Run a cohort analysis on customers")
4. Select the analysis type → the system runs and displays results automatically

---

## Customizing SQL Templates

Each analysis type has a default SQL template. Admins can customize these:

**When to edit a template:**
- The database uses a different SQL dialect (BigQuery, ClickHouse instead of PostgreSQL)
- Additional business-specific filter conditions are needed
- You want to change how periods or segments are calculated

**Editing a template:**
1. **Admin → Config → Platform Integrations → Tab: SQL Templates**
2. Find the template to edit (e.g. `TEMPLATE_SQL_COHORT`)
3. Edit the SQL → **Save**

> **Warning**: Editing a template incorrectly will cause the analysis to fail. Keep a backup of the original template before making changes.

---

## Comparison of Analysis Types

| | Cohort | RFM | Funnel |
|-|--------|-----|--------|
| **Tables needed** | 1 (events/orders) | 1 (orders/transactions) | 1-2 (events) |
| **Output** | Retention % matrix | Customer segments | Conversion rates |
| **Updates** | By day/week/month | On each analysis run | On each run |
| **Setup complexity** | Low | Low | Medium |
| **Primary insight** | Retention, Churn | Segmentation | Conversion, Drop-off |

---

## Use Cases by Industry

**E-commerce:**
- Cohort: Customer retention by registration month
- RFM: Classify VIP customers and customers at risk of churning
- Funnel: Conversion rate from product view to purchase

**SaaS:**
- Cohort: User activation rate, feature adoption
- Funnel: Onboarding completion rate (trial → paid)
- RFM: Account health scoring

**Banking / Finance:**
- Cohort: Vintage analysis — loan portfolio performance by disbursement cohort
- RFM: Customer segmentation by asset value
- Funnel: Financial product registration completion rate

---

## Exporting Analysis Results

After getting results:
- Click **Download CSV** to export raw data
- Click **Pin to Dashboard** to add to a Dashboard
- Click **Share** to send a link to a colleague

See each analysis type's dedicated page:
- [Cohort Analysis →](cohort.md)
- [RFM Analysis →](rfm.md)
- [Funnel Analysis →](funnel.md)
