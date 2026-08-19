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

Một chủ doanh nghiệp từng gọi cho mình, giọng đầy phấn khởi: *"Bên em chốt tự dựng hệ thống BI rồi anh. Metabase mã nguồn mở miễn phí, tuyển thêm một bạn dev cứng về gõ vài tuần là xong. Vừa rẻ, vừa chủ động, chẳng phụ thuộc bố con thằng nào."* Nghe qua thì thuyết phục thật. Mình chỉ hỏi lại đúng một câu: *"Thế nửa năm nữa, lỡ bạn dev đó nộp đơn nghỉ việc, ai ở công ty sẽ đọc hiểu mớ hệ thống ấy?"* Đầu dây bên kia im bặt vài giây.

Đó là cái bẫy kinh điển nhất của bài toán **build-vs-buy** (tự xây hay mua sẵn). Tự dựng bằng mã nguồn mở cho cảm giác vừa tiết kiệm vừa làm chủ cuộc chơi, nên phản xạ đầu tiên của nhiều sếp là gật đầu chọn dựng. Thế nhưng chi phí thật của việc "tự dựng" hiếm khi nằm ở con số bạn nhìn thấy lúc quyết định. **Nó không biến mất, nó chỉ âm thầm đến muộn hơn, và gửi hoá đơn cho một người khác trong công ty bạn.**

Bài này mình không bảo tự dựng là sai. Mình muốn cùng bạn bóc tách sòng phẳng cả hai mặt trước khi đặt bút ký duyệt.

## "Tự dựng" và "mua sẵn" bản chất là gì?

Trong bài toán xây dựng hệ thống BI (Business Intelligence, biến dữ liệu thô thành báo cáo và quyết định kinh doanh), hai con đường này cụ thể gồm:

- **Tự dựng (in-house):** Đội kỹ thuật tải các công cụ mã nguồn mở như Metabase hoặc Superset về tự cài lên máy chủ (self-host). Bạn tự kết nối nguồn dữ liệu, tự viết đường ống pipeline kéo dữ liệu từ Shopee, TikTok Shop, KiotViet hay phần mềm kế toán về kho, rồi tự dựng tầng định nghĩa nghiệp vụ dùng chung (semantic layer) để cả công ty cùng hiểu "doanh thu thuần" tính như thế nào. Một số nơi thậm chí thuê ngoài hoặc tự code giao diện từ đầu.
- **Mua sẵn (buy):** Dùng giải pháp SaaS đóng gói sẵn như Semantix. Cắm nguồn dữ liệu vào, phân quyền, cấu hình ngữ cảnh là dùng được.

Khác nhau không đơn thuần là "có phải viết code hay không", mà là: **ai chịu trách nhiệm dựng, ai gánh công nuôi, và hoá đơn hàng tháng được tính bằng tiền phần mềm hay bằng lương nhân sự.**

## Tự dựng được gì: nói cho sòng phẳng

Phải thừa nhận công bằng rằng tự dựng mang lại những giá trị mà giải pháp mua sẵn khó đáp ứng trọn vẹn:

- **Tự do tuỳ biến theo ý muốn:** Bạn cần vẽ một dạng biểu đồ lạ mắt, xử lý một công thức tính hoa hồng chiết khấu chỉ riêng ngành bạn mới có, bạn tự mở code ra sửa, không phải gửi yêu cầu rồi chờ roadmap của bên bán phần mềm.
- **Làm chủ hạ tầng và dữ liệu:** Toàn bộ cơ sở dữ liệu nằm trên server riêng của công ty. Với doanh nghiệp tài chính, y tế hoặc đơn vị có quy định tuân thủ khắt khe, đây là điểm cộng lớn.
- **Chi phí bản quyền 0 đồng:** Giấy phép mã nguồn mở miễn phí. Đây là con số 0 tròn trĩnh đập ngay vào mắt lúc lập dự toán, và cũng là thỏi nam châm hút các sếp nhất.

