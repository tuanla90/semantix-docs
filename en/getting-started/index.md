# Getting Started with Semantix

This page helps you find the right path based on your goal and context — rather than reading all docs in order, start with the path that fits you best.

---

## Choose Your Path

### I want to try it quickly, no installation needed

If you just want to experience Semantix without a production database — or simply want to see how it works — start with **Google Sheets in 10 minutes**:

> **→ [Free Trial: Connect Google Sheets & Chat with Your Data](../free-trial/README.md)**

You will learn to:
- Connect a Google Sheets file to Semantix (no complex setup)
- Create a basic Data Model
- Ask questions in plain English and receive charts
- Build your first Dashboard

Best for: users evaluating Semantix, internal demos, or small teams already using Google Sheets.

---

### I have a database and want to set up for production

If you already have PostgreSQL, MySQL, BigQuery, Snowflake, or ClickHouse and want to go straight to a real setup:

> **→ [Quick Start — From Zero to AI Chat](quick-start.md)**

A 7-step guide, estimated at **15–30 minutes** for a typical business domain:

| Step | Goal | Time |
|------|------|------|
| 1. Connection | Secure connection to your database | 5 min |
| 2. Data Model | Map tables → business concepts | 15–30 min |
| 3. Semantic Context | Group Models by scope | 5 min |
| 4. AI Provider | Attach an LLM model | 5 min |
| 5. AI Assistant | Configure the AI interface | 5 min |
| 6. AI Chat | Ask your first question | Instant |
| 7. Dashboard | Pin and share results | 5 min |

---

### I want to understand the architecture before starting

> **→ [About Semantix — Architecture, How It Works & Core Concepts](../about.md)**

Best for: architects, tech leads, or anyone who wants to understand the "why" and "how" before diving into configuration.

---

### I need to check technical requirements for self-hosted deployment

> **→ [System Requirements](requirements.md)**

---

## Learning Paths by Role

### Data Analyst / BI Engineer

The person who builds and maintains the Semantic Layer — the most important role for Semantix to work effectively.

```
1. Read "About Semantix" to grasp core concepts
        ↓
2. Complete the Quick Start (all 7 steps)
        ↓
3. Deep-dive into each component:
   - Data Models: labels, descriptions, column types
   - Calculated Fields: custom SQL expressions
   - Metrics: standardized KPI definitions
   - Relations: declaring JOINs between tables
        ↓
4. Set up Semantic Contexts per department
   (+ Row-Level Security if data access control is needed)
        ↓
5. Create AI Assistants for each user group
        ↓
6. Read: AI Optimization & Best Practices
```

**Priority docs:**
[Data Models](../studio/data-models.md) · [Calculated Fields](../studio/calculated-fields.md) · [Metrics](../studio/metrics.md) · [Relations](../studio/relations.md) · [Contexts](../studio/contexts.md) · [AI Best Practices](../deep-dives/ai-best-practices.md)

---

### Data Engineer / DevOps

The person managing data infrastructure, connections, and pipelines.

```
1. Check System Requirements and set up the environment
        ↓
2. Configure Connections (production, staging, warehouse)
        ↓
3. Set up Engine Templates (if using standardized templates)
        ↓
4. Configure Data Pipelines (scheduled data sync)
        ↓
5. Configure Admin settings:
   - SSO (SAML/OIDC)
   - Caching & Performance
   - Platform Integrations (Telegram, Teams, Zalo)
        ↓
6. Set up Audit Logs and monitoring
```

**Priority docs:**
[Requirements](requirements.md) · [Connections](../studio/connections.md) · [Data Pipelines](../studio/pipelines.md) · [SSO](../admin/sso.md) · [Security](../admin/security.md) · [Caching](../admin/caching.md)

---

### Manager / End User

The person using results — no configuration needed, just ask questions.

