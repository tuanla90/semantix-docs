---
title: "Định luật Goodhart: ép một con số lên thường phá một con số khác"
code: "kt-022"
series: "tu-duy-du-lieu"
seriesOrder: 8
description: "Ép một con số lên, bạn thường vô tình phá một con số khác. Đó là định luật Goodhart. Phần 8 của series: cách dùng guardrail metric để không tự thắng mình."
pubDate: 2024-12-29
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/goodhart-guardrail-metrics.svg"
coverAlt: "Một mũi tên KPI vọt lên trong khi một chỉ số khác tụt xuống, có một vạch guardrail giữ thăng bằng"
---

<div class="series-nav">
  <div class="series-nav-title">🧠 Series Tư duy dựa trên dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/tu-duy-du-lieu-la-gi/">Phần 1 - Tư duy dựa trên dữ liệu là gì</a></li>
    <li><a href="/blog/bat-dau-tu-cau-hoi/">Phần 2 - Bắt đầu từ câu hỏi, không từ dữ liệu</a></li>
    <li><a href="/blog/thien-kien-trong-doc-so/">Phần 3 - Những thiên kiến giết chết quyết định</a></li>
    <li><a href="/blog/tuong-quan-nhan-qua/">Phần 4 - Tương quan không phải nhân quả</a></li>
    <li><a href="/blog/trung-binh-noi-doi/">Phần 5 - Khi con số đánh lừa: trung bình</a></li>
    <li><a href="/blog/leading-lagging-indicator/">Phần 6 - Từ số đến quyết định: leading vs lagging</a></li>
    <li><a href="/blog/tin-hieu-vs-nhieu/">Phần 7 - Tín hiệu vs nhiễu</a></li>
    <li class="current">Phần 8 - Goodhart &amp; guardrail metrics</li>
    <li><a href="/blog/quyet-dinh-khi-thieu-du-lieu/">Phần 9 - Quyết định khi dữ liệu chưa đủ</a></li>
  </ol>
</div>

Một chủ shop thời trang treo KPI rõ ràng cho đội sale: tháng này doanh số phải tăng 30%. Cuối tháng, đội về đích đẹp - doanh số đúng 30%. Sếp mở tiệc. Một tuần sau kế toán đưa một con số khác: lợi nhuận tháng đó **giảm**, dù bán nhiều hơn hẳn.

Phản xạ đầu tiên của bạn có thể là "chắc đội tính nhầm đâu đó". Không. Đội sale làm đúng *quá* tốt là đằng khác. Để đạt doanh số, họ xả mã giảm giá, kẹp quà, gánh phí ship - bán được nhiều hơn nhưng mỗi đơn mỏng đi. Họ không phá luật. Họ chỉ làm đúng cái luật bạn đặt ra: ép **doanh số** lên, bằng mọi giá.