Nếu bạn đang sở hữu một **đội kỹ thuật dày dạn, công suất đang dư dả**, cộng với **nhu cầu nghiệp vụ quá đặc thù** mà không công cụ thương mại nào ngoài kia giải quyết nổi, thì tự dựng là lựa chọn đúng. Nhưng nếu bạn là một SME thông thường với bộ máy tinh gọn, hãy cùng mình nhìn vào bức tranh phía sau.

## Chi phí chìm của tự dựng: phần báo giá không ghi

Tự dựng hệ thống giống như tự đi mua gạch về xây nhà thay vì thuê trọn gói: tiền gạch cát lúc đầu chỉ là phần nổi, tiền công thợ và tiền sửa mái dột về sau mới ngốn phần lớn ngân sách.

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

Bóc từng khoản một:

- **Thời gian dựng ban đầu:** Cài phần mềm lên server chỉ mất một buổi. Nhưng để nối trơn tru dữ liệu nhiều sàn, làm sạch đơn huỷ, đơn hoàn tiền COD, chuẩn hoá logic chiết khấu và ra bộ dashboard đầu tiên đáng tin cậy, việc đó thường ngốn từ **vài tuần đến vài tháng** của nhân sự có chuyên môn. *(Ước tính minh hoạ.)*
- **Chi phí nhân sự duy trì:** Đây là khoản tiền chảy đều đặn mỗi tháng mà nhiều người bỏ quên. Một kỹ sư DevOps/backend đủ trình vận hành hệ thống ổn định tại Việt Nam có lương tham khảo khoảng **25-45 triệu đồng/tháng**; một chuyên viên phân tích dữ liệu chuyên ngồi viết truy vấn, sửa báo cáo cũng dao động **15-30 triệu đồng/tháng**. *(Con số minh hoạ, tuỳ thành phố và kinh nghiệm.)* Dù chỉ dùng một phần thời gian của họ cho BI, đó vẫn là tiền thật chảy đều mỗi tháng, kéo dài mãi.
- **Bảo trì, nâng cấp và vá lỗi:** Mã nguồn mở cập nhật liên tục, lỗ hổng bảo mật cần vá, server cần sao lưu dự phòng. Mọi thứ chỉ "miễn phí" cho tới khi đường ống dữ liệu nghẽn lúc 11 giờ đêm trước buổi họp giao ban chiến lược sáng hôm sau.
- **Rủi ro phụ thuộc cá nhân (bus-factor):** Dân kỹ thuật gọi đây là **bus-factor**, số người mà nếu họ đột ngột vắng mặt thì dự án đứng bánh (đặt theo câu hỏi giả định "nếu họ bị xe buýt tông thì sao"). Khi cả hệ thống do một người tự mày mò dựng nên, bus-factor của công ty bạn bằng đúng 1. Bạn dev đó rời đi, bạn thừa hưởng một khối code không ai dám động vào vì sợ gãy luồng. Dân cày anime isekai sẽ thấy quen: bus-factor = 1 nghĩa là cả dự án đang đứng chờ *truck-kun* gọi tên đúng một người, mà mất là mất vĩnh viễn, không có nút load lại.
- **Chi phí cơ hội của doanh nghiệp:** Kỹ sư của bạn lẽ ra phải tập trung hoàn thiện sản phẩm kinh doanh cốt lõi, thứ trực tiếp mang lại doanh thu. Mỗi giờ họ ngồi gỡ lỗi bảng biểu BI là một giờ bị rút khỏi mặt trận chính.

Hệ quả nguy hiểm nhất: **cố tự dựng một hệ thống phân tích vượt quá năng lực, bạn vô tình biến công ty mình thành một xưởng gia công phần mềm BI bất đắc dĩ, thay vì tập trung vào nghề bạn giỏi nhất.**

