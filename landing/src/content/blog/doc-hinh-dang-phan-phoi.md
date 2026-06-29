---
title: "Thống kê mô tả (Phần 3): đọc hình dạng phân phối — chuẩn, lệch, đuôi dài, hai đỉnh"
code: "kt-030"
series: "thong-ke-mo-ta"
seriesOrder: 3
description: "Một con số trung bình giấu sạch hình dạng thật của dữ liệu. Cùng một mean, bốn câu chuyện kinh doanh khác hẳn nhau. Vẽ histogram trước khi tin."
pubDate: 2025-02-01
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/doc-hinh-dang-phan-phoi.svg"
coverAlt: "Bốn dạng histogram: phân phối chuẩn, lệch phải, đuôi dài và hai đỉnh"
---

<div class="series-nav">
  <div class="series-nav-title">📐 Series Thống kê mô tả cho người làm số · 5 phần</div>
  <ol>
    <li><a href="/blog/do-lech-chuan/">Phần 1 — Độ lệch chuẩn &amp; phương sai</a></li>
    <li><a href="/blog/phan-vi-percentile/">Phần 2 — Phân vị (P50/P90/P99)</a></li>
    <li class="current">Phần 3 — Đọc hình dạng phân phối</li>
    <li><a href="/blog/phan-tram-vs-diem-phan-tram/">Phần 4 — Phần trăm vs điểm phần trăm</a></li>
    <li><a href="/blog/trung-binh-co-trong-so/">Phần 5 — Trung bình có trọng số</a></li>
  </ol>
</div>

Bốn cửa hàng khác nhau cùng báo về một con số: **giá trị đơn trung bình 250k**. Bạn đọc lướt, gật đầu, gộp chung "khách bốn shop này chi như nhau" và lên kế hoạch nhập hàng đồng loạt.

Nhưng nếu bạn vẽ dữ liệu thật của từng shop ra, bạn thấy bốn bức tranh không liên quan gì nhau: shop một có khách chi quanh 250k đều tăm tắp; shop hai phần lớn chi 150k nhưng vài đơn sỉ kéo trung bình lên; shop ba có đúng một khách ôm sỉ chục triệu trong khi cả ngàn khách chi 80k; shop bốn thực ra là **hai tệp khách trộn lẫn** — một nhóm lẻ chi 120k và một nhóm sỉ chi 600k, ghép lại vừa khéo ra 250k mà chẳng ai chi đúng 250k.

Phản xạ của bạn có thể là: "Nhưng trung bình bằng nhau cơ mà?" Đúng. Con số trung bình **giống hệt nhau** ở cả bốn. Đây là sự thật ngược đời ít người chịu tin: **một con số tóm tắt — dù là mean hay median — giấu sạch hình dạng thật của dữ liệu.** Và hình dạng mới là thứ quyết định bạn nên làm gì.

Ở [Phần 1](/blog/do-lech-chuan/) bạn đã học độ lệch chuẩn đo độ "tản" của dữ liệu, ở [Phần 2](/blog/phan-vi-percentile/) bạn học phân vị cắt dữ liệu thành lát. Phần này là mảnh ghép còn thiếu: **nhìn toàn bộ hình dạng cùng một lúc**, qua một biểu đồ duy nhất.

## Công cụ duy nhất bạn cần: histogram

Trước khi đi tiếp, ba từ khóa để cả bài bám vào:

- **Phân phối (distribution — toàn bộ cách các giá trị trải ra: chỗ nào dày, chỗ nào thưa)** là bức tranh đầy đủ của một cột dữ liệu, thay vì co nó về một con số.
- **Histogram (biểu đồ phân phối — chia dữ liệu thành các khoảng rồi đếm xem mỗi khoảng có bao nhiêu)** là cách vẽ phân phối ra để mắt người đọc được.
- **Phân phối chuẩn (normal — hình chuông đối xứng, dày ở giữa, thưa dần đều về hai bên)** là hình dạng "ngoan" nhất, nơi mọi con số tóm tắt đều đáng tin.

Histogram trả lời một câu mà mean không bao giờ trả lời được: *"Khách của tôi tụ ở đâu, và có ai đứng lạc loài không?"* Hãy nhìn bốn hình dạng bạn sẽ gặp đi gặp lại:

