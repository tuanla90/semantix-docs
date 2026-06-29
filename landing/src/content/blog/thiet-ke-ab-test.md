---
title: "Quyết định bằng thử nghiệm (Phần 2): thiết kế một A/B test đúng cho SME"
code: "pt-038"
series: "thu-nghiem"
seriesOrder: 2
description: "Test sai cách còn tệ hơn không test - vì cho bạn niềm tin giả. Cách dựng A/B test mà kết quả đáng tin. Phần 2 của series:"
pubDate: 2025-07-27
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/thiet-ke-ab-test.svg"
coverAlt: "Luồng người dùng được chia ngẫu nhiên thành phiên bản A và B, rồi đo metric chính để chọn người thắng"
---

<div class="series-nav">
  <div class="series-nav-title">🧪 Series Quyết định bằng thử nghiệm · 3 phần</div>
  <ol>
    <li><a href="/blog/hippo-vs-thu-nghiem/">Phần 1 - HiPPO vs bằng chứng</a></li>
    <li class="current">Phần 2 - Thiết kế A/B test đúng</li>
    <li><a href="/blog/doc-ket-qua-ab-test/">Phần 3 - Đọc kết quả không tự lừa mình</a></li>
  </ol>
</div>

Một chủ shop mỹ phẩm ở TP.HCM đổi nút "Mua ngay" trên landing page (trang đích) từ xanh sang cam vào sáng thứ Hai. Cuối tuần, đơn tăng 14%. Anh kết luận chắc nịch: "Màu cam bán tốt hơn." Rồi đổi luôn màu cam cho mọi chiến dịch, mọi kênh.

Phản xạ của bạn lúc này có thể là: "Hợp lý mà - có số liệu hẳn hoi, có gì sai?" Nhưng đây mới đúng là cái bẫy. Tuần đó anh cũng vừa chạy thêm một đợt khuyến mãi, lại trúng dịp lương về đầu tháng. Màu nút chỉ là một trong năm thứ thay đổi cùng lúc. Con số 14% đó *có thật* - nhưng nó không nói gì về cái nút cả.

Đây là nghịch lý ít người chịu tin: **một thử nghiệm thiết kế sai còn tệ hơn không thử nghiệm - vì nó tặng bạn một niềm tin giả, và bạn sẽ đổ tiền theo niềm tin đó.** Không có dữ liệu, bạn còn biết mình đang đoán. Có một con số sai mặc áo "bằng chứng", bạn ngừng đoán và bắt đầu sai một cách tự tin. Ở [Phần 1](/blog/hippo-vs-thu-nghiem/) bạn đã thấy vì sao nên thay cảm tính sếp bằng thử nghiệm. Phần này trả lời câu khó hơn: làm sao để thử nghiệm đó *đáng tin*.

## A/B test là gì - và vì sao nó dễ làm hỏng đến vậy

**A/B test** (thử nghiệm A/B - cho hai nhóm khách thấy hai phiên bản khác nhau cùng lúc, rồi so kết quả) về bản chất rất đơn giản: bạn có phiên bản A (hiện tại) và phiên bản B (cái mới), chia khách ra hai nửa, mỗi nửa thấy một bản, rồi xem bản nào "thắng".

Đơn giản đến mức ai cũng nghĩ mình làm được. Và đó chính là vấn đề. Một A/B test hỏng trông y hệt một A/B test đúng: cũng có hai phiên bản, cũng ra một con số, cũng có người thắng. Khác biệt nằm ở những thứ *vô hình* - bạn đo gì, đổi mấy biến, chia khách thế nào, dừng khi nào. Sai một mắt xích, cả kết luận sụp, nhưng con số cuối vẫn trông đẹp như thật.

Năm bước dưới đây là khung tối thiểu để một test cho ra kết quả bạn dám đặt cược tiền vào.

## Bước 1 - Một giả thuyết rõ + một metric chính, viết ra TRƯỚC khi chạy

Đừng bao giờ chạy test với suy nghĩ "thử xem có gì hay". "Có gì hay" nghĩa là bạn sẽ tìm thấy *thứ gì đó* trong đống số - và bộ não người giỏi kinh khủng việc bịa ra câu chuyện cho bất kỳ con số nào.

Thay vào đó, viết một **giả thuyết** một câu, theo mẫu: *"Nếu [thay đổi], thì [metric] sẽ [tăng/giảm], vì [lý do]."*

> *"Nếu rút form đăng ký từ 6 ô xuống 3 ô, thì tỷ lệ hoàn tất đăng ký sẽ tăng, vì khách ngại gõ nhiều."*

