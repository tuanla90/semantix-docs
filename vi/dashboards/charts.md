# Biểu Đồ & Cấu Hình Widget — Hướng Dẫn Chi Tiết

Mỗi loại widget phục vụ một mục đích phân tích khác nhau. Trang này hướng dẫn đầy đủ: khi nào dùng, khi nào không nên dùng, toàn bộ tùy chọn cấu hình, và ví dụ thực tế cho từng loại.

---

## Cách Mở Widget Editor

**Thêm widget mới:**
Dashboard → nhấn **Edit** → nhấn **+ Add Widget** → chọn loại widget.

**Chỉnh sửa widget hiện có:**
Di chuột lên widget → nhấn **⚙️** ở góc tiêu đề → hoặc nhấn **⋮ → Edit Widget**.

Widget Editor có 3 tab:
- **Query**: Viết câu hỏi NL hoặc SQL thủ công
- **Visualization**: Tất cả tùy chọn hiển thị biểu đồ
- **Settings**: Tên widget, cache TTL, làm mới

---

## 1. Scorecard

### Mô Tả

Hiển thị **một số KPI đơn lẻ** với so sánh kỳ trước — dạng "số to + mũi tên tăng/giảm". Luôn đặt ở hàng đầu tiên của Dashboard để người xem nắm ngay số liệu quan trọng nhất.

### Khi Nào Dùng ✅

- Một chỉ số duy nhất quan trọng nhất (doanh thu, số đơn, số khách hàng)
- Muốn so sánh với kỳ trước (tháng này vs tháng trước, hôm nay vs hôm qua)
- Dashboard KPI cho ban lãnh đạo cần thấy ngay tình trạng
- Tóm tắt cấp cao trước khi đi vào chi tiết bên dưới

### Khi Nào Không Dùng ❌

- Muốn so sánh nhiều danh mục → dùng Bar Chart
- Muốn thấy xu hướng theo thời gian → dùng Line Chart
- Số liệu không có kỳ so sánh rõ ràng → Scorecard không phát huy tác dụng

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Bắt Buộc | Mô Tả | Ví Dụ Giá Trị |
|----------|---------|--------|--------------|
| **Value** | ✅ | Cột/metric hiển thị là số chính (to, nổi bật) | `total_revenue`, `order_count` |
| **Comparison Value** | ❌ | Giá trị kỳ trước để tính % thay đổi | `prev_month_revenue` |
| **Comparison Label** | ❌ | Nhãn mô tả kỳ so sánh | `vs. tháng trước`, `so với hôm qua` |
| **Number Format** | ✅ | Cách định dạng số | `auto`, `number`, `currency`, `percent`, `compact` |
| **Compact Format** | ❌ | Rút gọn số lớn: 1,234,567 → 1.2M | Bật/tắt |
| **Decimal Places** | ❌ | Số chữ số thập phân | `0`, `1`, `2` |
| **Prefix** | ❌ | Ký tự thêm trước số | `₫`, `$`, `~` |
| **Suffix** | ❌ | Ký tự thêm sau số | `đơn`, `KH`, `người`, `%` |
| **Icon** | ❌ | Biểu tượng emoji bên cạnh tiêu đề | `💰`, `📦`, `👥`, `⚠️` |
| **Color When Positive** | ❌ | Màu khi số tăng so với kỳ trước | `green` (mặc định) |
| **Color When Negative** | ❌ | Màu khi số giảm so với kỳ trước | `red` (mặc định) |
| **Reverse Color Logic** | ❌ | Đảo ngược logic màu — giảm là tốt | Bật cho "Tỷ lệ hủy đơn", "Số khiếu nại" |
| **Show Change Arrow** | ❌ | Hiển thị mũi tên ▲▼ chỉ hướng thay đổi | Bật (mặc định) |
| **Show Change Percent** | ❌ | Hiển thị % thay đổi | Bật (mặc định) |
| **Show Change Value** | ❌ | Hiển thị giá trị chênh lệch tuyệt đối | Tắt (mặc định) |
| **Background Color** | ❌ | Màu nền của scorecard | Trắng / màu tùy chỉnh |
| **Font Size** | ❌ | Kích thước số chính | `large`, `medium`, `small` |

### Ví Dụ SQL

**Scorecard đơn giản (không so sánh):**
```sql
SELECT SUM(revenue) AS doanh_thu
FROM don_hang
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
```

**Scorecard có so sánh tháng trước:**
```sql
SELECT
  SUM(CASE
    WHEN MONTH(order_date) = MONTH(CURRENT_DATE)
     AND YEAR(order_date) = YEAR(CURRENT_DATE)
    THEN revenue ELSE 0
  END) AS thang_nay,
  SUM(CASE
    WHEN MONTH(order_date) = MONTH(CURRENT_DATE) - 1
     AND YEAR(order_date) = YEAR(CURRENT_DATE)
    THEN revenue ELSE 0
  END) AS thang_truoc
FROM don_hang
WHERE status IN ('paid', 'delivered')
```
→ Value = `thang_nay`, Comparison Value = `thang_truoc`

### Bố Cục Phổ Biến

