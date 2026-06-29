---
title: "Churn prediction: nhận ra khách sắp rời đi trước khi họ rời"
code: "pt-012"
description: "Lúc bạn biết một khách đã rời, thì đã quá muộn để giữ. Churn prediction là cách nhìn ra dấu hiệu sớm - và hành động khi vẫn còn kịp."
pubDate: 2025-09-07
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/churn-prediction.svg"
coverAlt: "Khoảng cách giữa các lần mua giãn dần và cờ đỏ cảnh báo nguy cơ khách rời"
---

Một quán cà phê ở quận 3 có anh khách quen. Hai năm nay, sáng nào anh cũng ghé. Rồi một tuần không thấy. Rồi hai tuần. Đến khi chủ quán nhận ra "ủa lâu rồi không gặp anh ấy", anh đã thành khách quen của một quán mới cách đó hai con đường - và sẽ không quay lại nữa.

Đây là nghịch lý ít người chịu tin: **lúc bạn biết một khách đã rời, thì đã quá muộn để giữ.** Báo cáo cuối tháng chỉ cho bạn xem một danh sách người đã đi - như đọc cáo phó. Thứ bạn cần không phải cáo phó, mà là một cái chuông báo *trước khi* họ đi. Đó chính là **churn prediction** (dự đoán khách rời - đoán trước ai sắp ngừng mua dựa trên dấu hiệu sớm).

## "Rời đi" hiếm khi là một cú dứt áo

Phim ảnh dạy ta rằng chia tay là một khoảnh khắc. Thực tế bán hàng thì khác: **churn** (tỷ lệ khách rời bỏ) gần như luôn là một quá trình *trượt dần*, không phải một cú đóng sầm cửa.

Khách không thức dậy một sáng và tuyên bố "tôi nghỉ mua hàng của anh". Họ chỉ mua thưa hơn một chút. Đơn nhỏ lại. Lần này bỏ qua tin nhắn khuyến mãi. Lần sau không mở app. Mỗi tín hiệu lẻ trông vô hại - gộp lại, chúng vẽ ra một đường dốc đi xuống mà người chủ bận rộn không kịp nhìn thấy.

Tin tốt: vì rời đi là một quá trình, nó để lại dấu vết. Và dấu vết đó nằm sẵn trong dữ liệu bán hàng của bạn - bạn chỉ cần biết tìm đâu.

## Tín hiệu sớm: nhìn cái sắp tới, không phải cái đã rồi

Chìa khóa của **dự đoán khách rời** là phân biệt hai loại tín hiệu.

- **Tín hiệu trễ (lagging - đo cái đã xảy ra):** "khách này 6 tháng không mua". Đúng, nhưng vô dụng - họ đi mất từ lâu rồi.
- **Tín hiệu sớm (leading - báo trước cái sắp xảy ra):** "khách này thường mua mỗi 30 ngày, mà đã 50 ngày chưa quay lại". Đây mới là vàng. Nó cho bạn một *cửa sổ thời gian* để ra tay.

Hãy hình dung sức khỏe khách hàng như nhiệt độ cơ thể. Đợi đến lúc ngất xỉu mới lo thì muộn. Cái bạn muốn là chiếc nhiệt kế báo sốt nhẹ - sớm, lúc còn uống thuốc kịp. **Tín hiệu sớm** (leading) chính là chiếc nhiệt kế đó.

Bốn tín hiệu sớm phổ biến nhất, gần như ngành nào cũng dùng được:

1. **Giãn khoảng cách mua.** Khoảng cách giữa hai lần mua dài ra so với thói quen của chính khách đó.
2. **Giảm tần suất.** Trước mua 4 lần/tháng, giờ còn 1.
3. **Hạ giá trị đơn.** Giá trị mỗi đơn teo dần - họ vẫn ở đây nhưng đang "nhón chân ra cửa".
4. **Ngừng tương tác.** Không mở app, không đọc tin, không bấm vào ưu đãi nữa.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- baseline -->
  <line x1="40" y1="180" x2="640" y2="180" stroke="#334155" stroke-width="2"/>
  <text x="40" y="280" fill="#64748B" font-size="13" font-weight="600">Dòng thời gian - mỗi chấm là một lần mua</text>
  <!-- regular purchases: even gaps -->
  <circle cx="80" cy="180" r="9" fill="#22D3EE"/>
  <circle cx="150" cy="180" r="9" fill="#22D3EE"/>
  <circle cx="220" cy="180" r="9" fill="#22D3EE"/>
  <text x="90" y="150" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">~30 ngày</text>
  <text x="160" y="150" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">~30 ngày</text>
  <!-- widening gaps -->
  <circle cx="320" cy="180" r="9" fill="#FBBF24"/>
  <text x="270" y="150" fill="#FBBF24" font-size="13" font-weight="700" text-anchor="middle">45 ngày</text>
  <circle cx="470" cy="180" r="9" fill="#F59E0B"/>
  <text x="395" y="150" fill="#F59E0B" font-size="13" font-weight="700" text-anchor="middle">65 ngày - giãn dần</text>
  <!-- danger zone: no purchase, red flag -->
  <line x1="470" y1="180" x2="640" y2="180" stroke="#7F1D1D" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="555" y="150" fill="#F87171" font-size="13" font-weight="700" text-anchor="middle">90+ ngày, im ắng</text>
  <!-- red flag pole -->
  <line x1="600" y1="180" x2="600" y2="90" stroke="#F87171" stroke-width="3"/>
  <path d="M600 92 L645 104 L600 122 Z" fill="#EF4444"/>
  <text x="600" y="218" fill="#F87171" font-size="14" font-weight="800" text-anchor="middle">CỜ NGUY CƠ</text>
