---
title: "Thống kê mô tả (Phần 4): phần trăm vs điểm phần trăm - lỗi diễn giải khiến bạn hiểu sai mọi báo cáo"
code: "kt-031"
series: "thong-ke-mo-ta"
seriesOrder: 4
description: "Tỷ lệ chuyển đổi nhích từ 10% lên 12%. Đó là tăng 2% hay tăng 20%? Cả hai đều có thể đúng - và chính chỗ lập lờ đó đang khiến bạn đọc sai báo cáo."
pubDate: 2025-02-04
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: true
cover: "/blog/covers/phan-tram-vs-diem-phan-tram.svg"
coverAlt: "Minh hoạ tỷ lệ chuyển đổi từ 10% lên 12%: +2 điểm phần trăm so với +20% tăng tương đối"
---

<div class="series-nav">
  <div class="series-nav-title">📐 Series Thống kê mô tả cho người làm số · 5 phần</div>
  <ol>
    <li><a href="/blog/do-lech-chuan/">Phần 1 - Độ lệch chuẩn &amp; phương sai</a></li>
    <li><a href="/blog/phan-vi-percentile/">Phần 2 - Phân vị (P50/P90/P99)</a></li>
    <li><a href="/blog/doc-hinh-dang-phan-phoi/">Phần 3 - Đọc hình dạng phân phối</a></li>
    <li class="current">Phần 4 - Phần trăm vs điểm phần trăm</li>
    <li><a href="/blog/trung-binh-co-trong-so/">Phần 5 - Trung bình có trọng số</a></li>
  </ol>
</div>

Tỷ lệ chuyển đổi của bạn tháng này nhích từ 10% lên 12%. Bạn viết vào báo cáo: "tăng 2%". Sếp đọc xong gật gù, thấy bình thường. Đối thủ của bạn cũng nhích y hệt 10% → 12%, nhưng họ viết: "tăng 20%". Và họ được duyệt thêm ngân sách.

Cùng một sự thật. Hai cách nói. Hai số phận.

Đây là nghịch lý ít người chịu tin: **"tăng 2%" và "tăng 20%" đều mô tả đúng cái nhích 10% → 12% đó - chỉ là chúng đo hai thứ khác nhau.** Một cái đo *chênh lệch tuyệt đối*, một cái đo *thay đổi tương đối*. Trộn lẫn hai khái niệm này - vô tình hay cố ý - là cội nguồn của gần như mọi lần đọc sai một con số phần trăm. Và bạn vấp nó mỗi tuần mà không hề hay.

Tin tốt: phân biệt được hai khái niệm là kỹ năng học trong mười phút. Phần 4 của series này dạy bạn đúng một từ - **điểm phần trăm** - và cách nó cứu bạn khỏi cả một họ những lần ra quyết định sai.

## Hai con số trốn trong một chữ "phần trăm"

Trước hết, gọi tên cho rạch ròi. Một **phần trăm** (percent - một phần của một trăm, ký hiệu %) là một *tỷ lệ*: 10% nghĩa là 10 trên 100. Khi tỷ lệ này thay đổi từ 10% lên 12%, có hai cách đo độ thay đổi, và chúng cho ra hai con số hoàn toàn khác:

- **Chênh lệch tuyệt đối** = 12% − 10% = **2 điểm phần trăm**. **Điểm phần trăm** (percentage point - đơn vị đo khoảng cách giữa hai tỷ lệ) là cách nói đúng cho phép trừ này. Bạn lấy tỷ lệ mới trừ tỷ lệ cũ, đơn vị còn lại là "điểm %", không phải "%".
- **Thay đổi tương đối** = (12% − 10%) ÷ 10% = **20%**. Đây là phép so phần tăng thêm với cái **nền** (base - con số gốc bạn lấy làm mốc để so), tức tăng *bao nhiêu phần* so với chính nó.

Cùng một cú nhích, hai con số: **+2 điểm phần trăm** và **+20%**. Cả hai đều đúng. Vấn đề nảy sinh khi bạn nói "tăng 2%" - vì "2%" trong tiếng Việt đời thường nghe như một thay đổi tương đối, trong khi ý bạn là 2 *điểm*. Người đọc tự động hiểu là "tăng nhẹ tí xíu", còn sự thật là tỷ lệ chốt đã to lên một phần năm.

