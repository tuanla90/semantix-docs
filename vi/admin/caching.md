# Caching & Tối Ưu Hiệu Suất

Hệ thống cache đa tầng giúp Dashboard tải tức thì và giảm tải cho database gốc của bạn.

---

## Cơ Chế Cache Hoạt Động Như Thế Nào

Khi người dùng xem Dashboard hoặc đặt câu hỏi AI:

```
Người dùng mở Dashboard
        ↓
Semantix tạo câu SQL từ cấu hình widget
        ↓
Kiểm tra Redis cache: SQL hash có trong cache không?
     ↙ Có (Cache Hit)          ↘ Không (Cache Miss)
Trả về kết quả từ cache     Thực thi SQL trên Database
(< 100ms)                           ↓
                               Lưu kết quả vào Redis
                                    ↓
                             Trả về cho người dùng
```

**Cache Hit** — phổ biến nhất: kết quả trả về ngay lập tức từ Redis, không chạm đến database.

**Cache Key** được tạo từ: hash(SQL + connection_id + user_filters). Nếu SQL thay đổi dù một ký tự, cache bị bypass.

---

## Ba Cấp Độ Cache TTL

### 1. Cấp Độ Connection (Mặc Định)

**Điều hướng:** Studio → DE → Connections → Chọn connection → trường **Default Cache TTL**

Áp dụng cho tất cả queries chạy qua connection này. Là giá trị fallback nếu widget không override.

**Gợi ý theo loại database:**

| Loại Database | TTL Khuyến Nghị | Lý Do |
|--------------|----------------|-------|
| PostgreSQL/MySQL (OLTP) | `3600` (1 giờ) | Dữ liệu thay đổi thường xuyên nhưng không cần real-time |
| BigQuery/Snowflake | `14400` (4 giờ) | Dữ liệu warehouse thường được cập nhật theo batch |
| Google Sheets | `1800` (30 phút) | Thay đổi thường xuyên hơn warehouse |
| ClickHouse Analytics | `7200` (2 giờ) | Dữ liệu analytics ít thay đổi tức thì |

### 2. Cấp Độ Widget (Override)

**Điều hướng:** Dashboard → Edit widget → Tab Settings → **Cache TTL**

Override TTL của connection cho widget cụ thể:

| TTL | Khi Nào Dùng |
|-----|-------------|
| `0` | Real-time — mỗi lần xem đều query database |
| `300` | Dữ liệu cập nhật mỗi 5 phút (live ops, support queue) |
| `3600` | Báo cáo hàng giờ bình thường |
| `86400` | Báo cáo ngày — cache 24 giờ, clear lúc 7 giờ sáng bằng cron |

### 3. Cache TTL = 0 — Disable Cache

Đặt TTL = 0 để **luôn query trực tiếp database**, bỏ qua cache hoàn toàn. Dùng cho:
- Màn hình monitoring thời gian thực (số đơn đang xử lý, số ticket đang mở)
- Dashboard CEO muốn số liệu tức thì
- Dữ liệu thay đổi mỗi giây (IoT, trading)

> **Cảnh báo**: TTL = 0 tăng tải cho database đáng kể. Nếu nhiều người xem dashboard cùng lúc, mỗi người đều trigger một query riêng.

---

## Làm Mới Cache Thủ Công

### Làm Mới Toàn Bộ Dashboard

Nhấn nút **Refresh** (🔄) ở góc trên phải Dashboard — xóa cache tất cả widgets và query lại.

### Làm Mới Một Widget

Nhấn **⋮** trên widget → **Refresh Data** — chỉ xóa cache widget đó.

---

## Nền Tảng Redis

Semantix dùng **Redis** làm cache backend. Kiểm tra và tối ưu:

### Kiểm Tra Redis Đang Chạy

```bash
# Trên server chạy Redis
redis-cli ping
# Kết quả: PONG → Redis đang chạy

# Kiểm tra memory sử dụng
redis-cli info memory | grep used_memory_human
```

### Cấu Hình Redis Cho Production

Trong `/etc/redis/redis.conf`:

```conf
# Giới hạn memory Redis (ví dụ: 2GB)
maxmemory 2gb

# Chính sách khi hết memory: xóa key ít được dùng nhất
maxmemory-policy allkeys-lru

# Lưu snapshot để recovery sau restart
save 900 1
save 300 10
save 60 10000
```

### Ước Tính Dung Lượng Redis Cần Thiết

Mỗi widget cache entry thường chiếm 10KB - 500KB tùy số hàng dữ liệu.

| Dashboard | Widget | Ước Tính |
|-----------|--------|---------|
| 10 dashboards | 5 widgets/dashboard | ~50 entries × 100KB = ~5MB |
| 50 dashboards | 8 widgets/dashboard | ~400 entries × 100KB = ~40MB |
| 200 dashboards | 10 widgets/dashboard | ~2,000 entries × 100KB = ~200MB |

Với 200 dashboards, cần Redis 256MB - 512MB là đủ.

---

## Auto-Refresh Dashboard

Ngoài cache TTL, Dashboard còn có tính năng **Auto-Refresh** — tự động reload theo khoảng thời gian cố định:

**Điều hướng:** Dashboard → ⚙️ Settings → **Auto-Refresh Interval**

| Interval | Khi Nào Dùng |
|----------|-------------|
| Tắt (Off) | Mặc định — người dùng refresh thủ công |
| 1 phút | Dashboard ops/support cần cập nhật liên tục |
| 5 phút | KPI Dashboard cho team lead |
| 15 phút | Báo cáo ngày theo dõi thường xuyên |
| 30 phút / 1 giờ | Dashboard tổng quan ít thay đổi |

> Auto-Refresh và Cache TTL hoạt động độc lập. Nếu Auto-Refresh = 5 phút nhưng Cache TTL = 1 giờ, mỗi 5 phút widget sẽ reload nhưng dữ liệu vẫn từ cache cho đến khi cache hết hạn.

---

## Chiến Lược Cache Theo Use Case

### Dashboard Báo Cáo Ngày (Phổ Biến Nhất)

```
Connection TTL: 3600 (1 giờ)
Widget TTL: mặc định (kế thừa từ connection)
Auto-Refresh: Tắt
```

Nhân viên mở dashboard buổi sáng → data cache từ lúc ETL xong → nhanh, không tải DB.

### Dashboard Ops / Live Monitoring

```
Connection TTL: 60 (1 phút)
Widget TTL: 0 cho các widget critical (đơn đang chờ, ticket mở)
Auto-Refresh: 1 phút
```

Data gần real-time, widget critical luôn mới nhất.

### Dashboard BigQuery (Tốn Chi Phí)

```
Connection TTL: 86400 (24 giờ)
Widget TTL: 86400 cho mọi widget
Auto-Refresh: Tắt
```

Tiết kiệm tối đa phí BigQuery — data cache cả ngày, refresh thủ công khi cần.

---

## Giám Sát Hiệu Năng Cache

Trong **Admin → Monitoring → Audit Logs**, lọc theo action `query_executed`:
- Xem các query chạy lâu (> 5 giây)
- Phát hiện widget nào tốn nhiều tài nguyên nhất
- Xác định có cần tăng TTL để giảm tần suất query không
