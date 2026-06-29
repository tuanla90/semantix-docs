---
title: "Data modeling: Fact & Dimension - cách sắp bảng quyết định câu hỏi bạn hỏi được"
code: "kt-014"
description: "Có đủ dữ liệu mà hỏi mãi không ra số. Không thiếu số - bảng sắp sai. Sắp đúng fact và dimension, câu hỏi tự bật ra."
pubDate: 2025-05-17
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/data-modeling-fact-dimension.svg"
coverAlt: "Sơ đồ star schema: một bảng fact trung tâm nối tới các bảng dimension xung quanh"
---

Bạn có đủ dữ liệu. Từng đơn hàng, từng đồng doanh thu, từng khách hàng - tất cả nằm gọn trong file. Vậy mà khi sếp hỏi *"doanh thu áo khoác bán qua TikTok Shop cho khách ở Hà Nội trong tháng 3 là bao nhiêu?"*, bạn ngồi cả buổi lọc tay, copy qua copy lại, mà con số ra vẫn không chắc đúng.

Phản xạ đầu tiên là nghĩ "chắc mình chưa thạo công cụ" hoặc "thiếu dữ liệu chỗ nào đó". Gần như chắc chắn **cả hai đều không phải**. Dữ liệu bạn có thừa sức trả lời câu đó. Vấn đề nằm ở chỗ ít ai nghĩ tới: **cách bạn sắp các bảng quyết định bạn hỏi được câu nào.** Sắp đúng, câu hỏi tự bật ra trong vài giây. Sắp lộn, có dữ liệu trong tay mà vẫn bó tay.

Đây là sự thật ngược đời của data modeling (mô hình hoá dữ liệu - cách tổ chức các bảng và quan hệ giữa chúng): nó nghe như việc của kỹ sư, nhưng thật ra nó quyết định *bạn* - người kinh doanh - có hỏi được những câu sống còn hay không. Tin tốt: cốt lõi của nó chỉ gói trong hai từ - **fact** và **dimension**.

## Cái bẫy "bảng tính phẳng"

Hầu hết người mới bắt đầu với một bảng duy nhất, nhồi tất cả vào đó. Mỗi dòng một đơn hàng, và mỗi đơn lại lặp lại đủ thứ thông tin:

| Mã đơn | Ngày | Sản phẩm | Loại SP | Khách | Tỉnh | Kênh | Doanh thu |
|---|---|---|---|---|---|---|---|
| DH001 | 03/03 | Áo khoác A | Áo | Lan | Hà Nội | TikTok Shop | 450.000 |
| DH002 | 03/03 | Áo khoác A | Áo | Hùng | TP.HCM | Shopee | 450.000 |
| DH003 | 04/03 | Váy B | Váy | Lan | Hà Nội | TikTok Shop | 320.000 |

Trông gọn gàng. Nhưng nó là một **bảng phẳng** (flat table - một bảng duy nhất gộp mọi thứ), và nó giấu sẵn ba quả bom:

- **Lặp dữ liệu khắp nơi.** "Áo khoác A", "Hà Nội" xuất hiện đi xuất hiện lại. Lan đổi địa chỉ, bạn phải sửa hàng trăm dòng - sót một dòng là số sai.
- **Sửa một chỗ, hỏng nhiều chỗ.** Gõ nhầm "Tik Tok" ở vài dòng, "TikTok Shop" ở vài dòng khác - giờ chúng là *hai kênh khác nhau* trong mắt máy tính. Doanh thu TikTok của bạn lập tức bị chia đôi mà không ai hay.
- **Nhiều câu hỏi đơn giản trở nên bất khả thi.** Muốn biết *trung bình một khách mua bao nhiêu đơn*? Mỗi khách rải rác khắp các dòng, không có "danh sách khách" gọn để đếm - bạn phải dựng thủ công, và sai sót chực chờ.

Bảng phẳng không sai khi dữ liệu còn bé. Nó *bế tắc* khi câu hỏi bắt đầu phức tạp. Để thoát ra, cần tách bảng theo đúng bản chất của dữ liệu.

## Fact: bảng ghi lại chuyện gì đã xảy ra

**Bảng fact** (fact table - bảng sự kiện) là nơi ghi lại các **số đo** của những việc đã thật sự diễn ra. Mỗi dòng là một **sự kiện**: một giao dịch, một đơn hàng, một lượt thanh toán. Cột của nó chủ yếu là *con số cộng được*: doanh thu, số lượng, chiết khấu.

Với cửa hàng của bạn, bảng fact chính là **bảng đơn hàng**. Mỗi dòng một đơn, và chỉ giữ lại số đo cùng các **khoá** (key - mã định danh dùng để nối sang bảng khác) trỏ tới phần mô tả:

| Mã đơn | mã_sp | mã_khách | mã_ngày | Số lượng | Doanh thu |
|---|---|---|---|---|---|
| DH001 | SP01 | KH01 | 20270303 | 1 | 450.000 |
| DH002 | SP01 | KH02 | 20270303 | 1 | 450.000 |
| DH003 | SP02 | KH01 | 20270304 | 1 | 320.000 |

