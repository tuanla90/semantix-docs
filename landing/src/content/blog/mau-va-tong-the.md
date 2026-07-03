---
title: "Thống kê cho người làm kinh doanh (Phần 1): mẫu & tổng thể - bao nhiêu là đủ để tin?"
code: "kt-024"
series: "thong-ke-kinh-doanh"
seriesOrder: 1
description: "Ba khách khen không có nghĩa sản phẩm tốt. Năm đơn hoàn không có nghĩa chất lượng tệ. Vài người nói không phải cả thị trường. Phần 1 của series: hiểu mẫu & tổng thể."
pubDate: 2025-01-14
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/mau-va-tong-the.png"
coverAlt: "Vài chấm sáng tượng trưng cho mẫu nhỏ đặt cạnh một đám đông dày đặc tượng trưng cho tổng thể"
---

<div class="series-nav">
  <div class="series-nav-title">🎲 Series Thống kê trực giác cho KD · 3 phần</div>
  <ol>
    <li class="current">Phần 1 - Mẫu &amp; tổng thể</li>
    <li><a href="/blog/do-tin-cay-p-value/">Phần 2 - Độ tin cậy &amp; p-value</a></li>
    <li><a href="/blog/base-rate-xac-suat-nguoc/">Phần 3 - Base rate &amp; xác suất ngược</a></li>
  </ol>
</div>

Bạn vừa tung một sản phẩm mới. Ba khách đầu tiên nhắn tin: "Mê quá chị ơi", "Đúng thứ em cần", "Sẽ mua thêm". Bạn thở phào - sản phẩm ngon rồi, nhân đơn lên thôi.

Khoan đã. Ba lời khen đó nói lên điều gì về **một nghìn khách tiếp theo**? Gần như không gì cả. Có thể sản phẩm thật sự tốt. Cũng có thể bạn vừa vô tình hỏi đúng ba người dễ tính nhất, hoặc ba người bạn thân ngại chê. Ba con người không phải là thị trường - họ chỉ là một **mẫu** bé tí, và một mẫu bé tí thì nói dối rất duyên.

Đây là cái bẫy tốn kém nhất của mọi quyết định "dựa trên phản hồi": **kết luận về cả đám đông từ một nhúm người bạn tình cờ nghe được.** Ba khách khen rồi nhập kho gấp ba. Năm đơn hoàn rồi vội đổi cả nhà cung cấp. "Hỏi vài người trong group" rồi quyết luôn giá bán. Tin tốt: phân biệt được khi nào một nhúm số là đủ tin và khi nào nó chỉ là tiếng ồn - đó là kỹ năng học được trong mười phút đọc.

## Mẫu và tổng thể: bạn luôn chỉ thấy phần nổi

Trước hết, hai khái niệm nền tảng - và bạn dùng chúng mỗi ngày mà không gọi tên.

**Tổng thể** (population - toàn bộ nhóm bạn thật sự muốn hiểu) là tất cả khách hàng tiềm năng của bạn, tất cả đơn hàng có thể xảy ra, toàn bộ thị trường. **Mẫu** (sample - phần nhỏ bạn quan sát được) là vài chục phản hồi, vài trăm đơn, dăm ba người trong group bạn vô tình hỏi tới.

Sự thật phũ phàng: *bạn gần như không bao giờ thấy được tổng thể.* Bạn không thể hỏi hết một triệu khách tiềm năng. Bạn chỉ có trong tay một mẫu - và mọi kết luận của bạn đều là phép *suy* từ mẫu nhỏ ra đám đông lớn. Cả ngành thống kê thực ra chỉ xoay quanh một câu hỏi: *mẫu của tôi đáng tin đến đâu khi nói thay cho tổng thể?*

> Quy tắc vàng: mỗi khi bạn nói "khách hàng thích cái này", hãy tự hỏi ngầm - "bao nhiêu khách, chọn kiểu gì?". Câu trả lời quyết định bạn đang phát biểu một sự thật hay đang đoán mò có trang trí.

## Vì sao mẫu nhỏ đánh lừa bạn

Hãy hình dung một hộp 1.000 viên bi, 600 đỏ và 400 xanh - đó là tổng thể, với tỷ lệ thật 60% đỏ. Bạn nhắm mắt bốc.

