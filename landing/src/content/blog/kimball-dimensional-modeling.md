---
title: "Kimball & mô hình hóa chiều: vì sao một thiết kế database 'sai chuẩn' lại là thiết kế đúng cho phân tích"
code: "kt-034"
description: "Database vận hành của bạn chuẩn hoá đẹp tới mức hỏi 'doanh thu theo tỉnh theo tháng' phải join 8 bảng. Kimball lật ngược: thiết kế lấy câu hỏi làm trung tâm."
pubDate: 2027-07-24
category: "Kiến Thức Nền Tảng"
series: "mo-hinh-chieu-du-lieu"
seriesOrder: 2
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/kimball-dimensional-modeling.svg"
coverAlt: "Sơ đồ star schema theo Kimball: một bảng fact trung tâm nối tới bốn bảng dimension xung quanh"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Mô hình hóa chiều dữ liệu · 3 phần</div>
  <ol>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 1 — Star vs Snowflake schema</a></li>
    <li class="current">Phần 2 — Kimball &amp; mô hình hóa chiều</li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 3 — SCD: chiều thay đổi chậm</a></li>
  </ol>
</div>

Mở phần mềm bán hàng của bạn ra, nhìn vào cấu trúc database (cơ sở dữ liệu — kho các bảng dữ liệu) bên dưới, bạn sẽ thấy một thứ rất *đẹp*: hàng chục bảng nhỏ gọn, không lặp dữ liệu, mỗi thứ nằm đúng một chỗ. Bảng khách hàng riêng, bảng địa chỉ riêng, bảng tỉnh/thành riêng, bảng sản phẩm riêng, bảng nhóm hàng riêng. Một kỹ sư nhìn vào sẽ gật gù: chuẩn hoá cao, sạch sẽ, đúng sách.

Rồi sếp hỏi một câu tưởng đơn giản: *"Doanh thu theo tỉnh, theo tháng, năm nay so năm ngoái?"* Và để trả lời, bạn — hoặc cái máy — phải nối (join) tận tám cái bảng lại với nhau. Câu thứ hai đổi chiều một chút, lại tám bảng khác. Cái database "đẹp" ấy hoá ra là **ác mộng cho phân tích**.

Đây là nghịch lý ít người làm kinh doanh được nghe: **một thiết kế database tối ưu cho việc *ghi* gần như luôn tệ cho việc *hỏi*.** Và người đặt tên cho lời giải đã có từ ba thập kỷ trước: Ralph Kimball, với phương pháp **mô hình hóa chiều** (dimensional modeling — thiết kế dữ liệu xoay quanh câu hỏi phân tích). Tin tốt: bạn không cần dựng cả một kho dữ liệu để hưởng lợi từ nó — chỉ cần mượn *cách nghĩ* của nó.

## Vì sao database vận hành lại "ác mộng" cho phân tích

Hệ thống vận hành hằng ngày — phần mềm bán hàng, app sàn, phần mềm kế toán — được thiết kế để **ghi** thật nhanh, thật chính xác: thêm một đơn, sửa một địa chỉ, trừ một món tồn. Để làm tốt việc đó, người ta áp dụng **chuẩn hoá** (normalization — tách dữ liệu thành nhiều bảng nhỏ để mỗi thông tin chỉ tồn tại một chỗ).

Chuẩn hoá cao có lý do chính đáng: khách đổi số điện thoại, bạn sửa **đúng một ô**, không phải lùng sửa nghìn dòng. Nhưng cái giá của sự gọn gàng đó là: để *đọc* một bức tranh tổng thể, bạn phải ráp lại hàng chục mảnh. Mỗi câu hỏi phân tích biến thành một bài toán nối bảng. Database giỏi ghi, *dở* hỏi.

Kimball lật ngược toàn bộ ưu tiên đó. Câu hỏi xuất phát không phải "lưu sao cho gọn?" mà là **"người ta sẽ hỏi gì, và làm sao để mỗi câu hỏi chỉ chạm tới ít bảng nhất?"** Thiết kế lấy *câu hỏi phân tích* làm trung tâm, chứ không phải lấy *việc lưu trữ* làm trung tâm.

## Fact và dimension: động từ và tính từ của dữ liệu

Mô hình Kimball chia mọi thứ làm hai loại bảng, và chỉ hai.

