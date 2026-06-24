# Quick Start

This guide takes you from a blank screen to asking questions in natural language and receiving charts in **10–15 minutes**. Each step is described in detail so you won't miss anything.

---

## Step 1 — Connect a Data Source

Semantix needs to know where your data lives. This step creates a **Connection** — the credentials and address to connect to your database or file.

### 1.1 Open the Connection creation screen

1. Log in to Semantix.
2. In the left navigation bar, select **Studio**.
3. Under **DE (Data Engineering)**, click **Connections**.
4. Click the **New Connection** button in the top-right corner.

### 1.2 Select your database type

A list of data source types appears. Select the one that matches your system:

| Database Type | When to Use |
|--------------|------------|
| **PostgreSQL** | PostgreSQL or Amazon Redshift |
| **MySQL** | MySQL or MariaDB |
| **BigQuery** | Google BigQuery data warehouse |
| **Snowflake** | Snowflake cloud data warehouse |
| **ClickHouse** | ClickHouse analytics database |
| **Google Sheets** | Google Sheets spreadsheet (good for Free tier) |

### 1.3 Enter connection details

Depending on the database type, you'll see these fields:

**For PostgreSQL / MySQL:**

| Field | Example | Notes |
|-------|---------|-------|
| Name | `Production DB` | Display name inside Semantix |
| Host | `db.company.com` | Database server address |
| Port | `5432` (PostgreSQL) / `3306` (MySQL) | Connection port |
| Database | `analytics` | Specific database name |
| Username | `semantix_user` | Read-only account |
| Password | `••••••••` | Encrypted when saved |
| SSL | Enable if the server requires it | Recommended in production |

**For Google Sheets:**

1. Share the Google Sheets file with the service account email:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
   Open the file → click **Share** → paste the address above → **Viewer** permission → **Send**.
2. Get the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Enter the Spreadsheet ID and sheet name (tab) in the form.

### 1.4 Test and save

1. Click **Test Connection** — Semantix will attempt to connect and report success or error.
2. If successful, click **Save**. The Connection appears in your list.

> **Security:** Semantix encrypts all credentials. Passwords are never stored as plain text and are never shown again after saving.

---

## Step 2 — Create a Data Model

A Data Model is the "map" that helps the AI understand the business meaning of your data tables. This is the most important step — the more detail you put into descriptions, the more accurately the AI will answer.

### 2.1 Create a new Model

1. In Studio, select **DABI → Data Models → New Model**.
2. First, select the **Connection** you just created and choose the **Table** to use.
3. Click **Import** to have Semantix automatically load the column list from the database.

### 2.2 Fill in basic information

| Field | Example | Notes |
|-------|---------|-------|
| **Name** | `orders` | Technical name, no spaces |
| **Label** | `Sales Orders` | Friendly display name — what AI and users see |
| **Description** | `All orders from the website and stores. Each row represents one order.` | AI reads this to understand when to use this table |

### 2.3 Configure columns (Columns tab)

For each important column, fill in:

| Property | Meaning | Tip |
|----------|---------|-----|
| **Label** | Human-readable display name | Example: "Order Date", "Total Amount" |
| **Data Type** | `TEXT`, `INTEGER`, `DOUBLE`, `DATE`, `DATETIME` | Correct type helps AI know which operations apply |
| **Description** | Meaning and characteristics of the column | The more detail, the better |
| **Primary Key** | Mark if this is the primary key | Helps AI understand how to count unique records |
| **Searchable** | Allow AI to filter by this column | Enable for commonly used filter columns |

**Examples of good column descriptions:**
- Column `status`: *"Order status: 'pending' = awaiting processing, 'paid' = payment confirmed, 'cancelled' = cancelled. Only count revenue for orders with status = 'paid'."*
- Column `revenue`: *"Total order value including shipping, after discounts. Unit: USD."*

### 2.4 Define Metrics (KPI indicators)

Switch to the **Metrics** tab → click **New Metric**:

| Metric | Aggregation | Column |
|--------|-------------|--------|
| Total Revenue | SUM | revenue |
| Order Count | COUNT_DISTINCT | order_id |
| Average Order Value | AVG | revenue |
| Unique Customers | COUNT_DISTINCT | customer_id |

See detailed guide at [Metrics](../studio/metrics.md).

### 2.5 Declare Relations (if JOIN is needed)

If you have multiple tables to combine (e.g., orders + customers), switch to the **Relations** tab and declare the relationship. See [Relations](../studio/relations.md).

### 2.6 Save the Model

Click **Save**. The Model appears in the Data Models list.

---

## Step 3 — Create a Semantic Context

A Context is the "workspace" that groups related Models together and tells the AI which data scope it is allowed to query.

### 3.1 Create a new Context

