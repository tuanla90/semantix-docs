---
title: "Dashboard doanh thu cho chuỗi F&B nhiều chi nhánh: vì sao quán doanh thu cao nhất — lại có thể là quán lỗ nặng nhất"
code: "hd-010"
description: "Mỗi sáng nhắn 8 quản lý xin số, tới trưa ghép xong thì số đã cũ. Đây là 4 bước dựng một dashboard chuỗi F&B trả lời được câu hỏi quan trọng nhất: quán nào lãi thật."
pubDate: 2025-09-14
category: "Hướng Dẫn Thực Chiến"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/dashboard-doanh-thu-fnb.svg"
coverAlt: "Dashboard doanh thu chuỗi F&B với cột doanh thu từng chi nhánh và thẻ KPI"
---

7 giờ sáng, một chủ chuỗi 8 quán cà phê mở Zalo và bắt đầu việc quen thuộc nhất trong ngày: nhắn lần lượt 8 quản lý xin số doanh thu hôm qua. Quán đầu trả lời ngay, quán cuối tới gần trưa mới gửi. Anh dán tám con số vào một sheet, dò cột, sửa công thức — và tới lúc nhìn được toàn cảnh thì đã quá bữa trưa. Tệ hơn: đó là bức tranh của *hôm qua*, còn hôm nay thì đang trôi qua mà anh chưa thấy gì.

Phản xạ đầu tiên của anh là "mình cần một template Excel gọn hơn". Nhưng đây là chỗ ngược đời: vấn đề chưa bao giờ là *thiếu số* — anh đang ngập trong số. Vấn đề là **mỗi sáng anh phải làm thủ công cái việc lẽ ra một dashboard (bảng số trực quan) phải tự làm.** Tin tốt: dựng một dashboard chuỗi F&B (Food & Beverage — ngành ăn uống) đúng nghĩa không phải dự án vài tuần. Nó là 4 bước, và bài này đi qua từng bước.

> Bài này là *hướng dẫn dựng dashboard*. Nếu bạn muốn đọc trước **câu chuyện** vì sao tám file Excel mỗi sáng là tám phiên bản sự thật khác nhau, xem [Chuỗi F&B 8 chi nhánh](/blog/chuoi-fnb-8-chi-nhanh/) — ở đây chúng ta bắt tay vào làm.

## Một dashboard chuỗi F&B cần trả lời đúng 4 câu

Trước khi kéo bất kỳ biểu đồ nào, hãy chốt việc dashboard phải làm. Một dashboard chuỗi F&B đáng giá chỉ cần trả lời gọn 4 câu — và phần lớn dashboard "đẹp" ngoài kia trả lời được tối đa một:

1. **Quán nào lãi/lỗ thật?** Không phải doanh thu — mà là phần còn lại sau chi phí.
2. **Khung giờ nào đông, khung giờ nào nuôi không nổi nhân viên?** Ca sáng, trưa, tối đóng góp khác nhau ra sao.
3. **Món nào kéo khách nhưng không ra lời?** Món "bán chạy" mà margin (biên lợi nhuận — phần lời còn lại trên mỗi đồng doanh thu sau chi phí) mỏng hoặc âm.
4. **So với cùng kỳ thì sao?** Tuần này so tuần trước, tháng này so tháng trước — quán nào đang lên, quán nào đang tụt.

Giữ 4 câu này trong đầu. Mỗi bước dưới đây tồn tại chỉ để trả lời chúng.

## Bước 1: Gộp dữ liệu các chi nhánh về một mô hình

Đây là bước nền móng, và cũng là chỗ hầu hết người dựng dashboard làm sai. Phản xạ thông thường là "chép số tám quán về một file rồi vẽ lên đó". Nhưng chép tay thì mỗi sáng lại làm lại, và mỗi lần chép là một lần có thể sai cột.

Cách đúng là **không chép — mà nối**. Mỗi quán có một nguồn riêng: quán này dùng KiotViet, quán kia dùng phần mềm POS (Point of Sale — máy bán hàng tại quầy) khác, quán nọ vẫn gõ tay vào Google Sheets. Việc bạn cần là gộp (union) tám nguồn đó về **một mô hình dữ liệu chung** — một bảng "ảo" trông như tám file đã được xếp chồng lên nhau, cùng cột, cùng định dạng — *ngay lúc bạn hỏi*, không phải copy về kho trước.

Hai điều kiện để bước này chạy được:

- **Cùng cấu trúc cột.** Mọi nguồn phải có (hoặc ánh xạ về) cùng các trường: `ngày`, `chi nhánh`, `món`, `khung giờ`, `số lượng`, `doanh thu`, `giá vốn`. Cột `chi nhánh` là cột bạn sẽ thiếu nếu chép tay — phải gắn vào để biết mỗi dòng thuộc quán nào.
- **Cùng một định nghĩa "doanh thu".** Quán A tính cả phí ship, quán B không; quán C ghi theo đơn đặt, quán D theo đơn đã thanh toán. Nếu không thống nhất, mọi con số tổng sau này đều là cộng nhầm. (Đây cũng chính là vấn đề gốc khi [hợp nhất nhiều nguồn về một chỗ](/blog/hop-nhat-da-kenh/) — nguyên lý y hệt, chỉ khác là "nguồn" ở đây là các chi nhánh.)

Làm xong bước này, bạn có một mô hình duy nhất để hỏi — thay vì tám file để ghép.

## Bước 2: Chọn KPI cốt lõi và cách bày chúng

Có mô hình rồi, đừng vội nhồi 20 biểu đồ. Một dashboard tốt bày **ít KPI (Key Performance Indicator — chỉ số hiệu suất then chốt) nhưng đúng**, theo thứ tự mắt người đọc: tổng quan trước, chi tiết sau.

Hàng trên cùng là **các thẻ số lớn** (KPI card) — thứ bạn liếc một cái là biết tình hình:

- **Doanh thu hôm nay** (và so với hôm qua bằng một chip `+8%` / `−5%`).
- **Lợi nhuận gộp ước tính** = doanh thu − giá vốn. Đây là con số quan trọng hơn doanh thu, nên đặt ngay cạnh nó.
- **Số đơn / AOV** (Average Order Value — giá trị đơn trung bình).

Đừng để dashboard chỉ có doanh thu. Doanh thu một mình là con số dễ gây ảo tưởng nhất: nó lên thì ai cũng vui, mà không nói gì về việc bạn có đang lời không. Luôn đặt **lợi nhuận gộp ngay cạnh doanh thu** — để mắt không bao giờ nhìn một mà quên cái kia. (Phân biệt metric, dimension và KPI cho rõ, xem [Metric – Dimension – KPI: vỡ lòng từ vựng dữ liệu](/blog/metric-dimension-kpi/).)

> Quy tắc vàng: doanh thu trả lời "bán được bao nhiêu", lợi nhuận trả lời "giữ lại được bao nhiêu". Một dashboard chỉ khoe doanh thu là cái bảng đồng hồ tốc độ không có đồng hồ xăng — bạn biết mình đang chạy nhanh, nhưng không biết sắp hết nhiên liệu.

## Bước 3: So sánh chi nhánh, rồi khoan xuống món và khung giờ

Đây là phần làm cho một dashboard *chuỗi* khác với dashboard một quán: khả năng **xếp tám quán cạnh nhau và khoan sâu vào từng quán**.

Biểu đồ trung tâm nên là một cột so doanh thu các chi nhánh — xếp hạng để thấy ngay quán nào dẫn đầu, quán nào cần cứu:

<div class="viz">
<div class="viz-chart" data-chart="bar" data-chart-data='{"categories":["Bến Thành","Q3","Tân Bình","Bình Thạnh","Thủ Đức","Q7","Gò Vấp","Q10"],"unit":" tỷ","series":[{"name":"Doanh thu/tháng","values":[2.4,2.1,1.9,1.8,1.6,1.5,1.3,1.1]}]}'></div>
<div class="viz-caption">Doanh thu theo chi nhánh (số minh họa): xếp hạng để thấy ngay quán nào dẫn đầu, quán nào cần cứu — nhưng nhớ doanh thu cao chưa chắc lãi cao, phải soi tiếp biên lợi nhuận từng quán.</div>
</div>

Nhưng dừng ở biểu đồ này là rơi đúng cái bẫy quen thuộc: **quán doanh thu cao nhất có thể lại là quán lỗ nặng nhất.** Quán Bến Thành dẫn đầu bảng trên có thể đang mở tới 11 giờ đêm, ca tối gần như vắng khách mà vẫn trả lương ba nhân viên và tiền điều hòa giờ vàng — doanh thu cao là thật, nhưng sau khi trừ chi phí ca thì lỗ đều đặn. Cái cột cao đang *che* khoản lỗ đó.

Cách duy nhất để không bị lừa là **khoan xuống** (drill-down — bấm vào một con số tổng để xem chi tiết từng lớp bên dưới). Từ cột "Bến Thành", bấm vào để xem:

- **Theo khung giờ:** ca nào ra lời, ca nào ngốn chi phí. Có khi ca tối đóng góp 8% doanh thu nhưng "ăn" 22% chi phí vận hành *(ví dụ minh họa)* — đủ để bạn quyết định đóng cửa sớm hơn một tiếng.
- **Theo món:** món nào kéo khách mà margin mỏng. Một món đá xay khuyến mãi có thể đứng đầu bảng số lượng nhưng **margin âm** — càng bán càng lỗ, "chạy" chỉ vì đang chương trình mua-1-tặng-1 mà không ai ghi rõ.

