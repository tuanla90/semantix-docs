---
title: "Snapshot table & 3 loại fact table — vì sao cộng dồn giao dịch để ra tồn kho cuối ngày là cách làm sai"
code: "kt-036"
description: "Muốn biết tồn kho cuối mỗi ngày 30 ngày qua? Bảng giao dịch cộng dồn mỗi lần một mệt và chậm. Có một loại bảng khác sinh ra cho đúng câu này."
pubDate: 2027-08-07
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 6
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/snapshot-table.svg"
coverAlt: "Máy ảnh chụp trạng thái kho theo từng ngày — ẩn dụ snapshot table chụp ảnh trạng thái định kỳ"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 8 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 — Dimension vs Dimension table</a></li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 — Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 — Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 — Inmon vs Kimball</a></li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 — SCD: chiều thay đổi chậm</a></li>
    <li class="current">Phần 6 — Snapshot &amp; 3 loại fact</li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 — OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 — Data quality: 6 chiều</a></li>
  </ol>
</div>

Sếp hỏi một câu nghe rất đơn giản: *"Cho anh xem tồn kho cuối mỗi ngày trong 30 ngày vừa rồi."* Bạn mở bảng dữ liệu lên và khựng lại. Cái bạn có là **bảng giao dịch kho** — mỗi lần nhập, mỗi lần xuất là một dòng. Mã SP01 nhập 200 cái hôm mùng 1, xuất 17 cái sáng mùng 2, xuất tiếp 9 cái chiều mùng 2, nhập thêm 50 hôm mùng 5… hàng nghìn dòng lẻ.

Để ra "tồn cuối ngày", bạn phải lấy tồn đầu kỳ rồi cộng dồn từng dòng nhập-xuất, cắt đúng mốc 23h59 mỗi ngày, làm lại cho cả 30 ngày, nhân với hàng trăm mã hàng. Một câu hỏi nghe như chuyện vài giây hoá ra là một buổi tối ngồi tính cộng dồn — và lần sau sếp hỏi lại, bạn tính lại từ đầu.

Phản xạ đầu tiên là nghĩ *"chắc mình viết công thức chưa đủ khéo"*. Gần như chắc chắn **không phải**. Vấn đề là bạn đang ép một loại bảng trả lời câu hỏi nó không sinh ra để trả. Bảng giao dịch giỏi kể *"đã có chuyện gì xảy ra"*, nhưng dở tệ khi bị hỏi *"tại một thời điểm thì trạng thái ra sao"*. Cho câu hỏi thứ hai, có một loại bảng **khác** — và đây là lúc nên biết về nó.

## Có 3 kiểu fact table, mỗi kiểu trả lời một loại câu hỏi

Trong [mô hình hoá dữ liệu fact & dimension](/blog/data-modeling-fact-dimension/), **bảng fact** (fact table — bảng sự kiện, nơi chứa số đo cộng được) là trung tâm của mọi báo cáo. Nhưng ít người để ý: "fact table" không phải một thứ duy nhất. Trong khung [Kimball](/blog/kimball-dimensional-modeling/) — bộ quy ước nền tảng của ngành — có đúng **ba kiểu**, và chúng khác nhau ở một thứ duy nhất: **grain** (độ hạt — một dòng của bảng đại diện cho cái gì).

Hỏi "một dòng là gì?" là biết mình đang cầm loại bảng nào. Một dòng = một sự kiện? Một dòng = một lần chụp trạng thái? Hay một dòng = cả một vòng đời? Ba câu trả lời, ba loại bảng, ba kiểu câu hỏi chúng giỏi.

## Transaction fact — mỗi sự kiện một dòng

**Transaction fact** (bảng sự kiện giao dịch) là loại quen thuộc nhất, cũng chính là cái bạn đang có ở đầu bài. Grain của nó: **mỗi sự kiện xảy ra là một dòng mới**. Một đơn hàng, một lần xuất kho, một lượt thanh toán — ghi vào, không bao giờ sửa lại.

