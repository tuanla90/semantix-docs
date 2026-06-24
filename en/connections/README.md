# Supported Data Sources

Semantix connects directly to your database or data warehouse — no data copying required. Every query runs **real-time against your source**, ensuring data is always fresh.

---

## Data Sources

| Type | Engine / Database | Detailed Guide |
|------|------------------|----------------|
| **Relational databases** | PostgreSQL | [PostgreSQL / Redshift](postgresql.md) |
| | MySQL / MariaDB | [MySQL](mysql.md) |
| | SQL Server (MSSQL) | [Other Databases](others.md) |
| | SQLite | [Other Databases](others.md) |
| **Cloud data warehouses** | Google BigQuery | [BigQuery](bigquery.md) |
| | Snowflake | [Snowflake](snowflake.md) |
| | ClickHouse | [ClickHouse](clickhouse.md) |
| | Amazon Redshift | [PostgreSQL / Redshift](postgresql.md) |
| | Databricks | [Other Databases](others.md) |
| | Trino / Presto | [Other Databases](others.md) |
| **File / Spreadsheet** | Google Sheets | [Google Sheets](google-sheets.md) |
| | DuckDB | [Other Databases](others.md) |

---

## How Connections Work

Semantix **does not store your data**. When a user asks a question:

```
[User question]
        ↓
  AI generates SQL from Schema
        ↓
  SQL runs directly on your Database
        ↓
  Results returned to browser (optionally cached per TTL)
```

Only your **table structure (schema)** is sent to the AI — never actual row data.

---

## Managing Connections

### View All Connections

Go to **Studio → DE → Connections** to see all connections in the system.

Each connection shows:
- Name and database type
- Connection status (Healthy / Error)
- Last health check time
- Number of Data Models using this connection

### Create a New Connection

1. Click **New Connection** in the top right
2. Select your database type
3. Fill in connection details (host, port, user, password, database)
4. Click **Test Connection** — verify success before saving
5. Click **Save**

### Edit a Connection

Click the connection name → edit fields → **Save**.

> When you update connection credentials, all Data Models using this connection automatically use the new details.

### Delete a Connection

Click **⋮** next to the connection → **Delete**. A connection can only be deleted if no Data Models are currently using it.

---

## Credential Security

- All passwords and API keys are encrypted with **AES-256-GCM** before being stored
- The encryption key (`ENCRYPTION_KEY`) only exists on your server
- After saving, passwords are not displayed again — they can only be overwritten
- Credentials never appear in API responses or logs

---

## Cache & Performance

Each connection has a **Default Cache TTL** setting — how long query results are cached:

| TTL | Best For |
|-----|----------|
| `0` | Real-time data (transactions, stock, IoT) |
| `5 minutes` | Dashboards that need frequent updates |
| `1 hour` | Daily reporting dashboards |
| `24 hours` | Historical data that rarely changes |

> Cache is stored in Redis. Click **Refresh** (🔄) on a Dashboard to manually clear the cache.

---

## Creating a Read-Only User

Semantix only needs **SELECT** access — no INSERT, UPDATE, or DELETE. Always create a dedicated user with minimal permissions:

**PostgreSQL:**
```sql
CREATE USER semantix_reader WITH PASSWORD 'SecurePassword123!';
GRANT CONNECT ON DATABASE your_database TO semantix_reader;
GRANT USAGE ON SCHEMA public TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

**MySQL:**
```sql
CREATE USER 'semantix_reader'@'SEMANTIX_SERVER_IP' IDENTIFIED BY 'SecurePassword123!';
GRANT SELECT ON your_database.* TO 'semantix_reader'@'SEMANTIX_SERVER_IP';
FLUSH PRIVILEGES;
```

---

## Whitelisting Semantix IP

If your database is behind a firewall or security group (AWS, GCP, Azure), you need to **allow the Semantix server IP** to connect to the database port.

To find your Semantix server IP:
- If self-hosted: use the IP of the server running Semantix
- If cloud-hosted: contact support@semantix.vn for the IP list

---

## Next Steps

Select your database type for a detailed guide:

- [PostgreSQL / Redshift](postgresql.md)
- [MySQL / MariaDB](mysql.md)
- [BigQuery](bigquery.md)
- [Snowflake](snowflake.md)
- [ClickHouse](clickhouse.md)
- [Google Sheets](google-sheets.md)
- [SQL Server, DuckDB, Databricks, Trino](others.md)
