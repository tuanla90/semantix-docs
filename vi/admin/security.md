# Bảo Mật Dữ Liệu

Tổng quan kiến trúc bảo mật của Semantix — giải thích cách dữ liệu của bạn được bảo vệ ở mọi lớp.

---

## Nguyên Tắc Cốt Lõi: Zero Data Retention

**Semantix không lưu trữ dữ liệu kinh doanh của bạn.**

Khi AI trả lời câu hỏi, đây là những gì xảy ra:

```
Câu hỏi người dùng
        ↓
AI nhận: Schema (tên bảng, tên cột) + Mô tả + Business rules
[Dữ liệu thực KHÔNG được gửi cho AI]
        ↓
AI tạo ra câu SQL
        ↓
SQL chạy trực tiếp trên Database của bạn
        ↓
Kết quả về thẳng trình duyệt
[AI không bao giờ thấy kết quả query]
```

AI chỉ nhận **metadata** (schema) — không bao giờ nhận dữ liệu thực tế từ database.

---

## Mã Hóa Credentials

Tất cả thông tin nhạy cảm được mã hóa **AES-256-GCM** trước khi lưu vào database:

- Mật khẩu database connections
- API keys của AI providers (OpenAI, Anthropic...)
- Service account JSON keys (Google)
- Client secrets (SSO OIDC)
- SMTP passwords

**Khóa mã hóa** (`ENCRYPTION_KEY` trong `.env`) chỉ tồn tại trên server của bạn — Semantix không biết khóa này.

**Sau khi lưu**: Mật khẩu không hiển thị lại trong UI, không xuất hiện trong API responses hay server logs. Chỉ có thể ghi đè bằng giá trị mới.

---

## HTTPS Bắt Buộc

Mọi kết nối đến Semantix phải qua **HTTPS (TLS 1.2 trở lên)**:

- Reverse proxy (Nginx/Caddy/Apache) terminate SSL
- Semantix không expose port 3000 ra internet
- HSTS header được bật để ngăn downgrade attack

Xem cấu hình Nginx mẫu: [Yêu Cầu Hệ Thống](../getting-started/requirements.md)

---

## Gói Bảo Mật Doanh Nghiệp Cấp Ngân Hàng (Security Pack)

Để đáp ứng tiêu chuẩn an toàn thông tin khắt khe của các tổ chức tài chính và ngân hàng, Semantix triển khai bộ tiêu chuẩn bảo mật chuyên sâu (**Security Pack S02/S04/S22/S26**):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SEMANTIX ENTERPRISE SECURITY ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Kênh phân phối:     Public Share  │   Embed Token   │  Scheduled Reports   │
│  Danh tính & RLS:    Token Creator │   Claim `uid`   │  Report Owner (rid)  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Lớp phòng thủ 1:    Khử khuẩn & Kiểm định sâu SQL Identifiers (S26)        │
│                      • Chặn NUL, control chars, quotes, dấu ngắt lệnh       │
│                      • Quote theo dialect (BigQuery, PostgreSQL, MSSQL)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Lớp phòng thủ 2:    Bộ lọc khóa Base CTE (Locked Filters - S22)            │
│                      • Ép buộc điều kiện phân vùng/tenant vào lõi SQL       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Lớp phòng thủ 3:    Kiểm soát rò rỉ SQL & Context (view_context)           │
│                      • Ẩn mã SQL, công thức, prompt, engine errors          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Ép Buộc Row-Level Security (RLS) Trên Mọi Kênh Phân Phối

Row-Level Security (RLS) tại Semantix không chỉ áp dụng trong phiên làm việc trực tiếp của người dùng mà được **áp đặt cưỡng chế trên toàn bộ các kênh phân phối dữ liệu**:

1. **Liên kết chia sẻ công khai (Public Share Links):**
   - Khi một dashboard hoặc báo cáo được chia sẻ qua liên kết public, truy vấn ngầm định **không** chạy với quyền quản trị vô hạn.
   - Hệ thống tự động kế thừa ngữ cảnh phân quyền và chính sách RLS từ tài khoản của người tạo liên kết (Creator Context) hoặc áp đặt bộ lọc giới hạn công khai. Dữ liệu nhạy cảm ngoài phạm vi cho phép sẽ bị chặn hoàn toàn ở tầng cơ sở dữ liệu.

