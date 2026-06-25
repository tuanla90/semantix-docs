---
title: "Ảo giác AI: vì sao LLM tự tin 'bịa' ra SQL gọi tới cột không hề tồn tại — và cơ chế nào chặn"
code: "ai-001"
description: "AI viết một câu SQL gọi tới cột `customer_lifetime_value` trơn tru. Vấn đề: cột đó không tồn tại trong database của bạn. Vì sao LLM bịa, và 5 tuyến phòng thủ chặn nó."
pubDate: 2025-09-02
category: "AI & Công Nghệ"
readTime: 13
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/llm-bia-sql.svg"
coverAlt: "Một khối SQL có dòng bịa được đánh dấu đỏ, đối lại lá chắn các tầng chặn ảo giác"
---

*Muốn AI trả lời câu hỏi dữ liệu của bạn mà không bịa? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*

Bạn hỏi AI: *"Giá trị vòng đời trung bình của khách hàng VIP là bao nhiêu?"*. Vài giây sau, nó trả về một câu SQL (Structured Query Language — ngôn ngữ truy vấn cơ sở dữ liệu) gọn gàng:

```sql
SELECT AVG(customer_lifetime_value)
FROM customers
WHERE segment = 'VIP';
```

Câu lệnh đẹp. Thụt lề chuẩn. Đúng cú pháp từng dấu phẩy. Chỉ có một vấn đề nhỏ: trong database của bạn **không hề có** cột `customer_lifetime_value`, cũng chẳng có cột `segment`. AI vừa **bịa** ra cả hai — một cách hết sức tự tin, không một dòng cảnh báo "tôi không chắc".

Phản xạ đầu tiên của bạn có thể là: "Chắc do model còn yếu, đổi model xịn hơn là xong." Sai. Đây không phải lỗi vặt của một model dở — nó là **bản chất** của cách mọi mô hình ngôn ngữ lớn — **LLM (Large Language Model)** — hoạt động. Và hiểu được bản chất đó là điều kiện đầu tiên để chặn nó.

> Bài [Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi mà vẫn trả về số sai](/blog/text-to-sql/) đã mổ xẻ kiến trúc 4 lớp biến câu hỏi thành SQL. Bài này đi sâu vào một câu hỏi khác và khó chịu hơn: **vì sao mô hình lại tự tin bịa ra thứ không tồn tại — và mỗi kiểu bịa bị chặn bằng tuyến phòng thủ nào.**

## Ảo giác là gì — và vì sao LLM "bịa" mà không hề biết mình đang bịa

**Ảo giác (hallucination)** là khi AI tạo ra nội dung nghe rất hợp lý, trình bày đầy tự tin, nhưng **sai hoặc bịa đặt hoàn toàn**. Với văn bản, đó là trích dẫn một nghiên cứu không tồn tại. Với SQL, đó là gọi tới một bảng, một cột, một quan hệ không có thật trong database của bạn.

Để hiểu vì sao, phải nhớ LLM thực ra đang làm gì. Nó **không tra cứu** database của bạn. Nó **đoán token (đơn vị văn bản LLM xử lý và tính phí) tiếp theo có xác suất cao nhất**, dựa trên hàng tỷ dòng code và văn bản đã học. Khi bạn nhắc tới "khách hàng VIP" và "giá trị vòng đời", mô hình đã thấy hàng nghìn schema (cấu trúc bảng/cột của database) trên internet có cột tên `customer_lifetime_value` và `segment`. Với nó, viết ra hai cái tên đó là lựa chọn *thống kê hợp lý nhất* — bất kể database của bạn có chúng hay không.

Hãy hình dung AI như **một nhân viên mới cực kỳ tự tin, được giao việc ngày đầu mà không ai đưa sơ đồ kho.** Bạn hỏi "lấy giúp anh số liệu ở kệ B7". Nhân viên này chưa từng thấy kho của bạn, nhưng ở mọi kho cậu từng làm đều có kệ B7. Nên cậu gật đầu chắc nịch, đi thẳng tới chỗ "lẽ ra là B7" và bê về một thùng hàng. Trông rất chuyên nghiệp. Chỉ là kho của bạn đánh số tới B5 là hết.

Vấn đề cốt lõi: **mô hình lấp khoảng trống bằng thứ *nghe hợp lý*, chứ không phải thứ *có thật*.** Và nó không có cảm giác "mình đang đoán" — với mô hình, đoán đúng và đoán bịa là cùng một phép tính xác suất. Đó là lý do nó tự tin như nhau trong cả hai trường hợp.

