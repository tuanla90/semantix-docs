# Kết Nối Dữ Liệu (Connections)

**Điều hướng:** Studio → DE → Connections

Connection khai báo cho Semantix biết nguồn dữ liệu nằm ở đâu. Đây là bước nền tảng — mọi Data Model, Pipeline, và Data Template đều cần có ít nhất một Connection.

## Các Loại Nguồn Dữ Liệu Hỗ Trợ

| Loại Nguồn | Chi Tiết |
|------------|----------|
| PostgreSQL / MySQL / MSSQL | Host, port, database, user, password |
| BigQuery | JSON Service Account key |
| Google Sheets | Spreadsheet ID + tên Sheet |
| DuckDB / SQLite | Đường dẫn file local |
| Snowflake / Redshift / ClickHouse | Thông số kết nối theo hệ thống |
| ClickHouse | HTTP endpoint, user, password |

## Tạo Connection Mới

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **Engine Template** phù hợp (xem [Engine Templates](engine-templates.md))
3. Điền thông tin kết nối
4. Nhấn **Test Connection** để kiểm tra
5. Nhấn **Save** để lưu

## Kết Nối Google Sheets

Google Sheets yêu cầu cấp quyền cho Service Account của Semantix trước khi kết nối.

### Bước 1 — Chia sẻ file với Service Account

Mở Google Sheet → nhấn **Share** → dán địa chỉ:

```
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

Chọn quyền **Viewer** → nhấn **Send**.

### Bước 2 — Lấy Spreadsheet ID

Spreadsheet ID là chuỗi ký tự trong URL:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

### Bước 3 — Tạo Connection

Điền Spreadsheet ID và Sheet Name vào form, rồi Test và Save.

## Chi Tiết Từng Nguồn Dữ Liệu

Xem hướng dẫn cấu hình chi tiết cho từng loại database:

- [PostgreSQL / Redshift](../connections/postgresql.md)
- [MySQL](../connections/mysql.md)
- [BigQuery](../connections/bigquery.md)
- [Snowflake](../connections/snowflake.md)
- [ClickHouse](../connections/clickhouse.md)
- [Google Sheets](../connections/google-sheets.md)
- [Các Database Khác](../connections/others.md)
