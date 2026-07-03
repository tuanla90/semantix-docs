---
title: "Star schema vs Snowflake schema: cái \"đúng sách\" hơn lại khiến bạn hỏi chậm hơn"
code: "kt-033"
description: "Cùng một đống dữ liệu, hai cách sắp bảng. Một cái hỏi nhanh và dễ đọc. Một cái gọn hơn, đúng chuẩn hơn - nhưng join mệt hơn. Chọn cái nào?"
pubDate: 2025-03-05
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 2
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/star-vs-snowflake-schema.png"
coverAlt: "Sơ đồ so sánh star schema hình ngôi sao với snowflake schema hình bông tuyết"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 - Dimension vs Dimension table</a></li>
    <li class="current">Phần 2 - Star vs Snowflake schema</li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 - Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 - Inmon vs Kimball</a></li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 - SCD: chiều thay đổi chậm</a></li>
    <li><a href="/blog/snapshot-table/">Phần 6 - Snapshot &amp; 3 loại fact</a></li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 - OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 - Data quality: 6 chiều</a></li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 - Data mart cho từng phòng</a></li>
  </ol>
</div>



Bạn có đúng một đống dữ liệu: đơn hàng, sản phẩm, khách, kênh bán. Bây giờ đặt nó lên bàn và tự hỏi nên *sắp các bảng thế nào*. Hoá ra có hai trường phái rõ rệt - và nghịch lý nằm ở đây: cái trông **"đúng sách"** hơn, gọn gàng hơn, ít trùng dữ liệu hơn, lại chính là cái khiến mỗi câu hỏi của bạn phải đi qua nhiều bảng hơn, chạy chậm hơn, và khó đọc hơn.

Hai trường phái đó tên là **star schema** (lược đồ sao) và **snowflake schema** (lược đồ bông tuyết). Nghe như chuyện của kỹ sư database, nhưng quyết định này ảnh hưởng thẳng tới tốc độ bạn lấy được con số - và tới việc một người không-kỹ-thuật có tự hỏi được hay không. Tin tốt: phân biệt hai cái này chỉ mất vài phút, và với hầu hết SME, câu trả lời gần như luôn là một trong hai.

Bài này giả định bạn đã quen cặp **bảng fact** (fact table - bảng sự kiện, chứa số đo) và **bảng dimension** (dimension table - bảng mô tả để cắt lát). Nếu chưa, đọc nhanh [Data modeling: Fact &amp; Dimension](/blog/data-modeling-fact-dimension/) trước, rồi quay lại đây - bài đó dựng nền, bài này so hai cách *xếp* cái nền ấy.

## Star: fact ở giữa, dimension phẳng quanh - như ngôi sao

Trong **star schema**, bạn đặt **bảng fact** (đơn hàng) vào trung tâm, rồi treo quanh nó các **bảng dimension** - mỗi cái một góc nhìn: sản phẩm, khách, thời gian, kênh. Nối bằng khoá chung. Vẽ ra thì fact ở giữa, các dimension toả ra như cánh sao. Đó là lý do nó tên là "sao".

Điểm cốt lõi: mỗi dimension là **một bảng phẳng, không tách nhỏ thêm**. Bảng dimension sản phẩm chứa luôn tên sản phẩm, *loại*, *nhà cung cấp*, *ngành hàng* - tất cả nằm chung một bảng, dù vài giá trị bị lặp lại. "Áo" xuất hiện ở 200 dòng sản phẩm áo? Kệ. Lặp một chút, đổi lại bạn chỉ cần **một bước nối** từ fact sang dimension là có đủ mô tả.

## Snowflake: dimension lại tách nhỏ tiếp - như bông tuyết

**Snowflake schema** bắt đầu y hệt - fact ở giữa, dimension quanh - nhưng đi thêm một bước: nó **tách tiếp** mỗi dimension thành nhiều bảng con. Đây gọi là **normalization** (chuẩn hoá - tách dữ liệu để mỗi thông tin chỉ lưu đúng một chỗ, tránh lặp).

Ví dụ cụ thể. Trong star, bảng dimension sản phẩm có cột "ngành hàng" ghi thẳng *"Thời trang"*, *"Gia dụng"*... lặp đi lặp lại. Snowflake nói: khoan, "ngành hàng" lặp nhiều quá, tách nó ra **một bảng riêng** chỉ liệt kê các ngành, rồi dimension sản phẩm chỉ giữ một mã trỏ sang. Rồi "nhà cung cấp" cũng tách ra bảng riêng. Rồi nhà cung cấp lại trỏ sang bảng "tỉnh"... Cứ thế, mỗi cánh sao **nứt ra thành nhiều nhánh con** - vẽ lên trông lởm chởm như một **bông tuyết**.