1. Go to **Studio → DABI → Semantic Contexts → New Context**.
2. Fill in the fields:

| Field | Example |
|-------|---------|
| **Name** | `sales_analysis` |
| **Label** | `Sales Analysis` |
| **Description** | `Order and customer data for the Sales team. Includes revenue, order volume, and breakdowns by region and product.` |

### 3.2 Add Models and Metrics

- **Models** tab: Select the related Models (e.g., `orders`, `customers`, `products`).
- **Metrics** tab: Select the Metrics users can use within this Context.
- **Default Time Column**: Choose the default date column (e.g., `order_date`) so the AI understands "this month", "last week" without the user specifying.

### 3.3 Save the Context

Click **Save**.

---

## Step 4 — Configure an AI Provider & AI Assistant

### 4.1 Add an AI Provider

An AI Provider supplies the "brain" — the large language model (LLM) that understands users' questions.

1. Go to **Studio → DSAI → AI Providers → New Provider**.
2. Fill in the fields:

| Field | Example |
|-------|---------|
| **Name** | `OpenAI Production` |
| **Provider** | OpenAI |
| **API Key** | `sk-...` (from platform.openai.com) |
| **Capabilities** | Select `LLM` and `Embedding` |
| **Default LLM** | Enable — sets this as default for AI Chat |

3. Click **Save**.

**Supported Providers:** OpenAI (GPT-4o, GPT-4), Anthropic (Claude Sonnet, Opus), Google Gemini, DeepSeek, Ollama (self-hosted).

### 4.2 Create an AI Assistant

1. Go to **Studio → DSAI → AI Assistants → New Assistant**.
2. Fill in the fields:

| Field | Example |
|-------|---------|
| **Name** | `Sales Assistant` |
| **Context** | Select the Context you just created (`sales_analysis`) |
| **AI Provider** | Select the Provider you just added |
| **Model** | `gpt-4o` or `gpt-4-turbo` |
| **Language** | `en` (English) |
| **Greeting Message** | `Hello! I can help you analyze your business data. Ask me anything!` |

3. **Personality (system prompt)** — guides how the AI responds:
   ```
   You are a business analytics assistant. Respond concisely and professionally. 
   Always present numbers as tables or charts. Currency is USD. 
   If unsure, ask the user a clarifying question.
   ```
4. Click **Save**.

---

## Step 5 — Start AI Chat Analysis

1. Click **AI Chat** in the main navigation bar (top menu).
2. Select the AI Assistant you just created from the left panel.
3. Ask questions in plain natural language, for example:

```
Total revenue this month by product
Top 10 customers by revenue last quarter
Compare revenue in May vs June this year
Cancellation rate by region over the past 30 days
```

4. Semantix will:
   - Understand the intent of the question
   - Automatically generate SQL and run it on your database
   - Return results with an appropriate chart

5. Click **View SQL** to see the generated query.
6. Click the **pin icon (📌)** to save a chart to a Dashboard.

---

## Step 6 — Create a Dashboard (Optional)

Dashboards let you save and monitor key metrics on a daily basis.

1. Click **Dashboards** in the navigation bar.
2. Click **New Dashboard** → enter a name → **Create**.
3. Add widgets by:
   - Pinning results from AI Chat (fastest method), or
   - Clicking **Add Widget** in the Dashboard Editor and configuring manually.
4. Drag and drop to rearrange widgets.
5. Click **Save**.

---

## Step 7 — Explore More (Optional)

| Feature | Description | Guide |
|---------|-------------|-------|
| **Data Portal** | Lets end users export reports from templates without any SQL | [View →](../data-portal/README.md) |
| **Notifications** | Send alerts via Telegram, Zalo, or Teams when metrics cross thresholds | [View →](../notifications/README.md) |
| **Row-Level Security** | Row-level access control — each user sees only their own data | [View →](../contexts/rls.md) |
| **Data Pipelines** | Automatically sync data on a schedule | [View →](../studio/pipelines.md) |
| **Knowledge Bases** | Let the AI read internal documents (PDF, Word) | [View →](../studio/knowledge-bases.md) |

---

## Common Questions When Getting Started

**Q: AI gives wrong or irrelevant answers?**
→ Review the Descriptions of columns and Metrics. Clearer descriptions lead to more accurate AI.

**Q: Database connection fails?**
→ Check your firewall — allow Semantix's IP address to connect to the database. Contact your team to whitelist the IP.

**Q: No tables appear when creating a Data Model?**
→ Verify the database user has `SELECT` permissions on the tables you need.

**Q: AI doesn't understand questions with special characters or abbreviations?**
→ Ensure the Language field in the AI Assistant is set correctly. Add synonyms to Metrics and Columns to cover more variations.
