# Other Databases

## SQL Server (MSSQL)

| Field | Default |
|-------|---------|
| Host / Server | |
| Port | `1433` |
| Database | |
| Username | |
| Password | |
| Encrypt | On |

## DuckDB

| Field | Description | Default |
|-------|-------------|---------|
| File Path | Path to `.duckdb` file | `:memory:` |

> 💡 DuckDB in-memory mode (`:memory:`) is useful for testing with local CSV or Parquet files.

## Trino / Presto

| Field | Default |
|-------|---------|
| Host | |
| Port | `443` (HTTPS) / `8080` (HTTP) |
| Catalog | |
| Schema | |
| Username | |
| Password | (optional) |
| Protocol | `https` |

## Databricks

| Field | Description |
|-------|-------------|
| Host | Databricks workspace URL (e.g. `adb-xxx.azuredatabricks.net`) |
| HTTP Path | SQL Warehouse HTTP path |
| Token | Personal Access Token or service principal token |

## SQLite

| Field | Description |
|-------|-------------|
| File Path | Absolute path to the `.sqlite` / `.db` file on the server |

> ⚠️ SQLite files must be accessible from the Semantix server filesystem.
