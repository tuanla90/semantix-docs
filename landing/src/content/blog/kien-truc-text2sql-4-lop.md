---
code: "ai-002"
title: "Kiến trúc Text2SQL 4 lớp: biến câu hỏi tiếng Việt thành SQL không phải một-bước — mà là dây chuyền lọc"
description: "Biến câu hỏi tiếng Việt thành SQL không phải phép thuật 'ném vào LLM'. Đó là kiến trúc Text2SQL 4 lớp lọc — lớp ai cũng bỏ qua mới quyết định số đúng hay sai."
pubDate: 2026-04-11
category: "AI & Công Nghệ"
readTime: 11
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/kien-truc-text2sql-4-lop.svg"
coverAlt: "Câu hỏi tiếng Việt đi qua bốn tầng lọc rồi ra câu lệnh SQL đúng định nghĩa nghiệp vụ"
---

Ai cũng tưởng biến một câu hỏi tiếng Việt thành SQL (Structured Query Language — ngôn ngữ truy vấn cơ sở dữ liệu) là phép thuật một-bước: ném câu hỏi vào LLM (Large Language Model — mô hình ngôn ngữ lớn), nhận về câu lệnh, chạy, ra số. Sự thật ngược lại — và đây mới là chỗ đau: nó là một **dây chuyền bốn lớp lọc**, và cái lớp người ta hay bỏ qua nhất lại chính là lớp quyết định "số đúng hay số sai".

Bỏ một lớp ở giữa, bạn không có một hệ Text2SQL (AI biến câu hỏi thành câu lệnh SQL) yếu hơn một chút. Bạn có một **chatbot cắm thẳng vào database** — thứ trả lời rất tự tin, rất mượt, và sai theo cách không ai bắt được.

## Vì sao "một-bước" là ảo tưởng

Hãy hình dung điều mọi người mặc định trong đầu: câu hỏi tiếng Việt đi vào, một mô hình ngôn ngữ khổng lồ nuốt nó, SQL đi ra. Một hộp đen, một bước. Nghe gọn. Và sai về bản chất.

Vì LLM **không tra cứu** database của bạn. Nó đoán token (đơn vị văn bản LLM xử lý và tính phí) tiếp theo dựa trên hàng tỷ dòng văn bản đã học — trong đó có hàng nghìn schema (cấu trúc bảng/cột của database) trên internet. Khi bạn hỏi "doanh thu", nó viết ra thứ *nghe hợp lý nhất với phần còn lại của thế giới*, không phải thứ *đúng với riêng công ty bạn*. Một-bước nghĩa là giao toàn bộ độ chính xác cho một phép đoán xác suất. (Vì sao mô hình tự tin bịa ra cả cột không tồn tại, chúng tôi mổ xẻ trong bài [LLM bịa ra SQL](/blog/llm-bia-sql/).)

Hãy nghĩ về nó như **lọc nước nhiều tầng.** Nước sông đầu nguồn không thành nước uống chỉ vì chảy qua *một* cái lưới. Nó qua lưới chặn rác, qua than hoạt tính khử mùi, qua màng lọc tinh, rồi qua đèn UV diệt khuẩn. Bỏ một tầng, nước vẫn *trông* trong — nhưng thứ giết bạn là cái không nhìn thấy. Text2SQL nghiêm túc cũng vậy: bốn tầng, mỗi tầng khử một loại sai mà mắt thường không bắt được.

Dưới đây là bốn lớp đó.

## Lớp 1 — Hiểu ý định: trước khi viết SQL, phải hiểu bạn đang hỏi gì

Lớp đầu không động đến database. Nó bóc câu hỏi của bạn thành các mảnh có cấu trúc: **đo gì** (metric), **chia theo gì** (dimension), **lọc gì** (điều kiện), **khoảng nào** (thời gian), và **thực thể nào** đang được nhắc tới.

Bạn hỏi *"so tháng này với tháng trước, doanh thu shop Hà Nội"*. Lớp này phải tách ra: metric = doanh thu, dimension ngầm = chi nhánh, bộ lọc = Hà Nội, và hai khoảng thời gian cần so sánh. Nghe đơn giản — cho tới khi gặp tiếng Việt.

"Tháng này", "quý vừa rồi", "đầu năm đến giờ", "cùng kỳ năm ngoái" phải được quy ra khoảng ngày cụ thể — theo lịch và cách nói của người Việt, không phải fiscal year kiểu Mỹ. Sai một ngày ở đây, ba lớp sau có giỏi mấy cũng vô nghĩa: bạn lọc nước hoàn hảo cho một dòng nước sai. Đây là tầng lưới đầu tiên — chặn rác thô, định hình bài toán cho mọi tầng sau.

## Lớp 2 — Ánh xạ vào Semantic Layer: cái lớp ai cũng bỏ qua

Đây là lớp bị bỏ nhiều nhất. Cũng là lớp quyết định số đúng hay sai. Bỏ nó, bạn rơi thẳng vào "chatbot cắm thẳng DB".

