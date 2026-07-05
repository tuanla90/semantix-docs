# SHIP-ORDER — thứ tự lên sóng kênh Tuấn LA Lab

> Chốt 2026-07-03. Kênh: **Tuấn LA Lab** (~1.6k sub, ngủ ~1 năm). Nhịp: **burst rồi giảm**.
> File này = plan điều phối SHIP (cái nào lên trước/sau). KHÔNG phải script. Render chỉ khi user nói "render" ([[render-only-on-request]]).
> Nguồn đối chiếu: `PLAN-VIDEO-CAU-NOI.md` + quét filesystem `video-remotion/videos/*/`, `video-remotion/out/*/`, `video-scripts/*.PUBLISH.md`.

## 1. Bảng trạng thái THẬT (quét filesystem 2026-07-03)

Đánh dấu theo file thực tế, KHÔNG theo bảng cũ.

| Slug | Vai trò | script (content.py) | thumb.json | thumb.png | scenes.json | render mp4 | PUBLISH.md | review giọng |
|------|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| tu-cong-cu-den-tu-duy | E1 bridge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | — (bridge đã soát) |
| hanh-trinh-cong-cu | E2 bridge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | — |
| google-sheets-dung-tran | E3 bridge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | — |
| dashboard-linh-hoat-hoa-roi | E4 bridge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | — |
| metric-dimension-kpi | E5 bridge = S1-pilot | ✅ | ✅ | ✅ | ✅ | ✅ long+long-full+short | ✅ | ✅ |
| ai-viet-sql-nghe-data | E6 bridge | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | — |
| mot-nguon-su-that | series (SSOT) | ✅ | ✅ | ✅ | ✅ | ✅ long+long-music+short | ❌ **thiếu** | ✅ |
| 4-loai-thang-do-du-lieu | series S2 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 44/50 |
| phan-tram-vs-diem-phan-tram | series S3 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 43/50 |
| trung-binh-noi-doi | series S4 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 42/50 |
| leading-lagging-indicator | series S5 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 44/50 |
| tin-hieu-vs-nhieu | series S6 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 45/50 |
| data-modeling-fact-dimension | series S7 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 44/50 |
| llm-bia-sql | series S8 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ 43/50 |

**Đọc nhanh:**
- **XONG hẳn (script+thumb+scenes+render+publish):** chỉ **metric-dimension-kpi** (E5). Sẵn sàng bấm lịch ngay.
- **Gần xong (đủ mọi thứ, chỉ THIẾU PUBLISH.md):** **mot-nguon-su-that** — đã render, chỉ cần gói đăng.
- **DỞ (bridge E1-E4,E6):** có script+thumb+PUBLISH, **chưa build scenes.json, chưa render**. Nút = scenes + render.
- **THIẾU nhiều (series S2-S8, 7 tập):** mới có script+thumb.png. **Chưa review giọng, chưa scenes, chưa render, chưa PUBLISH.**
- Toàn bộ 14 slug đã có `thumb.png` render sẵn (gen-thumb xong đại trà).

> Ghi chú lệch bảng cũ: E5 và S1 KHÔNG phải 2 video khác nhau. `metric-dimension-kpi` (E5 bridge bản lề) đồng thời là tập series đầu; `mot-nguon-su-that` là 1 tập series độc lập đã lỡ render trước. Cả hai đã render — nhưng chỉ E5 có PUBLISH.

## 2. Lịch lên sóng ĐỀ XUẤT

Ưu tiên **bridge E1→E6 trước** (đường dốc tâm lý kéo sub cũ vào), rồi series. Burst tuần 1 (3 video) để kênh sống lại, sau đó 1 long-form/tuần + 1-2 short, **cùng giờ cố định**.

| Tuần | Ngày | Slug | Vai trò | Việc còn THIẾU để ship |
|------|------|------|---------|------------------------|
| 1 (burst) | T2 | tu-cong-cu-den-tu-duy (E1) | Reset/tái xuất | build scenes.json → **render** |
| 1 | T4 | hanh-trinh-cong-cu (E2) | Gắn kết sub cũ | build scenes.json → **render** |
| 1 | T6 | google-sheets-dung-tran (E3) | Lộ trần công cụ | build scenes.json → **render** |
| 2 | T4 | dashboard-linh-hoat-hoa-roi (E4) | War story dashboard | build scenes.json → **render** |
| 3 | T4 | metric-dimension-kpi (E5) | Bản lề → khái niệm #1 | **KHÔNG thiếu gì — ship được ngay** |
| 4 | T4 | ai-viet-sql-nghe-data (E6) | Lăng kính AI + hiệu triệu series | build scenes.json → **render** |
| 5 | T4 | mot-nguon-su-that (S1) | Series: SSOT | viết **PUBLISH.md** (đã render) |
| 6 | T4 | 4-loai-thang-do-du-lieu (S2) | Series | **review giọng** → scenes → render → PUBLISH |
| 7 | T4 | phan-tram-vs-diem-phan-tram (S3) | Series | review giọng → scenes → render → PUBLISH |
| 8 | T4 | trung-binh-noi-doi (S4) | Series | review giọng → scenes → render → PUBLISH |
| 9 | T4 | leading-lagging-indicator (S5) | Series | review giọng → scenes → render → PUBLISH |
| 10 | T4 | tin-hieu-vs-nhieu (S6) | Series | review giọng → scenes → render → PUBLISH |
| 11 | T4 | data-modeling-fact-dimension (S7) | Series | review giọng → scenes → render → PUBLISH |
| 12 | T4 | llm-bia-sql (S8) | Series | review giọng → scenes → render → PUBLISH |

