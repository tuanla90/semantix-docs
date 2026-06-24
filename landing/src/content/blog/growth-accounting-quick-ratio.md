---
title: "Quick Ratio: vì sao một con số nói product bạn đang sống — hay đang chết âm thầm"
code: "pt-017"
series: "growth-accounting"
seriesOrder: 2
description: "Founder nào cũng muốn MỘT con số để biết tăng trưởng có thật khỏe không. Quick Ratio là nhịp tim đó: mỗi 1 user mất đi, bạn thêm được mấy. Nhưng nó cũng biết nói dối."
pubDate: 2026-06-14
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/growth-accounting-quick-ratio.svg"
coverAlt: "Đường Quick Ratio dạng nhịp tim cắt qua lằn ngang 1,0 với vùng trên xanh và vùng dưới đỏ"
---

<div class="series-nav">
  <div class="series-nav-title">📈 Series Growth Accounting · 4 phần</div>
  <ol>
    <li><a href="/blog/growth-accounting/">Phần 1 — Nền tảng: phương trình tăng trưởng</a></li>
    <li class="current">Phần 2 — Quick Ratio: nhịp tim tăng trưởng</li>
    <li><a href="/blog/growth-accounting-revenue/">Phần 3 — Từ người dùng sang tiền: Net Dollar Retention</a></li>
    <li><a href="/blog/growth-accounting-thuc-chien/">Phần 4 — Thực chiến: dựng bảng growth accounting</a></li>
  </ol>
</div>

Một founder hỏi tôi câu mà ai cũng từng hỏi: *"Anh cho em đúng MỘT con số thôi — để em biết tăng trưởng tháng này có thật sự khỏe không."* Anh ấy mệt với dashboard ba mươi biểu đồ. Anh muốn một thứ liếc một cái là biết nên ăn mừng hay nên lo.

Có một con số như vậy. Nó tên là **Quick Ratio** (tỉ lệ "tăng trên hao" = (khách mới + quay lại) / khách rời đi), và nó hoạt động đúng như một nhịp tim: gộp tất cả chuyện sống chết của product vào một con số duy nhất, đập đều đặn theo từng kỳ. Trên một mức là khỏe. Dưới mức đó là đang yếu đi. Bạn không cần đọc ba mươi biểu đồ — bạn cần biết tim còn đập mạnh không.

Nhưng đây là chỗ ít người chịu tin: **một nhịp tim đẹp vẫn có thể che một căn bệnh.** Quick Ratio cao chưa chắc là tin tốt — đôi khi nó là tiếng tim đập nhanh vì bạn đang bơm doping vào, không phải vì cơ thể khỏe. Chúng ta sẽ đến đó. Trước hết, hãy hiểu con số.

## Quick Ratio là gì: gộp growth và churn vào một số

Ở [Phần 1](/blog/growth-accounting/) chúng ta đã lập phương trình tăng trưởng: MAU (Monthly Active User — số khách hoạt động hàng tháng) tháng này = MAU tháng trước **+ người dùng mới + người dùng quay lại − người dùng rời bỏ**. Mỗi tháng có người bước vào và người bước ra. Growth Accounting (kế toán tăng trưởng — tách thay đổi mỗi kỳ thành mới / quay lại / giữ chân / rời đi) tách rạch ròi bốn dòng chảy đó.

Quick Ratio lấy đúng những dòng chảy ấy và ép chúng thành một tỷ số:

```
Quick Ratio = (user mới + user quay lại) / user rời bỏ
            = (new + resurrected) / churned
```

Tử số là tất cả những gì làm MAU lớn lên — người dùng mới toanh cộng với người từng bỏ đi nay quay lại (resurrected — khách hồi sinh). Mẫu số là tất cả những gì làm MAU teo đi — người dùng đã hoạt động (active) mà kỳ này biến mất.

