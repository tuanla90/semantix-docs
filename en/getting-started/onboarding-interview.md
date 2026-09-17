# Business Onboarding Interview (`/context-interview`)

When connecting a new data source to Semantix, the primary hurdle is rarely technical—it is **business context**: internal company jargon, proprietary calculation logic, and implicit domain assumptions.

Traditionally, data teams face a daunting blank configuration tab with dozens of empty fields, unsure what to define; or worse, when AI attempts to blindly guess business definitions from physical column names, it frequently generates flawed SQL with incorrect business semantics.

The **Business Onboarding Interview** (`/context-interview`) eliminates blank-context friction and prevents LLM hallucinations through an intelligent, 3-round interactive survey.

---

## 1. Operational Philosophy: Interviewing on Real Schema

The Semantix onboarding workflow is anchored on **two foundational principles**:

```
  ┌─────────────────────────────────────────────────────────────┐
  │              TWO GOLDEN RULES OF THE INTERVIEW              │
  ├──────────────────────────────┬──────────────────────────────┤
  │    1. NEVER INVENT A NAME    │  2. NEVER ASK WHAT IS KNOWN  │
  │ Every choice is strictly tied│ Skip questions if information│
  │ to a real physical column,   │ is already declared in the   │
  │ table, or metric identifier. │ active Context scope.        │
  └──────────────────────────────┴──────────────────────────────┘
```

1. **Never Invent a Name**:
   - Every multiple-choice option presented to the user is dynamically derived from real physical identifiers (`PhysicalColumn.id`, `Metric.id`, concrete database tables) in your connected schema.
   - Non-schema values (such as aggregation intervals) use deterministic sentinel tokens (`__sentinel__`, e.g., `__grain:month__`). This completely prevents the LLM from hallucinating non-existent tables or phantom fields.
2. **Never Ask What Is Already Answered**:
   - When running an interview on an existing Context where properties are already configured (e.g., a default time column or pre-existing gotcha rules), the system **automatically suppresses** redundant prompts.
   - Incremental onboarding interviews remain lean and focused exclusively on missing context.

---

## 2. The 3-Round Structured Interview

The interview is pedagogically structured to progress from macroscopic organizational context down to granular edge cases and operational pitfalls:

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     ROUND 1      │  ───> │     ROUND 2      │  ───> │     ROUND 3      │
│ Target & Time    │       │   Core Metrics   │       │ Taboos & Gotchas │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

### Round 1: Target Audience, Main Entity & Time Anchor

Round 1 establishes the **primary consumer** and the **standard temporal baseline** for the dataset:

| Prompt / Question | Identifier Key | Business Purpose | Collection Mechanism |
|-------------------|----------------|------------------|----------------------|
| **Target Audience** | `audience` | Who is the primary consumer of these reports (Leadership, Sales Team, Finance, Operations)? | Freeform quick text or suggested presets |
| **Main Entity** | `mainEntity` | Which table represents the central business object (Customers, Orders, Transactions)? | Select from real discovered physical tables (`tables`) |
| **Default Period** | `defaultPeriod` | What timeframe should queries assume when unspecified by the user? | Multiple choice: Day (`day`), Week (`week`), Month (`month`), Quarter (`quarter`), Year (`year`) |
| **Time Anchor Column** | `timeColumn` | Which date/timestamp column serves as the primary timeline for period filtering? | Filtered selection of Date/Timestamp columns auto-detected in the schema |

---

### Round 2: Core Metrics & Calculation Logic

Round 2 codifies the enterprise's **key performance indicators (KPIs)**:

| Prompt / Question | Identifier Key | Business Purpose | Collection Mechanism |
|-------------------|----------------|------------------|----------------------|
| **Key Performance Metrics** | `keyMetrics` | What are the 3–5 primary KPIs that should always be prioritized? | Multi-select from existing declared metrics |
| **Metrics Needing Definition** | `metricsNeedingDefinition` | Which metrics involve contentious or nuanced formulas? | Flagged metrics lacking documentation or `aiHint` for clarification |
| **Trend Direction** | `metricDirection` | For which metrics is **an INCREASE good**? (powers KPI scorecard green/red indicator coloring) | Multi-select list (`up_good`); cost, latency, or defect metrics are automatically inferred as decrease-is-good |
| **Candidate Numeric Columns** | `numericColumnsOfInterest` | If no metrics are predefined: which numeric columns are most frequently aggregated or summed? | Selected from numeric columns (`numeric`, `integer`) to propose new metric creation |

