# Tài Liệu API (API Reference)

Public API của Semantix cho phép bạn truy vấn dữ liệu, quản lý dashboards và tạo embed tokens một cách tự động hóa (programmatically).

## Base URL

```
https://your-semantix-domain.com/api/v1
```

## Xác Thực (Authentication)

Tất cả các API request đều yêu cầu một **Bearer token** trong header `Authorization`:

```bash
Authorization: Bearer sk_live_your_api_key
```

### Cách Lấy API Key

1. Đi tới **Admin → API Keys → New API Key**
2. Đặt tên và chọn các scopes cần thiết
3. Sao chép key này — **nó sẽ chỉ được hiển thị một lần duy nhất**

### Các Scopes Có Sẵn

| Scope | Mô Tả |
|-------|-------------|
| `execute:query` | Chạy truy vấn NL (ngôn ngữ tự nhiên) hoặc SQL thô |
| `read:dashboards` | Liệt kê và xem chi tiết dashboards |
| `manage:embeds` | Tạo embed tokens |
| `*` | Tất cả scopes |

## Giới Hạn Request (Rate Limiting)

| Giới Hạn | Giá Trị |
|-------|-------|
| Request mỗi giờ | 1,000 cho mỗi API key |

Các header về giới hạn request được trả về trong mọi response:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1714300800
```

## Định Dạng Phản Hồi (Response Format)

Tất cả các endpoint đều trả về JSON:

```json
{
  "data": [...],
  "metadata": {
    "rowCount": 42,
    "durationMs": 312,
    "sql": "SELECT ...",
    "lastUpdated": "2026-04-28T08:00:00.000Z"
  }
}
```

Các lỗi sẽ được trả về dạng:

```json
{
  "error": "Mô tả vấn đề xảy ra"
}
```

## Endpoints

| Phương Thức (Method) | Endpoint | Scope | Mô Tả |
|--------|----------|-------|-------------|
| POST | [/v1/query](query.md) | `execute:query` | Chạy một truy vấn NL hoặc SQL |
| GET | [/v1/dashboards](dashboards.md) | `read:dashboards` | Liệt kê các dashboards |
| GET | [/v1/dashboards/:id](dashboards.md) | `read:dashboards` | Lấy thông tin một dashboard |
| POST | [/v1/embed/token](embed-token.md) | `manage:embeds` | Tạo embed token |
