---
title: "Anomaly detection: tự phát hiện bất thường doanh thu trước khi quá muộn"
code: "pt-009"
description: "Chờ tới cuối tháng xem báo cáo thì sự cố đã xảy ra cả tuần. Anomaly detection lật ngược thứ tự: máy canh số, bạn chỉ ra tay khi có bất thường thật."
pubDate: 2025-08-28
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/anomaly-detection.png"
coverAlt: "Đường doanh thu ổn định trong dải bình thường với một đỉnh đỏ vọt ra ngoài ngưỡng kèm chuông cảnh báo"
---

Cuối tháng, bạn ngồi xuống mở báo cáo. Mọi thứ gọn gàng, đẹp đẽ - trừ một dòng: doanh thu kênh TikTok Shop **tụt 35%** so với tháng trước. Bạn dò lại thì phát hiện cái pixel theo dõi đơn hàng đã hỏng từ *ngày mùng 6*. Tức là suốt **ba tuần**, mỗi đồng quảng cáo bạn đổ vào đó đã chảy xuống cống mà không ai hay. Báo cáo cuối tháng không sai. Nó chỉ đến muộn ba tuần.

Đây là nghịch lý mà gần như mọi chủ SME đều dính ít nhất một lần: **báo cáo định kỳ luôn kể cho bạn nghe một câu chuyện đã kết thúc.** Bạn không cần biết "tháng vừa rồi có gì bất thường" - bạn cần biết *ngay hôm sự cố bắt đầu*. Và đó chính là việc của **anomaly detection** (phát hiện bất thường - kỹ thuật tự động nhận ra điểm số liệu lệch hẳn so với thường lệ).

## Vì sao mắt người luôn thua trong cuộc canh số

Chủ shop nào cũng nghĩ mình "để mắt tới số" mỗi ngày. Nhưng hãy thành thật: bạn có *bao nhiêu* con số phải canh? Doanh thu từng kênh, số đơn, tỷ lệ hoàn, tồn kho từng SKU (Stock Keeping Unit - mã định danh từng loại hàng), chi phí ads từng chiến dịch... Cộng lại có khi hàng trăm con số nhảy mỗi ngày. Mắt người không thể quét hết - và càng không thể nhớ "hôm qua con số này ở mức nào để hôm nay biết nó có lệch không".

**Phát hiện bất thường** lật ngược thế trận. Thay vì bạn ngồi soi từng cột, máy soi *liên tục* cả trăm con số cùng lúc, và **chỉ gọi bạn khi có cái gì đó thật sự lệch khỏi thường lệ**. Bạn chuyển từ vai *người gác đêm phải thức trắng* sang vai *người được đánh thức khi có trộm*.

Ý tưởng nghe như công nghệ cao, nhưng cốt lõi của nó là một câu hỏi rất đời: *"Con số này hôm nay có nằm trong khoảng nó vẫn thường nằm không?"*

## Bước 1: dựng "dải bình thường" trước khi bắt bất thường

Bạn không thể biết cái gì là *bất thường* nếu chưa định nghĩa cái gì là *bình thường*. Đây là bước ai cũng bỏ qua, rồi than "cảnh báo loạn xạ".

Hãy nhìn lại 8-12 tuần gần nhất của một chỉ số. Bạn sẽ thấy nó không đứng yên - nó nhấp nhô lên xuống. Khoảng nhấp nhô quen thuộc đó gọi là **dải bình thường** (vùng dao động mà chỉ số vẫn thường xuyên rơi vào). Đường giữa dải là mức nền trung bình; mép trên và mép dưới là **ngưỡng** (lằn ranh: vượt qua thì coi là đáng chú ý).

