---
title: "Net Dollar Retention: vì sao bạn có thể mất bớt khách - mà doanh thu vẫn đi lên"
code: "pt-019"
series: "growth-accounting"
seriesOrder: 3
description: "SaaS này mất 8% khách trong tháng. Doanh thu vẫn tăng 5%. Không nghịch lý: đó là negative churn. Net dollar retention và hai dòng tiền bản đếm-đầu-người không thấy."
pubDate: 2025-07-16
category: "Phân Tích Dữ Liệu"
readTime: 12
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/growth-accounting-revenue.png"
coverAlt: "Biểu đồ waterfall doanh thu: new, expansion, resurrected cộng vào, contraction và churned trừ đi, với nhãn NRR lớn hơn 100%"
---

<div class="series-nav">
  <div class="series-nav-title">📈 Series Growth Accounting · 4 phần</div>
  <ol>
    <li><a href="/blog/growth-accounting/">Phần 1 - Nền tảng: phương trình tăng trưởng</a></li>
    <li><a href="/blog/growth-accounting-quick-ratio/">Phần 2 - Quick Ratio: nhịp tim tăng trưởng</a></li>
    <li class="current">Phần 3 - Từ người dùng sang tiền: Net Dollar Retention</li>
    <li><a href="/blog/growth-accounting-thuc-chien/">Phần 4 - Thực chiến: dựng bảng growth accounting</a></li>
  </ol>
</div>

Tháng vừa rồi, một công ty phần mềm B2B Việt Nam mất 8% số khách đang trả phí. Đội Sales nhìn con số đó tái mặt. Nhưng đến cuối tháng, doanh thu định kỳ (MRR - Monthly Recurring Revenue, doanh thu định kỳ hàng tháng) lại **tăng 5%**. Không ai gian lận sổ sách. Không có hợp đồng khổng lồ nào rơi từ trên trời xuống. *(Các con số trong bài là ví dụ minh họa.)*

Phản xạ đầu tiên của bạn có thể là "chắc kéo được nhiều khách mới quá". Nhưng không - số khách mới tháng đó còn ít hơn bình thường. Sự thật ngược đời nằm ở chỗ khác: **nhóm khách CŨ - những người ở lại - năm nay chi nhiều hơn năm ngoái, đủ để bù cả phần khách rời đi lẫn phần khách mới hụt.** Hiện tượng này có tên: **negative churn** (churn âm - khách cũ chi thêm đủ để lấn át phần khách rời bỏ). Và nếu bạn chỉ đếm đầu người, bạn sẽ không bao giờ nhìn thấy nó.

Hai phần đầu của series, ta đếm **user** (người dùng) - ai vào, ai ở lại, ai rời đi (xem lại [Quick Ratio bản user](/blog/growth-accounting-quick-ratio/)). Phần này ta chuyển sang thứ thật sự trả lương: **tiền**. Và khi chuyển từ người sang tiền, hai dòng chảy mới xuất hiện - hai dòng mà bản đếm-đầu-người mù tịt.

## Đếm người là chưa đủ: hai dòng tiền mà bản user bỏ lỡ

Khi bạn chỉ đếm khách, mỗi khách hoặc "có" hoặc "không". Một khách đang ở lại = 1, dù tháng này họ chi 2 triệu hay 20 triệu. Đó là lỗ hổng. Vì trong đời thực, một khách "ở lại" có thể đang làm hai chuyện trái ngược nhau với ví tiền của họ:

- **Expansion (mở rộng):** khách cũ chi **nhiều hơn** kỳ trước. Họ nâng gói, mua thêm tính năng, đặt giỏ hàng to hơn, ký phụ lục hợp đồng. Vẫn là một con người - nhưng đem về nhiều tiền hơn.
- **Contraction (co lại):** khách cũ vẫn ở lại nhưng chi **ít đi**. Họ hạ gói, cắt số ghế (seat), mua thưa hơn, giỏ nhỏ lại. Chưa rời hẳn, nhưng đang rút lui.

