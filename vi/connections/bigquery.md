# Google BigQuery

Hướng dẫn kết nối Google BigQuery với Semantix thông qua Workload Identity Federation (WIF) / ADC chuẩn doanh nghiệp không cần key file tĩnh hoặc Google Apps Script proxy.

---

## Các Phương Thức Kết Nối BigQuery

Semantix hỗ trợ 2 phương thức kết nối tới Google BigQuery:

| Tiêu Chí | 1. Workload Identity Federation (WIF) / ADC | 2. Google Apps Script Proxy |
|---|---|---|
| **Mục đích** | Doanh nghiệp, Ngân hàng, On-Premises | Doanh nghiệp nhỏ, Cá nhân Google Workspace |
| **Bảo mật** | **Cấp Ngân hàng** — Không key tĩnh, token ngắn hạn | Tốt — Sử dụng tài khoản cá nhân |
| **Cơ chế xác thực**| OIDC Token / STS Impersonation | Webhook Web App |
| **Key file JSON** | **Tuyệt đối không lưu key file** | Không cần key file |
| **Hạ tầng hỗ trợ**| Kubernetes, Docker On-Premises, GCP VM | Bất kỳ môi trường nào có Internet |

---

## Phương Thức 1: Workload Identity Federation (WIF) / ADC (Khuyến Nghị Doanh Nghiệp)

Dành cho các hệ thống Semantix triển khai trên máy chủ vật lý, Kubernetes hoặc máy ảo On-Premises trong hạ tầng ngân hàng/doanh nghiệp muốn truy vấn BigQuery mà **không được phép lưu trữ Service Account Key file JSON tĩnh**.

### 1. Kiến Trúc Xác Thực Không Khóa (Keyless Architecture)

```
┌─ Máy chủ On-Premise (Ngân hàng) ──────────────────────────┐
│                                                           │
│  ┌─ Semantix Node ──┐      ┌─ Python Worker ─┐            │
│  │ BigQuery Client  │      │ google-auth     │            │
│  │ (ADC)            │      │ (ADC)           │            │
│  └────────┬─────────┘      └────────┬────────┘            │
│           └───────────┬─────────────┘                     │
│     GOOGLE_APPLICATION_CREDENTIALS=/secrets/wif.json       │
│           (Cấu hình external_account, không chứa secret)   │
│                       │                                   │
│  /secrets/oidc-token.jwt ◀── Cron refresh từ IdP nội bộ   │
│           │                                               │
└───────────┼───────────────────────────────────────────────┘
            │
    (1) Gửi OIDC Token nội bộ
            ▼
    Google Security Token Service (sts.googleapis.com)
            │
    (2) Trao đổi lấy Federated Access Token
            ▼
    IAM Credentials (iamcredentials.googleapis.com)
            │
    (3) Mạo danh (Impersonate) Service Account GCP
            ▼
    BigQuery API (bigquery.googleapis.com)
```

**Nguyên lý vận hành:**
1. IdP nội bộ của ngân hàng (Keycloak, ADFS, PingFederate...) cấp phát token OIDC JWT cho máy chủ Semantix theo chuẩn `client_credentials`.
2. Thư viện Google ADC gửi token này tới Google STS để xác thực danh tính workload.
3. STS cấp quyền mạo danh một GCP Service Account đã được cấp quyền Least Privilege trên BigQuery.
4. Toàn bộ tiến trình không tồn tại bất kỳ private key tĩnh nào trên đĩa cứng, token tự động xoay vòng mỗi 30-60 phút.

---

### 2. Thiết Lập Phía Google Cloud (GCP)

Đặt các biến môi trường cấu hình:
```bash
export PROJECT_ID="bank-analytics-prod"
export PROJECT_NUMBER="123456789012" # Lấy từ gcloud projects describe $PROJECT_ID
export POOL_ID="semantix-onprem-pool"
export PROVIDER_ID="bank-idp-provider"
export SA_EMAIL="semantix-bq@${PROJECT_ID}.iam.gserviceaccount.com"
export IDP_ISSUER="https://idp.bank.internal/realms/semantix"
```

#### Bước 2.1: Kích hoạt các API cần thiết
```bash
gcloud services enable \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  bigquery.googleapis.com \
  aiplatform.googleapis.com \
  --project=$PROJECT_ID
```

#### Bước 2.2: Tạo Workload Identity Pool & OIDC Provider
```bash
# Tạo Identity Pool
gcloud iam workload-identity-pools create $POOL_ID \
  --project=$PROJECT_ID --location=global \
  --display-name="Semantix On-Prem Pool"

# Tạo OIDC Provider kèm điều kiện ràng buộc danh tính (Attribute Condition)
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_ID \
  --project=$PROJECT_ID --location=global \
  --workload-identity-pool=$POOL_ID \
  --display-name="Bank IdP Provider" \
  --issuer-uri="$IDP_ISSUER" \
  --attribute-mapping="google.subject=assertion.sub" \
  --attribute-condition="assertion.sub=='semantix-workload'"
```

