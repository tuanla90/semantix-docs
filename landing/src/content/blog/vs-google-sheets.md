---
title: "Semantix vs Google Sheets: đối thủ thật của BI không phải Power BI - mà là file bảng tính chỉ trả lời được câu của người làm ra nó"
code: "ss-006"
description: "Họp sáng thứ Hai, ba người đọc ba con số doanh thu từ cùng một file. Khi nào bảng tính Excel/Google Sheets hết gánh nổi - và câu hỏi tiếp theo bạn chưa kịp hỏi."
pubDate: 2026-06-29
category: "So Sánh & Lựa Chọn"
readTime: 12
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/vs-google-sheets.png"
coverAlt: "Một bảng tính tĩnh với dấu hỏi nằm ngoài khung, mũi tên chuyển sang câu hỏi tiếng Việt cho ra câu trả lời động"
---

10 giờ tối. Bạn ngồi xem cái dashboard Google Sheets mình dựng cả tuần mới xong - đẹp, gọn, mười mấy biểu đồ tự cập nhật. Rồi mắt dừng lại ở một con số lạ: **doanh thu TikTok Shop tuần này tụt 18%.** Trong đầu bật ra ngay: tụt là vì ít đơn hơn, hay vì khách mua giỏ nhỏ đi?

Bạn dò lại cả dashboard. Chẳng biểu đồ nào trả lời câu đó - vì lúc dựng, bạn có nghĩ tới nó đâu. Thế là 10 giờ tối, bạn mở tab mới, kéo pivot, gõ `=AVERAGEIF`, lọc tay theo kênh theo tuần. Nửa tiếng sau có câu trả lời - và cũng vừa kịp quên mất mình định hỏi gì tiếp.

Đây là lúc lộ ra điều ít người chịu tin: **đối thủ thật của một công cụ BI không phải Power BI hay Tableau - mà là chính file bảng tính bạn đang mở.** Một dashboard bảng tính, dù bạn tự dựng hay mua template, chỉ trả lời được đúng những câu mà người làm ra nó đã nghĩ tới trước. Mà giá trị thật của phân tích lại nằm ở **câu hỏi tiếp theo bạn chưa kịp hỏi** - cái câu bật ra lúc 10 giờ tối khi thấy một con số lạ.

## Vì sao bảng tính "gánh" được rất lâu - và vì sao đó là cái bẫy

Phải nói sòng phẳng: Excel với Google Sheets quá hay. Một ô trống có thể là tiền, là ngày, là ghi chú, là công thức, là một mẩu danh sách. Mở lên là dùng được ngay, khỏi học mô hình dữ liệu, khỏi xin ai cấp quyền. Chính cái tiện đó khiến nó **gánh được rất lâu** - phần lớn doanh nghiệp Việt chạy cả năm trời chỉ trên bảng tính, và ở giai đoạn đầu đó là lựa chọn đúng.

Nhưng có cái nghịch lý này: đúng cái làm bảng tính tiện hôm nay lại là cái làm nó thành gánh nặng ngày mai. Một ô muốn là gì cũng được, nên chẳng gì ép nó nhất quán. Ai cũng sửa được, nên chẳng gì giữ một định nghĩa đứng yên. Cái tự do mình mê ở quy mô nhỏ, lớn lên thành mớ hỗn loạn không ai gỡ nổi.

> Bảng tính giống cái xe máy - chở đủ thứ trong đời sống hằng ngày, tiện vô cùng. Nhưng tới lúc phải chở hàng tấn cho cả công ty, bạn cần một chiếc xe tải, chứ không phải một con xe máy to hơn.

Bảng tính không thua vì yếu. Nó thua vì quá vạn năng - cái gì cũng làm được, nên chẳng cái gì là một nguồn sự thật. Dưới đây là mấy chỗ nó bắt đầu hụt hơi, không phải vì Sheets dở, mà vì nó vốn sinh ra cho việc khác.

Mình nói từ kinh nghiệm tự tay xây. Làm tư vấn chuyển đổi số ngoài giờ, hành trình công cụ của mình đi đúng cái đường cong đó: khởi đầu bằng Google Sheets, lớn lên chuyển qua AppSheet, giờ là Nocobase. Mình dựng cơ sở dữ liệu cho khách đủ ngành - bán hàng, kho, xuất nhập khẩu, may mặc in ấn, cả phòng khám - lần nào cũng tới đúng một điểm: Sheets không gãy vì thiếu công thức, nó gãy vì không ai ép được một định nghĩa đứng yên khi nhiều người cùng sửa. Chuyện đầy đủ mình kể trong [hành trình thời Excel](/blog/hanh-trinh-thoi-excel/).

