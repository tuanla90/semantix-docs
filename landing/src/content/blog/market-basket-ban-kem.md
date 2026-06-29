---
title: "Market Basket: sản phẩm nào 'đi cùng nhau' - và cách bán kèm đúng"
code: "pt-011"
description: "Gợi ý mua kèm sai làm khách bực mình. Gợi ý đúng làm giỏ hàng to lên. Khác biệt nằm ở ba con số: support, confidence, lift."
pubDate: 2025-10-01
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/market-basket-ban-kem.svg"
coverAlt: "Giỏ hàng và các sản phẩm nối nhau bằng đường, minh hoạ phân tích Market Basket"
---

Một tiệm tạp hoá ở Đà Nẵng bật tính năng "gợi ý mua kèm" trên web bán hàng. Logic nghe rất hợp lý: ai mua bỉm cũng mua sữa, nên cứ thấy khách bỏ bỉm vào giỏ là đẩy popup "mua thêm sữa?". Một tháng sau, tỷ lệ bấm vào gợi ý gần bằng không. Khách khó chịu, vài người còn nhắn "tôi biết mua sữa rồi, đừng nhắc nữa".

Cùng lúc đó, một shop mỹ phẩm nhỏ hơn lại âm thầm tăng giá trị mỗi đơn lên 18%. Họ cũng gợi ý mua kèm - nhưng gợi ý tẩy trang cho người mua kem chống nắng, gợi ý cọ cho người mua phấn. Khách thấy "ừ đúng, suýt quên". Giỏ hàng to lên một cách tự nhiên.

Đây là nghịch lý ít người chịu tin: **gợi ý bán kèm sai không phải vô hại - nó làm khách bực mình và bỏ đi. Gợi ý đúng thì làm giỏ hàng to lên mà khách thấy mình được chăm.** Khác biệt giữa hai kết quả ấy không nằm ở việc "có gợi ý hay không", mà ở chỗ bạn có biết sản phẩm nào *thật sự* đi cùng nhau hay không. Và đó chính là việc của **Market Basket** (phân tích giỏ hàng - soi các hoá đơn để tìm những sản phẩm hay được mua chung).

## Market Basket là gì - và vì sao "cảm giác" hay sai

Phân tích giỏ hàng nhìn vào từng hoá đơn như một cái giỏ, rồi đếm: trong tất cả các giỏ, những món nào hay nằm cạnh nhau? Mục tiêu là tìm ra các cặp (hoặc cụm) sản phẩm đi kèm, để bạn làm **cross-sell** (bán kèm - gợi khách mua thêm món bổ trợ) cho đúng: dựng combo, đặt gợi ý "mua kèm", xếp kệ, gói bundle.

Nghe thì đơn giản, nhưng "cảm giác" của chủ shop hay sai theo hai hướng. Một là thấy hai món hay đi cùng rồi vội kết luận "phải ép thành combo" - trong khi có khi chúng đi cùng chỉ vì *ai cũng mua cả hai* (như bỉm và sữa: gợi ý là thừa). Hai là bỏ sót những cặp ít gặp nhưng cực kỳ "ăn ý" - chính những cặp này mới là mỏ vàng cross-sell.

Để tách tín hiệu thật khỏi nhiễu, Market Basket dùng **ba con số**. Đừng sợ - bình dân hoá ra thì cả ba đều dễ.

## Ba con số: support, confidence, lift

Lấy ví dụ một cặp quen thuộc trong shop mỹ phẩm: **kem chống nắng → tẩy trang** (khách mua kem chống nắng, có mua kèm tẩy trang không?).

- **Support (độ phổ biến - cặp này xuất hiện trong bao nhiêu phần trăm tổng số đơn).** Nếu trong 1.000 đơn có 80 đơn chứa *cả hai* món, support = 8%. Con số này trả lời: "cặp này có đủ thường gặp để đáng quan tâm không?". Support quá thấp (vài đơn) thì dù tỷ lệ đẹp cũng chỉ là may rủi.

