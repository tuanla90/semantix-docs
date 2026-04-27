# BigQuery

Semantix connects to BigQuery via a **Google Apps Script proxy** or a **direct service account**.

## Connection via Apps Script (Recommended)

This method uses a Google Apps Script as a middleware between Semantix and BigQuery, which avoids exposing service account keys directly.

### Steps

1. Deploy the Semantix BigQuery Apps Script to your Google account
2. Copy the **Web App URL** from the Apps Script deployment
3. In Semantix: **Admin → Connections → New Connection → BigQuery**
4. Paste the Web App URL into the **Webhook URL** field
5. Click **Test Connection → Save**

## Required Fields

| Field | Description |
|-------|-------------|
| Webhook URL | The Apps Script Web App deployment URL |
| Project ID | Your GCP project ID (auto-detected after connection) |

## Permissions

The Google account running the Apps Script needs:
- **BigQuery Data Viewer** role on the datasets you want to query
- **BigQuery Job User** role to run queries

## Browsing Projects & Datasets

Once connected, Semantix can browse your BigQuery projects, datasets, and tables directly from the **Connection detail page** — no manual configuration needed.

> 💡 Semantix caches the table schema to speed up AI query generation. Refresh the schema from the connection detail page when your BigQuery schema changes.
