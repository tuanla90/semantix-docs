# AI Chat — Phân Tích Bằng Ngôn Ngữ Tự Nhiên

**Điều hướng:** AI Chat (menu trên cùng)

AI Chat là tính năng cốt lõi của Semantix — cho phép bạn **đặt câu hỏi bằng tiếng Việt** (hoặc bất kỳ ngôn ngữ nào) và nhận kết quả phân tích dữ liệu ngay lập tức. Không cần biết SQL, không cần biết lập trình.

---

## Cách Hoạt Động

Khi bạn gõ một câu hỏi, Semantix thực hiện 4 bước:

```
[1. HIỂU] Phân tích câu hỏi → xác định intent, metric, thời gian, điều kiện lọc
      ↓
[2. SQL] Tự động tạo câu truy vấn SQL chính xác dựa trên Data Model
      ↓  
[3. CHẠY] Thực thi SQL trực tiếp trên database của bạn
      ↓
[4. HIỂN THỊ] Trả kết quả dạng bảng + tự động chọn loại biểu đồ phù hợp
```

**Ví dụ cụ thể:**

Câu hỏi: *"Top 5 sản phẩm doanh thu cao nhất tháng 6"*

→ Semantix sinh SQL:
```sql
SELECT p.product_name, SUM(o.revenue) as total_revenue
FROM don_hang o
JOIN san_pham p ON o.product_id = p.id
WHERE o.status IN ('paid', 'delivered')
  AND o.order_date BETWEEN '2024-06-01' AND '2024-06-30'
GROUP BY p.product_name
ORDER BY total_revenue DESC
LIMIT 5
```
→ Trả về bảng + biểu đồ cột

---

## Giao Diện AI Chat

### Phần Sidebar Trái

- **Danh sách AI Assistants**: Các trợ lý AI bạn có quyền dùng. Nhấn để chuyển sang Assistant khác.
- **Lịch sử chat**: Các cuộc trò chuyện trước. Nhấn để xem lại.
- **New Chat**: Bắt đầu cuộc trò chuyện mới.

### Phần Chính

- **Khung nhập câu hỏi**: Gõ câu hỏi ở đây, nhấn Enter hoặc nút Gửi.
- **Kết quả**: Hiển thị bảng dữ liệu và/hoặc biểu đồ.
- **View SQL**: Xem câu SQL đã được tạo ra.
- **Ghim (📌)**: Lưu biểu đồ vào Dashboard.
- **Export**: Tải xuống CSV hoặc Excel.

---

## Bắt Đầu Chat

### Bước 1 — Chọn AI Assistant

Nhấn vào tên AI Assistant trong sidebar trái. Mỗi Assistant được cấu hình cho một mục đích khác nhau (Bán hàng, Nhân sự, Tài chính...).

### Bước 2 — Đặt Câu Hỏi

Gõ câu hỏi bằng tiếng Việt tự nhiên vào ô nhập liệu, ví dụ:

**Câu hỏi tổng quan:**
```
Doanh thu tháng này là bao nhiêu?
So sánh doanh thu tháng 6 và tháng 5 năm nay
Doanh thu theo khu vực trong quý 2
```

**Câu hỏi về sản phẩm:**
```
Top 10 sản phẩm bán chạy nhất tháng này
Sản phẩm nào có doanh thu giảm so với tháng trước?
Phân bổ doanh thu theo danh mục sản phẩm
```

**Câu hỏi về khách hàng:**
```
Có bao nhiêu khách hàng mới trong tháng 6?
Top 20 khách hàng doanh thu cao nhất từ đầu năm
Khách hàng nào chưa mua hàng trong 90 ngày qua?
```

**Câu hỏi so sánh:**
```
So sánh doanh thu năm 2024 và 2023 theo từng tháng
Kênh online và offline: kênh nào tăng trưởng nhanh hơn?
Hiệu suất bán hàng giữa các chi nhánh tháng này
```

