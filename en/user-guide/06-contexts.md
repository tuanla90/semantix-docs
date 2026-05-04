# 6. Defining a Context (Semantic Scope)

A Context is a collection of Models, Metrics, and business rules grouped around a specific business topic or domain. The AI Assistant always operates within the boundaries of a chosen Context, ensuring accurate and domain-specific answers.

**Navigation:** Admin → Contexts → **New Context**

## Step 1 — Basic Information

- **Name**: A short identifier (e.g., `sales_analysis`).
- **Label**: The friendly display name (e.g., `Sales Analytics`).
- **Description**: Describe the scope. For example: *"Analyzes revenue, orders, and customer data for the sales department."*

## Step 2 — Select Models

Add the relevant Models you created previously into this Context (e.g., `orders`, `customers`, `products`).

## Step 3 — Select Metrics

Choose the specific Metrics that users operating in this Context are permitted to query. This acts as a security and governance layer.

## Step 4 — Declare Forbidden Combinations (Optional)

You can define rules to prevent the AI from generating nonsensical or logically incorrect queries. For example:

```text
Do not GROUP BY "employee ID" when filtering by "branch region".
```

## Step 5 — Configure Default Time Column

Select a default date/time column. The AI uses this as a fallback when a user asks time-relative questions like *"this month"* or *"last week"* without explicitly mentioning a date column.

## Step 6 — Save & Publish

Click **Save** to make the Context available for Assistants and Dashboards.
