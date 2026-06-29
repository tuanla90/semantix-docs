---
title: "Chuyện nghề Data Analyst: 80% công việc không ai khoe trên LinkedIn"
code: "uc-007"
description: "Ai cũng tưởng nghề DA là vẽ insight đẹp, làm model ngầu. Thật ra 80% là dọn dữ liệu bẩn và đi xin quyền truy cập. Mình kể bạn nghe."
pubDate: 2026-01-04
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/chuyen-nghe-data-analyst.svg"
coverAlt: "Kỳ vọng nghề Data Analyst là biểu đồ đẹp, thực tế là đống dữ liệu bẩn và công việc lặp lại"
---

Hồi mới ra trường, mình tưởng làm Data Analyst (nhà phân tích dữ liệu) nghĩa là cả ngày ngồi vẽ những biểu đồ đẹp như trên LinkedIn. Mình mơ sẽ dựng model dự báo, tìm ra một insight (sự thật ngầm trong dữ liệu) làm cả phòng họp ồ lên, rồi sếp gật gù: "Số của Khoa nói thế thì làm theo Khoa."

Bốn năm sau, mình ngồi đây kể bạn nghe một sự thật ít ai chịu nói: **80% thời gian làm DA của mình không có gì để khoe cả.** Nó là dọn dữ liệu bẩn, là đi xin quyền truy cập, là ngồi cãi nhau với ba phòng ban xem "doanh thu" rốt cuộc nghĩa là gì. Phần "vẽ insight ngầu" mà ai cũng tưởng? Chiếm đâu đó 20%, vào những ngày đẹp trời.

Bài này không phải để than. Mình vẫn yêu nghề. Nhưng nếu bạn đang định vào nghề, hoặc đang quản lý một bạn DA và thắc mắc "sao việc đơn giản mà làm lâu thế", thì đây là phần tảng băng chìm - phần không ai post ảnh.

## Kỳ vọng: mình sẽ là người tìm ra sự thật

Trong đầu mình ngày đó, một ngày làm DA trông như thế này: pha cà phê, mở dữ liệu *sạch tinh*, chạy vài phép phân tích, phát hiện "khách miền Trung mua nhiều gấp đôi vào mùa mưa", rồi viết một báo cáo súc tích khiến ai đọc cũng phải suy nghĩ.

Kỳ vọng đó không sai - nó chỉ thiếu mất 90% các bước ở giữa. Giống như tưởng nghề đầu bếp là bày món lên đĩa cho đẹp, mà quên rằng trước đó phải đi chợ, nhặt rau, rửa cá, và cãi nhau với người bán xem con cá này có thật sự tươi không.

## Thực tế: mình là người đi dọn rác

Hãy để mình tả một ngày thật. 9 giờ sáng, mình nhận yêu cầu: *"Khoa cho chị xem doanh thu theo kênh quý vừa rồi nhé."* Nghe đơn giản. Đây là những gì thực sự xảy ra.

Mình mở dữ liệu. Sheet bán hàng gọi kênh là "Shopee", sheet kế toán ghi "shopee", file kho viết tắt "SP". Ngày tháng nơi `30/06`, nơi `2026-06-30`. Có 47 đơn trùng vì hôm đó ai đó export (xuất dữ liệu) hai lần. Mình ngồi gộp tên, xóa trùng, sửa định dạng - **ba tiếng trôi qua, chưa phân tích được một dòng nào.** Đây chính là câu trả lời cho câu hỏi "phân tích sao mà lâu vậy": phần lớn thời gian không phải phân tích, mà là *dọn rác trước khi phân tích*. Mình đã viết hẳn một bài về [vì sao 80% thời gian phân tích thật ra là dọn dữ liệu bẩn](/blog/du-lieu-ban/).

Đây là bức tranh thật về một ngày của mình, vẽ ra cho bạn dễ hình dung:

<div class="viz">
<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- title -->
  <text x="8" y="22" fill="#475569" font-size="14" font-weight="700">Một ngày của Data Analyst đi về đâu?</text>
  <!-- bar background -->
  <rect x="8" y="48" width="664" height="56" rx="8" fill="#1e293b"/>
  <!-- segment: dọn dữ liệu 45% -->
  <rect x="8" y="48" width="298" height="56" rx="8" fill="#475569"/>
  <text x="157" y="82" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">Dọn dữ liệu 45%</text>
  <!-- segment: xin quyền + đối chiếu 20% -->
  <rect x="306" y="48" width="133" height="56" fill="#64748B"/>
  <text x="372" y="82" fill="#0B1120" font-size="13" font-weight="700" text-anchor="middle">Xin quyền 20%</text>
  <!-- segment: làm lại báo cáo 15% -->
  <rect x="439" y="48" width="100" height="56" fill="#94A3B8"/>
  <text x="489" y="82" fill="#0B1120" font-size="12" font-weight="700" text-anchor="middle">Lặp lại 15%</text>
  <!-- segment: phân tích thật 20% -->
  <rect x="539" y="48" width="133" height="56" rx="8" fill="#22D3EE"/>
  <text x="605" y="82" fill="#06351f" font-size="13" font-weight="800" text-anchor="middle">Phân tích 20%</text>
  <!-- caption line -->
  <text x="8" y="150" fill="#64748B" font-size="13">Phần màu xanh - việc mình được học để làm - chỉ còn lại một mẩu.</text>
  <text x="8" y="174" fill="#64748B" font-size="13">Phần còn lại là thứ không ai khoe: dọn dẹp, xin quyền, làm đi làm lại.</text>
</svg>
<div class="viz-caption">Tỷ lệ minh hoạ từ trải nghiệm cá nhân, không phải số đo chính thức - nhưng bất kỳ DA nào cũng sẽ gật đầu.</div>
</div>

