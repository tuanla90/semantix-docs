# Chỉ Số Kinh Doanh (Metrics)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Metrics

Metric là các chỉ số hiệu suất (KPI) cốt lõi của doanh nghiệp. Được định nghĩa một lần và dùng nhất quán trên toàn hệ thống — trong AI Chat, Dashboard, và Contexts. **Đây là bước quan trọng nhất để AI trả lời câu hỏi chính xác.**

## Tạo Metric Mới

1. Trong trang chỉnh sửa Model, chuyển sang tab **Metrics**
2. Nhấn **New Metric**
3. Điền thông tin:

| Thuộc tính | Ý nghĩa |
|------------|---------|
| **Name** | Tên kỹ thuật (ví dụ: `total_revenue`) |
| **Label** | Tên hiển thị (ví dụ: `Tổng doanh thu`) |
| **Aggregation** | Hàm tổng hợp: `SUM`, `COUNT`, `AVG`, `MIN`, `MAX`, `COUNT_DISTINCT` |
| **Column** | Cột áp dụng hàm tổng hợp |
| **Format** | `currency` (tiền tệ), `number` (số), `percent` (phần trăm) |
| **Description** | Mô tả chi tiết để AI hiểu khi nào dùng |
| **Synonyms** | Các từ đồng nghĩa người dùng hay gõ |

## Ví Dụ Metric Thường Gặp

| Metric | Aggregation | Column |
|--------|-------------|--------|
| Tổng doanh thu | SUM | revenue |
| Số đơn hàng | COUNT_DISTINCT | order_id |
| Doanh thu trung bình/đơn | AVG | revenue |
| Số khách hàng duy nhất | COUNT_DISTINCT | customer_id |

## Mẹo Quan Trọng

> **Synonyms và Description càng phong phú, AI càng chính xác.** Ví dụ, với metric "Tổng doanh thu", thêm synonyms: `"doanh số"`, `"tiền thu được"`, `"revenue"`, `"oanh thu"`.

Description nên giải thích rõ: *"Tổng giá trị các đơn hàng đã thanh toán thành công, không bao gồm đơn hủy."*