4 Scorecard hàng đầu — phủ full width:
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 💰 Doanh thu │  📦 Số đơn  │  👥 KH mới  │ ❌ Tỷ lệ hủy│
│  1.23 tỷ VNĐ │  2,847 đơn  │  389 người  │   2.3%       │
│   ▲ 15%      │   ▲ 8%      │   ▲ 31%     │   ▼ 0.5%     │
│ vs. tháng trước│vs. tháng trước│vs. tháng trước│vs. tháng trước│
└──────────────┴──────────────┴──────────────┴──────────────┘
```

> **Tip:** Dùng **Reverse Color** cho các chỉ số mà giảm là tốt: tỷ lệ hủy đơn, số khiếu nại, tỷ lệ lỗi, chi phí vận hành. Khi giảm → mũi tên ▼ xanh (thay vì đỏ).

---

## 2. Bar Chart (Biểu Đồ Cột)

### Mô Tả

So sánh giá trị giữa các danh mục rời rạc. Trả lời câu hỏi **"Cái nào nhiều nhất / ít nhất?"** và **"Chênh lệch bao nhiêu?"**

### Khi Nào Dùng ✅

- So sánh doanh thu / số đơn giữa chi nhánh, kênh bán, sản phẩm
- Xếp hạng Top N (Top 10 sản phẩm, Top 5 nhân viên)
- So sánh giữa các tháng hoặc quý (mỗi cột = 1 kỳ)
- Dữ liệu có từ 2 đến 20 danh mục

### Khi Nào Không Dùng ❌

- Theo dõi xu hướng thời gian liên tục (dùng Line Chart — trực quan hơn)
- Quá nhiều danh mục (> 20) → quá chật, khó đọc
- Muốn thấy tỷ lệ phần trăm trong tổng thể → Pie/Donut phù hợp hơn

### Năm Biến Thể Bar Chart

| Biến Thể | Dùng Khi |
|---------|---------|
| **Vertical Bar** (cột dọc) | Mặc định — tên danh mục ngắn, so sánh theo thời gian |
| **Horizontal Bar** (cột ngang) | Tên danh mục dài (tên sản phẩm, tên nhân viên); nhiều danh mục (15-20) |
| **Stacked Bar** (cột chồng) | Muốn xem tổng + tỷ lệ từng thành phần trong cùng cột |
| **100% Stacked Bar** | Chỉ quan tâm tỷ lệ %, không cần giá trị tuyệt đối |
| **Grouped Bar** (cột nhóm) | So sánh đồng thời 2-4 chỉ số trong cùng một danh mục |

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **X Axis (Dimension)** | Cột danh mục — trục ngang (cột đứng) hoặc trục dọc (cột ngang) | `region`, `month`, `product_name` |
| **Y Axis (Metric)** | Cột giá trị cần đo | `total_revenue`, `order_count` |
| **Color By** | Cột tạo series màu khác nhau (grouped/stacked) | `channel` → mỗi kênh một màu |
| **Bar Orientation** | `Vertical` hoặc `Horizontal` | |
| **Bar Type** | `Standard` / `Stacked` / `100% Stacked` / `Grouped` | |
| **Sort** | Sắp xếp thanh: `None` / `X Asc` / `X Desc` / `Y Asc` / `Y Desc` | `Y Desc` → cao nhất trước |
| **Limit** | Số danh mục tối đa hiển thị | `10` → Top 10 |
| **Show Others** | Gộp các danh mục bị cắt thành "Khác" | Bật nếu muốn giữ tổng chính xác |
| **Bar Corner Radius** | Bo tròn đầu cột (px) | `0` = vuông, `4` = bo nhẹ, `8` = bo nhiều |
| **Bar Gap** | Khoảng cách giữa các cột (%) | `20` (mặc định) |
| **Show Data Labels** | Hiển thị số trên đầu hoặc trong thân cột | Bật khi cần đọc số chính xác |
| **Data Label Position** | `top` / `center` / `inside-end` | |
| **Data Label Format** | Format số trong label: compact, currency... | `1.2M`, `₫1,200,000` |
| **X Axis Label** | Tên trục X tùy chỉnh | `Chi Nhánh` |
| **Y Axis Label** | Tên trục Y tùy chỉnh | `Doanh Thu (VNĐ)` |
| **Y Axis Min** | Giá trị min trục Y | `0` — luôn bắt đầu từ 0 cho bar chart |
| **Y Axis Max** | Giá trị max trục Y | Để trống = tự động |
| **Y Axis Format** | Format số trục Y: `compact`, `currency`, `percent` | `1.2M` thay vì `1,200,000` |
| **Second Y Axis** | Thêm trục Y bên phải cho series thứ 2 (khác đơn vị) | Doanh thu (trái) + % tăng trưởng (phải) |
| **Color Palette** | Bộ màu sắc cho các series | Chọn từ preset hoặc tùy chỉnh |
| **Show Legend** | Hiển thị chú thích màu | Bật khi có nhiều series |
| **Legend Position** | `Top` / `Bottom` / `Right` / `Left` | `Bottom` (mặc định) |
| **Reference Lines** | Thêm đường ngang mục tiêu | Xem phần Reference Lines |
| **Show Grid Lines** | Đường kẻ ô nền | Bật (mặc định) |
| **Tooltip** | Nội dung hiển thị khi hover | Tự động hoặc tùy chỉnh |

### Ví Dụ SQL

**Top 10 chi nhánh theo doanh thu:**
```sql
SELECT
  branch_name AS chi_nhanh,
  SUM(revenue) AS doanh_thu,
  COUNT(DISTINCT order_id) AS so_don
FROM don_hang
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY branch_name
ORDER BY doanh_thu DESC
LIMIT 10
```

**Doanh thu theo kênh, so sánh theo tháng (Grouped Bar):**
```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS thang,
  channel AS kenh,
  SUM(revenue) AS doanh_thu
FROM don_hang
WHERE status = 'paid'
  AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
GROUP BY thang, kenh
ORDER BY thang, kenh
```
→ X Axis = `thang`, Y Axis = `doanh_thu`, Color By = `kenh`, Bar Type = `Grouped`

> **Tip quan trọng:** Trục Y của Bar Chart nên **luôn bắt đầu từ 0**. Bắt đầu từ giá trị khác sẽ phóng đại sự khác biệt và gây hiểu nhầm.

---

## 3. Line Chart (Biểu Đồ Đường)

### Mô Tả

Thể hiện **sự thay đổi theo thời gian** của một hoặc nhiều chỉ số. Mắt người dễ nhận ra xu hướng tăng/giảm/bằng phẳng từ đường liên tục.

### Khi Nào Dùng ✅

- Theo dõi chỉ số theo ngày, tuần, tháng, quý
- So sánh xu hướng giữa 2-4 series cùng đơn vị
- Phát hiện đỉnh, đáy, điểm bất thường trong chuỗi thời gian
- Phân tích seasonal pattern (mùa vụ)

### Khi Nào Không Dùng ❌

- So sánh các danh mục không liên quan theo thời gian (dùng Bar Chart)
- Quá nhiều series (> 5 đường) → rối mắt, khó phân biệt
- Dữ liệu không có thứ tự thời gian (X là danh mục rời rạc → Bar Chart)
- Chỉ có 1-2 điểm dữ liệu → không đủ để vẽ đường xu hướng

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **X Axis** | Cột thời gian (trục ngang) | `order_date`, `week`, `month` |
| **Y Axis** | Metric giá trị (trục dọc) | `total_revenue`, `order_count` |
| **Color By** | Cột tạo nhiều đường với màu khác nhau | `year` → 2 đường so sánh 2 năm |
| **Second Y Axis** | Trục Y phụ bên phải cho series khác đơn vị | Doanh thu (tỷ) + Tỷ lệ tăng trưởng (%) |
| **Line Style** | `Solid` / `Dashed` / `Dotted` | Dashed cho kỳ trước, Solid cho kỳ này |
| **Line Thickness** | Độ dày đường (px) | `1` = mỏng, `2` = bình thường, `4` = đậm |
| **Point Shape** | Hình dạng điểm: Circle / Square / Triangle / Diamond | |
| **Point Size** | Kích thước điểm dữ liệu (px); `0` = ẩn điểm | `0` cho nhiều điểm, `4` cho ít điểm |
| **Point Show On Hover** | Chỉ hiện điểm khi hover | Bật nếu có nhiều điểm dữ liệu |
| **Smooth Line** | Đường cong spline (mượt) thay vì gấp khúc | Bật cho trend, tắt cho biến động ngắn hạn |
| **Step Line** | Đường bậc thang (giữ nguyên đến bước kế tiếp) | Dùng cho dữ liệu rời rạc (số nhân viên) |
| **Fill Below Line** | Tô màu vùng dưới đường (thành Area Chart) | |
| **Fill Opacity** | Độ trong suốt vùng tô (0–1) | `0.15` = nhạt, `0.5` = đậm |
| **Null/Missing Value** | Xử lý dữ liệu thiếu: `Gap` / `Zero` / `Interpolate` | `Gap` = đứt; `Interpolate` = nối thẳng |
| **Y Axis Scale** | `Linear` hoặc `Logarithmic` | Log cho dữ liệu chênh lệch cực lớn |
| **Y Axis Min** | Giá trị bắt đầu trục Y | `0` hoặc để trống (auto) |
| **Y Axis Max** | Giá trị kết thúc trục Y | Để trống (auto) |
| **Y Axis Format** | Định dạng số trục Y | `compact`, `currency`, `percent` |
| **X Axis Date Format** | Format ngày hiển thị trục X | `DD/MM` / `MMM YYYY` / `Tháng M` |
| **Show Data Labels** | Hiện số tại từng điểm dữ liệu | Tắt (mặc định — dễ rối) |
| **Reference Lines** | Đường ngang mục tiêu / trung bình | Xem phần Reference Lines |
| **Zoom** | Bật zoom trên biểu đồ khi xem | Bật cho chuỗi dữ liệu dài |
| **Tooltip** | Hiển thị giá trị khi hover | Bật (mặc định) |
| **Show Legend** | Chú thích màu sắc series | Bật khi có nhiều đường |
| **Legend Position** | `Top` / `Bottom` / `Right` | |

### Ví Dụ SQL

**Doanh thu theo ngày trong tháng hiện tại:**
```sql
SELECT
  DATE(order_date) AS ngay,
  SUM(revenue) AS doanh_thu
