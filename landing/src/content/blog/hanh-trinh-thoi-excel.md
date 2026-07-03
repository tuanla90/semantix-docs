---
title: "Từ Excel đến Semantix: những năm bảng tính - và lúc nó hết gánh nổi"
code: "uc-008"
series: "tu-excel-den-semantix"
seriesOrder: 1
description: "Mình mê Excel tới mức xem thủ thuật cho vui. Làm việc nhóm sinh loạn version, mình qua Google Sheets - tiện, dễ, nhưng rồi bảng tính cũng có trần của nó."
pubDate: 2025-04-06
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: true
cover: "/blog/covers/hanh-trinh-thoi-excel.png"
coverAlt: "Chồng file Excel quá tải, công thức VLOOKUP gãy, và nhiều phiên bản báo cáo lẫn lộn"
---

Mình nhớ một đêm thứ Năm cách đây mấy năm, hồi còn phụ việc dữ liệu cho một chuỗi mỹ phẩm ở Sài Gòn. 11 giờ khuya, mình mở file `BaoCao_Thang_final_v7_SUACUOI.xlsx` để ráp số doanh thu tháng cho cuộc họp sáng hôm sau. Con trỏ chuột xoay tròn. File nặng gần 80 MB, gõ một ô thôi là Excel đơ mất bốn, năm giây để tính lại hết. Mình cứ ngồi đó, hai tay đặt trên bàn phím, chờ cái phần mềm bắt kịp đầu mình.

Kể vậy không phải để dìm Excel đâu, ngược lại là khác. Excel là nơi mình học tư duy dữ liệu, và mình mê nó tới tận giờ. Đây là phần mở đầu cho câu chuyện mình đi qua từng công cụ một - Excel, rồi Google Sheets, rồi xa hơn nữa - cái nào cũng đúng cho thời của nó, cho tới khi mình tự dựng Semantix. Nhưng muốn hiểu vì sao mình rời đi, phải kể trước cái đã: vì sao mình từng mê tụi nó đến thế.

## Excel: mê tới mức xem thủ thuật cho vui

Nói thật, mình là fan Excel. Không phải kiểu dùng cho xong việc - mình mê nó. Rảnh là lên mạng coi mấy clip thủ thuật. Có người dựng dashboard siêu đẹp, có người viết macro biến bảng tính thành nguyên phần mềm nhập liệu - bấm nút là chạy như app thật, có người làm cả game rắn săn mồi ngay trong mấy ô tính. Coi xong mình chỉ biết phục. Cùng một cái Excel ai cũng có trong máy, mà người ta làm ra được những thứ mình tưởng phải có phần mềm xịn mới làm nổi.

Mà mê là có lý do. Hồi mới vào nghề, mình chẳng có đội kỹ thuật, chẳng có database nào cho ra hồn, cũng chẳng có ngân sách mua công cụ. Chỉ có cái laptop với Excel. Vậy mà nó gánh được gần hết:

- **Cái gì cũng làm được.** Một ô trống muốn là tiền thì là tiền, muốn là ngày, là ghi chú, hay một công thức cũng xong. Cần chèn thêm cột "ghi chú khuyến mãi" ở giữa? Chèn cái rụp, chẳng ai cản.
- **Gõ vào, sửa, hỏi - có đáp ngay.** Thấy con số lạ, mình gõ luôn một câu `=AVERAGEIF` kiểm tra. Vài giây ra kết quả, không phải vòng qua ai.
- **Mở lên là chạy.** Không phải xin quyền IT, không phải chờ ai cài cắm. Máy nào cũng có sẵn.

Excel mạnh thật. Phần lớn doanh nghiệp Việt chạy cả năm trời chỉ trên Excel - và tới tận bây giờ, rất nhiều công ty mình hỗ trợ chuyển đổi số vẫn đang làm gần như mọi thứ trên Excel. Ở quy mô đó thì đúng là **không cần gì hơn.**

## Tới lúc làm việc nhóm, Excel đuối

Vấn đề chỉ ló ra khi không còn mình mình nữa.

