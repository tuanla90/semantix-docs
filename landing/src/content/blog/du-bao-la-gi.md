---
title: "Dự báo cho doanh nghiệp (Phần 1): mọi dự báo đều sai — và vì sao vẫn nên làm"
code: "pt-034"
series: "du-bao"
seriesOrder: 1
description: "Dự báo nào rồi cũng lệch so với thực tế. Nhưng không dự báo còn tệ hơn nhiều. Phần 1 của series: vì sao mục tiêu là giảm bất định, không phải đoán đúng."
pubDate: 2027-06-29
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/du-bao-la-gi.svg"
coverAlt: "Đường doanh thu thực tế nối sang đường dự báo nét đứt, kèm dải sai số loe rộng dần về tương lai"
---

<div class="series-nav">
  <div class="series-nav-title">🔮 Series Dự báo cho doanh nghiệp · 3 phần</div>
  <ol>
    <li class="current">Phần 1 — Mọi dự báo đều sai (nhưng vẫn hữu ích)</li>
    <li><a href="/blog/mua-vu-tet-seasonality/">Phần 2 — Mùa vụ &amp; Tết</a></li>
    <li><a href="/blog/du-bao-ton-kho-thuc-chien/">Phần 3 — Dự báo tồn kho thực chiến</a></li>
  </ol>
</div>

Cuối tháng, sếp hỏi: "Tháng sau bán được bao nhiêu?" Bạn nhìn số tháng này — 820 triệu — rồi đáp gọn: "Khoảng 850 triệu." Một con số tròn trịa, nghe có vẻ chắc chắn. Sếp gật đầu, đặt hàng nhập kho theo con số đó.

Tháng sau khép sổ: 790 triệu. Bạn sai. Kho thừa hàng. Và phản xạ đầu tiên của bạn là tự trách: "Lần sau phải dự báo cho *chuẩn* hơn."

Đó chính là cái bẫy. Vì đây là sự thật ngược đời mà ít người chịu tin: **mọi dự báo đều sai.** Không phải "dự báo của bạn dở", mà *bản chất* của dự báo là sai — con số 850 triệu kia gần như chắc chắn không bao giờ trúng phóc, dù bạn có giỏi đến đâu. Tương lai không phải một con số. Nó là một vùng.

Nhưng đây mới là vế quan trọng: *không* dự báo còn tệ hơn nhiều. Câu hỏi đúng không phải "làm sao đoán trúng?", mà là "làm sao **giảm bất định** đủ để quyết định tốt hơn?"

## "Mọi mô hình đều sai, vài cái hữu ích"

Có một câu kinh điển trong giới thống kê: *"Mọi mô hình đều sai, nhưng vài cái hữu ích."* Dự báo (forecast — ước lượng giá trị tương lai dựa trên dữ liệu quá khứ) là một mô hình. Nó không hứa hẹn nói đúng tương lai. Nó hứa thu hẹp khoảng mò mẫm của bạn — từ "không biết gì" xuống còn "biết tương đối, trong một biên độ".

Hãy đổi cách nghĩ. Mục tiêu của dự báo **không phải** là một con số đúng. Mục tiêu là **một quyết định tốt hơn khi chưa biết tương lai**: nhập bao nhiêu hàng, thuê thêm mấy người, có nên chạy chiến dịch không. Một dự báo tồi vẫn tốt hơn việc nhắm mắt đoán bừa — miễn là bạn hiểu nó sai đến mức nào, và sai về hướng nào.

> Quy tắc vàng: đừng hỏi "dự báo này có đúng không?". Hãy hỏi "dự báo này có giúp tôi quyết định bớt rủi ro hơn không?". Đúng/sai là tư duy của thầy bói; bớt rủi ro là tư duy của người kinh doanh.

## Bắt đầu từ thứ đơn giản đến mức bạn sẽ ngạc nhiên

Trước khi nghĩ tới mô hình phức tạp, hãy biết về **baseline** (dự báo nền — phép dự báo ngây thơ nhất, dùng làm mốc so sánh). Có hai baseline kinh điển, và chúng dễ đến mức buồn cười:

