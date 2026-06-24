# RFM Analysis

RFM is a customer segmentation method based on three dimensions of purchasing behavior: **Recency**, **Frequency**, and **Monetary**.

---

## The Three RFM Dimensions

| Dimension | Question | Measured By |
|-----------|----------|-------------|
| **Recency (R)** | Has the customer bought recently? | Number of days since last purchase |
| **Frequency (F)** | Does the customer buy often? | Number of orders in the analysis period |
| **Monetary (M)** | Does the customer spend a lot? | Total purchase value |

**Meaning of high/low scores:**

| | High Score (5/5) | Low Score (1/5) |
|-|-----------------|----------------|
| R | Bought very recently | Hasn't bought in a long time |
| F | Buys very frequently | Only bought 1-2 times |
| M | Spends a great deal | Spends very little |

---

## Configuring RFM Analysis

### Data Requirements

A transactions table with:
- Customer ID column (`customer_id`)
- Order date column (`order_date`)
- Order value column (`total_amount`, `revenue`)

### Setting Up in a Context

1. Studio → DABI → Data Models → Select model → Context tab
2. Select Context → Tab **Advanced Analysis** → **Add → RFM**
3. Configure:

| Field | Description | Example |
|-------|-------------|---------|
| **Entity Column** | Customer ID column | `customer_id` |
| **Time Dimension** | Order date column | `order_date` |
| **Value Column** | Order value column | `total_amount` |
| **Analysis Window** | Analysis period (days) | `365` (last 1 year) |
| **Score Bins** | Number of quantiles per dimension | `5` (scores 1-5) |

4. Click **Save**

---

## Customer Segments

Semantix automatically classifies customers based on their combined RFM score:

| Segment | Description | R | F | M | Strategy |
|---------|-------------|---|---|---|---------|
| 🥇 **Champions** | Bought recently, frequently, spend the most | 5 | 5 | 5 | Reward, upsell, brand ambassador |
| 💛 **Loyal Customers** | Buy frequently with good spend | 4-5 | 4-5 | 3-5 | Loyalty program, new products |
| 🌱 **Potential Loyalists** | Bought recently, a few times, decent spend | 4-5 | 2-3 | 2-3 | Onboarding, cross-sell, promotions |
| 🆕 **New Customers** | Bought very recently, first time | 5 | 1 | 1-2 | Welcome series, education |
| 🤑 **Big Spenders** | High spend but infrequent purchases | 2-4 | 1-2 | 4-5 | Special offers, VIP treatment |
| ⚠️ **At Risk** | Formerly good customers, haven't bought recently | 2-3 | 3-4 | 3-4 | Win-back campaign, survey |
| 😴 **Hibernating** | Occasional buyers, been a while | 1-2 | 2-3 | 2-3 | Reactivation offer |
| ❌ **Lost** | Haven't purchased in a very long time | 1 | 1-2 | 1-2 | Last-chance offer or stop marketing |

---

## Reading RFM Results

### Segment Summary Table

| Segment | Customers | % of Total | Total Revenue | % Revenue |
|---------|-----------|------------|---------------|-----------|
| Champions | 1,245 | 8.3% | $2,890,000 | 34% |
| Loyal Customers | 2,100 | 14% | $1,980,000 | 23% |
| At Risk | 3,450 | 23% | $890,000 | 10% |
| Lost | 4,200 | 28% | $120,000 | 1.4% |
| Total | 15,000 | 100% | $8,500,000 | 100% |

**Insights from this table:**
- 22.3% of customers (Champions + Loyal) generate 57% of revenue → focus on retaining this group
- 28% are already lost → not worth heavy marketing investment

### RFM Heatmap Matrix

Semantix displays an R vs F heatmap with color representing M — making it easy to see customer distribution patterns.

---

## Practical Applications

### Export Lists for Campaigns

1. In RFM results → select a segment (e.g. "At Risk")
2. Click **Export CSV** → download the list of `customer_id`, email, RFM scores
3. Import into your email marketing tool (Mailchimp, HubSpot, Klaviyo)

### Marketing Content by Segment

| Segment | Suggested Message |
|---------|------------------|
| Champions | "Thank you for being a VIP customer! Receive your exclusive offer" |
| At Risk | "We miss you! 20% voucher for your next order" |
| Lost | "We've improved! Come back and receive a gift" |
| New Customers | "Discover more products you'll love" |

---

## How Often to Run RFM

- **Monthly**: Update segments, track migration between groups
- **After campaigns**: Assess how many "At Risk" moved back to "Loyal" after a win-back campaign
- **Year-end**: Analyze segment trends for the full year

> Customers move between segments over time — run RFM regularly to keep your data current.
