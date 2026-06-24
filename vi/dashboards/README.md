# Dashboards — Toàn Bộ Tính Năng Dành Cho Người Dùng

**Điều hướng:** Dashboards (menu trên cùng)

Dashboard là không gian tổng hợp các biểu đồ, số liệu KPI và bảng dữ liệu thành một màn hình nhất quán để theo dõi hàng ngày. Thay vì hỏi AI mỗi lần cần con số, bạn lưu các phân tích quan trọng vào Dashboard và mở ra là thấy ngay — luôn hiển thị dữ liệu mới nhất.

---

## Tổng Quan Những Gì Người Dùng Có Thể Làm

| Nhóm Tính Năng | Các Thao Tác |
|----------------|------------|
| **Tạo & Quản lý** | Tạo mới, đặt tên, mô tả, sao chép, xóa dashboard |
| **Thêm nội dung** | Ghim từ AI Chat, thêm widget thủ công, import từ kết quả phân tích |
| **Chỉnh sửa widget** | Thay đổi loại biểu đồ, cấu hình trục, màu sắc, tiêu đề, SQL |
| **Bố cục** | Kéo thả di chuyển, thay đổi kích thước, sắp xếp theo nhóm |
| **Tương tác xem** | Hover xem tooltip, zoom, drill-down, xem SQL, tải dữ liệu widget |
| **Lọc dữ liệu** | Global filter áp dụng toàn dashboard, filter riêng theo widget |
| **Làm mới dữ liệu** | Refresh thủ công, auto-refresh theo chu kỳ, xóa cache |
| **Chia sẻ** | Public link, chia sẻ với user cụ thể, nhúng iframe vào app ngoài |
| **Xuất** | Export PDF, tải dữ liệu widget (CSV/Excel), Scheduled Reports qua email |
| **Cài đặt** | Auto-refresh, cache TTL, phân quyền, chuyển sang chế độ Fullscreen |

---

## 1. Tạo Dashboard Mới

### Bước 1 — Mở Trang Dashboards

Nhấn **Dashboards** trên thanh điều hướng chính (menu trên cùng). Trang liệt kê tất cả dashboard bạn đang có hoặc được chia sẻ.

### Bước 2 — Tạo Mới

Nhấn nút **New Dashboard** (góc trên phải). Hộp thoại yêu cầu:

| Trường | Bắt Buộc | Ví Dụ | Mô Tả |
|--------|----------|--------|--------|
| **Name** | Có | `KPI Kinh Doanh Tháng 6` | Tên hiển thị trong danh sách. Nên ngắn gọn, rõ mục đích. |
| **Description** | Không | `Theo dõi doanh thu, đơn hàng và khách hàng mới — cập nhật hàng ngày` | Giải thích mục đích, đối tượng dùng, tần suất cập nhật. |

Nhấn **Create** → Dashboard trống được tạo ra, hiển thị ngay trên màn hình.

### Đặt Tên Dashboard Hiệu Quả

| Mẫu Đặt Tên | Ví Dụ |
|-------------|--------|
| `[Bộ phận] + [Chủ đề] + [Chu kỳ]` | `Sales — Doanh thu Hàng ngày` |
| `[Mục đích] + [Thời gian]` | `KPI Quý 2 / 2024` |
| `[Tên người / nhóm]` | `Dashboard Ban Giám Đốc` |

---

## 2. Thêm Widget vào Dashboard

Có **3 cách** để thêm nội dung vào Dashboard:

### Cách 1 — Ghim Từ AI Chat *(Nhanh nhất)*

Đây là cách phổ biến nhất để xây dựng Dashboard nhanh:

1. Mở **AI Chat** → đặt câu hỏi bất kỳ.
2. Sau khi nhận kết quả (bảng hoặc biểu đồ), nhấn biểu tượng **📌 Ghim (Pin)** nằm ở góc phải của khung kết quả.
3. Hộp thoại hiện ra:
   - **Chọn Dashboard** đích từ danh sách (hoặc tạo Dashboard mới ngay tại đây).
   - **Đặt tiêu đề widget** (mặc định là câu hỏi bạn vừa hỏi — có thể sửa).
4. Nhấn **Pin** → widget xuất hiện ngay trên Dashboard đó.

> **Mẹo:** Ghim nhiều kết quả liên tiếp, sau đó vào Dashboard sắp xếp lại bố cục trong một lần — nhanh hơn cấu hình từng widget thủ công.