- **"Tháng sau giống tháng này."** Tháng này bán 820 triệu → dự báo tháng sau 820 triệu. Gọi là *naive forecast* (dự báo ngây thơ — lấy giá trị gần nhất làm dự báo).
- **"Như cùng kỳ năm ngoái."** Tháng 6 năm ngoái bán 700 triệu, năm nay thường tăng ~15% → dự báo 805 triệu. Đây là baseline *theo mùa* — đặc biệt hợp với hàng có chu kỳ rõ.

Vì sao phải bận tâm thứ "ngây thơ" này? Vì nó là **thước đo**. Bất kỳ mô hình cầu kỳ nào bạn xây sau này cũng phải *đánh bại được baseline* thì mới đáng công. Rất nhiều mô hình "thông minh" hóa ra còn dự báo tệ hơn câu "tháng sau giống tháng này" — và bạn chỉ biết điều đó nếu có baseline để đối chiếu.

## Ba thành phần ẩn trong mọi chuỗi số

Doanh thu tháng của bạn không phải một đường thẳng. Nhìn kỹ, mọi chuỗi số kinh doanh đều là tổng của ba thứ:

| Thành phần | Là gì | Ví dụ |
|---|---|---|
| **Xu hướng** (trend) | Chiều đi lên/xuống *dài hạn* | Doanh thu nhích đều +3%/tháng cả năm |
| **Mùa vụ** (seasonality) | Nhịp lặp lại theo chu kỳ | Tết tăng vọt, tháng 7 âm chững lại |
| **Nhiễu** (noise) | Dao động ngẫu nhiên còn lại | Một khách lớn tình cờ đặt to tháng này |

**Xu hướng** (trend — hướng đi dài hạn của chỉ số, sau khi gạt bỏ dao động ngắn hạn) là phần bạn *muốn* nắm bắt: nó cho biết doanh nghiệp đang lớn lên hay co lại. **Nhiễu** (noise — biến động ngẫu nhiên không phản ánh thay đổi thật) là phần bạn *không thể* và *không nên* cố dự báo — cố đoán nhiễu là tự lừa mình. Còn mùa vụ là một con thú riêng, đủ quan trọng để dành hẳn Phần 2.

Việc tách nhiễu khỏi phần có ý nghĩa chính là chủ đề của [tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/) — và nó là nền tảng để hiểu vì sao mọi dự báo đều phải kèm một biên sai số.

## Một con số dự báo là một lời nói dối lịch sự

Đây là điểm quan trọng nhất của cả bài, hãy đọc chậm: **đừng bao giờ tin một con số dự báo đơn lẻ.**

Khi bạn nói "tháng sau 850 triệu", bạn đang giấu đi điều bạn thật sự biết: rằng con số đó *có thể* là 800, *có thể* là 900. Một dự báo tử tế không phải một con số — nó là một **khoảng tin cậy** (confidence interval — vùng giá trị mà kết quả thực tế nhiều khả năng rơi vào, kèm mức xác suất). Thay vì "850 triệu", hãy nói: *"khoảng 820–880 triệu, nhiều khả năng quanh 850."*

Cái khoảng đó chính là **sai số dự báo** (forecast error — độ lệch giữa giá trị dự báo và giá trị thực tế) được nói ra một cách trung thực. Nó không phải dấu hiệu bạn yếu kém — nó là dấu hiệu bạn *thành thật*. Sếp đặt hàng nhập kho dựa trên một con số đơn lẻ sẽ luôn thừa hoặc thiếu. Sếp đặt hàng dựa trên một khoảng sẽ biết chừa biên an toàn.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","nay","T6","T7","T8"],"series":[{"name":"Thực tế","values":[90,104,118,130,150,null,null,null],"color":"#94a3b8"},{"name":"Dự báo","values":[null,null,null,null,150,160,168,176],"color":"#22d3ee","dashed":true}],"band":{"lower":[90,104,118,130,150,144,138,130],"upper":[90,104,118,130,150,176,196,214],"color":"#22d3ee"}}'></div>
<div class="viz-caption">Đường xám là doanh thu đã xảy ra. Từ "hôm nay" trở đi là dự báo (nét đứt) — luôn kèm một dải sai số, và dải này loe rộng dần: càng nhìn xa, càng mù mờ.</div>
</div>

## Vì sao dự báo càng xa càng sai nhiều hơn

Hãy để ý cái dải trong sơ đồ trên: nó **loe rộng dần** về tương lai. Đây không phải lỗi vẽ — nó là quy luật.

