# Suggestions (Gợi Ý Câu Hỏi)

**Điều hướng:** Studio → DABI → Suggestions

Suggestions là module quản lý các câu hỏi mẫu (sample questions) được gợi ý cho người dùng trong AI Chat. Admin có thể xem xét, phê duyệt hoặc từ chối các suggestion do người dùng đề xuất.

## Vai Trò Của Suggestions

- Người dùng trong AI Chat có thể đề xuất câu hỏi mẫu cho bộ phận của mình
- Admin hoặc Approver xem xét và phê duyệt các gợi ý phù hợp
- Các gợi ý được duyệt sẽ hiển thị trong giao diện chat để hướng dẫn người dùng mới

## Trạng Thái Suggestion

| Trạng Thái | Ý Nghĩa |
|------------|---------|
| **Pending** | Đang chờ xem xét |
| **Approved** | Đã phê duyệt — hiển thị trong chat |
| **Rejected** | Đã từ chối |

## Quản Lý Suggestions

1. Vào **Studio → DABI → Suggestions**
2. Dùng bộ lọc **Status** để xem theo trạng thái (Pending / Approved / Rejected)
3. Tìm kiếm theo nội dung câu hỏi
4. Nhấn vào một suggestion để xem chi tiết
5. Chọn **Approve** hoặc **Reject** (có thể thêm ghi chú lý do)

## Sắp Xếp và Lọc

- Sắp xếp theo: Ngày tạo, Trạng thái, Loại
- Lọc nhanh theo tab: **Tất cả / Pending / Approved / Rejected**
- Phân trang để duyệt số lượng lớn

## Lưu Ý

- Phân quyền: Cần quyền `edit_suggestion` để phê duyệt/từ chối.
- Suggestions mang lại giá trị lớn khi được cập nhật thường xuyên — chúng giúp người dùng mới nhanh chóng biết có thể hỏi gì.