</svg>
<div class="viz-caption">Khoảng cách giữa các lần mua giãn dần là tín hiệu sớm rõ nhất. Cờ nguy cơ nên bật lên ở mức 65 ngày - không phải đợi tới 90. (sơ đồ minh họa)</div>
</div>

## Không cần model ML: bắt đầu bằng một luật đơn giản

Nghe "dự đoán" là nhiều người tưởng phải có một mô hình máy học (ML - machine learning) phức tạp, một data scientist và ba tháng huấn luyện. Sự thật ngược đời: **một luật đơn giản viết bằng tiếng Việt thường bắt được 80% giá trị, trong 80 phút.**

Luật cốt lõi gói gọn trong một câu:

> Quy tắc vàng: nếu một khách **vượt quá** nhịp mua bình thường *của chính họ* một quãng đáng kể, hãy bật cờ nguy cơ - đừng đợi tới khi họ thành "khách đã mất".

Ví dụ: khách thường mua mỗi 30 ngày mà đã 60 ngày chưa quay lại → đó là gấp đôi nhịp quen thuộc → bật cờ. Bạn không cần thuật toán; bạn cần biết nhịp bình thường của từng khách và đặt một ngưỡng cảnh báo.

Để biến luật thành điểm số dễ hành động, hãy chấm theo thang ba mức:

| Mức nguy cơ | Luật (so với nhịp mua quen của khách) | Tín hiệu kèm theo |
|---|---|---|
| Xanh - ổn | Mua đúng nhịp, hoặc trễ dưới 1,3 lần | Đơn ổn định, vẫn mở app |
| Vàng - chớm trượt | Trễ 1,3–2 lần nhịp quen | Đơn nhỏ lại hoặc ngừng đọc tin |
| Đỏ - nguy cơ cao | Trễ trên 2 lần nhịp quen | Đơn teo + im ắng mọi kênh |

Cái hay của bảng này: mỗi mức tương đối với *chính khách đó*. "60 ngày im lặng" là báo động đỏ với quán cà phê khách ghé mỗi sáng, nhưng hoàn toàn bình thường với cửa hàng nội thất khách mua vài năm một lần. Đừng mượn ngưỡng của ngành khác - để dữ liệu của bạn tự định nhịp.

## Dựa lưng vào RFM và cohort - bạn đã có sẵn nền móng

Bạn không phải xây churn prediction từ con số không. Hai công cụ quen thuộc đã làm sẵn nửa việc.

**RFM** (Recency, Frequency, Monetary - phân khúc khách theo lần mua gần nhất, tần suất và số tiền chi) chính là cỗ máy bật cờ nguy cơ. Chiều **Recency** rớt điểm là tín hiệu sớm số một; chiều **Frequency** đi xuống là số hai. Nhóm **At-Risk** (khách từng giá trị cao đang trượt đi) trong RFM về bản chất *là* danh sách khách nguy cơ cao - chỉ cần đặt tên khác. Nếu bạn đã đọc [bài về RFM](/blog/rfm-segmentation/), bạn đã nắm 70% của churn prediction mà không hay.

**Cohort** trả lời câu bổ sung: khách thường rời vào *giai đoạn nào* của vòng đời? Đường cong giữ chân trong [bài cohort retention](/blog/cohort-retention-pmf/) cho thấy "khúc rơi" tập trung ở tháng 2–3 chẳng hạn - vậy thì hãy bật cờ sớm cho mọi khách *sắp* chạm mốc đó, thay vì chờ từng người trượt rồi mới biết. Cohort cho bạn biết *khi nào* nên cảnh giác; RFM cho bạn biết *ai* đang trượt.