## Đi xin quyền: nghề DA mà như đi xin chữ ký

Có một việc không sách giáo khoa nào nhắc: **đi xin quyền truy cập dữ liệu.** Muốn xem đơn hàng? Nhắn anh IT, anh bận, ba ngày sau mới cấp. Muốn xem dữ liệu marketing? Nó nằm trong tài khoản chạy ads của một bạn đang nghỉ phép. Muốn ghép hai nguồn? Chúng nằm ở hai hệ thống không nói chuyện với nhau.

Có tuần mình mất nhiều thời gian *chờ được cấp quyền* hơn là làm việc thật. Đây là thực tế của rất nhiều DA ở công ty vừa và nhỏ: dữ liệu nằm rải rác, mỗi mảnh một người giữ chìa khóa.

## "Doanh thu của em khác số của sếp" - cuộc chiến định nghĩa

Đây là phần mình ghét nhất, và cũng là phần khiến mình trưởng thành nhất.

Mình nộp báo cáo: doanh thu quý là **4,05 tỷ**. Sếp nhìn, cau mày: *"Sao chị thấy Sales báo 4,2 tỷ?"* Mình về kiểm tra. Hóa ra Sales tính cả đơn chưa giao. Kế toán thì trừ đơn hoàn nên ra 3,8 tỷ. Mình tính theo đơn đã giao thành công. **Ba con số, ba định nghĩa, và ai cũng đúng theo cách của mình.**

Cái khó của DA không phải là không tính được. Cái khó là cả tổ chức chưa từng thống nhất *một từ "doanh thu" nghĩa là gì*. Và người bị kẹt ở giữa, phải đi giải thích vì sao số mình khác số người khác, chính là mình. Đây đúng là lý do mình tin một [BI Analyst giỏi là người định nghĩa được metric cho cả công ty](/blog/bi-analyst-dinh-nghia-metric/) - chứ không phải người chạy query nhanh nhất.

Vấn đề này không sửa được bằng cách làm việc chăm hơn. Nó chỉ biến mất khi tổ chức có một [Semantic Layer - tầng định nghĩa nghiệp vụ dùng chung](/blog/semantic-layer/), nơi "doanh thu" được định nghĩa *một lần*, chuẩn xác, để ai hỏi cũng ra cùng một số.

## "Người bưng số" - cái nhãn nghề ít ai muốn nhận

Có một nỗi buồn ngầm trong nghề: nhiều nơi xem DA là *"người bưng số"*. 5 giờ chiều, tin nhắn nhảy lên: *"Khoa ơi gấp, sếp cần số doanh thu tháng này trong 30 phút để họp."* Không ai hỏi mình nghĩ gì về con số đó. Họ chỉ cần con số, càng nhanh càng tốt.

Mình làm đi làm lại cùng một báo cáo doanh thu - tuần nào cũng vậy, tháng nào cũng vậy. Một việc máy móc, không cần đến bốn năm mình học về phân tích. Và khi mình muốn đào sâu kiểu *"vì sao tháng này khách mới giảm"*, thì hết giờ rồi, để mai. Mà mai lại có báo cáo gấp khác.

Kiến thức nghiệp vụ - vì sao tháng 7 luôn thấp, vì sao kênh này lời hơn kênh kia - thì nằm trong đầu vài người cũ, không ai viết ra. Mình vừa làm DA, vừa làm thám tử đi hỏi từng người để hiểu dữ liệu thật sự nói gì.

## Vậy nghề này có đáng không? Có - và nó đang đổi

> 🎬 **Mình có làm hẳn một video về đúng nỗi lo này:** *"AI viết SQL giỏi hơn mình - nghề Data Analyst còn cửa không?"* Mình thử cho AI viết query, thấy nó nhanh thật - rồi thấy luôn chỗ nó gục. Tìm **"Tuấn LA Lab"** trên YouTube nếu bạn muốn nghe mình kể bằng giọng.

Đọc đến đây bạn có thể nghĩ mình đang khuyên đừng làm DA. Ngược lại hoàn toàn.

Mình kể những phần xấu xí này vì một lý do: **chúng đang biến mất.** Phần "bưng số" lặp đi lặp lại, phần dọn dữ liệu bẩn, phần giải thích vì sao số mình khác số sếp - đó chính là phần mà AI BI (Business Intelligence dùng AI - biến dữ liệu thành quyết định) đang gánh thay con người.

Nói thẳng để khỏi nghe như quảng cáo: một công cụ như Semantix **không** thay mình suy nghĩ. Nó không tự biết câu hỏi nào đáng hỏi. Cái nó làm là xóa phần việc lặp lại: sếp tự hỏi bằng tiếng Việt *"doanh thu tháng này theo kênh"* và nhận số ngay, đứng trên một định nghĩa đã thống nhất sẵn - không cần nhắn mình lúc 5 giờ chiều. Còn mình? Mình được trả lại 80% thời gian để làm đúng phần mà mình học bốn năm để làm: *đặt câu hỏi đúng, đào cho ra vì sao, và biến số thành một quyết định.*

Nghề DA không chết. Nó đang được gột sạch phần bạc bẽo nhất, để còn lại phần đáng giá nhất. Nếu bạn đang lo AI cướp mất nghề, mình nói thật lòng: thứ AI không lấy được của bạn, là cái bạn hiểu về công việc của chính mình - và đó mới là phần đáng mài cho sắc.

> Mental model mình luôn nhắc bản thân: một DA giỏi không phải người trả lời nhanh nhất, mà là người **hỏi đúng câu nhất.** Máy lo phần bưng số; con người lo phần ý nghĩa.

---

*Muốn thử cảm giác hỏi dữ liệu bằng tiếng Việt và nhận số ngay, không cần đợi ai dọn? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
