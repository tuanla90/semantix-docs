# AI Chat — Natural Language Analysis

**Navigation:** AI Chat (top menu)

AI Chat is the core feature of Semantix — allowing you to **ask questions in plain English** (or any language) and instantly receive data analysis results. No SQL knowledge required, no programming needed.

---

## How It Works

When you type a question, Semantix performs 4 steps:

```
[1. UNDERSTAND] Parse the question → identify intent, metric, time period, filter conditions
      ↓
[2. SQL] Automatically generate an accurate SQL query based on the Data Model
      ↓  
[3. EXECUTE] Run the SQL directly on your database
      ↓
[4. DISPLAY] Return results as a table + automatically choose the best chart type
```

**Concrete example:**

Question: *"Top 5 products by revenue in June"*

→ Semantix generates SQL:
```sql
SELECT p.product_name, SUM(o.revenue) as total_revenue
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.status IN ('paid', 'delivered')
  AND o.order_date BETWEEN '2024-06-01' AND '2024-06-30'
GROUP BY p.product_name
ORDER BY total_revenue DESC
LIMIT 5
```
→ Returns a table + bar chart

---

## AI Chat Interface

### Left Sidebar

- **AI Assistants list**: The AI assistants you have access to. Click to switch to a different Assistant.
- **Chat history**: Previous conversations. Click to review.
- **New Chat**: Start a new conversation.

### Main Area

- **Question input**: Type your question here, press Enter or the Send button.
- **Results**: Displays a data table and/or chart.
- **View SQL**: See the generated SQL query.
- **Pin (📌)**: Save the chart to a Dashboard.
- **Export**: Download as CSV or Excel.

---

## Starting a Chat

### Step 1 — Select an AI Assistant

Click on an AI Assistant name in the left sidebar. Each Assistant is configured for a different purpose (Sales, HR, Finance...).

### Step 2 — Ask a Question

Type a question in natural language into the input box, for example:

**Overview questions:**
```
What is this month's revenue?
Compare June vs May revenue this year
Revenue by region in Q2
```

**Product questions:**
```
Top 10 best-selling products this month
Which products have declining revenue vs last month?
Revenue distribution by product category
```

**Customer questions:**
```
How many new customers in June?
Top 20 customers by revenue year to date
Which customers haven't purchased in the last 90 days?
```

**Comparison questions:**
```
Compare 2024 vs 2023 revenue by month
Online vs offline: which channel is growing faster?
Sales performance by branch this month
```

**Filtered questions:**
```
What is this month's revenue from VIP customers?
Orders over $500 last week
Daily cancellation count in June
```

### Step 3 — View and Interact with Results

After the AI responds:

| Action | How To | Result |
|--------|--------|--------|
| **View SQL** | Click "View SQL" | Shows the SQL that ran — useful to verify logic |
| **Change chart** | Click the chart icon, choose a different type | Switch from bar to line, pie, etc. |
| **Pin to Dashboard** | Click 📌 | Saves the chart to the selected Dashboard |
| **Download** | Click Export | Download CSV or Excel |
| **Ask follow-up** | Type a new question | AI remembers the conversation context |
| **Share** | (if Share button available) | Create a shareable link to the result |

---

## Advanced Features

### Follow-up Questions

The AI remembers context throughout the conversation. You can ask follow-up questions without repeating conditions:

```
You: "Top 5 products by revenue in June"
→ AI: [shows table of 5 products]

You: "Online channel only"
→ AI: [filters to channel = 'online']

You: "What about May?"
→ AI: [keeps the online filter, switches to May]

You: "Show both months in one chart"
→ AI: [creates a comparison chart]
```

### Agentic Mode

When a question requires multiple analysis steps, enable **Agentic** mode:

```
"Give me a comprehensive business analysis for June: 
revenue, comparison vs last month, top products, 
top customers, and daily trends"
```

The AI will break the task down, run multiple queries, and synthesize the results into an overview report.

### Suggested Questions

When starting a chat, the AI may display suggested questions (Suggestions) that Admins have pre-configured. These help new users understand what they can ask.

If you find a useful question, click **Suggest** to propose it be added to the suggestions list (requires Admin approval).

---

## Built-In Advanced Analysis

Beyond free-form chat, Semantix includes specialized analysis models:

| Analysis Type | Description | Link |
|----------------|-------------|------|
| **Cohort Analysis** | Track customer retention over time — who comes back for a 2nd, 3rd purchase? | [View →](cohort.md) |
| **RFM Analysis** | Segment customers by 3 behavioral dimensions: Recency, Frequency, Monetary | [View →](rfm.md) |
| **Funnel Analysis** | Analyze conversion rates through each step (e.g. View → Cart → Checkout) | [View →](funnel.md) |
| **Advanced Analysis** | Overview of all advanced analysis types | [View →](advanced-analysis.md) |

---

## Tips for Effective Questions

### 1. Be Specific About Time

| Phrasing | Recommendation |
|---------|----------------|
| ❌ "Revenue recently" | Ambiguous — AI may interpret as 7 days or 3 months |
| ✅ "Revenue in the last 30 days" | Clear |
| ✅ "Revenue in June 2024" | Clear |
| ✅ "Revenue from 2024-01-01 to 2024-06-30" | Crystal clear |

### 2. Specify Which Metrics You Want

| Phrasing | Recommendation |
|---------|----------------|
| ❌ "Numbers this month" | What numbers? |
| ✅ "Total revenue and order count this month" | Clear |
| ✅ "Average order value this month" | Clear |

### 3. Specify the Analysis Dimension

| Phrasing | Recommendation |
|---------|----------------|
| ❌ "Revenue by area" | Area = which column? |
| ✅ "Revenue by region (North/Central/South) this month" | Clear |
| ✅ "Daily revenue in June" | Clear |

### 4. Use Terms That Match Your Data

Use terminology consistent with how your Data Model is named (column Labels, Metric names, status values). If the AI doesn't understand, ask: *"Do you know which column stores the order status?"*

### 5. Ask Follow-Up Questions When Results Look Off

```
"Why is June revenue much lower than May in your answer?"
"Does your SQL filter out cancelled orders?"
"Are you including refunded orders in the total?"
```

---

## When AI Gives Wrong Answers

### How to Diagnose

1. Click **View SQL** — review the query the AI generated.
2. Run that query directly in the database to confirm results.
3. If the SQL is wrong → the issue is in the Data Model configuration (Description, Metrics, Relations).

### Common Causes and Fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| AI uses the wrong column | Column Description is unclear | Go to Studio → Model → Columns → add Description |
| Wrong total (too high/low) | Metric missing correct Filter | Go to Studio → Model → Metrics → add Filter |
| AI doesn't know how to JOIN | Relations not declared | Go to Studio → Model → Relations → add relation |
| AI misunderstands a term | Missing Synonyms | Go to Studio → Model → Metrics → add Synonyms |
| Result includes cancelled orders | Metric filter missing condition | Add `status != 'cancelled'` to Metric filter |

---

## Exporting Results

| Format | Description |
|--------|-------------|
| **CSV** | Raw data, no formatting — ideal for importing into Excel or Google Sheets |
| **Excel (.xlsx)** | Excel file with basic formatting |
| **Pin to Dashboard** | Save the chart to a Dashboard for ongoing monitoring |

---

## Technical Limits

| Limit | Details |
|-------|---------|
| **Rows returned** | Default maximum 10,000 rows per query |
| **Query timeout** | Queries running over 60 seconds are cancelled |
| **Real-time data** | Depends on Connection Cache TTL — default is 1 hour cache |
| **Languages** | All languages supported — English is well-optimized with GPT-4o and Claude |
