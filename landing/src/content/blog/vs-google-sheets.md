---
title: "Semantix vs Google Sheets: đối thủ thật của BI không phải Power BI — mà là file bảng tính chỉ trả lời được câu của người làm ra nó"
code: "ss-006"
description: "Họp sáng thứ Hai, ba người đọc ba con số doanh thu từ cùng một file. Khi nào bảng tính Excel/Google Sheets hết gánh nổi — và câu hỏi tiếp theo bạn chưa kịp hỏi."
pubDate: 2026-06-29
category: "So Sánh & Lựa Chọn"
readTime: 13
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/vs-google-sheets.svg"
coverAlt: "Một bảng tính tĩnh với dấu hỏi nằm ngoài khung, mũi tên chuyển sang câu hỏi tiếng Việt cho ra câu trả lời động"
---

10 giờ tối. Bạn đang xem cái dashboard (bảng số trực quan) Google Sheets mình dựng cả tuần mới xong — đẹp, gọn, mười mấy biểu đồ tự cập nhật. Rồi mắt bạn dừng lại ở một con số lạ: **doanh thu TikTok Shop tuần này tụt 18%.** Câu hỏi bật ra ngay trong đầu: *tụt là do giảm số đơn, hay do khách mua giỏ nhỏ đi?*

Bạn nhìn lại dashboard. Không có biểu đồ nào trả lời câu đó. Vì lúc dựng, bạn đâu có nghĩ tới nó. Thế là 10 giờ tối, bạn mở một tab mới, kéo pivot (bảng tổng hợp xoay chiều trong bảng tính), gõ `=AVERAGEIF`, lọc tay theo kênh, theo tuần. Nửa tiếng sau bạn có câu trả lời — và cũng vừa kịp quên mất mình định hỏi gì tiếp theo.

Đây là lúc lộ ra điều ít người chịu tin: **đối thủ thật của một công cụ BI (Business Intelligence — biến dữ liệu thành quyết định) không phải Power BI hay Tableau — mà là chính file bảng tính bạn đang mở.** Và một dashboard bảng tính, dù bạn tự dựng hay mua template, **chỉ trả lời được đúng những câu mà người làm ra nó đã nghĩ tới trước.** Toàn bộ giá trị của phân tích lại nằm ở **câu hỏi tiếp theo bạn chưa kịp hỏi** — câu bật ra lúc 10 giờ tối khi thấy một con số lạ.

## Vì sao bảng tính "gánh" được rất lâu — và vì sao đó là cái bẫy

Hãy nói sòng phẳng: Excel và Google Sheets là một trong những phần mềm vĩ đại nhất từng được viết ra. Một ô trống có thể là tiền, là ngày, là ghi chú, là công thức, là một mẩu danh sách. Bạn mở lên là dùng được ngay, không cần học mô hình dữ liệu, không cần ai cấp quyền. Chính sự tiện đó khiến nó **gánh được rất lâu** — phần lớn doanh nghiệp Việt vận hành cả năm trời chỉ trên bảng tính, và đó là lựa chọn đúng ở giai đoạn đầu.

Nhưng đây là nghịch lý: **cái khiến bảng tính tiện hôm nay chính là cái biến nó thành nợ kỹ thuật ngày mai.** Vì một ô có thể là bất cứ thứ gì, không có gì ép bạn nhất quán. Vì ai cũng sửa được, không có gì giữ một định nghĩa đứng yên. Sự tự do tuyệt đối ở quy mô nhỏ trở thành hỗn loạn không kiểm soát được ở quy mô lớn.

> Bảng tính giống **con dao đa năng Thuỵ Sĩ** — tiện kinh khủng cho trăm việc nhỏ hằng ngày. Nhưng đừng dùng nó để xây nhà. Khi dữ liệu của bạn lớn lên thành "ngôi nhà", bạn cần một bộ công cụ khác, không phải một con dao to hơn.

Bảng tính không thua vì nó *yếu*. Nó thua vì nó **quá vạn năng** — cái gì cũng làm được, nên không cái gì có một nguồn sự thật. Dưới đây là những chỗ nó bắt đầu hụt hơi — không phải vì Sheets dở, mà vì nó sinh ra để làm việc khác.

