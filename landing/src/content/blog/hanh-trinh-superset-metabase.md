---
title: "Từ Excel đến Semantix (Phần 3): sang Superset & Metabase — tự chủ và cái giá của tự do"
code: "uc-010"
series: "tu-excel-den-semantix"
seriesOrder: 3
description: "Tôi mê mã nguồn mở: license 0đ, tự host, làm chủ dữ liệu. Rồi cái giá ẩn lộ ra — nó không biến mất, chỉ dời chỗ. Phần 3 của series: tự chủ và cái giá của tự do."
pubDate: 2027-04-20
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: false
cover: "/blog/covers/hanh-trinh-superset-metabase.svg"
coverAlt: "Server tự host: tự do nhưng kèm bánh răng vận hành và đồng hồ chi phí ẩn"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Từ Excel đến Semantix · 4 phần</div>
  <ol>
    <li><a href="/blog/hanh-trinh-thoi-excel/">Phần 1 — Những năm bảng tính</a></li>
    <li><a href="/blog/hanh-trinh-power-bi-data-studio/">Phần 2 — Lên Power BI &amp; Data Studio</a></li>
    <li class="current">Phần 3 — Sang Superset &amp; Metabase</li>
    <li><a href="/blog/hanh-trinh-tu-xay-semantix/">Phần 4 — Tự xây Semantix &amp; hấp thụ điểm mạnh</a></li>
  </ol>
</div>

Có một buổi tối tôi nhớ rất rõ. Hoá đơn gia hạn license (giấy phép sử dụng phần mềm) của công cụ BI (Business Intelligence — biến dữ liệu thành quyết định) cũ nằm trên màn hình, cộng dồn theo từng đầu người, và mỗi lần đội tôi muốn thêm một bạn vận hành vào xem báo cáo là thêm một dòng tiền. Tôi gõ vào ô tìm kiếm đúng ba chữ mà sau này thay đổi cả một chặng đường của tôi: *"open source BI"*.

Đêm đó tôi cài thử **Metabase** trên một con server cũ trong văn phòng. Mười lăm phút sau, tôi gõ một câu hỏi vào ô "ask a question", nó trả về một biểu đồ doanh thu, và tôi ngồi thẳng dậy. *Miễn phí. Chạy trên máy của tôi. Số liệu nằm trong tay tôi.* Cảm giác đó — tôi vẫn gọi là cảm giác **tự chủ** — thật và đáng nhớ. Phần 3 này là chuyện tôi đã yêu mã nguồn mở thế nào, và cái giá của tự do mà tôi chỉ nhìn thấy sau đó vài tháng.

## Vì sao tôi mê: tự do là có thật

Tôi không viết bài này để dìm hàng. Tôi từng dùng Metabase và **Apache Superset** trong công việc thật, và tôi quý chúng tới giờ. Đây là những điều khiến tôi mê — và tôi nghĩ chúng xứng đáng:

- **License 0đ.** Với một doanh nghiệp đang đếm từng khoản, việc thoát khỏi hoá đơn cộng theo đầu người là một sự nhẹ nhõm thật sự. Tôi không còn phải đắn đo "có nên cho bạn kế toán này một tài khoản không".
- **Self-host (tự cài và tự chạy trên hạ tầng của mình) → làm chủ dữ liệu.** Số liệu khách hàng của tôi nằm trên server tôi kiểm soát, không đi vòng qua đâu cả. Không khoá nhà cung cấp. Muốn chuyển đi lúc nào cũng được.
- **Metabase thân thiện đến bất ngờ.** Cái nút "ask a question" cho phép người không rành kỹ thuật dựng một biểu đồ chỉ bằng vài cú bấm chọn. Tôi đưa cho một bạn marketing, nửa buổi sau bạn ấy tự dựng được dashboard (bảng số trực quan) của mình.
- **Superset mạnh và linh hoạt cho người rành SQL.** SQL (Structured Query Language — ngôn ngữ truy vấn cơ sở dữ liệu) editor tốt, thư viện biểu đồ phong phú, tuỳ biến gần như vô hạn. Khi tôi cần một lát cắt lạ, Superset gần như luôn làm được.
- **Cộng đồng tốt.** Tài liệu dày, hàng nghìn doanh nghiệp đã chạy production (môi trường vận hành thật). Mỗi lần kẹt, tôi tìm thấy người đã đi trước.

