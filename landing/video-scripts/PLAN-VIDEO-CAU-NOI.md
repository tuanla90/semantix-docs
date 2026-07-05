# Kế hoạch video CẦU NỐI — hâm nóng kênh trước series kiến thức

> Chốt 2026-06-29. Kênh: **Tuấn LA Lab** (rebrand từ @mastergoogletools, ~1.6k sub, ngủ ~1 năm).
> Nhịp đã chốt: **burst rồi giảm**. Slate: **6 video**. Sau giai đoạn này → series "mỗi tuần một khái niệm".
> Giọng & quy ước: `STYLE.md`, `BLOG-TO-VIDEO.md`. Bản sắc/đối tượng: sub cũ = back-office SME Việt (kế toán, kho, HC, marketing) quen Google Sheets/Looker.

## ⚡ Trạng thái sản xuất (cập nhật 2026-07-03)

**Cả 6 video cầu nối + 1 tập series pilot ĐÃ có script (`content.py`) + thumbnail. Nút thắt duy nhất còn lại: RENDER** (chỉ làm khi user nói "render" — [[render-only-on-request]]).

| # | Slug | Script | Thumb | PUBLISH | Render mp4 |
|---|------|--------|-------|---------|-----------|
| E1 | tu-cong-cu-den-tu-duy | ✅ 14 beat | ✅ | ✅ | ❌ chưa |
| E2 | hanh-trinh-cong-cu | ✅ 16 | ✅ | ✅ | ❌ |
| E3 | google-sheets-dung-tran | ✅ 14 | ✅ | ✅ | ❌ |
| E4 | dashboard-linh-hoat-hoa-roi | ✅ 14 | ✅ | ✅ | ❌ |
| E5 | metric-dimension-kpi | ✅ 14 | ✅ | ✅ | ✅ long+short |
| E6 | ai-viet-sql-nghe-data | ✅ 14 | ✅ | ✅ | ❌ |
| S1 | mot-nguon-su-that (series) | ✅ 7 | ✅ | ❌ thiếu | ✅ |

**Việc còn lại:** (1) render E1-E4,E6 (chờ "render"); (2) viết `mot-nguon-su-that.PUBLISH.md`; (3) khởi động dây chuyền SERIES bên dưới.

## 🎬 Slate SERIES "mỗi tuần một khái niệm" (đề xuất 8 tập đầu)

Mỗi tập = script (`content.py`) + thumbnail (`thumb.json` → `gen-thumb`). Hook mạnh · dễ kinetic · neo war story thật.

| Tập | Slug blog nguồn | Hook thumbnail | Layout thumb | War story neo |
|-----|-----------------|----------------|--------------|---------------|
| S1 | mot-nguon-su-that | "3 con số doanh thu, ai đúng?" | highlight | semantic layer @ngân hàng (ĐÃ render) |
| S2 | 4-loai-thang-do-du-lieu | "Đừng tính trung bình mã sản phẩm" | cards/bignum | chấm câu hỏi theo ma trận đề |
| S3 | phan-tram-vs-diem-phan-tram | "18%→22% KHÔNG phải tăng 10%" | question | báo cáo sai vì lẫn % |
| S4 | trung-binh-noi-doi | "Trung bình là kẻ nói dối" | question | trọng số khác nhau |
| S5 | leading-lagging-indicator | "Lái xe bằng gương chiếu hậu" | vs/split | — |
| S6 | tin-hieu-vs-nhieu | "Đừng phản ứng với mọi dao động" | chart | vật lý: tín hiệu/nhiễu |
| S7 | data-modeling-fact-dimension | "Cách sắp bảng quyết định câu bạn hỏi được" | mockup | tự xây DB job ngoài |
| S8 | llm-bia-sql | "AI viết SQL mà bịa cả cột" | code | — |

Nhịp: 1 long-form/tuần (cùng giờ) + 1-2 short. Kho đủ chạy ~1 năm (Phân Tích 52 + Kiến Thức 45 bài). Quy trình 1 tập: **content-writer** (blog→`content.py`) → thumb.json + `gen-thumb` → **content-check** → render (khi OK) → **content-publish**.

