# Suggestions (Gợi Ý Câu Hỏi)

**Điều hướng:** Studio → DABI → Suggestions

Suggestions là module quản lý các **câu hỏi mẫu** được gợi ý cho người dùng khi mở AI Chat. Người dùng thường xuyên có thể đề xuất câu hỏi hữu ích, và Admin/Approver xem xét phê duyệt những gợi ý phù hợp để hiển thị cho toàn đội.

---

## Tại Sao Cần Suggestions?

**Với người dùng mới:** Không biết hỏi gì → Suggestions hiển thị ngay các câu hỏi hữu ích → giảm thời gian làm quen, tăng giá trị ngay từ ngày đầu.

**Với Admin:** Có thể định hướng cách người dùng khai thác hệ thống — đảm bảo người dùng hỏi đúng câu hỏi, đúng cách, đúng metric đã định nghĩa.

---

## Vòng Đời Của Một Suggestion

```
Người dùng đề xuất câu hỏi trong AI Chat
            ↓
Suggestion tạo ra với Status = Pending
            ↓
Admin/Approver xem xét trong Studio → DABI → Suggestions
    ↙               ↘
Approve          Reject
    ↓               ↓
Hiển thị trong    Không hiển thị,
AI Chat           có thể ghi chú lý do
```

---

## Đề Xuất Suggestion (Dành Cho Người Dùng)

Trong giao diện AI Chat, sau khi đặt câu hỏi và nhận kết quả tốt:

1. Nhấn nút **✨ Suggest** hoặc **💡 Propose Question** (tùy giao diện).
2. Điền thông tin:
   - **Câu hỏi**: Câu hỏi mẫu muốn đề xuất
   - **Mô tả** (tùy chọn): Giải thích ngắn tại sao câu hỏi này hữu ích
3. Nhấn **Submit**.

Suggestion được tạo với trạng thái **Pending** — chờ Admin xem xét.

---

## Quản Lý Suggestions (Dành Cho Admin/Approver)

### Xem Danh Sách

1. Vào **Studio → DABI → Suggestions**.
2. Trang hiển thị danh sách tất cả suggestions với bộ lọc theo tab:

| Tab | Hiển Thị |
|-----|---------|
| **Tất cả** | Mọi suggestion |
| **Pending** | Đang chờ xem xét |
| **Approved** | Đã phê duyệt, đang hiển thị trong chat |
| **Rejected** | Đã từ chối |

### Tìm Kiếm và Lọc

- **Search**: Tìm theo nội dung câu hỏi
- **Filter by Context**: Lọc suggestion theo Context cụ thể
- **Filter by User**: Xem suggestion từ một người dùng cụ thể
- **Sort by**: Ngày tạo (mới nhất trước), Trạng thái, Context

### Phê Duyệt Suggestion

1. Nhấn vào suggestion cần xem xét.
2. Đọc câu hỏi và thông tin đề xuất.
3. (Tùy chọn) Chỉnh sửa lại câu hỏi cho rõ nghĩa hơn trước khi approve.
4. Nhấn **Approve** để phê duyệt.

Suggestion được duyệt sẽ xuất hiện ngay trong giao diện AI Chat (phần gợi ý câu hỏi).

### Từ Chối Suggestion

1. Nhấn vào suggestion.
2. Nhấn **Reject**.
3. (Khuyến nghị) Điền **lý do từ chối** để người đề xuất hiểu và cải thiện.

Suggestion bị từ chối không hiển thị trong chat nhưng vẫn lưu lịch sử trong hệ thống.

### Phê Duyệt Hàng Loạt

Nếu có nhiều suggestions đang Pending:
1. Chọn checkbox nhiều suggestions.
2. Nhấn **Approve All Selected** hoặc **Reject All Selected**.
3. Xác nhận.

---

## Trạng Thái Suggestion

| Trạng Thái | Màu | Ý Nghĩa |
|------------|-----|---------|
| **Pending** | 🟡 Vàng | Đang chờ Admin xem xét |
| **Approved** | 🟢 Xanh | Đã phê duyệt — hiển thị trong AI Chat |
| **Rejected** | 🔴 Đỏ | Đã từ chối — không hiển thị |

---

## Tạo Suggestion Từ Admin

Admin cũng có thể chủ động tạo suggestion mà không cần chờ người dùng đề xuất:

1. Trong trang Suggestions, nhấn **New Suggestion**.
2. Điền:
   - **Context**: Suggestion thuộc Context nào
   - **Question**: Câu hỏi mẫu
   - **Description**: Giải thích ngắn (hiển thị như tooltip trong chat)
   - **Category**: Nhóm câu hỏi (ví dụ: "Doanh thu", "Khách hàng", "Sản phẩm")
   - **Order**: Thứ tự hiển thị (số nhỏ hơn hiển thị trước)
3. Nhấn **Save** — suggestion tự động có status Approved.

---

## Cách Suggestions Hiển Thị Trong AI Chat

Khi người dùng mở AI Chat và chọn AI Assistant:
- Phần dưới khung chat hiển thị các **chip gợi ý** (suggestion chips).
- Người dùng nhấn vào một chip → câu hỏi tự động điền vào ô nhập → có thể gửi ngay.
- Các suggestion được nhóm theo Category (nếu có).

**Ví dụ hiển thị trong chat:**

```
💡 Câu hỏi gợi ý:
[Doanh thu hôm nay?] [Top sản phẩm tháng này?] [Số khách hàng mới?]
[So sánh doanh thu vs tháng trước] [Tỷ lệ đơn hủy tuần này?]
```

---

## Thực Hành Tốt Nhất

### 1. Suggestions Tốt Trông Như Thế Nào?

✅ **Tốt:**
- `Tổng doanh thu tháng này là bao nhiêu?`
- `Top 10 khách hàng doanh thu cao nhất quý 2?`
- `So sánh doanh thu kênh online và offline tháng 6?`

❌ **Kém:**
- `Dữ liệu` (quá chung chung)
- `SELECT * FROM orders` (người dùng không cần biết SQL)
- `Revenue?` (quá ngắn, thiếu ngữ cảnh)

### 2. Cập Nhật Suggestions Định Kỳ

- Xem xét suggestions **mỗi tuần một lần** để không có Pending tồn đọng lâu.
- Khi Context thay đổi (thêm Model mới, thêm Metric mới), tạo thêm suggestions phù hợp.
- Ẩn (deactivate) suggestions về tính năng cũ hoặc không còn liên quan.

### 3. Cân Bằng Số Lượng

Không nên có quá nhiều suggestions (khó chọn) hoặc quá ít (không có giá trị). Lý tưởng: **5-15 suggestions** mỗi Context, chia thành 3-4 nhóm chủ đề.

---

## Phân Quyền

| Permission | Cho Phép |
|------------|---------|
| `edit_suggestion` | Phê duyệt, từ chối, chỉnh sửa, tạo mới suggestions |
| (không có permission) | Chỉ có thể đề xuất từ giao diện AI Chat |

Người dùng thông thường không thể vào Studio → DABI → Suggestions.
