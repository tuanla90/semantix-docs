---
title: "ETL vs ELT: vì sao đảo thứ tự hai chữ cái lại quyết định ai trong công ty được chạm vào dữ liệu"
code: "kt-011"
description: "Mỗi câu hỏi mới, sếp lại phải chờ kỹ sư dựng lại pipeline ba ngày. Vấn đề không nằm ở kỹ sư — nó nằm ở thứ tự hai chữ cái T và L. Đảo lại, dữ liệu về tay bạn."
pubDate: 2026-11-17
category: "Kiến Thức Nền Tảng"
readTime: 8
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/etl-vs-elt.svg"
coverAlt: "Hai luồng xử lý dữ liệu E-T-L và E-L-T với thứ tự khối Transform và Load hoán đổi"
---

Một COO (Chief Operating Officer — giám đốc vận hành) ở TP.HCM hỏi đội data một câu tưởng đơn giản: *"Khách mua lần đầu mùa sale tháng 10 có quay lại mua mùa Tết không?"* Câu trả lời không phải một con số. Câu trả lời là: *"Để bọn em dựng lại pipeline (đường ống dữ liệu — quy trình tự động đưa dữ liệu từ nguồn về kho), khoảng ba ngày nữa có."* Tuần sau, chị hỏi một câu khác. Lại ba ngày. Mỗi câu hỏi mới của business là một đơn hàng đặt cho kỹ sư, xếp hàng chờ xử lý.

Phản xạ đầu tiên là trách đội data làm chậm. Nhưng họ không chậm — họ đang bị một quyết định kiến trúc từ nhiều năm trước trói tay. Quyết định đó nằm gọn trong thứ tự ba chữ cái: **ETL** (Extract, Transform, Load) hay **ELT** (Extract, Load, Transform). Đảo vị trí chữ T và chữ L nghe như chuyện kỹ thuật vặt của dân hạ tầng. Thực ra nó quyết định một điều rất đời: ai trong công ty được phép đặt câu hỏi mới với dữ liệu — chỉ kỹ sư, hay cả bạn.

## ETL và ELT là gì — và khác nhau đúng một chỗ

Cả hai đều là cách **đưa dữ liệu từ nhiều nguồn về một chỗ** để phân tích. Cả hai đều có ba việc giống hệt nhau, chỉ khác thứ tự:

- **E — Extract (Trích xuất):** lấy dữ liệu thô từ các nguồn — Shopee, TikTok Shop, KiotViet, Google Sheets, phần mềm kế toán.
- **T — Transform (Biến đổi):** làm sạch, gộp, tính toán, đổi dữ liệu thô thành dạng đẹp để phân tích — ví dụ định nghĩa "doanh thu" là gì, trừ đơn hoàn ra sao.
- **L — Load (Nạp):** đổ dữ liệu vào kho chung để mọi người truy vấn.

**ETL** làm theo thứ tự Extract → Transform → Load: *biến đổi trước, rồi mới nạp vào kho.* **ELT** đảo hai bước cuối: Extract → Load → Transform: *đổ thô vào kho trước, biến đổi sau — ngay tại kho, lúc nào cần thì làm.*

Nghe thì nhỏ. Nhưng cái bước **Transform** ấy chính là chỗ một người phải *biết trước mình cần gì*. Và ai nắm bước Transform thì người đó nắm quyền quyết định dữ liệu được phân tích như thế nào.

## Ẩn dụ căn bếp: nấu sẵn rồi cất, hay cất nguyên liệu thô?

Hình dung kho dữ liệu là cái tủ lạnh của một nhà hàng.

**ETL là kiểu nấu sẵn rồi mới cất tủ.** Đầu bếp (kỹ sư data) quyết định trước thực đơn — món bò kho, món gà rán — nấu chín, đóng hộp, rồi xếp vào tủ. Khách gọi đúng món có sẵn thì ra ngay, nóng hổi, gọn gàng. Nhưng khách hỏi *"cho tôi món bò xào rau"* — món không có trong thực đơn? Đầu bếp phải lôi công thức ra, đi chợ lại, nấu lại từ đầu. Đó chính là *"ba ngày nữa có"* của câu chuyện đầu bài.

