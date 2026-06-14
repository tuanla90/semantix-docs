# Metrics

**Navigate to:** Studio → DABI → Data Models → select Model → Metrics tab

Metrics are your core business KPIs. Defined once, used consistently across AI Chat, Dashboards, and Contexts. **This is the most important step for accurate AI answers.**

## Create a New Metric

1. In the Model editor, switch to the **Metrics** tab
2. Click **New Metric**
3. Fill in:

| Field | Meaning |
|-------|---------|
| **Name** | Technical name (e.g., `total_revenue`) |
| **Label** | Display name (e.g., `Total Revenue`) |
| **Aggregation** | Aggregation function: `SUM`, `COUNT`, `AVG`, `MIN`, `MAX`, `COUNT_DISTINCT` |
| **Column** | Column to apply the aggregation on |
| **Format** | `currency`, `number`, or `percent` |
| **Description** | Detailed description for AI — when and how to use this metric |
| **Synonyms** | Alternative terms users commonly type |

## Common Metric Examples

| Metric | Aggregation | Column |
|--------|-------------|--------|
| Total Revenue | SUM | revenue |
| Order Count | COUNT_DISTINCT | order_id |
| Average Order Value | AVG | revenue |
| Unique Customers | COUNT_DISTINCT | customer_id |

## Key Tip

> **More synonyms and detailed descriptions = more accurate AI.** For "Total Revenue", add synonyms like `"sales"`, `"income"`, `"turnover"`, `"rev"`.

The description should clearly explain context: *"Total value of successfully paid orders, excluding cancelled ones."*
