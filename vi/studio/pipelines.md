# Data Pipelines

**Điều hướng:** Studio → DE → Data Pipelines

Data Pipeline là công cụ tự động hóa việc **đồng bộ dữ liệu** từ nguồn (source) sang đích (destination) theo lịch định sẵn hoặc kích hoạt thủ công. Phù hợp khi bạn cần chuyển dữ liệu định kỳ giữa các hệ thống.

---

## Khi Nào Dùng Data Pipeline?

| Tình Huống | Ví Dụ |
|-----------|--------|
| **Đồng bộ database → Google Sheets** | Tự động xuất báo cáo doanh thu hàng ngày vào Google Sheets để chia sẻ với Ban Giám đốc |
| **ETL giữa 2 database** | Chuyển dữ liệu từ hệ thống vận hành (PostgreSQL) sang data warehouse (BigQuery) |
| **Tự động hóa Data Template** | Chạy một Data Template với tham số cố định và đẩy kết quả đến đích |
| **Làm mới dữ liệu phân tích** | Cập nhật bảng tổng hợp theo giờ hoặc theo ngày |

---

## Các Khái Niệm Cơ Bản

| Khái Niệm | Ý Nghĩa |
|-----------|---------|
| **Source** | Nguồn dữ liệu — một Connection (database hoặc Sheets) hoặc Data Template |
| **Destination** | Đích nhận — Connection database có quyền ghi, hoặc Google Sheets |
| **Schedule (Cron)** | Lịch chạy tự động — biểu thức cron |
| **Sync** | Một lần chạy pipeline — đọc nguồn, ghi vào đích |
| **Write Mode** | Cách ghi vào đích: Overwrite (ghi đè), Append (thêm vào), Upsert (thêm/cập nhật) |

---

## Tạo Pipeline Mới

### Bước 1 — Khởi Tạo

1. Vào **Studio → DE → Data Pipelines → New Pipeline**.
2. Điền thông tin cơ bản:

| Trường | Bắt Buộc | Ví Dụ |
|--------|----------|--------|
| **Name** | Có | `Báo cáo Doanh thu Hàng ngày → Sheets` |
| **Description** | Không | `Mỗi sáng 7h xuất báo cáo doanh thu hôm qua vào Google Sheets` |

### Bước 2 — Cấu Hình Source (Nguồn)

Chọn một trong các loại nguồn:

#### Option A — Database Query

Truy vấn trực tiếp từ một Connection:

1. Chọn **Source Type: Database Query**.
2. Chọn **Connection** (database nguồn).
3. Chọn **Table** (lấy toàn bộ bảng) hoặc **Custom SQL** (viết câu truy vấn tùy chỉnh).

Ví dụ Custom SQL:
```sql
SELECT 
  DATE(order_date) AS ngay,
  SUM(revenue) AS doanh_thu,
  COUNT(DISTINCT order_id) AS so_don,
  COUNT(DISTINCT customer_id) AS so_khach
FROM don_hang
WHERE 
  status IN ('paid', 'delivered')
  AND DATE(order_date) = CURDATE() - INTERVAL 1 DAY
GROUP BY DATE(order_date)
```

#### Option B — Data Template

Dùng một Data Template đã có với tham số đặt sẵn:

1. Chọn **Source Type: Data Template**.
2. Chọn **Data Template** từ danh sách.
3. Điền các **tham số cố định** (ví dụ: `from_date = yesterday`, `branch = ALL`).

#### Option C — Google Sheets Source

Lấy dữ liệu từ Google Sheet làm nguồn:

1. Chọn **Source Type: Google Sheets**.
2. Chọn Connection Google Sheets.
3. Chọn Sheet (tab) cần đọc.

### Bước 3 — Cấu Hình Destination (Đích)

#### Option A — Database Destination

Ghi dữ liệu vào một bảng trong database:

