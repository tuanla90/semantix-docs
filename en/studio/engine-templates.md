# Engine Templates

**Navigate to:** Studio → DE → Engine Templates

Engine Templates are reusable connection configuration presets for specific database engine types. Instead of entering all technical parameters each time you create a Connection, you define an Engine Template once and reuse it.

## Purpose

Engine Templates are useful when:
- Multiple connections use the same engine type (e.g., all PostgreSQL on AWS RDS)
- You want to standardize connection settings (SSL, timeout, pool size...) across the organization
- You want to hide complex technical parameters from users when creating Connections

## Create a New Engine Template

1. Go to **Studio → DE → Engine Templates → New Template**
2. Fill in the details:

| Field | Description |
|-------|-------------|
| **Name** | Template name (e.g., `AWS RDS PostgreSQL`) |
| **Engine Type** | Database type: PostgreSQL, MySQL, BigQuery, Snowflake, etc. |
| **Icon** | Display icon |
| **Default Config** | Default configuration (JSON) — host, port, SSL, pool size... |
| **Active** | Enable/disable this template |

3. Click **Save**.

## Managing Templates

- **Toggle on/off**: Disable a template to hide it from the dropdown when creating new Connections.
- **Edit**: Update the default configuration.
- **Delete**: Can only be deleted when no Connections are using this template.

## Note

Engine Templates serve as the foundation for the **Connections** module. When creating a new Connection, users select an Engine Template first, then only need to fill in specific credentials.