> Quy tắc vàng: khi bạn trừ hai tỷ lệ phần trăm cho nhau, kết quả luôn là **điểm phần trăm**, không phải phần trăm. Viết sai một chữ này là đủ để cả phòng họp hiểu sai mức độ.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="26" fill="#475569" font-size="15" font-weight="700">Tỷ lệ chuyển đổi: 10% → 12%, đọc theo hai cách</text>
  <!-- baseline scale 0..20% -->
  <line x1="60" y1="120" x2="600" y2="120" stroke="#334155" stroke-width="1.5"/>
  <text x="60" y="145" fill="#64748B" font-size="11" text-anchor="middle">0%</text>
  <text x="600" y="145" fill="#64748B" font-size="11" text-anchor="middle">20%</text>
  <!-- bar old 10% -->
  <rect x="60" y="88" width="270" height="20" rx="3" fill="#475569"/>
  <text x="195" y="80" fill="#94A3B8" font-size="13" font-weight="700" text-anchor="middle">Cũ: 10%</text>
  <!-- bar new 12% extension -->
  <rect x="330" y="88" width="54" height="20" rx="3" fill="#34D399"/>
  <text x="357" y="80" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">+2</text>
  <text x="430" y="103" fill="#34D399" font-size="13" font-weight="700">= 12%</text>
  <!-- absolute label -->
  <line x1="330" y1="118" x2="384" y2="118" stroke="#22D3EE" stroke-width="2"/>
  <text x="357" y="175" fill="#22D3EE" font-size="13" font-weight="700" text-anchor="middle">+2 ĐIỂM phần trăm</text>
  <text x="357" y="194" fill="#64748B" font-size="11" text-anchor="middle">chênh lệch tuyệt đối: 12 − 10</text>
  <!-- relative label -->
  <text x="180" y="240" fill="#F59E0B" font-size="13" font-weight="700" text-anchor="middle">+20% (tăng tương đối)</text>
  <text x="180" y="259" fill="#64748B" font-size="11" text-anchor="middle">phần tăng thêm so với nền 10%: 2 ÷ 10</text>
  <!-- divider note -->
  <text x="455" y="240" fill="#F87171" font-size="12" font-weight="700" text-anchor="middle">"tăng 2%" ≠ "tăng 2 điểm %"</text>
  <text x="455" y="259" fill="#64748B" font-size="11" text-anchor="middle">một chữ sai, hiểu lệch mức độ</text>
</svg>
<div class="viz-caption">Cùng một cú nhích 10% → 12% (số minh hoạ): đo theo điểm phần trăm là +2, đo theo thay đổi tương đối là +20%. Hai con số, hai câu chuyện.</div>
</div>

## Bẫy 1: phần trăm của phần trăm - giảm 50% rồi tăng 50% không về chỗ cũ

Đây là cái bẫy gây sốc nhất khi bạn lần đầu nhìn ra nó. Giá một sản phẩm là 100 nghìn. Bạn xả hàng giảm **50%** → còn 50 nghìn. Hết đợt, bạn tăng lại **50%**. Về 100 nghìn chứ gì? Không. 50 nghìn tăng 50% chỉ thành **75 nghìn**.

Vì sao? Vì mỗi phần trăm bám vào một **nền** khác nhau. Lần giảm tính trên nền 100; lần tăng tính trên nền 50. Phần trăm không cộng trừ thẳng được như số tiền - nó luôn dính chặt vào cái gốc nó đứng trên.

Bẫy này rình ở khắp nơi trong vận hành SME Việt:

- Biên lợi nhuận của bạn rớt 30% quý này, quý sau phục hồi 30% - bạn **vẫn chưa** về biên cũ.
- Doanh thu kênh TikTok Shop sụt 40% rồi gượng lại 40%, bạn nghĩ huề - thực ra vẫn thấp hơn ban đầu 16%.

> Quy tắc vàng: phần trăm tăng và phần trăm giảm **không** triệt tiêu nhau, vì chúng đứng trên hai cái nền khác kích cỡ. Muốn biết có về chỗ cũ không, hãy quay về số tuyệt đối rồi so.

