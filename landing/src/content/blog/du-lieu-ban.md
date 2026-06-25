---
code: "kt-010"
title: "Dữ liệu bẩn: vì sao 80% thời gian 'phân tích' của bạn thật ra là dọn rác — chứ không phải phân tích"
description: "File Excel 12 sheet, mỗi nơi gọi 'doanh thu' một kiểu. Bạn tưởng mình thiếu AI thông minh. Thật ra là dữ liệu bẩn — phải dọn trước khi phân tích."
pubDate: 2025-01-11
category: "Kiến Thức Nền Tảng"
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/du-lieu-ban.svg"
coverAlt: "Các dòng dữ liệu lộn xộn, trùng lặp và lệch chuẩn được làm sạch thành một bảng gọn gàng"
---

Mở file báo cáo bán hàng cuối tháng. Mười hai sheet. Sheet bán hàng gọi kênh là "Shopee", sheet kế toán ghi "shopee", sheet kho viết tắt "SP". Cùng một sàn, ba cái tên — và phần mềm coi chúng là ba thứ khác nhau. Ngày tháng nơi `30/06/2026`, nơi `2026-06-30`, nơi lại là một con số `45838` mà Excel tự hiểu. Có 47 đơn xuất hiện hai lần vì hôm đó ai đó export trùng. Cột doanh thu vài dòng để trống.

Bạn ngồi xuống định "phân tích xem kênh nào lời nhất". Bốn tiếng sau, bạn vẫn chưa phân tích được gì — vẫn đang gộp tên kênh, xóa dòng trùng, sửa định dạng ngày. Phản xạ lúc này thường là: *"Giá mà có một công cụ AI đủ thông minh, hỏi phát ra số luôn."*

Đó là chẩn đoán sai. Bạn không thiếu công cụ phân tích. Bạn đang chết chìm trong **dữ liệu bẩn** — và không một con AI nào trên đời cứu được điều đó. **Rác vào, rác ra.**

## Dữ liệu bẩn là gì — và vì sao nó là nút thắt thật sự

Dữ liệu bẩn (*dirty data*) là dữ liệu sai, thiếu, trùng, hoặc không nhất quán đến mức không thể tin để ra quyết định. Nó không phải lỗi của một người cẩu thả — nó là hệ quả tự nhiên của việc dữ liệu sinh ra ở nhiều nơi, nhiều lúc, nhiều người nhập, không ai thống nhất quy ước.

Có một câu nói cũ trong giới kỹ thuật, gắn liền với máy tính từ thập niên 1950: **"garbage in, garbage out"** — rác vào, rác ra. Máy tính không có khả năng tự biết dữ liệu của bạn sai. Nó tính trung thực trên những gì bạn đưa vào. Đưa vào 47 đơn trùng, nó cộng đủ 47. Đưa vào "Shopee" và "SP" như hai kênh, nó báo cáo hai dòng.

Đây cũng là lý do có một con số đã thành huyền thoại trong ngành: các khảo sát nhiều năm liền cho thấy **người làm dữ liệu tiêu khoảng 80% thời gian chỉ để chuẩn bị và làm sạch dữ liệu**, chỉ 20% còn lại mới thật sự là phân tích. Cái bạn gọi là "phân tích" — phần lớn là dọn rác.

> Quy tắc vàng: không có công cụ phân tích nào thông minh hơn dữ liệu bạn đưa vào nó. Làm sạch nguồn trước, hỏi sau.

Hãy hình dung thế này. Dữ liệu bẩn giống nguyên liệu ôi trong bếp — bạn có thuê đầu bếp ba sao Michelin về, món ăn vẫn hỏng. AI thông minh chỉ là một đầu bếp giỏi hơn. Nó nấu nhanh hơn, trình bày đẹp hơn, nhưng nó không biến cá ươn thành cá tươi. Vấn đề không nằm ở người nấu — nó nằm ở cái chợ bạn đi.

## "Shopee", "shopee", "SP" — khi một thứ mang ba cái tên

Đây là loại bẩn âm thầm nhất: **thiếu chuẩn hóa tên**. Cùng một thực thể được viết theo nhiều cách, và máy coi mỗi cách là một đối tượng riêng.