Đếm đầu người, cả hai khách này đều là "1" - không thay đổi gì. Đếm tiền, một người là động cơ tăng trưởng, người kia là chỗ rò rỉ. Bản user xếp cả hai vào cùng ô "retained" và xong chuyện. Đó là lý do nó mù trước negative churn.

> Ẩn dụ: đếm khách như đếm số khách trong nhà hàng; đếm tiền như cộng hóa đơn từng bàn. Quán có thể vắng đi vài bàn mà tổng bill vẫn cao hơn - nếu những bàn còn lại gọi thêm món. Số ghế giảm, doanh thu tăng. Đó chính là negative churn.

## Phương trình doanh thu: năm dòng, không phải bốn

Ở Phần 1, phương trình **user** có bốn dòng: retained, new, resurrected, churned. Phương trình **doanh thu** kế thừa khung đó nhưng tách thêm hai dòng tiền vừa nói. Đặt cạnh nhau:

```
Revenue(t)   = retained + new + resurrected + expansion
Revenue(t-1) = retained + churned          + contraction
```

Năm dòng *thay đổi* giữa hai kỳ:

- **new** - doanh thu từ khách hoàn toàn mới (+)
- **expansion** - khách cũ chi thêm: upsell, mua kèm, giỏ to hơn (+)
- **resurrected** - khách từng rời, nay quay lại chi tiền (+)
- **contraction** - khách cũ chi ít đi nhưng chưa rời (-)
- **churned** - khách rời hẳn, ngừng chi (-)

Hình dung nó như một dòng nước: doanh thu kỳ trước đổ vào, ba vòi cộng thêm, hai lỗ rút bớt, còn lại là doanh thu kỳ này.

<div class="viz">
<div class="viz-chart" data-chart="waterfall" data-chart-data='{"items":[{"label":"Rev(t-1)","value":100,"type":"total"},{"label":"+ new","value":10},{"label":"+ expansion","value":12},{"label":"+ resurrected","value":3},{"label":"- contraction","value":-7},{"label":"- churned","value":-9},{"label":"Rev(t)","value":109,"type":"total"}],"unit":""}'></div>
<div class="viz-caption">Doanh thu kỳ này = kỳ trước + new + expansion + resurrected - contraction - churned. Ba vòi cộng, hai lỗ trừ. Mất 9 vì churn, nhưng expansion (+12) gánh ngược lại. Số minh họa.</div>
</div>

Để ý cột waterfall ở trên: khoản **churned -9** rất thật, khách thật sự rời. Nhưng riêng **expansion +12** đã lớn hơn cả churn. Đó là cơ chế của nghịch lý đầu bài - mất khách, doanh thu vẫn lên. Từ phương trình này, tốc độ tăng trưởng doanh thu (so % kỳ trước) chính là:

> **growth_rate ≈ new + resurrected + expansion - contraction - churn**

## Negative churn: chén thánh - lớn lên mà không cần một khách mới nào

Bây giờ tách riêng phần khách **hiện có**. Bỏ "new" ra ngoài, chỉ nhìn tập khách cũ: họ vừa rời đi (churned), vừa co lại (contraction), nhưng cũng vừa quay lại (resurrected) và chi thêm (expansion). Gộp lại thành một chỉ số:

> **Net churn = (churned + contraction - resurrected - expansion) / Revenue(t-1)**

Bình thường net churn **dương**: tập khách cũ hao mòn dần, mỗi tháng mất đi một ít doanh thu. Phải kéo khách mới về để bù. Đó là cái xô thủng đáy quen thuộc.

Nhưng khi **expansion + resurrected vượt qua churned + contraction**, net churn trở thành **âm**. Đây là điều kỳ diệu mà dân SaaS (Software as a Service - phần mềm cho thuê theo thuê bao) gọi là **negative churn** - hay "chén thánh" của tăng trưởng: *tập khách hiện có vẫn tự lớn lên theo thời gian, dù bạn không thêm một khách mới nào.*