## 1. Mục tiêu giai đoạn cầu nối
Giai đoạn này là **đường dốc tâm lý**, kéo khán giả từ *"tôi đến vì mẹo Google tools"* → *"tôi muốn tư duy data đúng"*. Bốn việc phải đạt:
1. Báo hiệu **kênh sống lại** + người dẫn vẫn là Tuấn quen thuộc, đáng tin.
2. **Tôn vinh** kiến thức công cụ cũ — KHÔNG phủ định; gặp lại họ trên sân nhà.
3. **Lộ cái trần** của công cụ → tạo cơn khát về tư duy.
4. **Bàn giao** mượt vào series "mỗi tuần một khái niệm".

## 2. Nguyên tắc (đọc trước khi viết mỗi script)
- **Đừng phủ định công sức cũ.** Bắc cầu: *"Sheets tuyệt — đây là chỗ nó đụng trần → đó là lúc cần tư duy."*
- **Một giọng = Lê Anh Tuấn**, ngôi "mình/bạn", tâm sự lão làng (xem STYLE.md §TÔNG GIỌNG).
- **Brand-light**: tối đa 1 beat chạm Semantix, định vị bằng phủ định, không brochure.
- Mỗi long-form chia 4–7 beat, ≥1 beat KINETIC punchy để **cắt Short**.
- Thesis xuyên suốt: *con số trần trụi nói dối khi quên ngữ cảnh* → **"ngữ cảnh là vua".**

## 3. Ba chặng
- **Chặng 0 — Tái xuất** (E1): tuyên bố quay lại + lý do đổi hướng.
- **Chặng 1 — Gặp lại trên sân nhà** (E2, E3, E4): bắt đầu từ Google tools họ biết → lộ trần.
- **Chặng 2 — Gieo lăng kính mới** (E5, E6): nhá thesis "ngữ cảnh" nhẹ, không lý thuyết.
- **Chặng 3 — Khai series**: "mỗi tuần một khái niệm" chạy đều (từ kho Kiến Thức Nền Tảng / Phân Tích).

## 4. Slate 6 video (theo THỨ TỰ LÊN SÓNG)

