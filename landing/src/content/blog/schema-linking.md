---
title: "Schema linking: bạn hỏi 'doanh thu', nhưng database có 40 bảng - làm sao AI biết lấy đúng cột?"
code: "ai-007"
description: "Bạn hỏi 'doanh thu tháng này'. Database có cột rev_amt, total, gmv ở ba bảng khác nhau. Làm sao AI biết lấy đúng cái nào? Đó là bài toán schema linking - bước AI đọc cấu trúc thô và nối từ với đúng bảng/cột."
pubDate: 2026-05-04
category: "AI & Công Nghệ"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/schema-linking.png"
coverAlt: "Câu hỏi tiếng Việt được nối tới đúng bảng và cột trong sơ đồ database"
---

Bạn gõ vào ô chat một câu rất đời thường: *"Doanh thu tháng này bao nhiêu?"*

Phía sau câu hỏi đó, database của bạn không hề "đời thường" chút nào. Nó có 40 bảng. Một bảng tên `orders`, một bảng `order_items`, một bảng `transactions`, một bảng `gmv_daily`. Riêng "doanh thu" đã nằm rải ở ba cột mang ba cái tên không liên quan gì đến tiếng Việt: `rev_amt`, `total`, `gmv`. Cột `total` thì chưa trừ chiết khấu. Cột `gmv` gộp cả đơn đã hủy. Cột `rev_amt` mới là con số kế toán thật sự dùng.

Phản xạ đầu tiên của bạn có thể là: *"Thì AI đọc hết rồi tự chọn chứ gì."* Nhưng đây mới đúng là chỗ khó nhất - và là chỗ ít người để ý. Trước khi AI viết được một dòng SQL, nó phải trả lời một câu hỏi tưởng dễ mà hóa khó: **trong câu hỏi tiếng Việt của bạn, từ "doanh thu" tương ứng với *cái cột nào*, ở *cái bảng nào*?**

Đó là bài toán **schema linking** (nối lược đồ - nối từ trong câu hỏi với đúng bảng/cột trong database). Và nó là bước thầm lặng đứng giữa câu hỏi của bạn và con số trả về.

## Schema linking là gì - và nó khác gì hai khái niệm bạn hay nghe?

Để khỏi nhầm, hãy đặt ba khái niệm cạnh nhau, vì chúng hay bị gộp làm một:

- **Text-to-SQL** (AI dịch câu hỏi tiếng Việt thành câu lệnh SQL) là cả quy trình lớn, từ câu hỏi đến truy vấn.
- **Semantic Layer** (tầng định nghĩa nghiệp vụ dùng chung) là nơi "doanh thu", "khách hoạt động"... được định nghĩa *một lần* cho cả công ty.
- **Schema linking** là một bước *bên trong* quy trình đó: nối **từ trong câu hỏi** với **đúng bảng và đúng cột** trong cấu trúc database.

Nói gọn: schema linking là lúc AI nhìn vào cuốn "danh bạ" của database và khoanh tròn đúng những dòng cần dùng cho câu hỏi này. Nó chưa viết SQL. Nó chỉ đang trả lời: *"doanh thu" → bảng `orders`, cột `rev_amt`; "tháng này" → cột `created_at`; "khách" → bảng `customers` nối qua `customer_id`.*

> Quy tắc vàng: **nối sai một cái cột ở đây, mọi thứ sau đó dù chạy trơn tru vẫn trả về số sai.** Schema linking là bước âm thầm quyết định con số đúng hay sai - chứ không phải bước viết SQL.

## AI thật ra "thấy" gì khi nhìn vào database của bạn?

Khi bạn cắm một database vào, thứ AI nhận được không phải tiếng Việt, mà là **schema** (cấu trúc bảng/cột) - một bản kê khô khốc gồm bốn loại thông tin:

```text
Bảng: orders
  - id            (số nguyên, khóa chính)
  - customer_id   (số nguyên, khóa ngoại → customers.id)
  - rev_amt       (số thập phân)
  - total         (số thập phân)
  - status        (chuỗi)
  - created_at    (ngày giờ)

Bảng: order_items
  - order_id      (số nguyên, khóa ngoại → orders.id)
  - product_id    (số nguyên, khóa ngoại → products.id)
  - qty           (số nguyên)
```

