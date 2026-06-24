---
title: "Growth accounting thực chiến: dựng bảng cho shop của bạn — và để AI làm phần nặng"
code: "pt-021"
series: "growth-accounting"
seriesOrder: 4
description: "Ba phần lý thuyết đã xong. Giờ là lúc dựng bảng growth accounting cho doanh nghiệp thật — từ một bảng giao dịch, không cần data warehouse, không cần SQL."
pubDate: 2026-06-22
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/growth-accounting-thuc-chien.svg"
coverAlt: "Một bảng growth accounting đã dựng xong: các tháng nhân với dòng new/retained/resurrected/churned và một ô Quick Ratio"
---

<div class="series-nav">
  <div class="series-nav-title">📈 Series Growth Accounting · 4 phần</div>
  <ol>
    <li><a href="/blog/growth-accounting/">Phần 1 — Nền tảng: phương trình tăng trưởng</a></li>
    <li><a href="/blog/growth-accounting-quick-ratio/">Phần 2 — Quick Ratio: nhịp tim tăng trưởng</a></li>
    <li><a href="/blog/growth-accounting-revenue/">Phần 3 — Từ user sang tiền: Net Dollar Retention</a></li>
    <li class="current">Phần 4 — Thực chiến: dựng bảng growth accounting</li>
  </ol>
</div>

Ba phần vừa rồi, chúng ta đã đi qua lý thuyết: [phương trình tăng trưởng](/blog/growth-accounting/) (MAU kỳ này = kỳ trước + new + resurrected − churned), [Quick Ratio](/blog/growth-accounting-quick-ratio/) như nhịp tim, và [Net Dollar Retention](/blog/growth-accounting-revenue/) khi đếm tiền thay vì đếm người. Đẹp trên giấy. Nhưng giấy không trả lương.

Giờ là phần khác hẳn: bắt tay dựng một bảng growth accounting **thật** cho shop hoặc SaaS của bạn. Và đây là chỗ tôi phải cảnh báo trước cho thẳng thắn: **dựng bảng này bằng tay trong Excel là một cơn ác mộng.** Không phải vì toán khó — phép tính chỉ là cộng trừ. Mà vì để biết mỗi khách kỳ này thuộc loại nào, bạn phải so trạng thái của họ với *kỳ trước*, kỳ trước nữa, kéo qua từng tháng. Đó là một chuỗi JOIN và công thức lồng nhau dài đến chóng mặt — và làm lại từ đầu mỗi tháng.

Đây chính là chỗ AI + Semantic Layer thay đổi cuộc chơi. Nhưng trước khi nói máy làm thế nào, bạn phải hiểu *nó đang làm gì*. Nên ta đi từ dữ liệu.

## Bạn cần đúng MỘT bảng dữ liệu — không cần data warehouse

Tin tốt đầu tiên: growth accounting không đòi hỏi hạ tầng khủng. Bạn cần **đúng một bảng** — bảng giao dịch hoặc đơn hàng — với ba cột tối thiểu:

| Định danh khách | Thời điểm | Giá trị |
|---|---|---|
| `KH-0481` | 2026-03-12 | 597000 |
| `KH-0193` | 2026-03-12 | 1250000 |
| `KH-0481` | 2026-04-05 | 430000 |

Chỉ vậy. Từ ba cột này, bạn suy ra được toàn bộ. Vì với mỗi kỳ (giả sử là tháng), một khách chỉ có thể rơi vào đúng một trong các trạng thái:

- **new** — lần đầu xuất hiện, chưa từng có giao dịch trước đó.
- **retained** — có giao dịch kỳ này *và* kỳ ngay trước.
- **resurrected** — có giao dịch kỳ này, kỳ trước thì không, nhưng *từng* có trước nữa (khách ngủ đông tỉnh dậy).
- **churned** — kỳ trước có, kỳ này biến mất (dòng âm).

