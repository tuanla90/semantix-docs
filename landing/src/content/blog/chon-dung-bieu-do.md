---
title: "Chọn đúng biểu đồ: khi nào cột, đường, tròn, scatter — và vì sao đừng lạm dụng pie"
code: "hd-005"
series: "truc-quan-hoa"
seriesOrder: 1
description: "Một con số đúng vẫn kể sai câu chuyện nếu bạn vẽ nhầm loại biểu đồ. Mắt người đọc góc kém — pie nói dối êm ru. Phần 1 của series: chọn chart theo câu hỏi."
pubDate: 2025-08-06
category: "Hướng Dẫn Thực Chiến"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/chon-dung-bieu-do.svg"
coverAlt: "Vài loại biểu đồ cột, đường, tròn kèm dấu tick và dấu x cho loại nên và không nên dùng"
---

<div class="series-nav">
  <div class="series-nav-title">📊 Series Trực quan hoá &amp; kể chuyện · 4 phần</div>
  <ol>
    <li class="current">Phần 1 — Chọn đúng biểu đồ</li>
    <li><a href="/blog/chart-junk-toi-gian/">Phần 2 — Chart junk: bớt mực, tăng nghĩa</a></li>
    <li><a href="/blog/dashboard-hanh-dong-duoc/">Phần 3 — Dashboard hành động được</a></li>
    <li><a href="/blog/trinh-bay-so-cho-sep/">Phần 4 — Trình bày số cho sếp</a></li>
  </ol>
</div>

Bạn vừa kéo ra một con số hoàn toàn chính xác: doanh thu 6 kênh bán tháng vừa rồi. Bạn quẳng nó vào một biểu đồ tròn cho "đẹp mắt". Và đây là chỗ ngược đời ít người chịu tin: **con số đúng tuyệt đối đó vừa bắt đầu kể một câu chuyện sai.**

Vì sao? Vì mắt người đọc *góc* và *diện tích* rất tệ. Hai lát bánh 23% và 26% trông gần như y hệt — sếp bạn liếc qua, kết luận "hai kênh ngang nhau", rồi chia ngân sách 50/50. Cùng dữ liệu đó vẽ thành cột, chênh lệch lộ ra ngay trong một giây. Số không đổi. Quyết định đổi hẳn.

Phản xạ chọn biểu đồ của hầu hết mọi người là chọn cái *nhìn cho sang*. Đó là tư duy ngược. **Loại biểu đồ không phục vụ con mắt — nó phục vụ một câu hỏi.** Bài này cho bạn một quy tắc gọn để mỗi lần dựng chart, bạn hỏi đúng một câu trước, rồi loại chart tự lộ ra.

## Quy tắc nền tảng: một biểu đồ = một câu hỏi

Trước khi bàn cột hay đường, hãy ghim quy tắc này: **mỗi biểu đồ chỉ nên trả lời đúng một câu hỏi.** Không phải "cho tôi xem tất cả về doanh thu" — mà là "kênh nào bán nhiều nhất tháng này?" hoặc "doanh thu đang lên hay xuống?". Hai câu khác nhau là hai biểu đồ khác nhau, kể cả khi chúng dùng chung một bảng dữ liệu.

Khi bạn ép một chart trả lời ba câu cùng lúc, nó trả lời cả ba một cách lờ mờ. Người xem phải dừng lại *giải mã* thay vì *đọc ra*. Một biểu đồ tốt không cần chú thích dài — nhìn 3 giây là thấy câu trả lời.

Vậy câu hỏi của bạn thuộc loại nào? Gần như mọi câu hỏi kinh doanh rơi vào năm nhóm dưới đây — và mỗi nhóm có một loại chart "mặc định".

## Câu hỏi → loại biểu đồ nên dùng

