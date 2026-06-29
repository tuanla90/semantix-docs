---
title: "Thống kê mô tả (Phần 1): độ lệch chuẩn & phương sai - vì sao trung bình cần đi kèm độ phân tán"
code: "kt-028"
series: "thong-ke-mo-ta"
seriesOrder: 1
description: "Hai shop cùng doanh thu trung bình một tháng. Một shop ổn định đều đặn, một shop nay đỉnh mai đáy. Cùng một con số, hai số phận khác hẳn."
pubDate: 2025-01-25
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/do-lech-chuan.svg"
coverAlt: "Hai đường chuông cùng đỉnh trung bình: một đường hẹp gọn, một đường rộng bè"
---

<div class="series-nav">
  <div class="series-nav-title">📐 Series Thống kê mô tả cho người làm số · 5 phần</div>
  <ol>
    <li class="current">Phần 1 - Độ lệch chuẩn &amp; phương sai</li>
    <li><a href="/blog/phan-vi-percentile/">Phần 2 - Phân vị (P50/P90/P99)</a></li>
    <li><a href="/blog/doc-hinh-dang-phan-phoi/">Phần 3 - Đọc hình dạng phân phối</a></li>
    <li><a href="/blog/phan-tram-vs-diem-phan-tram/">Phần 4 - Phần trăm vs điểm phần trăm</a></li>
    <li><a href="/blog/trung-binh-co-trong-so/">Phần 5 - Trung bình có trọng số</a></li>
  </ol>
</div>

Hai cửa hàng cà phê mang đi ở cùng một con phố Đà Nẵng. Cuối tháng, cả hai báo cùng một con số: **doanh thu trung bình 5 triệu/ngày**. Trên giấy, hai shop y hệt nhau. Bạn sẽ định giá sang nhượng chúng bằng nhau, cho vay vốn như nhau, đánh giá quản lý ngang nhau.

Nhưng bước vào thực tế: shop A ngày nào cũng quanh quẩn 4,7–5,3 triệu - đều như vắt chanh. Shop B thì nay 9 triệu, mai 1,5 triệu, mốt 6, hôm sau 2 - đu dây thường xuyên. Chủ shop B sống trong thấp thỏm: không biết tuần này có đủ tiền trả lương không, nhập hàng bao nhiêu là vừa, lúc nào nên thuê thêm người.

Phản xạ của bạn có thể là: "Trung bình bằng nhau thì hai shop tương đương." Đây đúng là cái bẫy. **Trung bình giống nhau không có nghĩa là hai thực tế giống nhau.** Con số trung bình cho bạn biết "tâm điểm", nhưng nó câm lặng tuyệt đối về một thứ sống còn: dữ liệu *trải rộng* quanh tâm điểm đó đến đâu. Thứ "trải rộng" ấy có tên - và đo được.

## Trung bình chỉ kể nửa câu chuyện

Khi bạn tính **mean (trung bình cộng - cộng hết lại rồi chia cho số lượng)**, bạn ép cả một đám dữ liệu lộn xộn thành đúng một con số. Tiện thì tiện, nhưng bạn vừa vứt đi một nửa thông tin: *các con số gốc cách xa nhau bao nhiêu?*

Cái "cách xa nhau" đó gọi là **độ phân tán (mức dữ liệu tản ra quanh trung bình)**. Hai tập dữ liệu cùng mean nhưng khác độ phân tán là hai con vật hoàn toàn khác nhau. Một bên co cụm, dễ đoán, an toàn. Một bên văng tứ tung, khó lường, đầy rủi ro. Vấn đề là mắt thường nhìn vào hai con số "5 triệu" thì thấy giống hệt - bạn cần một thước đo riêng cho độ tản.

> Quy tắc vàng: một con số trung bình đứng một mình là một câu nói nửa vời. **Luôn hỏi thêm: nó dao động cỡ nào?** Chính độ dao động - chứ không phải tâm điểm - mới quyết định bạn có ngủ ngon được không.

## Phương sai: trung bình của khoảng cách (bình phương)

Cách đo độ tản tự nhiên nhất: với mỗi điểm dữ liệu, đo nó cách mean bao xa, rồi lấy trung bình các khoảng cách đó. Gần như đúng - chỉ vướng một chỗ: điểm nằm trên mean cho khoảng cách dương, điểm nằm dưới cho khoảng cách âm, cộng lại chúng triệt tiêu nhau về 0. Vô dụng.

Mẹo của các nhà thống kê: **bình phương** mỗi khoảng cách trước khi cộng. Bình phương biến mọi số âm thành dương (dấu trừ biến mất), đồng thời *phạt nặng* những điểm lệch xa - lệch gấp đôi thì bị tính gấp bốn. Lấy trung bình các bình phương đó, bạn được **phương sai (variance - trung bình của bình phương khoảng cách từ mỗi điểm tới mean)**.

Phương sai càng lớn = dữ liệu càng tản rộng. Phương sai bằng 0 = mọi điểm dính chặt vào mean, không nhúc nhích. Đẹp về toán, nhưng có một phiền toái: vì đã bình phương, đơn vị của phương sai cũng bị bình phương theo. Doanh thu tính bằng "triệu đồng" thì phương sai ra "triệu đồng bình phương" - một đơn vị chẳng ai hình dung nổi.

