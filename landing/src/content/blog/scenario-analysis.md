---
title: "Scenario Analysis: vì sao một con số dự báo đẹp đẽ lại là cách đặt cược nguy hiểm nhất"
code: "pt-050"
description: "Kế hoạch năm treo trên đúng một con số doanh thu. Nghe chắc chắn. Thật ra là cược cả công ty vào một mặt xúc xắc."
pubDate: 2025-10-26
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/scenario-analysis.svg"
coverAlt: "Một điểm xuất phát toả ra ba đường phân kỳ - xanh đi lên, lam đi ngang, đỏ đi xuống - minh hoạ ba kịch bản doanh thu"
---

Đầu năm, cả công ty ngồi lại làm kế hoạch. Sau hai buổi họp, một con số ra đời: "Năm nay doanh thu **72 tỷ**." Con số được đóng khung, đưa vào slide, chia chỉ tiêu cho từng phòng, dùng để duyệt ngân sách tuyển dụng và nhập hàng. Mọi quyết định lớn của 12 tháng tới đều treo trên con số đó.

Nghe rất chắc chắn. Một con số tròn trịa, có vẻ đã được tính toán kỹ. Nhưng hãy hỏi một câu khó chịu: *con số 72 tỷ ấy giả định điều gì?* Giả định sức mua giữ nguyên. Giả định giá nhập không tăng. Giả định không có đối thủ mới, không có cú sốc tỷ giá, không có đợt giãn cách nào. Cả kế hoạch là một lâu đài xây trên một chồng giả định - mà không ai ghi chúng ra, cũng không ai hỏi *"nếu sai thì sao?"*.

Phản xạ đầu tiên của bạn có thể là: "Thì dự báo cho *chuẩn* hơn, chọn con số *đúng* hơn." Nhưng đó vẫn là cái bẫy cũ. Đặt cược cả công ty vào một con số duy nhất - dù con số ấy được tính khéo đến đâu - vẫn là tung đúng một viên xúc xắc và cầu cho nó ra mặt mình muốn. Sự thật ngược đời: **kế hoạch tốt không chọn con số đúng. Nó chuẩn bị cho nhiều con số cùng lúc.** Và công cụ để làm việc đó có tên: **scenario analysis** (phân tích kịch bản - dựng vài tương lai khả dĩ thay vì một).

## Scenario là gì: vài tương lai từ vài giả định

Hãy phân biệt cho rõ, vì hai thứ này hay bị nhập làm một.

[**Dự báo** (forecast)](/blog/du-bao-la-gi/) là việc của máy: nhìn dữ liệu quá khứ, nhả ra *một* đường tương lai kèm một dải tin cậy thống kê. Nó trả lời "nếu mọi thứ tiếp diễn như cũ, số sẽ rơi vào đâu". Dải tin cậy ấy do *toán* sinh ra - phản ánh độ nhiễu của dữ liệu, không phản ánh quyết định kinh doanh của bạn.

**Scenario analysis** là việc của con người: bạn ngồi xuống, viết ra các *giả định kinh doanh* then chốt, rồi cố tình đổi chúng để xem tương lai rẽ nhánh ra sao. Không phải một đường - mà *vài* đường, mỗi đường ứng với một câu chuyện khác nhau về thế giới. Kinh điển nhất là bộ ba:

- **Kịch bản lạc quan** (best case - tốt nhất): sức mua phục hồi mạnh, chiến dịch Tết trúng, một khách lớn ký hợp đồng năm.
- **Kịch bản cơ sở** (base case - cơ sở): mọi thứ diễn ra "như dự kiến", không có cú hích cũng không có cú sốc.
- **Kịch bản thận trọng** (worst case - xấu nhất): sức mua chững, một đối thủ giảm giá, giá nhập đội lên 15%.

Khác biệt cốt lõi nằm ở chỗ này: dải tin cậy của forecast nói *"tôi không chắc lắm"*. Còn các kịch bản nói *"đây là ba câu chuyện cụ thể có thể xảy ra, và đây là điều khác nhau ở mỗi câu chuyện"*. Một cái là độ nhiễu của số liệu. Cái kia là **cây quyết định** của bạn.

## Cách dựng: tìm 2-3 biến nhạy cảm nhất, rồi đổi chúng

Sai lầm phổ biến khi mới làm scenario là đổi *mọi thứ* cùng lúc - 30 dòng giả định, mỗi dòng nhân lên cao/thấp, ra 2^30 kịch bản không ai đọc nổi. Đó không phải phân tích, đó là hỗn loạn.