Mình thấm thía bài học này từ một cú vấp của chính mình. Hồi còn làm trưởng nhóm dữ liệu tại một công ty công nghệ thuộc hệ sinh thái e-commerce, mình hí hửng ngồi tự viết một framework kiểm tra chất lượng dữ liệu riêng cho đội: cặm cụi code từng rule bắt null, từng ngưỡng cảnh báo. Đến khi sắp xong, mình mới ngã ngửa: thư viện mã nguồn mở Great Expectations đã có sẵn gần như trọn vẹn những gì mình vừa vật lộn xây. Mấy tuần công sức lẽ ra chỉ là một câu lệnh cài đặt. Đó là lần đầu mình nếm bài học build-vs-buy bằng chính thời gian của mình: học phí không trả bằng tiền, mà bằng những buổi tối lẽ ra đã dành cho thứ thật sự tạo ra giá trị.

## Mua sẵn: lợi thế và những điều phải đánh đổi

Chọn mua giải pháp đóng gói sẵn không phải tấm vé vạn năng, bạn cũng cần nhìn rõ hai mặt:

- **Lợi thế:** Tốc độ triển khai nhanh, kết nối là dùng được. Chi phí **dự đoán được** qua gói thuê bao cố định, không lo hố đen tiền lương bảo trì. Nhà cung cấp lo phần nâng cấp tính năng và an ninh hạ tầng, không tốn giờ làm việc của kỹ sư nội bộ.
- **Đánh đổi:** Bạn chấp nhận một mức độ phụ thuộc nhất định vào nhà cung cấp, và khả năng can thiệp sâu vào từng dòng mã nguồn bị giới hạn trong khuôn khổ thiết kế của sản phẩm.

Phép so sánh ở đây không đơn thuần là "rẻ hay đắt", mà là: *bạn muốn trả hoá đơn bằng tiền biết trước, hay bằng thời gian không biết trước?* Logic này cũng tương đồng với bài phân tích về [tổng chi phí sở hữu của một công cụ BI](/blog/tco-cong-cu-bi/), nơi phí bản quyền chỉ là phần đỉnh của tảng băng trôi.

## Bảng đối chiếu: tự dựng vs mua sẵn

| Tiêu chí | Tự dựng (In-house) | Mua sẵn (SaaS đóng gói) |
|---|---|---|
| Thời gian đưa vào sử dụng | Chậm, mất từ vài tuần đến vài tháng triển khai | Nhanh, kết nối nguồn dữ liệu là dùng ngay |
| Bản chất chi phí | License 0đ, nhưng nặng chi phí nhân sự và vận hành | Phí thuê bao rõ ràng, kiểm soát được ngân sách |
| Khả năng tuỳ biến | **Rất sâu**, can thiệp trực tiếp vào mã nguồn | Linh hoạt trong phạm vi tính năng của sản phẩm |
| Rủi ro vận hành | **Cao**, phụ thuộc cá nhân (bus-factor = 1) | Thấp, nhà cung cấp chịu trách nhiệm duy trì |
| Quyền kiểm soát dữ liệu | **Toàn quyền**, lưu trữ nội bộ | Tuỳ mô hình (Cloud hoặc Self-host) |
| Đối tượng phù hợp nhất | Đội tech quy mô lớn, bài toán đặc thù | Đa số SME, đội ngũ tinh gọn, cần hiệu quả ngay |

## Khi nào bạn *nên* tự dựng?

Nói cho công bằng: có những lúc tự dựng đúng là lựa chọn chiến lược khôn ngoan nhất. Cứ chọn nó nếu bạn thoả các điều kiện sau:

- **Năng lực phân tích dữ liệu là vũ khí cạnh tranh sống còn:** Nếu mô hình kinh doanh của bạn kiếm tiền trực tiếp từ việc xử lý insight dữ liệu bán cho đối tác, thì tự xây nền tảng phân tích chính là xây tài sản cốt lõi của doanh nghiệp.
- **Bạn sẵn có đội kỹ thuật mạnh và đang dư tải:** Lương kỹ sư vốn là chi phí cố định phải trả hàng tháng, giao thêm mảng BI là tận dụng công suất dư, và rủi ro phụ thuộc được san sẻ cho nhiều đầu người trong team.
- **Quy trình nghiệp vụ dị biệt, không sản phẩm nào đáp ứng:** Công thức và luồng vận hành của bạn khác hẳn thị trường, cố gò vào một phần mềm thương mại là bất khả thi.

