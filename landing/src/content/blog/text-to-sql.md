---
title: "Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi - mà vẫn trả về số sai"
code: "kt-002"
description: "AI viết SQL đúng cú pháp 95–99% số lần. Nghe yên tâm? Đó mới chính là chỗ nguy hiểm. Bài này giải thích Text-to-SQL thật sự hoạt động ra sao, và cái bẫy 'số sai mà trông như đúng'."
pubDate: 2026-05-28
category: "Kiến Thức Nền Tảng"
readTime: 11
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/text-to-sql.svg"
coverAlt: "Câu hỏi tiếng Việt được chuyển thành câu lệnh SQL đúng định nghĩa"
---

Hãy bắt đầu bằng một con số làm nhiều người ngạc nhiên: các nghiên cứu năm 2025 cho thấy mô hình ngôn ngữ lớn (LLM - Large Language Model) viết ra câu SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) **đúng cú pháp tới 95–99% số lần**. Gần như không bao giờ lỗi cú pháp.

Phản xạ đầu tiên của bạn có thể là: "Vậy thì yên tâm rồi." Nhưng đây mới đúng là chỗ nguy hiểm nhất của Text-to-SQL (AI biến câu hỏi tiếng Việt thành câu lệnh SQL) - và là lý do tại sao "gắn ChatGPT vào database" nghe thì hấp dẫn mà triển khai thật lại vỡ trận.

Bởi vì **đúng cú pháp không có nghĩa là đúng số.** Một câu SQL chạy trơn tru, trả về một bảng đẹp đẽ, một con số tròn trịa - và sai. Không có dòng báo lỗi nào. Không ai biết. Bạn mang con số đó vào phòng họp và ra quyết định.

## Text-to-SQL là gì?

Text-to-SQL (hay *natural language to SQL*) là công nghệ chuyển **một câu hỏi bằng ngôn ngữ tự nhiên** thành **một câu lệnh SQL** mà cơ sở dữ liệu hiểu được.

Bạn hỏi: *"Top 5 sản phẩm bán chạy nhất quý vừa rồi"*. Bên dưới, hệ thống cần tạo ra đại loại:

```sql
SELECT product_name, SUM(quantity) AS total_sold
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
  AND o.created_at >= '2026-04-01'
  AND o.created_at <  '2026-07-01'
GROUP BY product_name
ORDER BY total_sold DESC
LIMIT 5;
```

Người hỏi không cần biết bảng tên gì, "quý vừa rồi" là khoảng ngày nào, hay phải `JOIN` những bảng nào. Đó là lời hứa: **trả quyền hỏi dữ liệu về tay người làm kinh doanh.** Vấn đề nằm ở chữ "đúng".

## Sự thật ngược đời: lỗi không nằm ở cú pháp

Khi hình dung "AI viết SQL sai", đa số nghĩ tới câu lệnh đỏ lòm, chạy là văng lỗi. Thực tế gần như ngược lại. Lỗi cú pháp dễ bắt - database tự từ chối ngay. Loại lỗi đáng sợ là **lỗi ngữ nghĩa (semantic error)**: SQL hợp lệ hoàn toàn, chạy ra kết quả, nhưng *trả lời sai câu hỏi*.

Lấy lại bài toán kinh điển: bạn hỏi *"doanh thu tháng này"*. Trong bảng `orders` có `gross_amount`, `discount_amount`, `refund_amount`, `tax`. AI hoàn toàn có thể viết:

```sql
-- Phiên bản A: AI chọn gross_amount
SELECT SUM(gross_amount) FROM orders
WHERE created_at >= '2026-06-01';
```

```sql
-- Phiên bản B: trừ chiết khấu, loại đơn hoàn, chỉ tính đơn hoàn tất
SELECT SUM(gross_amount - discount_amount) FROM orders
WHERE created_at >= '2026-06-01'
  AND status = 'completed' AND refund_amount = 0;
```

Cả hai **đều chạy. Đều ra số. Đều "đúng cú pháp".** Nhưng chênh nhau có thể 15–20%. Nếu công ty bạn định nghĩa doanh thu theo cách B mà AI đoán theo cách A, bạn vừa báo cáo sai cho sếp - một cách rất tự tin.

