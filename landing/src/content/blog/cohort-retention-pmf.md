---
title: "Cohort Analysis (Phần 2): đường cong giữ chân — chỉ số product-market fit thật nhất"
code: "pt-002"
description: "Hình dạng đường cong giữ chân nói lên product-market fit nhiều hơn mọi con số tăng trưởng. Phần 2 của series: ba hình dạng đường cong, ngưỡng PMF, và 'negative churn' là gì."
pubDate: 2024-12-10
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/cohort-retention-pmf.svg"
coverAlt: "Ba đường cong giữ chân: churn về 0, phẳng ở mức PMF, và đi lên (negative churn)"
---

<div class="series-nav">
  <div class="series-nav-title">📊 Series Cohort Analysis · 4 phần</div>
  <ol>
    <li><a href="/blog/cohort-analysis/">Phần 1 — Nền tảng: ảo ảnh của con số tổng</a></li>
    <li class="current">Phần 2 — Retention &amp; PMF: đọc đường cong giữ chân</li>
    <li><a href="/blog/cohort-behavioral/">Phần 3 — Behavioral cohort: theo kênh &amp; activation</a></li>
    <li><a href="/blog/cohort-revenue-ltv/">Phần 4 — Revenue cohort &amp; LTV theo ngành</a></li>
  </ol>
</div>

Ở [Phần 1](/blog/cohort-analysis/), bạn đã học cách đọc một bảng heatmap cohort. Giờ ta rút bảng đó thành một thứ mạnh hơn nhiều: **một đường cong duy nhất** — và đây là một mental model đáng nhớ cả đời.

**Hình dạng của đường cong giữ chân quan trọng hơn mọi con số tăng trưởng bạn từng khoe.** Nhà đầu tư giỏi nhìn vào nó trước cả MRR. Lý do: nó là bằng chứng khó ngụy tạo nhất về việc sản phẩm của bạn có thật sự cần thiết hay không.

## Ba hình dạng — ba số phận

Lấy mỗi cohort, vẽ tỷ lệ giữ chân theo tuổi đời, rồi nhìn đường đi của nó. Chỉ có ba khả năng:

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- axes -->
  <line x1="60" y1="40" x2="60" y2="260" stroke="#94A3B8" stroke-width="2"/>
  <line x1="60" y1="260" x2="630" y2="260" stroke="#94A3B8" stroke-width="2"/>
  <text x="30" y="50" fill="#64748B" font-size="13">100%</text>
  <text x="40" y="265" fill="#64748B" font-size="13">0</text>
  <text x="-150" y="20" fill="#64748B" font-size="13" transform="rotate(-90 20 150)">% giữ chân</text>
  <text x="540" y="288" fill="#64748B" font-size="13">tuổi đời (tháng)</text>

  <!-- curve: churn to 0 -->
  <path d="M60 50 C 160 150, 280 235, 630 255" fill="none" stroke="#EF4444" stroke-width="4"/>
  <circle cx="630" cy="255" r="5" fill="#EF4444"/>
  <text x="470" y="240" fill="#EF4444" font-size="14" font-weight="700">① về 0% — không PMF</text>

  <!-- curve: flatten at PMF -->
  <path d="M60 50 C 150 120, 230 150, 630 152" fill="none" stroke="#22C55E" stroke-width="4"/>
  <circle cx="630" cy="152" r="5" fill="#22C55E"/>
  <text x="430" y="138" fill="#16A34A" font-size="14" font-weight="700">② phẳng — có PMF</text>

  <!-- curve: smile / negative churn -->
  <path d="M60 50 C 150 130, 240 165, 400 150 C 520 138, 580 110, 630 80" fill="none" stroke="#6366F1" stroke-width="4"/>
  <circle cx="630" cy="80" r="5" fill="#6366F1"/>
  <text x="420" y="70" fill="#6366F1" font-size="14" font-weight="700">③ đi lên — negative churn</text>
</svg>
<div class="viz-caption">Ba hình dạng đường cong giữ chân. Đường nằm ngang ở đâu mới là điều quan trọng — không phải nó bắt đầu cao bao nhiêu.</div>
</div>

### ① Lao về 0% — chưa có product-market fit

Nếu mọi cohort cuối cùng đều về gần 0%, sản phẩm của bạn không giải quyết một vấn đề đủ đau. Mọi đồng acquisition là tiền ném qua cửa sổ — bạn đang thuê khách hàng, không phải sở hữu họ. Ở giai đoạn này, **đổ thêm tiền marketing là sai lầm tốn kém nhất.** Việc cần làm là sửa sản phẩm, không phải mở rộng.