Tôi học được *rất nhiều* từ hai engine này — đặc biệt là cách chúng tổ chức mô hình dữ liệu, phân quyền xem, và đặt SQL làm lớp nền. Phần lớn tư duy sản phẩm sau này của tôi có gốc ở những đêm nghịch chúng. *Nếu bạn có đội kỹ sư dư công suất và muốn tự chủ từng chi tiết, đây là lựa chọn rất tốt — tôi nói thật lòng.*

## Cái giá của tự do: chi phí không biến mất, nó dời chỗ

Rồi tháng thứ ba, một thứ lộ ra mà lúc cài tôi không thấy. **License 0đ không làm chi phí biến mất — nó chỉ dời sang chỗ khác.** Từ hoá đơn phần mềm, nó chảy sang server, sang vận hành, sang nâng cấp, sang bảo mật, và sang lịch của chính tôi.

Một đêm trước ngày họp, con server tự host của tôi hết dung lượng và Metabase ngừng trả lời. Tôi ngồi tới gần 1 giờ sáng dọn log và khởi động lại. *Công cụ thì miễn phí. Đêm đó của tôi thì không.* Đó là lúc tôi hiểu ra một quy luật mà sau này tôi viết hẳn thành bài — tổng chi phí sở hữu (TCO — Total Cost of Ownership, toàn bộ tiền *và* thời gian để giữ một công cụ chạy được) phần lớn nằm ở chỗ không in trên báo giá. *Tôi đã bóc kỹ phép tính này trong [bài về TCO của công cụ BI](/blog/tco-cong-cu-bi/).*

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="40" y="36" fill="#94A3B8" font-size="14" font-weight="700">Hoá đơn không biến mất — nó chỉ dời chỗ</text>
  <!-- left: license box -->
  <rect x="40" y="80" width="180" height="120" rx="12" fill="#16331f" stroke="#22C55E" stroke-width="2"/>
  <text x="130" y="128" fill="#86EFAC" font-size="16" font-weight="800" text-anchor="middle">License</text>
  <text x="130" y="156" fill="#4ADE80" font-size="26" font-weight="800" text-anchor="middle">0đ</text>
  <text x="130" y="184" fill="#64748B" font-size="12" text-anchor="middle">thứ tôi thấy đầu tiên</text>
  <!-- arrow -->
  <path d="M232 140 L300 140" stroke="#22D3EE" stroke-width="3"/>
  <path d="M292 132 L304 140 L292 148 Z" fill="#22D3EE"/>
  <!-- right: where the cost moved -->
  <rect x="320" y="56" width="320" height="208" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  <text x="480" y="84" fill="#CBD5E1" font-size="13" font-weight="700" text-anchor="middle">… dời sang đây</text>
  <text x="344" y="118" fill="#E2E8F0" font-size="14">• Server &amp; hạ tầng tự host</text>
  <text x="344" y="148" fill="#E2E8F0" font-size="14">• Vận hành: nâng cấp, sao lưu, bảo mật</text>
  <text x="344" y="178" fill="#E2E8F0" font-size="14">• Người biết SQL để hỏi sâu</text>
  <text x="344" y="208" fill="#E2E8F0" font-size="14">• Tự dựng &amp; bảo trì semantic layer</text>
  <text x="344" y="238" fill="#FCA5A5" font-size="14">• Lịch của chính tôi lúc 1 giờ sáng</text>
</svg>
<div class="viz-caption">Tôi mừng vì ô license bằng 0đ. Phải mất vài tháng tôi mới thấy hoá đơn chỉ chuyển sang server, vận hành, người biết SQL và thời gian của chính mình.</div>
</div>

Và đây là bảng tôi ước có ai đưa cho mình ngày đầu — không phải để chê mã nguồn mở, mà để tôi nhìn cả hai mặt cùng lúc:

| Tự do mã nguồn mở: được gì | Cái giá ẩn đi kèm |
|---|---|
| **License 0đ**, không khoá nhà cung cấp | Chi phí dời sang server + vận hành, trả đều mỗi tháng |
| **Self-host → làm chủ dữ liệu** | Tôi tự lo nâng cấp, sao lưu, bảo mật — kể cả lúc 1 giờ sáng |
| **Metabase thân thiện, dựng nhanh** | Hỏi sâu vẫn cần người biết SQL; nghiệp vụ không tự hỏi bằng lời thường được |
| **Superset mạnh, linh hoạt** | Sức mạnh đó mở khoá bằng SQL — không có SQL thì chạm trần nhanh |
| **Cộng đồng lớn, tài liệu dày** | Định nghĩa metric (chỉ số) phải tự dựng & lặp lại ở từng nơi |
| **Tuỳ biến gần như vô hạn** | Tiếng Việt &amp; ngữ cảnh kinh doanh Việt không phải mặc định |

