# RFM Analysis

RFM stands for **Recency, Frequency, Monetary** — a customer segmentation model that scores customers based on their purchasing behavior.

## RFM Dimensions

| Dimension | Question | Example |
|-----------|----------|---------|
| **Recency** | How recently did the customer buy? | Last purchase 5 days ago |
| **Frequency** | How often do they buy? | 12 orders in the last year |
| **Monetary** | How much do they spend? | $3,400 total spend |

## Use Cases

- Identify your best customers (high R, F, and M scores)
- Find customers at risk of churning (low Recency)
- Target win-back campaigns for lapsed customers
- Personalize promotions by segment

## Setting Up RFM Analysis

1. Open a context → **Advanced Analysis tab**
2. Click **Add → RFM**
3. Configure:

| Field | Description |
|-------|-------------|
| **Entity Column** | Customer identifier (e.g. `customer_id`) |
| **Time Dimension** | Order/event date (e.g. `order_date`) |
| **Value Metric** | Revenue or order value (e.g. `SUM(total)`) |

4. Click **Save**

## RFM Segments

Semantix automatically assigns each customer to a segment based on their combined RFM score:

| Segment | Description |
|---------|-------------|
| 🥇 Champions | Bought recently, buy often, spend the most |
| 💛 Loyal Customers | Buy regularly with good spend |
| 🌱 Potential Loyalists | Recent buyers with average frequency |
| 🆕 New Customers | Bought very recently for the first time |
| ⚠️ At Risk | Good historical customers who haven't bought recently |
| 💤 Hibernating | Low R, F, and M — nearly lost |
| ❌ Lost | Haven't purchased in a very long time |
