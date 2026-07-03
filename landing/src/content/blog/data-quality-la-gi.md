---
code: "kt-038"
title: "Data quality là gì: vì sao một bảng 'ổn' vẫn có thể đầy đủ nhưng sai - hoặc đúng nhưng trễ ba ngày"
description: "'Dữ liệu của em ổn mà.' Ổn theo chiều nào? Chất lượng dữ liệu không phải một thứ - là 6 chiều đo được, và hỏng chiều nào sẽ kéo theo một quyết định sai khác nhau."
pubDate: 2025-03-30
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 8
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/data-quality-la-gi.png"
coverAlt: "Radar sáu chiều chất lượng dữ liệu - đường trước khi dọn lệch nặng so với đường sau khi chuẩn hóa"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 - Dimension vs Dimension table</a></li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 - Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 - Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 - Inmon vs Kimball</a></li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 - SCD: chiều thay đổi chậm</a></li>
    <li><a href="/blog/snapshot-table/">Phần 6 - Snapshot &amp; 3 loại fact</a></li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 - OLAP cube: drill &amp; pivot</a></li>
    <li class="current">Phần 8 - Data quality: 6 chiều</li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 - Data mart cho từng phòng</a></li>
  </ol>
</div>


"Dữ liệu của em ổn mà." Câu này bạn nghe - hoặc tự nói - gần như mỗi tuần. Nhưng *ổn theo chiều nào?*

Một bảng có thể **đầy đủ** - không thiếu ô nào - mà vẫn **sai** từng con số. Một bảng khác có thể **đúng** đến từng đồng, nhưng là số của *ba ngày trước*, và bạn đang lấy nó ra quyết định cho hôm nay. Hai bảng đó đều bị gọi là "ổn", nhưng chúng hỏng theo hai cách hoàn toàn khác nhau - và mỗi cách dẫn tới một quyết định sai khác nhau.

Vấn đề nằm ở chỗ từ "ổn" gộp chung quá nhiều thứ. Nó là một cảm giác, không phải một phép đo. Và bạn không thể sửa cái mà bạn không đo được.

## Chất lượng dữ liệu không phải một thứ - là 6 chiều đo được

**Chất lượng dữ liệu** (*data quality* - mức độ dữ liệu đáng tin để ra quyết định) không phải một công tắc bật/tắt. Nó là một hồ sơ gồm **sáu chiều**, mỗi chiều đo một câu hỏi khác nhau, và một bảng có thể đạt điểm cao ở chiều này nhưng rớt thảm ở chiều kia.

Đây là điểm mấu chốt mà bài này muốn cài vào đầu bạn: ngừng hỏi *"dữ liệu có ổn không"* (câu trả lời luôn là "chắc ổn"), bắt đầu hỏi *"ổn ở chiều nào, hỏng ở chiều nào"*. Sáu chiều đó là: **Chính xác, Đầy đủ, Nhất quán, Kịp thời, Hợp lệ, Duy nhất**. Lần lượt từng cái.

## Chính xác (accuracy) - số có khớp sự thật ngoài đời không

**Chính xác** (*accuracy* - đúng với thực tế) hỏi: con số trong bảng có đúng với cái nó mô tả ngoài đời thực không? Đây là chiều người ta nghĩ tới đầu tiên - và cũng là chiều khó tự phát hiện nhất, vì một số sai trông *y hệt* một số đúng.

*Ví dụ minh hoạ:* cột tồn kho ghi 120 chiếc, nhưng đếm thật trong kho chỉ còn 84. Bảng vẫn đẹp, vẫn ra số, và phần mềm vẫn cho khách đặt 100 đơn - để rồi 16 đơn không có hàng giao. Không ô nào trống, không định dạng nào sai. Chỉ là *sai*.

## Đầy đủ (completeness) - có bao nhiêu ô đang trống

**Đầy đủ** (*completeness* - không thiếu giá trị) hỏi: dữ liệu có bị thiếu ô, thiếu dòng, thiếu cả một khoảng thời gian không?

*Ví dụ minh hoạ:* 12% đơn hàng thiếu cột chi phí vận chuyển. Khi tính lợi nhuận, những đơn đó âm thầm được coi như ship = 0 đồng. Biên lợi nhuận báo cáo đẹp hơn thực tế vài điểm phần trăm - đủ để bạn tưởng một sản phẩm đang lời trong khi nó đang lỗ. Ô trống không hét lên; nó chỉ lặng lẽ kéo trung bình về phía có lợi cho ảo tưởng.

## Nhất quán (consistency) - cùng một thứ, nhiều cách viết

