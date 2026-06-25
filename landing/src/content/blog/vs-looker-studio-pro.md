---
title: "Looker Studio Pro vs Semantix: trả tiền cho Pro được thêm gì — và Semantix có sẵn không?"
code: "ss-014"
description: "Nâng lên Pro để có quản trị, lịch gửi và hỗ trợ. Bạn nhận đúng những thứ đó. Nhưng nó vẫn là dashboard cũ — không hỏi tự do được."
pubDate: 2027-05-25
category: "So Sánh & Lựa Chọn"
readTime: 10
author: "Lê Thị Hương"
featured: false
cover: "/blog/covers/vs-looker-studio-pro.svg"
coverAlt: "Huy hiệu PRO và bảng giá đối chiếu per-user của Looker Studio Pro với giá phẳng theo workspace của Semantix"
---

Bạn đã dùng **Looker Studio** bản miễn phí một thời gian, và bắt đầu va vào những bức tường thật của nó: báo cáo của một bạn marketing nghỉ việc kéo theo cả dashboard và quyền truy cập nguồn dữ liệu biến mất; bạn chỉ đặt được **một lịch gửi** cho mỗi báo cáo; sếp đòi xem trên điện thoại mà không có app. *(Nếu bạn chưa đọc tại sao bản Free để lại những cái giá ẩn này, [Semantix vs Looker Studio bản miễn phí](/blog/vs-looker-studio/) bóc kỹ phần đó.)*

Rồi bạn thấy **Looker Studio Pro** (gói trả phí của Google bổ sung quản trị tổ chức, hỗ trợ và phân phối cho Looker Studio) và nghĩ: *"À, nâng lên Pro là xong."* Đây là chỗ đáng dừng lại một nhịp. Vì nghịch lý của Pro là: **bạn trả tiền và nhận đúng những thứ Google quảng cáo — quản trị, lịch gửi, hỗ trợ, mobile, AI — nhưng cái bạn không sửa được vẫn nguyên đó.** Pro vá phần *phân phối và sở hữu* của một dashboard. Nó không biến dashboard thành chỗ để **hỏi**.

Bài này trả lời ba câu của một người sắp rút ví: Pro thêm gì so với Free? Những thứ đó Semantix có không? Và giá hai bên ra sao.

## Câu 1: Pro thêm gì so với bản Free?

Phải sòng phẳng — Pro giải quyết thật vài đau đầu của bản Free, và đây là những điểm nâng cấp có giá trị:

- **Sở hữu cấp tổ chức (governance).** Governance — quản trị tài sản dữ liệu theo tổ chức thay vì theo cá nhân — là nâng cấp lớn nhất. Bản Free để báo cáo thuộc **sở hữu cá nhân** người tạo; người đó nghỉ thì báo cáo và credential nguồn có thể mất. Pro gắn tài sản vào **Google Cloud project** (một "ngăn" tài nguyên trên nền tảng đám mây Google, đứng tên tổ chức chứ không phải một người) — báo cáo không còn chết theo người nghỉ.
- **Lịch gửi rộng hơn.** Bản Free chỉ một lịch gửi mỗi báo cáo. Pro cho gửi PDF tới **200 người mỗi báo cáo**, theo ngày/tuần/tháng.
- **Hỗ trợ & SLA.** Bạn được Google Cloud Customer Care hỗ trợ kèm SLA — SLA (Service Level Agreement) là cam kết mức dịch vụ, ví dụ thời gian phản hồi khi sự cố. Bản Free không có gì cả.
- **App mobile** để xem báo cáo trên điện thoại.
- **Tích hợp Gemini AI** gắn vào trải nghiệm.

Đó là những nâng cấp thật. **Nhưng để ý chúng cùng một loại:** quản trị, phân phối, hỗ trợ. Không có dòng nào nói Pro cho bạn *hỏi một câu mới*. Vì **cốt lõi không đổi — Pro vẫn là dashboard dựng-sẵn trong hệ Google.** Nó không thêm khả năng hỏi tự do bằng ngôn ngữ, cũng không thêm semantic layer. Bạn vẫn phải vào sửa báo cáo mỗi khi câu hỏi vượt ra ngoài cái khung đã dựng.

## Câu 2: những thứ Pro thêm — Semantix có không?

Câu trả lời ngắn: **phần lớn là có** — và ở vài chỗ, Semantix tiến xa hơn một bậc. Hãy đối chiếu thẳng từng tính năng Pro.