**Câu hỏi lọc điều kiện:**
```
Doanh thu từ khách hàng VIP tháng này là bao nhiêu?
Đơn hàng có giá trị trên 5 triệu trong tuần trước
Số đơn hủy theo ngày trong tháng 6
```

### Bước 3 — Xem và Tương Tác Với Kết Quả

Sau khi AI trả lời:

| Thao Tác | Cách Làm | Kết Quả |
|---------|----------|---------|
| **Xem SQL** | Nhấn "View SQL" | Hiển thị câu SQL đã chạy — hữu ích để kiểm tra logic |
| **Đổi biểu đồ** | Nhấn icon biểu đồ, chọn loại khác | Thay đổi từ cột sang đường, tròn, v.v. |
| **Ghim vào Dashboard** | Nhấn 📌 | Lưu biểu đồ vào Dashboard đã chọn |
| **Tải xuống** | Nhấn Export | Tải CSV hoặc Excel |
| **Đặt câu hỏi tiếp** | Gõ câu hỏi mới | AI nhớ ngữ cảnh cuộc trò chuyện |
| **Chia sẻ** | (nếu có nút Share) | Tạo link chia sẻ kết quả |

---

## Tính Năng Nâng Cao

### Follow-up Questions (Câu Hỏi Tiếp Nối)

AI nhớ ngữ cảnh trong suốt cuộc trò chuyện. Bạn có thể đặt câu hỏi tiếp mà không cần lặp lại điều kiện:

```
Bạn: "Top 5 sản phẩm doanh thu cao nhất tháng 6"
→ AI: [hiển thị bảng 5 sản phẩm]

Bạn: "Chỉ tính kênh online thôi"
→ AI: [lọc thêm channel = 'online']

Bạn: "Tháng 5 thì sao?"
→ AI: [giữ nguyên filter online, đổi sang tháng 5]

Bạn: "So sánh cả hai tháng thành một biểu đồ"
→ AI: [tạo biểu đồ so sánh]
```

### Chế Độ Agentic

Khi câu hỏi phức tạp đòi hỏi nhiều bước phân tích, bật chế độ **Agentic**:

```
"Phân tích toàn diện tình hình kinh doanh tháng 6: 
doanh thu, so sánh tháng trước, top sản phẩm, 
top khách hàng, và xu hướng theo ngày"
```

AI sẽ tự chia nhỏ, chạy nhiều query, rồi tổng hợp kết quả thành báo cáo tổng quan.

### Đề Xuất Câu Hỏi (Suggestions)

Khi bắt đầu chat, AI có thể hiển thị các câu hỏi gợi ý (Suggestions) do Admin cấu hình sẵn. Những câu hỏi này giúp người dùng mới biết có thể hỏi gì.

Nếu bạn tìm thấy một câu hỏi hữu ích, nhấn **Suggest** để đề xuất thêm vào danh sách gợi ý (cần Admin phê duyệt).

---

## Phân Tích Nâng Cao Tích Hợp Sẵn

Ngoài chat tự do, Semantix tích hợp sẵn các mô hình phân tích chuyên biệt:

| Loại Phân Tích | Mô Tả | Liên Kết |
|----------------|--------|-----------|
| **Cohort Analysis** | Phân tích giữ chân khách hàng theo thời gian — ai quay lại mua lần 2, lần 3? | [Xem →](cohort.md) |
| **RFM Analysis** | Phân khúc khách hàng theo 3 tiêu chí: Recency (mua gần đây không?), Frequency (mua thường xuyên không?), Monetary (chi tiêu nhiều không?) | [Xem →](rfm.md) |
| **Funnel Analysis** | Phân tích tỷ lệ chuyển đổi qua từng bước (ví dụ: Xem sản phẩm → Thêm giỏ hàng → Thanh toán) | [Xem →](funnel.md) |
| **Advanced Analysis** | Tổng quan các loại phân tích nâng cao | [Xem →](advanced-analysis.md) |

---

## Mẹo Đặt Câu Hỏi Hiệu Quả

### 1. Cụ Thể Về Thời Gian