| Bạn muốn trả lời câu hỏi gì? | Loại biểu đồ nên dùng | Vì sao |
|---|---|---|
| **So sánh** các hạng mục (kênh, sản phẩm, chi nhánh) | **Cột** (column) | Mắt so chiều cao rất tốt; chênh lệch hiện ngay |
| Nhiều hạng mục, **nhãn dài** (tên SP, tên tỉnh) | **Thanh ngang** (bar) | Nhãn nằm ngang dễ đọc, không bị xoay nghiêng |
| **Xu hướng theo thời gian** (doanh thu 12 tháng) | **Đường** (line) | Đường nối nhấn vào *chiều biến thiên* lên/xuống |
| **Quan hệ giữa 2 biến** (giá vs số đơn) | **Scatter** (phân tán) | Mỗi điểm là một quan sát; lộ ra tương quan/cụm |
| **Con số chính xác** cần tra cứu | **Bảng** (table) | Khi người đọc cần *đọc đúng số*, không phải ước lượng |

Chú giải nhanh các từ trong bảng: **trục** (axis — đường gốc ngang/dọc để đặt giá trị lên); **biến** (variable — một đại lượng thay đổi, ví dụ "giá" hay "số đơn"); **scatter** (scatter plot — biểu đồ phân tán, mỗi chấm là một điểm dữ liệu đặt theo hai trục). Giờ đi vào từng loại với ví dụ Việt.

## Cột — khi bạn muốn so sánh hạng mục

Đây là loại chart "ngựa thồ" của mọi dashboard. Bạn có 5–6 kênh bán (Shopee, TikTok Shop, KiotViet, website, cửa hàng) và muốn biết kênh nào dẫn đầu — cột trả lời tức thì. Mắt người so *chiều cao* cực giỏi, nên chênh lệch 18% và 24% hiện rõ mồn một.

Mẹo: **luôn sắp cột theo thứ tự giá trị** (cao xuống thấp), trừ khi trục có thứ tự tự nhiên như tháng. Một dãy cột xếp lộn xộn bắt người xem phải tự tìm cái cao nhất — bạn vừa giao việc cho mắt họ một cách vô ích.

## Thanh ngang — khi nhãn dài hoặc nhiều hạng mục

Cùng là "so sánh", nhưng khi tên hạng mục dài — "Áo thun cotton form rộng", "Combo quà Tết cao cấp" — hoặc khi bạn có 12–15 hạng mục, hãy *xoay cột nằm xuống* thành thanh ngang. Lý do thuần thực dụng: nhãn nằm ngang đọc thẳng, không phải nghiêng đầu; và danh sách dài cuộn dọc tự nhiên hơn cột chen chúc theo chiều ngang.

Quy tắc bỏ túi: **5 hạng mục trở xuống, nhãn ngắn → cột; nhiều hơn hoặc nhãn dài → thanh ngang.**

## Đường — khi bạn muốn thấy xu hướng

Khi trục ngang là *thời gian* — 12 tháng, 8 quý, 30 ngày — đường là vua. Đường nối các điểm tạo ra một hình dạng mà mắt đọc thành "đang lên", "chững lại", "rơi sau Tết". Đó là điều cột không kể tốt bằng: cột rời rạc nhấn vào *từng cột*, còn đường nhấn vào *chuyển động giữa các điểm*.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect width="680" height="300" fill="transparent"/>
  <text x="24" y="34" fill="var(--text, #1e293b)" font-size="16" font-weight="700">Doanh thu 6 tháng — cùng dữ liệu, hai cách kể</text>
  <text x="24" y="74" fill="var(--muted, #64748b)" font-size="13" font-weight="600">CỘT: từng tháng riêng lẻ</text>
  <g transform="translate(24,90)">
    <line x1="0" y1="120" x2="280" y2="120" stroke="var(--border, #cbd5e1)" stroke-width="1.5"/>
    <rect x="6" y="70" width="32" height="50" rx="3" fill="#22D3EE"/>
    <rect x="52" y="52" width="32" height="68" rx="3" fill="#22D3EE"/>
    <rect x="98" y="60" width="32" height="60" rx="3" fill="#22D3EE"/>
    <rect x="144" y="36" width="32" height="84" rx="3" fill="#22D3EE"/>
    <rect x="190" y="44" width="32" height="76" rx="3" fill="#22D3EE"/>
    <rect x="236" y="18" width="32" height="102" rx="3" fill="#22D3EE"/>
  </g>
  <text x="376" y="74" fill="var(--muted, #64748b)" font-size="13" font-weight="600">ĐƯỜNG: xu hướng đi lên hiện rõ</text>
  <g transform="translate(376,90)">
    <line x1="0" y1="120" x2="280" y2="120" stroke="var(--border, #cbd5e1)" stroke-width="1.5"/>
    <polyline points="22,86 68,64 114,72 160,48 206,56 252,30" fill="none" stroke="#34D399" stroke-width="3"/>
    <circle cx="22" cy="86" r="4" fill="#34D399"/>
    <circle cx="68" cy="64" r="4" fill="#34D399"/>
    <circle cx="114" cy="72" r="4" fill="#34D399"/>
    <circle cx="160" cy="48" r="4" fill="#34D399"/>
    <circle cx="206" cy="56" r="4" fill="#34D399"/>
    <circle cx="252" cy="30" r="5" fill="#34D399"/>
  </g>
  <text x="24" y="288" fill="var(--muted, #64748b)" font-size="12">Hỏi "tháng nào cao nhất?" → cột. Hỏi "đang lên hay xuống?" → đường.</text>