### Cách 2 — Thêm Widget Thủ Công Từ Dashboard Editor

Phù hợp khi muốn kiểm soát chính xác SQL và cấu hình:

1. Mở Dashboard → nhấn **Edit** (biểu tượng bút ✏️ hoặc nút Edit góc trên phải).
2. Dashboard chuyển sang **Edit Mode** — xuất hiện thanh công cụ và nút **Add Widget** (hoặc biểu tượng `+`).
3. Nhấn **Add Widget** → cửa sổ Widget Builder mở ra.
4. Cấu hình widget (xem mục 3 — Cấu Hình Widget bên dưới).
5. Nhấn **Save Widget** → widget xuất hiện trên Dashboard.
6. Nhấn **Save Dashboard** khi xong toàn bộ.

### Cách 3 — Thêm Text / Tiêu Đề (Divider)

Thêm phần mô tả, nhãn nhóm hoặc đường kẻ phân cách giữa các nhóm widget:

1. Trong Edit Mode, nhấn **Add Widget** → chọn loại **Text** hoặc **Divider**.
2. Nhập nội dung văn bản (hỗ trợ Markdown: **in đậm**, *in nghiêng*, tiêu đề `##`).
3. Save.

Dùng để tạo cấu trúc rõ ràng cho Dashboard có nhiều section:
```
## 📊 Tổng Quan Kinh Doanh          ← Text widget
[Scorecard 1] [Scorecard 2] [Scorecard 3]

## 📦 Phân Tích Đơn Hàng             ← Text widget
[Line Chart] [Bar Chart]

## 👥 Khách Hàng                     ← Text widget
[Table widget]
```

---

## 3. Cấu Hình Widget Chi Tiết

Mỗi widget được cấu hình qua **Widget Builder** — gồm 3 tab chính:

### Tab 1 — Query (Dữ Liệu)

Xác định dữ liệu widget sẽ hiển thị:

**Cách A — Hỏi bằng ngôn ngữ tự nhiên:**
1. Chọn **AI Assistant** (xác định nguồn dữ liệu và ngữ cảnh).
2. Gõ câu hỏi vào ô **"Hỏi AI..."**, ví dụ: `Doanh thu theo khu vực tháng này`.
3. Nhấn **Run** → AI tạo SQL và trả về dữ liệu preview.
4. Nếu ổn → chuyển sang tab Visualization để cấu hình biểu đồ.

**Cách B — Viết SQL thủ công** *(dành cho người dùng kỹ thuật)*:
1. Nhấn tab **SQL Editor**.
2. Viết SQL trực tiếp:
   ```sql
   SELECT region, SUM(revenue) as total_revenue
   FROM don_hang
   WHERE status = 'paid'
     AND MONTH(order_date) = MONTH(CURRENT_DATE)
   GROUP BY region
   ORDER BY total_revenue DESC
   ```
3. Nhấn **Run** để xem kết quả.

**Cài đặt Query nâng cao:**

| Cài Đặt | Mô Tả | Ví Dụ |
|---------|--------|--------|
| **Cache TTL** | Thời gian cache riêng cho widget này (ghi đè TTL của Connection) | `0` = real-time, `3600` = cache 1 giờ |
| **Refresh Interval** | Widget tự làm mới sau X giây (không phụ thuộc Dashboard auto-refresh) | `300` = 5 phút |

### Tab 2 — Visualization (Hiển Thị)

Kiểm soát cách dữ liệu được trực quan hóa:

**Cài đặt cơ bản (áp dụng cho hầu hết loại biểu đồ):**

| Cài Đặt | Mô Tả | Ví Dụ |
|---------|--------|--------|
| **Chart Type** | Loại biểu đồ | Bar, Line, Pie, Scorecard, Table... |
| **Title** | Tiêu đề hiển thị trên widget | `Doanh thu theo Khu vực — Tháng 6` |
| **X Axis** | Cột dùng cho trục ngang (danh mục) | `region` |
| **Y Axis** | Cột/metric cho trục dọc (giá trị) | `total_revenue` |
| **Color By** | Cột để tô màu phân biệt các nhóm dữ liệu | `channel` (phân biệt online/offline) |
| **Sort** | Sắp xếp kết quả | `Y Axis Descending` (giá trị lớn trước) |
| **Limit** | Số dòng/nhóm tối đa hiển thị | `10` (chỉ top 10 khu vực) |
| **Show Legend** | Hiển thị chú thích màu sắc | Bật/tắt |
| **Show Data Labels** | Hiển thị số liệu trực tiếp trên biểu đồ | Bật/tắt |