Đường dốc: *công cụ mình yêu → công cụ có trần → cả tool xịn nhất cũng fail → thứ còn thiếu là tư duy (khái niệm #1) → AI khiến tư duy thành lợi thế sống còn.*

| Lên sóng | ID gốc | Vai trò | Tiêu đề (nháp) | Rút từ blog | Thông điệp cầu nối | Trạng thái |
|---|---|---|---|---|---|---|
| **E1** | V1 | Reset | Vì sao mình biến mất 1 năm & đổi hướng kênh | *(gốc cá nhân)* | "Không bỏ — mình tiến hoá. Ngữ cảnh là vua." | ✅ script xong (`tu-cong-cu-den-tu-duy`) |
| **E2** | V2 | Cầu nối · gắn kết | 10 năm mình đi qua Excel → Sheets → Power BI → Looker… và dừng ở đâu | `hanh-trinh-thoi-excel`, `hanh-trinh-power-bi-data-studio`, `hanh-trinh-superset-metabase`, `nocobase-semantix` | Tôn vinh từng công cụ; cái chung nằm *trên* mọi công cụ = tư duy | cần viết |
| **E3** | V3 | Cầu nối · lộ trần | Google Sheets làm báo cáo: tuyệt — cho tới 4 cái trần này | `vs-google-sheets`, `google-sheets-dashboard` | Sheets vẫn tuyệt để bắt đầu; trần = thủ công/trễ/sai/một người gánh | cần viết |
| **E4** | V6 | Cầu nối · war story | Cái dashboard "cho chọn mọi thứ" mình từng tự hào — và vì sao user bỏ | `self-service-analytics` | "Linh hoạt quá hoá rối" → tư duy > tính năng (chốt Chặng 1) | cần viết |
| **E5** | V4 | Bản lề → tập 1 series | Vì sao công ty bạn có 3 con số doanh thu — không ai sai | `metric-dimension-kpi` | Khái niệm đầu tiên: chuyển hẳn "công cụ" → "tư duy" | ✅ đã render (long+short) |
| **E6** | V5 | Lăng kính · bắt trend | AI viết SQL giỏi hơn mình — nghề Data Analyst còn cửa không? | `chuyen-nghe-data-analyst`, `llm-bia-sql`, `semantic-layer` | Đào sâu nỗi sợ ở E1 → lời giải ngữ cảnh = thứ series sẽ dạy; lời hiệu triệu vào series | cần viết |

> **Ghi chú sản xuất:** E5 (`metric-dimension-kpi`) đã render sẵn. Nếu tuần 1 quá tải, có thể đẩy E5 lên sớm để có ngay 1 video "kiến thức thật" mà không tốn công dựng — đổi lại hơi sớm về mạch kể.

## 5. Lịch & nhịp — BURST RỒI GIẢM
- **Tuần 1 (BURST — 3 video, kênh sống lại rõ):**
  - T2: **E1** (ghim video) + Community post "Tuấn quay lại" kèm **poll** *"bạn theo mình từ thời nào?"*
  - T4: **E2**
  - T6: **E3**
  - Shorts: hook "3 lý do" (T3), cut "AI viết SQL còn cửa?" (CN)
- **Tuần 2** — T4: **E4** (war story). + 1 short cắt từ E2/E3.
- **Tuần 3** — T4: **E5** (Metric/Dimension/KPI = tập 1 series). Short đã có.
- **Tuần 4** — T4: **E6** (AI/DA còn cửa) — lời hiệu triệu. + short "AI thay thế DA?"
- **Tuần 5+ — SERIES**: cố định **1 buổi/tuần, cùng giờ** (tín hiệu đều đặn) + 1–2 short/tuần. Lấy từ kho: `semantic-layer`/`mot-nguon-su-that`, `4-loai-thang-do-du-lieu`, `phan-tram-vs-diem-phan-tram`, `data-modeling-fact-dimension`, `leading-lagging-indicator`…

## 6. Cơ chế hâm nóng sub cũ (đòn bẩy riêng cho kênh ngủ)
- **Shorts = cỗ máy tiếp cận** (đánh thức thuật toán); long-form là nơi chốt sub.
- **Community tab**: post quay lại + poll; giữa kỳ post lại 1 video Sheets cũ kèm *"kiến thức này vẫn đúng — giờ mình đi xa hơn"* (bắc cầu).
- **Playlist "Bắt đầu lại từ đây"** gom E1→E6 để người mới binge.
- **End screen / card**: mỗi video bridge trỏ video kế + subscribe; card trỏ blog.
- **Comment ghim** mỗi video = 1 câu hỏi mở.

## 7. Tiêu chí chuyển sang series (đừng chờ mãi)
Kênh nhỏ → **đừng bám số tuyệt đối**. Chuyển khi: (a) đã đăng đủ slate cầu nối; (b) có tín hiệu sub cũ quay lại (comment "Sheets!", notif CTR/impression nhích lên); (c) ≥1 video lăng kính (E5/E6) chạy ổn. Đủ 3 → **cam kết series đều đặn bất kể** (tính nhất quán > chờ viral).

## 8. Hàng đợi viết script (thứ tự ưu tiên)
1. **E2** — Hành trình công cụ (nối thẳng mạch E1, gắn kết sub cũ mạnh nhất).
2. **E3** — Google Sheets đụng trần.
3. **E4** — War story dashboard "cho chọn mọi thứ".
4. **E6** — AI viết SQL, DA còn cửa? (E5 đã có).

Mỗi script → `video-remotion/videos/<slug>/content.py` (BEATS + ORDER + TONE + PRON) + gói đăng `video-scripts/<slug>.PUBLISH.md`. Slug đề xuất: E2 `hanh-trinh-cong-cu`, E3 `google-sheets-dung-tran`, E4 `dashboard-linh-hoat-hoa-roi`, E6 `ai-viet-sql-nghe-data`.

---
Liên quan: `STYLE.md`, `BLOG-TO-VIDEO.md`, `metric-dimension-kpi.PUBLISH.md`, `tu-cong-cu-den-tu-duy.PUBLISH.md`. Memory: video-production-plan, author-le-anh-tuan, semantix-site-personal-hub.
