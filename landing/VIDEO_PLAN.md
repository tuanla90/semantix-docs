# Video Plan — Chuyển Blog → Video (YouTube → Shorts)

> Mục tiêu: biến mỗi bài blog `.md` thành **một video YouTube long-form**, rồi **cắt 1–3 đoạn hay nhất thành Short** (YouTube Shorts / TikTok). Một lần dựng, hai tỉ lệ.
> Định vị thương hiệu trong video: **Tech product cao cấp** — sắc, đáng tin, "nguy hiểm". KHÔNG hoạt hình nhân vật, KHÔNG dễ thương, KHÔNG bình dân hoá quá đà.
> File này là **bộ quy ước dùng lại cho mọi video sau**. Kịch bản từng bài lưu ở `landing/video-scripts/<slug>.md` (slug = đúng slug bài blog gốc).

---

## A. Chiến lược & định vị

| Hạng mục | Quyết định |
|---|---|
| Kênh chính | **YouTube long-form** (6–9 phút), người chủ động bật xem → tải được nội dung sâu |
| Kênh phụ | **YouTube Shorts + TikTok** (dọc, ≤60s) — cắt từ các beat "short-able" của long-form |
| Phong cách hình | **Sleek UI / Kinetic Typography** (chữ chuyển động, dark mode, dashboard phát sáng) xen **screencast thao tác thật** |
| Giọng đọc | **Vbee** (AI voice tiếng Việt) — chọn giọng **trầm, uy tín**, không phải giọng đọc tin tức tươi |
| Đối tượng | Chủ SME, COO, CMO, Data Lead (B2B) — cần chuyên nghiệp, phản biện, dữ liệu thật |
| Công nghệ dựng | **Remotion** (Video-as-Code, React) — render được **cùng composition ra 16:9 và 9:16** |

> DNA nội dung kế thừa nguyên từ blog (xem `CONTENT_PLAN.md` mục G): **một sự thật ngược đời, kể bằng số liệu Việt Nam, kết bằng một quyết định.** Video chỉ đổi *kênh truyền*, không đổi giọng.

---

## B. Hai nguyên tắc bất biến (vi phạm là pipeline đắt gấp đôi)

### Nguyên tắc 1 — Viết kịch bản theo MODULE (beat), KHÔNG viết essay
Mỗi video = **4–7 "beat" độc lập**, mỗi beat 45–90s, **mỗi beat có hook riêng + chốt riêng** (1 mâu thuẫn / 1 con số / 1 kết luận).
- Ghép các beat = video YouTube.
- Lấy **1 beat nguyên vẹn** = 1 Short, không cần dựng lại context.
- Cấm viết văn xuôi trôi chảy rồi mò tìm đoạn clip — phải **thiết kế điểm cắt từ đầu**.

### Nguyên tắc 2 — Phân loại beat "short-able" ngay khi viết
| Loại beat | Vai trò trong long-form | Cắt Short? |
|---|---|---|
| **KINETIC** (chữ chạy, số, biểu đồ phát sáng) | Giải thích khái niệm, tung mâu thuẫn | ✅ Dễ — reframe 16:9 → 9:16 ngon |
| **SCREENCAST** (quay thao tác thật / dashboard) | Minh hoạ giá trị, "show don't tell" | ❌ Khó ép dọc — đừng cắt short |

→ Long-form = **KINETIC + SCREENCAST xen kẽ** (10 phút toàn chữ chạy thì mệt mắt). Short **chỉ rút từ beat KINETIC**. Mỗi video chủ động gài 1–2 beat KINETIC thật punchy để dành cắt short.

---

## C. Thông số kỹ thuật & visual

