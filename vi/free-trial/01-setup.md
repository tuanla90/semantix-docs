# Bước 1 — Kết Nối Google Sheets

Semantix cần được cấp quyền đọc file Google Sheets của bạn. Toàn bộ quá trình gồm 3 thao tác nhỏ, mất khoảng 5 phút.

---

## Thao tác 1 — Chia sẻ file Google Sheets với Semantix

1. Mở file Google Sheets bạn muốn phân tích
2. Nhấn nút **Share (Chia sẻ)** ở góc trên bên phải
3. Dán địa chỉ email sau vào ô tìm kiếm:

```
semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
```

4. Chọn quyền **Viewer (Người xem)**
5. Nhấn **Send (Gửi)**

> Bước này là bắt buộc. Nếu bỏ qua, Semantix sẽ báo lỗi "Permission denied" khi kiểm tra kết nối.

---

## Thao tác 2 — Lấy ID của file Google Sheets

Nhìn vào đường dẫn (URL) trên trình duyệt, bạn sẽ thấy dạng:

```
https://docs.google.com/spreadsheets/d/[ĐÂY LÀ ID CỦA BẠN]/edit
```

**Ví dụ:**
- URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit`
- ID cần lấy: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

Sao chép đoạn ID đó lại.

---

## Thao tác 3 — Tạo kết nối trong Semantix

1. Đăng nhập vào Semantix → vào menu **Studio → DE → Connections**
2. Nhấn **+ New Connection**
3. Chọn loại kết nối: **Google Sheets**
4. Điền thông tin:
   - **Spreadsheet ID**: dán ID vừa sao chép ở Thao tác 2
   - **Sheet Name**: tên tab/sheet cụ thể bạn muốn dùng (ví dụ: `Sheet1`, `Doanh thu tháng 6`)
5. Nhấn **Test Connection** — nếu hiện thông báo xanh là thành công
6. Nhấn **Save**

---

## Tiếp theo — Tạo Model để AI hiểu dữ liệu

Sau khi có kết nối, bạn cần tạo một **Model** — hiểu nôm na là "giới thiệu bảng dữ liệu của bạn cho AI".

1. Vào **Studio → DABI → Data Models**
2. Nhấn **+ New Model**
3. Chọn Connection vừa tạo → chọn Sheet → nhấn **Import**
4. Đặt tên cho Model (ví dụ: `don_hang` hoặc `Đơn hàng`)
5. Viết mô tả ngắn để AI hiểu bảng này chứa gì (ví dụ: *"Bảng theo dõi đơn hàng bán lẻ theo ngày, gồm sản phẩm, số lượng, doanh thu và kênh bán hàng"*)
6. Nhấn **Save**

> **Mẹo:** Mô tả Model càng rõ ràng, AI trả lời càng chính xác. Dành 1 phút viết mô tả tốt sẽ tiết kiệm nhiều lần hỏi lại sau.

---

Xong rồi! Giờ bạn đã sẵn sàng để **[hỏi dữ liệu bằng tiếng Việt →](02-ask-ai.md)**
