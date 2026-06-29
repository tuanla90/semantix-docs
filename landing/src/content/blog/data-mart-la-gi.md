---
title: "Data mart là gì: vì sao mở kho dữ liệu công ty ra, phòng nào cũng lạc lối - và cách cắt ra một cái quầy riêng"
code: "kt-044"
description: "Phòng Marketing mở kho dữ liệu công ty ra, thấy 200 bảng, không biết bảng nào của mình. Kho chung quá lớn khiến mỗi phòng lạc lối. Data mart sinh ra để cứu."
pubDate: 2025-04-02
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 9
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/data-mart-la-gi.svg"
coverAlt: "Một siêu thị lớn tượng trưng cho data warehouse, bên cạnh là một quầy nhỏ chuyên đề cắt ra từ đó tượng trưng cho data mart"
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
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 - OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 - Data quality: 6 chiều</a></li>
    <li class="current">Phần 9 - Data mart cho từng phòng</li>
  </ol>
</div>

Một bạn ở phòng Marketing kể với tôi: công ty vừa "lên data warehouse cho hoành tráng", IT cấp cho mỗi phòng một tài khoản, bảo *"tất cả dữ liệu nằm trong đó, cần gì tự lấy."* Bạn hí hửng mở ra - và khựng lại. Trước mặt là **hơn 200 bảng**: bảng đơn hàng, bảng tồn kho, bảng chấm công, bảng kế toán, bảng log hệ thống, ba bốn bảng tên na ná nhau `fact_sales`, `fact_sales_v2`, `sales_final`. Câu hỏi của bạn rất đơn giản - *"chiến dịch tháng trước ra bao nhiêu đơn?"* - nhưng để trả lời, bạn phải biết bảng nào là của mình, nối với bảng nào, cột nào là cột đúng. Bạn không biết. Không ai chỉ. Cái kho mở toang ra trước mặt, và bạn lạc trong chính tài sản của công ty.

Đây là nghịch lý ít người chịu tin: **một cái kho chung càng đầy đủ, mỗi phòng ban càng dễ lạc.** Gom hết dữ liệu về một nơi giải được bài toán "dữ liệu nằm rải rác", nhưng lại đẻ ra một bài toán mới - "dữ liệu đầy đủ quá, không biết phần nào là của tôi." Và lời giải cho bài toán mới này có một cái tên ít người nhắc tới hơn warehouse hay lake, nhưng đứng đúng vào chỗ trống đó: **data mart**.

## Data mart: cái quầy chuyên, cắt ra từ kho chung

Bỏ thuật ngữ sang bên một giây. Nếu **data warehouse** (kho dữ liệu - nơi gom dữ liệu toàn công ty đã làm sạch, có cấu trúc, tối ưu cho phân tích) là cả một siêu thị khổng lồ chứa *mọi* thứ, thì **data mart** (quầy dữ liệu chuyên đề - một lát cắt nhỏ của kho chung, chỉ chứa dữ liệu và chỉ số mà *một* phòng ban cần) là *một cái quầy chuyên* được tách ra từ siêu thị đó.

Quầy thịt chỉ bày thịt. Quầy rau chỉ bày rau. Bạn vào quầy của mình, mọi thứ bày sẵn đúng thứ bạn cần, gọn và nhanh, không phải lội qua mười dãy kệ không liên quan. Data mart cũng vậy: phòng Marketing có một mart chỉ chứa dữ liệu chiến dịch, kênh, chi phí quảng cáo, đơn theo nguồn; phòng Sales có một mart chỉ chứa đơn hàng, nhân viên bán, chỉ tiêu; phòng Kho có một mart chỉ chứa tồn, nhập, xuất. Mỗi phòng nhìn vào *đúng* phần của mình - không phải 200 bảng, mà mười lăm bảng đã được dọn sẵn cho công việc của họ.

Dân trong nghề gọi tính chất này là **subject-oriented** (theo chủ đề - dữ liệu được tổ chức quanh *một* mảng nghiệp vụ, thay vì gom tất cả lại). Warehouse tổ chức quanh *toàn bộ doanh nghiệp*; data mart tổ chức quanh *một chủ đề* - một phòng, một mảng, một bài toán.

## Siêu thị, quầy chuyên, và nhà kho thô phía sau

Để xếp ba khái niệm cạnh nhau cho rõ - vì chúng hay bị nhắc lẫn lộn:

