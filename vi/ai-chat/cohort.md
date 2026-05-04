# Phân Tích Cohort (Cohort Analysis)

Phân Tích Cohort nhóm những người dùng có chung một đặc điểm (thường là ngày họ hoạt động lần đầu tiên) và theo dõi hành vi của họ theo thời gian.

## Các Use Cases

- Theo dõi tỷ lệ giữ chân (Retention): *"Có bao nhiêu % lượt đăng ký của tháng 1 vẫn đang hoạt động sau 3 tháng?"*
- Doanh thu theo cohort: *"Mỗi cohort mang lại bao nhiêu doanh thu trong 12 tháng?"*
- Phân tích tỷ lệ rời bỏ (Churn): *"Những cohort nào có tỷ lệ rời bỏ cao nhất vào tháng thứ 2?"*

## Thiết Lập Phân Tích Cohort

1. Mở một context → tab **Advanced Analysis**
2. Nhấn **Add → Cohort**
3. Cấu hình:

| Trường | Mô Tả |
|-------|-------------|
| **Entity Column** | Định danh người dùng/khách hàng (ví dụ: `user_id`) |
| **Time Dimension** | Cột chứa ngày diễn ra sự kiện (ví dụ: `created_at`) |
| **Value Metric** | Tùy chọn — thước đo để tổng hợp (ví dụ: `revenue`) |
| **Cohort Period** | Theo tuần (Week) hoặc theo tháng (Month) |

4. Nhấn **Save**

## Đọc Bảng Cohort

Kết quả đầu ra là một ma trận trong đó:
- **Rows (Dòng)** = các nhóm cohort (ví dụ: Jan 2024, Feb 2024)
- **Columns (Cột)** = các chu kỳ sau lần hoạt động đầu tiên (Period 0, Period 1, Period 2...)
- **Values (Giá trị)** = Tỷ lệ giữ chân (%) hoặc thước đo đã được tổng hợp

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 |
|--------|----------|----------|----------|----------|
| Jan 2024 | 100% | 45% | 32% | 28% |
| Feb 2024 | 100% | 52% | 38% | 31% |
| Mar 2024 | 100% | 48% | 35% | — |

> 💡 Period 0 luôn hiển thị 100% vì nó đại diện cho chu kỳ đầu tiên của cohort.
