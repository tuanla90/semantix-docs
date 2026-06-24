# PostgreSQL / Amazon Redshift

Complete guide for connecting PostgreSQL or Amazon Redshift to Semantix.

---

## PostgreSQL

### Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name shown in Semantix (e.g. "Production DB") | |
| **Host** | Hostname or IP of the PostgreSQL server | |
| **Port** | Port PostgreSQL is listening on | `5432` |
| **Database** | Name of the database to connect to | |
| **Username** | Database login account | |
| **Password** | Account password | |
| **SSL** | Enable/disable SSL connection | Off |
| **Default Cache TTL** | How long to cache query results (seconds) | `3600` |

### Connection Steps

1. Go to **Studio → DE → Connections → New Connection**
2. Select **PostgreSQL**
3. Fill in all fields above
4. Click **Test Connection** — wait for "Connection successful"
5. Click **Save**

### SSL Configuration

**When to enable SSL:**
- The PostgreSQL server requires SSL (`ssl = on` in `postgresql.conf`)
- Connecting over the internet (not internal network)
- Database is on a cloud provider (AWS RDS, Google Cloud SQL, Azure Database)

**When SSL is enabled, Semantix will:**
- Encrypt all traffic between Semantix and PostgreSQL
- Accept both self-signed and CA-signed certificates

**Check if PostgreSQL requires SSL:**
```sql
SHOW ssl;
-- Result: on → enable SSL in Semantix
```

### Creating a Read-Only User (Recommended)

Semantix only needs **SELECT** access. Create a dedicated user to minimize risk:

```sql
-- Create user
CREATE USER semantix_reader WITH PASSWORD 'SecurePassword123!';

-- Grant connection to the database
GRANT CONNECT ON DATABASE your_database TO semantix_reader;

-- Grant schema access
GRANT USAGE ON SCHEMA public TO semantix_reader;

-- Grant SELECT on all existing tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;

-- Grant SELECT on tables created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

If your data spans multiple schemas:
```sql
-- Repeat for each schema
GRANT USAGE ON SCHEMA your_schema TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA your_schema TO semantix_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA your_schema
  GRANT SELECT ON TABLES TO semantix_reader;
```

### Whitelisting Semantix IP

If PostgreSQL is behind a firewall or on AWS/GCP/Azure, allow the Semantix server IP to connect:

**In `pg_hba.conf`:**
```
# Allow Semantix IP to connect with SSL
hostssl  your_database  semantix_reader  SEMANTIX_IP/32  scram-sha-256
```

**On AWS RDS:** Go to Security Group → Inbound rules → Add rule: PostgreSQL (5432) from Semantix IP.

**On Google Cloud SQL:** Go to Connections → Authorized networks → Add Semantix IP.

### Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Server not running or wrong host/port | Run `pg_ctl status` on the server, verify host/port |
| `authentication failed` | Wrong username/password | Test with `psql -h host -U user` to confirm credentials |
| `no pg_hba.conf entry` | Semantix IP not whitelisted | Add IP to `pg_hba.conf` then run `pg_ctl reload` |
| `SSL required` | Server requires SSL but it's not enabled in Semantix | Enable SSL in connection settings |
| `permission denied for table` | User missing SELECT permission | Re-run the GRANT SELECT commands |
| `database does not exist` | Wrong database name | Verify the database name (case-sensitive) |

### Verify from Terminal

Before connecting in Semantix, confirm credentials from the server terminal:
```bash
psql -h HOST -p 5432 -U semantix_reader -d your_database
# Enter password when prompted
# Success → prompt shows: your_database=>
```

---

## Amazon Redshift

Redshift uses the same PostgreSQL protocol but with some important differences.

### Connection Parameters

| Field | Value |
|-------|-------|
| **Host** | Redshift cluster endpoint (e.g. `cluster.abc123.us-east-1.redshift.amazonaws.com`) |
| **Port** | `5439` (Redshift default — different from PostgreSQL) |
| **Database** | Database name in Redshift (usually `dev` or `analytics`) |
| **Username** | Master user or a dedicated Semantix user |
| **Password** | Password |
| **SSL** | **Always enable** — Redshift requires SSL |

### Finding the Redshift Endpoint

In AWS Console → **Amazon Redshift → Clusters → Cluster name → Properties tab → Endpoint**. Copy the host portion (excluding port `:5439`).

### Creating a Read-Only User on Redshift

```sql
-- Create user
CREATE USER semantix_reader PASSWORD 'SecurePassword123!';

-- Grant schema access
GRANT USAGE ON SCHEMA public TO semantix_reader;

-- Grant SELECT on all tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;
```

### Whitelisting IP on AWS

1. Go to AWS Console → **EC2 → Security Groups**
2. Find the Security Group for your Redshift cluster
3. Tab **Inbound rules → Edit inbound rules**
4. Add rule:
   - Type: **Redshift**
   - Port: `5439`
   - Source: Semantix IP/32
5. **Save rules**

### Redshift vs PostgreSQL Differences

| Aspect | PostgreSQL | Redshift |
|--------|-----------|---------|
| Default port | 5432 | 5439 |
| SSL | Optional | Required |
| SQL dialect | Standard SQL | Supports some unique functions (LISTAGG, APPROXIMATE COUNT…) |
| Performance | Best for OLTP | Optimized for large analytical queries |
| Schema browser | psql | Redshift Query Editor |
