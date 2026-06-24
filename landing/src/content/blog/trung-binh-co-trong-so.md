---
title: "Thống kê mô tả (Phần 5): trung bình có trọng số — vì sao bình quân các tỉ lệ là một cái bẫy"
code: "kt-032"
series: "thong-ke-mo-ta"
seriesOrder: 5
description: "Kênh A chốt 2%, kênh B chốt 10%. Báo cáo ghi trung bình 6%. Nhưng con số thật là 2,08% — không kênh nào đạt. Khi lấy bình quân hai tỷ lệ là một cái bẫy."
pubDate: 2027-11-23
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/trung-binh-co-trong-so.svg"
coverAlt: "Cái cân lệch giữa một nhóm to và một nhóm nhỏ, trung bình thật nghiêng hẳn về nhóm to"
---

<div class="series-nav">
  <div class="series-nav-title">📐 Series Thống kê mô tả cho người làm số · 5 phần</div>
  <ol>
    <li><a href="/blog/do-lech-chuan/">Phần 1 — Độ lệch chuẩn &amp; phương sai</a></li>
    <li><a href="/blog/phan-vi-percentile/">Phần 2 — Phân vị (P50/P90/P99)</a></li>
    <li><a href="/blog/doc-hinh-dang-phan-phoi/">Phần 3 — Đọc hình dạng phân phối</a></li>
    <li><a href="/blog/phan-tram-vs-diem-phan-tram/">Phần 4 — Phần trăm vs điểm phần trăm</a></li>
    <li class="current">Phần 5 — Trung bình có trọng số</li>
  </ol>
</div>

Bạn chạy hai kênh quảng cáo. Kênh A chốt **2%** đơn, kênh B chốt **10%**. Sếp hỏi: "Trung bình mình chốt được bao nhiêu?" Bạn cộng nhẩm trong đầu — (2 + 10) chia 2 — rồi trả lời: "Dạ khoảng **6%**."

Sai. Và sai khá đậm.

Con số thật là khoảng **2,08%** — thấp gần bằng kênh tệ nhất, chứ không phải nằm giữa. Tệ hơn: 6% là một con số mà **không kênh nào của bạn đạt được**. Một cái la bàn chỉ về hướng không có thật.

Phản xạ của bạn lúc này có thể là: "Ủa, lấy trung bình hai số thì phải ra giữa chứ?" Đúng — *nếu* hai số đó đại diện cho hai nhóm bằng nhau. Nhưng đời thực hiếm khi tử tế vậy. Đây là cái bẫy khép lại series của chúng ta: **bình quân các tỉ lệ của những nhóm khác cỡ là một phép tính sai**.

## Vì sao (2 + 10) ÷ 2 lại sai?

Bí mật nằm ở thứ bạn đã bỏ qua: **cỡ của mỗi nhóm**.

Giả sử:

- Kênh A: chốt 2% trên **10.000 lượt** → 200 đơn.
- Kênh B: chốt 10% trên **100 lượt** → 10 đơn.

Tỷ lệ chốt thật của cả hai kênh gộp lại không phải là trung bình của 2% và 10%. Nó là:

> tổng đơn ÷ tổng lượt = (200 + 10) ÷ (10.000 + 100) = 210 ÷ 10.100 ≈ **2,08%**

Kênh B chốt giỏi gấp 5 lần, nhưng nó chỉ có 100 lượt — một hạt cát so với 10.000 lượt của kênh A. Khi gộp, tiếng nói của kênh B gần như tắt lịm. Con số chung **bị nhóm to kéo về phía nó**, đúng như cái cân lệch hẳn về bên nặng.

Đây chính là **trung bình có trọng số** (*weighted average* — trung bình mà mỗi giá trị được cân theo "sức nặng" của nó, thay vì tính ngang nhau). **Trọng số** (*weight*) ở đây là cỡ nhóm: số lượt, số đơn, số khách. Cái phép `(2 + 10) ÷ 2` mà bạn quen tay là **trung bình đơn giản** (*simple average* — cộng các giá trị rồi chia đều, coi mọi nhóm nặng như nhau) — và nó chỉ đúng khi các nhóm thật sự bằng cỡ.

<div class="viz">
<svg viewBox="0 0 680 290" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="22" fill="#475569" font-size="13" font-weight="700">Cái cân: trọng số = cỡ nhóm</text>
  <line x1="340" y1="60" x2="340" y2="250" stroke="#94A3B8" stroke-width="3"/>
  <polygon points="340,250 312,278 368,278" fill="#94A3B8"/>
  <line x1="120" y1="120" x2="560" y2="86" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
  <g transform="translate(120,120)">
    <rect x="-70" y="0" width="140" height="86" rx="8" fill="#22D3EE" opacity="0.18" stroke="#22D3EE" stroke-width="2"/>
    <text x="0" y="34" fill="#0E7490" font-size="15" font-weight="800" text-anchor="middle">Kênh A · 2%</text>
    <text x="0" y="60" fill="#475569" font-size="13" text-anchor="middle">10.000 lượt</text>
    <text x="0" y="78" fill="#0E7490" font-size="12" font-weight="700" text-anchor="middle">trọng số NẶNG</text>
  </g>
  <g transform="translate(560,86)">
    <rect x="-46" y="0" width="92" height="54" rx="8" fill="#F59E0B" opacity="0.18" stroke="#F59E0B" stroke-width="2"/>
    <text x="0" y="24" fill="#B45309" font-size="14" font-weight="800" text-anchor="middle">Kênh B · 10%</text>
    <text x="0" y="44" fill="#475569" font-size="12" text-anchor="middle">100 lượt · nhẹ</text>
  </g>
  <text x="340" y="285" fill="#15803D" font-size="14" font-weight="800" text-anchor="middle">Trung bình thật ≈ 2,08% — nghiêng hẳn về nhóm to</text>
