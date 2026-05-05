# Câu Hỏi Thường Gặp (FAQs) & Khắc Phục Sự Cố

Hướng dẫn này bao gồm các sự cố phổ biến bạn có thể gặp phải khi sử dụng Semantix và cách giải quyết chúng.

---

## Các Vấn Đề Về Kết Nối

### ❌ Lỗi: "Connection refused" hoặc "Timeout"
**Nguyên nhân:** Semantix không thể kết nối tới database server của bạn.
**Cách giải quyết:**
1. Kiểm tra xem database server của bạn có đang hoạt động hay không.
2. Đảm bảo tường lửa (firewall) hoặc security group trên cloud (ví dụ: AWS Security Group, GCP Firewall) cho phép các kết nối đến (inbound) từ địa chỉ IP của Semantix.
3. Xác minh số Cổng (Port) đã nhập chính xác.

### ❌ Lỗi: "Permission denied for schema public"
**Nguyên nhân:** User database cung cấp cho Semantix không có quyền `USAGE` hoặc `SELECT` trên schema/tables cần thiết.
**Cách giải quyết:**
Chạy các lệnh cấp quyền (grants) được đề cập trong hướng dẫn thiết lập [Connections](../connections/README.md) cho database cụ thể của bạn. Ví dụ với PostgreSQL:
```sql
GRANT USAGE ON SCHEMA public TO semantix_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_user;
```

---

## Các Vấn Đề Về AI & Truy Vấn

### ❌ AI sinh ra câu lệnh SQL bị sai
**Nguyên nhân:** AI không có đủ ngữ cảnh hoặc tên cột quá mơ hồ.
**Cách giải quyết:**
1. **Cải thiện Mô tả (Descriptions):** Đi tới phần Model và viết một Mô tả chi tiết cho cột hoặc Metric đang gặp vấn đề.
2. **Thêm Từ đồng nghĩa (Synonyms):** Đảm bảo từ vựng người dùng nhập vào khớp với các Từ đồng nghĩa đã định nghĩa trong Metric.
3. **Kiểm tra Context Rules:** Đảm bảo bạn không vô tình cấm (forbid) một tổ hợp cần thiết trong phần cài đặt Context.

### ❌ Lỗi: "Column not found" trong câu lệnh SQL sinh ra
**Nguyên nhân:** Schema của database đã bị thay đổi, nhưng cache của Semantix chưa được cập nhật.
**Cách giải quyết:**
Đi tới **Admin → Connections**, chọn kết nối của bạn và nhấn **Sync Schema** để cập nhật các cột và bảng mới nhất.

---

## Các Vấn Đề Về Dashboard

### ❌ Widgets bị kẹt ở trạng thái "Loading..."
**Nguyên nhân:** Truy vấn bên dưới mất quá nhiều thời gian để thực thi trên database của bạn, hoặc Redis cache không thể kết nối được.
**Cách giải quyết:**
1. Kiểm tra hiệu suất database của bạn. Tối ưu hóa truy vấn bằng cách thêm index cho các cột thường xuyên được filter.
2. Kiểm tra server logs của Semantix xem có lỗi kết nối Redis nào không.

### ❌ Các thay đổi trên một Metric không hiển thị trên Dashboard
**Nguyên nhân:** Dashboard widget đang tải dữ liệu từ cache cũ.
**Cách giải quyết:**
Nhấn nút **Refresh** trên dashboard để vô hiệu hóa cache và lấy dữ liệu mới nhất dựa trên định nghĩa Metric mới của bạn.

---

## Các Vấn Đề Về Xác Thực (SSO)

### ❌ Người dùng không thể đăng nhập qua SSO
**Nguyên nhân:** Cấu hình SAML/OIDC không chính xác hoặc chứng chỉ (certificate) đã hết hạn.
**Cách giải quyết:**
1. Kiểm tra phần cài đặt **Identity Provider (IdP)** trong Semantix Admin.
2. Đảm bảo `Entity ID` và `Assertion Consumer Service (ACS) URL` khớp chính xác giữa Semantix và IdP của bạn (ví dụ: Okta/Azure AD).
3. Nếu sử dụng SAML, hãy xác minh xem chứng chỉ X.509 có bị hết hạn hay không.