**Cài đặt trục (Axis Settings):**

| Cài Đặt | Mô Tả |
|---------|--------|
| **Y Axis Min/Max** | Đặt giới hạn trục dọc (ví dụ: từ 0 đến 100 cho %) |
| **Y Axis Label** | Nhãn hiển thị bên cạnh trục (ví dụ: "Triệu VNĐ") |
| **X Axis Label Rotation** | Xoay nhãn trục ngang khi tên dài (45°, 90°) |
| **Dual Y Axis** | Bật trục dọc thứ 2 (ví dụ: doanh thu + tỷ lệ tăng trưởng) |

**Cài đặt màu sắc:**

| Cài Đặt | Mô Tả |
|---------|--------|
| **Color Palette** | Chọn bộ màu: Default, Pastel, Dark, Monochrome |
| **Custom Colors** | Gán màu cố định cho từng nhóm/danh mục |
| **Conditional Colors** | Tô màu theo điều kiện (xem mục Conditional Formatting) |

### Tab 3 — Settings (Tùy Chỉnh)

| Cài Đặt | Mô Tả |
|---------|--------|
| **Description** | Mô tả nhỏ hiển thị bên dưới tiêu đề widget |
| **Show Border** | Hiển thị/ẩn đường viền widget |
| **Background Color** | Màu nền widget |
| **Header Style** | Style của thanh tiêu đề |

---

## 4. Các Loại Widget — Hướng Dẫn Chi Tiết

Xem hướng dẫn đầy đủ cho từng loại biểu đồ tại [Biểu Đồ & Cấu Hình Widget](charts.md).

**Tóm tắt nhanh:**

| Loại | Dùng Khi | Ví Dụ Thực Tế |
|------|---------|--------------|
| **Scorecard** | Hiển thị 1 số KPI đơn lẻ + so sánh kỳ trước | Doanh thu tháng này: 1.2 tỷ ▲ 15% |
| **Bar Chart** | So sánh giá trị giữa các danh mục | Doanh thu theo chi nhánh |
| **Line Chart** | Xu hướng thay đổi theo thời gian | Doanh thu theo ngày trong tháng |
| **Area Chart** | Xu hướng tích lũy hoặc nhiều series | Doanh thu tích lũy 2024 vs 2023 |
| **Pie / Donut** | Tỷ lệ phần trăm các thành phần | Thị phần theo kênh bán |
| **Table** | Danh sách chi tiết nhiều cột | Top 20 khách hàng doanh thu cao nhất |
| **Scatter** | Tương quan giữa 2 biến số | Số đơn vs Doanh thu theo sản phẩm |
| **Treemap** | Tỷ lệ phân cấp 2 cấp độ | Doanh thu Danh mục → Sản phẩm |
| **Funnel** | Tỷ lệ chuyển đổi từng bước | Xem sản phẩm → Thêm giỏ → Thanh toán |
| **Radar** | So sánh đa chiều nhiều tiêu chí | Điểm hiệu suất 5 tiêu chí các chi nhánh |
| **Text / Markdown** | Tiêu đề section, ghi chú, hướng dẫn | `## Báo cáo Tuần 25` |

---

## 5. Sắp Xếp Bố Cục Dashboard

### Kéo Thả (Drag & Drop)

Trong **Edit Mode**:

1. **Di chuyển widget**: Đặt chuột vào thanh tiêu đề widget → giữ chuột trái → kéo đến vị trí mới → thả ra.
2. Widget tự động **bám vào lưới** (grid) — không bị lệch hay chồng chéo lên nhau.
3. Các widget xung quanh tự điều chỉnh vị trí khi bạn thả widget vào.

### Thay Đổi Kích Thước (Resize)

Trong **Edit Mode**:

1. Đặt chuột vào **góc dưới-phải** của widget → con trỏ đổi thành mũi tên resize.
2. Giữ chuột và kéo để thay đổi kích thước.
3. Widget chỉ có thể resize theo bội số của ô lưới — đảm bảo bố cục gọn gàng.

**Kích thước phổ biến:**
- **Scorecard**: 1/4 chiều rộng, 1 hàng cao (4 cái xếp thành một hàng ngang)
- **Bar/Line Chart**: 1/2 hoặc 2/3 chiều rộng, 2-3 hàng cao
- **Table**: Full chiều rộng, 3-4 hàng cao
- **Pie Chart**: 1/3 chiều rộng, 2 hàng cao