Tôi nói cái này từ kinh nghiệm tự tay xây. Làm tư vấn chuyển đổi số ngoài giờ, hành trình công cụ của tôi đi đúng đường cong đó: bắt đầu bằng Google Sheets, lớn lên thì chuyển sang AppSheet, giờ là Nocobase. Tôi từng dựng cơ sở dữ liệu cho khách đủ ngành — bán hàng, kho, xuất nhập khẩu, may mặc in ấn, cả phòng khám y tế — và lần nào cũng tới một điểm: Sheets không gãy vì thiếu công thức, nó gãy vì *không ai ép được một định nghĩa đứng yên khi nhiều người cùng sửa*. Đó cũng là lúc tôi học SQL hồi còn làm vận hành, chỉ để "đọc số tìm lỗi" mà bảng tính giấu đi — chuyện tôi kể kỹ trong [hành trình thời Excel](/blog/hanh-trinh-thoi-excel/).

## 1. Một khái niệm, ba định nghĩa — vì sao ba người ra ba số

Họp sáng thứ Hai. Anh chủ chuỗi mở file quen thuộc — mười mấy sheet, mỗi sheet một kênh, một tháng. Bạn marketing đọc "doanh thu tháng này **1,2 tỷ**". Bạn kế toán lắc đầu: "**1,08 tỷ** chứ, em vừa kéo lại". Anh chủ thì nhớ con số **1,15 tỷ** trong sheet tổng hợp tuần trước. Ba người, ba số, cùng một file.

Phản xạ đầu tiên là nghĩ "chắc ai đó kéo nhầm". Không ai sai cả — vấn đề là **"doanh thu" trong file đó chưa bao giờ được định nghĩa một lần.**

*Ví dụ minh hoạ:* sheet có cột `Tổng tiền` và cột `Đã thu`. Người A pivot trên `Tổng tiền`, người B trên `Đã thu`, người C lọc thêm "trạng thái = hoàn thành" rồi mới cộng. Ba người thành thật, ba con số lệch nhau **10–15%**, và không có cách nào biết ai "đúng" vì không có ai đúng làm chuẩn. Tệ hơn cả: những định nghĩa đó **nằm ẩn trong các ô** — một `=SUMIFS` lồng ba tầng ở ô `M2` mà bạn không bao giờ mở ra đọc. Nếu bạn mua một file template (mẫu dựng sẵn), bạn còn **thừa kế nguyên giả định nghiệp vụ** của người làm ra nó: họ tính doanh thu theo đơn đã đặt hay đã giao? Có trừ đơn hoàn, trừ phí sàn không? Bạn không biết — và đang ra quyết định dựa trên một định nghĩa chưa từng nhìn thấy.

## 2. Dashboard tĩnh trả câu đã đoán trước; phân tích thật là một CHUỖI drill-down (khoan sâu từng lớp dữ liệu)

Một template bán sẵn thường có 10–15 biểu đồ dựng sẵn: doanh thu theo ngày, top sản phẩm, tỷ lệ theo kênh. Đẹp. Đủ cho cái nhìn tổng quan. Nhưng phân tích thực sự không sống ở cái nhìn tổng quan. Nó sống ở khoảnh khắc bạn thấy một con số *lệch* và buột miệng "ủa, vì sao?".

Cách một người giỏi đọc dữ liệu chưa bao giờ là "liếc một dashboard rồi xong". Nó là một chuỗi:

> Thấy bất thường → hỏi vì sao → tách theo nhóm → khoan sâu vào nhóm tệ nhất → so sánh với kỳ trước → tìm ra nguyên nhân.

Mỗi mũi tên trong chuỗi đó, trong Google Sheets, là **một pivot mới hoặc một công thức mới**. Năm bước = năm lần dựng lại, năm lần phá vỡ mạch suy nghĩ. Đến bước thứ tư thì bạn đã quên mình xuất phát từ câu hỏi nào. Người không rành pivot thì bế tắc ngay từ câu hỏi thứ hai.

*Ví dụ minh hoạ:* bạn thấy "doanh thu TikTok tụt **18%**" và muốn khoan: *do ít đơn hơn hay giỏ hàng nhỏ đi → sản phẩm nào kéo cả mức giảm → khách giảm mua là khách cũ hay mới?* Câu thứ ba thường tắc luôn, vì sheet còn chẳng có cờ phân biệt khách cũ/mới. Với template, mỗi câu ngoài kịch bản = **một lần ngồi dựng lại từ đầu**.

## 3. Có những phân tích bảng tính làm KHÔNG nổi — hoặc làm thì cực đau

Cả một lớp phân tích mà bảng tính gần như bó tay, vì chúng đòi JOIN (ghép nhiều bảng theo khóa chung) nhiều bảng và SQL (Structured Query Language — ngôn ngữ truy vấn cơ sở dữ liệu) nhiều bước — thứ Sheets không sinh ra để làm:

- **Cohort retention heatmap** — nhóm khách theo tháng mua đầu, rồi theo dõi từng nhóm rụng dần qua các tháng. Trong Sheets, đây là địa ngục công thức mảng.
- **RFM segmentation** — chấm điểm từng khách theo độ gần đây, tần suất, giá trị, rồi chia "VIP", "sắp rời bỏ", "ngủ đông". Làm được trên lý thuyết, nhưng cập nhật thủ công mỗi tháng thì không ai trụ nổi.
- **Funnel drop-off** — đo khách rơi rụng ở đâu giữa xem → thêm giỏ → thanh toán.
- **Market basket & dấu hiệu churn** — sản phẩm nào hay đi cùng nhau, khách nào đang phát tín hiệu sắp rời đi.

Mỗi cái trong số này, trong một bảng tính, là một dự án nửa ngày với rủi ro sai cao. Vì sao những phân tích này đáng giá đến thế, tôi đã mổ xẻ trong [hành vi khách hàng nói gì qua dữ liệu bán](/blog/du-lieu-ban/). *(Đây là năng lực định hướng; con số cụ thể tùy dữ liệu của bạn.)*

## 4. Hợp nhất đa kênh bằng copy-paste — vỡ thầm lặng khi đổi định dạng

Đời thực của nhà bán Việt: đơn rải ở **Shopee, TikTok Shop, KiotViet**, chi phí ads ở một file khác, tồn kho ở file thứ tư. Mỗi nơi xuất một file, cột tên khác nhau, định dạng ngày khác nhau. Cách "hợp nhất" trong bảng tính? Tải ba file về, copy-paste vào ba sheet, rồi gò một sheet tổng bằng `VLOOKUP`.

*Ví dụ minh hoạ:* tháng này chạy ngon. Tháng sau Shopee đổi nhẹ định dạng — đổi tên `Ngày đặt` thành `Thời gian đặt hàng`. `VLOOKUP` của bạn trỏ sai cột, doanh thu Shopee trong sheet tổng tụt về 0 hoặc nhân đôi, và **không có dòng báo lỗi nào.** Bạn chỉ phát hiện khi con số trông quá lạ — nếu may. Đây đúng là bài toán [hợp nhất Shopee + TikTok Shop + KiotViet về một mối](/blog/hop-nhat-da-kenh/) — và nó không phải việc của một công thức nối tay.

## 5. Công thức gãy, ô lỗi thầm lặng, và đụng trần khi lớn lên

Đây là chỗ nguy hiểm nhất của bảng tính: nó **không la làng khi sai.** Một ô gộp khiến máy đọc thành ô trống. Một dòng "Tổng tháng 5" chen giữa data bị pivot đếm thành một đơn. Một `SUM` quên kéo xuống thêm hàng mới.

*Ví dụ minh hoạ:* bạn kéo `=SUM(B2:B500)` từ tháng trước, nhưng tháng này có 540 đơn. 40 đơn cuối nằm ngoài vùng tính, doanh thu báo cáo thiếu vài chục triệu — và file vẫn xanh mướt, không một dấu hiệu cảnh báo.

Rồi hai cái trần đến rất nhanh khi bạn lớn lên. **Trần khối lượng:** qua vài chục nghìn dòng đơn, file bắt đầu ì — mở phải chờ tính lại, cuộn thì giật. Chính cái dashboard từng giúp bạn giờ thành thứ chậm chạp bạn ngại mở. **Trần nhiều người sửa:** ba bốn người cùng vào một file, chỉ cần một người kéo nhầm một cột là cả dashboard lệch mà không ai biết. Bảng tính không có khái niệm "ai được sửa gì".

## 6. Phân quyền: gửi nguyên file là lộ hết

Bạn muốn cho quản lý chi nhánh A xem doanh số của riêng chi nhánh A. Trong bảng tính, đơn vị chia sẻ là **cả file**. Gửi file đi là gửi *mọi thứ* — lương ở sheet ẩn, giá vốn, doanh số các chi nhánh khác. "Ẩn sheet" và "khoá ô" chỉ là rào chắn bằng giấy.

*Ví dụ minh hoạ:* bạn ẩn cột `Giá vốn` rồi gửi file cho đối tác xem doanh thu. Họ bỏ ẩn trong **ba giây**, và toàn bộ biên lợi nhuận của bạn nằm trong tay người ngoài. Phân quyền theo dòng dữ liệu — "người này chỉ thấy chi nhánh của họ" — đơn giản là không tồn tại trong mô hình một-file-cho-tất-cả.

## … những điều đó trong Semantix

Định vị Semantix dễ nhất bằng **phủ định**: nó **không bắt bạn bỏ Google Sheets**, không bắt dựng data warehouse (kho dữ liệu tập trung cho phân tích), không bắt học SQL. Semantix dựng **ngay trên chính Google Sheets bạn đang dùng** — sheet là *cánh cửa vào, không phải cái trần*.

