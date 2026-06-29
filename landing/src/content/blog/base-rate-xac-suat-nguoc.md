---
title: "Thống kê cho người làm kinh doanh (Phần 3): base rate & xác suất ngược - vì sao 'test dương tính' chưa chắc đúng"
code: "kt-026"
series: "thong-ke-kinh-doanh"
seriesOrder: 3
description: "Mô hình báo gian lận chính xác 95%, nó kêu một đơn là gian lận. Nhưng xác suất đơn đó gian lận thật chỉ khoảng 16%. Vì sao? Bạn quên hỏi tỉ lệ nền. Phần cuối của series."
pubDate: 2025-01-21
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/base-rate-xac-suat-nguoc.svg"
coverAlt: "Lưới ô vuông: vài ô đỏ là gian lận thật, rất nhiều ô vàng là cảnh báo oan"
---

<div class="series-nav">
  <div class="series-nav-title">🎲 Series Thống kê trực giác cho KD · 3 phần</div>
  <ol>
    <li><a href="/blog/mau-va-tong-the/">Phần 1 - Mẫu &amp; tổng thể</a></li>
    <li><a href="/blog/do-tin-cay-p-value/">Phần 2 - Độ tin cậy &amp; p-value</a></li>
    <li class="current">Phần 3 - Base rate &amp; xác suất ngược</li>
  </ol>
</div>

Bạn vừa lắp một mô hình phát hiện gian lận cho cửa hàng online. Đội kỹ thuật khoe: **"Độ chính xác 95%."** Nghe rất yên tâm. Chiều nay nó nhấp nháy một cảnh báo: đơn hàng số 4471 - *nghi gian lận.*

Phản xạ của bạn: "Mô hình đúng 95%, vậy đơn này gian lận với xác suất 95%, huỷ luôn." Bạn gọi điện chất vấn khách, khoá tài khoản, chặn đơn.

Sai. Xác suất đơn 4471 gian lận thật, trong ví dụ ta sắp tính, chỉ khoảng **16%**. Tức là cứ 6 cảnh báo thì khoảng 5 cái là **oan** - bạn vừa mắng nhầm 5 khách thật để bắt được 1 kẻ gian. Một mô hình "chính xác 95%" mà phần lớn lời cảnh báo của nó lại sai. Nghịch lý này không phải lỗi của mô hình. Nó là lỗi của một con số bạn quên hỏi: **tỉ lệ nền.**

## Tỉ lệ nền: con số ai cũng quên

**Tỉ lệ nền** (base rate - tỉ lệ một thứ vốn đã hiếm hay phổ biến đến mức nào trong tổng thể, trước khi bạn đo đạc gì cả) là điểm xuất phát. Gian lận chiếm bao nhiêu phần trăm tổng số đơn? Ở đa số cửa hàng tử tế, con số này **rất thấp** - giả sử 1%.

Đây là chỗ trực giác phản bội bạn. Khi nghe "chính xác 95%", não tự động hiểu là "nó kêu gian lận thì 95% là gian lận thật". Hai câu đó nghe giống nhau nhưng là **hai con số hoàn toàn khác**. Cái đầu nói về *mô hình đúng bao nhiêu lần*. Cái sau nói về *khi nó kêu, thì khả năng đúng là bao nhiêu* - và câu sau mới là thứ bạn cần để ra quyết định.

Sự lẫn lộn này có tên: **xác suất ngược** (định lý Bayes - cách cập nhật niềm tin sau khi nhận một tín hiệu, có tính cả độ hiếm sẵn có của thứ bạn đang tìm). "Chính xác 95%" và "cảnh báo này đáng tin 95%" là hai hướng ngược nhau của cùng một câu chuyện. Đảo chiều mà quên tỉ lệ nền là cái bẫy đắt nhất khi đọc bất kỳ tín hiệu nào.

## Đếm bằng đầu người, không bằng phần trăm

Cách chắc nhất để gỡ nghịch lý này: **bỏ phần trăm, đếm người thật.** Lấy 1.000 đơn hàng làm ví dụ minh hoạ.

- Tỉ lệ nền gian lận 1% → trong 1.000 đơn, có **10 đơn gian lận thật**, 990 đơn sạch.
- Mô hình bắt được 95% đơn gian lận thật → nó tóm đúng **9-10 đơn** (làm tròn: 10) trong số 10 đơn xấu.
- Nhưng "chính xác 95%" cũng có nghĩa nó *báo nhầm* khoảng 5% đơn sạch. 5% của 990 đơn sạch = **~50 đơn bị báo oan**.

Giờ nhìn vào tất cả các cảnh báo "dương tính" (positive - đơn bị mô hình gắn cờ nghi gian lận):

| 1.000 đơn (ví dụ minh hoạ) | Mô hình KÊU "gian lận" | Mô hình nói "sạch" | Tổng |
|---|---|---|---|
| Gian lận thật | 10 (bắt đúng) | 0 | 10 |
| Đơn sạch | 50 (báo oan) | 940 | 990 |
| **Tổng cảnh báo** | **60** | 940 | 1.000 |

