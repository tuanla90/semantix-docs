---
code: "hd-017"
title: "Viết câu hỏi cho AI: cùng một ý hỏi khác đi một chút - ra số khác hẳn"
description: "Không phải AI dốt, là câu hỏi mơ hồ. Checklist 5 thành phần để viết MỘT câu hỏi tốt - kèm bộ trước/sau bạn áp được ngay khi gõ Enter."
pubDate: 2026-06-16
category: "Hướng Dẫn Thực Chiến"
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/viet-cau-hoi-cho-ai.svg"
coverAlt: "Câu hỏi mơ hồ mờ nhòe chuyển thành câu hỏi rõ nét rồi ra kết quả đúng"
---

Thử nghiệm nhỏ: gõ *"khách quay lại tháng này nhiều không?"*, AI trả **1.240**. Đổi đúng một chữ - *"khách **mua lại** tháng này nhiều không?"* - AI trả **890**. Cùng một ý trong đầu bạn, viết khác đi một chút, ra hai con số lệch nhau 350 người.

Phản xạ thường gặp: *"AI này không ổn định"*. Nhưng sự thật ngược đời là: **AI rất ổn định - nó trả lời chính xác cho cái bạn gõ, không phải cái bạn nghĩ.** "Quay lại" và "mua lại" là hai chuyện khác nhau, và bạn mới là người để khoảng trống đó.

Đã có bài về [5 câu hỏi nên hỏi](/blog/ai-questions/), về [7 lỗi câu hỏi hay gặp](/blog/7-cau-hoi-sai-voi-ai/), và về [vì sao AI tốt là AI biết hỏi lại](/blog/ai-biet-hoi-lai/). Bài này hẹp hơn tất cả: chỉ là **kỹ thuật viết MỘT câu hỏi tốt** - một checklist 5 thành phần bạn chạy qua trong đầu trước khi gõ Enter.

## 1. Cụ thể hóa - chốt kỳ, đơn vị, phạm vi

Từ mơ hồ nhất trong mọi câu hỏi là từ chỉ thời gian: "tháng này", "gần đây", "dạo này". AI buộc phải đoán, mà mỗi cách đoán cho một con số.

> **Mơ hồ:** "Doanh thu tháng này bao nhiêu?"
> **Rõ:** "Doanh thu từ 1/6 đến 23/6/2025, tính theo ngày giao thành công?"

Chốt ba thứ: **kỳ** (T6/2025, không phải "tháng này"), **đơn vị** (theo ngày đặt hay ngày giao?), **phạm vi** (cả nước hay một chi nhánh?). Càng ít chỗ trống, càng ít chỗ để đoán.

## 2. Cấp ngữ cảnh - kênh, chi nhánh, loại khách

Cùng câu hỏi, áp lên toàn bộ dữ liệu hay một lát cắt sẽ ra hai câu chuyện. Nếu trong đầu bạn đang nghĩ về một kênh hoặc một nhóm khách cụ thể, **nói ra** - đừng để AI gộp tất cả rồi đưa bạn con số trung bình vô nghĩa.

> **Mơ hồ:** "Sản phẩm nào bán chạy nhất?"
> **Rõ:** "Trên **kênh Shopee**, sản phẩm nào bán chạy nhất T6/2025, chỉ tính **khách mới**?"

Ngữ cảnh là kênh (Shopee/TikTok Shop/cửa hàng), chi nhánh, loại khách (mới/cũ/sỉ/lẻ). Thêm một mệnh đề, câu trả lời đi từ "đẹp mà chung chung" thành "dùng được ngay".

## 3. Định nghĩa từ mơ hồ - "khách tốt" nghĩa là gì?

Đây là cái bẫy âm thầm nhất. Những từ nghe ai cũng hiểu - "khách tốt", "đơn thành công", "hàng tồn", "khách quay lại" - với AI là **khoảng trống**. Nó sẽ tự dựng một định nghĩa rồi tính, mà không báo bạn nó đã chọn định nghĩa nào.

> **Mơ hồ:** "Khách tốt của tôi là ai?"
> **Rõ:** "Khách **mua ≥3 lần trong 6 tháng và chi >5 triệu** là ai?"

