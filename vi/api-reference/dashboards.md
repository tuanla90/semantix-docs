# Dashboards Endpoints

Các endpoints để liệt kê và lấy thông tin dashboards qua API.

---

## GET /v1/dashboards

Liệt kê tất cả dashboards mà API key có quyền truy cập.

### Request

```
GET /api/v1/dashboards
Authorization: Bearer sk_live_your_api_key
```

### Query Parameters (Tùy Chọn)

| Tham Số | Kiểu | Mô Tả |
|---------|------|--------|
| `page` | number | Trang (bắt đầu từ 1, mặc định: 1) |
| `limit` | number | Số kết quả mỗi trang (tối đa 100, mặc định: 20) |
| `search` | string | Tìm theo tên dashboard |

**Ví dụ với pagination:**
```
GET /api/v1/dashboards?page=2&limit=10&search=doanh+thu
```

### Response

```json
{
  "data": [
    {
      "id": "dash_abc123",
      "name": "Báo Cáo Doanh Thu",
      "description": "Dashboard doanh thu theo tháng và chi nhánh",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-06-20T08:30:00.000Z",
      "widgetCount": 8,
      "isPublic": false,
      "owner": {
        "id": "user_123",
        "email": "nguyen@company.com",
        "name": "Nguyễn Văn A"
      }
    },
    {
      "id": "dash_def456",
      "name": "KPI Tổng Quan",
      "description": null,
      "createdAt": "2026-02-10T09:00:00.000Z",
      "updatedAt": "2026-06-21T15:00:00.000Z",
      "widgetCount": 4,
      "isPublic": true,
      "owner": {
        "id": "user_456",
        "email": "tran@company.com",
        "name": "Trần Thị B"
      }
    }
  ],
  "metadata": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

## GET /v1/dashboards/:id

Lấy thông tin chi tiết của một dashboard, bao gồm danh sách widgets.

### Request

```
GET /api/v1/dashboards/dash_abc123
Authorization: Bearer sk_live_your_api_key
```

### Response

```json
{
  "data": {
    "id": "dash_abc123",
    "name": "Báo Cáo Doanh Thu",
    "description": "Dashboard doanh thu theo tháng và chi nhánh",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-06-20T08:30:00.000Z",
    "isPublic": false,
    "owner": {
      "id": "user_123",
      "email": "nguyen@company.com",
      "name": "Nguyễn Văn A"
    },
    "widgets": [
      {
        "id": "widget_1",
        "title": "Tổng Doanh Thu Tháng Này",
        "chartType": "scorecard",
        "position": { "x": 0, "y": 0, "w": 3, "h": 2 }
      },
      {
        "id": "widget_2",
        "title": "Doanh Thu Theo Tháng",
        "chartType": "line",
        "position": { "x": 3, "y": 0, "w": 9, "h": 4 }
      },
      {
        "id": "widget_3",
        "title": "Top 10 Chi Nhánh",
        "chartType": "bar",
        "position": { "x": 0, "y": 2, "w": 6, "h": 4 }
      }
    ]
  }
}
```

### Trường widget chartType

| chartType | Widget |
|-----------|--------|
| `scorecard` | Scorecard (số đơn) |
| `line` | Biểu đồ đường |
| `bar` | Biểu đồ cột |
| `area` | Biểu đồ vùng |
| `pie` | Biểu đồ tròn |
| `donut` | Biểu đồ donut |
| `table` | Bảng dữ liệu |
| `scatter` | Biểu đồ scatter/bubble |
| `treemap` | Treemap |
| `funnel` | Biểu đồ phễu |
| `radar` | Biểu đồ radar |
| `text` | Widget văn bản/markdown |

---

## Lỗi Responses

| HTTP Status | Tình Huống |
|-------------|----------|
| `401` | Thiếu hoặc sai API key |
| `403` | API key thiếu scope `read:dashboards` |
| `404` | Dashboard không tồn tại hoặc bị xóa |
| `429` | Vượt rate limit |

**Ví dụ error response:**
```json
{
  "error": "Dashboard not found: dash_abc123"
}
```

---

## Ví Dụ Code

### JavaScript — Lấy Tất Cả Dashboards

```javascript
async function listDashboards() {
  let allDashboards = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `https://your-domain.com/api/v1/dashboards?page=${page}&limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
        }
      }
    );
    const { data, metadata } = await res.json();
    allDashboards = allDashboards.concat(data);
    totalPages = metadata.totalPages;
    page++;
  }

  return allDashboards;
}
```

### Python — Lấy Dashboard Cụ Thể

```python
import requests
import os

def get_dashboard(dashboard_id: str) -> dict:
    response = requests.get(
        f'https://your-domain.com/api/v1/dashboards/{dashboard_id}',
        headers={
            'Authorization': f'Bearer {os.environ["SEMANTIX_API_KEY"]}',
        }
    )
    response.raise_for_status()
    return response.json()['data']

dashboard = get_dashboard('dash_abc123')
print(f"Dashboard: {dashboard['name']}")
print(f"Widgets: {len(dashboard['widgets'])}")
for widget in dashboard['widgets']:
    print(f"  - {widget['title']} ({widget['chartType']})")
```

---

## Use Cases

**Xây dựng catalog dashboards:**
```javascript
// Lấy tất cả dashboards và hiển thị trong app của bạn
const dashboards = await listDashboards();
// Cho phép user chọn dashboard để embed
```

**Tự động tạo embed token cho mỗi dashboard:**
```javascript
for (const dashboard of dashboards) {
  const token = await createEmbedToken(dashboard.id, { customer_id: userId });
  saveTokenForDashboard(dashboard.id, token);
}
```
