---
title: "Thống kê cho người làm kinh doanh (Phần 2): độ tin cậy & p-value nói gì (và không nói gì)"
code: "kt-025"
series: "thong-ke-kinh-doanh"
seriesOrder: 2
description: "p-value 0,03 - vậy 97% là bạn đúng? Sai. Đó là một trong những hiểu lầm tốn tiền nhất phòng họp. Phần 2 của series: đọc đúng độ tin cậy."
pubDate: 2025-01-17
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/do-tin-cay-p-value.svg"
coverAlt: "Điểm ước lượng tỉ lệ chuyển đổi kèm hai thanh khoảng tin cậy: một dải rộng khi mẫu nhỏ và một dải hẹp khi mẫu lớn"
---

<div class="series-nav">
  <div class="series-nav-title">🎲 Series Thống kê trực giác cho KD · 3 phần</div>
  <ol>
    <li><a href="/blog/mau-va-tong-the/">Phần 1 - Mẫu &amp; tổng thể</a></li>
    <li class="current">Phần 2 - Độ tin cậy &amp; p-value</li>
    <li><a href="/blog/base-rate-xac-suat-nguoc/">Phần 3 - Base rate &amp; xác suất ngược</a></li>
  </ol>
</div>

Đội marketing chạy A/B test landing page. Bản mới thắng, *"p-value 0,03"* - và cả phòng gật gù: "Vậy là 97% chắc bản mới tốt hơn, triển thôi." Nghe rất khoa học. Và sai gần như hoàn toàn.

Đây là một trong những hiểu lầm tốn tiền nhất từng được nói ra trong một cuộc họp tự tin. Phản xạ của bạn lúc này có thể là "thôi mấy chuyện p-value để dân data lo, tôi chỉ cần biết nó thắng hay không". Nhưng chính vì *giao trọn* việc đọc con số cho một thuật ngữ bạn chưa hiểu, bạn mới dễ bị nó dắt mũi. Tin tốt: ý tưởng thật sự đằng sau p-value và khoảng tin cậy đời thường hơn bạn tưởng - và đọc xong bài này bạn sẽ thôi mắc cái bẫy "97%" ở trên mãi mãi.

Ở [Phần 1](/blog/mau-va-tong-the/), bạn đã chấp nhận rằng mọi con số rút ra từ một **mẫu** (sample - nhóm nhỏ quan sát được, dùng để đoán về cả tổng thể) đều có sai số. Phần 2 trả lời câu hỏi tiếp theo: *sai số đó lớn cỡ nào, và khi nào thì một khác biệt đáng để bạn móc ví?*

## Khoảng tin cậy: dải hợp lý cho con số thật, không phải một điểm

Quên cái dấu "=" đi. Khi bạn đo tỉ lệ chuyển đổi trên 400 lượt khách và ra **3%**, con số thật của cả tổng thể gần như chắc chắn *không phải* đúng 3,000%. Nó nằm đâu đó quanh đó.

**Khoảng tin cậy** (confidence interval - dải giá trị hợp lý mà con số thật nhiều khả năng rơi vào) chính là cách diễn đạt cái "đâu đó quanh đó" một cách lượng hóa. Thay vì nói "tỉ lệ chuyển đổi là 3%", bạn nói **"tỉ lệ chuyển đổi 3% ± 0,5%"** - tức con số thật hợp lý nằm trong khoảng 2,5% đến 3,5%.

Một điểm số trần trụi giả vờ rằng bạn biết chính xác. Một khoảng tin cậy thành thật về việc bạn *không* biết chính xác - và nói rõ bạn mù mờ tới mức nào.

> Quy tắc vàng: một con số không kèm khoảng tin cậy là một con số đang giấu bạn mức độ may rủi của chính nó. Hãy luôn hỏi "± bao nhiêu?".

### Mẫu càng nhỏ, dải càng rộng

Đây là phần trực giác nhất, và cũng hữu dụng nhất. Cỡ mẫu quyết định độ rộng của khoảng tin cậy: hỏi 40 khách thì dải rất rộng, hỏi 4.000 khách thì dải hẹp lại.

*Ví dụ minh hoạ:* shop của bạn thử một banner mới.

