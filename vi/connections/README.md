# Connections

A **Connection** is how Semantix accesses your data. You can connect to multiple databases and data sources simultaneously.

## Supported Data Sources

| Type | Engine |
|------|--------|
| **Relational** | PostgreSQL, MySQL, SQL Server (MSSQL), SQLite |
| **Cloud Data Warehouses** | BigQuery, Snowflake, Redshift, ClickHouse, Databricks, Trino/Presto |
| **File / Spreadsheet** | Google Sheets, DuckDB |
| **Other** | Webhook (custom HTTP adapter) |

## Managing Connections

Go to **Admin → Connections** to view, create, edit, or delete connections.

### Connection Health

Semantix automatically checks the health of each connection on a schedule. You can see the status (Healthy / Unhealthy) on the connections list page.

### Security

- All credentials are **encrypted at rest** using AES-256 before being stored in the database
- Connection configs are never exposed in API responses
- Each connection can be scoped to specific data models

## Next Steps

Pick your database type to get started:

- [PostgreSQL / Redshift](postgresql.md)
- [MySQL](mysql.md)
- [BigQuery](bigquery.md)
- [Snowflake](snowflake.md)
- [ClickHouse](clickhouse.md)
- [Google Sheets](google-sheets.md)