- **Data warehouse = cả siêu thị.** Mọi dữ liệu toàn công ty, đã làm sạch và xếp ngăn nắp, một nguồn chung cho tất cả các phòng. Lớn, đầy đủ, nhưng vì đầy đủ nên *với một phòng cụ thể thì thừa thãi và khó tìm*.
- **Data mart = một quầy chuyên.** Chỉ dữ liệu và chỉ số mà *một* phòng cần, cắt ra từ siêu thị. Nhỏ, gọn, nhanh - vì ít bảng hơn nên truy vấn nhẹ hơn, và vì đã dọn theo chủ đề nên người trong phòng không lạc.
- **Data lake = nhà kho thô phía sau.** Nơi đổ mọi thứ còn thô - log, ảnh, file chưa làm sạch - "đổ trước, hỏi sau". Đây là tầng *trước cả* siêu thị, không phải để người dùng cuối ghé. Chuyện hồ và kho khác nhau ra sao, tôi đã mổ kỹ ở [Data lake vs Data warehouse](/blog/data-lake-vs-warehouse/) - bài này không lặp lại.

Một cách hình dung dòng chảy: dữ liệu thô đổ vào *lake* (nhà kho sau) → được làm sạch, xếp gọn vào *warehouse* (siêu thị) → rồi cắt thành các *mart* (quầy) cho từng phòng. Mart đứng ở *cuối* dây chuyền, gần người dùng nhất.

## Vì sao phải tách mart ra? Bốn cái lợi rất đời

Nếu warehouse đã chứa hết rồi, sao không để mọi phòng dùng chung luôn? Vì tách quầy ra đem lại bốn thứ rất thực tế:

- **Gọn - đỡ lạc.** Phòng Marketing nhìn vào mười lăm bảng của mình, không phải 200 bảng của cả công ty. Bớt nhiễu, bớt nhầm bảng.
- **Nhanh.** Mart ít dữ liệu hơn, lại thường được tính sẵn các chỉ số hay dùng, nên một câu báo cáo chạy nhanh hơn quét cả kho. Ở quy mô lớn, đây là khác biệt giữa "vài giây" và "đi pha cà phê chờ".
- **Phân quyền dễ.** Cho phòng Nhân sự thấy mart lương, mà *không* cho phòng Marketing thấy - dễ hơn nhiều so với phân quyền tới từng bảng trong một kho khổng lồ.
- **Mỗi phòng tự chủ.** Marketing chỉnh cách tính của quầy mình mà không sợ làm vỡ báo cáo của Sales.

Nghe đến đây dễ tưởng data mart là liều thuốc tiên. Nó không phải - và đây là chỗ phải nói thẳng.

## Cái bẫy: mỗi phòng một mart, lại đẻ ra nhiều "sự thật"

Đây là rủi ro mà các slide bán hàng về data mart hiếm khi ghi. Khi mỗi phòng có một quầy riêng và *tự* định nghĩa chỉ số trong quầy của mình, bạn rất dễ rơi lại đúng vào cái hố mà việc gom kho lẽ ra phải lấp.

Hình dung: mart của Sales định nghĩa "doanh thu" gồm cả đơn chưa giao. Mart của Marketing định nghĩa "doanh thu" theo đơn đã ghi nhận chuyển đổi. Mart của Kế toán trừ đơn hoàn. Ba cái quầy, ba con số "doanh thu" khác nhau - và vì mỗi quầy *trông* rất chính thống, gọn gàng, ai cũng tin số của mình là số đúng. Bạn vừa **phân mảnh sự thật** một cách *có kiến trúc đẹp*. Đây chính là bài toán [một nguồn sự thật](/blog/mot-nguon-su-that/) bị phá vỡ, chỉ khác là lần này nó núp dưới vỏ "đã có data mart cho từng phòng rồi mà".

> Quy tắc vàng: data mart cắt *phạm vi dữ liệu* cho gọn thì tốt - nhưng nếu mỗi mart tự cắt cả *định nghĩa chỉ số*, bạn không tách quầy, bạn đang nhân bản sự lẫn lộn. Phạm vi tách được; định nghĩa "doanh thu" thì phải chung.

Cách làm đúng - cũng là điều một kiến trúc kho tử tế theo [mô hình hóa chiều dữ liệu kiểu Kimball](/blog/kimball-dimensional-modeling/) nhấn mạnh - là các mart phải dùng chung *dimension và định nghĩa lõi* (cái mà Kimball gọi là "conformed dimensions"). Quầy khác nhau, nhưng "doanh thu" vẫn là một công thức duy nhất cho cả công ty.

## Quan trọng cho SME: phần lớn chưa cần warehouse, càng chưa cần mart

