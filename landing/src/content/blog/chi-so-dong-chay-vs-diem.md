---
title: "Chỉ số dòng chảy vs chỉ số điểm: vì sao cộng doanh thu các tháng thì đúng, mà cộng tồn kho các tháng thì sai"
code: "kt-040"
description: "Cộng doanh thu 12 tháng ra doanh thu cả năm - đúng. Cộng tồn kho cuối mỗi tháng ra tồn kho cả năm - sai bét. Cùng phép cộng, một cái đúng một cái vô nghĩa. Vì sao?"
pubDate: 2025-11-28
category: "Kiến Thức Nền Tảng"
series: "hieu-chi-so"
seriesOrder: 2
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/chi-so-dong-chay-vs-diem.svg"
coverAlt: "Một dòng nước chảy đo lưu lượng theo khoảng đặt cạnh một thước đo mực nước tại một thời điểm"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Hiểu chỉ số · 6 phần</div>
  <ol>
    <li><a href="/blog/4-loai-thang-do-du-lieu/">Phần 1 - 4 loại thang đo</a></li>
    <li class="current">Phần 2 - Dòng chảy vs điểm</li>
    <li><a href="/blog/dong-tien-vs-loi-nhuan/">Phần 3 - Dòng tiền vs lợi nhuận</a></li>
    <li><a href="/blog/input-vs-output-metrics/">Phần 4 - Input vs output metrics</a></li>
    <li><a href="/blog/business-metrics-vs-customer-metrics/">Phần 5 - Chỉ số DN vs khách hàng</a></li>
    <li><a href="/blog/ne-so-lieu-bat-tien/">Phần 6 - 6 cách né số bất tiện</a></li>
  </ol>
</div>

Bạn có một bảng số liệu. Cột doanh thu mỗi tháng: tháng 1 là 1,8 tỷ, tháng 2 là 2,1 tỷ, cứ thế tới tháng 12. Bạn kéo chuột chọn cả cột, gõ `SUM`, ra doanh thu cả năm. Hoàn toàn đúng.

Ngay cột bên cạnh là tồn kho cuối mỗi tháng: cuối tháng 1 còn 5.000 sản phẩm, cuối tháng 2 còn 4.600, cứ thế. Theo phản xạ, bạn lại kéo chuột, lại gõ `SUM`. Con số nhảy ra: 58.000. "Tồn kho cả năm 58.000 sản phẩm."

Dừng lại. Con số đó **vô nghĩa**. Kho của bạn chưa bao giờ chứa 58.000 sản phẩm - nó chỉ luôn quanh quẩn 4.000–5.000. Bạn vừa cộng đi cộng lại cùng một lô hàng nằm trong kho suốt mười hai tháng. Cùng một phép cộng, cùng một cú kéo chuột - với doanh thu thì đúng, với tồn kho thì ra một con số chẳng tương ứng với điều gì có thật.

Phản xạ đầu tiên là nghĩ "chắc mình kéo nhầm dòng". Không. Lỗi sâu hơn thế nhiều, và nó âm thầm hơn: **hai cột số đó là hai *loại* chỉ số khác hẳn nhau về bản chất** - và một loại thì cộng được qua thời gian, loại kia thì không. Hiểu được ranh giới này, bạn tránh được cả một họ lỗi báo cáo mà phần lớn người làm số chưa bao giờ gọi đúng tên.

## Hai loại chỉ số khác nhau từ gốc: đo trong một *khoảng* vs đo tại một *thời điểm*

Mọi con số bạn theo dõi trong kinh doanh rơi vào một trong hai nhóm, phân biệt bằng đúng một câu hỏi: **con số này đo cái gì xảy ra *trong suốt một khoảng thời gian*, hay đo trạng thái *tại một mốc thời gian*?**

- **Chỉ số dòng chảy** (interval metric / flow metric - chỉ số đo trong một *kỳ*): doanh thu, số đơn hàng, chi phí quảng cáo. Nó tích lũy dần trong cả kỳ. "Doanh thu" không tồn tại tại *một giây* - nó là tổng những gì chảy qua trong cả tháng.
- **Chỉ số điểm** (point metric / stock metric - chỉ số đo *tại một thời điểm*, còn gọi là chỉ số *tồn*): tồn kho, số dư tài khoản, số khách đang active. Nó là một *bức ảnh chụp* trạng thái tại đúng một khoảnh khắc. "Tồn kho" của bạn *lúc 23:59 ngày 31 tháng 1* là một con số xác định; hỏi "tồn kho cả tháng 1" thì không có nghĩa.

