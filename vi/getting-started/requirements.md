# Yêu Cầu Hệ Thống

Trang này dành cho **Admin triển khai Semantix** trên hạ tầng tự quản lý (self-hosted). Nếu bạn dùng phiên bản cloud của Semantix, không cần đọc trang này.

---

## Yêu Cầu Server (Self-Hosted)

### Cấu Hình Tối Thiểu

| Thành Phần | Tối Thiểu | Khuyến Nghị | Ghi Chú |
|-----------|---------|-------------|---------|
| **CPU** | 2 vCPU | 4+ vCPU | Mỗi AI query tốn ~1 CPU thread |
| **RAM** | 2 GB | 8 GB | Cần nhiều hơn khi có nhiều user đồng thời |
| **Lưu trữ** | 10 GB | 50 GB | Cho database ứng dụng, logs, Knowledge Base embeddings |
| **Node.js** | v18 LTS | v20 LTS | Bắt buộc — Semantix chạy trên Next.js |
| **PostgreSQL** | v14 | v15+ | Database của ứng dụng Semantix (không phải database dữ liệu của bạn) |
| **Redis** | v6 | v7 | Dùng cho caching và queue |

### Phân Tích Theo Số Lượng User

| Số User Đồng Thời | CPU | RAM | Ghi Chú |
|-------------------|-----|-----|---------|
| 1-10 users | 2 vCPU | 4 GB | Phù hợp demo, team nhỏ |
| 10-50 users | 4 vCPU | 8 GB | Team trung bình |
| 50-200 users | 8 vCPU | 16 GB | Nên dùng load balancer |
| 200+ users | Scale horizontally | 32 GB+ | Liên hệ để tư vấn kiến trúc |

---

## Trình Duyệt Hỗ Trợ

Semantix là ứng dụng web. Người dùng cần một trong các trình duyệt sau:

| Trình Duyệt | Phiên Bản Tối Thiểu | Khuyến Nghị |
|---------|----------------|------------|
| **Google Chrome** | 110+ | ✅ Khuyến nghị sử dụng |
| **Mozilla Firefox** | 110+ | ✅ Hỗ trợ tốt |
| **Microsoft Edge** | 110+ | ✅ Hỗ trợ tốt |
| **Apple Safari** | 16+ | ⚠️ Hỗ trợ, nhưng một số tính năng có thể có sự khác biệt nhỏ |

> Không hỗ trợ Internet Explorer. Khuyến nghị dùng **Chrome** để có trải nghiệm tốt nhất.

---

## Yêu Cầu Mạng

### Từ Semantix Server Ra Ngoài (Outbound)

| Đích | Cổng | Mục Đích |
|------|------|---------|
| Database server của bạn | 5432/3306/1433/... | Đọc dữ liệu để phân tích |
| `api.openai.com` | 443 | Gọi OpenAI API (nếu dùng) |
| `api.anthropic.com` | 443 | Gọi Anthropic API (nếu dùng) |
| `generativelanguage.googleapis.com` | 443 | Gọi Google Gemini API (nếu dùng) |
| `accounts.google.com` | 443 | Đọc Google Sheets (nếu dùng) |
| Smtp server của bạn | 25/465/587 | Gửi email (mời user, alerts) |

### Từ Người Dùng Đến Semantix Server (Inbound)

| Cổng | Giao Thức | Mục Đích |
|------|-----------|---------|
| 443 (HTTPS) | TCP | Ứng dụng web |
| 80 (HTTP) | TCP | Redirect sang HTTPS |

### Firewall / VPN

Nếu database của bạn nằm sau firewall, bạn cần **whitelist IP của Semantix server** để cho phép kết nối. Xem phần cấu hình chi tiết trong [Kết Nối Dữ Liệu](../studio/connections.md).

---

## Biến Môi Trường Bắt Buộc

Khai báo trong file `.env` hoặc environment variables của server:

### Nhóm Bắt Buộc

