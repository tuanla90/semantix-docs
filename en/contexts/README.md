# Contexts & Row-Level Security

An in-depth guide to Semantic Contexts — the semantic layer connecting your database to AI — and Row-Level Security for controlling each user's data scope.

---

## What Is a Context?

A **Context** is the intermediary layer between your raw database and the AI. It tells the AI:

- Which tables and columns exist and what they mean
- How tables relate to each other (JOIN relationships)
- Which business metrics (Metrics) to calculate
- Who is allowed to see which data (Row-Level Security)
- The language and response style to use

```
User: "Revenue this month?"
                    ↓
         Context (semantic layer)
         ├── Knows "revenue" = Metric "net_revenue"
         ├── Knows "this month" = WHERE created_at BETWEEN...
         ├── Knows user belongs to NYC branch → filter by branch
         └── Knows to use table orders JOIN customers
                    ↓
         AI generates accurate SQL
                    ↓
         Database executes
```

---

## Why Do You Need a Context?

**Without a Context:**
- The AI must guess the entire database structure
- Prone to using wrong tables, wrong columns, wrong JOINs
- The same question may return different results each time

**With a Context:**
- The AI knows exactly which business concept maps to which column/table
- Results are consistent and predictable
- Business logic (filters, calculations) is encapsulated, independent of how users phrase their questions

---

## Context Components

| Component | Role |
|-----------|------|
| **Connection** | Data source (PostgreSQL, BigQuery...) |
| **Data Models** | Tables/views included in the context with detailed descriptions |
| **Calculated Fields** | Formulas computed from base columns |
| **Metrics** | Aggregate business metrics (SUM, COUNT...) |
| **Relations** | Defines how tables JOIN each other |
| **Default Time Column** | The default date column when users ask "this month" |
| **Instructions** | Custom instructions for the AI with this context |
| **Access Control (RLS)** | Who can see which data |
| **Advanced Analysis** | Cohort, RFM, Funnel if needed |

---

## Designing Contexts by Department

**Best practice**: Create a separate Context for each department or major use case, rather than one giant Context for the whole company.

**Example structure:**

```
Context "Sales Analytics"
├── Models: orders, customers, products, branches
├── Metrics: net_revenue, order_count, avg_order_value
└── RLS: branch = {{user.branch}}

Context "HR Analytics"
├── Models: employees, departments, salaries, attendance
├── Metrics: headcount, avg_salary, turnover_rate
└── RLS: department = {{user.department}}

Context "Finance"
├── Models: transactions, accounts, budgets
├── Metrics: revenue, expenses, profit, cash_flow
└── RLS: Finance team and C-level only
```

**Benefits of separate Contexts:**
- Sales staff cannot see HR data and vice versa
- Each AI Assistant can be linked to its own Context
- Permissions are easy to manage per department

---

## Creating a Context From Scratch

### Step 1: Define Scope

Before creating, determine:
- Which department or user group will use this Context?
- What types of questions do they need to answer?
- What data should they NOT be able to see?

### Step 2: Select and Configure Data Models

1. Studio → DABI → Data Models → New Model
2. Choose a Connection and source table
3. Configure Columns (Label, Description, Type)
4. Create Calculated Fields if needed
5. Create Metrics with appropriate Filters
6. Declare Relations between tables

### Step 3: Create the Context

1. Studio → DABI → Data Models → Select model → Tab Contexts → New Context
2. Set a name and description
3. Choose the Default Time Column
4. Write Instructions (specific business rules)
5. Configure RLS if needed

### Step 4: Link to an AI Assistant

1. Studio → DSAI → AI Assistants → Select Assistant
2. Attach the newly created Context
3. Test with several real-world questions

---

## See More

- [Building a Data Model](data-model.md) — Step-by-step model creation
- [Row-Level Security](rls.md) — Configuring per-user data access control