Giờ là phần dễ bị bỏ qua nhất, nên tôi nói thẳng. Tất cả những gì ở trên - siêu thị, quầy chuyên, conformed dimensions - là bài toán của một tổ chức *đã có* một cái kho đủ lớn đến mức cần cắt nó ra cho từng phòng đỡ lạc.

Soi lại một SME (Small & Medium Enterprise - doanh nghiệp nhỏ và vừa) đa kênh điển hình ở Việt Nam: vài nghìn đến vài chục nghìn đơn một tháng, dữ liệu nằm gọn trong Shopee, TikTok Shop, KiotViet và ít Google Sheets, tổng cộng có khi chưa tới một triệu dòng. *(Con số là ví dụ minh họa.)* Ở quy mô đó, bạn *chưa có* một cái siêu thị 200 bảng để mà phải cắt ra thành quầy. Nói như [bài về data warehouse cho SME](/blog/data-warehouse-sme/) đã chỉ rõ: phần lớn SME còn chưa cần đến warehouse, nên cái mart - vốn là một *lát cắt* của warehouse - lại càng xa hơn một bước.

Cái SME thật sự thiếu không phải "quầy riêng cho mỗi phòng", mà là **một chỗ chung và một định nghĩa chung**. Tách quầy khi bạn còn chưa có siêu thị thì giống như chia một cái tủ lạnh nhỏ thành mười ngăn có khóa riêng cho mười người: bạn vừa làm cho việc lấy hộp sữa trở nên phức tạp hơn, chứ không giải quyết được gì.

## Data mart trong Semantix

Semantix không bắt đầu bằng câu "hãy dựng cho mỗi phòng một data mart". Với phần lớn SME, đó là trả lời cho một quy mô bạn chưa có. Nhưng cái *nhu cầu* phía sau data mart - "phòng tôi muốn nhìn đúng phần của mình, gọn, không lạc trong dữ liệu của cả công ty" - thì rất thật, và giải được mà *không* cần dựng mart vật lý.

Cách tiếp cận ngược lại: thay vì chép dữ liệu ra thành một cái quầy riêng cho từng phòng (rồi nuôi, rồi đồng bộ, rồi lệch định nghĩa), mỗi phòng được cho một **"góc nhìn" riêng trên cùng một định nghĩa chung** - một bảng ảo, một ngữ cảnh đã lọc sẵn theo chủ đề của phòng đó. Marketing thấy góc Marketing, Sales thấy góc Sales - gọn như một cái quầy - nhưng "doanh thu" thì vẫn là *một* công thức duy nhất nằm ở tầng định nghĩa chung, không phòng nào cắt lại được. Bạn được cái lợi của mart (gọn, theo chủ đề, đỡ lạc) mà tránh được cái bẫy của mart (mỗi quầy một sự thật).

## Tóm lại

| | Phạm vi dữ liệu | Ai dùng |
|---|---|---|
| **Data warehouse** | Toàn công ty - mọi mảng, đã làm sạch, một siêu thị | Cả tổ chức; nền cho mọi báo cáo nghiêm túc |
| **Data mart** | Một chủ đề - chỉ dữ liệu + chỉ số một phòng cần | Một phòng ban (Marketing / Sales / Kho) |
| **Data lake** | Mọi thứ còn thô, chưa làm sạch - nhà kho phía sau | Đội kỹ thuật dữ liệu; không phải người dùng cuối |

Lần tới khi ai đó bảo "dựng data mart cho từng phòng đi cho chuyên nghiệp", đừng hỏi "công cụ nào dựng mart tốt nhất?" - hãy hỏi: **"Công ty mình đã có một cái kho đủ lớn để phải cắt ra thành quầy chưa, hay mình còn đang thiếu cả một chỗ chung và một định nghĩa chung?"** Với phần lớn SME, đúng là vế sau. Hiểu data mart là gì để *biết khi nào mới cần nó* - chứ không phải để dựng nó sớm một mùa.

> **Mental model:** Warehouse = cả siêu thị (mọi dữ liệu toàn công ty). Data mart = một quầy chuyên cắt ra cho một phòng - gọn, nhanh, đỡ lạc. Lake = nhà kho thô phía sau. Nhưng nếu mỗi mart tự định nghĩa chỉ số, bạn lại đẻ ra nhiều "sự thật". SME phần lớn chưa cần warehouse lẫn mart - cần một chỗ chung + một định nghĩa chung trước đã.

---

*Muốn mỗi phòng nhìn đúng góc của mình mà vẫn dùng chung một định nghĩa "doanh thu"? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Data lake vs Data warehouse: SME cần cái nào, và khi nào?](/blog/data-lake-vs-warehouse/)*
