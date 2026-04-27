# PostgreSQL / Redshift

## PostgreSQL

### Required Fields

| Field | Description | Default |
|-------|-------------|---------|
| Host | Database server hostname or IP | |
| Port | Database port | `5432` |
| Database | Database name | |
| Username | Database user | |
| Password | Database password | |
| SSL | Enable SSL connection | Off |

### Steps

1. Go to **Admin → Connections → New Connection**
2. Select **PostgreSQL**
3. Fill in the connection details
4. Click **Test Connection**
5. Click **Save**

### SSL Configuration

If your PostgreSQL server requires SSL, toggle the **SSL** option on. Semantix connects with `rejectUnauthorized: false` by default (accepts self-signed certificates).

For stricter SSL, configure your PostgreSQL server to enforce client certificates and contact your admin.

### Permissions

Semantix only needs **read access** to the tables you want to query. We recommend creating a dedicated read-only user:

```sql
CREATE USER semantix_reader WITH PASSWORD 'your_password';
GRANT CONNECT ON DATABASE your_database TO semantix_reader;
GRANT USAGE ON SCHEMA public TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;

-- For future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

---

## Amazon Redshift

Redshift uses the same PostgreSQL protocol. Use the same configuration as PostgreSQL with these defaults:

| Field | Value |
|-------|-------|
| Port | `5439` |
| SSL | Always on |

> 💡 Make sure your Redshift cluster's security group allows inbound connections from your Semantix server IP.
