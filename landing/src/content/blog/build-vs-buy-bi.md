---
title: "Tự dựng BI in-house hay mua sẵn? Bài toán build-vs-buy cho SME"
code: "ss-011"
description: "Tự dựng nghe vừa rẻ vừa chủ động. Nhưng hoá đơn thật không nằm trên báo giá - nó đến sau, bằng lương người và thời gian. Đây là cách quyết cho đúng."
pubDate: 2026-03-18
category: "So Sánh & Lựa Chọn"
readTime: 10
author: "Lê Anh Tuấn"
featured: true
cover: "/blog/covers/build-vs-buy-bi.png"
coverAlt: "Cân nhắc hai bên: tự dựng BI từ bộ công cụ và bánh răng vs mua sẵn một hộp giao ngay"
---

Một chủ doanh nghiệp gọi cho tôi, giọng đầy phấn khích: *"Bên em quyết tự dựng hệ thống BI rồi. Metabase miễn phí, thuê một bạn dev cứng là xong - vừa rẻ, vừa chủ động, không phải phụ thuộc ai."* Nghe rất hợp lý. Nhưng tôi hỏi lại đúng một câu: *"Sáu tháng nữa, nếu bạn dev đó nghỉ, ai sẽ là người hiểu cái hệ thống ấy?"* Đầu dây bên kia im lặng một lúc.

Đây là cái bẫy tinh vi nhất của quyết định **build-vs-buy** (tự xây hay mua sẵn - chọn giữa tự dựng năng lực bằng nội lực, hay mua một giải pháp có sẵn). Tự dựng nghe vừa rẻ vừa chủ động, nên phản xạ tự nhiên là chọn nó. Nhưng cái giá thật của "tự dựng" hiếm khi nằm ở chỗ bạn nhìn vào lúc quyết định. **Nó không biến mất - nó chỉ đến muộn hơn, và gửi hoá đơn cho một người khác trong công ty bạn.** Bài này không nói tự dựng là sai. Nó nói: trước khi chọn, hãy nhìn cho đủ hai phía.

## "Tự dựng" và "mua sẵn" thật ra là gì

Trong bối cảnh năng lực phân tích dữ liệu (BI - Business Intelligence, biến dữ liệu thành quyết định), hai con đường nghĩa là:

- **Tự dựng (in-house - làm bằng nội lực bên trong công ty):** ghép mã nguồn mở như Metabase hoặc Superset, tự host (tự cài và chạy trên hạ tầng của mình), tự viết semantic layer (tầng định nghĩa nghiệp vụ dùng chung - nơi quy ước "doanh thu thuần" nghĩa là gì cho cả công ty) và pipeline (đường ống đưa dữ liệu từ nguồn về kho). Hoặc thuê một đội tự code từ đầu.
- **Mua sẵn (buy):** dùng một sản phẩm SaaS (Software as a Service - phần mềm chạy sẵn trên mây, trả thuê bao) như Semantix. Cắm nguồn vào, hỏi, ra số.

Khác biệt không phải "có code hay không". Mà là: **ai gánh việc dựng, ai gánh việc nuôi, và hoá đơn ghi tên ai.**

## Tự dựng được gì - nói cho công bằng

Phải sòng phẳng: tự dựng có những thứ mà mua sẵn không bao giờ cho bạn trọn vẹn.

- **Chủ động tuỳ biến.** Bạn muốn một loại biểu đồ kỳ lạ, một logic tính metric đặc thù chỉ ngành bạn mới có - bạn tự viết, không phải chờ roadmap của nhà cung cấp.
- **Làm chủ hạ tầng và dữ liệu.** Dữ liệu nằm trên server của bạn, không rời đi đâu cả. Với ngành nhạy cảm (tài chính, y tế) hay yêu cầu tuân thủ nội địa, đây là điểm cộng thật.
- **Không phí license.** Mã nguồn mở có giấy phép 0đ. Đây là con số duy nhất bạn thấy ngay - và là lý do nó hấp dẫn.

Nếu bạn có **đội kỹ thuật mạnh, dư công suất** và một **nhu cầu rất đặc thù** mà không sản phẩm nào ngoài kia đáp ứng nổi, tự dựng là lựa chọn đúng. *Đừng đọc tiếp phần dưới với tâm thế phòng thủ - phần còn lại dành cho phần lớn SME không rơi vào trường hợp này.*