### Tỉ lệ & độ dài
- **Long-form:** 1920×1080 (16:9), 6–9 phút, 30fps.
- **Short:** 1080×1920 (9:16), ≤60s (lý tưởng 30–45s), 30fps.
- Layout Remotion phải **responsive** giữa hai tỉ lệ: nội dung chính canh giữa, an toàn trong khung dọc (chừa "safe zone" giữa 1080×1920, tránh đặt chữ quan trọng ở 15% trên/dưới — bị UI TikTok che).

### Bảng màu — bám PALETTE APP THẬT (`semantix/app/globals.css`, dark mode)
> ⚠️ **Quyết định:** video bám màu **app sản phẩm** (theme shadcn/Tailwind, oklch — nền trung tính + accent chart), **KHÔNG** bám indigo của cover blog landing. Lý do: video xen screencast app thật → màu phải khớp để cảnh quay hoà liền mạch. Hex dưới convert từ các biến `--*` oklch dark mode của app.

| Vai trò | Hex | Token app | Dùng cho |
|---|---|---|---|
| Nền chính | `#020202` (hoặc `#0A0A0A` cho dịu) | `--background` | Nền tối chủ đạo |
| Bề mặt / card | `#121212` → `#18181B` | `--card` | Thẻ, panel, khối nổi |
| Lưới / đường kẻ | `#383838` @ opacity ~.5 | `--border` | Lưới nền (cảm giác dashboard) |
| Chữ chính | `#FAFAFA` | `--foreground` | Luận điểm, tiêu đề |
| Chữ phụ | `#A1A1A1` | `--muted-foreground` | Chú thích, nhãn |
| **Accent nhấn (xanh)** | `#227FE1` | `--info` | Từ khoá phát sáng, highlight chính, glow |
| Tích cực / KPI đạt / "đúng" | `#00BC7D` (đậm hơn `#13A249`) | `chart-2` / `--success` | Mục tiêu đạt, điểm tốt |
| Số nổi / tương phản | `#FE9A00` | `chart-3` / `--warning` | Con số đối lập, cảnh báo nhẹ |
| Mâu thuẫn / "sai" / lệch | `#FF6467` | `--destructive` | Con số va nhau, lỗi, mâu thuẫn |
| Phụ trợ | `#AD46FF` (tím) · `#1447E6` (xanh đậm) | `chart-4` / `chart-1` | Lát cắt thứ 3–4, biến thể |

- **Font:** **Inter Variable** (chữ) + **JetBrains Mono Variable** (số liệu, SQL, code) — y hệt app (`--font-inter`, `--font-jetbrains-mono`). Số trong dashboard để JetBrains Mono cho chất "tech/SaaS". Tiêu đề `font-weight: 800`, chữ chạy 700.
- **Glow:** từ khoá nhấn dùng `text-shadow` **xanh `#227FE1`** nhẹ — "phát sáng", không loè.
- **Chuyển động:** ease-out, vào nhanh ra chậm. Chữ xuất hiện **theo nhịp đọc** (cần timestamp từ Whisper — xem mục E). Tránh xoay/lật màu mè; ưu tiên fade + slide nhỏ + scale nhẹ.

### Motif hình ảnh tái dùng
Dashboard/biểu đồ cột, dòng SQL/Text-to-SQL hiện mượt, số đếm tăng (count-up), bảng đối chiếu 2 cột (tồi/tốt, có/không), vạch mục tiêu đứt nét (KPI). Bám motif của cover SVG bài tương ứng — nhưng **đổi màu sang palette app** ở trên (cover blog là indigo, video là neutral+accent).

---

## D. Giọng đọc Vbee — quy ước

