# Connections

**Navigate to:** Studio → DE → Connections

A Connection tells Semantix where your data lives and how to authenticate. This is the foundational step — every Data Model, Pipeline, and Data Template requires at least one active Connection.

---

## Overview

Semantix supports connections to most popular database types. All credentials are **encrypted with AES-256** when stored — passwords are never shown again after saving.

### Supported Data Sources

| Source Type | Required Information | Notes |
|------------|---------------------|-------|
| **PostgreSQL** | Host, Port, Database, User, Password | SSL/TLS supported |
| **MySQL / MariaDB** | Host, Port, Database, User, Password | Default port: 3306 |
| **Microsoft SQL Server** | Host, Port, Database, User, Password | Default port: 1433 |
| **Amazon Redshift** | Host, Port, Database, User, Password | PostgreSQL-based |
| **BigQuery** | JSON Service Account Key | No host/port needed |
| **Snowflake** | Account, Warehouse, Database, User, Password | Requires Account identifier |
| **ClickHouse** | HTTP Endpoint, User, Password | HTTP and HTTPS supported |
| **Google Sheets** | Spreadsheet ID + Sheet name | Must share with Service Account |
| **DuckDB** | Path to `.duckdb` file | Local file use |
| **SQLite** | Path to `.sqlite` file | Local file use |

---

## Creating a New Connection

### Step 1 — Open the Creation Form

1. Go to **Studio** from the left sidebar.
2. Under **DE**, select **Connections**.
3. Click the **New Connection** button in the top-right corner.
4. A list of Engine Templates appears — select the database type that matches your system.

> **What is an Engine Template?** These are pre-built configurations for each database type. Admins can create custom templates (e.g., "AWS RDS PostgreSQL with SSL"). See [Engine Templates](engine-templates.md).

### Step 2 — Fill in Connection Details

**Common fields for all types:**

| Field | Required | Description |
|-------|----------|-------------|
| **Name** | Yes | Display name in Semantix (e.g., "Production Database", "Monthly Reports") |
| **Description** | No | Notes about the purpose of this Connection |

**Fields for PostgreSQL / MySQL / MSSQL / Redshift:**

| Field | Example | Notes |
|-------|---------|-------|
| **Host** | `db.company.com` or `192.168.1.100` | Database server address |
| **Port** | `5432` | Defaults: PG=5432, MySQL=3306, MSSQL=1433 |
| **Database** | `analytics_db` | Specific database name |
| **Username** | `semantix_readonly` | Use a read-only account |
| **Password** | `••••••••` | Encrypted when saved |
| **SSL Mode** | `require` | Recommended in production |
| **SSL Certificate** | (optional) | Paste certificate content if the server requires it |

**Fields for BigQuery:**

| Field | Description |
|-------|-------------|
| **Project ID** | Google Cloud Project ID |
| **Service Account JSON** | Paste the full content of the Service Account JSON file |
| **Dataset** | (Optional) Default dataset |

**Fields for Snowflake:**

| Field | Example | Notes |
|-------|---------|-------|
| **Account** | `abc12345.us-east-1` | Found in Snowflake Admin → Organization |
| **Warehouse** | `COMPUTE_WH` | Warehouse for running queries |
| **Database** | `ANALYTICS` | Snowflake database |
| **Schema** | `PUBLIC` | (Optional) |
| **Username** | `semantix_user` | |
| **Password** | `••••••••` | |

**Fields for ClickHouse:**

| Field | Example |
|-------|---------|
| **Host** | `clickhouse.company.com` |
| **Port** | `8123` (HTTP) or `8443` (HTTPS) |
| **Database** | `default` |
| **Username** | `semantix` |
| **Password** | `••••••••` |

### Step 3 — Test the Connection

Click **Test Connection**. Semantix will try to connect and return one of two results:
- ✅ **Connection successful** — Ready to use.
- ❌ **Connection failed** + a specific error message (wrong password, host unreachable, wrong port...).

### Step 4 — Configure Cache (Optional)

Before saving, you can set a **Default Cache TTL** — how long query results are stored in memory:

| TTL | Best For |
|-----|---------|
| `0` | Real-time data — no cache, every query goes directly to the DB |
| `5 minutes` | Frequently updated data |
| `1 hour` (default) | General analytics dashboards |
| `24 hours` | Daily reports, historical data |

### Step 5 — Save

Click **Save**. The Connection appears in the list with **Active** status.

---

## Connecting Google Sheets — Detailed Steps

Google Sheets requires an additional permission step. Follow these steps in order:

### Step 1 — Share the File with the Service Account

1. Open the Google Sheet you want to connect.
2. Click the **Share** button in the top-right corner.
3. In the "Add people and groups" field, paste the service account address:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
4. Change permission to **Viewer**.
5. Uncheck "Notify people" if you don't want an email sent.
6. Click **Share**.

### Step 2 — Get the Spreadsheet ID

Open the Google Sheets file in your browser. The URL looks like:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit#gid=0
```
The part `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms` is the **Spreadsheet ID**.

### Step 3 — Create the Connection in Semantix

1. Select the **Google Sheets** Engine Template.
2. Fill in:
   - **Spreadsheet ID**: The ID from Step 2.
   - **Sheet Name**: The name of the tab (sheet) to connect (e.g., `Revenue June`).
3. Click **Test Connection** → **Save**.

> **Note:** Each Google Sheets Connection connects to **one tab** only. If a file has multiple tabs you need, create separate Connections for each.

---

## Managing Connections

### View the List

The **Studio → DE → Connections** page lists all connections with:
- **Name** and **Engine Type**
- **Status** (Active / Inactive)
- **Number of Models** using this connection
- **Default Cache TTL**
- **Created by** and **Created date**

### Edit a Connection

1. Click the Connection name or the **Edit (✏️)** icon.
2. Update the information (new host, new password...).
3. Always **Test Connection** again after editing.
4. Click **Save**.

> **Note:** When editing a password, you must re-enter it in full since the old password is not shown.

### Delete a Connection

A Connection can only be deleted when **no Data Models are still using it**. If any models reference it, the system warns and lists those models.

---

## Network Architecture & Security

### IP Whitelist (Open Firewall)

Semantix connects from fixed IP addresses. You need to **whitelist these IPs** on your database firewall / security group.

Contact Semantix support to get the exact IP list for your environment.

### Connect via SSH Tunnel (Coming Soon)

If your database is not exposed to the internet, you can connect through an SSH tunnel. This feature is under development.

### Principle of Least Privilege

Create a dedicated database account for Semantix with **read-only permissions (SELECT only)**:

```sql
-- PostgreSQL
CREATE USER semantix_user WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE analytics_db TO semantix_user;
GRANT USAGE ON SCHEMA public TO semantix_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_user;

-- MySQL
CREATE USER 'semantix_user'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT ON analytics_db.* TO 'semantix_user'@'%';
FLUSH PRIVILEGES;
```

---

## Database-Specific Guides

See the full configuration guide for each database type:

- [PostgreSQL / Redshift](../connections/postgresql.md)
- [MySQL](../connections/mysql.md)
- [BigQuery](../connections/bigquery.md)
- [Snowflake](../connections/snowflake.md)
- [ClickHouse](../connections/clickhouse.md)
- [Google Sheets](../connections/google-sheets.md)
- [Other Databases](../connections/others.md)

---

## Common Connection Errors

| Error Message | Common Cause | Resolution |
|--------------|-------------|-----------|
| `Connection refused` | Database not running or wrong port | Check DB service is running, verify port |
| `Authentication failed` | Wrong username or password | Re-enter credentials |
| `Database not found` | Wrong database name | Verify exact database name (case-sensitive) |
| `SSL connection required` | Server requires SSL | Enable SSL Mode in the Connection |
| `Timeout` | IP blocked by firewall | Whitelist Semantix's IP address |
| `Permission denied` | User lacks SELECT permission | Grant additional permissions to the user |
| `Spreadsheet not found` | Google Sheets not shared correctly | Share with the service account email |
