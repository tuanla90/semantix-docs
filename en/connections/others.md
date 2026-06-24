# Other Databases

Guide for connecting SQL Server, DuckDB, Databricks, Trino/Presto, and SQLite to Semantix.

---

## Microsoft SQL Server (MSSQL)

### Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name shown in Semantix | |
| **Host** | Hostname or IP of the SQL Server | |
| **Port** | SQL Server port | `1433` |
| **Database** | Database name | |
| **Username** | SQL Server account | |
| **Password** | Password | |
| **Encrypt** | Enable TLS connection encryption | On |
| **Trust Server Certificate** | Accept self-signed certificates | Off |

### Setup

1. Go to **Studio → DE → Connections → New Connection → SQL Server**
2. Fill in connection details
3. If you get an SSL error with a self-signed certificate: enable **Trust Server Certificate**
4. **Test Connection → Save**

### Creating a Read-Only User

```sql
-- Create login
CREATE LOGIN semantix_reader WITH PASSWORD = 'SecurePassword123!';

-- Create user in the specific database
USE your_database;
CREATE USER semantix_reader FOR LOGIN semantix_reader;

-- Grant SELECT permission
ALTER ROLE db_datareader ADD MEMBER semantix_reader;
```

### Whitelisting IP on Windows Server

Open Windows Firewall:
1. **Control Panel → Windows Firewall → Advanced Settings**
2. **Inbound Rules → New Rule**
3. Select Port → TCP → Specific local ports: `1433`
4. Allow the connection → from Semantix IP only

### SQL Server Troubleshooting

| Error | Solution |
|-------|----------|
| `Login failed for user` | Check SQL Server Authentication mode (must enable Mixed Mode) |
| `Cannot open database` | User not granted database access |
| `A network-related error` | Check firewall, verify SQL Server Browser service is running |
| `SSL Provider error` | Enable "Trust Server Certificate" in connection settings |

---

## DuckDB

DuckDB is an embedded database that runs inside a process — no separate server required. Ideal for local data analysis with CSV and Parquet files.

### Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name | |
| **File Path** | Absolute path to the `.duckdb` file on the server | `:memory:` |

### In-Memory Mode

Use `:memory:` to create a database that only exists in RAM — useful for quickly importing and analyzing CSV files:

```sql
-- Read a CSV file directly in DuckDB
SELECT * FROM read_csv_auto('/path/to/data.csv');

-- Read a Parquet file
SELECT * FROM parquet_scan('/path/to/data.parquet');

-- Read multiple files at once
SELECT * FROM read_csv_auto('/data/*.csv');
```

### File Path Requirements

The `.duckdb` file must be on the **same server running Semantix** and the Semantix process must have read access to the file.

---

## Databricks

### Connection Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Display Name** | Friendly name | |
| **Host** | Databricks workspace hostname | `adb-1234567890.12.azuredatabricks.net` |
| **HTTP Path** | SQL Warehouse HTTP path | `/sql/1.0/warehouses/abc123` |
| **Token** | Personal Access Token or Service Principal token | `dapi...` |
| **Catalog** | Unity Catalog name (if applicable) | `main` |
| **Schema** | Schema name | `default` |

### Getting the HTTP Path

1. In your Databricks workspace → **SQL Warehouses**
2. Select a warehouse → **Connection details** tab
3. Copy the **HTTP path**

### Getting a Personal Access Token

1. Databricks workspace → user avatar in top right → **Settings**
2. Tab **Developer → Access tokens → Generate new token**
3. Set a name and expiry → **Generate**
4. Copy the token (shown only once)

### Required Permissions

The account or service principal needs:
- `CAN USE` on the SQL Warehouse
- `SELECT` on the tables in the catalog/schema to query

---

## Trino / Presto

### Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name | |
| **Host** | Trino coordinator hostname | |
| **Port** | Trino port | `443` (HTTPS) / `8080` (HTTP) |
| **Catalog** | Catalog name (e.g. `hive`, `mysql`, `postgresql`) | |
| **Schema** | Schema name within the catalog | |
| **Username** | Username | |
| **Password** | Password (optional, depends on auth config) | |
| **Protocol** | `https` or `http` | `https` |

### Trino vs Presto

Trino (a fork of Presto) and PrestoSQL are protocol-compatible — use the same connection configuration. Semantix supports both.

### Trino Authentication Methods

Trino supports multiple authentication methods:
- **PASSWORD**: Username + password (configured in Trino `config.properties`)
- **CERTIFICATE**: Client certificate
- **KERBEROS**: Enterprise Hadoop environments
- **NONE**: No authentication (dev/test)

---

## SQLite

### Connection Fields

| Field | Description |
|-------|-------------|
| **Display Name** | Friendly name |
| **File Path** | Absolute path to the `.sqlite` or `.db` file on the server |

### Requirements

- The SQLite file must be on the **same server running Semantix**
- The Semantix process must have **read** access to the file
- The file path must be absolute (starting with `/`)

**Examples:**
```
/var/data/myapp.sqlite
/home/ubuntu/databases/analytics.db
```

### SQLite Limitations

- Poor support for concurrent multi-user access
- No native user/permission concept
- Best for: small applications, testing, quick analysis from mobile app exports

---

## Quick Comparison

| Database | Best For | Not Suited For |
|----------|----------|----------------|
| **SQL Server** | Enterprise Windows, ERP systems, SAP | Cloud-native, cost-sensitive workloads |
| **DuckDB** | CSV/Parquet file analysis, prototyping | Multi-user, production OLTP |
| **Databricks** | Big Data Lakehouse, ML + Analytics | Small data (overly expensive) |
| **Trino/Presto** | Querying multiple data sources simultaneously | Simple single-database analytics |
| **SQLite** | Dev, testing, small applications | Production, large datasets |