**Nhất quán** (*consistency* - đồng nhất giữa các nguồn và bản ghi) hỏi: cùng một thực thể có được biểu diễn giống nhau ở mọi nơi không?

*Ví dụ minh hoạ:* khách "Nguyễn Văn An" ở sheet bán hàng, "Nguyen Van An" ở CRM, "NV An" ở file giao hàng - ba cái tên cho một người. Khi tính giá trị trọn đời của khách, hệ thống chia anh ấy thành ba khách nhỏ, không ai đủ "VIP" để được chăm. Tương tự, "Hà Nội", "HN", "Hanoi", "Ha noi" là bốn cách viết cho một thành phố. Mỗi nguồn đều *tự nó* đúng - nhưng ghép lại thì lệch.

## Kịp thời (timeliness) - số của hôm nay hay của ba ngày trước

**Kịp thời** (*timeliness* - đủ mới để dùng) hỏi: dữ liệu có đủ mới so với thời điểm bạn ra quyết định không? Một con số chính xác tuyệt đối nhưng trễ ba ngày có thể còn nguy hiểm hơn một con số xấp xỉ nhưng cập nhật theo giờ.

*Ví dụ minh hoạ:* mùa sale, bạn xem báo cáo tồn kho lúc 9h sáng để quyết định đẩy ngân sách ads cho mã hàng nào. Nhưng bảng đó được cập nhật từ 0h đêm qua. Trong 9 tiếng đó, mã bán chạy nhất đã hết sạch - và bạn vừa rót thêm tiền quảng cáo cho một sản phẩm không còn để bán. Số *đúng* tại 0h, nhưng *vô dụng* tại 9h.

## Hợp lệ (validity) - đúng định dạng, đúng miền giá trị

**Hợp lệ** (*validity* - đúng định dạng và nằm trong miền giá trị cho phép) hỏi: mỗi giá trị có đúng kiểu, đúng khuôn, nằm trong khoảng cho phép không? Khác với "chính xác" (đúng sự thật), "hợp lệ" chỉ hỏi giá trị có *hợp khuôn* không.

*Ví dụ minh hoạ:* cột ngày trộn `30/06/2027`, `2027-06-30`, và một con số trần `45838` mà Excel tự hiểu. Cột tuổi khách có một dòng ghi 220. Số điện thoại có dòng chỉ 6 chữ số. Một đơn ghi số lượng âm. Những giá trị này không *hợp lệ* - và khi máy cộng dồn, ngày tháng xếp nhầm quý, tuổi 220 kéo lệch độ tuổi trung bình. Bảng không báo lỗi, vì database nhận tất.

## Duy nhất (uniqueness) - một thực thể, đúng một bản ghi

**Duy nhất** (*uniqueness* - không trùng lặp bản ghi) hỏi: mỗi thực thể có xuất hiện đúng một lần không, hay đang bị nhân bản?

*Ví dụ minh hoạ:* hôm đó ai đó export trùng, 200 đơn bị nhân đôi. Đột nhiên doanh thu tháng "tăng trưởng" 18%. Bạn mang con số đó vào phòng họp, ăn mừng một mức tăng không hề tồn tại - rồi đặt KPI tháng sau dựa trên một nền giả. Trùng lặp không làm hỏng từng dòng; nó làm hỏng mọi *phép tổng*.

<div class="viz">
<div class="viz-chart" data-chart="radar" data-chart-data='{"indicators":[{"name":"Chính xác","max":100},{"name":"Đầy đủ","max":100},{"name":"Nhất quán","max":100},{"name":"Kịp thời","max":100},{"name":"Hợp lệ","max":100},{"name":"Duy nhất","max":100}],"series":[{"name":"Trước khi dọn","values":[60,55,40,70,65,50],"color":"#ef4444"},{"name":"Sau khi chuẩn hóa","values":[92,88,85,90,94,96],"color":"#10b981"}]}'></div>
<div class="viz-caption">Sáu chiều chất lượng dữ liệu (số minh họa): radar cho thấy "ổn" thật ra lệch nặng ở Nhất quán &amp; Duy nhất - đo từng chiều mới biết sửa chỗ nào.</div>
</div>

## Vì sao phải đo từng chiều thay vì cảm tính "ổn"

Nhìn cái radar bên trên. Nếu bạn chỉ hỏi "dữ liệu ổn không", đường đỏ vẫn được gật đầu cho qua - điểm trung bình của nó *trông* tạm ổn. Nhưng tách ra sáu chiều, sự thật lộ ra: bảng này khá ở Kịp thời và Hợp lệ, nhưng **rách toạc ở Nhất quán (40) và Duy nhất (50)**. Đó chính xác là hai chỗ bạn cần dọn - và cảm tính "ổn" sẽ chẳng bao giờ chỉ ra được.

