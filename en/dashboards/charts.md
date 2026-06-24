# Charts & Widget Configuration — Detailed Guide

Each widget type serves a different analytical purpose. This page covers everything: when to use each, when NOT to use each, all configuration options, and practical examples.

---

## Opening the Widget Editor

**Add a new widget:**
Dashboard → click **Edit** → click **+ Add Widget** → select a widget type.

**Edit an existing widget:**
Hover over the widget → click **⚙️** in the title corner → or click **⋮ → Edit Widget**.

The Widget Editor has 3 tabs:
- **Query**: Write a natural language question or raw SQL
- **Visualization**: All chart display options
- **Settings**: Widget name, cache TTL, refresh

---

## 1. Scorecard

### Description

Displays **a single KPI** with a period-over-period comparison — a "big number + up/down arrow" format. Always place in the first row of a Dashboard so viewers immediately grasp the most important metrics.

### When to Use ✅

- A single critical metric (revenue, orders, customers)
- Comparing to a previous period (this month vs last month, today vs yesterday)
- Executive KPI dashboards where status must be seen at a glance
- High-level summary before diving into details below

### When NOT to Use ❌

- Comparing multiple categories → use a Bar Chart
- Showing a trend over time → use a Line Chart
- The metric has no clear comparison period → Scorecard won't add much value

### All Configuration Options

| Option | Required | Description | Example Values |
|--------|---------|-------------|---------------|
| **Value** | ✅ | Column/metric shown as the main (large, prominent) number | `total_revenue`, `order_count` |
| **Comparison Value** | ❌ | Prior period value to calculate % change | `prev_month_revenue` |
| **Comparison Label** | ❌ | Label describing the comparison period | `vs. last month`, `vs. yesterday` |
| **Number Format** | ✅ | How to format the number | `auto`, `number`, `currency`, `percent`, `compact` |
| **Compact Format** | ❌ | Abbreviate large numbers: 1,234,567 → 1.2M | On/Off |
| **Decimal Places** | ❌ | Number of decimal places | `0`, `1`, `2` |
| **Prefix** | ❌ | Character added before the number | `$`, `~` |
| **Suffix** | ❌ | Character added after the number | `orders`, `users`, `%` |
| **Icon** | ❌ | Emoji icon beside the title | `💰`, `📦`, `👥`, `⚠️` |
| **Color When Positive** | ❌ | Color when number increases vs prior period | `green` (default) |
| **Color When Negative** | ❌ | Color when number decreases vs prior period | `red` (default) |
| **Reverse Color Logic** | ❌ | Flip color logic — a decrease is good | Enable for "Cancellation Rate", "Complaints" |
| **Show Change Arrow** | ❌ | Show ▲▼ arrow indicating direction of change | On (default) |
| **Show Change Percent** | ❌ | Show % change | On (default) |
| **Show Change Value** | ❌ | Show absolute difference value | Off (default) |
| **Background Color** | ❌ | Scorecard background color | White / custom color |
| **Font Size** | ❌ | Size of the main number | `large`, `medium`, `small` |

### SQL Examples

**Simple scorecard (no comparison):**
```sql
SELECT SUM(revenue) AS revenue
FROM orders
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
```

**Scorecard with month-over-month comparison:**
```sql
SELECT
  SUM(CASE
    WHEN MONTH(order_date) = MONTH(CURRENT_DATE)
     AND YEAR(order_date) = YEAR(CURRENT_DATE)
    THEN revenue ELSE 0
  END) AS this_month,
  SUM(CASE
    WHEN MONTH(order_date) = MONTH(CURRENT_DATE) - 1
     AND YEAR(order_date) = YEAR(CURRENT_DATE)
    THEN revenue ELSE 0
  END) AS last_month
FROM orders
WHERE status IN ('paid', 'delivered')
```
→ Value = `this_month`, Comparison Value = `last_month`

### Common Layout