Cái file đẹp đẽ của mình bắt đầu phải chuyền tay. Mình gửi qua mail, chị kế toán sửa một bản, anh quản lý sửa một bản, rồi gửi lại. Thế là trong máy đẻ ra `v5`, `v6`, `v7_SUACUOI`, rồi tới cái huyền thoại `v7_SUACUOI_THAT`. Chẳng ai biết bản nào mới là bản đúng. Có hôm mình lỡ ráp số lên nhầm bản cũ, mất toi một buổi.

`Version` là cái từ mình học cách sợ từ dạo đó. Và chính nó - chứ không phải gì cao siêu - đẩy mình qua Google Sheets.

## Google Sheets: nhẹ cả người

Lên Sheets, cái nút version tự gỡ. Một file duy nhất, ai cũng sửa chung trên đó, thấy nhau gõ ngay trước mắt. Hết cảnh đính kèm, hết `SUACUOI_THAT`. Mình share một đường link là cả nhóm vào làm chung.

Sheets hợp với mình ở chỗ nhẹ, dễ, mở trình duyệt là có, lại miễn phí. Mình tin nó tới mức từng đinh ninh: với mấy doanh nghiệp vừa và nhỏ, Google Sheets là quá đủ. Tin tới mức mình bỏ công xây hẳn một thư viện hàm được đặt tên cho Sheets - gói mấy công thức dài ngoằng lại thành một cái tên gọi cho gọn, để cả nhóm gọi lại được mà khỏi copy đi copy lại, khỏi nơm nớp gõ sai một dấu là gãy. Định nghĩa một lần, ai cũng xài chung. (Bộ thư viện đó mình để dành kể riêng một bài sau.)

## Nhưng Sheets cũng có trần của nó

Thư viện hàm cứu mình được một quãng dài. Nhưng tới khi dữ liệu lớn lên và câu hỏi khó lên, có những bức tường đặt tên hàm khéo cỡ nào cũng không phá nổi - vì gốc nó nằm chỗ khác.

**File phình ra là ì ạch.** Chuỗi lớn từ 3 lên hơn 20 cửa hàng, đơn hàng vượt vài chục nghìn dòng. Ngay cả Sheets, vốn nhẹ và nhanh là thế, cũng bắt đầu quay vòng tròn mỗi lần mở, cuộn thì khựng. Cái nhẹ ngày nào tự nhiên nặng trịch.

**VLOOKUP gãy mà chẳng kêu một tiếng.** Mình ghép số bán hàng với danh mục sản phẩm bằng `VLOOKUP`, chạy ngon mấy tháng liền. Rồi một tháng, hệ thống xuất file đổi nhẹ tên cột - `Mã SP` thành `Mã sản phẩm`. `VLOOKUP` trỏ trật, doanh thu vài dòng tụt về 0, mà **không có lấy một dòng báo lỗi.** Mình phát hiện chỉ vì con số tổng trông lạ quá - mà đó là còn may.

**Cuối tháng ngồi ráp báo cáo cả buổi bằng copy-paste.** Tải file bán hàng, file kế toán, file tồn kho, dán vào ba sheet, rồi gò tay một sheet tổng. Cả một tối trôi đi chỉ để chép với dán lại quá khứ.

**Ba người đọc ra ba con số.** Họp sáng: bạn marketing đọc doanh thu 1,2 tỷ, chị kế toán bảo 1,08 tỷ, sếp nhớ 1,15 tỷ - cùng một file. Chẳng ai sai. Chỉ là chữ "doanh thu" trong đó **chưa bao giờ được định nghĩa cho dứt khoát một lần.** Người tính trên cột `Tổng tiền`, người tính trên `Đã thu`. Mình mất nửa buổi họp chỉ để cãi xem số nào mới đúng.

