---
title: "Từ Excel đến Semantix (Phần 3): sang Superset & Metabase - tự chủ và cái giá của tự do"
code: "uc-010"
series: "tu-excel-den-semantix"
seriesOrder: 3
description: "Mình mê mã nguồn mở: license 0đ, tự host, làm chủ dữ liệu. Rồi cái giá ẩn lộ ra - nó không biến mất, chỉ dời chỗ. Phần 3 của series: tự chủ và cái giá của tự do."
pubDate: 2025-04-14
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: false
cover: "/blog/covers/hanh-trinh-superset-metabase.png"
coverAlt: "Server tự host: tự do nhưng kèm bánh răng vận hành và đồng hồ chi phí ẩn"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Từ Excel đến Semantix · 4 phần</div>
  <ol>
    <li><a href="/blog/hanh-trinh-thoi-excel/">Phần 1 - Những năm bảng tính</a></li>
    <li><a href="/blog/hanh-trinh-power-bi-data-studio/">Phần 2 - Lên Power BI &amp; Data Studio</a></li>
    <li class="current">Phần 3 - Sang Superset &amp; Metabase</li>
    <li><a href="/blog/hanh-trinh-tu-xay-semantix/">Phần 4 - Tự xây Semantix &amp; hấp thụ điểm mạnh</a></li>
  </ol>
</div>

> 🎬 Mình vừa kể lại trọn hành trình 10 năm đi qua từng công cụ này thành một video - xem trên kênh **Tuấn LA Lab**.

Có một buổi tối mình nhớ rất rõ. Hoá đơn gia hạn license (giấy phép sử dụng phần mềm) của công cụ BI (Business Intelligence - biến dữ liệu thành quyết định) cũ nằm trên màn hình, cộng dồn theo từng đầu người, và mỗi lần đội mình muốn thêm một bạn vận hành vào xem báo cáo là thêm một dòng tiền. Mình gõ vào ô tìm kiếm đúng ba chữ mà sau này thay đổi cả một chặng đường của mình: *"open source BI"*.

Đêm đó mình cài thử **Metabase** trên một con server cũ trong văn phòng. Mười lăm phút sau, mình gõ một câu hỏi vào ô "ask a question", nó trả về một biểu đồ doanh thu, và mình ngồi thẳng dậy. *Miễn phí. Chạy trên máy của mình. Số liệu nằm trong tay mình.* Cảm giác đó - mình vẫn gọi là cảm giác **tự chủ** - thật và đáng nhớ. Phần 3 này là chuyện mình đã yêu mã nguồn mở thế nào, và cái giá của tự do mà mình chỉ nhìn thấy sau đó vài tháng.

## Vì sao mình mê: tự do là có thật

Mình không viết bài này để dìm hàng. Mình từng dùng Metabase và **Apache Superset** trong công việc thật, và mình quý chúng tới giờ. Đây là những điều khiến mình mê - và mình nghĩ chúng xứng đáng:

- **License 0đ.** Với một doanh nghiệp đang đếm từng khoản, việc thoát khỏi hoá đơn cộng theo đầu người là một sự nhẹ nhõm thật sự. Mình không còn phải đắn đo "có nên cho bạn kế toán này một tài khoản không".
- **Self-host (tự cài và tự chạy trên hạ tầng của mình) → làm chủ dữ liệu.** Số liệu khách hàng của mình nằm trên server mình kiểm soát, không đi vòng qua đâu cả. Không khoá nhà cung cấp. Muốn chuyển đi lúc nào cũng được.
- **Metabase thân thiện đến bất ngờ.** Cái nút "ask a question" cho phép người không rành kỹ thuật dựng một biểu đồ chỉ bằng vài cú bấm chọn. Mình đưa cho một bạn marketing, nửa buổi sau bạn ấy tự dựng được dashboard (bảng số trực quan) của mình.
- **Superset mạnh và linh hoạt cho người rành SQL.** SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) editor tốt, thư viện biểu đồ phong phú, tuỳ biến gần như vô hạn. Khi mình cần một lát cắt lạ, Superset gần như luôn làm được.
- **Cộng đồng tốt.** Tài liệu dày, hàng nghìn doanh nghiệp đã chạy production (môi trường vận hành thật). Mỗi lần kẹt, mình tìm thấy người đã đi trước.

