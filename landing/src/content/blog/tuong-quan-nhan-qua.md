---
title: "Tương quan không phải nhân quả: vì sao 'càng chạy ads càng đông khách' có thể là một kết luận sai đắt tiền"
code: "pt-023"
series: "tu-duy-du-lieu"
seriesOrder: 4
description: "Tháng nào chi ads nhiều thì doanh thu cao - nên ads tạo ra doanh thu? Có thể cả hai cùng bị một yếu tố thứ ba kéo theo, và bạn vừa đốt tiền mùa ế."
pubDate: 2024-12-11
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/tuong-quan-nhan-qua.png"
coverAlt: "Hai đường cùng đi lên, dấu khác nhau giữa tương quan và nhân quả, một yếu tố thứ ba ẩn phía sau"
---

<div class="series-nav">
  <div class="series-nav-title">🧠 Series Tư duy dựa trên dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/tu-duy-du-lieu-la-gi/">Phần 1 - Tư duy dựa trên dữ liệu là gì</a></li>
    <li><a href="/blog/bat-dau-tu-cau-hoi/">Phần 2 - Bắt đầu từ câu hỏi, không từ dữ liệu</a></li>
    <li><a href="/blog/thien-kien-trong-doc-so/">Phần 3 - Những thiên kiến giết chết quyết định</a></li>
    <li class="current">Phần 4 - Tương quan không phải nhân quả</li>
    <li><a href="/blog/trung-binh-noi-doi/">Phần 5 - Khi con số đánh lừa: trung bình</a></li>
    <li><a href="/blog/leading-lagging-indicator/">Phần 6 - Từ số đến quyết định: leading vs lagging</a></li>
    <li><a href="/blog/tin-hieu-vs-nhieu/">Phần 7 - Tín hiệu vs nhiễu</a></li>
    <li><a href="/blog/goodhart-guardrail-metrics/">Phần 8 - Goodhart &amp; guardrail metrics</a></li>
    <li><a href="/blog/quyet-dinh-khi-thieu-du-lieu/">Phần 9 - Quyết định khi dữ liệu chưa đủ</a></li>
  </ol>
</div>

Một chủ shop thời trang ở TP.HCM mở bảng số 12 tháng và thấy một quy luật đẹp như sách giáo khoa: **tháng nào chi quảng cáo nhiều, tháng đó doanh thu cao.** Chi 50 triệu ads → bán 600 triệu. Chi 80 triệu → bán 950 triệu. Hai cột số đi lên song song, khít nhau từng nhịp.

Kết luận của anh nghe rất hợp lý: *ads tạo ra doanh thu.* Vậy thì đơn giản - muốn doanh thu cao hơn thì chi ads mạnh hơn. Anh dồn ngân sách vào tháng 7, giữa mùa thấp điểm, để "kích cầu". Kết quả: chi gấp đôi, doanh thu nhích đúng 8%, và tháng đó **lỗ**.

Phản xạ của anh sai ở đâu? Anh nhìn thấy hai con số cùng đi lên và tin rằng cái này **gây ra** cái kia. Nhưng hai số đi cùng nhau là một chuyện. Cái này tạo ra cái kia là chuyện hoàn toàn khác - và lẫn lộn hai chuyện đó là một trong những lỗi đắt tiền nhất khi đọc số.

## Tương quan là gì, nhân quả là gì

**Tương quan** (correlation - mức độ hai con số cùng lên cùng xuống) chỉ nói: *khi A cao thì B cũng có xu hướng cao.* Nó là một quan sát về hình dạng, không hơn. Hai đường đi song song trên biểu đồ - thế thôi.

**Nhân quả** (causation - quan hệ nguyên nhân-kết quả) nói một điều mạnh hơn nhiều: *thay đổi A sẽ làm B thay đổi theo.* Đây mới là thứ bạn cần để ra quyết định, vì quyết định luôn là "tôi vặn A, thì B có nhúc nhích không?".

Vấn đề là biểu đồ **chỉ cho bạn thấy tương quan**. Nó không bao giờ tự nói cho bạn biết có nhân quả hay không. Đó là khoảng trống mà bộ não tự lấp đầy bằng câu chuyện hợp lý nhất - và câu chuyện hợp lý nhất thường sai.

> Quy tắc vàng: **dữ liệu cho bạn thấy hai số đi cùng nhau; chỉ tư duy và kiểm chứng mới cho bạn biết số nào kéo số nào.**

## Sau một tương quan, luôn có ba khả năng - không phải một

