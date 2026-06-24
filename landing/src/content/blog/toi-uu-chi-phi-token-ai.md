---
title: "Tối ưu token: hoá đơn AI phình to không phải vì bạn hỏi nhiều — mà vì mỗi câu hỏi vác theo cả tấn ngữ cảnh thừa"
code: "ai-004"
description: "Hoá đơn token tháng này gấp 3, dù số câu hỏi gần như không đổi. Tiền không chảy vào câu trả lời — nó chảy vào ngữ cảnh thừa. Cách cắt 40–60% chi phí AI mà không giảm chất lượng."
pubDate: 2026-08-11
category: "AI & Công Nghệ"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/toi-uu-chi-phi-token-ai.svg"
coverAlt: "Cột chi phí token cao bị một lớp lọc ngữ cảnh cắt xuống thấp hơn nhiều"
---

*Muốn AI trả lời câu hỏi dữ liệu của bạn mà không đốt token vô tội vạ? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*

Đầu tháng, bạn mở hoá đơn API của nhà cung cấp AI và giật mình: con số gấp gần **ba lần** tháng trước. Phản xạ đầu tiên rất tự nhiên — "chắc đội mình hỏi nhiều hơn". Bạn mở log ra đếm. Số câu hỏi gần như **không đổi**. Vậy tiền chảy đi đâu?

Đây là nghịch lý mà gần như doanh nghiệp nào cắm AI vào dữ liệu cũng vấp phải, chỉ là phát hiện sớm hay muộn: hoá đơn AI phình to **không phải vì bạn hỏi nhiều** — mà vì mỗi câu hỏi đang vác theo cả tấn **ngữ cảnh thừa**. Mỗi lần ai đó gõ một câu hỏi ngắn năm chữ, hệ thống lặng lẽ nhét theo cả nghìn dòng schema thô, vài đoạn prompt nhồi sẵn, lịch sử hội thoại không cần thiết — và bạn trả tiền cho **từng token** trong đống đó.

Tin tốt: phần lớn đống ngữ cảnh thừa ấy có thể cắt mà **không** đụng tới chất lượng câu trả lời. Cắt được 40–60% chi phí là chuyện khả thi — và hầu hết nằm ở chỗ bạn không ngờ.

## Tiền chảy đi đâu: token đầu vào, không phải câu trả lời

Hầu hết mọi người hình dung chi phí AI nằm ở câu trả lời — AI "nghĩ" càng nhiều, càng tốn. Sai. Với bài toán hỏi-đáp dữ liệu, phần lớn tiền chảy vào **token đầu vào (input)**: đống ngữ cảnh bạn gửi *kèm* câu hỏi, trước khi AI viết được một chữ.

Một câu hỏi điển hình *"doanh thu tháng này theo chi nhánh"* chỉ vài chục token. Nhưng để AI trả lời, hệ thống thường nhồi theo: toàn bộ schema database (hàng trăm bảng, hàng nghìn cột), mô tả từng cột, vài ví dụ mẫu, hướng dẫn định dạng, lịch sử chat... Tổng cộng có thể **vài nghìn tới vài chục nghìn token** — gấp hàng trăm lần câu hỏi gốc. Bạn trả tiền chủ yếu cho phần *chuẩn bị*, không phải phần *trả lời*.

Hãy hình dung thế này: bạn nhờ một anh shipper giao đúng **một gói hàng** tới nhà khách. Thay vì lấy đúng gói đó, anh ta **chở nguyên cả kho hàng** lên xe rồi mới chạy đi, phòng khi cần. Khách chỉ nhận một gói, nhưng bạn trả xăng cho cả chuyến chở kho. Dump nguyên schema thô vào mỗi câu hỏi đúng là chở cả kho đi giao một gói.

Hiểu được chỗ này là chìa khoá: muốn cắt chi phí, đừng tìm cách làm AI "nghĩ rẻ hơn". Hãy cắt **ngữ cảnh thừa ở đầu vào**. Dưới đây là năm đòn bẩy, xếp từ tác động lớn nhất.

## Đòn bẩy 1 — Đừng dump schema thô, hãy đưa ngữ cảnh đã chuẩn hoá

Đây là nguồn lãng phí lớn nhất, và cũng dễ bị bỏ qua nhất. Cách làm "cắm AI thẳng vào database" mặc định là **dump toàn bộ schema thô** vào prompt: tên bảng, tên cột, kiểu dữ liệu, đôi khi cả vài dòng dữ liệu mẫu cho mỗi bảng. Doanh nghiệp 300 bảng thì mỗi câu hỏi vác theo mô tả của cả 300 bảng — trong khi câu hỏi chỉ chạm tới 2 bảng.

