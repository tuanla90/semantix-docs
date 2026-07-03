---
title: "Funnel nâng cao: vì sao cái phễu là một lời nói dối tiện lợi - và khi nào nó khiến bạn sửa nhầm chỗ"
code: "pt-020"
description: "Phễu giả định khách đi một đường thẳng. Khách thật thì vòng lại, bỏ qua, quay lại tuần sau. Bốn cách cái phễu đánh lừa bạn - và cách đọc nó cho đúng."
pubDate: 2026-01-15
category: "Phân Tích Dữ Liệu"
readTime: 13
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/funnel-nang-cao.png"
coverAlt: "Mô hình phễu thẳng so với hành trình khách thật đầy vòng lặp và đường tắt"
---

Bài [Funnel Analysis nhập môn](/blog/funnel-analysis/) dạy bạn một điều rất đúng: đọc tỷ lệ giữa các bước, tìm chỗ rò chính, bịt nó trước. Nhưng nó cũng giấu một sự thật khó chịu để giữ mọi thứ đơn giản.

Sự thật đó là: **cái phễu là một mô hình sai - chỉ là một mô hình sai *hữu ích*.** Nó giả định khách hàng đi một đường thẳng, một chiều, trong một lần ngồi: xem → giỏ → thanh toán → mua. Khách thật thì không. Họ thêm vào giỏ trên điện thoại lúc nghỉ trưa, mở lại trên laptop tối hôm sau, bỏ đi ba ngày, rồi quay lại mua qua một link quảng cáo khác. Hành trình thật là một mớ vòng lặp và đường tắt - còn cái phễu ép nó thành một đường ống thẳng.

Hầu hết thời gian, sự đơn giản hóa đó vô hại. Nhưng có bốn tình huống nó **đánh lừa bạn** - và khiến bạn dồn tiền sửa nhầm chỗ. Funnel (phễu chuyển đổi) nâng cao là biết nhận ra bốn tình huống đó.

## Cái phễu giả định một đường thẳng. Khách thì không.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <defs>
    <marker id="fw" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#22c55e"/></marker>
    <marker id="bk" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#f87171"/></marker>
  </defs>
  <!-- LEFT: clean funnel -->
  <text x="150" y="28" fill="#64748B" font-size="13" font-weight="700" text-anchor="middle">Mô hình phễu (giả định)</text>
  <rect x="60"  y="44"  width="180" height="42" rx="6" fill="#0d9488"/><text x="150" y="71" fill="#fff" font-size="13" text-anchor="middle">Xem</text>
  <rect x="80"  y="100" width="140" height="42" rx="6" fill="#14b8a6"/><text x="150" y="127" fill="#fff" font-size="13" text-anchor="middle">Giỏ</text>
  <rect x="98"  y="156" width="104" height="42" rx="6" fill="#0e7490"/><text x="150" y="183" fill="#fff" font-size="13" text-anchor="middle">Thanh toán</text>
  <rect x="112" y="212" width="76"  height="42" rx="6" fill="#15803d"/><text x="150" y="239" fill="#fff" font-size="13" text-anchor="middle">Mua</text>
  <text x="150" y="284" fill="#64748B" font-size="12" text-anchor="middle">thẳng · một chiều · một lần ngồi</text>
  <!-- RIGHT: messy journey -->
  <text x="490" y="28" fill="#64748B" font-size="13" font-weight="700" text-anchor="middle">Hành trình thật</text>
  <circle cx="410" cy="70"  r="28" fill="#1E293B" stroke="#6366F1" stroke-width="2"/><text x="410" y="75" fill="#C7D2FE" font-size="13" text-anchor="middle">Xem</text>
  <circle cx="580" cy="70"  r="28" fill="#1E293B" stroke="#6366F1" stroke-width="2"/><text x="580" y="75" fill="#C7D2FE" font-size="13" text-anchor="middle">Giỏ</text>
  <circle cx="580" cy="210" r="28" fill="#1E293B" stroke="#6366F1" stroke-width="2"/><text x="580" y="215" fill="#C7D2FE" font-size="12" text-anchor="middle">T.toán</text>
  <circle cx="410" cy="210" r="28" fill="#1E293B" stroke="#22C55E" stroke-width="2"/><text x="410" y="215" fill="#86EFAC" font-size="13" text-anchor="middle">Mua</text>
  <path d="M440 70 L550 70"   stroke="#22c55e" stroke-width="3" marker-end="url(#fw)"/>
  <path d="M580 100 L580 180" stroke="#22c55e" stroke-width="3" marker-end="url(#fw)"/>
  <path d="M550 210 L440 210" stroke="#22c55e" stroke-width="3" marker-end="url(#fw)"/>
  <path d="M556 92 Q470 130 432 92" stroke="#f87171" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#bk)"/>
  <text x="455" y="128" fill="#f87171" font-size="11">vòng lại</text>
  <path d="M432 96 Q360 160 410 182" stroke="#f87171" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#bk)"/>
  <text x="338" y="150" fill="#f87171" font-size="11">bỏ qua</text>
  <path d="M608 92 Q660 150 606 188" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>
  <text x="624" y="145" fill="#f59e0b" font-size="11">rời &amp;</text>
  <text x="624" y="160" fill="#f59e0b" font-size="11">quay lại</text>
