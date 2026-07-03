---
title: "Thiết lập cảnh báo KPI: con số sống còn của bạn đã tụt 40% từ thứ Sáu - nhưng tới buổi họp thứ Hai bạn mới biết"
code: "hd-020"
description: "Doanh thu ngày rớt 40% từ thứ Sáu, nhưng phải đợi họp đầu tuần mới phát hiện. Mất một tuần để biết là mất một tuần để sửa. Đây là cách đặt cảnh báo KPI theo ngưỡng."
pubDate: 2025-09-04
category: "Hướng Dẫn Thực Chiến"
readTime: 8
author: "Lê Anh Tuấn"
featured: true
cover: "/blog/covers/canh-bao-kpi.png"
coverAlt: "Đường KPI tụt dần chạm vạch ngưỡng đỏ và bật ra một chuông cảnh báo"
---

*Muốn biết một con số sống còn vừa tụt khỏi ngưỡng ngay trong ngày, thay vì tới buổi họp đầu tuần? [Dùng thử miễn phí với Google Sheets - đặt cảnh báo KPI đầu tiên trong dưới 15 phút.](/docs/vi/free-trial/)*

Chiều thứ Sáu, doanh thu ngày của một chuỗi 4 cửa hàng tụt xuống còn 150 triệu - bình thường ngày thường nó quanh 260-280 triệu. Một cú rớt 40%. Nhưng chủ chuỗi không biết. Cuối tuần ai cũng bận, không ai mở app. Đến sáng thứ Hai họp giao ban, mở báo cáo tuần ra, mọi người mới ồ lên: "Ủa sao thứ Sáu với cuối tuần tụt thế?"

Lúc đó đã muộn ba ngày. Ba ngày để truy ra nguyên nhân - hóa ra một nhân viên set sai giá khuyến mãi trên sàn, khách bỏ giỏ hàng loạt. Một lỗi sửa trong năm phút, nhưng vì phát hiện trễ một tuần nên **mất nguyên một tuần doanh thu** mới sửa được.

Phản xạ đầu tiên là tự trách: "Tại cuối tuần không ai trực." Nhưng đó không phải lỗi của ai cả - **đó là lỗi thiết kế.** Bạn đang trông chờ một báo cáo định kỳ làm công việc của một cái chuông báo động. Hai thứ đó khác nhau về bản chất.

## Báo cáo định kỳ trả lời "tình hình thế nào". Cảnh báo trả lời "có cháy không"

[Một bản báo cáo tự gửi mỗi sáng qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/) là thứ tuyệt vời - nó kéo bạn ngồi xuống nhìn số mỗi ngày. Nhưng nó vẫn chạy theo **lịch**: 7h sáng, dù hôm qua bình thường hay sập sàn, nó vẫn gửi đúng một tin. Vấn đề là sự cố không xảy ra theo lịch. Nó xảy ra lúc 2h chiều thứ Sáu, và bạn không thể đợi tới 7h sáng thứ Hai.

Đây là chỗ cần một loại tín hiệu khác: **cảnh báo theo ngưỡng (threshold alert - nhắn ngay khi một chỉ số vượt qua lằn ranh bạn đặt trước).** Báo cáo định kỳ là tiếng tích tắc đều đặn của đồng hồ - quen tới mức không để ý. Cảnh báo theo ngưỡng là tiếng chuông báo cháy - im lặng phần lớn thời gian, nên mỗi lần kêu là bạn phải bật dậy.

Mục tiêu của cả bài này gói trong một câu: làm sao để một KPI (Key Performance Indicator - chỉ số hiệu suất then chốt, một metric được gắn mục tiêu) tụt khỏi vùng an toàn thì điện thoại bạn reo **trong ngày**, không phải trong tuần. Ba bước.

## Bước 1 - Chọn 3-5 KPI sống còn, đừng cảnh báo mọi thứ

Sai lầm đầu tiên ai cũng mắc: tham. Đặt cảnh báo cho mọi con số đo được - doanh thu, đơn, tồn từng mã, lượt xem, tỷ lệ hoàn, CTR ads... Kết quả là điện thoại reo cả ngày, và chỉ sau ba hôm bạn tắt hết thông báo. Lúc đó cái cảnh báo *thật sự quan trọng* cũng chết theo.

