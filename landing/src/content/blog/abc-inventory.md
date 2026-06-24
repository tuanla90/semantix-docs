---
title: "ABC inventory: 20% mã hàng giữ 80% vốn tồn — đừng quản như nhau"
code: "pt-015"
description: "Mỗi cuối tháng bạn đếm sạch cả nghìn mã hàng như nhau. Nhưng đa số chúng chỉ giữ vài phần trăm vốn. Bạn đang đổ công vào đúng chỗ ít quan trọng nhất."
pubDate: 2027-10-12
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/abc-inventory.svg"
coverAlt: "Đường tích luỹ Pareto chia kho hàng thành ba vùng A, B, C theo giá trị vốn tồn"
---

Cuối tháng, một cửa hàng tạp hoá lớn ở Cần Thơ đóng cửa nửa ngày để kiểm kê. Chủ shop và ba nhân viên đếm từng món: từ thùng bia, lốc sữa, tới từng gói tăm, viên kẹo, cái kẹp tóc lẻ. Hơn 2.000 mã hàng, đếm như nhau, kỹ như nhau. Mất trọn buổi sáng, vẫn lệch sổ.

Đây là nghịch lý ít người chịu nhìn: **bạn đang dồn công sức ngang nhau cho mọi mã hàng — trong khi giá trị của chúng lệch nhau cả trăm lần.** Cái thùng bia giữ vài triệu tiền vốn được đếm đúng một lần, ngang với gói tăm 2.000 đồng cũng đếm một lần. Đếm kỹ gói tăm chẳng cứu được đồng nào; nhưng nửa thùng bia "bốc hơi" thì mất tiền thật — mà nó lại chìm nghỉm trong cái danh sách 2.000 dòng.

Cách thoát ra không phải đếm nhanh hơn, mà là **thôi quản mọi mã như nhau.** Đó chính là **ABC inventory** (phân loại tồn kho theo giá trị — chia mã hàng thành ba hạng A, B, C tuỳ mức vốn chúng đang giữ). Bài này chỉ bạn cách chia, và quan trọng hơn: mỗi hạng nên được quản khác nhau ra sao.

## ABC inventory là gì — và vì sao nó là Pareto của cái kho

Nếu bạn đã đọc [Pareto 80/20](/blog/pareto-80-20/), bạn sẽ thấy quen ngay. **Pareto** (nguyên lý 80/20 — phần lớn kết quả đến từ một thiểu số nguyên nhân) áp vào kho hàng cho ra một sự thật gần như luôn đúng: **một nhúm nhỏ mã hàng giữ phần lớn vốn tồn, còn lại là cái đuôi dài rất nhiều mã nhưng giá trị bé tí.**

**Phân loại ABC** chỉ là việc đặt tên cho ba khúc của cái đuôi đó:

- **Nhóm A** — số ít **SKU** (Stock Keeping Unit — mã hàng tồn kho, từng biến thể cụ thể: sữa hộp 180ml là một SKU, 110ml là SKU khác) nhưng gánh ~70–80% **vốn tồn** (số tiền đang nằm chết trong hàng tồn).
- **Nhóm B** — tầm giữa, vài chục phần trăm mã, giữ ~15% vốn.
- **Nhóm C** — đông đảo nhất về số mã, nhưng cộng lại chỉ chừng 5% vốn.

Lưu ý phân biệt: bài [dự báo tồn kho thực chiến](/blog/du-bao-ton-kho-thuc-chien/) đã nhắc ABC để chia *công sức dự báo*. Ở đây ta đào sâu một bước: ABC không chỉ quyết bạn dự báo mã nào kỹ, mà quyết **toàn bộ chính sách quản kho** — đếm bao lâu một lần, để đệm bao nhiêu, ai được duyệt đơn.

## Cách chia: bốn bước, không cần công thức cao siêu

Bạn không cần phần mềm đắt tiền. Chỉ cần một bảng tính và lịch sử bán một năm.

1. **Tính giá trị từng mã.** Phổ biến nhất là *giá trị tiêu thụ năm* = số lượng bán cả năm × giá vốn mỗi đơn vị. (Có nơi dùng *vốn tồn bình quân* thay vì lượng bán — chọn cái phản ánh đúng "tiền của bạn đang nằm ở đâu".)
2. **Xếp giảm dần** theo giá trị đó, mã đắt nhất lên đầu.
3. **Tính tỉ lệ tích luỹ.** Cộng dồn từ trên xuống: mã 1 chiếm bao nhiêu % tổng, mã 1+2 bao nhiêu, cứ thế tới 100%.
4. **Cắt A/B/C** theo mốc tích luỹ: tới ~80% là nhóm A, từ 80% tới ~95% là B, phần còn lại là C.

