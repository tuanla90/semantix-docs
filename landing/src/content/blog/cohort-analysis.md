---
title: "Cohort Analysis (Phần 1): vì sao tăng trưởng 40% vẫn có thể là dấu hiệu công ty đang chết"
code: "pt-001"
series: "cohort"
seriesOrder: 1
description: "Một con số tổng tăng đẹp có thể che giấu một doanh nghiệp đang rò rỉ khách hàng từng ngày. Phần 1 của series: ảo ảnh của con số tổng, cohort là gì, và cách đọc một bảng heatmap giữ chân."
pubDate: 2024-12-03
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Trần Minh Khoa"
featured: true
cover: "/blog/covers/cohort-analysis.svg"
coverAlt: "Bảng heatmap cohort giữ chân khách hàng theo tháng"
---

<div class="series-nav">
  <div class="series-nav-title">📊 Series Cohort Analysis · 4 phần</div>
  <ol>
    <li class="current">Phần 1 — Nền tảng: ảo ảnh của con số tổng</li>
    <li><a href="/blog/cohort-retention-pmf/">Phần 2 — Retention &amp; PMF: đọc đường cong giữ chân</a></li>
    <li><a href="/blog/cohort-behavioral/">Phần 3 — Behavioral cohort: theo kênh &amp; activation</a></li>
    <li><a href="/blog/cohort-revenue-ltv/">Phần 4 — Revenue cohort &amp; LTV theo ngành</a></li>
  </ol>
</div>

Năm 2023, một startup SaaS (Software as a Service — phần mềm cho thuê theo thuê bao) Việt Nam tự hào khoe MRR (Monthly Recurring Revenue — doanh thu định kỳ hàng tháng) tăng 40% trong 6 tháng. Nhìn từ bên ngoài: một công ty đang thắng. Nhìn vào Cohort Analysis (phân tích theo nhóm khách gộp theo thời điểm bắt đầu): **70% khách đăng ký tháng 1 đã rời đi trong vòng 90 ngày**. Họ đang đổ tiền acquisition (thu hút khách mới) để bù vào lỗ hổng retention (tỷ lệ giữ chân) — như đổ nước vào cái xô thủng đáy.

Đây là nghịch lý ít người chịu tin: **một con số tổng đang tăng có thể che giấu một doanh nghiệp đang chết dần.** Và bạn sẽ không bao giờ thấy nó trong dashboard tổng hợp. Chỉ Cohort Analysis kể được.

## Ảo ảnh của con số tổng

Hãy hình dung mỗi tháng bạn chi tiền kéo về một nhóm khách mới. Doanh thu tổng = (khách cũ còn lại) + (khách mới). Nếu bạn kéo khách mới đủ nhanh, con số tổng vẫn đi lên đẹp đẽ — *kể cả khi từng nhóm khách đều rời bỏ bạn nhanh hơn trước*.

Nói cách khác: tổng tăng không cho biết bạn đang xây một tài sản, hay đang chạy trên máy chạy bộ với tốc độ ngày càng cao. Để phân biệt, bạn phải tách khách ra theo **thời điểm họ bắt đầu** và theo dõi từng nhóm riêng. Đó chính là cohort.

## Cohort Analysis là gì?

Cohort là nhóm người dùng được gộp theo một đặc điểm chung — thường là **thời điểm bắt đầu** (tháng đăng ký, tuần mua hàng đầu). Thay vì nhìn số tổng theo tháng, Cohort Analysis theo dõi **hành vi của từng nhóm theo thời gian**: trong 100 người mua tháng 1, tháng 2 còn lại bao nhiêu? Tháng 3? Tháng 6?

Kết quả thường được trình bày dưới dạng **heatmap** — mỗi hàng là một nhóm, mỗi cột là một mốc "tuổi đời", màu càng đậm thì giữ chân càng cao:

<div class="viz">
<div class="viz-chart" data-chart="cohort" data-chart-data='{"cohorts":["T1/24","T2/24","T3/24","T4/24"],"periodLabels":["Tháng 0","Tháng 1","Tháng 2","Tháng 3","Tháng 6"],"matrix":[[100,62,48,41,29],[100,71,55,48,null],[100,68,52,null,null],[100,74,null,null,null]],"unit":"%"}'></div>
<div class="viz-caption">Heatmap giữ chân: mỗi hàng là một nhóm khách theo tháng đăng ký, mỗi cột là một mốc tuổi đời. Vùng trống là tương lai chưa tới.</div>
</div>

