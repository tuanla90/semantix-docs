# Connections

**Navigate to:** Studio → DE → Connections

A Connection tells Semantix where your data lives. This is the foundational step — every Data Model, Pipeline, and Data Template requires at least one Connection.

## Supported Data Sources

| Source | Details |
|--------|---------|
| PostgreSQL / MySQL / MSSQL | Host, port, database, user, password |
| BigQuery | JSON Service Account key |
| Google Sheets | Spreadsheet ID + Sheet name |
| DuckDB / SQLite | Local file path |
| Snowflake / Redshift / ClickHouse | Engine-specific connection parameters |

## Create a New Connection

1. Go to **Studio → DE → Connections → New Connection**
2. Select the **Engine Template** (see [Engine Templates](engine-templates.md))
3. Fill in connection details
4. Click **Test Connection** to verify
5. Click **Save**

## Connecting Google Sheets

Google Sheets requires granting access to Semantix's Service Account before connecting.

### Step 1 — Share with Service Account

Open your Google Sheet → click **Share** → paste:

```
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

Select **Viewer** permission → click **Send**.

### Step 2 — Get the Spreadsheet ID

The Spreadsheet ID is the string in the URL:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

### Step 3 — Create the Connection

Enter the Spreadsheet ID and Sheet Name in the form, then Test and Save.

## Database-Specific Guides

- [PostgreSQL / Redshift](../connections/postgresql.md)
- [MySQL](../connections/mysql.md)
- [BigQuery](../connections/bigquery.md)
- [Snowflake](../connections/snowflake.md)
- [ClickHouse](../connections/clickhouse.md)
- [Google Sheets](../connections/google-sheets.md)
- [Other Databases](../connections/others.md)
