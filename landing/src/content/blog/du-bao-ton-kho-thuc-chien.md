---
title: "Dự báo cho doanh nghiệp (Phần 3): dự báo nhu cầu tồn kho — từ xu hướng + mùa vụ tới đơn đặt hàng"
code: "pt-036"
series: "du-bao"
seriesOrder: 3
description: "Vừa cháy hàng vừa ế kho cùng một tháng. Vì đặt theo cảm giác. Phần cuối của series: ghép xu hướng + mùa vụ thành điểm đặt hàng."
pubDate: 2027-07-13
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/du-bao-ton-kho-thuc-chien.svg"
coverAlt: "Đường dự báo nhu cầu kèm khoảng sai số, mức tồn an toàn và mũi tên đặt hàng"
---

<div class="series-nav">
  <div class="series-nav-title">🔮 Series Dự báo cho doanh nghiệp · 3 phần</div>
  <ol>
    <li><a href="/blog/du-bao-la-gi/">Phần 1 — Mọi dự báo đều sai (nhưng vẫn hữu ích)</a></li>
    <li><a href="/blog/mua-vu-tet-seasonality/">Phần 2 — Mùa vụ &amp; Tết</a></li>
    <li class="current">Phần 3 — Dự báo tồn kho thực chiến</li>
  </ol>
</div>

Tháng 12, một shop thời trang ở TP.HCM nhìn lại kho và thấy điều vô lý: họ vừa **cháy hàng** mã áo khoác bán chạy nhất — khách hỏi mà không có để bán — *vừa* ôm một núi quần kaki ế, chất đầy gác. Cùng một tháng. Cùng một người đặt hàng. Một bên thiếu, một bên thừa. Nghe như hai vấn đề ngược nhau, nhưng chúng có chung đúng một gốc rễ.

Gốc rễ đó là: **đơn đặt hàng được quyết bằng cảm giác.** "Tháng trước bán hết áo khoác nhanh quá, đặt gấp đôi cho chắc" — và cảm giác thì vừa hoảng quá tay ở mã này, vừa quên béng mã kia. Đặt theo cảm giác gần như luôn tạo ra cả hai lỗi cùng lúc: vừa cháy vừa ế.

Hai phần trước, bạn đã có hai mảnh ghép. Phần 1 dạy cách tách **xu hướng** — hàng này đang lên hay đang xuống đều đặn. Phần 2 dạy cách đọc **mùa vụ** — Tết, back-to-school, các đỉnh lặp lại hằng năm. Phần cuối này ghép hai mảnh đó thành thứ duy nhất thật sự cứu kho của bạn: **một con số đặt hàng có cơ sở**, thay cho một cú đoán.

## Đặt theo cảm giác vs đặt theo dự báo

Trước khi vào quy trình, hãy nhìn thẳng vào sự khác biệt — vì nó giải thích vì sao "đặt cho chắc" lại là thủ phạm.

| | Đặt theo cảm giác | Đặt theo dự báo |
|---|---|---|
| Căn cứ | "Tháng trước bán tốt/tệ" | Xu hướng + mùa vụ + sai số đo được |
| Hàng bán chạy | Hoảng, đặt quá tay → ế sau mùa | Đặt đủ cho đỉnh, có tồn an toàn |
| Hàng đuôi | Quên, hết lúc nào không hay → cháy lặt vặt | Quy tắc đơn giản, tự động bổ sung |
| Thời điểm đặt | Khi thấy kệ trống (đã muộn) | Khi tồn chạm **điểm đặt hàng** (kịp giờ) |
| Kết quả điển hình | Vừa cháy vừa ế | Ít cháy, ít ế, vốn không chôn |

Cảm giác không sai vì nó "thiếu kinh nghiệm". Nó sai vì nó **không có khoảng sai số** và **không biết hàng về mất bao lâu**. Hai thứ đó mới là trái tim của dự báo tồn kho.

## Quy trình 5 bước: từ lịch sử bán tới đơn đặt hàng

Đây là toàn bộ quy trình, gọn trong năm bước. Mỗi bước trả lời đúng một câu hỏi.

