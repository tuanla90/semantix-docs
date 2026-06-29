---
title: "Tương quan & hồi quy: 'có liên quan không' là câu hỏi sai — câu đúng là 'mạnh cỡ nào, và đổi A thì B nhúc nhích bao nhiêu'"
code: "pt-047"
description: "Thấy chi ads tăng thì doanh thu tăng — bạn đã biết. Câu tiếp theo không phải 'có liên quan không' mà 'liên quan chặt cỡ nào, và thêm một triệu ads thì doanh thu thêm mấy triệu'."
pubDate: 2025-02-13
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/correlation-regression.svg"
coverAlt: "Đám điểm scatter chi quảng cáo và doanh thu, một đường khớp nét đứt xuyên qua giữa đám điểm"
---

Bạn mở bảng số và thấy hai cột đi cùng nhau: tháng chi quảng cáo nhiều thì doanh thu cao. Phản xạ đầu tiên là hỏi *"hai số này có liên quan không?"* — và gật đầu vì nhìn rõ là có.

Nhưng "có liên quan không" là một câu hỏi đã cũ. Mắt thường nhìn biểu đồ đã trả lời được nó từ lâu rồi. Câu hỏi thật sự đáng tiền — câu mà người ra quyết định cần — là hai câu khác hẳn: **hai số đó đi cùng nhau chặt cỡ nào** (đủ chặt để tin, hay chỉ lờ mờ?), và **nếu tôi vặn chi ads thêm một triệu, doanh thu nhúc nhích thêm bao nhiêu triệu?**

Trả lời câu thứ nhất là việc của **tương quan**. Trả lời câu thứ hai là việc của **hồi quy**. Đây là hai công cụ khác nhau, và lẫn lộn chúng — hoặc dừng lại ở "có liên quan" mà không đi tiếp — là bỏ lỡ phần hữu ích nhất của con số.

> Đây là góc *phương pháp đo lường*. Còn câu hỏi nhức nhối "hai số đi cùng nhau, nhưng cái nào **gây ra** cái nào?" là một chuyện hoàn toàn khác — đã bàn riêng ở bài [Tương quan không phải nhân quả](/blog/tuong-quan-nhan-qua/). Bài này giả định bạn đã thuộc bài học đó, và đi sâu vào *cách định lượng* quan hệ.

## Correlation: đo độ mạnh và chiều của quan hệ

**Tương quan** (correlation — mức độ hai con số cùng lên cùng xuống) không chỉ là "có hay không". Nó được đo bằng một con số duy nhất: **hệ số tương quan** (correlation coefficient — con số từ −1 đến +1 đo độ chặt của quan hệ tuyến tính), thường ký hiệu là *r*.

Cách đọc *r* dễ đến bất ngờ:

- **Dấu** cho biết *chiều*. Dương: A tăng thì B có xu hướng tăng (chi ads ↑ → doanh thu ↑). Âm: A tăng thì B giảm (giá ↑ → số đơn ↓).
- **Độ lớn** cho biết *độ chặt*. Gần ±1 nghĩa là các điểm gần như nằm gọn trên một đường thẳng — quan hệ rất chặt. Gần **0** nghĩa là quan hệ tuyến tính yếu hoặc gần như không có: biết A chẳng giúp bạn đoán B hơn là bao.

Một ví dụ Việt cho dễ hình dung: nếu *r* giữa chi ads và doanh thu của một shop là **0,9**, đó là quan hệ rất chặt — hai số gần như nhảy cùng nhịp. Nếu *r* chỉ **0,2**, đừng vội mừng: hai số có nhích cùng chiều, nhưng lỏng lẻo đến mức gần như là trùng hợp. Cùng một cái nhìn "có liên quan", nhưng *0,9* và *0,2* dẫn tới hai quyết định trái ngược.

> Quy tắc vàng: **"có liên quan" là câu hỏi của con mắt; "liên quan chặt cỡ nào" là câu hỏi của con số. Chỉ câu thứ hai mới đáng để ra quyết định.**

Một cảnh báo gọn: *r* chỉ đo quan hệ **tuyến tính** — quan hệ vẽ ra gần một đường thẳng. Nếu A và B có quan hệ cong (ví dụ: chi ads quá tay thì doanh thu *bão hòa* rồi đi ngang), *r* có thể thấp đến mức đánh lừa, dù rõ ràng hai số vẫn liên quan. Luôn nhìn biểu đồ phân tán trước khi tin con số *r*.

