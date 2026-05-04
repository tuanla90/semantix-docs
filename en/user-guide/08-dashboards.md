# 8. Building Dashboards

Dashboards allow you to aggregate multiple charts and widgets into a single monitorable screen for regular reporting and tracking.

**Navigation:** Dashboards → **New Dashboard**

## Step 1 — Create a New Dashboard

1. Click **New Dashboard**.
2. Enter a **Name** and **Description**.
3. Select the default **Context** for the Dashboard.

## Step 2 — Add Widgets

Click **Add Widget** → choose the appropriate visualization type:

| Widget Type | Best Used For |
|-------------|---------------|
| **Bar Chart** | Comparing values across categories. |
| **Line Chart** | Showing trends over time. |
| **Pie / Donut** | Displaying percentage breakdowns. |
| **KPI Card** | Highlighting a single massive top-line number. |
| **Table / Pivot** | Viewing detailed tabular data. |
| **Heatmap** | Showing data density across two dimensions. |
| **Treemap / Sankey** | Visualizing hierarchies and data flows. |

## Step 3 — Configure Widgets

**Method 1 — Ask AI (Fastest):**

Type your request into the "Ask AI" box, for example:

```text
Plot a bar chart of revenue by month for this year
```

The AI will automatically generate the SQL, select the appropriate chart type, and fill in the configuration.

**Method 2 — Manual Query Builder:**

1. Select your **Model** → choose **Metrics** and **Dimensions**.
2. Add any **Filters** (e.g., `year = 2025`).
3. Select the **Chart Type** and configure colors and labels.
4. Click **Save Widget**.

## Step 4 — Arrange the Layout

- Drag and drop widgets to arrange their position.
- Drag the bottom-right corner of any widget to resize it.

## Step 5 — Add Global Dashboard Filters

Click **Add Dashboard Filter** → select the column to use as a filter. When a user changes this filter, all connected widgets on the dashboard will automatically update to reflect the change.

*Common examples: Date Range, Branch, Product Category.*

## Step 6 — Sharing Your Dashboard

| Sharing Method | Where to Configure |
|----------------|--------------------|
| **Internal (by Role)** | Settings → Permissions |
| **Public Link (No login required)** | Share → Generate Public Link |
| **Embed in another App/Website** | Share → Embed Code (JWT token) |
| **Scheduled Email Reports** | Admin → Scheduled Reports → New Report |

---

## Summary — Quick Setup Flow

```text
1. Connection     → Connect your data source (DB / Google Sheets)
        ↓
2. Model          → Map physical tables to business concepts
        ↓
3. Calc Fields    → Create formula-based columns (if needed)
        ↓
4. Metrics        → Define your core KPIs
        ↓
5. Relations      → Declare how Models join together
        ↓
6. Context        → Group Models + Metrics by business domain
        ↓
7. Assistant      → Configure the AI persona and language
        ↓
8. Dashboard      → Aggregate insights into a monitoring view
```

> **The Golden Rule:** Invest your time heavily in the **Metrics** and **Context** steps. The more detailed your descriptions and synonyms are, the more accurately the AI will answer questions without needing clarification.