| Trường | Ví Dụ | Mô Tả |
|--------|--------|--------|
| **Connection** | `Analytics DB` | Connection có quyền ghi (INSERT/UPDATE) |
| **Table Name** | `daily_revenue_report` | Tên bảng đích (sẽ tạo mới nếu chưa có) |
| **Write Mode** | Overwrite | Cách ghi (xem bảng bên dưới) |

**Write Modes:**

| Mode | Hành Vi | Dùng Khi |
|------|---------|---------|
| **Overwrite** | Xóa toàn bộ bảng đích, ghi lại từ đầu | Báo cáo snapshot — mỗi lần ghi là toàn bộ dữ liệu |
| **Append** | Thêm dữ liệu mới vào cuối bảng | Log, dữ liệu tích lũy theo thời gian |
| **Upsert** | Cập nhật nếu đã có, thêm mới nếu chưa có (dựa trên primary key) | Đồng bộ dữ liệu thay đổi, tránh trùng lặp |

#### Option B — Google Sheets Destination

Ghi dữ liệu vào Google Sheets:

| Trường | Ví Dụ | Mô Tả |
|--------|--------|--------|
| **Connection** | `Sheets Report` | Connection Google Sheets đích |
| **Sheet Name** | `Báo cáo Tự động` | Tên tab để ghi dữ liệu |
| **Start Cell** | `A1` | Ô bắt đầu ghi (mặc định A1) |
| **Include Headers** | Có | Dòng đầu tiên là tên cột |
| **Clear Before Write** | Có | Xóa nội dung cũ trước khi ghi mới |

### Bước 4 — Cấu Hình Schedule (Lịch Tự Động)

Dùng **cron expression** để đặt lịch chạy tự động:

| Biểu Thức Cron | Ý Nghĩa |
|----------------|---------|
| `0 7 * * *` | Mỗi ngày lúc 7:00 sáng |
| `0 8 * * 1` | Mỗi Thứ Hai lúc 8:00 sáng |
| `0 1 1 * *` | Ngày 1 hàng tháng lúc 1:00 sáng |
| `0 */4 * * *` | Mỗi 4 giờ một lần |
| `30 17 * * 1-5` | Thứ Hai đến Thứ Sáu lúc 17:30 |
| `0 0 * * *` | Mỗi ngày lúc nửa đêm |

**Cú pháp cron:** `phút giờ ngày-trong-tháng tháng ngày-trong-tuần`
- `*` = mọi giá trị
- `*/4` = mỗi 4 đơn vị
- `1-5` = từ 1 đến 5
- `1,15` = ngày 1 và ngày 15

**Múi Giờ:** Cron chạy theo múi giờ của server. Kiểm tra cài đặt múi giờ hệ thống trong Admin → Config.

Nếu không muốn chạy tự động, để trống Schedule — chỉ chạy thủ công.

### Bước 5 — Cài Đặt Nâng Cao

| Cài Đặt | Mô Tả |
|---------|--------|
| **Max Rows** | Giới hạn số dòng tối đa mỗi lần sync (bảo vệ tránh đồng bộ quá nhiều) |
| **Timeout** | Thời gian tối đa mỗi lần sync được phép chạy |
| **Email Notification** | Gửi email khi sync thành công hoặc thất bại |
| **On Failure** | Hành động khi thất bại: tiếp tục lần sau (ignore) hoặc tắt pipeline (pause) |

### Bước 6 — Lưu

Nhấn **Save**. Pipeline xuất hiện trong danh sách với trạng thái.

---

## Chạy Pipeline

### Chạy Thủ Công (Sync Ngay)

1. Trong danh sách Pipelines, tìm pipeline cần chạy.
2. Nhấn nút **▶ Run Sync** (hoặc mở pipeline → nhấn **Run Sync**).
3. Semantix bắt đầu đọc nguồn và ghi vào đích.
4. Xem tiến trình và kết quả trong phần **Sync History**.

### Kết Quả Sau Sync

Sau mỗi lần chạy, xem:
- **Số bản ghi đã đồng bộ** (rows synced)
- **Thời gian thực thi** (duration)
- **Trạng thái**: Success, Failed, Partial
- **Log lỗi** (nếu có)

