# Contexts & Row-Level Security

Hướng dẫn chuyên sâu về Semantic Context - lớp ngữ nghĩa kết nối database với AI - và Row-Level Security để kiểm soát phạm vi dữ liệu theo người dùng.

---

## Context Là Gì?

**Context** (Ngữ cảnh) là lớp trung gian giữa database thô và AI. Nó giải thích cho AI biết:

- Những bảng và cột nào tồn tại và có ý nghĩa gì
- Cách các bảng liên kết với nhau (JOIN relationships)
- Những chỉ số kinh doanh (Metrics) nào cần tính
- Ai được phép thấy dữ liệu nào (Row-Level Security)
- Ngôn ngữ và phong cách trả lời

```
Người dùng: "Doanh thu tháng này?"
                    ↓
         Context (semantic layer)
         ├── Biết "doanh thu" = Metric "net_revenue"
         ├── Biết "tháng này" = WHERE created_at BETWEEN...
         ├── Biết user thuộc chi nhánh HN → lọc theo chi nhánh
         └── Biết dùng bảng orders JOIN customers
                    ↓
         AI sinh SQL chính xác
                    ↓
         Database thực thi
```

---

## Tại Sao Cần Context?

**Không có Context:**
- AI phải đoán toàn bộ cấu trúc database
- Dễ dùng sai bảng, sai cột, sai JOIN
- Mỗi câu hỏi có thể cho kết quả khác nhau dù hỏi giống nhau

**Có Context:**
- AI biết chính xác từng khái niệm nghiệp vụ map với cột/bảng nào
- Kết quả nhất quán và dự đoán được
- Business logic (filter, calculation) được đóng gói, không phụ thuộc vào câu hỏi của user

---

## Cấu Trúc Của Context

| Thành Phần | Vai Trò |
|-----------|---------|
| **Connection** | Nguồn dữ liệu (PostgreSQL, BigQuery...) |
| **Data Models** | Các bảng/view được đưa vào context với mô tả chi tiết |
| **Calculated Fields** | Công thức tính từ các cột cơ bản |
| **Metrics** | Chỉ số kinh doanh tổng hợp (SUM, COUNT...) |
| **Relations** | Định nghĩa cách các bảng JOIN với nhau |
| **Default Time Column** | Cột ngày mặc định khi hỏi "tháng này" |
| **Instructions** | Hướng dẫn riêng cho AI với context này |
| **Access Control (RLS)** | Ai xem được dữ liệu nào |
| **Advanced Analysis** | Cohort, RFM, Funnel nếu cần |

---

## Thiết Kế Context Theo Bộ Phận

**Thực tiễn tốt nhất**: Tạo một Context riêng cho từng bộ phận hoặc use case lớn, thay vì một Context khổng lồ cho toàn công ty.

**Ví dụ cấu trúc:**

```
Context "Sales Analytics"
├── Models: orders, customers, products, branches
├── Metrics: doanh_thu, so_don, gia_tri_trung_binh
└── RLS: chi_nhanh = {{user.chi_nhanh}}

Context "HR Analytics"
├── Models: employees, departments, salaries, attendance
├── Metrics: headcount, avg_salary, turnover_rate
└── RLS: department = {{user.phong_ban}}

Context "Finance"
├── Models: transactions, accounts, budgets
├── Metrics: revenue, expenses, profit, cash_flow
└── RLS: chỉ Finance team và C-level
```

**Lợi ích tách Context:**
- Người Sales không thấy dữ liệu HR và ngược lại
- Mỗi AI Assistant có thể gắn với một Context riêng
- Dễ quản lý permissions theo bộ phận

---

## Tạo Context Từ Đầu

### Bước 1: Xác Định Phạm Vi

Trước khi tạo, xác định:
- Bộ phận/nhóm người dùng nào sẽ dùng Context này?
- Họ cần trả lời các câu hỏi thuộc loại nào?
- Dữ liệu nào KHÔNG nên họ thấy?

### Bước 2: Chọn Và Cấu Hình Data Models

1. Studio → DABI → Data Models → New Model
2. Chọn Connection và bảng nguồn
3. Cấu hình Columns (Label, Description, Type)
4. Tạo Calculated Fields nếu cần
5. Tạo Metrics với Filter phù hợp
6. Khai báo Relations giữa các bảng

### Bước 3: Tạo Context

1. Studio → DABI → Data Models → Chọn model → Tab Contexts → New Context
2. Đặt tên, mô tả
3. Chọn Default Time Column
4. Viết Instructions (quy tắc nghiệp vụ đặc thù)
5. Cấu hình RLS nếu cần

### Bước 4: Kết Nối Với AI Assistant

1. Studio → DSAI → AI Assistants → Chọn Assistant
2. Gắn Context vừa tạo
3. Test với một số câu hỏi thực tế

---

## Xem Chi Tiết

- [Xây Dựng Data Model](data-model.md) — Quy trình tạo Model từng bước
- [Row-Level Security](rls.md) — Cấu hình kiểm soát dữ liệu theo người dùng