Nếu bạn đếm cả tiền, thêm hai trạng thái: **expansion** (khách cũ chi nhiều hơn kỳ trước) và **contraction** (chi ít đi). Bốn dòng thành sáu, nhưng logic y hệt.

Điểm mấu chốt: bạn *không* dán nhãn này sẵn trong dữ liệu. Trạng thái được **suy ra** bằng cách so kỳ này với lịch sử của chính khách đó. Bảng thô chỉ cần biết *ai, khi nào, bao nhiêu* — phần còn lại là tính toán.

## Ba quyết định định nghĩa quyết định mọi con số

Trước khi gõ một công thức nào, bạn phải chốt ba định nghĩa. Bỏ qua bước này là cách nhanh nhất để có một bảng đẹp đẽ và sai bét.

**1. "Active" nghĩa là gì?** Một khách được tính là "có mặt" trong kỳ khi nào — khi họ *có đơn hàng*? Khi họ *đăng nhập*? Khi họ *mở app*? Với shop bán hàng, "có đơn trong kỳ" là định nghĩa tự nhiên. Với SaaS, có thể là "đăng nhập ít nhất một lần". Không có đáp án đúng tuyệt đối — nhưng có một quy tắc sắt: **định nghĩa MỘT lần, rồi giữ nguyên.** Đổi định nghĩa giữa chừng thì mọi so sánh giữa các tháng đều vô nghĩa.

**2. Chọn kỳ đúng — và đây là cái bẫy lớn nhất.** Tháng là mặc định hợp lý cho ecom và SaaS, nơi khách mua/dùng đều đặn. Nhưng hãy tưởng tượng bạn bán **nội thất**, hoặc đồ điện tử lớn. Một khách mua bộ sofa hôm nay sẽ không mua bộ nữa vào tháng sau — chu kỳ mua của họ là vài năm. Nếu bạn chọn kỳ là *tháng*, thì tháng nào gần như **mọi khách cũng trông như "churn"**, và bảng của bạn sẽ gào lên rằng doanh nghiệp đang sụp đổ trong khi nó hoàn toàn khỏe mạnh.

> Quy tắc vàng: kỳ phải khớp với *nhịp mua tự nhiên* của khách. Hỏi quán cà phê "tháng này anh còn quay lại không" là hợp lý; hỏi người mua tủ lạnh câu đó mỗi tháng thì giống như trách đứa trẻ vì sao hôm nay không cao thêm — bạn đang đo sai chu kỳ.

**3. "Doanh thu" và "expansion" là gì?** Nếu bạn tính tiền, phải chốt: doanh thu gộp hay sau phí sàn? Một khách mua nhiều hơn *về số đơn* nhưng *ít tiền hơn* thì là expansion hay contraction? Đây đúng là loại định nghĩa dễ lệch nhất khi dữ liệu đến từ nhiều kênh — lý do vì sao growth accounting gần như luôn cần [dữ liệu hợp nhất đa kênh](/blog/hop-nhat-da-kenh/) làm nền trước.

## Dựng bảng: từ giao dịch → trạng thái → bốn dòng