---

## Quản Lý Pipelines

### Danh Sách Pipeline

Trang Pipelines hiển thị:
- Tên pipeline
- Trạng thái **Last Run**: Thành công ✅ / Thất bại ❌ / Chưa chạy ⚪
- **Next Run**: Lịch chạy tiếp theo
- **Rows Synced**: Số bản ghi lần chạy cuối
- Nút **Run Sync** và **Edit**

### Lịch Sử Sync (Sync History)

Mở pipeline → tab **History** → xem danh sách tất cả lần chạy:
- Thời gian bắt đầu và kết thúc
- Số dòng đã đồng bộ
- Trạng thái và log lỗi nếu thất bại

### Tạm Dừng Pipeline

Toggle **Active** → Off để tạm dừng lịch tự động. Pipeline vẫn có thể chạy thủ công.

---

## Phân Quyền Pipeline

| Cấp Độ | Quyền |
|--------|--------|
| **Owner** | Toàn quyền: xem, chỉnh sửa, xóa, chạy |
| **Approver** | Phê duyệt Change Requests trước khi thay đổi được áp dụng |
| **Editor** | Chỉnh sửa cấu hình, chạy sync |
| **Viewer** | Chỉ xem lịch sử và cấu hình, không chạy được |

---

## Change Requests (Quy Trình Phê Duyệt)

Nếu pipeline được cấu hình yêu cầu phê duyệt (Change Request workflow), mọi thay đổi sẽ không áp dụng ngay mà cần qua bước:

1. Editor thực hiện thay đổi → nhấn **Submit for Review**.
2. Approver xem xét → **Approve** hoặc **Reject** (có thể ghi chú lý do).
3. Nếu Approve → thay đổi được áp dụng, lịch sử ghi lại.

Tính năng này hữu ích cho pipelines quan trọng, tránh thay đổi nhầm ảnh hưởng production.

---

## Ví Dụ Pipeline Thực Tế

### Pipeline 1: Báo Cáo Doanh Thu Hàng Ngày

```
Name: Daily Revenue Report → Google Sheets
Source: Database Query (PostgreSQL Production)
SQL:
  SELECT DATE(order_date) as ngay, region, SUM(revenue) as doanh_thu
  FROM don_hang
  WHERE DATE(order_date) = CURDATE() - INTERVAL 1 DAY
    AND status = 'paid'
  GROUP BY ngay, region

Destination: Google Sheets "Báo cáo Tự động" → Sheet "Doanh thu"
Write Mode: Append (thêm vào cuối — lưu lịch sử theo ngày)
Schedule: 0 7 * * * (7:00 sáng mỗi ngày)
Notification: Email khi thất bại
```

### Pipeline 2: Đồng Bộ Dữ Liệu Vào Data Warehouse

```
Name: Orders → BigQuery (Daily)
Source: Database Query (MySQL Production)
SQL:
  SELECT * FROM don_hang
  WHERE DATE(updated_at) = CURDATE() - INTERVAL 1 DAY

Destination: BigQuery "analytics" → Table "orders_daily"
Write Mode: Append
Schedule: 0 2 * * * (2:00 sáng mỗi ngày)
```

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Cách Xử Lý |
|-----|-------------|------------|
| `Connection refused` | Database nguồn/đích không trả lời | Kiểm tra Connection còn hoạt động |
| `Permission denied` | User không có quyền ghi vào bảng đích | Cấp quyền INSERT/UPDATE cho user |
| `Table not found` | Bảng đích chưa tồn tại | Bật tùy chọn "Auto Create Table" hoặc tạo bảng trước |
| `Row count mismatch` | Nguồn thay đổi trong khi đang sync | Bình thường — lần sync tiếp sẽ đồng bộ phần còn lại |
| `Timeout` | Query nguồn chạy quá lâu | Thêm điều kiện lọc vào SQL để giảm dữ liệu |
| `Sheets quota exceeded` | Vượt giới hạn ghi Google Sheets API | Giảm tần suất chạy pipeline |