Đường tích luỹ ấy trông như thế này — dốc đứng ở đầu (vài mã đã nuốt gần hết vốn) rồi bẹt dần về sau:

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <line x1="64" y1="36" x2="64" y2="248" stroke="#94A3B8" stroke-width="2"/>
  <line x1="64" y1="248" x2="648" y2="248" stroke="#94A3B8" stroke-width="2"/>
  <text x="20" y="46" fill="#64748B" font-size="11">% vốn tồn</text>
  <text x="654" y="58" fill="#16a34a" font-size="11" font-weight="700">100%</text>
  <rect x="64" y="36" width="140" height="212" fill="#22c55e" opacity="0.12"/>
  <rect x="204" y="36" width="160" height="212" fill="#f59e0b" opacity="0.10"/>
  <rect x="364" y="36" width="284" height="212" fill="#94a3b8" opacity="0.10"/>
  <line x1="64" y1="84" x2="648" y2="84" stroke="#4ade80" stroke-width="1.5" stroke-dasharray="6 5"/>
  <text x="654" y="88" fill="#16a34a" font-size="10" font-weight="700">80%</text>
  <line x1="64" y1="58" x2="648" y2="58" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="654" y="118" fill="#b45309" font-size="10" font-weight="700">95%</text>
  <line x1="64" y1="114" x2="648" y2="114" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="6 5"/>
  <polyline points="64,248 92,150 120,108 148,90 176,84 204,80 260,72 320,64 364,60 440,57 520,56 600,56 648,56" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <circle cx="176" cy="84" r="4.5" fill="#22c55e"/>
  <circle cx="364" cy="60" r="4.5" fill="#f59e0b"/>
  <text x="120" y="280" fill="#16a34a" font-size="12" font-weight="800" text-anchor="middle">A</text>
  <text x="120" y="296" fill="#16a34a" font-size="9.5" text-anchor="middle">~20% mã · 80% vốn</text>
  <text x="284" y="280" fill="#b45309" font-size="12" font-weight="800" text-anchor="middle">B</text>
  <text x="284" y="296" fill="#b45309" font-size="9.5" text-anchor="middle">~30% mã · 15% vốn</text>
  <text x="500" y="280" fill="#64748B" font-size="12" font-weight="800" text-anchor="middle">C</text>
  <text x="500" y="296" fill="#64748B" font-size="9.5" text-anchor="middle">~50% mã · 5% vốn</text>
  <text x="350" y="316" fill="#475569" font-size="11" text-anchor="middle">số mã hàng xếp theo giá trị giảm dần →</text>
</svg>
<div class="viz-caption">Đường tích luỹ vốn tồn: dốc đứng ở vùng A (vài mã chạm 80% vốn), bẹt dần qua B, gần như nằm ngang ở C. Ba vùng màu là ba hạng cần ba chính sách khác nhau. *(số liệu minh hoạ)*</div>
</div>

Mốc 80/95 không thiêng — như Pareto, đó là điểm khởi đầu, bạn đọc đường cong của *chính mình* rồi cắt ở chỗ độ dốc gãy.

## Ba nhóm, ba chính sách — đây mới là phần đáng tiền

Chia xong mà vẫn quản như nhau thì chia làm gì. Giá trị thật của ABC inventory nằm ở chỗ **mỗi nhóm có một bộ quy tắc riêng**: đếm bao lâu một lần, để **tồn an toàn** (lượng hàng đệm phòng khi bán nhanh hơn dự báo hoặc hàng về trễ) dày bao nhiêu, và ai có quyền duyệt đặt hàng.

| Nhóm | % số mã / % vốn | Tần suất kiểm kê | Tồn an toàn & dự báo | Ai duyệt đặt hàng |
|---|---|---|---|---|
| **A** | ~20% mã / ~80% vốn | Đếm thường (tuần / 2 tuần) | Mỏng, sát; dự báo kỹ từng SKU theo mùa vụ | Chủ / quản lý duyệt từng đơn |
| **B** | ~30% mã / ~15% vốn | Đếm định kỳ (tháng) | Vừa phải; rà mỗi tháng | Quản lý duyệt theo hạn mức |
| **C** | ~50% mã / ~5% vốn | Đếm thưa (quý) | Dày, gom đặt; quy tắc gọn | Tự động / nhân viên đặt theo quy tắc |

Đọc bảng này theo một logic duy nhất: **công sức đi theo tiền.** Mã A giữ nhiều vốn nên một sai lệch nhỏ cũng là tiền lớn — đếm thường, để tồn mỏng (vốn đắt, đừng chôn), dự báo kỹ. Mã C giữ ít vốn nên đếm kỹ là phí công; thay vào đó để **tồn an toàn** dày và *gom đặt một lần cho nhiều mã* để khỏi tốn công đặt lẻ — thà ôm dư vài hộp tăm còn hơn mất buổi sáng đi đếm chúng.