<div class="viz">
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="20" fill="#475569" font-size="13" font-weight="700">Bốn hình dạng phân phối — cùng một trục, khác nhau ở dáng</text>
  <!-- chuẩn -->
  <text x="80" y="48" fill="#475569" font-size="12" font-weight="700" text-anchor="middle">Chuẩn (đối xứng)</text>
  <line x1="14" y1="200" x2="146" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="20"  y="176" width="16" height="24" fill="#64748B"/>
  <rect x="40"  y="150" width="16" height="50" fill="#64748B"/>
  <rect x="60"  y="112" width="16" height="88" fill="#475569"/>
  <rect x="80"  y="96"  width="16" height="104" fill="#475569"/>
  <rect x="100" y="112" width="16" height="88" fill="#475569"/>
  <rect x="120" y="150" width="16" height="50" fill="#64748B"/>
  <rect x="140" y="176" width="16" height="24" fill="#64748B"/>
  <!-- lệch phải -->
  <text x="270" y="48" fill="#475569" font-size="12" font-weight="700" text-anchor="middle">Lệch phải (skew)</text>
  <line x1="204" y1="200" x2="336" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="210" y="100" width="16" height="100" fill="#475569"/>
  <rect x="230" y="118" width="16" height="82" fill="#475569"/>
  <rect x="250" y="148" width="16" height="52" fill="#64748B"/>
  <rect x="270" y="166" width="16" height="34" fill="#64748B"/>
  <rect x="290" y="178" width="16" height="22" fill="#64748B"/>
  <rect x="310" y="186" width="16" height="14" fill="#94A3B8"/>
  <rect x="330" y="192" width="6"  height="8"  fill="#94A3B8"/>
  <!-- đuôi dài -->
  <text x="460" y="48" fill="#475569" font-size="12" font-weight="700" text-anchor="middle">Đuôi dài (long tail)</text>
  <line x1="394" y1="200" x2="526" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="400" y="96"  width="16" height="104" fill="#475569"/>
  <rect x="420" y="150" width="16" height="50" fill="#64748B"/>
  <rect x="440" y="176" width="16" height="24" fill="#94A3B8"/>
  <rect x="460" y="188" width="16" height="12" fill="#94A3B8"/>
  <rect x="480" y="193" width="16" height="7"  fill="#F87171"/>
  <rect x="500" y="195" width="16" height="5"  fill="#F87171"/>
  <rect x="520" y="196" width="6"  height="4"  fill="#F87171"/>
  <!-- hai đỉnh -->
  <text x="650" y="48" fill="#475569" font-size="12" font-weight="700" text-anchor="middle">Hai đỉnh (bimodal)</text>
  <line x1="584" y1="200" x2="716" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="590" y="120" width="16" height="80" fill="#475569"/>
  <rect x="610" y="96"  width="16" height="104" fill="#475569"/>
  <rect x="630" y="130" width="16" height="70" fill="#64748B"/>
  <rect x="650" y="168" width="16" height="32" fill="#CBD5E1"/>
  <rect x="670" y="130" width="16" height="70" fill="#64748B"/>
  <rect x="690" y="100" width="16" height="100" fill="#475569"/>
  <rect x="710" y="124" width="6"  height="76" fill="#475569"/>
</svg>
<div class="viz-caption">Bốn dáng phân phối thường gặp trong dữ liệu kinh doanh. Cùng một trục giá trị, nhưng mỗi dáng đòi một cách đọc — và một hành động — khác nhau. (Hình minh họa khái niệm.)</div>
</div>

## ① Chuẩn — khi mean đáng tin tuyệt đối

Phân phối chuẩn là hình chuông: một cục dày ở giữa, hai bên thưa dần và **đối xứng**. Khi dữ liệu của bạn trông như vậy, mọi thứ Phần 1 và Phần 2 dạy đều "ngoan": mean nằm đúng giữa, median sát ngay đó, và độ lệch chuẩn nói lên điều gì đó thật về độ tản. *"Khách điển hình chi quanh 250k, cộng trừ 40k"* — câu đó chỉ có nghĩa khi phân phối gần chuẩn.

