---
title: "HEART framework: khách qua hết các bước trong phễu — mà vẫn ghét dùng sản phẩm của bạn"
code: "pt-045"
description: "Phễu AARRR báo xanh: khách đăng ký, mua, quay lại. Nhưng có một con số phễu không bao giờ thấy — trải nghiệm. Khách qua bước không có nghĩa là họ hài lòng."
pubDate: 2025-12-24
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/heart-framework.svg"
coverAlt: "Ngũ giác radar 5 trục đo năm chiều trải nghiệm, hai vòng so sánh quý này với quý trước"
series: "khung-do-luong"
seriesOrder: 2
---

<div class="series-nav">
  <div class="series-nav-title">📊 Series Khung đo lường sản phẩm · 3 phần</div>
  <ol>
    <li><a href="/blog/aarrr-pirate-metrics/">Phần 1 — AARRR: phễu hải tặc</a></li>
    <li class="current">Phần 2 — HEART: khung của Google</li>
    <li><a href="/blog/khung-san-pham-vs-marketing/">Phần 3 — Nối AARRR/HEART với marketing (AIDA, 5A)</a></li>
  </ol>
</div>

Ở [Phần 1](/blog/aarrr-pirate-metrics/), bạn dựng được phễu AARRR (Acquisition, Activation, Retention, Referral, Revenue — thu hút, kích hoạt, giữ chân, giới thiệu, doanh thu) và mọi bước đều báo xanh. Khách vào. Khách đăng ký. Khách mua. Một tỷ lệ chuyển đổi đẹp.

Phản xạ đầu tiên của bạn là: *"Vậy là ổn rồi."* Nhưng đây mới đúng là chỗ phễu lừa bạn. Phễu đo **số lượng** — bao nhiêu người đi qua mỗi cửa. Nó tuyệt nhiên không đo một thứ: những người đi qua cửa ấy có **thấy dễ chịu** không, hay họ vượt qua trong ức chế rồi âm thầm tìm chỗ khác.

Một khách hoàn tất thanh toán sau khi bấm nhầm ba lần, chửi thầm vì nút "đặt hàng" nấp dưới quảng cáo — trên phễu, người ấy là một điểm chuyển đổi *thành công*. Cùng màu xanh với một khách lướt mượt và mỉm cười. Phễu không phân biệt được hai người đó. Và đây là sự thật ngược đời ít ai chịu nhìn: **khách qua được bước không có nghĩa là khách hài lòng với bước đó.** Một sản phẩm có thể có phễu đẹp mà trải nghiệm thì đang mục ruỗng từ bên trong — cho tới ngày con số rớt, và lúc đó đã muộn.

Đây chính là chỗ trống mà **HEART framework** của Google ra đời để lấp.

## HEART là gì: 5 chiều của trải nghiệm

**HEART** là một khung đo lường trải nghiệm người dùng (UX — User Experience) do nhóm nghiên cứu của Google đề xuất, gom **chất lượng** trải nghiệm vào năm chiều, lấy chữ cái đầu ghép thành tên:

- **Happiness** *(sự hài lòng)* — khách **cảm thấy** thế nào về sản phẩm: thích, tin, dễ chịu hay bực bội. *Ví dụ minh họa:* một chuỗi cà phê đo Happiness bằng điểm NPS (Net Promoter Score — chỉ số đo mức khách sẵn lòng giới thiệu) gửi qua app sau mỗi đơn — quý này 42 điểm.
- **Engagement** *(mức độ gắn kết)* — khách dùng sản phẩm **sâu và thường xuyên** đến đâu. *Ví dụ minh họa:* một app bán hàng đo số phiên mỗi tuần trên mỗi người dùng hoạt động — trung bình 4,3 lần/tuần.
- **Adoption** *(mức độ tiếp nhận)* — khách mới **bắt đầu dùng** một tính năng đến mức nào. *Ví dụ minh họa:* sau khi ra tính năng "gộp đơn đa kênh", 38% nhà bán mới kích hoạt nó trong tuần đầu.
- **Retention** *(giữ chân)* — khách **còn quay lại** sau một khoảng thời gian không. *Ví dụ minh họa:* 61% người dùng tháng 1 vẫn còn hoạt động ở tháng 3.
- **Task success** *(hoàn thành tác vụ)* — khách **làm xong việc họ định làm** trơn tru đến đâu: tỷ lệ thành công, thời gian, số lỗi. *Ví dụ minh họa:* 88% khách đặt được đơn từ lúc mở app đến lúc thanh toán mà không bỏ giữa chừng.

