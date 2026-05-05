# Kiến Trúc & Bảo Mật Dữ Liệu

Bảo mật dữ liệu doanh nghiệp là ưu tiên hàng đầu của chúng tôi. Semantix được thiết kế với kiến trúc **Không Lưu Trữ Dữ Liệu (Zero Data Retention)** nghiêm ngặt, đảm bảo dữ liệu kinh doanh của bạn luôn nằm dưới sự kiểm soát của bạn.

## Cách AI Đọc Dữ Liệu Của Bạn

Một trong những câu hỏi phổ biến nhất từ các đội ngũ IT là: *"Semantix có gửi dữ liệu của công ty tôi lên OpenAI/LLMs không?"*

**Câu trả lời là KHÔNG.**

Semantix sử dụng một kỹ thuật tiên tiến gọi là **Schema-Only Retrieval Augmented Generation (RAG)** (RAG chỉ dựa trên Schema):
1. **Chỉ Đọc Metadata:** Khi bạn tạo một Data Model, Semantix chỉ đọc *schema* (tên bảng, tên cột, kiểu dữ liệu) và các mô tả tùy chỉnh của bạn.
2. **Không Gửi Dữ Liệu Dòng (Row Data):** AI không bao giờ tiếp xúc với các dòng dữ liệu thực tế trong cơ sở dữ liệu của bạn. Nó sử dụng schema và các mô tả ngữ cảnh để sinh ra một câu truy vấn SQL.
3. **Thực Thi Trên DB Của Bạn:** Câu truy vấn SQL được tạo ra sẽ được thực thi trực tiếp trên database của bạn, và kết quả được trả về trực tiếp cho trình duyệt của người dùng. LLM không bao giờ nhìn thấy kết quả truy vấn.

## Mã Hóa Thông Tin Xác Thực (Credentials)

Tất cả các thông tin kết nối nhạy cảm (mật khẩu database, API keys, JSON của service account) đều được mã hóa ở trạng thái nghỉ (encrypted at rest) bằng chuẩn mã hóa **AES-256-GCM** trước khi được lưu vào database của Semantix.

- Khóa mã hóa (biến môi trường `ENCRYPTION_KEY`) được lưu trữ độc quyền trên server của bạn.
- Mật khẩu không bao giờ bị lộ trong bất kỳ phản hồi API hay giao diện frontend nào. Một khi mật khẩu đã được lưu, nó không thể lấy lại được, chỉ có thể ghi đè.

## Đăng Nhập Một Lần (SSO) & Kiểm Soát Truy Cập

Semantix tích hợp liền mạch với các nhà cung cấp định danh (identity providers) hiện tại của bạn:
- **SAML 2.0:** Microsoft Entra ID (Azure AD), Okta, JumpCloud, v.v.
- **OIDC:** Google Workspace, Auth0.
- **Kiểm Soát Truy Cập Dựa Trên Vai Trò (RBAC):** Giới hạn quyền truy cập vào các dashboard, kết nối, hoặc context cụ thể dựa trên vai trò của người dùng.

## Nhật Ký Hệ Thống (Audit Logs)

Mọi hành động được thực hiện bên trong Semantix đều được ghi lại vào một luồng nhật ký (audit trail) không thể thay đổi. Điều này bao gồm:
- Các lần đăng nhập thất bại
- Thay đổi đối với các kết nối cơ sở dữ liệu
- Các chỉnh sửa trên Data Models hoặc Metrics
- Các câu lệnh SQL đã được tạo ra và ai là người thực thi chúng

Bạn có thể xuất các nhật ký này sang hệ thống SIEM của mình để phục vụ việc giám sát tuân thủ (compliance monitoring).
