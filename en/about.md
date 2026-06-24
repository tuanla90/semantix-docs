# About Semantix

## What is Semantix?

**Semantix** is an AI-powered data intelligence platform that lets every member of your organization — from business managers to data analysts — ask questions in plain language and get answers instantly, without writing SQL or knowing how to code.

Rather than connecting AI directly to raw database schemas, Semantix builds a **Semantic Layer** — a governed translation layer where business concepts ("revenue", "active customers", "conversion rate") are defined once, standardized, and reused consistently across the entire organization. AI is aligned to this semantic layer — not to raw column names.

---

## Why Semantix Was Built

### The Problem with Traditional BI

In most organizations, getting a data answer looks like this:

```
Manager submits a request
       ↓
Analyst receives ticket → writes SQL → builds report
       ↓
Result is delivered — usually 1–3 days later
       ↓
Manager has a follow-up question → repeat the cycle
```

This model creates **two bottlenecks** that cannot be solved by simply hiring more people:

**The technical bottleneck** — Business users don't know SQL and can't query data on their own. They depend entirely on the data team — which is always busy handling multiple requests.

**The semantic bottleneck** — Even if AI can translate natural language into SQL, it still doesn't know what "revenue" means in your organization: Does it include VAT? Does it net out returns? Only paid orders, or pending too? Every company defines these differently — and AI cannot infer that from a column named `revenue_amount`.

### How Semantix Solves It

Semantix addresses both bottlenecks through a three-tier architecture:

```
┌─────────────────────────────────────────┐
│              End User                   │
│   (natural language questions / UI)     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Semantic Layer                │
│   (Data Models, Metrics, Contexts)      │
│   Standardized business definitions     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│        Database / Data Source           │
│  (PostgreSQL, BigQuery, Snowflake...)   │
└─────────────────────────────────────────┘
```

The Semantic Layer acts as a two-way translator: turning natural language into precise SQL, and turning technical results into meaningful business insights.

---

## How Semantix Works

### Phase 1 — Build the Semantic Layer (Once)

This setup phase is performed by a Data Analyst or BI Engineer and typically takes **1–4 hours** for a typical business domain.

```
Step 1: Connection
→ Secure connection to your database (PostgreSQL, BigQuery, Snowflake, etc.)
→ Credentials encrypted with AES-256

Step 2: Data Models
→ Map each database table → business concept
→ Write Labels and Descriptions for each table and column
→ Define Metrics (KPIs): SUM(revenue), COUNT(orders)...
→ Declare Relations (JOINs) between tables

Step 3: Semantic Context
→ Group related Data Models into a "workspace"
→ Scope data access by department / use case
→ (Optional) Configure Row-Level Security

Step 4: AI Provider + AI Assistant
→ Connect an LLM model (OpenAI, Anthropic, Gemini...)
→ Define personality and response language
→ Attach a Context to the Assistant
```

### Phase 2 — Daily Use

End users only experience this phase — a simple chat interface:

```
Question: "What is total revenue this month by region?"
       ↓
AI reads Semantic Context → understands "revenue" = SUM(revenue) WHERE status='paid'
       ↓
Automatically generates optimized SQL
       ↓
Runs directly on your database (data never leaves your server)
       ↓
Returns: result table + appropriate chart + follow-up suggestions
```

The entire cycle from question to answer typically takes under **5 seconds**.

---

## Core Concepts

### Connection

A **Connection** is the secure link between Semantix and your data source. Each Connection stores the host, port, database name, and credentials — fully encrypted and never displayed again after saving.

**Supported sources:**

| Type | Sources |
|------|---------|
| **Relational DB** | PostgreSQL, MySQL, MariaDB, Amazon Redshift |
| **Data Warehouse** | BigQuery, Snowflake, ClickHouse |
| **Spreadsheet** | Google Sheets |
| **Others** | See the full list at [Data Sources](connections/README.md) |

A workspace can have multiple Connections — for example, one for a Production DB and one for a Data Warehouse.

→ [Detailed guide: Connections](studio/connections.md)

---

### Data Model

A **Data Model** is the semantic map of a database table. This is the single most important component in the Semantic Layer.

Instead of AI seeing:
```sql
SELECT rev_amt_vnd FROM ord_hdr WHERE ord_sts_cd = 'PD'
```

AI sees:
> *"Orders table — each row is one order. Column 'Revenue (VND)' is the total order value including shipping and after discounts. Only count orders with status = 'paid'."*

**Structure of a Data Model:**

```
Data Model
├── General info: Name, Label, Description, Connection, Table
├── Columns          → each column with Label, Type, Description
├── Metrics          → computed KPIs (SUM, COUNT, AVG, ...)
├── Calculated Fields → custom columns using SQL expressions
└── Relations        → declared JOINs to other Data Models
```