*Ví dụ minh họa:* tuổi của khách một quán cà phê gần trường đại học — phần lớn 19–24, vài người trẻ hơn, vài người lớn hơn, đối xứng đẹp. Ở đây bạn yên tâm dùng mean để mô tả, lập kế hoạch theo "khách trung bình". Đây là trường hợp **dễ nhất và hiếm nhất**. Phần lớn dữ liệu kinh doanh không ngoan như thế.

> Quy tắc vàng: **độ lệch chuẩn (Phần 1) chỉ có ý nghĩa khi phân phối gần chuẩn.** Đem nó áp lên dữ liệu lệch là tự lừa mình bằng một con số nghe có vẻ chính xác.

## ② Lệch — khi mean và median rẽ hai hướng

Đây là dáng bạn gặp nhiều nhất. **Lệch (skew — phân phối bị kéo dài về một phía, dồn cục về phía còn lại)** xảy ra khi một nhúm giá trị lớn (hoặc nhỏ) kéo cái đuôi về một bên. Tiền bạc gần như luôn **lệch phải**: phần lớn khách chi ít, vài khách chi nhiều kéo đuôi sang phải.

Hệ quả cốt lõi: **khi dữ liệu lệch, mean tách khỏi median.** Mean bị cái đuôi kéo theo; median (con số ở chính giữa khi xếp từ thấp đến cao) thì đứng yên với đám đông. Như đã mổ kỹ ở [bài "trung bình nói dối"](/blog/trung-binh-noi-doi/), một quán bán phần lớn đơn 150k mà mean báo 500k thì cái 500k đó là con số *không khách nào thật sự chi*.

Mẹo thực dụng: **luôn đặt mean và median cạnh nhau.** Hai số sát nhau → phân phối cân, dùng mean thoải mái. Hai số lệch xa → có đuôi, **dùng median** để mô tả "khách điển hình", và đừng nhập hàng theo mean. Khoảng cách giữa hai con số ấy chính là tiếng còi báo "dữ liệu của bạn đang lệch".

## ③ Đuôi dài — vài cá thể khổng lồ, đám đông tí hon

**Đuôi dài (long tail — một số rất ít giá trị cực lớn nằm xa hẳn về một phía, phần còn lại bé và đông)** là người anh em cực đoan của lệch phải. Khác biệt nằm ở mức độ: không phải "vài đơn hơi to", mà là **một hai cá thể lớn gấp hàng chục, hàng trăm lần phần còn lại**.

Đây chính là khuôn mặt thống kê của quy luật Pareto. *Ví dụ minh họa:* trong 2.000 mã hàng của một nhà phân phối, 40 mã đầu bảng gánh quá nửa doanh thu, còn lại là một cái đuôi dài ngoằng bán nhỏ giọt. Hay trong tệp khách: 5% khách VIP đóng 60% doanh số.

Với đuôi dài, ngay cả median cũng chưa đủ — nó mô tả đúng đám đông tí hon nhưng **bỏ quên mấy cá thể khổng lồ đang nuôi cả doanh nghiệp**. Cách đọc đúng là tách bạch: mô tả phần thân bằng median, rồi *liệt kê riêng* phần đuôi giá trị cao. Đây đúng là tinh thần [phân tích Pareto 80/20](/blog/pareto-80-20/) — đừng trung bình hóa thứ mà bản chất là không đều.

## ④ Hai đỉnh — dấu hiệu bạn đang trộn hai nhóm

Dáng nguy hiểm nhất vì dễ bị bỏ sót: **hai đỉnh (bimodal — phân phối có hai "núi" tách nhau, trũng ở giữa)**. Khi histogram hiện hai bướu thay vì một, gần như chắc chắn bạn đang **trộn hai nhóm khác bản chất vào một**.

*Ví dụ minh họa:* vẽ giá trị đơn của một cửa hàng vật liệu xây dựng, bạn thấy một đỉnh quanh 120k (khách lẻ mua lặt vặt) và một đỉnh quanh 600k (thầu mua sỉ). Cái mean 250k rơi đúng vào **chỗ trũng giữa hai đỉnh — nơi gần như không có khách nào**. Một con số cho hai thế giới.

