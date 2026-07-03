---
title: "Phân tích chuỗi thời gian: vì sao đường doanh thu đẹp nhất lại nói dối bạn nhiều nhất"
code: "pt-043"
description: "Doanh thu tháng này tăng 12%. Mừng chưa? Có thể chỉ là Tết về. Trước khi kết luận, phải tách tín hiệu khỏi mùa vụ và nhiễu đã."
pubDate: 2025-11-10
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/time-series-forecast.png"
coverAlt: "Đường doanh thu thực tế nối sang đoạn dự báo nét đứt, kèm dải tin cậy loe rộng dần về tương lai"
---

Bạn mở bảng doanh thu 12 tháng và mắt bám ngay vào tháng vừa rồi: tăng 12% so với tháng trước. Phản xạ đầu tiên là ăn mừng - rồi đặt thêm hàng, thuê thêm người, vẽ thêm slide cho cuộc họp.

Khoan đã. Tháng vừa rồi là tháng giáp Tết. Năm nào tháng đó cũng nhảy vọt rồi rơi xuống vào tháng Hai âm. Cái "12%" bạn đang mừng có thể **không phải tăng trưởng thật** - mà chỉ là cái nhịp mùa vụ lặp lại hằng năm, không nói gì về việc doanh nghiệp đang lớn lên hay co lại.

Đây là sai lầm kinh điển khi nhìn một **chuỗi thời gian** (time series - dãy số đo cùng một chỉ số qua các mốc thời gian liên tiếp): phản ứng với từng cú nhấp nhô như thể mỗi cú đều mang ý nghĩa. Sự thật là một đường doanh thu trông giống một thông điệp duy nhất, nhưng thật ra nó là **ba câu chuyện chồng lên nhau** - và bạn phải tách chúng ra trước khi dám kết luận bất cứ điều gì.

## Một chuỗi thời gian gồm những gì

Về mặt khái niệm, gần như mọi chuỗi số kinh doanh đều là tổng của ba thành phần. Hiểu được ba thứ này, bạn sẽ không bao giờ nhìn một đường biểu đồ theo kiểu cũ nữa.

| Thành phần | Là gì | Ví dụ Việt Nam |
|---|---|---|
| **Xu hướng** (trend) | Chiều đi *dài hạn*, lên hay xuống, sau khi gạt nhiễu ngắn hạn | Doanh thu nhích đều +3%/tháng suốt cả năm |
| **Mùa vụ** (seasonality) | Nhịp **lặp lại** theo chu kỳ cố định | Tết tăng vọt; cuối tuần đông hơn ngày thường |
| **Nhiễu** (noise) | Dao động ngẫu nhiên còn sót lại, không lặp, không có ý nghĩa | Một khách lớn tình cờ đặt to đúng tháng này |

**Xu hướng** (trend - hướng đi dài hạn của chỉ số) là thứ bạn *muốn* nắm: nó trả lời câu "doanh nghiệp đang lớn hay teo?". **Mùa vụ** (seasonality - quy luật lên xuống lặp lại theo thời điểm) là thứ bạn cần *nhận ra để trừ ra*: tháng giáp Tết bao giờ chả cao, cuối tuần quán café bao giờ chả đông - biết trước thì đừng nhầm nó với tăng trưởng. **Nhiễu** (noise - biến động ngẫu nhiên không phản ánh thay đổi thật) là thứ bạn *không thể* và *không nên* cố giải thích - cố tìm "lý do" cho mỗi cú nhiễu là tự lừa mình.

## Vì sao phải tách ba thành phần trước khi kết luận

Quay lại con số 12% đầu bài. Câu hỏi sống còn không phải "tăng bao nhiêu", mà là: **tăng thật, hay chỉ mùa vụ?**

