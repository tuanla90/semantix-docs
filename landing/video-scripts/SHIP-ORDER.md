# SHIP-ORDER — thứ tự lên sóng kênh Tuấn LA Lab

> Chốt 2026-07-03. Kênh: **Tuấn LA Lab** (~1.6k sub, ngủ ~1 năm). Nhịp: **burst rồi giảm**.
> File này = plan điều phối SHIP (cái nào lên trước/sau). KHÔNG phải script. Render chỉ khi user nói "render" ([[render-only-on-request]]).
> Nguồn đối chiếu: `PLAN-VIDEO-CAU-NOI.md` + quét filesystem `video/videos/*/`, `video/out/*/`, `video-scripts/*.PUBLISH.md`.

## 0. VOICE — đã gen xong 20 video (cập nhật 2026-07-22)

Gen voice ElevenLabs `eleven_v3` (voice clone `WnVHQ…`, SPEED 1.1) cho **toàn bộ 12 video còn thiếu** (5 bridge + 7 series); 2 video cũ (metric-dimension-kpi, mot-nguon-su-that) đã có từ trước → **14/14 slate cũ có voice thật** (`public/audio/<slug>/beat-*.mp3` + `beats.json`/`timings.json`/`outro.json`).

- **Chi phí thật:** v3 ≈ **0.5 credit/ký tự**. 12 video slate cũ = **18,921 credit**.
- **Đã verify (không nghe):** số mp3 khớp số beat, caption KHÔNG lẫn audio-tag `[..]`, timing/thời lượng hợp lý. **Chưa verify tai** — cần nghe Studio (phát âm, cảm xúc tag, "Sơ-men-tích").
- **Caveat series S2–S8:** script điểm review giọng 42–45/50, CHƯA qua content-check cuối. Nếu sửa lời → re-voice lẻ: `python gen_audio.py <slug> <beat>` (chỉ gen beat đó, giữ phần đã duyệt).
- Voice xong ⇒ 14 slate cũ giờ chỉ còn **RENDER** (chờ user nói "render"; scenes.json đã có sẵn cả 14).

**BATCH 1 video MỚI (6 bài, 2026-07-22)** — sinh bằng `video-pipeline` (content.py + thumb.json + soát giọng score 44–45), rồi gen voice v3:
`vanity-metrics`, `correlation-regression`, `pareto-80-20` (3 khái niệm) + `rag-la-gi`, `text-to-sql`, `7-cau-hoi-sai-voi-ai` (3 AI/LLM).
- Chi phí: **14,309 credit** (~22.8 phút voice; các bài dài 3–5'). Tổng đã tiêu phiên này = **33,230**; còn **68,008 / 130,487**.
- Verify không-nghe OK (mp3 đủ, caption sạch tag). **Còn THIẾU để render:** `scenes.json` + thumbnail PNG (video-pipeline chưa dựng scenes). Khâu kế = build scenes.json (dùng kit) → duyệt Studio → render (chờ "render").

**BATCH 2+3 video MỚI (12 bài, 2026-07-23)** — cùng dây chuyền video-pipeline (score 43–45) + gen voice v3:
khái niệm: `base-rate-xac-suat-nguoc`, `outlier-rac-hay-mo-vang`, `dong-tien-vs-loi-nhuan`, `goodhart-guardrail-metrics`, `trinh-bay-so-cho-sep`, `funnel-analysis`; AI: `embedding-vector-search`, `data-cho-ai-an-toan`, `ai-biet-hoi-lai`, `churn-prediction`, `time-series-forecast`, `sentiment-analysis`.
- Chi phí: **32,015 credit**. Tổng phiên = **65,245**; còn **35,993 / 130,487**. Verify không-nghe OK.
- **Bài học pipeline:** video dài 3–5' → gen loạt phải chạy **background** (`run_in_background`), foreground Bash cap 10' chỉ đủ ~2 video. Gặp 1 `ConnectionResetError` (proxy chập) giữa batch → `|| break` dừng, gen lại video đó là xong.
- **Tồn kho:** 18 video mới (batch 1+2+3) đều có voice nhưng **chưa scenes.json → chưa render**. Voice là thứ có deadline credit; scenes/render làm sau 27/07 vẫn được.

**BATCH 4 video MỚI (12 bài, 2026-07-23)** — batch voice CUỐI (vét credit tháng này):
khái niệm/thực chiến: `sai-lam-khi-phan-tich-du-lieu`, `hippo-vs-thu-nghiem`, `market-basket-ban-kem`, `do-lech-chuan`, `chon-dung-bieu-do`, `rfm-nang-cao`, `cohort-analysis`, `gio-hang-bo-quen`, `mau-va-tong-the`; AI: `du-lieu-ban-giet-model`, `data-catalog-tu-dien-du-lieu`, `dual-agent-debate`.
- Chi phí: **28,406 credit**. **Tổng phiên = 93,651; còn 7,587 / 130,487** (giữ làm quỹ re-voice sửa lẻ trước reset 27/07). Verify không-nghe OK cả 12.
- **`gen_audio.py` đã thêm retry** (backoff 2/4/6s cho lỗi mạng/5xx; 4xx vẫn fail ngay) — batch nền không còn đứt vì `ConnectionResetError`.
- **`cohort-analysis` THIẾU `thumb.json`**: agent thumbnail trong workflow bị treo 27' → đã TaskStop; script (content.py) + voice OK, chỉ cần gen lại thumbnail (không tốn credit).

**TỔNG KHO VOICE = 44 video** (2 có sẵn + 42 gen phiên 2026-07-22→23: 12 slate cũ + 30 video mới). 30 video mới (batch 1–4) đều **chưa có scenes.json** → khâu kế = build scenes → render (không deadline credit).

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