Một **Semantic Layer** lật ngược chuyện này. Thay vì để AI tự bơi trong schema thô, nó đưa cho AI đúng vài định nghĩa nghiệp vụ liên quan — "doanh thu", "chi nhánh", "tháng này" — đã được mô tả gọn và chuẩn. AI không cần thấy 298 bảng còn lại. Ngữ cảnh vừa **gọn hơn** (ít token hơn) vừa **chuẩn hơn** (AI bớt đoán, bớt phải viết lại). Đây cũng chính là lớp nền mà chúng tôi mổ xẻ trong [Semantic Layer: vì sao công ty bạn có ba con số doanh thu](/blog/semantic-layer/) — nó vừa khử lỗi *vừa* cắt token.

*Ví dụ minh hoạ:* một câu hỏi vác theo schema thô tốn ~8.000 token đầu vào; cũng câu đó, đưa qua ngữ cảnh đã chuẩn hoá còn ~2.000 token. Riêng đòn này đã cắt phần lớn hoá đơn. (Con số chỉ để minh hoạ — hiệu quả thật tuỳ độ phức tạp schema của bạn.)

> Quy tắc vàng: bạn trả tiền cho mỗi token gửi đi, không phải mỗi câu hỏi. Cắt ngữ cảnh thừa luôn rẻ hơn tối ưu câu trả lời.

## Đòn bẩy 2 — Bật prompt caching cho phần ngữ cảnh lặp lại

Để ý một điều: phần ngữ cảnh đầu vào của bạn **gần như giống hệt nhau** giữa các câu hỏi. Cùng bộ định nghĩa, cùng hướng dẫn định dạng, cùng vài ví dụ mẫu — chỉ câu hỏi cuối là khác. Vậy mà mặc định, mỗi lần gọi bạn trả tiền *toàn giá* cho cả khối lặp lại đó, như thể nó hoàn toàn mới.

**Prompt caching** (bộ nhớ đệm prompt) giải đúng chuyện này. Phần ngữ cảnh cố định được nhà cung cấp lưu đệm sau lần đầu; những lần sau, phần đã cache tính phí **rẻ hơn nhiều lần** so với token thường. Bạn không đổi một chữ trong câu trả lời — chỉ ngừng trả full giá cho thứ đã gửi đi mười lần.

*Ví dụ minh hoạ:* nếu 80% ngữ cảnh đầu vào là phần lặp lại và được cache, chi phí input của các câu hỏi sau đợt đầu có thể giảm 50–70%. Đòn này hiệu quả nhất khi nhiều người hỏi liên tục trên cùng một bộ ngữ cảnh — đúng kịch bản một đội dùng chung dashboard.

## Đòn bẩy 3 — Định tuyến model theo độ khó, đừng dùng model đắt cho mọi câu

Không phải câu hỏi nào cũng cần con dao mổ trâu. *"Tổng đơn hôm nay"* là đếm-cộng đơn thuần; *"phân tích vì sao cohort tháng 3 rớt giữ chân ở tuần 6"* mới thực sự cần năng lực suy luận của model đầu bảng. Vậy mà nhiều hệ thống đẩy **mọi** câu — dễ hay khó — vào cùng một model đắt nhất. Đó là bật taxi hạng sang cho cả quãng đường, kể cả lúc chỉ đi qua đường mua mớ rau.

**Định tuyến model (model routing / cascade)** phân loại độ khó câu hỏi trước, rồi gửi câu đơn giản cho model rẻ (hoặc thậm chí xử lý bằng luật tất định, không tốn token), chỉ dành model đắt cho câu thật sự khó. Như đã nhắc trong [Text-to-SQL: vì sao AI viết SQL không bao giờ lỗi mà vẫn trả số sai](/blog/text-to-sql/), thường **40–60% câu hỏi là loại đơn giản** — đếm, tổng, trung bình — hoàn toàn không cần tới model mạnh nhất.

*Ví dụ minh hoạ:* đẩy 50% câu dễ xuống một model rẻ hơn 5–10 lần, phần chi phí của nhóm câu đó gần như biến mất, kéo tổng hoá đơn xuống đáng kể mà người dùng không nhận ra khác biệt về chất lượng câu trả lời.

## Đòn bẩy 4 — Nén và tỉa ngữ cảnh trước khi gửi

Ngay cả sau khi đã bỏ schema thô, phần ngữ cảnh còn lại vẫn thường **dư**. Lịch sử hội thoại mười lượt trước trong khi câu hiện tại chẳng liên quan. Năm ví dụ mẫu trong khi hai cái là đủ. Mô tả dài dòng cho những bảng câu hỏi này không đụng tới.

