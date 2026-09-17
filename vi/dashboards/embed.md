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

## Locked Filters — Cơ Chế Bộ Lọc Khóa (S22)

Trong môi trường ngân hàng và Multi-tenant SaaS, **Bộ Lọc Khóa (Locked Filters - S22)** là giải pháp cốt lõi để cô lập dữ liệu tuyệt đối giữa các tổ chức, chi nhánh hoặc đối tác:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KIẾN TRÚC LOCKED FILTERS (S22)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Backend ứng dụng:                                                       │
│     Định nghĩa `lockedFilters: { tenant_id: "T123", branch: "HN" }`         │
│     Máy chủ Semantix ký token JWT (claim `lf`, `uid`, `tv`)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. Máy chủ Semantix (Server-side Enforcement):                             │
│     • Giải mã & thẩm định chữ ký bí mật qua `EMBED_JWT_SECRET`              │
│     • Tự động chuyển đổi `lockedFilters` thành bộ lọc dòng RLS cưỡng chế    │
│     • Chèn trực tiếp vào Base CTE của mọi truy vấn trong Dashboard          │
│     • Miễn nhiễm hoàn toàn với các tham số thao túng từ client             │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. Giao diện nhúng (Client-side Embed UI):                                 │
│     • Bộ lọc hiển thị cố định với biểu tượng ổ khóa 🔒 (Read-only badge)   │
│     • Người xem KHÔNG THỂ gỡ bỏ, đổi giá trị hay vượt rào dữ liệu           │
│     • Bộ lọc tương tác phụ chỉ có thể thu hẹp thêm dữ liệu (AND logic)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1. Định nghĩa Bộ Lọc Khóa trong Payload Token
Bộ lọc khóa được truyền trực tiếp trong payload khi yêu cầu tạo Embed Token từ Backend server:

```json
{
  "dashboardId": "dash_abc123",
  "expiryMinutes": 60,
  "lockedFilters": {
    "customer_id": "CUST_98765",
    "branch_code": "CN_HOANKIEM",
    "status": "ACTIVE"
  }
}
```

Token sinh ra chứa claim `lf` được mã hóa và ký bảo mật.

### 2. Ép Buộc Base CTE Phía Máy Chủ (Server-side Base CTE Injection)
Khi client gửi yêu cầu tải dữ liệu cho các biểu đồ (Widgets) trong dashboard nhúng:
- Máy chủ Semantix thẩm định chữ ký JWT của token. Nếu token bị giả mạo hoặc hết hạn, yêu cầu bị từ chối ngay lập tức (`HTTP 401/403`).
- Semantix phân giải các điều kiện trong `lockedFilters` và chèn cưỡng chế vào **Base CTE** hoặc mệnh đề `WHERE` cơ sở của câu lệnh SQL trước khi gửi xuống cơ sở dữ liệu:

```sql
-- Ví dụ câu truy vấn được Semantix tự động cấu trúc lại phía máy chủ:
WITH base_view AS (
    SELECT * 
    FROM analytics.fact_customer_transactions
    -- ÉP BUỘC TỪ LOCKED FILTERS (S22) — Bất khả xâm phạm từ Client
    WHERE customer_id = 'CUST_98765' 
      AND branch_code = 'CN_HOANKIEM'
      AND status = 'ACTIVE'
)
SELECT 
    transaction_date,
    SUM(amount) AS total_amount
FROM base_view
GROUP BY transaction_date;
```

Dù người dùng có sử dụng Developer Tools hay gửi request API tùy biến, họ **không bao giờ có thể truy cập vượt ngoài phạm vi của Base CTE**.

### 3. Trải Nghiệm Giao Diện Nhúng (Client-side Embed UI)
- **Hiển thị Read-Only trực quan:** Trên thanh công cụ lọc của Dashboard, các bộ lọc khóa được hiển thị dưới dạng nhãn chỉ đọc kèm biểu tượng ổ khóa (🔒). Nút xóa bộ lọc (x) và menu chọn giá trị bị vô hiệu hóa hoàn toàn.
- **Tương tác an toàn (Additive Filters):** Người xem bên ngoài vẫn có thể sử dụng các bộ lọc tương tác bổ sung (ví dụ: lọc khoảng thời gian, nhóm sản phẩm). Các bộ lọc bổ sung này được kết hợp bằng toán tử `AND` với bộ lọc khóa, chỉ cho phép xem sâu hơn tập dữ liệu được cấp quyền, tuyệt đối không thể mở rộng phạm vi dữ liệu.

### 4. Các Tình Huống Ứng Dụng Điển Hình

**Multi-tenant SaaS Portal:**
```javascript
// Đảm bảo khách hàng công ty A không bao giờ thấy số liệu công ty B
lockedFilters: {
  tenant_id: session.currentTenantId,
}
```

**Ngân hàng & Chi nhánh Phân tán:**
```javascript
// Giám đốc chi nhánh chỉ xem dữ liệu trong phạm vi phụ trách
lockedFilters: {
  branch_code: user.branchCode,
  region: user.region,
}
```

**Phân quyền Cán bộ Tín dụng:**
```javascript
// Cán bộ quan hệ khách hàng (RM) chỉ xem danh mục khách hàng được phân công
lockedFilters: {
  assigned_officer_id: officer.id,
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