*Bảng giao dịch kho:*

| Thời điểm | Mã SP | Loại | Số lượng |
|---|---|---|---|
| 01/06 08:15 | SP01 | Nhập | +200 |
| 02/06 09:02 | SP01 | Xuất | −17 |
| 02/06 14:40 | SP01 | Xuất | −9 |
| 05/06 10:00 | SP01 | Nhập | +50 |

Đây là loại bảng **chi tiết nhất** — không gì mịn hơn. Nó trả lời tuyệt vời mọi câu kiểu *"hôm 2/6 xuất bao nhiêu cái SP01"*, *"tổng nhập tháng 6"*, *"ai ký lệnh xuất lúc 14h40"*. Mỗi dòng là một bằng chứng độc lập, cộng lại ra mọi con số tổng.

Nhưng để nó tự trả lời *"tồn cuối ngày 2/6 là bao nhiêu"*, bạn phải cộng dồn ngược về tận đầu kỳ. Số càng nhiều ngày, càng nhiều mã, phép cộng dồn càng nặng và càng dễ sai một mắt. Bảng giao dịch không *có sẵn* khái niệm "trạng thái cuối ngày" — nó chỉ có các thay đổi.

## Periodic snapshot — chụp ảnh trạng thái theo chu kỳ

Đây là loại bảng sinh ra để cứu bạn. **Periodic snapshot** (ảnh chụp định kỳ) có grain hoàn toàn khác: **mỗi chu kỳ cố định, một mã hàng một dòng — ghi lại trạng thái tại thời điểm đó**, bất kể trong chu kỳ có bao nhiêu giao dịch hay không có giao dịch nào.

Cuối mỗi ngày, hệ thống "chụp một tấm ảnh" tồn kho và lưu lại:

| Ngày | Mã SP | Tồn cuối ngày | Giá trị tồn |
|---|---|---|---|
| 01/06 | SP01 | 200 | 90.000.000 |
| 02/06 | SP01 | 174 | 78.300.000 |
| 03/06 | SP01 | 174 | 78.300.000 |
| 05/06 | SP01 | 224 | 100.800.000 |

Để ý dòng 03/06: ngày đó **không** nhập không xuất, nhưng vẫn có một dòng ghi tồn 174. Đó là tinh thần của snapshot — chụp ảnh *trạng thái*, không phụ thuộc có biến động hay không. Giờ câu hỏi của sếp tan biến: tồn cuối mỗi ngày 30 ngày qua chỉ là lọc 30 dòng và đọc thẳng cột. Không cộng dồn, không cắt mốc 23h59, ra ngay.

Đây là loại bảng đứng sau **mọi báo cáo "tại thời điểm X có gì"**: tồn kho cuối ngày, số dư tài khoản cuối tháng, số nhân sự cuối quý, dư nợ cuối kỳ. Cũng chính là nền của một [dashboard tồn kho realtime](/blog/theo-doi-ton-kho-realtime/) — bảng giao dịch chạy phía sau, snapshot là cái bạn đọc.

> Quy tắc vàng: hễ câu hỏi có chữ **"cuối ngày / cuối tháng / cuối kỳ"** hay **"tại thời điểm…"**, bạn đang cần một periodic snapshot — đừng cộng dồn lại bảng giao dịch mỗi lần được hỏi.