Quy tắc của tôi: chọn **3-5 KPI mà nếu nó hỏng, ngày làm việc của bạn phải dừng lại để xử lý.** Không hơn. Cách lọc nhanh: với mỗi chỉ số, tự hỏi *"nếu cái này vượt ngưỡng lúc 3h chiều, tôi có bỏ việc đang làm để lao vào không?"* Nếu câu trả lời là "để mai tính" thì nó không xứng đáng có cảnh báo - nó thuộc về báo cáo định kỳ.

Vài KPI thường xứng đáng với một shop Việt: doanh thu ngày (hoặc theo kênh), tỷ lệ hoàn/hủy đơn, tồn kho của vài mã chủ lực, tốc độ phản hồi tin nhắn khách giờ cao điểm. Lưu ý nên ưu tiên **chỉ số báo trước (leading indicator - dự báo kết quả tương lai và lái được, như lượt thêm giỏ tụt)** hơn **chỉ số báo sau (lagging indicator - phản ánh kết quả đã rồi, như doanh thu cả quý)**, vì báo trước cho bạn thời gian phản ứng còn báo sau thì chuyện đã xong.

## Bước 2 - Đặt ngưỡng thông minh: tuyệt đối, so cùng kỳ, hay lệch khỏi thường lệ

Chọn xong KPI, câu hỏi khó là: ngưỡng đặt ở đâu? Đặt sai một ly là dính **alert fatigue (mệt vì cảnh báo - quá nhiều cảnh báo khiến người ta lờ đi, kể cả cái thật).** Có ba kiểu ngưỡng, dùng đúng kiểu cho đúng chỉ số:

- **Ngưỡng tuyệt đối** - một con số cứng: "tồn mã Serum B5 xuống dưới 20 thì nhắn". Hợp với chỉ số có lằn ranh vật lý rõ ràng (tồn kho, số dư). Đơn giản, nhưng vô dụng với chỉ số dao động theo ngày như doanh thu.
- **So cùng kỳ** - đối chiếu với chính nó trong quá khứ: "doanh thu hôm nay đến 15h vẫn thấp hơn 60% so với cùng giờ thứ Sáu tuần trước". Kiểu này tự khắc tính tới [tính mùa vụ](/blog/theo-doi-ton-kho-realtime/) - cuối tuần khác ngày thường, Tết khác ngày thường - nên ít báo nhầm hơn ngưỡng cứng.
- **Lệch khỏi thường lệ** - dựa trên dao động bình thường của chính chỉ số đó: "nhắn khi doanh thu lệch quá xa mức trung bình mọi khi". Đây là họ hàng gần của **anomaly detection (phát hiện bất thường - tự động nhận ra điểm số liệu lệch hẳn so với thường lệ)**, hợp khi bạn không biết trước "bao nhiêu là bất thường".

> Quy tắc vàng: cảnh báo chỉ giữ được sức mạnh khi nó hiếm. Đặt mỗi ngưỡng ở mức "nếu cái này xảy ra thì tôi THẬT SỰ phải xử lý ngay hôm nay" - không thấp hơn. Một cái chuông báo cháy reo mỗi giờ thì chỉ sau hai ngày bạn sẽ tháo pin nó ra.

Mẹo thực dụng: bắt đầu lỏng rồi siết dần. Đặt ngưỡng hơi rộng trong tuần đầu, đếm xem nó reo bao nhiêu lần và bao nhiêu lần là *đáng*. Nếu cứ ba lần reo mà hai lần bạn lướt qua, ngưỡng đang quá nhạy - kéo nó ra.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["T2","T3","T4","T5","T6","T7","CN"],"yUnit":" tr","series":[{"name":"Doanh thu ngày","values":[280,310,265,240,150,180,160],"color":"#6366f1"}],"markLine":[{"y":200,"label":"Ngưỡng cảnh báo","color":"#ef4444"}]}'></div>
<div class="viz-caption">Doanh thu ngày (số minh họa): khi rớt xuống dưới "ngưỡng cảnh báo" (đỏ) ở T6, hệ thống nhắn ngay - bạn biết trong ngày thay vì đợi tới buổi họp đầu tuần.</div>
</div>

## Bước 3 - Đẩy tới đúng kênh, đúng người

