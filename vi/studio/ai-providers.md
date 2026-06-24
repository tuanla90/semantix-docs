# AI Providers

**Điều hướng:** Studio → DSAI → AI Providers

AI Providers quản lý các nhà cung cấp mô hình AI (LLM và Embedding) được kết nối với Semantix. Đây là bước bắt buộc — không có AI Provider, toàn bộ tính năng AI Chat và AI Assistants sẽ không hoạt động.

---

## Tổng Quan

Semantix cần ít nhất:
- **1 LLM Provider** (Language Model) → cho AI Chat và AI Assistants hiểu câu hỏi và sinh SQL
- **1 Embedding Provider** → cho Knowledge Bases vector hóa tài liệu (nếu có dùng Knowledge Base)

Bạn có thể cấu hình nhiều Provider — mỗi AI Assistant có thể chọn Provider riêng.

---

## Các Provider Được Hỗ Trợ

| Provider | Loại Model | Ghi Chú |
|----------|-----------|---------|
| **OpenAI** | LLM + Embedding | Phổ biến nhất, chất lượng cao, hỗ trợ tiếng Việt tốt |
| **Anthropic** | LLM | Claude Sonnet/Opus — lý luận tốt, ít "hallucination" |
| **Google Gemini** | LLM + Embedding | Hỗ trợ ngữ cảnh rất dài (1M token), đa phương thức |
| **DeepSeek** | LLM | Model mã nguồn mở hiệu suất cao, chi phí thấp |
| **Ollama** | LLM (local) | Self-hosted — không gửi dữ liệu ra ngoài |
| **Custom / Local** | LLM | Bất kỳ model nào có OpenAI-compatible API |

---

## Tạo AI Provider Mới

### Bước 1 — Mở Form Tạo Provider

1. Vào **Studio → DSAI → AI Providers → New Provider**.
2. Form cấu hình hiện ra.

### Bước 2 — Điền Thông Tin Cơ Bản

| Trường | Bắt Buộc | Ví Dụ | Mô Tả |
|--------|----------|--------|--------|
| **Name** | Có | `OpenAI Production` | Tên nhận biết trong Semantix |
| **Provider** | Có | `OpenAI` | Chọn nhà cung cấp từ danh sách |
| **API Key** | Có | `sk-...` | Khóa API (được mã hóa khi lưu) |
| **Base URL** | Tùy | `https://api.openai.com/v1` | Chỉ cần cho Ollama hoặc custom endpoint |
| **Active** | — | Bật | Tắt để vô hiệu hóa tạm thời |

### Bước 3 — Cấu Hình Capabilities

Chọn loại tính năng Provider này hỗ trợ:

| Capability | Dùng Cho |
|-----------|---------|
| **LLM** | AI Chat, AI Assistants, phân tích ngôn ngữ tự nhiên → SQL |
| **Embedding** | Knowledge Bases, tìm kiếm ngữ nghĩa |
| **Image** | Phân tích hình ảnh (nếu model hỗ trợ) |
| **Audio** | Chuyển đổi giọng nói → văn bản (nếu hỗ trợ) |

### Bước 4 — Đặt Provider Mặc Định

| Cài Đặt | Ý Nghĩa |
|---------|---------|
| **Default LLM** | Provider này được dùng mặc định cho AI Chat khi AI Assistant không chỉ định Provider riêng |
| **Default Embedding** | Provider này được dùng mặc định cho Knowledge Base khi không chỉ định |

### Bước 5 — Lưu

Nhấn **Save**. Provider xuất hiện trong danh sách.

---

## Cấu Hình Chi Tiết Theo Từng Provider

### OpenAI