Cách đọc trực giác nhất, và cũng là cách tôi luôn nói với founder: **với mỗi 1 user mất đi, bạn thêm được bao nhiêu user?** Quick Ratio = 1,8 nghĩa là cứ mất 1 người, bạn bù vào 1,8 người — lời ra 0,8. Quick Ratio = 0,7 nghĩa là cứ mất 1 người, bạn chỉ kéo về được 0,7 — lỗ 0,3 mỗi vòng. Cái xô của bạn đang đầy lên hay đang cạn, tất cả nằm gọn trong một con số.

## Đọc Quick Ratio: 1 là lằn ranh sống–chết

Vì là một tỷ số quanh mẫu số "user mất đi", Quick Ratio có một lằn ranh tự nhiên — và nó nằm ở đúng **1,0**:

- **> 1** — tử số thắng mẫu số. Bạn thêm nhiều hơn mất. **MAU đang lớn.**
- **= 1** — thêm bằng mất. Bạn đứng yên: chạy hết sức chỉ để giữ nguyên chỗ cũ.
- **< 1** — mẫu số thắng. Bạn mất nhiều hơn thêm. **MAU đang co lại** — kể cả khi tháng này con số tổng trông vẫn ổn nhờ quán tính.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","T5","T6","T7"],"series":[{"name":"Quick Ratio","values":[1.6,1.4,1.2,0.8,0.9,1.3,1.5],"color":"#0d9488","endLabel":true}],"markLine":[{"y":1,"label":"Ngưỡng 1,0","color":"#f59e0b"}],"markArea":[{"from":1,"to":2,"color":"rgba(22,163,74,.10)"},{"from":0,"to":1,"color":"rgba(220,38,38,.10)"}]}'></div>
<div class="viz-caption">Quick Ratio theo tháng. Mọi điểm trên lằn 1,0 (vùng xanh) là MAU đang lớn; rơi xuống dưới (vùng đỏ, T4–T5) là đang co lại. Lằn 1,0 là vạch tim ngừng đập. *(số liệu minh họa)*</div>
</div>

Vẽ Quick Ratio theo tháng cho bạn thứ mà một con số đơn lẻ không có: **xu hướng**. Một tháng QR = 1,2 không nói nhiều. Nhưng một đường đi từ 1,6 → 1,3 → 1,0 → 0,8 thì hét lên rằng động cơ tăng trưởng đang nguội dần — dù MAU tổng vẫn có thể tăng thêm vài tháng nữa nhờ quán tính, đúng như cái bẫy "con số tổng" mà cả series này xoay quanh.

## QR bao nhiêu là tốt? — và vì sao "tốt" tùy mô hình

Đây là lúc phải cẩn thận với con số. Ai cũng muốn nghe "Quick Ratio trên X là đạt". Sự thật khó chịu hơn: **ngưỡng "tốt" phụ thuộc vào mô hình kinh doanh của bạn**, và những con số dưới đây là *ngưỡng tham chiếu ngành* để bạn định hướng, không phải đích để gán cứng cho doanh nghiệp mình.

Với **app tiêu dùng điển hình** (consumer app — mạng xã hội, ứng dụng mua sắm, công cụ free), một sự thật khiến nhiều founder bất ngờ: Quick Ratio thường chỉ **nhỉnh hơn 1 một chút**. Phân tích kinh điển của Amplitude trên một ứng dụng thực cho thấy QR dao động quanh **1–1,5** suốt nhiều tháng — *kể cả những tháng họ ra tính năng mới*. Lý do? Consumer app có churn (tỷ lệ khách rời bỏ) rất cao: bạn kéo về một đống người dùng mỗi tháng, và cũng mất gần một đống. Phần "lời" mỏng manh thường đến từ resurrection — những người quay lại. QR rớt **dưới 1,0** là tín hiệu MAU sắp teo.

Nói cách khác, với app tiêu dùng, đừng mơ Quick Ratio = 5. Giữ được nó ổn định trên 1 đã là một cuộc chiến.

> Quy tắc vàng: **với consumer app, sống còn không phải là đẩy Quick Ratio lên thật cao — mà là giữ nó đừng bao giờ rơi xuống dưới 1.** Mỗi tháng dưới 1 là một tháng cái xô cạn thêm.

