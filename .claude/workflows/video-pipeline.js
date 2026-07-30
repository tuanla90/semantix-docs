export const meta = {
  name: 'video-pipeline',
  description: 'Dây chuyền video Tuấn LA Lab: mỗi blog slug -> script (content.py) -> thumbnail (thumb.json) -> review loop theo chuẩn giọng, đạt thì bàn giao user',
  whenToUse: 'Khi có 1 batch slug blog cần biến thành video: tự viết script + thumbnail + tự soát giọng, chỉ đưa user cái đã đạt chuẩn. args = mảng slug blog (vd ["4-loai-thang-do-du-lieu","llm-bia-sql"]).',
  phases: [
    { title: 'Script', detail: 'content-writer: blog -> content.py (BEATS/ORDER/TONE/PRON)' },
    { title: 'Thumbnail', detail: 'author thumb.json hợp lệ 1 trong 9 layout, màu theo category' },
    { title: 'Review', detail: 'soát stop-slop + giọng Tuấn; rớt thì sửa & soát lại (tối đa 2 vòng)' },
  ],
};

// ---- Batch slug: từ args, hoặc mặc định 7 tập series đang chờ review ----
const RAW = typeof args === 'string' ? JSON.parse(args) : (Array.isArray(args) ? args : []);
const DEFAULT_BATCH = [
  '4-loai-thang-do-du-lieu', 'phan-tram-vs-diem-phan-tram', 'trung-binh-noi-doi',
  'leading-lagging-indicator', 'tin-hieu-vs-nhieu', 'data-modeling-fact-dimension', 'llm-bia-sql',
];
const SLUGS = RAW.length ? RAW : DEFAULT_BATCH;
log(`Dây chuyền video: ${SLUGS.length} slug -> ${SLUGS.join(', ')}`);

// ---- Bối cảnh dùng chung cho mọi agent (đọc tại chỗ để luôn tươi) ----
const CTX = `Kênh "Tuấn LA Lab" của Lê Anh Tuấn (solo founder Semantix, Ở HÀ NỘI). Video kinetic-typography, giọng "dàn anh sư phạm gỡ rối cho đàn em ở quán cafe".
ĐỌC TRƯỚC (bắt buộc, đọc thật bằng Read):
- landing/STYLE.md (tông giọng, quy ước).
- landing/video-scripts/BLOG-TO-VIDEO.md (cách chẻ blog thành beat + đạo diễn).
- Memory giọng: D:\\Users\\tuanla2\\.claude\\projects\\D--Users-tuanla2-semantix-docs\\memory\\tuan-tu-su-voice-anti-ai.md (15 anti-AI + 7 DO + KIM CHỈ NAM "đừng gồng quá").
- Bài mẫu chuẩn giọng: landing/video/videos/4-loai-thang-do-du-lieu/content.py.
NGUYÊN TẮC: một giọng = Lê Anh Tuấn, ngôi "mình/bạn". KHÔNG phủ định công cụ cũ (bắc cầu). Brand-light (tối đa 1 beat chạm Semantix). Ví dụ neo Hà Nội (KHÔNG dùng TP.HCM/Sài Gòn/Quận HCM). KHÔNG bịa số/tên công ty thật.`;

// ---- Thông số 9 layout thumbnail (đúng field gen-thumb.mjs đọc) ----
const THUMB_SPEC = `thumb.json bắt buộc có: layout, category (1 trong: "Kiến Thức Nền Tảng","Phân Tích Dữ Liệu","Hướng Dẫn Thực Chiến","AI & Công Nghệ","So Sánh & Lựa Chọn","Câu Chuyện & Use Case"), catLabel, kicker.
Chọn 1 layout + field riêng của nó:
- question: {pre, em}  (2 dòng, em = vế lật/nhấn màu đỏ)
- highlight: {pre, hl} (hl = cụm được bôi vàng)
- cards: {cards:[{label,value,color}], hook:{pre,em}}  (so sánh 2-3 thẻ, nối bằng ≠)
- bignum: {value, label, contrast}  (1 con số cực lớn)
- vs: {left, right, tail}  (đối đầu A vs B, tail = câu hỏi chốt)
- mockup: {hook:{pre,em}, query}  (giả lập màn Semantix chat->chart)
- split: {left:{title,sub}, right:{title,sub}, kicker}  (đỏ sai / xanh đúng)
- code: {hook (dùng [em]..[/em] để bôi đỏ), code:[dòng...]}  (khối code)
- chart: {hook:{pre,em}, chart}  (chỉ dùng khi thật cần; chart = tên preset có sẵn)
Hook NGẮN, punchy, khớp beat mở của content.py. Màu tự theo category, KHÔNG set tay.`;