## Hành động: cờ đỏ vô dụng nếu không ai làm gì

Dự đoán mà không hành động chỉ là một bảng tính buồn. Mỗi mức nguy cơ phải gắn với một việc cụ thể - và quan trọng hơn, gắn với *giá trị* của khách.

| Tín hiệu sớm | Khách giá trị cao | Khách giá trị thấp |
|---|---|---|
| Vàng - chớm trễ nhịp | Tin nhắn cá nhân "lâu không gặp", gợi món quen | Đưa vào luồng nhắc tự động, chi phí thấp |
| Đỏ - trễ nặng + im ắng | Gọi điện / ưu đãi win-back có chọn lọc | Một lần đánh thức rẻ, không được thì buông |
| Đơn teo dần | Hỏi thẳng lý do, gợi gói phù hợp hơn | Theo dõi, chưa cần can thiệp |

Nguyên tắc: **dồn công sức giữ chân theo giá trị khách, không theo độ ồn của cảnh báo.** Một khách nhỏ lẻ bật cờ đỏ không đáng để bạn gọi điện; một khách Champions chớm vàng thì đáng một tin nhắn ngay hôm nay.

## Ba cái bẫy khiến churn prediction phản tác dụng

- **Tốn ưu đãi cho người dù sao cũng ở lại.** Nhiều mô hình "thưởng" cho khách trung thành một voucher giảm giá vì sợ họ rời - trong khi họ chẳng định đi đâu cả. Bạn vừa cho không một khoản lời, lại dạy khách quen chờ sale.
- **Đuổi theo khách không đáng giữ.** Không phải ai rời cũng đáng kéo lại. Một khách chuyên săn mã giảm giá, mua một lần rồi biến mất, thì để họ đi còn lời hơn là đốt tiền win-back.
- **Không định nghĩa "rời" trước khi đo.** Đây là cái bẫy âm thầm nhất. "Rời" với app giao đồ ăn là 14 ngày không đặt; với tiệm vàng có khi là 18 tháng. Chốt định nghĩa *trước*, bằng dữ liệu của bạn - nếu không, mọi con số phía sau đều vô nghĩa.

> Quy tắc vàng: định nghĩa "rời" rõ ràng *trước khi* đo, và chỉ giữ những khách mà việc giữ thật sự sinh lời. Dự đoán giỏi mà nhắm sai người thì chỉ tốn tiền nhanh hơn.

## Churn prediction với Semantix

Semantix không phải một chatbot cắm vào database rồi đoán bừa khách nào sắp rời. Bạn kết nối dữ liệu một lần, định nghĩa "khách hàng", "đơn hàng", "nhịp mua" trong Semantic Layer, rồi hỏi thẳng bằng tiếng Việt:

> **"Liệt kê khách giá trị cao có nhịp mua đang giãn gấp đôi bình thường trong 90 ngày qua, kèm lần mua gần nhất."**

Semantix hiểu đây là một bài toán dự đoán khách rời, tự tính nhịp mua riêng cho từng khách, so với ngưỡng, và trả về đúng danh sách cần gọi điện *tuần này* - không cần SQL, không cần dựng model. Bạn biến dữ liệu đã có thành một chiếc chuông báo sớm, thay vì một bản cáo phó cuối tháng.

Nếu muốn nối churn prediction với bức tranh tăng trưởng toàn cục - bao nhiêu khách mới bù được bao nhiêu khách rời - hãy đọc thêm [Growth Accounting](/blog/growth-accounting/).

## Tóm lại

| Nếu bạn chỉ nhìn... | Bạn sẽ... | Có churn prediction, bạn... |
|---|---|---|
| Báo cáo khách đã rời | Đọc cáo phó, không cứu được ai | Thấy cờ đỏ khi vẫn còn kịp giữ |
| Một ngưỡng cứng cho mọi khách | Báo nhầm khách mua thưa tự nhiên | Đo theo nhịp riêng của từng khách |
| Cảnh báo to nhất | Đốt tiền vào khách không đáng giữ | Dồn sức theo giá trị, không theo độ ồn |

Khách hiếm khi dứt áo ra đi trong một khoảnh khắc. Họ trượt dần - và mỗi bước trượt để lại một dấu vết trong dữ liệu của bạn. Churn prediction chỉ là việc đọc dấu vết đó *sớm hơn một nhịp* so với đối thủ.

> Mental model: rời đi là một đường dốc, không phải một cú nhảy vực. Việc của bạn không phải vớt người đã rơi - mà là dựng lan can trước khi họ trượt tới mép.

---

*Muốn biết ai trong tệp khách đang âm thầm giãn nhịp mua? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại danh sách khách nguy cơ - không cần SQL, không cần model.*
