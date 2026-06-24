# Phân Tích Phễu (Funnel Analysis)

Funnel Analysis theo dõi cách người dùng tiến qua một chuỗi các bước theo thứ tự — và xác định chính xác bước nào có tỷ lệ rời bỏ cao nhất.

---

## Khi Nào Dùng Funnel Analysis

**Câu hỏi điển hình:**
- "Từ 10,000 người xem sản phẩm, chỉ 120 người mua — rơi rụng ở đâu?"
- "Tỷ lệ hoàn thành đăng ký account của chúng ta là bao nhiêu?"
- "Bước nào trong checkout khiến người dùng bỏ giỏ nhiều nhất?"
- "Chiến dịch marketing mới có cải thiện tỷ lệ chuyển đổi không?"

---

## Use Cases Theo Ngành

| Ngành | Chuỗi Bước Phễu |
|-------|----------------|
| **E-commerce** | Xem sản phẩm → Thêm vào giỏ → Bắt đầu checkout → Nhập địa chỉ → Thanh toán → Xác nhận |
| **SaaS** | Đăng ký dùng thử → Xác minh email → Tạo project → Mời thành viên → Nâng cấp paid |
| **Fintech** | Tải app → Đăng ký → Xác minh KYC → Nạp tiền → Giao dịch đầu tiên |
| **Marketing** | Nhấn quảng cáo → Trang đích → Điền form → Xác nhận email → Cuộc gọi tư vấn |
| **Healthcare** | Tìm bác sĩ → Xem profile → Đặt lịch → Xác nhận → Hoàn thành khám |

---

## Cấu Hình Funnel Analysis

### Yêu Cầu Dữ Liệu

Bảng events với các cột:
- ID người dùng (`user_id`, `session_id`)
- Tên sự kiện (`event_name`, `action`)
- Thời gian sự kiện (`event_time`, `created_at`)
- (Tùy chọn) Giá trị (`revenue`, `value`)

### Thiết Lập Trong Context

1. Studio → DABI → Data Models → Chọn model → Tab Context
2. Chọn Context → Tab **Advanced Analysis** → **Add → Funnel**
3. Cấu hình:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Entity Column** | Cột định danh người dùng/session | `user_id`, `session_id` |
| **Time Dimension** | Cột thời gian sự kiện | `event_time` |
| **Event Column** | Cột tên sự kiện | `event_name` |
| **Steps** | Danh sách các bước theo thứ tự | Xem bên dưới |
| **Conversion Window** | Cửa sổ thời gian tối đa giữa bước đầu và bước cuối | `7 days`, `24 hours` |

### Định Nghĩa Steps (Các Bước)

| Step | Event Name (hoặc điều kiện) | Thứ Tự |
|------|---------------------------|---------|
| Xem sản phẩm | `product_view` | 1 |
| Thêm vào giỏ | `add_to_cart` | 2 |
| Bắt đầu checkout | `checkout_start` | 3 |
| Thanh toán thành công | `purchase_complete` | 4 |

---

## Đọc Biểu Đồ Phễu

Kết quả hiển thị dạng biểu đồ phễu dọc:

```
Bước 1: Xem sản phẩm          10,000 users  ████████████████████ 100%
                                     ↓ 32% chuyển đổi / 68% rời bỏ
Bước 2: Thêm vào giỏ           3,200 users  ██████████           32%
                                     ↓ 56% chuyển đổi / 44% rời bỏ
Bước 3: Bắt đầu checkout       1,800 users  ██████               18%
                                     ↓ 67% chuyển đổi / 33% rời bỏ
Bước 4: Thanh toán thành công  1,200 users  ████                 12%

Tỷ lệ chuyển đổi tổng: 12%
```

**Các chỉ số cho mỗi bước:**
- **Total Users**: Số người đạt đến bước này
- **Conversion Rate**: Tỷ lệ % chuyển từ bước trước sang bước này
- **Drop-off Rate**: Tỷ lệ % rời bỏ tại bước này (= 100% - Conversion Rate)
- **Drop-off Count**: Số người cụ thể rời bỏ

---

## Phân Tích Kết Quả

### Xác Định Điểm Rời Bỏ Lớn Nhất

Trong ví dụ trên, **bước "Xem → Giỏ"** có drop-off 68% — cao nhất. Đây là nơi cần tối ưu trước tiên:
- Giá sản phẩm có hợp lý?
- Hình ảnh/mô tả có thuyết phục?
- CTA "Thêm vào giỏ" có nổi bật không?

### So Sánh Theo Segment

Chạy funnel riêng cho từng nhóm để so sánh:

| Segment | Bước 1→2 | Bước 2→3 | Bước 3→4 | Tổng |
|---------|---------|---------|---------|------|
| Mobile | 28% | 52% | 60% | 8.7% |
| Desktop | 38% | 61% | 74% | 17.1% |
| **Insight** | Mobile kém hơn | | | Mobile checkout cần tối ưu |

### Xu Hướng Theo Thời Gian

So sánh conversion rate theo tuần/tháng để thấy tác động của các thay đổi:

| Tháng | Bước 1→4 (Tổng) | Ghi Chú |
|-------|----------------|---------|
| Tháng 3 | 10.2% | Baseline |
| Tháng 4 | 11.5% | A/B test nút CTA mới |
| Tháng 5 | 13.8% | Launch checkout mới |

---

## Conversion Window

**Conversion Window** xác định thời gian tối đa người dùng có thể hoàn thành toàn bộ funnel:

| Window | Phù Hợp |
|--------|---------|
| 1 giờ | Mua impulsive (thức ăn, vé xe) |
| 1 ngày | E-commerce thông thường |
| 7 ngày | Sản phẩm cần cân nhắc (điện tử, thời trang) |
| 30 ngày | B2B SaaS, sản phẩm đắt tiền |

Window quá ngắn → thiếu người hoàn thành, conversion rate thấp giả tạo.
Window quá dài → include cả người quay lại ngẫu nhiên, conversion rate cao giả tạo.

---

## Mẹo Thực Tiễn

- **Bắt đầu từ 4-6 bước** — quá nhiều bước khó phân tích, quá ít bước không đủ insight
- **Tách funnel theo device** (mobile vs desktop) — thường có conversion rất khác nhau
- **Định kỳ so sánh** với baseline trước mỗi lần thay đổi UX/UI
- **Kết hợp với Cohort**: Cohort mới có conversion rate khác cohort cũ không?
- Sau khi xác định điểm rời bỏ → dùng session recording tools (Hotjar, FullStory) để xem người dùng làm gì tại bước đó