FROM don_hang
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY DATE(order_date)
ORDER BY ngay
```

**So sánh doanh thu theo ngày: năm nay vs năm ngoái (2 đường):**
```sql
SELECT
  DAY(order_date) AS ngay_trong_thang,
  YEAR(order_date) AS nam,
  SUM(revenue) AS doanh_thu
FROM don_hang
WHERE status IN ('paid', 'delivered')
  AND MONTH(order_date) = MONTH(CURRENT_DATE)
  AND YEAR(order_date) IN (YEAR(CURRENT_DATE), YEAR(CURRENT_DATE) - 1)
GROUP BY DAY(order_date), YEAR(order_date)
ORDER BY ngay_trong_thang, nam
```
→ X Axis = `ngay_trong_thang`, Y Axis = `doanh_thu`, Color By = `nam`

**Doanh thu và tỷ lệ tăng trưởng (dual Y axis):**
```sql
WITH monthly AS (
  SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS thang,
    SUM(revenue) AS doanh_thu
  FROM don_hang
  WHERE status = 'paid'
  GROUP BY thang
)
SELECT
  thang,
  doanh_thu,
  ROUND((doanh_thu - LAG(doanh_thu) OVER (ORDER BY thang))
        / LAG(doanh_thu) OVER (ORDER BY thang) * 100, 1) AS tang_truong_pct
FROM monthly
ORDER BY thang
```
→ Y Axis = `doanh_thu`, Second Y Axis = `tang_truong_pct`

> **Tip:** Dùng **Null = Gap** khi dữ liệu thực sự bị thiếu (không có đơn ngày lễ). Dùng **Null = Zero** khi muốn thể hiện "không có doanh thu". Dùng **Null = Interpolate** khi muốn đường liên tục và dữ liệu thiếu là ngẫu nhiên.

---

## 4. Area Chart (Biểu Đồ Vùng)

### Mô Tả

Giống Line Chart nhưng vùng dưới đường được tô màu — nhấn mạnh **khối lượng** và **diện tích** thay vì chỉ xu hướng. Đặc biệt mạnh với Stacked Area để thấy tỷ lệ đóng góp của từng thành phần theo thời gian.

### Khi Nào Dùng ✅

- Doanh thu tích lũy (cumulative) theo thời gian
- So sánh đóng góp của từng kênh/danh mục theo thời gian (Stacked Area)
- Dữ liệu dương, liên tục, và muốn nhấn mạnh "diện tích" (volume)
- Có 2-5 series và muốn thấy cả tổng lẫn tỷ lệ từng phần

### Khi Nào Không Dùng ❌

- Các series có giá trị âm (vùng tô bị cắt, rối mắt)
- Nhiều hơn 5 series (dùng Line Chart thay thế)
- Muốn so sánh giá trị chính xác giữa các series chồng (khó nhìn chiều cao từng phần)

### Ba Biến Thể Area Chart

| Biến Thể | Đặc Điểm | Khi Dùng |
|---------|---------|---------|
| **Standard Area** | Các series có thể đè lên nhau | Ít series (1-2), muốn thấy từng series riêng |
| **Stacked Area** | Các series xếp chồng — chiều cao tổng = tổng giá trị | Muốn xem tổng + đóng góp từng phần |
| **100% Stacked Area** | Chuẩn hóa về 100% — chỉ thấy tỷ lệ | Chỉ quan tâm tỷ lệ, không phải giá trị tuyệt đối |

### Toàn Bộ Tùy Chọn Cấu Hình

Tương tự Line Chart, với thêm:

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Area Type** | `Standard` / `Stacked` / `100% Stacked` | |
| **Fill Opacity** | Độ trong suốt vùng tô (0–1) | `0.2` = rất nhạt, `0.6` = đậm |
| **Gradient Fill** | Tô màu gradient từ đậm (trên) → nhạt (dưới) | Bật cho Standard Area đẹp hơn |
| **Show Line** | Hiển thị đường viền trên vùng tô | Bật (mặc định) |

### Ví Dụ SQL

**Doanh thu theo kênh bán hàng — Stacked Area:**
```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m-%d') AS ngay,
  channel AS kenh,
  SUM(revenue) AS doanh_thu
FROM don_hang
WHERE status = 'paid'
  AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY ngay, kenh
