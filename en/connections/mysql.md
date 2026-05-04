# MySQL

## Required Fields

| Field | Description | Default |
|-------|-------------|---------|
| Host | Database server hostname | |
| Port | Database port | `3306` |
| Database | Database name | |
| Username | Database user | |
| Password | Database password | |
| SSL | Enable SSL | Off |

## Steps

1. Go to **Admin → Connections → New Connection → MySQL**
2. Fill in the connection details
3. Click **Test Connection → Save**

## Permissions

```sql
CREATE USER 'semantix_reader'@'%' IDENTIFIED BY 'your_password';
GRANT SELECT ON your_database.* TO 'semantix_reader'@'%';
FLUSH PRIVILEGES;
```

> 💡 Replace `%` with your Semantix server's IP for tighter security.