Kết quả: gần như không còn dữ liệu nào lặp lại. Mỗi "ngành hàng" chỉ tồn tại đúng một dòng. Đẹp về lý thuyết. Nhưng để trả lời *"doanh thu theo ngành hàng"*, máy giờ phải nối: fact → sản phẩm → ngành hàng. Ba bảng, hai cú **join** (nối hai bảng theo khoá chung), thay vì một.

<div class="viz">
<svg viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="So sánh star schema hình sao và snowflake schema hình bông tuyết">
  <defs>
    <linearGradient id="factg-kt033" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22D3EE"/>
      <stop offset="1" stop-color="#34D399"/>
    </linearGradient>
  </defs>
  <text x="190" y="34" fill="#818CF8" font-size="17" font-weight="800" text-anchor="middle" letter-spacing="1">STAR - ngôi sao</text>
  <text x="570" y="34" fill="#818CF8" font-size="17" font-weight="800" text-anchor="middle" letter-spacing="1">SNOWFLAKE - bông tuyết</text>
  <line x1="380" y1="60" x2="380" y2="440" stroke="#1E293B" stroke-width="1.5" stroke-dasharray="5 6"/>
  <!-- STAR side -->
  <line x1="190" y1="240" x2="80" y2="120" stroke="#334155" stroke-width="2"/>
  <line x1="190" y1="240" x2="300" y2="120" stroke="#334155" stroke-width="2"/>
  <line x1="190" y1="240" x2="80" y2="360" stroke="#334155" stroke-width="2"/>
  <line x1="190" y1="240" x2="300" y2="360" stroke="#334155" stroke-width="2"/>
  <g transform="translate(20,86)"><rect width="120" height="58" rx="9" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="14" y="24" fill="#94A3B8" font-size="11" font-weight="700">DIM</text><text x="14" y="44" fill="#E2E8F0" font-size="15" font-weight="700">Sản phẩm</text></g>
  <g transform="translate(240,86)"><rect width="120" height="58" rx="9" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="14" y="24" fill="#94A3B8" font-size="11" font-weight="700">DIM</text><text x="14" y="44" fill="#E2E8F0" font-size="15" font-weight="700">Khách</text></g>
  <g transform="translate(20,336)"><rect width="120" height="58" rx="9" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="14" y="24" fill="#94A3B8" font-size="11" font-weight="700">DIM</text><text x="14" y="44" fill="#E2E8F0" font-size="15" font-weight="700">Thời gian</text></g>
  <g transform="translate(240,336)"><rect width="120" height="58" rx="9" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="14" y="24" fill="#94A3B8" font-size="11" font-weight="700">DIM</text><text x="14" y="44" fill="#E2E8F0" font-size="15" font-weight="700">Kênh</text></g>
  <g transform="translate(130,202)"><rect width="120" height="76" rx="11" fill="url(#factg-kt033)"/><text x="16" y="28" fill="#06283D" font-size="12" font-weight="800" letter-spacing="1">FACT</text><text x="16" y="52" fill="#06283D" font-size="17" font-weight="800">Đơn hàng</text></g>
  <!-- SNOWFLAKE side -->
  <line x1="570" y1="240" x2="470" y2="130" stroke="#334155" stroke-width="2"/>
  <line x1="570" y1="240" x2="670" y2="130" stroke="#334155" stroke-width="2"/>
  <line x1="570" y1="240" x2="470" y2="350" stroke="#334155" stroke-width="2"/>
  <line x1="570" y1="240" x2="670" y2="350" stroke="#334155" stroke-width="2"/>
  <line x1="470" y1="115" x2="430" y2="70" stroke="#475569" stroke-width="1.5"/>
  <line x1="530" y1="100" x2="560" y2="64" stroke="#475569" stroke-width="1.5"/>
  <line x1="670" y1="115" x2="710" y2="72" stroke="#475569" stroke-width="1.5"/>
  <line x1="470" y1="378" x2="430" y2="420" stroke="#475569" stroke-width="1.5"/>
  <g transform="translate(418,96)"><rect width="104" height="48" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="12" y="20" fill="#94A3B8" font-size="10" font-weight="700">DIM</text><text x="12" y="38" fill="#E2E8F0" font-size="13" font-weight="700">Sản phẩm</text></g>
  <g transform="translate(620,96)"><rect width="104" height="48" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="12" y="20" fill="#94A3B8" font-size="10" font-weight="700">DIM</text><text x="12" y="38" fill="#E2E8F0" font-size="13" font-weight="700">Khách</text></g>
  <g transform="translate(418,344)"><rect width="104" height="48" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="12" y="20" fill="#94A3B8" font-size="10" font-weight="700">DIM</text><text x="12" y="38" fill="#E2E8F0" font-size="13" font-weight="700">Thời gian</text></g>
  <g transform="translate(620,344)"><rect width="104" height="48" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/><text x="12" y="20" fill="#94A3B8" font-size="10" font-weight="700">DIM</text><text x="12" y="38" fill="#E2E8F0" font-size="13" font-weight="700">Kênh</text></g>
  <g transform="translate(370,40)"><rect width="118" height="34" rx="7" fill="#0B1220" stroke="#312E81" stroke-width="1.5"/><text x="11" y="22" fill="#A5B4FC" font-size="12" font-weight="600">Ngành hàng</text></g>
  <g transform="translate(508,30)"><rect width="118" height="34" rx="7" fill="#0B1220" stroke="#312E81" stroke-width="1.5"/><text x="11" y="22" fill="#A5B4FC" font-size="12" font-weight="600">Nhà cung cấp</text></g>
  <g transform="translate(660,38)"><rect width="84" height="34" rx="7" fill="#0B1220" stroke="#312E81" stroke-width="1.5"/><text x="11" y="22" fill="#A5B4FC" font-size="12" font-weight="600">Tỉnh</text></g>
  <g transform="translate(366,406)"><rect width="100" height="34" rx="7" fill="#0B1220" stroke="#312E81" stroke-width="1.5"/><text x="11" y="22" fill="#A5B4FC" font-size="12" font-weight="600">Tháng/Quý</text></g>
  <g transform="translate(512,202)"><rect width="116" height="76" rx="11" fill="url(#factg-kt033)"/><text x="14" y="28" fill="#06283D" font-size="12" font-weight="800" letter-spacing="1">FACT</text><text x="14" y="52" fill="#06283D" font-size="16" font-weight="800">Đơn hàng</text></g>
