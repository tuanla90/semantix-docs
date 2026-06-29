---
title: "Dashboard người ta hành động được: bối cảnh, ngưỡng và màu có chủ đích"
code: "hd-007"
series: "truc-quan-hoa"
seriesOrder: 3
description: "Dashboard đầy số mà mở ra chẳng ai biết phải làm gì. Lỗi ở thiết kế, không ở dữ liệu. Phần 3 của series: dựng dashboard hành động được."
pubDate: 2025-08-15
category: "Hướng Dẫn Thực Chiến"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/dashboard-hanh-dong-duoc.svg"
coverAlt: "Một dashboard với số kèm mũi tên so sánh và ô đỏ đánh dấu vượt ngưỡng"
---

<div class="series-nav">
  <div class="series-nav-title">📊 Series Trực quan hoá &amp; kể chuyện · 4 phần</div>
  <ol>
    <li><a href="/blog/chon-dung-bieu-do/">Phần 1 — Chọn đúng biểu đồ</a></li>
    <li><a href="/blog/chart-junk-toi-gian/">Phần 2 — Chart junk: bớt mực, tăng nghĩa</a></li>
    <li class="current">Phần 3 — Dashboard hành động được</li>
    <li><a href="/blog/trinh-bay-so-cho-sep/">Phần 4 — Trình bày số cho sếp</a></li>
  </ol>
</div>

Một chủ chuỗi 6 cửa hàng cà phê ở TP.HCM khoe với tôi cái dashboard (bảng số trực quan tổng hợp trên một màn hình) mới dựng: 14 ô số, 8 biểu đồ, màu mè đủ kiểu, tự cập nhật theo dữ liệu bán hàng mỗi đêm. Đẹp thật. Tôi hỏi một câu: "Sáng nay mở nó ra, anh quyết định được điều gì?" Anh im một lúc, rồi cười: "Ờ... thì biết là doanh thu hôm qua 38 triệu."

Đó chính là chỗ ngược đời ít người chịu gọi tên: **một dashboard có thể đầy ắp số đúng mà vẫn hoàn toàn vô dụng.** Nó cho bạn biết *cái gì đã xảy ra*, nhưng không gợi ý bạn *phải làm gì*. Và một bảng số không dẫn tới hành động thì, dù đẹp đến đâu, cũng chỉ là tấm ảnh trang trí cho màn hình.

Tin tốt: khoảng cách giữa "đẹp mà vô dụng" và "hành động được" không nằm ở công cụ xịn hơn hay nhiều biểu đồ hơn. Nó nằm ở năm nguyên tắc thiết kế — và bạn áp được hết trong một buổi chiều.

## Vì sao phần lớn dashboard "đẹp mà vô dụng"

Hãy gọi đúng tên căn bệnh. Người dựng dashboard thường mắc một phản xạ rất tự nhiên: *"Cho càng nhiều số càng tốt, để sếp muốn xem gì cũng có."* Nghe có lý — nhưng đây đúng là cái bẫy. Một màn hình 20 con số ngang hàng nhau không nói cho mắt bạn biết **nhìn vào đâu trước**. Mọi thứ quan trọng như nhau nghĩa là không gì quan trọng cả.

Căn bệnh thứ hai: **số trần trụi.** "Doanh thu hôm qua 38 triệu" — tốt hay xấu? Bạn không biết, vì không có gì để so. 38 triệu so với hôm kia thế nào? So với mục tiêu? So với thứ Bảy tuần trước? Một con số đứng một mình không mang thông tin để ra quyết định — nó chỉ là một dữ kiện.

Dashboard hành động được sửa cả hai bệnh bằng cách trả lời sẵn ba câu hỏi mà não bạn luôn hỏi khi nhìn một con số: *Số này tốt hay xấu? Có gì bất thường không? Tôi nên nhìn vào đâu trước?* Dưới đây là năm nguyên tắc để làm điều đó.

## Nguyên tắc 1 — Bối cảnh: mỗi số phải kèm một thước đo

Đây là nguyên tắc quan trọng nhất, và cũng bị bỏ qua nhiều nhất. **Một con số chỉ có nghĩa khi đặt cạnh một con số khác.** Có ba thước đo so sánh kinh điển, và một dashboard tốt luôn dùng ít nhất một:

- **Kỳ trước** (hôm qua, tuần trước): cho biết xu hướng.
- **Mục tiêu** (kế hoạch, KPI — Key Performance Indicator, chỉ số đo lường kết quả then chốt): cho biết bạn đang đạt hay hụt.
- **Cùng kỳ năm ngoái**: lọc bỏ yếu tố mùa vụ — đặc biệt quan trọng ở Việt Nam quanh dịp Tết, khi doanh thu tháng Chạp luôn vọt lên không phải vì bạn giỏi hơn.

So sánh sự khác biệt giữa hai cách trình bày cùng một dữ liệu:

| Số trần trụi (vô nghĩa) | Số có bối cảnh (hành động được) |
|---|---|
| Doanh thu hôm qua: 38 triệu | 38 triệu · ▼ 12% so với thứ Bảy trước · đạt 76% mục tiêu ngày |
| Đơn hàng: 142 | 142 đơn · ▲ 8% tuần trước · nhưng giá trị/đơn ▼ 19% |
| Tồn kho hạt rang: 240 kg | 240 kg · đủ bán 6 ngày · ngưỡng nhập là 7 ngày ⚠ |
| Khách mới tháng này: 310 | 310 · cùng kỳ năm ngoái 295 · gần như đứng yên |

Cột bên trái cho bạn dữ kiện. Cột bên phải cho bạn một việc cần làm: giá trị mỗi đơn tụt 19% — tại sao? Tồn hạt rang dưới ngưỡng — đặt nhập ngay. Đó là khác biệt giữa một bảng số và một bảng điều khiển.

## Nguyên tắc 2 — Ngưỡng: để màu sắc làm việc của mắt

Bạn không có thời gian quét 14 ô số mỗi sáng để tìm cái bất thường. Hãy để dashboard tự chỉ. **Ngưỡng (threshold — mức giới hạn để kích hoạt cảnh báo) là quy tắc bạn đặt trước:** khi một số vượt hoặc rơi dưới mức nào đó, nó tự đổi màu hoặc gắn dấu.

Tồn kho dưới 7 ngày bán → ô chuyển đỏ. Doanh thu cửa hàng nào đạt trên 110% mục tiêu → ô xanh. Tỷ lệ hủy đơn vượt 5% → dấu cảnh báo. Mắt người bị màu sắc và độ tương phản hút vào trước cả khi đọc chữ — bạn đang mượn phản xạ sinh học đó để làm việc. Mở dashboard ra, ba ô đỏ đập vào mắt: đó là ba việc của hôm nay, không cần đọc 14 ô còn lại.

Sơ đồ dưới đây minh họa một góc dashboard tối giản theo đúng nguyên tắc — mỗi số kèm so sánh, một ô vượt ngưỡng được tô đỏ:

<div class="viz">
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect width="720" height="300" rx="12" fill="#0F172A"/>
  <text x="28" y="40" fill="#94A3B8" font-size="15" font-weight="700" letter-spacing="1">DASHBOARD SÁNG NAY — CHUỖI CÀ PHÊ</text>
  <rect x="28" y="60" width="200" height="92" rx="10" fill="#162033" stroke="#1E293B"/>
  <text x="44" y="86" fill="#64748B" font-size="13">Doanh thu hôm qua</text>
  <text x="44" y="118" fill="#F1F5F9" font-size="28" font-weight="800">38 tr</text>
  <text x="44" y="140" fill="#F87171" font-size="13" font-weight="600">▼ 12% vs thứ Bảy</text>
  <rect x="244" y="60" width="200" height="92" rx="10" fill="#162033" stroke="#1E293B"/>
  <text x="260" y="86" fill="#64748B" font-size="13">Đạt mục tiêu ngày</text>
  <text x="260" y="118" fill="#F1F5F9" font-size="28" font-weight="800">76%</text>
  <text x="260" y="140" fill="#FBBF24" font-size="13" font-weight="600">● dưới kế hoạch</text>
  <rect x="460" y="60" width="232" height="92" rx="10" fill="#3B0D0D" stroke="#F87171" stroke-width="2"/>
  <text x="476" y="86" fill="#FCA5A5" font-size="13">Tồn hạt rang ⚠ VƯỢT NGƯỠNG</text>
  <text x="476" y="118" fill="#FECACA" font-size="28" font-weight="800">6 ngày</text>
  <text x="476" y="140" fill="#FCA5A5" font-size="13" font-weight="700">ngưỡng nhập = 7 ngày → đặt ngay</text>
  <text x="28" y="196" fill="#94A3B8" font-size="13" font-weight="700">DOANH THU 7 NGÀY (cột xám = thường · cột đỏ = dưới ngưỡng)</text>
  <rect x="28" y="214" width="40" height="56" rx="3" fill="#475569"/>
  <rect x="92" y="226" width="40" height="44" rx="3" fill="#475569"/>
  <rect x="156" y="206" width="40" height="64" rx="3" fill="#475569"/>
  <rect x="220" y="220" width="40" height="50" rx="3" fill="#475569"/>
  <rect x="284" y="238" width="40" height="32" rx="3" fill="#DC2626"/>
  <rect x="348" y="232" width="40" height="38" rx="3" fill="#475569"/>
  <rect x="412" y="244" width="40" height="26" rx="3" fill="#DC2626"/>
  <line x1="28" y1="270" x2="472" y2="270" stroke="#334155" stroke-width="1.5"/>
  <text x="540" y="232" fill="#475569" font-size="13">3 ô đỏ = 3 việc</text>
  <text x="540" y="252" fill="#475569" font-size="13">của hôm nay</text>
