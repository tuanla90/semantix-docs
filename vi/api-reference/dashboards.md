# Các Endpoints Dashboards

## GET /v1/dashboards

Liệt kê tất cả các dashboards có thể truy cập bằng API key của bạn.

```
GET /api/v1/dashboards
Authorization: Bearer sk_live_your_api_key
```

### Phản Hồi (Response)

```json
{
  "data": [
    {
      "id": "dash_abc123",
      "name": "Sales Overview",
      "description": "Monthly sales performance",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-04-20T08:30:00.000Z"
    }
  ],
  "metadata": {
    "total": 1
  }
}
```

---

## GET /v1/dashboards/:id

Lấy thông tin chi tiết của một dashboard cụ thể.

```
GET /api/v1/dashboards/dash_abc123
Authorization: Bearer sk_live_your_api_key
```

### Phản Hồi (Response)

```json
{
  "data": {
    "id": "dash_abc123",
    "name": "Sales Overview",
    "description": "Monthly sales performance",
    "widgets": [
      {
        "id": "widget_1",
        "title": "Revenue by Month",
        "chartType": "line"
      }
    ],
    "createdAt": "2026-01-15T10:00:00.000Z"
  }
}
```

### Phản Hồi Lỗi (Error Responses)

| Trạng Thái (Status) | Ý Nghĩa |
|--------|---------|
| `401` | Thiếu API key hoặc API key không hợp lệ |
| `403` | API key thiếu scope `read:dashboards` |
| `404` | Không tìm thấy dashboard |
| `429` | Vượt quá giới hạn rate limit |
