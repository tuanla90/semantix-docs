# Data Portal — Report Export Hub

**Navigate to:** Data Portal (top navigation bar)

The Data Portal is a module that allows **end users** to look up and export data using pre-built report templates (Data Templates) prepared by Admins — no SQL knowledge or understanding of the database structure required.

---

## Who Is It For?

| Audience | How They Use It |
|----------|----------------|
| **Business staff** | Export periodic reports by day/week/month without involving IT |
| **Finance / Accounting** | Download Excel files in the exact format required by the department |
| **Branch managers** | Filter data for their own branch and download for offline analysis |
| **HR** | Export payroll, employee lists by department |

---

## How to Use (For End Users)

### Step 1 — Open Data Portal

1. Log in to Semantix.
2. Click **Data Portal** in the main navigation bar (top menu).
3. The page shows a list of **report templates** that your Admin has set up for you.

> You only see templates that you have permission to access (assigned by Admin).

### Step 2 — Find a Report Template

**Search:**
- Type a keyword in the **Search** box (e.g., "revenue", "payroll", "inventory")
- Results filter by template name and description

**Browse the list:**
- Each card shows: template name, short description, and export format (CSV/Excel/PDF)
- Click a card to open the template

### Step 3 — Fill in Filter Parameters

Each template may have different filter fields depending on how the Admin designed it:

| Parameter Type | Example Field | Example Value |
|---------------|--------------|--------------|
| **Text** | Customer code, Product name | `C001`, `T-Shirt` |
| **Number** | Minimum value, Quantity | `1000`, `10` |
| **Date** | Start date | `06/01/2024` |
| **Date Range** | From date → To date | `06/01/2024` → `06/30/2024` |
| **Single Select** | Region, Status | Select `North Region` |
| **Multi-Select** | Multiple branches, products | Select `NYC`, `LA`, `Chicago` |

> Fields marked with `*` (asterisk) are **required** before you can export.

**Concrete example for the "Branch Revenue Report" template:**

```
From date *:      [06/01/2024]
To date *:        [06/30/2024]
Branch *:         [New York ▼] (dropdown)
Status:           [All ▼] (optional)
Export format:    ● Excel  ○ CSV  ○ PDF
```

### Step 4 — Export Data

Depending on the template configuration, you can export in one or more formats:

| Button | Format | When to Use |
|--------|--------|------------|
| **Download CSV** | Raw `.csv` file | Import into Excel/Sheets for custom formatting |
| **Download Excel** | Formatted `.xlsx` file | Template has colors, logo, and pre-built layout |
| **Download PDF** | `.pdf` file | Print-ready reports, email attachments |

**For large reports:**

If the dataset is very large (e.g., exporting 1 million rows), the system processes it asynchronously:
1. Click Export → the system shows "Processing..."
2. When done, you receive a notification (email or in-app notification)
3. The file downloads automatically or a download link appears in the notification

---

## Usage Notes

- **Data freshness:** Depending on configuration, data may be cached from 5 minutes to 1 hour. If you need the latest data, ask your Admin about the refresh schedule.
- **Pre-formatted Excel files:** When exporting Excel with a template, the file preserves the original colors, fonts, and layout. Data fills into the correct placeholder positions.
- **Access control:** If you don't see a template you need, contact your Admin to request access.

---

## For Admins — Creating Data Templates

### Data Template Overview

A Data Template is the "blueprint" for a report, consisting of:
1. **SQL Query** with `{{param}}` parameters embedded in the query
2. **Form Parameters** — filter fields that users fill in
3. **Template File** (optional) — an Excel/Word file with placeholders to preserve formatting

### Creating a New Template

1. Go to **Studio → DE → Data Templates → New Template**.
2. Fill in the basic information:

| Field | Required | Example |
|-------|----------|---------|
| **Name** | Yes | `Branch Revenue Report` |
| **Description** | Recommended | `Export revenue by branch and selected date range` |
| **Connection** | Yes | Select the source database |
| **Export Type** | Yes | `excel`, `csv`, or `both` |

3. **Write the SQL Query:**

```sql
SELECT 
  o.order_date,
  b.branch_name,
  COUNT(DISTINCT o.order_id) AS order_count,
  SUM(o.revenue) AS total_revenue,
  AVG(o.revenue) AS avg_order_value
FROM orders o
JOIN branches b ON o.branch_id = b.id
WHERE 
  o.order_date BETWEEN {{from_date}} AND {{to_date}}
  AND b.branch_name = {{branch}}
  AND o.status IN ('paid', 'delivered')
GROUP BY o.order_date, b.branch_name
ORDER BY o.order_date
```

4. **Declare Parameters:**

Each `{{param}}` in the SQL needs a matching Parameter:

| Parameter | Label | Type | Operator | Required |
|-----------|-------|------|----------|---------|
| `from_date` | From date | `date` | `>=` | Yes |
| `to_date` | To date | `date` | `<=` | Yes |
| `branch` | Branch | `select` | `=` | Yes |

**Configuring Select (dropdown):**

Two ways to create the options list:

*Static Options (fixed):*
```
North Region
Central Region
South Region
```

*Dynamic Options SQL (fetched from database):*
```sql
SELECT DISTINCT branch_name FROM branches ORDER BY branch_name
```

5. **Upload Template File (Optional):**

If you want Excel output to preserve formatting (colors, logo, fixed headers):
- Prepare a sample Excel file with placeholder cells like `{{order_date}}`, `{{branch_name}}`
- Upload the file and map placeholders to SQL column names

6. **Configure Parameter Layout:**

Drag and drop to set the display order of parameters in the form.

7. **Set Access Control:**

**Access Control** tab → select the Roles or Users who can use this template.

8. Click **Save** then **Publish**.

### More Complex SQL Example

```sql
-- Template: Top-selling products by category
SELECT 
  c.category_name,
  p.product_name,
  SUM(oi.quantity) AS units_sold,
  SUM(oi.revenue) AS total_revenue,
  RANK() OVER (PARTITION BY c.id ORDER BY SUM(oi.revenue) DESC) AS rank
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
WHERE 
  oi.order_date BETWEEN {{start_date}} AND {{end_date}}
  {{#if category_ids}}
  AND c.id IN ({{category_ids}})
  {{/if}}
GROUP BY c.category_name, c.id, p.product_name, p.id
HAVING RANK() <= {{top_n}}
ORDER BY c.category_name, rank
```

### Using a Template in a Pipeline

Data Templates can also be used as a **Source** in a Data Pipeline to automatically run reports and push data to another destination (Google Sheets, another database, etc.).

See [Data Pipelines](../studio/pipelines.md).

---

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|-----------|
| Template not visible | No access permission | Contact Admin to grant access |
| Excel file is empty | Placeholder error in template file | Admin should check the template file |
| Export never finishes | Dataset too large, server timeout | Narrow the date range or add more filter conditions |
| Wrong numbers | Logic error in SQL template | Admin should review the SQL and test with multiple parameters |
| No permission to export PDF | PDF converter not installed on server | Contact Admin to configure PDF feature |