**Bảng fact** (fact table — bảng sự kiện) ghi lại những việc *đã thật sự xảy ra và đo đếm được*: một đơn hàng, một lượt thanh toán, một lần giao hàng. Mỗi dòng là một sự kiện, và các cột chủ yếu là *con số cộng được* — doanh thu, số lượng, chiết khấu. Bảng fact gầy mà dài: ít cột, rất nhiều dòng.

**Bảng dimension** (dimension table — bảng chiều/bối cảnh) chứa *mô tả* để cắt lát con số trong fact: ai mua (khách hàng), mua gì (sản phẩm), khi nào (thời gian), ở đâu (địa điểm), qua kênh nào. Bảng dimension béo mà ngắn: nhiều cột mô tả, nhưng số dòng có hạn.

Một mẹo phân biệt không bao giờ sai: nếu một cột là thứ bạn muốn *cộng / đếm / tính trung bình*, nó là fact (doanh thu, số lượng). Nếu là thứ bạn muốn *lọc theo / nhóm theo / cắt theo*, nó là dimension (tỉnh, loại hàng, tháng). Doanh thu là fact; "theo tỉnh nào" là dimension. *(Cặp fact–dimension này là nền của mọi báo cáo — chúng tôi mổ kỹ trong bài [Fact & Dimension: cách sắp bảng quyết định câu hỏi bạn hỏi được](/blog/data-modeling-fact-dimension/).)*

Nói ngắn gọn: **fact là động từ** (đã bán, đã thu, bao nhiêu), **dimension là tính từ** (của ai, loại nào, ở đâu, khi nào). Mọi câu hỏi kinh doanh đều là một động từ ghép với vài tính từ.

## Grain: câu hỏi đầu tiên phải trả lời

Trước khi vẽ bất cứ thứ gì, Kimball bắt bạn trả lời một câu duy nhất, và đây là bước người ta hay bỏ qua nhất: **grain** (độ mịn — một dòng trong bảng fact đại diện cho *cái gì*).

Nghe trừu tượng, nhưng nó cụ thể đến đáng ngạc nhiên. Với bảng đơn hàng, grain có thể là:

- **Một dòng = một đơn hàng** (gộp mọi món trong đơn), hoặc
- **Một dòng = một dòng sản phẩm trong đơn** (mỗi món một dòng riêng).

Hai lựa chọn này *khác nhau hoàn toàn*. Nếu grain là "một đơn", bạn không bao giờ phân tích nổi "sản phẩm nào hay được mua kèm sản phẩm nào" — thông tin đó đã bị nén mất. Nếu grain là "một dòng sản phẩm", bạn lại phải cẩn thận khi đếm số đơn để khỏi đếm trùng.

> Quy tắc vàng: **chọn grain trước, mọi thứ khác theo sau.** Grain càng mịn, bạn càng giữ được nhiều câu hỏi cho tương lai — nên khi phân vân, hãy chọn mức chi tiết nhất mà nghiệp vụ còn ý nghĩa.

Chọn sai grain là cái sai đắt nhất trong mô hình chiều, vì nó âm thầm: báo cáo vẫn chạy, vẫn ra số, chỉ là có những câu bạn *vĩnh viễn không hỏi được* mà chẳng hiểu vì sao.

## Phi chuẩn hoá có chủ đích: cố tình "làm sai" cho đúng

Đây là chỗ Kimball làm các kỹ sư chuẩn hoá khó chịu. Trong bảng dimension, ông **cố tình lặp dữ liệu** — gọi là **phi chuẩn hoá** (denormalization — gộp dữ liệu lại, chấp nhận lặp để đọc nhanh).

Thay vì tách "tỉnh" ra một bảng riêng, "vùng miền" ra bảng riêng nữa như database vận hành làm, dimension khách hàng của Kimball gộp tất cả vào một bảng phẳng và rộng: tên, tỉnh, vùng miền, nhóm khách — nằm cạnh nhau. Có lặp không? Có. Hà Nội xuất hiện ở hàng nghìn dòng khách. Nhưng đó là **lặp có chủ đích**, đổi lấy hai thứ vô giá cho người làm phân tích:

1. **Nhanh.** Hỏi "doanh thu theo vùng miền" chỉ cần nối fact với *một* bảng dimension, không phải lần qua chuỗi tỉnh → vùng → miền.
2. **Dễ hiểu.** Mở bảng dimension ra là thấy mọi thuộc tính của khách trong một chỗ — không cần là kỹ sư mới đọc được sơ đồ.