Mẹo chọn biến đáng test nhất: trước khi nghĩ ra giả thuyết, hãy nhìn [phễu chuyển đổi](/blog/funnel-analysis/) để biết khách rớt mạnh nhất ở bước nào - đó chính là chỗ một thay đổi nhỏ có đòn bẩy lớn nhất, và là ứng viên số một cho A/B test.

Rồi chọn **đúng một metric chính** để phán xử thắng thua - dân kỹ thuật gọi là **OEC** (Overall Evaluation Criterion - tiêu chí đánh giá tổng, north-star của test). Một metric, không phải năm. Vì nếu bạn theo dõi mười chỉ số, gần như chắc chắn một cái sẽ "thắng" do ngẫu nhiên, và bạn sẽ bám vào đúng cái đó để tự khen mình đúng.

Lưu ý cái bẫy: metric chính phải là thứ bạn *thật sự quan tâm*, không phải thứ dễ nhích. Đổi tiêu đề email cho giật gân hơn có thể tăng tỷ lệ mở (open rate) - nhưng nếu mục tiêu là đơn hàng, thì metric chính phải là **tỷ lệ ra đơn từ email đó**, không phải lượt mở. Chọn sai metric, bạn tối ưu đúng kỹ thuật cho sai mục tiêu. (Đây cũng là tinh thần [chọn đúng câu hỏi trước khi chạm dữ liệu](/blog/tin-hieu-vs-nhieu/).)

## Bước 2 - Chỉ đổi MỘT biến mỗi lần

Quay lại anh chủ shop mỹ phẩm. Lỗi gốc của anh: đổi màu nút *cùng lúc* với khuyến mãi, lại trúng đợt lương về. Khi nhiều thứ đổi một lượt, bạn không bao giờ biết thứ nào tạo ra kết quả.

Một A/B test đúng chỉ đổi **một biến** (variant - yếu tố được thay đổi giữa A và B) tại một thời điểm. A và B giống hệt nhau, *trừ* đúng một chỗ: chỉ màu nút, hoặc chỉ tiêu đề, hoặc chỉ mức ưu đãi - không phải cả ba. Có vậy, khi B thắng, bạn mới quy được công cho đúng cái đã đổi.

Muốn thử nhiều thứ một lúc thì sao? Có kỹ thuật riêng cho việc đó (multivariate testing - thử đa biến), nhưng nó đòi lượng traffic lớn hơn nhiều và phức tạp hơn nhiều. Với một SME, lời khuyên thẳng: **thử lần lượt từng biến một.** Chậm hơn, nhưng mỗi kết quả là một bài học sạch, không lẫn lộn.

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- traffic source -->
  <circle cx="70" cy="160" r="38" fill="#0F172A" stroke="#334155" stroke-width="2"/>
  <text x="70" y="155" fill="#E2E8F0" font-size="13" font-weight="700" text-anchor="middle">100%</text>
  <text x="70" y="174" fill="#94A3B8" font-size="12" text-anchor="middle">khách</text>
  <!-- random split -->
  <g transform="translate(210,160)">
    <circle r="30" fill="#0B1120" stroke="#22D3EE" stroke-width="2"/>
    <text x="0" y="6" fill="#22D3EE" font-size="24" font-weight="800" text-anchor="middle">&#10005;</text>
    <text x="0" y="62" fill="#94A3B8" font-size="13" text-anchor="middle" font-weight="600">chia ngẫu nhiên 50/50</text>
  </g>
  <!-- connector source -> split -->
  <line x1="108" y1="160" x2="178" y2="160" stroke="#475569" stroke-width="2.5"/>
  <!-- split -> A (up), B (down) -->
  <path d="M236 145 C 290 110, 320 95, 360 90" fill="none" stroke="#22D3EE" stroke-width="2.5"/>
  <path d="M236 175 C 290 210, 320 225, 360 230" fill="none" stroke="#A78BFA" stroke-width="2.5"/>
  <!-- A card -->
  <g transform="translate(360,58)">
    <rect x="0" y="0" width="180" height="66" rx="12" fill="#0F172A" stroke="#155E75" stroke-width="2"/>
    <text x="18" y="28" fill="#67E8F9" font-size="15" font-weight="700">A - nút xanh</text>
    <text x="18" y="50" fill="#64748B" font-size="13">phiên bản hiện tại</text>
  </g>
  <!-- B card -->
  <g transform="translate(360,196)">
    <rect x="0" y="0" width="180" height="66" rx="12" fill="#0F172A" stroke="#5B21B6" stroke-width="2"/>
    <text x="18" y="28" fill="#C4B5FD" font-size="15" font-weight="700">B - nút cam</text>
    <text x="18" y="50" fill="#64748B" font-size="13">chỉ đổi MỘT biến</text>
  </g>
  <!-- A,B -> measure -->
  <path d="M540 91 C 580 100, 595 140, 612 152" fill="none" stroke="#475569" stroke-width="2.5"/>
  <path d="M540 229 C 580 220, 595 180, 612 168" fill="none" stroke="#475569" stroke-width="2.5"/>
  <!-- measure -->
  <g transform="translate(560,128)">
    <rect x="0" y="0" width="110" height="64" rx="12" fill="#0F172A" stroke="#164E45" stroke-width="2"/>
    <text x="55" y="26" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">ĐO 1</text>
    <text x="55" y="46" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">METRIC</text>
  </g>
  <text x="340" y="300" fill="#64748B" font-size="13" font-weight="600" text-anchor="middle">Cùng lúc &#183; cùng nhóm khách &#183; chỉ khác đúng một chỗ</text>
