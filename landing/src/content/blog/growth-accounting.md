---
title: "Growth Accounting: vì sao con số 'tăng 12%' giấu mất hai sự thật — và một trong hai có thể đang giết công ty bạn"
code: "pt-018"
series: "growth-accounting"
seriesOrder: 1
description: "Hai shop cùng khoe tháng này tăng 12%. Một đang khỏe, một đang chảy máu. Growth accounting tách con số tăng ròng để bạn nhìn thấy chỗ con số tổng giấu kín."
pubDate: 2026-06-10
category: "Phân Tích Dữ Liệu"
readTime: 12
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/growth-accounting.svg"
coverAlt: "Biểu đồ cột chồng growth accounting: new, resurrected, retained dương và churned âm dưới trục 0"
---

<div class="series-nav">
  <div class="series-nav-title">📈 Series Growth Accounting · 4 phần</div>
  <ol>
    <li class="current">Phần 1 — Nền tảng: phương trình tăng trưởng</li>
    <li><a href="/blog/growth-accounting-quick-ratio/">Phần 2 — Quick Ratio: nhịp tim tăng trưởng</a></li>
    <li><a href="/blog/growth-accounting-revenue/">Phần 3 — Từ user sang tiền: Net Dollar Retention</a></li>
    <li><a href="/blog/growth-accounting-thuc-chien/">Phần 4 — Thực chiến: dựng bảng growth accounting</a></li>
  </ol>
</div>

Hai chủ doanh nghiệp Việt ngồi cùng một bàn cà phê, cùng khoe một con số: "Tháng này user hoạt động tăng 12%." Một người điều hành app bán lẻ, một người làm SaaS quản lý kho. Cùng một con số đẹp, cùng một nụ cười.

Nhưng nếu bạn mở bảng **growth accounting** của hai người ra đặt cạnh nhau, bạn sẽ thấy hai bức tranh ngược nhau hoàn toàn. Một người đang xây tài sản. Người kia đang chạy trên một cái xô thủng đáy — đổ nước vào nhanh hơn tốc độ nó rò ra, nên mực nước vẫn dâng. Cho đến khi không còn nước để đổ.

Đây là nghịch lý ít người chịu tin: **con số "tăng 12%" không phải một sự thật — nó là một phép trừ.** Và phép trừ thì luôn giấu đi hai con số tạo ra nó. Phần 1 của series này là về cách nhìn xuyên qua con số tăng ròng, để thấy thứ nó che kín.

## Tăng ròng là một phép trừ — và phép trừ giấu mất hai con số

Khi dashboard báo "tháng này có thêm 100 user active", phản xạ đầu tiên của bạn là gật đầu: tốt, đang lớn. Nhưng "+100" không phải một số đếm — nó là kết quả của một phép trừ.

Có thể tháng này bạn kéo về **500 user mới và quay lại**, nhưng cũng **mất 400 user cũ** đi mất. 500 − 400 = +100. Cùng con số "+100" đó, một công ty khác có thể đạt được bằng cách kéo về **120 user mới** và chỉ **mất 20**. Cùng một dòng cuối, nhưng một bên đang chảy máu ồ ạt và băng bó bằng acquisition, một bên gần như không rò rỉ.

Con số tăng ròng — gọi đúng tên là **net new MAU** — không cho bạn biết bạn thuộc loại nào. Nó là cái dòng cuối của một báo cáo mà phần thân đã bị xé mất. Để đọc lại phần thân ấy, bạn cần tách phép trừ ra thành các thành phần. Đó chính là việc growth accounting làm.

## Growth accounting: báo cáo tài chính cho người dùng

Hãy nghĩ về cách kế toán đọc một doanh nghiệp. Họ không nhìn mỗi con số lợi nhuận cuối kỳ — họ có một bản **P&L** tách doanh thu ra khỏi chi phí, để bạn thấy tiền *đến từ đâu* và *đi đâu mất*. Một công ty lãi 1 tỷ nhờ doanh thu 10 tỷ rất khác một công ty lãi 1 tỷ nhờ cắt sạch chi phí của một doanh thu đang teo lại.

**Growth accounting là bản P&L đó, nhưng cho người dùng.** Thay vì một con số MAU tổng, nó tách sự thay đổi user mỗi kỳ thành bốn dòng:

- **New** — user lần đầu active. Khách hoàn toàn mới bước vào cửa.
- **Resurrected** — user từng rời đi, nay quay lại. Người cũ trở về sau một thời gian vắng mặt.
- **Retained** — user active *cả kỳ trước lẫn kỳ này*. Đây là phần lõi đang ở lại với bạn.
- **Churned** — user active kỳ trước, kỳ này thì không. Phần đang rời đi.

Xương sống của cả series là một phương trình đơn giản đến mức ai cũng kiểm chứng được bằng tay:

```
MAU(t) = MAU(t−1) + new(t) + resurrected(t) − churned(t)
```

Đọc thành lời: số user tháng này = số tháng trước, cộng người mới, cộng người quay lại, trừ người rời đi. Còn cái con số "+100" mà dashboard khoe? Nó chính là:

```
net new MAU = new + resurrected − churned
```

Ba dòng, một phép cộng-trừ. Khi tách ra như vậy, "+100" ngừng là một lời khen mơ hồ và trở thành một chẩn đoán: bạn biết chính xác bao nhiêu người vào, bao nhiêu quay lại, bao nhiêu bỏ đi. Và thường thì con số churned — con số bị giấu kỹ nhất — mới là thứ quyết định số phận.

## Đọc biểu đồ cột chồng

Growth accounting có một biểu đồ đặc trưng, và một khi đã quen, bạn sẽ không bao giờ nhìn MAU theo kiểu cũ nữa. Đó là **cột chồng (stacked bar)** — mỗi tháng một cột. Phần *dương* (retained + new + resurrected) dựng lên phía trên trục 0; phần *churned* được vẽ **âm**, thò xuống dưới trục như một cái rễ.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- baseline (trục 0) -->
  <line x1="70" y1="210" x2="650" y2="210" stroke="#475569" stroke-width="1.5"/>
  <text x="58" y="214" fill="#64748B" font-size="11" text-anchor="end">0</text>

  <!-- legend -->
  <rect x="80"  y="14" width="12" height="12" rx="2" fill="#15803d"/><text x="98"  y="24" fill="#94a3b8" font-size="11">retained</text>
  <rect x="168" y="14" width="12" height="12" rx="2" fill="#22c55e"/><text x="186" y="24" fill="#94a3b8" font-size="11">new</text>
  <rect x="232" y="14" width="12" height="12" rx="2" fill="#4ade80"/><text x="250" y="24" fill="#94a3b8" font-size="11">resurrected</text>
  <rect x="330" y="14" width="12" height="12" rx="2" fill="#f87171"/><text x="348" y="24" fill="#94a3b8" font-size="11">churned (âm)</text>

  <!-- Cột T1 -->
  <rect x="92"  y="150" width="64" height="60" fill="#15803d"/>
  <rect x="92"  y="118" width="64" height="32" fill="#22c55e"/>
  <rect x="92"  y="104" width="64" height="14" fill="#4ade80"/>
  <rect x="92"  y="210" width="64" height="34" fill="#f87171"/>
  <text x="124" y="262" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="600">T1</text>

  <!-- Cột T2 -->
  <rect x="194" y="140" width="64" height="70" fill="#15803d"/>
  <rect x="194" y="106" width="64" height="34" fill="#22c55e"/>
  <rect x="194" y="92"  width="64" height="14" fill="#4ade80"/>
  <rect x="194" y="210" width="64" height="30" fill="#f87171"/>
  <text x="226" y="262" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="600">T2</text>

  <!-- Cột T3 -->
  <rect x="296" y="128" width="64" height="82" fill="#15803d"/>
  <rect x="296" y="96"  width="64" height="32" fill="#22c55e"/>
  <rect x="296" y="84"  width="64" height="12" fill="#4ade80"/>
  <rect x="296" y="210" width="64" height="26" fill="#f87171"/>
  <text x="328" y="262" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="600">T3</text>

  <!-- Cột T4 -->
  <rect x="398" y="116" width="64" height="94" fill="#15803d"/>
  <rect x="398" y="86"  width="64" height="30" fill="#22c55e"/>
  <rect x="398" y="74"  width="64" height="12" fill="#4ade80"/>
  <rect x="398" y="210" width="64" height="22" fill="#f87171"/>
  <text x="430" y="262" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="600">T4</text>

  <!-- Cột T5 -->
  <rect x="500" y="102" width="64" height="108" fill="#15803d"/>
  <rect x="500" y="72"  width="64" height="30" fill="#22c55e"/>
  <rect x="500" y="60"  width="64" height="12" fill="#4ade80"/>
  <rect x="500" y="210" width="64" height="18" fill="#f87171"/>
  <text x="532" y="262" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="600">T5</text>

  <!-- nhãn vùng -->
  <text x="630" y="150" fill="#475569" font-size="11" text-anchor="end" transform="rotate(-90 630 150)">MAU đang ở lại / tăng thêm</text>
  <text x="630" y="228" fill="#7f1d1d" font-size="11" text-anchor="end">churn thu hẹp dần →</text>