Lớp này lấy các mảnh từ lớp 1 và **ánh xạ chúng vào một định nghĩa có thật**: "doanh thu" của *bạn* là cột nào, trừ những gì; "khách hàng hoạt động" tính theo tiêu chí nào; bảng `orders` nối với `order_items` theo quan hệ nào; phép tính nào bị cấm vì vô nghĩa. Tất cả nằm trong **Semantic Layer** — cuốn từ điển nghiệp vụ định nghĩa mỗi khái niệm *một lần, chuẩn xác*. (Vì sao đây là lớp nền của mọi thứ, đọc [Semantic Layer là gì](/blog/semantic-layer/).)

Để thấy lớp này làm gì, hãy so hai phiên bản của cùng một câu hỏi "doanh thu tháng này".

*Ví dụ minh hoạ:* AI đoán bừa khi không có Semantic Layer —

```sql
-- Đoán: lấy đại cột gross, không trừ gì, tính cả đơn hủy
SELECT SUM(gross_amount) FROM orders
WHERE created_at >= '2026-07-01';
```

*Ví dụ minh hoạ:* SQL neo vào định nghĩa nghiệp vụ —

```sql
-- doanh_thu đã khai báo MỘT LẦN trong Semantic Layer:
-- gross trừ chiết khấu, loại đơn hoàn, chỉ tính đơn hoàn tất
SELECT SUM(gross_amount - discount_amount) FROM orders
WHERE created_at >= '2026-07-01'
  AND status = 'completed' AND refund_amount = 0;
```

Cả hai **đều chạy. Đều ra số. Đều đúng cú pháp.** Nhưng chênh nhau 15–20%. Phiên bản trên là cái bạn nhận được từ một chatbot cắm thẳng DB; phiên bản dưới là cái bạn nhận được khi câu hỏi đi qua lớp 2. Không ngẫu nhiên mà những hệ Text2SQL mạnh nhất thế giới — WrenAI, hay SuperSonic của Tencent — đều xây *quanh* một semantic layer, đúng tinh thần của các metrics layer như dbt, Cube, LookML. (Sự khác biệt căn bản này là toàn bộ nội dung bài [Semantic Layer so với chatbot cắm thẳng database](/blog/semantic-layer-vs-chatbot-database/).)

> Quy tắc vàng: AI chỉ được phép *lắp ghép* từ những định nghĩa đã có, không được *bịa* ra định nghĩa mới. Mỗi khái niệm nghiệp vụ phải neo vào một mục có thật trong Semantic Layer — nếu không, chặn.

Tôi tin lớp này nhất vì đã trả giá để hiểu nó. Hồi làm trưởng nhóm BI ở một ngân hàng, tôi mới thấm: cùng chữ "doanh thu", marketing hiểu một kiểu, kế toán hiểu một kiểu, và mỗi báo cáo ngầm chọn một định nghĩa khác nhau mà không ai khai ra. Đúng cái gap mà hồi làm dữ liệu tracking ở một công ty công nghệ lõi của hệ sinh thái e-commerce tôi đã gặp: doanh thu chỉ tính theo ngày đặt, còn hoàn–huỷ về sau thì mù. Vì vậy giờ tôi đang biến semantic layer thành dự án trọng điểm: ghim mỗi khái niệm *một lần*. Bỏ lớp này, bạn không tăng tốc — bạn nhân bản sự nhập nhằng lên quy mô máy.

## Lớp 3 — Sinh SQL có ràng buộc: viết từ bản đồ, không viết từ trí nhớ

Đến đây AI mới thật sự viết SQL. Nhưng không từ con số không — nó viết **trong khung ràng buộc** mà lớp 2 dựng sẵn.

Ràng buộc nghĩa là gì? Nghĩa là metric "doanh thu" buộc phải nở ra đúng công thức đã khai báo, không được tự chọn cột khác. Nghĩa là quan hệ `orders : order_items` là 1-nhiều đã được vẽ trước, nên AI không tự đoán khóa nối rồi vô tình nhân bản dòng làm doanh thu phồng gấp ba. Và nghĩa là những **kết hợp bị cấm** (forbidden combinations) bị chặn ngay khi sinh: không `AVG(order_id)` — trung bình của một mã định danh; không cộng dồn các tỷ lệ phần trăm thành một con số 470%.

*Ví dụ minh hoạ:* một tổ hợp vô lý mà cú pháp không bao giờ bắt được, bị lớp này chặn —

```sql
-- BỊ CHẶN: order_id là nhãn, không phải đại lượng đo được
SELECT AVG(order_id) FROM orders;   -- vô nghĩa về nghiệp vụ
```

Database sẽ vui vẻ chạy câu trên và trả về một con số. Lớp 3 thì không cho nó tới được database. Khác biệt giữa "sinh SQL tự do" và "sinh SQL có ràng buộc" đúng bằng khác biệt giữa một người viết câu trả lời từ trí nhớ mơ hồ và một người viết từ tấm bản đồ đặt trước mặt. Bịa trở thành chuyện bất khả thi, vì đường đi đã được vẽ.

