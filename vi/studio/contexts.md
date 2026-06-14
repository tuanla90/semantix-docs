# Semantic Contexts (Ngữ Cảnh Ngữ Nghĩa)

**Điều hướng:** Studio → DABI → Semantic Contexts

Context là tập hợp các Model, Metric và quy tắc nghiệp vụ được nhóm theo một chủ đề hoặc bộ phận. AI Assistant hoạt động trong phạm vi một Context — giúp đảm bảo câu trả lời mang tính chuyên môn và chính xác cao.

## Tạo Context Mới

1. Vào **Studio → DABI → Semantic Contexts → New Context**
2. Điền thông tin:

### Thông Tin Cơ Bản

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên kỹ thuật (ví dụ: `sales_analysis`) |
| **Label** | Tên hiển thị (ví dụ: `Phân tích Bán hàng`) |
| **Description** | Mô tả phạm vi ngữ cảnh — AI đọc để định hướng trả lời |

### Chọn Models

Thêm các Model liên quan vào Context (ví dụ: `don_hang`, `khach_hang`, `san_pham`).

### Chọn Metrics

Chọn các Metric người dùng trong Context này được phép truy vấn.

### Forbidden Combinations (Tùy Chọn)

Khai báo quy tắc ngăn AI sinh truy vấn sai nghiệp vụ. Ví dụ:

```
Không được GROUP BY mã nhân viên khi đang lọc theo chi nhánh.
```

### Default Time Column

Chọn cột ngày tháng làm mặc định — AI dùng cột này khi người dùng hỏi về "tháng này", "tuần trước" mà không chỉ rõ cột ngày nào.

## Gắn Context vào AI Assistant

Sau khi tạo xong Context, gắn nó vào một AI Assistant (xem [AI Assistants](ai-assistants.md)) để người dùng có thể hỏi trong phạm vi ngữ cảnh đó.

## Row-Level Security

Context hỗ trợ lọc dữ liệu theo phân quyền người dùng. Xem chi tiết tại [Row-Level Security](../contexts/rls.md).