</svg>
<div class="viz-caption">Mở ra là mắt biết nhìn đâu trước: ô tồn kho đỏ vượt ngưỡng và hai ngày doanh thu thủng đáy. Phần còn lại để yên.</div>
</div>

## Nguyên tắc 3 — Thứ tự ưu tiên: số quan trọng nhất to và trên cùng

Mắt người đọc màn hình theo hình chữ F: từ trên xuống, trái sang phải. Cái gì nằm ở góc trên bên trái và to nhất sẽ được nhìn đầu tiên. Vậy hãy đặt **đúng một con số quan trọng nhất** ở đó — số mà nếu chỉ được xem một thứ, bạn sẽ xem nó. Chi tiết phụ trợ xếp xuống dưới, nhỏ hơn.

Quy tắc thực hành: nếu mọi ô trên dashboard cùng cỡ chữ, bạn chưa quyết định cái gì quan trọng. Hệ thống cấp bậc thị giác (to/nhỏ, trên/dưới, đậm/nhạt) chính là cách bạn nói với người xem: *nhìn cái này trước, rồi mới tới cái kia.* Đây cũng là tinh thần [bớt mực để tăng nghĩa ở Phần 2](/blog/chart-junk-toi-gian/) — mỗi pixel phải làm việc.

## Nguyên tắc 4 — Màu có chủ đích: đỏ và xanh phải nhất quán nghĩa

Màu trên dashboard không phải để cho đẹp. Nó là **ngôn ngữ**, và ngôn ngữ chỉ hữu dụng khi nhất quán. Nếu đỏ nghĩa là "xấu/cần chú ý" ở ô này, nó phải mang đúng nghĩa đó ở mọi ô khác. Đừng để ô doanh thu dùng đỏ làm màu thương hiệu, còn ô tồn kho dùng đỏ làm cảnh báo — não người xem sẽ rối.

Vài quy ước đáng giữ:

- **Đỏ = cần hành động / dưới mức.** Xanh lá = tốt / đạt. Vàng = cảnh báo nhẹ.
- **Dùng màu tiết kiệm.** Nếu mọi thứ đều có màu, không gì nổi bật. Nền nên trung tính (xám, trắng), màu chỉ dành cho thứ cần báo động.
- **Đừng chỉ dựa vào màu.** Khoảng 8% nam giới mù màu đỏ-xanh. Luôn kèm một dấu hiệu thứ hai: mũi tên ▲▼, dấu ⚠, hay con số phần trăm.

Màu trang trí làm dashboard *trông* chuyên nghiệp nhưng làm nó *khó đọc hơn*. Màu có chủ đích thì xấu hơn một chút mà nói được nhiều hơn nhiều.

## Nguyên tắc 5 — Một dashboard, một người, một quyết định

Đây là nguyên tắc gom tất cả lại. Sai lầm phổ biến nhất là dựng **một** dashboard "tổng" cho cả công ty: CEO, kế toán, quản lý kho, marketing đều nhìn chung một màn hình. Kết quả là nó nhồi nhét mọi thứ cho mọi người và không phục vụ tốt cho ai.

