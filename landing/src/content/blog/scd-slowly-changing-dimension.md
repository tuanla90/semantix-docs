---
title: "SCD — Slowly Changing Dimension: khi khách đổi địa chỉ, đơn cũ của chị về tỉnh nào?"
code: "kt-035"
description: "Chị Hà chuyển từ Hà Nội vào TP.HCM. Đơn cũ của chị giờ tính về tỉnh nào? Câu trả lời quyết định cả báo cáo doanh thu theo vùng đúng hay sai."
pubDate: 2027-08-04
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 5
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/scd-slowly-changing-dimension.svg"
coverAlt: "Một bản ghi khách hàng đổi giá trị tỉnh theo thời gian: ghi đè một dòng so với thêm dòng mới giữ lịch sử"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 — Dimension vs Dimension table</a></li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 — Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 — Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 — Inmon vs Kimball</a></li>
    <li class="current">Phần 5 — SCD: chiều thay đổi chậm</li>
    <li><a href="/blog/snapshot-table/">Phần 6 — Snapshot &amp; 3 loại fact</a></li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 — OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 — Data quality: 6 chiều</a></li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 — Data mart cho từng phòng</a></li>
  </ol>
</div>



Chị Hà là khách thân thiết, ba năm liền đặt hàng đều đặn khi còn ở Hà Nội. Tháng trước chị chuyển hẳn vào TP.HCM, và bạn cập nhật địa chỉ trong hệ thống. Chuyện rất đỗi bình thường — cho tới sáng nay, khi sếp mở **báo cáo doanh thu theo vùng** và hỏi: *"Sao doanh thu miền Bắc quý trước tự nhiên tụt mà chẳng có lý do gì?"*

Bạn không làm gì sai cả. Bạn chỉ sửa một ô địa chỉ. Nhưng câu hỏi thật sự nằm ở đây: **những đơn hàng chị Hà đặt năm ngoái — lúc chị còn ở Hà Nội — giờ tính về tỉnh nào?** Nếu hệ thống trả lời "TP.HCM", thì toàn bộ doanh thu miền Bắc của các quý cũ vừa âm thầm chảy ngược vào miền Nam. Báo cáo vùng của bạn sai, mà không một dòng số nào báo lỗi.

Phản xạ đầu tiên là nghĩ "thì khách ở đâu tính ở đó, có gì đâu". Nhưng đây chính là cái bẫy. Một thuộc tính mô tả — như tỉnh của khách — **thay đổi theo thời gian**, và cách bạn xử lý sự thay đổi đó quyết định báo cáo lịch sử của bạn đúng hay sai. Dân làm dữ liệu có hẳn một tên gọi cho bài toán này: **SCD**.

## SCD là gì: xử lý khi thuộc tính của một chiều thay đổi

**SCD (Slowly Changing Dimension — chiều thay đổi chậm)** là cách xử lý khi một **thuộc tính trong bảng dimension** (bảng chiều — bảng mô tả dùng để cắt lát số liệu) đổi giá trị theo thời gian. "Chậm" ở đây nghĩa là nó không đổi mỗi giây như một giao dịch, mà thi thoảng mới đổi: khách dọn nhà, sản phẩm đổi nhà cung cấp, nhân viên chuyển phòng ban, mặt hàng đổi nhóm giá.

Nếu bạn chưa rõ fact và dimension khác nhau ra sao, hãy đọc trước [Data modeling: Fact &amp; Dimension](/blog/data-modeling-fact-dimension/) — vì SCD chỉ áp dụng cho **dimension**. Bảng fact ghi việc đã xảy ra (đơn DH001 doanh thu 450k) thì cố định. Còn bảng dimension mô tả "khách là ai, ở đâu" — và cái "ở đâu" đó mới là thứ trượt theo thời gian.

Có ba cách kinh điển để xử lý, gọi là **Type 1, Type 2, Type 3**. Chúng khác nhau ở đúng một câu hỏi: **bạn có muốn giữ lại lịch sử của giá trị cũ không?**

## Type 1: ghi đè — đơn giản, nhưng xoá sạch quá khứ

**Type 1** là cách bạn vừa làm với chị Hà: tìm đúng dòng, **ghi đè** giá trị cũ bằng giá trị mới. Xong.

*Trước khi chị Hà chuyển:*

| mã_khách | Tên | Tỉnh |
|---|---|---|
| KH01 | Hà | Hà Nội |