Còn bản cho **SaaS (Software as a Service — phần mềm cho thuê theo thuê bao) — nơi Quick Ratio được tính trên doanh thu thay vì người dùng, và ngưỡng "khỏe" cao hơn hẳn (giới đầu tư hay nhắc con số quanh 4)** — là một câu chuyện khác hẳn về bản chất. Tôi để dành trọn vẹn cho **Phần 3**, khi chúng ta chuyển từ đếm user sang đếm tiền. Ở đây chỉ cần nhớ: đừng lấy ngưỡng của SaaS áp lên app tiêu dùng, và ngược lại. Hai cơ thể khác nhau thì nhịp tim khỏe cũng khác nhau.

## Bẫy chết người: Quick Ratio đẹp nhờ đốt tiền acquisition

Giờ đến phần đắt nhất của bài — chỗ Quick Ratio biết nói dối.

Nhìn lại công thức: `(new + resurrected) / churned`. Để ý tử số có **new** — user mới. Mà user mới thì… mua được bằng tiền. Đổ thêm ngân sách ads, bạn bơm thẳng vào tử số. Quick Ratio vọt lên đẹp đẽ.

Vấn đề: **QR cao không có nghĩa là product khỏe.** Một công ty có thể có Quick Ratio = 2,5 trong khi churn cao khủng khiếp — đơn giản vì họ đốt tiền kéo new về đủ nhanh để lấn át dòng churned. Nhịp tim đập rộn ràng, nhưng đó là vì có người đang bơm adrenaline, không phải vì trái tim khỏe.

Đây là điểm tinh vi nhất: **Quick Ratio đo *tốc độ tương đối* giữa tăng trưởng và churn — nó không đo *chất lượng* của những người ở lại.** Hai công ty cùng có QR = 1,8 có thể ở hai thái cực hoàn toàn:

- Công ty A: new vừa phải, churned thấp. QR = 1,8 vì giữ chân tốt. Khỏe thật.
- Công ty B: new khổng lồ (mua bằng ads), churned cũng khổng lồ. QR = 1,8 vì bơm đủ nhanh. Ngừng bơm là sụp.

Cùng một con số, hai số phận trái ngược. Quick Ratio một mình không phân biệt được hai trường hợp này — và đó chính là lý do **không bao giờ đọc Quick Ratio đứng một mình.** Bạn phải đọc nó *kèm* retention (giữ chân — tỷ lệ khách còn hoạt động sau một khoảng thời gian) và cohort (nhóm khách gộp theo thời điểm bắt đầu).

Cụ thể: hãy nhìn Quick Ratio cạnh **đường cong giữ chân** của các cohort gần đây (cách đọc đường cong này tôi đã mổ kỹ ở [Cohort & Retention — đọc PMF](/blog/cohort-retention-pmf/)). Sequoia mô tả rất gọn: một doanh nghiệp khỏe có Quick Ratio vững **đi cùng** đường cong retention phẳng dần hoặc đi lên — hình "nụ cười" (smile). Còn nếu QR quanh 1 mà đường cong retention cứ rơi thẳng về 0, thì bạn đang nhìn một cơ thể bù nước liên tục để khỏi chết khát: dừng acquisition (thu hút khách mới) một nhịp là tụt huyết áp.

## Quick Ratio + Cohort: cặp đôi không thể tách

Hãy hình dung Quick Ratio và Cohort là hai mặt của một đồng xu, đo hai thứ khác nhau và bù khuyết cho nhau:

- **Quick Ratio đo *tốc độ*** — tăng trưởng đang thắng hay thua churn, lớn cỡ nào, theo chiều nào. Nó là cái đồng hồ tốc độ.
- **Cohort đo *chất lượng*** — những người ở lại có thật sự dính với product không, hay chỉ là dòng người vào-ra liên tục. Nó là cái kính hiển vi soi vào từng nhóm khách.

Đồng hồ tốc độ báo bạn đang chạy nhanh. Kính hiển vi cho biết bạn đang chạy về phía trước hay chạy vòng tròn. Thiếu một trong hai, bạn mù một nửa.