## Cái giá của tự dựng - thứ thường bị đánh giá thấp

Đây là phần báo giá Metabase không in. Tự dựng giống như tự xây nhà thay vì thuê: tiền gạch chỉ là phần nổi, tiền công thợ và tiền bảo trì mái dột về sau mới là phần lớn.

<div class="viz">
<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- left column: what you see -->
  <text x="180" y="40" fill="#34D399" font-size="16" font-weight="800" text-anchor="middle">LÚC QUYẾT ĐỊNH</text>
  <text x="180" y="62" fill="#64748B" font-size="13" text-anchor="middle">thứ bạn nhìn vào</text>
  <rect x="80" y="80" width="200" height="44" rx="8" fill="#16361F" stroke="#34D399" stroke-width="1.5"/>
  <text x="180" y="107" fill="#86EFAC" font-size="15" font-weight="700" text-anchor="middle">License 0đ</text>
  <!-- arrow -->
  <path d="M300 200 L380 200" stroke="#475569" stroke-width="2"/>
  <path d="M372 192 L384 200 L372 208 Z" fill="#475569"/>
  <text x="340" y="186" fill="#64748B" font-size="12" text-anchor="middle">vài tháng sau</text>
  <!-- right column: what arrives -->
  <text x="500" y="40" fill="#F87171" font-size="16" font-weight="800" text-anchor="middle">HOÁ ĐƠN THẬT</text>
  <text x="500" y="62" fill="#64748B" font-size="13" text-anchor="middle">thứ đến sau</text>
  <rect x="400" y="80" width="200" height="38" rx="8" fill="#1E293B"/>
  <text x="500" y="104" fill="#E2E8F0" font-size="13" font-weight="600" text-anchor="middle">Thời gian dựng ban đầu</text>
  <rect x="400" y="126" width="200" height="38" rx="8" fill="#1E293B"/>
  <text x="500" y="150" fill="#E2E8F0" font-size="13" font-weight="600" text-anchor="middle">Lương người duy trì</text>
  <rect x="400" y="172" width="200" height="38" rx="8" fill="#1E293B"/>
  <text x="500" y="196" fill="#E2E8F0" font-size="13" font-weight="600" text-anchor="middle">Nâng cấp &amp; vá bảo mật</text>
  <rect x="400" y="218" width="200" height="38" rx="8" fill="#3B1D1D" stroke="#F87171" stroke-width="1.5"/>
  <text x="500" y="236" fill="#FCA5A5" font-size="13" font-weight="700" text-anchor="middle">Bus-factor: người dựng nghỉ</text>
  <text x="500" y="251" fill="#FCA5A5" font-size="13" font-weight="700" text-anchor="middle">thì ai bảo trì?</text>
  <rect x="400" y="264" width="200" height="38" rx="8" fill="#3B1D1D" stroke="#F87171" stroke-width="1.5"/>
  <text x="500" y="288" fill="#FCA5A5" font-size="13" font-weight="700" text-anchor="middle">Chi phí cơ hội của đội</text>
  <text x="180" y="330" fill="#64748B" font-size="13" text-anchor="middle">Phần nổi nhỏ.</text>
  <text x="500" y="330" fill="#94A3B8" font-size="13" text-anchor="middle">Phần chìm mới quyết định chi phí thật.</text>
</svg>
<div class="viz-caption">License 0đ là thứ duy nhất bạn thấy lúc quyết. Năm khoản bên phải đến sau - và cộng dồn thành phần lớn nhất của hoá đơn.</div>
</div>

Bóc từng khoản:

- **Thời gian dựng ban đầu.** Cài đặt thì nhanh. Nhưng dựng semantic layer chuẩn, kết nối Shopee + TikTok Shop + KiotViet, làm sạch dữ liệu, ra bộ dashboard đầu tiên đáng tin - việc đó ngốn **vài tuần đến vài tháng** của người biết việc. *(Ước tính minh hoạ.)*
- **Chi phí người duy trì.** Đây là khoản lớn nhất và bị bỏ sót nhiều nhất. Một dev/DevOps đủ giỏi để vận hành self-host an toàn ở Việt Nam có lương tham khảo **25-45 triệu/tháng**; một data analyst dựng và sửa báo cáo cũng tầm **15-30 triệu/tháng**. *(Con số minh hoạ, tuỳ thành phố và kinh nghiệm.)* Kể cả chỉ dùng một phần thời gian của họ cho BI, đó vẫn là tiền thật chảy đều mỗi tháng - mãi mãi.
- **Nâng cấp, bảo mật.** Phiên bản mới, lỗ hổng cần vá, server cần sao lưu. "Miễn phí" cho tới khi hệ thống sập lúc 11 giờ đêm trước ngày họp hội đồng.
- **Bus-factor.** Đây là rủi ro ít người gọi tên: **bus-factor** (số người mà nếu họ "biến mất" thì dự án đứng - đặt theo câu hỏi giả định "nếu họ bị xe buýt tông thì sao"). Khi cả hệ thống chỉ một người hiểu, bus-factor của bạn bằng 1. Người đó nghỉ việc, bạn thừa hưởng một cỗ máy không ai đọc nổi. Dân cày anime isekai sẽ thấy quen: bus-factor = 1 nghĩa là cả dự án đang đứng chờ *truck-kun* gọi tên đúng một người - và mất là mất vĩnh viễn, không có nút load lại.
- **Chi phí cơ hội.** Đội kỹ thuật của bạn lẽ ra làm sản phẩm chính - thứ tạo ra doanh thu, thứ là lý do công ty tồn tại. Mỗi giờ họ bảo trì dashboard là một giờ không làm nghề của bạn.

Đó là cái bẫy sâu nhất: **tự dựng BI quá tay, bạn vô tình biến mình thành một công ty làm BI - thay vì làm nghề bạn giỏi nhất.**

Tôi viết những dòng này vì từng tự tay rơi vào bẫy. Hồi làm trưởng nhóm dữ liệu ở một công ty công nghệ lõi của một hệ sinh thái e-commerce, tôi hí hửng ngồi xây lại bộ kiểm tra chất lượng dữ liệu cho riêng đội mình - viết từng luật, từng ngưỡng cảnh báo. Đến khi gần xong tôi mới phát hiện thư viện mã nguồn mở Great Expectations đã cover gần hết những gì tôi cặm cụi dựng lại từ đầu. Vài tuần công sức của tôi, lẽ ra chỉ là một lệnh cài đặt. Đó là lần đầu tôi nếm nỗi đau build-vs-buy bằng chính thời gian của mình - và nó không gửi hoá đơn bằng tiền, nó gửi bằng những buổi tối lẽ ra tôi đã làm thứ thật sự tạo ra giá trị.

## Mua sẵn được gì, đánh đổi gì

Mua sẵn không phải lựa chọn hoàn hảo. Phải nói cả mặt trái.

- **Được:** nhanh - cắm vào là chạy. Chi phí **dự đoán được** - một khoản biết trước thay vì một hố đen lương người. Được **cập nhật và hỗ trợ** liên tục mà không tốn giờ kỹ sư của bạn.
- **Đánh đổi:** bạn **phụ thuộc nhà cung cấp** ở mức độ nào đó, và **ít tuỳ biến sâu** hơn so với tự viết từng dòng. Nếu nhu cầu của bạn lệch hẳn khỏi thiết kế sản phẩm, mua sẵn sẽ thấy chật.

Phép tính ở đây không phải "rẻ hay đắt", mà là *bạn muốn trả hoá đơn bằng tiền biết trước, hay bằng thời gian không biết trước.* Đây cũng đúng là logic của bài [tổng chi phí sở hữu của một công cụ BI](/blog/tco-cong-cu-bi/) - license chỉ là phần nổi của tảng băng.

## Bảng đối chiếu: tự dựng vs mua sẵn

| Tiêu chí | Tự dựng (in-house) | Mua sẵn (SaaS) |
|---|---|---|
| Thời gian tới giá trị | Chậm - vài tuần đến vài tháng dựng | Nhanh - cắm vào là chạy |
| Chi phí thật | License 0đ, nhưng nặng lương người + thời gian | Thuê bao biết trước, ít chi phí ẩn |
| Tuỳ biến | **Sâu, gần như vô hạn** | Trong khuôn khổ sản phẩm |
| Rủi ro người / bảo trì | **Cao** - bus-factor, ai nuôi khi người dựng nghỉ | Thấp - nhà cung cấp lo |
| Chủ quyền dữ liệu | **Toàn quyền** trên hạ tầng của bạn | Tuỳ mô hình (cloud hoặc self-host) |
| Phù hợp với ai | Đội kỹ thuật mạnh + nhu cầu đặc thù | Phần lớn SME, đội mỏng, cần nhanh |