Tin tốt: vì ảo giác có quy luật, nó có thể được phân loại — và mỗi loại có một tuyến phòng thủ riêng. Dưới đây là năm kiểu hay gặp nhất khi AI sinh SQL, kèm cơ chế chặn tương ứng.

## Kiểu 1 — Bịa bảng/cột không tồn tại

Đây là kiểu kinh điển vừa thấy ở đầu bài. AI gọi `customer_lifetime_value`, `segment`, hay một bảng `transactions` trong khi database thật chỉ có `orders` và `order_items`. Câu SQL đúng cú pháp tuyệt đối — nhưng chạy lên là văng lỗi *"column does not exist"*, hoặc tệ hơn, nếu tình cờ có một cột *gần giống tên*, nó chạy ra số sai mà không báo gì.

**Tuyến phòng thủ: nạp schema thực + validate trước khi chạy.** Thay vì để AI tự nhớ database trông như thế nào, hệ thống đưa cho nó **đúng danh sách bảng/cột có thật** (qua *schema linking* và RAG (Retrieval-Augmented Generation — sinh có truy hồi: cho AI tra đúng ngữ cảnh trước khi trả lời) — chỉ rút ra phần liên quan để khỏi nhiễu). Quan trọng hơn: sau khi AI sinh SQL, một bước **kiểm tra (validation)** đối chiếu từng tên bảng, tên cột trong câu lệnh với schema thật *trước khi* truy vấn chạm vào database. Tên nào không khớp, câu lệnh bị chặn lại và AI được yêu cầu viết lại — chứ không phải để database báo lỗi cho người dùng cuối tự đoán.

> Quy tắc vàng: AI không được phép tham chiếu tới thứ nó không nhìn thấy trong schema thực. Mọi cái tên đều phải khớp danh sách có thật, nếu không — chặn.

## Kiểu 2 — Join sai quan hệ và âm thầm nhân bản dòng

Kiểu này tinh vi và nguy hiểm hơn hẳn kiểu 1, vì nó **không văng lỗi**. AI cần nối hai bảng `orders` và `order_items`, nhưng đoán nhầm khóa nối — hoặc nối đúng nhưng quên rằng một đơn hàng có nhiều dòng sản phẩm. Kết quả: mỗi đơn bị đếm lặp lại theo số sản phẩm trong đơn, và doanh thu **bị thổi phồng** mà không ai hay.

*Ví dụ minh họa.* AI muốn tính tổng doanh thu theo khách hàng và viết:

```sql
-- Quan hệ orders : order_items là 1-nhiều
-- Tổng amount của orders bị nhân lên theo số dòng order_items
SELECT c.name, SUM(o.total_amount) AS revenue
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id   = o.id   -- ← làm mỗi đơn lặp lại n lần
GROUP BY c.name;
```

`SUM(o.total_amount)` giờ cộng giá trị mỗi đơn *nhiều lần* — đúng bằng số dòng sản phẩm. Một khách mua 3 mặt hàng trong một đơn sẽ có doanh thu gấp ba. Câu lệnh chạy ngon, ra một bảng đẹp, và sai 15–200% tùy dữ liệu.

**Tuyến phòng thủ: quan hệ được khai báo sẵn trong Semantic Layer (tầng định nghĩa nghiệp vụ dùng chung).** Khi quan hệ `orders : order_items` là 1-nhiều đã được mô tả *một lần* ở tầng định nghĩa — kèm cách gộp đúng (ví dụ tính doanh thu ở cấp đơn, không cấp dòng) — AI không còn phải đoán khóa nối hay tự nghĩ ra cách tránh nhân bản. Nó chỉ lắp ghép theo bản đồ quan hệ có sẵn. Bịa quan hệ trở thành chuyện bất khả thi, vì đường đi đã được vẽ trước.

## Kiểu 3 — Kết hợp metric và dimension một cách vô lý

Có những phép tính **đúng cú pháp nhưng vô nghĩa về nghiệp vụ**. Tính `AVG(order_id)` — trung bình của một mã định danh. `SUM` của một tỷ lệ phần trăm — cộng dồn các tỷ lệ chuyển đổi lại với nhau thành một con số 470%. Trung bình của một trung bình mà không trọng số. Database vui vẻ trả về kết quả, vì với nó đây chỉ là phép toán trên các con số. Nhưng kết quả là rác.