## Regression: vẽ một đường khớp để định lượng và dự đoán

Tương quan dừng lại ở "chặt cỡ nào". Để trả lời câu *"vặn A một đơn vị thì B đổi bao nhiêu"*, ta cần **hồi quy** (regression — vẽ một đường khớp qua đám điểm để mô tả quan hệ bằng một công thức).

Dạng đơn giản nhất là **hồi quy tuyến tính** (linear regression — khớp một đường thẳng), cho ra một công thức quen thuộc như hồi cấp ba:

```
doanh_thu = a + b × chi_ads
```

Hai chữ này là toàn bộ câu chuyện:

- **`a`** (hệ số chặn) là điểm xuất phát: doanh thu "nền" khi chi ads bằng 0.
- **`b`** (**độ dốc** — slope — đường khớp dốc bao nhiêu) là phần đắt giá nhất: **đổi chi ads một đơn vị thì doanh thu đổi đúng `b` đơn vị.** Nếu `b = 1,8`, mỗi triệu quảng cáo thêm "đi kèm" thêm khoảng **1,8 triệu** doanh thu.

Đó chính là con số bạn thật sự cần để cân nhắc ngân sách — chứ không phải một câu "ừ, có liên quan". Và một khi đã có đường khớp, bạn dùng nó để **dự đoán**: cắm một mức chi ads chưa từng thử vào công thức, ra một ước lượng doanh thu — nền tảng của mọi [bài toán dự báo](/blog/du-bao-la-gi/).

<div class="viz">
<div class="viz-chart" data-chart="scatter" data-chart-data='{"xName":"Chi quảng cáo (triệu)","yName":"Doanh thu (triệu)","showAxisValue":true,"hideLabels":true,"trendline":true,"points":[{"x":10,"y":48},{"x":15,"y":62},{"x":12,"y":51},{"x":20,"y":75},{"x":25,"y":88},{"x":18,"y":70},{"x":22,"y":80},{"x":28,"y":95},{"x":30,"y":99},{"x":14,"y":58},{"x":16,"y":61},{"x":24,"y":85}]}'></div>
<div class="viz-caption">Scatter chi quảng cáo × doanh thu (số minh họa) với đường hồi quy (nét đứt đỏ): độ dốc cho biết mỗi triệu quảng cáo thêm "đi kèm" bao nhiêu triệu doanh thu — nhưng nhớ: dốc lên không tự chứng minh nhân quả.</div>
</div>

Để ý: đường nét đứt đỏ không đi qua mọi điểm. Nó là đường *gần* tất cả các điểm nhất — chọn sao cho tổng khoảng cách từ các điểm tới đường là nhỏ nhất. Mỗi điểm vẫn lệch khỏi đường một chút, và phần lệch đó chính là thứ con số tiếp theo đo.

## R²: đường khớp giải thích được bao nhiêu phần biến động?

Một đường khớp đẹp mã chưa chắc là một đường khớp tốt. Câu hỏi kiểm tra là: **đường này bám sát dữ liệu thật đến mức nào?** Trả lời nằm ở **R²** (R-squared — hệ số xác định, đọc là "R bình phương"): tỷ lệ phần trăm biến động của B mà đường khớp giải thích được.

Đọc R² rất trực giác, vì nó luôn nằm từ 0 đến 1 (hay 0% đến 100%):

- **R² = 0,85** → đường khớp giải thích được **85%** lý do doanh thu lên xuống; 15% còn lại là do những yếu tố khác mà chi ads không nắm. Khá tốt.
- **R² = 0,2** → đường khớp chỉ giải thích **20%**; phần lớn biến động doanh thu đến từ chỗ khác. Công thức của bạn gần như vô dụng để dự đoán.

R² thấp không có nghĩa là sai — nó là một lời thú thật lương thiện rằng *"chi ads không phải nhân tố chính"*, và bạn nên đi tìm biến nào mới là nhân tố chính.

### Cảnh báo: hồi quy chỉ chỉ ra QUAN HỆ, không chứng minh NHÂN QUẢ

