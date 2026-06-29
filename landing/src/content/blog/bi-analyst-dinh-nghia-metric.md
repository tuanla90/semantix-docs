---
title: "BI analyst thời AI: vì sao công việc thật của bạn không phải viết SQL - mà là định nghĩa sự thật một lần cho cả công ty"
code: "uc-003"
description: "Chị Linh mở LinkedIn, thấy tin 'AI viết SQL trong 3 giây'. Tim hụt một nhịp. Rồi chị nhận ra: thứ AI làm được không phải việc khó nhất của chị."
pubDate: 2026-03-15
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/bi-analyst-dinh-nghia-metric.svg"
coverAlt: "Một khối định nghĩa metric ở giữa, nhiều người dùng truy vấn xung quanh đều rút về cùng một con số"
---

*Lưu ý: chị Linh dưới đây là chân dung minh họa, dựng từ nhiều BI analyst chúng tôi từng làm việc cùng - không phải một người cụ thể. Các con số là ví dụ để bạn hình dung, không phải số liệu thật của bất kỳ ai.*

8 giờ sáng, chị Linh - BI analyst (Business Intelligence - biến dữ liệu thành quyết định; analyst là chuyên viên phân tích dữ liệu) bốn năm kinh nghiệm tại một công ty thương mại điện tử tầm trung - mở LinkedIn và thấy cái tiêu đề ai cũng share tuần đó: *"AI viết SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) trong 3 giây, BI analyst sắp thành dĩ vãng."* Tim chị hụt một nhịp. Bốn năm chị sống bằng nghề viết truy vấn. Nếu một con AI làm được điều đó trong ba giây, thì chị còn lại gì?

Phản xạ đầu tiên rất tự nhiên: *"Vậy là xong, nghề mình sắp bị thay."* Nhưng đây mới là chỗ ngược đời mà chị chỉ nhận ra sau vài tuần ngồi nghĩ kỹ: **AI viết được SQL không có nghĩa là AI làm được việc của chị. Việc thật của một BI analyst chưa bao giờ là gõ `SELECT` - mà là biết "doanh thu" thực sự nghĩa là gì, và định nghĩa nó đúng một lần cho cả công ty tin theo.** Cái thứ nhất, máy làm được. Cái thứ hai, vẫn là người.

## Vấn đề gốc: analyst là cái nút cổ chai, và ai cũng phải xếp hàng

Hãy nhìn rõ một ngày của chị Linh trước đã. Không phải chị thiếu việc - chị ngập việc. Nhưng phần lớn là việc gì?

Sếp Marketing nhắn: *"Cho chị doanh thu chiến dịch Tết theo kênh."* Phòng Vận hành nhắn: *"Tỷ lệ hoàn đơn tháng này so tháng trước?"* CEO nhắn lúc 9 giờ tối: *"Khách quay lại mua lần hai chiếm bao nhiêu phần trăm?"* Mỗi câu hỏi, chị mở lại cơ sở dữ liệu, viết một truy vấn, kiểm tra, xuất ra, dán vào Slack. Nhanh thì mười lăm phút. Gặp lúc ba người hỏi cùng lúc thì có câu phải chờ sang chiều.

Đây là sự thật ít người trong nghề chịu nói thẳng: **80% thời gian của một BI analyst không trôi vào phân tích sâu, mà vào việc làm "máy dịch" giữa câu hỏi tiếng người và câu lệnh SQL.** Mỗi câu hỏi của cả công ty đều phải đi qua một người. Người đó là nút cổ chai. Và khi nút cổ chai nghỉ phép, cả công ty mù số.

Tệ hơn: vì mọi truy vấn đều viết ad-hoc (làm rời rạc theo từng yêu cầu, không theo chuẩn chung), mỗi người lại định nghĩa "doanh thu" hơi khác nhau một chút. Bạn analyst A tính cả đơn chờ hoàn. Bạn B trừ ra. Hai báo cáo, hai con số, cùng một cái tên. (Vì sao một công ty lại có ba con số doanh thu mà không số nào sai, chúng tôi mổ xẻ riêng trong bài [Semantic Layer là gì](/blog/semantic-layer/).)

