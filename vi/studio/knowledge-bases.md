# Knowledge Bases (Cơ Sở Tri Thức)

**Điều hướng:** Studio → DSAI → Knowledge Bases

Knowledge Base là kho tài liệu nội bộ (PDF, Word, văn bản...) được vector hóa để AI Assistants có thể tra cứu và trả lời câu hỏi dựa trên nội dung tài liệu — ngoài khả năng phân tích dữ liệu database thông thường.

## Mục Đích

- Cho phép AI trả lời câu hỏi về quy trình nội bộ, chính sách, tài liệu kỹ thuật
- Kết hợp dữ liệu có cấu trúc (database) với tài liệu phi cấu trúc (văn bản)
- Xây dựng chatbot tri thức cho bộ phận HR, IT, Pháp lý, v.v.

## Tạo Knowledge Base Mới

1. Vào **Studio → DSAI → Knowledge Bases → New Knowledge Base**
2. Điền thông tin:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên Knowledge Base (ví dụ: "Quy định Nhân sự 2024") |
| **Description** | Mô tả nội dung |
| **Embedding Provider** | Chọn AI Provider có capability `Embedding` |

3. Nhấn **Save**
4. Thêm tài liệu vào Knowledge Base (upload file hoặc thêm URL)
5. Nhấn **Sync** để vector hóa tài liệu

## Trạng Thái Đồng Bộ

| Trạng Thái | Ý Nghĩa |
|------------|---------|
| **Idle** | Chưa đồng bộ hoặc chờ |
| **Syncing** | Đang xử lý và vector hóa tài liệu |
| **Synced** | Hoàn tất, sẵn sàng sử dụng |
| **Error** | Có lỗi trong quá trình đồng bộ |

## Gắn Knowledge Base vào AI Assistant

1. Mở AI Assistant cần gắn (Studio → DSAI → AI Assistants → chọn Assistant)
2. Trong phần cấu hình, chọn một hoặc nhiều Knowledge Base
3. Save

Sau đó, khi người dùng chat với Assistant này, AI sẽ tra cứu cả database lẫn tài liệu trong Knowledge Base.

## Lưu Ý

- Cần có Embedding Provider hoạt động trước khi tạo Knowledge Base.
- Mỗi lần cập nhật tài liệu, cần Sync lại để cập nhật vector.
- Phân quyền: `create_knowledge`, `edit_knowledge`, `delete_knowledge`.