</svg>
<div class="viz-caption">Cột chồng growth accounting (số minh họa): phần dương = retained + new + resurrected; phần đỏ thò xuống trục 0 là churned. Ở đây phần đỏ co lại dần qua từng tháng — dấu hiệu một doanh nghiệp đang bịt được lỗ rò, không chỉ đổ thêm nước.</div>
</div>

Cái đẹp của biểu đồ này là nó **không cho bạn nói dối chính mình**. Một cột tổng cao mà cái rễ đỏ phía dưới cũng dài ngoằng kể một câu chuyện hoàn toàn khác với một cột thấp hơn nhưng gần như không có rễ. Mắt bạn bắt được điều đó trong nửa giây — thứ mà một con số "+12%" giấu suốt cả quý.

## Hai shop cùng tăng 12%, hai số phận

Quay lại hai người ở quán cà phê. Hãy mượn một minh họa kinh điển mà Amplitude hay dùng (con số dưới đây là *ví dụ minh họa*, không phải số của một doanh nghiệp Việt cụ thể).

App **A** và app **B** cùng tăng MAU **12% mỗi tháng**. Nhưng:

- **App A** mỗi tháng giữ lại được khoảng **40%** user cũ. Phần 60% còn lại rời đi, và A bù lại — thậm chí bù dư ra 12% — bằng một dòng acquisition chảy không ngừng. Tắt vòi marketing một tháng là đường MAU gục xuống.
- **App B** mỗi tháng giữ lại khoảng **9 trên 10** user. Lượng new cộng thêm chỉ cần nhỏ là MAU vẫn tăng 12%, vì cái nền cũ gần như không hao.

Cùng một top-line. Cùng một dòng tít "tăng 12%". Nhưng A đang xây nhà trên cát: mỗi tháng phải tốn tiền dựng lại phần lớn cơ sở khách hàng. B đang xây trên đá: phần lớn user tháng trước vẫn ở đó, tiền acquisition chồng lên một nền đang tích lũy, không phải thay thế nó.

Trên biểu đồ cột chồng, A có những cái rễ đỏ khổng lồ dưới trục mỗi tháng; B gần như không có rễ. Con số tăng trưởng nói chúng giống nhau. Growth accounting nói chúng là hai loài khác nhau.

> Quy tắc vàng: **tốc độ tăng cho biết bạn đi nhanh cỡ nào; growth accounting cho biết bạn đang đi trên đá hay trên cát.** Hai công ty cùng tốc độ có thể đang tiến tới hai kết cục ngược nhau.

Và đây mới là phần đáng sợ: nếu chỉ nhìn MAU tổng, **bạn không thể phân biệt mình là A hay B** — cho đến cái ngày ngân sách acquisition cạn, và nếu bạn là A, đường tăng trưởng sẽ sụp gần như tức thì. Có một chỉ số gói gọn sự khác biệt này thành một con số duy nhất — **Quick Ratio**, bằng (new + resurrected) chia cho churned — nhưng đó là chuyện của [Phần 2](/blog/growth-accounting-quick-ratio/), nơi ta sẽ đào sâu vào "nhịp tim" của tăng trưởng.

## Growth accounting khác Cohort thế nào — và vì sao bạn cần cả hai

