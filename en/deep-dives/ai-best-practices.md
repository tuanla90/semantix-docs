# AI Optimization & Best Practices

Semantix relies on large language models (LLMs) to translate natural language into SQL. While the AI is highly advanced, it cannot read your mind. The accuracy of the AI depends entirely on how well you define your data models and metrics.

Follow these best practices to ensure Semantix generates 100% accurate SQL for your business questions.

## 1. Write Detailed Descriptions

The **Description** field is the most important signal for the AI. Don't just restate the column name. Explain *what* the data represents and *how* it should be used.

**Bad Description:**
> "Revenue"

**Good Description:**
> "The total gross revenue from successful orders, measured in USD. Do not include refunded or cancelled orders. This is the primary metric for top-line sales."

## 2. Use Synonyms Extensively

Users will ask the same question in many different ways. Define **Synonyms** for your metrics to catch these variations.

**Metric:** `Total Revenue`
**Good Synonyms:**
- `"sales"`
- `"top line"`
- `"money made"`
- `"gross income"`

## 3. Name Columns Clearly

Database columns often have technical or abbreviated names (e.g., `cust_id_fk`, `trx_amt`). Use the **Label** field to give them human-readable names.

| Database Column | Bad Label | Good Label |
|-----------------|-----------|------------|
| `trx_amt` | Trx Amt | Transaction Amount |
| `is_actv` | Is Actv | Is Active User |
| `usr_loc` | Usr Loc | User Location |

## 4. Leverage Context Rules (Forbidden Combinations)

If certain metrics should never be grouped by certain dimensions (e.g., because it causes data duplication or breaks business logic), explicitly tell the AI in the Context settings.

**Example Context Rule:**
> "Never GROUP BY `Store ID` when calculating `Online Sales Revenue`."

## 5. Explicitly Handle Dates

Different tables might have multiple date columns (e.g., `created_at`, `shipped_at`, `paid_at`). When a user asks "Sales last week", the AI needs to know *which* date to use.

Always set a **Default Time Column** in your Context settings.

## Summary Checklist for 100% Accuracy
- [ ] Every Metric has a detailed, unambiguous description
- [ ] Every Metric has at least 3-5 synonyms
- [ ] Cryptic database columns are given human-readable Labels
- [ ] A Default Time Column is set for the Context
- [ ] Complex business logic is abstracted into Calculated Fields