ORDER BY ngay, kenh
```
→ Area Type = `Stacked`, X = `ngay`, Y = `doanh_thu`, Color By = `kenh`

---

## 5. Pie Chart & Donut Chart

### Mô Tả

Hiển thị **tỷ lệ phần trăm** các phần trong một tổng thể. Donut là Pie với lỗ ở giữa — cho phép hiển thị thêm nhãn tổng.

### Khi Nào Dùng ✅

- Chỉ có 2-6 phần, mỗi phần có ý nghĩa riêng biệt
- Tỷ lệ giữa các phần chênh lệch rõ ràng (không phải tất cả gần bằng nhau)
- Câu hỏi là "phần này chiếm bao nhiêu % tổng?"
- Donut: khi muốn hiển thị số tổng ở giữa

### Khi Nào Không Dùng ❌

- Hơn 7 phần → quá nhiều màu, khó phân biệt (dùng Horizontal Bar Chart)
- Các phần có giá trị gần bằng nhau → không thể phân biệt bằng mắt
- Muốn so sánh giá trị chính xác giữa các phần → Bar Chart rõ hơn
- Muốn theo dõi xu hướng thời gian

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Dimension** | Cột phân loại (tên các lát bánh) | `channel`, `category`, `status` |
| **Metric** | Cột giá trị (kích thước mỗi lát) | `total_revenue`, `order_count` |
| **Chart Type** | `Pie` hoặc `Donut` | |
| **Donut Hole Size** | Kích thước lỗ giữa — chỉ Donut (0.3–0.8) | `0.6` |
| **Center Label** | Văn bản hiển thị ở giữa lỗ (Donut) | `Tổng DT`, `5.2 tỷ` |
| **Center Value** | Giá trị số hiển thị ở giữa (tự động tính tổng) | Bật = hiển thị TỔNG tất cả các lát |
| **Show Percentages** | Hiển thị % trên từng lát | Bật (khuyến nghị) |
| **Show Values** | Hiển thị giá trị tuyệt đối trên từng lát | Tắt (dùng tooltip thay thế) |
| **Show Labels** | Tên danh mục ngay trên lát bánh | Bật hoặc chỉ trong Legend |
| **Min Slice Percent** | Gộp các lát < X% thành "Khác" | `2` → lát < 2% → "Khác" |
| **Others Label** | Tên nhãn cho lát "Khác" | `Khác`, `Còn lại` |
| **Sort** | Sắp xếp lát: `Desc` (lớn nhất trước) | `Value Desc` (mặc định) |
| **Start Angle** | Góc bắt đầu của lát đầu tiên | `0` = 12 giờ, `90` = 3 giờ |
| **Legend Position** | `Right` / `Bottom` / `Left` / `Hidden` | `Right` (mặc định) |
| **Color Palette** | Bộ màu sắc | Chọn preset hoặc tùy chỉnh từng lát |
| **Inner Radius Label Size** | Kích thước font số giữa Donut | `Large` / `Medium` / `Small` |
| **Explode Slice** | Tách rời một lát khỏi bánh để nhấn mạnh | Chọn lát cần nhấn mạnh |

### Ví Dụ SQL

**Phân bổ doanh thu theo kênh bán hàng:**
```sql
SELECT
  channel AS kenh,
  SUM(revenue) AS doanh_thu,
  ROUND(SUM(revenue) / SUM(SUM(revenue)) OVER () * 100, 1) AS phan_tram
FROM don_hang
WHERE status IN ('paid', 'delivered')
  AND YEAR(order_date) = YEAR(CURRENT_DATE)
GROUP BY channel
ORDER BY doanh_thu DESC
```

> **Tip:** Khi dùng `Min Slice Percent = 2`, các kênh nhỏ dưới 2% sẽ gộp vào "Khác" — giúp biểu đồ gọn và tập trung vào các kênh quan trọng.

---

## 6. Table Widget (Bảng Dữ Liệu)

### Mô Tả

Hiển thị dữ liệu dạng bảng nhiều hàng và cột. Phù hợp khi người dùng cần **đọc nhiều thông tin** chi tiết, tìm kiếm, hoặc xuất ra file.

### Khi Nào Dùng ✅

- Danh sách với nhiều thuộc tính (khách hàng, đơn hàng, sản phẩm)
- Người dùng cần tìm kiếm hoặc lọc trong dữ liệu
- Cần hiển thị cả giá trị số và text trong cùng một view
- Drill-down chi tiết bên dưới các biểu đồ tổng hợp
- Export dữ liệu ra CSV/Excel

### Khi Nào Không Dùng ❌

- Muốn thấy xu hướng hoặc so sánh trực quan → dùng biểu đồ
- Dữ liệu có hàng chục nghìn dòng không filter → quá chậm, không hữu ích
- Muốn executive summary → biểu đồ trực quan hơn table

### Cấu Hình Cột

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Column Selection** | Chọn cột nào hiển thị và thứ tự | Kéo thả để sắp xếp |
| **Column Label** | Đổi tên tiêu đề cột | `total_revenue` → `Doanh Thu` |
| **Column Width** | Chiều rộng cột | `auto` (mặc định) hoặc `120px` |
| **Column Alignment** | `Left` / `Center` / `Right` | Số → Right; Text → Left |
| **Number Format** | Format giá trị số trong cột | `currency`, `number`, `percent`, `compact` |
| **Decimal Places** | Số chữ số thập phân | `0` cho số nguyên, `2` cho phần trăm |
| **Prefix** | Thêm trước giá trị trong cột | `₫` |
| **Suffix** | Thêm sau giá trị trong cột | `đơn`, `%`, `KH` |
| **Date Format** | Format hiển thị cột ngày | `DD/MM/YYYY`, `MMM DD, YYYY` |
| **Hide Column** | Ẩn cột (có trong data, không hiển thị) | Dùng để ẩn cột ID hoặc cột dùng cho sorting |
| **Pin Left / Right** | Cố định cột khi cuộn ngang | Pin cột tên, cột ID |
| **Wrap Text** | Tự xuống dòng khi text dài | Bật cho cột mô tả, ghi chú |
| **Link** | Biến giá trị thành hyperlink | `https://orders.company.com/{{order_id}}` |
| **Conditional Formatting** | Tô màu theo điều kiện (xem mục riêng) | |

### Cấu Hình Bảng (Table-Level)

