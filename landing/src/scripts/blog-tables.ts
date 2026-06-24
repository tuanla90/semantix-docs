/**
 * Blog tables — nâng cấp bảng markdown sang phong cách Semantix data-table:
 *  - Ô delta có dấu (+22%, −3%, +1.2tr) → hiển thị dạng CHIP (xanh tăng / đỏ giảm).
 *  - Ô số → canh phải + chữ số đều bề ngang (tabular-nums).
 *  - Số nguyên trần rất lớn (≥ 5 chữ số) → thêm dấu phân cách hàng nghìn.
 *
 * An toàn: KHÔNG đụng ô có markup (link, đậm…), không reformat số đã có chữ/đơn vị
 * (vd "1,8 tỷ", "22%") để tránh phá nội dung viết tay; năm 4 chữ số không bị format.
 */

// Chip: dấu +/−/- rồi tới số (có thể kèm . , % và 1 hậu tố chữ ngắn như tr/k/%).
const CHIP_RE = /^([+\-−])\s?(\d[\d.,]*)\s?(%|tr|k|đ|tỷ|đồng)?$/i;
// Số "thuần" để canh phải: chữ số + . , và % tùy chọn.
const NUM_RE = /^\d[\d.,]*\s?%?$/;

function enhanceTable(tbl: HTMLTableElement) {
  const bodyRows = Array.from(tbl.querySelectorAll<HTMLTableRowElement>('tbody tr'));
  if (!bodyRows.length) return;
  const numericCount: number[] = [];

  bodyRows.forEach((tr) => {
    Array.from(tr.children).forEach((cell, ci) => {
      const td = cell as HTMLElement;
      if (td.querySelector('*')) return; // có link/đậm/markup → bỏ qua
      const t = (td.textContent || '').trim();
      if (!t || t === '—' || t === '-') return;

      const chip = t.match(CHIP_RE);
      if (chip) {
        const up = chip[1] === '+';
        const span = document.createElement('span');
        span.className = `cell-chip ${up ? 'up' : 'down'}`;
        span.textContent = t.replace(/^-/, '−'); // hyphen → dấu trừ thật
        td.textContent = '';
        td.appendChild(span);
        td.classList.add('num');
        numericCount[ci] = (numericCount[ci] || 0) + 1;
        return;
      }

      // Canh phải ô giá trị: bắt đầu bằng số (cho phép ~/≈), ô ngắn (tránh câu văn dài).
      if (/^[~≈]?\s?\d/.test(t) && t.length <= 24) {
        if (NUM_RE.test(t) && /^\d{5,}$/.test(t)) td.textContent = Number(t).toLocaleString('vi-VN');
        td.classList.add('num');
        numericCount[ci] = (numericCount[ci] || 0) + 1;
      }
    });
  });

  // Canh phải header của cột chủ yếu là số (bỏ cột đầu — thường là nhãn)
  const ths = Array.from(tbl.querySelectorAll<HTMLElement>('thead th'));
  numericCount.forEach((c, ci) => {
    if (ci > 0 && c >= bodyRows.length / 2) ths[ci]?.classList.add('num');
  });
}

function run() {
  document.querySelectorAll<HTMLTableElement>('.post-content table').forEach(enhanceTable);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
else run();