```
1. Log in and select the AI Assistant for your department
        ↓
2. Ask questions in plain English:
   "What is our revenue this month by region?"
   "Compare Q1 vs Q2 performance this year"
        ↓
3. View results, click "View SQL" to inspect the query if needed
        ↓
4. Pin charts to your favorite Dashboard
        ↓
5. (Optional) Use Data Portal to export reports from pre-built templates
        ↓
6. Set alerts: get notified via Telegram/Teams when a metric crosses a threshold
```

**Priority docs:**
[AI Chat](../ai-chat/README.md) · [Data Portal](../data-portal/README.md) · [Dashboards](../dashboards/README.md) · [Notifications](../notifications/README.md)

---

### Developer / Integrator

The person integrating Semantix into external applications or systems.

```
1. Create an API Key at Admin → API Keys
        ↓
2. Read the API Reference docs
        ↓
3. Use the Query Endpoint to query data programmatically
        ↓
4. Embed Dashboards into your application using an Embed Token
        ↓
5. (Optional) Use the Dashboards Endpoint to list dashboards or fetch data
```

**Priority docs:**
[API Reference](../api-reference/README.md) · [Query Endpoint](../api-reference/query.md) · [Embed Token](../api-reference/embed-token.md) · [API Keys](../admin/api-keys.md)

---

## Pre-Setup Checklist

Before configuring Semantix with a real database, make sure you have:

### Database Side
- [ ] A database with real data (or test data) is accessible
- [ ] A database user with `SELECT` permissions on the tables you need
- [ ] Semantix's IP address is whitelisted in your firewall (if required)
- [ ] You know the host, port, database name, username, and password

### AI Provider Side
- [ ] An account and API key from at least one provider:
  - OpenAI: [platform.openai.com](https://platform.openai.com)
  - Anthropic: [console.anthropic.com](https://console.anthropic.com)
  - Google AI: [aistudio.google.com](https://aistudio.google.com)
  - Or self-host Ollama (no external API key needed)
- [ ] The API key has sufficient credit/quota

### Data Side
- [ ] You've identified the business domain to start with (e.g., sales, marketing, operations)
- [ ] You know the key tables in that domain
- [ ] You know the KPIs / metrics that matter most

---

## Frequently Asked Questions

**Do I need to know SQL?**
Not to use AI Chat. But to build better Data Models and Calculated Fields, basic SQL knowledge is helpful.

**How long does initial setup take?**
A typical business domain (3–5 tables, 10–20 key columns) takes approximately **2–4 hours** to fully configure for the first time. After that, adding new tables or making edits takes 15–30 minutes.

**Is my data sent outside my infrastructure?**
No. Semantix runs queries directly against your database. Raw data is never stored on Semantix servers. Only the question you type and the generated SQL are sent to the AI Provider for processing.

**Can I use multiple AI Providers at the same time?**
Yes. You can configure multiple Providers (e.g., OpenAI for general AI Chat, Anthropic for complex analysis) and assign each AI Assistant a different Provider.

**What do I do if AI gives wrong answers?**
In 90% of cases, the root cause is that column or table Descriptions are not clear enough. Read [AI Optimization & Best Practices](../deep-dives/ai-best-practices.md) to learn how to write effective descriptions.

**What languages does Semantix support?**
AI Chat supports any language that your chosen LLM supports. The application interface is available in English and Vietnamese.

**Can I restrict which data each user can see?**
Yes. Use [Row-Level Security](../contexts/rls.md) with Attributes to filter data dynamically based on who is logged in.

---

## Support Resources

| Resource | Description |
|----------|-------------|
| [FAQs & Troubleshooting](../support/faqs.md) | Answers to common setup and usage issues |
| [AI Optimization & Best Practices](../deep-dives/ai-best-practices.md) | How to write Data Models that make AI more accurate |
| [Row-Level Security](../contexts/rls.md) | Per-user data access control |
| [Architecture & Security](../admin/security.md) | Technical details for IT and Security teams |
| [API Reference](../api-reference/README.md) | Integrate Semantix into external applications |

---

> **Most important tip:** AI quality is directly tied to the quality of Descriptions in your Data Models. Don't skip this step — 15 minutes invested in writing good descriptions will save hours of troubleshooting later.