| Tùy Chọn | Mô Tả | Gợi Ý |
|----------|--------|-------|
| **Pagination** | Số dòng mỗi trang | `20` (mặc định), `50`, `100` |
| **Default Page Size** | Số dòng mặc định khi mở | `20` |
| **Searchable** | Thanh tìm kiếm real-time trên tất cả cột | Bật cho table nhiều dòng |
| **Sortable Columns** | Cho phép click tiêu đề để sắp xếp | Bật |
| **Default Sort Column** | Cột sắp xếp mặc định | `total_revenue` |
| **Default Sort Order** | `Asc` hoặc `Desc` | `Desc` |
| **Frozen Columns** | Số cột đầu cố định khi cuộn ngang | `1` hoặc `2` |
| **Frozen Rows (Header)** | Tiêu đề cột cố định khi cuộn dọc | Bật (mặc định) |
| **Row Striping** | Màu nền xen kẽ hàng (dễ đọc) | Bật |
| **Row Hover Highlight** | Highlight hàng khi hover | Bật |
| **Column Resize** | Người dùng kéo thay đổi rộng cột | Bật |
| **Column Reorder** | Người dùng kéo đổi thứ tự cột | Bật / Tắt tùy yêu cầu |
| **Max Height** | Chiều cao tối đa trước khi xuất hiện scrollbar dọc | `400px`, `600px` |
| **Row Click Action** | Hành động khi click dòng: mở URL, mở modal | URL: `/orders/{{order_id}}` |
| **Export Button** | Nút Download CSV/Excel ngay trong bảng | Bật cho bảng dữ liệu |
| **Export Filename** | Tên file khi xuất | `danh_sach_don_hang_{{date}}` |
| **Show Row Numbers** | Hiển thị số thứ tự cột đầu tiên | Bật/Tắt |
| **Density** | Mật độ hiển thị: `Compact` / `Normal` / `Comfortable` | `Normal` |
| **Border Style** | `Full` / `Horizontal` / `None` | `Horizontal` |

### Ví Dụ SQL

**Bảng top 50 khách hàng theo doanh thu:**
```sql
SELECT
  ROW_NUMBER() OVER (ORDER BY SUM(o.revenue) DESC) AS stt,
  c.full_name AS ho_ten,
  c.phone AS dien_thoai,
  c.city AS thanh_pho,
  COUNT(DISTINCT o.order_id) AS so_don,
  SUM(o.revenue) AS tong_mua,
  AVG(o.revenue) AS gia_tri_trung_binh,
  MAX(o.order_date) AS lan_mua_cuoi
FROM khach_hang c
JOIN don_hang o ON o.customer_id = c.id
WHERE o.status IN ('paid', 'delivered')
  AND o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 365 DAY)
GROUP BY c.id, c.full_name, c.phone, c.city
ORDER BY tong_mua DESC
LIMIT 50
```

**Bảng tồn kho với cảnh báo:**
```sql
SELECT
  p.sku AS ma_san_pham,
  p.name AS ten_san_pham,
  p.category AS danh_muc,
  i.quantity AS ton_kho,
  i.min_quantity AS muc_canh_bao,
  p.cost_price AS gia_nhap,
  p.sell_price AS gia_ban,
  CASE
    WHEN i.quantity = 0 THEN 'Hết hàng'
    WHEN i.quantity < i.min_quantity THEN 'Sắp hết'
    ELSE 'Bình thường'
  END AS trang_thai
FROM san_pham p
JOIN inventory i ON i.product_id = p.id
ORDER BY
  CASE WHEN i.quantity = 0 THEN 0
       WHEN i.quantity < i.min_quantity THEN 1
       ELSE 2
  END,
  p.name
```
→ Áp dụng Conditional Formatting: `trang_thai = 'Hết hàng'` → nền đỏ; `trang_thai = 'Sắp hết'` → nền vàng

---

## 7. Conditional Formatting (Định Dạng Có Điều Kiện)

Tính năng tô màu động áp dụng cho **Table Widget** — giúp phát hiện nhanh dữ liệu bất thường mà không cần đọc từng số.

### Cách Cấu Hình

Widget Editor → tab **Visualization** → cuộn xuống **Conditional Formatting** → **Add Rule**

### Toàn Bộ Tùy Chọn Một Rule

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Column** | Cột áp dụng điều kiện | `revenue`, `status`, `stock` |
| **Condition** | Phép so sánh | `>`, `<`, `>=`, `<=`, `=`, `!=`, `contains`, `starts with`, `is empty`, `is not empty` |
| **Value** | Giá trị ngưỡng | `10000000`, `cancelled`, `Low` |
| **Text Color** | Màu chữ khi thỏa điều kiện | Đỏ `#dc3545`, Xanh `#198754` |
| **Background Color** | Màu nền ô/hàng khi thỏa điều kiện | Vàng nhạt `#fff3cd` |
| **Bold** | In đậm text | Bật |
| **Italic** | In nghiêng text | Bật |
| **Strikethrough** | Gạch ngang text | Bật cho dữ liệu đã xóa/hủy |
| **Apply To** | Tô màu `Cell` (ô đó) hay `Row` (cả hàng) | `Row` cho đơn hủy; `Cell` cho cột số |
| **Custom Icon** | Thêm icon trước giá trị | ✅ 🔴 ⚠️ |
| **Priority** | Thứ tự ưu tiên khi nhiều rule cùng áp dụng | Rule số nhỏ = ưu tiên cao hơn |

### 10 Rule Thực Tế Phổ Biến

| Use Case | Column | Condition | Value | Kết Quả Hiển Thị |
|----------|--------|-----------|-------|-----------------|
| Đơn hàng giá trị cao | `revenue` | `>` | `10000000` | Nền xanh nhạt `#d1fae5` |
| Đơn hủy | `status` | `=` | `cancelled` | Chữ đỏ, gạch ngang |
| Tồn kho hết hàng | `quantity` | `=` | `0` | Nền đỏ đậm, chữ trắng |
| Tồn kho sắp hết | `quantity` | `<` | `10` | Nền vàng `#fef3c7` |
| Tăng trưởng âm | `growth_pct` | `<` | `0` | Chữ đỏ |
| Tăng trưởng dương cao | `growth_pct` | `>` | `20` | Chữ xanh, in đậm |
| Đơn quá hạn | `delivery_status` | `=` | `overdue` | Nền đỏ nhạt, in đậm |
| Điểm thấp | `rating` | `<=` | `3` | Chữ cam |
| Đạt KPI | `actual` | `>=` | `target` | Icon ✅ + Nền xanh |
| Khách VIP | `customer_tier` | `=` | `VIP` | Màu vàng gold, in đậm |

> **Tip:** Có thể tạo nhiều rule cho cùng một cột — ví dụ: `quantity = 0` → đỏ đậm; `quantity < 10` → vàng; `quantity >= 10` → xanh. Semantix áp dụng theo priority.

---

## 8. Scatter Chart & Bubble Chart (Biểu Đồ Phân Tán)

### Mô Tả

Mỗi điểm trên biểu đồ đại diện cho một thực thể (sản phẩm, khách hàng, chi nhánh). Vị trí điểm (X, Y) thể hiện 2 thuộc tính — giúp khám phá **tương quan và phân cụm**.

