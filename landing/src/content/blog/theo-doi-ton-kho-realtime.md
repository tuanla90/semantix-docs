---
title: "Theo dõi tồn kho realtime: cái bạn cần không phải con số tồn kho - mà là lời nhắn trước khi nó về 0"
code: "hd-011"
description: "Best-seller hết hàng đúng lúc khách hỏi mua: mất đơn, mất luôn uy tín. Mở app soi tồn mỗi ngày không cứu được bạn - một cảnh báo tự động đúng ngưỡng thì có. Đây là cách làm."
pubDate: 2025-11-06
category: "Hướng Dẫn Thực Chiến"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/theo-doi-ton-kho-realtime.svg"
coverAlt: "Đường tồn kho giảm dần chạm vạch ngưỡng đỏ, kèm một chuông cảnh báo bật sáng"
---

*Muốn biết một mã hàng sắp hết TRƯỚC khi khách hỏi mua mà không có để bán? [Dùng thử miễn phí với Google Sheets - bật cảnh báo tồn kho đầu tiên trong dưới 15 phút.](/docs/vi/free-trial/)*

Một anh chủ shop thời trang kể với tôi buổi sáng tệ nhất tháng đó. Một khách quen nhắn: "Cho em hai cái áo mã ML-07 size M nhé." Anh mở kho ra check - hết sạch từ hôm kia. Khách đợi ba ngày không có, quay sang shop khác, mua luôn cả váy và túi ở đó. Một mã áo hết hàng đã kéo theo nguyên một đơn lớn đi mất - và một khách quen có thể không bao giờ quay lại.

Phản xạ đầu tiên của anh là tự trách: "Tại mình không để ý kho." Nhưng đó không phải lỗi để ý. **Đó là lỗi thiết kế.** Bạn không thể ngồi soi tồn kho từng mã mỗi ngày - một shop vài trăm SKU (Stock Keeping Unit - đơn vị lưu kho, mã định danh từng loại hàng) thì con người không đủ mắt để canh. Và cái nghịch lý ít người chịu nhìn thẳng là: **thứ bạn cần không phải con số tồn kho hiện tại - mà là một lời nhắn, gửi đúng lúc, trước khi con số đó về 0.**

Mà tồn kho thì có hai phía đều giết bạn. Một là **stockout (hết hàng)** - cháy mã best-seller, mất đơn, mất khách. Hai là **tồn chết** - ôm một núi mã ế, vốn nằm im trong kho, không bán được mà cũng không nhập mới được vì tiền kẹt. Theo dõi tồn kho đúng cách là né được *cả hai* phía cùng lúc: **thấy SỚM, cảnh báo TỰ ĐỘNG, đặt ĐÚNG ngưỡng.**

## Bước 1: Tính ngưỡng đặt hàng lại - đừng đợi tồn về 0 mới đặt

Sai lầm kinh điển là đợi tồn kho gần cạn mới cuống cuồng đặt. Nhưng hàng không về ngay - từ lúc bạn đặt nhà cung cấp tới lúc hàng nằm trên kệ có một độ trễ. Nếu bạn đặt khi tồn đã chạm đáy, bạn sẽ cháy hàng nguyên khoảng thời gian chờ đó.

Vậy nên cái mốc cần canh không phải số 0, mà là **reorder point (ngưỡng đặt hàng lại - mức tồn mà khi chạm tới là phải đặt thêm ngay)**. Công thức gọn:

> **Ngưỡng đặt hàng lại = tốc độ bán mỗi ngày × thời gian giao hàng + tồn an toàn**

Bóc ra ba thành phần:

- **Tốc độ bán mỗi ngày:** mã này bán trung bình bao nhiêu cái/ngày. Ví dụ mã áo ML-07 bán đều 12 cái/ngày.
- **Lead time (thời gian giao hàng - từ lúc đặt nhà cung cấp tới lúc hàng về kho):** ví dụ xưởng giao trong 5 ngày.
- **Safety stock (tồn an toàn - lượng dự trữ thêm phòng khi bán đột biến hoặc giao trễ):** đệm cho ngày livestream cháy hàng hoặc xưởng kẹt Tết. Ví dụ chừa thêm 30 cái.

