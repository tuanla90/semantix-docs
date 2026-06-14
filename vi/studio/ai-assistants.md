# AI Assistants (Trợ Lý AI)

**Điều hướng:** Studio → DSAI → AI Assistants

AI Assistants là các trợ lý AI có thể cấu hình riêng về tính cách, ngôn ngữ, ngữ cảnh dữ liệu và AI provider. Một hệ thống có thể có nhiều AI Assistant phục vụ các bộ phận hoặc mục đích khác nhau.

## Tạo AI Assistant Mới

1. Vào **Studio → DSAI → AI Assistants → New Assistant**
2. Điền thông tin cấu hình:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên trợ lý (ví dụ: "Trợ lý Kinh doanh") |
| **Icon** | Biểu tượng nhận diện |
| **Context** | Gắn với Semantic Context đã tạo |
| **AI Provider** | Chọn provider (OpenAI, Anthropic, Gemini...) |
| **Model** | Tên model cụ thể (ví dụ: `gpt-4o`, `claude-3-5-sonnet`) |
| **Personality** | Hướng dẫn phong cách trả lời (system prompt) |
| **Language** | Ngôn ngữ giao tiếp chính |
| **Greeting Message** | Câu chào mặc định khi mở chat |
| **Active** | Bật/tắt assistant |

## Personality — Hướng Dẫn Cách Viết

Personality (system prompt) định hướng cách AI trả lời. Ví dụ:

```
Bạn là trợ lý phân tích kinh doanh của công ty XYZ. Trả lời ngắn gọn, 
dùng tiếng Việt chuyên nghiệp. Tập trung vào số liệu thực tế và đưa ra 
nhận xét kinh doanh có giá trị. Luôn trình bày số liệu dạng bảng nếu có thể.
```

## Sử Dụng AI Assistant

Sau khi tạo, người dùng có thể:
1. Mở **AI Chat** (menu trên cùng)
2. Chọn AI Assistant từ danh sách
3. Bắt đầu đặt câu hỏi

## Phân Quyền Truy Cập

Mỗi Assistant có thể được phân quyền cho các Role hoặc User cụ thể thông qua **Access Control**. Người dùng chỉ thấy các Assistant mình có quyền dùng.

## Knowledge Bases

AI Assistant có thể gắn với một hoặc nhiều **Knowledge Base** để trả lời câu hỏi dựa trên tài liệu nội bộ. Xem [Knowledge Bases](knowledge-bases.md).
