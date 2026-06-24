# Nhúng Dashboard (Embedding)

Nhúng Dashboard Semantix vào ứng dụng, website, hoặc portal nội bộ của bạn qua iframe với bảo mật đầy đủ.

---

## Tổng Quan

Tính năng Embed cho phép:
- Hiển thị Dashboard trong ứng dụng SaaS (mỗi khách hàng chỉ thấy data của họ)
- Nhúng vào portal nội bộ công ty
- Chia sẻ Dashboard với đối tác không có tài khoản Semantix
- White-label analytics — người xem không thấy giao diện Semantix

---

## Quy Trình Embed

```
Backend của bạn                          Semantix
       │                                    │
       │── POST /api/v1/embed/token ────→   │
       │   (dùng API key bí mật)            │
       │←── { token, expiresAt } ────────   │
       │                                    │
       │── Trả token về Frontend ──→        │
       │                                    │
       Frontend                             │
       │── Render iframe với token ────────→│
                                            │
                              Semantix xác thực token
                              Áp dụng lockedFilters
                              Hiển thị Dashboard
```

**Nguyên tắc bảo mật**: API key chỉ dùng ở backend server, không bao giờ truyền về frontend.

---

## Bước 1: Chuẩn Bị

### Yêu Cầu

- Dashboard đã được tạo trong Semantix
- API key với scope `manage:embeds`
- Backend server (Node.js, Python, PHP, Go...)

### Lấy Dashboard ID

Mở Dashboard trong Semantix → URL trên trình duyệt có dạng:
```
https://your-domain.com/vi/dashboards/dash_abc123/view
```
Dashboard ID là: `dash_abc123`

---

## Bước 2: Tạo Embed Token Từ Backend

Gọi API từ **server-side** để tạo token:

```javascript
// Node.js / Express
app.get('/api/embed-token/:dashboardId', requireAuth, async (req, res) => {
  const { dashboardId } = req.params;
  const user = req.user;  // Người dùng đang đăng nhập trong app của bạn

  const response = await fetch(`${SEMANTIX_URL}/api/v1/embed/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dashboardId,
      expiryMinutes: 60,
      lockedFilters: {
        // Giới hạn dữ liệu theo user của bạn
        customer_id: user.customerId,
        organization_id: user.orgId,
      },
      userContext: {
        name: user.name,
        email: user.email,
      },
    }),
  });

  const { data } = await response.json();
  res.json({ token: data.token, dashboardId });
});
```

```python
# Python / Flask
@app.route('/api/embed-token/<dashboard_id>')
@require_auth
def get_embed_token(dashboard_id):
    user = g.current_user
    
    response = requests.post(
        f'{SEMANTIX_URL}/api/v1/embed/token',
        headers={
            'Authorization': f'Bearer {os.environ["SEMANTIX_API_KEY"]}',
            'Content-Type': 'application/json',
        },
        json={
            'dashboardId': dashboard_id,
            'expiryMinutes': 60,
            'lockedFilters': {
                'customer_id': user.customer_id,
            },
        }
    )
    
    data = response.json()['data']
    return jsonify({'token': data['token'], 'dashboardId': dashboard_id})
```

---

## Bước 3: Render iframe Trong Frontend

```html
<!-- HTML thuần -->
<iframe
  id="semantix-dashboard"
  src="https://your-semantix-domain.com/vi/embed/dashboard/dash_abc123?token=eyJhbG..."
  width="100%"
  height="700"
  frameborder="0"
  allowfullscreen
  style="border: none; border-radius: 8px;"
