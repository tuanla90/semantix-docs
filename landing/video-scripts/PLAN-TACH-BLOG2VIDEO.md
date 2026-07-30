# PLAN — Tách dây chuyền video ra repo `blog2video`

> Mục tiêu: `blog2video` = **máy móc** (tái dùng cho dự án sau). `semantix-docs` = **nội dung + brand**, import máy móc qua npm.
> Quyết định đã chốt (2026-07-30): tên repo `blog2video` · nối bằng **npm git dep + `npm link`** khi dev · phạm vi **trọn gói** (render + TTS + thumbnail + skill), **chưa** lấy `video-decks`.

---

## 1. Trạng thái hiện tại (đã soi)

`landing/video-remotion/` — 172 file tracked:

| Nhóm | Số file | Ví dụ |
|---|---|---|
| Kit render (TS/React) | 11 | `src/kit.tsx`, `Caption.tsx`, `ui.tsx`, `Root.tsx`, `thumbnail.tsx`, `lotties.ts`, `og.tsx` |
| Script pipeline | 19 | `gen_audio.py`, `align.py`, `scripts/build.py`, `scaffold.py`, `gen-registry.mjs`, `tts_*.py`, `recolor_lottie.py` |
| Asset generic | 27 | `public/lottie/*.json` (icon đã recolor) |
| Asset brand | 3 | `public/thumb/tuan-crop.png`, `logo-LA.svg`, `logo-LA-invert.svg` |
| Docs | 4 | `NOTES.md`, `LOTTIE-LIST.md`, `README.md`, `voice-clone-pvc-script.md` |
| **Nội dung 14 slug** | **112** | `videos/<slug>/{content.py, script.json, scenes.json, thumb.json, beats.json, timings.json, outro.json}` |

Máy móc còn nằm rải ngoài thư mục đó:
- `landing/scripts/gen-thumb.mjs` — sinh thumbnail 1280×720, 9 layout, bảng 6 màu category.
- `landing/edit-server.mjs` (183 dòng, gộp blog+video) và `landing/video-remotion/scripts/edit-server.mjs` (70 dòng, chỉ scenes.json) — **hai bản trùng chức năng**, dịp này hợp nhất.
- `landing/video-scripts/BLOG-TO-VIDEO.md` — quy trình + tông giọng lẫn nhau.
- `.claude/workflows/video-pipeline.js` + `.claude/skills/content-*`.

---

## 2. Đường ranh giới

### 2.1 Sang `blog2video`

```
blog2video/
  package.json            name: blog2video · exports: ./kit ./root ./thumb · bin: blog2video
  src/                    kit.tsx Caption.tsx ui.tsx lotties.ts og.tsx thumbnail.tsx thumb-root.tsx thumb.ts
                          root.tsx  <- Root.tsx cũ, đổi thành factory makeRoot(videos, config)
  scripts/                build.py scaffold.py gen_audio.py align.py gen_sfx.py map_audio.py
                          extract_ref.py script-json.py recolor_lottie.py recolor_tier1.py
                          scale_lottie.py tts_clone.py tts_paced.py tts_presets.py tts_try.py
                          tts_variants.py gen-registry.mjs gen-thumb.mjs edit-server.mjs
  assets/lottie/          27 icon generic (+ _src/ gốc)
  templates/thumb/        9 layout tách khỏi gen-thumb.mjs
  docs/                   PIPELINE.md (từ NOTES.md) · LOTTIE-LIST.md · SCRIPT-PROTOCOL.md (phần quy trình
                          của BLOG-TO-VIDEO.md) · CONFIG.md
  .claude-plugin/         marketplace.json + skills/video-forge + workflows/video-pipeline.js (bộ khung)
  video.config.schema.json
  examples/_example/      1 slug mẫu tối giản để smoke-test engine độc lập
```

### 2.2 Ở lại `semantix-docs`