Lý do "lặp" không còn nguy hiểm như ở database vận hành: dữ liệu phân tích thường được nạp theo đợt và **ít khi sửa tay**. Cái rủi ro "sửa một chỗ sót chỗ khác" — vốn là lý do người ta chuẩn hoá — gần như không tồn tại ở đây. Vậy nên Kimball thẳng thừng: ở kho phân tích, **tốc độ đọc và sự dễ hiểu thắng sự gọn gàng**.

## Star schema: hình ngôi sao của câu trả lời

Đặt bảng fact vào giữa, nối tới các dimension xung quanh qua khoá chung, bạn được một hình ngôi sao — **star schema** (lược đồ hình sao). Đây là sản phẩm cuối của tư duy Kimball, và là lý do mọi thứ phía trên ráp lại với nhau.

<div class="viz">
<svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="Sơ đồ star schema của Kimball: bảng fact đơn hàng ở giữa nối tới bốn bảng dimension">
  <defs>
    <linearGradient id="factkt034" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22D3EE"/>
      <stop offset="1" stop-color="#818CF8"/>
    </linearGradient>
  </defs>
  <line x1="380" y1="220" x2="180" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="380" y1="220" x2="580" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="380" y1="220" x2="180" y2="350" stroke="#334155" stroke-width="2"/>
  <line x1="380" y1="220" x2="580" y2="350" stroke="#334155" stroke-width="2"/>
  <g transform="translate(90,50)">
    <rect width="180" height="80" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <text x="16" y="30" fill="#94A3B8" font-size="14" font-weight="700">DIMENSION</text>
    <text x="16" y="56" fill="#E2E8F0" font-size="18" font-weight="700">Sản phẩm</text>
  </g>
  <g transform="translate(490,50)">
    <rect width="180" height="80" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <text x="16" y="30" fill="#94A3B8" font-size="14" font-weight="700">DIMENSION</text>
    <text x="16" y="56" fill="#E2E8F0" font-size="18" font-weight="700">Khách hàng</text>
  </g>
  <g transform="translate(90,310)">
    <rect width="180" height="80" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <text x="16" y="30" fill="#94A3B8" font-size="14" font-weight="700">DIMENSION</text>
    <text x="16" y="56" fill="#E2E8F0" font-size="18" font-weight="700">Thời gian</text>
  </g>
  <g transform="translate(490,310)">
    <rect width="180" height="80" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <text x="16" y="30" fill="#94A3B8" font-size="14" font-weight="700">DIMENSION</text>
    <text x="16" y="56" fill="#E2E8F0" font-size="18" font-weight="700">Địa điểm</text>
  </g>
  <g transform="translate(290,175)">
    <rect width="180" height="90" rx="12" fill="url(#factkt034)"/>
    <text x="20" y="32" fill="#06283D" font-size="14" font-weight="800" letter-spacing="1">FACT</text>
    <text x="20" y="60" fill="#06283D" font-size="20" font-weight="800">Đơn hàng</text>
    <text x="20" y="80" fill="#0B3B3B" font-size="13" font-weight="600">doanh thu • số lượng</text>
  </g>
</svg>
<div class="viz-caption">Star schema kiểu Kimball: fact "Đơn hàng" ở trung tâm giữ số đo, nối qua khoá chung tới bốn dimension mô tả. Một câu hỏi = chạm fact + vài dimension, không phải nối tám bảng. Sơ đồ minh hoạ.</div>
</div>

So với database vận hành tám bảng lúc đầu: câu *"doanh thu theo tỉnh theo tháng"* giờ chỉ là nối fact với hai dimension (địa điểm, thời gian) rồi cộng. Đổi câu hỏi sang *"sản phẩm nào bán chạy ở miền Nam quý vừa rồi"* — vẫn cùng bộ bảng, chỉ xoay sang chiều khác. **Thiết kế một lần, hỏi được vô số câu** — đó là cả lời hứa của Kimball gói trong một hình. *(Star schema còn có người anh em "snowflake" — khi nào nên chọn cái nào, xem [Star vs Snowflake schema](/blog/star-vs-snowflake-schema/).)*

## Bus matrix: khi bạn có nhiều hơn một bảng fact