AI sa vào những phép này vì nó thấy mẫu "AVG(cột số)" rất phổ biến và áp dụng máy móc — nó không *hiểu* rằng `order_id` là một cái nhãn chứ không phải một đại lượng đo được.

**Tuyến phòng thủ: luật "forbidden combinations" (kết hợp bị cấm).** Hệ thống khai báo trước những cặp metric (con số đo được) – dimension (lát cắt để nhìn metric) hoặc phép gộp **không bao giờ được phép**: không `AVG`/`SUM` trên cột định danh, không cộng dồn tỷ lệ, không gộp một metric đã-là-trung-bình thêm lần nữa. Khi AI vô tình sinh ra một tổ hợp nằm trong danh sách cấm, hệ thống chặn và buộc viết lại. Đây là hàng rào dành riêng cho loại lỗi mà cú pháp không bao giờ bắt được, vì bản thân câu lệnh chẳng có gì "hỏng".

## Kiểu 4 — Đoán định nghĩa nghiệp vụ

Đây là kiểu ảo giác **đắt giá nhất**, vì nó chạm thẳng vào con số đưa lên bàn họp. Bạn hỏi "doanh thu tháng này". Trong bảng có `gross_amount`, `discount_amount`, `refund_amount`, `tax`. "Doanh thu" của *công ty bạn* trừ chiết khấu chưa? Có loại đơn hoàn không? Chỉ tính đơn đã hoàn tất?

AI không biết — và nó **đoán**. Mỗi lần hỏi có thể đoán một kiểu. Một lần nó lấy `gross_amount`, lần sau trừ chiết khấu. Hai con số chênh nhau 15–20%, cả hai đều "đúng cú pháp", và bạn không cách nào biết lần nào theo định nghĩa thật của mình. Đây chính xác là cái bẫy "số sai trông như đúng".

Tôi gặp đúng cái bẫy này mỗi ngày ở một ngân hàng tôi đang làm. Nghiệp vụ banking phức tạp tới mức "doanh thu" không có một nghĩa — nó tách ra theo sản phẩm, theo thời điểm ghi nhận, theo đơn đã/chưa tất toán. Một LLM gắn thẳng vào kho dữ liệu mà không có lớp neo nghiệp vụ sẽ đoán bừa một nhánh và trả về con số trông rất dứt khoát. Đây chính là lý do tôi đang đẩy POC semantic layer thành dự án trọng điểm của trung tâm chuyển đổi số: không phải để AI thông minh hơn, mà để mỗi định nghĩa chỉ còn đúng một nghĩa, hết chỗ cho nó tự diễn giải.

**Tuyến phòng thủ: Semantic Layer — một định nghĩa chuẩn, dùng cho mọi câu hỏi.** Khi "doanh thu", "khách hàng hoạt động", "tỷ lệ chuyển đổi" được định nghĩa *một lần, chuẩn xác* ở tầng ngữ nghĩa, AI không còn khoảng trống nào để đoán. Nó không bịa định nghĩa, vì định nghĩa đã có sẵn và nó buộc phải dùng. Không ngẫu nhiên mà những hệ Text-to-SQL mạnh nhất thế giới — WrenAI, hay SuperSonic của Tencent — đều xây *quanh* một semantic layer, chứ không gắn AI thẳng vào database. *(Vì sao đây là lớp nền của mọi thứ, xem [Semantic Layer: vì sao công ty bạn có ba con số doanh thu](/blog/semantic-layer/).)*

## Kiểu 5 — Tự tin khi đáng lẽ nên hỏi lại

Kiểu cuối khác bốn kiểu trên ở chỗ: nó không phải lỗi trong câu SQL, mà là lỗi trong **thái độ**. Bạn hỏi một câu mơ hồ — *"so sánh hiệu quả hai chi nhánh"* — mà chưa nói "hiệu quả" là doanh thu, lợi nhuận, hay số đơn. Một AI dở sẽ tự chọn một nghĩa, viết SQL, và trả về con số dứt khoát như thể bạn đã hỏi rõ. Bạn nhận một câu trả lời tự tin cho một câu hỏi bạn chưa thực sự hỏi.