## 1. Một khái niệm, ba định nghĩa - vì sao ba người ra ba số

Họp sáng thứ Hai. Anh chủ chuỗi mở cái file quen thuộc - mười mấy sheet, mỗi sheet một kênh, một tháng. Bạn marketing đọc doanh thu tháng này **1,2 tỷ**. Bạn kế toán lắc đầu: **1,08 tỷ** chứ, em vừa kéo lại. Anh chủ thì nhớ con số **1,15 tỷ** trong sheet tổng hợp tuần trước. Ba người, ba số, cùng một file.

Phản xạ đầu là nghĩ chắc ai đó kéo nhầm. Nhưng chẳng ai sai - vấn đề là chữ "doanh thu" trong file đó **chưa bao giờ được định nghĩa cho dứt khoát một lần.** Sheet có cột `Tổng tiền` và cột `Đã thu`. Người thì cộng trên `Tổng tiền`, người cộng trên `Đã thu`, người lọc thêm "trạng thái = hoàn thành" rồi mới cộng. Ba người đều thành thật, ba con số lệch nhau cả chục phần trăm, mà không cách nào biết ai đúng - vì có ai làm chuẩn đâu.

Tệ hơn: mấy định nghĩa đó nằm giấu trong các ô. Một `=SUMIFS` lồng ba tầng ở ô `M2` mà cả đời bạn không mở ra đọc. Mua một file template dựng sẵn thì còn lãnh nguyên giả định của người làm ra nó: họ tính doanh thu theo đơn đã đặt hay đã giao? Có trừ đơn hoàn, trừ phí sàn không? Bạn chẳng biết - mà vẫn đang quyết định dựa trên một định nghĩa chưa bao giờ nhìn thấy mặt.

## 2. Dashboard tĩnh chỉ trả câu đã đoán trước - còn phân tích thật là một chuỗi đào sâu

Một template bán sẵn thường có mười, mười lăm biểu đồ dựng sẵn: doanh thu theo ngày, top sản phẩm, tỷ lệ theo kênh. Đẹp, đủ cho cái nhìn tổng quan. Nhưng phân tích thật không sống ở cái nhìn tổng quan. Nó sống ở đúng cái khoảnh khắc bạn thấy một con số lệch và buột miệng "ủa, sao kỳ vậy?".

Người giỏi đọc dữ liệu chưa bao giờ chỉ liếc một dashboard rồi xong. Họ đi một chuỗi: thấy bất thường, hỏi vì sao, tách theo nhóm, khoan vào nhóm tệ nhất, so với kỳ trước, rồi lần ra nguyên nhân. Mỗi mũi tên trong cái chuỗi đó, ở Google Sheets, là một pivot mới hoặc một công thức mới. Năm bước là năm lần dựng lại, năm lần đứt mạch suy nghĩ. Tới bước thứ tư thì bạn đã quên mình xuất phát từ câu hỏi nào.

Người không rành pivot thì tắc ngay từ câu thứ hai. Bạn thấy doanh thu TikTok tụt **18%** và muốn khoan tiếp: vì ít đơn hay vì giỏ hàng nhỏ đi, rồi sản phẩm nào kéo cả mức giảm, rồi khách giảm mua là khách cũ hay mới? Câu thứ ba thường tắc luôn, vì sheet còn chẳng có cờ phân biệt khách cũ với mới. Với một template, mỗi câu nằm ngoài kịch bản là một lần ngồi dựng lại từ đầu.

## 3. Có những phân tích bảng tính chịu thua - hoặc làm được nhưng đau lắm

Cả một lớp phân tích mà bảng tính gần như bó tay, vì chúng cần ghép nhiều bảng và truy vấn nhiều bước - thứ Sheets vốn không sinh ra để làm:

- **Cohort retention** - gom khách theo tháng mua đầu, rồi theo dõi từng nhóm rụng dần qua các tháng. Trong Sheets, đây là địa ngục công thức mảng.
- **RFM segmentation** - chấm điểm từng khách theo độ gần đây, tần suất, giá trị, rồi chia "VIP", "sắp rời bỏ", "ngủ đông". Lý thuyết thì làm được, nhưng cập nhật tay mỗi tháng thì không ai trụ nổi.
- **Funnel** - đo khách rơi rụng ở đâu giữa xem, thêm giỏ, thanh toán.
- **Giỏ hàng đi cùng nhau & dấu hiệu rời bỏ** - sản phẩm nào hay mua kèm, khách nào đang phát tín hiệu sắp đi.