**Lấy API Key:**
1. Đăng nhập vào [platform.openai.com](https://platform.openai.com).
2. Vào **API Keys** → nhấn **Create new secret key**.
3. Đặt tên (ví dụ: "Semantix Production") → **Create**.
4. Copy key ngay — sẽ không hiển thị lại.

**Cấu hình trong Semantix:**

| Trường | Giá Trị |
|--------|---------|
| Provider | OpenAI |
| API Key | `sk-proj-...` hoặc `sk-...` |
| Base URL | (để trống — dùng mặc định) |
| Capabilities | LLM ✓, Embedding ✓ |

**Các model LLM phổ biến:**
- `gpt-4o` — nhanh, thông minh, tiếng Việt tốt (khuyến nghị)
- `gpt-4o-mini` — nhanh hơn, rẻ hơn, vẫn chất lượng tốt
- `gpt-4-turbo` — ngữ cảnh 128K token
- `gpt-3.5-turbo` — rất nhanh, rẻ nhất, phù hợp câu hỏi đơn giản

**Các model Embedding:**
- `text-embedding-3-small` — nhanh, rẻ, đủ tốt (khuyến nghị)
- `text-embedding-3-large` — chất lượng cao hơn, chậm và đắt hơn

### Anthropic (Claude)

**Lấy API Key:**
1. Đăng nhập vào [console.anthropic.com](https://console.anthropic.com).
2. Vào **API Keys** → **Create Key**.
3. Copy key.

**Cấu hình:**

| Trường | Giá Trị |
|--------|---------|
| Provider | Anthropic |
| API Key | `sk-ant-...` |
| Capabilities | LLM ✓ (không hỗ trợ Embedding) |

**Các model Claude:**
- `claude-sonnet-4-5` — cân bằng tốt giữa tốc độ và chất lượng (khuyến nghị)
- `claude-opus-4-7` — mạnh nhất, tốt nhất cho phân tích phức tạp
- `claude-haiku-4-5` — nhanh nhất, rẻ nhất

> Anthropic không có Embedding model — cần kết hợp với OpenAI hoặc Gemini cho Knowledge Base.

### Google Gemini

**Lấy API Key:**
1. Vào [aistudio.google.com](https://aistudio.google.com).
2. Nhấn **Get API Key** → **Create API key in new project**.
3. Copy key.

**Cấu hình:**

| Trường | Giá Trị |
|--------|---------|
| Provider | Google Gemini |
| API Key | `AIzaSy...` |
| Capabilities | LLM ✓, Embedding ✓ |

**Các model:**
- `gemini-1.5-pro` — ngữ cảnh 2M token, mạnh nhất
- `gemini-1.5-flash` — rất nhanh, chi phí thấp
- `gemini-2.0-flash-exp` — thế hệ mới, thử nghiệm

### DeepSeek

**Cấu hình:**

| Trường | Giá Trị |
|--------|---------|
| Provider | DeepSeek |
| API Key | Lấy từ [platform.deepseek.com](https://platform.deepseek.com) |
| Capabilities | LLM ✓ |

**Các model:**
- `deepseek-chat` — đa dụng, hiệu suất tốt, chi phí rất thấp
- `deepseek-coder` — tối ưu cho code/SQL generation

### Ollama (Self-Hosted)

Dùng khi muốn chạy model **hoàn toàn trên server của bạn** — không gửi dữ liệu ra internet.

**Chuẩn bị:**
1. Cài Ollama: [ollama.ai](https://ollama.ai)
2. Pull model: `ollama pull llama3.2` hoặc `ollama pull mistral`
3. Ollama chạy trên `http://localhost:11434`

**Cấu hình trong Semantix:**

| Trường | Giá Trị |
|--------|---------|
| Provider | Ollama |
| API Key | (để trống) |
| Base URL | `http://localhost:11434` hoặc URL server Ollama của bạn |
| Capabilities | LLM ✓ (một số model hỗ trợ Embedding) |

**Model khuyến nghị cho Tiếng Việt:**
- `qwen2.5:14b` — hỗ trợ tiếng Việt khá tốt
- `llama3.2:3b` — nhẹ, nhanh
- `mistral:7b` — cân bằng tốt

---

## Quản Lý AI Providers

### Xem Danh Sách

Trang **Studio → DSAI → AI Providers** hiển thị:
- Tên Provider và icon nhà cung cấp
- Capabilities đang bật (LLM, Embedding...)
- Trạng thái Default (LLM mặc định, Embedding mặc định)
- Active / Inactive

### Kiểm Tra Kết Nối

Nhấn **Test** bên cạnh một Provider để:
- Gửi request thử nghiệm đến API
- Xác nhận API Key còn hợp lệ
- Đo thời gian phản hồi

### Cập Nhật API Key

API Key không bao giờ hiển thị lại sau khi Save. Khi cần thay đổi:
1. Nhấn **Edit** trên Provider.
2. Nhập API Key mới.
3. Nhấn **Save**.

### Vô Hiệu Hóa Provider

Tắt toggle **Active** để tạm dừng Provider. Các AI Assistant đang dùng Provider này sẽ báo lỗi cho đến khi bật lại hoặc chuyển sang Provider khác.

---

## Lưu Ý Bảo Mật

- API Key được **mã hóa AES-256** khi lưu trong database — không ai có thể đọc lại key gốc.
- Không bao giờ chia sẻ API Key qua email, chat, hay commit lên git.
- Đặt **ngân sách (spending limit)** trên tài khoản OpenAI/Anthropic/Gemini để tránh chi phí vượt kiểm soát.
- Với dữ liệu nhạy cảm, dùng Ollama (self-hosted) để không gửi dữ liệu ra ngoài.

---

## Khuyến Nghị Cấu Hình

### Cấu Hình Cơ Bản (1 Provider)

```
Provider: OpenAI
Capabilities: LLM ✓, Embedding ✓
Default LLM: Có
Default Embedding: Có
Model AI Assistant: gpt-4o
Model Embedding: text-embedding-3-small
```

### Cấu Hình Tối Ưu (2 Providers)

```
Provider 1: OpenAI
  Capabilities: LLM ✓, Embedding ✓
  Default Embedding: Có (dùng cho Knowledge Base)

Provider 2: Anthropic
  Capabilities: LLM ✓
  Default LLM: Có (dùng cho AI Chat mặc định)
  → Dùng Claude cho phân tích phức tạp

Provider 3 (nếu cần): Gemini Flash
  Capabilities: LLM ✓
  → Dùng cho các AI Assistant cần tốc độ nhanh và chi phí thấp
```

### Cấu Hình Bảo Mật Cao (On-Premise)

```
Provider: Ollama (chạy trên server nội bộ)
Base URL: http://ollama.internal:11434
Capabilities: LLM ✓
→ Toàn bộ xử lý AI diễn ra trong mạng nội bộ
→ Dữ liệu không rời khỏi hệ thống của tổ chức
```