## Bẫy 2: tăng từ nền nhỏ - "tăng 100%" nghe như phép màu

Tháng trước cửa hàng bạn có 1 đơn từ kênh Zalo. Tháng này có 2 đơn. Bạn báo cáo: **"đơn từ Zalo tăng 100%!"** Đúng về mặt số học. Nhưng cái nền chỉ là 1 - nên một phần trăm thay đổi cực lớn lại che giấu một thực tế cực nhỏ: bạn tăng đúng *một* đơn hàng.

Khi nền nhỏ, *thay đổi tương đối* phồng to một cách lừa mắt. Đây là chiêu quen thuộc trong những bản tin tăng trưởng: "lượng khách mới tăng gấp 3", "doanh thu mảng X tăng 250%" - mà không ai nói nền xuất phát là bao nhiêu. Một startup đi từ 2 lên 6 khách cũng "tăng 200%".

Cách tự vệ chỉ gồm một câu hỏi: *"Tăng 100% - nhưng từ bao nhiêu lên bao nhiêu?"* Nếu người báo cáo né con số tuyệt đối, gần như chắc chắn cái nền đang bé. Đây cũng là một biến thể của những cái bẫy trong [5 sai lầm kinh điển khi phân tích dữ liệu](/blog/sai-lam-khi-phan-tich-du-lieu/): con số đúng, cách đọc sai.

## Bẫy 3: cộng và bình quân các phần trăm một cách hồn nhiên

Shop bạn bán trên hai kênh. Tỷ lệ hoàn (return rate - tỷ lệ đơn bị trả lại) trên Shopee là **4%**, trên TikTok Shop là **10%**. Tỷ lệ hoàn trung bình toàn shop là (4 + 10) ÷ 2 = **7%**? Sai - trừ khi hai kênh có đúng cùng số đơn.

Giả sử Shopee có 1.000 đơn (40 đơn hoàn) và TikTok Shop chỉ 100 đơn (10 đơn hoàn). Tỷ lệ hoàn thật = 50 đơn hoàn ÷ 1.100 đơn = **4,5%**, không phải 7%. Lấy trung bình cộng hai phần trăm coi như mỗi kênh "nặng" như nhau, trong khi Shopee đông gấp 10 lần. Bạn vừa thổi phồng tỷ lệ hoàn lên gần gấp rưỡi và có thể hoảng loạn nhầm.

Cùng một cái bẫy ấy đội lốt khác: bình quân ROAS (Return on Ad Spend - doanh thu thu về trên mỗi đồng quảng cáo) của các chiến dịch, bình quân lãi suất của các khoản vay, bình quân biên lợi nhuận của các dòng sản phẩm. Mỗi tỷ lệ đứng trên một cái nền to nhỏ khác nhau, nên phải **đánh trọng số theo nền** - chứ không phải chia đều. Đây chính là cây cầu sang [Phần 5 - Trung bình có trọng số](/blog/trung-binh-co-trong-so/), nơi ta sẽ làm rõ cách gộp các tỷ lệ cho đúng.

## Bẫy 4: phần trăm thay đổi vs điểm thay đổi trong bảng KPI

Đây là cái bẫy âm thầm nhất, vì nó nấp ngay trong những dashboard trông rất chuyên nghiệp. Một cột KPI ghi "+2", một cột ghi "+20%", và không ai chú thích đơn vị. Người đọc tự điền nghĩa - thường là sai.

So sánh cho rõ. Cùng một sự kiện "tỷ lệ chốt 10% → 12%", tuỳ cách viết mà người đọc hiểu hoàn toàn khác:

| Cách viết trong báo cáo | Người đọc thường hiểu | Đúng / Gây hiểu lầm |
|---|---|---|
| "Tỷ lệ chốt tăng 2%" | Tăng tí xíu, gần như không đổi | Gây hiểu lầm - nghe như tương đối, thật ra là điểm |
| "Tỷ lệ chốt tăng 2 điểm phần trăm" | Từ 10% lên 12%, rõ ràng | Đúng và rõ |
| "Tỷ lệ chốt tăng 20%" | Tăng mạnh một phần năm | Đúng - nếu hiểu đây là thay đổi tương đối |
| "Tỷ lệ chốt tăng 20 điểm" | Từ 10% vọt lên 30% | Gây hiểu lầm - sai gấp mười lần thực tế |
| "Tỷ lệ chốt từ 10% lên 12%" | Đúng tuyệt đối, không lẫn | Đúng và an toàn nhất |

