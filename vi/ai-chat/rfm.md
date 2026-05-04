# Phân Tích RFM

RFM là viết tắt của **Recency (Gần đây), Frequency (Tần suất), Monetary (Tiền tệ)** — một mô hình phân khúc khách hàng nhằm chấm điểm khách hàng dựa trên hành vi mua hàng của họ.

## Các Chiều Của RFM

| Chiều | Câu Hỏi | Ví Dụ |
|-----------|----------|---------|
| **Recency** | Khách hàng đã mua hàng gần đây nhất vào lúc nào? | Lần mua gần nhất cách đây 5 ngày |
| **Frequency** | Họ mua hàng thường xuyên như thế nào? | 12 đơn hàng trong năm qua |
| **Monetary** | Họ đã chi tiêu bao nhiêu tiền? | Tổng mức chi tiêu là 3.400$ |

## Các Use Cases

- Xác định các khách hàng tốt nhất của bạn (điểm R, F, và M cao)
- Tìm các khách hàng có nguy cơ rời bỏ (điểm Recency thấp)
- Lên chiến dịch để thu hút lại các khách hàng đã mất
- Cá nhân hóa các chương trình khuyến mãi theo từng phân khúc

## Thiết Lập Phân Tích RFM

1. Mở một context → tab **Advanced Analysis**
2. Nhấn **Add → RFM**
3. Cấu hình:

| Trường | Mô Tả |
|-------|-------------|
| **Entity Column** | Định danh khách hàng (ví dụ: `customer_id`) |
| **Time Dimension** | Ngày đặt hàng/sự kiện (ví dụ: `order_date`) |
| **Value Metric** | Doanh thu hoặc giá trị đơn hàng (ví dụ: `SUM(total)`) |

4. Nhấn **Save**

## Phân Khúc RFM

Semantix tự động gán từng khách hàng vào một phân khúc dựa trên điểm RFM tổng hợp của họ:

| Phân Khúc | Mô Tả |
|---------|-------------|
| 🥇 Champions (Nhà vô địch) | Mua hàng gần đây nhất, mua thường xuyên, chi tiêu nhiều nhất |
| 💛 Loyal Customers (Khách hàng trung thành) | Mua hàng thường xuyên với mức chi tiêu tốt |
| 🌱 Potential Loyalists (Tiềm năng trung thành) | Khách mua hàng gần đây với tần suất trung bình |
| 🆕 New Customers (Khách hàng mới) | Vừa mua hàng lần đầu tiên trong thời gian rất gần đây |
| ⚠️ At Risk (Có nguy cơ rời bỏ) | Từng là khách hàng tốt trong lịch sử nhưng không mua hàng dạo gần đây |
| 💤 Hibernating (Ngủ đông) | Điểm R, F, M thấp — gần như đã mất |
| ❌ Lost (Đã mất) | Đã không mua hàng trong một thời gian rất dài |
