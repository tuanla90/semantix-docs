# Google Sheets

Hướng dẫn kết nối Google Sheets như một nguồn dữ liệu trong Semantix.

---

## Tổng Quan

Semantix đọc Google Sheets thông qua **Service Account** — một tài khoản kỹ thuật không cần đăng nhập tương tác. Bạn chia sẻ file Google Sheets cho service account, Semantix sẽ đọc được dữ liệu từ đó.

**Service Account của Semantix:**
```
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

> Đây là địa chỉ email cố định bạn cần chia sẻ file Google Sheets cho.

---

## Các Bước Kết Nối

### Bước 1: Chia Sẻ File Google Sheets

1. Mở file Google Sheets muốn kết nối
2. Nhấn nút **Share** (hoặc **Chia sẻ**) ở góc trên phải
3. Trong ô "Add people and groups", nhập:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
4. Đổi quyền từ **Editor** thành **Viewer**
5. **Bỏ tích** "Notify people" (không cần gửi email thông báo)
6. Nhấn **Share** (hoặc **Chia sẻ**)

### Bước 2: Lấy Spreadsheet ID

Mở file Google Sheets → nhìn vào URL trên trình duyệt:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
```
Phần giữa `/d/` và `/edit` là **Spreadsheet ID**:
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

### Bước 3: Kết Nối Trong Semantix

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **Google Sheets**
3. Điền các trường:

| Trường | Giá Trị |
|--------|---------|
| **Display Name** | Tên hiển thị (ví dụ: "Báo cáo Doanh thu Q4") |
| **Spreadsheet ID** | ID lấy từ URL ở bước 2 |
| **Sheet Name** | Tên tab (trang tính) trong file — phân biệt HOA/thường |

4. Nhấn **Test Connection** — nếu thành công sẽ hiện số hàng đọc được
5. Nhấn **Save**

---

## Cấu Trúc Dữ liệu Trong Sheets

Semantix đọc Google Sheets theo quy tắc:

- **Hàng đầu tiên** = tên cột (column headers)
- **Các hàng tiếp theo** = dữ liệu
- Ô trống được xử lý là `NULL`
- Kiểu dữ liệu được tự động phát hiện từ dữ liệu trong cột

**Ví dụ cấu trúc tốt:**

| order_id | customer_name | amount | order_date | status |
|----------|---------------|--------|------------|--------|
| 1001 | Nguyễn Văn A | 150000 | 2026-01-15 | paid |
| 1002 | Trần Thị B | 230000 | 2026-01-16 | pending |

**Tránh:**
- Hàng tiêu đề merge cells
- Nhiều dòng trống ở đầu
- Ô có công thức phức tạp trả về lỗi `#REF!`, `#N/A`

---

## Làm Mới Dữ Liệu

Google Sheets không tự động push data vào Semantix. Để cập nhật dữ liệu:

1. **Thủ công**: Nhấn nút **Refresh** trên Dashboard (🔄)
2. **Theo lịch**: Đặt **Cache TTL = 0** trong cài đặt connection → mỗi lần xem Dashboard sẽ đọc lại từ Sheets
3. **Tự động**: Thiết lập Data Pipeline sync từ Sheets sang PostgreSQL theo lịch, rồi kết nối PostgreSQL làm nguồn chính

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `Spreadsheet not found` | Spreadsheet ID sai | Copy lại ID từ URL — chỉ lấy phần giữa `/d/` và `/edit` |
| `Permission denied` | Chưa share file cho service account | Share file với `semantix@gen-lang-client-0852507499.iam.gserviceaccount.com` |
| `Sheet not found` | Tên Sheet (tab) bị sai chính tả | Kiểm tra lại tên tab — phân biệt HOA/thường, dấu cách |
| Dữ liệu trống | Sheet chưa có header row | Đảm bảo hàng đầu tiên là tên cột |
| Số bị đọc sai | Cột số định dạng theo locale khác | Chuyển format sang số thuần (không dùng dấu phân cách ngàn kiểu Anh) |

---

## Giới Hạn Của Google Sheets

| Giới Hạn | Mô Tả |
|----------|-------|
| Kích thước file | Tối đa 10 triệu ô mỗi spreadsheet |
| Số hàng đọc | Semantix đọc tối đa `MAX_ROWS_LIMIT` hàng (mặc định 10,000) |
| Tốc độ cập nhật | Google Sheets API cho phép 300 request/phút |
| Kiểu dữ liệu | Không hỗ trợ BLOB, JSON native |

---

## Kết Hợp Nhiều Sheet

Để kết nối nhiều tab trong cùng một file, tạo **nhiều Connection** — mỗi connection trỏ đến một Sheet Name khác nhau nhưng cùng Spreadsheet ID.

Ví dụ một file Sheets có 3 tab: `DonHang`, `SanPham`, `KhachHang`:

| Connection Name | Spreadsheet ID | Sheet Name |
|----------------|---------------|------------|
| Sheets - Đơn Hàng | `1BxiMV...` | `DonHang` |
| Sheets - Sản Phẩm | `1BxiMV...` | `SanPham` |
| Sheets - Khách Hàng | `1BxiMV...` | `KhachHang` |

Sau đó tạo Data Model cho từng connection và khai báo Relations để AI có thể JOIN dữ liệu giữa các sheet.

---

## Khi Nào Nên Dùng Google Sheets

**Phù hợp:**
- Dữ liệu < 50,000 hàng
- Dữ liệu nhập tay thường xuyên (báo cáo nhanh, kế hoạch)
- Thử nghiệm nhanh với Semantix trước khi đầu tư vào database

**Không phù hợp:**
- Dữ liệu > 100,000 hàng (hiệu năng kém)
- Cần real-time (Sheets có độ trễ đọc)
- Dữ liệu thay đổi mỗi giây

> Cho dữ liệu lớn, hãy import Google Sheets vào PostgreSQL hoặc BigQuery rồi kết nối từ đó.