Cùng một sự thật, năm cách viết, ba mức độ rủi ro. Cách an toàn nhất hoá ra lại đơn giản nhất: **ghi luôn cả hai con số gốc** - "từ 10% lên 12%" - rồi nói thêm "+2 điểm %" hoặc "+20%" tuỳ điều bạn muốn nhấn. Khi cả nền lẫn đích đều có mặt, không ai diễn giải lệch được nữa.

## Cách nói cho rõ - một quy ước, dùng mãi

Bạn không cần học thuộc công thức. Bạn chỉ cần một thói quen ngôn ngữ:

- Khi **trừ hai tỷ lệ**, luôn viết **"điểm phần trăm"** (hoặc "điểm %"). 12% − 10% = 2 *điểm %*.
- Khi nói **một tỷ lệ tăng bao nhiêu phần so với chính nó**, dùng **"%"** và nói rõ là thay đổi tương đối. Từ 10% lên 12% là +20% *tương đối*.
- Khi nghi ngờ, **đưa luôn hai con số gốc**: "từ 10% lên 12%". Đây là liều vắc-xin chống mọi hiểu lầm.

Cùng tinh thần này, bài [Growth Accounting](/blog/growth-accounting/) cho thấy một con số tăng trưởng gộp luôn giấu các thành phần bên trong - và phần trăm cũng vậy: nó luôn giấu cái nền nó đang đứng trên. Nói rõ cái nền, bạn đã đi trước phần lớn người đọc số.

## Trong Semantix

Semantix không phải một con bot bắn ra "+20%" rồi để bạn tự đoán đó là điểm hay là tương đối. Ý tưởng đi ngược lại: khi bạn hỏi "tỷ lệ chốt tháng này so tháng trước thế nào", nó trả về *cả* hai con số gốc (10% và 12%), kèm cả "+2 điểm %" lẫn "+20%", ghi rõ đơn vị từng cái. Cái nền - thứ bị giấu kỹ nhất trong mọi con số phần trăm - luôn được bày ra cạnh tỷ lệ, để bạn không bao giờ ăn mừng một cú "tăng 100%" đi từ 1 lên 2.

## Tóm lại

| Bạn gặp... | Phản xạ sai | Câu hỏi cứu bạn |
|---|---|---|
| "Tỷ lệ tăng 2%" | Tăng tí xíu thôi | Là 2 *điểm %* hay 2% tương đối? |
| "Giảm 50% rồi tăng 50%" | Huề, về chỗ cũ | Quay về số tuyệt đối, còn 75% nền cũ |
| "Tăng 100%!" | Phép màu tăng trưởng | Từ bao nhiêu lên bao nhiêu? Nền có nhỏ không? |
| Bình quân các % của nhiều kênh | Chia đều rồi xong | Mỗi % đứng trên nền nào? Phải đánh trọng số |
| Cột "+2" và "+20%" trên dashboard | Đọc lướt, tự điền nghĩa | Đơn vị là gì - điểm hay phần trăm? |

Mọi cái bẫy phần trăm có chung một gốc rễ: một con số phần trăm không bao giờ tự đứng một mình - nó luôn dính vào một cái nền, và khi cái nền bị giấu đi, con số trở thành công cụ đánh lừa hoàn hảo. Nói rõ cái nền, ghi đúng đơn vị, và bạn đã miễn nhiễm với cả họ những lần đọc sai.

> Mental model: phần trăm là một cái bóng - kích thước của nó phụ thuộc vào vật đứng trước đèn (cái nền) nhiều như phụ thuộc vào chính nó. "Điểm phần trăm" là khi bạn đo bằng thước thật trên tường, không phải đo cái bóng.

---

*Muốn mọi con số phần trăm trong báo cáo tự ghi rõ nền và đơn vị, hết chuyện đọc lệch? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Rồi đọc tiếp [Phần 5 - Trung bình có trọng số](/blog/trung-binh-co-trong-so/) để biết cách gộp các tỷ lệ cho đúng.*
