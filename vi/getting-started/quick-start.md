# Bắt Đầu Nhanh

Thiết lập và sử dụng Semantix trong vòng chưa đầy 10 phút.

## Bước 1 — Kết Nối Nguồn Dữ Liệu

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn loại database (PostgreSQL, MySQL, BigQuery, v.v.)
3. Nhập thông tin kết nối
4. Nhấn **Test Connection** để kiểm tra, sau đó nhấn **Save**

> Semantix mã hóa tất cả thông tin kết nối. Mật khẩu không bao giờ lưu dạng plain text.

## Bước 2 — Tạo Data Model

1. Vào **Studio → DABI → Data Models → New Model**
2. Chọn Connection và bảng (table) cần dùng
3. Đặt tên, label, và mô tả cho model
4. Cấu hình các cột (label, data type, description)
5. Định nghĩa [Metrics](../studio/metrics.md) (chỉ số KPI)
6. Khai báo [Relations](../studio/relations.md) nếu cần JOIN nhiều bảng
7. Nhấn **Save**

## Bước 3 — Tạo Semantic Context

1. Vào **Studio → DABI → Semantic Contexts → New Context**
2. Điền tên và mô tả
3. Thêm các Model liên quan
4. Chọn các Metric người dùng được phép dùng
5. Nhấn **Save**

## Bước 4 — Cấu Hình AI Provider & Assistant

1. Vào **Studio → DSAI → AI Providers → New Provider**
2. Nhập API key (OpenAI, Anthropic, Gemini...)
3. Vào **Studio → DSAI → AI Assistants → New Assistant**
4. Chọn AI Provider và Context vừa tạo
5. Nhấn **Save**

## Bước 5 — Bắt Đầu Phân Tích

1. Mở **AI Chat** từ thanh điều hướng chính
2. Chọn AI Assistant
3. Đặt câu hỏi bằng ngôn ngữ tự nhiên, ví dụ:
   - *"Tổng doanh thu tháng này theo từng sản phẩm"*
   - *"Top 10 khách hàng doanh thu cao nhất quý vừa rồi"*
4. Semantix tạo SQL, thực thi và trả kết quả kèm biểu đồ

## Bước 6 — Khám Phá Data Portal (Tùy Chọn)

1. Vào **Studio → DE → Data Templates → New Template** để tạo mẫu báo cáo
2. Người dùng cuối truy cập **Data Portal** để xuất báo cáo theo tham số

## Bước Tiếp Theo

- [Kết nối thêm các databases](../connections/README.md)
- [Thiết lập Row-Level Security](../contexts/rls.md)
- [Tạo Data Pipelines](../studio/pipelines.md)
- [Khám phá Public API](../api-reference/README.md)