- Tuần đầu, **40 lượt khách**, 2 người mua → tỉ lệ 5%, nhưng khoảng tin cậy mênh mông cỡ **5% ± 7%**. Tức con số thật có thể là 0%, cũng có thể 12%. Dải này gần như *vô dụng* để ra quyết định.
- Một tháng sau, **4.000 lượt khách**, 200 người mua → vẫn 5%, nhưng giờ là **5% ± 0,7%**. Bây giờ bạn mới thật sự biết banner đang chuyển đổi quanh mức 5%.

Cùng một con số 5%, hai mức độ đáng tin trời vực. Đây cũng chính là lý do "tuần đầu thấy tăng vọt rồi tự xẹp" hay xảy ra - bạn đang phản ứng với một dải rộng tưởng là một điểm chắc. (Bài [tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/) đào sâu đúng cái bẫy này.)

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="26" fill="#475569" font-size="15" font-weight="700">Cùng tỉ lệ 5% - hai cỡ mẫu, hai độ rộng khoảng tin cậy</text>
  <!-- scale baseline -->
  <line x1="60" y1="270" x2="640" y2="270" stroke="#334155" stroke-width="1.5"/>
  <text x="60" y="292" fill="#64748B" font-size="11" text-anchor="middle">0%</text>
  <text x="200" y="292" fill="#64748B" font-size="11" text-anchor="middle">5%</text>
  <text x="340" y="292" fill="#64748B" font-size="11" text-anchor="middle">10%</text>
  <text x="480" y="292" fill="#64748B" font-size="11" text-anchor="middle">15%</text>
  <!-- center reference at 5% (x=200) -->
  <line x1="200" y1="70" x2="200" y2="270" stroke="#22D3EE" stroke-width="1.5" stroke-dasharray="4 4"/>
  <!-- small sample: wide CI 5% ± 7% -> from -2% clamp 0 to 12% (x 60..340) -->
  <text x="60" y="108" fill="#94A3B8" font-size="13" font-weight="600">Mẫu nhỏ · 40 khách</text>
  <line x1="60" y1="135" x2="340" y2="135" stroke="#F87171" stroke-width="3"/>
  <line x1="60" y1="123" x2="60" y2="147" stroke="#F87171" stroke-width="3"/>
  <line x1="340" y1="123" x2="340" y2="147" stroke="#F87171" stroke-width="3"/>
  <circle cx="200" cy="135" r="6" fill="#F87171"/>
  <text x="350" y="140" fill="#F87171" font-size="12" font-weight="700">5% ± 7% → vô dụng</text>
  <!-- large sample: narrow CI 5% ± 0.7% -> x ~180..220 -->
  <text x="60" y="200" fill="#94A3B8" font-size="13" font-weight="600">Mẫu lớn · 4.000 khách</text>
  <line x1="180" y1="227" x2="220" y2="227" stroke="#34D399" stroke-width="3"/>
  <line x1="180" y1="215" x2="180" y2="239" stroke="#34D399" stroke-width="3"/>
  <line x1="220" y1="215" x2="220" y2="239" stroke="#34D399" stroke-width="3"/>
  <circle cx="200" cy="227" r="6" fill="#34D399"/>
  <text x="234" y="232" fill="#34D399" font-size="12" font-weight="700">5% ± 0,7% → đáng tin</text>
</svg>
<div class="viz-caption">Điểm ước lượng giống hệt nhau, nhưng cỡ mẫu nhỏ cho một dải rộng đến mức không thể ra quyết định, còn cỡ mẫu lớn thu dải lại quanh con số thật.</div>
</div>

## p-value: "nếu thật ra không có khác biệt thì sao?"

Giờ tới ngôi sao bị hiểu lầm nhiều nhất. **p-value** (probability value - xác suất quan sát được chênh lệch lớn như đã thấy, *với giả định rằng thật ra không có khác biệt nào*) nghe học thuật, nhưng lõi của nó là một câu hỏi rất đời.