</svg>
<div class="viz-caption">Trung bình có trọng số nghiêng về nhóm đông lượt. Kênh B chốt giỏi hơn nhưng quá nhỏ nên gần như không kéo nổi con số chung. (Số liệu là ví dụ minh hoạ.)</div>
</div>

## Bảng đối chiếu: ngây thơ vs có trọng số

Đặt hai cách tính cạnh nhau, khoảng cách lộ ra ngay:

| Kênh | Tỷ lệ chốt | Số lượt (trọng số) | Số đơn |
|---|---|---|---|
| A | 2% | 10.000 | 200 |
| B | 10% | 100 | 10 |
| **Trung bình đơn giản** | **6,00%** | — | — |
| **Trung bình có trọng số** | **2,08%** | 10.100 | 210 |

Chênh nhau gần ba lần. Nếu bạn báo cáo 6% cho sếp rồi đặt chỉ tiêu quý sau dựa trên đó, bạn đang đặt mục tiêu trên một con số ảo. Đội sales sẽ "miss" mãi mà không hiểu vì sao — vì cái đích vốn không có thật ngay từ đầu.

Cách làm đúng gói gọn trong một câu: **đừng lấy trung bình của các tỷ lệ — hãy cộng tử số lại, cộng mẫu số lại, rồi chia.** Tổng đơn chia tổng lượt. Tổng tiền chia tổng đơn. Luôn luôn quay về con số gốc trước khi gộp.

## Công thức một dòng để khỏi sai lần nữa

Với tỷ lệ, công thức luôn là:

> **tổng tử số ÷ tổng mẫu số** (tổng đơn ÷ tổng lượt, tổng khách mua ÷ tổng khách ghé…)

Với trung bình của các trung bình (ví dụ điểm đánh giá, giá vốn, AOV), công thức là:

> **Σ(giá trị × trọng số) ÷ Σ trọng số**

Đọc thì hơi "toán", nhưng làm thì cực dễ. Ví dụ điểm đánh giá: chi nhánh Q1 được **4,8 sao** từ **500 lượt**, chi nhánh Q7 được **3,0 sao** từ **20 lượt**. Điểm trung bình toàn hệ thống **không phải** (4,8 + 3,0) ÷ 2 = 3,9. Mà là:

> (4,8 × 500 + 3,0 × 20) ÷ (500 + 20) = (2.400 + 60) ÷ 520 ≈ **4,73 sao**

Gần 4,8 hơn nhiều, vì Q1 đông gấp 25 lần. Lấy trung bình đơn giản sẽ "dìm oan" cả thương hiệu chỉ vì một chi nhánh nhỏ mới mở chưa kịp có review.

## Cái bẫy này ẩn ở khắp nơi trong báo cáo SME

Một khi nhận ra mặt mũi nó, bạn sẽ thấy nó nhan nhản:

- **Tỷ lệ chuyển đổi tổng** — gộp nhiều kênh/landing page có lưu lượng chênh nhau. Đừng bình quân các %, hãy cộng đơn chia lượt. (Đây cũng là lỗi mà nhiều bảng tính ROI quảng cáo mắc phải — xem [đo ROI quảng cáo cho đúng](/blog/marketing-do-roi-ads/).)
- **Giá vốn trung bình** — bạn nhập một mặt hàng 3 đợt: 10.000 cái giá 50k, 200 cái giá 80k, 50 cái giá 90k. Giá vốn bình quân **không phải** (50 + 80 + 90) ÷ 3 = 73k. Cân theo số lượng nhập, nó chỉ khoảng **51k** — vì đợt 50k áp đảo. Tính sai chỗ này là định giá bán sai, là lời tưởng tượng.
- **Điểm đánh giá nhiều chi nhánh / nhiều sản phẩm** — như ví dụ 4,73 sao ở trên.
- **AOV gộp nhiều kênh** — AOV của Shopee và AOV của cửa hàng vật lý không thể bình quân ngang nhau nếu một bên có 5.000 đơn còn bên kia có 300 đơn.

Mẫu số chung của tất cả: **mỗi lần bạn thấy mình lấy trung bình của những con số vốn đã là trung bình hoặc tỷ lệ, dừng lại và hỏi: các nhóm này có bằng cỡ không?** Gần như chắc chắn là không.

