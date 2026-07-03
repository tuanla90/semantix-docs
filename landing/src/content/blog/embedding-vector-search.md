---
title: "Embedding & Vector Search: vì sao AI hiểu câu gần nghĩa - nền tảng dưới RAG"
code: "kt-017"
description: "Máy tính không hiểu chữ. Nó chỉ hiểu toạ độ của chữ. Vậy mà bạn gõ 'khách sộp', nó vẫn lôi đúng nhóm 'khách VIP' ra. Bài này giải thích vì sao."
pubDate: 2026-04-06
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/embedding-vector-search.png"
coverAlt: "Các câu chữ trở thành điểm trong không gian, cụm gần nghĩa nằm gần nhau, một mũi tên tìm kiếm"
---

Bạn gõ vào ô tìm kiếm: *"khách sộp mua nhiều"*. Trong dữ liệu của bạn không có chữ nào tên là "khách sộp" - nhãn chính thức là **"khách VIP"**. Vậy mà hệ thống vẫn lôi đúng nhóm đó ra, kèm cả mấy câu hỏi cũ kiểu *"khách chi đậm nhất quý này"*. Bạn chưa gõ trùng một từ khoá nào. Nó vẫn hiểu.

Phản xạ đầu tiên của bạn có thể là: *"Chắc nó có bảng từ đồng nghĩa, ai đó ngồi khai 'sộp = VIP'."* Sai. Không ai khai gì cả. Và đây là chỗ ngược đời nhất, đáng để dừng lại một nhịp: **máy tính không hề hiểu chữ "sộp" nghĩa là gì. Nó chỉ biết toạ độ của chữ "sộp" nằm rất gần toạ độ của chữ "VIP".** Hai từ khác mặt chữ hoàn toàn, nhưng đứng sát nhau trong một không gian mà mắt người không nhìn thấy.

Hiểu được trò "toạ độ của ý nghĩa" này, bạn nắm được lớp nền nằm dưới gần như mọi tính năng AI dữ liệu hiện đại - kể cả **RAG (Retrieval-Augmented Generation - cho AI tra tài liệu trước khi trả lời)** mà có thể bạn đã nghe. Tin tốt: nó không khó như cái tên. Chỉ là một mẹo biến chữ thành số, rồi đo khoảng cách.

## Máy không đọc chữ - nó đọc số

Sự thật phũ phàng đầu tiên: một **LLM (Large Language Model - mô hình ngôn ngữ lớn)** hay bất kỳ máy tính nào cũng không "đọc" được chữ theo cách bạn đọc. Với máy, chữ chỉ là một dãy ký tự vô nghĩa cho tới khi được dịch sang **số**. Cả ngành AI ngôn ngữ thật ra xoay quanh một câu hỏi: *dịch chữ sang số thế nào để hai câu gần nghĩa thì hai dãy số cũng gần nhau?*

Câu trả lời là **embedding (mã hoá văn bản thành vector - dãy số biểu diễn ý nghĩa)**. Bạn đưa một câu vào, mô hình nhả ra một **vector (dãy số nhiều chiều, mỗi số là một toạ độ)** - thường là vài trăm tới vài nghìn con số. Dãy số đó chính là *"toạ độ ý nghĩa"* của câu, giống như mỗi địa điểm trên bản đồ có một cặp toạ độ (kinh độ, vĩ độ), chỉ khác là ở đây không phải 2 chiều mà là *hàng trăm* chiều.

Đừng sợ chữ "nhiều chiều". Bạn dùng nó mỗi ngày mà không gọi tên. Khi bạn nói *"quán này gần nhà tôi"*, bạn đang đo khoảng cách 2 chiều. Khi bạn nói *"hai người này hợp nhau"*, bạn đang ngầm đo khoảng cách trên nhiều chiều cùng lúc - tuổi tác, sở thích, tính cách. Embedding làm đúng điều đó với câu chữ: gói tất cả "sắc thái nghĩa" vào một bộ toạ độ.

