# Slash Commands & AI Skills Overview

In Semantix AI Chat, you can go far beyond simple data queries. You can activate specialized **Analytical Skills** using the **Slash Command Menu (`/`)**.

Each skill encapsulates the analytical methodologies used by seasoned data scientists and financial analysts. When invoked, skills guide the AI to return structured reasoning, empirical data verification, and rigorous defenses against common statistical biases.

---

## 1. Using the `/` Command Menu in Chat

Invoking analytical skills in the chat interface is fast and intuitive:

1. **Open the Skills Menu:**
   In the chat input bar, type a forward slash `/`. An interactive popover menu appears instantly above your cursor.

2. **Search and Select:**
   - Type additional characters to search by command name or description (e.g., type `/dia` to highlight `/metric-diagnostics`).
   - Use the `↑` and `↓` arrow keys to navigate and press `Enter` (or click) to select the desired skill.

3. **Follow the Parameter Hint:**
   Upon selection, the command is inserted into the input box alongside a light **parameter hint** indicating the required context (e.g., `/metric-diagnostics metric, comparison period`). Enter your specific question and send.

```
┌────────────────────────────────────────────────────────┐
│  /metric-diagnostics                                   │
│  Diagnose why a metric changed                         │
│  Hint: metric, comparison period                       │
├────────────────────────────────────────────────────────┤
│  /explain-number                                       │
│  Explain where this number comes from                  │
│  Hint: paste number or point to chart                  │
├────────────────────────────────────────────────────────┤
│  /kpi-readout                                          │
│  Periodic KPI review and scorecard                     │
│  Hint: period (month/quarter), KPI list                │
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory of Analytical Skills & Slash Commands

The 14 on-demand skills are organized across 5 specialized domains:

### 2.1 Diagnostic Skills (Diagnose)

| Command | Skill Title | Parameter Hint | When to Use | Real-World Example |
|---|---|---|---|---|
| `/metric-diagnostics` | **Metric Diagnostics** | `metric, comparison period` | Explaining sudden metric shifts, deviations from plan, unexpected spikes, or reconciliation discrepancies. | `/metric-diagnostics why did CASA deposit balances decline this month vs. last month? Which branch drove it?` |
| `/explain-number` | **Explain Number** | `paste number or point to chart` | Deconstructing a specific metric on screen: source lineage, applied filters, and underlying arithmetic formula. | `/explain-number what components make up the $3.2M figure in the revenue chart?` |

### 2.2 Advanced Analytical Skills (Advanced Analysis)

| Command | Skill Title | Parameter Hint | When to Use | Real-World Example |
|---|---|---|---|---|
| `/churn-risk` | **Churn Risk Detection** | `customer entity, transaction date` | Identifying accounts exhibiting silence beyond their habitual repurchase cycle alongside outstanding exposure. | `/churn-risk list enterprise clients who have not placed a purchase order in the past 60 days` |
| `/cohort-retention` | **Cohort Retention Analysis** | `acquisition cohort, activity date` | Measuring customer retention curves and decay rates across weekly or monthly vintages. | `/cohort-retention analyze monthly retention rates for 2026 user acquisition cohorts` |
| `/funnel-conversion` | **Funnel Conversion Rates** | `funnel steps, date range` | Measuring conversion throughput across lifecycle stages and highlighting primary drop-off bottlenecks. | `/funnel-conversion analyze checkout funnel drop-off from add-to-cart to completed payment` |
| `/rfm-segmentation` | **RFM Customer Segmentation** | `transaction date, order value` | Clustering customer bases across Recency, Frequency, and Monetary scores into Champions, Loyal, At Risk, and Hibernating tiers. | `/rfm-segmentation segment credit card customers using the standard RFM framework` |
| `/pareto-contribution` | **Pareto 80/20 Analysis** | `analysis dimension, value metric` | Pinpointing the top 20% of contributors (products, clients, regions) generating 80% of total metric volume. | `/pareto-contribution which 20% of product SKUs generate 80% of gross revenue?` |
| `/compare-groups` | **Compare Two Groups** | `group A, group B, target metric` | Conducting side-by-side performance comparisons between customer cohorts, geographic regions, or sales channels. | `/compare-groups compare average order value between North and South regions` |

### 2.3 Reporting Skills (Reporting)

| Command | Skill Title | Parameter Hint | When to Use | Real-World Example |
|---|---|---|---|---|
| `/kpi-readout` | **Periodic KPI Readout** | `period (month/quarter), KPI list` | Reviewing goal progress (WBR, MBR, scorecard summaries) to evaluate on-track vs. lagging metrics. | `/kpi-readout Q3 2026 KPI progress report for the Enterprise Banking division` |
| `/report-executive` | **Executive Briefing Memo** | `report topic, evaluation period` | Generating an executive-ready briefing memo structured as: Executive Summary $\rightarrow$ Quantitative Highlights $\rightarrow$ Driver Decomposition $\rightarrow$ Recommendations. | `/report-executive summarize August financial performance and Q4 forecast` |

### 2.4 Data Management Skills (Data Quality)

| Command | Skill Title | Parameter Hint | When to Use | Real-World Example |
|---|---|---|---|---|
| `/data-quality-profile` | **Table Data Quality Profiling** | `table name or data model` | Auditing table cleanliness: null rates, unique constraints, value distributions, and anomalous outliers. | `/data-quality-profile audit data quality for the dim_customers table` |
| `/context-interview` | **Teach Assistant Your Domain** | `table name or business convention` | Engaging in a structured Q&A interview to register business terminology, synonyms, and metric definitions into Context. | `/context-interview configure accounting definitions for the general ledger mart` |

### 2.5 Validation Skills (Validation)

| Command | Skill Title | Parameter Hint | When to Use | Real-World Example |
|---|---|---|---|---|
| `/validate-analysis` | **Validate Analysis Integrity** | `analysis response or data table` | Auditing methodological soundness: verifying measurement integrity, sample sizes, shifting denominators, and Simpson's Paradox. | `/validate-analysis did the previous sales analysis exclude canceled orders and merchant refunds?` |

---

## 3. Automatic Keyword Triggers (Smart Triggers)

You are **never required** to memorize or manually type `/` commands.

Semantix includes an intelligent Intent Trigger Classifier. When you ask questions in natural conversation, the engine automatically matches intent keywords and injects the appropriate analytical skill into the session:

- When your question asks: *"why did"*, *"what drove"*, *"root cause"*, *"driver"*, *"dropped sharply"*, *"spike"*, *"reconcile discrepancy"*...  
  👉 Semantix **automatically activates `metric-diagnostics`**.
- When your question asks: *"where does this number come from"*, *"how is this computed"*, *"trace source"*, *"break down this metric"*...  
  👉 Semantix **automatically activates `explain-number`**.
- When your question asks: *"check this"*, *"is this accurate"*, *"verify"*, *"double check"*, *"can we trust this"*...  
  👉 Semantix **automatically activates `validate-analysis`**.
- When your question asks: *"weekly readout"*, *"monthly review"*, *"KPI status"*, *"scorecard"*, *"WBR"*, *"MBR"*...  
  👉 Semantix **automatically activates `kpi-readout`**.

Using the `/` slash command menu directly remains the fastest way to explicitly instruct the AI to follow a rigorous analytical framework.
