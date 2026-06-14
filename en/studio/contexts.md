# Semantic Contexts

**Navigate to:** Studio → DABI → Semantic Contexts

A Semantic Context groups Models, Metrics, and business rules around a specific topic or department. AI Assistants operate within the scope of a Context — ensuring answers are domain-specific and accurate.

## Create a New Context

1. Go to **Studio → DABI → Semantic Contexts → New Context**
2. Fill in:

### Basic Information

| Field | Description |
|-------|-------------|
| **Name** | Technical name (e.g., `sales_analysis`) |
| **Label** | Display name (e.g., `Sales Analysis`) |
| **Description** | Scope description — AI reads this to stay on-topic |

### Select Models

Add the relevant Models to this Context (e.g., `sales_orders`, `customers`, `products`).

### Select Metrics

Choose which Metrics users in this Context can query.

### Forbidden Combinations (Optional)

Declare rules to prevent AI from generating logically invalid queries. Example:

```
Do not GROUP BY employee_id when filtering by branch.
```

### Default Time Column

Select a date/time column as the default — AI uses this when users ask about "this month", "last week" without specifying which date column.

## Attaching to an AI Assistant

After creating the Context, attach it to an AI Assistant (see [AI Assistants](ai-assistants.md)) so users can chat within that context scope.

## Row-Level Security

Contexts support filtering data based on user permissions. See [Row-Level Security](../contexts/rls.md).
