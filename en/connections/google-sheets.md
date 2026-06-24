# Google Sheets

Guide for connecting Google Sheets as a data source in Semantix.

---

## Overview

Semantix reads Google Sheets via a **Service Account** — a technical account that doesn't require interactive login. You share the Google Sheets file with the service account, and Semantix reads data from it.

**Semantix Service Account:**
```
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

> This is the fixed email address you need to share your Google Sheets file with.

---

## Connection Steps

### Step 1: Share the Google Sheets File

1. Open the Google Sheets file you want to connect
2. Click the **Share** button in the top right
3. In the "Add people and groups" field, enter:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
4. Change the permission from **Editor** to **Viewer**
5. **Uncheck** "Notify people" (no need to send a notification email)
6. Click **Share**

### Step 2: Get the Spreadsheet ID

Open the Google Sheets file → look at the URL in the browser:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
```
The part between `/d/` and `/edit` is the **Spreadsheet ID**:
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

### Step 3: Connect in Semantix

1. Go to **Studio → DE → Connections → New Connection**
2. Select **Google Sheets**
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Display Name** | Friendly name (e.g. "Q4 Revenue Report") |
| **Spreadsheet ID** | ID from the URL in Step 2 |
| **Sheet Name** | The tab name inside the file — case-sensitive |

4. Click **Test Connection** — if successful, it shows the number of rows read
5. Click **Save**

---

## Data Structure Requirements

Semantix reads Google Sheets with these rules:

- **First row** = column names (headers)
- **Subsequent rows** = data
- Empty cells are treated as `NULL`
- Data types are automatically detected from column values

**Example of a good structure:**

| order_id | customer_name | amount | order_date | status |
|----------|---------------|--------|------------|--------|
| 1001 | John Smith | 150000 | 2026-01-15 | paid |
| 1002 | Jane Doe | 230000 | 2026-01-16 | pending |

**Avoid:**
- Merged cells in the header row
- Multiple blank rows at the top
- Cells with complex formulas returning errors like `#REF!`, `#N/A`

---

## Refreshing Data

Google Sheets does not automatically push data to Semantix. To update data:

1. **Manually**: Click the **Refresh** button on the Dashboard (🔄)
2. **On a schedule**: Set **Cache TTL = 0** in connection settings → each Dashboard view re-reads from Sheets
3. **Automated**: Set up a Data Pipeline to sync from Sheets to PostgreSQL on a schedule, then use PostgreSQL as the primary source

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Spreadsheet not found` | Wrong Spreadsheet ID | Copy the ID from the URL again — only the part between `/d/` and `/edit` |
| `Permission denied` | File not shared with the service account | Share the file with `semantix@gen-lang-client-0852507499.iam.gserviceaccount.com` |
| `Sheet not found` | Sheet (tab) name is misspelled | Check the tab name — case-sensitive, watch for spaces |
| Empty data | Sheet has no header row | Ensure the first row contains column names |
| Numbers read incorrectly | Column formatted with a different locale | Convert to plain numbers (no thousands separators) |

---

## Google Sheets Limitations

| Limit | Description |
|-------|-------------|
| File size | Maximum 10 million cells per spreadsheet |
| Rows read | Semantix reads up to `MAX_ROWS_LIMIT` rows (default 10,000) |
| Update speed | Google Sheets API allows 300 requests/minute |
| Data types | No native support for BLOB or JSON |

---

## Connecting Multiple Sheets

To connect multiple tabs in the same file, create **multiple Connections** — each pointing to a different Sheet Name but the same Spreadsheet ID.

Example: a Sheets file with 3 tabs — `Orders`, `Products`, `Customers`:

| Connection Name | Spreadsheet ID | Sheet Name |
|----------------|---------------|------------|
| Sheets - Orders | `1BxiMV...` | `Orders` |
| Sheets - Products | `1BxiMV...` | `Products` |
| Sheets - Customers | `1BxiMV...` | `Customers` |

Then create a Data Model for each connection and define Relations so AI can JOIN data across sheets.

---

## When to Use Google Sheets

**Good fit:**
- Data under 50,000 rows
- Manually updated data (quick reports, plans)
- Rapidly prototyping with Semantix before investing in a database

**Not a good fit:**
- Data over 100,000 rows (poor performance)
- Real-time requirements (Sheets has read latency)
- Data changing every second

> For large datasets, import Google Sheets into PostgreSQL or BigQuery and connect from there.
