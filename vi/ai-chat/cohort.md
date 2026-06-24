# Phân Tích Cohort (Cohort Analysis)

Phân Tích Cohort nhóm người dùng/khách hàng có cùng đặc điểm tại một thời điểm (thường là ngày đăng ký hoặc lần mua đầu tiên), rồi theo dõi hành vi của họ qua các kỳ tiếp theo.

---

## Khi Nào Dùng Cohort Analysis

**Câu hỏi điển hình:**
- "Trong số khách hàng đăng ký tháng 1, bao nhiêu % vẫn mua hàng sau 3 tháng?"
- "Cohort nào có tỷ lệ giữ chân tốt nhất?"
- "Doanh thu tích lũy của từng cohort sau 12 tháng là bao nhiêu?"
- "Tỷ lệ churn tăng mạnh ở tháng nào của vòng đời khách hàng?"

---

## Cấu Hình Cohort Analysis

### Yêu Cầu Dữ Liệu

Bảng dữ liệu cần có ít nhất:
- Cột định danh khách hàng (`customer_id`, `user_id`)
- Cột ngày sự kiện (`order_date`, `created_at`, `event_time`)
- (Tùy chọn) Cột giá trị để đo lường (`revenue`, `amount`)

### Thiết Lập Trong Context

1. Studio → DABI → Data Models → Chọn model → Tab Context
2. Chọn Context → Tab **Advanced Analysis** → **Add → Cohort**
3. Cấu hình:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Entity Column** | Cột định danh người dùng | `customer_id`, `user_id` |
| **First Event Time** | Cột ngày lần đầu tiên (bắt đầu cohort) | `first_order_date`, `registered_at` |
| **Activity Time** | Cột ngày của sự kiện lặp lại | `order_date`, `login_date` |
| **Value Column** | Cột giá trị muốn đo (tùy chọn) | `revenue`, `amount` |
| **Cohort Period** | Đơn vị thời gian mỗi kỳ | Week / Month |

4. Nhấn **Save**

---

## Đọc Bảng Cohort

Kết quả là một **ma trận retention**:

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 | Period 6 | Period 12 |
|--------|----------|----------|----------|----------|----------|-----------|
| Jan 2026 | 1,200 (100%) | 540 (45%) | 384 (32%) | 336 (28%) | 264 (22%) | 192 (16%) |
| Feb 2026 | 980 (100%) | 510 (52%) | 373 (38%) | 304 (31%) | — | — |
| Mar 2026 | 1,100 (100%) | 528 (48%) | 385 (35%) | — | — | — |

**Giải thích:**
- **Rows (hàng)**: Mỗi hàng = một cohort (nhóm đăng ký cùng tháng)
- **Columns (cột)**: Period 0 = kỳ đầu tiên (tháng đăng ký), Period 1 = tháng tiếp theo...
- **Giá trị**: Số người còn hoạt động (và tỷ lệ %)
- **Period 0 = 100%**: Luôn 100% vì đây là điểm xuất phát của cohort
- **Ô trống**: Cohort chưa đủ thời gian để có dữ liệu kỳ đó

---

## Phân Tích Kết Quả

### 1. Tỷ Lệ Retention Chuẩn

**Tốt hay xấu?** Phụ thuộc vào ngành:

| Ngành | Month 1 Retention Tốt |
|-------|----------------------|
| E-commerce | > 25% |
| SaaS B2B | > 70% |
| Mobile App | > 40% |
| Fintech | > 35% |

### 2. So Sánh Các Cohort

Nếu cohort tháng 2 (52%) cao hơn tháng 1 (45%) ở Period 1 → chiến dịch tháng 2 hiệu quả hơn, hoặc có thay đổi sản phẩm tích cực.

### 3. Tìm Điểm Rời Bỏ Nguy Hiểm

Nếu retention giảm mạnh từ Period 2 → Period 3 (từ 38% xuống 15%) → cần điều tra điều gì xảy ra sau 2 tháng: sản phẩm thiếu tính năng giữ chân? Thiếu email marketing?

---

## Cohort Revenue (Doanh Thu Tích Lũy)

Ngoài retention %, có thể xem **doanh thu tích lũy per cohort**:

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 | LTV (12M) |
|--------|----------|----------|----------|----------|-----------|
| Jan 2026 | 120M VNĐ | 54M VNĐ | 38M VNĐ | 33M VNĐ | 185M VNĐ |
| Feb 2026 | 98M VNĐ | 51M VNĐ | 37M VNĐ | 30M VNĐ | — |

**LTV (Lifetime Value)**: Tổng doanh thu một cohort mang lại trong 12 tháng — chỉ số quan trọng để đánh giá hiệu quả chiến dịch marketing.

---

## Thực Tiễn Tốt

- **Cohort Period = Month** cho hầu hết use cases (đủ dữ liệu, đủ rõ trend)
- **Cohort Period = Week** cho app có engagement cao (daily/weekly active users)
- Xem đồng thời cả bảng số lượng và tỷ lệ % để hiểu context
- Kết hợp Cohort + RFM: Cohort giúp thấy retention trend, RFM giúp phân loại từng khách hàng