Hành động không phải "tính median cho khéo hơn", mà là **tách nhóm rồi phân tích riêng**. Khách lẻ và khách sỉ cần dòng hàng khác, giá khác, cách chăm khác. Gộp chung và lấy trung bình là cách chắc chắn nhất để phục vụ sai cả hai. (Đây cũng là lý do [phân khúc khách bằng RFM](/blog/rfm-segmentation/) đáng giá hơn nhiều một con số trung bình toàn tệp.)

## Bảng tra nhanh: hình dạng → dùng số nào, làm gì

| Hình dạng | Dấu hiệu trên histogram | Nên dùng số nào | Hành động |
|---|---|---|---|
| **Chuẩn** | Một đỉnh, đối xứng; mean ≈ median | Mean (+ độ lệch chuẩn) | Mô tả bằng "trung bình ± lệch chuẩn", lập kế hoạch theo mean |
| **Lệch** | Một đỉnh, đuôi kéo một bên; mean ≠ median | Median | Dùng median mô tả; soi mean để biết đuôi nặng cỡ nào |
| **Đuôi dài** | Cục lớn + đuôi rất xa, vài giá trị khổng lồ | Median + liệt kê riêng phần đuôi | Tách top giá trị cao ra; áp tư duy Pareto |
| **Hai đỉnh** | Hai bướu, trũng ở giữa | Không dùng một số chung | Tách thành hai nhóm, phân tích từng nhóm |

## Đọc hình dạng trong Semantix

Cốt lõi của cả bài chỉ một câu: **vẽ histogram trước khi tin một con số tóm tắt.** Nghe đơn giản, nhưng trong bảng tính nó là cả một quy trình — chia khoảng, đếm, dựng cột, làm lại mỗi lần đổi câu hỏi — nên hầu hết mọi người bỏ qua và tin thẳng vào mean.

Semantix **không phải cái máy nhả ra mỗi con số trung bình** rồi để bạn tự đoán hình dạng phía sau. Bạn hỏi bằng tiếng Việt:

> **"Vẽ phân phối giá trị đơn hàng tháng này theo khoảng giá, kèm cả mean và median."**

Hệ thống dựng histogram, đặt mean và median lên cùng một hình — để bạn thấy ngay nó chuẩn, lệch, đuôi dài hay hai đỉnh, và tự kết luận nên đọc bằng số nào. Thấy hai đỉnh? Bạn bảo tiếp: **"Tách giá trị đơn theo khách lẻ và khách sỉ rồi vẽ riêng."** Một câu hỏi thay cho cả buổi dựng bảng.

## Tóm lại

| Tin một con số phẳng | Đọc cả hình dạng |
|---|---|
| "Trung bình 250k → khách chi như nhau" | "Histogram tụ ở đâu? Có mấy đỉnh?" |
| Mean cho mọi loại dữ liệu | Mean khi chuẩn; median khi lệch |
| Một số cho cả tệp | Hai đỉnh = hai nhóm, tách ra |
| Đuôi dài bị trung bình hóa | Tách riêng phần giá trị cao |
| Độ lệch chuẩn áp bừa | Chỉ dùng khi phân phối gần chuẩn |

Bốn shop "trung bình 250k" ở đầu bài không hề giống nhau — chúng chỉ tình cờ trùng một con số. Người đọc số giỏi không dừng ở con số đó; họ vẽ nó ra và hỏi: *"Hình dạng này đang nói gì?"* Vì hình dạng quyết định bạn dùng mean hay median, có nên tách nhóm hay không — những thứ một con số tóm tắt không bao giờ tự khai.

[Phần 4 — phần trăm vs điểm phần trăm](/blog/phan-tram-vs-diem-phan-tram/) sẽ gỡ một cái bẫy khác cũng âm thầm không kém: vì sao "tăng 5 điểm phần trăm" và "tăng 5 phần trăm" là hai chuyện hoàn toàn khác nhau.

---

*Muốn thấy hình dạng phân phối thật thay vì một con số trung bình đánh lừa? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 4 — phần trăm vs điểm phần trăm](/blog/phan-tram-vs-diem-phan-tram/).*