## Lớp 4 — Kiểm chứng và tự sửa: tầng phòng thủ cuối trước khi số lên bàn họp

Lớp cuối làm cái ít hệ nào chịu làm: **không tin câu SQL ngay cả khi nó đã được sinh.**

Trước khi chạy, hệ thống đối chiếu từng tên bảng, tên cột với schema thật — tên nào không khớp, chặn và yêu cầu viết lại, chứ không để database báo lỗi cho người dùng cuối tự đoán. Truy vấn được tự chèn **Row-Level Security (RLS — phân quyền theo hàng: mỗi người chỉ thấy đúng các dòng được phép)**: bạn là quản lý miền Bắc thì câu lệnh âm thầm thêm `WHERE region = 'North'`, bạn không thấy và không bỏ qua được. Và sau khi chạy, kết quả được soi lại tính hợp lý — doanh thu ra số âm, hay bảng rỗng trong khi đáng lẽ phải có dữ liệu, thì **cảnh báo thay vì lặng lẽ trả về**.

Nếu thấy bất thường, vòng tự sửa khởi động: AI nhận lỗi cụ thể, viết lại, kiểm tra lại. Đây là đèn UV ở cuối dây chuyền lọc — tầng cuối bắt đúng những con vi khuẩn lọt qua mọi lưới phía trước. Đây cũng là tuyến phòng thủ cuối chống đúng cái bẫy "số sai trông như đúng". (Cơ chế Text2SQL từ góc nhìn vận hành, chúng tôi viết riêng trong bài [Text-to-SQL hoạt động ra sao](/blog/text-to-sql/).)

## Bốn lớp này trong Semantix — định vị bằng phủ định

Semantix **không phải** "một ChatGPT cắm vào database hỏi gì cũng trả lời". Nó **không phải** một hộp đen một-bước nơi bạn cầu mong AI đoán đúng. Và nó **không** đặt cược vào "model ngày càng giỏi sẽ tự hết bịa" — một model to hơn chỉ bịa *mượt* hơn, tức khó phát hiện hơn.

Định vị của Semantix là phủ định của cả ba: thay vì làm AI thông minh hơn, nó dựng đủ bốn tầng lọc để **thu hẹp không gian AI được phép xoay xở cho tới khi gần như không còn chỗ để bịa.** Quy trình rất rõ:

1. **Hiểu ý định** câu hỏi tiếng Việt — đúng thực thể, đúng khoảng thời gian.
2. **Ánh xạ vào Semantic Layer** — neo mọi khái niệm vào định nghĩa có thật.
3. **Sinh SQL có ràng buộc** — lắp ghép từ bản đồ, chặn tổ hợp vô lý.
4. **Kiểm chứng và tự sửa** — validate, áp bảo mật, soi kết quả, sửa nếu sai.

Bạn hỏi bằng tiếng Việt như nói với một analyst (chuyên viên phân tích dữ liệu) giỏi — trả lời trong vài giây, không bao giờ bận, và luôn dùng đúng một định nghĩa "doanh thu". (Vì sao SME cần đúng cách tiếp cận này ngay cả khi chưa có đội data, xem [BI cho SME](/blog/bi-cho-sme/).)

## Tóm lại

Biến câu hỏi tiếng Việt thành SQL không phải một bước. Nó là bốn tầng lọc nối tiếp, và bỏ một tầng — đặc biệt là tầng ánh xạ vào Semantic Layer — biến cả hệ thống thành chatbot cắm thẳng DB.

| Một-bước "ném vào LLM" | Kiến trúc Text2SQL 4 lớp |
|---|---|
| Một hộp đen, cầu mong đoán đúng | Bốn tầng, mỗi tầng khử một loại sai |
| AI đoán định nghĩa "doanh thu" | Neo vào Semantic Layer — một định nghĩa chuẩn |
| Tự do nối bảng, tự do tính → nhân bản, tổ hợp vô lý | Sinh SQL có ràng buộc, chặn forbidden combinations |
| Chạy là xong, không ai soi lại | Validate, áp RLS, kiểm kết quả, tự sửa nếu sai |
| Số sai trông như đúng | Sai bị bắt trước khi lên bàn họp |

Lần tới khi ai đó hứa "gắn AI thẳng vào database là hỏi gì cũng trả lời được", hãy hỏi lại một câu: *"Câu hỏi của tôi đi qua mấy lớp lọc trước khi thành SQL — và lớp nào neo vào định nghĩa nghiệp vụ của riêng tôi?"* Trả lời được câu đó, bạn đã đứng trước cái bẫy mà 90% người dùng chưa nhìn ra.

---

*Muốn xem câu hỏi tiếng Việt của chính bạn đi qua đủ bốn lớp và ra số đúng? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*