- **Confidence (độ tin cậy - mua A rồi thì bao nhiêu phần trăm cũng mua B).** Trong số người mua kem chống nắng, bao nhiêu phần trăm mua kèm tẩy trang? Nếu 200 người mua kem chống nắng mà 80 người mua kèm tẩy trang, confidence = 40%. Con số này trả lời: "gợi ý này trúng cỡ nào?".

- **Lift (độ cộng hưởng - mua kèm cao hơn ngẫu nhiên bao nhiêu lần).** Đây là con số quan trọng nhất, và cũng bị bỏ quên nhiều nhất. Lift hỏi: việc khách mua A có *thật sự* kéo theo việc mua B, hay B vốn ai cũng mua nên trông như đi kèm? Cách hiểu: lift = 1 nghĩa là không liên quan (đi cùng nhau đúng bằng mức ngẫu nhiên); **lift > 1 mới là tín hiệu thật** (đi cùng nhau nhiều hơn tình cờ); lift < 1 là kỵ nhau (mua cái này thì ít mua cái kia).

> Quy tắc vàng: **support nói "có đủ thường gặp không", confidence nói "trúng cỡ nào", còn lift nói "có thật không".** Một cặp đáng làm combo phải mạnh ở cả ba - đặc biệt là lift phải lớn hơn 1 một cách rõ rệt.

## Bẫy số một: cặp phổ biến giả

Giờ là chỗ hầu hết mọi người trượt. Hãy nhìn cặp **túi nilon** và bất kỳ món nào trong tạp hoá. Túi nilon xuất hiện trong gần như mọi đơn, nên support của nó với mọi thứ đều cao, confidence cũng cao. Nếu bạn chỉ nhìn hai con số đầu, bạn sẽ kết luận "nên gợi ý túi nilon kèm... tất cả mọi thứ". Vô nghĩa.

Đây là lúc lift cứu bạn. Vì túi nilon vốn đi với *mọi* đơn, lift của nó với từng món chỉ quanh quẩn mức 1 - tức là không có cộng hưởng thật, chỉ là phổ biến. Một **cặp phổ biến giả** (popular-pair illusion - hai món trông như đi kèm chỉ vì cả hai đều bán chạy) luôn lộ mặt khi bạn tính lift.

Cùng logic đó với bỉm và sữa ở đầu bài: chúng hay đi cùng, nhưng người mua bỉm vốn đã định mua sữa rồi - lift không cao như tưởng, và quan trọng hơn, **gợi ý một thứ khách chắc chắn mua là gợi ý thừa.** Cross-sell có giá trị nhất khi nó nhắc khách món họ *suýt quên*, không phải món họ *chắc chắn lấy*.

*Ví dụ minh hoạ* - vài cặp từ một shop bán lẻ đa kênh:

| Cặp sản phẩm (A → B) | Support | Confidence | Lift | Đọc ra sao |
|---|---|---|---|---|
| Kem chống nắng → Tẩy trang | 8% | 40% | 3,2 | Tín hiệu thật, làm combo |
| Phấn nền → Cọ trang điểm | 5% | 35% | 4,1 | Tín hiệu mạnh, gợi "mua kèm" |
| Bỉm → Sữa bột | 14% | 62% | 1,3 | Hay đi cùng nhưng gợi ý thừa |
| Túi nilon → Mì gói | 22% | 70% | 1,0 | Phổ biến giả, bỏ qua |
| Cà phê phin → Sữa đặc | 6% | 48% | 3,8 | Tín hiệu thật, xếp kệ cạnh nhau |

Nhìn cột Confidence, "túi nilon → mì gói" (70%) trông hấp dẫn nhất. Nhưng nhìn cột Lift (1,0), nó chỉ là nhiễu. Trong khi "phấn nền → cọ" confidence thấp hơn (35%) lại có lift 4,1 - đây mới là cặp đáng đặt gợi ý. **Confidence dụ bạn, lift mới nói thật.**