## Bốn chỗ tôi vấp — và đều không phải lỗi của công cụ

Tôi muốn nói cho rõ: những thứ dưới đây **không phải khuyết điểm của Metabase hay Superset.** Chúng sinh ra để làm tốt việc của chúng. Vấn đề là *hoàn cảnh của tôi* — một doanh nghiệp Việt không có đội data — không khớp với hoàn cảnh mà công cụ giả định.

**Một, vận hành là việc thật và không bao giờ dừng.** Cài thì 15 phút, nhưng giữ cho nó chạy an toàn suốt năm là chuyện khác. Mỗi bản nâng cấp, mỗi lần vá bảo mật, mỗi lần server đầy — đều là thời gian của người biết việc. Với tôi lúc đó, "người biết việc" chính là tôi.

**Hai, hỏi sâu vẫn cần SQL.** Metabase cho người không kỹ thuật dựng biểu đồ cơ bản rất nhanh — tôi mê điều đó. Nhưng tới câu hỏi thật sự của vận hành — *"nhóm hàng nào vừa phình tồn vừa bán chậm ở từng kho miền Trung 14 ngày gần nhất?"* — thì lại phải có người viết SQL. Mà ở một SME (doanh nghiệp nhỏ và vừa) Việt, người viết được SQL thường chỉ một, hai người, và họ luôn bận. Câu hỏi của cả công ty lại dồn về một nút cổ chai.

**Ba, định nghĩa metric phải tự dựng và lặp lại.** "Doanh thu ghi nhận" của tôi là đơn đã giao và đã đối soát. "Tồn khả dụng" là tồn thực trừ hàng đang luân chuyển. Hai engine cho tôi công cụ truy vấn, nhưng *định nghĩa* thì tôi phải tự dựng — và mỗi dashboard mới, mỗi bạn analyst mới lại dễ định nghĩa lệch một chút. Đây chính là chỗ tôi bắt đầu thèm một [semantic layer](/blog/semantic-layer/) (tầng định nghĩa nghiệp vụ dùng chung) đúng nghĩa: một lần định nghĩa, dùng nhất quán ở mọi nơi.

**Bốn, tiếng Việt và ngữ cảnh Việt không phải mặc định.** Người vận hành của tôi không muốn học cú pháp. Họ muốn gõ *"kho nào sắp hết nhóm hàng A trong 14 ngày tới?"* bằng tiếng Việt và nhận số. Đó không phải thứ một công cụ dashboard sinh ra trong kỷ nguyên SQL được thiết kế để làm.

> Bài học tôi rút ra ở chặng này: mã nguồn mở cho tôi quyền *làm chủ*, nhưng làm chủ không đồng nghĩa với *được phục vụ*. Tự do là có thật — và cái giá của nó cũng là có thật. Với người có đội kỹ sư, đó là món hời. Với tôi lúc đó, nó là một hoá đơn trả bằng thời gian mà tôi không đủ để trả.

## Vì sao chặng này dẫn tôi tới Phần 4

Tôi không rời bỏ Metabase và Superset trong cay đắng. Tôi rời đi với một cuốn sổ đầy ghi chú — về cách chúng tổ chức mô hình dữ liệu, cách phân quyền xem, cách đặt SQL làm lớp nền vững. Tôi đã so thẳng hai engine này với hướng đi sau đó của mình trong [bài Semantix vs Metabase &amp; Superset](/blog/vs-metabase-superset/), nên ở đây tôi không lặp lại luận điểm.

Điều đọng lại là một câu hỏi: *liệu có thể giữ phần tự do — làm chủ dữ liệu, không khoá — mà bỏ đi phần "cái giá" — không cần đội kỹ sư trực, không bắt nghiệp vụ học SQL, định nghĩa metric đúng một lần, và hỏi được bằng tiếng Việt?* Tôi tin là có. Và đó là lúc tôi quyết định tự xây.

---

*Nếu bạn cũng đang đứng giữa "tự do nhưng tự lo" và "được phục vụ nhưng trả phí", hãy thử trải nghiệm hướng còn lại trước khi quyết — [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Rồi đọc tiếp [Phần 4 — Tôi tự xây Semantix và hấp thụ điểm mạnh của cả hai thế giới](/blog/hanh-trinh-tu-xay-semantix/).*
