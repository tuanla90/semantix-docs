# ClickHouse

## Required Fields

| Field | Description | Default |
|-------|-------------|---------|
| Host | ClickHouse server hostname | |
| Port | HTTP interface port | `8443` (HTTPS) / `8123` (HTTP) |
| Database | Database name | |
| Username | ClickHouse user | |
| Password | User password | |
| Protocol | `https` or `http` | `https` |

## Steps

1. Go to **Admin → Connections → New Connection → ClickHouse**
2. Fill in the connection details
3. Click **Test Connection → Save**

> ⚠️ For ClickHouse Cloud, always use `https` with port `8443`.