### Bố Cục Khuyến Nghị

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Scorecard  │  Scorecard  │  Scorecard  │  Scorecard  │  ← Hàng 1: KPI tổng quan
│  Doanh thu  │  Số đơn     │  Khách mới  │  Tỷ lệ hủy │
└─────────────┴─────────────┴─────────────┴─────────────┘
┌───────────────────────────┬─────────────────────────────┐
│  Line Chart               │  Bar Chart                  │  ← Hàng 2: Xu hướng
│  Doanh thu theo ngày      │  Top 10 sản phẩm            │
└───────────────────────────┴─────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Table — Full Width                                     │  ← Hàng 3: Chi tiết
│  Danh sách đơn hàng cần xử lý                          │
└─────────────────────────────────────────────────────────┘
```

### Lưu Bố Cục

Nhấn **Save** (nút xanh góc trên phải) để lưu toàn bộ thay đổi bố cục và cấu hình. Nếu thoát mà chưa Save, một hộp thoại xác nhận sẽ hiện ra để tránh mất thay đổi.

---

## 6. Tương Tác Khi Xem Dashboard

Các thao tác này hoạt động ngay cả khi **không ở Edit Mode** — dành cho mọi người dùng có quyền xem.

### Hover Xem Tooltip

Di chuột lên bất kỳ điểm dữ liệu nào trên biểu đồ → **tooltip** hiện ra với:
- Giá trị chính xác của điểm đó
- Nhãn danh mục (ví dụ: tên sản phẩm, khu vực)
- Tất cả series tại cùng điểm đó (nếu biểu đồ có nhiều series)

### Zoom Biểu Đồ

Với biểu đồ Line, Area, Bar:
- **Click và kéo** trên vùng biểu đồ để zoom vào một khoảng thời gian cụ thể.
- **Double-click** để reset về tỷ lệ gốc.
- **Cuộn chuột** để zoom in/out dọc theo trục X.

### Ẩn/Hiện Series

Nếu biểu đồ có nhiều series (nhiều đường/cột khác màu):
- **Nhấn vào tên series trong Legend** → ẩn series đó khỏi biểu đồ.
- **Nhấn lại** → hiện lại.
- Hữu ích khi muốn tập trung vào một kênh cụ thể mà không cần tạo biểu đồ mới.

### Xem SQL Của Widget

Nhấn biểu tượng **⋮** (ba chấm) ở góc phải widget → chọn **View SQL**:
- Hiển thị câu SQL đang chạy để tạo ra dữ liệu widget này.
- Hữu ích để kiểm tra logic, debug khi số liệu có vẻ sai.
- Có thể copy SQL để chạy thủ công trong database tool.

### Tải Dữ Liệu Widget

Nhấn **⋮** → **Download**:

| Định Dạng | Nội Dung |
|-----------|---------|
| **CSV** | Dữ liệu thô, tất cả dòng trong query |
| **Excel (.xlsx)** | File Excel với định dạng cơ bản |
| **PNG** | Ảnh chụp biểu đồ hiện tại (kể cả zoom state) |
| **SVG** | Vector image — chất lượng cao khi phóng to |

### Refresh Dữ Liệu Widget

Nhấn **⋮** → **Refresh Data** để:
- Xóa cache riêng của widget này.
- Chạy lại query và lấy dữ liệu mới nhất từ database.
- Chỉ ảnh hưởng widget đó, không ảnh hưởng widget khác.

### Xem Chế Độ Toàn Màn Hình Widget

Nhấn **⋮** → **Expand** (hoặc biểu tượng mũi tên mở rộng):
- Widget phóng to chiếm toàn màn hình.
- Hữu ích để đọc chi tiết bảng dài hoặc biểu đồ phức tạp.
- Nhấn **Esc** hoặc **✕** để thu nhỏ lại.

---

## 7. Global Filters — Bộ Lọc Toàn Dashboard

Global Filter là bộ lọc áp dụng **đồng thời cho tất cả widget** trên Dashboard. Khi người dùng chọn một giá trị lọc, mọi biểu đồ tự động cập nhật theo — không cần sửa từng widget riêng lẻ.

### Thêm Global Filter

Trong **Edit Mode**:

1. Nhấn **Add Filter** (thanh trên cùng của Dashboard).
2. Hộp thoại cấu hình Filter mở ra:

| Trường | Bắt Buộc | Mô Tả |
|--------|----------|--------|
| **Label** | Có | Tên hiển thị của filter (ví dụ: "Tháng", "Chi nhánh") |
| **Column** | Có | Cột database dùng để lọc |
| **Type** | Có | Loại filter (xem bảng bên dưới) |
| **Default Value** | Không | Giá trị mặc định khi mở Dashboard |
| **Required** | Không | Bắt buộc chọn trước khi xem dữ liệu |

**Các Loại Filter:**

| Type | Giao Diện | Dùng Khi |
|------|---------|---------|
| **Date Range Picker** | Chọn khoảng ngày từ-đến | Lọc theo thời gian |
| **Date Picker** | Chọn một ngày cụ thể | Xem dữ liệu một ngày |
| **Relative Date** | "7 ngày qua", "Tháng này", "Quý này"... | Lọc thời gian linh hoạt |
| **Dropdown (đơn)** | Chọn 1 giá trị từ danh sách | Chi nhánh, Trạng thái đơn |
| **Dropdown (nhiều)** | Chọn nhiều giá trị | Nhiều khu vực, nhiều sản phẩm |
| **Text Input** | Nhập chuỗi tìm kiếm | Tìm theo tên, mã |
| **Number Range** | Nhập giá trị min-max | Lọc theo khoảng giá trị đơn hàng |
| **Toggle/Boolean** | Bật/tắt một điều kiện | Chỉ xem khách hàng mới |

3. Nhấn **Save Filter**.
4. Filter xuất hiện ở thanh ngang phía trên Dashboard.

### Sử Dụng Global Filter

Người dùng có thể thay đổi filter bất kỳ lúc nào (kể cả khi không ở Edit Mode):

1. Nhấn vào control filter trên thanh filter (ví dụ: dropdown "Chi nhánh").
2. Chọn giá trị mong muốn.
3. Tất cả widget tự động reload dữ liệu với điều kiện lọc mới.

**Ví dụ Dashboard với 3 Global Filters:**
```
[ Từ ngày: 01/06/2024 ] [ Đến ngày: 30/06/2024 ] [ Chi nhánh: Hà Nội ▾ ]
↓
Tất cả biểu đồ tự động lọc: tháng 6, chi nhánh Hà Nội
```

### Xóa / Reset Filter

- Nhấn **×** bên cạnh giá trị đã chọn → xóa điều kiện lọc đó.
- Nhấn **Reset All** → trả về giá trị mặc định của tất cả filter.

---

## 8. Auto-Refresh — Tự Động Làm Mới

Auto-refresh giúp Dashboard tự động cập nhật dữ liệu định kỳ mà không cần người dùng thao tác — phù hợp làm màn hình giám sát (TV dashboard, NOC screen).

### Cấu Hình Auto-Refresh

1. Nhấn **⚙️ Settings** ở góc trên phải Dashboard.
2. Tìm mục **Auto-refresh interval**.
3. Chọn chu kỳ:

| Lựa Chọn | Thích Hợp Cho |
|----------|-------------|
| **Tắt** (Off) | Dashboard phân tích lịch sử, không cần cập nhật liên tục |
| **1 phút** | Giám sát real-time (đơn hàng mới, lỗi hệ thống) |
| **5 phút** | Theo dõi KPI trong giờ làm việc |
| **10 phút** | Dashboard trên màn hình TV văn phòng |
| **30 phút** | Báo cáo nội bộ cập nhật nửa giờ |
| **1 giờ** | Dashboard phân tích kết quả ngày |

4. Nhấn **Save**.

Khi Auto-refresh bật:
- Countdown timer nhỏ hiển thị trên Dashboard (ví dụ: "Tự làm mới sau 4:32").
- Khi đếm về 0: tất cả widget đồng loạt fetch dữ liệu mới, biểu đồ cập nhật.
- Refresh xảy ra **trong nền** — không làm gián đoạn người dùng đang xem.

### Refresh Thủ Công

Nhấn nút **🔄 Refresh** (biểu tượng mũi tên vòng tròn) ở góc trên phải Dashboard:
- Xóa cache của **tất cả widget** trên Dashboard.
- Fetch dữ liệu mới từ database.
- Cập nhật tất cả biểu đồ cùng lúc.

Dùng khi bạn biết dữ liệu vừa được cập nhật (ví dụ: pipeline ETL vừa chạy xong) và muốn xem ngay kết quả mới nhất mà không cần chờ cache hết hạn.

---

## 9. Chia Sẻ Dashboard

### Chia Sẻ Với Người Dùng Trong Tổ Chức

1. Mở Dashboard → nhấn nút **Share** (biểu tượng mũi tên chia sẻ hoặc nút Share).
2. Chọn tab **People**.
3. Nhập email của người dùng Semantix.
4. Chọn cấp độ quyền:

| Quyền | Người Nhận Có Thể |
|-------|------------------|
| **Viewer** | Xem Dashboard, xem tooltip, tải dữ liệu widget, nhưng không sửa |
| **Editor** | Xem + thêm/sửa/xóa widget, thay đổi bố cục |
| **Owner** | Toàn quyền kể cả xóa Dashboard, quản lý người chia sẻ |

5. Nhấn **Invite** → người dùng nhận được notification trong app.

**Gỡ quyền:** Trong danh sách People, nhấn **×** bên cạnh tên người dùng cần gỡ → xác nhận.

### Chia Sẻ Link Public (Không Cần Đăng Nhập)

Tạo link cho phép bất kỳ ai có link đều có thể xem Dashboard mà **không cần tài khoản Semantix**:

1. Mở Dashboard → nhấn **Share**.
2. Chọn tab **Public Link**.
3. Nhấn toggle **Enable public link** → Link được tạo ra.
4. (Tùy chọn) Đặt **ngày hết hạn** cho link — sau ngày đó link tự vô hiệu.
5. Copy link và gửi cho người cần xem.

**Đặc điểm public link:**
- Người xem **chỉ xem được**, không thể sửa bất cứ thứ gì.
- Người xem **có thể dùng Global Filter** (nếu Dashboard có) để lọc dữ liệu theo nhu cầu.
- Người xem **không thấy SQL** hay cấu hình nội bộ.
- Link có thể được thu hồi bất kỳ lúc nào bằng cách tắt toggle.

> **Bảo mật:** Chỉ tạo public link cho Dashboard không chứa dữ liệu nhạy cảm (thông tin cá nhân, số liệu nội bộ chưa công bố). Với dữ liệu nhạy cảm, dùng Embed với Locked Filters thay thế.

### Nhúng Dashboard Vào App/Website (Embed)

Nhúng Dashboard vào cổng thông tin nội bộ, app khách hàng, hoặc website:

1. Trong Dashboard, nhấn **Share → Embed**.
2. Copy đoạn HTML `<iframe>` đã được tạo sẵn.
3. Dán vào trang web của bạn.

**Embed đơn giản (không kiểm soát quyền):**
```html
<iframe
  src="https://semantix.company.com/embed/dashboard/abc123?token=..."
  width="100%"
  height="700"
  frameborder="0"
  allowfullscreen>
