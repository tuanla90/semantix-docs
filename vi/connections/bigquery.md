# BigQuery

Semantix kết nối với BigQuery thông qua một **Google Apps Script proxy** hoặc một **direct service account (tài khoản dịch vụ trực tiếp)**.

## Kết Nối qua Apps Script (Khuyên dùng)

Phương pháp này sử dụng một Google Apps Script làm trung gian (middleware) giữa Semantix và BigQuery, giúp tránh việc lộ khóa (keys) của service account một cách trực tiếp.

### Các Bước Thực Hiện

1. Triển khai (Deploy) script Semantix BigQuery Apps Script vào tài khoản Google của bạn
2. Sao chép **Web App URL** từ bản triển khai Apps Script
3. Trong Semantix: **Admin → Connections → New Connection → BigQuery**
4. Dán Web App URL vào trường **Webhook URL**
5. Nhấn **Test Connection → Save**

## Các Trường Bắt Buộc

| Trường | Mô Tả |
|-------|-------------|
| Webhook URL | URL từ bản triển khai Apps Script Web App |
| Project ID | Project ID trên GCP của bạn (tự động nhận diện sau khi kết nối) |

## Phân Quyền (Permissions)

Tài khoản Google đang chạy Apps Script cần:
- Role **BigQuery Data Viewer** trên các datasets mà bạn muốn truy vấn
- Role **BigQuery Job User** để chạy các truy vấn

## Duyệt Projects & Datasets

Sau khi kết nối, Semantix có thể duyệt các projects, datasets, và tables trên BigQuery trực tiếp từ **Trang chi tiết kết nối (Connection detail page)** — không cần phải cấu hình thủ công.

> 💡 Semantix lưu trữ đệm (caches) schema của bảng để tăng tốc độ tạo truy vấn của AI. Hãy refresh lại schema từ trang chi tiết kết nối khi schema BigQuery của bạn có sự thay đổi.