## Bốn cái bẫy khiến ABC phản tác dụng

ABC inventory đơn giản tới mức dễ bị dùng ẩu. Bốn chỗ trượt chân hay gặp nhất:

**1. ABC theo doanh thu ≠ ABC theo lợi nhuận.** Một mã bán chạy nhưng biên mỏng dính (đại hạ giá kéo khách) có thể leo lên nhóm A về doanh thu, trong khi một mã bán chậm biên 50% mới là con bò sữa thật. Nếu bạn chăm nhóm A theo doanh thu, bạn đang canh giữ nhầm két. Khi quyết "giữ/bỏ" hay "ưu tiên vốn", hãy chạy ABC trên *lợi nhuận gộp*, đừng chỉ doanh thu.

**2. Đừng bỏ bê nhóm C nếu nó kéo khách.** Đây là bài học **long tail** (cái đuôi dài — rất nhiều mã giá trị nhỏ) từ Pareto: một mã C giá trị vốn cỏn con vẫn có thể là *lý do khách ghé cửa hàng*, hoặc món luôn được mua kèm hàng A. Bỏ nó, bạn mất cả giỏ hàng. "Quản nhẹ" nghĩa là *ít tốn công đếm*, không phải *được phép để hết hàng*. Một mã C hết liên miên mà khách cần đều thì nó không còn là C đúng nghĩa.

**3. ABC chỉ nhìn tiền, chưa nhìn vai trò.** Tiền không phải thước đo duy nhất. Một mã rẻ nhưng là *linh kiện sống còn* (cái remote đi kèm tivi, viên pin cho món hàng A) đáng được quản như A dù giá trị tồn bé. Nhiều nơi gắn thêm chiều "độ quan trọng chiến lược" tạo thành ma trận — đừng để công thức tiền che mất những mã không thể thiếu.

**4. Chia một lần rồi quên.** Hàng theo trend, hàng mùa vụ trồi sụt — một mã C tháng này có thể thành A mùa Tết. ABC phải được chạy lại định kỳ (quý / nửa năm), không phải dán nhãn vĩnh viễn.

## ABC inventory với Semantix

Tự tay làm ABC inventory cho 2.000 mã — kéo lịch sử bán một năm, nhân với giá vốn, xếp hạng, tính tích luỹ, cắt A/B/C, rồi lặp trên cả doanh thu *lẫn* lợi nhuận, rồi chạy lại mỗi quý — là nhiều buổi vật lộn với bảng tính và công thức hay gãy.

Semantix không phải chatbot cắm vào database rồi đoán mò. Bạn định nghĩa "giá vốn", "lợi nhuận gộp", "mã hàng" một lần trong tầng định nghĩa chung, rồi hỏi bằng tiếng Việt:

> **"Phân loại ABC toàn bộ mã hàng theo giá trị tiêu thụ 12 tháng qua. Nhóm A gồm những mã nào, và trong đó mã nào có biên lợi nhuận thấp đáng ngờ?"**

Semantix hiểu "phân loại ABC", "giá trị tiêu thụ", "biên lợi nhuận" trong ngữ cảnh dữ liệu của bạn, tự xếp hạng và cắt nhóm — để bạn dồn công đúng vào nhúm mã đang giữ phần lớn vốn, thay vì đếm gói tăm tới trưa.

## Tóm lại

| Quản mọi mã như nhau | Quản theo ABC inventory |
|---|---|
| Đếm cả 2.000 mã kỹ ngang nhau | Đếm A thường, B định kỳ, C thưa |
| Tồn an toàn cào bằng | A mỏng & sát, C dày & gom đặt |
| Xếp hạng theo doanh thu | Xếp theo lợi nhuận gộp, không chỉ doanh thu |
| Bỏ bê nhóm C cho gọn | Giữ mã C nếu nó kéo khách / mua kèm |
| Chia một lần rồi quên | Chạy lại mỗi quý, theo mùa vụ |

> Mental model để mang theo: **công sức đi theo tiền, không đi theo số dòng.** Cái kho không cần bạn đếm đều tay — nó cần bạn canh chặt chỗ nhiều vốn và buông lỏng chỗ ít vốn. Phân loại ABC chỉ là cách viết ra điều đó thành lịch kiểm kê.

---

*Muốn biết 20% mã hàng nào đang giữ 80% vốn tồn của bạn — và mã A nào đang âm thầm lỗ? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Liên quan: [Pareto 80/20](/blog/pareto-80-20/) cho tư duy gốc, và [dự báo tồn kho thực chiến](/blog/du-bao-ton-kho-thuc-chien/) để biến nhóm A thành đơn đặt hàng.*
