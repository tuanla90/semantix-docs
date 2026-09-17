# Cơ Chế Kiểm Soát & Chống Rò Rỉ SQL (SQL Leak Prevention)

Tài liệu chuyên sâu về kiến trúc bảo vệ mã SQL nội bộ, công thức tính toán và siêu dữ liệu kỹ thuật trong Semantix.

---

## 1. Tổng Quan Kiến Trúc Chống Rò Rỉ SQL

Trong các tổ chức tài chính, ngân hàng và doanh nghiệp lớn, **mã SQL không đơn thuần là câu lệnh truy vấn mà là tài sản trí tuệ và bí mật nghiệp vụ**, bao gồm:
- Công thức tính toán KPI, tỷ lệ nợ xấu (NPL), biên lợi nhuận ròng (NIM) độc quyền.
- Cấu trúc vật lý của cơ sở dữ liệu (tên bảng, tên schema, khóa ngoại, các trường định danh nhạy cảm).
- Mệnh đề bảo mật Row-Level Security (RLS) áp đặt cho từng đơn vị kinh doanh.

Semantix triển khai hệ thống phòng vệ đa tầng nhằm đảm bảo mã SQL và siêu dữ liệu kỹ thuật không bao giờ bị rò rỉ ra ngoài đối tượng được ủy quyền:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SEMANTIX SQL REDACTION PIPELINE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Kiểm soát quyền truy cập: `view_context`                                │
│     • Kiểm tra phiên người dùng: Has `view_context` or `*`?                 │
│     • Có quyền  ──▶ Trả về đầy đủ: SQL + Reasoning + Engine Errors          │
│     • Không có  ──▶ Kích hoạt Redaction Engine (Loại bỏ / Seal token)       │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. Khử khuẩn phiên Chat & Cộng tác (Agentic & Structured Chat)             │
│     • Bóc tách mọi trường kỹ thuật: `sql`, `code`, `reasoning`, `verifySql` │
│     • Thay thế lỗi thô bằng: "This step failed. Technical details hidden"   │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. Khử khuẩn xuất dữ liệu (Export PowerPoint, Excel, Image)                │
│     • Loại bỏ hoàn toàn CTE, debug prompts và SQL metadata                  │
│     • Chỉ giữ số liệu kinh doanh thuần túy và biểu đồ trực quan             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Quyền Kiểm Soát `view_context`

### 2.1. Định nghĩa và Nguyên tắc hoạt động
Quyền `view_context` là quyền hạn bảo mật cốt lõi trong hệ thống RBAC của Semantix (`lib/permissions/catalog.ts`):

- **Có quyền `view_context` (hoặc Super Admin `*`):** Được xem toàn bộ chi tiết kỹ thuật: câu SQL thực thi (`executedSql`), SQL tự sửa lỗi (`repairedSql`), mã Python sinh ra, nhật ký suy luận nội bộ của mô hình (`reasoning`), và thông điệp lỗi chi tiết từ cơ sở dữ liệu.
- **Không có quyền `view_context` (Ví dụ: vai trò `Viewer`, `Business User`):** Giao diện và API hoàn toàn ẩn các chi tiết kỹ thuật. Người dùng chỉ tương tác với câu trả lời phân tích nghiệp vụ, bảng số liệu và biểu đồ trực quan.

### 2.2. Kiểm tra thẩm quyền tại máy chủ (Server-side Enforcement)
Việc phân tách quyền không phụ thuộc vào giao diện (UI) mà được cưỡng chế 100% tại máy chủ trước khi dữ liệu rời khỏi API (`lib/chat/technical-details-access.ts`):

```typescript
// Thẩm định quyền trên phiên đăng nhập hiện tại
export function sessionCanSeeChatTechnicalDetails(session: Session | null): boolean {
    const permissions = session?.user?.permissions || [];
    // Super-admin (*) hoặc quyền view_context rõ ràng
    return permissions.includes("*") || permissions.includes("view_context");
}
```

> [!NOTE]
> Khi Quản trị viên sử dụng tính năng "View As" (đóng vai người dùng khác), hệ thống tự động tráo đổi ngữ cảnh quyền hạn tương ứng. Quản trị viên khi xem dưới vai trò `Viewer` cũng sẽ chịu sự kiểm soát chống rò rỉ SQL như một Viewer thực thụ.

### 2.3. Hai chế độ xử lý kỹ thuật: Removed vs. Sealed
Khi người dùng không có quyền `view_context`, dữ liệu kỹ thuật được xử lý qua một trong hai cơ chế (`lib/chat/agentic-technical-redaction.ts`):