Trong các trường hợp trên, tự dựng là khoản đầu tư chiến lược sinh lời. Vấn đề chỉ nảy sinh khi một SME *không có* đội data lại dùng phép tính của một công ty *có* đội data. Muốn đào sâu góc mã nguồn mở, bạn có thể xem thêm bài [Semantix vs Metabase &amp; Superset](/blog/vs-metabase-superset/).

## Khung quyết định: BI là động cơ hay vô lăng?

Để đơn giản hoá quyết định, hãy tự trả lời một câu hỏi then chốt: **Hệ thống BI có phải là sản phẩm kinh doanh cốt lõi của công ty bạn không?**

- **Có:** BI là năng lực cốt lõi, công ty có đội kỹ thuật mạnh → **tự dựng (build)** để nắm giữ bí quyết công nghệ riêng.
- **Không:** BI chỉ đóng vai trò công cụ giúp lãnh đạo ra quyết định nhanh và chính xác hơn (đây là thực tế của đa số doanh nghiệp vừa và nhỏ) → **mua sẵn (buy)** để giải phóng nguồn lực cho trận đánh chính.

Với phần lớn doanh nghiệp Việt, hệ thống dữ liệu giống cụm vô lăng và bảng đồng hồ của chiếc xe: bạn cần nó chính xác và nhạy để cầm lái an toàn, chứ không cần tự mở xưởng cơ khí để đúc ra cái vô lăng đó.

## Lối đi dung hoà: Semantix đứng ở đâu?

Nếu bạn thuộc nhóm cần mua sẵn để tiết kiệm thời gian nhưng vẫn e ngại việc đưa dữ liệu nhạy cảm lên dịch vụ đám mây công cộng, đây chính là khoảng giữa mà Semantix nhắm tới. *Không phải một công cụ bạn phải tự dựng, cũng không phải một hộp đen bạn phó thác toàn bộ.*

Semantix cho phép triển khai theo mô hình **self-host** trực tiếp trên hạ tầng máy chủ của bạn, dữ liệu không rời server của công ty. Song song đó, cơ chế **BYOK** (Bring Your Own Key, tự mang khoá API dịch vụ AI của riêng bạn) giúp bạn chủ động chọn nhà cung cấp AI, kiểm soát chi phí, tránh bị khoá chặt vào một nền tảng. Còn phần việc nặng nhọc nhất như thiết lập semantic layer, kết nối dữ liệu và lớp hỏi đáp bằng tiếng Việt tự nhiên thì đã được đóng gói hoàn chỉnh: bạn không phải bắt đầu từ con số không, không gánh bus-factor, không phải biến đội mình thành đội làm BI. Nói gọn: **mua sẵn nhưng vẫn làm chủ.** *Dữ liệu vẫn là của bạn, chủ đề này bàn kỹ ở bài [dữ liệu là tài sản của ai](/blog/du-lieu-ban/).*

> **Khung tư duy cốt lõi:** Đừng chỉ hỏi "tự dựng hay mua sẵn cái nào rẻ hơn trên bảng giá". Hãy tự hỏi "xây phần mềm phân tích có phải là nghề kinh doanh của mình không". Nếu phải, cứ dựng, đó là đầu tư vào lõi. Nếu không, hãy mua sẵn để đội bạn dồn toàn bộ tâm trí vào thứ thật sự là nghề của mình. **Tự dựng không sai. Tự dựng nhầm chỗ mới sai, vì hoá đơn đắt nhất không phải phí bản quyền, mà là công ty bạn lặng lẽ trở thành một công ty làm BI.**

---

*Muốn chủ quyền dữ liệu mà không phải tự dựng từ đầu? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