Để ý: **Retention** xuất hiện ở cả AARRR lẫn HEART — đó không phải trùng lặp, mà là điểm hai khung *bắt tay nhau*. AARRR hỏi "bao nhiêu khách quay lại"; HEART hỏi thêm "vì sao họ quay lại — vì thích hay vì kẹt không rời được". Năm chiều HEART trả lời cùng một câu hỏi mà phễu không hỏi: **trải nghiệm tốt hay tệ?**

## Cách dùng HEART đúng: Goals → Signals → Metrics

Cái bẫy lớn nhất với HEART là tưởng phải đo **cả năm chiều** cho mọi sản phẩm. Không. Một quán phở online ép mình đo "Engagement" theo kiểu mạng xã hội là tự hành mình — khách ăn phở xong là đóng app, gắn kết sâu *không phải* mục tiêu. Đo cả năm chiều một cách máy móc cho ra một dashboard đầy số mà không số nào thúc được hành động.

Google đi kèm HEART một quy trình ba bước để **chọn đúng chiều**, gọi là **Goals–Signals–Metrics** *(Mục tiêu – Tín hiệu – Thước đo)*:

1. **Goals (Mục tiêu):** với *chiều này*, thành công nghĩa là gì? Viết bằng câu nói thường, không phải con số. Vd cho Task success: *"Khách đặt được đơn mà không phải hỏi tổng đài."*
2. **Signals (Tín hiệu):** **hành vi nào** quan sát được sẽ cho thấy đang tiến gần hay rời xa mục tiêu? Vd: *khách bấm nút quay lại nhiều lần*, *bỏ giỏ ở bước thanh toán*, *gọi hỗ trợ*.
3. **Metrics (Thước đo):** biến tín hiệu thành **một con số theo dõi được**. Vd: *tỷ lệ đặt đơn thành công 88%*, *thời gian trung bình tới thanh toán 47 giây*.

Trình tự này quan trọng: đi từ *mục tiêu nghiệp vụ* xuống *con số*, không phải ngược lại. Bắt đầu từ "ta đang có sẵn số gì" thì y như rằng sẽ đo cái dễ đo thay vì cái đáng đo — và rơi đúng vào bẫy [vanity metric](/blog/metric-dimension-kpi/) *(chỉ số đẹp mã mà không hành động được)*. Chọn hai, ba chiều HEART hợp mục tiêu sản phẩm, mỗi chiều một Goal rõ ràng — vậy là đủ.

<div class="viz">
<div class="viz-chart" data-chart="radar" data-chart-data='{"indicators":[{"name":"Happiness","max":100},{"name":"Engagement","max":100},{"name":"Adoption","max":100},{"name":"Retention","max":100},{"name":"Task success","max":100}],"series":[{"name":"Quý này","values":[72,65,80,68,88],"color":"#6366f1"},{"name":"Quý trước","values":[60,58,70,64,82],"color":"#cbd5e1"}]}'></div>
<div class="viz-caption">Radar HEART (số minh họa): 5 chiều trải nghiệm, so quý này với quý trước — chiều nào thắt lại là chỗ trải nghiệm đang xấu đi dù phễu vẫn chảy.</div>
</div>

Cái hay của radar HEART là nó cho thấy **hình dạng** trải nghiệm, không chỉ một con số. Một sản phẩm "khỏe đều" có ngũ giác cân; một sản phẩm Adoption cao mà Happiness thấp có hình méo — khách *thử* tính năng mới nhưng *không thích* nó. Phễu không bao giờ vẽ được hình này.

## HEART bù đúng chỗ mù của AARRR

Hãy đặt hai khung cạnh nhau cho rõ. **AARRR đo số lượng dọc theo phễu; HEART đo chất lượng tại mỗi chặng.** Phễu là cái máy đếm người qua cửa; HEART là camera quay xem mặt người ta lúc qua cửa vui hay nhăn nhó.

