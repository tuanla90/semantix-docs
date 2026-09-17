# Virtual Columns & Data Transformation

> **Navigation:** Studio → DABI → Data Models → Select Model → Columns tab → **New Virtual Column** (or **+ Add Column**)

Virtual Columns allow data engineers and analytics specialists to define additional fields, segmentation dimensions, and categorical labels directly on a Data Model **without altering the underlying physical table schema in the database**.

---

## 1. Why Virtual Columns?

In real-world data warehousing and analytical workflows:
- Physical tables frequently store raw status codes as single characters or integers: `A`, `D`, `P`, `1`, `2`. Business users and AI assistants require descriptive labels: `Active`, `Cancelled`, `Pending`.
- Customer segmentation rules require continuous metrics to be grouped into tiers (e.g., `VIP`, `Standard`, `Mass`) for slicing, filtering, and chart legends.
- Data from heterogeneous sources often demands normalization prior to dashboard ingestion.

Instead of submitting data engineering tickets to rebuild ETL pipelines and instantiate redundant physical tables or views, Virtual Columns materialize new analytical dimensions on demand through an intuitive visual UI or compiled SQL expressions.

---

## 2. Four Creation Modes

When creating a new Virtual Column, Semantix offers four distinct configuration modes:

| Mode | Objective | Mechanism |
|---|---|---|
| **Case When (Conditional Flagging)** | Categorize records based on one or more business rules | Visually configure structured `WHEN ... THEN ... ELSE ...` branching rules |
| **Rule Grouping (Group by Rule)** | Consolidate high-cardinality discrete values into macro categories | Map municipal or provincial codes into macro regions: North, Central, South |
| **Numerical Bins (Bins)** | Segment continuous numeric fields into fixed interval ranges | Age bracket bucketing: 18–25, 26–35, 36–50, 50+ |
| **Custom SQL (SQL by Hand)** | Express arbitrary database-native expressions | Apply warehouse-native string parsing, date arithmetic, or mathematical functions |

---

## 3. Visual Case When Configuration Guide

The **Case When** mode empowers analysts to author complex conditional logic without hand-coding SQL syntax.

### 3.1. Structure of a WHEN - THEN Branch

Each conditional branch is presented as an interactive visual Card containing:

1. **Drag Handle (`::`):** Reorder branch priority with drag-and-drop. Rules evaluate top-to-bottom according to standard SQL precedence.
2. **`WHEN` Predicate Clause:**
   - **Source Column:** Select the target field in the current model (supports fuzzy search).
   - **Negation Operator:** Toggle between `IS` (condition must match) and `IS NOT` (condition must not match).
   - **Comparison Operator:** Context-aware operators tailored to the column data type (`equals`, `contains`, `greater than or equal to`, `is in list`, `is between`, etc.).
   - **Comparison Value:** Enter a literal value or select from suggested distinct values.
3. **`THEN` Evaluation Clause:**
   - **Color Swatch:** Assign a persistent palette color to represent this segment across visualization widgets (Bar, Pie, Funnel charts).
   - **Display Label:** The human-readable string emitted into query results (e.g., `VIP Customer`).

### 3.2. Default `ELSE` Branch & Custom Palette Color

A distinguishing architectural feature of Semantix is the ability to assign a dedicated, brand-aligned **color swatch to the ELSE branch**:

- **Default Value:** Define the fallback string for records that do not satisfy any preceding `WHEN` condition (e.g., `Other`, `Unclassified`). Leaving this blank evaluates to SQL `NULL`.
- **ELSE Color Picker (`defaultColor`):**
  > [!TIP]
  > **Optimized Visual Consistency:** In standard BI platforms, unclassified categories are assigned arbitrary auto-generated colors or faint grays that break palette harmony. Semantix allows explicit color assignment for the `ELSE` branch (e.g., muted slate `#94a3b8` or corporate neutral), ensuring clean visual hierarchy across all dashboards.

```
┌────────────────────────────────────────────────────────────────────────┐
│ [::] 1  WHEN [ Revenue ] [ IS ] [ >= ] [ 10,000,000 ]                  │
│         THEN [ 🟢 Color ] [ VIP Customer ]                     [X Del] │
├────────────────────────────────────────────────────────────────────────┤
│ [::] 2  WHEN [ Revenue ] [ IS ] [ >= ] [ 2,000,000 ]                   │
│         THEN [ 🟡 Color ] [ Standard Customer ]                [X Del] │
├────────────────────────────────────────────────────────────────────────┤
│   [+ Add Condition]                                                    │
├────────────────────────────────────────────────────────────────────────┤
│   ELSE  [ Casual Customer ]  [ ⚪ Custom ELSE Color ]                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Compilation & Zero-ETL Transformation

### 4.1. Zero Redundant Physical Tables

Legacy BI platforms often materialize calculated fields into temporary tables, physical staging views, or duplicate warehouse tables, causing storage bloat and schema drift.

Semantix eliminates this overhead via **Compile-on-the-Fly SQL Execution**:
- Visual Case When rules are stored purely as lightweight metadata contracts (`FlagRule[]`).
- During query synthesis, the semantic compiler transmutes the metadata into dialect-accurate SQL expressions:

```sql
CASE 
    WHEN orders.total_amount >= 10000000 THEN 'VIP Customer'
    WHEN orders.total_amount >= 2000000 THEN 'Standard Customer'
    ELSE 'Casual Customer'
END AS customer_tier
```

### 4.2. Integration with 3-Layer Compiler Architecture

Virtual Columns integrate seamlessly into the Semantix 3-Layer query lifecycle:

1. **Inherits Row-Level Security (RLS):** Because Virtual Columns are projected in Layer 2 (Transform CTE) or Layer 1 (Base CTE), all input fields have already been constrained by fail-closed RLS predicates.
2. **Fan-Out Prevention:** Row-level virtual column expressions compute scalar values per record without join fan-out, preserving true record counts.
3. **Automatic AI Semantic Recognition:** The AI Assistant indexes Virtual Columns alongside physical columns, allowing natural language prompts like *"Breakdown monthly revenue by VIP Customer tier"*.

---

## 5. Best Practices & Production Guidelines

1. **Standardized Technical Naming:**
   - Technical Identifier (`name`): Use strict `snake_case` (e.g., `order_status_label`, `customer_tier`).
   - Display Label (`displayName`): Provide clear, descriptive terminology (e.g., `Customer Segmentation Tier`).
2. **Condition Specificity Ordering:**
   - Always order narrow, high-threshold conditions first. For instance, `>= 10,000,000` must precede `>= 2,000,000`; otherwise, higher-value rows match the broader lower tier prematurely.
3. **Semantic Palette Harmonization:**
   - Reserve bright primary colors (green, amber, red) for actionable positive, warning, or negative business states.
   - Use neutral, desaturated tones for the `ELSE` fallback category to keep dashboards readable.
4. **Context & Synonym Enrichment:**
   - Once a Virtual Column is created, attach domain-specific synonyms and anti-synonyms in the **Semantic Contexts** manager so the AI Assistant resolves colloquial references accurately.