Mình học được *rất nhiều* từ hai engine này - đặc biệt là cách chúng tổ chức mô hình dữ liệu, phân quyền xem, và đặt SQL làm lớp nền. Phần lớn tư duy sản phẩm sau này của mình có gốc ở những đêm nghịch chúng. *Nếu bạn có đội kỹ sư dư công suất và muốn tự chủ từng chi tiết, đây là lựa chọn rất tốt - mình nói thật lòng.*

## Cái giá của tự do: chi phí không biến mất, nó dời chỗ

Rồi tháng thứ ba, một thứ lộ ra mà lúc cài mình không thấy. **License 0đ không làm chi phí biến mất - nó chỉ dời sang chỗ khác.** Từ hoá đơn phần mềm, nó chảy sang server, sang vận hành, sang nâng cấp, sang bảo mật, và sang lịch của chính mình.

Một đêm trước ngày họp, con server tự host của mình hết dung lượng và Metabase ngừng trả lời. Mình ngồi tới gần 1 giờ sáng dọn log và khởi động lại. *Công cụ thì miễn phí. Đêm đó của mình thì không.* Đó là lúc mình hiểu ra một quy luật mà sau này mình viết hẳn thành bài - tổng chi phí sở hữu (TCO - Total Cost of Ownership, toàn bộ tiền *và* thời gian để giữ một công cụ chạy được) phần lớn nằm ở chỗ không in trên báo giá. *Mình đã bóc kỹ phép tính này trong [bài về TCO của công cụ BI](/blog/tco-cong-cu-bi/).*

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="40" y="36" fill="#94A3B8" font-size="14" font-weight="700">Hoá đơn không biến mất - nó chỉ dời chỗ</text>
  <!-- left: license box -->
  <rect x="40" y="80" width="180" height="120" rx="12" fill="#16331f" stroke="#22C55E" stroke-width="2"/>
  <text x="130" y="128" fill="#86EFAC" font-size="16" font-weight="800" text-anchor="middle">License</text>
  <text x="130" y="156" fill="#4ADE80" font-size="26" font-weight="800" text-anchor="middle">0đ</text>
  <text x="130" y="184" fill="#64748B" font-size="12" text-anchor="middle">thứ mình thấy đầu tiên</text>
  <!-- arrow -->
  <path d="M232 140 L300 140" stroke="#22D3EE" stroke-width="3"/>
  <path d="M292 132 L304 140 L292 148 Z" fill="#22D3EE"/>
  <!-- right: where the cost moved -->
  <rect x="320" y="56" width="320" height="208" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  <text x="480" y="84" fill="#CBD5E1" font-size="13" font-weight="700" text-anchor="middle">... dời sang đây</text>
  <text x="344" y="118" fill="#E2E8F0" font-size="14">• Server &amp; hạ tầng tự host</text>
  <text x="344" y="148" fill="#E2E8F0" font-size="14">• Vận hành: nâng cấp, sao lưu, bảo mật</text>
  <text x="344" y="178" fill="#E2E8F0" font-size="14">• Người biết SQL để hỏi sâu</text>
  <text x="344" y="208" fill="#E2E8F0" font-size="14">• Tự dựng &amp; bảo trì semantic layer</text>
  <text x="344" y="238" fill="#FCA5A5" font-size="14">• Lịch của chính mình lúc 1 giờ sáng</text>
</svg>
<div class="viz-caption">Mình mừng vì ô license bằng 0đ. Phải mất vài tháng mình mới thấy hoá đơn chỉ chuyển sang server, vận hành, người biết SQL và thời gian của chính mình.</div>
</div>

Và đây là bảng mình ước có ai đưa cho mình ngày đầu - không phải để chê mã nguồn mở, mà để mình nhìn cả hai mặt cùng lúc:

| Tự do mã nguồn mở: được gì | Cái giá ẩn đi kèm |
|---|---|
| **License 0đ**, không khoá nhà cung cấp | Chi phí dời sang server + vận hành, trả đều mỗi tháng |
| **Self-host → làm chủ dữ liệu** | Mình tự lo nâng cấp, sao lưu, bảo mật - kể cả lúc 1 giờ sáng |
| **Metabase thân thiện, dựng nhanh** | Hỏi sâu vẫn cần người biết SQL; nghiệp vụ không tự hỏi bằng lời thường được |
| **Superset mạnh, linh hoạt** | Sức mạnh đó mở khoá bằng SQL - không có SQL thì chạm trần nhanh |
| **Cộng đồng lớn, tài liệu dày** | Định nghĩa metric (chỉ số) phải tự dựng & lặp lại ở từng nơi |
| **Tuỳ biến gần như vô hạn** | Tiếng Việt &amp; ngữ cảnh kinh doanh Việt không phải mặc định |

