---
title: "\"Dimension table\" vs \"dimension\": cùng một từ - một người chỉ cái bảng, một người chỉ góc cắt"
code: "kt-039"
description: "Hai người họp cãi nhau cả buổi vì chữ \"dimension\". Hóa ra một người đang nói cái BẢNG, người kia nói GÓC CẮT. Không ai sai - chỉ là một từ gánh hai nghĩa."
pubDate: 2025-03-01
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 1
readTime: 7
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/dimension-table-vs-dimension.png"
coverAlt: "Một bảng dữ liệu bên trái, các góc cắt tỏa ra từ nó sang phải"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li class="current">Phần 1 - Dimension vs Dimension table</li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 - Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 - Kimball: mô hình chiều</a></li>
    <li><a href="/blog/inmon-vs-kimball/">Phần 4 - Inmon vs Kimball</a></li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 - SCD: chiều thay đổi chậm</a></li>
    <li><a href="/blog/snapshot-table/">Phần 6 - Snapshot &amp; 3 loại fact</a></li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 - OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 - Data quality: 6 chiều</a></li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 - Data mart cho từng phòng</a></li>
  </ol>
</div>


Cuộc họp setup báo cáo, anh dev nói: *"Dimension sản phẩm em đã build xong, có đủ tên, nhóm, giá vốn."* Chị phân tích gật gù rồi hỏi tiếp: *"Thế dimension theo tháng có chưa?"* Anh dev khựng lại: *"Ơ, tháng nằm trong dimension thời gian mà chị."* Hai người nhìn nhau, mỗi người tưởng người kia lẫn.

Họ không lẫn. Họ đang dùng đúng một từ - **"dimension"** - để chỉ **hai thứ khác nhau**. Anh dev nói tới **cái bảng** (bảng sản phẩm, bảng thời gian). Chị phân tích nói tới **góc cắt** (cắt theo tháng, cắt theo nhóm hàng). Cùng phát âm, cùng mặt chữ, nhưng một bên là *vật thể trong cơ sở dữ liệu*, một bên là *thao tác phân tích*. Cãi nhau mười phút chỉ vì chưa ai chịu hỏi: *"Anh/chị đang nói cái bảng, hay nói góc cắt?"*

Bài này không dạy lại fact với dimension là gì - chuyện đó nằm gọn trong [Fact & Dimension: cách sắp bảng quyết định câu hỏi bạn hỏi được](/blog/data-modeling-fact-dimension/). Ở đây chỉ làm rõ **một nhầm lẫn từ vựng** đủ sức làm hỏng một buổi họp.

## Dimension (chiều): một góc để cắt số liệu

**Dimension** (chiều - góc cắt) là một *khái niệm phân tích*: một hướng để bạn xoay và bổ con số ra nhìn. "Doanh thu theo **tháng**", "theo **kênh**", "theo **vùng**" - mỗi cái "theo gì đó" là một dimension. Nó không phải vật thể bạn cầm nắm được; nó là **cách bạn nhìn**.

Đây là nghĩa mà người làm phân tích, người dùng dashboard (bảng số trực quan) nói tới hằng ngày. Khi chị phân tích bảo *"cho tôi cắt theo tháng"*, chị đang gọi tên một dimension. Bản thân "tháng" với chị là một góc - một trục để bổ doanh thu. (Đây cũng đúng nghĩa "dimension" trong cặp metric - dimension mà chúng tôi mổ kỹ ở [Metric, Dimension, KPI](/blog/metric-dimension-kpi/).)

## Dimension table (bảng dimension): cái bảng vật lý lưu mô tả

**Dimension table** (bảng dimension - bảng chiều) là một thứ hoàn toàn khác: một **cái bảng thật** nằm trong cơ sở dữ liệu, lưu các **attribute** (thuộc tính - các cột mô tả) của một chủ thể. Bảng "Sản phẩm" có cột tên, nhóm hàng, giá vốn, nhà cung cấp. Bảng "Khách hàng" có tên, tỉnh, nhóm thân thiết. Đó là những dimension table.

Đây là nghĩa mà dev, người dựng mô hình dữ liệu nói tới. Khi anh dev bảo *"dimension sản phẩm đã build xong"*, anh đang nói tới **một bảng** - một vật thể có cấu trúc, có dòng có cột, ngồi trong database. Với anh, nó là thứ *xây ra được*, không phải một góc nhìn.

> Quy tắc vàng: "dimension" là **góc cắt** (động từ - *cắt theo gì*); "dimension table" là **cái bảng** (danh từ - *vật thể trong database*). Nhầm hai cái là nhầm giữa việc nhìn và vật được nhìn.

## Một bảng chứa nhiều góc cắt - đó là chỗ dễ rối nhất

Mấu chốt khiến hai người trên cãi nhau: **một dimension table thường đẻ ra nhiều dimension.**

