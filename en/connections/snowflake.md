# Snowflake

## Required Fields

| Field | Description | Default |
|-------|-------------|---------|
| Account | Snowflake account identifier (e.g. `xy12345.us-east-1`) | |
| Username | Snowflake user | |
| Password | User password | |
| Database | Database name | |
| Schema | Schema name | `PUBLIC` |
| Warehouse | Compute warehouse name | |
| Role | Snowflake role (optional) | |

## Steps

1. Go to **Admin → Connections → New Connection → Snowflake**
2. Fill in your account details
3. Click **Test Connection → Save**

## Finding Your Account Identifier

In Snowflake, go to **Admin → Accounts** and copy the account identifier. It looks like:

```
xy12345.us-east-1
```

or for newer accounts:

```
myorg-myaccount
```

## Permissions

Create a dedicated Semantix role with read-only access:

```sql
CREATE ROLE semantix_reader;
GRANT USAGE ON DATABASE your_db TO ROLE semantix_reader;
GRANT USAGE ON SCHEMA your_db.public TO ROLE semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA your_db.public TO ROLE semantix_reader;
GRANT ROLE semantix_reader TO USER semantix_user;
```
