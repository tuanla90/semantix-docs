# Hệ Thống Lệnh `/` & Kỹ Năng AI (AI Skills)

Trong giao diện Semantix AI Chat, bạn không chỉ đặt những câu hỏi thông thường mà còn có thể kích hoạt các **Kỹ Năng Phân Tích Chuyên Nghiệp (AI Skills)** thông qua **Menu Lệnh `/` (Slash Commands)**.

Mỗi kỹ năng được đóng gói với phương pháp luận phân tích chuẩn mực của các nhà khoa học dữ liệu và chuyên gia tài chính hàng đầu, giúp AI đưa ra câu trả lời có cấu trúc, đi kèm số liệu kiểm chứng và loại trừ các sai số thống kê phổ biến.

---

## 1. Cách Sử Dụng Menu Lệnh `/` Trong Ô Chat

Việc sử dụng các kỹ năng AI diễn ra vô cùng trực quan và nhanh chóng:

1. **Mở Menu Kỹ Năng:**
   Trong khung nhập tin nhắn của ô Chat, chỉ cần gõ ký tự gạch chéo `/`. Một menu popover sẽ lập tức xuất hiện ngay phía trên con trỏ chuột.

2. **Duyệt & Tìm Kiếm Kỹ Năng:**
   - Bạn có thể gõ tiếp các ký tự để tìm kiếm nhanh theo tên lệnh hoặc mô tả (ví dụ gõ `/dia` để chọn `/metric-diagnostics`).
   - Sử dụng các phím mũi tên `↑` / `↓` trên bàn phím để di chuyển và nhấn `Enter` (hoặc nhấp chuột trái) để chọn kỹ năng mong muốn.

3. **Nhập Tham Số Theo Gợi Ý (Hint):**
   Sau khi chọn lệnh, tên kỹ năng sẽ được điền vào ô chat kèm một **nhãn gợi ý nhập liệu (Hint)** mờ giúp bạn biết cần bổ sung thông tin gì (ví dụ: `/metric-diagnostics metric, kỳ so sánh`). Bạn chỉ cần gõ tiếp câu hỏi cụ thể và nhấn gửi.

```
┌────────────────────────────────────────────────────────┐
│  /metric-diagnostics                                   │
│  Chẩn đoán vì sao metric thay đổi                     │
│  Gợi ý: metric, kỳ so sánh                             │
├────────────────────────────────────────────────────────┤
│  /explain-number                                       │
│  Giải thích con số này                                 │
│  Gợi ý: dán số hoặc trỏ vào chart                     │
├────────────────────────────────────────────────────────┤
│  /kpi-readout                                          │
│  Bản đọc KPI theo kỳ                                   │
│  Gợi ý: kỳ (tháng/quý), danh sách KPI                 │
└────────────────────────────────────────────────────────┘
```

---

## 2. Danh Sách Các Lệnh Phân Tích & Kỹ Năng AI

Các kỹ năng gọi được qua lệnh `/` được phân nhóm khoa học theo 5 danh mục nghiệp vụ:

### 2.1 Nhóm Chẩn Đoán (Diagnose)

| Lệnh `/` | Tiêu đề Kỹ năng | Gợi ý nhập liệu (Hint) | Khi nào nên dùng? | Ví dụ câu lệnh thực tế |
|---|---|---|---|---|
| `/metric-diagnostics` | **Chẩn đoán biến động chỉ số** | `metric, kỳ so sánh` | Tìm nguyên nhân khiến chỉ số tăng/giảm đột biến, lệch kế hoạch, hoặc giải thích vì sao 2 nguồn lệch số. | `/metric-diagnostics vì sao số dư CASA tháng này giảm so với tháng trước? Chi nhánh nào kéo?` |
| `/explain-number` | **Giải thích con số này** | `dán số hoặc trỏ vào chart` | Người dùng thắc mắc một con số trên màn hình ở đâu ra, công thức tính là gì, đã lọc những gì. | `/explain-number con số 3,2 tỷ trong biểu đồ doanh thu gồm những khoản nào?` |

### 2.2 Nhóm Phân Tích Nâng Cao (Advanced Analysis)

| Lệnh `/` | Tiêu đề Kỹ năng | Gợi ý nhập liệu (Hint) | Khi nào nên dùng? | Ví dụ câu lệnh thực tế |
|---|---|---|---|---|
| `/churn-risk` | **Khách có nguy cơ rời bỏ** | `khách hàng, ngày giao dịch` | Lập danh sách khách hàng đang im lặng quá hạn so với nhịp mua thường lệ của chính họ kèm giá trị đang treo. | `/churn-risk danh sách khách hàng bán lẻ lâu chưa phát sinh giao dịch mới` |
| `/cohort-retention` | **Phân tích giữ chân theo cohort** | `kỳ gia nhập, ngày hoạt động` | Đánh giá tỷ lệ khách hàng quay lại theo từng đợt (vintage/cohort analysis) qua các tháng. | `/cohort-retention tỷ lệ giữ chân khách hàng mới theo các tháng trong năm 2026` |
| `/funnel-conversion` | **Phễu chuyển đổi** | `các bước phễu, thời gian` | Đo lường tỷ lệ lọt qua từng giai đoạn và xác định bước rớt khách nhiều nhất (drop-off). | `/funnel-conversion phân tích phễu từ mở tài khoản đến phát sinh giao dịch đầu tiên` |
| `/rfm-segmentation` | **Phân khúc khách hàng RFM** | `ngày giao dịch, giá trị đơn` | Phân nhóm khách hàng theo 3 chiều: Độ gần đây (Recency), Tần suất (Frequency) và Giá trị (Monetary). | `/rfm-segmentation phân khúc khách hàng thẻ tín dụng theo mô hình RFM` |
| `/pareto-contribution` | **Phân tích Pareto 80/20** | `chiều phân tích, metric giá trị` | Xác định 20% đối tượng cốt lõi tạo ra 80% tổng giá trị (doanh thu, lợi nhuận, chi phí). | `/pareto-contribution 20% sản phẩm nào đóng góp 80% doanh thu toàn hệ thống?` |
| `/compare-groups` | **So sánh hai nhóm** | `nhóm A, nhóm B, chỉ số` | So sánh hiệu suất hoặc hành vi giữa hai nhóm khách hàng, hai thị trường, hai kênh bán hàng. | `/compare-groups so sánh giá trị đơn hàng trung bình giữa khách hàng Hà Nội và TP.HCM` |

