# Phân Tích Phễu (Funnel Analysis)

Phân Tích Phễu theo dõi cách người dùng trải qua một loạt các bước — và vị trí mà họ bỏ cuộc (drop off).

## Các Use Cases

- Thương mại điện tử (E-commerce): *Xem sản phẩm → Thêm vào giỏ → Thanh toán → Mua hàng*
- Đăng ký phần mềm (SaaS onboarding): *Đăng ký → Kích hoạt → Hành động đầu tiên → Nâng cấp*
- Marketing: *Nhấn vào quảng cáo → Trang đích (Landing page) → Điền form → Trở thành Lead chất lượng*

## Thiết Lập Phân Tích Phễu

1. Mở một context → tab **Advanced Analysis**
2. Nhấn **Add → Funnel**
3. Cấu hình:

| Trường | Mô Tả |
|-------|-------------|
| **Entity Column** | Định danh người dùng/phiên truy cập (user/session identifier) |
| **Time Dimension** | Dấu thời gian diễn ra sự kiện (Event timestamp) |
| **Steps** | Danh sách các sự kiện/hành động đã được sắp xếp theo thứ tự |
| **Conversion Window** | Thời gian tối đa giữa các bước (ví dụ: 7 days) |

## Đọc Biểu Đồ Phễu

Kết quả đầu ra hiển thị mỗi bước với:
- **Total users (Tổng số người dùng)** đã đạt tới bước này
- **Conversion rate (Tỷ lệ chuyển đổi)** từ bước trước đó
- **Drop-off rate (Tỷ lệ rời bỏ)** ở bước này

```
Bước 1: Xem sản phẩm            → 10,000 người  (100%)
Bước 2: Thêm vào giỏ            →  3,200 người  (32%)
Bước 3: Bắt đầu thanh toán      →  1,800 người  (56%)
Bước 4: Hoàn thành thanh toán   →  1,200 người  (67%)

Tỷ lệ chuyển đổi tổng thể: 12%
```

## Các Mẹo (Tips)

- Giữ cho phễu từ 3–7 bước để dễ dàng theo dõi
- Sử dụng khung thời gian chuyển đổi thực tế (ngắn quá = đếm sót, dài quá = nhiễu)
- Phân khúc các phễu (segment funnels) theo thuộc tính người dùng (ví dụ: nguồn traffic, thiết bị) để có cái nhìn sâu sắc hơn
