# Phân Tích Nâng Cao

Ngoài việc trả lời câu hỏi tự do, Semantix cung cấp các **mô hình phân tích chuyên sâu** tích hợp sẵn — cho phép phân tích Cohort, RFM, Funnel, và nhiều loại phân tích phức tạp khác chỉ với vài cú click, không cần SQL.

---

## Các Loại Phân Tích

| Loại | Câu Hỏi Trả Lời | Xem Chi Tiết |
|------|----------------|-------------|
| **Cohort Analysis** | "Bao nhiêu % khách hàng tháng 1 vẫn mua hàng sau 3 tháng?" | [Cohort](cohort.md) |
| **RFM Analysis** | "Phân khúc khách hàng theo hành vi mua: Champions, At Risk, Lost" | [RFM](rfm.md) |
| **Funnel Analysis** | "Tỷ lệ chuyển đổi qua từng bước: Xem → Giỏ → Thanh toán" | [Funnel](funnel.md) |
| **Growth Analysis** | "Tốc độ tăng trưởng MoM và YoY tự động" | (tích hợp trong Cohort) |
| **Pareto Analysis** | "20% sản phẩm/khách hàng nào tạo ra 80% doanh thu?" | (trong AI Chat) |
| **Vintage Analysis** | "Hiệu suất của từng đợt giải ngân/thành lập theo thời gian" | (trong AI Chat) |

---

## Kích Hoạt Phân Tích Nâng Cao

Phân tích nâng cao được cấu hình ở **cấp độ Context** — Admin thiết lập một lần, người dùng dùng mọi lúc.

### Bước 1: Cấu Hình Trong Context

1. Vào **Studio → DABI → Data Models** → chọn Model
2. Vào tab **Contexts** → chọn Context muốn bật
3. Tab **Advanced Analysis**
4. Nhấn **Add** → chọn loại phân tích

Hoặc vào trực tiếp Context:
1. Studio → DABI → Data Models → Chọn model → Semantic Contexts
2. Chọn Context → Tab **Advanced Analysis**
3. Nhấn **Add Analysis**

### Bước 2: Cấu Hình Tham Số

Mỗi loại phân tích yêu cầu cấu hình các tham số cơ bản (xem chi tiết trong từng trang):
- **Entity Column**: Cột định danh người dùng/khách hàng (`user_id`, `customer_id`)
- **Time Dimension**: Cột ngày/thời gian của sự kiện
- **Value Metric**: Metric cần đo (tùy chọn, ví dụ: doanh thu)

### Bước 3: Truy Cập Từ AI Chat

Sau khi cấu hình, người dùng truy cập phân tích:

1. Vào **AI Chat**
2. Chọn Assistant có Context đã cấu hình
3. Nhấn tab **Analysis** (hoặc hỏi trực tiếp: "Phân tích cohort khách hàng")
4. Chọn loại phân tích → hệ thống tự chạy và hiển thị kết quả

---

## Tùy Chỉnh SQL Templates

Mỗi loại phân tích có SQL template mặc định. Admin có thể chỉnh sửa:

**Khi nào cần chỉnh template:**
- Database dùng dialect SQL khác (BigQuery, ClickHouse thay vì PostgreSQL)
- Cần thêm điều kiện lọc đặc thù nghiệp vụ
- Muốn thay đổi cách tính period/segment

**Chỉnh sửa template:**
1. **Admin → Config → Platform Integrations → Tab: SQL Templates**
2. Tìm template cần chỉnh (ví dụ: `TEMPLATE_SQL_COHORT`)
3. Chỉnh sửa SQL → **Save**

> **Cảnh báo**: Chỉnh sửa template sai định dạng sẽ khiến phân tích thất bại. Giữ backup template gốc trước khi sửa.

---

## So Sánh Các Loại Phân Tích

| | Cohort | RFM | Funnel |
|-|--------|-----|--------|
| **Số bảng cần** | 1 (events/orders) | 1 (orders/transactions) | 1-2 (events) |
| **Kết quả** | Ma trận retention % | Phân khúc khách hàng | Tỷ lệ chuyển đổi |
| **Cập nhật** | Theo ngày/tuần/tháng | Mỗi khi chạy phân tích | Mỗi khi chạy |
| **Phức tạp cấu hình** | Thấp | Thấp | Trung bình |
| **Insight chính** | Retention, Churn | Segmentation | Conversion, Drop-off |

---

## Use Case Theo Ngành

**E-commerce:**
- Cohort: Retention của khách hàng theo tháng đăng ký
- RFM: Phân loại khách VIP, khách có nguy cơ rời bỏ
- Funnel: Tỷ lệ chuyển đổi từ xem sản phẩm đến mua hàng

**SaaS:**
- Cohort: User activation rate, feature adoption
- Funnel: Onboarding completion rate (trial → paid)
- RFM: Account health score

**Ngân hàng / Tài chính:**
- Cohort: Vintage analysis — hiệu suất khoản vay theo đợt giải ngân
- RFM: Phân khúc khách hàng theo giá trị tài sản
- Funnel: Tỷ lệ hoàn thành đăng ký sản phẩm tài chính

---

## Xuất Kết Quả Phân Tích

Sau khi có kết quả phân tích:
- Nhấn **Download CSV** để tải dữ liệu raw
- Nhấn **Pin to Dashboard** để thêm vào Dashboard
- Nhấn **Share** để gửi link cho đồng nghiệp

Xem chi tiết từng loại phân tích:
- [Phân Tích Cohort →](cohort.md)
- [Phân Tích RFM →](rfm.md)
- [Phân Tích Funnel →](funnel.md)
