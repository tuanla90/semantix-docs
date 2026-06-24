---
title: "Từ Excel đến Semantix (Phần 1): những năm bảng tính — và lúc Excel hết gánh nổi"
code: "uc-008"
series: "tu-excel-den-semantix"
seriesOrder: 1
description: "Tôi từng làm mọi báo cáo bằng Excel. Nó tự do, ai cũng dùng được. Rồi một ngày file treo máy, ba người ba số. Phần 1 của series: lúc Excel hết gánh nổi."
pubDate: 2027-04-06
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: true
cover: "/blog/covers/hanh-trinh-thoi-excel.svg"
coverAlt: "Chồng file Excel quá tải, công thức VLOOKUP gãy, và nhiều phiên bản báo cáo lẫn lộn"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Từ Excel đến Semantix · 4 phần</div>
  <ol>
    <li class="current">Phần 1 — Những năm bảng tính</li>
    <li><a href="/blog/hanh-trinh-power-bi-data-studio/">Phần 2 — Lên Power BI &amp; Data Studio</a></li>
    <li><a href="/blog/hanh-trinh-superset-metabase/">Phần 3 — Sang Superset &amp; Metabase</a></li>
    <li><a href="/blog/hanh-trinh-tu-xay-semantix/">Phần 4 — Tự xây Semantix &amp; hấp thụ điểm mạnh</a></li>
  </ol>
</div>

Tôi nhớ một đêm thứ Năm cách đây nhiều năm, khi tôi còn phụ việc dữ liệu cho một chuỗi cửa hàng mỹ phẩm ở TP.HCM. 11 giờ khuya, tôi mở file `BaoCao_Thang_final_v7_SUACUOI.xlsx` để ráp số doanh thu tháng cho cuộc họp sáng hôm sau. Con quay chuột xoay tròn. File nặng gần 80 MB, mỗi lần tôi gõ một ô là Excel "đơ" mất bốn, năm giây để tính lại toàn bộ công thức. Tôi ngồi đó, tay để trên bàn phím, *chờ phần mềm bắt kịp suy nghĩ của mình.*

Tôi kể chuyện này không phải để chê Excel. Ngược lại. **Excel là nơi tôi học tư duy dữ liệu** — và tôi vẫn biết ơn nó tới tận bây giờ. Đây là phần đầu trong câu chuyện về hành trình tôi đi qua từng công cụ một, mỗi công cụ đều đúng cho thời của nó, cho tới khi tôi tự dựng [Semantix](/docs/vi/free-trial/). Nhưng để hiểu vì sao tôi rời đi, trước tiên phải kể vì sao tôi đã yêu nó đến thế.

## Vì sao những năm đầu, bảng tính là tất cả những gì tôi cần

Khi tôi bắt đầu, tôi không có đội kỹ thuật, không có database (cơ sở dữ liệu tập trung), không có ngân sách cho công cụ gì cả. Tôi chỉ có một laptop và Excel — sau này thêm Google Sheets khi sếp muốn cả nhóm sửa chung. Và thật lòng mà nói, *nó đủ trong một thời gian rất dài.*

Cái hay của bảng tính, với tôi hồi đó, nằm ở vài thứ:

- **Ai cũng dùng được.** Tôi không cần dạy ai. Chị kế toán, anh quản lý cửa hàng, bạn marketing — mở file lên là gõ được ngay. Không phải xin quyền IT (bộ phận công nghệ thông tin), không phải chờ cài đặt.
- **Tự do tuyệt đối.** Một ô trống có thể là tiền, là ngày, là ghi chú, là một công thức. Tôi muốn thêm một cột "ghi chú khuyến mãi" giữa chừng? Chèn cái rụp, không ai hỏi.
- **Nhập — sửa — hỏi tức thì.** Tôi thấy số lạ, tôi gõ ngay một công thức `=AVERAGEIF` để kiểm tra. Vài giây có câu trả lời. Không vòng vo qua ai.