Để ý: bảng fact gần như không chứa chữ mô tả. Không có "Áo khoác A", không có "Hà Nội" - chỉ có mã `SP01`, `KH01`. Nó gầy và dài: ít cột, rất nhiều dòng. Phần mô tả "Áo khoác A là gì, Lan ở đâu" được đẩy sang chỗ khác - các bảng dimension.

## Dimension: bảng mô tả để cắt lát

**Bảng dimension** (dimension table - bảng chiều/thuộc tính) chứa **mô tả** dùng để cắt lát con số trong bảng fact. Mỗi dimension là một góc nhìn: sản phẩm, khách hàng, thời gian, kênh. Bảng dimension thường béo và ngắn: nhiều cột mô tả, nhưng số dòng có hạn (bạn có vài trăm sản phẩm, không phải vài triệu).

*Bảng dimension sản phẩm:*

| mã_sp | Tên | Loại | Nhà cung cấp |
|---|---|---|---|
| SP01 | Áo khoác A | Áo | Xưởng Minh |
| SP02 | Váy B | Váy | Xưởng Hà |

*Bảng dimension khách hàng:*

| mã_khách | Tên | Tỉnh | Nhóm |
|---|---|---|---|
| KH01 | Lan | Hà Nội | Thân thiết |
| KH02 | Hùng | TP.HCM | Mới |

Giờ "Áo khoác A" và "Hà Nội" mỗi cái chỉ tồn tại **đúng một dòng duy nhất**. Lan đổi địa chỉ? Sửa một ô. Gõ chuẩn tên kênh một lần, cả nghìn đơn dùng chung - không còn chuyện "Tik Tok" với "TikTok Shop" tách làm hai.

Cách phân biệt nhanh **fact** và **dimension**: nếu một cột là thứ bạn muốn *cộng/đếm/tính trung bình* thì nó thuộc bảng fact (doanh thu, số lượng). Nếu nó là thứ bạn muốn *cắt theo / lọc theo / nhóm theo* thì nó thuộc bảng dimension (tên kênh, loại sản phẩm, tỉnh). Doanh thu là fact; "theo kênh nào" là dimension. *(Đây cũng chính là cặp metric - dimension mà chúng tôi mổ kỹ trong bài [Metric, Dimension, KPI](/blog/metric-dimension-kpi/).)*

## Star schema: fact ở giữa, dimension xoay quanh

Khi bạn đặt bảng fact vào trung tâm và nối nó tới các bảng dimension qua các khoá chung, bạn được một hình ngôi sao - gọi là **star schema** (lược đồ hình sao - cách bố trí một bảng fact ở giữa nối tới nhiều bảng dimension). Đây là kiểu sắp bảng phổ biến nhất để phân tích, và nó là bản bình dân hoá của một **cơ sở dữ liệu quan hệ** (relational database - kho dữ liệu gồm nhiều bảng liên kết với nhau qua khoá chung).

<div class="viz">
<svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="Sơ đồ star schema: bảng fact đơn hàng ở giữa nối tới bốn bảng dimension">
  <defs>
    <linearGradient id="factg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22D3EE"/>
      <stop offset="1" stop-color="#34D399"/>
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
    <text x="16" y="56" fill="#E2E8F0" font-size="18" font-weight="700">Kênh bán</text>
  </g>
  <g transform="translate(290,175)">
    <rect width="180" height="90" rx="12" fill="url(#factg)"/>
    <text x="20" y="32" fill="#06283D" font-size="14" font-weight="800" letter-spacing="1">FACT</text>
    <text x="20" y="60" fill="#06283D" font-size="20" font-weight="800">Đơn hàng</text>
    <text x="20" y="80" fill="#0B3B3B" font-size="13" font-weight="600">doanh thu • số lượng</text>
  </g>
</svg>
<div class="viz-caption">Star schema: bảng fact "Đơn hàng" ở trung tâm chứa số đo, nối qua khoá chung tới các bảng dimension mô tả xung quanh. Sơ đồ minh hoạ.</div>
</div>

Vẻ đẹp của cách sắp này: bảng fact chỉ giữ số, mỗi bảng dimension giữ một góc mô tả, và khoá chung (như `mã_sp`, `mã_khách`) là sợi dây nối chúng lại. Nhờ vậy bạn **xoay và cắt con số theo mọi chiều** mà không phải dựng lại gì.

Quay lại câu hỏi của sếp đầu bài: *doanh thu áo khoác, qua TikTok Shop, khách Hà Nội, tháng 3.* Với star schema, đó chỉ là: lấy bảng fact đơn hàng, lọc qua dimension sản phẩm (loại = Áo), kênh (TikTok Shop), khách (tỉnh = Hà Nội), thời gian (tháng 3), rồi cộng cột doanh thu. Bốn lát cắt, một con số - chuyện vài giây thay vì cả buổi.