*Sau khi ghi đè:*

| mã_khách | Tên | Tỉnh |
|---|---|---|
| KH01 | Hà | TP.HCM |

Sạch sẽ, một dòng duy nhất, dễ hiểu. Nhưng để ý: **Hà Nội biến mất hoàn toàn**. Không còn dấu vết nào cho biết chị Hà từng ở Hà Nội. Mọi đơn cũ của chị, khi nối sang bảng khách qua `mã_khách`, đều thấy "TP.HCM" — kể cả những đơn đặt từ hai năm trước.

Khi nào Type 1 là lựa chọn đúng? Khi giá trị cũ **vốn dĩ là sai**, hoặc khi bạn thật sự không cần lịch sử. Gõ nhầm tên khách "Hườn" thành "Hường", nhập sai số điện thoại, phân loại nhầm nhóm sản phẩm — đây là **sửa lỗi**, không ai muốn giữ lại cái sai. Type 1 hoàn hảo cho việc đó. Vấn đề chỉ nảy sinh khi bạn dùng Type 1 cho một thay đổi **có thật trong đời** — như chị Hà thật sự đã chuyển nhà — vì lúc đó bạn đang xoá một mẩu lịch sử có giá trị.

## Type 2: thêm dòng mới — giữ lịch sử đầy đủ

**Type 2** giải đúng nỗi đau của chị Hà. Thay vì sửa dòng cũ, bạn **thêm một dòng mới** cho chị, đánh dấu khoảng thời gian hiệu lực của từng phiên bản, và giữ nguyên dòng cũ:

| khoá | mã_khách | Tên | Tỉnh | ngày_hiệu_lực | ngày_hết_hiệu_lực | hiện_hành |
|---|---|---|---|---|---|---|
| 1 | KH01 | Hà | Hà Nội | 2024-01-01 | 2027-05-31 | Không |
| 2 | KH01 | Hà | TP.HCM | 2027-06-01 | (đang mở) | Có |

Vài điểm cốt lõi:

- Mỗi phiên bản của chị Hà là **một dòng riêng**, mang một **surrogate key** (khóa thay thế — mã kỹ thuật do hệ thống tự sinh, khác với `mã_khách` nghiệp vụ) ở cột `khoá`. `mã_khách` KH01 vẫn chung, nhưng `khoá` 1 và 2 phân biệt hai phiên bản.
- Cột **effective date** (ngày hiệu lực) và ngày hết hiệu lực vạch rõ phiên bản nào đúng cho khoảng thời gian nào. Cờ `hiện_hành` đánh dấu dòng đang dùng.
- Bảng fact đơn hàng giờ trỏ tới **đúng `khoá` của phiên bản tại thời điểm đặt đơn**: đơn năm 2024 trỏ về khoá 1 (Hà Nội), đơn tháng 6/2027 trỏ về khoá 2 (TP.HCM).

Kết quả: đơn cũ của chị Hà **vĩnh viễn về đúng Hà Nội**, đơn mới về TP.HCM. Báo cáo doanh thu vùng của các quý trước không hề lay chuyển khi chị dọn nhà. Đây là lý do Type 2 là chuẩn vàng cho phân tích nghiêm túc.

Cái giá phải trả: bảng dimension **phình ra**. Mỗi lần một thuộc tính đổi là thêm một dòng. Khách đổi địa chỉ năm lần thì có năm dòng. Và mọi truy vấn lấy "khách hiện tại" đều phải nhớ lọc `hiện_hành = Có`, nếu không sẽ đếm trùng. Phức tạp hơn — nhưng đổi lại bạn có một bộ máy thời gian không bao giờ nói dối về quá khứ.

## Type 3: thêm cột "giá trị trước" — giữ một mức lịch sử

**Type 3** là đường giữa. Thay vì thêm dòng, bạn thêm một **cột** để giữ giá trị cũ ngay bên cạnh giá trị mới:

| mã_khách | Tên | Tỉnh hiện tại | Tỉnh trước | Ngày đổi |
|---|---|---|---|---|
| KH01 | Hà | TP.HCM | Hà Nội | 2027-06-01 |

