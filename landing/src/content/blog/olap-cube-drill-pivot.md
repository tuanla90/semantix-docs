---
title: "OLAP cube: cùng một con số doanh thu, sếp xoay được năm cách - mà không phải năm báo cáo"
code: "kt-037"
description: "Sếp hỏi doanh thu theo tháng. Rồi theo vùng. Rồi vùng-trong-tháng. Rồi bóc xuống chi nhánh. Đó không phải năm báo cáo - là năm cách xoay cùng một khối."
pubDate: 2025-03-27
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 7
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/olap-cube-drill-pivot.png"
coverAlt: "Khối lập phương dữ liệu ba chiều Sản phẩm × Thời gian × Vùng với các mũi tên minh họa drill down, pivot và slice"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 - Dimension vs Dimension table</a></li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 - Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 - Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 - Inmon vs Kimball</a></li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 - SCD: chiều thay đổi chậm</a></li>
    <li><a href="/blog/snapshot-table/">Phần 6 - Snapshot &amp; 3 loại fact</a></li>
    <li class="current">Phần 7 - OLAP cube: drill &amp; pivot</li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 - Data quality: 6 chiều</a></li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 - Data mart cho từng phòng</a></li>
  </ol>
</div>


Cuộc họp sáng thứ Hai. Bạn vừa đọc xong con số: doanh thu quý vừa rồi **8,4 tỷ**. Tưởng xong. Nhưng sếp bắt đầu hỏi. "Theo từng tháng thì sao?" Bạn lật báo cáo theo tháng. "Theo vùng?" Lật báo cáo theo vùng. "Vùng nào trong tháng 6 yếu nhất?" Bạn ngồi ghép tay. "Cái vùng Hà Nội đó - bóc xuống từng chi nhánh xem chi nhánh nào kéo tụt?" Bạn... hứa chiều gửi.

Phản xạ của hầu hết mọi người: đây là *năm câu hỏi khác nhau*, cần *năm báo cáo khác nhau*, mỗi cái phải làm riêng. Đó chính là chỗ ngộ nhận. Năm câu hỏi đó không phải năm báo cáo - chúng là **năm cách xoay cùng một khối dữ liệu**. Hiểu được cái "khối" đó, bạn sẽ thôi đi làm hai mươi báo cáo rời rạc, và bắt đầu *xoay* một thứ duy nhất.

## OLAP cube: dữ liệu nhìn như một khối, không phải một bảng phẳng

Quen thuộc nhất với bạn chắc là cái bảng phẳng trong Excel: mỗi dòng một đơn hàng, các cột là sản phẩm, ngày, vùng, doanh thu. Bảng phẳng tốt cho việc *lưu*, nhưng tệ cho việc *hỏi xoay vòng* - mỗi lần đổi góc nhìn là một lần dựng pivot table mới.

Giới làm dữ liệu hình dung khác. Họ gom dữ liệu lại thành một **OLAP cube (khối phân tích đa chiều - dữ liệu được tổ chức theo nhiều trục để xoay và tổng hợp tức thì)**. Tưởng tượng một khối Rubik. Mỗi *cạnh* của khối là một **dimension (chiều - một góc để phân loại, như Sản phẩm, Thời gian, Vùng)**. Mỗi *ô* bên trong chứa một con số - **measure (chỉ số đo lường - thứ bạn muốn cộng lại, như doanh thu, số đơn, lợi nhuận)**.

<div class="viz">
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif"><rect width="720" height="360" rx="12" fill="#0F172A"/><text x="36" y="40" fill="#818CF8" font-size="14" font-weight="700" letter-spacing="1">OLAP CUBE - KHỐI 3 CHIỀU</text><g transform="translate(150,70)"><path d="M40 60 L200 60 L200 220 L40 220 Z" fill="#1E293B" stroke="#475569" stroke-width="1.5"/><path d="M40 60 L100 20 L260 20 L200 60 Z" fill="#162033" stroke="#475569" stroke-width="1.5"/><path d="M200 60 L260 20 L260 180 L200 220 Z" fill="#0B1120" stroke="#475569" stroke-width="1.5"/><line x1="93" y1="60" x2="93" y2="220" stroke="#334155" stroke-width="1"/><line x1="146" y1="60" x2="146" y2="220" stroke="#334155" stroke-width="1"/><line x1="40" y1="113" x2="200" y2="113" stroke="#334155" stroke-width="1"/><line x1="40" y1="166" x2="200" y2="166" stroke="#334155" stroke-width="1"/><rect x="146" y="113" width="54" height="53" fill="#4338CA" opacity="0.55"/><text x="173" y="146" fill="#C7D2FE" font-size="12" font-weight="700" text-anchor="middle">8,4 tỷ</text></g><g><text x="120" y="320" fill="#FBBF24" font-size="13" font-weight="700">Thời gian →</text><text x="430" y="150" fill="#34D399" font-size="13" font-weight="700" transform="rotate(-28 430 150)">Vùng ↗</text><text x="100" y="160" fill="#F472B6" font-size="13" font-weight="700" transform="rotate(-90 100 160)">Sản phẩm ↑</text></g><text x="430" y="290" fill="#94A3B8" font-size="12">Mỗi ô = một measure (doanh thu)</text><text x="430" y="312" fill="#94A3B8" font-size="12">Mỗi cạnh = một dimension</text></svg>
<div class="viz-caption">Cùng một khối Sản phẩm × Thời gian × Vùng. Con số 8,4 tỷ chỉ là *một lát nhìn*; xoay khối, bạn được vô số góc khác. (số minh họa)</div>
</div>