AI thấy bốn thứ: **tên bảng** (`orders`), **tên cột** (`rev_amt`), **kiểu dữ liệu** (số thập phân, ngày giờ), và **khóa ngoại** (foreign key - cột chỉ sang bảng khác, nối `orders.customer_id` về `customers.id`). Khóa ngoại chính là tấm bản đồ cho biết các bảng **join** (nối bảng theo khóa chung) với nhau ra sao.

Và đây là vấn đề: cái bản kê đó *không nói tiếng người*. Nó cho AI biết có một cột tên `rev_amt`, kiểu số thập phân. Nó **không** cho AI biết `rev_amt` nghĩa là "doanh thu thực sau chiết khấu", còn `total` chỉ là "giá niêm yết trước giảm". Với schema trần, hai cột đó trông y hệt nhau: cùng kiểu số, cùng nằm trong bảng đơn hàng.

<div class="viz">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
<defs>
<marker id="arrSL" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 Z" fill="#818CF8"/></marker>
</defs>
<rect x="20" y="120" width="220" height="60" rx="12" fill="#1E293B" stroke="#334155"/>
<text x="130" y="148" fill="#E2E8F0" font-size="16" text-anchor="middle">"doanh thu</text>
<text x="130" y="168" fill="#E2E8F0" font-size="16" text-anchor="middle">tháng này?"</text>
<text x="130" y="108" fill="#64748B" font-size="12" text-anchor="middle">CÂU HỎI TIẾNG VIỆT</text>
<text x="300" y="135" fill="#818CF8" font-size="13" text-anchor="middle" font-weight="700">schema</text>
<text x="300" y="151" fill="#818CF8" font-size="13" text-anchor="middle" font-weight="700">linking</text>
<path d="M242 150 L370 150" stroke="#818CF8" stroke-width="2.5" fill="none" marker-end="url(#arrSL)"/>
<rect x="400" y="40" width="340" height="220" rx="12" fill="#0B1220" stroke="#312E81"/>
<text x="420" y="68" fill="#94A3B8" font-size="13" font-weight="700">DATABASE - bảng orders</text>
<rect x="420" y="84" width="300" height="32" rx="6" fill="#1E293B" stroke="#334155"/>
<text x="434" y="105" fill="#64748B" font-size="14">total</text>
<text x="706" y="105" fill="#475569" font-size="12" text-anchor="end">trước giảm</text>
<rect x="420" y="124" width="300" height="32" rx="6" fill="#14241C" stroke="#4ADE80" stroke-width="2"/>
<text x="434" y="145" fill="#4ADE80" font-size="14" font-weight="700">rev_amt</text>
<text x="706" y="145" fill="#4ADE80" font-size="12" text-anchor="end">đúng cái cần</text>
<rect x="420" y="164" width="300" height="32" rx="6" fill="#1E293B" stroke="#334155"/>
<text x="434" y="185" fill="#64748B" font-size="14">gmv</text>
<text x="706" y="185" fill="#475569" font-size="12" text-anchor="end">gồm đơn hủy</text>
<rect x="420" y="204" width="300" height="32" rx="6" fill="#1E293B" stroke="#334155"/>
<text x="434" y="225" fill="#64748B" font-size="14">created_at</text>
<text x="706" y="225" fill="#475569" font-size="12" text-anchor="end">"tháng này"</text>
<path d="M372 150 C390 150 392 140 418 140" stroke="#4ADE80" stroke-width="2.5" fill="none" marker-end="url(#arrSL)"/>
</svg>
<div class="viz-caption">Schema linking: nối "doanh thu" với đúng cột rev_amt giữa một rừng cột na ná nhau (sơ đồ minh họa).</div>
</div>

## Vì sao tên cột tối nghĩa làm AI đoán sai

Database thật hiếm khi đặt tên đẹp. Chúng được kỹ sư đặt nhanh từ nhiều năm trước, mỗi người một kiểu: `rev_amt`, `amt_2`, `t_total`, `cust_v2`, `gmv`. Có cột viết tắt, có cột đánh số, có cột là di tích của một lần migrate dữ liệu mà không ai dám xóa.