> Quy tắc vàng: máy không hiểu chữ. Nó biến chữ thành một điểm trong không gian, rồi mọi câu hỏi về *nghĩa* đều quy về một câu hỏi về *khoảng cách*.

## Câu gần nghĩa thì điểm gần nhau

Đây là phép màu thật sự, và nó đơn giản đến bất ngờ. Sau khi mã hoá, **những câu nói về cùng một ý sẽ rơi vào cùng một vùng trong không gian** - dù chúng dùng từ ngữ khác hẳn nhau. "Khách sộp", "khách VIP", "khách chi đậm" tụm thành một cụm. Còn "khách bỏ giỏ hàng", "khách không quay lại" tụm thành cụm khác, nằm ở góc xa.

<div class="viz">
<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect width="680" height="380" rx="12" fill="#0F172A"/>
  <text x="28" y="40" fill="#E2E8F0" font-size="17" font-weight="700">Mỗi câu = một điểm. Gần nghĩa thì gần nhau.</text>
  <line x1="40" y1="330" x2="640" y2="330" stroke="#334155" stroke-width="1.5"/>
  <line x1="60" y1="70" x2="60" y2="330" stroke="#334155" stroke-width="1.5"/>
  <ellipse cx="200" cy="180" rx="120" ry="78" fill="#22D3EE" fill-opacity="0.08" stroke="#22D3EE" stroke-opacity="0.35" stroke-width="1.5"/>
  <circle cx="170" cy="150" r="6" fill="#22D3EE"/>
  <text x="182" y="146" fill="#A5F3FC" font-size="13" font-weight="600">khách VIP</text>
  <circle cx="240" cy="190" r="6" fill="#22D3EE"/>
  <text x="252" y="186" fill="#A5F3FC" font-size="13" font-weight="600">khách sộp</text>
  <circle cx="180" cy="225" r="6" fill="#22D3EE"/>
  <text x="192" y="221" fill="#A5F3FC" font-size="13" font-weight="600">khách chi đậm</text>
  <text x="120" y="115" fill="#67E8F9" font-size="12" font-weight="700" letter-spacing="1">CỤM &quot;KHÁCH GIÁ TRỊ CAO&quot;</text>
  <ellipse cx="510" cy="240" rx="115" ry="70" fill="#F87171" fill-opacity="0.08" stroke="#F87171" stroke-opacity="0.35" stroke-width="1.5"/>
  <circle cx="490" cy="220" r="6" fill="#F87171"/>
  <text x="502" y="216" fill="#FCA5A5" font-size="13" font-weight="600">khách bỏ giỏ</text>
  <circle cx="540" cy="265" r="6" fill="#F87171"/>
  <text x="448" y="290" fill="#FCA5A5" font-size="13" font-weight="600">khách không quay lại</text>
  <text x="430" y="180" fill="#FCA5A5" font-size="12" font-weight="700" letter-spacing="1">CỤM &quot;KHÁCH RỜI BỎ&quot;</text>
  <circle cx="300" cy="230" r="9" fill="none" stroke="#FBBF24" stroke-width="2.5"/>
  <text x="300" y="234" fill="#FBBF24" font-size="11" font-weight="800" text-anchor="middle">?</text>
  <text x="300" y="262" fill="#FCD34D" font-size="12" font-weight="600" text-anchor="middle">câu hỏi của bạn</text>
  <path d="M308 224 L420 200" stroke="#FBBF24" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M236 196 L294 224" stroke="#34D399" stroke-width="2.5"/>
  <text x="232" y="155" fill="#94A3B8" font-size="12">gần → khớp</text>
</svg>
<div class="viz-caption">Mỗi câu được mã hoá thành một điểm. Câu hỏi của bạn (vàng) rơi sát cụm "khách giá trị cao", nên hệ thống trả về cả nhóm đó - kể cả khi không trùng một từ khoá nào. (Vị trí các điểm là minh hoạ.)</div>
</div>

