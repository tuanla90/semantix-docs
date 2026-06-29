---
title: "4 loại thang đo dữ liệu: vì sao 'mã sản phẩm trung bình' là một con số vô nghĩa - dù máy vẫn tính ra"
code: "kt-041"
description: "Excel tính ra 'mức hài lòng trung bình 3,4 sao' và 'mã đơn trung bình 10.847'. Cả hai đều ra số. Cả hai đều vô nghĩa. Vì loại dữ liệu không cho phép phép tính đó."
pubDate: 2025-11-23
category: "Kiến Thức Nền Tảng"
series: "hieu-chi-so"
seriesOrder: 1
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/4-loai-thang-do-du-lieu.svg"
coverAlt: "Bốn nấc thang đo dữ liệu từ định danh đến tỉ lệ, mức phép tính được phép tăng dần"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Hiểu chỉ số · 6 phần</div>
  <ol>
    <li class="current">Phần 1 - 4 loại thang đo</li>
    <li><a href="/blog/chi-so-dong-chay-vs-diem/">Phần 2 - Dòng chảy vs điểm</a></li>
    <li><a href="/blog/dong-tien-vs-loi-nhuan/">Phần 3 - Dòng tiền vs lợi nhuận</a></li>
    <li><a href="/blog/input-vs-output-metrics/">Phần 4 - Input vs output metrics</a></li>
    <li><a href="/blog/business-metrics-vs-customer-metrics/">Phần 5 - Chỉ số DN vs khách hàng</a></li>
    <li><a href="/blog/ne-so-lieu-bat-tien/">Phần 6 - 6 cách né số bất tiện</a></li>
  </ol>
</div>

Bạn bôi đen cột "Mức độ hài lòng" trong Excel - toàn số từ 1 đến 5 - rồi gõ `=AVERAGE()`. Máy nhả ra: **3,4 sao**. Bạn đưa vào báo cáo. Trông rất khoa học.

Bây giờ thử cái này: bôi đen cột "Mã đơn hàng" (10842, 10843, 10844...), gõ `=AVERAGE()`. Máy lại nhả ra một con số đẹp: **10.847**. Lần này bạn thấy ngay nó vô nghĩa - "mã đơn trung bình" thì để làm gì? Nhưng khoan: Excel xử lý **hai phép tính y hệt nhau**. Nó không hề biết một cái có nghĩa còn một cái thì không. Máy chỉ thấy số, và số thì cộng chia được hết.

Đây là cái bẫy ít người để ý: **máy luôn tính được, kể cả khi phép tính đó vô nghĩa.** Sự khác biệt giữa "3,4 sao" và "mã đơn 10.847" không nằm ở con số - nó nằm ở việc dữ liệu đó thuộc loại nào. Và "3,4 sao", hóa ra, gần với "mã đơn trung bình" hơn bạn tưởng.

## Trước khi tính, phải biết dữ liệu thuộc thang đo nào

Mọi con số trong bảng của bạn đều thuộc về một trong bốn **thang đo (measurement scale - cách phân loại dữ liệu theo *được phép làm gì* với nó)**. Thứ tự bốn thang này không ngẫu nhiên: chúng xếp thành một cái thang, mỗi nấc cho bạn làm được nhiều hơn nấc dưới. Biết một cột thuộc nấc nào, bạn biết ngay phép tính nào hợp lệ - và phép tính nào chỉ là rác có định dạng đẹp.

Đi từ nấc thấp nhất lên.

## Định danh: chỉ là cái tên, đừng cộng nó

**Nominal (định danh - dữ liệu chỉ để *phân loại*, không có thứ tự)** là nấc thấp nhất: những con số hoặc nhãn chỉ đóng vai cái tên. Mã sản phẩm, kênh bán (Shopee / TikTok Shop / KiotViet), giới tính, mã tỉnh, nhóm máu - chúng phân khách vào các ô khác nhau, hết. Ô này không "lớn hơn" ô kia.

Mấu chốt: dù mã đơn *trông* như số, nó không phải số đo lường gì cả - nó là cái nhãn tình cờ làm bằng chữ số. Cộng hai mã đơn cũng vô nghĩa như cộng hai số điện thoại.