Mỗi lần bạn thấy hai con số đi cùng nhau, đừng vội nhảy đến "A gây ra B". Có **ba** lời giải thích cùng nằm trên bàn, và nhân quả chỉ là một trong số đó.

**Khả năng 1 - Trùng hợp.** Đôi khi hai số đi cùng nhau thuần túy vì may rủi, nhất là khi bạn chỉ có vài điểm dữ liệu (12 tháng là rất ít). Càng lục nhiều cặp số, bạn càng dễ bắt được một cặp "trông như có quy luật" mà thực chất chẳng liên quan gì. Đây là lý do tồn tại cả một thể loại *ngụy tương quan* - những cặp số ngẫu nhiên khớp nhau đến buồn cười (xem mục dưới).

**Khả năng 2 - Nhân quả ngược.** A và B đúng là có liên hệ, nhưng bạn đoán sai chiều mũi tên: thật ra **B kéo A**, chứ không phải A kéo B. Quay lại chủ shop: rất có thể anh *chi ads nhiều hơn vào đúng những tháng anh kỳ vọng bán tốt* (mùa lễ, ra mẫu mới). Doanh thu cao không phải do ads - mà chính kỳ vọng doanh thu cao mới là cái khiến anh rót ads. Mũi tên đi ngược hẳn lại.

**Khả năng 3 - Yếu tố thứ ba (confounder).** Có một biến thứ ba đứng phía sau, lặng lẽ **đẩy cả A lẫn B cùng lên** - khiến chúng trông như liên quan, dù chúng chẳng tác động gì đến nhau. Với chủ shop, thủ phạm gần như chắc chắn là **mùa vụ**: tháng lễ Tết, Black Friday, mùa tựu trường vừa làm anh tăng chi ads, vừa tự nó kéo người mua đổ về. Mùa vụ kéo cả hai. Bỏ ads đi, doanh thu mùa lễ vẫn cao; bê ads sang tháng 7 vắng khách, nó chẳng kéo nổi ai.

> Một confounder (yếu tố gây nhiễu - biến thứ ba đứng sau cả hai số) giống như người giật dây hai con rối: hai con rối cùng giơ tay một lúc, nhìn như con này ra lệnh cho con kia, nhưng cả hai chỉ đang nghe theo một bàn tay khuất sau màn.

Ba khả năng này không loại trừ nhau, nhưng có một điều chắc chắn: **bạn không thể phân biệt chúng chỉ bằng cách nhìn hai đường đi song song.** Biểu đồ trông y hệt nhau trong cả ba trường hợp.

## Ngụy tương quan: khi số liệu "nói dối" một cách hài hước

Để thấy tương quan có thể vô nghĩa đến mức nào, hãy nhìn vài cặp số kinh điển hay được lôi ra làm trò:

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","T5","T6","T7","T8"],"series":[{"name":"Lượng kem bán ra","values":[12,32,22,62,52,92,112,124],"color":"#818cf8"},{"name":"Số vụ chết đuối","values":[6,26,16,56,46,84,104,116],"color":"#f59e0b","dashed":true}]}'></div>
<div class="viz-caption">Ví dụ minh họa: kem và đuối nước cùng tăng - nhưng kem không dìm ai cả. Confounder ở đây là <strong>trời nóng</strong>: nóng làm người ta vừa ăn kem nhiều hơn, vừa đi bơi nhiều hơn.</div>
</div>

*Ví dụ minh họa:* số vụ chết đuối và lượng kem bán ra ở một thành phố cùng tăng vọt vào mùa hè. Tương quan rất chặt. Nhưng không ai tin kem gây chết đuối - vì confounder quá rõ: **trời nóng** kéo cả hai. Cái khiến ngụy tương quan nguy hiểm trong kinh doanh là confounder thường *không* hiển nhiên như "trời nóng". Nó núp dưới dạng mùa vụ, dưới dạng một chiến dịch khác chạy song song, dưới dạng thay đổi giá - và bạn không nhìn ra nó vì nó không nằm trong bảng số bạn đang xem.

## Kiểm chứng nhân quả: ba cách nhẹ nhàng mà chắc tay

Tin tốt: bạn không cần một phòng thí nghiệm hay bằng thống kê để phân biệt tương quan với nhân quả. Ba kỹ thuật dưới đây đủ cho hầu hết quyết định kinh doanh.

