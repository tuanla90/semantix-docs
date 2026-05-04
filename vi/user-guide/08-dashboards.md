# 8. Vẽ Dashboard (Bảng Điều Khiển)

Dashboard cho phép bạn tổng hợp nhiều biểu đồ (chart) và widget vào một màn hình duy nhất để tiện theo dõi, báo cáo định kỳ.

**Điều hướng:** Dashboards → **New Dashboard**

## Bước 1 — Tạo Dashboard Mới

1. Nhấn **New Dashboard**.
2. Đặt **Tên** và **Mô tả** cho Dashboard.
3. Chọn **Context** mặc định để Dashboard lấy dữ liệu.

## Bước 2 — Thêm Widget

Nhấn **Add Widget** → chọn loại biểu đồ phù hợp:

| Loại Widget | Mục Đích Sử Dụng |
|-------------|------------------|
| **Bar Chart (Cột)** | So sánh giá trị theo các danh mục. |
| **Line Chart (Đường)** | Xem xu hướng thay đổi theo thời gian. |
| **Pie / Donut (Tròn)** | Xem tỷ lệ phần trăm đóng góp. |
| **KPI Card** | Hiển thị làm nổi bật một số liệu tổng quan duy nhất. |
| **Table / Pivot** | Xem dữ liệu chi tiết dưới dạng bảng. |
| **Heatmap** | Xem mật độ dữ liệu theo 2 chiều (ví dụ: ngày và giờ). |
| **Treemap / Sankey** | Phân cấp dữ liệu và biểu diễn luồng (flow). |

## Bước 3 — Cấu Hình Widget

**Cách 1 — Hỏi AI (Nhanh nhất):**

Gõ trực tiếp yêu cầu vào ô "Ask AI", ví dụ:

```text
Vẽ biểu đồ cột doanh thu theo tháng trong năm nay
```

AI sẽ tự động sinh SQL, chọn loại chart phù hợp và điền sẵn cấu hình cho bạn.

**Cách 2 — Query Builder thủ công:**

1. Chọn **Model** → chọn các **Metrics** và **Dimensions** cần hiển thị.
2. Thêm **Filters** nếu cần (ví dụ: `năm = 2025`).
3. Chọn **Chart Type** và tùy chỉnh màu sắc, nhãn trục.
4. Nhấn **Save Widget** để lưu.

## Bước 4 — Sắp Xếp Layout

- Nhấn giữ và kéo thả (drag & drop) để sắp xếp vị trí các widget.
- Kéo góc dưới cùng bên phải của widget để thay đổi kích thước.

## Bước 5 — Thêm Bộ Lọc Toàn Dashboard (Global Filters)

Nhấn **Add Dashboard Filter** → chọn cột dùng làm bộ lọc. 
Khi người dùng thay đổi giá trị của bộ lọc này, toàn bộ các widget trên Dashboard sẽ tự động đồng bộ và cập nhật lại dữ liệu.

*Ví dụ phổ biến: Bộ lọc theo Khoảng ngày, Chi nhánh, Sản phẩm.*

## Bước 6 — Chia Sẻ Dashboard

| Phương Thức | Nơi Cấu Hình |
|-------------|--------------|
| **Nội bộ (Theo Role)** | Settings → Permissions |
| **Public Link (Không cần đăng nhập)** | Share → Generate Public Link |
| **Nhúng (Embed) vào App/Web khác** | Share → Embed Code (dùng JWT token) |
| **Gửi báo cáo định kỳ qua Email/Zalo**| Admin → Scheduled Reports → New Report |

---

## Tổng Kết — Luồng Thiết Lập Nhanh

```text
1. Connection     →  Kết nối nguồn dữ liệu (DB / Google Sheet)
        ↓
2. Model          →  Ánh xạ table thành khái niệm kinh doanh
        ↓
3. Calc Fields    →  Tạo các cột tính toán (nếu cần)
        ↓
4. Metrics        →  Định nghĩa các chỉ số KPI cốt lõi
        ↓
5. Relations      →  Khai báo cách nối (JOIN) giữa các Model
        ↓
6. Context        →  Nhóm Model + Metric theo chủ đề nghiệp vụ
        ↓
7. Assistant      →  Cấu hình tính cách và ngôn ngữ cho AI
        ↓
8. Dashboard      →  Tổng hợp insight thành màn hình theo dõi
```

> **Mẹo quan trọng nhất:** Hãy đầu tư thật nhiều thời gian vào bước **Metrics** và **Context** — mô tả (description) và từ đồng nghĩa (synonym) càng chi tiết, AI trả lời câu hỏi càng chính xác và ít cần hỏi lại.