Ráp lại: `12 × 5 + 30 = 90`. Khi tồn ML-07 chạm **90 cái** là lúc đặt thêm - vừa kịp để hàng mới về trước khi kệ trống. Đặt sớm hơn thì ôm tồn dư; đặt trễ hơn thì cháy hàng. Cái ngưỡng 90 này chính là "lằn ranh" mà mọi cảnh báo sẽ bám vào.

Lưu ý kiểu Việt Nam: tốc độ bán **không cố định**. Mã quà Tết tháng 1 bán gấp năm lần tháng 7; áo phao bán mạnh mùa lạnh, nằm im mùa nóng. Nên ngưỡng đặt hàng phải đi theo mùa, đừng đặt một con số chết cho cả năm. (Đọc thêm về [đọc mùa vụ để không vừa cháy hàng vừa tồn kho](/blog/mua-vu-tet-seasonality/).)

## Bước 2: Để hệ thống tự nhắn khi chạm ngưỡng - đừng ngồi soi

Có ngưỡng rồi, câu hỏi tiếp theo: ai canh nó? Nếu câu trả lời là "tôi tự mở app xem mỗi sáng", bạn đã quay lại đúng cái bẫy ban đầu - vì sẽ có ngày bận, ngày đi công tác, ngày quên. Mà sự cố thì không bao giờ chọn ngày bạn rảnh.

Cách đúng: **để hệ thống canh thay bạn, và chỉ lên tiếng khi tồn chạm ngưỡng.** Một tin nhắn Zalo hoặc Telegram tự bật lên: *"⚠️ ML-07 còn 88 cái - đã dưới ngưỡng đặt thêm (90). Cần đặt xưởng hôm nay."* Bạn không phải nhớ gì cả; cái cần nhớ đã tự tìm đến bạn.

Đây chính là khác biệt giữa **báo cáo kéo** (bạn chủ động đi soi) và **báo cáo đẩy** (thông tin tự đến) - tôi đã mổ xẻ kỹ trong [báo cáo tự động qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/). Với tồn kho, báo cáo đẩy còn quan trọng hơn, vì cháy hàng là loại sự cố mà mỗi giờ chậm là mỗi đơn mất.

> Quy tắc vàng: việc của bạn là **đặt đúng ngưỡng một lần**, việc của hệ thống là **canh nó 24/7**. Con người đặt lằn ranh; máy đứng gác lằn ranh. Đừng đảo ngược hai vai đó - bạn sẽ luôn thua cái máy ở khoản kiên nhẫn ngồi soi.

Một mẹo để cảnh báo không thành phiền: đặt ngưỡng ở mức "nếu cái này xảy ra thì tôi thật sự phải xử lý hôm nay", đừng nhạy quá. Nếu mã nào nhích xuống một chút cũng nhắn, chỉ sau vài ngày bạn sẽ tắt thông báo - và thế là lần cháy hàng thật bạn cũng bỏ lỡ. **Cảnh báo chỉ giữ được sức mạnh khi nó hiếm.**

## Bước 3: Né cả hai phía - vừa hết hàng vừa tồn chết

Hình dung tồn kho của một mã như mực nước trong bể đang rút. Việc của bạn là biết khi nào mực nước chạm vạch đỏ - không phải để hốt hoảng, mà để mở van nhập hàng đúng lúc:

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["N1","N5","N10","N15","N20","N25","N30"],"yUnit":"","series":[{"name":"Tồn kho (mã A)","values":[420,360,300,250,180,120,60],"color":"#6366f1"}],"markLine":[{"y":150,"label":"Ngưỡng đặt thêm","color":"#ef4444"}]}'></div>
<div class="viz-caption">Tồn kho giảm dần theo ngày (số minh họa): khi đường tồn chạm "ngưỡng đặt thêm" (đỏ) là lúc hệ thống tự nhắn cảnh báo - đặt hàng vừa kịp, không cháy hàng cũng không ôm tồn.</div>
</div>

Nhìn biểu đồ, mã A chạm ngưỡng 150 khoảng ngày 18–19. Đặt hàng đúng lúc đó là chuẩn: hàng mới về trước khi đường tồn chạm đáy. Đó là phía thứ nhất - **né stockout**.

