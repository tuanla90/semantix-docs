---
title: "Từ Excel đến Semantix (Phần 4): vì sao tôi tự xây — và Semantix hấp thụ điểm mạnh từng engine ra sao"
code: "uc-011"
series: "tu-excel-den-semantix"
seriesOrder: 4
description: "Tôi đã thử mọi engine. Vẫn còn khoảng trống không cái nào lấp cho SME Việt. Phần cuối của series: vì sao tôi tự xây Semantix."
pubDate: 2027-04-27
category: "Câu Chuyện & Use Case"
readTime: 10
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: false
cover: "/blog/covers/hanh-trinh-tu-xay-semantix.svg"
coverAlt: "Các mảnh ghép từ Excel, Power BI, Superset hội tụ thành Semantix trả lời câu hỏi tiếng Việt"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Từ Excel đến Semantix · 4 phần</div>
  <ol>
    <li><a href="/blog/hanh-trinh-thoi-excel/">Phần 1 — Những năm bảng tính</a></li>
    <li><a href="/blog/hanh-trinh-power-bi-data-studio/">Phần 2 — Lên Power BI &amp; Data Studio</a></li>
    <li><a href="/blog/hanh-trinh-superset-metabase/">Phần 3 — Sang Superset &amp; Metabase</a></li>
    <li class="current">Phần 4 — Tự xây Semantix &amp; hấp thụ điểm mạnh</li>
  </ol>
</div>

Có một buổi tối tôi nhớ rất rõ. Một chị chủ chuỗi ba cửa hàng F&B ở TP.HCM nhắn cho tôi lúc gần 10 giờ: *"Em ơi, doanh thu chi nhánh Quận 7 tuần này tụt, là do ít khách hay do mỗi khách mua ít đi?"*. Tôi đã dựng cho chị một dashboard Superset khá đẹp. Nhưng câu hỏi đó *không nằm* trên dashboard. Để trả lời, ai đó phải viết một câu SQL mới — và người đó là tôi, lúc 10 giờ tối.

Tôi ngồi gõ SQL, và trong lúc gõ, một ý nghĩ cứ gõ lại trong đầu: **chị ấy không bao giờ tự hỏi được câu này.** Không phải vì chị không đủ thông minh — chị điều hành ba cửa hàng giỏi hơn tôi nhiều. Mà vì giữa câu hỏi trong đầu chị và con số trong database, luôn phải có *tôi* đứng giữa. Đó là khoảnh khắc tôi quyết định tự xây Semantix.

## Phần 1: vì sao tôi tự xây — khoảng trống sau ba chặng đường

Ba phần trước của series này, tôi đã kể hành trình của chính mình: những năm sống trong [bảng tính](/blog/hanh-trinh-thoi-excel/), rồi lên Power BI & Data Studio để mô hình hoá tử tế hơn, rồi sang Superset & Metabase để làm chủ dữ liệu và self-host. Mỗi chặng giải được một bài toán thật. Tôi biết ơn cả ba — tôi học nghề từ chúng.

Nhưng sau tất cả, vẫn còn một **khoảng trống** mà không engine nào tôi từng dùng lấp được cho doanh nghiệp vừa và nhỏ (SME — Small and Medium Enterprise) ở Việt Nam. Khoảng trống đó gồm bốn mảnh:

1. **Người nghiệp vụ tự hỏi bằng tiếng Việt, không cần SQL, không chờ ai.** Mọi công cụ tôi dùng đều giả định có một người-biết-SQL ngồi giữa. Với SME không có đội data, người đó thường là chủ doanh nghiệp — hoặc không ai cả.
2. **Một định nghĩa nghiệp vụ thống nhất để AI không bịa số.** Tôi đã sống qua cảnh ba phòng ban đọc ra ba con số "doanh thu" khác nhau, và không số nào sai. Nếu cắm AI thẳng vào database mà thiếu tầng định nghĩa chung, AI chỉ làm cảnh đó tệ hơn — nó *đoán* định nghĩa, mỗi lần một kiểu.
3. **Hợp túi tiền SME, và làm chủ dữ liệu.** Các nền tảng AI analytics tôi xem qua hoặc đắt theo đầu người, hoặc bắt đẩy dữ liệu lên cloud của họ. Doanh nghiệp Việt cần self-host (tự vận hành trên hạ tầng của mình — dữ liệu không rời khỏi nhà) và một mức giá không làm họ chùn tay.
4. **Tối ưu cho tiếng Việt.** "Quý vừa rồi", "đầu năm đến giờ", "mùa Tết" — những cách nói rất Việt mà công cụ nước ngoài hiểu sai, hoặc quy ra fiscal year kiểu Mỹ.

Bốn mảnh này không có engine nào gom đủ. Đó là lý do — và là lý do *duy nhất* — tôi tự xây.

## Phần 2: Semantix hấp thụ điểm mạnh từng engine ra sao

Đây là phần tôi muốn nói cho thật, vì nó dễ bị hiểu lầm nhất. **Tôi không xây Semantix để phủ nhận các engine đi trước.** Tôi xây nó *đứng trên vai* chúng — giữ lại điều mỗi cái làm tốt nhất, rồi lấp đúng khoảng trống còn lại.