Một cảnh báo hoàn hảo gửi nhầm người thì cũng vô dụng. Doanh thu kênh tụt mà chỉ kế toán biết - kế toán không phải người tăng ngân sách ads hay gọi cho sàn được. **Cảnh báo phải tới tay người có thể hành động trong vòng vài phút.**

Nguyên tắc ghép kênh với đội:

- **Zalo** khi người cần biết là nhân viên cửa hàng, quản lý kho, cộng tác viên - những người gần như chắc chắn đã có Zalo và dùng mỗi ngày. Gửi vào nhóm Zalo cửa hàng để cả ca cùng thấy.
- **Telegram** khi người nhận là chủ, quản lý cấp cao hay đội vận hành - Telegram ít nhiễu thông báo cá nhân, dễ tách riêng một kênh chỉ để nhận cảnh báo.
- **Slack** khi đội bạn đã làm việc trên Slack - cảnh báo rơi vào đúng channel đội đang theo dõi.

Gợi ý: đừng gửi tin riêng cho từng người. Gửi vào **nhóm/kênh** để tạo trách nhiệm chung - ai đó sẽ phản ứng, thay vì mỗi người tưởng người khác lo. Và chia cảnh báo theo vai: ngưỡng tồn kho đẩy cho thủ kho qua nhóm Zalo, ngưỡng doanh thu đẩy cho chủ qua Telegram. Mỗi người chỉ nhận đúng cái mình xử lý được - đó cũng là một cách chống alert fatigue.

## Thiết lập trong Semantix

Trong Semantix, cảnh báo KPI không phải một module rời bạn phải học lại từ đầu - nó nối dài tự nhiên từ chính những câu hỏi bạn vẫn hỏi. Đây không phải con bot canh một con số khô khan tách rời; nó canh đúng cái "doanh thu" mà bạn đã định nghĩa cho mọi báo cáo khác, nên cảnh báo và dashboard không bao giờ lệch nhau một đồng. Quy trình ba bước:

1. **Định nghĩa KPI một lần** bằng tiếng Việt - "doanh thu ngày theo từng kênh", "tỷ lệ hoàn đơn hôm nay". AI hiểu, trả số, y như khi bạn hỏi một [metric hay KPI bất kỳ](/blog/metric-dimension-kpi/).
2. **Đặt ngưỡng:** chọn kiểu (tuyệt đối / so cùng kỳ / lệch khỏi thường lệ) và mức - "nhắn khi doanh thu ngày dưới 200 triệu" hay "khi thấp hơn 60% cùng kỳ tuần trước".
3. **Chọn nơi nhận:** dán kênh Telegram, nhóm Zalo hoặc Slack. Khi KPI chạm ngưỡng, cảnh báo tự đẩy tới. Xong.

## Tóm lại

| Báo cáo định kỳ | Cảnh báo theo ngưỡng |
|---|---|
| Gửi theo lịch (mỗi sáng 7h) | Gửi khi chạm ngưỡng, bất kể giờ nào |
| Trả lời "tình hình chung thế nào" | Trả lời "có gì cần xử lý NGAY không" |
| Gửi mỗi ngày dù có chuyện hay không | Im lặng phần lớn thời gian - hiếm nên đáng chú ý |
| Phát hiện sự cố trễ vài ngày | Biết trong ngày, sửa kịp trong ngày |
| Phù hợp: nhìn xu hướng, ra quyết định | Phù hợp: chặn thiệt hại trước khi nó lớn |

Checklist của bạn: ✅ chọn 3-5 KPI mà nếu hỏng thì phải dừng việc → ✅ đặt ngưỡng đúng kiểu (tuyệt đối / so cùng kỳ / lệch khỏi thường lệ), đủ hiếm để không nhờn → ✅ đẩy vào nhóm Telegram/Zalo/Slack đúng người hành động được. Báo cáo định kỳ để bạn ngồi xuống mỗi sáng nhìn bức tranh lớn. Nhưng việc canh chừng những cú rớt bất thường - hãy để cái chuông tự reo, kể cả lúc bạn đang nghỉ cuối tuần.

---

*Đừng để cú rớt 40% tiếp theo phát hiện trễ một tuần. [Dùng thử miễn phí với Google Sheets và đặt cảnh báo KPI đầu tiên hôm nay.](/docs/vi/free-trial/) Hoặc xem trước cách [báo cáo tự tìm đến bạn mỗi sáng qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/).*