</svg>
<div class="viz-caption">Khách được chia ngẫu nhiên 50/50, mỗi nửa thấy một phiên bản chỉ khác nhau đúng một biến, chạy đồng thời, rồi đo cùng một metric chính. Đó là toàn bộ cấu trúc của một A/B test sạch.</div>
</div>

## Bước 3 - Chia NGẪU NHIÊN, chạy ĐỒNG THỜI

Đây là bước hay bị bỏ nhất, và là bước quan trọng nhất.

**Ngẫu nhiên hóa** (randomization - mỗi khách vào nhóm A hay B hoàn toàn ngẫu nhiên) đảm bảo hai nhóm *tương đương nhau* về mọi mặt bạn không kiểm soát: tỷ lệ khách mới/cũ, mobile/desktop, giàu/nghèo, vùng miền. Nếu bạn để khách *tự chọn* - ví dụ cho khách cũ thấy bản A, khách mới thấy bản B - thì khi B thắng, bạn không biết là do thiết kế B hay do nhóm khách mới vốn đã khác.

Và đây là sai lầm kinh điển nhất của SME: **so hai khoảng thời gian khác nhau thay vì chia cùng lúc.** Chạy bản A tuần này, bản B tuần sau, rồi so. Nghe có vẻ công bằng, nhưng hai tuần không bao giờ giống nhau: tuần sau có thể trúng ngày đôi 10/10, đối thủ chạy sale, hay đơn giản là thời tiết khác. Bạn không đo "A vs B", bạn đo "tuần này vs tuần sau" - và đổ tội nhầm cho phiên bản.

Cách đúng: A và B chạy **song song, cùng một khoảng thời gian**, khách chia ngẫu nhiên giữa chúng. Mọi yếu tố mùa vụ, sự kiện, biến động bên ngoài đập vào cả hai nhóm như nhau - nên chúng tự triệt tiêu, để lộ ra khác biệt thật do chính phiên bản.

## Bước 4 - Cỡ mẫu và thời gian đủ: đừng dừng sớm khi "thấy thắng"

Sau hai ngày, bản B đang dẫn 18%. Bạn muốn tuyên bố thắng và triển khai ngay. **Đừng.**

Khi số lượng còn nhỏ, con số nhảy múa dữ dội chỉ vì may rủi. Tung đồng xu 10 lần có thể ra 7 mặt ngửa - không có nghĩa đồng xu lệch. Cần đủ **cỡ mẫu** (sample size - số khách trong mỗi nhóm) thì khác biệt mới đáng tin, không phải tiếng ồn ngẫu nhiên. (Đây chính là bài toán [tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/) áp vào thử nghiệm.)

Hai quy tắc thực dụng cho SME:

- **Định trước thời gian chạy** - thường tối thiểu 1-2 tuần trọn, để phủ hết chu kỳ trong tuần (cuối tuần khác ngày thường). Quyết định ngày dừng *trước khi chạy*, rồi khóa lại.
- **Đừng liếc kết quả mỗi giờ rồi dừng ngay khi thấy thắng.** Đây là cái bẫy tên là *peeking* (nhìn lén) - nếu bạn kiểm tra liên tục và dừng đúng lúc B tình cờ dẫn, bạn gần như chắc chắn sẽ "thấy thắng" kể cả khi A và B thật ra y hệt nhau. Phần 3 sẽ mổ kỹ cái bẫy này.