Bạn biết chị Hà giờ ở TP.HCM và trước đó ở Hà Nội. Nhưng chỉ **một mức** thôi: nếu chị từng ở Đà Nẵng trước cả Hà Nội, thông tin đó đã mất. Type 3 hợp khi bạn cần so sánh "trước và sau" một lần đổi lớn — ví dụ doanh nghiệp **tái cơ cấu vùng bán hàng** và muốn xem số liệu vừa theo phân vùng cũ vừa theo phân vùng mới một thời gian, rồi thôi. Trong thực tế Type 3 ít được dùng hơn hẳn, vì "chỉ giữ một bước lùi" hiếm khi đủ cho phân tích thật.

## Vì sao Type 2 là mặc định cho phân tích nghiêm túc

Tất cả quy về một nguyên tắc: **đơn cũ phải về đúng bối cảnh lúc nó xảy ra.** Doanh thu chị Hà tạo ra năm 2024 là doanh thu của một khách *Hà Nội* — vì lúc đó chị thật sự ở Hà Nội. Gán nó cho TP.HCM chỉ vì hôm nay chị sống ở đó là viết lại lịch sử, và mọi báo cáo so sánh theo vùng, theo thời gian sẽ lệch.

Đây không phải chuyện riêng của địa chỉ. Cùng cơ chế đó chi phối: nhân viên sale chuyển vùng (hoa hồng đơn cũ thuộc vùng nào?), sản phẩm đổi nhóm giá (đơn cũ tính theo giá cũ hay mới?), cửa hàng đổi quận quản lý. Hễ một thuộc tính mô tả đổi mà bạn còn muốn nhìn lại quá khứ cho trung thực, Type 2 là câu trả lời. Nó họ hàng gần với ý tưởng [snapshot table](/blog/snapshot-table/) — đóng băng trạng thái theo thời điểm — và là một viên gạch nền trong [mô hình hoá chiều kiểu Kimball](/blog/kimball-dimensional-modeling/).

<div class="viz">
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="So sánh Type 1 ghi đè một dòng với Type 2 thêm dòng mới giữ lịch sử">
  <defs>
    <linearGradient id="scdg-kt035" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#818CF8"/>
      <stop offset="1" stop-color="#34D399"/>
    </linearGradient>
  </defs>
  <text x="30" y="36" fill="#818CF8" font-size="16" font-weight="800" letter-spacing="1">TYPE 1 — GHI ĐÈ</text>
  <text x="30" y="58" fill="#94A3B8" font-size="13">Một dòng. Hà Nội bị xoá, mất lịch sử.</text>
  <g transform="translate(30,72)">
    <rect width="320" height="44" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <text x="16" y="28" fill="#64748B" font-size="14">KH01 • Hà •</text>
    <text x="150" y="28" fill="#64748B" font-size="14" text-decoration="line-through">Hà Nội</text>
    <text x="232" y="28" fill="#34D399" font-size="14" font-weight="700">TP.HCM</text>
  </g>
  <text x="430" y="36" fill="#818CF8" font-size="16" font-weight="800" letter-spacing="1">TYPE 2 — THÊM DÒNG</text>
  <text x="430" y="58" fill="#94A3B8" font-size="13">Hai dòng. Giữ cả Hà Nội lẫn TP.HCM.</text>
  <g transform="translate(430,72)">
    <rect width="300" height="44" rx="8" fill="#0F172A" stroke="#312E81" stroke-width="2"/>
    <text x="16" y="28" fill="#CBD5E1" font-size="14">KH01 • Hà • Hà Nội</text>
    <text x="210" y="28" fill="#64748B" font-size="12">đến 05/2027</text>
  </g>
  <g transform="translate(430,124)">
    <rect width="300" height="44" rx="8" fill="#0F172A" stroke="url(#scdg-kt035)" stroke-width="2"/>
    <text x="16" y="28" fill="#E2E8F0" font-size="14" font-weight="700">KH01 • Hà • TP.HCM</text>
    <text x="210" y="28" fill="#34D399" font-size="12">hiện hành</text>
  </g>
  <line x1="30" y1="180" x2="730" y2="180" stroke="#1E293B" stroke-width="1"/>
  <text x="30" y="216" fill="#94A3B8" font-size="14" font-weight="700">Đơn cũ (2024) nối tới phiên bản nào?</text>
  <g transform="translate(30,232)">
    <rect width="200" height="40" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="100" y="25" fill="#E2E8F0" font-size="13" text-anchor="middle">Đơn DH-2024 của Hà</text>
  </g>
  <path d="M236 252 L350 252" stroke="#475569" stroke-width="2" fill="none"/>
  <g transform="translate(356,232)">
    <rect width="160" height="40" rx="8" fill="#0B1220" stroke="#64748B"/>
    <text x="80" y="25" fill="#94A3B8" font-size="13" text-anchor="middle">Type 1 → TP.HCM ✗</text>
  </g>
  <path d="M522 252 L560 252" stroke="#475569" stroke-width="2" fill="none"/>
  <g transform="translate(566,232)">
    <rect width="164" height="40" rx="8" fill="#0B1220" stroke="#34D399"/>
    <text x="82" y="25" fill="#34D399" font-size="13" text-anchor="middle">Type 2 → Hà Nội ✓</text>
  </g>
  <text x="30" y="312" fill="#64748B" font-size="12">Sơ đồ minh hoạ: cùng một đơn cũ, Type 1 gán sai vùng, Type 2 trả về đúng vùng lúc đặt đơn.</text>