Bí quyết: chỉ đụng vào **2-3 biến lắc kết quả mạnh nhất**. Với một nhà bán lẻ, đó thường là *giá bán trung bình*, *lượng khách*, và *giá vốn nhập hàng*. Với một công ty SaaS, đó là *số khách mới mỗi tháng*, *tỷ lệ rời bỏ* (churn) và *giá gói*. Những biến còn lại - tiền điện văn phòng, chi phí in ấn - có nhân đôi cũng chẳng làm xê dịch bức tranh, nên cứ giữ nguyên.

Quy trình gọn trong ba bước:

1. **Viết ra giả định.** Con số 72 tỷ ngầm giả định lượng khách +0%, giá giữ nguyên. Ghi rõ ra giấy. Một giả định *được viết ra* là một giả định *có thể tranh luận*; một giả định ẩn thì không.
2. **Đổi 2-3 biến đó theo ba mức** - cao / vừa / thấp - dựa trên kinh nghiệm và lịch sử, không phải con số trên trời.
3. **Đọc ra ba con số đáy** ứng với ba câu chuyện. Giờ bạn không có một mục tiêu, bạn có một *dải*.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","T5","T6"],"yUnit":" tỷ","series":[{"name":"Lạc quan","values":[5,5.4,5.9,6.5,7.2,8.0],"color":"#10b981","endLabel":true,"dashed":true},{"name":"Cơ sở","values":[5,5.2,5.4,5.6,5.9,6.2],"color":"#6366f1","endLabel":true},{"name":"Thận trọng","values":[5,4.9,4.7,4.6,4.4,4.3],"color":"#ef4444","endLabel":true,"dashed":true}]}'></div>
<div class="viz-caption">Ba kịch bản doanh thu (số minh họa): cùng điểm xuất phát, ba giả định khác nhau về sức mua mở ra ba tương lai - kế hoạch tốt là chuẩn bị cho cả ba, không chỉ cược vào "cơ sở".</div>
</div>

Nhìn biểu đồ, điều đáng giá không phải ba đường - mà *khoảng cách* giữa đường xanh và đường đỏ ở tháng 6: từ 4,3 đến 8,0 tỷ. Cái khoảng loe ra ấy chính là *mức độ bạn đang đặt cược*. Một kế hoạch chỉ biết tới đường lam ở giữa là một kế hoạch mù về chính rủi ro của nó.

## Biến nào lắc kết quả mạnh nhất thì đáng dựng kịch bản

Làm sao biết *biến nào* xứng đáng được đưa vào kịch bản? Đây là lúc cần tới người anh em của scenario: **sensitivity analysis** (phân tích độ nhạy - đo mỗi biến lắc kết quả mạnh đến đâu).

Cách làm đơn giản đến bất ngờ: giữ nguyên mọi thứ, chỉ nhúc nhích *một* biến ±10%, rồi xem con số đáy nhúc nhích bao nhiêu. Biến nào làm đáy rung lắc dữ nhất là biến *nhạy* nhất - và đó chính là biến đáng dựng kịch bản. Biến nào đổi 10% mà đáy gần như đứng yên thì bỏ qua, đừng tốn não.

*Ví dụ minh hoạ:* tại một shop thời trang, đổi *giá vốn nhập* ±10% làm lợi nhuận đổi tới ±35%; đổi *chi phí marketing* ±10% chỉ làm lợi nhuận đổi ±4%. Kết luận lạnh lùng: số phận tiệm này nằm ở *giá nhập*, không phải ở ngân sách quảng cáo. Vậy thì các kịch bản phải xoay quanh giá nhập - chứ không phải ngồi tranh cãi cắt 10% tiền chạy ads.

Sensitivity cho bạn biết *đụng vào đâu*. Scenario cho bạn biết *nếu đụng thì ra sao*. Hai cái đi với nhau như la bàn và bản đồ.

## Dùng kịch bản để đặt "ngưỡng hành động", không phải để lo lắng

Đây là phần nhiều người làm hụt. Dựng được ba đường rồi... để ngắm. Sai. Giá trị thật của scenario không nằm ở ba con số, mà ở **các ngưỡng quyết định bạn gắn vào chúng** *trước khi* chuyện xảy ra.

Cách dùng đúng là biến mỗi kịch bản thành một câu *nếu-thì*:

- *Nếu* hết quý 1 mà doanh thu bám sát đường **thận trọng** (≤ 4,7 tỷ) → *thì* hoãn đợt tuyển 5 người, dừng nhập lô hàng mùa hè, giữ tiền mặt.
- *Nếu* bám đường **lạc quan** (≥ 5,9 tỷ) → *thì* kích hoạt kế hoạch mở thêm điểm bán đã chuẩn bị sẵn.
- *Nếu* quanh **cơ sở** → *thì* chạy đúng kế hoạch gốc.

Cái hay của việc định ngưỡng *trước*: khi đường thận trọng thành sự thật, bạn không hoảng, không họp khẩn ba ngày liền. Bạn chỉ lật trang kế hoạch đã viết sẵn và làm theo. Đây chính là [tư duy quyết định khi dữ liệu chưa đủ](/blog/quyet-dinh-khi-thieu-du-lieu/): bạn không đợi biết chắc tương lai mới hành động - bạn chuẩn bị nước đi cho từng nhánh tương lai từ trước.

Đây cũng là nấc trên cùng của [thang trưởng thành phân tích](/blog/tien-hoa-bi/). Mô tả ("tháng trước bán bao nhiêu") và dự đoán ("tháng sau khoảng bao nhiêu") đều dừng ở việc *biết*. Scenario analysis bước sang **prescriptive analytics** (phân tích đề xuất - gợi ý nên làm gì): nó không chỉ vẽ tương lai, nó kê sẵn nước đi cho mỗi tương lai.

## Scenario trong Semantix

Để dựng kịch bản, đa số doanh nghiệp Việt mở một file Excel khổng lồ, ô nọ trỏ ô kia, sửa một con số là cả bảng vỡ - và chỉ một người trong công ty dám đụng vào nó. Semantix không phải một cỗ máy phán con số thần thánh, cũng *không* hứa hẹn mô phỏng Monte Carlo, lẫn một "bộ trượt giả định" tự sinh mọi kịch bản. Cái nó làm chắc chắn: dựng nền **dữ liệu** chung và chạy một [dự báo](/blog/du-bao-la-gi/) thật trên đó - đường cơ sở kèm khoảng tin cậy - bằng cách hỏi thẳng tiếng Việt:

> **"Dự báo doanh thu 6 tháng tới từ dữ liệu bán hàng, kèm khoảng tin cậy."**

Semantix dựng đường cơ sở từ dữ liệu thật kèm dải tin cậy - cho bạn cái *khoảng loe ra* thay vì một con số trần trụi. Còn các **kịch bản giả định** ("nếu lượng khách giảm 10%", "nếu tăng 15%") thì bạn **tự dựng**: điều chỉnh đầu vào, hoặc hỏi lại một câu khác rồi đặt các kết quả cạnh nhau để so. Chưa có bộ trượt giả định tự động - nhưng vì mỗi câu chỉ mất vài giây và đều đứng trên cùng một định nghĩa dùng chung, việc thử nhiều kịch bản vẫn nhanh hơn nhiều so với "đụng vào file Excel thiêng" mà cả công ty sợ làm vỡ. *(Các con số ở trên là ví dụ minh hoạ.)*

## Tóm lại

| Kế hoạch một con số | Kế hoạch dải kịch bản |
|---|---|
| "Năm nay 72 tỷ" | "Từ 58 đến 84 tỷ, tuỳ ba giả định" |
| Giả định ẩn, không ai tranh luận | Giả định viết ra, đem ra cãi được |
| Đổi mọi biến cùng lúc → hỗn loạn | Chỉ đổi 2-3 biến nhạy nhất |
| Số xấu xảy ra → họp khẩn, hoảng | Số xấu xảy ra → lật trang kế hoạch sẵn |
| Đặt cược cả công ty vào một mặt xúc xắc | Chuẩn bị nước đi cho cả ba mặt |

> **Quy tắc vàng:** đừng hỏi "con số đúng là bao nhiêu?". Hãy hỏi "nếu giả định của tôi sai theo hướng xấu nhất, tôi sẽ làm gì - và tôi đã viết nước đi đó ra chưa?". Người chọn một con số đang cầu may; người dựng kịch bản đang chuẩn bị.

---

*Muốn một dự báo doanh thu kèm khoảng tin cậy ngay trên dữ liệu của bạn, hỏi bằng tiếng Việt - rồi tự thử từng kịch bản? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc lại [vì sao mọi dự báo đều sai mà vẫn hữu ích](/blog/du-bao-la-gi/) để hiểu cái nền mà mọi kịch bản đứng lên.*