Đây chính là lý do bài toán Text-to-SQL khó hơn nó tưởng: phần "viết được SQL" gần như đã giải xong nhờ LLM hiện đại. Phần chưa giải là **viết đúng SQL theo nghĩa của riêng doanh nghiệp bạn.** Và phần đó không phải bài toán ngôn ngữ - nó là bài toán kiến trúc.

## AI biến câu hỏi tiếng Việt thành SQL đúng ra sao - 4 lớp

Một hệ Text-to-SQL nghiêm túc không ném thẳng câu hỏi cho AI. Nó đi qua bốn lớp, mỗi lớp khử bớt một nguồn sai số.

### Lớp 1 - Hiểu ý định (Intent), và xử lý tiếng Việt cho đúng

AI bóc câu hỏi thành các mảnh có cấu trúc: **đo gì** (metric: doanh thu), **chia theo gì** (dimension: sản phẩm), **lọc gì** (đơn đã giao), **khoảng nào** (tháng này).

Nghe đơn giản nhưng riêng tiếng Việt đã đủ làm công cụ nước ngoài vấp: "tháng này", "quý vừa rồi", "đầu năm đến giờ" phải được quy ra khoảng ngày cụ thể - theo lịch và cách nói của người Việt, không phải fiscal year kiểu Mỹ. Sai ở bước này thì ba lớp sau có giỏi mấy cũng vô nghĩa.

### Lớp 2 - Tìm đúng ngữ cảnh (Schema linking + RAG)

Một doanh nghiệp có thể có hàng trăm bảng, hàng nghìn cột. Đưa hết cho AI vừa đắt vừa làm nó nhiễu. Thay vào đó, hệ thống dùng **tìm kiếm ngữ nghĩa (RAG - Retrieval-Augmented Generation: cho AI tra đúng tài liệu trước khi trả lời)** để chỉ rút ra đúng bảng/cột liên quan đến câu hỏi này - bước gọi là *schema linking*, và nó là một trong những yếu tố quyết định độ chính xác cao nhất.

Đi kèm là **Golden SQL**: kho các cặp câu-hỏi–SQL đã được duyệt trước. Khi bạn hỏi câu mới, hệ thống tìm vài câu tương tự trong quá khứ đưa cho AI làm mẫu (*few-shot*). Nói cách khác, AI không phải nhớ cả database - nó được đưa đúng trang sách cần đọc, kèm vài lời giải mẫu.

### Lớp 3 - Sinh SQL trên nền Semantic Layer (lớp chống sai số quan trọng nhất)

Đến đây AI mới viết SQL - nhưng không từ con số không. Nó dựa trên **Semantic Layer** (tầng định nghĩa nghiệp vụ dùng chung): nơi "doanh thu", "khách hàng hoạt động", "tỷ lệ chuyển đổi" được định nghĩa *một lần, chuẩn xác*. Quay lại ví dụ ở trên: nếu công ty đã khai báo doanh thu = phiên bản B, thì AI không còn cơ hội đoán theo A nữa.

Đây cũng là nơi chặn những kết hợp vô lý bằng luật (ví dụ tính trung bình của một mã đơn hàng), và chặn việc AI bịa ra bảng/cột không tồn tại. Không ngẫu nhiên mà những hệ Text-to-SQL mạnh nhất thế giới - WrenAI, SuperSonic của Tencent - đều xây quanh ý tưởng này.

Hồi ở một công ty công nghệ lõi của một hệ sinh thái e-commerce, tôi tự dựng một hệ tracking giống Google Analytics, và bài học xương máu là: cùng chữ "doanh thu" mà mỗi phòng hiểu một kiểu. Marketing tính theo ngày đặt đơn; kế toán chỉ ghi nhận khi đơn giao xong, đã trừ hoàn/huỷ. Nếu để truy vấn tự đoán, số sẽ lệch nhau cả chục phần trăm mà không ai thấy sai. Chính vì neo mọi định nghĩa vào một chỗ duy nhất mà báo cáo của tôi khớp số backend tới ~98%, trong khi GA4 chỉ khớp khoảng 60%. Một con SQL chạy được mà không neo vào định nghĩa nghiệp vụ thì vẫn là một con số biết nói dối.

