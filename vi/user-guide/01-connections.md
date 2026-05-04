# 1. Tạo Connection (Kết Nối Dữ Liệu)

Connection là bước đầu tiên trong quá trình thiết lập Semantix. Nó khai báo cho hệ thống biết nguồn dữ liệu cần truy vấn nằm ở đâu.

**Điều hướng:** Admin → Connections → **New Connection**

## Các Loại Nguồn Dữ Liệu Hỗ Trợ

| Loại Nguồn | Chi Tiết Kết Nối |
|------------|------------------|
| PostgreSQL / MySQL / MSSQL | Yêu cầu host, port, database, user, password |
| BigQuery | Dán trực tiếp chuỗi JSON Service Account key |
| Google Sheets | Yêu cầu cấp quyền cho Service Account (xem hướng dẫn bên dưới) |
| DuckDB / SQLite | Đường dẫn file local |
| Snowflake / Redshift / ClickHouse | Cung cấp thông số kết nối theo từng hệ thống cụ thể |

## Kết Nối Google Sheets (Quan Trọng)

Google Sheets yêu cầu bạn cấp quyền cho Service Account của Semantix trước khi kết nối thành công.

### Bước 1 — Chia sẻ file Google Sheet với Service Account

Mở Google Sheet của bạn → nhấn nút **Share (Chia sẻ)** → dán địa chỉ sau:

```text
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

Chọn quyền **Viewer (Người xem)** (chỉ cần đọc dữ liệu) → nhấn **Send (Gửi)**.

> **Lưu ý:** Phải chia sẻ đúng địa chỉ này. Nếu thiếu bước này, Semantix sẽ báo lỗi "Permission denied" khi kiểm tra kết nối.

### Bước 2 — Lấy Spreadsheet ID

Spreadsheet ID là chuỗi ký tự nằm trong đường dẫn (URL) của Google Sheet:

```text
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

Ví dụ URL là `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit`  
→ Spreadsheet ID sẽ là: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

### Bước 3 — Tạo Connection trong Semantix

1. Vào **Admin → Connections → New Connection**
2. Chọn loại kết nối là **Google Sheets**
3. Dán **Spreadsheet ID** vừa lấy ở trên vào ô tương ứng
4. Nhập **Sheet Name** (tên tab/sheet cụ thể cần truy vấn, ví dụ: `Sheet1` hoặc `Doanh thu`)
5. Nhấn **Test Connection** để kiểm tra và xác nhận → nhấn **Save** để lưu lại