Cái này tôi không đọc trong sách. Hồi còn làm vận hành, tôi tự học SQL chỉ để "đọc số tìm chỗ hỏng" - và đúng vào lúc cần nhất thì gặp cảnh ba người mang ba con số doanh thu vào một cuộc họp, không số nào sai cú pháp, mà chẳng số nào khớp nhau. Lý do duy nhất: chưa ai định nghĩa "doanh thu" một lần cho cả công ty tin theo. Hôm đó tôi hiểu nút cổ chai thật ra không phải tốc độ gõ query, mà là việc cả tổ chức thiếu **một nguồn sự thật chung** - thứ tôi gọi đúng tên trong bài [Một nguồn sự thật](/blog/mot-nguon-su-that/).

## Sự thật ngược đời: phần AI làm được là phần dễ

Khi AI viết được SQL, nó lấy đi đúng cái phần lặp đi lặp lại kia - phần "máy dịch". Và nếu công việc của chị Linh *chỉ* là dịch câu hỏi thành truy vấn, thì đúng, chị nên lo.

Nhưng thử nghĩ kỹ chuyện gì xảy ra khi bạn cho AI cắm thẳng vào database rồi bảo nó tự viết SQL. Nó sẽ viết - gần như không bao giờ sai cú pháp. Nhưng nó *đoán* "doanh thu" là cột nào, có trừ phí sàn không, đơn hoàn tính hay không. Câu lệnh chạy ngon lành, ra một con số trông rất thuyết phục, và sai. (Cơ chế của cái bẫy "SQL đúng, số sai" này, đọc thêm [Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi - mà vẫn trả về số sai](/blog/text-to-sql/).)

Vậy ai dạy AI rằng "doanh thu thực" của công ty này là *đã trừ phí sàn, chỉ tính đơn thành công, không gồm đơn nội bộ*? Không phải model. **Là chị Linh.** Phần khó nhất chưa bao giờ là viết câu lệnh - mà là biết câu lệnh đó *nên* tính cái gì. Đó là tri thức nghiệp vụ nằm trong đầu chị, thứ một con AND/OR thuần túy không tự sinh ra được.

> Quy tắc vàng: AI giỏi *trả lời* câu hỏi. Nó dở tệ ở việc *biết câu trả lời đúng trông như thế nào*. Phần thứ hai là định nghĩa - và định nghĩa là việc của con người.

## Bước nhảy: từ người chạy query thành người định nghĩa sự thật

Đây là chỗ nghề của chị Linh không chết đi, mà *lên một tầng*. Thay vì viết lại định nghĩa "doanh thu" trong từng truy vấn rời rạc, chị định nghĩa nó **đúng một lần** trong một lớp gọi là Semantic Layer (tầng định nghĩa nghiệp vụ dùng chung) - lớp ngữ nghĩa nằm giữa câu hỏi và database.

Hãy hình dung Semantic Layer như **cuốn từ điển nghiệp vụ chính thức của công ty.** Trong đó chị Linh ghi: "Doanh thu thực" = tổng giá trị đơn thành công, trừ phí sàn, loại đơn hoàn và đơn test. "Khách quay lại" = khách có từ hai đơn ở hai tháng khác nhau. "Tỷ lệ hoàn" = số đơn hoàn chia tổng đơn giao. Mỗi khái niệm, một định nghĩa, viết một lần.

Từ giây phút đó, mọi câu hỏi - dù do người hỏi hay do AI dịch - đều tra cùng cuốn từ điển ấy. Marketing hỏi "doanh thu Tết", Vận hành hỏi "doanh thu theo kho", CEO hỏi "doanh thu sau phí" - cả ba rút về **cùng một định nghĩa**, nên không bao giờ lệch nhau. Chị Linh không còn viết truy vấn thứ một nghìn lẻ một. Chị viết cái *luật* mà cả nghìn truy vấn sau đó phải tuân theo.

*Ví dụ minh họa một tuần điển hình kiểu cũ:* chị nhận 40 yêu cầu báo cáo, mỗi cái mười lăm phút đến một tiếng, hết veo tuần. Kiểu mới: chị bỏ hai ngày định nghĩa chuẩn 30 metric (con số đo được) cốt lõi trong Semantic Layer, rồi 40 yêu cầu kia tự phục vụ được hết - còn chị rảnh tay đào cái câu hỏi mà trước giờ không ai có thời gian trả lời: *"Nhóm khách nào đang âm thầm rời bỏ?"* - đúng kiểu câu hỏi mà [dashboard toàn màu xanh vẫn không trả lời được khi ta chỉ nhìn chỉ số doanh nghiệp mà quên chỉ số khách hàng](/blog/business-metrics-vs-customer-metrics/).