</svg>
<div class="viz-caption">Cùng 6 con số doanh thu. Cột trả lời "tháng nào", đường trả lời "xu hướng". Câu hỏi quyết định loại chart, không phải ngược lại.</div>
</div>

Đừng dùng đường cho dữ liệu *không có thứ tự* — nối "Shopee → TikTok → KiotViet" bằng một đường là vô nghĩa, vì giữa hai kênh không có "khoảng cách" nào để đường biểu diễn. Đường chỉ đúng khi trục ngang có thứ tự liên tục.

## Scatter — khi bạn nghi có quan hệ giữa hai con số

Đây là loại ít người dùng nhất, mà lại mở ra nhiều insight nhất. Bạn nghi "giảm giá càng sâu thì đơn càng nhiều" — nhưng có thật không? Vẽ mỗi sản phẩm thành một chấm: trục ngang là mức giảm giá, trục dọc là số đơn. Nếu các chấm xếp thành một dải đi lên, có tương quan. Nếu chúng vung vãi khắp nơi, mối quan hệ bạn tưởng tượng *không tồn tại*.

Scatter là công cụ để **kiểm tra một giả định**, không phải để báo cáo một con số. Mỗi lần bạn nói "hình như A liên quan đến B", một biểu đồ phân tán sẽ xác nhận hoặc bác bỏ trong vài giây.

## Vì sao đừng lạm dụng pie (biểu đồ tròn)

Giờ đến lý do bài này tồn tại. Biểu đồ tròn (pie chart) không phải lúc nào cũng sai — nhưng nó bị lạm dụng nhiều nhất, và đây là cơ chế:

- **Mắt người đọc góc và diện tích rất kém.** Bạn so chiều cao hai cột chính xác đến vài phần trăm, nhưng so hai lát bánh 22% với 27% thì gần như chịu. Cái khác biệt quan trọng nhất — *ai hơn ai bao nhiêu* — chính là cái pie giấu đi.
- **Quá 3–4 lát là rối loạn.** Một cái bánh 7 lát với 7 màu buộc người xem liên tục liếc xuống chú thích để dịch màu ra tên. Họ đọc *bảng màu*, không đọc *dữ liệu*.
- **Không so được hai thời điểm.** Hai cái bánh cạnh nhau (tháng này / tháng trước) gần như không thể đối chiếu bằng mắt.

> Quy tắc vàng: pie chỉ ổn khi có **2–3 lát** và bạn chỉ muốn nói "phần này chiếm *đa số*". Còn lại — muốn so sánh, muốn xếp hạng, muốn thấy chênh lệch — hãy thay bằng **cột hoặc thanh ngang.** Cùng câu chuyện cơ cấu sản phẩm, một dãy thanh ngang xếp từ cao xuống thấp luôn dễ đọc hơn một cái bánh nhiều lát.