## Độ lệch chuẩn: kéo đơn vị về lại cho người đọc

Cách sửa đơn giản đến bất ngờ: lấy **căn bậc hai** của phương sai. Căn bậc hai "tháo" cái bình phương ra, kéo con số về đúng đơn vị gốc - "triệu đồng" trở lại là "triệu đồng". Kết quả gọi là **độ lệch chuẩn (standard deviation - căn bậc hai của phương sai, đo độ phân tán bằng chính đơn vị của dữ liệu)**.

Đây là lý do trong thực tế bạn nghe người ta nói **độ lệch chuẩn** chứ ít khi nói phương sai: nó *đọc được*. "Doanh thu trung bình 5 triệu, độ lệch chuẩn 0,3 triệu" nghĩa là dữ liệu thường nằm loanh quanh 5 triệu, lệch lên xuống cỡ 300 nghìn - một câu ai cũng hiểu ngay.

Một quy tắc bỏ túi cực kỳ hữu dụng: với dữ liệu phân bố tương đối cân đối, **khoảng "mean ± 1 độ lệch chuẩn" ôm trọn phần lớn dữ liệu** (thường khoảng hai phần ba số ngày/đơn/khách). Nói cách khác, độ lệch chuẩn cho bạn một "khoảng sống thường ngày": shop A là 5 ± 0,3 triệu (sống trong vùng 4,7–5,3), shop B là 5 ± 2,4 triệu (vùng 2,6–7,4). Hai khoảng sống khác nhau một trời một vực - dù mean in trên báo cáo y hệt.

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="24" fill="#475569" font-size="14" font-weight="700">Hai shop cùng mean = 5 triệu/ngày, khác độ lệch chuẩn</text>
  <line x1="40" y1="250" x2="660" y2="250" stroke="#94A3B8" stroke-width="2"/>
  <line x1="350" y1="60" x2="350" y2="262" stroke="#22D3EE" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="350" y="280" fill="#22D3EE" font-size="12" font-weight="700" text-anchor="middle">mean = 5tr</text>
  <path d="M300 250 C330 250 335 90 350 90 C365 90 370 250 400 250 Z" fill="#34D399" opacity="0.85"/>
  <path d="M120 250 C220 250 300 150 350 150 C400 150 480 250 580 250 Z" fill="#F87171" opacity="0.55"/>
  <text x="350" y="80" fill="#0F766E" font-size="12" font-weight="700" text-anchor="middle">Shop A · hẹp · stddev 0,3tr</text>
  <text x="555" y="200" fill="#B91C1C" font-size="12" font-weight="700" text-anchor="middle">Shop B</text>
  <text x="555" y="216" fill="#B91C1C" font-size="12" font-weight="700" text-anchor="middle">rộng · stddev 2,4tr</text>
  <line x1="300" y1="250" x2="400" y2="250" stroke="#0F766E" stroke-width="5"/>
  <text x="350" y="245" fill="#0F766E" font-size="11" text-anchor="middle">±1 stddev (A)</text>
  <line x1="160" y1="262" x2="540" y2="262" stroke="#B91C1C" stroke-width="4"/>
  <text x="350" y="306" fill="#B91C1C" font-size="11" text-anchor="middle">±1 stddev (B): vùng sống rộng gấp 8 lần</text>
</svg>
<div class="viz-caption">Cùng một đỉnh trung bình, nhưng đường của shop B bè rộng ra hai bên - độ lệch chuẩn lớn nghĩa là ngày nào cũng có thể rất khác ngày nào. (Số minh hoạ.)</div>
</div>

## Vì sao độ phân tán mới là thứ khiến bạn mất ngủ

Quay lại hai shop. Cùng mean, nhưng hãy nhìn một tuần thật:

| Ngày | Shop A (triệu) | Shop B (triệu) |
|---|---|---|
| Thứ 2 | 4,8 | 9,2 |
| Thứ 3 | 5,1 | 1,6 |
| Thứ 4 | 4,9 | 6,4 |
| Thứ 5 | 5,2 | 2,1 |
| Thứ 6 | 5,0 | 8,8 |
| Thứ 7 | 5,3 | 1,9 |
| CN | 4,7 | 5,0 |
| **Mean** | **5,0** | **5,0** |
| **Độ lệch chuẩn** | **≈ 0,2** | **≈ 3,1** |

Mean dán nhãn hai shop là sinh đôi. Độ lệch chuẩn vạch trần sự thật: shop A là một cỗ máy đều đặn, shop B là một chuyến tàu lượn. Với người vận hành, khác biệt này là tất cả - **độ lệch chuẩn cao đồng nghĩa với rủi ro và khó dự đoán.** Shop B không thể nhập hàng theo "trung bình 5 triệu" vì ngày 1,6 triệu sẽ ôm hàng tồn, còn ngày 9,2 triệu sẽ cháy hàng mất khách.

Ý tưởng này lặp lại ở mọi ngóc ngách kinh doanh, không chỉ doanh thu:

- **Thời gian giao hàng.** Shop A giao trung bình 5 phút, lệch ±1 phút - khách luôn vui. Shop B cũng *trung bình 5 phút*, nhưng lệch ±20 phút: phần lớn đơn nhanh, nhưng đều đặn có những đơn 40 phút khiến khách một đi không trở lại. Hai shop "trung bình giao 5 phút" - một bên giữ khách, một bên rỉ máu khách mà bảng báo cáo trung bình không hề báo động.
- **Chất lượng sản phẩm.** Cân cà phê trung bình đúng 250g, nhưng độ lệch chuẩn lớn nghĩa là gói thì 220g gói thì 280g - khách khó chịu, mà bạn vừa lỗ vừa mang tiếng.
- **Dòng tiền.** Hai tháng cùng lợi nhuận trung bình, nhưng tháng dao động mạnh dễ làm bạn "kẹt" đúng tuần phải trả lương.

Đây cũng chính là lý do [một con số trung bình hay nói dối](/blog/trung-binh-noi-doi/): nó nén cả một câu chuyện nhiều lớp thành một điểm phẳng, giấu nhẹm chuyện dữ liệu thật sự dao động ra sao.

## Một cảnh báo: độ lệch chuẩn cũng bị outlier kéo

Độ lệch chuẩn không phải thước đo hoàn hảo cho mọi trường hợp. Vì công thức của nó *bình phương* khoảng cách, một điểm lệch cực mạnh - một **outlier (giá trị ngoại lai - điểm lệch hẳn khỏi phần còn lại)** - sẽ bị phóng đại và kéo độ lệch chuẩn vọt lên, y như cách nó kéo lệch mean.

*Ví dụ minh hoạ:* một shop giao 99 đơn quanh 5 phút và đúng *một* đơn 3 tiếng (tài xế lạc đường). Đơn 3 tiếng đó, khi bình phương khoảng cách, sẽ thổi phồng độ lệch chuẩn lên mức khiến bạn tưởng cả shop hỗn loạn - trong khi thực ra 99% đơn rất ổn. Với dữ liệu **lệch mạnh** hoặc đầy outlier (mà tiền bạc, thời gian chờ trong kinh doanh thường lệch phải), độ lệch chuẩn bắt đầu đánh lừa. Phân biệt khi nào một điểm lạ là [rác cần loại hay mỏ vàng cần đào](/blog/outlier-rac-hay-mo-vang/) là cả một kỹ năng riêng.

Khi đó, bạn cần một họ thước đo khác - bền vững hơn trước outlier - gọi là **phân vị**. Đó đúng là chủ đề của Phần 2.

## Đọc độ phân tán trong Semantix

Semantix **không phải một cái máy chỉ nhả ra mỗi con số trung bình** rồi để bạn tự đoán phần còn lại. Khi bạn hỏi bằng tiếng Việt, bạn hỏi luôn câu thứ hai - câu về độ phân tán:

> **"Doanh thu trung bình mỗi ngày của từng shop tháng này là bao nhiêu - kèm độ lệch chuẩn, và vẽ phân phối doanh thu theo ngày."**

Semantix hiểu ý định, sinh truy vấn trả về *cả* mean, độ lệch chuẩn và hình dạng phân phối - để bạn nhìn thấy ngay shop nào ổn định, shop nào đu dây, thay vì bị một con số trung bình ru ngủ. Mọi định nghĩa ("doanh thu", "đơn hàng") khóa sẵn trong tầng ngữ nghĩa nên các con số luôn nhất quán giữa các lần hỏi.

## Tóm lại

| Chỉ nhìn trung bình (dễ ngộ nhận) | Nhìn cả độ phân tán (đọc thật) |
|---|---|
| "Hai shop cùng 5 triệu → tương đương" | "Cùng mean, nhưng độ lệch chuẩn nào lớn hơn?" |
| "Giao trung bình 5 phút → ổn" | "±1 độ lệch chuẩn là bao nhiêu? Có đơn 40 phút không?" |
| Một con số tâm điểm | Tâm điểm **và** khoảng dao động quanh nó |
| Độ lệch chuẩn lớn = bỏ qua | Độ lệch chuẩn lớn = cờ đỏ rủi ro |
| Tin stddev với mọi dữ liệu | Dữ liệu lệch mạnh → cẩn thận outlier, chuyển sang phân vị |

> Mental model: trung bình cho bạn biết *đoàn tàu dừng ở ga nào*, còn độ lệch chuẩn cho bạn biết *con tàu lắc lư đến mức nào trên đường tới đó*. Hai con tàu cùng đến một ga - một chuyến êm ru, một chuyến làm hành khách say sóng. Bạn không chọn vé chỉ vì cái ga.

---

*Muốn thấy cả độ lệch chuẩn và phân phối thay vì một con số trung bình che giấu rủi ro? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Và đọc tiếp [Phần 2 - Phân vị (P50/P90/P99)](/blog/phan-vi-percentile/): thước đo độ phân tán không bị outlier kéo, trả lời câu "đơn chậm nhất của tôi tệ tới đâu?".*