</svg>
<div class="viz-caption">Bên trái là cái phễu bạn vẽ. Bên phải là cách khách thật di chuyển: vòng lại giỏ, bỏ qua bước, rời đi rồi quay lại ở phiên khác. Cùng một dữ liệu, hai câu chuyện.</div>
</div>

Khi bạn ép hành trình bên phải vào khuôn bên trái, bốn loại sai số sinh ra. Đây là từng loại.

## Bẫy 1: "Rớt" không có nghĩa là "mất" - vấn đề cửa sổ thời gian

Phễu cơ bản đếm theo kiểu "trong một phiên". Khách thêm vào giỏ hôm nay nhưng mua vào thứ Bảy tuần sau bị tính là **đã rớt** ở bước thanh toán - dù thực ra họ đã chuyển đổi, chỉ là chậm.

Điều này có nghĩa: **một phần "tỷ lệ bỏ giỏ" của bạn là ảo, do cửa sổ thời gian quá ngắn tạo ra.** Sửa đúng:

- Đặt **cửa sổ chuyển đổi (conversion window)** khớp với chu kỳ mua thật: ecom thời trang vài ngày là đủ; đồ nội thất hay xe có thể cần 30-60 ngày.
- Phân biệt **"chưa mua"** với **"sẽ không mua"**. Một khách trong cửa sổ vẫn còn cơ hội - đừng vội xếp họ vào "đã mất".

> Quy tắc vàng: trước khi hỏi "bao nhiêu phần trăm rớt?", hãy hỏi **"rớt trong bao lâu?"** Không có cửa sổ thời gian, mọi con số drop-off (tỷ lệ rớt khỏi một bước trong phễu) đều vô nghĩa.

## Bẫy 2: Bỏ qua tốc độ - vận tốc cũng là một tín hiệu

Phễu đo *bao nhiêu* khách qua mỗi bước, nhưng lờ đi *bao lâu* họ mất để qua. Vận tốc chuyển đổi là một mỏ vàng thường bị bỏ quên:

- Thời gian từ "thêm giỏ" đến "thanh toán" đột nhiên dài gấp đôi tháng này? Có gì đó đang gây do dự - phí ship mới, một bước vừa thêm vào, một đối thủ vừa giảm giá.
- Nhóm khách chuyển đổi **trong vòng 1 giờ** thường có giá trị và lòng trung thành khác hẳn nhóm mất 2 tuần. Cùng một "đã mua", hai chân dung.

Một bước có tỷ lệ giữ ổn định nhưng *chậm dần đều* là một cảnh báo sớm mà phễu tĩnh không bao giờ phát ra.

## Bẫy 3: Phễu tổng khỏe mạnh che giấu một segment đang chết