Đây là lý do đo từng chiều quan trọng đến vậy: **mỗi chiều hỏng kéo theo một loại quyết định sai khác nhau.** Hỏng *Nhất quán* → bạn xếp nhầm khách VIP thành ba khách thường, chăm sóc sai người. Hỏng *Duy nhất* → bạn đặt KPI trên doanh thu phồng giả. Hỏng *Kịp thời* → bạn rót ads cho hàng đã hết. Hỏng *Đầy đủ* → bạn tưởng sản phẩm lỗ đang lời. Biết *chiều nào* hỏng cho bạn biết *quyết định nào* đang đứng trên đất lún - và sửa đúng chỗ thay vì dọn loạn xạ.

> Quy tắc vàng: đừng hỏi "dữ liệu có sạch không" - hỏi "sạch ở chiều nào, hỏng ở chiều nào". Một con số chỉ đáng tin khi cả sáu chiều cùng đứng vững dưới nó.

Lưu ý: bài này nói về việc *định nghĩa và đo* sáu chiều - chứ không phải quy trình dọn. Nếu bạn đang ngập trong việc lau số bẩn, [80% thời gian "phân tích" thật ra là dọn rác](/blog/du-lieu-ban/) bàn kỹ cách dọn; còn khi data bẩn làm hỏng cả mô hình dự đoán, [dữ liệu bẩn giết model - đừng vội đổi thuật toán](/blog/du-lieu-ban-giet-model/) cho thấy hậu quả ở tầng AI.

## Đo xong rồi giữ cho nó đứng vững - chỗ Semantix chen vào

Đo được sáu chiều là một chuyện; *giữ* cho chúng cao khi dữ liệu sinh ra mỗi ngày ở năm nguồn lại là chuyện khác. Hai trong sáu chiều đặc biệt khó giữ bằng tay, và đây là chỗ một nền tảng có ích.

Chiều **Nhất quán** sống chết nhờ một **định nghĩa chung**: "doanh thu", "khách hàng", "kênh" phải có *một* nghĩa duy nhất cho cả tổ chức. Đó chính là việc một [tầng định nghĩa nghiệp vụ dùng chung](/blog/mot-nguon-su-that/) sinh ra để làm - định nghĩa một lần, ai hỏi cũng ra cùng một số, hết cảnh "Shopee" và "SP" bị đếm thành hai kênh.

Chiều **Kịp thời** thì cần dữ liệu luôn ở nguồn và mới - thay vì copy về kho rồi nhìn ảnh chụp cũ. Và khi một con số đột nhiên nhảy bất thường (dấu hiệu một chiều nào đó vừa hỏng), việc tự động phát hiện bất thường giúp bạn biết *trước khi* mang số sai vào phòng họp. Nói thẳng để khỏi hiểu lầm: đây không phải một con chatbot đoán mò trên dữ liệu bẩn - mà là giữ cho sáu chiều đứng vững *trước* khi ai đó đặt câu hỏi.

## Tóm lại

| Chiều | Đo gì | Dấu hiệu hỏng |
|---|---|---|
| Chính xác (accuracy) | Số có khớp sự thật ngoài đời | Tồn kho ghi 120 nhưng thực có 84 |
| Đầy đủ (completeness) | Có thiếu ô / dòng / khoảng thời gian | 12% đơn trống cột phí ship |
| Nhất quán (consistency) | Cùng thực thể, một cách biểu diễn | "Hà Nội" vs "HN" vs "Hanoi" |
| Kịp thời (timeliness) | Đủ mới so với lúc ra quyết định | Báo cáo tồn kho trễ ba ngày |
| Hợp lệ (validity) | Đúng định dạng & miền giá trị | Tuổi 220, ngày `45838`, số lượng âm |
| Duy nhất (uniqueness) | Một thực thể, đúng một bản ghi | 200 đơn export trùng, doanh thu phồng 18% |

Lần tới khi ai đó nói "dữ liệu ổn mà", đừng gật đầu cho qua. Hỏi lại: *ổn ở chiều nào?* Vì "ổn" là một cảm giác, còn sáu chiều này là một phép đo - và chỉ phép đo mới chỉ cho bạn biết con số sắp đưa vào quyết định đang đứng vững, hay đứng trên đất lún.

---

*Muốn thấy dữ liệu nhiều nguồn được gộp và chuẩn hóa trông ra sao trước khi tin một con số? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [vì sao công ty bạn đang có năm "nguồn sự thật"](/blog/mot-nguon-su-that/).*