Nhìn theo cohort (nhóm khách gộp theo thời điểm bắt đầu), hiện tượng này hiện ra dưới một cái tên khác: **NRR (Net Revenue Retention - tỷ lệ giữ doanh thu ròng từ một nhóm khách)**, còn gọi là NDR (Net Dollar Retention) - phần trăm doanh thu giữ lại từ một nhóm khách sau một năm, *sau khi* cộng expansion và trừ churn/contraction.

- **NRR = 90%** → một nhóm khách trị giá 100 đồng năm ngoái, năm nay còn 90. Đang co.
- **NRR = 120%** → nhóm đó nay đem về **120** đồng - dù không thêm khách nào. Negative churn.

Benchmark ngành phần mềm quốc tế xem **NRR > 100%** là dấu hiệu một sản phẩm khỏe: bạn ngồi yên, doanh thu từ khách cũ vẫn tự đi lên. *(Ngưỡng 100% là chuẩn ngành quốc tế, không phải con số bắt buộc cho mọi mô hình Việt Nam.)*

Ở Việt Nam, negative churn không chỉ có ở SaaS. Một shop ecom đạt negative churn khi **nhóm khách cũ năm nay chi nhiều hơn năm ngoái đủ để bù số người đã rời** - giỏ to hơn, mua thêm dòng sản phẩm mới, lên hạng thành viên. Gói hội viên F&B, hợp đồng B2B có upsell, hay app subscription đều có thể chạm tới trạng thái này. Khi đó tăng trưởng không còn phụ thuộc vào việc liên tục đốt tiền acquisition (thu hút khách mới) - một vị thế cực kỳ vững.

## Quick Ratio bản tiền & con số 4 của SaaS

Ở Phần 2, ta đã gặp **Quick Ratio** (tỉ lệ "tăng trên hao" = (khách mới + quay lại) / khách rời đi) bản user. Bản tiền cũng cùng tinh thần - đong sức khỏe của *dòng chảy* doanh thu kỳ hiện tại - nhưng có thêm hai dòng mới:

> **Dollar Quick Ratio = (new + resurrected + expansion) / (churned + contraction)**

Nó trả lời một câu rất thẳng: *cứ mỗi đồng doanh thu mất đi, bạn tạo ra được mấy đồng?* QR < 1 nghĩa là doanh thu đang **co** - mất nhanh hơn tạo. QR = 2 là kiếm gấp đôi phần mất.

Phiên bản nổi tiếng nhất do Mamoon Hamid (Kleiner Perkins) phổ biến, dùng cho MRR:

> **SaaS Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)**

Benchmark "khỏe" của ông cho startup SaaS giai đoạn tăng trưởng là **khoảng 4** - thêm được 4 đồng cho mỗi 1 đồng mất đi. *(Đây là ngưỡng ngành quốc tế, dùng để định hướng, không phải mục tiêu cứng cho SME Việt.)*

Nhưng con số tổng chưa kể hết. Điều quan trọng là **chất lượng** của tử số. Tăng trưởng do **expansion dẫn dắt** (expansion > new) là loại chất lượng cao nhất: doanh thu mới phần lớn đến từ khách *đã có*, mà bán thêm cho khách cũ thì rẻ hơn rất nhiều so với đi tìm khách mới. Công ty expansion-led lớn nhanh hơn cả tốc độ chi phí phình ra - đúng như Khách Loyal trong [phân tích RFM](/blog/rfm-segmentation/) (Recency, Frequency, Monetary - phân khúc khách theo lần mua gần nhất, tần suất và số tiền chi) mà ta nuôi để họ leo lên Champions.

## NRR vs Quick Ratio: đừng nhầm hai câu hỏi

Đây là chỗ rất nhiều người lẫn lộn, nên dừng lại một nhịp. NRR và Quick Ratio dùng *gần như cùng một bộ thành phần* - expansion, contraction, churn - nhưng trả lời **hai câu hỏi khác nhau**:

| | Nhìn theo hướng | Trả lời câu hỏi |
|---|---|---|
| **NRR / NDR** | **Lùi theo cohort** - bám một nhóm khách qua 12 tháng | "Tập khách *đã có* tự lớn lên hay co lại theo thời gian?" |
| **Quick Ratio** | **Dòng chảy kỳ hiện tại** - gộp mọi khách trong kỳ | "Nhịp tạo doanh thu kỳ này có nhanh hơn nhịp mất không?" |

