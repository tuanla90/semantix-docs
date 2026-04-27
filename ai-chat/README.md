# AI Chat & Natural Language Queries

## Overview

Semantix lets you query your data by asking questions in plain English (or any language). No SQL knowledge required.

## Starting a Chat

1. Go to **Analysis** from the main navigation
2. Select a **Context** (your data source)
3. Type your question in the chat box

## Example Questions

```
Show me total sales by region for last month
Which customers spent more than $10,000 in Q4?
Compare revenue between 2023 and 2024 by category
What is our average order value this week?
List the top 10 products by units sold
```

## How It Works

1. **Intent Extraction** — The AI understands what you're asking and maps it to your data model
2. **SQL Generation** — Semantix generates the appropriate SQL query
3. **Execution** — The query runs against your database
4. **Visualization** — Results are displayed as a table or chart automatically

## Chat Features

| Feature | Description |
|---------|-------------|
| **Follow-up questions** | Ask follow-up questions in the same session |
| **Chart suggestions** | Semantix auto-suggests the best chart type |
| **SQL preview** | Click "View SQL" to see the generated query |
| **Save to dashboard** | Pin any result directly to a dashboard |
| **Export** | Download results as CSV or Excel |

## Analysis Modes

| Mode | Description |
|------|-------------|
| **Structured** | Standard NL → SQL → Chart flow |
| **Agentic** | AI agent that can run multiple queries and combine results |

## Tips for Better Results

- Be specific about time periods: *"last 30 days"*, *"Q3 2024"*, *"year to date"*
- Mention the metric clearly: *"total revenue"*, *"unique users"*, *"average basket size"*
- If results look wrong, try rephrasing or checking your context's column definitions

## Advanced Analysis

For complex analytical patterns, use the built-in advanced analysis types:

- [Cohort Analysis](cohort.md)
- [RFM Analysis](rfm.md)
- [Funnel Analysis](funnel.md)