## Cách đọc một bảng heatmap (đọc sai là vô nghĩa)

Có **hai chiều đọc**, và đa số người mới chỉ đọc một:

**Đọc theo hàng ngang** cho thấy một nhóm hao mòn ra sao theo thời gian. Nhóm T1/24 rơi từ 100% → 62% → 48%... Đó là tốc độ "chảy máu" của nhóm đó.

**Đọc theo cột dọc** mới là nơi sự thật lộ ra. So các nhóm ở *cùng một tuổi đời*: tại Tháng 1, nhóm T2 giữ chân 71%, nhóm T4 giữ 74% — tốt hơn hẳn nhóm T1 (62%). Tức là có gì đó trong các tháng sau đã cải thiện: onboarding mới? feature mới? segment khách khác? Chính cột dọc này phơi bày điều mà con số tổng giấu kín.

> Quy tắc vàng: **luôn so sánh các cohort ở cùng tuổi đời.** So nhóm 6 tháng tuổi với nhóm 1 tháng tuổi là khập khiễng — như so chiều cao đứa trẻ 6 tuổi với đứa 1 tuổi rồi kết luận đứa lớn "khỏe hơn".

## Vì sao đây là phân tích nền tảng, không phải nâng cao

Nhiều người tưởng cohort là thứ "để dành cho data scientist". Thực ra nó là phân tích **cơ bản nhất** mà mọi người ra quyết định nên đọc được — vì nó là cách duy nhất trả lời câu hỏi sống còn: *bạn đang xây một tài sản, hay đang chạy nhanh hơn trên cái xô thủng?*

Một con số tăng trưởng đơn lẻ không bao giờ trả lời được câu đó. Một bảng cohort thì có — chỉ trong một cái nhìn.

## Hai sai lầm giết chết mọi phân tích cohort

1. **Bỏ qua kích thước nhóm.** Cohort 5 người giữ chân 80% chẳng nói lên gì — một người đổi ý là tụt 20%. Cohort 500 người giữ chân 45% mới đáng tin. Luôn nhìn số tuyệt đối bên cạnh tỷ lệ.
2. **So sánh nhầm tuổi đời** (đã nói ở trên) — sai lầm phổ biến nhất, và tinh vi nhất vì bảng trông vẫn "có vẻ hợp lý".

## Làm Cohort Analysis với Semantix

Trước đây, một bảng cohort tử tế ngốn của analyst nửa ngày: viết SQL phức tạp, export Excel, dựng pivot, tô heatmap thủ công. Với Semantix, bạn hỏi thẳng bằng tiếng Việt:

> **"Phân tích cohort giữ chân khách hàng theo tháng đăng ký từ Q1/2024 đến nay"**

Semantix hiểu đây là Cohort Analysis, tự sinh SQL khớp cấu trúc dữ liệu của bạn (đã định nghĩa trong [Semantic Layer](/blog/semantic-layer/)), và trả về heatmap ngay lập tức.

## Tiếp theo trong series

Bạn vừa nắm được *cách đọc* một bảng cohort. Bốn phần của series sẽ đưa bạn từ nền tảng đến ứng dụng thực chiến:

- **Phần 2 — [Retention &amp; PMF](/blog/cohort-retention-pmf/):** hình dạng đường cong giữ chân tiết lộ product-market fit như thế nào, và "negative churn" là gì.
- **Phần 3 — [Behavioral cohort](/blog/cohort-behavioral/):** nhóm theo kênh acquisition và theo hành vi để tìm "activation moment".
- **Phần 4 — [Revenue cohort &amp; LTV](/blog/cohort-revenue-ltv/):** từ giữ chân đến tiền thật, ứng dụng theo ngành ecom/SaaS/F&B.

Nếu bạn chưa từng nhìn vào cohort của mình, bạn đang lái xe bằng gương chiếu hậu — và kính chắn gió thì dán đầy những con số tổng đẹp đẽ.

---

*Semantix có module Cohort Analysis tích hợp sẵn, không cần SQL. [Thử ngay với dữ liệu thực của bạn.](/docs/vi/free-trial/)*