**Bubble Chart** là Scatter Chart với thêm chiều thứ 3: **kích thước điểm** thể hiện giá trị thứ 3.

### Khi Nào Dùng ✅

- Khám phá mối liên hệ giữa 2 biến: "Chi nhánh chi tiêu marketing nhiều hơn có doanh thu cao hơn không?"
- Phát hiện outlier: sản phẩm bán nhiều nhưng doanh thu thấp bất thường
- Phân cụm tự nhiên: khách hàng theo frequency vs monetary value
- So sánh hiệu quả: ROI vs Chi phí của từng kênh marketing

### Khi Nào Không Dùng ❌

- Dữ liệu không phải dạng "mỗi điểm = một thực thể" (dùng Line/Bar thay thế)
- Ít hơn 5 điểm — không đủ để thấy pattern
- Không có giả thuyết về tương quan — biểu đồ sẽ không có ý nghĩa

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **X Axis** | Cột biến thứ nhất (trục ngang) | `marketing_spend`, `order_count` |
| **Y Axis** | Cột biến thứ hai (trục dọc) | `revenue`, `profit` |
| **Size By** | Cột quyết định kích thước điểm (Bubble Chart) | `profit_margin` |
| **Size Range** | Kích thước min–max điểm (px) | `5–40` |
| **Color By** | Cột phân nhóm màu điểm | `category`, `region` |
| **Label By** | Cột hiển thị tên nhãn bên cạnh điểm | `product_name`, `branch_name` |
| **Label Threshold** | Chỉ hiện nhãn cho điểm nổi bật (top N) | `10` → chỉ nhãn 10 điểm lớn nhất |
| **Point Opacity** | Độ trong suốt (0–1) — giảm khi điểm chồng nhau | `0.7` |
| **Point Shape** | `Circle` / `Square` / `Triangle` | `Circle` (mặc định) |
| **Default Point Size** | Kích thước mặc định khi không có Size By | `8px` |
| **Show Regression Line** | Đường xu hướng tuyến tính (best-fit line) | Bật khi muốn thấy correlation |
| **Regression Type** | `Linear` / `Polynomial` / `Exponential` | `Linear` |
| **Quadrant Lines** | Chia biểu đồ thành 4 phần (X mean, Y mean) | Bật để phân loại thực thể |
| **Quadrant Labels** | Nhãn 4 góc | `High ROI`, `Low Efficiency`... |
| **X Axis Log Scale** | Trục X logarithmic | Khi X có giá trị chênh lệch cực lớn |
| **Y Axis Log Scale** | Trục Y logarithmic | Tương tự |
| **Tooltip** | Thông tin khi hover điểm | Tự động hiển thị tất cả cột |

### Ví Dụ SQL

**Phân tích sản phẩm: Số đơn vs Doanh thu (Bubble = Giá TB):**
```sql
SELECT
  p.product_name AS san_pham,
  p.category AS danh_muc,
  COUNT(DISTINCT oi.order_id) AS so_don,
  SUM(oi.revenue) AS doanh_thu,
  AVG(oi.unit_price) AS gia_trung_binh,
  ROUND(SUM(oi.profit) / SUM(oi.revenue) * 100, 1) AS bien_loi_nhuan
FROM order_items oi
JOIN san_pham p ON oi.product_id = p.id
WHERE oi.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY p.id, p.product_name, p.category
HAVING so_don > 5
ORDER BY doanh_thu DESC
```
→ X = `so_don`, Y = `doanh_thu`, Size By = `gia_trung_binh`, Color By = `danh_muc`, Label By = `san_pham`

> **Tip:** Bật **Quadrant Lines** để tự động chia biểu đồ thành 4 góc — dễ dàng phân loại: "Bán nhiều + Doanh thu cao" (góc phải trên), "Bán ít + Doanh thu thấp" (góc trái dưới)...

---

## 9. Treemap

### Mô Tả

Hiển thị dữ liệu phân cấp dưới dạng các ô hình chữ nhật lồng nhau. Kích thước ô = giá trị metric. Rất hiệu quả khi cần **thấy cả bức tranh toàn cảnh lẫn chi tiết phân cấp** trong một view.

### Khi Nào Dùng ✅

- Doanh thu toàn công ty → chia theo danh mục → chia theo sản phẩm
- Tồn kho toàn kho → theo nhà cung cấp → theo sản phẩm
- Ngân sách → theo bộ phận → theo dự án
- Khi có nhiều hơn 7-8 danh mục (Pie Chart không đủ chỗ)

### Khi Nào Không Dùng ❌

- Dữ liệu không có tính phân cấp rõ ràng
- Muốn so sánh chính xác giữa các ô có kích thước gần nhau
- Ô quá nhiều và quá nhỏ → nhãn không đọc được

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Group By (Level 1)** | Cột phân cấp chính — tạo các ô lớn | `category_name` |
| **Sub-Group By (Level 2)** | Cột phân cấp nhỏ hơn trong mỗi ô lớn | `product_name` |
| **Size By** | Metric quyết định kích thước ô | `total_revenue` |
| **Color By (Metric)** | Metric quyết định màu sắc (gradient) | `growth_rate` → xanh tăng, đỏ giảm |
| **Color By (Dimension)** | Dùng màu theo danh mục cấp 1 | Mỗi nhóm một màu riêng |
| **Color Scale** | Thang màu cho Color By metric | `Green-Red`, `Blue-Orange`, `Sequential` |
| **Show Group Labels** | Hiển thị nhãn ô cấp 1 (lớn) | Bật |
| **Show Item Labels** | Hiển thị nhãn ô cấp 2 (nhỏ) | Bật (nếu ô đủ lớn) |
| **Show Values** | Hiển thị giá trị trong ô | Bật cho ô lớn |
| **Show Percentages** | Hiển thị % trong ô | Bật |
| **Min Label Size** | Kích thước font tối thiểu để hiện nhãn (px) | `10` — ô nhỏ hơn không hiện nhãn |
| **Padding** | Khoảng cách giữa các ô | `2px` |
| **Layout Algorithm** | `Squarified` / `Slice and Dice` / `Strip` | `Squarified` (mặc định — hình vuông nhất) |

### Ví Dụ SQL

