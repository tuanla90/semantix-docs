# Calculated Fields

**Navigate to:** Studio → DABI → Data Models → select Model → Calculated Fields tab

A Calculated Field is a **virtual column** created from a SQL expression. It doesn't exist in the original database but is computed in real time when the AI runs a query. The AI and users can use a Calculated Field just like any regular column.

---

## When to Use Calculated Fields?

| Situation | Example |
|-----------|---------|
| **Compute from multiple columns** | Profit = Revenue − Cost |
| **Convert data types** | Timestamp → date string, number → label |
| **Classify / Categorize** | Customer tier: "Large" / "Medium" / "Small" based on revenue |
| **Business logic** | Classify orders by time of day, day of week |
| **Clean data** | UPPER(name), TRIM(email), handle NULLs |

---

## Creating a Calculated Field

### Step 1 — Open the Calculated Fields Tab

1. Go to **Studio → DABI → Data Models** → select the Model.
2. Switch to the **Calculated Fields** tab.
3. Click **Add Calculated Field**.

### Step 2 — Fill in Details

| Property | Required | Example | Description |
|----------|----------|---------|-------------|
| **Name** | Yes | `profit_margin` | Technical name: snake_case, no spaces |
| **Label** | Yes | `Gross Margin (%)` | Friendly display name |
| **Expression** | Yes | `(revenue - cost) / revenue * 100` | SQL expression |
| **Return Type** | Yes | `Number` | The data type of the result |
| **Description** | Recommended | `Gross profit as a percentage of revenue` | Helps AI know when to use this |
| **Format** | No | `percent` | How to display the result |

### Return Types

| Return Type | Use When |
|-------------|---------|
| **Number** | Result is a number (integer or decimal) |
| **String** | Result is a text string (label, classification) |
| **Boolean** | Result is true/false |
| **Date** | Result is a date |
| **Datetime** | Result is a date and time |

### Step 3 — Write the Expression

The Expression is any valid SQL snippet. Reference columns using the original database column names (not Labels).

---

## Real-World Examples

### 1. Financial Calculations

```sql
-- Gross profit (USD)
revenue - cost

-- Gross margin (%)
CASE WHEN revenue > 0 THEN (revenue - cost) / revenue * 100 ELSE 0 END

-- Order value after discount
revenue * (1 - discount_rate / 100)

-- Convert to another currency (static rate)
revenue / 1.08
```

### 2. Customer Segmentation (CASE WHEN)

```sql
-- Segment by lifetime revenue
CASE
  WHEN lifetime_revenue >= 10000 THEN 'VIP'
  WHEN lifetime_revenue >= 2000  THEN 'Gold'
  WHEN lifetime_revenue >= 500   THEN 'Silver'
  ELSE 'New'
END

-- Segment by age group
CASE
  WHEN age < 25 THEN 'Gen Z (< 25)'
  WHEN age < 40 THEN 'Millennial (25-39)'
  WHEN age < 55 THEN 'Gen X (40-54)'
  ELSE 'Baby Boomer (55+)'
END

-- Segment by order value
CASE
  WHEN revenue >= 1000 THEN 'Large (>= $1,000)'
  WHEN revenue >= 200  THEN 'Medium ($200-$999)'
  WHEN revenue >= 50   THEN 'Small ($50-$199)'
  ELSE 'Micro (< $50)'
END
```

### 3. Date and Time Processing

```sql
-- Day of week name
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Sunday'
  WHEN 2 THEN 'Monday'
  WHEN 3 THEN 'Tuesday'
  WHEN 4 THEN 'Wednesday'
  WHEN 5 THEN 'Thursday'
  WHEN 6 THEN 'Friday'
  WHEN 7 THEN 'Saturday'
END

-- Quarter of year
CASE
  WHEN MONTH(order_date) IN (1,2,3)   THEN 'Q1'
  WHEN MONTH(order_date) IN (4,5,6)   THEN 'Q2'
  WHEN MONTH(order_date) IN (7,8,9)   THEN 'Q3'
  WHEN MONTH(order_date) IN (10,11,12) THEN 'Q4'
END

-- Days between order and delivery
DATEDIFF(delivery_date, order_date)

-- Account age in days
DATEDIFF(CURRENT_DATE, created_at)

-- Customer age in years
FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365)

-- Month-year string for grouping
CONCAT(YEAR(order_date), '-', LPAD(MONTH(order_date), 2, '0'))
```

### 4. String Processing

```sql
-- Normalize email to lowercase
LOWER(TRIM(email))

-- Extract email domain
SUBSTRING(email, LOCATE('@', email) + 1)

-- Combine first and last name
CONCAT(first_name, ' ', last_name)

-- Abbreviate to initials
UPPER(LEFT(first_name, 1))

-- Mask phone number (privacy)
CONCAT(LEFT(phone, 3), '****', RIGHT(phone, 3))
```

### 5. NULL Handling

```sql
-- Replace NULL with 0
COALESCE(revenue, 0)

-- Replace NULL with a default label
COALESCE(region, 'Unknown')

-- Check for NULL
CASE WHEN email IS NULL THEN 'No email' ELSE 'Has email' END
```

### 6. Advanced Statistical Calculations

```sql
-- Percentage contribution (window function — database support varies)
revenue / SUM(revenue) OVER () * 100

-- Rank by revenue within a group
RANK() OVER (PARTITION BY region ORDER BY revenue DESC)

-- Running total (cumulative by date)
SUM(revenue) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING)
```

---

## SQL Dialect by Database

Expressions must be valid for the SQL dialect of your database:

| Database | Current Date | Extract Day | Extract Month | Notable Functions |
|----------|-------------|-------------|--------------|------------------|
| **PostgreSQL** | `CURRENT_DATE` | `EXTRACT(day FROM col)` | `EXTRACT(month FROM col)` | `DATE_PART`, `TO_CHAR` |
| **MySQL** | `CURDATE()` | `DAY(col)` | `MONTH(col)` | `DAYOFWEEK`, `DATE_FORMAT` |
| **BigQuery** | `CURRENT_DATE()` | `EXTRACT(DAY FROM col)` | `EXTRACT(MONTH FROM col)` | `FORMAT_DATE`, `DATE_DIFF` |
| **Snowflake** | `CURRENT_DATE()` | `DAY(col)` | `MONTH(col)` | `DATEDIFF`, `TO_CHAR` |
| **ClickHouse** | `today()` | `toDayOfMonth(col)` | `toMonth(col)` | `dateDiff`, `formatDateTime` |

---

## Testing an Expression

Before saving, click **Preview** (if available) to run the expression against a small data sample and see the output.

---

## Known Limitations

| Limitation | Details |
|-----------|---------|
| **No nesting** | A Calculated Field cannot reference another Calculated Field |
| **No aggregation** | Calculated Fields are row-level expressions, not aggregates. Use Metrics for aggregation |
| **Dialect-dependent** | Expression must match the SQL syntax of the specific database |
| **No detailed SQL debug** | If the expression is wrong, the AI shows a generic SQL error — you must check the expression manually |

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Column not found` | Wrong column name (use DB name, not Label) | Check the exact column name in the database |
| `Function not supported` | Function doesn't exist in your database | Use the correct SQL dialect for your database |
| `Division by zero` | Dividing by a column that can be 0 | Add `CASE WHEN denominator > 0 THEN ... ELSE 0 END` |
| `Type mismatch` | Return Type doesn't match the actual result | Review and fix the Return Type |
