---
title: "Dự báo cho doanh nghiệp (Phần 2): mùa vụ & Tết - đọc seasonality để không vừa cháy hàng vừa tồn kho"
code: "pt-035"
series: "du-bao"
seriesOrder: 2
description: "Doanh thu tháng Tết gấp ba tháng thường. So với tháng trước thì 'bùng nổ', so với sau Tết thì 'sụp đổ'. Cả hai đều là tự lừa mình. Phần 2 của series: đọc seasonality cho đúng."
pubDate: 2025-06-29
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/mua-vu-tet-seasonality.png"
coverAlt: "Đường doanh thu theo tháng với các đỉnh Tết lặp lại qua nhiều năm"
---

<div class="series-nav">
  <div class="series-nav-title">🔮 Series Dự báo cho doanh nghiệp · 3 phần</div>
  <ol>
    <li><a href="/blog/du-bao-la-gi/">Phần 1 - Mọi dự báo đều sai (nhưng vẫn hữu ích)</a></li>
    <li class="current">Phần 2 - Mùa vụ &amp; Tết</li>
    <li><a href="/blog/du-bao-ton-kho-thuc-chien/">Phần 3 - Dự báo tồn kho thực chiến</a></li>
  </ol>
</div>

Tháng 2, một chủ shop bánh mứt ở Gò Vấp nhìn doanh thu nhảy gấp ba so với tháng 1 và quyết định nhập gấp đôi hàng cho năm sau. Tháng 3, vẫn người đó nhìn doanh thu rơi 70% so với tháng 2 và hoảng loạn cắt giảm nhân sự. Cả hai quyết định đều dựa trên một con số có thật. Và cả hai đều sai.

Đây là nghịch lý ít người chịu tin: **so doanh thu tháng này với tháng trước - vào mùa Tết - là cách tự lừa mình tinh vi nhất.** Bạn không đo sức khỏe của doanh nghiệp. Bạn chỉ đang đo cái lịch.

## Vấn đề gốc: bạn đang trộn ba thứ vào một con số

Mỗi con số doanh thu theo tháng thật ra là tổng của ba thành phần khác nhau, mà nếu không tách ra thì bạn đọc cái nào cũng sai:

- **Trend (xu hướng dài hạn - doanh nghiệp đang lớn lên hay co lại theo thời gian).** Đây là thứ bạn thực sự muốn biết.
- **Seasonality (tính mùa vụ - mẫu lên xuống lặp lại đều đặn theo mùa trong năm).** Tết, tựu trường, hè, 11.11 - những đợt phình ra co lại mà năm nào cũng đến.
- **Nhiễu (biến động ngẫu nhiên - mưa một tuần, một KOL nhắc tên, một sự cố giao hàng).**

Khi bạn so tháng 2 với tháng 1, bạn tưởng mình đang đo trend. Thực ra bạn đang đo seasonality, và còn lẫn cả nhiễu. Con số "tăng 200%" không nói gì về việc doanh nghiệp bạn đang khỏe hơn hay yếu hơn - nó chỉ xác nhận rằng tháng 2 năm nay vẫn có Tết, giống mọi năm.

## Hai cái bẫy đối xứng - và cả hai đều giết quyết định

Cái bẫy này có hai mặt, và hầu hết chủ doanh nghiệp dính cả hai trong cùng một quý.

**Bẫy "bùng nổ giả":** so tháng Tết với tháng thường liền trước. Doanh thu gấp ba, biểu đồ dựng đứng, ai cũng phấn khích. Bạn kết luận sản phẩm đang thắng, nhập hàng ồ ạt, thuê thêm người. Nhưng cú nhảy đó là *cái lịch* tạo ra, không phải bạn. Một shop đang chết dần vẫn có tháng Tết gấp ba - vì khách Việt vẫn mua sắm Tết bất kể shop của bạn tốt hay tệ.

**Bẫy "sụp đổ giả":** so tháng sau Tết với chính tháng Tết. Doanh thu rơi 70%, biểu đồ lao dốc, bạn hoảng. Bạn cắt ngân sách, sa thải, ghìm nhập hàng. Nhưng cú rơi đó cũng là cái lịch - tháng 3 nào cũng "sụp" so với tháng 2, kể cả ở những doanh nghiệp đang tăng trưởng đẹp nhất. Cắt giảm vì một cú rơi mùa vụ là tự bắn vào chân ngay trước mùa cao điểm tiếp theo.