- **Chọn 1 giọng cố định** cho cả kênh (trầm, uy tín, miền Bắc hoặc Nam trung tính) → xây nhận diện. Ghi tên giọng đã chọn vào frontmatter script (`vbee_voice:`).
- **Tốc độ:** hơi chậm hơn mặc định (~0.95x) để câu chốt có sức nặng.
- **Sinh giọng theo TỪNG BEAT** (mỗi beat một file mp3 riêng) — để cắt short không phải tách audio, và sửa 1 beat không phải render lại cả bài.
- **Viết cho tai, không cho mắt** (xem mục H). Số phải đọc trôi: viết `4,2 tỷ` Vbee đọc ổn, nhưng từ Anh ngữ nên phiên: `KPI` → giữ "ca-pi-ai" nếu giọng đọc sai thì ghi chú `[đọc: ...]` trong script.
- **Dấu nghỉ:** chèn `...` hoặc tách câu để tạo khoảng lặng trước câu chốt. Vbee nghỉ theo dấu câu — dùng dấu chấm nhiều hơn dấu phẩy ở câu nhấn.

---

## E. Pipeline sản xuất

```
1. Bài .md  ──►  Kịch bản module  (AI nháp + người biên tập NHỊP)  →  landing/video-scripts/<slug>.md
2. Voiceover  ──►  Vbee sinh mp3 theo từng beat                     →  audio/<slug>/beat-NN.mp3
3. Timestamp  ──►  Whisper chạy lại mp3 lấy mốc TỪNG TỪ            →  audio/<slug>/beat-NN.json
                   (Vbee KHÔNG trả word-timestamp — đây là bước bắt buộc để chữ kinetic sáng đúng từ)
4. Dựng     ──►  Remotion đọc audio + json, sync chữ theo giọng
5. Render   ──►  16:9 long-form (cả bài)  +  9:16 cho từng beat đánh dấu ✂️ short-able
6. Đóng gói ──►  Title/desc/thumbnail/chapters (mục I)  →  YouTube + TikTok
```

> Bước 3 (Whisper) là điểm dễ bị quên nhất. Không có nó, kinetic typography phải canh tay từng từ — bất khả thi ở quy mô.

**Khuyến nghị khởi động:** làm **TAY 1 video end-to-end** trước (xác nhận chất lượng giọng Vbee với từ chuyên ngành + nhịp). Ưng rồi mới scaffold Remotion. Đừng dựng pipeline tự động trước khi 1 video chứng minh được view/giữ chân.

---

## F. Quy ước file, mã video & đăng ký

- **Mã video = mã blog gốc**, thêm tiền tố `v`: bài `kt-006` → video `vkt-006`. Một blog → một video chính (1-1), khỏi cần bộ đếm mới.
- **File kịch bản:** `landing/video-scripts/<slug>.md` — `<slug>` y hệt slug bài blog (vd `metric-dimension-kpi.md`).
- **Asset:** `landing/video-assets/<slug>/` (audio, render, thumbnail) — *(thư mục tạo khi bắt đầu sản xuất; không commit file nặng nếu repo không dùng LFS).*
- **Đăng ký trước khi làm** (giống CONTENT_PLAN): đổi Tier dòng tương ứng ở mục K thành `✍️ <tên>` rồi lưu file NGAY, làm xong đổi `✅` + điền link YouTube.

---

## G. Cấu trúc kịch bản chuẩn (schema dùng cho mọi script)

Mỗi file `video-scripts/<slug>.md` gồm **frontmatter** + **các khối BEAT**. Khuôn cố định:

### Frontmatter
```yaml
---
slug: metric-dimension-kpi          # = slug blog gốc
videoCode: vkt-006                  # = vmã-blog
sourcePost: /blog/metric-dimension-kpi/
title: "<tiêu đề video YouTube>"     # xem mục I
vbee_voice: "<tên giọng đã chọn>"
estDuration: "6:30"                 # ước lượng tổng
author: "<persona khớp bài, xem CONTENT_PLAN G9>"
---
```