*Ví dụ minh hoạ:* shop của bạn bán trên ba sàn. Khi gộp dữ liệu, hệ thống đếm ra "5 kênh": Shopee, shopee, SP, TikTok Shop, Tiktok. Báo cáo chia doanh thu thành 5 dòng, không dòng nào phản ánh đúng thực tế. Bạn nhìn vào và kết luận "Shopee chỉ đóng góp 28% doanh thu" — trong khi cộng cả ba biến thể lại, con số thật là **51%**. Một quyết định cắt ngân sách kênh có thể ra đời từ chính sai lệch này.

Tên khách hàng, tên sản phẩm, tên tỉnh thành — chỗ nào con người gõ tay, chỗ đó sinh biến thể. "Tp. HCM", "TPHCM", "Hồ Chí Minh", "Sài Gòn" là bốn cái tên cho một thành phố. Nếu việc gộp nhiều nguồn này là cơn đau đầu thường trực của bạn, đó đúng là bài toán mà việc [hợp nhất dữ liệu đa kênh](/blog/hop-nhat-da-kenh/) sinh ra để giải.

## Ngày tháng và tiền tệ — nơi sai số trông giống số đúng nhất

Định dạng sai là loại bẩn nguy hiểm vì nó không báo lỗi. Số vẫn ra, bảng vẫn đẹp, chỉ là sai.

*Ví dụ minh hoạ:* file của bạn trộn hai kiểu ngày — kiểu Việt `03/04/2026` (3 tháng 4) và kiểu Mỹ mà một công cụ nước ngoài tự hiểu là `April 3` hay `March 4` tùy lúc. Khi lọc "doanh thu quý 2", một phần đơn tháng 4 bị xếp nhầm sang tháng 3, một phần biến mất. Con số quý 2 lệch **15–20%** so với thực tế — và không có một dòng cảnh báo nào.

Tiền tệ còn tinh vi hơn. *Ví dụ minh hoạ:* cột doanh thu trộn `4,2 tỷ` (dấu phẩy kiểu Việt là phần thập phân), `4.200.000.000`, và vài dòng nhập nhầm đơn vị nghìn đồng. Khi máy cộng dồn, một dòng đáng lẽ 4,2 tỷ bị đọc thành 42, vài dòng nghìn đồng bị nhân lên triệu lần. Tổng cuối cùng vô nghĩa — nhưng vẫn là một con số tròn trịa, đủ để mang vào phòng họp.

## NULL, trùng lặp, và những khoảng trống biết nói dối

**Dòng trùng lặp** thổi phồng mọi thứ. Một lần export lỗi, 200 đơn bị nhân đôi, và đột nhiên doanh thu tháng "tăng trưởng" 18%. Bạn ăn mừng một con số không có thật.

**Giá trị thiếu (NULL)** thì âm thầm theo chiều ngược lại. *Ví dụ minh hoạ:* 12% đơn hàng thiếu thông tin chi phí vận chuyển. Khi tính lợi nhuận, những đơn đó được coi như chi phí ship bằng 0. Biên lợi nhuận báo cáo đẹp hơn thực tế vài điểm phần trăm — đủ để bạn tưởng một sản phẩm đang lời trong khi nó đang lỗ.

Vấn đề chung của cả ba — trùng, thiếu, lệch — là chúng **không tự lộ diện**. Database không từ chối một con số sai như cách nó từ chối một câu lệnh sai cú pháp. Nó nhận tất, tính tất, trả về một kết quả trông hoàn toàn bình thường. Giống như xây nhà trên nền đất lún: tường vẫn thẳng, sơn vẫn đẹp, vết nứt chỉ hiện ra khi đã quá muộn.

## "Doanh thu" của bạn nghĩa là gì — và vì sao đây là loại bẩn tệ nhất

Có một loại dữ liệu bẩn không nằm trong dữ liệu, mà nằm trong **định nghĩa**: một khái niệm, nhiều nghĩa.

*Ví dụ minh hoạ:* sheet bán hàng tính "doanh thu" gồm cả đơn chưa giao. Kế toán trừ đơn hoàn. Kho tính theo số lượng xuất quy ra tiền. Ba người, ba con số cho cùng một từ "doanh thu", chênh nhau **67 triệu** trong một tháng — và ai cũng đúng theo file của mình. Đây là loại bẩn tệ nhất vì nó không sửa được bằng cách lau dữ liệu. Bạn có thể chuẩn hóa mọi cái tên, sửa mọi định dạng ngày, xóa mọi dòng trùng — và vẫn nhận ba con số doanh thu khác nhau, vì gốc rễ là ba định nghĩa khác nhau.