## Bốn chỗ mình vấp - và đều không phải lỗi của công cụ

Mình muốn nói cho rõ: những thứ dưới đây **không phải khuyết điểm của Metabase hay Superset.** Chúng sinh ra để làm tốt việc của chúng. Vấn đề là *hoàn cảnh của mình* - một doanh nghiệp Việt không có đội data - không khớp với hoàn cảnh mà công cụ giả định.

**Một, vận hành là việc thật và không bao giờ dừng.** Cài thì 15 phút, nhưng giữ cho nó chạy an toàn suốt năm là chuyện khác. Mỗi bản nâng cấp, mỗi lần vá bảo mật, mỗi lần server đầy - đều là thời gian của người biết việc. Với mình lúc đó, "người biết việc" chính là mình.

**Hai, hỏi sâu vẫn cần SQL.** Metabase cho người không kỹ thuật dựng biểu đồ cơ bản rất nhanh - mình mê điều đó. Nhưng tới câu hỏi thật sự của vận hành - *"nhóm hàng nào vừa phình tồn vừa bán chậm ở từng kho miền Trung 14 ngày gần nhất?"* - thì lại phải có người viết SQL. Mà ở một SME (doanh nghiệp nhỏ và vừa) Việt, người viết được SQL thường chỉ một, hai người, và họ luôn bận. Câu hỏi của cả công ty lại dồn về một nút cổ chai.

**Ba, định nghĩa metric phải tự dựng và lặp lại.** "Doanh thu ghi nhận" của mình là đơn đã giao và đã đối soát. "Tồn khả dụng" là tồn thực trừ hàng đang luân chuyển. Hai engine cho mình công cụ truy vấn, nhưng *định nghĩa* thì mình phải tự dựng - và mỗi dashboard mới, mỗi bạn analyst mới lại dễ định nghĩa lệch một chút. Đây chính là chỗ mình bắt đầu thèm một [semantic layer](/blog/semantic-layer/) (tầng định nghĩa nghiệp vụ dùng chung) đúng nghĩa: một lần định nghĩa, dùng nhất quán ở mọi nơi.

**Bốn, tiếng Việt và ngữ cảnh Việt không phải mặc định.** Người vận hành của mình không muốn học cú pháp. Họ muốn gõ *"kho nào sắp hết nhóm hàng A trong 14 ngày tới?"* bằng tiếng Việt và nhận số. Đó không phải thứ một công cụ dashboard sinh ra trong kỷ nguyên SQL được thiết kế để làm.

> Bài học mình rút ra ở chặng này: mã nguồn mở cho mình quyền *làm chủ*, nhưng làm chủ không đồng nghĩa với *được phục vụ*. Tự do là có thật - và cái giá của nó cũng là có thật. Với người có đội kỹ sư, đó là món hời. Với mình lúc đó, nó là một hoá đơn trả bằng thời gian mà mình không đủ để trả.

## Vì sao chặng này dẫn mình tới Phần 4

Mình không rời bỏ Metabase và Superset trong cay đắng. Mình rời đi với một cuốn sổ đầy ghi chú - về cách chúng tổ chức mô hình dữ liệu, cách phân quyền xem, cách đặt SQL làm lớp nền vững. Mình đã so thẳng hai engine này với hướng đi sau đó của mình trong [bài Semantix vs Metabase &amp; Superset](/blog/vs-metabase-superset/), nên ở đây mình không lặp lại luận điểm.

Điều đọng lại là một câu hỏi: *liệu có thể giữ phần tự do - làm chủ dữ liệu, không khoá - mà bỏ đi phần "cái giá" - không cần đội kỹ sư trực, không bắt nghiệp vụ học SQL, định nghĩa metric đúng một lần, và hỏi được bằng tiếng Việt?* Mình tin là có. Và đó là lúc mình quyết định tự xây.

---

*Nếu bạn cũng đang đứng giữa "tự do nhưng tự lo" và "được phục vụ nhưng trả phí", hãy thử trải nghiệm hướng còn lại trước khi quyết - [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Rồi đọc tiếp [Phần 4 - Mình tự xây Semantix và hấp thụ điểm mạnh của cả hai thế giới](/blog/hanh-trinh-tu-xay-semantix/).*