**ELT là kiểu cất nguyên liệu thô vào tủ.** Thịt, rau, gia vị — để nguyên trong tủ. Khách gọi gì, đầu bếp lấy nguyên liệu ra nấu theo yêu cầu *lúc đó*. Bò kho, bò xào, bò nướng — cùng một miếng thịt, nấu kiểu nào cũng được, không cần đoán trước thực đơn. Linh hoạt hơn hẳn, đổi lại tủ phải đủ rộng và lạnh để chứa đồ thô.

> Quy tắc vàng: ETL bắt bạn quyết định câu hỏi *trước khi* có dữ liệu. ELT cho bạn giữ dữ liệu thô và quyết định câu hỏi *bất cứ lúc nào sau đó*.

Khác biệt không phải kỹ thuật. Nó là khác biệt giữa một thực đơn cố định và một căn bếp mở.

## Vì sao ETL từng là lựa chọn hợp lý — thời đĩa cứng đắt như vàng

Đừng vội nghĩ ETL là "lỗi thời nên sai". Hai mươi năm trước, ETL là lựa chọn *bắt buộc*, vì một lý do rất vật lý: **lưu trữ đắt khủng khiếp**. Một ổ cứng cho kho dữ liệu doanh nghiệp tính tiền theo từng gigabyte. Sức tính toán cũng đắt. Không ai dại gì đổ cả đống dữ liệu thô vào kho — phần lớn sẽ không bao giờ dùng tới, mà vẫn ngốn tiền chỗ chứa mỗi tháng.

Nên người ta làm điều hợp lý nhất *với ràng buộc thời đó*: lọc và biến đổi *trước*, chỉ nạp vào kho phần dữ liệu đã tinh gọn, đúng nhu cầu đã biết. Tiết kiệm chỗ chứa, tiết kiệm tiền. Cái giá phải trả — mất linh hoạt — khi đó là cái giá rẻ, vì nhu cầu phân tích cũng ít thay đổi.

Rồi điện toán đám mây đến và lật ngược bài toán. Lưu trữ trên cloud rẻ gần như cho không; sức tính toán thuê theo giờ, cần thì bật, xong thì tắt. Cái ràng buộc sinh ra ETL đã biến mất. *Giữ nguyên một kiến trúc sau khi lý do của nó đã hết hiệu lực — đó là cách phần lớn công ty mắc kẹt mà không hay.*

## ELT mở khóa self-service — trả quyền hỏi về tay người có câu hỏi

Đây mới là chỗ chuyện hai chữ cái chạm tới bạn.

Với **ETL**, vì phải biến đổi *trước khi* nạp, nên ai đó phải *biết trước* công ty sẽ cần phân tích gì để dựng sẵn. Người "biết trước" đó là kỹ sư data. Câu hỏi nào nằm ngoài thực đơn đã dựng — phải xếp hàng chờ họ. Dữ liệu, trên thực tế, bị **khóa trong tay kỹ sư**. Business muốn hỏi, phải đi qua một người phiên dịch.

Với **ELT**, dữ liệu thô đã nằm sẵn trong kho. Việc biến đổi xảy ra *sau*, lúc có câu hỏi — và có thể do nhiều người làm, bằng nhiều công cụ, kể cả công cụ hỏi bằng tiếng Việt. Người *có câu hỏi* và người *lấy được câu trả lời* lần đầu tiên có thể là cùng một người. Đây chính là nền móng kỹ thuật cho [self-service analytics — trả quyền hỏi data về tay business](/blog/hop-nhat-da-kenh/): nó chỉ chạy được khi dữ liệu thô đã ở sẵn một chỗ, chờ được hỏi.

*Ví dụ minh họa:* một chuỗi F&B (Food & Beverage — ngành ăn uống) đổ thô doanh số 8 chi nhánh vào kho theo kiểu ELT. Tuần này quản lý hỏi "chi nhánh nào lỗ giờ trưa", tuần sau hỏi "món nào kéo khách nhưng không ra lời" — không câu nào cần dựng lại pipeline, vì nguyên liệu thô đã nằm trong tủ, chỉ "nấu" lại theo câu hỏi. Thời gian từ câu hỏi đến câu trả lời rớt từ *vài ngày* xuống *vài phút*.

## Vậy SME nên chọn gì?