| Bước | Câu hỏi | Bạn làm gì |
|---|---|---|
| 1 | Hàng này đã bán thế nào? | Lấy lịch sử bán **theo từng SKU**, làm sạch số |
| 2 | Cái gì lặp lại? | Tách **xu hướng** (Phần 1) + **mùa vụ** (Phần 2) |
| 3 | Kỳ tới bán bao nhiêu? | Ước **nhu cầu** + một **khoảng sai số** |
| 4 | Khi nào phải đặt, đặt bao nhiêu? | Cộng **lead time** + **tồn an toàn** → **điểm đặt hàng** |
| 5 | Mã nào cần kỹ, mã nào làm gọn? | **Phân tầng ABC** |

### Bước 1 — Lịch sử bán theo SKU (và làm sạch nó)

Mọi dự báo bắt đầu từ lịch sử bán của từng **SKU** (Stock Keeping Unit — mã hàng tồn kho, tức từng biến thể cụ thể: áo khoác xanh size M là một SKU, size L là một SKU khác). Đừng dự báo gộp cả "áo khoác" — bạn đặt hàng theo size, theo màu, nên phải dự báo ở mức đó.

Nhưng đây là cái bẫy ít ai để ý, và nó âm thầm phá mọi con số phía sau: **số bán không phải số nhu cầu.** Khi một SKU **hết hàng** giữa tháng, hệ thống ghi nhận "bán = 0" những ngày sau đó — nhưng nhu cầu thật không phải 0, chỉ là bạn không có hàng để bán. Nếu bạn dự báo dựa trên con số 0 giả này, bạn sẽ đặt *ít hơn* cho kỳ sau, rồi lại cháy hàng. Vòng lặp tự nuôi chính nó.

> Quy tắc vàng: trước khi dự báo, hỏi "những ngày bán = 0 này là vì không ai mua, hay vì mình hết hàng?". Đánh dấu các giai đoạn cháy hàng và đừng để chúng kéo dự báo xuống.

### Bước 2 — Tách xu hướng + mùa vụ

Đây là chỗ hai phần trước hội tụ. Lấy chuỗi bán đã làm sạch của một SKU và tách nó làm hai phần: **xu hướng** (đường nền đang đi lên/xuống/đi ngang) và **mùa vụ** (cái nhịp lặp lại — tháng Chạp tăng vọt, tháng Giêng nguội). Một mã áo khoác có thể đang *đi ngang* về xu hướng nhưng *tăng 3 lần* vào mùa lạnh — bạn cần biết cả hai, vì một con số trung bình cả năm sẽ vừa làm bạn cháy hàng mùa cao điểm vừa ế hàng mùa thấp.

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <line x1="56" y1="36" x2="56" y2="232" stroke="#94A3B8" stroke-width="2"/>
  <line x1="56" y1="232" x2="640" y2="232" stroke="#94A3B8" stroke-width="2"/>
  <text x="20" y="46" fill="#64748B" font-size="12">bán</text>
  <!-- error band -->
  <path d="M360 150 C 440 124, 520 104, 600 92 L600 130 C 520 142, 440 162, 360 188 Z" fill="#22D3EE" opacity="0.18"/>
  <!-- history solid -->
  <polyline points="56,200 132,188 208,196 284,168 360,170" fill="none" stroke="#64748B" stroke-width="3"/>
  <text x="120" y="222" fill="#64748B" font-size="11">lịch sử bán</text>
  <!-- forecast dashed -->
  <polyline points="360,170 440,134 520,110 600,110" fill="none" stroke="#22D3EE" stroke-width="3.5" stroke-dasharray="7 5"/>
  <text x="470" y="98" fill="#22D3EE" font-size="11" font-weight="700">dự báo + sai số</text>
  <!-- Tet peak -->
  <circle cx="520" cy="110" r="5" fill="#22D3EE"/>
  <text x="498" y="84" fill="#22D3EE" font-size="11" font-weight="700">đỉnh Tết</text>
  <!-- safety stock -->
  <line x1="56" y1="210" x2="640" y2="210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="60" y="205" fill="#B45309" font-size="11" font-weight="700">tồn an toàn</text>
  <!-- reorder arrow -->
  <line x1="430" y1="120" x2="430" y2="210" stroke="#EF4444" stroke-width="2.5"/>
  <path d="M422 198 L430 214 L438 198 Z" fill="#EF4444"/>
  <text x="436" y="182" fill="#DC2626" font-size="12" font-weight="800">ĐẶT HÀNG</text>
  <text x="56" y="252" fill="#475569" font-size="11">divider: quá khứ ↔ tương lai tại đường nét đứt</text>
  <line x1="360" y1="36" x2="360" y2="232" stroke="#475569" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="300" y="296" fill="#64748B" font-size="12" text-anchor="middle">thời gian →</text>