</svg>
<div class="viz-caption">Type 1 ghi đè một dòng nên đơn cũ "nhảy" sang TP.HCM; Type 2 giữ hai phiên bản nên đơn cũ vẫn về đúng Hà Nội. Sơ đồ minh hoạ.</div>
</div>

## Với SME: ít nhất phải biết mình đang Type 1 hay Type 2

Bạn không cần dựng kho dữ liệu mười tầng hay thuê kỹ sư chỉ vì một bài viết về SCD. Nhưng có một điều **bắt buộc phải biết**: hệ thống của bạn — Google Sheets, phần mềm bán hàng, file Excel khách hàng — đang xử lý thay đổi theo **Type 1 hay Type 2**?

Gần như chắc chắn nó là **Type 1**. Hầu hết phần mềm phổ thông cứ thấy bạn sửa địa chỉ là ghi đè, không giữ lịch sử. Điều đó **không sai** — chỉ là bạn phải biết hệ quả: mọi báo cáo "theo vùng", "theo nhóm khách", "theo giá" của các kỳ cũ sẽ tự động dịch chuyển mỗi khi có ai đó cập nhật một thuộc tính. Lúc làm job ngoài, tôi từng mất nửa ngày truy một báo cáo doanh thu vùng "tự nhiên đổi" qua các tháng — thủ phạm hoá ra là vài khách đổi địa chỉ, ghi đè kiểu Type 1, kéo lịch sử theo. Không có dòng nào báo lỗi, vì về mặt số học chẳng có gì sai cả.

Quy tắc thực dụng: thuộc tính nào bạn **không bao giờ** cắt báo cáo theo (số điện thoại, ghi chú) thì cứ Type 1, ghi đè vô tư. Thuộc tính nào bạn **thường xuyên** nhìn lịch sử theo nó — vùng, nhóm khách, bậc giá, kênh — thì hoặc cần Type 2, hoặc tối thiểu phải tỉnh táo rằng báo cáo cũ sẽ trôi khi nó đổi.

> Quy tắc vàng: trước khi tin một báo cáo lịch sử "theo vùng / theo nhóm / theo giá", hãy hỏi: *thuộc tính đó được lưu kiểu Type 1 hay Type 2?* Nếu Type 1, con số quá khứ phản ánh trạng thái **hôm nay**, không phải trạng thái **lúc đó**.

## Tóm lại

| | Type 1 | Type 2 | Type 3 |
|---|---|---|---|
| **Cách làm** | Ghi đè giá trị cũ | Thêm dòng mới + ngày hiệu lực | Thêm cột "giá trị trước" |
| **Giữ lịch sử?** | Không | Đầy đủ | Một mức duy nhất |
| **Độ phức tạp** | Thấp | Cao (bảng phình, phải lọc dòng hiện hành) | Trung bình |
| **Khi nào dùng** | Sửa lỗi, không cần lịch sử | Phân tích nghiêm túc theo thời gian | So "trước/sau" một lần đổi lớn |

Ba Type, một câu hỏi duy nhất phải tự trả lời cho từng thuộc tính: *khi cái này đổi, mình có cần nhìn lại nó như cũ không?* Trả lời được câu đó, bạn đã đứng trước phần lớn những người để báo cáo vùng âm thầm sai mà không hề hay.

---

*Muốn hỏi "doanh thu miền Bắc quý trước" mà chắc chắn đơn cũ về đúng vùng lúc đặt — không phải vùng hôm nay? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Fact &amp; Dimension](/blog/data-modeling-fact-dimension/) để nắm nền tảng.*
