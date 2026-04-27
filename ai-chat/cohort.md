# Cohort Analysis

Cohort Analysis groups users by a shared characteristic (typically their first activity date) and tracks their behavior over time.

## Use Cases

- Retention tracking: *"What % of January sign-ups are still active after 3 months?"*
- Revenue cohorts: *"How much does each acquisition cohort generate over 12 months?"*
- Churn analysis: *"Which cohorts have the highest drop-off in month 2?"*

## Setting Up a Cohort Analysis

1. Open a context → **Advanced Analysis tab**
2. Click **Add → Cohort**
3. Configure:

| Field | Description |
|-------|-------------|
| **Entity Column** | The user/customer identifier (e.g. `user_id`) |
| **Time Dimension** | The event date column (e.g. `created_at`) |
| **Value Metric** | Optional — measure to aggregate (e.g. `revenue`) |
| **Cohort Period** | Week or Month |

4. Click **Save**

## Reading the Cohort Table

The output is a matrix where:
- **Rows** = cohort groups (e.g. Jan 2024, Feb 2024)
- **Columns** = periods after first activity (Period 0, Period 1, Period 2...)
- **Values** = retention rate (%) or aggregated metric

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 |
|--------|----------|----------|----------|----------|
| Jan 2024 | 100% | 45% | 32% | 28% |
| Feb 2024 | 100% | 52% | 38% | 31% |
| Mar 2024 | 100% | 48% | 35% | — |

> 💡 Period 0 always shows 100% as it represents the cohort's first period.