Hãy nhìn lại từng chặng tôi đã đi qua, và thứ tôi mang theo:

**Từ Excel & Google Sheets, tôi giữ lại sự tự do hỏi.** Điều tuyệt vời nhất của bảng tính không phải công thức — mà là *ai cũng dùng được*, hỏi bất cứ gì, tức thì, không xin phép ai. Bạn gõ một ô, kéo một cột, là có câu trả lời. Semantix giữ đúng cảm giác đó, chỉ đổi giao diện: thay vì gõ công thức, bạn **hỏi bằng một câu tiếng Việt**.

**Từ Power BI & Data Studio, tôi giữ lại kỷ luật mô hình hoá.** Bảng tính tự do nhưng hỗn loạn; Power BI dạy tôi rằng dữ liệu cần được *mô hình hoá* — quan hệ rõ ràng, đo lường (measure) định nghĩa một lần, biểu đồ chuẩn. Tinh thần đó trở thành **semantic layer** (tầng định nghĩa nghiệp vụ dùng chung — nơi "doanh thu", "khách hàng hoạt động" được khai báo đúng một lần) cộng với biểu đồ tự sinh trong Semantix.

**Từ Superset & Metabase, tôi giữ lại quyền làm chủ.** Hai công cụ này dạy tôi giá trị của self-host, của sức mạnh SQL thật, của tinh thần mã nguồn mở và chi phí hợp lý, của phân quyền xem dữ liệu theo từng người. Semantix kế thừa trọn vẹn: **self-host** trên hạ tầng của bạn, **sinh ra SQL chuẩn** dưới nắp ca-pô, và **tính giá theo instance** (theo máy chủ triển khai, không theo đầu người) để chi phí không phình lên khi cả công ty cùng dùng.

**Và rồi tôi cộng thêm cái mới mà không engine cũ có sẵn:** AI text-to-SQL (công nghệ biến câu hỏi tiếng Việt thành câu lệnh SQL) hỏi bằng tiếng Việt, neo trên semantic layer để chống ảo giác (hallucination — khi AI tự tin bịa ra thứ không có thật), cộng với khả năng dùng nhiều nhà cung cấp AI và BYOK (Bring Your Own Key — bạn tự gắn khoá API của riêng mình, tự kiểm soát chi phí và dữ liệu gửi đi).

### Học gì từ engine nào → Semantix làm thế nào

| Nguồn | Điểm mạnh tôi giữ | Trong Semantix |
|---|---|---|
| Excel / Google Sheets | Tự do hỏi bất cứ gì, tức thì, ai cũng dùng được | Hỏi bằng **câu tiếng Việt tự nhiên** — không cần công thức, không cần SQL |
| Power BI / Data Studio | Mô hình hoá dữ liệu, đo lường chuẩn, visual hoá | **Semantic layer** + biểu đồ tự sinh từ câu hỏi |
| Superset / Metabase | Self-host, làm chủ dữ liệu, sức mạnh SQL, tinh thần mã nguồn mở & phân quyền xem | **Self-host** + sinh SQL chuẩn + **giá theo instance** + bảo mật theo dòng |
| *Cái mới — không engine cũ có sẵn* | — | AI text-to-SQL **hỏi tiếng Việt** + semantic layer **chống ảo giác** + đa nhà cung cấp AI / **BYOK** |

Nhìn bảng này, bạn sẽ thấy Semantix không có cột nào là phát minh từ hư không. Nó là một phép **hội tụ**: gom điểm mạnh đã được chứng minh qua hàng chục năm, rồi đặt lên trên một lớp AI và một semantic layer để lấp đúng bốn mảnh trống ở Phần 1.

<div class="viz">
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect width="680" height="340" fill="none"/>
  <!-- three source pieces -->
  <g>
    <rect x="20" y="40" width="150" height="50" rx="10" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <text x="95" y="62" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">Excel / Sheets</text>
    <text x="95" y="80" fill="#94A3B8" font-size="11" text-anchor="middle">tự do hỏi</text>
  </g>
  <g>
    <rect x="20" y="140" width="150" height="50" rx="10" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <text x="95" y="162" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">Power BI</text>
    <text x="95" y="180" fill="#94A3B8" font-size="11" text-anchor="middle">mô hình hoá</text>
  </g>
  <g>
    <rect x="20" y="240" width="150" height="50" rx="10" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    <text x="95" y="262" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">Superset</text>
    <text x="95" y="280" fill="#94A3B8" font-size="11" text-anchor="middle">self-host</text>
  </g>
  <!-- converging arrows -->
  <path d="M170 65 C 260 65, 280 150, 360 162" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M170 165 L 360 165" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M170 265 C 260 265, 280 180, 360 168" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- semantix core -->
  <rect x="360" y="120" width="160" height="90" rx="14" fill="#0B3B36" stroke="#34D399" stroke-width="2"/>
  <text x="440" y="155" fill="#34D399" font-size="18" font-weight="800" text-anchor="middle">Semantix</text>
  <text x="440" y="178" fill="#A7F3D0" font-size="11" text-anchor="middle">semantic layer</text>
  <text x="440" y="194" fill="#A7F3D0" font-size="11" text-anchor="middle">+ AI tiếng Việt</text>
  <!-- output -->
  <path d="M520 165 L 580 165" fill="none" stroke="#34D399" stroke-width="2.5"/>
  <path d="M572 159 L 582 165 L 572 171 Z" fill="#34D399"/>
  <rect x="585" y="138" width="80" height="54" rx="10" fill="#1E293B" stroke="#34D399" stroke-width="1.5"/>
  <text x="625" y="162" fill="#E2E8F0" font-size="12" font-weight="700" text-anchor="middle">câu hỏi</text>
  <text x="625" y="180" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">→ trả lời</text>