Bày drill-down này là điều biến dashboard từ "tấm hình để ngắm" thành "công cụ để quyết định". Doanh thu cao đưa bạn tới câu hỏi; biên lợi nhuận từng món, từng ca mới đưa bạn tới câu trả lời.

## Bước 4: Chia sẻ đúng người và cảnh báo tự động

Dashboard đẹp mà chỉ mình bạn xem thì vẫn là nút thắt cổ chai — sáng nào quản lý quán cũng phải hỏi bạn "quán em hôm qua thế nào". Hai việc cuối khép vòng lặp:

- **Phân quyền theo chi nhánh.** Quản lý quán Q7 chỉ thấy số quán Q7; bạn thấy toàn chuỗi. Không ai gửi file qua Zalo, không ai thấy số không phải của mình. (Cách chia báo cáo mà không lộ dữ liệu nhạy cảm, xem [Chia sẻ báo cáo cho nhân viên mà không lộ data nhạy cảm](/blog/chia-se-bao-cao-khong-lo-data/).)
- **Cảnh báo tự động.** Đừng bắt mình mở dashboard mỗi giờ để rình bất thường. Đặt ngưỡng: "quán nào doanh thu rớt quá 20% so cùng kỳ tuần trước thì bắn tin Zalo cho tôi". Dashboard tự canh, bạn chỉ nhận tin khi có chuyện đáng nhận.

Đến đây, buổi sáng của bạn không còn bắt đầu bằng tám tin nhắn xin số. Nó bắt đầu bằng một màn hình đã sẵn số của cả tám quán — hoặc bằng một tin Zalo báo đúng quán đang cần bạn để mắt.

## … trong Semantix

Semantix không phải "một template Excel xịn hơn", cũng không phải con chatbot cắm thẳng vào tám máy POS rồi đoán mò. Nó là nơi bốn bước trên gói lại thành một quy trình:

1. **Kết nối tám điểm bán** — KiotViet, Google Sheets, phần mềm POS khác nhau — rồi gộp + làm sạch bằng [bảng ảo](/blog/bang-ao-gop-du-lieu/) ngay lúc hỏi. Không copy về kho: số ở lại từng quán và luôn mới.
2. **Định nghĩa "doanh thu" và "lợi nhuận" đúng một lần** cho cả chuỗi, áp cho tám quán — để tám phiên bản sự thật gộp lại thành một.
3. **Hỏi bằng tiếng Việt** thay vì dựng biểu đồ thủ công: *"quán nào lỗ ca tối hôm qua, và món nào bán chạy mà âm margin?"* — số ra ngay kèm biểu đồ. Câu trả lời hữu ích thì **ghim vào dashboard**, lần sau mở ra là có sẵn.
4. **Cảnh báo Zalo** khi một quán vượt ngưỡng bạn đặt, và **phân quyền** để mỗi quản lý chỉ thấy quán mình.

Khác biệt cốt lõi không phải "ít thao tác hơn". Là bạn thôi *làm thủ công cái việc một hệ thống nên tự làm* — và bắt đầu hỏi những câu mà tám file Excel không bao giờ trả lời được.

## Tóm lại

| | Tám tin nhắn mỗi sáng | Dashboard chuỗi F&B |
|---|---|---|
| **Gộp số** | Chép tay, dò cột, mỗi sáng làm lại | Bảng ảo gộp lúc hỏi, số luôn mới |
| **Đo cái gì** | Chỉ doanh thu | Doanh thu *và* lợi nhuận gộp cạnh nhau |
| **So chi nhánh** | Sai vì mỗi quán đo một kiểu | Cùng định nghĩa, xếp hạng công bằng |
| **Tìm quán lỗ giấu** | Không thấy, doanh thu cao che mất | Drill xuống ca / món, lộ margin âm |
| **Khi nào có số** | Gần trưa, là số hôm qua | Vài giây, bất cứ lúc nào |
| **Chia sẻ** | Gửi file Zalo, ai cũng thấy | Phân quyền + cảnh báo tự động |

Câu hỏi đầu tiên không nên là "làm sao gộp tám file cho nhanh?" — mà là **"dashboard của mình có trả lời được quán nào lãi thật không?"** Trả lời được câu đó, bạn thôi quản tám con số rời rạc, và bắt đầu quản một chuỗi.

---

*Đang ghép số nhiều chi nhánh mỗi sáng? Kết nối nguồn, để bảng ảo gộp lúc hỏi, định nghĩa "doanh thu" và "lợi nhuận" đúng một lần — [dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc dựng nền trước với [Từ Google Sheets đến dashboard trong 15 phút.](/blog/google-sheets-dashboard/)*
