# Google Sheets

Kết nối Google Sheets như một nguồn dữ liệu bằng cách sử dụng **Service Account** (Tài khoản dịch vụ).

## Điều Kiện Tiên Quyết

1. Một dự án trên Google Cloud đã được bật **Google Sheets API** và **Google Drive API**
2. Một Service Account kèm theo file key định dạng JSON

## Thiết Lập Trong Google Cloud

1. Đi tới [console.cloud.google.com](https://console.cloud.google.com)
2. Tạo một project mới (hoặc dùng project có sẵn)
3. Bật **Google Sheets API** và **Google Drive API**
4. Đi tới **IAM & Admin → Service Accounts → Create Service Account**
5. Tải xuống **file key JSON**
6. Chia sẻ file Google Sheet của bạn cho địa chỉ email của service account (ví dụ: `semantix@your-project.iam.gserviceaccount.com`) với quyền **Người xem (Viewer)**

## Kết Nối Trong Semantix

1. Đi tới **Admin → Connections → New Connection → Google Sheets**
2. Dán nội dung của file key JSON vào trường **Service Account Key**
3. Nhấn **Test Connection → Save**

## Duyệt Danh Sách Các Sheets

Sau khi kết nối, Semantix có thể:
- Liệt kê tất cả các file bảng tính (spreadsheets) mà service account có quyền truy cập
- Duyệt qua các sheet tab (trang tính) riêng lẻ
- Tự động phát hiện các tiêu đề cột (column headers) và kiểu dữ liệu (data types)

> 💡 Service account chỉ có thể truy cập những bảng tính đã được chia sẻ công khai với địa chỉ email của nó một cách rõ ràng.
