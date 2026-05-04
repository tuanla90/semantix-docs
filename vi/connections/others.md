# Các Database Khác

## SQL Server (MSSQL)

| Trường | Mặc Định |
|-------|---------|
| Host / Server | |
| Port | `1433` |
| Database | |
| Username | |
| Password | |
| Encrypt | Bật (On) |

## DuckDB

| Trường | Mô Tả | Mặc Định |
|-------|-------------|---------|
| File Path | Đường dẫn tới file `.duckdb` | `:memory:` |

> 💡 Chế độ in-memory của DuckDB (`:memory:`) rất hữu ích cho việc thử nghiệm với các file CSV hoặc Parquet trên máy cục bộ (local).

## Trino / Presto

| Trường | Mặc Định |
|-------|---------|
| Host | |
| Port | `443` (HTTPS) / `8080` (HTTP) |
| Catalog | |
| Schema | |
| Username | |
| Password | (tùy chọn) |
| Protocol | `https` |

## Databricks

| Trường | Mô Tả |
|-------|-------------|
| Host | URL của Databricks workspace (ví dụ: `adb-xxx.azuredatabricks.net`) |
| HTTP Path | Đường dẫn HTTP của SQL Warehouse |
| Token | Personal Access Token hoặc service principal token |

## SQLite

| Trường | Mô Tả |
|-------|-------------|
| File Path | Đường dẫn tuyệt đối tới file `.sqlite` / `.db` trên server |

> ⚠️ Các file SQLite phải có thể truy cập được từ hệ thống file của server Semantix.