### Mỗi BEAT là một khối theo đúng template
```
### BEAT <NN> — <tên beat ngắn>   ·  [KINETIC|SCREENCAST]  ·  ⏱️ ~<giây>s  ·  <✂️ SHORT-ABLE | —>

**🎙️ Voiceover (đọc đúng từng chữ qua Vbee):**
> <Lời đọc. Viết cho TAI. Câu cụt, nhịp gõ. Số đọc trôi.>

**🅰️ On-screen (chữ kinetic — nhấn từ khoá):**
- <Những cụm chữ to hiện theo nhịp; **bold** = từ sáng/nhấn>

**🎬 Visual / b-roll:**
- <Motif, biểu đồ, screencast cảnh gì, animation gì, màu nào>

**✂️ Short note:** <Nếu short-able: hook 3s đầu là câu nào, caption, hashtag. Nếu không: ghi "—">
```

### Khung arc của long-form (thứ tự beat khuyến nghị)
1. **COLD OPEN / HOOK** (KINETIC, ✂️) — tung mâu thuẫn trong 5 giây đầu, chưa giới thiệu gì. *Đây thường là Short mạnh nhất.*
2. **KHUNG / ẨN DỤ** (KINETIC) — đặt khái niệm bằng 1 hình ảnh đời thường (Rubik, xô thủng, vô lăng…).
3–5. **2–4 BEAT LÕI** (KINETIC, phần lớn ✂️) — mỗi beat giải một ý, có số liệu VN. Đây là kho cắt short.
6. **SCREENCAST (tuỳ chọn)** — minh hoạ giá trị trên sản phẩm thật. *Với bài "kiến thức thuần, ít sản phẩm": giữ rất nhẹ hoặc bỏ.*
7. **CHỐT + CTA** (KINETIC) — bảng đối chiếu "Tóm lại" + 1 câu hành động + mời subscribe.

### Giải phẫu một Short (khi cắt)
- **0–3s:** câu hook gây sốc (số/mâu thuẫn) — chữ to, không intro.
- **3–40s:** thân beat nguyên vẹn.
- **Cuối:** 1 câu chốt + "Đầy đủ trên YouTube" / mời theo dõi.
- Luôn có **caption chữ chạy** (xem muted), giữ chữ trong safe zone dọc.

---

## H. DNA giọng VĂN → giọng NÓI (chuyển thể, đừng đọc nguyên blog)

Blog viết cho mắt; video nghe bằng tai. Khi chuyển:
- **Câu ngắn lại.** Một ý một câu. Bỏ mệnh đề lồng. Giữ "câu cụt nhịp gõ" của DNA: *"Đều chạy. Đều ra số. Đều đúng cú pháp."*
- **Đọc số thành nhịp:** "bốn phẩy hai tỷ" nghe rõ hơn nhìn "4,2 tỷ". Để Vbee tự đọc nhưng kiểm tra.
- **Hook trong 5 giây.** Tai bỏ đi nhanh hơn mắt. Câu đầu phải là mâu thuẫn, không phải định nghĩa.
- **Ngôi 2 "bạn"** xuyên suốt; "chúng tôi/Semantix" chỉ ở beat sản phẩm.
- **Em-dash của blog → khoảng lặng của giọng.** Chỗ blog dùng `—` để hích, video dùng `...` + nhịp nghỉ.
- **Ẩn dụ giữ nguyên** (Rubik, xô thủng…) — chúng vốn là visual sẵn cho kinetic.
- **Giữ ví dụ Việt Nam** (Shopee/TikTok Shop/KiotViet, Tết, TP.HCM) và **đánh dấu rõ số minh hoạ** khi cần.

---

## I. Đóng gói YouTube & TikTok (SEO)

**YouTube long-form:**
- **Tiêu đề:** giữ công thức nghịch lý của blog nhưng "click" hơn: `[Khái niệm]: [mệnh đề ngược đời]`. Vd *"Metric, Dimension, KPI: 3 từ ai cũng nói sai — và vì sao báo cáo cứ cãi nhau"*.
- **Thumbnail:** nền dark brand, 1 con số sốc + 3–4 chữ to. Không nhồi chữ.
- **Description:** 2 câu hook (giống `description` blog) + link bài blog gốc + timestamps (chapters theo beat).
- **Chapters:** mỗi BEAT một mốc → YouTube tự chia chương.
- **Tags/hashtag:** #BI #dữliệu #SME #phântíchdữliệu + chủ đề bài.