Nói thẳng: bảng tính là một trong những phần mềm vĩ đại nhất từng được viết ra. Phần lớn doanh nghiệp Việt vận hành cả năm trời chỉ trên Excel hoặc Sheets, và đó là **lựa chọn đúng ở giai đoạn đầu** — tôi đã viết kỹ hơn về chuyện này trong [Semantix vs Google Sheets](/blog/vs-google-sheets/). Tôi không ở đây để bảo bạn vứt bảng tính đi. Tôi ở đây để kể *lúc nào* nó bắt đầu hết gánh nổi, vì tôi đã sống qua đúng cái khoảnh khắc đó.

## Lúc Excel hết gánh nổi — đúng như tôi đã trải

Bức tường không đến trong một ngày. Nó đến từng viên gạch một, và tôi chỉ nhận ra mình bị tường chặn khi đã đứng sát mặt nó. Đây là những viên gạch *thật* tôi đã va phải.

**File nặng tới mức treo máy.** Khi chuỗi lớn lên từ 3 lên hơn 20 cửa hàng, file đơn hàng vượt vài chục nghìn dòng. Mỗi lần mở phải chờ tính lại, cuộn thì giật, lưu thì hồi hộp sợ crash. Cái file từng giúp tôi giờ thành thứ tôi *ngại mở.*

**Nhiều người sửa một lúc, loạn version.** Chuyển sang Google Sheets giải được phần "sửa chung", nhưng đẻ ra vấn đề khác. Một người kéo nhầm một cột, cả dashboard (bảng số trực quan) lệch mà không ai biết. Còn thời Excel thì kinh điển hơn: tôi gửi file qua email, mỗi người sửa một bản, rồi gửi lại — và tôi có `v5`, `v6`, `v7_SUACUOI`, `v7_SUACUOI_THAT`. Không ai biết bản nào là bản đúng. *Version* (phiên bản) là một từ tôi học cách sợ.

**VLOOKUP gãy lặng lẽ.** Tôi ghép số bán hàng với danh mục sản phẩm bằng `VLOOKUP` (hàm dò tìm giá trị giữa hai bảng theo một cột chung). Nó chạy ngon nhiều tháng. Rồi một tháng, hệ thống xuất file đổi nhẹ tên cột — `Mã SP` thành `Mã sản phẩm`. `VLOOKUP` trỏ sai, doanh thu vài dòng về 0, và **không có một dòng báo lỗi nào.** Tôi chỉ phát hiện vì con số tổng trông quá lạ — nếu may.

**Mỗi tháng, ráp báo cáo hàng giờ bằng copy-paste.** Đây là viên gạch nặng nhất. Cuối tháng, tôi tải file từ chỗ bán hàng, file từ kế toán, file tồn kho, dán vào ba sheet, rồi gò một sheet tổng. Một buổi tối trôi qua chỉ để *chép và dán quá khứ* — y như chuyện [báo cáo đến quá muộn để còn kịp là một quyết định](/blog/coo-bao-cao-tuc-thi/).

**Ba người ba số.** Họp sáng, bạn marketing đọc doanh thu *1,2 tỷ*, chị kế toán nói *1,08 tỷ*, sếp nhớ *1,15 tỷ* — cùng một file. Không ai sai. Chỉ là "doanh thu" trong file đó **chưa bao giờ được định nghĩa một lần.** Người này tính trên cột `Tổng tiền`, người kia trên `Đã thu`. Tôi mất nửa buổi họp chỉ để cãi nhau xem *số nào mới đúng.*