Đây chính là nơi [tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/) gặp anomaly detection. Phần lớn dao động hằng ngày chỉ là **nhiễu** - số nhúc nhích vì hàng trăm chuyện vặt ngẫu nhiên, *không mang thông tin gì*. Một con số rơi 8% nhưng vẫn nằm gọn trong dải thì không phải bất thường, đó là cơ thể đang thở bình thường. Bất thường thật là khi con số **vọt hẳn ra ngoài dải** - đó mới là tín hiệu.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <rect x="60" y="120" width="560" height="110" fill="#1E293B" opacity="0.5"/>
  <line x1="60" y1="120" x2="620" y2="120" stroke="#475569" stroke-width="1" stroke-dasharray="5 4"/>
  <line x1="60" y1="230" x2="620" y2="230" stroke="#475569" stroke-width="1" stroke-dasharray="5 4"/>
  <line x1="60" y1="175" x2="620" y2="175" stroke="#22D3EE" stroke-width="2"/>
  <text x="626" y="124" fill="#64748B" font-size="11">ngưỡng trên</text>
  <text x="626" y="179" fill="#22D3EE" font-size="11" font-weight="700">nền</text>
  <text x="626" y="234" fill="#64748B" font-size="11">ngưỡng dưới</text>
  <line x1="60" y1="40" x2="60" y2="300" stroke="#94A3B8" stroke-width="2"/>
  <line x1="60" y1="300" x2="620" y2="300" stroke="#94A3B8" stroke-width="2"/>
  <text x="14" y="48" fill="#64748B" font-size="12">Doanh thu</text>
  <text x="500" y="324" fill="#64748B" font-size="12">ngày →</text>
  <polyline points="85,170 130,195 175,155 220,205 265,165 310,200 355,158 400,198 445,162 490,192 540,168" fill="none" stroke="#94A3B8" stroke-width="2.5"/>
  <circle cx="85" cy="170" r="4" fill="#94A3B8"/>
  <circle cx="130" cy="195" r="4" fill="#94A3B8"/>
  <circle cx="175" cy="155" r="4" fill="#94A3B8"/>
  <circle cx="220" cy="205" r="4" fill="#94A3B8"/>
  <circle cx="265" cy="165" r="4" fill="#94A3B8"/>
  <circle cx="310" cy="200" r="4" fill="#94A3B8"/>
  <circle cx="355" cy="158" r="4" fill="#94A3B8"/>
  <circle cx="400" cy="198" r="4" fill="#94A3B8"/>
  <circle cx="445" cy="162" r="4" fill="#94A3B8"/>
  <circle cx="490" cy="192" r="4" fill="#94A3B8"/>
  <line x1="540" y1="168" x2="585" y2="278" stroke="#F87171" stroke-width="2.5"/>
  <circle cx="585" cy="278" r="7" fill="#F87171"/>
  <text x="470" y="296" fill="#F87171" font-size="13" font-weight="700">BẤT THƯỜNG</text>
  <text x="150" y="100" fill="#94A3B8" font-size="13" font-weight="600">dao động trong dải bình thường = nhiễu</text>
</svg>
<div class="viz-caption">Ví dụ minh họa. Đường xám nhấp nhô trong dải bình thường mỗi ngày - đó là nhiễu, không cần báo. Chỉ điểm đỏ vọt qua ngưỡng dưới mới là bất thường thật, đáng để gọi bạn dậy.</div>
</div>

## Bước 2: phân biệt bất thường THẬT với báo động giả

Đây là chỗ phần lớn người làm anomaly detection *thất bại*. Nếu bạn đặt ngưỡng quá nhạy - cứ lệch 5% là báo - thì mỗi ngày bạn nhận chục cái cảnh báo về những dao động vô nghĩa. Đó là **báo động giả** (false positive - cảnh báo nổ ra trong khi thực ra mọi thứ vẫn bình thường). Chỉ sau ba ngày, bạn sẽ tắt thông báo. Và thế là cái lần cháy hàng thật, bạn cũng không nhận được tin.

Ngược lại, ngưỡng quá lỏng thì bỏ sót bất thường thật. Nghệ thuật nằm ở chỗ chỉnh ngưỡng tới mức: *"nếu cái này nổ ra, tôi thật sự phải xử lý ngay hôm nay."*

| Tình huống | Báo động giả (bỏ qua được) | Bất thường thật (xử lý ngay) |
|---|---|---|
| Doanh thu ngày | Lệch 6%, vẫn trong dải quen thuộc | Tụt 40% so với cùng thứ trong tuần |
| Đơn hoàn | Tăng từ 5 lên 7 đơn | Vọt từ 5 lên 60 đơn một buổi sáng |
| Một SKU | Bán nhỉnh hơn vài cái | Cháy sạch kho trong 2 giờ giữa đợt sale |
| Chi phí ads | Nhích lên 8% theo đấu giá | Nhảy gấp 3 lần qua một đêm |

Mẹo thực dụng: đừng so con số hôm nay với *hôm qua* (dễ dính nhiễu cuối tuần). Hãy so với **cùng thứ trong tuần trước** hoặc cùng kỳ - để các dao động lặp lại tự triệt tiêu nhau.

## Bước 3: cẩn thận với mùa vụ - kẻo bắt nhầm "bất thường" giả