**Dữ liệu nằm rải khắp nơi, ghép bằng tay.** Cái cuối cùng đẩy mình qua tường: đơn nằm ở Shopee, TikTok Shop, với cả quầy bán trực tiếp. Mỗi nơi một định dạng, một kiểu ghi ngày, một cách đặt tên. "Hợp nhất" của mình hồi đó là tải về, dán vào, rồi nối tay - mà nối tay thì sai lúc nào không hay.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect x="20" y="30" width="300" height="240" rx="12" fill="#F0FDF4" stroke="#22C55E" stroke-width="2"/>
  <text x="170" y="62" fill="#16A34A" font-size="17" font-weight="800" text-anchor="middle">Bảng tính cho mình gì (lúc đầu)</text>
  <text x="44" y="100" fill="#166534" font-size="14">✓ Ai cũng dùng được, không cần IT</text>
  <text x="44" y="130" fill="#166534" font-size="14">✓ Tự do: ô nào cũng gõ gì cũng được</text>
  <text x="44" y="160" fill="#166534" font-size="14">✓ Nhập - sửa - hỏi tức thì</text>
  <text x="44" y="190" fill="#166534" font-size="14">✓ Miễn phí, mở lên là chạy</text>
  <text x="44" y="220" fill="#166534" font-size="14">✓ Nơi mình học tư duy dữ liệu</text>
  <text x="44" y="250" fill="#166534" font-size="14">✓ Hoàn hảo ở quy mô nhỏ</text>
  <rect x="360" y="30" width="300" height="240" rx="12" fill="#FEF2F2" stroke="#EF4444" stroke-width="2"/>
  <text x="510" y="62" fill="#DC2626" font-size="17" font-weight="800" text-anchor="middle">Bảng tính hết gánh ở đâu</text>
  <text x="384" y="100" fill="#991B1B" font-size="14">✗ File nặng, treo máy khi lớn</text>
  <text x="384" y="130" fill="#991B1B" font-size="14">✗ Nhiều người sửa → loạn version</text>
  <text x="384" y="160" fill="#991B1B" font-size="14">✗ VLOOKUP gãy, lỗi thầm lặng</text>
  <text x="384" y="190" fill="#991B1B" font-size="14">✗ Ráp báo cáo hàng giờ mỗi tháng</text>
  <text x="384" y="220" fill="#991B1B" font-size="14">✗ Ba người ba số, không ai chuẩn</text>
  <text x="384" y="250" fill="#991B1B" font-size="14">✗ Đa nguồn (Shopee/TikTok/quầy) ghép tay</text>
</svg>
<div class="viz-caption">Cùng một công cụ - hợp ở quy mô nhỏ, lại đuối khi quy mô lớn lên.</div>
</div>

## Không phải Excel hay Sheets dở - mình lớn nhanh hơn tụi nó

Đây là chỗ mình muốn nói cho rõ, vì nó là tinh thần của cả series. Bảng tính - cả Excel lẫn Sheets - thua không phải vì tụi nó yếu. Tụi nó thua vì cái gì cũng nhét vào được, nên rốt cuộc chẳng có gì là một nguồn sự thật.

Mình hay ví bảng tính với cái xe máy. Ở xứ mình nó chở được tất - sáng đi chợ, chiều đón con, có hôm cõng cả cái tủ lạnh sau yên. Tiện tới mức giờ mình vẫn chạy mỗi ngày. Nhưng tới lúc phải chở hàng cho cả công ty - ngày mấy chuyến, mỗi chuyến một kiểu hàng - thì chẳng con xe máy nào kham nổi. Cái mình cần lúc đó là một chiếc xe tải, chứ không phải một con xe máy to hơn. Sai của mình hồi đó đâu phải là dùng bảng tính - sai là cố ép nó chở thứ nó không gánh nổi.

Và chính mấy bức tường đó - file ì ạch, loạn version, ba người ba số, đa nguồn ghép tay - đẩy mình đi tìm công cụ tiếp theo. Mình không bỏ Excel hay Sheets vì ghét bỏ gì. Giống như rời ông thầy đầu tiên thôi: gói ghém hết những gì học được, rồi đi tiếp.

> Cái mình ngấm ra sau mấy năm bảng tính: chẳng công cụ nào "hết thời" cả, chỉ là tới lúc mình lớn hơn nó. Cảm ơn nó đã cõng mình tới đây, rồi đủ gan đi tiếp khi việc đã phình to hơn nó.

---

*Bạn cũng đang ở đúng cái đêm thứ Năm 11 giờ khuya y như mình - file thì treo, số thì mỗi người một kiểu? Ở những bài sau, mình sẽ kể tiếp chặng rời bảng tính: lên Power BI, qua Superset, rồi tới lúc tự tay dựng Semantix - mỗi công cụ gỡ được một nút, nhưng lại lòi ra một bức tường mới.*