Câu trả lời thẳng: với gần như mọi SME (Small & Medium Enterprise — doanh nghiệp nhỏ và vừa) đa kênh hôm nay, **ELT là mặc định đúng** — và bạn thường không cần tự dựng nó.

Lý do: nhu cầu phân tích của SME *thay đổi liên tục*. Hôm nay lo tồn kho Tết, tháng sau lo giữ chân khách mùa sale, quý sau lo biên lợi nhuận từng kênh. Một kiến trúc bắt bạn biết-trước-mọi-câu-hỏi (ETL) là sai ngay từ tiền đề — vì bạn *không* biết trước. ELT giữ dữ liệu thô lại, để mỗi câu hỏi mới không phải trả giá bằng một pipeline mới.

Có ngoại lệ không? Có. Khi dữ liệu cực nhạy cảm phải làm sạch/ẩn danh *trước khi* được phép vào kho — vì lý do tuân thủ — thì bước Transform trước (kiểu ETL) vẫn có chỗ. Nhưng đó là ngoại lệ vì luật, không phải vì hiệu năng. *(Chuyện ai-thấy-gì khi đưa data lên kho là một câu hỏi riêng — và quan trọng — bạn có thể bắt đầu từ [hợp nhất dữ liệu đa kênh về một chỗ](/blog/hop-nhat-da-kenh/).)*

## ETL/ELT trong Semantix

Semantix không phải một công cụ ETL để bạn ngồi kéo-thả ống dẫn dữ liệu. Định vị bằng phủ định: nó **không** bắt bạn biết trước cần phân tích gì, cũng **không** bắt bạn viết một dòng code biến đổi nào.

Cách tiếp cận đi theo tinh thần ELT, nhưng thêm một tầng khóa:

1. **Đổ nguồn về một chỗ** — Shopee, TikTok Shop, KiotViet, Google Sheets — dữ liệu thô được nạp vào, chưa cần biết trước câu hỏi.
2. **Định nghĩa nghiệp vụ ở tầng trên, một lần** — "doanh thu", "lợi nhuận sau phí", "khách quay lại" được định nghĩa ở [Semantic Layer — tầng nghĩa dùng chung](/blog/semantic-layer/), thay vì nung cứng vào pipeline. Phần "Transform" của ELT không còn là việc của riêng kỹ sư; nó thành một định nghĩa nghiệp vụ ai cũng đọc được.
3. **Hỏi bằng tiếng Việt** — bạn gõ câu hỏi mới, AI biến đổi *lúc đó* trên nền dữ liệu thô đã có. Không pipeline mới, không chờ ba ngày.

Nói cách khác: ELT đưa dữ liệu thô về một chỗ, Semantic Layer đảm bảo ai "nấu" lại cũng ra cùng một định nghĩa. Tự do hỏi đi kèm một sự thật chung.

## Tóm lại

| ETL — biến đổi trước, nạp sau | ELT — nạp trước, biến đổi sau |
|---|---|
| Transform → Load: nấu sẵn rồi cất tủ | Load → Transform: cất nguyên liệu thô, nấu khi cần |
| Phải biết trước cần phân tích gì | Giữ thô lại, quyết câu hỏi bất cứ lúc nào |
| Câu hỏi mới = pipeline mới = chờ kỹ sư | Câu hỏi mới = truy vấn lại trên dữ liệu sẵn có |
| Hợp lý thời lưu trữ đắt | Hợp lý thời cloud lưu trữ rẻ |
| Dữ liệu khóa trong tay kỹ sư | Dữ liệu về tay người có câu hỏi |

Lần tới khi một câu hỏi kinh doanh bị trả lời bằng *"ba ngày nữa có"*, đừng trách người trả lời. Hỏi một câu sâu hơn: **dữ liệu của công ty mình đang bị "nấu sẵn" theo thực đơn cũ, hay đang nằm thô trong tủ chờ được hỏi?** Đảo đúng thứ tự hai chữ cái, bạn đảo luôn câu trả lời cho câu hỏi *ai được chạm vào dữ liệu*.

---

*Muốn tự đổ dữ liệu đa kênh về một chỗ rồi hỏi bằng tiếng Việt, không cần biết một dòng code? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì — lớp nền giúp mọi con số khớp nhau](/blog/semantic-layer/).*