| Chế Độ | Đối Tượng | Cơ Chế Xử Lý |
|---|---|---|
| **Removed** (Loại bỏ hoàn toàn) | Người xem liên kết chia sẻ, đồng nghiệp được share chat | Các trường kỹ thuật (`sql`, `code`, `reasoning`) bị xóa sạch khỏi payload JSON trả về cho trình duyệt. Không có cách nào khôi phục từ phía client. |
| **Sealed** (Niêm phong mã hóa) | Chủ sở hữu phiên chat nhưng không có quyền xem SQL | Chuỗi SQL được mã hóa thành một token niêm phong mờ (`opaque sealed token`). Client có thể gửi lại token này lên máy chủ để ghim (pin) widget hoặc chạy lại truy vấn, nhưng không thể giải mã chuỗi SQL thô. |

### 2.4. Khử khuẩn thông điệp lỗi Database (Error Sanitization)
Thông điệp lỗi gốc từ cơ sở dữ liệu (Database Engine Errors) thường tiết lộ tên bảng thực tế, tên cột hoặc mệnh đề RLS. Semantix tự động lọc bỏ các lỗi này:

```typescript
// Lỗi thô chứa thông tin nhạy cảm được thay thế bằng thông điệp an toàn:
export const HIDDEN_TOOL_ERROR = 
  'This step failed. Technical details are hidden for your role.';
```

Hệ thống chỉ cho phép hiển thị các thông điệp an toàn nằm trong danh mục cho phép (Safe Whitelist), ví dụ:
- *"Only read-only queries are allowed. Data-modifying statements are forbidden."*
- *"Only SELECT or WITH queries are allowed."*
- *"Multiple SQL statements are not allowed."*

---

## 3. Bảo Vệ Khi Chia Sẻ Phiên Trò Chuyện (Chat Sharing)

Khi người dùng chia sẻ phiên phân tích qua liên kết công khai (Public Link) hoặc mời đồng nghiệp vào xem phiên làm việc, pipeline khử khuẩn `redactChatMessages` sẽ tự động kích hoạt.

### 3.1. Danh mục các trường kỹ thuật bị loại bỏ tuyệt đối
Mọi khóa kỹ thuật sau đây đều bị bóc tách khỏi payload trước khi gửi tới người nhận:

```json
[
  "sql",
  "sqlQuery",
  "rawSql",
  "customSql",
  "executedSql",
  "generatedSql",
  "repairedSql",
  "repairNote",
  "verifySql",
  "threeLayerSpecNote",
  "code",
  "consoleLogs",
  "reasoning"
]
```

### 3.2. Bóc tách khử khuẩn theo từng thành phần
1. **Lượt hội thoại Agentic (Agentic Result Content):**
   - Xóa bỏ thuộc tính suy luận `reasoning` (nơi mô hình AI diễn giải cách nối bảng và cấu trúc schema).
   - Duyệt qua từng công cụ gọi (`toolCalls`): loại bỏ tham số đầu vào kỹ thuật (`redactAgenticToolInput`) và kết quả kỹ thuật (`redactAgenticToolOutput`).
   - Xóa bỏ trường `verifySql` trong danh sách đối soát chéo (`cross_check_answer`).
2. **Thẻ phân tích tiêu chuẩn (Standard Cards):**
   - Thẻ kế hoạch (`analysis_plan`): xóa `sqlPreview` và cấu hình debug `specs`.
   - Thẻ bảng số liệu (`data_table`): xóa siêu dữ liệu `metadata.sql`.
   - Thẻ lỗi truy vấn (`query_error`): xóa `sql`.
3. **Siêu dữ liệu dòng tin nhắn (`message.metadata`):**
   - Khử khuẩn chuỗi JSON lưu vết câu truy vấn của biểu đồ insight.

### 3.3. So sánh Payload Trước và Sau Khử Khuẩn

**Payload trên máy chủ (Dành cho Data Engineer có quyền `view_context`):**
```json
{
  "role": "assistant",
  "content": {
    "text": "Doanh thu Chi nhánh TP.HCM trong Quý 3 đạt 12.5 tỷ VNĐ.",
    "reasoning": "Truy vấn bảng core_banking.fact_transactions nối với dim_branches có branch_code = 'HCM'...",
    "toolCalls": [
      {
        "tool": "execute_query",
        "input": {
          "sql": "SELECT SUM(amount) AS rev FROM core_banking.fact_transactions WHERE branch_id = 'HCM_01' AND qtr = '2026-Q3'"
        },
        "result": {
          "data": [{ "rev": 12500000000 }],
          "sql": "SELECT SUM(amount) AS rev..."
        }
      }
    ]
  }
}
```

**Payload gửi tới người xem chia sẻ (Viewer không có `view_context`):**
```json
{
  "role": "assistant",
  "content": {
    "text": "Doanh thu Chi nhánh TP.HCM trong Quý 3 đạt 12.5 tỷ VNĐ.",
    "toolCalls": [
      {
        "tool": "execute_query",
        "input": {},
        "result": {
          "data": [{ "rev": 12500000000 }]
        }
      }
    ]
  }
}
```

---

