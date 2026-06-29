---
title: "Trung bình nói dối: vì sao 'mỗi khách chi trung bình 500k' là con số không khách nào chi"
code: "pt-024"
series: "tu-duy-du-lieu"
seriesOrder: 5
description: "Báo cáo nói trung bình mỗi khách chi 500k. Bạn nhập hàng theo đó. Nhưng phần lớn khách chỉ chi 150k - vài ông sỉ kéo lệch con số. Khi số 'đúng' vẫn đánh lừa."
pubDate: 2024-12-16
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/trung-binh-noi-doi.svg"
coverAlt: "Biểu đồ phân phối lệch với đường trung bình bị kéo lệch khỏi trung vị"
---

<div class="series-nav">
  <div class="series-nav-title">🧠 Series Tư duy dựa trên dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/tu-duy-du-lieu-la-gi/">Phần 1 - Tư duy dựa trên dữ liệu là gì</a></li>
    <li><a href="/blog/bat-dau-tu-cau-hoi/">Phần 2 - Bắt đầu từ câu hỏi, không từ dữ liệu</a></li>
    <li><a href="/blog/thien-kien-trong-doc-so/">Phần 3 - Những thiên kiến giết chết quyết định</a></li>
    <li><a href="/blog/tuong-quan-nhan-qua/">Phần 4 - Tương quan không phải nhân quả</a></li>
    <li class="current">Phần 5 - Khi con số đánh lừa: trung bình</li>
    <li><a href="/blog/leading-lagging-indicator/">Phần 6 - Từ số đến quyết định: leading vs lagging</a></li>
    <li><a href="/blog/tin-hieu-vs-nhieu/">Phần 7 - Tín hiệu vs nhiễu</a></li>
    <li><a href="/blog/goodhart-guardrail-metrics/">Phần 8 - Goodhart &amp; guardrail metrics</a></li>
    <li><a href="/blog/quyet-dinh-khi-thieu-du-lieu/">Phần 9 - Quyết định khi dữ liệu chưa đủ</a></li>
  </ol>
</div>

Một chủ shop mỹ phẩm ở TP.HCM mở báo cáo cuối tháng, thấy một dòng làm chị mừng: **AOV (Average Order Value - giá trị đơn hàng trung bình) = 500k**. Chị suy ra ngay: "Khách mình sộp, mỗi đơn nửa triệu." Thế là chị nhập về một lô combo cao cấp tầm 450k–600k, gom hết tiền hàng vào đó.

Một tháng sau, lô combo nằm đắp chiếu. Khi chị bóc dữ liệu ra xem từng đơn, sự thật hiện nguyên hình: **phần lớn khách chỉ chi quanh 150k**. Con số 500k đến từ đâu? Từ vài đơn sỉ - mấy chị bán lại ôm 5–10 triệu một lần - kéo lệch cả mặt bằng. Cái "trung bình 500k" ấy là một con số mà **gần như không khách lẻ nào thật sự chi**.

Phản xạ của bạn có thể là: "Số liệu sai à?" Không. Con số 500k **đúng tuyệt đối** về mặt số học. Đây mới là chỗ cay nghiệt: nó đúng, và nó vẫn đánh lừa. Đây là phần nguy hiểm nhất của tư duy dựa trên dữ liệu - không phải con số sai, mà là con số đúng bị đọc nhầm.

## Trung bình cộng vs trung vị: hai cái la bàn, một cái hay chỉ sai

Khi nói "trung bình", hầu hết chúng ta nghĩ tới **mean (trung bình cộng - cộng hết lại rồi chia cho số lượng)**. Mười đơn cộng lại chia mười. Đơn giản, quen thuộc, và là thứ mọi bảng tính nhả ra mặc định.

Vấn đề: mean rất "dễ bị bắt nạt". Chỉ cần một **outlier (giá trị ngoại lai - một điểm lệch hẳn khỏi phần còn lại)** là nó bị kéo đi. Một đơn sỉ 10 triệu lọt vào giữa chín đơn 150k, mean lập tức phình lên gần triệu rưỡi - dù chín trên mười khách chẳng liên quan gì tới con số đó.

Cái la bàn còn lại tỉnh táo hơn: **median (trung vị - con số nằm chính giữa khi xếp tất cả từ thấp đến cao)**. Median không quan tâm ông sỉ chi 10 triệu hay 100 triệu; nó chỉ hỏi: *đứng ở giữa hàng, người đó chi bao nhiêu?* Vì thế median miễn nhiễm với outlier.

> Quy tắc vàng: **mean cho bạn biết tổng chia đều; median cho bạn biết người ở giữa thật sự thế nào.** Khi dữ liệu lệch, median mới là người nói thật.

*Ví dụ minh họa* - mười đơn của shop: `120k · 130k · 140k · 150k · 150k · 160k · 170k · 180k · 200k · 9.000k`.

