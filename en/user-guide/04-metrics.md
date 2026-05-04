# 4. Defining Metrics

Metrics are your core business key performance indicators (KPIs). You define them once, and they are used consistently across the entire system. **This is the most critical component for the AI to answer questions accurately.**

**Navigation:** Admin → Models → select a Model → **Metrics** tab → **New Metric**

## Common Metric Examples

| Metric | SQL Formula Example |
|--------|---------------------|
| Total Revenue | `SUM(revenue)` |
| Total Orders | `COUNT(DISTINCT order_id)` |
| Average Order Value | `SUM(revenue) / COUNT(DISTINCT order_id)` |
| Conversion Rate | `COUNT(DISTINCT converted_user) / COUNT(DISTINCT visitor) * 100` |

## Configuring a Metric

| Property | Meaning |
|----------|---------|
| **Name** | The technical name (e.g., `total_revenue`). |
| **Label** | The display name (e.g., `Total Revenue`). |
| **Aggregation** | The SQL function to apply: `SUM`, `COUNT`, `AVG`, `MIN`, `MAX`, `COUNT_DISTINCT`. |
| **Column** | The specific column the aggregation is applied to. |
| **Format** | How the number is displayed: `currency`, `number`, `percent`. |
| **Description** | Context for the AI. For example: "The total value of successfully paid orders." |
| **Synonyms** | Alternative ways users might ask for this metric. e.g., `"sales"`, `"income"`, `"gross revenue"`. |

> **Pro Tip:** Add as many **Synonyms** and as detailed a **Description** as possible. This greatly enhances the AI's ability to recognize the metric from variously phrased natural language questions.