```
landing/
  video/                      <- thay landing/video-remotion/
    package.json              deps: blog2video, remotion, react
    video.config.json         brand + path + voice + palette  (mục 3)
    remotion.config.ts        Chrome path của máy này
    src/index.ts              4 dòng: registerRoot(makeRoot(VIDEOS, config))
    src/videos.gen.ts         gitignore — gen-registry sinh ra
    videos/<slug>/            14 slug, giữ nguyên 7 file mỗi slug
    assets/                   tuan-crop.png, logo-LA.svg, logo-LA-invert.svg
    audio/music/              nhạc nền (suong-sach.mp3)
    public/                   gitignore — sync-assets copy lottie + assets vào đây
    out/                      gitignore
  video-scripts/*.PUBLISH.md  gói đăng YouTube
  STYLE.md, BRAND.md          tông giọng + brand
  .claude/skills/content-*    skill nội dung theo kênh
```

Memory giọng (`tuan-tu-su-voice-anti-ai.md`, `author-le-anh-tuan.md`) — không đụng.

### 2.3 Bỏ hẳn / không mang theo

- `voice-clone-pvc-script.md` — kịch bản thu PVC, đã chốt bỏ PVC (memory `voice-tts-v3-decision`). Để lại semantix-docs như tư liệu.
- `.venv-whisper`, `.venv-tts` — tạo lại ở chỗ mới, **không** copy (đường dẫn tuyệt đối trong venv sẽ gãy).
- `landing/video-remotion/scripts/edit-server.mjs` — merge vào bản 183 dòng rồi xoá.

---

## 3. `video.config.json` — cái chặn tái dùng lớn nhất

Hiện đang hard-code, phải rút ra hết:

| Đang ở đâu | Giá trị | Field config |
|---|---|---|
| `src/brand.ts` | name/label/sig/accent/bubble | `brand.*` |
| `gen-thumb.mjs:19-25` | bảng 6 màu category | `categories[]` |
| `remotion.config.ts:5`, `build.py:38` | `C:\Program Files\Google\Chrome\...` | env `CHROME` |
| `build.py:34` | `.venv-whisper/Scripts/python.exe` | env `B2V_PYTHON` |
| `Root.tsx:11` | `audio/music/suong-sach.mp3` + vol 0.15 | `audio.bed`, `audio.bedVolume` |
| `Root.tsx:15-20` | INTRO_PAD / SECTION_GAP / OUTRO_PAD… | `pacing.*` (có default) |
| `gen_audio.py` | voice ID ElevenLabs, model | `tts.voiceId`, `tts.model` + `.env` giữ key |
| `gen-thumb.mjs:15-16` | ảnh mặt + logo | `thumb.person`, `thumb.logo` |

Nguyên tắc: **key API không bao giờ vào `video.config.json`** — chỉ `.env` ở repo nội dung.

---

## 4. Sáu phase

### P0 — Dọn nền (~15′)
1. Commit ~30 file `beats/timings/outro.json` đang dirty (git status hiện tại) — subtree split cần cây sạch.
2. `npx remotion still src/index.ts llm-bia-sql-Long baseline-long.png --frame=900` + `node scripts/gen-thumb.mjs llm-bia-sql` → cất 2 ảnh vào scratchpad làm **mốc đối chứng P3**.
3. Tạo repo rỗng `blog2video` trên GitHub (private trước, mở sau).

### P1 — Đẻ repo engine, giữ history (~45′)
1. `git subtree split --prefix=landing/video-remotion -b split-video` → push nhánh sang `blog2video`.
2. Trong repo mới: xoá `videos/` (giữ 1 slug rút gọn thành `examples/_example/`), xoá `public/thumb/*` (brand), xoá `voice-clone-pvc-script.md`.
3. Copy thêm (không cần history): `gen-thumb.mjs`, `edit-server.mjs` (bản 183 dòng), phần quy trình của `BLOG-TO-VIDEO.md`.
4. `README.md` mới: engine dùng thế nào, không nhắc Semantix/Tuấn LA Lab.

**Xong khi**: repo mới clone về, `npm i` chạy được, `npm run studio` mở Studio với slug `_example`.

