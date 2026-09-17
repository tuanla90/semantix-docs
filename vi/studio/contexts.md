# Semantic Contexts (Ngữ Cảnh Ngữ Nghĩa)

**Điều hướng:** Studio → DABI → Semantic Contexts

Context là **tập hợp các Model, Metric và quy tắc nghiệp vụ** được nhóm theo một chủ đề hoặc bộ phận. AI Assistant hoạt động trong phạm vi một Context — giúp đảm bảo câu trả lời tập trung đúng vào lĩnh vực cần phân tích và áp dụng đúng quy tắc nghiệp vụ.

**Ví dụ thực tế:**
- Context "Phân tích Bán hàng" → chứa Model đơn hàng, khách hàng, sản phẩm → dùng cho đội Sales
- Context "Nhân sự" → chứa Model nhân viên, bảng lương, chấm công → dùng cho đội HR
- Context "Tài chính" → chứa Model doanh thu, chi phí, công nợ → dùng cho kế toán

---

## Tại Sao Cần Context?

Nếu không có Context, AI sẽ:
- Không biết nên dùng bảng nào khi có nhiều bảng liên quan đến "doanh thu"
- Có thể lộ dữ liệu nhạy cảm sang bộ phận không được phép xem
- Không áp dụng được quy tắc nghiệp vụ riêng (ví dụ: đội Sales tính doanh thu khác đội Tài chính)

---

## Tạo Context Mới

### Bước 1 — Khởi Tạo

1. Vào **Studio → DABI → Semantic Contexts → New Context**.
2. Điền thông tin cơ bản:

| Thuộc tính | Bắt Buộc | Ví Dụ |
|------------|----------|--------|
| **Name** | Có | `sales_analysis` |
| **Label** | Có | `Phân tích Bán hàng` |
| **Description** | Khuyến nghị | (xem ví dụ bên dưới) |

**Ví dụ Description chất lượng:**
```
Context dùng cho đội Kinh doanh phân tích doanh thu, đơn hàng và khách hàng.
Tập trung vào các KPI: tổng doanh thu, số đơn, giá trị đơn trung bình, tỷ lệ 
giữ chân khách hàng. Dữ liệu từ hệ thống ERP và CRM, cập nhật theo ngày.
```

### Bước 2 — Thêm Models

Tab **Models** → nhấn **Add Model** → chọn các Model cần đưa vào Context.

**Ví dụ cho Context Bán hàng:**
- `don_hang` (Đơn hàng)
- `khach_hang` (Khách hàng)
- `san_pham` (Sản phẩm)
- `danh_muc` (Danh mục sản phẩm)

> **Nguyên tắc:** Chỉ thêm Model thực sự cần thiết cho Context đó. Quá nhiều Model không liên quan làm AI nhầm lẫn và chậm hơn.

### Bước 3 — Chọn Metrics

Tab **Metrics** → chọn các Metric người dùng trong Context này được phép truy vấn.

Bạn có thể:
- **Bật/tắt** từng Metric — ví dụ: Context của đội Sales không cho thấy Metric chi phí nội bộ
- **Thêm Metric tùy chỉnh** riêng cho Context (chỉ áp dụng trong phạm vi Context này)

### Bước 4 — Cấu Hình Default Time Column

Chọn cột ngày mặc định — AI dùng cột này khi người dùng hỏi về "tháng này", "tuần trước", "năm nay" mà không chỉ rõ cột ngày nào.

**Ví dụ:** Nếu Default Time Column = `order_date`, khi người dùng hỏi "doanh thu tháng 6", AI tự hiểu là `WHERE order_date BETWEEN '2024-06-01' AND '2024-06-30'`.

### Bước 5 — Forbidden Combinations (Quy Tắc Ngăn Cấm)

Khai báo các quy tắc ngăn AI sinh truy vấn sai logic nghiệp vụ. Đây là tính năng nâng cao giúp đảm bảo tính chính xác.

**Ví dụ Forbidden Combinations:**

```
Không được GROUP BY mã nhân viên khi đang lọc theo chi nhánh, vì
mỗi nhân viên chỉ thuộc một chi nhánh — kết quả sẽ không có ý nghĩa.

Không kết hợp doanh thu từ bảng don_hang với doanh thu từ bảng 
don_hang_cua_hang trong cùng một query mà không có UNION rõ ràng.

Khi hỏi về "tỷ lệ chuyển đổi", chỉ dùng funnel analysis, 
không dùng phép chia đơn giản.
```

### Bước 6 — Advanced Analysis (Phân Tích Nâng Cao)