Khi ba định nghĩa đã chốt, quy trình là một dây chuyền ba khâu: **(1)** lấy bảng giao dịch thô → **(2)** với mỗi khách, mỗi kỳ, gán đúng một trạng thái bằng cách so với lịch sử → **(3)** đếm số khách (hoặc cộng tiền) theo từng trạng thái, từng kỳ. Kết quả là một bảng như thế này:

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- column headers -->
  <text x="8" y="28" fill="#64748B" font-size="13" font-weight="700">Trạng thái</text>
  <text x="250" y="28" fill="#64748B" font-size="13" text-anchor="middle">T1</text>
  <text x="350" y="28" fill="#64748B" font-size="13" text-anchor="middle">T2</text>
  <text x="450" y="28" fill="#64748B" font-size="13" text-anchor="middle">T3</text>
  <text x="550" y="28" fill="#64748B" font-size="13" text-anchor="middle">T4</text>
  <!-- new -->
  <text x="8" y="68" fill="#10B981" font-size="14" font-weight="700">+ new</text>
  <text x="250" y="68" fill="#34D399" font-size="14" font-weight="600" text-anchor="middle">120</text>
  <text x="350" y="68" fill="#34D399" font-size="14" font-weight="600" text-anchor="middle">95</text>
  <text x="450" y="68" fill="#34D399" font-size="14" font-weight="600" text-anchor="middle">88</text>
  <text x="550" y="68" fill="#34D399" font-size="14" font-weight="600" text-anchor="middle">102</text>
  <!-- retained -->
  <text x="8" y="104" fill="#0EA5A4" font-size="14" font-weight="700">retained</text>
  <text x="250" y="104" fill="#5EEAD4" font-size="14" font-weight="600" text-anchor="middle">—</text>
  <text x="350" y="104" fill="#5EEAD4" font-size="14" font-weight="600" text-anchor="middle">74</text>
  <text x="450" y="104" fill="#5EEAD4" font-size="14" font-weight="600" text-anchor="middle">96</text>
  <text x="550" y="104" fill="#5EEAD4" font-size="14" font-weight="600" text-anchor="middle">118</text>
  <!-- resurrected -->
  <text x="8" y="140" fill="#22c55e" font-size="14" font-weight="700">+ resurrected</text>
  <text x="250" y="140" fill="#86efac" font-size="14" font-weight="600" text-anchor="middle">—</text>
  <text x="350" y="140" fill="#86efac" font-size="14" font-weight="600" text-anchor="middle">11</text>
  <text x="450" y="140" fill="#86efac" font-size="14" font-weight="600" text-anchor="middle">18</text>
  <text x="550" y="140" fill="#86efac" font-size="14" font-weight="600" text-anchor="middle">22</text>
  <!-- churned -->
  <text x="8" y="176" fill="#EF4444" font-size="14" font-weight="700">− churned</text>
  <text x="250" y="176" fill="#FCA5A5" font-size="14" font-weight="600" text-anchor="middle">—</text>
  <text x="350" y="176" fill="#FCA5A5" font-size="14" font-weight="600" text-anchor="middle">46</text>
  <text x="450" y="176" fill="#FCA5A5" font-size="14" font-weight="600" text-anchor="middle">52</text>
  <text x="550" y="176" fill="#FCA5A5" font-size="14" font-weight="600" text-anchor="middle">61</text>
  <!-- divider -->
  <line x1="8" y1="196" x2="600" y2="196" stroke="#334155" stroke-width="1"/>
  <!-- net MAU -->
  <text x="8" y="226" fill="#E2E8F0" font-size="14" font-weight="700">MAU cuối kỳ</text>
  <text x="250" y="226" fill="#F1F5F9" font-size="14" font-weight="700" text-anchor="middle">120</text>
  <text x="350" y="226" fill="#F1F5F9" font-size="14" font-weight="700" text-anchor="middle">134</text>
  <text x="450" y="226" fill="#F1F5F9" font-size="14" font-weight="700" text-anchor="middle">184</text>
  <text x="550" y="226" fill="#F1F5F9" font-size="14" font-weight="700" text-anchor="middle">265</text>
  <!-- Quick Ratio -->
  <rect x="4" y="246" width="600" height="44" rx="8" fill="#022C22" stroke="#FCD34D" stroke-width="1.5"/>
  <text x="20" y="274" fill="#FCD34D" font-size="14" font-weight="700">Quick Ratio</text>
  <text x="250" y="274" fill="#475569" font-size="14" text-anchor="middle">—</text>
  <text x="350" y="274" fill="#FDE68A" font-size="14" font-weight="700" text-anchor="middle">2,3</text>
  <text x="450" y="274" fill="#FDE68A" font-size="14" font-weight="700" text-anchor="middle">2,0</text>
  <text x="550" y="274" fill="#FDE68A" font-size="14" font-weight="700" text-anchor="middle">2,0</text>