</iframe>
```

**Embed với bảo mật (Locked Filters)** — dành cho trường hợp mỗi người dùng chỉ được thấy dữ liệu của mình:

Xem hướng dẫn đầy đủ tại [Nhúng Dashboards](embed.md).

---

## 10. Xuất Dữ Liệu & Báo Cáo

### Xuất Toàn Dashboard Thành PDF

1. Nhấn biểu tượng **⋮** (ba chấm) góc trên phải Dashboard → chọn **Export as PDF**.
2. Tùy chọn:

| Tùy Chọn | Mô Tả |
|---------|--------|
| **Paper Size** | A4, A3, Letter, Legal |
| **Orientation** | Portrait (dọc) / Landscape (ngang) — Ngang phù hợp hơn cho Dashboard rộng |
| **Include Filters** | Hiển thị các Global Filter đang chọn lên PDF |
| **Timestamp** | In ngày giờ xuất lên góc trang |

3. Nhấn **Export** → file PDF tự động tải xuống.

> **Mẹo:** Trước khi export PDF, đặt Global Filter về đúng kỳ cần báo cáo (ví dụ: Tháng 6) để PDF phản ánh đúng dữ liệu bạn muốn báo cáo.

### Xuất Dữ Liệu Từng Widget

Nhấn **⋮** trên widget → **Download**:
- **CSV**: Tất cả dữ liệu thô (không giới hạn theo limit của biểu đồ).
- **Excel**: File Excel với header và định dạng cơ bản.
- **PNG/SVG**: Ảnh biểu đồ (không có dữ liệu thô).

### Báo Cáo Tự Động Qua Email (Scheduled Reports)

Thiết lập hệ thống **tự động chụp và gửi Dashboard** qua email theo lịch cố định:

**Các trường hợp dùng:**
- Sếp muốn nhận báo cáo KPI mỗi sáng thứ Hai lúc 8:00.
- Gửi tổng kết doanh thu tháng vào ngày 1 hàng tháng cho toàn đội.
- Nhận alert dashboard cuối ngày trước khi kết thúc giờ làm.

**Cách thiết lập:**

1. Nhấn **⚙️ Settings** trên Dashboard → chọn **Scheduled Reports**.
2. Nhấn **New Schedule**.
3. Điền cấu hình:

| Trường | Bắt Buộc | Ví Dụ |
|--------|----------|--------|
| **Name** | Có | `Báo cáo KPI Thứ Hai` |
| **Recipients** | Có | `manager@company.com, team@company.com` |
| **Format** | Có | PDF, CSV, hoặc Excel |
| **Subject** | Không | `[Semantix] KPI Kinh Doanh Tuần {{week}}` |
| **Message** | Không | Nội dung email đi kèm |
| **Schedule** | Có | Chọn lịch có sẵn hoặc cron expression |

**Các lịch gửi phổ biến:**

| Lịch | Cron Expression | Thích Hợp |
|------|----------------|----------|
| Mỗi ngày 8:00 sáng | `0 8 * * *` | KPI hàng ngày cho đội vận hành |
| Thứ Hai 9:00 sáng | `0 9 * * 1` | Tổng kết tuần cho manager |
| Ngày 1 hàng tháng 7:00 | `0 7 1 * *` | Báo cáo tháng cho Ban Giám Đốc |
| Thứ Sáu 17:00 | `0 17 * * 5` | Tổng kết tuần trước cuối tuần |
| Hai lần/ngày (9h & 17h) | `0 9,17 * * *` | Dashboard real-time quan trọng |

4. Nhấn **Save** → lịch được kích hoạt.

**Quản lý Scheduled Reports:**
- Xem danh sách: **⚙️ Settings → Scheduled Reports**
- Tạm dừng: Toggle **Active** → Off
- Sửa: Nhấn vào tên schedule → chỉnh sửa → Save
- Xóa: Nhấn **Delete** bên cạnh schedule

---

## 11. Quản Lý Dashboards

### Trang Danh Sách

Nhấn **Dashboards** trên menu → trang liệt kê hiển thị:
- **Thumbnail preview** nhỏ của từng Dashboard
- Tên và mô tả
- **Owner** (người tạo)
- **Last modified** (cập nhật lần cuối)
- **Shared** (đang chia sẻ với ai)
- Nút hành động nhanh: Edit, Share, Delete

**Lọc và tìm kiếm:**
- Ô **Search** — tìm theo tên Dashboard
- Tab **My Dashboards** — chỉ hiển thị Dashboard do bạn tạo
- Tab **Shared with me** — Dashboard người khác chia sẻ với bạn
- Tab **All** — tất cả Dashboard trong tổ chức bạn có quyền xem

### Sao Chép Dashboard (Duplicate)

Nhấn **⋮** bên cạnh Dashboard → chọn **Duplicate**:
- Tạo bản sao với tên `[Tên gốc] (Copy)`.
- Bản sao có toàn bộ widget và cấu hình giống hệt bản gốc.
- Hai Dashboard hoạt động độc lập — thay đổi bản sao không ảnh hưởng bản gốc.

**Khi nào dùng Duplicate:**
- Tạo Dashboard tháng mới từ template tháng trước.
- Thử nghiệm cách bố cục mới mà không sợ làm hỏng bản gốc.
- Tạo Dashboard cho chi nhánh khác từ template chung.

### Đổi Tên Dashboard

1. Vào Dashboard → nhấn **⚙️ Settings**.
2. Đổi **Name** và **Description**.
3. Nhấn **Save**.

Hoặc nhấn **⋮** trong danh sách → **Rename**.

### Chỉnh Sửa Dashboard

1. Mở Dashboard → nhấn nút **Edit** (góc trên phải).
2. Dashboard vào **Edit Mode**:
   - Thanh công cụ xuất hiện: Add Widget, Add Filter, Settings.
   - Widget hiển thị handle để kéo thả và resize.
   - Nút **Save** và **Discard** xuất hiện.
3. Thực hiện thay đổi.
4. Nhấn **Save** để lưu hoặc **Discard** để hủy toàn bộ thay đổi.

### Xóa Widget

Trong **Edit Mode**:
- **Cách 1**: Hover qua widget → nhấn **✕** ở góc → xác nhận.
- **Cách 2**: Nhấn **⋮** trên widget → **Delete Widget** → xác nhận.

Xóa widget **không ảnh hưởng** đến dữ liệu gốc trong database — chỉ xóa biểu đồ khỏi Dashboard.

### Xóa Dashboard

1. Nhấn **⚙️ Settings** → **Delete Dashboard**.
2. Hộp thoại xác nhận hiển thị tên Dashboard cần gõ lại để xác nhận.
3. Nhấn **Delete** → Dashboard bị xóa vĩnh viễn.

> ⚠️ **Không thể hoàn tác.** Khi xóa Dashboard, tất cả widget trong đó cũng bị xóa. Dữ liệu trong database **không bị ảnh hưởng**.

---

## 12. Chế Độ Fullscreen (TV / Kiosk Mode)

Dùng Dashboard trên màn hình lớn tại văn phòng hoặc NOC:

1. Mở Dashboard.
2. Nhấn biểu tượng **⛶ Fullscreen** (hoặc phím tắt `F11`).
3. Dashboard chiếm toàn màn hình, ẩn thanh điều hướng và menu.
4. Kết hợp với Auto-refresh để tự động cập nhật dữ liệu.

Nhấn **Esc** hoặc `F11` để thoát fullscreen.

---

## 13. Phân Quyền Dashboard

Dashboard trong Semantix có hệ thống phân quyền riêng:

| Quyền | Thao Tác Được Phép |
|-------|-------------------|
| **Viewer** | Xem, hover tooltip, dùng Global Filter, tải dữ liệu widget (CSV/Excel/PNG) |
| **Editor** | Viewer + thêm/sửa/xóa widget, thay đổi bố cục, cấu hình filter |
| **Owner** | Editor + xóa Dashboard, quản lý người chia sẻ, cấu hình Scheduled Reports |
| **Admin** | Toàn quyền với mọi Dashboard trong tổ chức |

**Người dùng chỉ thấy Dashboard mà họ có quyền Viewer trở lên.** Dashboard không được chia sẻ sẽ không hiển thị trong danh sách của người khác.

---

## 14. Tips & Best Practices

### Thiết Kế Dashboard Hiệu Quả

**1. Quy tắc "5 giây":** Người xem phải hiểu Dashboard trong 5 giây đầu — đặt KPI quan trọng nhất ở hàng đầu, kích thước lớn.

**2. Phân tầng thông tin:**
```
Tầng 1 (Hàng trên): Số KPI lớn, tổng quan  → Trả lời "Tốt hay xấu?"
Tầng 2 (Hàng giữa): Xu hướng, so sánh       → Trả lời "Tại sao?"
Tầng 3 (Hàng dưới): Chi tiết, danh sách     → Trả lời "Cụ thể là gì?"
```

**3. Ít hơn là nhiều hơn:** Dashboard với 6-8 widget thường hiệu quả hơn dashboard 20 widget lộn xộn.

**4. Nhất quán màu sắc:** Dùng cùng một màu cho cùng một danh mục xuyên suốt Dashboard (ví dụ: Hà Nội luôn màu xanh, HCM luôn màu đỏ).

**5. Luôn có ngữ cảnh thời gian:** Mọi Dashboard cần hiển thị rõ dữ liệu đang xem của kỳ nào — dùng Global Date Filter hoặc ghi trong tiêu đề widget.

### Workflow Xây Dựng Dashboard Nhanh

```
Bước 1: Liệt kê 3-5 câu hỏi quan trọng nhất cần trả lời
   ↓
Bước 2: Hỏi AI Chat từng câu → thấy kết quả đúng → Ghim vào Dashboard
   ↓
Bước 3: Vào Dashboard → Edit Mode → sắp xếp lại bố cục
   ↓
Bước 4: Thêm Global Filter (ngày, chi nhánh)
   ↓
Bước 5: Đổi tên tiêu đề widget cho rõ nghĩa
   ↓
Bước 6: Save và chia sẻ
```

Toàn bộ quy trình trên thường mất **15-30 phút** cho một Dashboard cơ bản 6-8 widget.