Lấy bảng **Thời gian**. Nó là *một* bảng (một dimension table), nhưng mỗi cột trong nó là *một* góc cắt riêng:

| mã_ngày | Năm | Quý | Tháng | Thứ trong tuần |
|---|---|---|---|---|
| 20270818 | 2027 | Q3 | T8 | Thứ Tư |
| 20270819 | 2027 | Q3 | T8 | Thứ Năm |

Một cái bảng - nhưng bạn cắt được theo năm, theo quý, theo tháng, theo thứ. Tức là **một dimension table = nhiều dimension**. Khi anh dev nói "dimension thời gian" (ý chỉ cái bảng), chị phân tích nghe ra "góc cắt thời gian" và hỏi "thế còn tháng?" - trong khi "tháng" chỉ là *một cột* nằm sẵn trong chính cái bảng ấy.

Ngược lại, cái "chiều" mà người dùng thấy trên dashboard - ví dụ menu thả xuống ghi "**Tháng**" - thật ra chỉ là **một cột duy nhất** được rút ra từ bảng thời gian. Người dùng tưởng "Tháng" là một thực thể độc lập; thực ra nó là một attribute trong một dimension table to hơn.

## Vì sao lẫn lộn gây phiền khi trao đổi với dev/analyst

Lẫn hai nghĩa này không làm sai con số - nhưng làm **lệch pha hội thoại**, và đó là loại lỗi tốn thời gian nhất:

- Bạn nói *"thêm cho tôi dimension khách hàng"* - ý là **thêm một bảng** mô tả khách. Dev hiểu đúng.
- Bạn nói *"thêm cho tôi dimension theo nhóm khách"* - ý là **thêm một góc cắt**. Nhưng nhóm khách có thể *đã nằm sẵn* trong bảng khách rồi, chỉ là chưa bật lên báo cáo. Dev nghe "thêm dimension" lại tưởng bạn cần dựng bảng mới.

Cùng chữ "dimension", hai yêu cầu khác hẳn nhau: một bên là *việc dựng bảng*, một bên là *việc khai báo một cột sẵn có thành góc cắt*. Lẫn lộn, và bạn chờ dev "làm bảng mới" suốt một tuần cho thứ đáng ra bật trong năm phút - hoặc ngược lại.

Cách chữa rẻ nhất là **một câu hỏi làm rõ**: *"Mình đang nói cái BẢNG, hay GÓC CẮT?"* Hỏi đúng câu đó, cuộc trao đổi thẳng ngay.

## Dùng từ cho rõ trong Semantix

Semantix tách bạch hai nghĩa này ngay trong cách bạn khai báo, nên không còn chỗ để hiểu nhầm:

1. **Bảng** được khai báo là *nguồn* - đây là bảng sản phẩm, bảng thời gian, bảng khách. Một lần. (Nền tảng đứng trên mô hình fact/dimension, theo [Kimball dimensional modeling](/blog/kimball-dimensional-modeling/).)
2. **Góc cắt** được khai báo riêng là *dimension dùng được*: từ bảng thời gian, bật cột Tháng, Quý, Năm thành ba góc cắt - không cần dựng thêm bảng nào.
3. Khi bạn hỏi *"doanh thu theo tháng"*, hệ thống biết "tháng" là một **góc cắt** lấy từ **bảng** thời gian - không bắt bạn phân biệt thủ công.

Bạn nói nghiệp vụ, hệ thống lo phần "bảng nào, cột nào". Còn lại, bạn chỉ cần nhớ một điều: nói cho rõ mình đang chỉ cái bảng, hay chỉ góc cắt.

## Tóm lại

| Khái niệm | Là gì | Ví dụ |
|---|---|---|
| **Dimension (chiều)** | Một **góc cắt** để xoay nhìn số liệu - khái niệm phân tích, không cầm nắm được | "theo tháng", "theo kênh", "theo vùng" |
| **Dimension table (bảng dimension)** | Một **cái bảng vật lý** trong database, lưu thuộc tính mô tả của một chủ thể | Bảng Sản phẩm (tên, nhóm, giá vốn); bảng Thời gian |

Một dimension table chứa **nhiều** dimension (bảng thời gian → cắt theo năm/quý/tháng/thứ); ngược lại một "chiều" người dùng thấy trên dashboard chỉ là **một cột** rút ra từ bảng. Lần tới khi ai đó nói "dimension" mà bạn thấy gợn, đừng cãi - hỏi đúng một câu: *"Anh đang nói cái bảng, hay góc cắt?"* Chín trên mười lần, cuộc họp ngắn đi một nửa.

---

*Muốn hỏi "doanh thu theo tháng" bằng tiếng Việt mà không phải bận tâm bảng nào, cột nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Fact & Dimension: cách sắp bảng quyết định câu hỏi bạn hỏi được](/blog/data-modeling-fact-dimension/).*