Một ví dụ Việt rất đời: một app giao đồ ăn chạy khuyến mãi mạnh, Acquisition trên phễu vọt lên, Retention tháng đầu cũng đẹp — *vì khách bị mã giảm giá giữ chân, không phải vì thích app*. Nhìn AARRR thì mừng. Soi HEART thì lạnh người: Happiness tụt (khách phàn nàn giao trễ), Task success thấp (đặt đơn hay lỗi). Phễu đang **mượn tạm** một đám khách mà trải nghiệm chưa giữ nổi — khi hết mã, họ đi. AARRR thấy *triệu chứng muộn* (Retention rớt sau vài tháng); HEART thấy *nguyên nhân sớm* (trải nghiệm tệ ngay từ đầu).

Nhưng — và đây là cảnh báo quan trọng — HEART **không phải** thứ để bạn lao vào "tối ưu cho đẹp số". Ngay khi biến một chiều thành chỉ tiêu ép xuống đội ngũ, bạn dẫm vào **luật Goodhart**: *khi một thước đo trở thành mục tiêu, nó thôi là thước đo tốt.* Ép **Engagement** lên bằng thông báo đẩy dồn dập? Số phiên tăng thật — và Happiness rơi tự do vì khách bị làm phiền. Ép **Adoption** một tính năng bằng pop-up chắn đường? Khách bấm vào vì *bị buộc*, không vì *muốn*. Năm chiều HEART níu lẫn nhau: bóp méo một chiều thường làm xẹp chiều khác — đó vừa là cái bẫy, vừa là cơ chế tự kiểm. (Vì sao ép một con số lại hỏng con số khác, chúng tôi mổ kỹ trong bài [Goodhart & guardrail metrics](/blog/goodhart-guardrail-metrics/).)

## HEART trong Semantix

Vậy đo HEART bằng gì? Đây là chỗ Semantix định vị bằng phủ định: **chúng tôi không phải một công cụ khảo sát UX gắn thêm**, cũng không phải một dashboard HEART dựng sẵn để bạn điền số vào. Năm chiều HEART không sống ở một nơi — Happiness nằm trong khảo sát, Engagement nằm trong log app, Retention nằm trong đơn hàng, Task success nằm trong sự kiện thao tác. Vấn đề thật là chúng *rời rạc năm chỗ*.

Cách tiếp cận đi vào đúng đó:

1. **Định nghĩa từng Signal–Metric một lần** trong [Semantic Layer](/blog/metric-dimension-kpi/): "phiên hoạt động", "đặt đơn thành công", "khách quay lại" được chốt nghĩa dùng chung — để cả công ty nói cùng một con số, không cãi nhau "Engagement của em khác Engagement của anh".
2. **Gộp năm nguồn ngay lúc hỏi** bằng Bảng ảo — khảo sát, log, đơn hàng nối về cùng một câu hỏi mà không phải bê dữ liệu đi đâu.
3. **Hỏi bằng tiếng Việt:** *"Task success quý này so quý trước, cắt theo kênh?"* — ra số, ra biểu đồ, không chờ đội data.

Một lần định nghĩa. Cả năm chiều nói cùng ngôn ngữ. Bạn nhìn được *hình dạng* trải nghiệm, không chỉ một ô con số lẻ.

## Tóm lại

| Chiều | Đo cái gì | Signal ví dụ |
|---|---|---|
| **Happiness** — hài lòng | Cảm nhận chủ quan về sản phẩm | Điểm NPS, đánh giá sao, tỷ lệ phàn nàn |
| **Engagement** — gắn kết | Mức dùng sâu & thường xuyên | Số phiên/tuần, thời lượng dùng |
| **Adoption** — tiếp nhận | Khách mới bắt đầu dùng tính năng | % kích hoạt tính năng tuần đầu |
| **Retention** — giữ chân | Khách còn quay lại theo thời gian | % còn hoạt động sau 1–3 tháng |
| **Task success** — hoàn thành tác vụ | Làm xong việc trơn tru | Tỷ lệ thành công, thời gian, số lỗi |

> Quy tắc vàng: AARRR cho biết khách **có** đi qua phễu không; HEART cho biết họ đi qua trong **sung sướng hay cắn răng**. Đo cả hai — nhưng đừng đo cả năm chiều HEART, hãy để Goals chọn chiều cho bạn, và nhớ rằng phút bạn ép một chiều lên là phút nó thôi nói thật.

---

*Muốn nhìn được cả phễu lẫn năm chiều trải nghiệm trên cùng một chỗ, định nghĩa một lần dùng mãi? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 3 — nối AARRR/HEART với marketing](/blog/khung-san-pham-vs-marketing/).*