> [!IMPORTANT]
> `--attribute-condition` là hàng rào bắt buộc: Chỉ cho phép các token có `sub` khớp chính xác với workload của Semantix (`semantix-workload`), ngăn chặn các client khác của IdP lợi dụng pool này.

#### Bước 2.3: Tạo Service Account và Cấp Quyền Tối Thiểu (Least Privilege)
```bash
# Tạo Service Account runtime
gcloud iam service-accounts create semantix-bq \
  --project=$PROJECT_ID \
  --display-name="Semantix BigQuery Runtime"

# Cấp quyền tạo query job ở cấp Project (project thanh toán)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/bigquery.jobUser"

# Cấp quyền đọc dữ liệu chỉ trên Dataset chỉ định (không cấp toàn project)
bq add-iam-policy-binding \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/bigquery.dataViewer" \
  ${PROJECT_ID}:core_banking_analytics
```

#### Bước 2.4: Cho phép Federated Identity mạo danh Service Account
```bash
gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --member="principal://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/subject/semantix-workload"
```

#### Bước 2.5: Xuất file cấu hình thông tin định danh (Credential Config)
```bash
gcloud iam workload-identity-pools create-cred-config \
  projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID} \
  --service-account=$SA_EMAIL \
  --service-account-token-lifetime-seconds=3600 \
  --credential-source-file=/secrets/oidc-token.jwt \
  --credential-source-type=text \
  --output-file=wif-credential-config.json
```
*Tệp `wif-credential-config.json` chỉ chứa metadata mô tả định danh, hoàn toàn không chứa private key. Bạn có thể lưu trữ và commit tệp này vào kho cấu hình an toàn.*

---

### 3. Thiết Lập Phía Máy Chủ Ngân Hàng (On-Premises VM)

#### Bước 3.1: Script làm mới OIDC Token định kỳ
Tạo cron job hoặc systemd timer chạy mỗi 30 phút để sinh token mới từ IdP nội bộ:

```bash
#!/usr/bin/env bash
# /opt/semantix/refresh-oidc-token.sh
set -euo pipefail

# Lấy token từ IdP bằng Client Credentials Flow
RESP=$(curl -sf -X POST "https://idp.bank.internal/realms/semantix/protocol/openid-connect/token" \
  -d grant_type=client_credentials \
  -d client_id="semantix-workload" \
  -d client_secret="$(cat /secrets/idp-client-secret)" \
  -d audience="//iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}")

# Ghi file nguyên tử (atomic swap) để tránh app đọc file dở dang
echo "$RESP" | jq -r .access_token > /secrets/oidc-token.jwt.tmp
mv /secrets/oidc-token.jwt.tmp /secrets/oidc-token.jwt
chmod 640 /secrets/oidc-token.jwt
```

#### Bước 3.2: Cấu hình Docker Compose
Mount tệp cấu hình và tệp token vào container Semantix ở chế độ chỉ đọc (`ro`):

```yaml
services:
  semantix:
    image: semantix:latest
    environment:
      SEMANTIX_ALLOW_ADC_CONNECTIONS: "1"
      GOOGLE_APPLICATION_CREDENTIALS: /secrets/wif.json
    volumes:
      - /secrets/wif-credential-config.json:/secrets/wif.json:ro
      - /secrets/oidc-token.jwt:/secrets/oidc-token.jwt:ro
```

---

### 4. Kết Nối Trong Giao Diện Semantix

1. Bật biến môi trường trên server: `SEMANTIX_ALLOW_ADC_CONNECTIONS=1`.
2. Mở **Studio → DE → Connections → New Connection**.
3. Chọn loại kết nối: **BigQuery**.
4. Cấu hình các trường:
   - **Authentication Method:** Chọn `Workload Identity / ADC`.
   - **Project ID:** Nhập Project ID của GCP (ví dụ: `bank-analytics-prod`).
   - **Location:** Chọn Region của BigQuery Dataset (ví dụ: `asia-southeast1` hoặc `us-central1`).
5. Nhấn **Test Connection** để kiểm tra việc giải mã token và thực thi câu lệnh thử nghiệm.
6. Nhấn **Save**.

---

## Phương Thức 2: Google Apps Script Proxy (Cho Google Workspace)

---

## Cách Tìm Project ID

Trong Google Cloud Console → thanh trên cùng → tên project hiển thị → nhấn vào để xem **Project ID** (ví dụ: `my-company-analytics-123456`).

Hoặc chạy lệnh:
```bash
gcloud config get-value project
```

---

## Duyệt Schema Sau Khi Kết Nối

Sau khi kết nối thành công, trong trang Connection detail của Semantix bạn có thể:
- Xem danh sách **Datasets** trong project
- Mở từng Dataset để xem **Tables**
- Xem **Schema** (tên cột, kiểu dữ liệu) của từng table
- Nhấn **Sync Schema** để cập nhật khi schema BigQuery thay đổi

---

## Yêu Cầu Tường Lửa Mạng (Egress Firewall Cho Môi Trường Ngân Hàng)

Trong hạ tầng On-Premises có kiểm soát tường lửa chặt chẽ, máy chủ Semantix cần được phép mở kết nối outbound qua cổng **HTTPS (443)** tới các domain Google Cloud sau:

| Domain | Mục Đích | Bắt Buộc |
|---|---|:---:|
| `sts.googleapis.com` | Trao đổi OIDC token lấy Federated token | ✅ |
| `iamcredentials.googleapis.com` | Mạo danh (impersonate) Service Account | ✅ |
| `bigquery.googleapis.com` | Thực thi truy vấn BigQuery và lấy schema | ✅ |
| `oauth2.googleapis.com` | Khám phá endpoint và xác thực token | ✅ |
| `aiplatform.googleapis.com` | Gọi Google Vertex AI (nếu dùng chung ADC) | Tùy chọn |
| IdP nội bộ ngân hàng | Gọi endpoint `/protocol/openid-connect/token` | ✅ |

---

## Xử Lý Lỗi Thường Gặp

### Sự cố khi dùng Workload Identity Federation (WIF) / ADC

| Triệu Chứng | Nguyên Nhân Thường Gặp | Hướng Xử Lý |
|---|---|---|
| `STS invalid_target` / `invalid_request` | Claim `aud` của OIDC JWT không khớp chính xác với resource name của Provider; hoặc `PROJECT_NUMBER` bị nhầm thành Project ID chuỗi | Kiểm tra lệnh sinh token, đảm bảo `aud` là `//iam.googleapis.com/projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/<POOL_ID>/providers/<PROVIDER_ID>` |
| `STS unauthorized_client` | Điều kiện `--attribute-condition` bị sai hoặc không khớp claim `sub` trong JWT | Kiểm tra payload của token nội bộ qua `jwt.io` hoặc `jq` xem giá trị `sub` là gì |
| `iam.serviceAccounts.getAccessToken denied` | Thiếu role `roles/iam.workloadIdentityUser` cấp cho principal federated trên Service Account | Chạy lại lệnh `gcloud iam service-accounts add-iam-policy-binding` (mục 2.4) |
| Lỗi xuất hiện sau ~1 giờ hoạt động | Cron job làm mới token bị lỗi hoặc không chạy, token cũ đã hết hạn | Kiểm tra trạng thái cron/timer `/opt/semantix/refresh-oidc-token.sh` |
| `invalid_grant` ngẫu nhiên | Lệch đồng hồ thời gian (Clock Skew) giữa máy chủ On-Prem và Google | Cấu hình đồng bộ NTP trên máy chủ ngân hàng (`chronyd` / `ntpdate`) |
| Không kết nối được sau khi đổi IP | Tường lửa chặn domain Google | Kiểm tra bảng Egress Firewall ở trên |

### Sự cố khi dùng Apps Script Proxy

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `403 Forbidden` khi Test Connection | Apps Script chưa được deploy với quyền "Anyone" | Redeploy với Who has access = Anyone |
| `BigQuery API not enabled` | BigQuery API chưa bật trong GCP project | Google Cloud Console → APIs → Enable BigQuery API |
| `Access Denied` trong truy vấn | Tài khoản Google thiếu role BigQuery Data Viewer | Thêm role trong IAM |
| `Quota exceeded` | Vượt giới hạn query BigQuery miễn phí | Kiểm tra BigQuery quotas trong GCP Console |
| Timeout | Query BigQuery chạy quá 60 giây | Tối ưu SQL hoặc tăng `timeoutMs` trong script |

---

## Tối Ưu Chi Phí BigQuery

BigQuery tính phí theo lượng dữ liệu scan. Để giảm chi phí:

1. **Dùng Partitioned Tables**: Tạo bảng với partition theo ngày — query chỉ scan partition cần thiết
2. **Tăng Cache TTL**: Đặt Cache TTL cao trong Semantix (4-24 giờ) — cùng query chỉ tốn phí một lần
3. **Clustered Tables**: Cluster theo cột thường dùng trong WHERE
4. **Materialized Views**: Tạo materialized view cho các aggregate query phức tạp thường dùng

```sql
-- Ví dụ tạo partitioned table theo ngày
CREATE TABLE `project.dataset.orders`
PARTITION BY DATE(created_at) AS
SELECT * FROM `project.dataset.orders_raw`;
```

---

## Điểm Khác Biệt SQL BigQuery

Semantix hỗ trợ BigQuery Standard SQL. Một số hàm khác với PostgreSQL/MySQL:

| Tác Vụ | PostgreSQL/MySQL | BigQuery |
|--------|-----------------|---------|
| Ngày hiện tại | `CURRENT_DATE` | `CURRENT_DATE()` |
| Trừ ngày | `created_at - INTERVAL '7 days'` | `DATE_SUB(created_at, INTERVAL 7 DAY)` |
| Định dạng ngày | `TO_CHAR(date, 'YYYY-MM')` | `FORMAT_DATE('%Y-%m', date)` |
| String concat | `a \|\| b` | `CONCAT(a, b)` |
| Kiểm tra NULL | `COALESCE(a, 0)` | `IFNULL(a, 0)` |

> Khi viết Calculated Fields cho BigQuery, sử dụng cú pháp BigQuery Standard SQL.