Hồi làm trưởng nhóm dữ liệu ở một công ty công nghệ lõi của một hệ sinh thái e-commerce, tôi gặp đúng cái bẫy này theo cách đắt nhất. Doanh thu mà team marketing nhìn được tính theo *ngày đặt đơn*; còn kế toán chỉ ghi nhận khi đơn giao thành công, đã trừ hoàn và huỷ. Hai con số cho cùng một từ "doanh thu", lệch nhau hẳn một khoảng — và cả hai đều không sai, chỉ là định nghĩa khác nhau. Tệ hơn, hệ tracking kiểu Google Analytics không hề bắt các event vận hành về sau như vận chuyển hay hoàn/huỷ, nên gap đó càng giãn ra mà chẳng ai thấy. Bài học tôi rút ra: trước khi cãi nhau con số nào đúng, hãy thống nhất "doanh thu" *nghĩa là gì* đã.

Đây chính là khoảng trống mà một [Semantic Layer — tầng định nghĩa nghiệp vụ dùng chung](/blog/semantic-layer/) sinh ra để bịt: định nghĩa "doanh thu" *một lần*, chuẩn xác, để ai hỏi cũng ra cùng một số. Không phải ngẫu nhiên mà các nền tảng dữ liệu hiện đại như dbt hay Cube đều đặt việc định nghĩa chỉ-một-lần vào trung tâm kiến trúc của họ.

## Dọn dữ liệu trong Semantix

Nói thẳng để khỏi hiểu lầm: Semantix **không phải** một con chatbot cắm vào database rồi đoán mò câu trả lời. Một chatbot như vậy, đặt lên dữ liệu bẩn, chỉ giúp bạn ra số sai *nhanh hơn*. Cách tiếp cận đi ngược lại — sửa nguồn trước, hỏi sau:

1. **Kết nối nguồn** — Shopee, TikTok Shop, KiotViet, Google Sheets — rồi [gộp (union) + làm sạch bằng bảng ảo ngay lúc hỏi](/blog/bang-ao-gop-du-lieu/), không copy dữ liệu về kho nào nên số luôn ở nguồn và mới, hết cảnh export trùng và copy-paste tay.
2. **Chuẩn hóa và định nghĩa một lần** trong Semantic Layer: "Shopee" và "SP" được gộp về một kênh, ngày tháng quy về một định dạng, và "doanh thu" có *một* định nghĩa duy nhất cho cả tổ chức.
3. **Hỏi bằng tiếng Việt** — và vì lớp bên dưới đã sạch, câu trả lời đứng trên nền vững, không phải trên đất lún.

Nói cách khác, cái thông minh không nằm ở chỗ AI viết câu trả lời đẹp, mà ở chỗ nó được hỏi *trên dữ liệu đã sạch và đã có định nghĩa rõ*. Đó cũng là vì sao một câu hỏi tiếng Việt biến thành đúng truy vấn lại khó hơn vẻ ngoài — chúng tôi bàn kỹ trong bài [Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi mà vẫn trả về số sai](/blog/text-to-sql/).

## Tóm lại

| Dữ liệu bẩn | Dữ liệu sạch |
|---|---|
| "Shopee", "shopee", "SP" là 3 kênh | Một kênh, một cái tên chuẩn |
| Ngày tháng trộn nhiều định dạng | Một định dạng quy chuẩn |
| Đơn trùng thổi phồng doanh thu | Mỗi giao dịch đúng một lần |
| NULL âm thầm bóp méo lợi nhuận | Giá trị thiếu được xử lý có chủ đích |
| "Doanh thu" có ba nghĩa | "Doanh thu" định nghĩa một lần |
| AI giỏi vẫn trả số sai | AI đứng trên nền dữ liệu vững |

Lần tới khi bạn thấy mình ngồi bốn tiếng "phân tích" mà chưa rút ra một kết luận nào, hãy đặt lại câu hỏi. Vấn đề có thể không phải là bạn thiếu một công cụ thông minh hơn — mà là bạn đang đổ công sức vào sai chỗ. Công cụ thông minh nhất thế giới, đặt lên dữ liệu bẩn, vẫn chỉ cho bạn rác — chỉ là rác đẹp hơn. Hãy dọn cái chợ trước khi thuê đầu bếp.

---

*Mới tìm hiểu và muốn thấy dữ liệu sạch trông ra sao? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc nếu đang đau đầu vì số liệu nằm rải nhiều nơi, đọc tiếp [Semantic Layer là gì — lớp nền giúp mọi con số khớp nhau](/blog/semantic-layer/).*