Có một loại bất thường *trông như thật mà không phải thật*: mùa vụ. Doanh thu cuối tuần luôn cao hơn giữa tuần. Ngày đôi (9/9, 10/10, 11/11) trên sàn luôn vọt. Và **Tết** thì bóp méo mọi con số - cao điểm trước Tết, tụt sâu trong Tết, hồi phục chậm sau Tết.

Nếu hệ thống của bạn ngây thơ so "tuần trong Tết" với "tuần cận Tết", nó sẽ la làng rằng công ty đang sụp - trong khi đó chỉ là nhịp Tết bình thường năm nào cũng có. Một bộ phát hiện bất thường tử tế phải **học được mùa vụ**: nó biết thứ Bảy thường cao, biết ngày đôi thường vọt, nên không coi đó là sự kiện lạ. Cách đơn giản nhất để né bẫy này: luôn đối chiếu theo *cùng kỳ năm ngoái* hoặc cùng vị trí trong chu kỳ, thay vì so với điểm liền trước.

## Bước 4: biến phát hiện thành hành động - cảnh báo realtime

Phát hiện được bất thường mà thông tin nằm im trong dashboard thì cũng vô dụng - vì sự cố không chọn ngày bạn rảnh để mở app. Mảnh ghép cuối cùng là **đẩy cảnh báo thẳng vào tay bạn**, ngay lúc nó xảy ra.

Đây là lúc anomaly detection bắt tay với [báo cáo tự động qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/). Khác biệt cốt lõi: báo cáo định kỳ là tiếng tích tắc đều đặn - gửi mỗi sáng *dù có chuyện hay không*. Cảnh báo bất thường là tiếng chuông báo cháy - **hiếm khi kêu, nên mỗi lần kêu bạn phải bật dậy**. Một tin nhắn realtime kiểu *"⚠️ Doanh thu TikTok Shop đến 11h sáng nay mới bằng 28% cùng kỳ tuần trước - kiểm tra ngay pixel theo dõi đơn"* đáng giá hơn cả một báo cáo cuối tháng dài 10 trang.

> Quy tắc vàng: giá trị của một cảnh báo tỷ lệ nghịch với tần suất nó kêu. Đừng để cái chuông báo cháy reo mỗi giờ - nếu không bạn sẽ tự tay tháo pin nó ra, đúng vào hôm có cháy thật.

## Phát hiện bất thường trong Semantix

Bạn không cần dựng biểu đồ kiểm soát thủ công hay viết công thức thống kê. Trong Semantix, bạn mô tả mong muốn bằng tiếng Việt - quy trình ba bước:

1. **Chỉ ra con số cần canh:** "Theo dõi doanh thu từng kênh và tỷ lệ hoàn hàng mỗi ngày." Semantix tự dựng dải bình thường từ lịch sử của bạn, có tính tới mùa vụ và ngày đôi.
2. **Đặt mức nhạy:** chọn "chỉ báo khi lệch hẳn ra ngoài dải" thay vì báo mọi dao động - để né báo động giả.
3. **Chọn nơi nhận:** dán kênh Telegram hoặc nhóm Zalo. Từ đó, máy canh thay bạn 24/7.

Điểm khác biệt: đây không phải một con bot kêu mỗi khi số nhúc nhích. Nó chạy trên cùng định nghĩa nghiệp vụ với mọi câu hỏi khác của bạn - nên "doanh thu" trong cảnh báo đúng bằng "doanh thu" trên dashboard, và nó chỉ làm phiền bạn khi *thật sự đáng phiền*.

## Tóm lại

| Cách cũ (chờ báo cáo) | Cách mới (anomaly detection) |
|---|---|
| Biết sự cố sau cả tuần, có khi cả tháng | Biết ngay ngày nó bắt đầu |
| Mắt người soi vài con số, bỏ sót phần lớn | Máy soi cả trăm con số liên tục |
| Báo mọi dao động → spam → tắt thông báo | Chỉ báo khi vượt ngưỡng → mỗi lần đều đáng |
| Nhầm nhịp Tết thành "công ty sụp" | Học mùa vụ, không báo động giả |

> **Mental model:** anomaly detection là người bảo vệ giỏi nhất không phải người tuần tra liên tục, mà là người ngồi yên trong phòng camera - thuộc lòng cảnh "bình thường" tới mức chỉ cần một khung hình lệch là bật dậy. Việc của bạn không phải nhìn mọi con số, mà là dạy cho hệ thống biết thế nào là bình thường, rồi để nó gọi bạn khi có bất thường thật.

---

*Đừng để sự cố tiếp theo nằm im ba tuần trong một bản báo cáo chưa ai mở. [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