Bốc **3 viên**: rất dễ ra 3 đỏ (kết luận "100% đỏ!") hoặc 3 xanh ("toàn xanh!"). Bốc **10 viên**: thường ra 5-7 đỏ, đã gần đúng hơn. Bốc **200 viên**: gần như chắc chắn rơi vào khoảng 56-64% đỏ - sát tỷ lệ thật.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="26" fill="#475569" font-size="15" font-weight="700">Tỷ lệ đỏ ước lượng từ mẫu, qua nhiều lần bốc (tỷ lệ thật = 60%)</text>
  <!-- true value band -->
  <rect x="60" y="150" width="560" height="40" fill="#164E45" opacity="0.4"/>
  <line x1="60" y1="170" x2="620" y2="170" stroke="#34D399" stroke-width="2"/>
  <text x="626" y="174" fill="#34D399" font-size="12" font-weight="700">60%</text>
  <!-- axes -->
  <line x1="60" y1="40" x2="60" y2="300" stroke="#94A3B8" stroke-width="2"/>
  <line x1="60" y1="300" x2="620" y2="300" stroke="#94A3B8" stroke-width="2"/>
  <text x="10" y="48" fill="#64748B" font-size="12">% đỏ</text>
  <!-- column labels -->
  <text x="150" y="324" fill="#64748B" font-size="13" font-weight="600" text-anchor="middle">mẫu 3 viên</text>
  <text x="340" y="324" fill="#64748B" font-size="13" font-weight="600" text-anchor="middle">mẫu 10 viên</text>
  <text x="530" y="324" fill="#64748B" font-size="13" font-weight="600" text-anchor="middle">mẫu 200 viên</text>
  <!-- n=3: wild scatter -->
  <circle cx="125" cy="70" r="5" fill="#F87171"/>
  <circle cx="150" cy="280" r="5" fill="#F87171"/>
  <circle cx="175" cy="110" r="5" fill="#F87171"/>
  <circle cx="140" cy="250" r="5" fill="#F87171"/>
  <circle cx="160" cy="60" r="5" fill="#F87171"/>
  <circle cx="135" cy="200" r="5" fill="#F87171"/>
  <!-- n=10: tighter -->
  <circle cx="320" cy="130" r="5" fill="#FBBF24"/>
  <circle cx="345" cy="210" r="5" fill="#FBBF24"/>
  <circle cx="335" cy="150" r="5" fill="#FBBF24"/>
  <circle cx="355" cy="195" r="5" fill="#FBBF24"/>
  <circle cx="328" cy="180" r="5" fill="#FBBF24"/>
  <circle cx="348" cy="120" r="5" fill="#FBBF24"/>
  <!-- n=200: clustered on line -->
  <circle cx="515" cy="168" r="5" fill="#22D3EE"/>
  <circle cx="535" cy="175" r="5" fill="#22D3EE"/>
  <circle cx="525" cy="165" r="5" fill="#22D3EE"/>
  <circle cx="540" cy="172" r="5" fill="#22D3EE"/>
  <circle cx="520" cy="178" r="5" fill="#22D3EE"/>
  <circle cx="530" cy="162" r="5" fill="#22D3EE"/>
  <text x="200" y="92" fill="#F87171" font-size="12" font-weight="600">dao động dữ dội</text>
  <text x="560" y="150" fill="#22D3EE" font-size="12" font-weight="600">bám sát sự thật</text>
</svg>
<div class="viz-caption">Cùng một hộp bi, mẫu càng nhỏ thì ước lượng càng văng tứ tung quanh tỷ lệ thật; mẫu càng lớn thì các lần bốc càng tụm lại đúng chỗ. (Số minh hoạ.)</div>
</div>

Điều khiến mẫu nhỏ nguy hiểm không phải nó *sai* - mà nó *dao động*. Ba khách hôm nay khen, ba khách khác mai có thể chê, dù sản phẩm y hệt. Bạn không nhìn vào sản phẩm; bạn nhìn vào một lát cắt may rủi của nó.

## Luật số lớn: vì sao "thêm dữ liệu" luôn giúp

Hiện tượng các viên bi tụm dần về 60% khi bạn bốc nhiều có tên đàng hoàng: **luật số lớn** (law of large numbers - mẫu càng lớn, kết quả trung bình càng tiến gần giá trị thật của tổng thể). Đây là lý do một sòng bài luôn thắng về dài hạn dù thua lẻ tẻ từng ván, và là lý do khảo sát 1.000 người đáng tin hơn hỏi 10 người gấp bội.

Nhưng có một chi tiết tinh tế mà ít người để ý - và nó cứu bạn rất nhiều tiền: **độ chính xác không tăng tỷ lệ thuận với cỡ mẫu.** Sai số co lại theo *căn bậc hai* của **cỡ mẫu** (sample size - số quan sát bạn thu thập).

Dịch sang tiếng người: muốn ước lượng *chính xác gấp đôi*, bạn không cần gấp đôi mẫu - bạn cần **gấp bốn** mẫu (vì √4 = 2). Muốn chính xác gấp ba? Cần gấp chín lần mẫu.

> Quy tắc vàng: nhảy từ 10 lên 100 phản hồi cải thiện độ tin cậy khủng khiếp. Nhảy từ 1.000 lên 2.000 thì gần như chẳng thêm gì đáng kể. Những mẫu đầu tiên là vàng; những mẫu cuối cùng là lãng phí.

Đây cũng là tin vui cho SME: bạn *không* cần dữ liệu khổng lồ kiểu tập đoàn. Một khảo sát 150-300 khách chọn tử tế đã đủ để ra quyết định chắc tay hơn 99% đối thủ vẫn đang "hỏi vài người quen".

## Mẫu lớn vẫn vô dụng nếu chọn sai người