Nếu bạn đã đọc series [Cohort Analysis](/blog/cohort-analysis/), bạn có thể đang nhíu mày: "Chẳng phải cohort cũng nói về giữ chân và rời bỏ sao?" Đúng — nhưng hai công cụ này nhìn cùng một sự thật qua hai ô cửa khác nhau, và đó là lý do bạn cần cả hai.

**Cohort** nhóm khách theo *thời điểm họ bắt đầu*, rồi theo dõi từng nhóm già đi: trong 100 người vào tháng 1, sau 3 tháng còn bao nhiêu? Đó là một lát cắt theo **tuổi đời** — nó trả lời "khách của một thời điểm sống được bao lâu".

**Growth accounting** thì không quan tâm khách vào lúc nào. Nó đứng ở mỗi *kỳ* và đếm dòng chảy: tháng này có bao nhiêu người vào, bao nhiêu ở lại, bao nhiêu quay về, bao nhiêu bỏ đi — gộp tất cả các thế hệ khách lại. Đó là góc nhìn **bảng kế toán**: mỗi tháng, sổ thu chi user trông thế nào.

Hãy hình dung một hồ nước. Cohort dán thẻ vào từng đàn cá thả xuống theo tháng, rồi đếm xem đàn nào còn sống sau bao lâu. Growth accounting thì đứng ở miệng hồ mỗi tháng, đo lưu lượng nước vào và nước ra — bất kể con cá nào. Một bên nghiên cứu *vòng đời*, một bên đo *dòng chảy*. Bạn cần cả hai để hiểu cái hồ.

## Growth accounting với Semantix

Trước đây, dựng được một bảng growth accounting tử tế là việc của analyst có nghề: phải định nghĩa rạch ròi thế nào là "active", tự-join bảng sự kiện với chính nó để bắt được ai active *cả hai kỳ*, phân loại từng user vào new/resurrected/retained/churned, rồi mới dựng được cột chồng. Sai một định nghĩa "active" là cả bảng sai theo.

Semantix không phải một chatbot cắm thẳng vào database rồi đoán bừa "active" nghĩa là gì. Bạn định nghĩa "user active" **một lần** trong [Semantic Layer](/blog/semantic-layer/) — đăng nhập? mở app? phát sinh đơn? — rồi mọi câu hỏi sau đều dùng chung định nghĩa đó. Sau đó bạn hỏi thẳng bằng tiếng Việt:

> **"Phân rã tăng trưởng user 6 tháng qua thành new, quay lại, giữ chân và rời đi, vẽ dạng cột chồng."**

Semantix hiểu đây là một bảng growth accounting, tự sinh SQL tự-join khớp dữ liệu của bạn, và trả về bốn dòng kèm biểu đồ — không cần viết một dòng SQL nào, và quan trọng hơn, không có chuyện "active" tháng này hiểu một kiểu, tháng sau hiểu kiểu khác.

## Tóm lại

| Nếu bạn chỉ nhìn... | Bạn sẽ tưởng... | Đọc growth accounting, bạn thấy... |
|---|---|---|
| MAU tổng tăng 12% | Đang khỏe, cứ thế đi tiếp | Có thể là 500 vào − 400 ra: một cái xô thủng |
| Con số tăng ròng | Một phép cộng đơn giản | Một phép trừ giấu mất churned và new |
| Hai app cùng +12% | Hai công ty giống nhau | Một xây trên đá, một xây trên cát |
| Một dòng cuối đẹp | Bức tranh đã đủ | Bốn dòng new/resurrected/retained/churned mới đủ |

Con số tăng ròng là dòng cuối của một báo cáo bị xé mất phần thân. Growth accounting dán lại phần thân ấy — và lần đầu tiên, bạn thấy tăng trưởng của mình *đến từ đâu* và *rò đi đâu mất*.

Ở [Phần 2](/blog/growth-accounting-quick-ratio/), ta sẽ nén bốn dòng này thành một con số duy nhất đo được sức khỏe tăng trưởng trong một nhịp — **Quick Ratio**, nhịp tim của tăng trưởng.

---

*Muốn thấy tăng trưởng của bạn đang đến từ đâu và rò đi đâu? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại bảng phân rã growth accounting — không cần SQL.*