Khi đã có bản đồ này, **vector search (tìm kiếm vector - tìm theo độ gần nghĩa thay vì khớp đúng từ khoá)** chỉ làm một việc: mã hoá câu hỏi của bạn thành một điểm, rồi tìm những điểm *gần nó nhất*. Không so từng chữ. Không cần trùng từ khoá. Nó đo khoảng cách trong không gian nghĩa, lấy ra mấy điểm sát nhất, và đó là kết quả.

So sánh nhanh để thấy khác biệt. Tìm kiếm cũ kiểu Excel/Ctrl+F là **khớp từ khoá**: gõ "sộp" mà dữ liệu ghi "VIP" thì ra con số 0, dù hai thứ là một. Tìm kiếm vector là **khớp nghĩa**: gõ "sộp", nó vẫn lần ra "VIP" vì hai điểm đứng cạnh nhau. *Một bên đọc mặt chữ, một bên đọc ý.*

## Vì sao đây là nền tảng nằm dưới RAG

Giờ ghép mảnh cuối. Bạn đã nghe RAG là *"cho AI tra tài liệu trước khi trả lời để bớt bịa"* (nếu chưa, xem [RAG là gì](/blog/rag-la-gi/)). Nhưng có một câu hỏi ít ai hỏi: **làm sao hệ thống biết phải lôi đúng tài liệu nào ra để đưa cho AI đọc?** Một doanh nghiệp có hàng nghìn đoạn tài liệu, hàng trăm bảng dữ liệu. Đưa hết thì không nổi - vì **LLM** chỉ đọc được một lượng chữ giới hạn mỗi lần, gọi là **context window (cửa sổ ngữ cảnh - lượng chữ tối đa AI đọc được trong một lượt)**.

Đáp án chính là embedding + vector search. Quy trình gọn trong ba nhịp:

1. **Mã hoá trước.** Toàn bộ tài liệu, định nghĩa nghiệp vụ, cấu trúc bảng (schema) được biến thành vector và xếp sẵn trên bản đồ nghĩa.
2. **Tìm theo nghĩa.** Bạn hỏi, câu hỏi được mã hoá thành một điểm, vector search lôi ra vài mẩu *gần nghĩa nhất* - không phải tất cả, chỉ đúng phần liên quan.
3. **Nạp vào cửa sổ.** Mấy mẩu đó được nhét vào **context window** cùng câu hỏi, rồi AI mới trả lời - dựa trên tài liệu vừa đọc, không phải trí nhớ.

Nói cách khác: nếu RAG là người thủ thư đi tra sách trước khi trả lời, thì **vector search chính là cái khả năng "biết đi tới đúng kệ"**. Không có nó, thủ thư đứng giữa thư viện mù chữ - biết là phải tra, nhưng không biết tra ở đâu. Đây cũng đúng là cơ chế giúp một câu hỏi tiếng Việt tìm được đúng bảng, đúng cột để sinh truy vấn (xem [Text-to-SQL](/blog/text-to-sql/)), và là một phần lý do [Semantic Layer](/blog/semantic-layer/) đáng tiền: định nghĩa được mã hoá một lần, rồi câu nào gần nghĩa cũng tra trúng.

## Cẩn thận: gần NGHĨA không phải hiểu LOGIC

Đến đây dễ phấn khích quá đà. Phải hãm lại. Embedding mạnh ở **sắc thái nghĩa**, nhưng nó *mù* trước **logic và con số**. Đây là chỗ nhiều người vấp.

Với máy, *"doanh thu tăng"* và *"doanh thu giảm"* có thể nằm khá **gần** nhau - vì cả hai đều nói về "doanh thu" và "biến động". Hai câu nghĩa ngược nhau hoàn toàn, nhưng toạ độ lại sát. Tương tự, *"đơn trên 5 triệu"* và *"đơn dưới 5 triệu"* trông gần nhau với embedding, dù logic lọc ngược hẳn. **Vector search giúp tìm đúng chủ đề, nó không phán xử đúng/sai logic.** Việc đó là của bước sau - luật nghiệp vụ, semantic layer, sinh SQL chính xác.

