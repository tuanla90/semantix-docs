# AI Providers

**Điều hướng:** Studio → DSAI → AI Providers

AI Providers quản lý các nhà cung cấp mô hình AI (LLM, embedding) được kết nối với Semantix. Mỗi Provider cần API key và có thể được chỉ định làm mặc định cho các tính năng khác nhau.

## Các Provider Được Hỗ Trợ

| Provider | Loại Model |
|----------|-----------|
| **OpenAI** | LLM (GPT-4, GPT-4o...) + Embedding |
| **Anthropic** | LLM (Claude Sonnet, Opus...) |
| **Google Gemini** | LLM (Gemini Pro, Flash...) + Embedding |
| **DeepSeek** | LLM |
| **Ollama** | LLM local (self-hosted) |
| **Local / Custom** | Model tự triển khai với OpenAI-compatible API |

## Tạo AI Provider Mới

1. Vào **Studio → DSAI → AI Providers → New Provider**
2. Điền thông tin:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên nhận biết (ví dụ: `OpenAI Production`) |
| **Provider** | Chọn nhà cung cấp |
| **API Key** | Khóa API (được mã hóa khi lưu) |
| **Base URL** | URL endpoint (cần cho Ollama hoặc custom endpoint) |
| **Capabilities** | Chọn: `LLM`, `Embedding`, `Image`, `Audio` |
| **Default LLM** | Đặt làm model ngôn ngữ mặc định |
| **Default Embedding** | Đặt làm model embedding mặc định |
| **Active** | Bật/tắt provider |

3. Nhấn **Save**

## Khuyến Nghị Cấu Hình

- Cần ít nhất **1 LLM provider** đang hoạt động để AI Chat và AI Assistants hoạt động.
- Cần ít nhất **1 Embedding provider** để Knowledge Bases hoạt động.
- Có thể cấu hình nhiều provider — mỗi AI Assistant chọn provider riêng.

## Lưu Ý Bảo Mật

API key được mã hóa và không bao giờ hiển thị lại sau khi lưu. Nếu cần cập nhật key, phải nhập lại toàn bộ.