> Nếu Text-to-SQL là động cơ, thì Semantic Layer là vô lăng và phanh. Thiếu nó, xe vẫn chạy - nhưng bạn không lái được.

### Lớp 4 - Thực thi an toàn & kiểm tra kết quả

Trước khi chạy, hệ thống tự chèn **Row-Level Security** (RLS - phân quyền theo hàng, mỗi người chỉ thấy đúng dòng được phép): nếu bạn là quản lý miền Bắc, câu SQL âm thầm được thêm `WHERE region = 'North'` - bạn không thấy, không bỏ qua được. Truy vấn được giới hạn thời gian và số dòng để một câu hỏi vu vơ không quét cháy cả database.

Những hệ tốt còn thêm một bước ít ai làm: **kiểm tra kết quả có hợp lý không** - ví dụ doanh thu ra số âm, hay bảng rỗng trong khi đáng lẽ phải có dữ liệu, thì cảnh báo thay vì lặng lẽ trả về. Đây là tuyến phòng thủ cuối chống lại đúng cái bẫy "số sai trông như đúng".

## Hai trường phái - và cách chọn công cụ

Nhìn toàn cảnh thị trường Text-to-SQL, các hệ thống chia thành hai trường phái rõ rệt. Hiểu được khác biệt này là bạn đã nghĩ ở tầng cao hơn 90% người dùng:

**Trường phái 1 - "Định nghĩa nghiệp vụ trước".** Đầu tư mô tả business model (metric, quan hệ) ngay từ đầu, rồi AI chỉ việc lắp ghép. AI làm ít hơn nên bịa ít hơn, độ chính xác cao hơn ở quy mô lớn. Đổi lại, cần công sức thiết lập ban đầu.

**Trường phái 2 - "Để AI tự suy, rồi sửa".** Dựa nhiều vào khả năng suy luận của LLM, bù lại bằng RAG phong phú và các vòng tự sửa lỗi. Triển khai nhanh, linh hoạt hơn - nhưng trần độ chính xác thấp hơn và chi phí cao hơn.

Điều thú vị: các hệ trưởng thành đang **hội tụ về giữa** - dùng AI để linh hoạt, nhưng neo vào một semantic layer để khỏi đoán mò. Một mẹo tối ưu phổ biến: phân loại độ khó câu hỏi, để **40–60% câu đơn giản** (đếm, tổng, trung bình) chạy bằng luật rẻ và tất định, chỉ đẩy câu phức tạp cho LLM - tiết kiệm 30–50% chi phí AI mà không giảm chất lượng.

Vậy khi chọn (hoặc tự xây) một công cụ Text-to-SQL, đừng hỏi "AI nào xịn nhất?". Hãy hỏi bốn câu sắc hơn:

| Câu hỏi cần đặt | Vì sao quan trọng |
|---|---|
| Nó hiểu định nghĩa nghiệp vụ của *tôi* không? | Không có Semantic Layer = mỗi lần một con số khác |
| Khi không chắc, nó **đoán** hay **hỏi lại / báo** không chắc? | Đoán mò là nguồn của "số sai trông như đúng" |
| Ai hỏi cũng ra cùng kết quả chứ? | Tính nhất quán là nền của niềm tin vào dữ liệu |
| Bảo mật theo dòng được áp tự động không? | Một rò rỉ dữ liệu lương là đủ mất khách |

## Tóm lại

Text-to-SQL không phải phép màu "AI tự hiểu hết". Phần khó nhất không phải dạy AI viết SQL - nó viết tốt rồi. Phần khó là làm cho nó viết đúng *theo nghĩa của riêng bạn*, và biết dừng lại khi không chắc thay vì tự tin trả về số sai.

Đó là lý do Semantix không định vị mình là "ChatGPT cho database", mà là một nền tảng nơi AI hỏi đúng vì được dạy đúng - qua bốn lớp intent, schema linking, Semantic Layer, và thực thi an toàn. Bạn hỏi bằng tiếng Việt như nói với một analyst giỏi: trả lời trong vài giây, không bao giờ bận, và luôn dùng đúng một định nghĩa "doanh thu".

---

*Muốn xem AI trả lời câu hỏi dữ liệu của chính bạn bằng tiếng Việt? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì - lớp nền giúp AI hiểu đúng](/blog/semantic-layer/).*