4 Scorecards across the top row — full width:
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 💰 Revenue   │  📦 Orders  │  👥 New Users│ ❌ Cancel %  │
│  $1.23M      │  2,847       │  389         │   2.3%       │
│   ▲ 15%      │   ▲ 8%      │   ▲ 31%     │   ▼ 0.5%     │
│ vs. last month│vs. last month│vs. last month│vs. last month│
└──────────────┴──────────────┴──────────────┴──────────────┘
```

> **Tip:** Use **Reverse Color** for metrics where a decrease is good: cancellation rate, complaints, error rate, operating costs. When they decrease → green ▼ (instead of red).

---

## 2. Bar Chart

### Description

Compares values across discrete categories. Answers **"Which one is highest / lowest?"** and **"How much difference is there?"**

### When to Use ✅

- Comparing revenue / orders across branches, channels, products
- Ranking Top N (Top 10 products, Top 5 employees)
- Comparing months or quarters (each bar = one period)
- Data with 2 to 20 categories

### When NOT to Use ❌

- Tracking continuous time-series trends (use Line Chart — more visual)
- Too many categories (> 20) → too cramped, hard to read
- Showing percentage share of a total → Pie/Donut is better

### Five Bar Chart Variants

| Variant | Best For |
|---------|---------|
| **Vertical Bar** | Default — short category names, comparing time periods |
| **Horizontal Bar** | Long category names (product names, employee names); many categories (15–20) |
| **Stacked Bar** | See the total + proportion of each component in the same bar |
| **100% Stacked Bar** | Only care about percentages, not absolute values |
| **Grouped Bar** | Compare 2–4 metrics simultaneously within the same category |

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **X Axis (Dimension)** | Category column — horizontal axis (vertical bars) or vertical axis (horizontal bars) | `region`, `month`, `product_name` |
| **Y Axis (Metric)** | Value column to measure | `total_revenue`, `order_count` |
| **Color By** | Column that creates differently-colored series (grouped/stacked) | `channel` → each channel a different color |
| **Bar Orientation** | `Vertical` or `Horizontal` | |
| **Bar Type** | `Standard` / `Stacked` / `100% Stacked` / `Grouped` | |
| **Sort** | Sort bars: `None` / `X Asc` / `X Desc` / `Y Asc` / `Y Desc` | `Y Desc` → highest first |
| **Limit** | Max number of categories to display | `10` → Top 10 only |
| **Show Others** | Group cut-off categories into "Other" | Enable to keep the total accurate |
| **Bar Corner Radius** | Round the bar corners (px) | `0` = square, `4` = slightly rounded |
| **Bar Gap** | Space between bars (%) | `20` (default) |
| **Show Data Labels** | Show numbers on top or inside bars | Enable when exact numbers need to be read |
| **Data Label Position** | `top` / `center` / `inside-end` | |
| **Data Label Format** | Number format in labels: compact, currency… | `1.2M`, `$1,200,000` |
| **X Axis Label** | Custom X axis name | `Branch` |
| **Y Axis Label** | Custom Y axis name | `Revenue (USD)` |
| **Y Axis Min** | Min value on Y axis | `0` — always start from 0 for bar charts |
| **Y Axis Max** | Max value on Y axis | Leave blank = auto |
| **Y Axis Format** | Y axis number format: `compact`, `currency`, `percent` | `1.2M` instead of `1,200,000` |
| **Second Y Axis** | Add a right-side Y axis for a second series (different unit) | Revenue (left) + Growth % (right) |
| **Color Palette** | Color scheme for series | Select from presets or customize |
| **Show Legend** | Show color legend | Enable when multiple series |
| **Legend Position** | `Top` / `Bottom` / `Right` / `Left` | `Bottom` (default) |
| **Reference Lines** | Add a horizontal target line | See Reference Lines section |
| **Show Grid Lines** | Background grid lines | On (default) |
| **Tooltip** | Content shown on hover | Auto or custom |

### SQL Examples

**Top 10 branches by revenue:**
```sql
SELECT
  branch_name,
  SUM(revenue) AS total_revenue,
  COUNT(DISTINCT order_id) AS order_count
FROM orders
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY branch_name
ORDER BY total_revenue DESC
LIMIT 10
```

**Revenue by channel, compared by month (Grouped Bar):**
```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  channel,
  SUM(revenue) AS revenue
FROM orders
WHERE status = 'paid'
  AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