Mô hình kêu "gian lận" **60 lần**. Chỉ **10** trong số đó là thật. Vậy khi nó nhấp nháy, xác suất gian lận thật là 10 / 60 = **~16%**, không phải 95%. Năm phần sáu số cảnh báo là **dương tính giả** (false positive - báo có vấn đề trong khi thực ra không có). Đám đông đơn sạch quá lớn (990) khiến 5% sai sót của nó cũng đẻ ra nhiều cảnh báo oan hơn hẳn toàn bộ số gian lận thật.

> Quy tắc vàng: khi thứ bạn săn rất hiếm, ngay cả một bài test rất giỏi cũng tạo ra nhiều báo động giả hơn báo động thật. Độ hiếm nuốt chửng độ chính xác.

## Nhìn bằng hình: vì sao vùng "oan" lại to thế

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="22" fill="#475569" font-size="13" font-weight="700">1.000 đơn hàng - diện tích nói thật (ví dụ minh hoạ)</text>
  <rect x="8" y="36" width="420" height="230" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="8" y="36" width="420" height="230" fill="#1E293B" opacity="0.35"/>
  <rect x="8" y="36" width="420" height="33" fill="#F59E0B" opacity="0.85"/>
  <rect x="8" y="36" width="42" height="33" fill="#EF4444"/>
  <text x="450" y="56" fill="#EF4444" font-size="13" font-weight="700">■ 10 gian lận thật → bắt đúng</text>
  <text x="450" y="86" fill="#F59E0B" font-size="13" font-weight="700">■ 50 đơn sạch bị báo OAN</text>
  <text x="450" y="116" fill="#64748B" font-size="13" font-weight="700">■ 940 đơn sạch, để yên đúng</text>
  <text x="450" y="170" fill="#94A3B8" font-size="13">Vùng cảnh báo (đỏ + vàng) = 60 ô.</text>
  <text x="450" y="192" fill="#94A3B8" font-size="13">Chỉ 10/60 là đỏ thật.</text>
  <text x="450" y="220" fill="#22D3EE" font-size="15" font-weight="800">Tin được: ~16%</text>
  <text x="220" y="160" fill="#CBD5E1" font-size="14" text-anchor="middle">940 đơn sạch</text>
  <text x="220" y="180" fill="#94A3B8" font-size="12" text-anchor="middle">(mô hình để yên - đúng)</text>
</svg>
<div class="viz-caption">Diện tích đỏ (gian lận thật) tí xíu so với cả tấm. Chỉ cần mô hình quẹt nhầm một dải mỏng của vùng sạch khổng lồ, dải vàng "báo oan" đã to gấp 5 lần vùng đỏ. Đó là toàn bộ nghịch lý, gói trong một hình.</div>
</div>

Hình trên là lý do trực giác lừa bạn: bạn nhìn vào con số "95%" và quên rằng nó đang hành động trên một **biển đơn sạch**. 5% sai của một biển lớn vẫn lớn hơn 95% đúng của một vũng nhỏ.

## Cùng một cái bẫy, đội nhiều lốt khác nhau

Mô hình gian lận chỉ là một ví dụ. Bất cứ khi nào bạn sàng lọc để tìm thứ **hiếm**, nghịch lý này quay lại y nguyên:

- **Lọc email spam.** Bộ lọc "chính xác 99%" nghe tuyệt - cho đến khi bạn nhớ rằng email công việc quan trọng cũng hiếm. 1% sai của hàng nghìn email rác vẫn đủ để dìm một hợp đồng vào thư mục Spam.
- **Sàng lọc CV tự động.** Ứng viên xuất sắc là thiểu số. Một bộ lọc loại 90% hồ sơ "không đạt" sẽ quét nhầm không ít người giỏi - vì đám đông hồ sơ trung bình quá lớn so với nhúm ứng viên ngôi sao bạn đang tìm.
- **Dự đoán khách rời (churn - khách ngừng mua, biến mất).** Nếu chỉ 3% khách rời mỗi tháng, một mô hình "chính xác" vẫn có thể gắn cờ một danh sách dài khách *sắp rời* mà phần lớn thật ra vẫn ở lại. Tặng voucher níu chân cả danh sách đó = đốt tiền vào người chẳng định đi đâu.

Mọi trường hợp đều cùng một bài học: **độ chính xác là vô nghĩa nếu bạn không biết tỉ lệ nền.** "Chính xác 95%" không phải một lời hứa - nó là một nửa câu. Nửa còn lại là: *trong một thế giới mà thứ tôi tìm hiếm cỡ nào?*

## Câu hỏi cứu bạn khỏi quyết định sai

Tin tốt: bạn không cần biết công thức Bayes để tự vệ. Bạn chỉ cần **một câu hỏi phản xạ** mỗi lần nghe một con số "chính xác" hay một tín hiệu:

> Tỉ lệ nền là bao nhiêu? Thứ này vốn dĩ hiếm cỡ nào trước khi tôi đo?

Hỏi xong, đếm bằng đầu người trên 1.000 ca như bảng phía trên. Nếu thứ bạn săn rất hiếm, hãy mặc định rằng **phần lớn cảnh báo sẽ là oan**, và đừng hành động với một cảnh báo lẻ như thể nó là sự thật. Một cảnh báo gian lận không phải lệnh khoá tài khoản - nó là lời mời *xem kỹ thêm*. Đây chính là tinh thần "đừng tin một tín hiệu lẻ" mà ta đã gặp ở [những thiên kiến khi đọc số](/blog/thien-kien-trong-doc-so/): bộ não thích một câu trả lời chắc nịch hơn một xác suất lửng lơ, và nó sẵn sàng bỏ qua tỉ lệ nền để có được cảm giác chắc chắn đó.

Lưu ý thêm: tỉ lệ nền cao hay tín hiệu mạnh **không** tự nó chứng minh nguyên nhân. Một mô hình gắn cờ đúng "khách sắp rời" vẫn chưa nói cho bạn biết *vì sao* họ rời - đó lại là câu chuyện của [tương quan và nhân quả](/blog/tuong-quan-nhan-qua/). Base rate giúp bạn đọc đúng một xác suất; nhân quả mới giúp bạn biết vặn nút nào.

## Tỉ lệ nền trong Semantix

Không công cụ nào "sửa" Bayes hộ bạn - nhưng phần lớn người ta sai ở base rate đơn giản vì *lười đếm*. Tính tỉ lệ nền thật của gian lận, của khách rời, của đơn bị hoàn - theo lối cũ là một buổi viết SQL và dựng pivot. Nên người ta đoán bừa, hoặc bỏ qua.

Semantix rút gọn đúng cái bước "đếm để biết tỉ lệ nền". Bạn hỏi thẳng bằng tiếng Việt:

> **"Trong 12 tháng qua, bao nhiêu phần trăm đơn hàng bị xác nhận là gian lận thật?"**

Có con số nền đó trong tay, mỗi lần một mô hình hay một cảnh báo nhấp nháy, bạn đủ dữ kiện để hỏi câu thứ hai - *"với tỉ lệ nền này, cảnh báo đó đáng tin bao nhiêu?"* - trước khi mắng nhầm một khách thật. Công cụ không quyết hộ bạn; nó chỉ đưa con số nền ra đủ nhanh để bạn **kịp ngờ vực trước khi hành động.**

## Tóm lại

| Phản xạ sai: tin thẳng độ chính xác | Tư duy đúng: hỏi tỉ lệ nền trước |
|---|---|
| "Chính xác 95% → cảnh báo này đúng 95%." | "Cảnh báo này đúng bao nhiêu còn tuỳ thứ tôi tìm hiếm cỡ nào." |
| Hành động ngay với một tín hiệu lẻ. | Coi cảnh báo là lời mời xem kỹ, không phải lệnh thi hành. |
| Quên rằng đám đông "bình thường" quá lớn. | Đếm bằng đầu người trên 1.000 ca để thấy vùng báo oan. |
| Tin "độ chính xác" như một con số đủ. | Hỏi luôn tỉ lệ dương tính giả + tỉ lệ nền. |

Ba con số đi cùng nhau - base rate, độ nhạy của bài test, và tỉ lệ dương tính giả - mới kể được sự thật. Thiếu một, bạn đang đọc nửa câu chuyện và quyết với cả niềm tin.

> **Mental model:** trước mọi con số "chính xác X%", hỏi một câu duy nhất - *"thứ tôi đang tìm vốn hiếm cỡ nào?"* Nếu nó hiếm, hãy chờ đợi rất nhiều báo động giả, và đừng để một tín hiệu lẻ điều khiển tay bạn.

Khép lại series ba phần: ở [Phần 1](/blog/mau-va-tong-the/) bạn học cách một **mẫu** nhỏ vẫn nói được chuyện của cả **tổng thể**; ở [Phần 2](/blog/do-tin-cay-p-value/) bạn học cách đo xem một khác biệt là thật hay chỉ là may rủi qua **độ tin cậy** và **p-value**; và ở Phần 3 này, bạn học cách đọc ngược một tín hiệu mà không bị nó lừa, bằng **tỉ lệ nền.** Cả ba quy về một thói quen duy nhất: *trước khi tin một con số, hỏi xem nó đang giấu mình điều gì.* Đó là toàn bộ khoảng cách giữa "có dữ liệu" và "ra quyết định đúng".

---

*Muốn tự tay đếm tỉ lệ nền thật trên dữ liệu của mình trước khi tin một cảnh báo? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc quay lại [Phần 1 - mẫu và tổng thể](/blog/mau-va-tong-the/) để đọc lại series từ đầu.*