## Khi nào bạn *nên* tự dựng

Phải công bằng: có những lúc tự dựng đúng là lựa chọn khôn ngoan nhất. Cứ chọn nó nếu bạn nằm trong các điều kiện sau:

- **BI là lợi thế cạnh tranh cốt lõi của bạn.** Nếu cách bạn phân tích dữ liệu *chính là* sản phẩm - ví dụ một startup bán insight cho người khác - thì dựng năng lực này là dựng lõi kinh doanh, không phải dựng công cụ phụ trợ.
- **Bạn đã có đội kỹ sư/data mạnh với công suất dư.** Lương họ là chi phí cố định bạn trả dù sao đi nữa, nên khoản "người duy trì" gần như bằng 0 thật, và bus-factor được chia cho nhiều đầu người.
- **Nhu cầu của bạn rất đặc thù.** Logic nghiệp vụ kỳ lạ tới mức không sản phẩm nào ngoài kia khớp, và bạn sẵn sàng đổi tiền lấy thời gian một cách có chủ đích.

Trong những trường hợp này, tự dựng không phải cái bẫy - nó là khoản đầu tư đúng chỗ. Vấn đề chỉ nảy sinh khi một SME *không có* đội data lại dùng phép tính của một công ty *có* đội data. Muốn đào sâu góc mã nguồn mở, đọc thêm [Semantix vs Metabase &amp; Superset](/blog/vs-metabase-superset/).

## Khung quyết định: BI là lõi hay là công cụ?

Rút gọn mọi thứ về một câu hỏi: **BI có phải lợi thế cạnh tranh cốt lõi của bạn không?**

- **Có** - BI là lõi, bạn có đội, nhu cầu đặc thù → **build**. Bạn đang đầu tư vào thứ làm nên giá trị riêng.
- **Không** - BI chỉ là công cụ hỗ trợ để ra quyết định nhanh hơn (đúng với *phần lớn* SME) → **buy**. Đừng biến một công cụ hỗ trợ thành một dự án kỹ thuật dài hạn.

Với phần lớn doanh nghiệp Việt vừa và nhỏ, BI là cái phanh và vô lăng - không phải động cơ. Bạn cần nó tin cậy và sẵn sàng, không cần tự đúc nó.

## Vậy Semantix đứng ở đâu

Nếu bạn thuộc nhóm "buy" nhưng vẫn không muốn buông hết chủ quyền - đây là khoảng giữa mà Semantix nhắm tới. *Không phải một công cụ bạn phải dựng, cũng không phải một hộp đen bạn phải hoàn toàn phó thác.*

Semantix có thể **self-host** trên hạ tầng của bạn, nên dữ liệu không rời server - bạn giữ chủ quyền như khi tự dựng. Đồng thời hỗ trợ **BYOK** (Bring Your Own Key - tự mang khoá API dịch vụ AI của riêng bạn), nên bạn chọn nhà cung cấp AI, kiểm soát chi phí, tránh khoá nhà cung cấp. Nhưng semantic layer, pipeline, lớp AI hỏi-đáp tiếng Việt thì đã được dựng sẵn - bạn không phải bắt đầu từ con số không, không phải gánh bus-factor, không phải biến đội mình thành đội làm BI. Nói gọn: **mua sẵn nhưng vẫn làm chủ.** *Dữ liệu vẫn là của bạn - chủ đề này bàn kỹ ở [dữ liệu là tài sản của ai](/blog/du-lieu-ban/).*

> **Mental model (khung tư duy):** đừng hỏi "tự dựng hay mua sẵn cái nào rẻ hơn". Hỏi "BI có phải nghề của tôi không". Nếu phải - hãy dựng, đó là đầu tư vào lõi. Nếu không - mua sẵn, để đội bạn dồn sức vào thứ thật sự là nghề của mình. **Tự dựng không sai. Tự dựng nhầm chỗ mới sai - vì hoá đơn đắt nhất không phải license, mà là công ty bạn lặng lẽ trở thành một công ty làm BI.**

---

*Muốn chủ quyền dữ liệu mà không phải tự dựng từ đầu? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