</svg>
<div class="viz-caption">Ba mảnh ghép từ các engine đi trước hội tụ vào lõi Semantix (semantic layer + AI tiếng Việt), rồi biến một câu hỏi thành câu trả lời.</div>
</div>

## Vì sao semantic layer là mảnh tôi không thể bỏ qua

Nếu phải chọn *một* thứ phân biệt Semantix với "một chatbot cắm vào database", tôi sẽ chọn semantic layer. Lý do rất riêng tư: tôi đã từng mang nhầm một con số vào phòng họp. Câu SQL chạy ngon, ra số tròn trịa — và sai, vì nó tính "doanh thu" theo một định nghĩa khác với định nghĩa của sếp. Không một dòng cảnh báo.

Khi gắn AI vào, nỗi sợ đó nhân lên. AI viết SQL đúng cú pháp gần như mọi lần — nhưng *đúng cú pháp không có nghĩa là đúng số*. Đây là cái bẫy mà tôi đã viết kỹ trong [Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi mà vẫn trả về số sai](/blog/text-to-sql/), và ở bài về [ảo giác AI](/blog/llm-bia-sql/). Cách chống không phải tìm "một AI thông minh hơn" — mà là **thu hẹp không gian để AI hết chỗ bịa**, bằng cách neo nó vào một [semantic layer](/blog/semantic-layer/) định nghĩa mọi khái niệm đúng một lần.

> Nếu text-to-SQL là động cơ, thì semantic layer là vô lăng và phanh. Tôi đã lái đủ lâu mà không có phanh để biết: thiếu nó, xe vẫn chạy — nhưng bạn không lái được.

Đó là lý do Semantix được xây *quanh* semantic layer ngay từ dòng code đầu tiên, đúng tinh thần của những hệ text-to-SQL mạnh nhất thế giới mà tôi ngưỡng mộ (WrenAI, SuperSonic của Tencent). Không phải vì tôi giỏi hơn họ — mà vì tôi tin cách tiếp cận đó là đúng cho SME Việt.

## Một lời thành thật: Semantix còn trẻ

Tôi sẽ không khoe rằng Semantix đã làm tốt mọi thứ. Nó còn trẻ. Có những tính năng Power BI làm mượt hơn, có những tình huống một analyst giỏi viết SQL tay vẫn nhanh và linh hoạt hơn AI. Tôi học điều đó mỗi tuần, từ chính những người dùng như chị chủ chuỗi F&B ở đầu bài.

Nhưng có một thứ tôi tin mình đặt đúng chỗ: **đứng trên vai những engine đi trước, thay vì giả vờ chúng không tồn tại.** Semantix không ra đời để thay thế Excel hay Superset trong mọi việc — nó ra đời để lấp đúng cái khoảng trống mà tôi, sau nhiều năm, vẫn phải lấy thân mình ra lấp lúc 10 giờ tối.

## Khép lại hành trình

Bốn phần, một hành trình rất thật của tôi: từ những năm bảng tính, lên Power BI & Data Studio, sang Superset & Metabase, và cuối cùng là quyết định tự xây. Nếu có một điều tôi muốn bạn mang theo, thì đó là: **mỗi công cụ tôi dùng đều đúng cho thời của nó — và Semantix chỉ là bước tiếp theo, đứng trên những bước trước.**

> Tôi không xây Semantix vì các engine cũ tệ. Tôi xây nó vì sau khi dùng hết những cái tốt nhất, vẫn còn một câu hỏi của một chị chủ cửa hàng mà không cái nào trả lời thay tôi được. Semantix là nỗ lực để lần sau, chị ấy không cần tôi nữa.

Nếu bạn đã đọc tới đây, tôi mời bạn làm hai việc. Một, nếu bạn mới vào giữa chừng, hãy [quay lại Phần 1](/blog/hanh-trinh-thoi-excel/) để đọc trọn hành trình từ đầu. Hai, hãy thử chính Semantix với dữ liệu của bạn — kể cả khi nó mới là một file Google Sheets — và tự hỏi cái câu mà bạn vẫn phải nhờ người khác hỏi hộ.

---

*Cảm ơn bạn đã đi cùng tôi suốt bốn phần. [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) — và nếu muốn đọc lại từ đầu, đây là [Phần 1 — Những năm bảng tính](/blog/hanh-trinh-thoi-excel/).*
