# Caching & Tối Ưu Hiệu Suất

Truy vấn trực tiếp vào các kho dữ liệu đám mây khổng lồ (như BigQuery hoặc Snowflake) có thể rất chậm và tốn kém. Semantix cung cấp một hệ thống bộ nhớ đệm (caching) đa tầng, mạnh mẽ để đảm bảo các dashboard tải ngay lập tức và giữ chi phí tính toán trên đám mây ở mức thấp.

## Cách Caching Hoạt Động

Khi một người dùng xem một dashboard hoặc đặt một câu hỏi qua AI Chat, Semantix sẽ kiểm tra xem câu truy vấn SQL chính xác đó đã được thực thi gần đây hay chưa.

1. **Cache Hit:** Nếu kết quả đã tồn tại trong cache và chưa hết hạn, nó sẽ được trả về ngay lập tức (thường < 100ms). Cơ sở dữ liệu gốc sẽ không bị truy vấn.
2. **Cache Miss:** Nếu kết quả không tồn tại hoặc đã hết hạn, Semantix sẽ thực thi truy vấn trên cơ sở dữ liệu, trả kết quả cho người dùng, và lưu nó vào cache cho các yêu cầu trong tương lai.

## Thời Gian Sống Của Cache (Cache TTL)

Theo mặc định, kết quả truy vấn được lưu trong cache trong vòng **1 giờ**. Bạn có thể tùy chỉnh Cache TTL (Time to Live) ở hai cấp độ:

### 1. Cache Cấp Độ Connection
Đi tới **Admin → Connections**, chỉnh sửa một kết nối, và thiết lập **Default Cache TTL**. Cấu hình này sẽ áp dụng cho tất cả các truy vấn được thực thi trên kết nối này trừ khi bị ghi đè.

### 2. Cache Cấp Độ Widget
Đối với các dashboard yêu cầu dữ liệu theo thời gian thực (real-time), bạn có thể ghi đè TTL của connection trên từng widget cụ thể.
Chỉnh sửa widget, đi tới **Settings → Advanced**, và thiết lập một TTL tùy chỉnh (ví dụ: `5 phút` hoặc `0` để tắt hoàn toàn caching).

## Làm Mới Cache Thủ Công (Manual Cache Invalidation)

Nếu bạn biết dữ liệu gốc vừa được cập nhật (ví dụ: một quy trình ETL vừa chạy xong), bạn có thể ép hệ thống làm mới cache:

- **Trên Dashboard:** Nhấn nút **Refresh** ở góc trên cùng bên phải. Thao tác này sẽ vô hiệu hóa cache của toàn bộ các widget trên dashboard và lấy dữ liệu mới nhất.
- **Trên Widget:** Nhấn vào dấu ba chấm `...` trên widget và chọn **Refresh Data**.

## Nền Tảng Lưu Trữ Cache

Semantix sử dụng **Redis** làm nền tảng lưu trữ cache. Hãy đảm bảo Redis instance của bạn được cung cấp đủ bộ nhớ (memory) để xử lý lượng dữ liệu dự kiến. Nếu Redis hết bộ nhớ, nó sẽ tự động xóa các truy vấn cũ nhất trong cache (theo chính sách LRU).