Hình dung bạn so bản landing page cũ và mới, và thấy bản mới nhỉnh hơn 2%. p-value trả lời đúng câu này: *"Giả sử hai bản thật ra y hệt nhau - chỉ là may rủi - thì khả năng tôi vẫn thấy một chênh lệch to bằng (hoặc to hơn) 2% là bao nhiêu?"*

- **p nhỏ** (vd 0,03) = "nếu hai bản thật sự như nhau thì hiếm khi thấy chênh lệch lớn cỡ này do tình cờ". Tức: khó giải thích bằng may rủi → đáng nghi là có khác biệt thật.
- **p lớn** (vd 0,4) = "chênh lệch cỡ này xảy ra do tình cờ là chuyện thường". Tức: đừng vội kết luận gì.

Ngưỡng quy ước phổ biến là **p < 0,05**, và khi vượt ngưỡng đó người ta gọi kết quả là **có ý nghĩa thống kê** (statistical significance - chênh lệch khó giải thích bằng may rủi đơn thuần). Để ý: "có ý nghĩa" ở đây *không* có nghĩa là "quan trọng" hay "đáng tiền". Nó chỉ nói: khó là do tình cờ. Đó là cái bẫy ngôn ngữ lớn nhất.

## Cái p-value KHÔNG bao giờ nói cho bạn

Quay lại phòng họp đầu bài. "p = 0,03, vậy 97% chắc bản mới tốt hơn." Sai ở đâu? p-value tính xác suất *thấy dữ liệu này nếu không có khác biệt* - nó **không** tính xác suất *giả thuyết của bạn đúng*. Hai thứ này nghe giống nhau nhưng là hai chiều ngược nhau, và đánh tráo chúng là lỗi kinh điển nhất.

| p-value NÓI gì | p-value KHÔNG nói gì |
|---|---|
| Khả năng thấy chênh lệch lớn cỡ này *nếu thật ra không có khác biệt* | Xác suất giả thuyết của bạn đúng (KHÔNG phải "97% bản mới thắng") |
| Chênh lệch này có khó giải thích bằng may rủi hay không | Hiệu ứng *lớn* hay nhỏ - p tí xíu vẫn có thể là khác biệt 0,1% vô nghĩa |
| Một tín hiệu cảnh báo "đừng vội tin là tình cờ" | Khác biệt này có *đáng tiền* để bạn hành động không |
| Đúng cho **một** phép kiểm bạn đã định trước | Còn giá trị gì nếu bạn thử 20 biến thể rồi nhặt cái p đẹp nhất |

Hai cột này nên dán lên tường phòng họp. Cột phải mới là nơi tiền của bạn bị đốt.

## p-hacking: thử tới khi nào ra "có ý nghĩa"

Có một cách lạm dụng p-value tinh vi và phổ biến đến mức đáng sợ: **p-hacking** (chọn lọc phép thử cho tới khi vô tình ra một p-value đẹp dưới 0,05).

*Ví dụ minh hoạ:* đội growth test một lúc 20 phiên bản nút "Mua ngay" - đủ màu, đủ chữ. Theo đúng luật xác suất, *kể cả khi cả 20 bản y hệt nhau về thực chất*, trung bình vẫn sẽ có khoảng một bản ngẫu nhiên đạt p < 0,05. Đội báo cáo đúng cái bản may mắn đó là "thắng có ý nghĩa thống kê", triển khai, rồi ngơ ngác khi tháng sau nó chẳng nhích doanh số. Họ không gian lận - họ chỉ tưởng nhầm trúng số là kỹ năng.

Cách phòng: **định trước bạn sẽ đo cái gì** trước khi nhìn dữ liệu, và nghi ngờ mọi "phát hiện bất ngờ" lôi ra từ một mớ phép thử. Đây chính là họ hàng gần của những cái bẫy trong [5 sai lầm kinh điển khi phân tích dữ liệu](/blog/sai-lam-khi-phan-tich-du-lieu/) - số đúng, đọc sai.

## Quy tắc dùng cho người kinh doanh: nhìn cả ba thứ

Đây là phần đáng nhớ nhất bài. Đừng bao giờ dừng ở câu "có ý nghĩa hay không". Trước mỗi quyết định trên một con số so sánh, hãy nhìn đủ ba thứ:

1. **Độ lớn hiệu ứng** (effect size - chênh lệch *lớn cỡ nào* trên thực tế, đo bằng đơn vị bạn quan tâm: %, đồng, đơn hàng). Bản mới hơn 0,2% hay hơn 8%? Một cái chẳng bõ công đổi, cái kia đổi đời.
2. **Khoảng tin cậy** quanh độ lớn đó. "Bản mới hơn 3%, khoảng tin cậy +1% đến +5%" thì cả dải đều dương - yên tâm triển. Còn "hơn 3%, khoảng tin cậy -2% đến +8%" thì dải vắt qua số 0: rất có thể bản mới *tệ hơn*, đừng vội.
3. **p-value** chỉ là chốt cuối: chênh lệch này có khó là do may rủi không.

*Ví dụ minh hoạ:* shop ở TP.HCM đổi quy trình chốt đơn, tỉ lệ chốt nhích từ 18% lên 18,4% với p = 0,04. "Có ý nghĩa!" - nhưng độ lớn hiệu ứng chỉ 0,4%, và đổi quy trình tốn cả tháng đào tạo nhân viên. Đáng tiền không? Gần như chắc chắn không. p-value đẹp không cứu được một hiệu ứng bé tí.

> Quy tắc vàng: "có ý nghĩa thống kê" trả lời *"có thật không?"*. Độ lớn hiệu ứng trả lời *"có đáng không?"*. Bạn cần cả hai gật đầu mới được móc ví.

## Đọc độ tin cậy trong Semantix

Semantix *không phải* một con bot phun ra "bản B thắng, p = 0,03" rồi để mặc bạn diễn giải sai thành "97%". Ý tưởng đi ngược lại: khi bạn so hai nhóm bằng tiếng Việt -

> **"So tỉ lệ chuyển đổi landing page A và B tháng này, kèm khoảng tin cậy và cỡ mẫu mỗi bên"**

- nó trả về *cả gói*: điểm ước lượng, dải khoảng tin cậy, cỡ mẫu, và cảnh báo khi mẫu còn quá nhỏ để kết luận. Thay vì để bạn căng mắt soi một con số trần, nó đặt sẵn cạnh đó cái dải hợp lý - để bạn thấy ngay khoảng tin cậy có vắt qua số 0 hay không *trước khi* gọi một bên là "thắng".

## Tóm lại

| Câu nói tự tin mà sai | Cách đọc tỉnh táo |
|---|---|
| "Tỉ lệ chuyển đổi là 3%." | "3% ± bao nhiêu? Cỡ mẫu đủ chưa?" |
| "p = 0,03, vậy 97% bản mới thắng." | "p chỉ nói khó-do-may-rủi, không phải xác suất tôi đúng." |
| "Có ý nghĩa thống kê - triển thôi." | "Độ lớn hiệu ứng bao nhiêu? Khoảng tin cậy có vắt qua 0 không?" |
| "Thử 20 bản, một bản p < 0,05 - thắng rồi!" | "Đó có thể là p-hacking. Định trước rồi đo lại đi." |

Sợi chỉ chung của Phần 2: một con số so sánh không tự nói nó *chắc* tới đâu và *lớn* tới đâu. Khoảng tin cậy lo phần "chắc tới đâu", độ lớn hiệu ứng lo phần "lớn tới đâu", và p-value chỉ là cái còi cảnh báo may rủi - không phải lá phiếu cho việc bạn đúng.

> **Mental model:** p-value giống như một máy dò kim loại kêu "bíp" - nó báo *có gì đó khác thường ở đây*, chứ không nói đó là vàng hay nắp chai. Khoảng tin cậy cho bạn biết món đồ to cỡ nào và bạn đo có chắc tay không. Nghe tiếng bíp rồi đào lên xem đã, đừng vội tuyên bố trúng kho báu.

---

*Muốn so hai nhóm với khoảng tin cậy bày sẵn, không phải tự bấm máy tính? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Và đọc tiếp [Phần 3 - Base rate &amp; xác suất ngược](/blog/base-rate-xac-suat-nguoc/): vì sao một xét nghiệm "chính xác 99%" vẫn có thể sai phần lớn thời gian.*
