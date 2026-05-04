# Xây Dựng Data Model

## Bước 1 — Tạo Một Context

1. Đi tới **Admin → Contexts → New Context**
2. Đặt tên cho context (ví dụ: "Sales Analytics")
3. Chọn **Connection** để sử dụng
4. Nhấn **Save**

## Bước 2 — Thêm Các Bảng (Add Tables)

1. Mở context → tab **Scope**
2. Nhấn **Add Table**
3. Chọn các bảng từ schema database của bạn
4. Đặt một tên hiển thị thân thiện (**Display Name**) nếu cần
5. Chọn các **Columns** (cột) muốn đưa vào (bạn có thể bỏ chọn các cột nhạy cảm để ẩn chúng)

## Bước 3 — Định Nghĩa Các Quan Hệ (Relationships)

Nếu dữ liệu của bạn nằm rải rác trên nhiều bảng, hãy định nghĩa cách chúng nối (join) với nhau:

1. Trong tab **Scope** → **Relationships**
2. Nhấn **Add Relationship**
3. Chọn **From Table**, **From Column**, **To Table**, và **To Column**
4. Chọn loại join (khuyên dùng **LEFT JOIN** cho hầu hết các trường hợp)

## Bước 4 — Thêm Calculated Columns

Calculated columns cho phép bạn định nghĩa logic nghiệp vụ một lần duy nhất:

1. Đi tới tab **Model** → **Calculated Columns**
2. Nhấn **Add**
3. Nhập tên và biểu thức SQL, ví dụ:
   ```sql
   price * quantity
   ```
4. Chọn kiểu dữ liệu (Number, Text, Date)

## Bước 5 — Định Nghĩa Metrics

Metrics là các thước đo đã được tổng hợp (aggregated measures) mà AI có thể sử dụng trực tiếp:

| Ví Dụ Metric | Biểu Thức |
|---------------|------------|
| Total Revenue | `SUM(orders.price * orders.quantity)` |
| Avg Order Value | `AVG(orders.total)` |
| Unique Customers | `COUNT(DISTINCT orders.customer_id)` |

## Bước 6 — Cấu Hình Assistant

Gán một AI Assistant cho context để người dùng có thể bắt đầu chat:

1. Đi tới tab **Overview** → **Assistant**
2. Chọn một assistant có sẵn hoặc tạo mới

## Bước 7 — Kiểm Tra (Test It)

Sử dụng bảng **Query Preview** trên trang context để kiểm tra các câu hỏi bằng ngôn ngữ tự nhiên trước khi chia sẻ với team của bạn.