Nếu đó là **xu hướng**, bạn nên đầu tư thêm - đà này sẽ kéo dài. Nếu đó là **mùa vụ**, bạn nên chuẩn bị tinh thần cho cú rơi tháng sau, và *đừng* nhập kho như thể nhu cầu sẽ giữ nguyên. Hai kết luận trái ngược, từ cùng một con số - khác biệt nằm hết ở chỗ bạn có tách được thành phần hay không.

Cách tách quen thuộc nhất là so **cùng kỳ năm ngoái** (year-over-year): tháng này năm nay so với đúng tháng này năm ngoái, để cái nhịp Tết tự triệt tiêu. Một cách khác là làm trơn bằng **trung bình trượt** (moving average - lấy trung bình một cửa sổ vài kỳ liền nhau để san phẳng dao động ngắn hạn), giúp đường xu hướng nổi lên khỏi lớp nhiễu. Cả hai đều phục vụ một mục đích: *đừng phản ứng với cú nhiễu, hãy phản ứng với cái tín hiệu bên dưới.*

> Quy tắc vàng: trước khi mừng hay lo vì một con số tháng, hãy hỏi "nếu trừ đi mùa vụ thì còn lại gì?". Phần còn lại mới là tin tức thật.

## Dự báo là gì - và vì sao một con số trần là vô trách nhiệm

Khi đã hiểu cấu trúc của chuỗi, ta mới nói tới **dự báo** (forecast - chiếu giá trị tương lai dựa trên quy luật của quá khứ). Dự báo không phải bói toán; nó là phép kéo dài cái xu hướng và cái nhịp mùa vụ đã học được, ra phía trước vài kỳ.

Nhưng đây là điểm quan trọng nhất, đọc chậm: **một con số dự báo đơn lẻ là một lời nói dối lịch sự.** Khi ai đó nói "tháng sau 7 tỷ", họ đang giấu đi điều họ thật sự biết - rằng con số đó *có thể* là 6,5, *có thể* là 7,6. Một dự báo tử tế không phải một con số, nó là một **dải tin cậy** (confidence band - vùng giá trị mà thực tế nhiều khả năng rơi vào). Thay vì "7 tỷ", phải nói: *"khoảng 6,9-7,6 tỷ, nhiều khả năng quanh 7,3."*

Và dải đó **loe rộng dần** về tương lai - không phải lỗi vẽ, mà là quy luật: càng nhìn xa, càng nhiều thứ kịp thay đổi, bất định *nhân* lên chứ không cộng. (Vì sao mọi dự báo đều sai mà vẫn nên làm, xem kỹ ở [Dự báo cho doanh nghiệp - Phần 1](/blog/du-bao-la-gi/).)

### Chọn phương pháp nào: Linear, Holt hay Holt-Winters

Không có một nút "dự báo" vạn năng. Chọn phương pháp theo *hình dạng* chuỗi của bạn:

- **Linear** - kẻ một đường thẳng qua dữ liệu rồi kéo dài. Hợp khi chuỗi đi *gần như thẳng*, không có mùa vụ rõ. Đơn giản nhất, cũng thô nhất.
- **Holt** - bắt được **xu hướng** đang lên/xuống, nhưng *bỏ qua* mùa vụ. Hợp khi có đà tăng giảm rõ mà không có nhịp lặp theo mùa.
- **Holt-Winters** - bắt cả **xu hướng lẫn mùa vụ** cùng lúc. Đây là lựa chọn cho hầu hết số liệu kinh doanh Việt Nam, nơi cái nhịp Tết / cuối tuần là không thể bỏ qua.