Đây là cái bẫy tốn kém nhất, và là một dạng nghịch lý Simpson. Phễu tổng của bạn trông ổn - nhưng nó là trung bình của những segment (phân khúc - một nhóm khách có chung đặc điểm, vd thiết bị, kênh, khu vực) rất khác nhau. Một segment xuất sắc có thể che lấp một segment đang chảy máu.

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- Desktop funnel -->
  <text x="180" y="28" fill="#16a34a" font-size="14" font-weight="800" text-anchor="middle">Desktop (30% traffic)</text>
  <rect x="80"  y="44"  width="200" height="40" rx="6" fill="#15803d"/><text x="180" y="70" fill="#fff" font-size="13" text-anchor="middle">Giỏ - 100%</text>
  <rect x="110" y="92"  width="140" height="40" rx="6" fill="#22c55e"/><text x="180" y="118" fill="#fff" font-size="13" text-anchor="middle">Thanh toán - 70%</text>
  <rect x="130" y="140" width="100" height="40" rx="6" fill="#16a34a"/><text x="180" y="166" fill="#fff" font-size="13" text-anchor="middle">Mua - 60%</text>
  <text x="180" y="206" fill="#16a34a" font-size="13" font-weight="700" text-anchor="middle">✓ chuyển đổi 60%</text>
  <!-- Mobile funnel -->
  <text x="500" y="28" fill="#dc2626" font-size="14" font-weight="800" text-anchor="middle">Mobile (70% traffic)</text>
  <rect x="400" y="44"  width="200" height="40" rx="6" fill="#b91c1c"/><text x="500" y="70" fill="#fff" font-size="13" text-anchor="middle">Giỏ - 100%</text>
  <rect x="430" y="92"  width="140" height="40" rx="6" fill="#dc2626"/><text x="500" y="118" fill="#fff" font-size="13" text-anchor="middle">Thanh toán - 65%</text>
  <rect x="468" y="140" width="64"  height="40" rx="6" fill="#ef4444"/><text x="500" y="166" fill="#fff" font-size="13" text-anchor="middle">Mua - 30%</text>
  <text x="500" y="206" fill="#dc2626" font-size="13" font-weight="700" text-anchor="middle">✗ chuyển đổi 30%</text>
  <!-- blended -->
  <line x1="60" y1="236" x2="620" y2="236" stroke="#334155" stroke-width="1"/>
  <text x="340" y="264" fill="#475569" font-size="14" font-weight="700" text-anchor="middle">Phễu tổng: ~39% - "tạm ổn"</text>
  <text x="340" y="290" fill="#64748B" font-size="12.5" text-anchor="middle">...nhưng 70% khách đi qua nhánh mobile đang hỏng. Con số tổng giấu điều đó.</text>
</svg>
<div class="viz-caption">Cùng một bước checkout: desktop giữ 60%, mobile chỉ 30%. Vì mobile chiếm 70% traffic, phễu tổng (~39%) trông "tạm" - trong khi segment lớn nhất đang chết. *(số liệu minh họa)*</div>
</div>

Tệ hơn nữa: một thay đổi có thể *cải thiện phễu tổng* trong khi *làm hỏng* một segment quan trọng - ví dụ một popup giảm giá kéo conversion (tỷ lệ chuyển đổi) chung lên nhưng đuổi nhóm khách giá trị cao đi. Nếu chỉ nhìn tổng, bạn ăn mừng đúng lúc đang tự bắn vào chân.

> Quy tắc vàng: **không bao giờ tin một phễu tổng mà chưa bổ nó ra theo segment.** Thiết bị, kênh, khách mới/cũ, khu vực - ít nhất một lát cắt, trước khi kết luận bất cứ điều gì.

## Bẫy 4: "Đã sửa rồi tốt hơn" - nhưng có thật do bạn sửa không?