const SCRIPT_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    action: { type: 'string', enum: ['created', 'refined', 'kept'] },
    beatCount: { type: 'number' },
    kineticBeat: { type: 'string', description: 'beat id punchy nhất để cắt Short' },
    thumbLayout: { type: 'string', description: 'layout thumbnail đề xuất hợp với bài' },
    angle: { type: 'string', description: '1 câu: góc kể của video' },
  },
  required: ['slug', 'action', 'beatCount', 'thumbLayout'],
};

const THUMB_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    layout: { type: 'string' },
    action: { type: 'string', enum: ['created', 'refined', 'kept'] },
    hook: { type: 'string', description: 'text hook chính hiển thị' },
  },
  required: ['slug', 'layout', 'action'],
};

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    pass: { type: 'boolean', description: 'true nếu đạt chuẩn giọng, không còn vi phạm RÕ' },
    score: { type: 'number', description: 'tổng điểm giọng 5 tiêu chí, thang 0-50' },
    issues: { type: 'array', items: { type: 'string' }, description: 'vi phạm còn lại, rỗng nếu pass' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'đã sửa gì ở vòng này' },
  },
  required: ['slug', 'pass', 'score', 'issues'],
};

// ---- 1 hàm review-1-vòng: soát content.py, tự Edit sửa vi phạm RÕ ----
const reviewOnce = (slug, round) => agent(
  `${CTX}\n\nSOÁT GIỌNG (vòng ${round}) file: landing/video/videos/${slug}/content.py
Đây là SCRIPT VOICEOVER, không phải blog. Áp:
A. STOP-SLOP: bỏ dấu "..." ngắt drama; câu cụt lặp tạo kịch -> gộp; văn mẫu/bookish -> đời thường; chốt "hoá ra... mà thôi" -> kể thẳng; kết FOMO/nịnh -> mộc; điệp cấu trúc quá đà -> phá; em-dash "—"/ellipsis "…" -> "," hoặc "-".
B. GIỌNG TUẤN: khiêm tốn (không "tự hào"), ví dụ neo TÊN thật + Hà Nội, cảm xúc thật pha trộn, giọng người thầy gỡ rối, KIM CHỈ NAM "đừng gồng quá" (bài đã ổn thì ĐỂ YÊN, đừng viết lại cho có).
C. HỢP LỆ python: giữ ORDER/BEATS/PRON đúng cú pháp; "\\n" là nhịp ngắt; cảm xúc là [tag] inline trong BEATS (KHÔNG dùng dict TONE); đừng phá dict.
Nếu có vi phạm RÕ -> dùng Edit sửa TẠI CHỖ. Bài sạch -> không sửa.
Chấm 5 tiêu chí (Directness/Rhythm/Trust/Authenticity/Density) mỗi cái 0-10, cộng lại là score. pass = true khi score >= 40 VÀ không còn vi phạm RÕ.
Trả về {slug:"${slug}", pass, score, issues, fixed}.`,
  { label: `review:${slug.slice(0, 14)}·v${round}`, phase: 'Review', schema: REVIEW_SCHEMA }
);