**Treemap: Doanh thu theo danh mục → sản phẩm:**
```sql
SELECT
  p.category AS danh_muc,
  p.product_name AS san_pham,
  SUM(oi.revenue) AS doanh_thu,
  ROUND(
    (SUM(oi.revenue) - SUM_PREV.prev_revenue)
    / NULLIF(SUM_PREV.prev_revenue, 0) * 100, 1
  ) AS tang_truong_pct
FROM order_items oi
JOIN san_pham p ON oi.product_id = p.id
LEFT JOIN (
  SELECT product_id, SUM(revenue) AS prev_revenue
  FROM order_items
  WHERE order_date BETWEEN
    DATE_SUB(DATE_FORMAT(CURRENT_DATE,'%Y-%m-01'), INTERVAL 1 MONTH)
    AND DATE_SUB(DATE_FORMAT(CURRENT_DATE,'%Y-%m-01'), INTERVAL 1 DAY)
  GROUP BY product_id
) SUM_PREV ON SUM_PREV.product_id = oi.product_id
WHERE oi.order_date >= DATE_FORMAT(CURRENT_DATE,'%Y-%m-01')
GROUP BY p.category, p.product_name, SUM_PREV.prev_revenue
ORDER BY doanh_thu DESC
```

---

## 10. Funnel Chart (Biểu Đồ Phễu)

### Mô Tả

Trực quan hóa **tỷ lệ chuyển đổi** qua từng bước có thứ tự. Cho thấy rõ bước nào "rò rỉ" nhiều nhất.

### Khi Nào Dùng ✅

- Quy trình mua hàng: Xem sản phẩm → Giỏ → Checkout → Thanh toán
- Quy trình onboarding SaaS: Đăng ký → Verify → Tạo project → Mời team
- Pipeline bán hàng: Lead → Qualified → Demo → Proposal → Closed
- Bất kỳ quy trình nào có các bước theo thứ tự và cần đo tỷ lệ qua từng bước

### Khi Nào Không Dùng ❌

- Dữ liệu không có thứ tự bước rõ ràng
- Chỉ có 1-2 bước (không cần funnel)
- Các bước không liên quan đến nhau

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Step Column** | Cột tên bước (dimension) | `step_name`, `stage` |
| **Value Column** | Số lượng tại mỗi bước (metric) | `user_count`, `order_count` |
| **Step Order** | Cột thứ tự bước | `step_order` (số nguyên 1, 2, 3...) |
| **Orientation** | `Vertical` (dọc) hoặc `Horizontal` (ngang) | `Vertical` (mặc định) |
| **Funnel Shape** | `Classic` (phễu thon) / `Rectangular` (hình chữ nhật) | |
| **Show Conversion Rate** | Tỷ lệ % từ bước trước sang bước này | Bật (quan trọng nhất) |
| **Conversion Rate Position** | `Between Steps` / `On Bar` / `Label` | `Between Steps` |
| **Show Drop-off** | Số người rời bỏ tại mỗi bước | Bật |
| **Show Drop-off Rate** | Tỷ lệ % rời bỏ tại mỗi bước | Bật |
| **Show Total Conversion** | Tỷ lệ chuyển đổi tổng thể (bước đầu → bước cuối) | Bật |
| **Show Absolute Values** | Số lượng thực tế tại mỗi bước | Bật |
| **Color Per Step** | Mỗi bước một màu | Bật để phân biệt |
| **Color Gradient** | Màu chuyển dần theo tỷ lệ conversion | Xanh (cao) → đỏ (thấp) |
| **Bar Alignment** | `Center` / `Left` | `Center` |
| **Label Position** | Vị trí nhãn: `Inside` / `Outside` / `Right` | |

### Ví Dụ SQL

**Funnel mua hàng e-commerce:**
```sql
WITH funnel_data AS (
  SELECT
    'Bước 1: Xem sản phẩm' AS buoc, 1 AS thu_tu,
    COUNT(DISTINCT user_id) AS so_nguoi
  FROM page_views WHERE page_type = 'product'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Bước 2: Thêm vào giỏ', 2,
    COUNT(DISTINCT user_id)
  FROM cart_events WHERE event_type = 'add_to_cart'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Bước 3: Bắt đầu checkout', 3,
    COUNT(DISTINCT user_id)
  FROM checkout_events WHERE step = 'start'
    AND event_date = CURRENT_DATE
  UNION ALL
  SELECT 'Bước 4: Thanh toán thành công', 4,
    COUNT(DISTINCT user_id)
  FROM orders WHERE status = 'paid'
    AND DATE(created_at) = CURRENT_DATE
)
SELECT * FROM funnel_data ORDER BY thu_tu
```
→ Step Column = `buoc`, Value Column = `so_nguoi`, Step Order = `thu_tu`

---

## 11. Radar Chart (Biểu Đồ Mạng Nhện)

### Mô Tả

So sánh nhiều đối tượng theo nhiều tiêu chí cùng lúc trên một "mạng nhện". Diện tích của đa giác = hiệu suất tổng thể.

### Khi Nào Dùng ✅

- So sánh 3-6 đối tượng (chi nhánh, nhân viên, sản phẩm) theo 4-8 tiêu chí
- Đánh giá điểm mạnh/yếu của từng đối tượng theo nhiều chiều
- KPI scorecard đa chiều cho review định kỳ

### Khi Nào Không Dùng ❌

- Chỉ có 1-2 tiêu chí (dùng Bar Chart)
- Nhiều hơn 6-7 đối tượng → quá rối
- Nhiều hơn 8 tiêu chí → các trục quá gần nhau

### Toàn Bộ Tùy Chọn Cấu Hình

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Dimension** | Cột tên đối tượng (tạo ra nhiều đa giác) | `branch_name`, `employee_name` |
| **Metrics** | Danh sách các trục (tiêu chí) | `revenue`, `orders`, `satisfaction`, `speed` |
| **Normalize** | Chuẩn hóa mọi tiêu chí về cùng thang 0-100 | **Bật** — nếu không các tiêu chí khác đơn vị sẽ méo |
| **Fill** | Tô màu vùng bên trong đa giác | Bật |
| **Fill Opacity** | Độ trong suốt vùng tô | `0.2` |
| **Show Points** | Hiển thị điểm tại các đỉnh | Bật |
| **Show Legend** | Chú thích màu sắc | Bật |
| **Grid Lines** | Đường kẻ mạng lưới nền | `3` hoặc `5` vòng |
| **Grid Shape** | `Circular` (tròn) hoặc `Polygon` (đa giác) | `Circular` |
| **Max Value** | Giá trị tối đa mỗi trục (khi không normalize) | Tự động hoặc tùy chỉnh |

### Ví Dụ SQL

**So sánh chi nhánh theo 5 tiêu chí:**
```sql
SELECT
  branch_name AS chi_nhanh,
  ROUND(SUM(revenue) / 1000000, 1) AS doanh_thu_trieu,
  COUNT(DISTINCT order_id) AS so_don,
  ROUND(AVG(customer_rating), 1) AS diem_hai_long,
  ROUND(100 - SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)
        / COUNT(*) * 100, 1) AS ty_le_thanh_cong_pct,
  ROUND(AVG(DATEDIFF(delivered_at, order_date)), 1) AS ngay_giao_trung_binh
FROM don_hang
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY branch_name
ORDER BY doanh_thu_trieu DESC
```
→ Dimension = `chi_nhanh`, Metrics = 4 cột còn lại, **Normalize = Bật** (vì đơn vị khác nhau)