<div class="viz">
<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="22" fill="#475569" font-size="13" font-weight="700">Phân phối 10 đơn hàng (k VNĐ)</text>
  <rect x="40"  y="160" width="44" height="60" rx="4" fill="#475569"/>
  <rect x="96"  y="156" width="44" height="64" rx="4" fill="#475569"/>
  <rect x="152" y="152" width="44" height="68" rx="4" fill="#475569"/>
  <rect x="208" y="148" width="44" height="72" rx="4" fill="#64748B"/>
  <rect x="264" y="148" width="44" height="72" rx="4" fill="#64748B"/>
  <rect x="320" y="144" width="44" height="76" rx="4" fill="#64748B"/>
  <rect x="376" y="140" width="44" height="80" rx="4" fill="#475569"/>
  <rect x="432" y="136" width="44" height="84" rx="4" fill="#475569"/>
  <rect x="488" y="128" width="44" height="92" rx="4" fill="#475569"/>
  <rect x="600" y="44"  width="44" height="176" rx="4" fill="#F87171"/>
  <text x="622" y="36" fill="#F87171" font-size="12" font-weight="700" text-anchor="middle">9.000</text>
  <text x="622" y="238" fill="#F87171" font-size="11" text-anchor="middle">đơn sỉ</text>
  <line x1="20" y1="124" x2="560" y2="124" stroke="#4ADE80" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="24" y="118" fill="#4ADE80" font-size="12" font-weight="700">Median ≈ 155k - người ở giữa</text>
  <line x1="20" y1="74" x2="660" y2="74" stroke="#FBBF24" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="24" y="68" fill="#FBBF24" font-size="12" font-weight="700">Mean = 1.040k - một đơn sỉ kéo lên</text>
</svg>
<div class="viz-caption">Cùng một tập dữ liệu: median (trung vị) bám sát đám đông; mean (trung bình cộng) bị một đơn sỉ kéo vọt lên gấp gần 7 lần.</div>
</div>

Mean = 1.040k. Median = 155k. Chị chủ shop tin vào mean và nhập hàng cho một tệp khách *không tồn tại*. Nếu chị nhìn median, chị đã nhập đúng dòng hàng 150k–200k mà chín trên mười khách thật sự mua.

## Khi nào median trung thực hơn mean?

Không phải lúc nào median cũng thắng - nhưng có một tín hiệu rõ ràng để cảnh giác: **dữ liệu lệch (skewed)**. Tiền bạc, doanh thu, thời gian chờ, lượt mua trên đầu khách - gần như mọi thứ trong kinh doanh đều lệch phải: phần lớn tụ ở mức thấp, một cái đuôi dài vài giá trị khổng lồ kéo về bên phải. Hễ thấy đuôi đó, mean sẽ bị thổi phồng.

Mẹo thực dụng: **luôn xem mean và median cạnh nhau.** Hai con số sát nhau → dữ liệu cân đối, mean dùng được. Hai con số lệch xa nhau → có outlier hoặc đuôi dài, và median mới là con số mô tả "khách điển hình". Ở shop trên, khoảng cách 155k so với 1.040k là một tiếng còi báo động. (Và đôi khi cái sai không nằm ở mean hay median, mà ở việc trung bình một con số *lẽ ra không được trung bình* - như [tồn kho hay số dư tài khoản cộng/chia theo tháng](/blog/chi-so-dong-chay-vs-diem/).)

Một bước nữa, tốt hơn cả hai: **nhìn cả phân phối (distribution - toàn bộ hình dạng dữ liệu trải ra sao)**, qua một **histogram (biểu đồ phân phối)**. Phân phối kể câu chuyện mà không con số tóm tắt đơn lẻ nào kể nổi: "à, có một cục lớn ở 150k và một nhúm lẻ trên 5 triệu" - và lập tức bạn biết phải nhập hai dòng hàng cho hai tệp khách khác nhau, thay vì một dòng cho một tệp tưởng tượng. Đây cũng là lý do [phân khúc khách bằng RFM](/blog/rfm-segmentation/) hữu ích hơn nhiều so với gộp tất cả vào một con số trung bình.

## Bẫy phần trăm: +300% trên một nền nhỏ xíu

Trung bình không phải kẻ nói dối duy nhất. Người anh em của nó là **phần trăm trên nền nhỏ**.

*Ví dụ minh họa:* tháng trước cửa hàng bán được **1 đơn** mặt hàng mới. Tháng này bán **4 đơn**. Bạn báo cáo: "Tăng trưởng **+300%**!" Về số học, đúng không cãi được. Nhưng "+300%" ở đây nghĩa là *thêm đúng ba đơn*. Một con số nghe như tên lửa, thực chất là tiếng động của ba cái đơn lẻ.

Phần trăm khuếch đại mọi thứ khi mẫu số bé. "+300%", "+1.200%", "gấp đôi tỷ lệ chuyển đổi" - tất cả đều vô nghĩa nếu nền là 1, 2, hay 5. Quy tắc đơn giản để tự vệ: **mỗi khi nghe một phần trăm gây sốc, hỏi ngay con số tuyệt đối đứng sau nó.** "Tăng bao nhiêu *đơn*? Trên bao nhiêu *khách*?" Phần trăm là cái loa; con số tuyệt đối mới cho biết loa đang phóng đại điều gì. (Đây là một trong những lỗi kinh điển chúng tôi mổ xẻ kỹ trong [5 sai lầm khi phân tích dữ liệu](/blog/sai-lam-khi-phan-tich-du-lieu/).)