Bạn bịt bước checkout, tháng sau conversion tăng 8%. Ăn mừng? Khoan. Tháng sau cũng là mùa cao điểm, cũng là lúc đối thủ hết hàng, cũng là lúc bạn chạy thêm ads. **So sánh trước/sau trộn lẫn tác động của bản sửa với mọi thứ khác đang đổi cùng lúc.**

Cách duy nhất biết bản sửa có thật sự hiệu quả: **một thí nghiệm có nhóm đối chứng** (A/B test - chia ngẫu nhiên hai nhóm để so phiên bản A với B) - một nửa khách thấy bước checkout mới, một nửa thấy bản cũ, so hai nhóm *trong cùng khoảng thời gian*. Nếu không thể A/B, ít nhất hãy so với một segment không bị tác động làm "đối chứng tự nhiên", và cảnh giác với mùa vụ.

Đây cũng là lý do "drop-off ≠ mất vĩnh viễn": nhiều khách bỏ giỏ vẫn quay lại qua kênh khác. Đo *tác động tăng thêm thật* (incremental) khó hơn nhiều so với nhìn một con số nhích lên - nhưng đó là khác biệt giữa quyết định dựa trên bằng chứng và quyết định dựa trên trùng hợp.

## Phễu theo cohort: ghép hai công cụ lại

Một bước nâng cấp tự nhiên: thay vì một phễu cho "tất cả khách tháng này", hãy dựng phễu **riêng cho từng nhóm khách theo thời điểm vào** - tức cohort (nhóm khách gộp theo thời điểm bắt đầu) hóa cái phễu. Bạn sẽ thấy phễu của khách tuần này so với tuần trước *tại cùng tuổi đời* - tách được tác động của một thay đổi ra khỏi nhiễu, đúng tinh thần của [Cohort Analysis](/blog/cohort-analysis/). Funnel cho biết *bước nào* rò; cohort cho biết phễu *đang tốt lên hay xấu đi theo thời gian*.

## Funnel nâng cao với Semantix

Tự tay làm tất cả những thứ trên - đặt cửa sổ chuyển đổi, đo vận tốc, bổ phễu theo từng segment, cohort hóa - là nhiều ngày SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) cho một analyst, và làm lại từ đầu mỗi lần đổi giả định.

Semantix không phải chatbot cắm vào database rồi đoán mò. Bạn định nghĩa các bước, "mua thành công", segment một lần trong [Semantic Layer](/blog/semantic-layer/), rồi hỏi bằng tiếng Việt:

> **"Phễu từ thêm giỏ đến mua, cửa sổ 14 ngày, tách mobile vs desktop, và so cohort tuần này với tuần trước."**

Semantix hiểu cửa sổ thời gian, segment và cohort nghĩa là gì trong dữ liệu của bạn, tự sinh SQL và trả về phễu đã bổ lớp - để bạn thấy ngay segment nào đang kéo cả con số tổng xuống.

## Tóm lại

| Phễu cơ bản | Phễu nâng cao |
|---|---|
| Đếm trong một phiên | Đặt cửa sổ chuyển đổi khớp chu kỳ mua |
| Chỉ đo số lượng qua bước | Đo cả vận tốc (thời gian giữa các bước) |
| Tin con số tổng | Luôn bổ theo segment trước khi kết luận |
| "Sau khi sửa thì tốt hơn" | Đo tác động thật bằng A/B / đối chứng |
| Một ảnh chụp tĩnh | Cohort hóa để thấy phễu tốt lên hay xấu đi |

Cái phễu là một bản đồ, không phải lãnh thổ. Người mới tin vào bản đồ; người giỏi biết bản đồ bỏ sót gì - vòng lặp, độ trễ, segment, và mùa vụ. Biết bốn chỗ cái phễu nói dối, bạn thôi sửa nhầm chỗ - và bắt đầu sửa đúng chỗ tiền đang chảy ra.

---

*Muốn một cái phễu biết tách segment và cửa sổ thời gian thay vì một con số phẳng? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Chưa quen đọc phễu? Bắt đầu từ [bài nền tảng](/blog/funnel-analysis/).*
