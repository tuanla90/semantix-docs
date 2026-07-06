# Chia sẻ sửa blog — Decap CMS + Railway OAuth (cách 1: ít deploy)

Nội dung ở git. Người kia sửa qua **trang admin** → sửa/lưu bao nhiêu lần cũng **KHÔNG deploy**; chỉ khi bấm **"Publish"** mới merge vào `main` = **đúng 1 deploy**.

- Trang admin: **https://tuanla90.github.io/semantix-docs/admin/** (file `landing/public/admin/{index.html,config.yml}`)
- OAuth proxy: 1 app Node nhỏ trên **Railway** (`oauth-proxy/`) — có URL RIÊNG của Railway, khác domain site.
> ⚠️ **CHƯA có domain semantix.vn** (chưa mua/trỏ). Site thật = `tuanla90.github.io/semantix-docs`. Mua domain sau thì đổi Homepage/callback trong OAuth App + thêm CNAME.

## Vì sao ít deploy (deploy-throttling)
- `config.yml` bật **`editorial_workflow`**: mỗi bài đang sửa nằm ở **nhánh riêng** `cms/blog-<slug>` (Decap tự tạo). Push nhánh đó KHÔNG chạy deploy.
- `.github/workflows/deploy.yml` **chỉ chạy khi push `main`** (đã vậy sẵn).
- Editor có 3 cột **Draft → In review → Ready**. Bấm **Publish** ở bài Ready = merge nhánh vào `main` = 1 deploy. Gom nhiều bài rồi đăng 1 lượt cũng được.

---

## Setup (làm 4 bước, ~15')

### Bước 0 — test NGAY tại chỗ (chưa cần OAuth/Railway)
```
cd landing
npx decap-server        # proxy local cổng 8081
npm run dev             # astro dev 8123 (terminal khác)
```
Mở `http://localhost:8123/admin/` → `local_backend: true` cho sửa/tạo bài ghi thẳng file local (không login). Kiểm form/field trước.

### Bước 1 — GitHub OAuth App
GitHub → Settings → Developer settings → **OAuth Apps** → New:
- Application name: `Tuan LA Lab CMS`
- Homepage URL: `https://tuanla90.github.io/semantix-docs`
- **Authorization callback URL**: `https://<tên-service>.up.railway.app/callback` *(URL Railway ở bước 2 — điền tạm, xong sửa lại)*
- Tạo → lưu **Client ID** + **Client Secret**.

### Bước 2 — Deploy OAuth proxy lên Railway
Code đã có sẵn ở thư mục **`oauth-proxy/`** (repo gốc): `server.js` (Node thuần, không deps) + `package.json`.
1. Railway → **New Project → Deploy from GitHub repo** → chọn `semantix-docs`.
2. Service Settings → **Root Directory** = `oauth-proxy` (để Railway chỉ build thư mục này). Start command tự nhận `npm start`.
3. **Variables** → thêm: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (dán từ bước 1).
4. Deploy → **Settings → Networking → Generate Domain** → lấy URL (vd `https://tuanla-cms.up.railway.app`).
5. Quay lại OAuth App (bước 1), sửa **callback URL** = `<url-railway>/callback`.

Test proxy: mở `<url-railway>/` phải thấy "Decap OAuth proxy OK".

### Bước 3 — Trỏ config vào proxy
Sửa `landing/public/admin/config.yml`, bỏ comment + điền `base_url`:
```yaml
backend:
  name: github
  repo: tuanla90/semantix-docs
  branch: main
  base_url: https://tuanla-cms.up.railway.app   # <- URL Railway bước 2
```
Commit + push `main` → site build lại (1 deploy). Xong: `https://tuanla90.github.io/semantix-docs/admin/` → **Login with GitHub** chạy.

### Bước 4 — Mời người kia
GitHub repo → Settings → **Collaborators** → mời username (quyền Write). Họ vào `tuanla90.github.io/semantix-docs/admin/`, login GitHub → sửa/tạo bài (Draft, lưu thoải mái, không deploy) → kéo sang **Ready** → **Publish** → 1 deploy.

---

## Backup — GitHub web editor (0 setup)
Chưa kịp dựng thì: mời collaborator (bước 4) → họ mở `github.com/tuanla90/semantix-docs/tree/main/landing/src/content/blog` → chọn `<slug>.md` → ✏️ Edit → Commit. Mỗi commit vào main = 1 deploy (không throttle như Decap) nhưng chạy ngay, versioned.

---

## Lưu ý
- **2 collection**: **Bài Blog** (`.md`, form) + **Script Voice** (`script.json`, form — sửa lời thoại từng beat, giữ `[tag]` + xuống dòng = nhịp ngắt). **Scenes** (`scenes.json`) vẫn để editor local `localhost:8124/scenes` (JSON lồng sâu, không đưa vào Decap).
- **Nguồn lời thoại giờ là `videos/<slug>/script.json`** — `gen_audio`/`scaffold` ưu tiên đọc nó (fallback `content.py`). Sửa qua Decap (form) hoặc sửa file trực tiếp. Nếu ai sửa `content.py` local (editor 8124 / content-writer) thì chạy `python scripts/script-json.py <slug>` để cập nhật lại `script.json` trước khi render (tránh lệch nguồn).
- **Đụng độ**: git = last-commit-wins theo file; 2 người hiếm khi sửa cùng 1 bài → ổn.
- **Cover PNG** sinh tự động (không upload qua CMS) → để trống field cover khi tạo bài mới, sinh cover sau.
- Trang `/admin` (Decap, blog, share) KHÁC `localhost:8124/admin` (dashboard video, local).
- **Nặng lên (cách 2):** khi cần preview draft live + nhiều người + DB → dựng app Railway + Postgres, xuất git khi đăng.