Với dữ liệu định danh, bạn chỉ được phép làm hai việc: **đếm** mỗi nhóm có bao nhiêu, và tìm **mode (giá trị xuất hiện nhiều nhất)** - kênh nào đông đơn nhất, tỉnh nào nhiều khách nhất. Trung bình ư? Không bao giờ. "Kênh bán trung bình" là một câu không có nghĩa.

## Thứ bậc: có thứ tự, nhưng khoảng cách không đều

Lên một nấc: **ordinal (thứ bậc - có *thứ tự* nhưng khoảng cách giữa các bậc không bằng nhau)**. Đây chính là chỗ "3,4 sao" bị lật tẩy.

Mức hài lòng 1–5 sao, hạng thành viên (Đồng → Bạc → Vàng → Kim cương), trình độ học vấn, mức độ ưu tiên "thấp / vừa / cao" - tất cả đều có thứ tự rõ ràng: 5 sao tốt hơn 4 sao. Nhưng - và đây là cái twist - **khoảng cách giữa các bậc không bằng nhau.** Khoảng từ "rất ghét" (1) lên "ghét" (2) trong đầu khách hàng *không* bằng khoảng từ "hài lòng" (4) lên "rất hài lòng" (5). Mấy con số 1-2-3-4-5 chỉ là nhãn xếp hàng, không phải đại lượng đo bằng thước.

Vì khoảng cách không đều, **cộng chúng lại rồi chia là sai về bản chất** - bạn đang cộng những bước nhảy dài ngắn khác nhau như thể chúng bằng nhau. "Trung bình 3,4 sao" giả vờ rằng khoảng cách 1→2 bằng 4→5. Nó không bằng.

Vậy đo "khách hài lòng cỡ nào" bằng gì? Bằng **median (trung vị - giá trị đứng giữa khi xếp từ thấp lên cao)**, không phải mean. Median của thang sao trả lời đúng câu cần hỏi: *"Khách điển hình đứng ở bậc nào?"* - và nó không bịa ra cái khoảng cách không tồn tại. (Vì sao mean hay nói dối ngay cả với dữ liệu số thật, xem [trung bình nói dối](/blog/trung-binh-noi-doi/).)

> Quy tắc vàng: dữ liệu thứ bậc đo bằng **trung vị**, không bằng trung bình. Hễ thấy "X,Y sao trung bình" trong báo cáo, hãy nghi ngờ.

## Khoảng: hiệu thì có nghĩa, tỉ số thì không

Nấc thứ ba: **interval (khoảng - khoảng cách *đều* nhau, nhưng điểm 0 chỉ là quy ước, không phải "không có gì")**. Khoảng cách giữa các giá trị giờ đã bằng nhau thật - nhưng còn thiếu một thứ: một con số 0 *thật*.

Ví dụ kinh điển là **nhiệt độ** (độ C) và **năm dương lịch**. Từ 20°C lên 21°C đúng bằng từ 30°C lên 31°C - khoảng cách đều, tốt. Nhưng 0°C *không* nghĩa là "không có nhiệt độ"; nó chỉ là điểm nước đóng băng, một mốc do người đặt. Hệ quả nghe rất phản trực giác: **40°C không "nóng gấp đôi" 20°C.** Phép trừ (hiệu) có nghĩa - "nóng hơn 20 độ" là một câu đúng. Nhưng phép chia (tỉ số) thì vô nghĩa, vì không có gốc 0 thật để mà so "gấp đôi".

Năm cũng vậy: năm 2000 không "gấp đôi" năm 1000; nói "cách nhau 1.000 năm" mới đúng. Với thang khoảng, bạn cộng trừ và lấy trung bình thoải mái - nhưng đừng nói "gấp mấy lần".

## Tỉ lệ: có gốc 0 thật, làm gì cũng được

Nấc cao nhất: **ratio (tỉ lệ - có khoảng đều *và* một điểm 0 thật nghĩa là "không có gì")**. Đây là loại dữ liệu kinh doanh quen thuộc nhất và cũng dễ chịu nhất: doanh thu, số đơn, số lượng tồn, tuổi, cân nặng, thời gian xử lý.

