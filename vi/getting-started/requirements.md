# Yêu Cầu Hệ Thống

## Dành Cho Triển Khai Self-Hosted

| Thành Phần | Tối Thiểu | Khuyến Nghị |
|-----------|---------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 2 GB | 4 GB |
| Lưu Trữ | 10 GB | 20 GB |
| Node.js | 18+ | 20+ |
| PostgreSQL | 14+ | 15+ (dành cho database của ứng dụng) |

## Trình Duyệt Hỗ Trợ

| Trình Duyệt | Phiên Bản Tối Thiểu |
|---------|----------------|
| Chrome | 110+ |
| Firefox | 110+ |
| Safari | 16+ |
| Edge | 110+ |

## Yêu Cầu Mạng

- Truy cập outbound tới các host database của bạn
- Outbound HTTPS cho các API của AI provider (OpenAI, Anthropic, Google, v.v.)
- Port 3000 (mặc định) hoặc port do bạn cấu hình

## Các Biến Môi Trường (Environment Variables) Bắt Buộc

| Biến | Mô Tả | Bắt Buộc |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URL cho database của ứng dụng | ✅ |
| `AUTH_SECRET` | Secret ngẫu nhiên để ký session (tối thiểu 32 ký tự) | ✅ |
| `NEXTAUTH_URL` | Public URL của instance Semantix của bạn | ✅ |
| `ENCRYPTION_KEY` | Key dùng để mã hóa thông tin đăng nhập được lưu trữ | ✅ |
| `CRON_SECRET` | Secret để bảo vệ các cron endpoint | ✅ |

> ⚠️ Không bao giờ chia sẻ hoặc commit file `.env` của bạn lên version control.