Dự báo tháng sau khá đáng tin: ít chuyện kịp thay đổi trong 30 ngày. Dự báo 6 tháng tới? Giữa chừng có thể có một đợt sale của đối thủ, một biến động giá nhập, một thay đổi thuật toán sàn, một làn sóng người dùng mới. Mỗi tháng trôi qua là thêm một lớp bất định *chồng* lên lớp cũ. Sai số không cộng dồn — nó *nhân* lên.

Ẩn dụ dễ nhớ: dự báo giống chiếu đèn pin vào màn đêm. Ngay trước mũi chân thì sáng rõ. Càng xa, chùm sáng càng loe ra và mờ đi — tới một khoảng cách nào đó thì chỉ còn là một quầng sáng vô dụng. Đừng đòi đèn pin soi tới chân trời; hãy bước theo vùng nó soi rõ, rồi bước tiếp.

Hệ quả thực chiến: **dự báo ngắn hạn để ra quyết định, dự báo dài hạn chỉ để định hướng.** Đừng đặt cược cả kho hàng vào con số của tháng thứ sáu.

## Cập nhật, đừng cố thủ

Vì tương lai cứ hé lộ dần, một dự báo tốt **không phải bản tuyên bố một lần** — nó là một thứ sống, được làm lại mỗi khi có dữ liệu mới. Đặt số liệu tháng vừa khép vào, dự báo lại. Sai chỗ nào, chỉnh chỗ đó.

Người làm dự báo dở cố thủ với con số đã lỡ nói ra, rồi bẻ cong thực tế cho khớp. Người làm dự báo giỏi xem mỗi tháng mới là một mẩu tin để *cập nhật niềm tin*. Nguyên liệu của một dự báo tốt là dữ liệu lịch sử sạch — và đó là lý do [dữ liệu bẩn](/blog/du-lieu-ban/) có thể âm thầm giết một mô hình trước cả khi nó chạy.

## Dự báo trong Semantix

Bạn không cần dựng mô hình ARIMA trong Excel hay thuê data scientist để có một dự báo tử tế. Semantix không phải một cái máy phán con số thần thánh — nó là một lớp giúp bạn hỏi thẳng bằng tiếng Việt rồi *nhìn thấy cả khoảng bất định*, thay vì một con số trần trụi:

> **"Dự báo doanh thu 3 tháng tới dựa trên 18 tháng vừa qua, kèm khoảng tin cậy và so với baseline cùng kỳ năm ngoái"**

Semantix dựng đường lịch sử, tách xu hướng khỏi nhiễu, vẽ dự báo *kèm dải sai số loe dần*, và đặt nó cạnh baseline để bạn biết mô hình có thật sự hơn phép đoán ngây thơ hay không. *(Các con số ở trên là ví dụ minh hoạ.)* Khi tháng mới khép sổ, bạn hỏi lại một câu là có bản cập nhật.

## Tóm lại

| Phản xạ cũ | Cách nghĩ mới |
|---|---|
| "Tháng sau bán 850 triệu" | "Khoảng 820–880, nhiều khả năng quanh 850" |
| Mục tiêu là đoán đúng | Mục tiêu là quyết định bớt rủi ro |
| Tin con số dự báo đơn lẻ | Luôn đọc kèm khoảng tin cậy |
| Dự báo xa cũng chắc như gần | Càng xa càng mờ — chỉ để định hướng |
| Bảo vệ con số đã lỡ nói | Cập nhật mỗi khi có dữ liệu mới |

> **Mental model:** dự báo là chùm sáng đèn pin trong đêm, không phải tấm bản đồ tương lai. Nó sáng rõ ngay trước chân, loe mờ về phía xa. Việc của bạn không phải đòi nó soi tới chân trời — mà là bước vững theo vùng nó soi rõ, rồi soi lại sau mỗi bước.

---

*Muốn thấy dự báo doanh thu kèm khoảng sai số ngay trên dữ liệu của bạn? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Và đọc tiếp [Phần 2 — Mùa vụ &amp; Tết](/blog/mua-vu-tet-seasonality/): vì sao cái nhịp lặp lại hàng năm là thứ vừa khó nhằn nhất, vừa dễ kiếm tiền nhất khi dự báo ở Việt Nam.*