<div class="viz">
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="Bên trái nhiều dòng giao dịch lẻ, bên phải ba ảnh chụp tồn cuối mỗi ngày">
  <text x="30" y="40" fill="#94A3B8" font-size="15" font-weight="700" letter-spacing="1">TRANSACTION — mỗi sự kiện một dòng</text>
  <g transform="translate(30,60)" font-size="13" fill="#E2E8F0">
    <rect width="300" height="38" rx="8" fill="#0F172A" stroke="#1E293B"/>
    <text x="16" y="24">02/06 09:02 · SP01 · xuất −17</text>
    <rect y="46" width="300" height="38" rx="8" fill="#0F172A" stroke="#1E293B"/>
    <text x="16" y="70">02/06 14:40 · SP01 · xuất −9</text>
    <rect y="92" width="300" height="38" rx="8" fill="#0F172A" stroke="#1E293B"/>
    <text x="16" y="116">03/06 — không có biến động</text>
    <rect y="138" width="300" height="38" rx="8" fill="#0F172A" stroke="#1E293B"/>
    <text x="16" y="162">05/06 10:00 · SP01 · nhập +50</text>
  </g>
  <text x="30" y="290" fill="#64748B" font-size="13">cộng dồn lại mới ra "tồn cuối ngày" → mệt &amp; chậm</text>
  <line x1="360" y1="40" x2="360" y2="300" stroke="#312E81" stroke-width="1.5" stroke-dasharray="4 5"/>
  <text x="430" y="40" fill="#818CF8" font-size="15" font-weight="700" letter-spacing="1">SNAPSHOT — chụp trạng thái mỗi ngày</text>
  <g transform="translate(430,60)">
    <rect width="120" height="80" rx="10" fill="#1E1B4B" stroke="#4C4099"/>
    <text x="60" y="28" fill="#A5B4FC" font-size="13" text-anchor="middle">01/06</text>
    <text x="60" y="58" fill="#fff" font-size="24" font-weight="800" text-anchor="middle">200</text>
    <rect x="140" width="120" height="80" rx="10" fill="#1E1B4B" stroke="#4C4099"/>
    <text x="200" y="28" fill="#A5B4FC" font-size="13" text-anchor="middle">02/06</text>
    <text x="200" y="58" fill="#fff" font-size="24" font-weight="800" text-anchor="middle">174</text>
    <rect x="280" width="120" height="80" rx="10" fill="#1E1B4B" stroke="#4C4099"/>
    <text x="340" y="28" fill="#A5B4FC" font-size="13" text-anchor="middle">03/06</text>
    <text x="340" y="58" fill="#fff" font-size="24" font-weight="800" text-anchor="middle">174</text>
  </g>
  <text x="430" y="200" fill="#64748B" font-size="13">đọc thẳng cột "tồn cuối ngày" → vài giây</text>
</svg>
<div class="viz-caption">Cùng một kho, hai cách ghi: trái cộng dồn từng giao dịch, phải đọc thẳng ảnh chụp mỗi ngày. Sơ đồ minh hoạ.</div>
</div>

## Accumulating snapshot — một dòng cho cả vòng đời

Loại thứ ba lạ hơn. **Accumulating snapshot** (ảnh chụp tích lũy) có grain: **một dòng cho cả một vòng đời, và dòng đó được cập nhật dần khi vòng đời chạy qua từng mốc.**

Hợp nhất khi quy trình của bạn có các bước rõ ràng. Lấy vòng đời một đơn hàng: đặt → xác nhận → đóng gói → giao cho shipper → khách nhận. Mỗi đơn chỉ **một dòng**, ban đầu nhiều ô còn trống, rồi điền dần khi đơn đi qua từng cửa:

| Mã đơn | Ngày đặt | Ngày đóng gói | Ngày giao shipper | Ngày khách nhận |
|---|---|---|---|---|
| DH001 | 01/06 | 01/06 | 02/06 | 04/06 |
| DH002 | 03/06 | 03/06 | *(trống)* | *(trống)* |

DH002 mới đóng gói, hai ô sau còn trống — khi shipper lấy hàng, đúng dòng đó được cập nhật. Khác hẳn transaction (mỗi mốc một dòng mới) và snapshot định kỳ (mỗi ngày một dòng): ở đây **dòng cũ bị sửa**, không thêm dòng.

Vì sao bõ công? Vì loại bảng này trả lời cực gọn câu hỏi mà hai loại kia phải vất vả: **đo thời gian giữa các bước.** Đơn trung bình mất bao lâu từ đặt đến giao? Bước nào đang nghẽn — đóng gói chậm hay shipper chậm? Tỷ lệ đơn quá 48h chưa giao? Mọi mốc nằm cùng một dòng, lấy hiệu là ra. Đây là bảng nền cho phân tích phễu vận hành và đo hiệu suất quy trình.