### P2 — Tham số hoá (~2h · phần nặng nhất)
1. `brand.ts` → `loadConfig()` đọc `video.config.json` từ project root (cwd), có default an toàn.
2. `Root.tsx` → `export const makeRoot = (videos, config) => RemotionRoot`; nhạc nền + pacing lấy từ config.
3. `gen-registry.mjs`: nhận `--out <path>`, ghi `videos.gen.ts` vào **repo nội dung**, import type từ `blog2video/kit`.
4. `build.py` / `scaffold.py` / `gen_audio.py` / `align.py`: `ROOT` = cwd của người dùng (nơi có `video.config.json`), **không** phải vị trí script. Thêm `find_project_root()` leo cây tìm config.
5. `gen-thumb.mjs`: palette + person/logo từ config; 9 layout tách sang `templates/thumb/`.
6. Thêm lệnh `blog2video sync-assets` — copy `assets/lottie/*` + asset brand của consumer vào `public/` của consumer (**bắt buộc**: Remotion `staticFile()` chỉ đọc `public/` của project đang chạy, không đọc được từ `node_modules`).
7. CLI `bin/blog2video.mjs`: `scaffold | audio | align | registry | thumb | build | studio | edit | sync-assets` — wrapper gọi python/node với cwd người dùng.

**Xong khi**: trong `examples/`, chạy full `blog2video build _example --no-render` ra `timings.json` sạch.

### P3 — Dựng shim + verify parity (~1h) ⚠️ cổng chặn
1. Tạo `landing/video/` theo layout mục 2.2; `package.json` trỏ `"blog2video": "github:<user>/blog2video#main"`; lúc dev `npm link ../../blog2video`.
2. Chuyển 14 slug sang (`git mv`, giữ history trong semantix-docs).
3. Viết `video.config.json` khớp đúng giá trị đang hard-code hôm nay.
4. `blog2video sync-assets` → `blog2video registry` → render lại `llm-bia-sql`:
   - still frame `--frame=900` **so pixel với baseline P0**
   - `thumb.png` so với baseline P0
5. Lệch thì sửa engine, **không** đi tiếp P4 khi chưa khớp.

### P4 — Skill & workflow (~45′)
1. `blog2video` thành Claude Code plugin: skill `video-forge` (cơ chế: beat → scenes.json → build → thumb) + workflow `video-pipeline.js` **bộ khung**, nhận `ctx` brand qua args.
2. `semantix-docs` giữ phần brand: `CTX` trong workflow rút thành `landing/video/BRAND-CTX.md`, workflow đọc file đó.
3. Cập nhật path trong: `.claude/skills/content-writer` (dòng 25), `content-plan` (dòng 11,18), `content-publish` (dòng 17), `content-check`.
4. `.claude/launch.json`: `studio` đổi `--prefix landing/video`.

### P5 — Cắt đuôi (~30′)
1. Xoá `landing/video-remotion/`.
2. **`landing/public/admin/config.yml:86`** — Sveltia đang trỏ `landing/video-remotion/videos`, không sửa là admin CMS gãy.
3. `landing/scripts/gen-admin.mjs` (dòng 11,12,68,76), `scan-content.mjs` (dòng 10,11,12,75), `landing/scripts/gen-thumb.mjs` (xoá, gọi qua CLI).
4. `landing/edit-server.mjs:15,51,106` — `VIDEO_DIR` sang path mới.
5. Cập nhật `landing/video-scripts/BLOG-TO-VIDEO.md` (giữ phần giọng, trỏ sang docs engine), `NOTES.md` → link repo mới.
6. Ghi memory: engine ở đâu, dev loop `npm link` thế nào.

---

## 5. Gotcha đã thấy trước

1. **Sveltia CMS** trỏ cứng `landing/video-remotion/videos` (`config.yml:86`) → P5 phải sửa, không thì admin không mở được script.json.
2. **`staticFile()` chỉ đọc `public/` của project** → lottie trong `node_modules` không dùng trực tiếp được, bắt buộc có `sync-assets`. Đây là chi tiết dễ nổ nhất ở P3.
3. **`.env` ElevenLabs** ở lại `semantix-docs`. Engine đọc từ env, tuyệt đối không commit key.
4. **venv** không di chuyển được — tạo lại `.venv-whisper` ở `landing/video/`. Kèm `requirements.txt` (nhớ `onnxruntime==1.20.1` + `truststore`, xem `NOTES.md`).
5. **Hai `edit-server.mjs`** trùng chức năng — hợp nhất ở P1, đừng bê cả hai sang.
6. **`videos.gen.ts`** đang gitignore và import `../videos/...` tương đối — sau tách nó sinh ở repo nội dung, type import từ package. Đây là mối nối TS dễ đứt, kiểm ngay ở P3.
7. **`video-decks`** (slide+facecam, mới 1 slug) **không** đưa vào đợt này — chuẩn chưa chốt, đưa sớm sẽ phải sửa engine lại.
8. **Netlify/CI build blog** không đụng `landing/video/` → không rủi ro deploy. Nhưng nếu sau này CI cần render thì `npm i` sẽ kéo repo private → cần deploy key.