</svg>
<div class="viz-caption">Bảng growth accounting đã lắp ráp: mỗi cột một tháng, mỗi dòng một trạng thái. Quick Ratio = (new + resurrected) / churned. (Số minh họa.)</div>
</div>

Đọc bảng này theo chiều dọc từng tháng, bạn thấy ngay *dòng chảy*: T4 có 265 khách hoạt động, nhưng đằng sau con số đó là 102 khách mới và 61 khách bỏ đi — không phải một khối tĩnh. Quick Ratio đứng ở 2,0: cứ một khách rời, có hai khách đến hoặc quay lại. Trên ngưỡng 1, doanh nghiệp đang lớn (xem [Phần 2](/blog/growth-accounting-quick-ratio/) về cách đọc chỉ số này).

## CMGR: làm mượt nhiễu tháng để thấy xu hướng nền

Có một vấn đề khi nhìn bảng tháng này qua tháng kia: **biến động ngắn hạn đánh lừa bạn.** Tết kéo doanh thu vọt lên, tháng sau rớt xuống — không phải vì doanh nghiệp tốt lên rồi xấu đi, mà vì mùa vụ. Nhìn từng tháng, bạn dễ hoảng hoặc tự mãn nhầm chỗ.

Cách chữa là **CMGR** — Compound Monthly Growth Rate, tốc độ tăng trưởng kép theo tháng:

```
CMGR = (giá_trị(kỳ cuối) / giá_trị(kỳ đầu))^(1/n) − 1
```

với `n` là số tháng giữa hai mốc. Thay vì hỏi "tháng này tăng bao nhiêu so với tháng trước", CMGR hỏi "trung bình mỗi tháng tôi tăng đều bao nhiêu, nếu san phẳng các cú giật". Theo dõi **CMGR3** (trượt 3 tháng) và **CMGR6** (trượt 6 tháng) là cách làm mượt nhiễu: CMGR3 nhạy hơn với thay đổi gần đây, CMGR6 cho thấy xu hướng nền bền hơn. Khi cả hai cùng dương và CMGR3 cao hơn CMGR6, bạn đang *tăng tốc*. Ngược lại là dấu hiệu đuối — dù tháng riêng lẻ vẫn trông ổn.

CMGR giống như nhìn đường bờ biển từ máy bay thay vì đứng đếm từng con sóng: từng con sóng lên xuống loạn xạ, nhưng đường bờ thì rõ ràng.

## Đừng dựng tay: vì sao đây là việc của AI + Semantic Layer

Giờ quay lại lời cảnh báo đầu bài. Bạn vừa thấy logic — nó *thanh lịch*. Nhưng triển khai bằng tay thì khác hẳn.

Trong Excel, để gán trạng thái cho mỗi khách mỗi kỳ, bạn phải dựng một bảng phụ liệt kê mọi cặp (khách × tháng), rồi với từng ô viết công thức tra cứu: tháng trước khách này có đơn không? Trước nữa có không? Mỗi tháng mới là một cột công thức mới, một vòng `VLOOKUP`/`COUNTIFS` lồng nhau. Sót một dấu, lệch một khoảng ngày — và bạn không hề biết, vì **nó vẫn ra số, chỉ là số sai.** Đây đúng loại lỗi "trông hợp lý mà sai" mà cả series này cảnh báo.

Trong Semantix, dây chuyền đó là việc của máy. Bạn hỏi thẳng bằng tiếng Việt:

> *"Phân tích growth accounting theo tháng từ đầu năm: new, retained, resurrected, churned và Quick Ratio."*

AI hiểu đây là growth accounting, tự sinh chuỗi SQL khớp cấu trúc dữ liệu của bạn, và trả về đúng bảng như trên. Mấu chốt không chỉ là tiện — mà là **đúng và nhất quán.** Bạn định nghĩa "active" và "doanh thu" *một lần* trong [Semantic Layer](/blog/semantic-layer/) — cuốn từ điển nghiệp vụ đặt giữa dữ liệu thô và mọi câu hỏi — nên tháng sau, người khác, câu hỏi khác, vẫn ra số tính theo cùng định nghĩa. Không còn cảnh mỗi lần dựng lại bảng là một lần định nghĩa lại "churn" theo trí nhớ.

