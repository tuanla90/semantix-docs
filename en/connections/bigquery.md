# Google BigQuery

Guide for connecting Google BigQuery to Semantix via a Google Apps Script proxy.

---

## How BigQuery Connects

Semantix connects to BigQuery through a **Google Apps Script** acting as a proxy. The script runs inside your Google account and executes queries on Semantix's behalf — you don't need to give Semantix a service account key.

### Why Apps Script Instead of a Direct Connection?

| Criteria | Apps Script Proxy | Direct Service Account |
|----------|-------------------|----------------------|
| Security | Better — no key exposure | Lower — key stored in Semantix |
| Setup | Requires deploying a script | Just upload a JSON key |
| Best for | Google Workspace users | On-premise environments without internet access |

---

## Setup — Apps Script Proxy (Recommended)

### Step 1: Create a Google Apps Script

1. Open [script.google.com](https://script.google.com) → **New Project**
2. Name the project: `Semantix BigQuery Connector`
3. Delete the default code and paste the following proxy code:

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const projectId = payload.projectId;
    const sql = payload.sql;
    
    const request = {
      query: sql,
      useLegacySql: false,
      timeoutMs: 60000
    };
    
    const response = BigQuery.Jobs.query(request, projectId);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. In the **Services (+)** menu → add **BigQuery API**

### Step 2: Deploy the Apps Script

1. Click **Deploy → New deployment**
2. Select type: **Web app**
3. Configure:
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone (so Semantix can call it)
4. Click **Deploy** → Copy the **Web App URL**

The URL will look like: `https://script.google.com/macros/s/XXXXX/exec`

### Step 3: Grant BigQuery Permissions

The Google account running the Apps Script needs permissions on BigQuery:

1. Google Cloud Console → **IAM & Admin → IAM**
2. Find the email of the Google account used for the Apps Script
3. Click **Edit** → **Add another role**
4. Add two roles:
   - **BigQuery Data Viewer** — read data from tables
   - **BigQuery Job User** — execute queries

### Step 4: Connect in Semantix

1. Go to **Studio → DE → Connections → New Connection**
2. Select **BigQuery**
3. Paste the **Web App URL** into the `Webhook URL` field
4. Enter your **Project ID** (e.g. `my-company-analytics`)
5. Click **Test Connection**
6. Click **Save**

---

## Finding Your Project ID

In Google Cloud Console → the top bar shows the current project name → click it to see the **Project ID** (e.g. `my-company-analytics-123456`).

Or run:
```bash
gcloud config get-value project
```

---

## Browsing Schema After Connecting

After a successful connection, on the Semantix Connection detail page you can:
- View all **Datasets** in the project
- Expand each Dataset to see **Tables**
- View the **Schema** (column names, data types) for each table
- Click **Sync Schema** to refresh when the BigQuery schema changes

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `403 Forbidden` on Test Connection | Apps Script not deployed with "Anyone" access | Redeploy with Who has access = Anyone |
| `BigQuery API not enabled` | BigQuery API not enabled in GCP project | Google Cloud Console → APIs → Enable BigQuery API |
| `Access Denied` on queries | Google account missing BigQuery Data Viewer role | Add role in IAM |
| `Quota exceeded` | Exceeded free BigQuery query limits | Check BigQuery quotas in GCP Console |
| Timeout | BigQuery query running longer than 60 seconds | Optimize SQL or increase `timeoutMs` in the script |

---

## BigQuery Cost Optimization

BigQuery charges based on the amount of data scanned. To reduce costs:

1. **Use Partitioned Tables**: Create tables partitioned by date — queries only scan the needed partition
2. **Increase Cache TTL**: Set a high Cache TTL in Semantix (4–24 hours) — the same query only incurs costs once
3. **Clustered Tables**: Cluster on columns frequently used in WHERE
4. **Materialized Views**: Create materialized views for frequently-used complex aggregations

```sql
-- Example: create a date-partitioned table
CREATE TABLE `project.dataset.orders`
PARTITION BY DATE(created_at) AS
SELECT * FROM `project.dataset.orders_raw`;
```

---

## BigQuery SQL Differences

Semantix supports BigQuery Standard SQL. Some functions differ from PostgreSQL/MySQL:

| Operation | PostgreSQL/MySQL | BigQuery |
|-----------|-----------------|---------|
| Current date | `CURRENT_DATE` | `CURRENT_DATE()` |
| Subtract from date | `created_at - INTERVAL '7 days'` | `DATE_SUB(created_at, INTERVAL 7 DAY)` |
| Format date | `TO_CHAR(date, 'YYYY-MM')` | `FORMAT_DATE('%Y-%m', date)` |
| String concat | `a \|\| b` | `CONCAT(a, b)` |
| Null check | `COALESCE(a, 0)` | `IFNULL(a, 0)` |

> When writing Calculated Fields for BigQuery, use BigQuery Standard SQL syntax.