Đổi câu hỏi thì sao? *"Khách nhóm Thân thiết mua nhiều loại sản phẩm nào nhất?"* Vẫn cùng bộ bảng đó, chỉ xoay sang chiều khác. Đó là điều bảng phẳng không bao giờ làm gọn được: **sắp bảng đúng một lần, hỏi được vô số câu.**

## Đừng over-engineer - nhưng hiểu để khỏi bế tắc

Nói ngay kẻo hiểu lầm: SME không cần biến mình thành công ty dữ liệu. Bạn **không cần** snowflake schema, không cần data warehouse mười tầng, không cần thuê kỹ sư dựng pipeline cho một cửa hàng vài nghìn đơn mỗi tháng. Over-engineer (làm quá mức cần thiết) cũng tai hại như làm ẩu.

Cái bạn cần chỉ là *hiểu* sự khác nhau giữa **bảng fact** và **bảng dimension** - đủ để khi dữ liệu lớn lên, bạn không tự nhốt mình trong một bảng tính phẳng bế tắc. Biết tách "số đo" khỏi "mô tả", biết để mỗi sản phẩm/khách/kênh tồn tại đúng một dòng gốc - bấy nhiêu thôi đã đưa bạn đi trước phần lớn người vẫn đang copy-paste trong một sheet khổng lồ.

Làm job ngoài, tôi tự tay dựng database cho đủ kiểu khách: một xưởng may in ấn, một kho hàng, một phòng khám y tế. Bài học lớn nhất là fact và dimension **không bao giờ nên bắt đầu từ sơ đồ**, mà từ nghiệp vụ. Ở phòng khám, "một lượt khám" mới là sự kiện cần đếm (fact); bác sĩ, dịch vụ, bệnh nhân chỉ là chiều để cắt lát. Ở xưởng may thì "một lệnh sản xuất" mới là fact. Cứ ngồi hỏi khách *"việc gì đáng đếm nhất ở đây?"* - câu trả lời chính là bảng fact, phần còn lại tự rơi vào các dimension. *(Khi nào thì cuốn bảng tính hết "gánh" nổi và nên lên database, chúng tôi bàn riêng trong bài [Khi nào nên rời Google Sheets lên database](/blog/khi-nao-len-database/).)*

## Fact / dimension trong Semantix

Semantix không bắt bạn tự dựng star schema rồi mới dùng được. Nhưng nó **đứng trên** đúng mô hình fact / dimension này để hoạt động - và đó là lý do nó trả lời đúng thay vì đoán mò.

Cách tiếp cận không phải "cắm AI thẳng vào đống bảng rồi cầu may", mà là:

1. **Khai báo mô hình một lần:** đâu là bảng fact (đơn hàng, giao dịch), đâu là các bảng dimension (sản phẩm, khách, thời gian, kênh), nối nhau qua khoá nào.
2. **[Semantic Layer](/blog/semantic-layer/) ngồi trên mô hình đó:** định nghĩa "doanh thu", "khách thân thiết" một lần, gắn vào đúng fact và dimension.
3. **AI hỏi đúng chiều:** bạn gõ câu hỏi tiếng Việt, AI biết doanh thu nằm ở fact nào, "theo kênh" là dimension nào - nên cắt đúng lát, ra đúng số.

Nói cách khác: mô hình fact/dimension là *nền móng*, semantic layer là *cuốn từ điển* đặt trên nền đó, còn AI là người tra từ điển để trả lời bạn. Thiếu nền móng, cả toà nhà nghiêng.

## Tóm lại

| | Bảng fact | Bảng dimension |
|---|---|---|
| **Chứa gì** | Số đo cộng được | Mô tả để cắt lát |
| **Mỗi dòng là** | Một sự kiện/giao dịch | Một thực thể (1 SP, 1 khách) |
| **Ví dụ cột** | Doanh thu, số lượng | Tên, loại, tỉnh, kênh |
| **Hình dáng** | Gầy & dài (nhiều dòng) | Béo & ngắn (ít dòng) |
| **Dùng để** | Cộng/đếm/trung bình | Lọc/nhóm/xoay theo |

> Mental model: bảng fact là **động từ** ("đã bán cái gì, bao nhiêu"), bảng dimension là **tính từ** ("của ai, loại nào, ở đâu, khi nào"). Câu hỏi kinh doanh nào cũng là một động từ ghép với vài tính từ - sắp bảng đúng hai vai đó, là bạn hỏi được mọi câu.

Khi đã nắm fact/dimension, bước tiếp là *sắp các bảng đó thành hình gì* và xử lý khi dimension thay đổi - tôi đào sâu trong series [Mô hình hóa chiều dữ liệu](/blog/star-vs-snowflake-schema/): star vs snowflake, cách Kimball, và SCD khi khách đổi thông tin.

---

*Muốn hỏi dữ liệu bằng tiếng Việt mà không phải tự dựng fact, dimension hay viết một dòng SQL nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*
