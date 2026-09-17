# Cột Ảo & Biến Đổi Dữ Liệu (Virtual Columns)

> **Điều hướng:** Studio → DABI → Data Models → Chọn Model → Tab Columns → **New Virtual Column** (hoặc nút **+ Add Column**)

Cột ảo (Virtual Column) là tính năng cho phép kỹ sư dữ liệu và chuyên viên phân tích định nghĩa thêm các trường dữ liệu, chiều phân khúc hoặc nhãn phân loại mới trực tiếp trên Data Model mà **không làm thay đổi cấu trúc bảng vật lý trong cơ sở dữ liệu**.

---

## 1. Tại Sao Cần Cột Ảo?

Trong thực tế vận hành dữ liệu:
- Bảng vật lý lưu mã trạng thái thô dạng ký tự hoặc số: `A`, `D`, `P`, `1`, `2`. Người dùng và AI cần đọc thành nhãn có ý nghĩa: `Hoạt động`, `Đã hủy`, `Chờ xử lý`.
- Cần phân khúc khách hàng theo giá trị đơn hàng (Ví dụ: `VIP`, `Standard`, `Mass`) để lọc và vẽ biểu đồ.
- Cần chuẩn hóa dữ liệu từ nhiều nguồn khác nhau trước khi đưa vào báo cáo.

Thay vì phải yêu cầu đội ngũ Data Engineer chạy pipeline ETL tạo bảng mới, Cột ảo cho phép tạo chiều dữ liệu mới ngay lập tức thông qua giao diện trực quan hoặc biểu thức SQL biên dịch.

---

## 2. Bốn Chế Độ Tạo Cột Ảo

Khi tạo cột ảo mới, Semantix cung cấp 4 chế độ xây dựng linh hoạt:

| Chế độ | Mục đích | Cách hoạt động |
|---|---|---|
| **Case When (Phân loại theo điều kiện)** | Phân nhóm dữ liệu theo một hoặc nhiều quy tắc nghiệp vụ | Dựng danh sách nhánh `WHEN ... THEN ... ELSE ...` thông qua giao diện trực quan |
| **Nhóm theo luật (Group by rule)** | Gom nhiều giá trị con của một cột thành các nhóm lớn | Gom mã tỉnh thành thành các vùng miền: Bắc, Trung, Nam |
| **Phân thùng số (Bins)** | Chia một cột số liên tục thành các khoảng cố định | Phân loại độ tuổi: 18–25, 26–35, 36–50, trên 50 |
| **SQL Tùy chỉnh (SQL by hand)** | Viết biểu thức SQL tự do | Sử dụng các hàm xử lý chuỗi, ngày tháng, toán học của database |

---

## 3. Hướng Dẫn Cấu Hình Case When Trực Quan

Chế độ **Case When** cho phép người dùng xây dựng các logic rẽ nhánh phức tạp mà không cần viết cú pháp SQL thủ công.

### 3.1. Cấu trúc một nhánh WHEN - THEN

Mỗi nhánh phân loại là một thẻ (Card) trực quan gồm các thành phần:

1. **Thanh kéo thả (Drag Handle):** Dễ dàng thay đổi thứ tự ưu tiên của các nhánh (thực hiện từ trên xuống dưới theo thứ tự kiểm tra của SQL).
2. **Từ khóa `WHEN`:**
   - **Cột kiểm tra:** Chọn cột nguồn trong model (hỗ trợ tìm kiếm nhanh).
   - **Điều kiện phủ định:** Chọn `IS` (Thỏa mãn) hoặc `IS NOT` (Không thỏa mãn).
   - **Toán tử so sánh:** Tự động hiển thị các toán tử phù hợp với kiểu dữ liệu của cột (`bằng`, `chứa`, `lớn hơn`, `nằm trong danh sách`, `trong khoảng`...).
   - **Giá trị:** Nhập giá trị so sánh hoặc chọn từ danh sách gợi ý.
3. **Từ khóa `THEN`:**
   - **Bảng chọn màu (Color Swatch):** Chọn màu sắc đại diện cho phân nhóm này trên biểu đồ (Pie, Bar, Funnel).
   - **Nhãn hiển thị (Label):** Chuỗi ký tự hiển thị ra giao diện (Ví dụ: `Khách hàng VIP`).

### 3.2. Cấu hình nhánh mặc định `ELSE` & Chọn màu biểu đồ

Một điểm đặc biệt trong giao diện của Semantix là hỗ trợ **chọn màu riêng cho nhánh ELSE**:

- **Giá trị mặc định:** Nhập nhãn hiển thị cho những dòng dữ liệu không thỏa mãn bất kỳ nhánh `WHEN` nào phía trên (Ví dụ: `Khác`, `Chưa phân loại`). Nếu để trống, hệ thống sẽ quy về `NULL`.
- **Hộp chọn màu nhánh ELSE (`defaultColor`):**
  > [!TIP]
  > **Tối ưu hiển thị trực quan:** Trong các công cụ BI thông thường, nhánh `ELSE` thường bị gán màu ngẫu nhiên hoặc màu xám nhạt không đồng bộ. Trong Semantix, bạn có thể chỉ định mã màu chuẩn cho nhánh ELSE (ví dụ: xám `#94a3b8` hoặc màu thương hiệu) để toàn bộ biểu đồ dashboard hiển thị nhất quán, chuyên nghiệp.

```
┌────────────────────────────────────────────────────────────────────────┐
│ [::] 1  WHEN [ Doanh số ] [ IS ] [ >= ] [ 10,000,000 ]                 │
│         THEN [ 🟢 Màu ] [ Khách VIP ]                        [X Xóa]   │
├────────────────────────────────────────────────────────────────────────┤
│ [::] 2  WHEN [ Doanh số ] [ IS ] [ >= ] [ 2,000,000 ]                  │
│         THEN [ 🟡 Màu ] [ Khách Tiêu Chuẩn ]                 [X Xóa]   │
├────────────────────────────────────────────────────────────────────────┤
│   [+ Thêm điều kiện]                                                   │
├────────────────────────────────────────────────────────────────────────┤
│   ELSE  [ Khách Vãng Lai ]  [ ⚪ Màu nhánh ELSE ]                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Chuyển Đổi & Lưu Trữ Dưới Dạng SQL Biên Dịch

### 4.1. Không Tạo Biến Đổi Cũ (Zero Redundant Transformation)

Trong các hệ thống BI trước đây, các trường tính toán thường tạo ra các bảng tạm hoặc view vật lý phụ trong kho dữ liệu, gây lãng phí tài nguyên lưu trữ và chậm chạp khi đồng bộ schema.

Semantix giải quyết triệt để vấn đề này bằng cơ chế **Biên Dịch Trực Tiếp (Compile-on-the-Fly)**:
- Toàn bộ cấu hình Case When trực quan được lưu trữ dưới dạng metadata gọn nhẹ (`FlagRule[]`).
- Khi người dùng gửi câu hỏi hoặc mở dashboard, hệ thống tự động biên dịch cấu hình thành biểu thức SQL chuẩn tương thích với Dialect của kết nối:

```sql
CASE 
    WHEN orders.total_amount >= 10000000 THEN 'Khách VIP'
    WHEN orders.total_amount >= 2000000 THEN 'Khách Tiêu Chuẩn'
    ELSE 'Khách Vãng Lai'
END AS customer_tier
```

### 4.2. Tích Hợp Vào Kiến Trúc Compiler 3 Lớp

Cột ảo được đưa vào câu truy vấn thông qua Lớp 2 (Transform CTE) hoặc ánh xạ thẳng vào Lớp 1 (Base CTE):
1. **Thừa hưởng bảo mật RLS:** Dữ liệu đầu vào của cột ảo đã được lọc bảo mật dòng trước khi tính toán.
2. **Không gây lỗi fan-out:** Biểu thức cột ảo tính toán trên từng dòng riêng lẻ, bảo toàn số lượng bản ghi của bảng.
3. **AI nhận diện tự động:** AI Assistant có thể hiểu và sử dụng cột ảo như một cột vật lý thông thường trong các câu hỏi nghiệp vụ (Ví dụ: *"Thống kê doanh số theo phân loại Khách VIP"*).

---

## 5. Quy Trình Sử Dụng Cột Ảo Hiệu Quả

1. **Đặt tên chuẩn hóa:**
   - Tên kỹ thuật (`name`): `snake_case` (ví dụ: `order_status_label`, `customer_tier`).
   - Tên hiển thị (`displayName`): Rõ ràng, có dấu tiếng Việt (ví dụ: `Phân Khúc Khách Hàng`).
2. **Kiểm tra thứ tự điều kiện:**
   - Luôn sắp xếp điều kiện cụ thể/nghiêm ngặt hơn lên trên. Ví dụ: `>= 10,000,000` phải đặt trước `>= 2,000,000`.
3. **Phối màu có ý nghĩa:**
   - Sử dụng màu xanh/vàng/đỏ cho các trạng thái tích cực/cảnh báo/tiêu cực.
   - Nhánh `ELSE` nên chọn tone màu trung tính hoặc màu xám nhạt để làm nổi bật các nhóm trọng tâm.
4. **Bổ sung Synonyms & Context:**
   - Sau khi tạo cột ảo, hãy gán các từ đồng nghĩa trong tab Context để AI Assistant hiểu trọn vẹn thuật ngữ khi người dùng trò chuyện.
