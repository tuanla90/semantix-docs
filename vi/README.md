# Chào Mừng Đến Với Semantix

**Semantix** là nền tảng trí tuệ dữ liệu (Data Intelligence) được hỗ trợ bởi AI, cho phép đội ngũ của bạn **truy vấn dữ liệu bằng tiếng Việt**, xây dựng Dashboard, xuất báo cáo và tự động hóa luồng dữ liệu — không yêu cầu kiến thức SQL hay lập trình.

---

## Bạn Có Thể Làm Gì Với Semantix?

| Tính Năng | Mô Tả |
|-----------|--------|
| **AI Chat** | Đặt câu hỏi bằng tiếng Việt tự nhiên — AI tự tạo SQL và trả về biểu đồ trong vài giây |
| **Data Portal** | Tra cứu và xuất dữ liệu theo mẫu (template) có sẵn, không cần biết SQL |
| **Dashboards** | Kéo thả biểu đồ, Scorecard, bảng biểu thành báo cáo trực quan |
| **Data Pipelines** | Đồng bộ dữ liệu tự động theo lịch giữa các hệ thống |
| **AI Assistants** | Tạo nhiều trợ lý AI với tính cách và phạm vi dữ liệu khác nhau |
| **Knowledge Bases** | Cho AI đọc tài liệu nội bộ (PDF, Word) để trả lời câu hỏi |
| **Phân tích nâng cao** | Cohort, RFM, Funnel, Growth Analysis tích hợp sẵn |
| **Thông báo tự động** | Cảnh báo qua Telegram, Zalo, Microsoft Teams khi số liệu vượt ngưỡng |
| **Public API** | Nhúng Dashboard hoặc truy vấn dữ liệu từ ứng dụng bên ngoài |

---

## Cấu Trúc Menu Ứng Dụng

```
Top Navigation (thanh trên cùng):
├── AI Chat          →  Hỏi dữ liệu bằng ngôn ngữ tự nhiên
├── Data Portal      →  Xuất báo cáo theo mẫu
├── Dashboards       →  Xem và tạo Dashboard
├── Studio           →  (Admin/Developer) Cấu hình hệ thống
│   ├── [DE] Data Engineering
│   │   ├── Engine Templates
│   │   ├── Connections
│   │   ├── Data Pipelines
│   │   └── Data Templates
│   ├── [DABI] Data Analytics & BI
│   │   ├── Data Models
│   │   ├── Calculated Fields     (trong Data Model)
│   │   ├── Metrics               (trong Data Model)
│   │   ├── Relations             (trong Data Model)
│   │   ├── Semantic Contexts
│   │   └── Suggestions
│   └── [DSAI] Data Science & AI
│       ├── AI Providers
│       ├── AI Assistants
│       └── Knowledge Bases
└── Admin            →  (Admin) Quản trị hệ thống
    ├── [Access]
    │   ├── Users & Roles
    │   ├── SSO
    │   ├── Attributes
    │   └── Tags
    ├── [Monitoring]
    │   ├── Audit Logs
    │   └── Sessions
    └── [Config]
        ├── Security
        ├── Caching
        └── Platform Integrations
```

---

## Luồng Thiết Lập Lần Đầu

Để hệ thống hoạt động, Admin cần thực hiện theo thứ tự:

```
[1] Tạo Connection    →  Studio → DE → Connections
[2] Tạo Data Model   →  Studio → DABI → Data Models
      ├── Cấu hình Columns (label, type, description)
      ├── Tạo Metrics (KPI)
      └── Khai báo Relations (nếu nhiều bảng)
[3] Tạo Context      →  Studio → DABI → Semantic Contexts
[4] Thêm AI Provider →  Studio → DSAI → AI Providers
[5] Tạo AI Assistant →  Studio → DSAI → AI Assistants
[6] Mời người dùng   →  Admin → Access → Users
```

Xem hướng dẫn đầy đủ: [Bắt Đầu Nhanh](getting-started/quick-start.md)

---

## Truy Cập Nhanh

| Người Dùng Cuối | Admin & Developer |
|----------------|------------------|
| [AI Chat](ai-chat/README.md) | [Bắt Đầu Nhanh](getting-started/quick-start.md) |
| [Data Portal](data-portal/README.md) | [Kết Nối Dữ Liệu](studio/connections.md) |
| [Dashboards](dashboards/README.md) | [Data Models](studio/data-models.md) |
| [Phân tích Nâng cao](ai-chat/advanced-analysis.md) | [AI Assistants](studio/ai-assistants.md) |
| [FAQ](support/faqs.md) | [API Reference](api-reference/README.md) |

---

## Gói Dùng Thử Miễn Phí

Mới bắt đầu? Xem [hướng dẫn dùng thử](free-trial/README.md) — kết nối Google Sheets và hỏi dữ liệu trong 10 phút, không cần cài đặt gì.

---

## Hỗ Trợ

- **Câu hỏi thường gặp:** [FAQs](support/faqs.md)
- **Email:** support@semantix.vn
- **Tài liệu kỹ thuật:** [API Reference](api-reference/README.md)