Sự thật phũ phàng thứ hai: **chất lượng embedding phụ thuộc vào mô hình và dữ liệu mã hoá nó.** Một mô hình huấn luyện nghèo tiếng Việt sẽ đặt "khách sộp" cách xa "khách VIP" - và thế là hỏng cả trò. Dữ liệu bẩn, định nghĩa lẫn lộn thì bản đồ nghĩa cũng méo theo. *Embedding tốt là điều kiện cần, không phải đũa thần.*

## Embedding trong Semantix

Gói lại bằng góc nhìn thực dụng. Semantix không bán cho bạn "AI thông minh hơn" - như đã nói ở các bài trước, thông minh hơn không phải lời giải. Cái chạy âm thầm bên dưới là embedding: mỗi định nghĩa nghiệp vụ, mỗi cấu trúc bảng, mỗi câu hỏi từng được duyệt đều có một toạ độ trên bản đồ nghĩa của *riêng* doanh nghiệp bạn.

Tôi thấm trò này nhất khi đi tư vấn chuyển đổi số cho khách nhiều ngành - bán hàng, kho, xuất nhập khẩu, may mặc, phòng khám. Tự tay dựng DB cho từng nghiệp vụ, tôi gặp hoài cảnh một thực thể bị gọi mười kiểu rải rác hàng trăm cột: chỗ ghi "đối tác", chỗ ghi "nhà cung cấp", chỗ ghi "vendor". Mắt người dò tay thì mỏi và sót; còn đo theo nghĩa thì mấy cột na ná tự tụm một cụm, kéo ra rà lại nhanh hơn hẳn. Đúng cái khả năng đó cũng là thứ giúp một câu hỏi tiếng Việt nối được vào đúng cột để sinh truy vấn (xem [Schema Linking](/blog/schema-linking/)). Nhờ vector search, khi một nhân viên gõ *"hàng nào đẩy mạnh dịp Tết"* mà nhãn dữ liệu ghi *"sản phẩm chủ lực mùa lễ"*, hệ thống vẫn tra trúng. Khi mười người hỏi mười kiểu khác nhau về cùng một thứ, hệ thống gom được vì mười câu đó tụm một cụm. Định vị bằng phủ định cho rõ: đây **không phải** một ô tìm kiếm khớp từ khoá cứng nhắc, cũng **không phải** chatbot tự đoán mò - mà là một cái la bàn nghĩa, chỉ đúng kệ trước khi AI mở miệng.

## Tóm lại

| Tìm kiếm khớp từ khoá (cũ) | Vector search (tìm theo nghĩa) |
|---|---|
| So từng chữ - gõ "sộp" ≠ "VIP" → ra 0 | Đo khoảng cách nghĩa - "sộp" ≈ "VIP" → khớp |
| Phải khai từ đồng nghĩa thủ công | Tự gom câu gần nghĩa, không cần khai |
| Mù trước cách diễn đạt khác nhau | Hiểu được mười kiểu hỏi cùng một ý |
| Không giúp được RAG chọn tài liệu | Là lớp nền chọn đúng mẩu nạp vào context window |
| (cả hai) | Vẫn mù logic & con số - cần luật nghiệp vụ ở bước sau |

Lần tới khi một AI dữ liệu hiểu được câu hỏi lủng củng của bạn dù bạn gõ sai nhãn, đừng nghĩ "nó thông minh thật". Hãy nghĩ đúng hơn: **nó vừa biến câu của bạn thành một điểm, và tìm những điểm đứng gần.** Cả phép màu nằm ở chỗ đó - và cả giới hạn cũng nằm ở chỗ đó.

> Mental model: embedding biến mỗi câu thành một điểm trong không gian nghĩa; vector search là đi tìm hàng xóm gần nhất của điểm đó. Gần nghĩa = gần nhau. Nhưng "gần" chỉ nói về *chủ đề*, không nói về *đúng/sai logic*.

---

*Muốn thấy AI hiểu câu hỏi tiếng Việt của bạn dù gõ sai nhãn, rồi tra đúng định nghĩa trước khi trả lời? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