// ---- Pipeline: mỗi slug chạy độc lập qua 3 chặng (không barrier) ----
const results = await pipeline(
  SLUGS,

  // CHẶNG 1 — SCRIPT
  (slug) => agent(
    `${CTX}\n\nNHIỆM VỤ: biến blog thành SCRIPT VOICEOVER video cho slug "${slug}".
1. Read landing/src/content/blog/${slug}.md (nguồn nội dung + số liệu + war story).
2. Nếu đã có landing/video/videos/${slug}/content.py: Read nó, chỉ TINH CHỈNH nếu cần (action "refined"/"kept"); nếu CHƯA có: viết mới (action "created").
3. Cấu trúc content.py: ORDER (list beat id "00".."0N"), BEATS (dict id->voiceover, "\\n" = nhịp ngắt nghỉ), PRON (dict từ khó->cách đọc TTS, chỉ tên riêng/ngoại). 5-7 beat. Beat mở HOOK mạnh; ít nhất 1 beat KINETIC punchy để cắt Short; beat chốt ấm, thẳng, không lên gân.
   CẢM XÚC = TAG INLINE trong BEATS (KHÔNG dùng dict TONE): cắm [tag] ngay trước câu cần đổi giọng, ~1 tag/beat, chỉ dùng bộ đã duyệt [thoughtful] [surprised] [excited] [annoyed] [frustrated] [sarcastic] [confident] [hesitant]. Đây là delivery cue ElevenLabs v3 (gen_audio strip trước caption). Bài mẫu: mot-nguon-su-that/content.py.
4. Ghi file bằng Write vào landing/video/videos/${slug}/content.py (tạo thư mục nếu chưa có). Header comment ghi rõ nguồn blog + "chưa render, chưa gen audio".
5. Bám giọng Tuấn + stop-slop NGAY từ đầu (đỡ việc cho chặng review).
Trả về {slug, action, beatCount, kineticBeat, thumbLayout (đề xuất), angle}.`,
    { label: `script:${slug.slice(0, 16)}`, phase: 'Script', schema: SCRIPT_SCHEMA }
  ),

  // CHẶNG 2 — THUMBNAIL
  (script, slug) => agent(
    `${CTX}\n\n${THUMB_SPEC}\n\nNHIỆM VỤ: tạo/soát thumbnail cho slug "${slug}".
Bối cảnh từ chặng script: layout đề xuất = "${script?.thumbLayout || 'question'}", góc kể = "${script?.angle || ''}".
1. Read landing/video/videos/${slug}/content.py để lấy beat mở làm hook.
2. Nếu đã có thumb.json: Read, kiểm layout HỢP LỆ + field đủ + hook khớp beat mở; sai thì sửa (action "refined"), ổn thì giữ (action "kept"). Chưa có: viết mới (action "created").
3. Chọn layout khớp NỘI DUNG (đừng ép chart nếu không có preset phù hợp). Hook cực ngắn, đọc 1 giây hiểu.
4. Ghi bằng Write vào landing/video/videos/${slug}/thumb.json (JSON hợp lệ, không comment).
Trả về {slug, layout, action, hook}.`,
    { label: `thumb:${slug.slice(0, 16)}`, phase: 'Thumbnail', schema: THUMB_SCHEMA }
  ),

  // CHẶNG 3 — REVIEW LOOP (tối đa 2 vòng soát-sửa)
  async (thumb, slug) => {
    let v = await reviewOnce(slug, 1);
    if (v && !v.pass) v = await reviewOnce(slug, 2); // rớt vòng 1 -> sửa & soát lại
    return {
      slug,
      thumbLayout: thumb?.layout || null,
      pass: !!(v && v.pass),
      score: (v && v.score) || 0,
      issues: (v && v.issues) || ['review lỗi/không trả kết quả'],
    };
  }
);

// ---- Bàn giao: chỉ nêu rõ cái ĐẠT vs cái CẦN MẮT NGƯỜI ----
const done = results.filter(Boolean);
const ready = done.filter(r => r.pass);
const needsEye = done.filter(r => !r.pass);
log(`Bàn giao: ${ready.length}/${done.length} đạt chuẩn giọng, ${needsEye.length} cần user xem.`);
return {
  batch: SLUGS,
  reviewed: done.length,
  readyForUser: ready.map(r => ({ slug: r.slug, thumbLayout: r.thumbLayout, score: r.score })),
  needsHumanEye: needsEye.map(r => ({ slug: r.slug, score: r.score, issues: r.issues })),
  note: 'content.py + thumb.json đã ghi tại video/videos/<slug>/. CHƯA gen thumbnail PNG, CHƯA render (chờ user duyệt + nói "render").',
};