Doanh nghiệp lớn lên thì có nhiều sự kiện đáng đếm: đơn hàng là một fact, nhưng còn lượt trả hàng, còn phiếu nhập kho, còn chi phí quảng cáo — mỗi cái một fact riêng. Câu hỏi đặt ra: làm sao để chúng "nói chuyện" được với nhau?

Lời giải của Kimball là **bus matrix** (ma trận trục — bảng liệt kê các fact theo hàng, các dimension theo cột). Ý tưởng cốt lõi: các fact khác nhau **dùng chung cùng một bộ dimension**. Nếu cả fact đơn hàng và fact trả hàng đều dùng *cùng* dimension thời gian và *cùng* dimension sản phẩm, thì bạn có thể đặt chúng cạnh nhau mà so — "tỉ lệ trả hàng theo sản phẩm theo tháng" trở thành câu hỏi trả lời được, dù dữ liệu đến từ hai nguồn.

Bạn chưa cần dựng cái này hôm nay. Nhưng hiểu nguyên tắc của nó cho bạn một kim chỉ nam quý: **đừng định nghĩa "sản phẩm" hay "tháng" mỗi nơi một kiểu.** Một dimension dùng chung là sợi dây cho phép các mảnh phân tích rời rạc về sau ráp lại thành một bức tranh.

## Bạn không cần cả kho Kimball — chỉ cần tư duy Kimball

Đây là chỗ dễ hiểu lầm nhất, nên nói thẳng: **bạn không phải dựng một data warehouse mười tầng để hưởng lợi từ Kimball.** Một cửa hàng vài nghìn đơn mỗi tháng không cần thuê kỹ sư xây kho. *(Khi nào SME thật sự chạm ngưỡng cần một kho riêng — và vì sao phần lớn thì chưa — xem [Data warehouse cho SME](/blog/data-warehouse-sme/).)*

Cái đáng mang về không phải bộ công cụ, mà là *cách nghĩ*. Lần tới khi báo cáo của bạn rối tung, hãy tự hỏi đúng ba câu của Kimball:

1. **Sự kiện nào đáng đếm nhất ở đây?** Đó là bảng fact.
2. **Một dòng fact đại diện cho cái gì?** Đó là grain — chốt nó trước.
3. **Tôi sẽ muốn cắt con số này theo những chiều nào?** Đó là các dimension.

Chỉ riêng việc tách bạch "số đo" khỏi "bối cảnh", và gọi tên đúng grain, đã đủ làm báo cáo của bạn sáng ra — kể cả khi tất cả vẫn nằm trong một file Google Sheets. *Một [Semantic Layer](/blog/semantic-layer/) chính là cách để bạn có "ngôn ngữ chiều" này — định nghĩa "doanh thu" gắn vào fact, "theo tỉnh" gắn vào dimension — mà không phải tự tay dựng warehouse; nhưng đó là chuyện về sau, không phải điều kiện để bắt đầu nghĩ theo Kimball.*

## Tóm lại

| | Chuẩn hoá — cho vận hành | Mô hình chiều — cho phân tích |
|---|---|---|
| **Mục tiêu** | Ghi nhanh, lưu gọn | Hỏi nhanh, đọc dễ |
| **Cách sắp** | Tách nhỏ, không lặp | Gộp rộng, lặp có chủ đích |
| **Câu hỏi chuẩn** | "Lưu sao cho sạch?" | "Người ta sẽ hỏi gì?" |
| **Một câu hỏi chạm** | Rất nhiều bảng (8 join) | Ít bảng (fact + vài dim) |
| **Hình dáng** | Mạng bảng chằng chịt | Ngôi sao (star schema) |
| **Ai đọc được sơ đồ** | Cần là kỹ sư | Người làm số cũng đọc được |

Database vận hành của bạn không *sai* — nó đúng cho việc của nó. Sai là khi bạn bắt nó làm việc của một thiết kế khác. Kimball không bảo bạn vứt cái cũ; ông chỉ ra rằng *hỏi* và *ghi* là hai bài toán khác nhau, và mỗi bài toán xứng đáng có hình dáng riêng.

---

*Muốn xem tư duy fact–dimension áp vào một bảng cụ thể trông ra sao? Đọc tiếp [Fact & Dimension: cách sắp bảng quyết định câu hỏi bạn hỏi được](/blog/data-modeling-fact-dimension/), hoặc làm rõ ranh giới metric với dimension trong [Metric, Dimension, KPI](/blog/metric-dimension-kpi/).*
