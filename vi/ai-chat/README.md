# AI Chat & Truy Vấn Bằng Ngôn Ngữ Tự Nhiên

## Tổng Quan

Semantix cho phép bạn truy vấn dữ liệu bằng cách đặt câu hỏi bằng ngôn ngữ tự nhiên (tiếng Anh, tiếng Việt, hoặc bất kỳ ngôn ngữ nào). Không yêu cầu kiến thức về SQL.

## Bắt Đầu Trò Chuyện (Chat)

1. Đi tới **Analysis** từ thanh điều hướng chính
2. Chọn một **Context** (nguồn dữ liệu của bạn)
3. Nhập câu hỏi của bạn vào khung chat

## Các Câu Hỏi Ví Dụ

```
Hiển thị tổng doanh thu theo khu vực của tháng trước
Những khách hàng nào đã chi tiêu hơn 10.000$ trong quý 4?
So sánh doanh thu giữa năm 2023 và 2024 theo từng danh mục
Giá trị trung bình của mỗi đơn hàng trong tuần này là bao nhiêu?
Liệt kê top 10 sản phẩm theo số lượng đã bán
```

## Cách Hoạt Động

1. **Hiểu ý định (Intent Extraction)** — AI hiểu được bạn đang hỏi gì và ánh xạ (map) nó vào mô hình dữ liệu của bạn
2. **Tạo SQL (SQL Generation)** — Semantix sinh ra câu truy vấn SQL phù hợp
3. **Thực thi (Execution)** — Truy vấn được chạy trên database của bạn
4. **Trực quan hóa (Visualization)** — Kết quả tự động được hiển thị dưới dạng bảng hoặc biểu đồ

## Các Tính Năng Của Chat

| Tính Năng | Mô Tả |
|---------|-------------|
| **Follow-up questions** | Đặt các câu hỏi tiếp nối trong cùng một phiên làm việc |
| **Chart suggestions** | Semantix tự động đề xuất loại biểu đồ phù hợp nhất |
| **SQL preview** | Nhấn "View SQL" để xem câu truy vấn được sinh ra |
| **Save to dashboard** | Ghim trực tiếp bất kỳ kết quả nào vào một dashboard |
| **Export** | Tải kết quả xuống dưới dạng CSV hoặc Excel |

## Các Chế Độ Phân Tích (Analysis Modes)

| Chế Độ | Mô Tả |
|------|-------------|
| **Structured** | Luồng tiêu chuẩn: Ngôn ngữ tự nhiên (NL) → SQL → Biểu đồ |
| **Agentic** | Một AI agent có thể chạy nhiều truy vấn và kết hợp các kết quả lại với nhau |

## Mẹo Để Có Kết Quả Tốt Hơn

- Hãy cụ thể về khoảng thời gian: *"30 ngày qua"*, *"Quý 3 năm 2024"*, *"từ đầu năm đến nay"*
- Nêu rõ metric muốn xem: *"tổng doanh thu"*, *"số lượng người dùng duy nhất (unique users)"*, *"kích thước giỏ hàng trung bình"*
- Nếu kết quả có vẻ sai, hãy thử diễn đạt lại câu hỏi hoặc kiểm tra định nghĩa các cột trong context của bạn

## Phân Tích Nâng Cao (Advanced Analysis)

Đối với các mô hình phân tích phức tạp, hãy sử dụng các loại phân tích nâng cao được tích hợp sẵn:

- [Phân Tích Cohort (Cohort Analysis)](cohort.md)
- [Phân Tích RFM (RFM Analysis)](rfm.md)
- [Phân Tích Phễu (Funnel Analysis)](funnel.md)