Cả ba đều thuộc họ **ETS / làm trơn lũy thừa** (Exponential Smoothing - cho kỳ gần đây trọng số lớn hơn kỳ xa, vì quá khứ gần thường nói nhiều hơn về tương lai).

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],"yUnit":" tỷ","series":[{"name":"Thực tế","values":[4.2,4.0,4.8,4.5,5.1,4.9,5.6,5.3,6.0,null,null,null],"color":"#4f46e5"},{"name":"Dự báo","values":[null,null,null,null,null,null,null,null,6.0,6.4,6.8,7.3],"color":"#4f46e5","dashed":true}],"band":{"lower":[4.2,4.0,4.8,4.5,5.1,4.9,5.6,5.3,6.0,5.9,6.0,6.2],"upper":[4.2,4.0,4.8,4.5,5.1,4.9,5.6,5.3,6.0,6.9,7.6,8.4],"color":"#6366f1"}}'></div>
<div class="viz-caption">Dự báo doanh thu (số minh họa): đường liền là thực tế, đường nét đứt là dự báo 3 tháng tới, vùng mờ là dải tin cậy - càng xa càng rộng vì bất định tăng dần.</div>
</div>

## Phân tích chuỗi thời gian trong Semantix

Nói thẳng để không hứa quá. Semantix **không** đưa cho bạn một module tách chuỗi thành ba đường riêng (trend, mùa vụ, nhiễu) để ngắm từng cái; nó cũng **không** chạy ARIMA hay Prophet. Những thứ đó hay, nhưng không phải thứ một chủ SME cần để ra quyết định sáng mai.

Cái Semantix *có thật* là **forecast** đặt thẳng lên biểu đồ thời gian của bạn. Engine dùng **ETS / Holt-Winters** (mô phỏng cách Power BI làm): nó **tự dò mùa vụ** bằng autocorrelation (đo xem chuỗi có tự lặp lại sau mỗi bao nhiêu kỳ), **tự tinh chỉnh tham số**, rồi vẽ **đường nét đứt** nối tiếp đường thực, kèm một **dải tin cậy** loe dần - đúng như hình trên. UI để bạn chọn giữa **Holt-Winters / Holt / Linear** tùy hình dạng chuỗi.

Và bạn không cần chạm vào tham số nào. Bạn hỏi bằng tiếng Việt:

> **"Dự báo doanh thu 3 tháng tới, kèm dải tin cậy"**

Semantix dựng đường lịch sử, dò mùa vụ, vẽ dự báo *kèm dải sai số loe dần* ngay trên chart. *(Các con số trong bài là ví dụ minh họa.)* Đây chính là bước chạm vào nấc **dự đoán** trong [hành trình tiến hóa của BI](/blog/tien-hoa-bi/) - mà không cần dựng cả đội data. Khi tháng mới khép sổ, hỏi lại một câu là có bản cập nhật; và nếu bài toán của bạn là kho hàng, [dự báo nhu cầu tồn kho thực chiến](/blog/du-bao-ton-kho-thuc-chien/) đi sâu vào cách ghép xu hướng + mùa vụ thành điểm đặt hàng.

## Tóm lại

| Nhìn đường thô | Tách thành phần + forecast có dải |
|---|---|
| "Tháng này tăng 12% - mừng!" | "Trừ mùa vụ Tết ra, xu hướng thật chỉ +2%" |
| Phản ứng với từng cú nhấp nhô | Phản ứng với tín hiệu, bỏ qua nhiễu |
| "Tháng sau 7 tỷ" (một con số trần) | "Khoảng 6,9-7,6 tỷ, quanh 7,3" (có dải tin cậy) |
| Một phương pháp cho mọi chuỗi | Chọn Linear / Holt / Holt-Winters theo hình dạng |
| Dự báo xa cũng chắc như gần | Dải loe rộng dần - càng xa càng mờ |

> **Mental model:** một đường thời gian không phải một thông điệp, mà là ba câu chuyện chồng lên nhau - xu hướng, mùa vụ, nhiễu. Việc của bạn không phải đọc cái đường, mà là bóc từng lớp, rồi chỉ tin vào lớp xu hướng.

---

*Muốn thấy dự báo doanh thu kèm dải tin cậy ngay trên dữ liệu của bạn, hỏi bằng tiếng Việt? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Dự báo cho doanh nghiệp - Phần 1: mọi dự báo đều sai (nhưng vẫn hữu ích)](/blog/du-bao-la-gi/).*