## AI phục vụ self-service (tự phục vụ - người làm kinh doanh tự hỏi và tự có câu trả lời) - và analyst là kiến trúc sư phía sau

Khi cuốn từ điển đã có, chuyện đẹp xảy ra: cả công ty tự hỏi được mà không cần gõ cửa chị Linh.

Sếp Marketing tự gõ vào ô chat *"doanh thu thực chiến dịch Tết theo kênh"* và nhận số trong vài giây - vì AI không phải đoán "doanh thu thực" là gì, nó tra định nghĩa chị Linh đã viết. CEO lúc 9 giờ tối tự hỏi "tỷ lệ khách quay lại" mà không phải đợi đến sáng. Nút cổ chai biến mất. (Đây đúng là khác biệt giữa một Semantic Layer nghiêm túc và một con chatbot cắm thẳng DB rồi đoán mò - chúng tôi so sánh kỹ trong [Semantic Layer vs chatbot cắm thẳng database](/blog/semantic-layer-vs-chatbot-database/).)

Còn chị Linh? Chị không bị tiễn về. Chị lên tầng **kiến trúc sư của sự thật**: người quyết định công ty đo lường cái gì, đo thế nào, và đảm bảo mọi con số mọi người nhìn thấy đều nhất quán. Ẩn dụ khác cho dễ hình dung: trước đây chị là thủ thư phải tự tay đi lấy từng cuốn sách cho từng người đến hỏi. Giờ chị là người *thiết kế cách sắp xếp cả thư viện* - ai vào cũng tự tìm được, và tìm ra đúng cuốn. Vai trò sau rõ ràng cao hơn, và khó thay hơn nhiều.

## Semantix đứng ở đâu trong chuyện này

Semantix không phải một con AI viết SQL để thay chị Linh, cũng không phải chatbot cắm thẳng vào database rồi đoán mò định nghĩa. Nó là **chỗ để analyst dựng cuốn từ điển nghiệp vụ đó** - rồi để AI và cả công ty cùng đọc.

Quy trình gọn: chị Linh kết nối nguồn dữ liệu, định nghĩa các metric cốt lõi một lần trong Semantic Layer (doanh thu thực, khách quay lại, tỷ lệ hoàn...), và phân quyền ai được hỏi gì. Sau đó, mọi người trong công ty hỏi bằng tiếng Việt, AI dịch câu hỏi *dựa trên* định nghĩa của chị, trả số ngay. Semantix lo phần *dịch và phục vụ*. Phần *định nghĩa thế nào là đúng* vẫn thuộc về analyst - và đó đúng là chỗ giá trị của chị nằm.

## Tóm lại

| | Analyst kiểu cũ | Analyst kiểu mới |
|---|---|---|
| **Công việc chính** | Viết SQL trả lời từng câu hỏi | Định nghĩa metric chuẩn một lần trong Semantic Layer |
| **Vị trí trong luồng** | Nút cổ chai - mọi câu hỏi chờ mình | Kiến trúc sư - cả công ty tự phục vụ phía sau |
| **Khi nghỉ phép** | Công ty mù số | Cuốn từ điển vẫn chạy, AI vẫn trả lời |
| **Giá trị tạo ra** | Số lượng query chạy được trong ngày | Tính nhất quán & độ tin của mọi con số |
| **Thứ AI lấy đi** | Phần lặp lại: dịch câu hỏi → SQL | (Không lấy được) tri thức nghiệp vụ để định nghĩa đúng |

Câu hỏi chị Linh nên hỏi không phải "AI có viết SQL giỏi hơn mình không?" - gần như chắc chắn là có. Mà là **"ai sẽ dạy AI thế nào là một con số đúng?"** Trả lời được câu đó, chị sẽ thấy mình không bị thay - chị được thăng chức, lên đúng phần việc mà bốn năm qua chị luôn quá bận để làm. (Còn nếu công ty bạn là SME chưa có cả một analyst, [Business Intelligence cho SME: hiểu đúng trong 10 phút](/blog/bi-cho-sme/) cho bạn bức tranh nên bắt đầu từ đâu.)

---

*Bạn là analyst đang lo AI thay mình, hay là sếp muốn cả công ty tự hỏi số mà không kẹt ở một người? Thử định nghĩa metric đầu tiên và để mọi người tự phục vụ - [dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Một định nghĩa đúng hôm nay, dùng mãi về sau.*