Cái khối ví dụ ở đây có ba chiều: **Sản phẩm × Thời gian × Vùng**. Con số 8,4 tỷ chỉ là *tổng của cả khối*. Mọi câu hỏi của sếp ở đầu bài, thực ra, chỉ là yêu cầu *xoay khối này theo một kiểu khác*. Và xoay khối có đúng bốn động tác cơ bản - học một lần, dùng mãi.

## Drill down / drill up: bóc sâu xuống, cuộn lên

**Drill down (bóc sâu xuống - đi từ mức tổng quát xuống mức chi tiết hơn)** là động tác phóng to. Bạn đang nhìn doanh thu cả **năm**; drill down một nấc thành **quý**; thêm nấc nữa thành **tháng**; sâu nữa thành **ngày**. Cùng chiều Thời gian, chỉ là đi xuống mức chi tiết hơn.

*Ví dụ:* doanh thu năm 2026 là 32 tỷ. Bóc xuống quý - thấy Q4 phình to 12 tỷ. Bóc tiếp vào Q4 theo tháng - hóa ra tháng 12 (mùa Tết) một mình gánh 6 tỷ. Bạn vừa **drill down** ba nấc để tìm ra nguồn của con số.

**Drill up (cuộn lên - đi ngược lại, gộp chi tiết về mức tổng)** là động tác thu nhỏ. Đang xem từng chi nhánh, cuộn lên thành vùng, cuộn nữa thành toàn quốc. Cùng một trục, hướng ngược lại.

> Quy tắc vàng: drill là *đổi độ phóng đại trên cùng một chiều* - xuống để tìm thủ phạm, lên để thấy bức tranh lớn. Con số tổng không bao giờ đổi, chỉ độ chi tiết đổi.

## Pivot: xoay trục, đổi hàng thành cột

**Pivot (xoay trục - hoán đổi chiều nào nằm hàng, chiều nào nằm cột)** là động tác xoay cả khối để nhìn từ mặt khác. Bảng đang để **Vùng theo hàng, Tháng theo cột**. Pivot một cái: giờ **Tháng theo hàng, Vùng theo cột**. Cùng dữ liệu, cùng các con số - nhưng câu chuyện bạn đọc ra khác hẳn.

*Ví dụ:* để Vùng-theo-hàng, mắt bạn so sánh *các vùng với nhau* trong từng tháng. Pivot sang Tháng-theo-hàng, mắt bạn lại đọc *xu hướng theo thời gian* của từng vùng. Không thêm một dòng dữ liệu nào, chỉ xoay trục - mà phát hiện ra điều mới. Ai từng kéo-thả Rows và Columns trong pivot table của Excel thì đã pivot rồi mà không biết tên nó.

## Slice & dice: cắt một lát, hoặc cắt nhiều chiều

**Slice (cắt lát - cố định một chiều ở một giá trị, lấy ra một mặt phẳng của khối)** là lấy dao cắt khối một nhát. Cố định Vùng = "Hà Nội", phần còn lại của khối - Sản phẩm × Thời gian *chỉ riêng Hà Nội* - rơi ra thành một mặt phẳng. Bạn vừa **slice** theo vùng Hà Nội.

**Dice (cắt nhiều chiều - lọc đồng thời theo vài chiều, lấy ra một khối con nhỏ hơn)** là cắt nhiều nhát cùng lúc để lấy một *góc nhỏ* của khối. Vùng = "Hà Nội" **và** Thời gian = "Q2" **và** Sản phẩm = "đồ gia dụng". Ba điều kiện chồng lên, bạn được một khối con bé xíu - đúng cái góc cần soi.

