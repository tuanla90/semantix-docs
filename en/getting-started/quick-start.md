# Quick Start

Get up and running with Semantix in under 10 minutes.

## Step 1 — Connect a Database

1. Go to **Admin → Connections → New Connection**
2. Choose your database type (PostgreSQL, MySQL, BigQuery, etc.)
3. Enter your connection credentials
4. Click **Test Connection** to verify, then **Save**

> 💡 Semantix encrypts all credentials at rest. Your passwords are never stored in plain text.

## Step 2 — Create a Data Model

1. Go to **Admin → Contexts → New Context**
2. Select the connection you just created
3. Pick the tables you want to expose for querying
4. Define relationships between tables if needed
5. Click **Save**

## Step 3 — Configure an AI Assistant

1. Go to **Admin → AI Providers → New Provider**
2. Enter your API key (OpenAI, Anthropic, Gemini, or others)
3. Go to **Admin → Assistants → New Assistant**
4. Assign the AI provider and link it to your context

## Step 4 — Start Chatting

1. Open **Analysis** from the main navigation
2. Select your context
3. Type a question in plain English, e.g.:
   - *"Show me total revenue by month for 2024"*
   - *"Which products had the highest return rate last quarter?"*
4. Semantix generates SQL, runs it, and returns results with a chart

## Step 5 — Build a Dashboard

1. Go to **Dashboards → New Dashboard**
2. Add widgets from your saved queries
3. Arrange and resize charts as needed
4. Share the dashboard URL with your team

## What's Next?

- [Connect more databases](../connections/README.md)
- [Set up Row-Level Security](../contexts/rls.md)
- [Explore the Public API](../api-reference/README.md)
- [Configure alerts on Telegram](../notifications/telegram.md)