Đây là cái bẫy đắt nhất, và nó xứng đáng được in đậm: **một đường dốc lên với R² cao vẫn KHÔNG chứng minh rằng chi ads *tạo ra* doanh thu.** Hồi quy chỉ mô tả *hình dạng quan hệ* trong dữ liệu — nó không biết mũi tên nhân quả chỉ về phía nào, và nó hoàn toàn mù trước [yếu tố thứ ba (confounder) đứng sau đẩy cả hai số cùng lên](/blog/tuong-quan-nhan-qua/). Mùa Tết làm bạn vừa tăng chi ads vừa kéo khách về; hồi quy sẽ vui vẻ gán toàn bộ công lao cho ads, và bạn rót thêm tiền vào mùa ế để rồi lỗ. Đường khớp đẹp đến mấy cũng không cứu được bạn khỏi câu hỏi *"cái gì thật sự kéo cái gì"* — câu đó vẫn phải trả lời bằng A/B test hoặc nhóm đối chứng.

Cái bẫy thứ hai là **ngoại suy** (extrapolation — dùng đường khớp để đoán ra ngoài vùng dữ liệu đã có). Đường khớp của bạn được học từ những tháng chi ads **10–30 triệu**. Cắm vào đó con số **100 triệu** rồi tin lời nó tiên tri là tự lừa mình: bạn không có một điểm dữ liệu nào ở vùng đó, và quan hệ rất có thể đã cong (bão hòa, kiệt sức kênh) từ lâu. Đường khớp chỉ đáng tin **trong khoảng dữ liệu nó từng thấy.**

## Dựng scatter và xu hướng trong Semantix

Đây không phải chuyện "Semantix làm hồi quy thay nhà thống kê" — phân tích hồi quy nghiêm túc (kiểm định ý nghĩa, nhiều biến, chẩn đoán phần dư) vẫn cần công cụ thống kê chuyên dụng, và Semantix không hứa thay thế chúng. Cái Semantix rút ngắn là **bước đầu tiên, vốn tốn của analyst cả buổi**: kéo đúng hai chỉ số ra cùng một biểu đồ phân tán để bạn *nhìn thấy* quan hệ trước khi đo nó.

Bạn hỏi thẳng bằng tiếng Việt:

> **"Vẽ scatter chi quảng cáo và doanh thu theo từng tháng trong 12 tháng qua, kèm đường xu hướng"**

Semantix tự sinh truy vấn khớp [cách bạn đã định nghĩa "doanh thu" và "chi quảng cáo"](/blog/semantic-layer/) trong Ngữ cảnh ngữ nghĩa, rồi trả về đám điểm kèm đường xu hướng — đủ để bạn thấy ngay quan hệ chặt hay lỏng, thẳng hay cong, có điểm ngoại lai nào kéo lệch đường khớp không. Từ đó bạn biết *có đáng* đem dữ liệu sang công cụ thống kê để hồi quy cho ra `b` và R² chuẩn hay không. Công cụ không kết luận hộ bạn; nó chỉ đưa đúng hình ra đủ nhanh để bạn **kịp đặt câu hỏi đúng**.

## Tóm lại

| Dừng ở "có liên quan không" | Đi tiếp tới định lượng |
|---|---|
| Nhìn hai đường đi cùng → gật đầu. | Đo *r* để biết quan hệ chặt cỡ nào (gần ±1 hay gần 0). |
| "Chi ads ảnh hưởng doanh thu." | "Thêm 1 triệu ads đi kèm thêm ~1,8 triệu doanh thu (độ dốc `b`)." |
| Tin đường khớp vì nó dốc lên. | Đọc R²: đường khớp giải thích bao nhiêu % biến động. |
| Đường dốc lên → "ads tạo ra doanh thu". | Đường dốc lên chỉ là quan hệ — nhân quả phải kiểm chứng riêng. |
| Cắm 100 triệu vào công thức học từ vùng 10–30 triệu. | Chỉ tin đường khớp trong vùng dữ liệu nó từng thấy. |

Thấy hai con số đi cùng nhau chưa bao giờ là điểm dừng. Nó là điểm xuất phát của ba câu hỏi sắc hơn: *chặt cỡ nào, đổi một đơn vị thì đổi bao nhiêu, và đường khớp đáng tin tới đâu.* Trả lời được ba câu đó — và nhớ rằng không câu nào trong số đó chứng minh nhân quả — bạn đã biến một quan sát mơ hồ thành một con số dùng được.

---

*Muốn tự tay vẽ scatter và đường xu hướng trên chính dữ liệu của bạn? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [vì sao tương quan không phải nhân quả](/blog/tuong-quan-nhan-qua/) trước khi tin bất kỳ đường dốc nào.*