GROUP BY month, channel
ORDER BY month, channel
```
→ X Axis = `month`, Y Axis = `revenue`, Color By = `channel`, Bar Type = `Grouped`

> **Important tip:** The Y axis of a Bar Chart should **always start at 0**. Starting at a different value exaggerates differences and misleads viewers.

---

## 3. Line Chart

### Description

Shows **how metrics change over time** for one or more indicators. The human eye easily identifies upward/downward/flat trends from a continuous line.

### When to Use ✅

- Tracking a metric by day, week, month, quarter
- Comparing trends between 2–4 series with the same unit
- Detecting peaks, troughs, and anomalies in a time series
- Analyzing seasonal patterns

### When NOT to Use ❌

- Comparing unrelated categories by time (use Bar Chart)
- Too many series (> 5 lines) → cluttered, hard to distinguish
- Data has no time ordering (X is discrete categories → Bar Chart)
- Only 1–2 data points → not enough to draw a meaningful trend

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **X Axis** | Time column (horizontal axis) | `order_date`, `week`, `month` |
| **Y Axis** | Value metric (vertical axis) | `total_revenue`, `order_count` |
| **Color By** | Column creating multiple lines with different colors | `year` → 2 lines comparing 2 years |
| **Second Y Axis** | Secondary Y axis on the right for a different unit | Revenue (billions) + Growth Rate (%) |
| **Line Style** | `Solid` / `Dashed` / `Dotted` | Dashed for prior period, Solid for current |
| **Line Thickness** | Line width (px) | `1` = thin, `2` = normal, `4` = bold |
| **Point Shape** | Circle / Square / Triangle / Diamond | |
| **Point Size** | Data point size (px); `0` = hide points | `0` for many points, `4` for few |
| **Point Show On Hover** | Only show points on hover | Enable with many data points |
| **Smooth Line** | Spline curve (smooth) instead of sharp angles | On for trend, off for short-term volatility |
| **Step Line** | Staircase line (holds constant until next step) | For discrete data (headcount) |
| **Fill Below Line** | Fill area below the line (becomes Area Chart) | |
| **Fill Opacity** | Fill area transparency (0–1) | `0.15` = light, `0.5` = heavy |
| **Null/Missing Value** | Handle missing data: `Gap` / `Zero` / `Interpolate` | `Gap` = break; `Interpolate` = connect |
| **Y Axis Scale** | `Linear` or `Logarithmic` | Log for data with extreme range differences |
| **Y Axis Min** | Y axis start value | `0` or leave blank (auto) |
| **Y Axis Max** | Y axis end value | Leave blank (auto) |
| **Y Axis Format** | Y axis number format | `compact`, `currency`, `percent` |
| **X Axis Date Format** | Date format for X axis labels | `MM/DD` / `MMM YYYY` |
| **Show Data Labels** | Show values at each data point | Off (default — easily cluttered) |
| **Reference Lines** | Horizontal target / average lines | See Reference Lines section |
| **Zoom** | Enable zooming on the chart | Enable for long data series |
| **Tooltip** | Show values on hover | On (default) |
| **Show Legend** | Color legend for series | Enable with multiple lines |

### SQL Examples

**Daily revenue in the current month:**
```sql
SELECT
  DATE(order_date) AS day,
  SUM(revenue) AS revenue
FROM orders
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY DATE(order_date)
ORDER BY day
```

**Daily revenue comparison: this year vs last year (2 lines):**
```sql
SELECT
  DAY(order_date) AS day_of_month,
  YEAR(order_date) AS year,
  SUM(revenue) AS revenue