| Tính năng Pro | Looker Free | Looker Pro | Semantix |
|---|---|---|---|
| Sở hữu cấp tổ chức | Cá nhân — mất khi người nghỉ | Gắn vào Google Cloud project | Sở hữu cấp **workspace**, không gắn cá nhân |
| Workspace & quản trị tập trung | Không | Có | Có |
| Lịch gửi báo cáo định kỳ | **1 lịch** mỗi báo cáo | PDF tới 200 người, ngày/tuần/tháng | Báo cáo định kỳ qua email |
| Hỗ trợ & SLA | Không | Google Cloud Customer Care | Có (gói trả phí); Enterprise self-host |
| AI | Không | Gemini gắn thêm | **AI-native: hỏi-đáp tiếng Việt** + semantic layer |
| Hỏi tự do bằng ngôn ngữ | Không | Không | **Có** |
| Đa nguồn ngoài Google | Hạn chế | Hạn chế | **Có** — gộp đa nguồn mapping + union |
| Self-host / AI provider riêng | Không | Không | **Có** — Ollama / model tương thích OpenAI |

Đọc bảng theo chiều dọc, một hình mẫu hiện ra. Ở những ô **quản trị và phân phối** — workspace, sở hữu tổ chức, lịch gửi, hỗ trợ — Pro và Semantix gần như ngang nhau; cả hai đều giải đúng cái đau của bản Free. Khác biệt nằm ở bốn ô cuối, và đó là **khác biệt bản chất, không phải khác biệt tính năng.**

Chỗ đáng nói nhất là dòng AI. Pro thêm **Gemini gắn vào** một sản phẩm vốn là dashboard. Semantix thì **AI-native từ gốc** — bạn gõ *"doanh thu quý vừa rồi của chi nhánh Q7 so với cùng kỳ năm ngoái"* bằng tiếng Việt và nhận thẳng câu trả lời, không phải tự dịch câu hỏi thành thao tác kéo-thả. Khác biệt giống như xe có thêm cảm biến lùi so với xe tự lái: cùng chữ "AI", hai vai trò hoàn toàn khác.

Và Semantix có ba thứ mà **cả Looker Free lẫn Pro đều không có:** semantic layer chống ảo giác (Từ điển Doanh nghiệp — tầng định nghĩa nghiệp vụ dùng chung, để "doanh thu" được định nghĩa **đúng một lần** cho cả công ty), đa nguồn kể cả ngoài Google, và **self-host** trên hạ tầng nội bộ với AI provider riêng. *Vì sao tầng định nghĩa này quan trọng đến thế, [Semantic Layer là gì](/blog/semantic-layer/) mổ xẻ kỹ.* Một điểm nữa về chủ quyền dữ liệu: dữ liệu **không lưu trên server Semantix** — hệ thống chỉ sinh SQL và truy vấn thẳng database của bạn; bạn còn dùng được **BYOK** (Bring Your Own Key — tự mang khóa API AI của riêng bạn).

## Câu 3: giá hai bên thế nào?

Đây là chỗ mô hình định giá tạo ra khác biệt lớn nhất khi đội bạn đông lên.

Looker Studio Pro tính **~9 USD / người / mỗi Google Cloud project / tháng** (tính theo năm, dùng thử 30 ngày). Đọc kỹ công thức đó: nó nhân **đầu người × số project**. Một người làm việc trên ba project có thể bị tính ba lần. Semantix thì tính **theo workspace, không theo đầu người** — một con số phẳng, dự đoán được khi team đông.

| Gói | Giá | Mô hình tính |
|---|---|---|
| Looker Studio Free | **0đ** | Miễn phí (nhưng sở hữu cá nhân, 1 lịch gửi, không mobile) |
| Looker Studio Pro | **~9 USD/người/project/tháng** | Đầu người **×** số project — đông & nhiều project thì nhân lên |
| Semantix Standard | **1.290.000đ/tháng** (~15 người) | Phẳng theo workspace, **không** theo đầu người |
| Semantix Pro | **2.990.000đ/tháng** | Phẳng theo workspace |

*Giá & tính năng Looker Studio Pro cập nhật tới 06/2026, tham khảo — vui lòng kiểm tra trang chính thức của Google; tỷ giá ~25.000đ/USD chỉ để minh hoạ.* Semantix còn có Free Trial 0đ (Google Sheets + AI chat) và Enterprise liên hệ (self-host); trả theo năm giảm 20%.

Thử áp vào một **team 15 người** *(con số minh hoạ)*:

- **Looker Pro:** 9 USD × 15 ≈ 135 USD/tháng cho **một** project ≈ **~3,4 triệu đồng/tháng** — và nhân thêm nếu bạn có nhiều project.
- **Semantix Standard:** **1.290.000đ/tháng** phẳng cho ~15 người.

Nói cách khác, ở quy mô đội đông, Semantix Standard rẻ hơn rõ và **giá dự đoán được** — bạn không phải tính lại hoá đơn mỗi lần thêm người hay mở project mới. *Đây cũng là tinh thần của bài [tổng chi phí sở hữu (TCO) của một công cụ BI](/blog/tco-cong-cu-bi/): con số trên báo giá chỉ là phần nổi.*

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="40" y="40" fill="#64748B" font-size="14" font-weight="700" letter-spacing="1">CHI PHÍ KHI TEAM ĐÔNG LÊN</text>
  <line x1="70" y1="300" x2="640" y2="300" stroke="#475569" stroke-width="2"/>
  <line x1="70" y1="70" x2="70" y2="300" stroke="#475569" stroke-width="2"/>
  <text x="86" y="320" fill="#64748B" font-size="12">5 người</text>
  <text x="316" y="320" fill="#64748B" font-size="12">15 người</text>
  <text x="546" y="320" fill="#64748B" font-size="12">30 người</text>
  <polyline points="100,250 330,170 560,90" fill="none" stroke="#F87171" stroke-width="3"/>
  <circle cx="100" cy="250" r="5" fill="#F87171"/>
  <circle cx="330" cy="170" r="5" fill="#F87171"/>
  <circle cx="560" cy="90" r="5" fill="#F87171"/>
  <text x="560" y="78" fill="#FCA5A5" font-size="13" font-weight="700" text-anchor="end">Looker Pro: per-user × project ↑</text>
  <polyline points="100,255 330,255 560,255" fill="none" stroke="#34D399" stroke-width="3"/>
  <circle cx="100" cy="255" r="5" fill="#34D399"/>
  <circle cx="330" cy="255" r="5" fill="#34D399"/>
  <circle cx="560" cy="255" r="5" fill="#34D399"/>
  <text x="560" y="245" fill="#86EFAC" font-size="13" font-weight="700" text-anchor="end">Semantix: phẳng theo workspace</text>
</svg>
<div class="viz-caption">Giá Looker Pro leo theo đầu người và số project; giá Semantix nằm phẳng theo workspace. Minh hoạ định tính, không phải báo giá.</div>
</div>

## Khi nào Looker Studio Pro *là lựa chọn đúng*

Đừng đổi công cụ chỉ vì có công cụ mới. Pro là lựa chọn đúng nếu bạn rơi vào các điều kiện sau:

- Bạn đã **đầu tư sâu vào hệ Google** — dữ liệu chủ yếu ở Google Ads, Analytics, Sheets, BigQuery — và muốn ở yên trong đó.
- Cái bạn cần chỉ là **governance + lịch gửi**: chuyển sở hữu báo cáo về tổ chức, gửi PDF định kỳ cho nhiều người, có hỗ trợ và SLA khi sự cố.
- Bộ câu hỏi của bạn **ổn định** — bạn trình bày những chỉ số đã biết trước theo lịch, hiếm khi cần hỏi câu ngoài kịch bản.
- **Hỏi tự do bằng tiếng Việt, đa nguồn ngoài Google và self-host không phải ưu tiên** của bạn.

Trong những trường hợp này, Pro là khoản chi hợp lý — bạn trả để vá đúng cái bạn thiếu. *Khác biệt chỉ thành cái bẫy khi bạn nâng lên Pro để mong có thêm khả năng phân tích, rồi nhận ra mình chỉ mua thêm quản trị và phân phối cho một dashboard vẫn không trả lời được câu hỏi tiếp theo.*

> **Mental model (khung tư duy):** đừng hỏi "Free hay Pro". Hỏi: **"cái tôi thiếu là *phân phối* hay là *khả năng hỏi*?"** Nếu bạn chỉ thiếu chỗ để quản trị và gửi báo cáo cho nhiều người trong hệ Google, Pro vá đúng chỗ đó — giữ lấy. Nếu cái bạn thiếu là *hỏi câu tiếp theo* bằng tiếng Việt, trên dữ liệu ngoài Google, với "doanh thu" định nghĩa đúng một lần — thì nâng lên Pro không chạm tới được, vì Pro và Free khác nhau ở quản trị, không ở bản chất.

---

*Muốn một nền tảng có sẵn workspace, lịch gửi và AI — nhưng AI-native hỏi-đáp tiếng Việt chứ không phải dashboard gắn thêm? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