*Ví dụ:* "doanh thu đồ gia dụng tại Hà Nội trong Q2" - đó là một **dice** ba chiều. Còn "tất cả doanh thu của riêng Hà Nội" - đó là một **slice** một chiều. Khác nhau ở số nhát cắt.

## Vì sao tư duy "khối" mạnh hơn "bảng phẳng"

Với bảng phẳng, mỗi câu hỏi mới là một lần dựng lại từ đầu: lọc, nhóm, cộng, xuất file. Năm câu của sếp = năm lần làm tay = một buổi chiều mất trắng. Tệ hơn, năm file đó rồi *lệch nhau* - file này tính cả VAT, file kia chưa, và bạn lại có năm con số doanh thu (chuyện này đáng đọc riêng trong [Metric - Dimension - KPI](/blog/metric-dimension-kpi/)).

Với tư duy khối, năm câu của sếp là **năm động tác trên một nguồn duy nhất**: drill, pivot, slice - vài giây mỗi cái, và con số *luôn nhất quán* vì chúng đến từ cùng một khối. Bạn không trả lời từng câu hỏi rời; bạn cho sếp một thứ *xoay được*, để sếp tự hỏi tới đâu xoay tới đó. Cái khối tổ chức ra sao quyết định bạn xoay được những chiều nào - nền của nó chính là [data modeling fact &amp; dimension](/blog/data-modeling-fact-dimension/), và nó thuộc về thế giới phân tích chứ không phải hệ vận hành ([OLTP vs OLAP](/blog/oltp-vs-olap/) giải thích vì sao đừng nhầm hai thứ).

## Ngày xưa phải dựng cube vật lý - nay thì không

Đây là chỗ có một chút lịch sử đáng kể. Ngày trước, để xoay khối mượt, người ta phải **dựng OLAP cube vật lý** trước: tính sẵn mọi tổ hợp tổng của mọi chiều, nén lại thành một cấu trúc riêng, lưu thành file. Nặng nề: cube to hàng chục GB, mỗi lần thêm một chiều mới hay sửa định nghĩa là phải *build lại* cả khối - có khi chạy qua đêm. Cứng nhắc: chiều nào không dựng sẵn thì không xoay được. Cả một nghề chỉ để nuôi mấy cái cube đó.

Ngày nay, với một **[Semantic Layer](/blog/semantic-layer/) (tầng ngữ nghĩa - nơi định nghĩa một lần "doanh thu", "vùng", "sản phẩm" là gì)** cộng truy vấn động, bạn không cần dựng cube trước nữa. Khối là *ảo* - bạn khai báo các chiều và chỉ số một lần ở tầng ngữ nghĩa, rồi mỗi lần hỏi, hệ thống sinh truy vấn tổng hợp *ngay tại chỗ* trên dữ liệu thật. Drill, pivot, slice - xoay tức thì, không build qua đêm, không file 30GB. Đây đúng chỗ Semantix đứng: bạn hỏi bằng tiếng Việt "bóc doanh thu HCM xuống từng chi nhánh trong Q2", nó xoay khối ngay - *mà bạn chưa từng phải tự dựng một cái cube nào*.

## Tóm lại

| Thao tác | Làm gì | Ví dụ |
|---|---|---|
| Drill down | Bóc sâu xuống mức chi tiết hơn | Năm → quý → tháng → ngày |
| Drill up | Cuộn lên mức tổng quát hơn | Chi nhánh → vùng → toàn quốc |
| Pivot | Xoay trục, đổi hàng ↔ cột | Vùng-theo-hàng → Tháng-theo-hàng |
| Slice | Cắt một lát theo một chiều | Chỉ riêng vùng Hà Nội |
| Dice | Cắt nhiều chiều cùng lúc | Hà Nội × Q2 × đồ gia dụng |

Lần tới khi sếp dồn năm câu hỏi liên tiếp về cùng một con số, đừng hoảng và đừng mở năm file. Nhận ra: sếp đang *xoay khối*. Bạn chỉ cần một nguồn xoay được - drill để tìm thủ phạm, pivot để đổi góc đọc, slice &amp; dice để soi đúng một mảnh. Một khối, năm cách nhìn, một sự thật.

> Mental model: doanh thu của bạn là một **khối Rubik** - Sản phẩm × Thời gian × Vùng. Sếp không hỏi năm câu khác nhau; sếp đang *xoay khối* theo năm kiểu. Việc của bạn không phải làm năm báo cáo, mà là đưa cho sếp một khối xoay được.

---

*Muốn xoay chiều dữ liệu bán hàng bằng tiếng Việt mà không phải tự dựng cube? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Data modeling: cách sắp bảng quyết định câu hỏi hỏi được](/blog/data-modeling-fact-dimension/).*