Dashboard tốt phục vụ **một người và một loại quyết định.** Dashboard của chủ chuỗi cà phê trả lời câu "hôm nay tôi cần can thiệp ở đâu?" — doanh thu từng cửa hàng, tồn nguyên liệu, cửa hàng nào tụt. Dashboard của quản lý kho trả lời câu khác hẳn — và không nên có doanh thu marketing trong đó. Trước khi thêm một ô số, hãy hỏi: *ô này giúp người dùng ra quyết định gì?* Không trả lời được thì bỏ ra.

Đây cũng là lý do việc [chia sẻ báo cáo theo từng vai trò, COO hỏi tức thì thay vì đợi năm bản báo cáo](/blog/coo-bao-cao-tuc-thi/) lại mạnh đến vậy: mỗi người nhận đúng góc nhìn mình cần để hành động, không phải bản tổng nhồi nhét. Và nếu bạn vẫn đang chạy theo dữ liệu của chính mình mà luôn sau một nhịp, đó đúng là cảm giác [bị chó SME đuổi](/blog/bi-cho-sme/) mà chúng tôi đã mổ xẻ — một dashboard hành động được là cách bạn quay lại thế chủ động.

## Checklist: dashboard của bạn đã hành động được chưa?

Mở dashboard đang dùng ra và soi qua sáu câu này:

- ☐ Mỗi con số có **ít nhất một thước đo so sánh** (kỳ trước / mục tiêu / cùng kỳ năm ngoái) không?
- ☐ Có **ngưỡng tự đổi màu** để chỉ ra cái bất thường, hay tôi vẫn phải tự quét?
- ☐ Có **đúng một số quan trọng nhất** to và trên cùng, hay mọi ô cùng cỡ?
- ☐ Màu **nhất quán nghĩa** (đỏ luôn là cảnh báo) và dùng tiết kiệm không?
- ☐ Mỗi dấu hiệu có **kèm chỉ báo thứ hai** ngoài màu (mũi tên, dấu) không?
- ☐ Dashboard này phục vụ **một người, một quyết định** — hay đang cố làm hài lòng tất cả?

Tick được càng nhiều, dashboard của bạn càng gần với một công cụ ra quyết định thay vì một tấm ảnh.

## Làm với Semantix

Năm nguyên tắc trên là về *thiết kế*, không phải công cụ — nhưng công cụ tốt giúp bạn áp chúng mà không phải dựng tay từng công thức. Trong Semantix, bạn hỏi bằng tiếng Việt — *"doanh thu từng cửa hàng hôm qua so với mục tiêu ngày và so với cùng thứ tuần trước"* — và nhận về số đã kèm sẵn bối cảnh, không phải số trần trụi. Bạn đặt ngưỡng một lần ("tồn dưới 7 ngày thì báo đỏ"), ghim các câu hay xem thành dashboard, rồi để nó tự cập nhật mỗi sáng. Vì các khái niệm như "doanh thu" hay "mục tiêu" được định nghĩa một lần ở tầng dữ liệu, mọi người mở dashboard ra đều thấy cùng một con số — không phải mỗi người tự dựng mỗi kiểu.

## Tóm lại

| Dashboard đẹp mà vô dụng | Dashboard hành động được |
|---|---|
| Số trần trụi, đứng một mình | Mỗi số kèm so sánh (kỳ trước / mục tiêu / năm ngoái) |
| Phải tự quét tìm bất thường | Ngưỡng tự tô màu chỗ cần nhìn |
| Mọi ô cùng cỡ, không thứ tự | Số quan trọng nhất to và trên cùng |
| Màu trang trí, nghĩa lẫn lộn | Màu nhất quán, dùng tiết kiệm, có chủ đích |
| Một bảng tổng cho tất cả | Một người, một quyết định |

> Mental model: một dashboard tốt không trả lời câu "chuyện gì đã xảy ra?" — câu đó dữ liệu thô cũng trả lời được. Nó trả lời câu "sáng nay tôi phải làm gì?". Nếu mở ra mà không biết làm gì, lỗi không ở dữ liệu — ở thiết kế.

---

*Muốn dựng một dashboard mà mở ra là biết phải làm gì? [Dùng thử miễn phí với Google Sheets — kết nối nguồn và ghim câu hỏi đầu tiên thành dashboard trong dưới 15 phút.](/docs/vi/free-trial/) Rồi đọc tiếp [Phần 4 — Trình bày số cho sếp](/blog/trinh-bay-so-cho-sep/) để biến dashboard thành một câu chuyện thuyết phục được người ký quyết định.*
