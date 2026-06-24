# Snowflake

Complete guide for connecting Snowflake Data Cloud to Semantix.

---

## Connection Fields

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | Friendly name shown in Semantix | |
| **Account** | Snowflake Account Identifier (e.g. `xy12345.us-east-1`) | |
| **Username** | Snowflake account | |
| **Password** | Password | |
| **Database** | Database name in Snowflake | |
| **Schema** | Schema name | `PUBLIC` |
| **Warehouse** | Virtual Warehouse name for running queries | |
| **Role** | Snowflake role (optional — uses default role if left blank) | |
| **Default Cache TTL** | How long to cache query results (seconds) | `3600` |

---

## Connection Steps

1. Go to **Studio → DE → Connections → New Connection**
2. Select **Snowflake**
3. Fill in all fields
4. Click **Test Connection**
5. Click **Save**

---

## Finding Your Account Identifier

The Account Identifier is the unique identifier for your Snowflake account. Two formats exist:

**Legacy format:**
```
xy12345.us-east-1
```

**New format (Organization):**
```
myorg-myaccount
```

**How to find it in the Snowflake UI:**
1. Log in to Snowflake
2. Click your account name in the bottom left
3. Copy the **Account Identifier** (not the full URL)

Or run in Snowflake:
```sql
SELECT CURRENT_ACCOUNT();
-- Result: XY12345
```

---

## Creating a Read-Only User and Role

**Best practice:** Create a dedicated role for Semantix with minimal permissions:

```sql
-- Step 1: Create the role
CREATE ROLE semantix_reader;

-- Step 2: Grant warehouse access
GRANT USAGE ON WAREHOUSE your_warehouse TO ROLE semantix_reader;

-- Step 3: Grant database access
GRANT USAGE ON DATABASE your_database TO ROLE semantix_reader;

-- Step 4: Grant schema access
GRANT USAGE ON SCHEMA your_database.PUBLIC TO ROLE semantix_reader;

-- Step 5: Grant SELECT on all existing tables
GRANT SELECT ON ALL TABLES IN SCHEMA your_database.PUBLIC TO ROLE semantix_reader;

-- Step 6: Grant SELECT on future tables
GRANT SELECT ON FUTURE TABLES IN SCHEMA your_database.PUBLIC TO ROLE semantix_reader;

-- Step 7: Create user and assign role
CREATE USER semantix_user
  PASSWORD = 'SecurePassword123!'
  DEFAULT_ROLE = semantix_reader
  DEFAULT_WAREHOUSE = your_warehouse
  MUST_CHANGE_PASSWORD = FALSE;

GRANT ROLE semantix_reader TO USER semantix_user;
```

**Verify permissions:**
```sql
SHOW GRANTS TO ROLE semantix_reader;
```

---

## Choosing the Right Warehouse

Snowflake charges based on warehouse running time. To optimize costs:

| Warehouse Size | Best For |
|----------------|----------|
| X-Small | Demo, development, small teams (< 10 users) |
| Small | Medium teams, moderately complex queries |
| Medium | Many concurrent dashboard users, complex queries |
| Large+ | Large-scale analytics, TB-scale data |

**Recommendation:** Create a dedicated warehouse for Semantix with **Auto Suspend = 60 seconds** to shut down automatically when idle:

```sql
CREATE WAREHOUSE semantix_wh
  WAREHOUSE_SIZE = 'X-SMALL'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
```

---

## Advanced Security

### Network Policy

Restrict connections to only the Semantix server IP:
```sql
CREATE NETWORK POLICY semantix_policy
  ALLOWED_IP_LIST = ('SEMANTIX_SERVER_IP/32');

ALTER USER semantix_user SET NETWORK_POLICY = semantix_policy;
```

### Key Pair Authentication (Password-Free)

Instead of a password, use an RSA key pair for higher security:
```sql
-- After uploading the public key:
ALTER USER semantix_user SET RSA_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...';
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `Incorrect username or password` | Wrong credentials | Try logging in to the Snowflake UI directly to confirm |
| `IP not allowed` | Network Policy blocking Semantix IP | Add Semantix IP to the Network Policy |
| `Warehouse not found` | Wrong warehouse name or warehouse deleted | Check `SHOW WAREHOUSES;` |
| `Schema does not exist` | Wrong schema name | Check `SHOW SCHEMAS IN DATABASE your_db;` |
| `Insufficient privileges` | Role missing required grants | Re-run the GRANT commands |
| `Account must not be empty` | Account Identifier not filled in | Enter the correct format (do not include `.snowflakecomputing.com`) |

---

## Snowflake Strengths

- **Multi-cluster**: Automatically scales to handle concurrent queries
- **Time Travel**: Query data at a point in the past (`AT TIMESTAMP => '2026-01-01'`)
- **Data Sharing**: Share data between Snowflake accounts without copying
- **Semi-structured Data**: Native support for JSON, Parquet, Avro via the VARIANT type

> When using VARIANT (JSON) columns, use this syntax in Semantix Calculated Fields: `column:field_name::STRING`