> Quy tắc vàng: **không bao giờ so một tháng mùa vụ với tháng liền kề.** So tháng Tết với tháng Tết, tháng 6 với tháng 6 - cùng kỳ năm trước (year-over-year), không phải cạnh kề.

## Cách đọc đúng: so cùng kỳ năm trước

Cách thoát cả hai bẫy là cùng một công cụ: **year-over-year (cùng kỳ năm trước - so tháng này với chính tháng đó của năm ngoái).** Khi bạn đặt tháng Tết năm nay cạnh tháng Tết năm ngoái, seasonality bị triệt tiêu - vì cả hai đều có Tết - và phần còn lại chính là trend thật.

Nhìn cùng một dữ liệu qua nhiều năm, mẫu mùa vụ hiện ra rõ như vân tay: cùng những đỉnh, cùng những đáy, lặp lại đều đặn.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],"yUnit":"tỷ","series":[{"name":"2024","values":[1.2,3.4,1.0,0.9,1.0,1.1,0.9,1.4,1.3,1.2,1.8,1.6],"color":"#64748b","endLabel":true},{"name":"2025","values":[1.5,4.0,1.3,1.1,1.2,1.3,1.1,1.7,1.6,1.5,2.2,2.0],"color":"#22d3ee","endLabel":true}]}'></div>
<div class="viz-caption">Doanh thu theo tháng, hai năm chồng lên nhau. Đỉnh Tết (T2) và đỉnh sale cuối năm (T11) lặp lại y hệt - đó là seasonality. Năm 2025 nằm cao hơn 2024 ở mọi tháng - đó mới là trend thật.</div>
</div>

Đọc biểu đồ này có hai tầng. Tầng một: **hình dạng** của hai đường giống hệt nhau - đỉnh tháng 2, đáy tháng 3-7, nhô lên tháng 8 (tựu trường), bùng tháng 11 (11.11 và 12.12). Đó là dấu vân tay mùa vụ của ngành bạn. Tầng hai: đường 2025 nằm *cao hơn đều* đường 2024 ở mọi điểm. Khoảng cách dọc đó - không phải độ dốc lên xuống - mới là tăng trưởng thật. Đó là con số bạn nên dùng để ra quyết định.

Cùng logic này, ở một nhịp thời gian khác, là cách [đọc số theo từng giờ trong đêm sale TikTok Shop](/blog/tiktok-shop-mua-sale-gia-theo-gio/): vấn đề không phải thiếu dữ liệu, mà là so sai đơn vị thời gian.

## Cảnh báo riêng cho Việt Nam: Tết âm lịch trôi theo dương lịch

Đây là cái bẫy mà công cụ phân tích nước ngoài không bao giờ cảnh báo bạn, vì nó chỉ xảy ra với lịch âm. **Tết Nguyên đán rơi vào ngày dương lịch khác nhau mỗi năm** - có năm cuối tháng 1, có năm giữa tháng 2.

Hậu quả: nếu một năm Tết rơi vào tháng 1 và năm sau rơi vào tháng 2, thì so "tháng 2 năm nay với tháng 2 năm ngoái" là so *tháng có Tết với tháng không có Tết* - và bạn lại tự lừa mình lần nữa, lần này ngay trong chính phép so year-over-year mà lẽ ra phải đáng tin.

> Quy tắc vàng cho lịch âm: khi Tết trôi giữa hai tháng dương lịch, đừng so theo tháng. Gộp **tháng 1 + tháng 2** thành một cụm "mùa Tết" rồi mới so năm này với năm kia.

Đây cũng là lý do dùng *nhiều năm* quan trọng hơn dùng hai năm: với ba, bốn năm dữ liệu, bạn thấy được Tết trôi quanh đâu, mùa thấp điểm kéo dài bao lâu, và phân biệt được "năm nay khác thường" với "mẫu vốn vẫn vậy".

## Từ đọc số đến ra quyết định: nhập hàng và nhân sự theo mùa

Mục đích cuối cùng của việc tách seasonality khỏi trend không phải để có biểu đồ đẹp - mà để bạn không rơi vào cảnh *vừa cháy hàng vừa tồn kho* trong cùng một năm.

