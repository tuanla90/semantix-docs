# Row-Level Security (RLS)

Row-Level Security (RLS) cho phép bạn giới hạn những dòng dữ liệu mà một người dùng có thể xem dựa trên role của họ — mà không cần phải thay đổi phân quyền trực tiếp trên database.

## Cách Hoạt Động

1. Bạn định nghĩa các **Access Policies** (Chính sách truy cập) cho từng role trên một context
2. Mỗi policy chứa các **row filters** (bộ lọc dòng, ví dụ: `region = 'Asia'`)
3. Khi người dùng truy vấn dữ liệu, Semantix sẽ tự động ghép các bộ lọc này vào câu lệnh SQL được sinh ra

Người dùng sẽ không bao giờ nhìn thấy các bộ lọc này — họ chỉ nhìn thấy những dữ liệu mà họ được phép xem.

## Thiết Lập RLS

### Bước 1 — Tạo Role

1. Đi tới **Admin → Users & Roles → Roles → New Role**
2. Đặt tên cho role (ví dụ: "Asia Sales Team")
3. Gán người dùng vào role này

### Bước 2 — Tạo Một Access Policy

1. Mở context → tab **Access**
2. Nhấn **Add Policy**
3. Chọn **Role**
4. Thêm các bộ lọc dòng (row filters):

| Column | Operator | Value |
|--------|----------|-------|
| `region` | `=` | `Asia` |
| `status` | `IN` | `active, pending` |

5. Nhấn **Save**

## Các Toán Tử (Operators) Hỗ Trợ

| Toán Tử | Ví Dụ |
|----------|---------|
| `=` | `region = 'Asia'` |
| `!=` | `status != 'deleted'` |
| `IN` | `country IN ('VN', 'TH', 'SG')` |
| `NOT IN` | `tier NOT IN ('free')` |
| `>`, `>=`, `<`, `<=` | `revenue >= 1000` |
| `LIKE` | `name LIKE 'A%'` |
| `IS NULL` | `deleted_at IS NULL` |
| `BETWEEN` | `created_at BETWEEN date1 AND date2` |

## Ví Dụ

Một người dùng thuộc role **"Asia Sales Team"** đặt câu hỏi:

> *"Hiển thị tổng doanh thu theo sản phẩm"*

Semantix sinh ra truy vấn:

```sql
SELECT product, SUM(revenue) as total_revenue
FROM orders
WHERE region = 'Asia'   -- ← được tự động tiêm vào từ RLS policy
GROUP BY product
```

Người dùng sẽ chỉ thấy dữ liệu của khu vực của họ mà không hề biết rằng bộ lọc này tồn tại.

> ⚠️ Các bộ lọc RLS được áp dụng ở phía server-side và người dùng không thể can thiệp bỏ qua (bypass) được.