</svg>
<div class="viz-caption">Xu hướng + mùa vụ cho ra đường dự báo (xanh, nét đứt) kèm khoảng sai số. Khi tồn dự kiến chạm mức cần để kịp hàng về, đó là điểm đặt hàng (mũi tên đỏ); mức tồn an toàn (cam) là đệm cuối cùng. *(số liệu minh họa)*</div>
</div>

### Bước 3 — Ước nhu cầu kỳ tới + khoảng sai số

Ghép xu hướng và mùa vụ lại, bạn có **dự báo nhu cầu** cho kỳ tới: *"tháng 12 SKU áo khoác xanh size M dự kiến bán khoảng 180 cái."* Nhưng — như Phần 1 đã nói — **mọi dự báo đều sai**. Con số 180 vô dụng nếu bạn không kèm một **khoảng sai số**: "180, dao động 150–210". Khoảng này chính là thứ quyết định bạn cần đệm bao nhiêu ở bước sau. Dự báo càng dao động mạnh (hàng thời trang, hàng theo trend), khoảng càng rộng, đệm càng phải dày.

### Bước 4 — Cộng lead time + tồn an toàn → điểm đặt hàng

Đây là bước biến dự báo thành hành động. Hai khái niệm:

- **Lead time** (thời gian hàng về — từ lúc bạn bấm đặt tới lúc hàng nằm trên kệ bán được). Đặt nhà cung cấp trong nước: 5 ngày. Nhập từ Trung Quốc: 3 tuần. Bạn không đặt hàng cho *ngày mai* — bạn đặt cho khoảng nhu cầu xảy ra *trong suốt lead time*.
- **Safety stock** (tồn an toàn — lượng hàng đệm để phòng khi bán nhanh hơn dự báo hoặc hàng về trễ). Đây là nơi khoảng sai số ở Bước 3 trả tiền: dao động càng rộng, tồn an toàn càng dày.

Ghép lại thành **điểm đặt hàng** (reorder point — mức tồn mà khi chạm tới, bạn phải đặt ngay):

```text
Điểm đặt hàng = (nhu cầu trung bình mỗi ngày × lead time) + tồn an toàn
```

Ví dụ: SKU bán ~6 cái/ngày, lead time 5 ngày, tồn an toàn 15 cái → điểm đặt hàng = 6×5 + 15 = **45 cái**. Khi tồn còn 45, bạn đặt — vừa kịp để hàng về trước khi hết, kể cả khi mùa vụ đẩy nhu cầu lên. *Không* canh kệ trống mới chạy đi đặt; lúc đó đã muộn đúng bằng một lead time. *(số liệu minh họa)*

### Bước 5 — Phân tầng ABC: đừng dự báo mọi mã như nhau

Một shop có 800 SKU. Bạn không thể — và không nên — dự báo kỹ từng mã. Đây là lúc gọi lại tư duy [Pareto 80/20](/blog/pareto-80-20/): một nhúm nhỏ SKU gánh phần lớn doanh thu. **Phân tầng ABC** (cách chia hàng làm ba hạng A/B/C theo mức đóng góp) cho bạn nơi dồn công sức:

- **Nhóm A** — số ít mã gánh ~80% doanh thu/lợi nhuận: dự báo kỹ từng SKU, theo dõi tồn an toàn sát sao. Cháy một mã A là mất tiền thật.
- **Nhóm B** — tầm giữa: dự báo vừa phải, rà định kỳ.
- **Nhóm C** — cái đuôi dài, nhiều mã doanh thu nhỏ: **đơn giản hoá**. Dùng quy tắc gọn ("còn 20 thì đặt thêm 50"), đừng đổ giờ phân tích vào đây.