**The golden rule:** Column and table Descriptions are what AI reads to understand your business. Investing in good descriptions = investing in AI accuracy.

→ [Detailed guide: Data Models](studio/data-models.md)

---

### Metrics (KPIs)

**Metrics** are pre-defined business measurements attached to a Data Model. When a user asks "what is total revenue", AI uses the exact Metric defined — rather than guessing the formula.

**Examples of common Metrics:**

| Metric | Type | Formula |
|--------|------|---------|
| Total Revenue | SUM | `SUM(revenue)` |
| Number of Orders | COUNT_DISTINCT | `COUNT(DISTINCT order_id)` |
| Average Order Value | AVG | `AVG(revenue)` |
| Cancellation Rate | CUSTOM | `COUNT(cancelled) / COUNT(*) * 100` |
| Unique Customers | COUNT_DISTINCT | `COUNT(DISTINCT customer_id)` |

Metrics can be reused across multiple Semantic Contexts.

→ [Detailed guide: Metrics](studio/metrics.md)

---

### Calculated Fields

**Calculated Fields** are virtual columns computed from custom SQL expressions — no need to create new columns in your database.

**Examples:**
- `profit_margin` = `(revenue - cost) / revenue * 100`
- `order_age_days` = `DATEDIFF(NOW(), order_date)`
- `customer_tier` = `CASE WHEN lifetime_value > 10000000 THEN 'VIP' WHEN lifetime_value > 1000000 THEN 'Standard' ELSE 'Basic' END`

Calculated Fields can be used like regular columns in AI queries — "what is VIP customer revenue this month?"

→ [Detailed guide: Calculated Fields](studio/calculated-fields.md)

---

### Relations

**Relations** declare JOIN relationships between Data Models. When a user asks "revenue by product category", AI needs to know how to JOIN the Orders table with the Products table — Relations provide exactly that.

**Relationship types:**

| Type | Meaning |
|------|---------|
| `many_to_one` | Many orders belong to one customer |
| `one_to_many` | One order has many line items |
| `one_to_one` | One user has one profile |

→ [Detailed guide: Relations](studio/relations.md)

---

### Semantic Context

A **Semantic Context** (Context for short) is a collection of Data Models and Metrics grouped around a specific business domain. This is the "workspace" that each AI Assistant operates within.

**Why Contexts matter:**

Your organization might have dozens of tables — but the Sales team only needs to work with Orders, Customers, and Products. The Marketing team only needs Campaigns, Leads, and Conversions. Contexts ensure each AI Assistant only "sees" and answers within the data scope appropriate for that group of users.

**Context configuration:**
- List of Data Models allowed for querying
- List of Metrics available in this context
- Default Time Column (for questions like "this month", "last week")
- Row-Level Security (optional) — filter data per individual user

→ [Detailed guide: Semantic Contexts](studio/contexts.md)

---

### AI Provider

An **AI Provider** is the LLM (large language model) supplier that Semantix uses to understand questions and generate SQL. Semantix is not locked into one provider — you choose your own and control your own API keys.

**Supported providers:**

| Provider | Recommended Model | Notes |
|----------|------------------|-------|
| **OpenAI** | GPT-4o | Best overall performance |
| **Anthropic** | Claude Sonnet | Excellent for complex data reasoning |
| **Google** | Gemini 1.5 Pro | Great integration with BigQuery |
| **DeepSeek** | DeepSeek-V3 | Low cost, open source |
| **Ollama** | Llama 3, Mistral | Self-hosted, no data sent externally |

You can configure multiple AI Providers and assign different ones to each AI Assistant.

→ [Detailed guide: AI Providers](studio/ai-providers.md)

---

### AI Assistant

An **AI Assistant** is the conversational interface that end users interact with directly. Each Assistant is a combination of:

```
AI Assistant = Semantic Context + AI Provider/Model + Personality + Language
```

**A typical organization creates multiple AI Assistants:**

| Assistant | Context | Audience |
|-----------|---------|----------|
| Sales Assistant | `sales` | Sales & Marketing team |
| Operations Assistant | `operations` | Ops & Logistics team |
| Finance Assistant | `finance` | Accounting team |
| Executive Analytics | `executive` | Leadership |

The **Personality (System Prompt)** lets you shape how AI responds: language, presentation style, preferred chart types, currency units, etc.

→ [Detailed guide: AI Assistants](studio/ai-assistants.md)

---

### Knowledge Base

A **Knowledge Base** lets AI reference internal documents when answering questions — PDFs, Word files, plain text, wikis — helping AI understand organization-specific terminology, policies, and processes.

