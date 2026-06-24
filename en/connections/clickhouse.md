# ClickHouse

Guide for connecting ClickHouse to Semantix — ideal for high-performance analytics on large datasets.

---

## Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name shown in Semantix | |
| **Host** | Hostname or IP of the ClickHouse server | |
| **Port** | HTTP interface port | `8443` (HTTPS) or `8123` (HTTP) |
| **Database** | Database name | |
| **Username** | ClickHouse account | `default` |
| **Password** | Password (leave blank if no password set) | |
| **Protocol** | `https` or `http` | `https` |
| **Default Cache TTL** | How long to cache query results (seconds) | `3600` |

---

## Connection Steps

1. Go to **Studio → DE → Connections → New Connection**
2. Select **ClickHouse**
3. Fill in the connection fields
4. Click **Test Connection**
5. Click **Save**

---

## HTTP vs HTTPS

Semantix connects to ClickHouse via the **HTTP interface** (not the native TCP protocol):

| Configuration | Port | When to Use |
|---------------|------|------------|
| `https` + `8443` | 8443 | **Recommended** — ClickHouse Cloud, production with SSL |
| `http` + `8123` | 8123 | Local/development, internal network connections |

**ClickHouse Cloud:** Always use `https` with port `8443`.

**Self-hosted ClickHouse:**
- Verify the port is open: `curl http://HOST:8123/ping` — response `Ok.` means it's working
- Verify HTTPS: `curl https://HOST:8443/ping`

---

## Creating a Read-Only User

```sql
-- Create user with read-only access
CREATE USER semantix_reader
IDENTIFIED WITH plaintext_password BY 'SecurePassword123!';

-- Grant SELECT on a specific database
GRANT SELECT ON your_database.* TO semantix_reader;

-- Grant schema visibility
GRANT SHOW ON your_database.* TO semantix_reader;
```

**If using ClickHouse Cloud**, create the user in the Cloud Console:
1. Go to Services → Select service → **SQL console**
2. Run the SQL commands above

---

## Firewall Configuration

**Self-hosted ClickHouse:**

Open the firewall for the Semantix IP:
```bash
# UFW
sudo ufw allow from SEMANTIX_IP to any port 8123
sudo ufw allow from SEMANTIX_IP to any port 8443

# iptables
iptables -A INPUT -s SEMANTIX_IP -p tcp --dport 8123 -j ACCEPT
iptables -A INPUT -s SEMANTIX_IP -p tcp --dport 8443 -j ACCEPT
```

In `/etc/clickhouse-server/config.xml`, ensure the HTTP interface is listening:
```xml
<http_port>8123</http_port>
<https_port>8443</https_port>
<listen_host>0.0.0.0</listen_host>
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Port not open or ClickHouse not running | Check `systemctl status clickhouse-server` |
| `Authentication failed` | Wrong username/password | Test directly: `curl http://HOST:8123/?user=semantix_reader&password=XXX&query=SELECT+1` |
| `SSL handshake failed` | HTTPS selected but server has no SSL | Switch to HTTP or install SSL on ClickHouse |
| `Database not found` | Wrong database name | Check: `SHOW DATABASES` in ClickHouse |
| `Code 516: Authentication failed` | User does not exist | Recreate user, verify: `SELECT * FROM system.users` |
| `Timeout` | Query running too long | Add indexes, narrow the data range in the query |

---

## ClickHouse Analytics Optimization

ClickHouse is designed for analytics, but needs proper configuration:

### 1. Use MergeTree Engine

```sql
-- Analytics-optimized table
CREATE TABLE orders (
    order_id    UInt64,
    customer_id UInt64,
    created_at  DateTime,
    amount      Decimal(10, 2),
    status      String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(created_at)
ORDER BY (customer_id, created_at);
```

### 2. Partition by Time

Partitioning by month means queries with date conditions only scan the needed partition:
```sql
PARTITION BY toYYYYMM(created_at)
```

### 3. Primary Key / Sorting Key

ClickHouse sorts data by `ORDER BY` — this is effectively the primary key. Put columns most commonly used in WHERE first:
```sql
ORDER BY (customer_id, created_at)
-- Query: WHERE customer_id = 123 → very fast
-- Query: WHERE created_at > '2026-01-01' → moderate speed
```

---

## Common ClickHouse Functions

In Calculated Fields and Metrics, ClickHouse has some powerful unique functions:

```sql
-- Count distinct
uniq(user_id)                          -- approximate, faster
countDistinct(user_id)                 -- exact

-- Quantile (percentile)
quantile(0.95)(response_time_ms)       -- P95 latency

-- Date operations
toStartOfMonth(created_at)            -- start of month
dateDiff('day', start_date, end_date) -- days between two dates
formatDateTime(created_at, '%Y-%m')   -- date formatting

-- String operations
splitByString(',', tags)[1]           -- get first element
arrayJoin(splitByString(',', tags))   -- unnest array
```

> When writing Calculated Fields for ClickHouse, use ClickHouse functions — not PostgreSQL/MySQL syntax.