FROM orders
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) IN (YEAR(CURRENT_DATE), YEAR(CURRENT_DATE) - 1)
GROUP BY DAY(order_date), YEAR(order_date)
ORDER BY day_of_month, year
```
→ X Axis = `day_of_month`, Y Axis = `revenue`, Color By = `year`

**Revenue and growth rate (dual Y axis):**
```sql
WITH monthly AS (
  SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(revenue) AS revenue
  FROM orders
  WHERE status = 'paid'
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND((revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month) * 100, 1) AS growth_pct
FROM monthly
ORDER BY month
```
→ Y Axis = `revenue`, Second Y Axis = `growth_pct`

> **Tip:** Use **Null = Gap** when data is genuinely missing (no orders on a holiday). Use **Null = Zero** to show "no revenue". Use **Null = Interpolate** for a continuous line when missing data is random.

---

## 4. Area Chart

### Description

Like a Line Chart but with the area below the line filled with color — emphasizing **volume** and **area** rather than just the trend. Especially powerful as Stacked Area to show each component's contribution over time.

### When to Use ✅

- Cumulative revenue over time
- Comparing contributions from each channel/category over time (Stacked Area)
- Positive, continuous data where you want to emphasize "volume"
- 2–5 series where you want to see both the total and each part's proportion

### When NOT to Use ❌

- Series with negative values (the filled area gets cut, looks cluttered)
- More than 5 series (use Line Chart instead)
- Need to compare exact values between stacked series (hard to read individual heights)

### Three Area Chart Variants

| Variant | Characteristics | When to Use |
|---------|----------------|------------|
| **Standard Area** | Series can overlap | 1–2 series, want to see each independently |
| **Stacked Area** | Series stack — total height = total value | See the total + each component's contribution |
| **100% Stacked Area** | Normalized to 100% — only shows proportions | Only care about ratios, not absolute values |

### Additional Configuration Options

Same as Line Chart, plus:

| Option | Description | Example |
|--------|-------------|---------|
| **Area Type** | `Standard` / `Stacked` / `100% Stacked` | |
| **Fill Opacity** | Fill area transparency (0–1) | `0.2` = very light, `0.6` = heavy |
| **Gradient Fill** | Gradient color from dark (top) → light (bottom) | Enable for prettier Standard Area |
| **Show Line** | Display the outline on top of the fill | On (default) |

### SQL Example

**Revenue by sales channel — Stacked Area:**
```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m-%d') AS day,
  channel,
  SUM(revenue) AS revenue
FROM orders
WHERE status = 'paid'
  AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY day, channel
ORDER BY day, channel
```
→ Area Type = `Stacked`, X = `day`, Y = `revenue`, Color By = `channel`

---

## 5. Pie Chart & Donut Chart

### Description

Shows the **percentage share** of parts within a whole. A Donut is a Pie with a hole in the center — allowing a total label to be displayed.

### When to Use ✅

- Only 2–6 parts, each with distinct meaning
- Proportions between parts differ clearly (not all nearly equal)
- The question is "what percentage of the total does this part represent?"
- Donut: when you want to show the total in the center

### When NOT to Use ❌

- More than 7 parts → too many colors, hard to distinguish (use Horizontal Bar Chart)
- Parts have similar values → cannot distinguish visually
- Need to compare exact values between parts → Bar Chart is clearer
- Tracking trends over time

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **Dimension** | Category column (names the slices) | `channel`, `category`, `status` |
| **Metric** | Value column (determines slice size) | `total_revenue`, `order_count` |
| **Chart Type** | `Pie` or `Donut` | |
| **Donut Hole Size** | Size of the center hole — Donut only (0.3–0.8) | `0.6` |
| **Center Label** | Text displayed in the center hole (Donut) | `Total Revenue`, `5.2B` |
| **Center Value** | Number displayed in center (auto-sums total) | On = show SUM of all slices |
| **Show Percentages** | Show % on each slice | On (recommended) |
| **Show Values** | Show absolute values on each slice | Off (use tooltip instead) |
| **Show Labels** | Category names directly on the slices | On or in Legend only |
| **Min Slice Percent** | Merge slices under X% into "Other" | `2` → slices < 2% → "Other" |
| **Others Label** | Name for the "Other" slice | `Other`, `Rest` |
| **Sort** | Sort slices: `Desc` (largest first) | `Value Desc` (default) |
| **Start Angle** | Starting angle for the first slice | `0` = 12 o'clock, `90` = 3 o'clock |
| **Legend Position** | `Right` / `Bottom` / `Left` / `Hidden` | `Right` (default) |
| **Color Palette** | Color scheme | Select preset or customize per slice |
| **Inner Radius Label Size** | Font size of center Donut number | `Large` / `Medium` / `Small` |
| **Explode Slice** | Pull a slice away from the pie for emphasis | Select which slice to emphasize |

### SQL Example

**Revenue distribution by sales channel:**
```sql
SELECT
  channel,
  SUM(revenue) AS revenue,
  ROUND(SUM(revenue) / SUM(SUM(revenue)) OVER () * 100, 1) AS percentage
FROM orders
WHERE status IN ('paid', 'delivered')
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY channel
ORDER BY revenue DESC
```

> **Tip:** With `Min Slice Percent = 2`, small channels under 2% merge into "Other" — keeps the chart clean and focused on significant channels.

---

## 6. Table Widget

### Description

Displays data in a multi-row, multi-column table. Best when users need to **read detailed information**, search, or export to a file.

### When to Use ✅

- Lists with many attributes (customers, orders, products)
- Users need to search or filter within the data
- Need to show both numbers and text in the same view
- Drill-down details below summary charts
- Exporting data to CSV/Excel

### When NOT to Use ❌

- Seeing trends or visual comparisons → use a chart
- Tens of thousands of rows without filtering → too slow, not useful
- Executive summaries → charts are more visual than tables

### Column Configuration

| Option | Description | Example |
|--------|-------------|---------|
| **Column Selection** | Which columns to show and in what order | Drag to reorder |
| **Column Label** | Rename the column header | `total_revenue` → `Revenue` |
| **Column Width** | Column width | `auto` (default) or `120px` |
| **Column Alignment** | `Left` / `Center` / `Right` | Numbers → Right; Text → Left |
| **Number Format** | Format numeric values in the column | `currency`, `number`, `percent`, `compact` |
| **Decimal Places** | Number of decimal places | `0` for integers, `2` for percentages |
| **Prefix** | Added before the value | `$` |
| **Suffix** | Added after the value | `orders`, `%` |
| **Date Format** | How date columns display | `MM/DD/YYYY`, `MMM DD, YYYY` |
| **Hide Column** | Hide the column (in data, not displayed) | Hide ID columns or sort-only columns |
| **Pin Left / Right** | Fix column when scrolling horizontally | Pin name column, ID column |
| **Wrap Text** | Auto-wrap long text | Enable for description or notes columns |
| **Link** | Turn value into a hyperlink | `https://orders.company.com/{{order_id}}` |
| **Conditional Formatting** | Color cells based on conditions (see separate section) | |

### Table-Level Configuration

| Option | Description | Recommendation |
|--------|-------------|----------------|
| **Pagination** | Rows per page | `20` (default), `50`, `100` |
| **Default Page Size** | Default rows when opened | `20` |
| **Searchable** | Real-time search bar across all columns | Enable for tables with many rows |
| **Sortable Columns** | Click headers to sort | Enable |
| **Default Sort Column** | Default sort column | `total_revenue` |
| **Default Sort Order** | `Asc` or `Desc` | `Desc` |
| **Frozen Columns** | Number of leading columns fixed when scrolling horizontally | `1` or `2` |
| **Frozen Rows (Header)** | Column headers stay fixed when scrolling vertically | On (default) |
| **Row Striping** | Alternating row background colors (easier reading) | On |
| **Row Hover Highlight** | Highlight row on hover | On |
| **Column Resize** | Users drag to resize column widths | On |
| **Column Reorder** | Users drag to reorder columns | On/Off as needed |
| **Max Height** | Maximum height before vertical scrollbar appears | `400px`, `600px` |
| **Row Click Action** | Action on row click: open URL, open modal | URL: `/orders/{{order_id}}` |
| **Export Button** | CSV/Excel download button inside the table | Enable for data tables |
| **Export Filename** | Filename when exported | `order_list_{{date}}` |
| **Show Row Numbers** | Show row numbers as the first column | On/Off |
| **Density** | Display density: `Compact` / `Normal` / `Comfortable` | `Normal` |
| **Border Style** | `Full` / `Horizontal` / `None` | `Horizontal` |

### SQL Examples

**Top 50 customers by revenue:**
```sql
SELECT
  ROW_NUMBER() OVER (ORDER BY SUM(o.revenue) DESC) AS rank,
  c.full_name AS name,
  c.phone AS phone,
  c.city AS city,
  COUNT(DISTINCT o.order_id) AS order_count,
  SUM(o.revenue) AS total_spent,
  AVG(o.revenue) AS avg_order_value,
  MAX(o.order_date) AS last_purchase
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'delivered')
  AND o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 365 DAY)
GROUP BY c.id, c.full_name, c.phone, c.city
ORDER BY total_spent DESC
LIMIT 50
```

**Inventory table with alerts:**
```sql
SELECT
  p.sku,
  p.name AS product_name,
  p.category,
  i.quantity AS stock,
  i.min_quantity AS reorder_point,
  p.cost_price,
  p.sell_price,
  CASE
    WHEN i.quantity = 0 THEN 'Out of Stock'
    WHEN i.quantity < i.min_quantity THEN 'Low Stock'
    ELSE 'Normal'
  END AS status
FROM products p
JOIN inventory i ON i.product_id = p.id
ORDER BY
  CASE WHEN i.quantity = 0 THEN 0
       WHEN i.quantity < i.min_quantity THEN 1
       ELSE 2
  END,
  p.name
```
→ Apply Conditional Formatting: `status = 'Out of Stock'` → red background; `status = 'Low Stock'` → yellow background

---

## 7. Conditional Formatting

Dynamic coloring applied to **Table Widgets** — helps spot abnormal data instantly without reading every number.

### How to Configure

Widget Editor → **Visualization** tab → scroll to **Conditional Formatting** → **Add Rule**

### All Options Per Rule

| Option | Description | Example |
|--------|-------------|---------|
| **Column** | Column to apply the condition to | `revenue`, `status`, `stock` |
| **Condition** | Comparison operator | `>`, `<`, `>=`, `<=`, `=`, `!=`, `contains`, `starts with`, `is empty`, `is not empty` |
| **Value** | Threshold value | `10000000`, `cancelled`, `Low` |
| **Text Color** | Text color when condition is met | Red `#dc3545`, Green `#198754` |
| **Background Color** | Cell/row background color when condition is met | Light yellow `#fff3cd` |
| **Bold** | Bold text | On |
| **Italic** | Italic text | On |
| **Strikethrough** | Strike through text | On for deleted/cancelled data |
| **Apply To** | Color the `Cell` only or the entire `Row` | `Row` for cancelled orders; `Cell` for number columns |
| **Custom Icon** | Add icon before the value | ✅ 🔴 ⚠️ |
| **Priority** | Which rule takes precedence when multiple rules match | Lower number = higher priority |

### 10 Common Rules

| Use Case | Column | Condition | Value | Result |
|----------|--------|-----------|-------|--------|
| High-value orders | `revenue` | `>` | `10000` | Light green background `#d1fae5` |
| Cancelled orders | `status` | `=` | `cancelled` | Red text, strikethrough |
| Out of stock | `quantity` | `=` | `0` | Dark red background, white text |
| Low stock | `quantity` | `<` | `10` | Yellow background `#fef3c7` |
| Negative growth | `growth_pct` | `<` | `0` | Red text |
| High positive growth | `growth_pct` | `>` | `20` | Green text, bold |
| Overdue delivery | `delivery_status` | `=` | `overdue` | Light red background, bold |
| Low rating | `rating` | `<=` | `3` | Orange text |
| KPI achieved | `actual` | `>=` | `target` | ✅ icon + green background |
| VIP customer | `customer_tier` | `=` | `VIP` | Gold color, bold |

> **Tip:** Create multiple rules for the same column — e.g.: `quantity = 0` → dark red; `quantity < 10` → yellow; `quantity >= 10` → green. Semantix applies them by priority.

---

## 8. Scatter Chart & Bubble Chart

### Description

Each point represents an entity (product, customer, branch). Its position (X, Y) shows 2 attributes — great for discovering **correlations and clusters**.

**Bubble Chart** is a Scatter Chart with a 3rd dimension: **point size** represents a 3rd value.

### When to Use ✅

- Exploring relationships between 2 variables: "Do branches that spend more on marketing have higher revenue?"
- Detecting outliers: products with high order count but abnormally low revenue
- Natural clustering: customers by frequency vs monetary value
- Comparing efficiency: ROI vs Cost for each marketing channel

### When NOT to Use ❌

- Data where "each point = one entity" doesn't apply (use Line/Bar instead)
- Fewer than 5 data points — not enough to see a pattern
- No hypothesis about correlation — the chart won't be meaningful

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **X Axis** | First variable column (horizontal axis) | `marketing_spend`, `order_count` |
| **Y Axis** | Second variable column (vertical axis) | `revenue`, `profit` |
| **Size By** | Column determining point size (Bubble Chart) | `profit_margin` |
| **Size Range** | Min–max point size (px) | `5–40` |
| **Color By** | Column for color-coding groups | `category`, `region` |
| **Label By** | Column showing a label beside each point | `product_name`, `branch_name` |
| **Label Threshold** | Only show labels for standout points (top N) | `10` → labels for 10 largest points only |
| **Point Opacity** | Transparency (0–1) — reduce when points overlap | `0.7` |
| **Point Shape** | `Circle` / `Square` / `Triangle` | `Circle` (default) |
| **Default Point Size** | Default size when no Size By is set | `8px` |
| **Show Regression Line** | Linear trend line (best-fit line) | Enable to see correlation |
| **Regression Type** | `Linear` / `Polynomial` / `Exponential` | `Linear` |
| **Quadrant Lines** | Divide chart into 4 quadrants (X mean, Y mean) | Enable to classify entities |
| **Quadrant Labels** | Labels for 4 quadrants | `High ROI`, `Low Efficiency`… |
| **X Axis Log Scale** | Logarithmic X axis | When X has extreme value differences |
| **Y Axis Log Scale** | Logarithmic Y axis | Same |
| **Tooltip** | Info shown on point hover | Auto-shows all columns |

### SQL Example

**Product analysis: Orders vs Revenue (Bubble = Avg Price):**
```sql
SELECT
  p.product_name,
  p.category,
  COUNT(DISTINCT oi.order_id) AS order_count,
  SUM(oi.revenue) AS revenue,
  AVG(oi.unit_price) AS avg_price,
  ROUND(SUM(oi.profit) / SUM(oi.revenue) * 100, 1) AS profit_margin
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY p.id, p.product_name, p.category
HAVING order_count > 5
ORDER BY revenue DESC
```
→ X = `order_count`, Y = `revenue`, Size By = `avg_price`, Color By = `category`, Label By = `product_name`

> **Tip:** Enable **Quadrant Lines** to automatically divide the chart into 4 quadrants — easily classify: "High sales + High revenue" (top right), "Low sales + Low revenue" (bottom left)…

---

## 9. Treemap

### Description

Displays hierarchical data as nested rectangles. Rectangle size = metric value. Very effective when you need to **see both the big picture and hierarchical details** in one view.

### When to Use ✅

- Company-wide revenue → broken down by category → broken down by product
- Total inventory → by supplier → by product
- Budget → by department → by project
- When there are more than 7–8 categories (Pie Chart runs out of space)

### When NOT to Use ❌

- Data without a clear hierarchy
- Need to compare exact values between similarly-sized rectangles
- Too many tiny rectangles → labels unreadable

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **Group By (Level 1)** | Primary hierarchy column — creates large rectangles | `category_name` |
| **Sub-Group By (Level 2)** | Secondary hierarchy within each large rectangle | `product_name` |
| **Size By** | Metric determining rectangle size | `total_revenue` |
| **Color By (Metric)** | Metric determining color (gradient) | `growth_rate` → green = growing, red = shrinking |
| **Color By (Dimension)** | Color by Level 1 category | Each group a different color |
| **Color Scale** | Color scale for Color By metric | `Green-Red`, `Blue-Orange`, `Sequential` |
| **Show Group Labels** | Show Level 1 (large) rectangle labels | On |
| **Show Item Labels** | Show Level 2 (small) rectangle labels | On (if rectangle is large enough) |
| **Show Values** | Show metric value inside rectangles | On for large rectangles |
| **Show Percentages** | Show % inside rectangles | On |
| **Min Label Size** | Minimum font size to show a label (px) | `10` — rectangles smaller than this won't show labels |
| **Padding** | Space between rectangles | `2px` |
| **Layout Algorithm** | `Squarified` / `Slice and Dice` / `Strip` | `Squarified` (default — most square-shaped) |

### SQL Example

**Treemap: Revenue by category → product with MoM growth:**
```sql
SELECT
  p.category,
  p.product_name,
  SUM(oi.revenue) AS revenue,
  ROUND(
    (SUM(oi.revenue) - SUM_PREV.prev_revenue)
    / NULLIF(SUM_PREV.prev_revenue, 0) * 100, 1
  ) AS growth_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.id
LEFT JOIN (
  SELECT product_id, SUM(revenue) AS prev_revenue
  FROM order_items
  WHERE order_date BETWEEN
    DATE_SUB(DATE_FORMAT(CURRENT_DATE,'%Y-%m-01'), INTERVAL 1 MONTH)
    AND DATE_SUB(DATE_FORMAT(CURRENT_DATE,'%Y-%m-01'), INTERVAL 1 DAY)
  GROUP BY product_id
) SUM_PREV ON SUM_PREV.product_id = oi.product_id
WHERE oi.order_date >= DATE_FORMAT(CURRENT_DATE,'%Y-%m-01')
GROUP BY p.category, p.product_name, SUM_PREV.prev_revenue
ORDER BY revenue DESC
```

---

## 10. Funnel Chart

### Description

Visualizes **conversion rates** through sequential steps. Clearly shows which step has the highest drop-off.

### When to Use ✅

- E-commerce purchase flow: View product → Cart → Checkout → Payment
- SaaS onboarding: Sign up → Verify → Create project → Invite team
- Sales pipeline: Lead → Qualified → Demo → Proposal → Closed
- Any sequential process where you need to measure step-by-step conversion

### When NOT to Use ❌

- Data without a clear step order
- Only 1–2 steps (no need for a funnel)
- Steps are unrelated to each other

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **Step Column** | Step name column (dimension) | `step_name`, `stage` |
| **Value Column** | Count at each step (metric) | `user_count`, `order_count` |
| **Step Order** | Column defining step order | `step_order` (integer: 1, 2, 3…) |
| **Orientation** | `Vertical` or `Horizontal` | `Vertical` (default) |
| **Funnel Shape** | `Classic` (tapered) / `Rectangular` | |
| **Show Conversion Rate** | % from the previous step to this step | On (most important) |
| **Conversion Rate Position** | `Between Steps` / `On Bar` / `Label` | `Between Steps` |
| **Show Drop-off** | Number of people who left at each step | On |
| **Show Drop-off Rate** | % who left at each step | On |
| **Show Total Conversion** | Overall conversion rate (first step → last step) | On |
| **Show Absolute Values** | Actual count at each step | On |
| **Color Per Step** | Different color for each step | On to differentiate |
| **Color Gradient** | Color transitions based on conversion rate | Green (high) → Red (low) |
| **Bar Alignment** | `Center` / `Left` | `Center` |
| **Label Position** | Label position: `Inside` / `Outside` / `Right` | |

### SQL Example

**E-commerce purchase funnel:**
```sql
WITH funnel_data AS (
  SELECT
    'Step 1: View Product' AS step, 1 AS step_order,
    COUNT(DISTINCT user_id) AS users
  FROM page_views WHERE page_type = 'product'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Step 2: Add to Cart', 2,
    COUNT(DISTINCT user_id)
  FROM cart_events WHERE event_type = 'add_to_cart'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Step 3: Begin Checkout', 3,
    COUNT(DISTINCT user_id)
  FROM checkout_events WHERE step = 'start'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Step 4: Payment Complete', 4,
    COUNT(DISTINCT user_id)
  FROM orders WHERE status = 'paid'
    AND DATE(created_at) = CURRENT_DATE
)
SELECT * FROM funnel_data ORDER BY step_order
```
→ Step Column = `step`, Value Column = `users`, Step Order = `step_order`

---

## 11. Radar Chart

### Description

Compares multiple entities across multiple criteria simultaneously on a "spider web". The area of the polygon = overall performance.

### When to Use ✅

- Comparing 3–6 entities (branches, employees, products) across 4–8 criteria
- Evaluating strengths and weaknesses of each entity across multiple dimensions
- Multi-dimensional KPI scorecards for periodic reviews

### When NOT to Use ❌

- Only 1–2 criteria (use Bar Chart)
- More than 6–7 entities → too cluttered
- More than 8 criteria → axes are too close together

### All Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **Dimension** | Column naming the entities (creates multiple polygons) | `branch_name`, `employee_name` |
| **Metrics** | List of axes (criteria) | `revenue`, `orders`, `satisfaction`, `speed` |
| **Normalize** | Normalize all criteria to the same 0–100 scale | **Enable** — without this, different units will distort the shape |
| **Fill** | Fill the inside of the polygon with color | On |
| **Fill Opacity** | Fill transparency | `0.2` |
| **Show Points** | Show points at each vertex | On |
| **Show Legend** | Color legend | On |
| **Grid Lines** | Background grid rings | `3` or `5` rings |
| **Grid Shape** | `Circular` or `Polygon` | `Circular` |
| **Max Value** | Max value per axis (when not normalizing) | Auto or custom |

### SQL Example

**Compare branches across 5 criteria:**
```sql
SELECT
  branch_name,
  ROUND(SUM(revenue) / 1000, 1) AS revenue_k,
  COUNT(DISTINCT order_id) AS order_count,
  ROUND(AVG(customer_rating), 1) AS satisfaction_score,
  ROUND(100 - SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)
        / COUNT(*) * 100, 1) AS success_rate_pct,
  ROUND(AVG(DATEDIFF(delivered_at, order_date)), 1) AS avg_delivery_days
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY branch_name
ORDER BY revenue_k DESC
```
→ Dimension = `branch_name`, Metrics = the 4 remaining columns, **Normalize = On** (different units)

---

## 12. Text / Markdown Widget

### Description

A widget containing static text with Markdown formatting. Use it to add section headers, notes, reading instructions, or dividing lines.

### When to Use ✅

- Section headers (e.g. `## 📦 Order Analysis`)
- Notes about data sources, update time, caveats
- Dashboard reading instructions for new viewers
- Dividing lines between widget groups

### Supported Markdown Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold**  *Italic*  ~~Strikethrough~~  `inline code`

- Bullet list
1. Numbered list

> Note / blockquote

[Link text](https://example.com)

---

(horizontal line)
```

### Practical Examples

**Dashboard header with metadata:**
```markdown
## 📊 June 2026 Revenue Report

*Updated: every day at 7:00 AM from the ERP system.*
*Source: PostgreSQL Production — tables `orders`, `customers`.*

**Contact:** data-team@company.com if you spot any errors.
```

**Analysis section note:**
```markdown
### 📌 Important Notes

- Revenue in this report **excludes** refunded orders
- "New customers" counts from the first order recorded in the system
- "Other" region = provinces with fewer than 5 orders/month
```

---

## 13. Reference Lines

Add fixed horizontal or vertical lines to Line and Bar charts to compare against targets, averages, or critical thresholds.

### How to Configure

Widget Editor → **Visualization** → **Reference Lines** → **Add Line**

### All Options

| Option | Description | Example |
|--------|-------------|---------|
| **Value** | Position of the line | `100000` ($100K) |
| **Calculate** | Auto-calculate from data: `Average`, `Median`, `Max`, `Min` | `Average` → automatic average line |
| **Label** | Label shown on the line | `Target: $100K`, `Avg: $45K` |
| **Label Position** | `Start` / `Center` / `End` | `End` |
| **Line Color** | Line color | Red for target, green for average |
| **Line Style** | `Solid` / `Dashed` / `Dotted` | `Dashed` for target |
| **Line Thickness** | Thickness (px) | `1` or `2` |
| **Axis** | Apply to `Y` or `X` axis | `Y` (most common) |
| **Above Color** | Fill area above the line | Light green (above target = good) |
| **Below Color** | Fill area below the line | Light red (below target) |

### Practical Use Cases

| Line Type | Value | Label | Meaning |
|-----------|-------|-------|---------|
| Monthly target | `500000` | `Target: $500K` | See which days hit the target |
| Rolling average | `Average` | `30-day Avg` | Auto-calculated from data |
| Warning threshold | `10` | `Min Stock Level` | Alert when below safe level |
| Budget | `budget` | `Budget` | Uses a column from data (dynamic reference) |

---

## 14. Choosing the Right Chart — Quick Decision Table

| Analytical Question | Best Chart | Alternative |
|--------------------|-----------|-------------|
| "What is this KPI? Up or down vs last period?" | **Scorecard** | — |
| "Which category has the highest / lowest value?" | **Bar Chart (Horizontal if names are long)** | — |
| "How has a trend changed over time?" | **Line Chart** | Area Chart |
| "What percentage do each component make up of the total?" | **Pie / Donut** (< 7 parts) | Horizontal Bar |
| "Need to see row-level detail across many columns?" | **Table** | — |
| "Do these two variables correlate?" | **Scatter Chart** | — |
| "What % of people convert from one step to the next?" | **Funnel Chart** | — |
| "Hierarchical structure and proportions?" | **Treemap** | Stacked Bar |
| "Where is this entity strong/weak across multiple dimensions?" | **Radar Chart** | Grouped Bar |
| "How does each component's contribution change over time?" | **Stacked Area Chart** | Stacked Bar |
| "Compare multiple metrics across the same category?" | **Grouped Bar** | Radar Chart |
| "Scatter and cluster of many entities?" | **Scatter / Bubble Chart** | — |
| "Add a section header or note?" | **Text / Markdown** | — |

### Common Anti-Patterns

| Wrong | Correct |
|-------|---------|
| Pie Chart with 10+ categories | Horizontal Bar Chart |
| Line Chart for non-time-series data | Bar Chart |
| Stacked Bar with 8+ series | Grouped Bar or Treemap |
| Scatter Chart with fewer than 5 points | Simple Table |
| Scorecard with no prior-period comparison | Add a Comparison Value |
| Y Axis not starting at 0 in a Bar Chart | Always set Y Min = 0 for Bar |