NRR là một bức ảnh chụp số phận của một nhóm khách theo thời gian - chậm, sâu, nói về sức bền sản phẩm. Quick Ratio là nhịp tim của tháng này - nhanh, tức thời, gộp cả khách mới lẫn cũ vào dòng chảy. Một công ty có thể có NRR > 100% (khách cũ vẫn khỏe) nhưng Quick Ratio đang xấu đi (khách mới chững, churn tăng) - và ngược lại. Đọc cả hai mới đủ; đọc một rồi tưởng đã hiểu toàn cảnh là một cái bẫy quen thuộc.

## Tất cả nằm ở định nghĩa "doanh thu" - và đó là việc của Semantix

Cả năm dòng tiền, NRR lẫn dollar Quick Ratio đều dựa trên một thứ tưởng hiển nhiên mà thật ra rất rối: **thế nào là "doanh thu" của một khách trong một kỳ?** Tính theo ngày ghi nhận hay ngày xuất hóa đơn? Doanh thu gộp hay đã trừ hoàn/hủy? Một khách hạ gói rồi mua thêm món lẻ - là expansion hay contraction? Trả lời lệch một câu, cả bảng growth accounting (kế toán tăng trưởng) lệch theo. Và nhớ rằng doanh thu ghi nhận chưa phải tiền về tài khoản - [doanh thu tăng mà dòng tiền vẫn cạn](/blog/dong-tien-vs-loi-nhuan/) là chuyện thường gặp.

Semantix không phải một chatbot cắm thẳng vào database rồi đoán "doanh thu" là cột nào. Bạn định nghĩa "doanh thu", "khách hàng", "expansion" **một lần** trong [Semantic Layer](/blog/semantic-layer/) - chuẩn theo nghiệp vụ của chính bạn - rồi hỏi bằng tiếng Việt:

> **"Tính net dollar retention và dollar quick ratio theo tháng cho 12 tháng qua, tách rõ new, expansion, contraction và churn."**

Semantix hiểu đây là một bài growth accounting bản doanh thu, dựng đủ năm dòng theo đúng định nghĩa bạn đã chốt, và trả về cả waterfall lẫn NRR - không cần bạn viết một dòng SQL nào, cũng không lo mỗi báo cáo lại hiểu "doanh thu" một kiểu.

## Tóm lại

| Nếu bạn chỉ đếm... | Bạn sẽ bỏ lỡ... | Đếm đủ tiền, bạn thấy... |
|---|---|---|
| Số khách (user) | Khách cũ chi thêm / chi bớt | Expansion và contraction - hai dòng tiền ẩn |
| Doanh thu tổng | Vì sao mất khách mà tiền vẫn lên | Negative churn: khách cũ tự gánh tăng trưởng |
| Một chỉ số duy nhất | Khác biệt cohort vs dòng chảy | NRR (lùi) và Quick Ratio (hiện tại) - hai câu hỏi |
| QR tổng | Chất lượng của tăng trưởng | Expansion-led mới là loại lớn bền nhất |

Chuyển từ đếm người sang đếm tiền, bạn mới nhìn thấy thứ quan trọng nhất: một doanh nghiệp có thể *teo về số khách mà vẫn nở ra về doanh thu* - và đó thường là dấu hiệu của một sản phẩm khách hàng thật sự cần. Bạn vừa có đủ ngôn ngữ - năm dòng, NRR, dollar Quick Ratio. Phần 4 sẽ là **thực chiến**: dựng một bảng growth accounting hoàn chỉnh từ dữ liệu thật của bạn, từng bước một.

---

*Muốn biết tập khách của bạn đang co hay đang nở về doanh thu? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại NRR và quick ratio bản tiền - hoặc đọc tiếp [Phần 4: dựng bảng growth accounting](/blog/growth-accounting-thuc-chien/).*