Quy tắc: nếu một từ trong câu có thể tính theo hai cách, **viết thẳng tiêu chí ra** thay vì để AI đoán hộ. "Khách tốt" của bạn có thể là chi nhiều; của người khác là quay lại đều. Chỉ bạn biết.

## 4. Một ý một câu - đừng hỏi ba thứ một lượt

Khi gấp, ta hay nhồi mọi thứ vào một dòng. Một câu ba ý buộc AI hoặc trả lời nửa vời cả ba, hoặc lặng lẽ bỏ quên một vế.

> **Mơ hồ:** "Sản phẩm nào bán chạy, khách bỏ giỏ ở đâu, và doanh thu so tháng trước thế nào?"
> **Rõ:** Tách thành ba câu - hỏi xong cái thứ nhất, đọc kỹ, rồi mới hỏi cái thứ hai.

Hỏi tách ra không chậm hơn. Bạn nhận được câu trả lời **sâu** cho từng phần, và quan trọng hơn - bạn kiểm soát được AI có hiểu đúng từng ý không, trước khi đi tiếp.

## 5. Nêu định dạng muốn nhận - bảng, biểu đồ, hay top N

Bạn biết mình muốn kết quả trông thế nào; AI thì không. Không nói, nó trả về một đoạn văn - trong khi cái bạn cần là một bảng dán thẳng vào báo cáo.

> **Mơ hồ:** "Cho tôi xem doanh thu theo sản phẩm."
> **Rõ:** "Liệt kê **top 10 sản phẩm** theo doanh thu T6/2025, dạng **bảng**, kèm cột % so tháng trước."

Nêu rõ: **dạng** (bảng / biểu đồ đường / cột), **số dòng** (top 10, không phải "tất cả"), **cột muốn thấy**. Một câu mô tả định dạng tiết kiệm cho bạn ba lần hỏi lại.

## ... trong Semantix

Cần nói rõ một điều, vì đây là chỗ dễ kỳ vọng sai. Semantix **không** hứa làm AI "thông minh tới mức tự hiểu mọi câu mơ hồ" - một model to hơn chỉ đoán *mượt* hơn, khó phát hiện sai hơn.

Điểm khác là **nền chuẩn**. Bạn hỏi bằng tiếng Việt như bình thường (AI lo phần **Text-to-SQL** - biến câu hỏi tiếng Việt thành câu lệnh truy vấn). Nhưng những từ hay gây lệch ở thành phần 1 và 3 - "doanh thu", "khách quay lại", "đơn hoàn tất" - đã được định nghĩa **một lần, chuẩn xác** trong **Semantic Layer** (Semantic Layer - tầng định nghĩa nghiệp vụ dùng chung). Nghĩa là một nửa checklist trên đã được neo sẵn ở nền, không phải gõ lại mỗi lần.

Còn lại là phần của bạn: cụ thể hóa kỳ, cấp ngữ cảnh, một-ý-một-câu, nêu định dạng. **Câu hỏi rõ + nền định nghĩa chuẩn = số đúng.** Thiếu vế nào cũng lệch.

## Tóm lại

Năm thành phần trên rút lại thành một bảng bạn ghim cạnh màn hình:

| Câu mơ hồ | Câu rõ |
|---|---|
| "Doanh thu tháng này?" | "Doanh thu 1-23/6/2025, theo ngày giao?" |
| "Sản phẩm nào bán chạy?" | "Trên Shopee, bán chạy nhất T6, chỉ khách mới?" |
| "Khách tốt là ai?" | "Khách mua ≥3 lần / 6 tháng, chi >5 triệu là ai?" |
| "Bán chạy, bỏ giỏ, so tháng trước?" | Tách thành ba câu hỏi riêng |
| "Cho xem doanh thu theo sản phẩm." | "Top 10 sản phẩm theo doanh thu T6, dạng bảng, kèm %" |

> Quy tắc vàng: **trước khi gõ Enter, đọc lại câu hỏi của mình - nếu chính bạn cũng có thể hiểu nó theo hai cách, thì AI cũng vậy.**

---

*Muốn thử viết câu hỏi rõ trên chính dữ liệu của bạn? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [5 câu hỏi nên hỏi AI hôm nay](/blog/ai-questions/) và [7 lỗi câu hỏi hay gặp](/blog/7-cau-hoi-sai-voi-ai/).*
