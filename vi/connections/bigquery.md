# Google BigQuery

Hướng dẫn kết nối Google BigQuery với Semantix thông qua Google Apps Script proxy.

---

## Cách Kết Nối BigQuery

Semantix kết nối BigQuery qua một **Google Apps Script** đóng vai trò proxy. Apps Script chạy trong tài khoản Google của bạn và thực hiện truy vấn thay mặt Semantix — bạn không cần cấp service account key cho Semantix.

### Lý Do Dùng Apps Script Thay Vì Direct Connection

| Tiêu Chí | Apps Script Proxy | Direct Service Account |
|----------|-------------------|----------------------|
| Bảo mật | Tốt — không lộ key | Thấp hơn — key lưu trong Semantix |
| Cài đặt | Cần deploy script | Chỉ cần upload JSON key |
| Phù hợp | Google Workspace users | Môi trường on-premise không có internet |

---

## Thiết Lập — Apps Script Proxy (Khuyến Nghị)

### Bước 1: Tạo Google Apps Script

1. Mở [script.google.com](https://script.google.com) → **New Project**
2. Đặt tên project: `Semantix BigQuery Connector`
3. Xóa code mặc định và dán đoạn code proxy sau:

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const projectId = payload.projectId;
    const sql = payload.sql;
    
    const request = {
      query: sql,
      useLegacySql: false,
      timeoutMs: 60000
    };
    
    const response = BigQuery.Jobs.query(request, projectId);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Trong menu **Services (+)** → thêm **BigQuery API**

### Bước 2: Deploy Apps Script

1. Nhấn **Deploy → New deployment**
2. Chọn type: **Web app**
3. Cấu hình:
   - **Execute as**: Me (tài khoản Google của bạn)
   - **Who has access**: Anyone (để Semantix có thể gọi)
4. Nhấn **Deploy** → Copy **Web App URL**

URL sẽ có dạng: `https://script.google.com/macros/s/XXXXX/exec`

### Bước 3: Cấp Quyền BigQuery

Tài khoản Google chạy Apps Script cần có quyền trên BigQuery:

1. Google Cloud Console → **IAM & Admin → IAM**
2. Tìm email của tài khoản Google đang dùng Apps Script
3. Nhấn **Edit** → **Add another role**
4. Thêm hai role:
   - **BigQuery Data Viewer** — đọc dữ liệu từ tables
   - **BigQuery Job User** — thực thi queries

### Bước 4: Kết Nối Trong Semantix

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **BigQuery**
3. Dán **Web App URL** vào trường `Webhook URL`
4. Điền **Project ID** của GCP project (ví dụ: `my-company-analytics`)
5. Nhấn **Test Connection**
6. Nhấn **Save**

---

## Cách Tìm Project ID

Trong Google Cloud Console → thanh trên cùng → tên project hiển thị → nhấn vào để xem **Project ID** (ví dụ: `my-company-analytics-123456`).

Hoặc chạy lệnh:
```bash
gcloud config get-value project
```

---

## Duyệt Schema Sau Khi Kết Nối

Sau khi kết nối thành công, trong trang Connection detail của Semantix bạn có thể:
- Xem danh sách **Datasets** trong project
- Mở từng Dataset để xem **Tables**
- Xem **Schema** (tên cột, kiểu dữ liệu) của từng table
- Nhấn **Sync Schema** để cập nhật khi schema BigQuery thay đổi

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `403 Forbidden` khi Test Connection | Apps Script chưa được deploy với quyền "Anyone" | Redeploy với Who has access = Anyone |
| `BigQuery API not enabled` | BigQuery API chưa bật trong GCP project | Google Cloud Console → APIs → Enable BigQuery API |
| `Access Denied` trong truy vấn | Tài khoản Google thiếu role BigQuery Data Viewer | Thêm role trong IAM |
| `Quota exceeded` | Vượt giới hạn query BigQuery miễn phí | Kiểm tra BigQuery quotas trong GCP Console |
| Timeout | Query BigQuery chạy quá 60 giây | Tối ưu SQL hoặc tăng `timeoutMs` trong script |

---

## Tối Ưu Chi Phí BigQuery

BigQuery tính phí theo lượng dữ liệu scan. Để giảm chi phí:

1. **Dùng Partitioned Tables**: Tạo bảng với partition theo ngày — query chỉ scan partition cần thiết
2. **Tăng Cache TTL**: Đặt Cache TTL cao trong Semantix (4-24 giờ) — cùng query chỉ tốn phí một lần
3. **Clustered Tables**: Cluster theo cột thường dùng trong WHERE
4. **Materialized Views**: Tạo materialized view cho các aggregate query phức tạp thường dùng

```sql
-- Ví dụ tạo partitioned table theo ngày
CREATE TABLE `project.dataset.orders`
PARTITION BY DATE(created_at) AS
SELECT * FROM `project.dataset.orders_raw`;
```

---

## Điểm Khác Biệt SQL BigQuery

Semantix hỗ trợ BigQuery Standard SQL. Một số hàm khác với PostgreSQL/MySQL:

| Tác Vụ | PostgreSQL/MySQL | BigQuery |
|--------|-----------------|---------|
| Ngày hiện tại | `CURRENT_DATE` | `CURRENT_DATE()` |
| Trừ ngày | `created_at - INTERVAL '7 days'` | `DATE_SUB(created_at, INTERVAL 7 DAY)` |
| Định dạng ngày | `TO_CHAR(date, 'YYYY-MM')` | `FORMAT_DATE('%Y-%m', date)` |
| String concat | `a \|\| b` | `CONCAT(a, b)` |
| Kiểm tra NULL | `COALESCE(a, 0)` | `IFNULL(a, 0)` |

> Khi viết Calculated Fields cho BigQuery, sử dụng cú pháp BigQuery Standard SQL.