Nhưng còn phía thứ hai, âm thầm hơn và tốn kém không kém: **tồn chết**. Có những mã đường tồn gần như nằm ngang - bán nhỏ giọt, tháng này qua tháng khác vẫn còn nguyên. Vốn của bạn đang ngủ trong những mã đó. Theo dõi tồn kho đúng nghĩa là vừa canh mã chạy nhanh (sợ cháy), vừa soi mã chạy chậm (sợ chết) - và đối xử với hai nhóm khác hẳn nhau.

Đây là lúc [ABC inventory (phân loại hàng tồn theo giá trị)](/blog/abc-inventory/) phát huy: nhóm A là số ít mã giữ phần lớn vốn - canh ngưỡng gắt, cảnh báo nhạy hơn; nhóm C là đám đông mã giá trị nhỏ - đừng để chúng âm thầm thành tồn chết, đặt ngưỡng xả hàng thay vì ngưỡng nhập thêm. Cùng một hệ thống cảnh báo, hai loại lằn ranh ngược chiều nhau.

## Theo dõi tồn kho trong Semantix

Trong Semantix, theo dõi tồn kho không phải một phần mềm quản kho riêng bạn phải học lại từ đầu - nó là phần nối dài tự nhiên của những câu hỏi bạn vẫn hỏi bằng tiếng Việt. Đây không phải con bot bắn số khô khan, mà là cảnh báo chạy trên cùng một định nghĩa nghiệp vụ với mọi câu hỏi khác - nên "tồn kho" trong tin nhắn cảnh báo đúng bằng "tồn kho" bạn thấy khi hỏi, không lệch một mã. Quy trình ba bước:

1. **Nối dữ liệu bán hàng và kho về cùng chỗ.** Đơn từ Shopee, TikTok Shop, nhập/xuất từ KiotViet - gộp ở dạng **bảng ảo (virtual table)**, làm sạch ngay lúc truy vấn, không phải copy dữ liệu lòng vòng. Tồn kho luôn là số mới nhất, không phải bản chụp hôm qua. (Xem [một chuỗi F&B 8 chi nhánh hợp nhất dữ liệu thế nào](/blog/chuoi-fnb-8-chi-nhanh/) hay nền tảng [BI cho SME](/blog/bi-cho-sme/).)
2. **Định nghĩa "tốc độ bán" và "ngưỡng đặt hàng lại" bằng tiếng Việt.** Hỏi thẳng: "mã nào tồn dưới ngưỡng đặt thêm" hay "tốc độ bán 7 ngày của ML-07 là bao nhiêu". AI hiểu, trả số - định nghĩa một lần, dùng mãi.
3. **Bật cảnh báo Zalo/Telegram tự động khi chạm ngưỡng.** Chọn nơi nhận, đặt lằn ranh, xong. Hệ thống đứng gác; bạn chỉ nhận tin khi thật sự cần đặt hàng.

## Tóm lại

| Soi tồn kho kiểu cũ | Theo dõi realtime + cảnh báo |
|---|---|
| Mở app xem khi nhớ ra | Tự nhắn ngay khi chạm ngưỡng |
| Đợi tồn về 0 mới cuống đặt | Đặt đúng ngưỡng = nhu cầu trong lead time + tồn an toàn |
| Chỉ sợ hết hàng | Canh cả hết hàng VÀ tồn chết |
| Số tồn là bản chụp hôm qua | Số tồn là realtime, không lệch một mã |

Checklist của bạn: ✅ tính ngưỡng đặt hàng lại cho từng mã chạy mạnh (tốc độ bán × lead time + tồn an toàn) → ✅ bật cảnh báo tự động Zalo/Telegram khi chạm ngưỡng → ✅ phân nhóm ABC để mã A canh gắt, mã C canh tồn chết → ✅ chỉnh ngưỡng theo mùa. Đừng để lần cháy hàng tiếp theo phát hiện đúng lúc khách đang hỏi mua. Thứ bạn cần không phải con số tồn kho - mà là lời nhắn trước khi nó về 0.

---

*Đừng để best-seller cháy hàng giữa lúc khách đang muốn mua. [Dùng thử miễn phí với Google Sheets và bật cảnh báo tồn kho đầu tiên hôm nay.](/docs/vi/free-trial/) Hoặc xem trước [cách đặt báo cáo & cảnh báo tự động qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/).*