---

### Round 3: Taboos & Gotchas (Eliminating Costly SQL Pitfalls)

This crucial round differentiates Semantix from legacy BI platforms by proactively preventing logical query errors:

| Prompt / Question | Identifier Key | Business Risk If Undeclared | Semantix Preventive Solution |
|-------------------|----------------|-----------------------------|------------------------------|
| **Non-Additive Columns** | `nonAdditiveColumns` | When a user asks for totals, AI naively executes `SUM()` on percentage rates, unit prices, or end-of-period account balances → produces disastrously incorrect figures. | Automatically injects a strict **Gotcha** guardrail: *"Prohibit SUM() aggregation on this column — this represents a rate, snapshot balance, or unit price."* |
| **Internal Exclusions** | `internalExclusions` | Analytics get distorted by test transactions, internal staff test accounts, or demo tenants. | Automatically incorporates default filtering clauses into `aiInstructions`. |
| **Confusable Terms** | `confusableTerms` | Column `created_at` is confused with `paid_at`; `gross_revenue` is confused with `net_settled_revenue`. | Generates **Anti-Synonym** documentation ("this column is NOT...") for reviewers and LLM prompt context. |
| **Excluded / Legacy Tables** | `unusedTables` | AI scans raw audit logs, temporary staging tables, or backup tables (`_backup`, `_temp`), degrading performance and skewing metrics. | Blacklists selected tables into `excludedTables` restriction lists. |

---

## 3. Deterministic Mapping to Proposals (`interviewAnswersToProposal`)

Upon completing the 3 rounds, Semantix **does not commit changes directly into production**. Instead, it passes survey responses through a deterministic transformation pipeline:

```
[Interview Responses] ───> [Deterministic Proposal Engine] ───> [Draft Change Request]
                                (Zero LLM calls, ID-validated)      (Awaiting Data Steward Review)
```

### Proposal Object Structure

1. **`aiInstructions` (Core Agent Directives)**:
   - Synthesizes the target audience, default timeframe, and priority metrics into concise, enforceable instructions for the LLM.
2. **`defaultTimeColumnId` & `defaultTimeGrain`**:
   - Enforces default temporal dimensions and granularities across the entire Context.
3. **`columns` (Per-Column Gotchas)**:
   - Flags all selected `nonAdditiveColumns` with explicit non-additive warnings prohibiting `SUM()`.
4. **`metrics` (Trend Direction Configuration)**:
   - Applies `trendDirection: 'up_good'` to confirmed positive-growth metrics.
5. **`metricCandidates` (Suggested Metric Definitions)**:
   - Proposes concrete Metric definitions with default aggregation formulas for candidate numeric columns flagged in Round 2.
6. **`note` (Reviewer Audit Log)**:
   - Summarizes confusable terms, unclarified metrics, and internal exclusions for the data steward prior to activation.

---

## 4. Governance & Review Gate Pipeline

To maintain enterprise data reliability, Semantix enforces strict governance:

> [!TIP]
> **Change Request Review Pipeline**: All interview outputs are saved as a **Draft Change Request**. Only authorized administrators (**Context Owners** or **Data Stewards**) possess permission to review, refine, and click **Approve** to publish the changes to the live analytical semantic layer.

This workflow guarantees:
* Domain knowledge from business stakeholders is captured effortlessly.
* Semantic models remain governed and reviewed by data engineering, avoiding schema drift or conflicting definitions.

---

## 5. How to Initiate the Interview

You can trigger a business onboarding interview through two paths:

1. **In Semantix Studio**:
   - Navigate to **Data Analytics > Contexts**.
   - Select the target Context and click **Context Interview**.
2. **In AI Chat**:
   - Type `/context-interview` to launch the interactive questionnaire directly inside the conversation pane as native UI cards.