| Cách Hỏi | Khuyến Nghị |
|---------|-------------|
| ❌ "Doanh thu gần đây" | Mơ hồ — AI có thể hiểu 7 ngày hoặc 3 tháng |
| ✅ "Doanh thu 30 ngày qua" | Rõ ràng |
| ✅ "Doanh thu tháng 6 năm 2024" | Rõ ràng |
| ✅ "Doanh thu từ 01/01/2024 đến 30/06/2024" | Cực kỳ rõ ràng |

### 2. Nêu Rõ Chỉ Số Muốn Xem

| Cách Hỏi | Khuyến Nghị |
|---------|-------------|
| ❌ "Số liệu tháng này" | Số liệu gì? |
| ✅ "Tổng doanh thu và số đơn hàng tháng này" | Rõ ràng |
| ✅ "Doanh thu trung bình mỗi đơn hàng tháng này" | Rõ ràng |

### 3. Chỉ Rõ Chiều Phân Tích

| Cách Hỏi | Khuyến Nghị |
|---------|-------------|
| ❌ "Doanh thu theo vùng" | Vùng là cột gì? |
| ✅ "Doanh thu theo khu vực (Bắc/Trung/Nam) tháng này" | Rõ ràng |
| ✅ "Doanh thu theo ngày trong tháng 6" | Rõ ràng |

### 4. Dùng Tên Đúng Với Dữ Liệu

Dùng thuật ngữ đúng với cách đặt tên trong Data Model (Label của cột, tên Metric, giá trị trong cột trạng thái). Nếu AI không hiểu, hỏi: *"Bạn có biết cột nào lưu trạng thái đơn hàng không?"*

### 5. Hỏi Lại Nếu Kết Quả Lạ

```
"Tại sao doanh thu tháng 6 của bạn nhỏ hơn tháng 5 nhiều vậy?"
"SQL bạn dùng có filter đơn hủy không?"
"Bạn có đang tính cả đơn refund không?"
```

---

## Khi AI Trả Lời Sai

### Cách Kiểm Tra

1. Nhấn **View SQL** — xem câu query AI đã tạo ra.
2. Chạy câu query đó trực tiếp trong database để xác nhận kết quả.
3. Nếu SQL sai → vấn đề ở cấu hình Data Model (Description, Metrics, Relations).

### Nguyên Nhân Thường Gặp và Cách Khắc Phục

| Triệu Chứng | Nguyên Nhân | Cách Khắc Phục |
|-------------|-------------|----------------|
| AI dùng sai cột | Description cột chưa rõ | Vào Studio → Model → Columns → bổ sung Description |
| Tổng sai (thừa/thiếu) | Metric chưa có Filter đúng | Vào Studio → Model → Metrics → thêm Filter |
| AI không biết JOIN | Relations chưa khai báo | Vào Studio → Model → Relations → thêm relation |
| AI hiểu sai thuật ngữ | Thiếu Synonyms | Vào Studio → Model → Metrics → thêm Synonyms |
| Kết quả tính cả đơn hủy | Filter Metric thiếu điều kiện | Thêm `status != 'cancelled'` vào Metric filter |

---

## Xuất Kết Quả

| Định Dạng | Mô Tả |
|-----------|--------|
| **CSV** | Dữ liệu thô, không định dạng — phù hợp để import vào Excel hoặc Google Sheets |
| **Excel (.xlsx)** | File Excel có định dạng cơ bản |
| **Pin to Dashboard** | Lưu biểu đồ vào Dashboard để theo dõi lâu dài |

---

## Giới Hạn Kỹ Thuật

| Giới Hạn | Chi Tiết |
|---------|----------|
| **Số dòng trả về** | Mặc định tối đa 10.000 dòng mỗi query |
| **Thời gian timeout** | Query chạy quá 60 giây sẽ bị hủy |
| **Dữ liệu real-time** | Phụ thuộc Cache TTL của Connection — mặc định cache 1 giờ |
| **Ngôn ngữ** | Hỗ trợ mọi ngôn ngữ — tiếng Việt được tối ưu tốt với model GPT-4o và Claude |
