# Quick Start

Get Semantix up and running in under 10 minutes.

## Step 1 — Connect a Data Source

1. Go to **Studio → DE → Connections → New Connection**
2. Select your database type (PostgreSQL, MySQL, BigQuery, etc.)
3. Enter your connection credentials
4. Click **Test Connection** to verify, then click **Save**

> Semantix encrypts all credentials at rest. Passwords are never stored as plain text.

## Step 2 — Create a Data Model

1. Go to **Studio → DABI → Data Models → New Model**
2. Select your Connection and table
3. Set the name, label, and description
4. Configure columns (label, data type, description)
5. Define [Metrics](../studio/metrics.md) (KPIs)
6. Declare [Relations](../studio/relations.md) if you need to JOIN multiple tables
7. Click **Save**

## Step 3 — Create a Semantic Context

1. Go to **Studio → DABI → Semantic Contexts → New Context**
2. Enter a name and description
3. Add your relevant Models
4. Select the Metrics users can query
5. Click **Save**

## Step 4 — Configure an AI Provider & Assistant

1. Go to **Studio → DSAI → AI Providers → New Provider**
2. Enter your API key (OpenAI, Anthropic, Gemini...)
3. Go to **Studio → DSAI → AI Assistants → New Assistant**
4. Select the AI Provider and Context you just created
5. Click **Save**

## Step 5 — Start Analyzing

1. Open **AI Chat** from the top navigation
2. Select your AI Assistant
3. Ask questions in natural language, for example:
   - *"Show total revenue by month for 2024"*
   - *"Which product has the highest return rate last quarter?"*
4. Semantix generates SQL, runs it, and returns results with charts

## Step 6 — Explore Data Portal (Optional)

1. Go to **Studio → DE → Data Templates → New Template** to create a report template
2. End users access **Data Portal** to export reports using filter parameters

## Next Steps

- [Connect more databases](../connections/README.md)
- [Set up Row-Level Security](../contexts/rls.md)
- [Create Data Pipelines](../studio/pipelines.md)
- [Explore the Public API](../api-reference/README.md)