Ẩn dụ rõ nhất là một dòng sông và một cái cọc đo mực nước. **Lưu lượng** - bao nhiêu mét khối nước *chảy qua* trong một giờ - là chỉ số dòng chảy: muốn biết cả ngày chảy bao nhiêu, bạn cộng 24 giờ lại, hoàn toàn hợp lý. **Mực nước** tại cây cọc - nước đang cao tới vạch nào *lúc này* - là chỉ số điểm: cộng mực nước của 24 giờ trong ngày lại thì ra một con số chẳng nói lên điều gì về con sông. Doanh thu là lưu lượng. Tồn kho là mực nước.

## Chỉ số dòng chảy: tích lũy trong kỳ, và CỘNG được qua các kỳ

Chỉ số dòng chảy đo một *lượng* sinh ra trong một khoảng thời gian. Bản chất "tích lũy" này khiến nó có một tính chất rất dễ chịu: **cộng qua các kỳ là hợp lệ**.

- Doanh thu tháng 1 + tháng 2 + ... + tháng 12 = doanh thu cả năm. ✓
- Số đơn tuần này + tuần sau = số đơn hai tuần. ✓
- Chi phí ads từng ngày trong tháng cộng lại = chi phí ads cả tháng. ✓

Vì mỗi đồng doanh thu, mỗi đơn hàng chỉ được đếm *một lần* tại đúng kỳ nó phát sinh, nên gộp (aggregation - tổng hợp/gộp số liệu) bằng phép cộng không hề đếm trùng. Đây là lý do mọi báo cáo doanh thu theo quý, theo năm đều chỉ là phép cộng đơn giản các kỳ con - và không ai thắc mắc, vì nó *đúng*. Doanh thu, số đơn, chi phí, số khách mới *trong kỳ* đều thuộc nhóm này.

> Quy tắc nhận diện: nếu mỗi sự kiện chỉ thuộc về đúng một kỳ và không bị đếm lại ở kỳ sau, đó là chỉ số dòng chảy - cộng thoải mái.

## Chỉ số điểm: bức ảnh tại một mốc, KHÔNG cộng qua kỳ

Chỉ số điểm đo *trạng thái* tại một thời điểm. Và trạng thái thì **bền** - nó không biến mất khi sang kỳ mới. Lô 5.000 sản phẩm tồn cuối tháng 1 phần lớn vẫn là lô đó vào cuối tháng 2. Khi bạn cộng "tồn cuối tháng 1" với "tồn cuối tháng 2", bạn đang đếm cùng một đống hàng tới hai lần. Cộng đủ mười hai tháng, bạn đếm nó tới mười hai lần - và ra 58.000 sản phẩm không có thật.

Cùng kiểu bẫy với mọi chỉ số điểm:

- **Số dư tiền mặt:** cộng số dư cuối mỗi tháng lại không ra "tiền cả năm" - cùng một khoản tiền bị đếm lặp.
- **Số khách đang active:** cộng số active cuối mỗi tháng không ra tổng khách - một khách active ba tháng liền bị đếm ba lần.
- **Số nhân sự:** cộng headcount cuối mỗi tháng ra một con số chẳng nghĩa lý gì.

Vậy khi cần "tổng hợp" chỉ số điểm qua nhiều kỳ thì làm sao? Không phải cộng, mà là **lấy giá trị cuối kỳ** (tồn kho cuối năm = tồn kho cuối tháng 12, không phải tổng) hoặc **lấy trung bình** (tồn kho bình quân năm = trung bình các mốc trong năm - con số dùng để tính vòng quay tồn kho). Tùy câu hỏi mà chọn cuối kỳ hay trung bình, nhưng **không bao giờ là phép cộng**.

> Quy tắc nhận diện: nếu một thực thể (một sản phẩm, một đồng tiền, một khách) còn "ở đó" sang kỳ sau, thì cộng các mốc lại sẽ đếm trùng - đó là chỉ số điểm.

## Vì sao gộp nhầm hai loại làm báo cáo sai một cách *âm thầm*

Cái nguy hiểm của lỗi này là nó **không báo lỗi**. Excel vẫn cho ra một con số. Dashboard vẫn vẽ ra một cột. Không có dòng đỏ nào nhảy lên. Bạn chỉ đơn giản có một con số *sai về mặt khái niệm* nằm yên trong báo cáo, trông y hệt một con số đúng.

Hai biến thể phổ biến nhất:

- **Cộng một chỉ số điểm qua các kỳ** - như cộng tồn kho 12 tháng. Hay gặp khi ai đó dựng bảng pivot "tổng theo tháng" rồi kéo thêm dòng "tổng cộng" ở cuối: với doanh thu thì đúng, nhưng cột tồn kho ngay bên cạnh thì dòng tổng đó vô nghĩa.
- **Lấy trung bình một chỉ số dòng chảy theo một mốc sai** - ví dụ tính "doanh thu trung bình mỗi ngày" bằng cách lấy trung bình *số dư cuối ngày* thay vì chia tổng doanh thu cho số ngày. Hoặc tệ hơn: một hệ thống tự động lấy `AVG` trên một cột vốn là dòng chảy đã được cộng dồn (cumulative), ra một con số nửa nạc nửa mỡ.

Chuyện này không chỉ xảy ra trong Excel. Nó chui vào tận tầng định nghĩa của công cụ BI: khi ai đó khai báo một chỉ số mà **không nói rõ nó là dòng chảy hay điểm**, hệ thống mặc định cộng tất - và thế là dashboard tự động cộng tồn kho qua các tháng, không một lời cảnh báo. Lỗi nằm im cho tới ngày có người tinh mắt hỏi "ủa sao tồn kho cả năm lại to gấp mười lần kho thật?".

## Quy tắc nhanh để nhận diện trong ba giây

Khi nhìn một con số và không chắc nó thuộc loại nào, hỏi đúng một câu:

- **"Đo trong bao lâu?"** - nếu con số chỉ có nghĩa khi gắn một *khoảng* ("doanh thu *tháng này*", "số đơn *hôm nay*"), đó là **chỉ số dòng chảy**. Cộng được.
- **"Đo tại lúc nào?"** - nếu con số chỉ có nghĩa khi gắn một *mốc* ("tồn kho *cuối ngày*", "số dư *lúc này*", "khách đang active *hôm nay*"), đó là **chỉ số điểm**. Đừng cộng - lấy cuối kỳ hoặc trung bình.

Mẹo phụ: thử đặt câu "tổng X cả năm". Nếu nghe xuôi tai ("tổng doanh thu cả năm") → dòng chảy. Nếu nghe sai sai ("tổng tồn kho cả năm"?!) → điểm. Tai bạn thường biết câu trả lời trước cả cái đầu.

Hai loại này có họ hàng gần với chuyện chỉ số [báo trước hay phản ánh sau (leading vs lagging)](/blog/leading-lagging-indicator/): cả hai đều là cách *phân loại bản chất* một con số trước khi tính, để khỏi đối xử với mọi cột số như nhau. Và khi bạn lưu trạng thái tại từng mốc thời gian để theo dõi một chỉ số điểm qua các kỳ, bạn đang chạm tới khái niệm [bảng snapshot - chụp ảnh trạng thái định kỳ](/blog/snapshot-table/).

## Định loại đúng ngay ở tầng định nghĩa

Cách triệt để nhất để hệ thống không bao giờ cộng nhầm là **dán nhãn loại chỉ số ngay khi định nghĩa nó** - chứ không phó mặc cho mỗi báo cáo tự đoán. Trong [Semantic Layer - tầng nghiệp vụ dùng chung](/blog/metric-dimension-kpi/), mỗi metric được khai báo kèm cách tổng hợp đúng: "doanh thu" là dòng chảy → cộng; "tồn kho" là điểm → lấy cuối kỳ hoặc trung bình. Định nghĩa một lần, và từ đó mọi dashboard, mọi câu hỏi đều tổng hợp đúng bản chất - không còn ai vô tình cộng dồn một con số vốn không được phép cộng.

## Tóm lại

| | **Chỉ số dòng chảy** *(interval/flow)* | **Chỉ số điểm** *(point/stock)* |
|---|---|---|
| Đo cái gì | Lượng sinh ra **trong một kỳ** | Trạng thái **tại một mốc** |
| Ví dụ | Doanh thu, số đơn, chi phí ads, khách mới | Tồn kho, số dư tiền, khách đang active, headcount |
| Cộng qua kỳ? | **Được** - không đếm trùng | **Không** - sẽ đếm trùng |
| Cách tổng hợp | Cộng (`SUM`) | Lấy cuối kỳ hoặc trung bình |
| Câu hỏi nhận diện | "Đo *trong bao lâu*?" | "Đo *tại lúc nào*?" |

Lần tới, trước khi kéo chuột gõ `SUM` lên một cột số, đừng hỏi "công thức có đúng không" - công thức luôn chạy. Hỏi: *"con số này là dòng chảy hay điểm?"* Một giây tự hỏi đó đứng giữa một báo cáo đúng và một con số 58.000 sản phẩm không bao giờ tồn tại.

---

*Muốn mỗi metric trong công ty được định loại đúng - cái nào cộng được, cái nào không - ngay từ tầng định nghĩa? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Metric, Dimension, KPI: vỡ lòng từ vựng dữ liệu](/blog/metric-dimension-kpi/).*