---

## 6. Ước lượng

| Phase | Thời gian | Rủi ro |
|---|---|---|
| P0 dọn nền | 15′ | thấp |
| P1 subtree split | 45′ | thấp |
| P2 tham số hoá | 2h | **cao** — chỗ dễ vỡ nhất |
| P3 shim + parity | 1h | trung bình (gotcha 2, 6) |
| P4 skill/workflow | 45′ | thấp |
| P5 cắt đuôi | 30′ | trung bình (gotcha 1) |
| **Tổng** | **~5h** | |

Có thể dừng an toàn sau P3 (engine chạy được, repo cũ vẫn còn) và làm P4–P5 phiên sau.

---

## 7. Kết quả thực tế (2026-07-30)

Đã chạy xong P0→P5. Engine ở `D:/Users/tuanla2/blog2video` (5 commit, giữ history phần máy móc).

**Parity gate P3 — ĐẠT, MD5 khớp từng byte** (slug `llm-bia-sql`):

| Ảnh | MD5 |
|---|---|
| Long frame 900 | `a50d14ec8ae15e06be87cf75421f631e` |
| Short frame 200 | `bc8fe9667dcf5f3b5cb3975714ee546d` |
| `thumb.png` | `542112955ea99ab921021c8ab1866dd2` |

**Lệch so với plan:**

1. **`landing/edit-server.mjs` KHÔNG hợp nhất** — file 183 dòng này dính chặt blog + admin state + cover; nó là admin hub cá nhân chứ không phải máy móc. Engine giữ bản 70 dòng (sửa scenes.json cạnh Studio). Chỉ đổi `VIDEO_DIR` sang path mới.
2. **`og.tsx` / `thumbnail.tsx` / `thumb-root.tsx` ở lại semantix-docs** — nội dung riêng Semantix (semantix.vn, logo LA), không phải engine. Import trỏ sang `blog2video/ui` + `blog2video/config`.
3. **Chưa tạo repo GitHub** — máy này không có `gh` CLI, và tạo repo là việc trên tài khoản user. Consumer đang nối bằng `file:../../../blog2video`; đổi sang `github:` sau khi push.
4. **Chưa có `examples/`** — engine mới chỉ chạy qua dự án tiêu dùng thật.
5. **`docs/SCRIPT-PROTOCOL.md` chưa dọn** — vẫn là bản copy còn lẫn ví dụ riêng kênh Tuấn LA Lab; `BLOG-TO-VIDEO.md` bên semantix vẫn là bản đang dùng thật.
6. **Workflow semantix giữ nguyên CTX inline** — không rút ra file, vì prompt đã tinh chỉnh và không test lại được trong phiên này. Engine có bản chung riêng nhận `ctx` qua args.

**Phát sinh không có trong plan:**

- `videos/metric-dimension-kpi/customs.tsx` import `../../src/ui` → làm gãy bundle, phải trỏ sang `blog2video/ui`.
- `build.py --help` vỡ vì console cp1252 → CLI set `PYTHONUTF8=1`.
- `tsc` `--rootDir src`, và gọi bin JS thay vì `.bin/tsc.cmd` (`execFileSync` trên Windows không chạy `.cmd`).
- esbuild **bắt buộc** `splitting: true` — không thì mỗi entry giữ một bản `CONFIG` riêng, `applyConfig()` ở entry này không thấy ở entry kia.
- `.venv-whisper` sống sót sau khi đổi tên thư mục (numpy 2.5.0 + av import OK) — không phải dựng lại như lo ban đầu.
