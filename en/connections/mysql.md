# MySQL / MariaDB

Complete guide for connecting MySQL or MariaDB to Semantix.

---

## Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name shown in Semantix | |
| **Host** | Hostname or IP of the MySQL server | |
| **Port** | MySQL port | `3306` |
| **Database** | Name of the database to connect to | |
| **Username** | Login account | |
| **Password** | Password | |
| **SSL** | Enable/disable SSL connection | Off |
| **Default Cache TTL** | How long to cache query results (seconds) | `3600` |

---

## Connection Steps

1. Go to **Studio → DE → Connections → New Connection**
2. Select **MySQL**
3. Fill in all connection details
4. Click **Test Connection** — wait for "Connection successful"
5. Click **Save**

---

## Creating a Read-Only User

Always create a dedicated Semantix user with minimal SELECT permissions:

```sql
-- Create user, allow connections only from the Semantix server IP
CREATE USER 'semantix_reader'@'SEMANTIX_SERVER_IP' IDENTIFIED BY 'SecurePassword123!';

-- Grant SELECT on the entire database
GRANT SELECT ON your_database.* TO 'semantix_reader'@'SEMANTIX_SERVER_IP';

-- Apply immediately
FLUSH PRIVILEGES;
```

**Important notes:**
- Replace `SEMANTIX_SERVER_IP` with the actual Semantix server IP for better security
- Using `%` instead of a specific IP allows connections from any IP — not recommended for production
- Only grant SELECT, never INSERT/UPDATE/DELETE/DROP

**Verify the user was created correctly:**
```sql
SHOW GRANTS FOR 'semantix_reader'@'SEMANTIX_SERVER_IP';
```

---

## SSL Configuration

Enable SSL if the MySQL server requires it or if connecting over the internet:

```sql
-- Check SSL status on the MySQL server
SHOW VARIABLES LIKE 'have_ssl';
-- Value: YES → server supports SSL
-- Value: DISABLED → server does not support SSL
```

**Require SSL for a specific user:**
```sql
ALTER USER 'semantix_reader'@'SEMANTIX_SERVER_IP' REQUIRE SSL;
FLUSH PRIVILEGES;
```

---

## Whitelisting Semantix IP

### MySQL on a dedicated server

Check the `bind-address` setting in `/etc/mysql/mysql.conf.d/mysqld.cnf`:
```ini
# Allow connections from all IPs (then restrict via GRANT)
bind-address = 0.0.0.0
```

If you have a firewall (UFW):
```bash
sudo ufw allow from SEMANTIX_IP to any port 3306
```

### MySQL on AWS RDS

1. AWS Console → **RDS → Databases → Select instance**
2. Tab **Connectivity & security → VPC security groups**
3. Click the Security Group → **Inbound rules → Edit**
4. Add rule: **MySQL/Aurora (3306)** from Semantix IP/32
5. **Save rules**

### MySQL on Google Cloud SQL

1. Google Cloud Console → **SQL → Select instance → Connections**
2. **Authorized networks → Add network**
3. Enter the Semantix IP with a descriptive name
4. **Save**

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | MySQL not running or wrong host/port | Run `systemctl status mysql` on the server |
| `Access denied for user` | Wrong password or user not authorized from this IP | Check user and GRANT |
| `Host 'X' is not allowed` | Semantix IP not permitted to connect | Recreate user with `'@'SEMANTIX_IP'` |
| `Unknown database` | Wrong database name (case-sensitive on Linux) | Verify database name: `SHOW DATABASES;` |
| `SSL connection error` | SSL required but not enabled in Semantix | Enable SSL in connection settings |
| `Too many connections` | MySQL hit max_connections limit | Increase `max_connections` or use connection pooling |

**Verify from terminal before configuring Semantix:**
```bash
mysql -h HOST -P 3306 -u semantix_reader -p your_database
# Enter password → success if you see the mysql> prompt
```

---

## MariaDB

MariaDB is fully compatible with MySQL. Use the same MySQL connection configuration:

| Difference | MySQL | MariaDB |
|-----------|-------|---------|
| Default port | 3306 | 3306 (same) |
| SSL | Supported | Supported |
| JSON functions | v5.7.8+ | v10.2+ |
| Window functions | v8.0+ | v10.2+ |

> If using an older MariaDB version (< 10.2), some Calculated Fields using Window Functions may not work.

---

## Performance Optimization

To make AI-generated queries run faster, add indexes on columns frequently used in WHERE and GROUP BY:

```sql
-- Check large tables (many rows) in the database
SELECT table_name, table_rows
FROM information_schema.tables
WHERE table_schema = 'your_database'
ORDER BY table_rows DESC;

-- Add indexes on date/time columns (most commonly used)
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

> After adding indexes, queries with `WHERE created_at BETWEEN...` conditions will run significantly faster, especially on tables with millions of rows.