## Họ hàng với nghịch lý Simpson và bẫy "bình quân %"

Cái bẫy này không đứng một mình. Nó là anh em ruột với hai thứ chúng ta đã gặp.

Ở Phần 4, bạn đã thấy lằn ranh giữa **phần trăm và điểm phần trăm** — cũng là chuyện một con số % bị đọc rời khỏi cái nền sinh ra nó. Trung bình có trọng số đẩy ý đó đi xa hơn: không chỉ một %, mà cả một *đám* % bị trộn sai tỷ lệ.

Và nếu trọng số lệch đủ mạnh, bạn rơi thẳng vào **nghịch lý Simpson** (*Simpson's paradox* — khi gộp các nhóm lại, kết luận đảo chiều so với khi xét từng nhóm): một kênh thắng ở mọi nhóm con nhưng lại thua khi gộp, chỉ vì tỷ trọng nhóm bị phân bổ lệch. Chúng tôi mổ xẻ kỹ ca này trong [trung bình nói dối](/blog/trung-binh-noi-doi/) — đọc xong bạn sẽ thấy "bình quân % sai" và "Simpson" thực ra là cùng một con quái vật nhìn từ hai góc.

Điểm chung: **con số gộp luôn giấu mất tỷ trọng của từng nhóm.** Trọng số là thứ bị nuốt mất đầu tiên khi người ta vội vã lấy trung bình.

## Trong Semantix

Cái khó của trung bình có trọng số không phải công thức — nó nằm gọn một dòng. Cái khó là **nhớ áp dụng nó đúng lúc**, và lấy được con số gốc (tử số, mẫu số) thay vì chỉ có sẵn các tỷ lệ đã tính trước.

Semantix không phải một cái máy nhả ra mỗi con số trung bình rồi mặc bạn tự đoán nó được gộp ra sao. Khi bạn hỏi bằng tiếng Việt:

> **"Tỷ lệ chốt đơn trung bình toàn bộ kênh tháng này là bao nhiêu?"**

hệ thống không đi bình quân các % của từng kênh. Nó quay về dữ liệu gốc — tổng đơn chia tổng lượt — và trả về con số có trọng số đúng đắn, kèm cỡ mẫu của từng kênh để bạn thấy ngay nhóm nào đang kéo con số. Mọi định nghĩa ("đơn", "lượt", "kênh") khoá sẵn trong [Semantic Layer](/blog/semantic-layer/), nên dù cắt theo lát nào, cách gộp vẫn nhất quán — không phải mỗi lần một kiểu.

## Tóm lại

| Lấy trung bình ngây thơ (dễ sai) | Cân theo trọng số (đúng) |
|---|---|
| Bình quân các % của các kênh | Tổng tử số ÷ tổng mẫu số |
| (2% + 10%) ÷ 2 = 6% | 210 đơn ÷ 10.100 lượt = 2,08% |
| Giá vốn (50 + 80 + 90) ÷ 3 | Cân theo số lượng nhập |
| Mọi nhóm "nặng" như nhau | Nhóm to nói to hơn |
| Một con số phẳng | Con số + cỡ mẫu từng nhóm |

## Khép lại series 5 phần

Năm phần, một sợi chỉ xuyên suốt: **đừng để một con số tóm tắt đơn lẻ đánh lừa bạn.**

Bạn đã đi qua **độ phân tán** ([Phần 1](/blog/do-lech-chuan/)) — con số trung bình không kể được dữ liệu rộng hẹp ra sao. Rồi **phân vị** ([Phần 2](/blog/phan-vi-percentile/)) — P50, P90, P99 cho thấy ai đang ở đuôi. Rồi **hình dạng phân phối** ([Phần 3](/blog/doc-hinh-dang-phan-phoi/)) — một cục lớn hay hai bướu, một đuôi dài hay cân đối. Rồi **phần trăm vs điểm phần trăm** ([Phần 4](/blog/phan-tram-vs-diem-phan-tram/)) — đọc % rời khỏi cái nền sinh ra nó. Và hôm nay, **trọng số** — cách gộp nhiều nhóm mà không bị nhóm to nuốt sự thật.

Tất cả chỉ là biến thể của cùng một kỷ luật: trước khi tin một con số, hỏi *nó đã bỏ bớt điều gì để gọn lại như vậy.*

> **Mental model:** Một con số tóm tắt là tấm ảnh chụp đám đông từ trên cao. Bạn thấy hình dạng chung — nhưng không thấy ai đứng ở đâu, ai đông ai vắng. Người đọc số giỏi không vứt tấm ảnh đi; họ chỉ luôn hỏi thêm: *"Cho tôi xem độ phân tán, phân vị, hình dạng, và trọng số."*

---

*Hết series. Muốn con số trung bình của bạn được cân đúng trọng số — và luôn kèm phân phối để khỏi bị đánh lừa? [Dùng thử Semantix miễn phí với dữ liệu thật của bạn.](/docs/vi/free-trial/) Hoặc quay lại [Phần 1 — Độ lệch chuẩn](/blog/do-lech-chuan/) để đọc lại từ đầu.*