| Biến | Ví Dụ | Mô Tả |
|------|--------|--------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/semantix` | PostgreSQL connection cho database của Semantix app |
| `AUTH_SECRET` | (chuỗi ngẫu nhiên 64 ký tự) | Secret ký JWT session. Dùng `openssl rand -hex 32` để tạo |
| `NEXTAUTH_URL` | `https://semantix.company.com` | URL công khai của Semantix instance |
| `ENCRYPTION_KEY` | (chuỗi 32 byte base64) | Key mã hóa credentials (API keys, DB passwords). Dùng `openssl rand -base64 32` |
| `CRON_SECRET` | (chuỗi ngẫu nhiên) | Bảo vệ endpoint cron job |

### Nhóm Khuyến Nghị

| Biến | Ví Dụ | Mô Tả |
|------|--------|--------|
| `REDIS_URL` | `redis://localhost:6379` | Redis cho cache (nếu không có, dùng in-memory cache) |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server cho email |
| `SMTP_PORT` | `587` | Cổng SMTP |
| `SMTP_USER` | `noreply@company.com` | Tài khoản email gửi |
| `SMTP_PASS` | `••••••••` | Mật khẩu email |
| `SMTP_FROM` | `Semantix <noreply@company.com>` | Tên hiển thị trong email |

### Nhóm Tùy Chọn

| Biến | Mặc Định | Mô Tả |
|------|---------|--------|
| `PORT` | `3000` | Cổng HTTP server lắng nghe |
| `NODE_ENV` | `production` | Môi trường (`production` / `development`) |
| `LOG_LEVEL` | `info` | Mức độ log (`debug`, `info`, `warn`, `error`) |
| `MAX_QUERY_TIMEOUT` | `60000` | Timeout tối đa cho DB query (milliseconds) |
| `MAX_ROWS_LIMIT` | `10000` | Số dòng tối đa trả về mỗi query |
| `TZ` | `Asia/Ho_Chi_Minh` | Múi giờ server — ảnh hưởng cron schedule |

---

## Cài Đặt và Khởi Động

### Cài Đặt Dependencies

```bash
npm install
```

### Thiết Lập Database

```bash
# Chạy migrations
npx prisma migrate deploy

# (Lần đầu) Seed dữ liệu ban đầu
npx prisma db seed
```

### Build và Chạy

```bash
# Build production
npm run build

# Start server
npm start
```

Semantix chạy mặc định trên `http://localhost:3000`.

### Dùng PM2 (Khuyến Nghị Cho Production)

```bash
# Cài PM2
npm install -g pm2

# Start với PM2
pm2 start npm --name "semantix" -- start

# Tự khởi động khi reboot
pm2 startup
pm2 save
```

---

## Cấu Hình HTTPS (Bắt Buộc Trên Production)

Semantix phải chạy sau **reverse proxy** (Nginx, Apache, Caddy) với HTTPS. Không expose trực tiếp cổng 3000 ra internet.

**Ví dụ cấu hình Nginx:**

```nginx
server {
    listen 80;
    server_name semantix.company.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name semantix.company.com;

    ssl_certificate /etc/letsencrypt/live/semantix.company.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/semantix.company.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout cho AI queries (có thể mất đến 60s)
        proxy_read_timeout 120;
        proxy_connect_timeout 120;
    }
}
```

---

## Checklist Trước Khi Go-Live

- [ ] HTTPS đã được cấu hình với chứng chỉ SSL hợp lệ
- [ ] `NEXTAUTH_URL` đặt đúng domain production
- [ ] `AUTH_SECRET` và `ENCRYPTION_KEY` được tạo ngẫu nhiên (không dùng ví dụ mặc định)
- [ ] File `.env` không được commit lên git
- [ ] Redis đang chạy và được cấu hình trong `REDIS_URL`
- [ ] SMTP được cấu hình để gửi email mời người dùng
- [ ] Database Semantix (PostgreSQL) đã backup tự động
- [ ] Firewall chỉ mở cổng 443 và 80 từ internet
- [ ] Đã tạo tài khoản Admin đầu tiên
- [ ] Test toàn bộ luồng từ Connection → Data Model → AI Chat

---

## Cập Nhật Phiên Bản

Khi có phiên bản mới:

```bash
# Pull code mới
git pull

# Cài dependencies mới (nếu có)
npm install

# Chạy migrations database
npx prisma migrate deploy

# Build lại
npm run build

# Restart
pm2 restart semantix
```

> **Lưu ý:** Luôn backup database trước khi cập nhật phiên bản lớn.