Với một con người mới vào công ty, đọc đống tên này cũng phải đi hỏi. Với AI, nó không có ai để hỏi - nó chỉ có thể **đoán dựa trên sự giống nhau về mặt chữ**. Và đoán theo chữ là nơi sai số sinh ra:

- Bạn hỏi *"khách hàng"*. Database có `customers`, `customer_profiles`, và một bảng cũ tên `cust_legacy` còn 12.000 dòng. AI nối vào bảng nào? Nếu vớ phải `cust_legacy`, bạn đang đếm khách trên dữ liệu chết.
- Bạn hỏi *"doanh thu"*. Có `rev_amt` (đúng) và `gmv` (gồm cả đơn hủy). Tên `gmv` nghe "doanh thu" hơn cả `rev_amt` với một mô hình chỉ đọc chữ - nó dễ nối nhầm.
- Bạn hỏi *"đơn thành công"*. Cột `status` có giá trị `completed`, `done`, `success`, `paid` lẫn lộn do nhập từ ba kênh. AI lọc theo `status = 'completed'` và bỏ sót một nửa đơn ghi là `paid`.

Cả ba trường hợp, SQL chạy ngon, ra một con số tròn trịa, không một dòng báo lỗi. Bạn mang nó vào phòng họp. Đó chính là cái bẫy: **schema linking sai không gây lỗi đỏ - nó gây số sai trông như đúng.** (Cùng họ với cái bẫy mà chúng tôi mổ trong bài [Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi mà vẫn trả về số sai](/blog/text-to-sql/).)

Tôi thấm cái "rừng cột na ná nhau" này từ hai phía. Hồi làm trưởng nhóm DA ở một công ty công nghệ lõi của hệ sinh thái e-commerce, dữ liệu tracking bán cấu trúc đẻ ra cột nhanh hơn người ta kịp đặt tên cho tử tế - một sự kiện có dăm bảy trường na ná. Giờ làm BI ở một ngân hàng, vấn đề đảo chiều: nghiệp vụ chia ra hàng chục bảng, mỗi bảng vài chục cột, và "doanh thu" với người làm tín dụng khác hẳn "doanh thu" của khối thẻ. Bài học chung của cả hai nơi giống nhau đến lạ: không ai thuộc hết được cấu trúc, nên thứ cứu mình không phải trí nhớ mà là cái nhãn nghĩa dán sẵn lên từng cột.

## Cách nối đúng: cho AI thứ mà schema trần không có

Tin tốt: bài toán này giải được, và cách giải không phải "đổi sang AI thông minh hơn" - mà là **cho AI thêm ngữ cảnh** mà schema trần thiếu. Có ba mảnh ghép:

**1. Mô tả cột (description) và nhãn tiếng Việt.** Thay vì để AI đoán `rev_amt` là gì, ta gắn vào nó một dòng mô tả: *"Doanh thu thực đã trừ chiết khấu, chỉ tính đơn hoàn tất."* Giờ khi bạn hỏi "doanh thu", AI nối được vì *nghĩa khớp*, không phải vì *chữ giống*.

**2. Bí danh (alias) - các tên gọi mà người Việt thật sự dùng.** "Doanh thu", "doanh số", "tiền về", "thực thu" đều trỏ về cùng cột `rev_amt`. Khai báo trước những cách gọi này, AI khỏi vấp khi mỗi phòng ban gọi một kiểu.

**3. Quan hệ rõ ràng (relationship / khóa ngoại).** Khai báo *"orders nối customers qua customer_id"* để AI join đúng đường. Một database lớn có hàng chục đường join khả dĩ giữa hai bảng; chọn nhầm đường là số bị nhân bản hoặc thiếu hụt.

Để ý: cả ba mảnh ghép trên đều là **lớp ý nghĩa phủ lên trên schema trần**. Và đó chính là lý do dẫn ta tới phần quan trọng nhất.

## Vì sao schema trần không bao giờ đủ - và Semantic Layer bước vào