Đây là một trong những sự thật ngược đời nhất của việc quản trị bằng con số: **khi một thước đo trở thành mục tiêu, nó thôi là một thước đo tốt.** Câu này có tên - *định luật Goodhart* (Goodhart's law - quy luật nói rằng một chỉ số bị ép thành mục tiêu sẽ bị bóp méo và mất giá trị đo lường). Và nếu bạn quản công ty bằng KPI (Key Performance Indicator - chỉ số hiệu suất then chốt), nó đang âm thầm làm việc trong công ty bạn ngay lúc này.

## Vì sao ép một con số lại phá một con số khác

Mọi con số kinh doanh đều nối với nhau bằng dây vô hình. Doanh thu nối với biên lợi nhuận. Tốc độ nối với chất lượng. Tăng trưởng nối với *retention* (tỷ lệ khách quay lại / ở lại). Bạn không thể kéo mạnh một đầu mà đầu kia đứng yên.

Khi bạn biến **một** con số thành mục tiêu duy nhất và gắn thưởng phạt vào đó, con người sẽ tối ưu đúng con số ấy - kể cả bằng những con đường phá hỏng phần còn lại. Không phải vì họ xấu, mà vì bạn vô tình bảo họ rằng *chỉ con số này là quan trọng*. Mọi thứ khác trở thành "chuyện của người khác".

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <line x1="60" y1="40" x2="60" y2="240" stroke="#94A3B8" stroke-width="2"/>
  <line x1="60" y1="240" x2="630" y2="240" stroke="#94A3B8" stroke-width="2"/>
  <text x="20" y="48" fill="#64748B" font-size="12">cao</text>
  <text x="40" y="244" fill="#64748B" font-size="12">0</text>
  <text x="500" y="266" fill="#64748B" font-size="12">thời gian ép KPI →</text>
  <path d="M60 180 C 200 120, 360 70, 620 50" fill="none" stroke="#22D3EE" stroke-width="4"/>
  <circle cx="620" cy="50" r="5" fill="#22D3EE"/>
  <text x="430" y="44" fill="#22D3EE" font-size="13" font-weight="700">KPI mục tiêu (doanh số) ↑</text>
  <path d="M60 150 C 200 175, 360 205, 620 225" fill="none" stroke="#F87171" stroke-width="4"/>
  <circle cx="620" cy="225" r="5" fill="#F87171"/>
  <text x="430" y="218" fill="#F87171" font-size="13" font-weight="700">biên lợi nhuận (bị bỏ quên) ↓</text>
  <line x1="60" y1="140" x2="630" y2="140" stroke="#34D399" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="66" y="134" fill="#34D399" font-size="12" font-weight="700">guardrail: biên không được xuống dưới mức này</text>
</svg>
<div class="viz-caption">Ép một con số lên mà không canh: con số mục tiêu thắng đẹp, con số bị bỏ quên âm thầm rơi. Vạch xanh đứt là guardrail - ngưỡng không được phép phá.</div>
</div>

## Cùng một cái bẫy, ba khuôn mặt khác nhau

Một khi bạn nhận ra cơ chế, bạn sẽ thấy nó khắp nơi. Cùng một cái bẫy Goodhart, đội lốt ba tình huống quen thuộc:

- **Ép số đơn.** Treo thưởng theo số đơn chốt được, nhân viên sẽ giảm giá vô tội vạ, gom đơn rác, chốt cả những khách chắc chắn sẽ hoàn. Số đơn đẹp lên. Biên lợi nhuận và tỷ lệ hoàn xấu đi.
- **Ép tốc độ phản hồi CSKH.** Treo KPI "trả lời trong 2 phút", nhân viên sẽ trả lời cho-có để bấm "đã xử lý", đẩy khách qua lại cho hết giờ. Tốc độ đẹp. Mức hài lòng của khách tụt.
- **Ép lượt tải app.** Treo KPI lượt cài đặt, đội marketing sẽ mua *traffic* (lưu lượng truy cập) rác, chạy quảng cáo giật tít. Lượt tải tăng vọt. Nhưng đó là những người tải xong xóa luôn - *retention* về 0.

Nhìn kỹ thì cả ba có chung một khung: một con số được tôn lên làm vua, và một con số đối trọng bị hi sinh trong bóng tối. Vấn đề không nằm ở việc bạn *đo* - đo là tốt. Vấn đề nằm ở việc bạn đo **một mình một số**.

## Lời giải: đừng bao giờ tối ưu một số đơn độc

Cách chữa định luật Goodhart không phải là bỏ KPI. Mà là: **không bao giờ để một KPI đứng một mình.** Mỗi con số bạn muốn đẩy lên cần một con số canh đi kèm - gọi là *guardrail metric* (chỉ số canh - con số đối trọng, đặt ra để giữ cho việc tối ưu KPI chính không phá hỏng phần còn lại).

Guardrail metric không phải để bạn đẩy lên. Nó là lan can: bạn được phép tăng tốc con số chính *miễn là* không hất con số canh xuống dưới ngưỡng. Doanh số tăng bao nhiêu cũng được - nhưng **biên lợi nhuận** (phần lãi còn lại trên mỗi đồng doanh thu, sau khi trừ giá vốn) không được rơi dưới một mức. Tốc độ phản hồi nhanh bao nhiêu cũng tốt - miễn mức hài lòng không tụt.

Cặp đôi này biến một mục tiêu nguy hiểm thành một mục tiêu lành mạnh. Nó buộc người thực thi phải tìm cách tăng con số chính mà *không* ăn gian con số canh - tức là tăng trưởng thật, chứ không phải tăng trưởng đi vay.

| Metric mục tiêu | Hành vi méo mó nếu ép một mình | Guardrail metric đi kèm |
|---|---|---|
| Doanh số / doanh thu | Xả giảm giá, gánh ship, bán mỏng | Biên lợi nhuận trên mỗi đơn |
| Số đơn chốt | Chốt đơn rác, khách dễ hoàn | Tỷ lệ hoàn / hủy đơn |
| Tốc độ phản hồi CSKH | Trả lời cho-có, đẩy khách lòng vòng | Mức hài lòng (CSAT) / tỷ lệ giải quyết một lần |
| Lượt tải / cài app | Mua traffic rác, quảng cáo giật tít | Retention ngày 7 / tỷ lệ người dùng hoạt động |
| Tăng trưởng người dùng mới | Đốt tiền acquisition, bỏ quên khách cũ | Retention / tỷ lệ khách quay lại |

## Cách chọn cặp "metric + guardrail" cho shop của bạn

Bạn không cần một bộ KPI 30 dòng. Bạn cần vài cặp đúng. Ba bước đơn giản:

1. **Viết ra con số bạn muốn đẩy lên kỳ này.** Một thôi cho mỗi đội. Doanh số. Số đơn. Lượt tải.
2. **Hỏi câu sát thủ: "Nếu nhân viên muốn gian lận con số này, họ sẽ hi sinh cái gì?"** Câu trả lời chính là guardrail của bạn. Muốn doanh số đẹp, người ta sẽ hi sinh *biên*. Vậy biên là lan can. Muốn đơn nhiều, người ta nhắm mắt cho cả khách dễ hoàn. Vậy *tỷ lệ hoàn* là lan can.
3. **Đặt ngưỡng cho guardrail, không phải mục tiêu.** Guardrail không cần "phấn đấu tăng". Nó chỉ cần một dòng: *"không được rơi dưới X"*. Ví dụ: doanh số tăng 30%, *với điều kiện* biên không xuống dưới 22%.

Nếu bạn còn mơ hồ về việc đâu là metric, đâu là KPI, đâu là một con số trần trụi, bài [Metric, Dimension, KPI](/blog/metric-dimension-kpi/) gỡ rạch ròi ba từ này trước khi bạn ghép cặp. Và khi muốn canh cả một chuỗi chuyển đổi chứ không chỉ một con số đầu ra, [phân tích funnel nâng cao](/blog/funnel-nang-cao/) cho bạn thấy guardrail nên đặt ở *khâu* nào trong phễu.

## Một ví dụ Việt Nam, nhìn cận cảnh

Quay lại shop thời trang đầu bài. Tháng trước họ ép mỗi doanh số: tăng 30%, biên rơi từ 25% xuống 17%, *lãi tuyệt đối giảm*. Bán cực hơn, mệt hơn, mà về ít tiền hơn.

Tháng này họ đổi luật chơi. KPI vẫn là doanh số +30% - nhưng kèm một dòng guardrail: **biên lợi nhuận không được dưới 22%.** Đột nhiên đội sale không thể xả mã bừa nữa. Họ buộc phải nghĩ khác: đẩy combo có biên cao, upsell phụ kiện, giữ giá ở các mã hot thay vì giảm tất tay. Kết quả *(ví dụ minh hoạ)*: doanh số tăng 24% - thấp hơn mục tiêu một chút - nhưng biên giữ ở 23%, và lãi tuyệt đối tăng thật. Con số "kém đẹp" hơn lại là con số khỏe hơn.

> Một KPI không có guardrail giống như đạp ga mà tháo phanh: bạn đi nhanh hơn, đúng, cho đến khúc cua đầu tiên.

## Định luật Goodhart trong Semantix

Semantix không chống Goodhart bằng cách cho bạn thêm một dashboard. Cãi nhau về con số chưa bao giờ vì thiếu biểu đồ - mà vì người ta chỉ nhìn *một* con số. Nên cách tiếp cận đi vào đúng chỗ đó:

1. **Định nghĩa cặp metric + guardrail một lần** trong tầng nghiệp vụ dùng chung: "doanh số" luôn đi kèm "biên lợi nhuận", "số đơn" luôn đi kèm "tỷ lệ hoàn" - để không ai báo cáo con số chính mà giấu con số canh.
2. **Hỏi thẳng bằng tiếng Việt**, không cần SQL: *"Doanh số tháng này theo từng nhân viên, và biên lợi nhuận tương ứng."* Hai con số luôn hiện cạnh nhau.
3. **Cảnh báo khi guardrail bị phá:** đặt ngưỡng, và để hệ thống nhắc bạn ngay khi biên rơi dưới mức - trước khi cuối tháng kế toán mới báo tin xấu.

Một lần ghép cặp. Cả công ty thôi tối ưu mù một con số. Mỗi mục tiêu đều có lan can đi kèm.

## Tóm lại

| Cách quản trị | Điều gì xảy ra |
|---|---|
| Ép **một** KPI đơn độc | Con số đẹp lên, một con số khác âm thầm rơi - bạn tự thắng mình |
| Mỗi KPI kèm **một guardrail** | Buộc phải tăng trưởng thật, không ăn gian con số đối trọng |

Lần tới khi bạn định treo một con số mục tiêu cho đội, đừng dừng ở đó. Hỏi thêm một câu: *"Nếu ai đó muốn gian con số này, họ sẽ hi sinh cái gì?"* - rồi đặt cái đó làm lan can. Đó là khác biệt giữa một KPI giúp bạn lớn lên và một KPI dạy người ta cách qua mặt bạn.

> **Mental model:** Mọi con số đều có một con số đối trọng vô hình. Ép con số bạn nhìn thấy, bạn thường đang trả giá bằng con số bạn quên nhìn. Đặt lan can trước, rồi mới đạp ga.

---

*Muốn mỗi KPI của shop luôn có guardrail đi kèm, cảnh báo khi biên rớt dưới ngưỡng? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 9 - Quyết định khi dữ liệu chưa đủ](/blog/quyet-dinh-khi-thieu-du-lieu/) để biết phải làm gì khi bạn còn chưa có đủ con số để canh.*
