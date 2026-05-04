# 4. Khai Báo Metric (Chỉ Số Kinh Doanh)

Metric là các chỉ số hiệu suất chính (KPIs) cốt lõi của doanh nghiệp. Chúng được định nghĩa một lần và sử dụng nhất quán trên toàn hệ thống. **Đây là bước quan trọng nhất để AI có thể trả lời câu hỏi của người dùng một cách chính xác.**

**Điều hướng:** Admin → Models → chọn Model → tab **Metrics** → **New Metric**

## Các Ví Dụ Metric Thường Gặp

| Metric | Công thức SQL |
|--------|---------------|
| Tổng doanh thu | `SUM(revenue)` |
| Số đơn hàng | `COUNT(DISTINCT order_id)` |
| Doanh thu trung bình / đơn | `SUM(revenue) / COUNT(DISTINCT order_id)` |
| Tỷ lệ chuyển đổi | `COUNT(DISTINCT converted_user) / COUNT(DISTINCT visitor) * 100` |

## Cấu Hình Metric

| Thuộc tính | Ý nghĩa |
|------------|---------|
| **Name** | Tên kỹ thuật trong hệ thống (ví dụ: `total_revenue`). |
| **Label** | Tên hiển thị trên giao diện (ví dụ: `Tổng doanh thu`). |
| **Aggregation** | Hàm tổng hợp dữ liệu: `SUM`, `COUNT`, `AVG`, `MIN`, `MAX`, `COUNT_DISTINCT`. |
| **Column** | Cột dữ liệu sẽ được áp dụng hàm tổng hợp. |
| **Format** | Định dạng hiển thị: `currency` (tiền tệ), `number` (số), `percent` (phần trăm). |
| **Description** | Mô tả chi tiết cho AI. Ví dụ: "Tổng giá trị của các đơn hàng đã thanh toán thành công." |
| **Synonyms** | Các từ đồng nghĩa. Ví dụ: `"oanh thu"`, `"doanh số bán"`, `"tiền thu được"`. |

> **Mẹo Quan Trọng:** Hãy thêm càng nhiều **Synonyms (Từ đồng nghĩa)** và viết **Description (Mô tả)** càng chi tiết càng tốt. Điều này giúp AI dễ dàng nhận diện chỉ số khi người dùng đặt câu hỏi bằng nhiều cách diễn đạt khác nhau.