Đây là chỗ lật ngược trực giác mạnh nhất của cả bài. Bạn vừa học mẫu lớn thì tốt. Nhưng **một mẫu lớn lệch còn nguy hiểm hơn một mẫu nhỏ trung thực** - vì nó cho bạn cảm giác tự tin sai lầm.

Chìa khoá là **mẫu đại diện** (representative sample - mẫu phản ánh đúng cơ cấu của tổng thể, ai cũng có cơ hội lọt vào như nhau). Cách bảo đảm điều đó là lấy **ngẫu nhiên** (random), không thiên lệch. Nếu bạn chỉ khảo sát khách mua trên Shopee, kết luận của bạn không nói được gì về khách TikTok Shop. Nếu bạn chỉ đăng poll trong group VIP, bạn nghe được tiếng của 5% khách trung thành nhất chứ không phải 95% còn lại.

Cái bẫy âm thầm nhất có tên riêng: **thiên lệch chọn mẫu** (selection bias - mẫu bị méo vì cách bạn thu thập đã loại sẵn một nhóm). Một biến thể kinh điển là **survivorship bias** (thiên kiến kẻ sống sót - chỉ đo những ai *còn ở lại*). Bạn khảo sát "khách hàng hiện tại có hài lòng không", 90% gật đầu - tất nhiên rồi, người ghét bạn đã bỏ đi từ lâu và không có mặt trong khảo sát. Chính những người đã rời bỏ mới nắm câu trả lời quan trọng nhất. Đây đúng là một trong [5 sai lầm kinh điển khi phân tích dữ liệu](/blog/sai-lam-khi-phan-tich-du-lieu/) mà ngay cả analyst lâu năm vẫn vấp.

| Mẫu trông "to" nhưng lệch | Vì sao kết luận sai |
|---|---|
| 500 review 5 sao trên sàn | Người ghét thường im lặng bỏ đi, không viết review |
| 300 phản hồi từ group khách VIP | Chỉ là tiếng nói của nhóm trung thành nhất |
| 1.000 khách "đang dùng" nói tốt | Người đã rời bỏ - câu trả lời thật - bị loại sẵn |

## "Bao nhiêu là đủ?" - tuỳ hai thứ

Giờ trả lời câu hỏi tiêu đề. Không có con số thần thánh "30 mẫu" hay "100 mẫu" áp cho mọi tình huống. Cỡ mẫu đủ phụ thuộc hai yếu tố:

1. **Độ chắc bạn cần.** Quyết định "đổi màu nút bấm" thì 50 lượt thử là thoải mái. Quyết định "rót 2 tỷ mở chi nhánh" thì bạn cần chắc hơn nhiều - và cần mẫu lớn hơn.
2. **Mức biến động của thứ bạn đo.** Nếu khách rất đồng nhất (ai cũng phản ứng giống nhau), một mẫu nhỏ đã đủ. Nếu khách rất khác nhau (người mê người ghét chia đôi), bạn cần mẫu lớn hơn nhiều mới thấy được bức tranh thật.

Vài mốc thực dụng cho SME Việt: một **A/B test** nhỏ (so hai phiên bản, mỗi bên vài chục lượt) chỉ đáng tin khi chênh lệch *rõ rệt* - chênh 2% với 40 lượt mỗi bên là nhiễu, không phải tín hiệu. Một khảo sát định hướng: nhắm 150-300 phản hồi *chọn ngẫu nhiên*. Đọc review để bắt vấn đề lặp lại: một lời chê xuất hiện *một lần* là cá biệt, xuất hiện ở *15% review* là tín hiệu. Việc tách tín hiệu thật khỏi dao động ngẫu nhiên này chính là chủ đề của [tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/) - bạn nên đọc song song.

## Tóm lại

| Phản xạ cũ | Cách đọc mới |
|---|---|
| "3 khách khen - sản phẩm ngon" | "3 người là mẫu quá nhỏ, còn dao động" |
| "Càng nhiều dữ liệu càng tốt vô hạn" | "Sai số giảm theo √n - vàng nằm ở vài trăm mẫu đầu" |
| "500 review 5 sao là bằng chứng" | "Người ghét đã bỏ đi, mẫu này lệch" |
| "Hỏi vài người trong group là đủ" | "Group nào? Họ đại diện cho ai?" |

> Mental model: mỗi nhúm dữ liệu bạn cầm trên tay giống như nhìn cả thành phố qua một ô cửa sổ. Cửa to hơn (mẫu lớn) thì thấy rõ hơn - nhưng nếu cửa quay nhầm hướng (mẫu lệch), bạn có phóng to cỡ nào cũng chỉ thấy đúng một con hẻm và tưởng đó là cả thành phố.

---

*Muốn thôi đoán mò từ "vài phản hồi" và bắt đầu hỏi dữ liệu thật của mình bằng tiếng Việt? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Và đọc tiếp [Phần 2 - Độ tin cậy &amp; p-value](/blog/do-tin-cay-p-value/): làm sao biết một chênh lệch là thật hay chỉ là may rủi của mẫu.*
