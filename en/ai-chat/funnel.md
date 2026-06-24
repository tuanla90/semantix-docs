# Funnel Analysis

Funnel Analysis tracks how users progress through a sequential series of steps — and identifies exactly which step has the highest drop-off rate.

---

## When to Use Funnel Analysis

**Typical questions:**
- "Of 10,000 product views, only 120 converted to purchases — where are we losing them?"
- "What is our account registration completion rate?"
- "Which checkout step causes the most cart abandonment?"
- "Has the new marketing campaign improved conversion rates?"

---

## Use Cases by Industry

| Industry | Funnel Steps |
|----------|-------------|
| **E-commerce** | View product → Add to cart → Begin checkout → Enter address → Payment → Confirmation |
| **SaaS** | Sign up for trial → Verify email → Create project → Invite team member → Upgrade to paid |
| **Fintech** | Download app → Register → KYC verification → Fund account → First transaction |
| **Marketing** | Click ad → Landing page → Fill form → Confirm email → Consultation call |
| **Healthcare** | Find doctor → View profile → Book appointment → Confirm → Complete visit |

---

## Configuring Funnel Analysis

### Data Requirements

An events table with:
- User identifier column (`user_id`, `session_id`)
- Event name column (`event_name`, `action`)
- Event timestamp (`event_time`, `created_at`)
- (Optional) Value column (`revenue`, `value`)

### Setting Up in a Context

1. Studio → DABI → Data Models → Select model → Context tab
2. Select Context → Tab **Advanced Analysis** → **Add → Funnel**
3. Configure:

| Field | Description | Example |
|-------|-------------|---------|
| **Entity Column** | User/session identifier | `user_id`, `session_id` |
| **Time Dimension** | Event timestamp column | `event_time` |
| **Event Column** | Event name column | `event_name` |
| **Steps** | Ordered list of steps | See below |
| **Conversion Window** | Maximum time between first and last step | `7 days`, `24 hours` |

### Defining Steps

| Step | Event Name (or condition) | Order |
|------|--------------------------|-------|
| View product | `product_view` | 1 |
| Add to cart | `add_to_cart` | 2 |
| Begin checkout | `checkout_start` | 3 |
| Complete payment | `purchase_complete` | 4 |

---

## Reading the Funnel Chart

Results are displayed as a vertical funnel chart:

```
Step 1: View Product          10,000 users  ████████████████████ 100%
                                    ↓ 32% conversion / 68% drop-off
Step 2: Add to Cart            3,200 users  ██████████           32%
                                    ↓ 56% conversion / 44% drop-off
Step 3: Begin Checkout         1,800 users  ██████               18%
                                    ↓ 67% conversion / 33% drop-off
Step 4: Complete Payment       1,200 users  ████                 12%

Overall conversion rate: 12%
```

**Metrics for each step:**
- **Total Users**: Number of users who reached this step
- **Conversion Rate**: % who converted from the previous step to this step
- **Drop-off Rate**: % who abandoned at this step (= 100% - Conversion Rate)
- **Drop-off Count**: Exact number of users who dropped off

---

## Interpreting Results

### Identify the Biggest Drop-Off

In the example above, the **"View → Cart"** step has a 68% drop-off — the highest. This is where to optimize first:
- Is the product price reasonable?
- Are the images and descriptions compelling?
- Is the "Add to Cart" CTA prominent?

### Segment Comparison

Run the funnel separately for different groups to compare:

| Segment | Step 1→2 | Step 2→3 | Step 3→4 | Overall |
|---------|---------|---------|---------|---------|
| Mobile | 28% | 52% | 60% | 8.7% |
| Desktop | 38% | 61% | 74% | 17.1% |
| **Insight** | Mobile is worse | | | Mobile checkout needs optimization |

### Trends Over Time

Compare conversion rates week-over-week or month-over-month to see the impact of changes:

| Month | Overall (Step 1→4) | Notes |
|-------|--------------------|-------|
| March | 10.2% | Baseline |
| April | 11.5% | A/B test new CTA button |
| May | 13.8% | Launch of redesigned checkout |

---

## Conversion Window

The **Conversion Window** defines the maximum time a user has to complete the entire funnel:

| Window | Best For |
|--------|---------|
| 1 hour | Impulse purchases (food, transport tickets) |
| 1 day | Standard e-commerce |
| 7 days | Considered purchases (electronics, fashion) |
| 30 days | B2B SaaS, high-value products |

Too short a window → undercounts completions, artificially low conversion rate.
Too long a window → includes users who returned randomly, artificially high conversion rate.

---

## Best Practices

- **Start with 4-6 steps** — too many steps makes analysis hard, too few provides insufficient insight
- **Segment by device** (mobile vs desktop) — conversion rates are often very different
- **Compare regularly** against a baseline before each UX/UI change
- **Combine with Cohort**: Do newer cohorts have different conversion rates than older ones?
- After identifying the drop-off point → use session recording tools (Hotjar, FullStory) to see what users do at that step