## Mạng lưới sản phẩm đi kèm trông như thế nào

Khi bạn tính lift cho nhiều cặp và chỉ giữ lại những cặp lift cao, bức tranh hiện ra không phải một danh sách, mà một *mạng lưới*: vài sản phẩm trung tâm kéo theo nhiều món khác, vài cụm tách biệt rõ ràng (mảng skincare đi với nhau, mảng đồ bếp đi với nhau).

<div class="viz">
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- edges (lift cao = đậm) -->
  <line x1="170" y1="110" x2="330" y2="80" stroke="#22c55e" stroke-width="4"/>
  <line x1="170" y1="110" x2="320" y2="190" stroke="#4ade80" stroke-width="3"/>
  <line x1="330" y1="80" x2="490" y2="120" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="320" y1="190" x2="470" y2="240" stroke="#22c55e" stroke-width="4"/>
  <line x1="320" y1="190" x2="180" y2="250" stroke="#4ade80" stroke-width="3"/>
  <line x1="490" y1="120" x2="470" y2="240" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>
  <!-- nodes -->
  <circle cx="170" cy="110" r="34" fill="#15803d"/>
  <text x="170" y="106" fill="#fff" font-size="12" font-weight="800" text-anchor="middle">Kem</text>
  <text x="170" y="122" fill="#bbf7d0" font-size="11" text-anchor="middle">chống nắng</text>
  <circle cx="330" cy="80" r="30" fill="#22c55e"/>
  <text x="330" y="84" fill="#06351f" font-size="12" font-weight="800" text-anchor="middle">Tẩy trang</text>
  <circle cx="320" cy="190" r="32" fill="#22c55e"/>
  <text x="320" y="194" fill="#06351f" font-size="12" font-weight="800" text-anchor="middle">Phấn nền</text>
  <circle cx="470" cy="240" r="28" fill="#4ade80"/>
  <text x="470" y="244" fill="#06351f" font-size="12" font-weight="800" text-anchor="middle">Cọ</text>
  <circle cx="180" cy="250" r="28" fill="#4ade80"/>
  <text x="180" y="246" fill="#06351f" font-size="11" font-weight="800" text-anchor="middle">Sữa rửa</text>
  <text x="180" y="261" fill="#06351f" font-size="11" font-weight="800" text-anchor="middle">mặt</text>
  <circle cx="490" cy="120" r="26" fill="#9ca3af"/>
  <text x="490" y="116" fill="#1f2937" font-size="11" font-weight="800" text-anchor="middle">Túi</text>
  <text x="490" y="130" fill="#1f2937" font-size="11" font-weight="800" text-anchor="middle">nilon</text>
  <!-- legend -->
  <line x1="430" y1="300" x2="470" y2="300" stroke="#22c55e" stroke-width="4"/>
  <text x="478" y="304" fill="#16a34a" font-size="12" font-weight="700">lift cao (đáng làm)</text>
  <line x1="430" y1="320" x2="470" y2="320" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="478" y="324" fill="#64748b" font-size="12">lift ≈ 1 (phổ biến giả)</text>
</svg>
<div class="viz-caption">Mạng lưới sản phẩm đi kèm: đường càng đậm thì lift càng cao (cộng hưởng thật). Túi nilon nối tới mọi thứ bằng đường mờ - phổ biến nhưng không có tín hiệu thật. *(số liệu minh hoạ)*</div>
</div>

Đọc tấm bản đồ này, bạn thấy ngay đâu là "trục" để dựng combo (kem chống nắng và phấn nền là hai nút trung tâm), và đâu là nút cần bỏ qua dù trông to (túi nilon, chỉ toàn đường mờ).

## Bốn cách dùng Market Basket cho shop của bạn

Tương quan đi kèm **không** tự động có nghĩa "phải ép combo". Nó là tấm bản đồ để bạn chọn nước đi phù hợp:

- **Combo / bundle:** lấy cặp lift cao bán thành gói có ưu đãi nhẹ. Combo "kem chống nắng + tẩy trang" hợp lý hơn nhiều combo "bỉm + sữa" (cái sau khách vốn đã mua cả hai).
- **Gợi ý "mua kèm" tại checkout:** chỉ bật gợi ý cho cặp lift > 1 rõ rệt. Một gợi ý trúng làm khách thấy được chăm; mười gợi ý sai làm khách tắt popup mãi mãi.
- **Xếp kệ / sắp layout web:** đặt cà phê phin cạnh sữa đặc, cọ cạnh phấn - để khách tự nhặt kèm mà chẳng cần ai nhắc. Đây là cross-sell "im lặng", không gây phiền.
- **Đừng đụng vào cặp lift ≈ 1:** chúng phổ biến nhưng không cộng hưởng. Gợi ý chúng chỉ tốn không gian và sự kiên nhẫn của khách.

Nếu bạn từng đọc [Pareto 80/20](/blog/pareto-80-20/), bạn sẽ thấy hai công cụ này khớp nhau: Pareto chỉ ra *cái đuôi dài* thường nuôi *cái đầu* qua việc hoàn thiện giỏ hàng - còn Market Basket chỉ cho bạn biết *chính xác* món đuôi nào đi với món ngôi sao nào. Và khi bạn biết khách nào hay mua kèm, [RFM Segmentation](/blog/rfm-segmentation/) giúp bạn chọn đúng nhóm khách để đẩy gợi ý (nhóm Loyal đón cross-sell tốt hơn nhóm vừa mua lần đầu).

## Market Basket với Semantix

Tự tay làm phân tích giỏ hàng tử tế là việc nặng cho analyst: viết SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) ghép từng đơn với chính nó để tìm cặp, đếm support, tính confidence, rồi tính lift cho hàng nghìn cặp, lọc nhiễu. Sai một bước là kết luận sai.

Semantix không phải một chatbot cắm vào database rồi đoán bừa các cặp. Bạn định nghĩa "đơn hàng", "sản phẩm", "doanh thu" một lần trong [Semantic Layer](/blog/semantic-layer/), rồi hỏi thẳng bằng tiếng Việt:

> **"Phân tích giỏ hàng 6 tháng qua: những cặp sản phẩm nào hay được mua kèm với lift cao nhất, bỏ qua các cặp chỉ phổ biến mà không cộng hưởng?"**

Semantix hiểu đây là Market Basket, tự tính cả ba chỉ số trên chính dữ liệu của bạn, lọc bỏ cặp phổ biến giả, và trả về danh sách cặp đáng làm combo - để bạn đẩy đúng gợi ý, không làm khách bực mình.

## Tóm lại

| Bán kèm "cảm tính" | Bán kèm bằng Market Basket |
|---|---|
| Gợi ý theo trực giác chủ shop | Gợi ý theo support · confidence · lift |
| Nhìn confidence cao là làm | Chỉ làm khi lift > 1 rõ rệt |
| Ép combo mọi cặp hay đi cùng | Bỏ cặp phổ biến giả (túi nilon, bỉm+sữa) |
| Gợi ý món khách chắc chắn mua | Gợi ý món khách suýt quên |
| Mười popup sai, khách tắt hết | Một gợi ý trúng, giỏ hàng to lên |

> Mental model: **đi kèm nhiều chưa chắc là tín hiệu - lift mới là tín hiệu.** Trước khi dựng combo hay bật gợi ý, hỏi: cặp này có cộng hưởng thật (lift > 1), hay chỉ phổ biến vì ai cũng mua? Cross-sell đúng là nhắc khách món họ suýt quên, không phải món họ chắc chắn lấy.

---

*Muốn biết cặp sản phẩm nào trong shop của bạn thật sự đáng bán kèm? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại danh sách cặp đi kèm theo lift - không cần SQL.*