Mỗi cái trong đám này, làm trong một bảng tính là một dự án nửa ngày với rủi ro sai cao. Vì sao chúng đáng giá đến vậy, mình mổ kỹ trong [hành vi khách hàng nói gì qua dữ liệu bán](/blog/du-lieu-ban/).

## 4. Hợp nhất đa kênh bằng copy-paste - vỡ thầm lặng khi đổi định dạng

Đời thực của nhà bán Việt: đơn rải ở **Shopee, TikTok Shop, KiotViet**, chi phí ads ở một file khác, tồn kho ở file thứ tư. Mỗi nơi xuất một kiểu, tên cột khác nhau, định dạng ngày khác nhau. Cách "hợp nhất" trong bảng tính là tải ba file về, dán vào ba sheet, rồi gò một sheet tổng bằng `VLOOKUP`.

Tháng này chạy ngon. Tháng sau Shopee đổi nhẹ định dạng - `Ngày đặt` thành `Thời gian đặt hàng`. `VLOOKUP` trỏ sai cột, doanh thu Shopee trong sheet tổng tụt về 0 hoặc nhân đôi, mà chẳng có một dòng báo lỗi. Bạn chỉ phát hiện khi con số trông quá lạ - nếu may. Đúng cái bài toán [gộp Shopee + TikTok Shop + KiotViet về một mối](/blog/hop-nhat-da-kenh/), và nó không phải việc của một công thức nối tay.

## 5. Công thức gãy, ô lỗi im ru, và đụng trần khi lớn lên

Chỗ nguy hiểm nhất của bảng tính: nó **không la làng khi sai.** Một ô gộp khiến máy đọc thành ô trống. Một dòng "Tổng tháng 5" chen giữa data bị pivot đếm thành một đơn. Một `SUM` quên kéo xuống mấy hàng mới thêm.

Bạn kéo `=SUM(B2:B500)` từ tháng trước, nhưng tháng này có 540 đơn. 40 đơn cuối nằm ngoài vùng tính, doanh thu báo cáo thiếu mất vài chục triệu - mà file vẫn xanh mướt, không một dấu hiệu cảnh báo.

Rồi hai cái trần tới rất nhanh khi bạn lớn lên. **Trần khối lượng:** qua vài chục nghìn dòng đơn, file bắt đầu ì - mở phải chờ, cuộn thì giật. Chính cái dashboard từng giúp bạn giờ thành thứ chậm chạp bạn ngại mở. **Trần nhiều người sửa:** ba bốn người cùng vào một file, chỉ cần một người kéo nhầm một cột là cả dashboard lệch mà không ai biết. Bảng tính làm gì có khái niệm "ai được sửa gì".

## 6. Phân quyền: gửi nguyên file là lộ sạch

Bạn muốn cho quản lý chi nhánh A xem doanh số riêng chi nhánh A. Nhưng trong bảng tính, đơn vị chia sẻ là **cả file**. Gửi file đi là gửi luôn mọi thứ - lương ở sheet ẩn, giá vốn, doanh số mấy chi nhánh khác. "Ẩn sheet" với "khoá ô" chỉ là rào chắn bằng giấy.

Bạn ẩn cột `Giá vốn` rồi gửi file cho đối tác xem doanh thu. Họ bỏ ẩn trong ba giây, và toàn bộ biên lợi nhuận của bạn nằm gọn trong tay người ngoài. Phân quyền theo dòng - "người này chỉ thấy chi nhánh của họ" - đơn giản là không tồn tại trong cái mô hình một-file-cho-tất-cả.

## ... còn trong Semantix thì sao

Thứ mình đang xây - gọi là Semantix - dễ định vị nhất bằng **phủ định**: nó **không bắt bạn bỏ Google Sheets**, không bắt dựng kho dữ liệu, không bắt học SQL. Nó dựng ngay trên chính Google Sheets bạn đang dùng - cái sheet là cánh cửa vào, không phải cái trần.