Nhưng nhớ bài học từ Pareto: nhóm C nhỏ về doanh thu *không* có nghĩa bỏ được — cái đuôi thường kéo khách và hoàn thiện giỏ hàng. ABC giúp bạn *phân bổ công sức dự báo*, không phải danh sách hàng để khai tử.

## Cái bẫy lớn nhất: hàng mới không có lịch sử

Toàn bộ quy trình trên đứng trên một giả định: **có lịch sử bán để học.** Với một SKU mới toanh — mẫu áo vừa nhập lần đầu, sản phẩm chưa từng bán — bạn *không có gì để tách xu hướng hay mùa vụ*. Dự báo cho hàng mới là một bài toán khác hẳn: bạn phải mượn dữ liệu của **mã tương tự** (cùng dòng, cùng phân khúc giá), đặt một lô thăm dò nhỏ, rồi học nhanh từ vài tuần đầu thay vì cam kết một đơn lớn dựa trên con số tưởng tượng. Đừng áp công thức điểm đặt hàng lên một SKU chưa có dù chỉ một tháng dữ liệu — nó sẽ cho ra số đẹp mà vô căn cứ.

## Dự báo tồn kho với Semantix

Tự tay chạy năm bước này cho 800 SKU — làm sạch giai đoạn cháy hàng, tách xu hướng và mùa vụ, tính điểm đặt hàng theo lead time từng nhà cung cấp, rồi phân tầng ABC và lặp lại mỗi tháng — là nhiều buổi loay hoay với bảng tính và công thức gãy.

Semantix không phải một chatbot đoán mò trên kho hàng của bạn. Bạn định nghĩa "doanh thu", "lợi nhuận gộp", "nhóm hàng" *một lần* trong tầng định nghĩa chung — chính là [một nguồn sự thật](/blog/mot-nguon-su-that/) mà cả công ty dùng chung — rồi hỏi bằng tiếng Việt:

> **"Dự báo nhu cầu tháng 12 cho từng SKU áo khoác, tính cả mùa vụ Tết, và cho biết mã nào sắp chạm điểm đặt hàng với lead time 2 tuần."**

Semantix hiểu "nhu cầu", "mùa vụ", "điểm đặt hàng" trong ngữ cảnh dữ liệu của bạn, tách xu hướng và mùa vụ, kèm khoảng sai số — để đơn đặt hàng của bạn dựa trên một con số có cơ sở, không phải một cú hoảng.

## Tóm lại — và khép lại series

Ba phần, một thông điệp: **dự báo không phải để biết tương lai, mà để ra quyết định hôm nay đỡ sai hơn.** Bạn đã đi từ "mọi dự báo đều sai nhưng vẫn hữu ích" (Phần 1), qua đọc nhịp mùa vụ và Tết (Phần 2), tới quy trình biến cả hai thành đơn đặt hàng (Phần 3). Cái đích chưa bao giờ là một con số hoàn hảo — nó là một kho hàng vừa hết cháy, vừa hết ế, và một dòng vốn không bị chôn trên gác.

| Đặt theo cảm giác | Đặt theo quy trình 5 bước |
|---|---|
| Một con số đoán, không sai số | Nhu cầu + khoảng sai số |
| Đặt khi thấy kệ trống | Đặt khi chạm điểm đặt hàng |
| Mọi mã chăm như nhau | Phân tầng ABC, dồn lực vào nhóm A |
| Hàng mới đặt lớn theo cảm tính | Lô thăm dò, học nhanh, mượn mã tương tự |
| Vừa cháy vừa ế | Ít cháy, ít ế |

> Mental model để mang theo: **đừng dự báo doanh số — hãy dự báo thời điểm và lượng phải đặt.** Dự báo chỉ có giá trị khi nó kết thúc bằng một đơn đặt hàng. Mọi thứ trước đó chỉ là số liệu đẹp.

---

*Muốn đơn đặt hàng dựa trên dự báo thay vì cảm giác? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc quay lại đầu series: [Phần 1 — Mọi dự báo đều sai (nhưng vẫn hữu ích)](/blog/du-bao-la-gi/).*
