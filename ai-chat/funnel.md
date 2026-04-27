# Funnel Analysis

Funnel Analysis tracks how users progress through a series of steps — and where they drop off.

## Use Cases

- E-commerce: *View product → Add to cart → Checkout → Purchase*
- SaaS onboarding: *Sign up → Activate → First action → Upgrade*
- Marketing: *Ad click → Landing page → Form submit → Qualified lead*

## Setting Up a Funnel

1. Open a context → **Advanced Analysis tab**
2. Click **Add → Funnel**
3. Configure:

| Field | Description |
|-------|-------------|
| **Entity Column** | User/session identifier |
| **Time Dimension** | Event timestamp |
| **Steps** | Ordered list of events/actions |
| **Conversion Window** | Max time between steps (e.g. 7 days) |

## Reading the Funnel Chart

The output shows each step with:
- **Total users** who reached this step
- **Conversion rate** from the previous step
- **Drop-off rate** at this step

```
Step 1: View Product     → 10,000 users  (100%)
Step 2: Add to Cart      →  3,200 users  (32%)
Step 3: Begin Checkout   →  1,800 users  (56%)
Step 4: Complete Payment →  1,200 users  (67%)

Overall conversion: 12%
```

## Tips

- Keep funnels to 3–7 steps for clarity
- Use a realistic conversion window (too short = undercount, too long = noise)
- Segment funnels by user attributes (e.g. traffic source, device) for deeper insights
