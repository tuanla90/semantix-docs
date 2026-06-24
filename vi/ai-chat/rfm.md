# Phân Tích RFM

RFM là phương pháp phân khúc khách hàng dựa trên ba chiều hành vi mua hàng: **Recency (Gần đây)**, **Frequency (Tần suất)**, **Monetary (Giá trị)**.

---

## Ba Chiều RFM

| Chiều | Câu Hỏi | Đo Bằng |
|-------|---------|---------|
| **Recency (R)** | Khách hàng mua gần đây chưa? | Số ngày kể từ lần mua cuối |
| **Frequency (F)** | Khách mua hàng thường xuyên không? | Số đơn hàng trong kỳ phân tích |
| **Monetary (M)** | Khách chi tiêu nhiều không? | Tổng giá trị mua hàng |

**Ý nghĩa điểm cao/thấp:**

| | Điểm Cao (5/5) | Điểm Thấp (1/5) |
|-|---------------|----------------|
| R | Mua rất gần đây | Không mua từ lâu |
| F | Mua rất thường xuyên | Chỉ mua 1-2 lần |
| M | Chi tiêu rất nhiều | Chi tiêu rất ít |

---

## Cấu Hình RFM Analysis

### Yêu Cầu Dữ Liệu

Cần một bảng transactions với:
- Cột ID khách hàng (`customer_id`)
- Cột ngày đặt hàng (`order_date`)
- Cột giá trị đơn hàng (`total_amount`, `revenue`)

### Thiết Lập Trong Context

1. Studio → DABI → Data Models → Chọn model → Tab Context
2. Chọn Context → Tab **Advanced Analysis** → **Add → RFM**
3. Cấu hình:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Entity Column** | Cột ID khách hàng | `customer_id` |
| **Time Dimension** | Cột ngày đặt hàng | `order_date` |
| **Value Column** | Cột giá trị đơn | `total_amount` |
| **Analysis Window** | Kỳ phân tích (ngày) | `365` (1 năm qua) |
| **Score Bins** | Số phân vị cho mỗi chiều | `5` (1-5) |

4. Nhấn **Save**

---

## Các Phân Khúc Khách Hàng

Semantix tự động phân loại khách hàng dựa trên điểm RFM tổng hợp:

| Phân Khúc | Mô Tả | R | F | M | Chiến Lược |
|-----------|--------|---|---|---|-----------|
| 🥇 **Champions** | Mua gần đây, thường xuyên, chi nhiều | 5 | 5 | 5 | Reward, upsell, ambassador |
| 💛 **Loyal Customers** | Mua thường xuyên, chi tốt | 4-5 | 4-5 | 3-5 | Chương trình loyalty, sản phẩm mới |
| 🌱 **Potential Loyalists** | Mua gần đây, một số lần, chi khá | 4-5 | 2-3 | 2-3 | Onboarding, cross-sell, khuyến mãi |
| 🆕 **New Customers** | Mua rất gần đây, ít lần | 5 | 1 | 1-2 | Welcome series, education |
| 🤑 **Big Spenders** | Chi nhiều nhưng không thường xuyên | 2-4 | 1-2 | 4-5 | Ưu đãi đặc biệt, VIP treatment |
| ⚠️ **At Risk** | Từng mua tốt nhưng đã lâu không mua | 2-3 | 3-4 | 3-4 | Win-back campaign, survey |
| 😴 **Hibernating** | Mua thỉnh thoảng, đã lâu | 1-2 | 2-3 | 2-3 | Reactivation offer |
| ❌ **Lost** | Không mua từ rất lâu | 1 | 1-2 | 1-2 | Last-chance offer hoặc dừng marketing |

---

## Đọc Kết Quả RFM

### Bảng Tổng Hợp Phân Khúc

| Phân Khúc | Số KH | % Tổng | Tổng Doanh Thu | % DT |
|-----------|-------|--------|----------------|------|
| Champions | 1,245 | 8.3% | 2,890,000,000 | 34% |
| Loyal Customers | 2,100 | 14% | 1,980,000,000 | 23% |
| At Risk | 3,450 | 23% | 890,000,000 | 10% |
| Lost | 4,200 | 28% | 120,000,000 | 1.4% |
| Tổng cộng | 15,000 | 100% | 8,500,000,000 | 100% |

**Insight từ bảng trên:**
- 22.3% khách hàng (Champions + Loyal) tạo ra 57% doanh thu → tập trung giữ chân nhóm này
- 28% đã mất → không đáng đầu tư marketing nhiều

### Ma Trận RFM Heatmap

Semantix hiển thị heatmap R vs F với màu sắc thể hiện M — giúp nhìn thấy pattern phân bố khách hàng.

---

## Ứng Dụng Thực Tế

### Export Danh Sách Để Chạy Campaign

1. Trong kết quả RFM → chọn phân khúc (ví dụ: "At Risk")
2. Nhấn **Export CSV** → tải danh sách `customer_id`, email, điểm RFM
3. Import vào công cụ email marketing (Mailchimp, HubSpot, Klaviyo)

### Nội Dung Marketing Theo Phân Khúc

| Phân Khúc | Nội Dung Gợi Ý |
|-----------|---------------|
| Champions | "Cảm ơn bạn đã là khách hàng VIP! Nhận ưu đãi độc quyền" |
| At Risk | "Chúng tôi nhớ bạn! Voucher 20% cho đơn hàng tiếp theo" |
| Lost | "Chúng tôi đã cải thiện! Quay lại nhận quà 30%" |
| New Customers | "Khám phá thêm những sản phẩm bạn sẽ yêu thích" |

---

## Tần Suất Chạy RFM

- **Hàng tháng**: Cập nhật phân khúc, theo dõi migration giữa các nhóm
- **Sau chiến dịch**: Đánh giá có bao nhiêu "At Risk" đã quay về "Loyal" sau win-back campaign
- **Cuối năm**: Phân tích xu hướng phân khúc cả năm

> Khách hàng di chuyển giữa các phân khúc theo thời gian — chạy RFM định kỳ để cập nhật chính xác.