Tab **Advanced Analysis** → thêm các loại phân tích đặc biệt:

| Loại Phân Tích | Mô Tả | Cần Cấu Hình |
|----------------|--------|-------------|
| **Cohort Analysis** | Phân tích giữ chân khách hàng theo thời gian | Cột ngày đầu tiên mua, cột sự kiện tiếp theo |
| **RFM Analysis** | Phân khúc khách hàng theo Recency-Frequency-Monetary | Cột ngày mua, cột giá trị đơn |
| **Funnel Analysis** | Theo dõi tỷ lệ chuyển đổi qua các bước | Cột bước, cột người dùng, cột thời gian |
| **Pareto Analysis** | Phân tích 80/20 | Cột khách hàng/sản phẩm, cột giá trị |

### Bước 7 — Các Trường Ngữ Nghĩa Mở Rộng (Extended Semantics)

Để AI Assistant hiểu sâu sắc ngôn ngữ chuyên ngành và tránh các sai sót tai hại trong phân tích, Semantix cung cấp 4 trường ngữ nghĩa mở rộng trên từng Cột (`ColumnContext`) và Chỉ số (`MetricContext`):

#### 1. Anti-Synonyms ("X không có nghĩa là Y")
- **Ý nghĩa:** Danh sách từ đồng nghĩa (`synonyms`) thông thường chỉ cho AI biết một từ mang nghĩa gì. Tuy nhiên, các sai lầm đắt giá nhất trong thực tế lại xuất phát từ việc **AI nhầm lẫn giữa các thuật ngữ nghiệp vụ gần giống nhau** (Negative Disambiguation).
- **Cấu trúc:** Gồm `term` (từ kiêng kỵ) và `note` (lý do khác biệt).
- **Ví dụ thực tế:**
  - Cột `du_no` (Dư nợ tín dụng):
    - *Anti-synonym:* `term: "doanh số giải ngân"`, `note: "đây là số tiền cho vay phát sinh mới ở bảng khế ước nhận nợ, không phải dư nợ hiện tại"`.
  - Metric `tong_doanh_thu` (Tổng doanh thu):
    - *Anti-synonym:* `term: "tiền thực thu"`, `note: "doanh thu chưa trừ công nợ phải thu, không phản ánh dòng tiền mặt thực tế"`.
  - Cột `trang_thai_active` (Khách hàng Active):
    - *Anti-synonym:* `term: "tất cả khách hàng"`, `note: "chỉ tính khách có phát sinh giao dịch trong 30 ngày gần nhất"`.
- **Cơ chế Prompt Clamping:** Để tránh quá tải token, Semantix tự động chọn lọc tối đa **3 anti-synonyms** tiêu biểu nhất trên mỗi trường khi đưa vào Prompt của AI.

#### 2. Bẫy Nghiệp Vụ (Gotchas)
- **Ý nghĩa:** Những cảnh báo và điều kiêng kỵ ngắn gọn dành cho AI khi tiếp cận dữ liệu của cột hoặc chỉ số đó.
- **Ví dụ thực tế:**
  - *"Cột tỷ lệ hoặc giá trị trung bình tuyệt đối không được dùng hàm SUM."*
  - *"Dư nợ là chỉ số số dư thời điểm (snapshot), không được cộng dồn qua các tháng."*
  - *"Giá trị NULL ở cột điểm đánh giá nghĩa là khách hàng chưa chấm điểm, không phải điểm 0."*
  - *"Bảng có thể chứa giao dịch thử nghiệm với mã chi nhánh TEST, phải loại trừ."*
- **Cơ chế Prompt Clamping:** Hệ thống giới hạn tối đa **2 gotchas** quan trọng nhất (tối đa 120 ký tự/mục) nạp vào schema prompt của Assistant.

#### 3. Gợi Ý Cho AI (aiHint)
- **Ý nghĩa:** Chỉ dẫn đặc thù cho trợ lý AI khi xử lý câu hỏi liên quan đến cột hoặc chỉ số này.
- **Ví dụ thực tế:**
  - `aiHint`: *"Khi người dùng hỏi chung chung về doanh số, mặc định nhóm theo tháng và dùng cột ngay_ghi_nhan."*
  - `aiHint`: *"Luôn bọc hàm COALESCE(..., 0) khi tính toán trên cột chiết khấu vì có nhiều dòng NULL."*