></iframe>
```

```jsx
// React
function EmbeddedDashboard({ dashboardId }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    fetch(`/api/embed-token/${dashboardId}`)
      .then(r => r.json())
      .then(({ token, dashboardId }) => {
        setSrc(`https://semantix.company.com/vi/embed/dashboard/${dashboardId}?token=${token}`);
      });
  }, [dashboardId]);

  return src ? (
    <iframe
      src={src}
      width="100%"
      height="700"
      style={{ border: 'none', borderRadius: '8px' }}
      allowFullScreen
      title="Analytics Dashboard"
    />
  ) : (
    <div>Đang tải...</div>
  );
}
```

---

## Locked Filters — Cô Lập Dữ Liệu

`lockedFilters` nhúng điều kiện lọc vào trong token — người xem không thể bypass:

```json
{
  "lockedFilters": {
    "customer_id": "12345",
    "region": "HN",
    "year": 2026
  }
}
```

Khi render, Semantix tự động thêm:
```sql
WHERE customer_id = '12345' AND region = 'HN' AND year = 2026
```

**Use case multi-tenant SaaS:**
```javascript
// Mỗi khách hàng của bạn chỉ thấy data của họ
lockedFilters: {
  tenant_id: currentTenant.id,
}
```

**Use case phân quyền theo chi nhánh:**
```javascript
lockedFilters: {
  branch_code: currentUser.branch,
  department: currentUser.department,
}
```

---

## Tùy Chọn Token

| Tham Số | Mô Tả | Mặc Định |
|---------|--------|---------|
| `expiryDays` | Token hợp lệ X ngày | 30 ngày |
| `expiryMinutes` | Token hợp lệ X phút (ưu tiên hơn expiryDays) | — |
| `lockedFilters` | Object filter cố định | — |
| `userContext` | Thông tin user để audit log | — |

**Chiến lược thời hạn:**

| Scenario | Khuyến Nghị |
|----------|------------|
| App internal (nhân viên đăng nhập) | `expiryMinutes: 480` (8 giờ làm việc) |
| Portal khách hàng | `expiryMinutes: 60`, refresh khi hết hạn |
| Share link không cần auth | `expiryDays: 30` |
| Dữ liệu cực nhạy cảm | `expiryMinutes: 15` |

---

## Refresh Token Tự Động

```javascript
class DashboardEmbed {
  constructor(dashboardId, containerId) {
    this.dashboardId = dashboardId;
    this.container = document.getElementById(containerId);
    this.refreshTimer = null;
  }

  async init() {
    await this.loadDashboard();
  }

  async loadDashboard() {
    const { token, expiresAt } = await this.fetchToken();
    this.renderIframe(token);
    this.scheduleRefresh(new Date(expiresAt));
  }

  async fetchToken() {
    const res = await fetch(`/api/embed-token/${this.dashboardId}`);
    return res.json();
  }

  renderIframe(token) {
    const url = `https://semantix.company.com/vi/embed/dashboard/${this.dashboardId}?token=${token}`;
    this.container.innerHTML = `<iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  }

  scheduleRefresh(expiresAt) {
    // Refresh 5 phút trước khi hết hạn
    const refreshIn = expiresAt - Date.now() - 5 * 60 * 1000;
    if (refreshIn > 0) {
      this.refreshTimer = setTimeout(() => this.loadDashboard(), refreshIn);
    }
  }
}

// Sử dụng
const embed = new DashboardEmbed('dash_abc123', 'dashboard-container');
embed.init();
```

---

## Appearance Options

Thêm query params vào URL embed để tùy chỉnh giao diện:

| Param | Giá Trị | Tác Dụng |
|-------|---------|---------|
| `theme` | `light` / `dark` | Giao diện sáng/tối |
| `hideHeader` | `true` | Ẩn header dashboard (tiêu đề, nút) |
| `hideFilters` | `true` | Ẩn bộ lọc (người xem không thay đổi được) |
| `lang` | `vi` / `en` | Ngôn ngữ hiển thị |

```html
<iframe
  src="https://semantix.company.com/vi/embed/dashboard/dash_abc123
       ?token=eyJhbG...
       &theme=light
       &hideHeader=true
       &lang=vi"
  ...
></iframe>
```

---

## Bảo Mật Checklist

- [ ] API key CHỈ lưu trong environment variable của backend server
- [ ] Backend endpoint tạo token được bảo vệ bởi authentication
- [ ] `lockedFilters` đặt đúng để cô lập dữ liệu theo tenant/user
- [ ] Token có thời hạn phù hợp (không để quá dài nếu dữ liệu nhạy cảm)
- [ ] API key dùng cho embed chỉ cần scope `manage:embeds` (không cần `execute:query`)
- [ ] Không log token trong application logs