## Vậy khi nào dùng cái nào?

Đừng chọn theo cảm tính — chọn theo **câu hỏi bạn cần trả lời thường xuyên**:

- Cần **chi tiết, truy vết, audit** từng sự kiện, và mọi con số tổng → **transaction fact**. Đây luôn là lớp nền, giữ đầy đủ nhất.
- Cần **trạng thái tại một thời điểm**: tồn cuối ngày, số dư cuối tháng, "ảnh chụp" cuối kỳ → **periodic snapshot**. Sinh ra *từ* bảng giao dịch, nhưng tính sẵn một lần để đọc nghìn lần.
- Cần **đo thời gian / tiến độ qua các mốc** của một quy trình có vòng đời rõ → **accumulating snapshot**.

Quan trọng: ba loại **không loại trừ nhau**. Một hệ thống khoẻ thường giữ cả ba — transaction làm sổ gốc, snapshot định kỳ phục vụ báo cáo cuối kỳ, accumulating snapshot đo vận hành. Snapshot không thay thế giao dịch; nó là bản *tính sẵn* để khỏi cộng dồn lại mỗi lần.

Và đừng nhầm snapshot table với [SCD — chiều thay đổi chậm](/blog/scd-slowly-changing-dimension/): SCD lo lưu lịch sử *thuộc tính mô tả* (khách đổi địa chỉ, sản phẩm đổi giá), còn snapshot lo lưu lịch sử *số đo trạng thái* (tồn, số dư). Một bên là dimension, một bên là fact.

## Kết cho người làm số

Bài học thực dụng nhất ở đây gói trong một câu: **báo cáo "cuối ngày / cuối tháng" nên dựa trên snapshot, đừng cộng dồn transaction mỗi lần được hỏi.** Nếu mỗi sáng bạn lại mở bảng giao dịch ra cộng tay để ra tồn đầu ngày, bạn đang làm việc mà lẽ ra một dòng snapshot tính sẵn từ tối qua đã trả lời. Tốn thời gian là một chuyện; mỗi lần cộng tay là một cơ hội sai số khác.

SME không cần dựng cả ba loại bảng từ ngày đầu. Nhưng biết *câu hỏi của mình thuộc loại nào* giúp bạn khỏi ép sai công cụ — và khỏi đổ lỗi cho công thức trong khi lỗi nằm ở chỗ chọn nhầm loại bảng.

## Tóm lại

| Loại fact table | Một dòng = gì | Câu hỏi nó giỏi | Ví dụ |
|---|---|---|---|
| **Transaction** | Một sự kiện | "Đã xảy ra chuyện gì, bao nhiêu" | Từng lần nhập/xuất, từng đơn |
| **Periodic snapshot** | Một lần chụp/chu kỳ | "Tại thời điểm X có gì" | Tồn cuối ngày, số dư cuối tháng |
| **Accumulating snapshot** | Một vòng đời (cập nhật dần) | "Mất bao lâu giữa các bước" | Đơn từ đặt → đóng gói → giao → nhận |

> Mental model: transaction là **nhật ký** (ghi từng việc xảy ra), periodic snapshot là **album ảnh** (mỗi trang một ngày, xem lại trạng thái), accumulating snapshot là **phiếu theo dõi** (một tờ cho mỗi đơn, đóng dấu dần qua từng cửa). Hỏi đúng loại bảng, câu trả lời tự bật ra.

---

*Muốn hỏi "tồn cuối mỗi ngày tháng này" bằng tiếng Việt mà không phải tự dựng snapshot hay cộng dồn dòng nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [fact & dimension — cách sắp bảng quyết định câu hỏi bạn hỏi được](/blog/data-modeling-fact-dimension/).*