Khác biệt cốt lõi nằm ở một thứ bảng tính không có: **"doanh thu" được định nghĩa đúng một lần** - cái này gọi là [Semantic Layer](/blog/semantic-layer/). Bạn, kế toán và sếp hỏi cùng một câu sẽ ra cùng một số, vì cả ba đang hỏi cùng một định nghĩa, chứ không phải ba pivot mỗi người kéo một kiểu. Định nghĩa một lần, dùng mãi. Quy trình gọn còn ba bước:

1. **Kết nối** Google Sheets (hoặc Shopee, TikTok Shop, KiotViet) - không cài gì, không code. Ba sàn được [gộp và làm sạch bằng bảng ảo ngay lúc bạn hỏi](/blog/bang-ao-gop-du-lieu/), dữ liệu ở lại nguồn, không copy về kho nào.
2. **Định nghĩa** các khái niệm nghiệp vụ một lần: doanh thu là gì, đơn hợp lệ là gì.
3. **Hỏi bằng tiếng Việt**: "doanh thu TikTok tháng này tụt là vì ít đơn hay vì giỏ hàng nhỏ đi?" rồi "sản phẩm nào kéo mức giảm đó?" rồi "khách giảm mua là cũ hay mới?" - cả chuỗi là một cuộc trò chuyện liền mạch, không phải dựng lại pivot nào.

Phân quyền theo dòng, gộp đa kênh bằng bảng ảo ngay lúc hỏi, cảnh báo khi số bất thường, hỏi câu mới mà không gãy công thức - mấy thứ đó bảng tính không cho được, không phải vì nó kém, mà vì nó sinh ra cho một bài toán khác. *(Muốn xem 4 bước cụ thể từ một sheet đơn hàng tới dashboard, đọc [Từ Google Sheets đến dashboard](/blog/google-sheets-dashboard/).)*

## Tóm lại

| Bảng tính (Excel / Sheets) | Semantix |
|---|---|
| Mỗi pivot một kiểu → ba người ba số | Định nghĩa **một lần**, ai hỏi cũng cùng số |
| Câu nằm ngoài cái đã dựng → tự dựng pivot mới | Hỏi tiếng Việt, trả lời tức thì |
| Drill-down: mỗi bước một pivot | Một chuỗi trò chuyện liền mạch |
| Cohort / RFM / Funnel / Churn: cực đau hoặc bất khả | Mỗi cái là một câu hỏi |
| Hợp nhất đa kênh: `VLOOKUP`, vỡ thầm lặng | Gộp bằng bảng ảo lúc hỏi, không copy về kho |
| Lỗi dữ liệu sai thầm lặng, không báo | Một nguồn sự thật được kiểm tra |
| Phân quyền: gửi nguyên file = lộ hết | Theo dòng - chỉ thấy phần của mình |
| Khối lượng lớn: ì, giật, treo | Không đụng trần khi lớn lên |

**Khi nào nên ở lại với Google Sheets?** Nếu bạn quy mô nhỏ, dữ liệu một nguồn, một hai người dùng, hỏi đi hỏi lại cùng chục câu cố định không bao giờ đổi - thì một dashboard Sheets dựng tốt là **đủ, và miễn phí.** Đừng vẽ rắn thêm chân. Bảng tính không phải kẻ thù; nó là điểm khởi đầu hoàn hảo, là cái xe máy bạn vẫn nên giữ để chạy mỗi ngày.

Câu hỏi đúng không phải "bảng tính hay Semantix tốt hơn?" - mà là **"file của mình đã có quá nhiều người, quá nhiều kênh, quá nhiều câu hỏi mới chưa?"** Nếu rồi, bạn không cần một con xe máy to hơn. Một dashboard bảng tính trả được những câu của hôm qua; còn câu quyết định nhất của bạn luôn là câu của *tối nay* - cái câu bật ra khi thấy con số lạ, câu chưa ai kịp dựng sẵn nút bấm. *(Nếu đang tính nhảy thẳng lên BI truyền thống, đọc trước [Semantix vs Power BI & Tableau](/blog/vs-powerbi-tableau/) - vì sao công cụ mạnh hơn lại trả lời được ít câu hỏi hơn.)*

---

*File Google Sheets của bạn đã sẵn sàng - không cần bỏ nó đi. [Dùng thử miễn phí ngay trên Google Sheets của bạn.](/docs/vi/free-trial/) Hỏi thử một câu nằm ngoài cái dashboard hiện tại - và xem nó trả lời trong vài giây.*
