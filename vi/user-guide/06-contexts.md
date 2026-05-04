# 6. Khai Báo Context (Ngữ Cảnh Ngữ Nghĩa)

Context là một tập hợp các Model, Metric và các quy tắc nghiệp vụ (rules) được nhóm lại theo một chủ đề hoặc bộ phận cụ thể. AI Assistant sẽ luôn hoạt động trong phạm vi của một Context được chỉ định, giúp đảm bảo câu trả lời mang tính chuyên môn và độ chính xác cao nhất.

**Điều hướng:** Admin → Contexts → **New Context**

## Bước 1 — Thông Tin Cơ Bản

- **Name**: Tên ngắn gọn dùng trong hệ thống (ví dụ: `sales_analysis`).
- **Label**: Tên hiển thị thân thiện (ví dụ: `Phân tích Bán hàng`).
- **Description**: Mô tả phạm vi của ngữ cảnh. Ví dụ: *"Ngữ cảnh dùng để phân tích doanh thu, đơn hàng, khách hàng của bộ phận kinh doanh."*

## Bước 2 — Chọn Models

Thêm các Model liên quan (đã được tạo ở các bước trước) vào Context này (ví dụ: `don_hang`, `khach_hang`, `san_pham`).

## Bước 3 — Chọn Metrics

Chọn các Metric mà người dùng trong Context này được phép truy vấn. Tính năng này đóng vai trò như một lớp quản trị và bảo mật dữ liệu.

## Bước 4 — Khai Báo Forbidden Combinations (Tùy Chọn)

Bạn có thể thêm các quy tắc để ngăn AI tạo ra các truy vấn SQL vô nghĩa hoặc sai logic nghiệp vụ. Ví dụ:

```text
Không được GROUP BY "mã nhân viên" khi đang lọc "theo chi nhánh".
```

## Bước 5 — Cấu Hình Default Time Column

Chọn một cột ngày tháng (Date/Time) làm mặc định. AI sẽ tự động sử dụng cột này khi người dùng đặt các câu hỏi liên quan đến thời gian như *"tháng này"*, *"tuần trước"* mà không nói rõ là dựa trên cột ngày nào.

## Bước 6 — Lưu & Phát Hành

Nhấn **Save** để hoàn tất. Context của bạn đã sẵn sàng để gắn vào AI Assistant và các Dashboard.