### ② Phẳng ra — đã có product-market fit

Khi đường cong **chững lại** ở một mức dương thay vì rơi về 0, bạn có một nhóm người thật sự cần sản phẩm. *Mức* nó chững lại cho biết độ mạnh của PMF:

- Phẳng ở **15–20%**: có PMF với một segment nhỏ. Hãy tìm xem segment đó là ai và mở rộng đúng nhóm đó.
- Phẳng ở **40%+**: PMF mạnh. *Đây* mới là lúc đổ tiền vào acquisition, vì cái xô đã kín đáy.

### ③ Đi lên — negative churn (thánh địa)

Hiếm và đáng mơ ước nhất: đường cong chạm đáy rồi **đi lên**. Nhóm khách còn lại chi tiêu nhiều hơn theo thời gian — qua nâng cấp gói, mua thêm, dùng nhiều hơn — đủ để *bù và vượt* phần khách rời đi. Đây là *negative churn*, hay doanh thu giữ lại ròng (NRR) **trên 100%**: mỗi nhóm khách tự lớn lên mà không cần thêm một khách mới nào. Đó là động cơ tăng trưởng kép mà các SaaS hàng đầu thế giới đều có.

## "Đường cong nằm ngang ở đâu" — không phải "bắt đầu ở đâu"

Sai lầm kinh điển: ăn mừng vì giữ chân tháng 1 cao. Một sản phẩm có thể giữ 80% sau tháng đầu rồi vẫn rơi về 0 — và một sản phẩm khác giữ 55% rồi phẳng mãi ở 45%. Cái thứ hai mới là doanh nghiệp đáng giá. **Điểm đường cong nằm ngang (asymptote) quyết định, không phải điểm xuất phát.**

## Dùng cohort để đo tác động thật của một thay đổi

Đây là siêu năng lực ít người tận dụng. Bạn tung một feature mới (hoặc đổi onboarding) vào tháng 4. Câu hỏi: nó có thật sự cải thiện gì không, hay tăng trưởng chỉ do mùa vụ?

So đường cong giữ chân của cohort **trước** thay đổi (tháng 3) với cohort **sau** (tháng 4–5), *tại cùng tuổi đời*. Nếu các cohort sau nằm ngang cao hơn một cách nhất quán, feature của bạn thật sự tạo impact. Đây gần như một thí nghiệm A/B miễn phí, lấy từ dữ liệu bạn đã có — loại bỏ được nhiễu mùa vụ và tăng trưởng tự nhiên.

## Một lưu ý về benchmark

"Giữ chân 45% là tốt hay xấu?" — không có câu trả lời tuyệt đối. Nó phụ thuộc ngành (SaaS B2B khác hẳn app tiêu dùng), mô hình kinh doanh (mua một lần vs đăng ký), và tần suất sử dụng tự nhiên của sản phẩm. Vì vậy:

> Đừng so đường cong của bạn với "chuẩn ngành" trên mạng. Hãy so **bạn của tháng này với bạn của tháng trước.** Xu hướng và hình dạng quan trọng hơn con số tuyệt đối.

## Làm với Semantix

Bạn không cần dựng đường cong thủ công. Hỏi thẳng:

> **"Vẽ đường cong giữ chân trung bình của các cohort 2024, và so cohort trước/sau khi ra mắt gói Pro tháng 4"**

Semantix tính retention theo tuổi đời, dựng đường cong, và tách nhóm trước/sau mốc bạn quan tâm — để bạn trả lời câu "thay đổi này có đáng không?" trong vài giây.

## Tiếp theo

Bạn đã biết đường cong *nói gì*. Phần 3 trả lời câu hỏi tiếp theo: *vì sao* nhóm này giữ chân tốt hơn nhóm kia? Câu trả lời nằm ở **[behavioral &amp; acquisition cohort](/blog/cohort-behavioral/)** — nhóm theo kênh và theo hành vi để tìm ra "activation moment".

← Quay lại [Phần 1 — Nền tảng](/blog/cohort-analysis/)

---

*Semantix có module Cohort Analysis tích hợp sẵn, không cần SQL. [Thử ngay với dữ liệu thực của bạn.](/docs/vi/free-trial/)*