**Tỉa ngữ cảnh (context pruning/compression)** là bước lọc trước khi gửi: chỉ giữ đúng phần liên quan tới *câu hỏi này*. Dùng tìm kiếm ngữ nghĩa để rút đúng định nghĩa cần thiết, tóm tắt lịch sử chat dài thành vài dòng, cắt ví dụ mẫu thừa. Ý tưởng giống *schema linking* trong Text-to-SQL — nhưng ở đây mục tiêu thẳng vào **token và tiền**, không chỉ độ chính xác.

*Ví dụ minh hoạ:* tỉa lịch sử hội thoại và ví dụ mẫu thừa có thể cắt thêm 15–30% token đầu vào trên mỗi câu — cộng dồn với các đòn trên thành khác biệt lớn cuối tháng.

## Đòn bẩy 5 — Tái dùng định nghĩa, đừng để LLM suy diễn lại mỗi lần

Đòn cuối tinh tế hơn nhưng tích luỹ rất mạnh. Khi không có định nghĩa sẵn, mỗi lần gặp "khách hàng hoạt động", AI phải **suy diễn lại từ đầu**: đọc schema, đoán điều kiện, dựng logic — tốn token cho phần suy luận, và lần sau gặp lại vẫn làm lại từ đầu. Như bắt một nhân viên tính lại công thức doanh thu mỗi sáng vì hôm qua không ai chịu ghi nó ra giấy.

Khi định nghĩa được **khai báo một lần** và tái dùng, AI không còn phải suy diễn — nó chỉ tra và lắp. Phần token dành cho "nghĩ ra logic" gần như biến mất, và câu trả lời còn nhất quán hơn. Đây là chỗ tối ưu chi phí và chống [ảo giác AI bịa SQL](/blog/llm-bia-sql/) gặp nhau: cùng một hành động — đưa định nghĩa sẵn — vừa cắt token vừa khử lỗi.

## … trong Semantix

Đến đây có một sợi chỉ xuyên suốt, và nó là điểm dễ hiểu sai nhất. Cách Semantix cắt chi phí AI **không phải** đi săn "một nhà cung cấp token rẻ hơn", cũng **không phải** ép AI trả lời cụt lủn để bớt chữ. Đổi nhà cung cấp chỉ dời con số, không chạm tới gốc lãng phí; cắt câu trả lời thì làm hỏng đúng thứ bạn cần.

Định vị của Semantix là **phủ định** cách tiếp cận đó: thay vì tối ưu đầu ra, nó **cắt ngữ cảnh thừa ngay từ gốc đầu vào**. Vì Semantix được xây quanh một Semantic Layer, AI không bao giờ nhận schema thô để bơi — nó nhận đúng vài định nghĩa đã chuẩn hoá cho câu hỏi này. Phần ngữ cảnh cố định được cache; câu dễ được định tuyến xuống model rẻ hoặc luật tất định; định nghĩa được tái dùng thay vì suy diễn lại. Bạn không trả tiền để chở cả kho đi giao một gói. *(Vì sao đây khác hẳn một chatbot cắm thẳng vào database, xem [Semantic Layer vs chatbot database](/blog/semantic-layer-vs-chatbot-database/).)* Và vì hỗ trợ [nhiều nhà cung cấp với khoá của bạn](/blog/multi-provider-byok/), bạn còn chủ động chọn model rẻ/đắt theo nhu cầu thật.

## Tóm lại

Hoá đơn AI phình to không phải vì bạn hỏi nhiều — mà vì mỗi câu hỏi vác theo ngữ cảnh thừa bạn đang trả full giá. Cắt nó ở gốc, không đụng tới chất lượng:

| Nhồi context thô | Tối ưu |
|---|---|
| Dump nguyên schema vào mỗi câu | Đưa ngữ cảnh đã chuẩn hoá qua Semantic Layer |
| Trả full giá cho phần lặp lại | Bật prompt caching cho ngữ cảnh cố định |
| Một model đắt cho mọi câu | Định tuyến model theo độ khó (cascade) |
| Gửi cả lịch sử + ví dụ thừa | Tỉa & nén, chỉ giữ phần liên quan |
| LLM suy diễn lại định nghĩa mỗi lần | Khai báo một lần, tái dùng |

Các con số phần trăm ở trên đều là **minh hoạ** — hiệu quả thật tuỳ schema, kiểu câu hỏi và lưu lượng của bạn. Nhưng nguyên lý thì không đổi: lần tới khi ai đó đề xuất "đổi sang model rẻ hơn để tiết kiệm", hãy hỏi lại một câu sắc hơn — *"mỗi câu hỏi của mình đang vác theo bao nhiêu token thừa?"* Trả lời được câu đó, bạn đã nhìn thấy 40–60% hoá đơn mà phần lớn doanh nghiệp chưa từng để ý.

---

*Muốn xem AI trả lời câu hỏi dữ liệu của bạn bằng tiếng Việt mà không đốt token vô tội vạ? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*