Khi bạn biết tháng 2 năm nào cũng gấp ba và tháng 11 năm nào cũng gấp đôi, bạn nhập hàng và xếp ca *trước* mùa, theo mẫu lặp lại, chứ không chạy theo con số tháng vừa rồi. Bạn không nhập đại trà rồi cầu may; bạn nhân con số nền (đã loại mùa vụ) với hệ số mùa của từng tháng.

| Nếu bạn quyết định theo... | Hệ quả điển hình |
|---|---|
| Tháng liền trước | Nhập ào ạt sau khi thấy Tết bùng → ôm tồn cả nửa năm |
| Cảm giác "năm nay chắc đông" | Thiếu hàng đúng đỉnh Tết → cháy hàng, mất khách cho đối thủ |
| Cùng kỳ năm trước + nhiều năm | Nhập đúng lượng, xếp đúng ca, vốn không chôn, kệ không trống |

Phân tích mùa vụ ăn khớp tự nhiên với [cohort analysis](/blog/cohort-analysis/): cohort cho bạn biết *khách giữ chân ra sao theo thời gian*, còn seasonality cho biết *khi nào họ sẽ quay lại mua*. Ghép hai cái lại, bạn dự được cả ai sẽ mua lẫn lúc nào họ mua.

## ... trong Semantix

Vấn đề gốc không phải bạn thiếu dữ liệu - mọi shop đều có lịch sử doanh thu theo tháng. Vấn đề là tách seasonality khỏi trend bằng tay thì cực: phải dựng pivot nhiều năm, canh lệch Tết âm lịch, tính hệ số mùa cho từng tháng. Semantix không phải một con bot đoán mò xu hướng; nó là **lớp ngữ nghĩa hiểu "cùng kỳ năm trước" và "mùa Tết" nghĩa là gì trong dữ liệu của bạn**, để bạn hỏi thẳng bằng tiếng Việt:

> *"So doanh thu mùa Tết năm nay với hai năm trước, gộp tháng 1 và tháng 2"*

> *"Tháng nào trong năm doanh thu đỉnh nhất, lặp lại qua mấy năm gần đây?"*

Semantix hiểu Tết là mùa vụ, tự gộp đúng cụm tháng, loại phần mùa vụ để lộ trend thật - trả về biểu đồ nhiều năm chồng lên nhau trong vài giây. Phần *nhập bao nhiêu, thuê mấy ca* vẫn là quyết định của bạn - và đó đúng là chỗ nó nên thuộc về.

## Tóm lại

| | So tháng liền kề | So cùng kỳ năm trước |
|---|---|---|
| **Tháng Tết** | "Bùng nổ" giả → nhập thừa | Thấy trend thật sau mùa vụ |
| **Tháng sau Tết** | "Sụp đổ" giả → cắt nhầm | Biết đây là đáy mùa bình thường |
| **Tết trôi lịch** | Sai âm thầm | Gộp cụm Tết, so đúng |
| **Quyết định nhập hàng** | Chạy theo tháng vừa rồi | Theo mẫu lặp nhiều năm |

Câu hỏi đúng cho mùa Tết tới không phải "tháng này tăng hay giảm so với tháng trước?" - mà là **"so với chính mùa này năm ngoái, mình đang ở đâu?"** Trả lời được câu đó, bạn sẽ không còn vừa cháy hàng vừa ôm tồn trong cùng một năm.

> **Mental model:** doanh thu mỗi tháng = trend × seasonality × nhiễu. So tháng liền kề trộn cả ba; so cùng kỳ năm trước triệt seasonality để lộ trend. Đừng đọc cái lịch rồi tưởng đó là sức khỏe doanh nghiệp.

---

*Muốn biết mùa Tết năm nay doanh nghiệp bạn thật sự khỏe hơn hay chỉ đang đọc cái lịch? [Kết nối dữ liệu rồi hỏi cùng kỳ năm trước bằng tiếng Việt - dùng thử miễn phí.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 3 - Dự báo tồn kho thực chiến](/blog/du-bao-ton-kho-thuc-chien/): biến mẫu mùa vụ này thành con số nhập hàng cụ thể cho từng mã.*