### 2.3 Nhóm Báo Cáo (Reporting)

| Lệnh `/` | Tiêu đề Kỹ năng | Gợi ý nhập liệu (Hint) | Khi nào nên dùng? | Ví dụ câu lệnh thực tế |
|---|---|---|---|---|
| `/kpi-readout` | **Bản đọc KPI theo kỳ** | `kỳ (tháng/quý), danh sách KPI` | Đọc nhanh tiến độ hoàn thành mục tiêu (scorecard, WBR, MBR), xem chỉ số nào kịp đích, chỉ số nào trễ. | `/kpi-readout báo cáo tiến độ KPI quý 3/2026 của khối khách hàng doanh nghiệp` |
| `/report-executive` | **Cấu trúc báo cáo điều hành** | `chủ đề báo cáo, kỳ phân tích` | Tạo báo cáo tổng hợp chuyên sâu dành cho Ban Giám đốc (Tóm tắt điều hành, điểm nhấn số liệu, kiến nghị). | `/report-executive tổng kết tình hình kinh doanh tháng 8 và dự báo tháng 9` |

### 2.4 Nhóm Dữ Liệu (Data Management)

| Lệnh `/` | Tiêu đề Kỹ năng | Gợi ý nhập liệu (Hint) | Khi nào nên dùng? | Ví dụ câu lệnh thực tế |
|---|---|---|---|---|
| `/data-quality-profile` | **Kiểm chất lượng dữ liệu bảng** | `tên bảng hoặc mô hình` | Đánh giá độ sạch của bảng dữ liệu: tỷ lệ NULL, độ duy nhất, giá trị ngoại lai (outliers). | `/data-quality-profile kiểm tra chất lượng dữ liệu bảng dim_customers` |
| `/context-interview` | **Dạy trợ lý hiểu nghiệp vụ** | `tên bảng hoặc quy tắc` | Trò chuyện có cấu trúc để AI phỏng vấn bạn, từ đó tự động cập nhật từ đồng nghĩa và định nghĩa vào Context. | `/context-interview hướng dẫn cách hiểu các thuật ngữ trong bảng sao kê tài chính` |

### 2.5 Nhóm Kiểm Chứng (Validation)

| Lệnh `/` | Tiêu đề Kỹ năng | Gợi ý nhập liệu (Hint) | Khi nào nên dùng? | Ví dụ câu lệnh thực tế |
|---|---|---|---|---|
| `/validate-analysis` | **Kiểm chứng phân tích** | `câu trả lời hoặc bảng số liệu` | Soát lỗi phương pháp luận: kiểm tra lỗi đo lường, cỡ mẫu, mẫu số trôi, nghịch lý Simpson trước khi chia sẻ báo cáo. | `/validate-analysis phân tích doanh thu vừa rồi đã loại trừ đơn hoàn trả chưa?` |

---

## 3. Cơ Chế Tự Động Kích Hoạt (Smart Triggers)

Bạn **không bắt buộc** phải luôn gõ lệnh `/` để tận dụng các kỹ năng này!

Semantix được trang bị bộ nhận diện ý định thông minh (Intent Triggers). Khi bạn trò chuyện bằng văn bản tự nhiên, hệ thống sẽ tự động quét từ khóa và nạp kỹ năng tương ứng vào phiên làm việc:

- Khi câu hỏi có chứa: *"tại sao"*, *"vì sao"*, *"nguyên nhân"*, *"driver"*, *"giảm mạnh"*, *"tăng đột biến"*, *"lệch"*...  
  👉 Hệ thống **tự động kích hoạt Kỹ năng `metric-diagnostics`**.
- Khi câu hỏi có chứa: *"số này ở đâu ra"*, *"tính thế nào"*, *"nguồn của số"*, *"sao ra số này"*...  
  👉 Hệ thống **tự động kích hoạt Kỹ năng `explain-number`**.
- Khi câu hỏi có chứa: *"kiểm tra lại"*, *"có đúng không"*, *"đối chiếu"*, *"double check"*, *"tin được không"*...  
  👉 Hệ thống **tự động kích hoạt Kỹ năng `validate-analysis`**.
- Khi câu hỏi có chứa: *"báo cáo tuần"*, *"báo cáo tháng"*, *"tiến độ KPI"*, *"scorecard"*, *"WBR"*, *"MBR"*...  
  👉 Hệ thống **tự động kích hoạt Kỹ năng `kpi-readout`**.

Việc gõ trực tiếp lệnh `/` là cách nhanh nhất và chủ động nhất để bạn chỉ định rõ ràng phương pháp phân tích mà bạn mong muốn AI áp dụng.