Ví dụ tình huống một shop/SaaS Việt điển hình *(minh họa)*: Quick Ratio tháng này = 2,1 — nghe tuyệt. Nhưng mở cohort ra: nhóm khách kéo về từ chiến dịch ads tháng trước rơi 80% chỉ sau 30 ngày. Hai con số ghép lại kể một câu chuyện mà không con số nào tự kể được: *bạn đang mua tăng trưởng, không phải xây nó.* Quick Ratio cho bạn cái cớ để ăn mừng; cohort cho bạn lý do để dừng lại và sửa retention trước khi đổ thêm tiền.

## Tính Quick Ratio này trong Semantix

Cái khó của Quick Ratio không nằm ở phép chia — nó nằm ở việc **định nghĩa cho nhất quán**: thế nào là một user "active"? "Churned" là biến mất bao nhiêu ngày? "Resurrected" tính từ mốc nào? Hỏi mười analyst, bạn dễ nhận mười định nghĩa — và mười con Quick Ratio khác nhau cho cùng một tháng.

Đây đúng là việc của một [Semantic Layer](/blog/semantic-layer/): bạn định nghĩa "active", "churned", "resurrected" **một lần**, và mọi phép tính sau đó đều dùng chung một bộ luật. Trên nền đó, Semantix không phải chatbot cắm thẳng vào database rồi đoán mò công thức — nó hiểu các khái niệm này trong *ngữ cảnh dữ liệu của bạn*. Bạn hỏi thẳng bằng tiếng Việt:

> **"Tính Quick Ratio theo tháng từ Q1 đến nay, tách rõ user mới, quay lại và rời bỏ. Vẽ kèm lằn 1,0."**

Semantix tự dựng đường Quick Ratio theo kỳ, và vì các định nghĩa đã chốt ở Semantic Layer, con số tháng này so được sòng phẳng với tháng trước. Muốn kiểm chứng nó có "đốt tiền" không, bạn hỏi tiếp một câu cohort ngay trong cùng phiên — đặt nhịp tim cạnh kính hiển vi, đúng cặp đôi không thể tách ở trên.

## Tóm lại

Quick Ratio là nhịp tim của tăng trưởng — một con số, đọc trong một giây, và đây là toàn bộ bảng giải mã:

| Quick Ratio | Nghĩa là | Việc cần làm |
|---|---|---|
| **< 1** | Mất nhiều hơn thêm — MAU đang co lại | Báo động: sửa churn/retention trước mọi thứ khác |
| **≈ 1** | Thêm bằng mất — đứng yên tại chỗ | Chạy hết sức để giậm chân — tìm đòn bẩy giữ chân |
| **> 1** | Thêm nhiều hơn mất — MAU đang lớn | Tốt — **nhưng** kiểm tra cohort xem là khỏe thật hay đốt tiền |

Một nhịp tim mạnh là tin tốt. Một nhịp tim mạnh *vì đang được bơm doping* là tin xấu đội lốt tin tốt. Quick Ratio cho bạn con số; cohort cho bạn sự thật đằng sau con số. Đọc cả hai, và bạn đi trước phần lớn founder vẫn đang ăn mừng một nhịp tim mà họ chưa kịp hỏi vì sao nó đập nhanh đến thế.

Ở [**Phần 3 — Từ người dùng sang tiền (NDR)**](/blog/growth-accounting-revenue/), chúng ta đổi đơn vị đo: từ đếm *người* sang đếm *tiền*. Quick Ratio bản doanh thu, và một chỉ số mạnh hơn nữa — NDR (Net Dollar Retention — tỷ lệ giữ doanh thu từ khách cũ) — sẽ kể cho bạn nghe liệu mỗi đồng doanh thu cũ đang nở ra hay teo lại theo thời gian.

---

*Muốn xem nhịp tim tăng trưởng của chính mình? [Dùng thử miễn phí với Google Sheets](/docs/vi/free-trial/) — kết nối dữ liệu và hỏi câu Quick Ratio đầu tiên trong dưới 15 phút. Hoặc đọc lại [Phần 1 — phương trình tăng trưởng](/blog/growth-accounting/) để nắm gốc.*