Nghiên cứu năm 2025 về Text-to-SQL (AI biến câu hỏi thành câu lệnh SQL) chỉ ra một nghịch lý ít người chịu tin: **AI tốt không phải AI luôn trả lời được, mà là AI biết khi nào *không nên* trả lời.** Một mô hình biết nói "tôi chưa rõ 'hiệu quả' nghĩa là gì, bạn muốn đo theo doanh thu hay lợi nhuận?" đáng tin hơn nhiều một mô hình lúc nào cũng có đáp án.

**Tuyến phòng thủ: vòng làm rõ trước khi trả lời.** Thay vì lấp khoảng mơ hồ bằng phỏng đoán, hệ thống được thiết kế để **dừng lại và hỏi** khi câu hỏi thiếu thông tin then chốt — hoặc ít nhất nói rõ giả định nó đang dùng ("đang hiểu 'hiệu quả' = doanh thu; đổi nếu cần"). Bịa giỏi nhất là bịa khi không ai bắt phải thú nhận mình đang đoán; tuyến phòng thủ này buộc AI thú nhận.

## Triết lý chống ảo giác của Semantix: thu hẹp không gian để AI hết chỗ bịa

Đến đây có một sợi chỉ xuyên suốt cả năm kiểu, và nó là điểm dễ hiểu sai nhất.

Cách chống ảo giác của Semantix **không phải** đi tìm "một AI thông minh hơn để bớt bịa". Một mô hình to hơn vẫn đoán token theo xác suất — nó chỉ bịa *mượt* hơn, nghĩa là khó phát hiện hơn. Đặt cược vào "AI ngày càng giỏi" là đặt cược sai chỗ.

Định vị của Semantix là **phủ định** của cách tiếp cận đó: không làm AI giỏi hơn, mà **thu hẹp không gian mà AI được phép xoay xở cho tới khi gần như không còn chỗ để bịa.** Mỗi tuyến phòng thủ ở trên thu hẹp một chiều:

- Schema thực thu hẹp **những gì AI được phép gọi tới**.
- Quan hệ khai báo thu hẹp **cách AI được phép nối bảng**.
- Forbidden combinations thu hẹp **những phép tính AI được phép làm**.
- Semantic Layer thu hẹp **những định nghĩa AI được phép dùng**.
- Vòng làm rõ thu hẹp **những câu AI được phép tự ý trả lời**.

Nhân viên mới quá tự tin ở đầu bài không trở nên đáng tin hơn vì được tuyển một người thông minh hơn. Cậu trở nên đáng tin vì cuối cùng có ai đó **đưa cho cậu sơ đồ kho thật, đánh dấu rõ kệ nào không tồn tại, và dặn: gặp gì không chắc thì hỏi, đừng bịa.** Đó là toàn bộ công việc của một nền tảng AI Analytics nghiêm túc — không phải biến AI thành thiên tài, mà biến môi trường quanh AI thành nơi bịa đặt là bất khả thi. *(Vì sao SME cần đúng cách tiếp cận này ngay cả khi chưa có đội data, xem [BI cho SME: hiểu đúng trong 10 phút](/blog/bi-cho-sme/).)*

## Tóm lại

Ảo giác không phải lỗi vặt của model dở — nó là bản chất của mọi mô hình đoán-token. Vì có quy luật, nó chặn được. Mỗi kiểu bịa có một tuyến phòng thủ riêng:

| Kiểu ảo giác | Tuyến phòng thủ |
|---|---|
| Bịa bảng/cột không tồn tại | Nạp schema thực + validate tên trước khi chạy |
| Join sai quan hệ / nhân bản dòng | Quan hệ khai báo sẵn trong Semantic Layer |
| Kết hợp metric–dimension vô lý | Luật "forbidden combinations" |
| Đoán định nghĩa nghiệp vụ | Semantic Layer — một định nghĩa chuẩn |
| Tự tin khi nên hỏi lại | Vòng làm rõ / nói rõ giả định trước khi trả lời |

Lần tới khi ai đó hứa "gắn AI thẳng vào database là hỏi gì cũng trả lời được", hãy hỏi lại một câu: *"Thế khi AI không chắc, nó đoán hay nó dừng lại?"* Trả lời được câu đó, bạn đã đứng trước cái bẫy mà 90% người dùng chưa nhìn ra.

---

*Muốn xem AI trả lời câu hỏi dữ liệu của bạn mà không bịa ra cột không tồn tại? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Text-to-SQL: vì sao AI viết SQL không bao giờ lỗi mà vẫn trả số sai](/blog/text-to-sql/).*