2. **Mã nhúng ứng dụng (Embed Token - S02 & S22):**
   - Mã nhúng JWT được ký bằng thuật toán HMAC-SHA256 với khóa bí mật `EMBED_JWT_SECRET`.
   - Máy chủ tự động gắn danh tính người phát hành vào claim bí mật `uid` (S02). Mọi truy vấn từ dashboard nhúng đều được thẩm định danh tính này.
   - Áp đặt **Locked Filters (S22)**: Các điều kiện lọc bảo mật (như `customer_id`, `branch_code`, `organization_id`) được nhúng trực tiếp trong claim `lf` của token. Phía máy chủ tự động chuyển các bộ lọc này thành mệnh đề RLS bắt buộc trong Base CTE của truy vấn SQL. Người xem qua iframe không thể gỡ bỏ hoặc chỉnh sửa các bộ lọc này.

3. **Báo cáo định kỳ tự động (Scheduled Reports - S04):**
   - Báo cáo gửi email định kỳ chạy dưới dạng tác vụ nền (background job) không có phiên người dùng tương tác trực tiếp.
   - Hệ thống tạo token kết xuất nội bộ mang claim `rid` (Report ID). Quyền đọc dữ liệu và chính sách RLS được trích xuất nghiêm ngặt từ chủ sở hữu cấu hình lịch báo cáo (Report Owner) đã được kiểm toán trong cơ sở dữ liệu.

---

## Khử Khuẩn & Kiểm Tra SQL Identifiers Sâu (S26)

Để ngăn chặn tuyệt đối các cuộc tấn công chèn mã SQL Injection thông qua tên cột lọc, tham số định danh và tham số thời gian, Semantix áp dụng cơ chế xác thực **Fail-Closed 3 lớp**:

### 1. Quy tắc từ chối định danh độc hại (`isSafeFilterIdentifier`)
Mọi tên cột bộ lọc do client gửi lên (bao gồm cả cột ngày `_mappedColumn` trong khoảng ngày toàn cục) phải vượt qua bộ kiểm tra nghiêm ngặt:
- **Độ dài tối đa:** 256 ký tự (`MAX_FILTER_IDENTIFIER_LENGTH = 256`).
- **Cấm tuyệt đối các ký tự đóng/mở định danh:** Dấu nháy kép (`"`), dấu nháy đơn (`'`), backtick (`` ` ``), ngoặc vuông (`[` và `]`).
- **Cấm ký tự escape và ngắt lệnh:** Dấu gạch chéo ngược (`\`), dấu chấm phẩy (`;`).
- **Cấm ký tự điều khiển & byte độc hại:** Ký tự điều khiển ASCII `\x00-\x1f`, byte NUL (`\0`), ký tự khoảng trắng không hợp lệ trong tên cột.
- **Cấm cú pháp chú thích SQL:** `--`, `/*`, `*/`.

### 2. Khử khuẩn cấu trúc bộ lọc (`sanitizeChartFilters`)
- Client chỉ được phép gửi các trường hợp lệ: `{ column, operator, value, value2, values }`.
- Mọi trường độc hại hoặc thuộc tính nâng cao do kẻ tấn công cố tình chèn thêm (ví dụ: `type: 'sql'`, `sqlExpression`) sẽ bị loại bỏ hoàn toàn trước khi chuyển sang bộ phân giải truy vấn (Query Engine).
- Đối với tham số khoảng ngày toàn cục, thuộc tính `_mappedColumn` nếu không hợp lệ sẽ bị hủy ngay lập tức (không suy đoán thay thế). Chu kỳ thời gian (`grain`) bị giới hạn trong tập đóng an toàn: `auto`, `day`, `week`, `month`, `quarter`, `year`.

### 3. Quote định danh chuẩn hóa theo Dialect
Tên cột sau khi được kiểm tra an toàn sẽ được đóng ngoặc bảo vệ (quote) tự động theo từng hệ quản trị cơ sở dữ liệu cụ thể (`quoteAlias`):
- **PostgreSQL / DuckDB / Google Sheets:** `"column_name"`
- **Google BigQuery / MySQL / ClickHouse / Databricks:** `` `column_name` ``
- **Microsoft SQL Server:** `[column_name]`

Nếu tên cột không khớp với danh sách cột được phép truy cập trong Model hoặc Data View, bộ lọc sẽ bị loại bỏ (fail-closed) và ghi log cảnh báo trên máy chủ, ngăn chặn việc rò rỉ dữ liệu thông qua kỹ thuật SQL Error-based Injection.

---

## Bảo Vệ Quyền Riêng Tư Dữ Liệu: Zero Data Retention

Semantix được thiết kế theo kiến trúc **Zero Data Retention** đối với các mô hình AI:

- **AI không bao giờ tiếp cận dữ liệu thô (Raw Business Data):** Khi người dùng đặt câu hỏi, Semantix chỉ trích xuất và gửi cho AI mô hình ngữ nghĩa (Semantic Metadata) gồm: tên bảng, tên cột, kiểu dữ liệu, mô tả kinh doanh và các quy tắc nghiệp vụ (metrics/calculated fields).
- **Không gửi bản ghi thực tế:** Dữ liệu giao dịch, số dư tài khoản, số định danh khách hàng (PII) KHÔNG BAO GIỜ bị đẩy ra ngoài qua các prompt AI.
- **Truy vấn chạy tại chỗ:** Câu lệnh SQL sinh ra bởi AI được gửi về và thực thi trực tiếp trên Data Warehouse / Database nội bộ của doanh nghiệp.
- **Kết quả trả thẳng về trình duyệt:** Dữ liệu trả về từ database đi thẳng tới client hoặc ứng dụng của người dùng. AI hoàn toàn không nhìn thấy và không lưu trữ kết quả của các câu truy vấn.

---

## Phân Quyền Truy Cập (RBAC) & Kiểm Soát Ngữ Cảnh

Semantix kết hợp chặt chẽ giữa **Role-Based Access Control (RBAC)** và quyền kiểm soát kỹ thuật:

- Mỗi người dùng được gán một hoặc nhiều **Role** với danh sách quyền hạn (Permissions) cụ thể.
- **Quyền `view_context`:** Quyền bảo mật then chốt xác định xem người dùng có được phép xem mã SQL thô, logic tính toán nội bộ và nhật ký suy luận của AI hay không.
- **Phân tách thẩm quyền:** Người dùng nghiệp vụ (Business Viewer) chỉ xem kết quả phân tích số liệu và biểu đồ, trong khi chuyên viên dữ liệu (Data Analyst / Engineer) mới có thẩm quyền kiểm tra mã SQL và cấu trúc dữ liệu.

Xem chi tiết hướng dẫn chống rò rỉ SQL: [Kiểm Soát & Chống Rò Rỉ SQL](sql-leak-prevention.md)

---

## Checklist Bảo Mật Trước Go-Live

**Hạ tầng:**
- [ ] HTTPS với chứng chỉ SSL hợp lệ (không phải self-signed)
- [ ] Port 3000 không được expose ra internet
- [ ] `ENCRYPTION_KEY` được tạo ngẫu nhiên: `openssl rand -base64 32`
- [ ] `AUTH_SECRET` được tạo ngẫu nhiên: `openssl rand -hex 32`
- [ ] File `.env` không được commit lên git

**Truy cập:**
- [ ] Đã cấu hình SSO với IdP công ty (hoặc ít nhất có MFA)
- [ ] Roles được thiết kế theo nguyên tắc Least Privilege
- [ ] Row-Level Security được cấu hình cho data nhạy cảm
- [ ] API Keys có scope tối thiểu cần thiết

**Database:**
- [ ] Semantix dùng user chỉ đọc (SELECT only)
- [ ] IP whitelist chỉ cho phép IP server Semantix
- [ ] Thông tin kết nối đã được test bảo mật

**Giám sát:**
- [ ] Audit Logs được kiểm tra định kỳ
- [ ] Cảnh báo cho đăng nhập thất bại nhiều lần
- [ ] Sessions được kiểm tra qua Admin → Sessions

---

## Báo Cáo Lỗ Hổng Bảo Mật

Phát hiện vấn đề bảo mật? Gửi email đến **support@semantix.vn** với mô tả chi tiết. Chúng tôi cam kết phản hồi trong 24 giờ làm việc.