**Example use cases:**
- Upload "VIP Customer Classification Policy" → AI correctly applies your company's criteria when asked about VIP customers
- Upload an industry glossary → AI doesn't confuse "churn" in your company's meaning with the general definition

→ [Detailed guide: Knowledge Bases](studio/knowledge-bases.md)

---

### Data Portal

The **Data Portal** is a self-service data hub for non-technical end users. Instead of chatting with AI, users pick a **Data Template** (a pre-built report template), fill in filter parameters (date range, region, product...), and export data — no SQL or AI knowledge required.

**Ideal for:**
- Sales staff who need a weekly revenue report
- Accounting teams exporting receivables by customer
- HR teams pulling monthly attendance reports

→ [Detailed guide: Data Portal](data-portal/README.md)

---

### Data Pipelines

**Data Pipelines** automate data synchronization on a schedule between sources and destinations. No ETL code needed — just configure the source, destination, and schedule, and Semantix handles the rest.

**Common use cases:**
- Sync data from multiple branches to a central Data Warehouse
- Export analysis results to Google Sheets daily
- Replicate production data to a read-only analytics environment

→ [Detailed guide: Data Pipelines](studio/pipelines.md)

---

### Dashboards

**Dashboards** are collections of widgets (charts, scorecards, tables, text) arranged visually. Users can build Dashboards by:
- Pinning results directly from AI Chat (fastest method)
- Dragging and dropping widgets in the Dashboard Editor
- Embedding into external applications via Embed Token

→ [Detailed guide: Dashboards](dashboards/README.md)

---

## Security Architecture

Semantix is built on the principle of **"data never leaves your infrastructure"**:

| Principle | Details |
|-----------|---------|
| **Query at source** | Semantix generates SQL and sends it to your database — results go directly to the user and are never stored on Semantix servers |
| **Encrypted credentials** | Database connection credentials are encrypted with AES-256 before storage |
| **Row-Level Security** | Attributes & Contexts restrict which data each user is allowed to see |
| **Enterprise SSO** | Supports SAML 2.0 and OIDC — integrates with Okta, Azure AD, Google Workspace |
| **Audit Logs** | All questions, generated SQL, and results are logged for governance and compliance |
| **Self-hosted** | Deploy entirely within your own infrastructure — no data sharing with third parties |
| **API Key scoping** | Each API Key can be scoped to read-only access or a specific Context |

→ [Detailed guide: Architecture & Security](admin/security.md)

---

## Who is Semantix For?

| Role | Primary Use | Key Features |
|------|------------|-------------|
| **Managers / Executives** | Ask questions in plain language without involving the data team | AI Chat, Dashboards |
| **Business Analyst** | Build Data Models, eliminate repetitive reporting | Studio, Data Templates |
| **Data Engineer** | Manage connections, pipelines, engine templates | Connections, Pipelines |
| **Data Scientist** | Built-in Cohort, RFM, Funnel, and Growth analysis | AI Chat Advanced |
| **Developer** | Embed dashboards, query data via API | API Reference, Embed |
| **End User** | Export reports from pre-built templates without technical skills | Data Portal |

---

## How Semantix Compares

| | Semantix | Traditional BI Tool | AI-to-SQL Only |
|--|---------|--------------------|--------------------|
| End users can self-serve | ✅ | ❌ Requires analyst | ⚠️ Inconsistent results |
| Standardized business definitions | ✅ Semantic Layer | ⚠️ Scattered in reports | ❌ None |
| Consistent answers for everyone | ✅ | ⚠️ Depends on analyst | ❌ Varies each time |
| Self-hosted / data stays in-house | ✅ | ✅ | ⚠️ Vendor-dependent |
| Built-in advanced analytics | ✅ Cohort, RFM, Funnel | ⚠️ Requires config | ❌ |
| Initial setup effort | Moderate (1–4h/domain) | High (weeks–months) | Low but inaccurate |

---

## Product Philosophy

**"Define once, use forever."**

Semantix believes that the core problem with data in organizations is not a shortage of data — it's the absence of a single, consistent place to define what business concepts mean. Every time an analyst writes a new SQL query, they are recreating a business definition — with no guarantee it matches the SQL another analyst wrote last week.

The Semantic Layer solves this: once "revenue" is defined in a Data Model, every question from every user — via AI Chat, Dashboard, or API — uses exactly that definition.

---

## Next Steps

- **Jump in now** → [Getting Started Overview](getting-started/index.md)
- **Try it free** → [Free Trial with Google Sheets](free-trial/README.md)
- **Go straight to setup** → [Quick Start — 7 Steps](getting-started/quick-start.md)
- **Review security details** → [Architecture & Security](admin/security.md)
