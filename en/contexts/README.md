# Contexts & Data Models

## What is a Context?

A **Context** is a semantic layer that sits between your raw database and the AI. It tells Semantix:

- Which tables and columns are available
- How tables relate to each other (joins)
- What metrics and calculated columns exist
- Who can access what data (Row-Level Security)

Think of a Context as a **virtual data model** — your users interact with business-friendly names and concepts, not raw table schemas.

## Why Contexts Matter

Without a context, the AI would need to figure out your entire database schema every time a user asks a question. With a context:

- Queries are faster and more accurate
- You control exactly what data is exposed
- Business logic (e.g. "Revenue = price × quantity") is defined once
- Sensitive columns can be hidden from specific users

## Context Components

| Component | Description |
|-----------|-------------|
| **Tables** | The database tables included in this context |
| **Columns** | Selected columns with friendly display names |
| **Relationships** | Foreign key joins between tables |
| **Calculated Columns** | SQL expressions (e.g. `price * quantity`) |
| **Metrics** | Aggregated measures (e.g. `SUM(revenue)`) |
| **KPIs** | Key business metrics displayed on the context overview |
| **Access Policies** | Row-level filters per role |

## Next Steps

- [Building a Data Model](data-model.md)
- [Row-Level Security](rls.md)