**Short / TikTok:**
- Hook 3s là câu mâu thuẫn. Caption chữ chạy bắt buộc (xem không tiếng).
- Mô tả ngắn + 3–5 hashtag + "Bản đầy đủ trên YouTube".
- CTA mềm: theo dõi để hiểu data đúng cách.

---

## J. Checklist trước khi sản xuất một video

- [ ] Đã đăng ký dòng ở mục K (Tier `✍️`)?
- [ ] Kịch bản chia **4–7 beat module**, mỗi beat có hook + chốt riêng?
- [ ] Mỗi beat gắn nhãn **KINETIC/SCREENCAST** + cờ **✂️ short-able**?
- [ ] Có **≥1–2 beat KINETIC punchy** dành cắt short?
- [ ] Voiceover viết **cho tai** (câu cụt, số đọc trôi, hook ≤5s)?
- [ ] Ẩn dụ + số liệu VN giữ nguyên; số minh hoạ được đánh dấu?
- [ ] Beat Semantix (nếu có) **soft sell, định vị bằng phủ định**, không brochure?
- [ ] Đã chốt giọng Vbee + ghi `vbee_voice`?
- [ ] Layout an toàn cho cả 16:9 và safe-zone 9:16?
- [ ] Title/thumbnail/chapters/hashtag đã soạn?

---

## K. Backlog video (đăng ký giống CONTENT_PLAN — Tier: 🔴 làm trước · 🟡 tiếp · ⚪ sau · ✍️ đang làm · ✅ xong)

> Mã video = `v<mã-blog>`. Ưu tiên bài có hook mạnh + dễ kinetic + ít phụ thuộc sản phẩm (cho các clip đầu xây kênh).

| Mã video | Bài blog gốc (slug) | Vì sao chọn | Tier | Link YouTube |
|---|---|---|---|---|
| vkt-006 | `metric-dimension-kpi` | Kiến thức thuần, ẩn dụ Rubik dễ kinetic, chia 3 short (Metric/Dimension/KPI), ít Semantix | ✍️ clip #1 | — |
| vkt-009 | `mot-nguon-su-that` | Hook "3 con số doanh thu" cực mạnh; ngược đời | 🟡 | — |
| vuc-005 | `tiktok-shop-mua-sale-gia-theo-gio` | Dễ viral short, bối cảnh sale TikTok Shop | 🟡 | — |
| vkt-005 | `rag-la-gi` | Chủ đề AI hot, giải thích bằng hình | ⚪ | — |
| vpt-023 | (chưa viết blog) `tương quan ≠ nhân quả` | Kiến thức thuần, viral, zero sản phẩm | ⚪ | — |

*(Thêm dòng khi chọn bài mới — lấy đúng `v<mã-blog>` của bài đó trong `CONTENT_PLAN.md`.)*

---

## L. Ghi chú quyết định (để không phải bàn lại)

- **Không dùng HeyGen AI Avatar** lúc đầu: lip-sync tiếng Việt còn yếu → uncanny valley, hại định vị "đáng tin". Screencast thao tác thật có giá trị hơn avatar. Có thể cân nhắc lại sau khi kênh ổn.
- **Không hoạt hình nhân vật** (kiểu "Ông Chú Tài Chính"): quá bình dân cho đối tượng B2B cao cấp.
- **Remotion thay vì Vyond/CapCut tay:** vì render được cùng nguồn ra 16:9 + 9:16, hợp workflow code, rẻ nhất để tự động hoá ở quy mô.
- **Nút thắt thật là KỊCH BẢN, không phải render.** Khâu blog → script (biên tập nhịp) không tự động hoá sạch được — luôn cần người duyệt nhịp.