</svg>
<div class="viz-caption">Star: dimension phẳng, một bước nối. Snowflake: mỗi dimension nứt tiếp thành bảng con, nhiều bước nối hơn. Sơ đồ minh hoạ.</div>
</div>

## Đánh đổi: một bên nhanh-mà-trùng, một bên gọn-mà-rối

Đây là cốt lõi cả bài, gói trong một chữ: **đánh đổi**. Không có bên "đúng tuyệt đối".

**Star** đổi *một chút trùng lặp* lấy *tốc độ và sự dễ đọc*. Vì mỗi dimension phẳng, câu truy vấn chỉ cần nối fact với đúng một bảng cho mỗi chiều. Ít join hơn nghĩa là máy chạy nhanh hơn, và quan trọng không kém: **một người đọc sơ đồ vẫn hiểu được** - fact ở giữa, vài cánh quanh, hết. Cái giá phải trả: "Thời trang", "Xưởng Minh" bị lặp ở nhiều dòng, và bảng có hơi phình.

**Snowflake** đổi ngược lại: nó hy sinh *tốc độ và sự dễ đọc* để lấy *sự gọn gàng và ít trùng*. Vì chuẩn hoá triệt để, mỗi giá trị chỉ lưu một chỗ - tiết kiệm dung lượng, và khi đổi tên một ngành hàng bạn chỉ sửa đúng một dòng. Cái giá: mỗi câu hỏi phải đi qua nhiều bảng hơn, mỗi cú join là một cơ hội nối nhầm, và sơ đồ rối tới mức người mới nhìn vào là hoa mắt.

> Quy tắc vàng: star tối ưu cho **người đọc và câu hỏi**; snowflake tối ưu cho **chỗ lưu và sự nhất quán**. Phân tích hằng ngày cần cái đầu nhiều hơn cái sau.

Ẩn dụ cho dễ nhớ: star giống **tủ đồ mở** - mọi thứ treo sẵn trước mặt, với tay là lấy, có hơi chật một chút. Snowflake giống **kho có hệ thống ngăn kéo lồng nhau** - gọn không một centimet thừa, nhưng lấy một cái áo phải mở ba lớp ngăn.

## Khi nào chọn cái nào?

Đừng chọn theo "cái nào sang hơn". Chọn theo bài toán:

- **Đa số trường hợp phân tích → chọn star.** Nếu mục tiêu là dựng dashboard, trả lời câu hỏi kinh doanh, để người không-kỹ-thuật tự hỏi - star gần như luôn thắng. Nhanh, dễ hiểu, dễ bảo trì. Đây là mặc định, và là lựa chọn mà các tài liệu kinh điển về **dimensional modeling** (mô hình hoá theo chiều) của Kimball nghiêng hẳn về. *(Muốn đào sâu trường phái này, đọc [Kimball &amp; dimensional modeling](/blog/kimball-dimensional-modeling/).)*
- **Snowflake khi dimension cực lớn hoặc đổi liên tục.** Có vài tình huống thật sự đáng chuẩn hoá tiếp: một bảng dimension khổng lồ (hàng triệu dòng) mà phần mô tả lặp lại chiếm dung lượng đáng kể; hoặc một thuộc tính thay đổi xoành xoạch và bạn muốn sửa đúng một chỗ. Khi ấy snowflake đáng công. Nhưng đó là **ngoại lệ của quy mô lớn**, không phải mặc định.

Để ý cái bẫy: nhiều người chọn snowflake vì nó nghe "chuẩn hơn", "chuyên nghiệp hơn". Nhưng "chuẩn hoá tối đa" là mục tiêu của **database giao dịch** (OLTP - nơi liên tục ghi/sửa), không phải của **database phân tích** (OLAP - nơi chủ yếu đọc và tổng hợp). Trộn lẫn hai mục tiêu là cách nhanh nhất để tự làm khổ mình. *(Khác biệt này, chúng tôi mổ kỹ trong [OLTP vs OLAP](/blog/oltp-vs-olap/).)*

## Kết thực dụng cho SME: đừng over-engineer

Nói thẳng để khỏi cân nhắc lăn tăn: nếu bạn là một SME, một cửa hàng vài nghìn đến vài chục nghìn đơn mỗi tháng - **dùng star, gần như chắc chắn đủ.** Snowflake là công cụ tối ưu cho quy mô lớn, cho đội dữ liệu chuyên trách quản kho hàng triệu dòng. Bê nó về cho một shop bán áo trên Shopee và TikTok Shop là **over-engineer** (làm quá mức cần thiết): bạn tốn công dựng, tốn công bảo trì, đổi lại tiết kiệm vài chục megabyte vô nghĩa và khiến mọi câu truy vấn chậm đi cùng khó đọc hơn.

Làm job ngoài, tôi dựng database cho đủ kiểu khách - một kho hàng, một phòng khám, một xưởng may. Chưa lần nào tôi chọn snowflake làm mặc định. Lý do đơn giản: thứ khách cần là *hỏi nhanh và hiểu được sơ đồ của chính mình*, không phải một sơ đồ đẹp trên giấy mà sáu tháng sau không ai dám động vào. Khi nào dung lượng hay tính nhất quán thực sự thành vấn đề, chuẩn hoá *một vài* dimension là đủ - không cần snowflake hoá toàn bộ.

## Tóm lại

| | Star schema (sao) | Snowflake schema (bông tuyết) |
|---|---|---|
| **Dimension** | Phẳng, không tách nhỏ | Tách tiếp thành nhiều bảng con |
| **Số join** | Ít (một bước/chiều) | Nhiều (nhiều bước/chiều) |
| **Tốc độ truy vấn** | Nhanh hơn | Chậm hơn |
| **Độ trùng dữ liệu** | Có lặp một chút | Gần như không lặp |
| **Dễ đọc sơ đồ** | Dễ - fact + vài cánh | Khó - lởm chởm nhánh con |
| **Hợp với** | Đa số phân tích, SME | Dimension cực lớn / đổi liên tục |

> Mental model: snowflake là star được **chuẩn hoá thêm một nấc**. Nấc đó mua cho bạn sự gọn gàng, nhưng trả bằng tốc độ và sự rõ ràng. Với phần lớn người làm số, đó là một món hời bạn không nên mua.

Còn trong [Semantix](/blog/data-warehouse-sme/): bạn không phải tự tay chọn star hay snowflake rồi mới hỏi được. Bạn khai báo đâu là fact, đâu là dimension, nối nhau qua khoá nào - phần "join mấy bước" để hệ thống lo. Nhưng hiểu cặp này vẫn đáng: nó giúp bạn dựng mô hình *gọn để hỏi*, thay vì bê nguyên một database giao dịch chuẩn-hoá-tối-đa rồi than sao hỏi mãi không ra số.

---

*Muốn hỏi dữ liệu bằng tiếng Việt mà không phải tự chọn star hay snowflake, hay viết một dòng SQL nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Data warehouse là gì - và vì sao SME chưa cần đến nó](/blog/data-warehouse-sme/).*
