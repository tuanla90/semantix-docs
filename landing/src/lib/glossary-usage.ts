// Logic dùng chung: tìm MỌI bài blog có dùng một thuật ngữ từ điển.
//
// Ý tưởng: mỗi thuật ngữ có một bộ "match" (các cụm cần tìm, cả tiếng Anh lẫn
// tiếng Việt). Ta chuẩn hoá (bỏ dấu, thường hoá) nội dung từng bài rồi kiểm tra
// có khớp ranh giới từ không. Trả về danh sách bài cho mỗi thuật ngữ.
//
// Trang Từ điển (tu-dien-thuat-ngu.astro) gọi computeUsage() lúc build để hiển
// thị "Xuất hiện trong: …" — tự cập nhật mỗi khi nội dung blog đổi.

export interface GlossaryTerm {
  t: string;          // thuật ngữ
  ab?: string;        // dạng viết tắt/đầy đủ
  vi?: string;        // nghĩa tiếng Việt
  slug?: string;      // bài định nghĩa chính (tùy chọn)
  match?: string[];   // các cụm cần tìm; nếu bỏ trống → mặc định [t, ab]
}

export interface PostLike {
  slug: string;
  body?: string;
  data: { title: string; description?: string };
}

export interface UsageHit { slug: string; title: string; primary: boolean }

/** Bỏ dấu tiếng Việt + thường hoá để so khớp không phụ thuộc dấu. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');
}

/** Regex khớp một cụm theo ranh giới "từ" (tránh khớp lọt giữa chữ). */
function phraseRegex(phrase: string): RegExp {
  const p = normalize(phrase).trim();
  const esc = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // ranh giới: không phải chữ/số ngay trước & sau (cho phép dấu cách, gạch…)
  return new RegExp(`(?<![a-z0-9])${esc}(?![a-z0-9])`, 'i');
}

/**
 * Acronym = chữ in HOA 2–5 ký tự (CAC, DAU, MAU, ROAS…). Khi bỏ dấu, các từ này
 * dễ trùng từ tiếng Việt thường gặp ("CAC"→"cac"="các", "DAU"→"dau"="đâu/đầu").
 * Nên acronym phải khớp ĐÚNG HOA, KHÔNG bỏ dấu.
 */
function isAcronym(p: string): boolean {
  return /^[A-Z][A-Z0-9]{1,4}$/.test(p.trim());
}

/** Regex acronym: khớp đúng hoa, theo ranh giới từ, KHÔNG dùng cờ 'i'. */
function acronymRegex(phrase: string): RegExp {
  const esc = phrase.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![A-Za-z0-9])${esc}(?![A-Za-z0-9])`);
}

/** Các cụm cần tìm cho một thuật ngữ. */
function patternsFor(term: GlossaryTerm): string[] {
  if (term.match && term.match.length) return term.match;
  return [term.t, term.ab].filter(Boolean) as string[];
}

/**
 * Trả về Map: thuật ngữ (t) -> danh sách bài có dùng (đã sắp: bài primary trước,
 * còn lại theo ngày mới nhất nếu posts được truyền vào theo thứ tự đó).
 */
export function computeUsage(
  terms: GlossaryTerm[],
  posts: PostLike[],
): Map<string, UsageHit[]> {
  const docs = posts.map(p => {
    const raw = `${p.data.title} ${p.data.description ?? ''} ${p.body ?? ''}`;
    return { slug: p.slug, title: p.data.title, raw, text: normalize(raw) };
  });

  const map = new Map<string, UsageHit[]>();
  for (const term of terms) {
    const patterns = patternsFor(term);
    // Acronym (CAC, DAU…) khớp đúng hoa trên text gốc; cụm thường khớp đã bỏ dấu.
    const normRe = patterns.filter(p => !isAcronym(p)).map(phraseRegex);
    const acroRe = patterns.filter(isAcronym).map(acronymRegex);
    const hits: UsageHit[] = [];
    for (const d of docs) {
      if (normRe.some(r => r.test(d.text)) || acroRe.some(r => r.test(d.raw))) {
        hits.push({ slug: d.slug, title: d.title, primary: d.slug === term.slug });
      }
    }
    // Bài primary lên đầu.
    hits.sort((a, b) => Number(b.primary) - Number(a.primary));
    map.set(term.t, hits);
  }
  return map;
}

/** Nhãn ngắn cho link (lấy phần trước dấu ":" cho gọn). */
export function shortLabel(title: string): string {
  const cut = title.split(/[:—]/)[0].trim();
  return cut.length >= 6 ? cut : title;
}