---

## 12. Text / Markdown Widget

### Mô Tả

Widget chứa văn bản tĩnh với định dạng Markdown. Dùng để thêm tiêu đề phần, ghi chú, hướng dẫn đọc dashboard, hoặc đường kẻ phân cách.

### Khi Nào Dùng ✅

- Tiêu đề phần (ví dụ: `## 📦 Phân Tích Đơn Hàng`)
- Ghi chú nguồn dữ liệu, thời điểm cập nhật, caveat
- Hướng dẫn đọc dashboard cho người xem mới
- Đường kẻ phân cách giữa các nhóm widget

### Cú Pháp Markdown Hỗ Trợ

```markdown
# Tiêu đề cấp 1
## Tiêu đề cấp 2
### Tiêu đề cấp 3

**In đậm**  *In nghiêng*  ~~Gạch ngang~~  `code inline`

- Gạch đầu dòng
1. Danh sách đánh số

> Ghi chú / trích dẫn

[Link text](https://example.com)

---

(đường kẻ ngang)
```

### Ví Dụ Thực Tế

**Tiêu đề dashboard với metadata:**
```markdown
## 📊 Báo Cáo Doanh Thu Tháng 6 / 2026

*Cập nhật: mỗi ngày lúc 7:00 sáng từ hệ thống ERP.*
*Nguồn: PostgreSQL Production — bảng `don_hang`, `khach_hang`.*

**Liên hệ:** data-team@company.com nếu phát hiện sai sót.
```

**Ghi chú phần phân tích:**
```markdown
### 📌 Lưu Ý Quan Trọng

- Doanh thu trong báo cáo này **chưa bao gồm** đơn hoàn trả (refund)
- Số liệu "Khách hàng mới" tính từ lần đặt hàng đầu tiên trong hệ thống
- Khu vực "Khác" = các tỉnh có ít hơn 5 đơn/tháng
```

---

## 13. Reference Lines (Đường Tham Chiếu)

Thêm đường ngang hoặc dọc cố định lên biểu đồ Line và Bar để so sánh với mục tiêu, trung bình, hoặc ngưỡng quan trọng.

### Cách Cấu Hình

Widget Editor → **Visualization** → **Reference Lines** → **Add Line**

### Toàn Bộ Tùy Chọn

| Tùy Chọn | Mô Tả | Ví Dụ |
|----------|--------|-------|
| **Value** | Giá trị vị trí đường | `100000000` (100 triệu) |
| **Calculate** | Tự động tính từ dữ liệu: `Average`, `Median`, `Max`, `Min` | `Average` → đường trung bình tự động |
| **Label** | Nhãn hiển thị trên đường | `Mục tiêu: 100tr`, `TB: 45tr` |
| **Label Position** | `Start` / `Center` / `End` | `End` |
| **Line Color** | Màu đường | Đỏ cho mục tiêu, xanh cho trung bình |
| **Line Style** | `Solid` / `Dashed` / `Dotted` | `Dashed` cho mục tiêu |
| **Line Thickness** | Độ dày (px) | `1` hoặc `2` |
| **Axis** | Áp dụng lên trục `Y` hoặc `X` | `Y` (phổ biến nhất) |
| **Above Color** | Tô màu vùng trên đường | Xanh nhạt (tốt hơn mục tiêu) |
| **Below Color** | Tô màu vùng dưới đường | Đỏ nhạt (dưới mục tiêu) |

### Ví Dụ Sử Dụng Thực Tế

| Loại Đường | Value | Label | Ý Nghĩa |
|-----------|-------|-------|---------|
| Mục tiêu tháng | `500000000` | `Mục tiêu: 500 triệu` | Xem doanh thu ngày nào đạt mục tiêu |
| Trung bình động | `Average` | `TB 30 ngày` | Tự động tính từ dữ liệu |
| Ngưỡng cảnh báo | `10` | `Tồn kho tối thiểu` | Cảnh báo khi dưới mức an toàn |
| Ngân sách | `budget` | `Ngân sách` | Dùng cột từ data (dynamic reference) |

---

## 14. Chọn Đúng Loại Biểu Đồ — Bảng Quyết Định Nhanh

| Câu Hỏi Phân Tích | Loại Biểu Đồ Tốt Nhất | Thay Thế |
|-------------------|----------------------|---------|
| "KPI này là bao nhiêu? Tăng hay giảm so với kỳ trước?" | **Scorecard** | — |
| "Danh mục nào có giá trị cao nhất / thấp nhất?" | **Bar Chart (Horizontal nếu tên dài)** | — |
| "Xu hướng thay đổi thế nào theo thời gian?" | **Line Chart** | Area Chart |
| "Tỷ lệ phần trăm của các thành phần trong tổng?" | **Pie / Donut** (< 7 phần) | Horizontal Bar |
| "Cần xem chi tiết từng dòng, nhiều cột thông tin?" | **Table** | — |
| "Hai biến này có tương quan với nhau không?" | **Scatter Chart** | — |
| "Bao nhiêu % người chuyển từ bước này sang bước khác?" | **Funnel Chart** | — |
| "Cấu trúc phân cấp và tỷ lệ các thành phần?" | **Treemap** | Stacked Bar |
| "Đối tượng này mạnh/yếu ở tiêu chí nào trong nhiều chiều?" | **Radar Chart** | Grouped Bar |
| "Đóng góp từng thành phần thay đổi theo thời gian?" | **Stacked Area Chart** | Stacked Bar |
| "So sánh nhiều chỉ số theo cùng danh mục?" | **Grouped Bar** | Radar Chart |
| "Phân tán và phân cụm của nhiều thực thể?" | **Scatter / Bubble Chart** | — |
| "Thêm tiêu đề phần hoặc ghi chú?" | **Text / Markdown** | — |

### Anti-Patterns Thường Gặp

| Sai | Đúng |
|-----|------|
| Pie Chart với 10+ danh mục | Horizontal Bar Chart |
| Line Chart cho dữ liệu không theo thời gian | Bar Chart |
| Stacked Bar với 8+ series | Grouped Bar hoặc Treemap |
| Scatter Chart với < 5 điểm | Table đơn giản |
| Scorecard không có so sánh kỳ trước | Thêm Comparison Value |
| Y Axis không bắt đầu từ 0 trong Bar Chart | Luôn Y Min = 0 cho Bar |
| Radar Chart không normalize | Bật Normalize |