## 4. Bảo Vệ Khi Xuất File (PowerPoint, Excel & Images)

Khi xuất báo cáo ra các định dạng tài liệu văn phòng hoặc hình ảnh, Semantix áp dụng chính sách làm sạch dữ liệu nghiêm ngặt:

### 4.1. Xuất báo cáo PowerPoint (.pptx)
- Trình tạo slide chỉ nhúng:
  + Tiêu đề phân tích và văn bản tóm tắt kết quả (Executive Summary).
  + Ảnh chụp biểu đồ chất lượng cao (Vector SVG / PNG 2x).
  + Bảng số liệu tổng hợp (Aggregated KPIs).
- **Tuyệt đối không nhúng:** Khối mã SQL truy vấn, logic CTE nội bộ, định danh kết nối hoặc cấu hình prompt của mô hình.

### 4.2. Xuất dữ liệu Excel (.xlsx / .csv)
- Tệp bảng tính chỉ chứa dữ liệu dạng bảng kết quả của widget hoặc cuộc trò chuyện.
- Các cột nhạy cảm hoặc siêu dữ liệu câu lệnh SQL (`metadata.sqlQuery`) được loại bỏ trước khi ghi file.
- Không để lại chú thích (comments), công thức ẩn hay thuộc tính tài liệu (document properties) chứa chuỗi SQL.

### 4.3. Xuất hình ảnh & Sao chép Clipboard (Widget Export)
- Trình render sử dụng bộ lọc chụp DOM (`exportDOMAsImage` / `exportEChartsAsImage`):
  + Tự động loại bỏ nút hành động (`widget-action-buttons`), hộp thoại trợ giúp (`tooltip`), danh sách popover và thanh mở rộng chi tiết kỹ thuật (`drawer`).
  + Chỉ chụp bề mặt hiển thị số liệu và biểu đồ trực quan, ngăn chặn tình trạng vô tình chụp lại các popover chứa mã SQL khi người dùng đang thao tác.

---

## 5. Hướng Dẫn Cấu Hình Quyện Cho Quản Trị Viên

Để cấu hình bảo mật chống rò rỉ SQL cho các nhóm người dùng trong tổ chức:

1. Vào **Admin → Roles & Permissions**.
2. Chọn Role cần cấu hình (hoặc tạo Role mới, ví dụ: `Business Executive` hoặc `External Auditor`).
3. Kiểm tra danh sách quyền:
   - **Tắt quyền `view_context`:** Người dùng thuộc vai trò này sẽ không thể xem mã SQL trong Chat, Dashboard, Embed hay Báo cáo.
   - **Bật quyền `view:dashboards` & `use:chat`:** Người dùng vẫn có thể đặt câu hỏi tự nhiên và xem số liệu phân tích đầy đủ.
4. Nhấn **Save Role**.

### Ma trận khuyến nghị phân quyền `view_context`:

| Vai Trò Doanh Nghiệp | Cần `view_context`? | Lý Do |
|---|:---:|---|
| **Ban Giám đốc / C-Level** | ❌ Không | Chỉ cần báo cáo tổng hợp, tránh phức tạp hóa giao diện |
| **Nhân viên Kinh doanh / Chi nhánh** | ❌ Không | Chống rò rỉ cấu trúc hệ thống và công thức nghiệp vụ |
| **Đối tác bên ngoài (qua Embed/Share)** | ❌ Không | Nguy cơ bảo mật và an toàn dữ liệu cao |
| **Data Analyst / BI Specialist** | ✅ Có | Cần kiểm tra độ chính xác của câu truy vấn và logic nối bảng |
| **Data Engineer / Database Admin** | ✅ Có | Cần tối ưu chỉ mục (indexes), kiểm tra hiệu năng câu SQL |
| **Hệ thống Kiểm toán Kỹ thuật (Auditor)**| Tùy chọn | Bật có thời hạn để đối soát tính tuân thủ |

---

## 6. Checklist Kiểm Toán Chống Rò Rỉ SQL

Trước khi bàn giao hệ thống hoặc nghiệm thu an toàn thông tin với bộ phận SecOps:

- [ ] Các Role người dùng kinh doanh (`Viewer`, `Business User`) đã được tắt quyền `view_context`.
- [ ] Liên kết chia sẻ công khai khi mở trên trình duyệt ẩn danh không hiển thị nút "Xem SQL" hay thông tin CTE.
- [ ] Tab Network trên trình duyệt của người xem không nhận được bất kỳ trường nào trong danh mục `TECHNICAL_KEYS`.
- [ ] Tệp xuất PowerPoint và Excel không chứa sheet ẩn hay cell note ghi lại câu lệnh SQL.
- [ ] Khi cơ sở dữ liệu xảy ra lỗi truy vấn, người dùng không có `view_context` chỉ nhìn thấy thông báo tiêu chuẩn `HIDDEN_TOOL_ERROR`.