Điểm khác biệt duy nhất nhưng quyết định: **số 0 ở đây là thật.** Doanh thu 0 đồng nghĩa là *không bán được gì*. Vì có gốc 0 thật, mọi phép tính đều hợp lệ - kể cả tỉ số. Doanh thu 4 tỷ **đúng là** gấp đôi 2 tỷ. Shop bán 60 đơn bán gấp ba shop bán 20 đơn. Cộng, trừ, trung bình, "gấp mấy lần", phần trăm tăng trưởng - tất cả đều chạy tốt vì có một điểm mốc thật để neo vào.

Đa số con số bạn thực sự cần ra quyết định nằm ở nấc này. Tin tốt là nấc này dễ nhất: bạn không phải dè chừng gì cả.

## Vì sao "được phép tính gì" phụ thuộc thang đo

Để ý cái thang: leo lên mỗi nấc, bạn được mở khóa thêm một phép tính.

- **Định danh** → chỉ đếm và lấy mode.
- **Thứ bậc** → thêm xếp hạng và *median*.
- **Khoảng** → thêm cộng/trừ và *mean* (nhưng cấm tỉ số).
- **Tỉ lệ** → mở khóa nốt: tỉ số, phần trăm, mọi thứ.

Đây không phải luật lệ hàn lâm cho vui - nó là lằn ranh giữa một con số đáng tin và một con số rác. Cái bẫy "3,4 sao" ở đầu bài chính là lấy phép tính của nấc trên (mean) áp xuống dữ liệu nấc dưới (thứ bậc). Máy không chặn bạn, vì máy không biết cột đó là thang nào - *bạn* mới biết. Đây là cùng một họ sai lầm với chuyện [mean che mất median khi dữ liệu lệch](/blog/trung-binh-noi-doi/): biết loại dữ liệu trong tay trước khi tính là bước phòng vệ đầu tiên, đứng trước cả chuyện lo mẫu lớn hay nhỏ ([mẫu & tổng thể](/blog/mau-va-tong-the/)).

Một hệ quả thực dụng: thang đo quyết định cả việc bạn được vẽ biểu đồ gì. Dữ liệu định danh hợp với biểu đồ cột đếm; thứ bậc nên xem phân bố theo bậc; tỉ lệ thì hợp đường xu hướng. Đây cũng là lý do phân biệt **metric** (đo được, tính được) với **dimension** (chiều để cắt lát) lại quan trọng đến thế - xem [metric, dimension, KPI](/blog/metric-dimension-kpi/).

## Tóm lại

| Thang đo | Ví dụ Việt | Phép tính hợp lệ |
|---|---|---|
| **Định danh** (nominal) | Mã SP, kênh bán, giới tính, mã tỉnh | Đếm, mode - **không** trung bình |
| **Thứ bậc** (ordinal) | Sao hài lòng 1–5, hạng thành viên | Xếp hạng, **median** - không mean |
| **Khoảng** (interval) | Nhiệt độ, năm dương lịch | Cộng/trừ, mean - **không** tỉ số/"gấp đôi" |
| **Tỉ lệ** (ratio) | Doanh thu, số đơn, tuổi, tồn kho | **Mọi** phép tính, kể cả tỉ số |

Con số trong bảng không tự khai nó thuộc thang nào - máy thì sẵn sàng cộng chia bất cứ thứ gì trông như số. Người đọc số giỏi không hỏi "máy tính ra bao nhiêu", mà hỏi trước: *"Cột này là thang đo gì - và phép tính tôi sắp làm có thật sự được phép không?"* Trả lời được câu đó, bạn đã đứng trước 90% người bôi đen một cột rồi bấm `AVERAGE` mà không chớp mắt.

---

*Muốn hỏi dữ liệu bằng tiếng Việt mà không lỡ tay tính trung bình một thứ không nên tính? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [vì sao trung bình hay nói dối](/blog/trung-binh-noi-doi/).*