**Dữ liệu nhiều nguồn, ghép tay.** Cái cuối cùng đẩy tôi qua tường: đơn rải khắp Shopee, TikTok Shop, và quầy bán trực tiếp. Mỗi nguồn một định dạng, một kiểu ngày tháng, một cách đặt tên. "Hợp nhất" của tôi là tải về, dán vào, rồi nối tay — đúng bài toán [hành vi khách hàng ẩn trong dữ liệu bán](/blog/du-lieu-ban/) mà bảng tính gần như bó tay, vì nó cần ghép nhiều bảng theo khóa chung chứ không phải một công thức nối.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect x="20" y="30" width="300" height="240" rx="12" fill="#F0FDF4" stroke="#22C55E" stroke-width="2"/>
  <text x="170" y="62" fill="#16A34A" font-size="17" font-weight="800" text-anchor="middle">Excel cho tôi gì (lúc đầu)</text>
  <text x="44" y="100" fill="#166534" font-size="14">✓ Ai cũng dùng được, không cần IT</text>
  <text x="44" y="130" fill="#166534" font-size="14">✓ Tự do: ô nào cũng gõ gì cũng được</text>
  <text x="44" y="160" fill="#166534" font-size="14">✓ Nhập – sửa – hỏi tức thì</text>
  <text x="44" y="190" fill="#166534" font-size="14">✓ Miễn phí, mở lên là chạy</text>
  <text x="44" y="220" fill="#166534" font-size="14">✓ Nơi tôi học tư duy dữ liệu</text>
  <text x="44" y="250" fill="#166534" font-size="14">✓ Hoàn hảo ở quy mô nhỏ</text>
  <rect x="360" y="30" width="300" height="240" rx="12" fill="#FEF2F2" stroke="#EF4444" stroke-width="2"/>
  <text x="510" y="62" fill="#DC2626" font-size="17" font-weight="800" text-anchor="middle">Excel hết gánh ở đâu</text>
  <text x="384" y="100" fill="#991B1B" font-size="14">✗ File nặng, treo máy khi lớn</text>
  <text x="384" y="130" fill="#991B1B" font-size="14">✗ Nhiều người sửa → loạn version</text>
  <text x="384" y="160" fill="#991B1B" font-size="14">✗ VLOOKUP gãy, lỗi thầm lặng</text>
  <text x="384" y="190" fill="#991B1B" font-size="14">✗ Ráp báo cáo hàng giờ mỗi tháng</text>
  <text x="384" y="220" fill="#991B1B" font-size="14">✗ Ba người ba số, không ai chuẩn</text>
  <text x="384" y="250" fill="#991B1B" font-size="14">✗ Đa nguồn (Shopee/TikTok/quầy) ghép tay</text>
</svg>
<div class="viz-caption">Cùng một công cụ — điều khiến nó tuyệt vời ở quy mô nhỏ chính là điều khiến nó đuối khi quy mô lớn lên.</div>
</div>

## Nó không "dở" — chỉ là quy mô đã vượt nó

Đây là điều tôi muốn nói thật rõ, vì nó là tinh thần của cả series này. Excel **không thua vì nó yếu.** Nó thua vì nó *quá vạn năng* — cái gì cũng làm được, nên không cái gì có một nguồn sự thật. Sự tự do khiến tôi yêu nó ở quy mô ba cửa hàng chính là sự hỗn loạn khiến tôi không trụ nổi ở quy mô hai mươi cửa hàng.

Tôi hay ví bảng tính như **con dao đa năng Thụy Sĩ.** Tuyệt vời cho trăm việc nhỏ hằng ngày — và tôi vẫn giữ một con trong túi tới giờ. Nhưng tới lúc tôi cần *xây một ngôi nhà* dữ liệu — nhiều nguồn, nhiều người, nhiều câu hỏi mới mỗi ngày — thì tôi cần một bộ đồ nghề khác, *không phải một con dao to hơn.* Cái sai của tôi hồi đó không phải đã dùng Excel; cái sai là cố ép Excel làm việc mà nó chưa bao giờ sinh ra để làm.

Và bức tường đó — file treo, loạn version, ba người ba số, đa nguồn ghép tay — chính là thứ đẩy tôi đi tìm công cụ tiếp theo. Tôi không bỏ Excel vì ghét nó. Tôi rời nó như cách ta rời một người thầy đầu tiên: mang theo mọi thứ đã học, để đi xa hơn.

> Bài học tôi rút ra sau những năm bảng tính: một công cụ không "hết thời" — chỉ là *bạn lớn hơn nó.* Biết ơn nó vì đã đưa bạn tới đây, rồi can đảm bước tiếp khi quy mô đã gọi tên.

---

*Bạn cũng đang ở đúng cái đêm thứ Năm 11 giờ khuya của tôi — file treo, số mỗi người một kiểu? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Và đọc tiếp Phần 2, nơi tôi kể lần đầu lên [Power BI &amp; Data Studio](/blog/hanh-trinh-power-bi-data-studio/) — đẹp hơn thật, nhưng cũng lộ ra một bức tường mới.*
