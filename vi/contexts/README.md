# Contexts & Data Models

## Context Là Gì?

Một **Context** (Ngữ cảnh) là một lớp ngữ nghĩa (semantic layer) nằm giữa database thô của bạn và AI. Nó báo cho Semantix biết:

- Những bảng (tables) và cột (columns) nào có sẵn
- Cách các bảng liên kết với nhau (joins/relations)
- Những metric và cột tính toán (calculated columns) nào tồn tại
- Ai có quyền truy cập vào dữ liệu nào (Row-Level Security)

Hãy nghĩ về một Context như một **mô hình dữ liệu ảo (virtual data model)** — người dùng của bạn sẽ tương tác bằng các tên gọi và khái niệm thân thiện với nghiệp vụ kinh doanh, thay vì cấu trúc bảng thô.

## Tại Sao Contexts Lại Quan Trọng

Nếu không có context, AI sẽ phải phân tích toàn bộ cấu trúc database của bạn mỗi lần người dùng đặt câu hỏi. Khi có context:

- Các truy vấn (queries) sẽ nhanh hơn và chính xác hơn
- Bạn kiểm soát chính xác những dữ liệu nào được phép truy xuất
- Logic nghiệp vụ (ví dụ: "Doanh thu = giá × số lượng") chỉ cần định nghĩa một lần
- Các cột chứa dữ liệu nhạy cảm có thể được ẩn đi đối với một số người dùng cụ thể

## Các Thành Phần Của Context

| Thành Phần | Mô Tả |
|-----------|-------------|
| **Tables** | Các bảng database được đưa vào context này |
| **Columns** | Các cột được chọn cùng tên hiển thị thân thiện |
| **Relationships** | Các phép nối (joins) qua khóa ngoại giữa các bảng |
| **Calculated Columns** | Các biểu thức SQL (ví dụ: `price * quantity`) |
| **Metrics** | Các thước đo được tổng hợp (ví dụ: `SUM(revenue)`) |
| **KPIs** | Các metric kinh doanh chính hiển thị trên trang tổng quan của context |
| **Access Policies** | Các bộ lọc dòng (row-level filters) theo từng role |

## Bước Tiếp Theo

- [Xây Dựng Data Model](data-model.md)
- [Row-Level Security](rls.md)