**1. A/B test (thí nghiệm chia ngẫu nhiên hai nhóm A và B).** Cách sạch nhất. Muốn biết ads có thật sự đẩy doanh thu? Chia ngẫu nhiên: nửa số khu vực được thấy quảng cáo, nửa kia không - mọi yếu tố khác giữ nguyên. Nếu nhóm thấy ads mua nhiều hơn hẳn, bạn có nhân quả thật. Vì chia *ngẫu nhiên*, mùa vụ và các confounder khác tác động đều lên cả hai nhóm, nên chúng tự triệt tiêu.

**2. Nhóm đối chứng (holdout - nhóm cố ý không tác động để làm mốc so).** Khi không chia được hẳn hai nhóm, hãy cố ý chừa ra một nhóm "không đụng tới" làm mốc. Tung khuyến mãi cho 90% khách, giữ 10% không nhận gì. Chênh lệch doanh thu giữa hai nhóm mới là *hiệu quả thật* của khuyến mãi - phần còn lại là thứ vốn dĩ đã xảy ra.

**3. Kiểm soát biến - tách lát để cô lập confounder.** Nếu nghi mùa vụ là thủ phạm, đừng so cả năm. Hãy so **trong cùng một mùa**: các tháng thấp điểm có chi ads khác nhau thì doanh thu khác nhau ra sao? Nếu trong riêng mùa thấp điểm, chi ads gấp đôi mà doanh thu không nhúc nhích, thì tương quan đẹp đẽ cả năm kia phần lớn là do mùa vụ, không phải ads. Bạn vừa "giữ cố định" biến gây nhiễu để nhìn thấy quan hệ thật bên dưới - đây cũng chính là bài học cốt lõi trong [5 sai lầm kinh điển khi phân tích dữ liệu](/blog/sai-lam-khi-phan-tich-du-lieu/).

## Tách lát confounder trong Semantix

Đây không phải là chuyện "Semantix giúp bạn chứng minh nhân quả" - không công cụ nào làm thay bạn việc đó. Cái Semantix rút ngắn là **bước tách lát để confounder lộ mặt**, vốn xưa nay tốn của analyst cả buổi viết SQL và dựng pivot.

Thay vì nhìn một con số tổng, bạn hỏi thẳng bằng tiếng Việt để bóc tách theo lát cắt và theo thời gian:

> **"So chi tiêu ads và doanh thu theo từng tháng, tách riêng mùa cao điểm và mùa thấp điểm trong 2 năm qua"**

Semantix tự sinh truy vấn khớp [cách bạn đã định nghĩa "doanh thu" và "mùa vụ"](/blog/funnel-analysis/) trong Ngữ cảnh ngữ nghĩa, rồi trả về bảng đã cắt theo mùa - nơi confounder hiện ra ngay. Nếu trong mùa thấp điểm, đường ads và đường doanh thu *không* còn đi song song nữa, bạn vừa tự tay lật tẩy một tương quan giả. Công cụ không kết luận hộ bạn; nó chỉ đưa con số ra đúng lát cắt đủ nhanh để **bạn kịp nghi ngờ trước khi rót tiền**.

## Tóm lại

| Phản xạ sai: thấy tương quan → kết luận nhân quả | Tư duy đúng: tách lát, kiểm chứng trước khi tin |
|---|---|
| "Hai số cùng tăng, vậy cái này tạo ra cái kia." | "Hai số cùng tăng - còn ba khả năng phải loại trừ." |
| Nhìn một con số tổng cả năm. | Tách lát theo mùa/thời gian để confounder lộ mặt. |
| Tin ngay vì câu chuyện nghe hợp lý. | Hỏi: có thể nhân quả ngược không? Có biến thứ ba không? |
| Vặn A và cầu cho B tăng. | A/B test hoặc giữ nhóm đối chứng để đo hiệu quả thật. |
| Rót thêm ads vào mùa thấp điểm → lỗ. | Biết ads chỉ "ăn theo" mùa vụ → dồn lực đúng lúc. |

Hai con số đi cùng nhau chưa bao giờ là một câu trả lời. Nó chỉ là một câu hỏi hay: *điều gì đứng sau khiến chúng đi cùng nhau?* Trả lời được câu đó - bằng cách tách lát và kiểm chứng - bạn đã đi trước phần lớn người chỉ biết gật gù vì "hai đường nó khớp mà".

Số trung bình cũng có một kiểu nói dối tương tự, tinh vi không kém - đó là chuyện của [Phần 5: Khi con số đánh lừa - trung bình](/blog/trung-binh-noi-doi/).

---

*Muốn tự tay tách lát một tương quan đáng ngờ trên chính dữ liệu của bạn? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 5 - khi con số trung bình đánh lừa bạn.](/blog/trung-binh-noi-doi/)*