Shorts: mỗi long-form cắt 1-2 short từ beat kinetic (đăng xen T3/CN). E5 short đã có sẵn; mot-nguon-su-that short đã render.

> Mẹo giảm tải tuần 1: nếu 3 video bridge chưa kịp render, có thể đẩy **E5 (đã sẵn)** lên sớm để có ngay 1 video "kiến thức thật" không tốn công dựng — đổi lại hơi sớm về mạch kể. Ưu tiên vẫn là giữ E1 mở màn.

## 3. Khuyến nghị: chạy RIÊNG theo nhịp kênh (KHÔNG bám timeline blog)

**Chạy riêng.** Lý do:
- Blog đã live gần hết (kho Phân Tích 52 + Kiến Thức 45) → không còn timeline blog để bám; đồng bộ chỉ tự trói tay.
- Kênh video có bài toán riêng: **hồi sinh sub ngủ** cần đường dốc tâm lý bridge E1→E6, thứ tự này do mạch kể quyết định, không do ngày đăng blog.
- Nhịp YouTube (burst rồi 1/tuần cùng giờ) là tín hiệu cho thuật toán + thói quen người xem — độc lập với lịch blog.
- Blog vẫn là **kho nguồn** (mỗi tập series rút từ 1 bài) và là **điểm đến** (card/end-screen trỏ về), nhưng ĐIỀU PHỐI theo nhịp kênh.

## 4. Đường tới hạn (critical path)

Hai nút thắt, tháo theo thứ tự:

1. **NÚT #1 — build scenes.json + RENDER cho 5 bridge (E1-E4, E6).** Đây là chặn đường của cả burst tuần 1. Mỗi bridge cần: content.py → scenes.json (data, dùng kit sẵn có) → render long+short. **Chờ user nói "render"** — nên chuẩn bị sẵn scenes.json + duyệt Studio trước, để lúc user bấm render là chạy batch một phát (`build.py e1 e2 e3 e4 e6`).
2. **NÚT #2 — review giọng 7 tập series (S2-S8).** Các tập này mới có script thô, chưa qua content-check giọng de-AI. Đây là chặn đường của giai đoạn series (tuần 6+). Tháo song song trong lúc burst chạy: đưa từng script qua **content-check** → sửa giọng → mới build scenes.

Ngoài lề nhanh: **mot-nguon-su-that thiếu PUBLISH.md** — rẻ, làm bất cứ lúc nào (đã render), không chặn ai.

Thứ tự tháo: (1) scenes+render 5 bridge → (2) PUBLISH mot-nguon-su-that → (3) review giọng loạt series → (4) scenes+render series.

## 5. Batch tiếp theo đưa vào dây chuyền NGAY (5 slug)

1. **tu-cong-cu-den-tu-duy (E1)** — mở màn burst; đã có script+PUBLISH, chỉ cần scenes+render. Ưu tiên tuyệt đối vì là video ghim "Tuấn quay lại".
2. **hanh-trinh-cong-cu (E2)** — gắn kết sub cũ mạnh nhất (Excel→Sheets→Power BI→Looker), neo war story thật 10 năm nghề. Dễ kinetic (timeline công cụ).
3. **google-sheets-dung-tran (E3)** — hook "tuyệt cho tới 4 cái trần này"; đúng đòn bắc cầu không phủ định Sheets. Dễ kinetic (4 trần = 4 card).
4. **ai-viet-sql-nghe-data (E6)** — bắt trend AI, hook "AI viết SQL giỏi hơn mình, DA còn cửa?"; lời hiệu triệu vào series. Hook mạnh nhất để kéo view mới.
5. **mot-nguon-su-that (S1)** — đã render sẵn, chỉ viết PUBLISH.md là ship được; mở màn giai đoạn series mượt. Hook "3 con số doanh thu, ai đúng?" neo war story semantic layer.

E4 (dashboard-linh-hoat-hoa-roi) xếp ngay sau batch này — war story "linh hoạt quá hoá rối" (Looker Studio self-service, war story #6 author bible) là chốt Chặng 1, nhưng để tuần 2 nên không cần vào batch NGAY.

---
Liên quan: `PLAN-VIDEO-CAU-NOI.md`, `BLOG-TO-VIDEO.md`, `STYLE.md`. Skills: content-writer (script+scenes), content-check (review giọng), content-publish (PUBLISH+lịch). Memory: video-production-plan, author-le-anh-tuan, render-only-on-request.