## Nghịch lý Simpson: mỗi nhóm đều thắng, gộp lại thì thua

Cái bẫy cuối cùng tinh vi nhất, đến mức có hẳn một cái tên: **nghịch lý Simpson (Simpson's paradox - khi gộp các nhóm lại, kết luận đảo chiều so với khi xét từng nhóm)**.

*Ví dụ minh họa* - bạn chạy hai kênh quảng cáo, đo tỷ lệ chốt đơn:

| | Khách mới | Khách cũ | **Gộp chung** |
|---|---|---|---|
| **Kênh A** | 8/100 = 8% | 90/100 = 90% | **98/200 = 49%** |
| **Kênh B** | 5/100 = 5% | 85/100 = 85% | **90/200 = 45%** |

Nhìn từng nhóm: Kênh A thắng ở khách mới (8% > 5%) *và* thắng ở khách cũ (90% > 85%). Thắng cả hai. Vậy mà nếu một kênh thứ ba dồn ngân sách lệch - chẳng hạn Kênh A tự nhiên hút toàn khách mới khó chốt, Kênh B hút toàn khách cũ dễ chốt - con số gộp có thể lật ngược hoàn toàn, khiến B trông thắng dù thua ở *mọi* nhóm con. Cái đảo chiều đó chính là nghịch lý Simpson.

Cơ chế của nó như một ảo ảnh trộn màu: trộn hai xô sơn theo tỷ lệ khác nhau, màu cuối cùng không nói cho bạn biết từng xô vốn màu gì. **Con số gộp giấu mất tỷ trọng của từng nhóm.** Bài học: trước khi tin một con số tổng, hỏi *nó được gộp từ những nhóm nào, theo tỷ lệ ra sao* - và cắt nó ra theo lát cắt nghi ngờ nhất.

## Hỏi đúng câu trong Semantix

Điểm chung của cả ba cái bẫy - mean che median, phần trăm che nền nhỏ, gộp nhóm che tỷ trọng - là chúng đều **co một câu chuyện nhiều lớp thành một con số phẳng**. Cách hóa giải không phải công thức cao siêu, mà là *hỏi thêm một câu*.

Semantix **không phải một cái máy nhả ra mỗi con số trung bình** rồi để bạn tự đoán. Khi bạn hỏi bằng tiếng Việt, bạn hỏi luôn câu thứ hai:

> **"Giá trị đơn hàng trung bình tháng này là bao nhiêu - và cho tôi xem cả median, cùng phân phối theo khoảng giá."**

Semantix hiểu ý định, sinh truy vấn trả về *cả* mean, median và một histogram - để median không bị mean che. Muốn soi nghịch lý Simpson? Bạn bảo: **"Tách tỷ lệ chốt theo kênh, rồi cắt thêm theo khách mới/khách cũ."** Hệ thống bóc lát cắt giúp bạn, thay vì đưa một con số gộp trơn tru rồi mặc bạn tin. Mọi định nghĩa ("đơn hàng", "khách mới") đều khóa sẵn trong [Semantic Layer](/blog/semantic-layer/) nên các lát cắt luôn nhất quán - không phải mỗi lần cắt lại ra một định nghĩa khác.

## Tóm lại

| Tin con số tổng (dễ bị lừa) | Hỏi phân phối + lát cắt (đọc thật) |
|---|---|
| "AOV 500k → khách sộp" | "Median bao nhiêu? Phân phối tụ ở đâu?" |
| Một mean cho cả tệp khách | Mean **và** median cạnh nhau |
| "+300% đơn - bùng nổ!" | "Con số tuyệt đối là mấy đơn?" |
| Con số gộp toàn công ty | Cắt theo nhóm: gộp có đảo chiều không? |
| Một số phẳng = một câu trả lời | Một phân phối = cả câu chuyện |

Trung bình không nói dối vì nó sai. Nó nói dối vì nó **bỏ bớt**. Mỗi con số tóm tắt là một bức ảnh chụp đám đông từ trên cao: bạn thấy hình dạng chung, nhưng không thấy ai đang đứng ở đâu. Người ra quyết định giỏi không vứt bức ảnh đó đi - họ chỉ luôn hỏi thêm: *"Cho tôi xem từng người."*

[Phần 6 - leading vs lagging](/blog/leading-lagging-indicator/) sẽ đưa bạn từ "đọc số cho đúng" sang "chọn đúng số để đo": đo cái bạn còn lái được, không phải cái đã rồi.

---

*Muốn thấy cả median và phân phối thay vì một con số trung bình đánh lừa? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [vì sao nên phân khúc khách thay vì gộp trung bình](/blog/rfm-segmentation/).*