Ví dụ thật hay gặp: "cơ cấu doanh thu theo 8 nhóm sản phẩm". Phản xạ là vẽ pie. Nhưng 8 lát thì người xem chẳng đọc ra nhóm nào hạng 3, hạng 4. Đổi thành 8 thanh ngang xếp theo giá trị — thứ hạng hiện ra tức thì, và bạn còn ghi được con số ở cuối mỗi thanh.

## Bảng — khi người đọc cần con số chính xác

Đừng quên loại "biểu đồ" khiêm tốn nhất: cái bảng. Khi mục tiêu là để ai đó *tra đúng con số* — kế toán đối chiếu, sếp muốn biết chính xác 4,12 tỷ chứ không phải "khoảng 4 tỷ" — thì mọi biểu đồ đều thua một bảng gọn. Chart để *thấy hình dạng*; bảng để *đọc giá trị*. Nếu cần một dashboard kết hợp cả số tra cứu lẫn biểu đồ xu hướng, hãy xem cách dựng nhanh trong [Từ Google Sheets đến dashboard trong 15 phút](/blog/google-sheets-dashboard/).

## Một bước trước khi chọn chart: bạn đang đo cái gì?

Chọn đúng loại biểu đồ chỉ là nửa sau. Nửa trước là biết rõ bạn đang vẽ một **metric** (chỉ số đo lường) cắt theo **dimension** (chiều phân tích) nào — "doanh thu" theo "kênh", hay theo "tháng"? Hai cách cắt cho hai chart khác nhau. Nếu phần này còn mờ, đọc lại [Metric, dimension, KPI — ba từ bạn phải phân biệt](/blog/metric-dimension-kpi/) trước, rồi quay lại bảng tra ở trên. Khi bạn biết *câu hỏi* và biết *metric × dimension*, loại biểu đồ gần như tự chọn.

## Trong Semantix

Bạn không phải nhớ bảng tra này mỗi lần. Khi bạn hỏi bằng tiếng Việt — *"doanh thu từng kênh tháng này"* — Semantix nhận ra đây là câu **so sánh hạng mục** và mặc định trả về **cột**, không phải pie. Hỏi *"doanh thu 12 tháng qua"* → nó hiểu là **xu hướng theo thời gian** và vẽ **đường**. Đây không phải một công cụ vẽ chart để bạn tự chọn loại rồi tự chịu trách nhiệm chọn sai — mà là một lớp hiểu *ý định* của câu hỏi, rồi khớp với loại biểu đồ trả lời đúng câu đó. Bạn vẫn đổi được loại nếu muốn, nhưng mặc định đã đúng ngay từ đầu.

## Tóm lại

| Phản xạ thường gặp | Cách làm đúng |
|---|---|
| Chọn chart "cho đẹp" | Chọn chart theo *câu hỏi* cần trả lời |
| Nhồi mọi thứ vào một biểu đồ | Một biểu đồ = một câu hỏi |
| Pie cho mọi thứ "có cơ cấu" | Pie chỉ 2–3 lát; còn lại dùng cột/thanh |
| Đường cho mọi danh sách | Đường chỉ khi trục ngang là thời gian |
| Chart để khoe con số chính xác | Cần số chính xác → dùng bảng |

> **Mental model:** đừng hỏi "biểu đồ nào đẹp?" — hãy hỏi "người xem cần đọc ra *điều gì* trong 3 giây?". Trả lời được câu đó, loại biểu đồ tự lộ ra. Đẹp là hệ quả của đúng, không phải mục tiêu.

---

*Muốn để công cụ tự chọn đúng loại biểu đồ cho mỗi câu hỏi tiếng Việt? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 2 — Chart junk: bớt mực, tăng nghĩa](/blog/chart-junk-toi-gian/) để học cách lột sạch trang trí thừa khỏi biểu đồ bạn vừa chọn.*