Khác biệt cốt lõi nằm ở một thứ bảng tính không có: **"doanh thu" được định nghĩa đúng một lần** — gọi là [Semantic Layer](/blog/semantic-layer/). Bạn, kế toán và sếp hỏi cùng một câu sẽ ra **cùng một số**, vì cả ba đang hỏi cùng một định nghĩa, không phải ba pivot mỗi người kéo một kiểu. Một lần định nghĩa, dùng mãi mãi. Quy trình gọn lại còn ba bước:

1. **Kết nối** Google Sheets (hoặc Shopee, TikTok Shop, KiotViet) — không cài gì, không code. Ba sàn được [gộp (union) + làm sạch bằng bảng ảo ngay lúc bạn hỏi](/blog/bang-ao-gop-du-lieu/), dữ liệu ở lại nguồn — không copy về kho nào.
2. **Định nghĩa** các khái niệm nghiệp vụ một lần: doanh thu là gì, đơn hợp lệ là gì.
3. **Hỏi bằng tiếng Việt**: *"doanh thu TikTok tháng này tụt là do ít đơn hơn hay giỏ hàng nhỏ đi?"* → *"sản phẩm nào kéo mức giảm đó?"* → *"khách giảm mua là cũ hay mới?"* — cả chuỗi là một cuộc trò chuyện liền mạch, không dựng lại pivot nào.

Phân quyền theo dòng, gộp đa kênh bằng bảng ảo ngay lúc hỏi (không copy về kho), cảnh báo khi số liệu bất thường, và hỏi câu mới mà không gãy công thức — đó là những thứ bảng tính cấu trúc không cho được, không phải vì nó kém, mà vì nó sinh ra cho một bài toán khác. *(Muốn xem 4 bước cụ thể từ một sheet đơn hàng tới dashboard, đọc [Từ Google Sheets đến dashboard](/blog/google-sheets-dashboard/).)*

## Tóm lại

| Bảng tính (Excel / Sheets) | Semantix |
|---|---|
| Mỗi pivot một kiểu → ba người ba số | Định nghĩa **một lần**, ai hỏi cũng cùng số |
| Câu nằm ngoài cái đã dựng → tự dựng pivot mới | Hỏi tiếng Việt, trả lời tức thì |
| Drill-down: mỗi bước một pivot | Một chuỗi trò chuyện liền mạch |
| Cohort / RFM / Funnel / Churn: cực đau hoặc bất khả | Mỗi cái là một câu hỏi |
| Hợp nhất đa kênh: `VLOOKUP`, vỡ thầm lặng | Gộp bằng bảng ảo lúc hỏi, không copy về kho |
| Lỗi dữ liệu sai thầm lặng, không báo | Một nguồn sự thật được kiểm tra |
| Phân quyền: gửi nguyên file = lộ hết | Theo dòng — chỉ thấy phần của mình |
| Khối lượng lớn: ì, giật, treo | Không đụng trần khi lớn lên |

**Khi nào nên ở lại với Google Sheets?** Nếu bạn quy mô nhỏ, dữ liệu một nguồn duy nhất, một hai người dùng, và hỏi đi hỏi lại cùng khoảng **10 câu cố định không bao giờ đổi** — thì một dashboard Sheets dựng tốt là **đủ, và miễn phí.** Đừng vẽ rắn thêm chân. Bảng tính không phải kẻ thù; nó là điểm khởi đầu hoàn hảo, và là con dao đa năng bạn vẫn nên giữ trong túi.

Câu hỏi đúng không phải "bảng tính hay Semantix tốt hơn?" — mà là **"file của tôi đã có quá nhiều người, quá nhiều kênh, và quá nhiều câu hỏi mới chưa?"** Nếu rồi, bạn không cần một con dao to hơn. Một dashboard bảng tính trả lời được những câu của hôm qua; câu quyết định nhất của bạn luôn là câu của *tối nay* — câu bật ra khi thấy con số lạ, câu chưa ai kịp dựng nút bấm. *(Nếu bạn đang cân nhắc nhảy thẳng lên BI truyền thống, đọc trước [Semantix vs Power BI & Tableau](/blog/vs-powerbi-tableau/) — vì sao công cụ mạnh hơn lại trả lời được ít câu hỏi hơn.)*

---

*File Google Sheets của bạn đã sẵn sàng — không cần bỏ nó đi. [Dùng thử miễn phí ngay trên Google Sheets của bạn.](/docs/vi/free-trial/) Hỏi thử một câu nằm ngoài cái dashboard hiện tại — và xem nó trả lời trong vài giây.*
