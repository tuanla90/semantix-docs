# 1. Creating a Connection

A Connection is the first step in setting up Semantix. It tells the system where to connect to query your data.

**Navigation:** Admin → Connections → **New Connection**

## Supported Data Sources

| Source Type | Connection Details |
|-------------|--------------------|
| PostgreSQL / MySQL / MSSQL | Requires host, port, database, user, password |
| BigQuery | Requires pasting your JSON Service Account key |
| Google Sheets | Requires Service Account access (see guide below) |
| DuckDB / SQLite | Local file path |
| Snowflake / Redshift / ClickHouse | Follow system-specific connection parameters |

## Google Sheets Connection (Important)

Google Sheets requires you to grant permission to the Semantix Service Account before connecting.

### Step 1 — Share the Google Sheet with the Service Account

Open your Google Sheet → click the **Share** button → paste the following address:

```text
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

Select **Viewer** access (read-only is sufficient) → click **Send**.

> **Note:** You must share your sheet with this specific address. Skipping this step will result in a "Permission denied" error during the connection test.

### Step 2 — Get the Spreadsheet ID

The Spreadsheet ID is the string of characters found in your Google Sheet's URL:

```text
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

For example, if the URL is `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit`  
→ The Spreadsheet ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

### Step 3 — Create the Connection in Semantix

1. Go to **Admin → Connections → New Connection**
2. Select **Google Sheets** as the type
3. Paste the **Spreadsheet ID** you copied above
4. Enter the **Sheet Name** (the specific tab you want to query, e.g., `Sheet1` or `Revenue`)
5. Click **Test Connection** to verify → then click **Save**