Và vì growth accounting cần dữ liệu giao dịch đầy đủ, nó dựa trực tiếp lên nền [dữ liệu hợp nhất đa kênh](/blog/hop-nhat-da-kenh/): Shopee, TikTok Shop, KiotViet về một bảng, một định nghĩa doanh thu, trước khi tính bất cứ dòng new/churned nào.

## Ghép với Cohort để có bức tranh đủ

Growth accounting trả lời một câu: *"Kỳ này, dòng chảy khách hàng diễn ra thế nào?"* — vào bao nhiêu, ra bao nhiêu, ròng còn bao nhiêu. Nhưng nó *không* cho biết khách ở lại bao lâu theo tuổi đời.

Đó là việc của [Cohort Analysis](/blog/cohort-analysis/): nhóm khách theo thời điểm bắt đầu, theo dõi từng nhóm hao mòn ra sao qua tháng 1, tháng 3, tháng 6. Hai góc nhìn bổ sung nhau như hai mặt của cùng đồng tiền:

- **Growth accounting** = ảnh chụp dòng chảy *mỗi kỳ* (chiều ngang thời gian thực).
- **Cohort** = đường cong giữ chân *mỗi nhóm theo tuổi đời* (chiều dọc vòng đời).

Nhìn growth accounting mà không nhìn cohort, bạn biết nước vào ra mỗi tháng nhưng không biết nhóm nào rò rỉ. Nhìn cohort mà bỏ growth accounting, bạn biết hình dạng giữ chân nhưng không thấy nhịp tăng trưởng hiện tại. Cần cả hai mới đủ.

## Tóm lại — và khép lại series

Checklist dựng bảng growth accounting của bạn:

1. ✅ **Gom một bảng** giao dịch: định danh khách + thời điểm + giá trị.
2. ✅ **Chốt ba định nghĩa**: "active" là gì, chọn kỳ khớp nhịp mua (đừng để khách mua thưa trông như churn), doanh thu/expansion tính ra sao.
3. ✅ **Suy trạng thái** mỗi khách mỗi kỳ: new / retained / resurrected / churned (+ expansion / contraction nếu tính tiền).
4. ✅ **Tính Quick Ratio** mỗi kỳ và **CMGR3/CMGR6** để làm mượt nhiễu mùa vụ.
5. ✅ **Ghép với cohort** để có cả dòng chảy lẫn vòng đời.
6. ✅ **Đừng dựng tay** — để Semantic Layer định nghĩa một lần và AI dựng bảng từ câu hỏi tiếng Việt.

Bốn phần của series đã đi trọn vòng: [Phần 1](/blog/growth-accounting/) cho bạn phương trình; [Phần 2](/blog/growth-accounting-quick-ratio/) cho bạn nhịp tim Quick Ratio; [Phần 3](/blog/growth-accounting-revenue/) đưa từ đếm người sang đếm tiền với NDR; và Phần 4 này lắp tất cả thành một bảng chạy được cho doanh nghiệp thật.

Lý thuyết đẹp là thứ ai cũng có thể đọc. Bảng growth accounting chạy hằng tháng trên dữ liệu *của bạn* mới là thứ tạo ra quyết định. Khác biệt giữa hai cái không phải là kiến thức — mà là việc có để máy gánh phần nặng hay không.

---

*Muốn có bảng growth accounting chạy tự động trên dữ liệu thật, không cần SQL? [Dùng thử miễn phí với Google Sheets](/docs/vi/free-trial/) — kết nối bảng đơn hàng và hỏi câu growth accounting đầu tiên bằng tiếng Việt trong dưới 15 phút.*
