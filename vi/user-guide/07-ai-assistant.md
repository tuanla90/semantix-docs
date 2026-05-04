# 7. AI Assistant — Đặt Câu Hỏi Phân Tích

Sau khi đã thiết lập Context đầy đủ, người dùng có thể bắt đầu giao tiếp với dữ liệu và đặt câu hỏi bằng ngôn ngữ tự nhiên.

**Điều hướng:** Analysis → chọn Context → **Chat**

## Cách Đặt Câu Hỏi Hiệu Quả

**Câu hỏi tốt (Cụ thể & Trực tiếp):**

```text
Doanh thu tháng này theo từng sản phẩm, sắp xếp giảm dần
```
```text
Top 10 khách hàng có doanh thu cao nhất quý vừa rồi
```
```text
So sánh doanh thu tháng này với tháng trước theo từng kênh bán
```

**Câu hỏi phân tích sâu:**

```text
Tại sao doanh thu tháng 3 giảm so với tháng 2?
```
```text
Sản phẩm nào đang có xu hướng tăng trưởng mạnh nhất?
```

## Quy Trình AI Xử Lý Câu Hỏi

Hệ thống hoạt động theo một luồng xử lý an toàn và bảo mật:

```text
1. Câu hỏi (Ngôn ngữ tự nhiên)
         ↓
2. Phân tích Intent (Ý định) & Entity
         ↓
3. Tự động sinh lệnh SQL
         ↓
4. Validate bảo mật theo Context rules
         ↓
5. Thực thi câu lệnh SQL trên DB
         ↓
6. Tự động vẽ biểu đồ & đưa ra nhận xét
```

## Cấu Hình AI Assistant

Quản trị viên có thể tùy chỉnh hành vi và tính cách của trợ lý AI.

**Điều hướng:** Admin → Assistants → **New Assistant**

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên trợ lý (ví dụ: "Trợ lý Kinh doanh"). |
| **Context** | Gắn với Context đã được cấu hình. |
| **AI Provider** | Lựa chọn model: OpenAI, Gemini, hoặc Anthropic. |
| **Personality** | Định hướng phong cách trả lời. Ví dụ: "Trả lời ngắn gọn, dùng tiếng Việt chuyên nghiệp, tập trung vào insight thực tế." |
| **Language** | Ngôn ngữ giao tiếp chính (Tiếng Việt hoặc English). |
| **Greeting Message** | Câu chào hiển thị mặc định khi mở khung chat. |