Không cần học công thức thống kê. Chỉ cần một kỷ luật: *chọn ngày dừng từ đầu, và tôn trọng nó.*

## Bước 5 - Định trước tiêu chí thắng/thua

Trước khi chạy, viết ra một câu: *"B thắng nếu metric chính của B cao hơn A ít nhất [X]% sau [thời gian đã định]."*

Vì sao phải định trước? Vì nếu không, sau khi có số bạn sẽ tự dịch chuyển cây gậy. "Ờ thì B chỉ hơn 2%, nhưng nhìn nhóm khách mobile thì B hơn hẳn đấy chứ" - và thế là bạn vừa bịa ra một chiến thắng từ một kết quả huề. Tiêu chí định sẵn là sợi dây trói tay tương lai của bạn lại, để bạn không tự lừa mình.

## Cảnh báo cho SME: traffic nhỏ thì sao?

Sự thật phũ phàng: nếu landing page của bạn chỉ có vài trăm lượt mỗi tuần, một A/B test "chuẩn sách giáo khoa" có thể cần chạy *hàng tháng* mới đủ tin cậy - và lúc đó kết luận đã lỗi thời. Đừng giả vờ rằng test luôn khả thi. Ba lối ra thực tế:

- **Thử thay đổi LỚN, đừng thử thay đổi nhỏ.** Đổi cả cách trình bày trang, cả lời chào hàng - không phải đổi sắc xanh đậm hơn 5%. Khác biệt càng lớn thì cần càng ít mẫu để nhìn ra.
- **Dùng before/after (trước/sau) một cách thận trọng.** Nếu thật sự không đủ traffic để chia đôi, so giai đoạn trước và sau khi đổi - nhưng *biết rõ* đây là bằng chứng yếu hơn nhiều, và cố loại các yếu tố mùa vụ (so với cùng kỳ, tránh dịp lễ).
- **Ưu tiên test thứ đáng test.** Mỗi lần chỉ đủ sức chạy một test tử tế, hãy dành nó cho quyết định lớn - trang chủ, luồng thanh toán - chứ đừng phí vào màu một cái nút phụ.

## Checklist: test đúng vs test hỏng

| Bước | Test hỏng (niềm tin giả) | Test đúng (bằng chứng thật) |
|---|---|---|
| Mục tiêu | "Thử xem có gì hay" | Giả thuyết 1 câu + 1 metric chính, viết trước |
| Số biến đổi | Đổi màu + giá + tiêu đề cùng lúc | Chỉ đổi đúng một biến |
| Chia nhóm | Khách tự chọn / so hai tuần khác nhau | Ngẫu nhiên, chạy đồng thời |
| Dừng khi nào | Dừng ngay lúc "thấy thắng" | Ngày dừng định trước, không nhìn lén |
| Phán thắng | Tự dịch cây gậy sau khi xem số | Tiêu chí thắng/thua chốt từ đầu |

## Thiết kế test với Semantix

Semantix không phải một công cụ A/B testing thay bạn bấm nút. Nó là lớp trả lời câu hỏi *sau khi* test chạy xong - phần mà phần lớn SME làm ẩu nhất. Thay vì xuất hai file Excel rồi tự dò, bạn hỏi thẳng bằng tiếng Việt:

> **"So tỷ lệ ra đơn của nhóm thấy landing page A và nhóm thấy bản B trong 2 tuần qua, tách theo mobile và desktop"**

Vì "tỷ lệ ra đơn", "nhóm A", "nhóm B" đã được định nghĩa một lần trong tầng ngữ nghĩa của bạn, Semantix tự dựng phép so sánh khớp đúng metric chính bạn đã chọn từ đầu - không để bạn vô tình đổi sang một chỉ số dễ thắng hơn giữa chừng. Bạn giữ kỷ luật của bước 1 đến bước 5; Semantix lo phần tính toán.

> **Mental model:** một A/B test giống một phiên tòa. Bạn nêu cáo buộc *trước* (giả thuyết), chọn một bằng chứng quyết định *trước* (metric chính), định mức án *trước* (tiêu chí thắng). Tòa nào để công tố viên đổi cáo buộc sau khi nghe lời khai thì không phải tòa - đó là một vở kịch dựng sẵn phần thắng.

---

*Muốn so hai phiên bản mà không phải dò Excel thủ công? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Và đọc tiếp [Phần 3 - Đọc kết quả không tự lừa mình](/blog/doc-ket-qua-ab-test/): vì sao một kết quả "có ý nghĩa thống kê" vẫn có thể dắt bạn đi sai.*