#### 4. Metadata Quản Trị Từ Đồng Nghĩa (synonymMeta)
- **Ý nghĩa:** Lưu vết nguồn gốc và mức độ tin cậy của từng từ đồng nghĩa phục vụ kiểm toán và phê duyệt:
  - `source`: Nguồn gốc — `'human'` (do chuyên viên nhập tay) hoặc `'learned'` (do AI tự đúc kết từ hội thoại người dùng).
  - `confidence`: Điểm tin cậy từ 0.0 đến 1.0 (nhập tay mặc định 1.0).
  - `evidenceCount`: Số lần quan sát thấy người dùng sử dụng từ khóa này trong thực tế.
  - `updatedAt`: Thời điểm cập nhật lần cuối.
- **Nguyên tắc an toàn:** `synonymMeta` chỉ phục vụ giao diện quản trị và quy trình xét duyệt đề xuất; **tuyệt đối không đưa vào prompt** để giữ prompt luôn tinh gọn.

### Bước 8 — Lưu Context

Nhấn **Save**.

---

## Gắn Context vào AI Assistant

Sau khi tạo Context, bạn cần gắn nó vào một AI Assistant để người dùng có thể sử dụng:

1. Vào **Studio → DSAI → AI Assistants**.
2. Mở Assistant cần cấu hình (hoặc tạo mới).
3. Trong trường **Context**, chọn Context vừa tạo.
4. Nhấn **Save**.

Người dùng khi chat với Assistant này sẽ chỉ truy cập dữ liệu trong phạm vi Context đó.

---

## Row-Level Security (Bảo Mật Theo Dòng)

Context hỗ trợ lọc dữ liệu tự động theo người dùng đang đăng nhập.

**Ví dụ:** Với Context Bán hàng theo khu vực, nhân viên vùng miền Bắc chỉ thấy dữ liệu khu vực Miền Bắc, nhân viên vùng miền Nam chỉ thấy Miền Nam — mặc dù họ dùng chung một Context.

Xem hướng dẫn đầy đủ tại [Row-Level Security](../contexts/rls.md).

---

## Ví Dụ Cấu Hình Thực Tế

### Context: Phân Tích Bán Hàng

```
Name: sales_analysis
Label: Phân tích Bán hàng
Description: Context dùng cho đội Sales và Management phân tích kết quả kinh doanh.

Models:
- don_hang (Đơn hàng): bảng chính
- khach_hang (Khách hàng): JOIN qua customer_id
- san_pham (Sản phẩm): JOIN qua product_id

Metrics cho phép:
- Tổng doanh thu ✓
- Số đơn hàng ✓
- Giá trị đơn TB ✓
- Số khách hàng duy nhất ✓
- Chi phí nội bộ ✗ (ẩn với đội Sales)

Default Time Column: order_date

Advanced Analysis:
- RFM Analysis (cột: order_date, revenue, customer_id)
- Cohort Analysis (cột: first_order_date, order_date, customer_id)
```

### Context: Nhân Sự

```
Name: hr_analytics
Label: Nhân sự & Lao động
Description: Context dành riêng cho đội HR và Ban Giám đốc phân tích
             dữ liệu nhân sự, lương thưởng và chấm công.

Models:
- nhan_vien (Nhân viên)
- bang_luong (Bảng lương)
- cham_cong (Chấm công)
- phong_ban (Phòng ban)

RLS: mỗi Manager chỉ thấy nhân viên trong phòng ban của mình
     trừ HR Manager được xem tất cả

Default Time Column: ngay_vao_lam
```

---

## Quản Lý Contexts

### Xem Danh Sách

Trang **Studio → DABI → Semantic Contexts** hiển thị:
- Tên và mô tả của từng Context
- Số Model trong Context
- Số AI Assistant đang dùng Context
- Trạng thái Active/Inactive
- Người tạo và ngày cập nhật lần cuối

### Vô Hiệu Hóa Context

Tắt toggle **Active** để ẩn Context khỏi người dùng nhưng không xóa cấu hình. Hữu ích khi cần bảo trì hoặc cập nhật cấu trúc.

### Nhân Bản Context

Nhấn **Duplicate** để tạo bản sao của Context với toàn bộ cấu hình. Hữu ích khi cần tạo Context tương tự cho bộ phận khác.

---

## Checklist Trước Khi Dùng Context

- [ ] Đã thêm đủ các Model cần thiết
- [ ] Default Time Column đã được chọn
- [ ] Metrics phù hợp đã được bật
- [ ] Đã gắn Context vào ít nhất một AI Assistant
- [ ] Đã test thử vài câu hỏi trong AI Chat
- [ ] RLS đã cấu hình nếu cần phân quyền theo dòng dữ liệu
