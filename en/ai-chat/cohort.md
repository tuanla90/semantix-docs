# Cohort Analysis

Cohort Analysis groups users/customers who share a common characteristic at a point in time (typically their sign-up date or first purchase), then tracks their behavior across subsequent periods.

---

## When to Use Cohort Analysis

**Typical questions:**
- "Of customers who signed up in January, what % are still buying after 3 months?"
- "Which cohort has the best retention rate?"
- "What is the cumulative revenue of each cohort after 12 months?"
- "Which month in the customer lifecycle has the highest churn spike?"

---

## Configuring Cohort Analysis

### Data Requirements

Your data table needs at least:
- A customer identifier column (`customer_id`, `user_id`)
- An event date column (`order_date`, `created_at`, `event_time`)
- (Optional) A value column to measure (`revenue`, `amount`)

### Setting Up in a Context

1. Studio → DABI → Data Models → Select model → Context tab
2. Select Context → Tab **Advanced Analysis** → **Add → Cohort**
3. Configure:

| Field | Description | Example |
|-------|-------------|---------|
| **Entity Column** | User identifier column | `customer_id`, `user_id` |
| **First Event Time** | Column for the first date (cohort start) | `first_order_date`, `registered_at` |
| **Activity Time** | Column for the recurring event date | `order_date`, `login_date` |
| **Value Column** | Value column to measure (optional) | `revenue`, `amount` |
| **Cohort Period** | Time unit for each period | Week / Month |

4. Click **Save**

---

## Reading the Cohort Table

The result is a **retention matrix**:

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 | Period 6 | Period 12 |
|--------|----------|----------|----------|----------|----------|-----------|
| Jan 2026 | 1,200 (100%) | 540 (45%) | 384 (32%) | 336 (28%) | 264 (22%) | 192 (16%) |
| Feb 2026 | 980 (100%) | 510 (52%) | 373 (38%) | 304 (31%) | — | — |
| Mar 2026 | 1,100 (100%) | 528 (48%) | 385 (35%) | — | — | — |

**Explanation:**
- **Rows**: Each row = one cohort (users who signed up in the same month)
- **Columns**: Period 0 = first period (sign-up month), Period 1 = next month...
- **Values**: Number of still-active users (and percentage)
- **Period 0 = 100%**: Always 100% as this is the cohort's starting point
- **Empty cells**: The cohort doesn't have enough time for that period yet

---

## Interpreting Results

### 1. Benchmark Retention Rates

**Good or bad?** Depends on the industry:

| Industry | Good Month 1 Retention |
|----------|------------------------|
| E-commerce | > 25% |
| B2B SaaS | > 70% |
| Mobile App | > 40% |
| Fintech | > 35% |

### 2. Comparing Cohorts

If the February cohort (52%) is higher than January (45%) at Period 1 → the February campaign was more effective, or a positive product change was made.

### 3. Finding Critical Drop-Off Points

If retention drops sharply from Period 2 → Period 3 (from 38% down to 15%) → investigate what happens after 2 months: missing product features to drive retention? Lack of email marketing?

---

## Revenue Cohort (Cumulative Revenue)

Beyond retention %, you can view **cumulative revenue per cohort**:

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 | LTV (12M) |
|--------|----------|----------|----------|----------|-----------|
| Jan 2026 | $12,000 | $5,400 | $3,800 | $3,300 | $18,500 |
| Feb 2026 | $9,800 | $5,100 | $3,700 | $3,000 | — |

**LTV (Lifetime Value)**: Total revenue a cohort generates over 12 months — a key metric for evaluating the effectiveness of marketing campaigns.

---

## Best Practices

- **Cohort Period = Month** for most use cases (enough data, clear trends)
- **Cohort Period = Week** for high-engagement apps (daily/weekly active users)
- View both count and percentage tables simultaneously to understand context
- Combine Cohort + RFM: Cohort shows retention trends, RFM classifies individual customers