Bạn có thể nhồi cho AI cả nghìn cột kèm mô tả, và nó vẫn đoán. Vì schema - kể cả schema có mô tả tốt - chỉ trả lời được câu hỏi *"cột này là gì"*. Nó không trả lời được câu hỏi nghiệp vụ ở tầng trên: *"khi công ty này nói **doanh thu**, họ tính theo công thức nào, loại trừ những gì, join qua những bảng nào?"*

Đó là việc của **Semantic Layer**. Schema linking *chọn đúng cột*; Semantic Layer *định nghĩa đúng nghĩa của con số* - gồm cả công thức, bộ lọc mặc định và đường join chuẩn. Hai thứ làm việc tay đôi: Semantic Layer cho schema linking một mục tiêu rõ ràng để nối tới, thay vì một rừng cột để đoán.

Đây cũng là ranh giới phân biệt một công cụ "cắm chatbot thẳng vào database" với một nền tảng nghiêm túc. Chatbot cắm thẳng phải đoán schema mỗi lần hỏi; nền tảng có Semantic Layer thì đã có sẵn bản đồ. Chúng tôi đã mổ xẻ khác biệt này kỹ trong bài [Semantic Layer vs "chatbot cắm thẳng vào database"](/blog/semantic-layer-vs-chatbot-database/) - và vì sao [Semantic Layer là lớp nền giúp AI hiểu đúng](/blog/semantic-layer/) là điều kiện cần, không phải tính năng làm sang.

## ... trong Semantix

Semantix không định vị mình là "chatbot đọc schema rồi đoán". Khi bạn cắm dữ liệu vào, quy trình nối từ → bảng/cột đi qua ba bước neo chặt vào ý nghĩa, không thả nổi cho AI suy đoán:

1. **Đọc schema thô** - Semantix tự đọc cấu trúc bảng, cột, kiểu dữ liệu và khóa ngoại của nguồn dữ liệu. Nếu bạn dùng database NocoBase do Semantix cung cấp, nó còn đọc luôn cả nhãn tiếng Việt, danh sách giá trị (enum) và quan hệ - bạn khỏi khai lại từ đầu.
2. **Phủ lớp Ngữ cảnh ngữ nghĩa** - bạn (hoặc Semantix) gắn mô tả, bí danh tiếng Việt và quan hệ chuẩn lên từng thực thể (entity). Đây là nơi "doanh thu" được buộc cứng vào `rev_amt` với công thức đúng.
3. **Nối có kiểm chứng, không đoán mò** - khi bạn hỏi, hệ thống nối từ trong câu hỏi tới đúng bảng/cột đã được định nghĩa, và *từ chối* nối vào bảng/cột không tồn tại hay không hợp lý - thay vì bịa ra một cái nghe có vẻ đúng.

Kết quả: bạn hỏi "doanh thu" bằng tiếng Việt, và mười người trong công ty hỏi cùng câu đó đều nhận đúng một con số - vì tất cả đều nối về đúng một định nghĩa.

## Tóm lại

| | Schema trần (AI tự đoán) | Schema + lớp ý nghĩa (Semantix) |
|---|---|---|
| AI thấy gì | Tên cột, kiểu dữ liệu, khóa ngoại | Thêm: mô tả, bí danh tiếng Việt, quan hệ chuẩn |
| Nối "doanh thu" | Đoán theo chữ → dễ vớ `gmv`, `total` | Khớp theo nghĩa → đúng `rev_amt` |
| Khi không chắc | Vẫn nối đại, trả số | Nối về định nghĩa có sẵn, hoặc báo không chắc |
| Mười người cùng hỏi | Có thể ra mười con số | Một con số duy nhất |
| Lỗi sinh ra | Số sai trông như đúng | Chặn ngay từ bước nối |

Schema linking là bước âm thầm nhất trong cả quy trình AI đọc dữ liệu - và cũng là bước quyết định nhất. Viết SQL thì AI hiện đại làm tốt rồi. Nối *đúng cái cột* giữa một database 40 bảng đặt tên lộn xộn mới là phần khó. Và phần đó không giải bằng AI giỏi hơn, mà bằng cách cho AI một lớp ý nghĩa rõ ràng để nối tới - thay vì để nó đoán.

---

*Muốn xem AI nối đúng bảng/cột trên chính database của bạn? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì - lớp nền giúp AI hiểu đúng](/blog/semantic-layer/).*
