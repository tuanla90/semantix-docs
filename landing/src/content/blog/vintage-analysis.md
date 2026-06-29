---
title: "Vintage analysis: đọc chất lượng theo 'lứa' - từ khoản vay tới lứa khách hàng"
code: "pt-010"
description: "Lứa khách tháng này trả góp đúng hạn hơn lứa năm ngoái. Vậy mà nhìn tổng nợ xấu lại tưởng đang tệ đi. Vintage analysis gỡ đúng nghịch lý đó."
pubDate: 2025-11-14
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/vintage-analysis.svg"
coverAlt: "Nhiều đường lứa theo tháng phát hành so ở cùng mốc tuổi đời"
---

Bạn mở báo cáo cuối quý của một công ty mua trả góp. Tổng tỷ lệ nợ xấu (tỷ lệ khoản vay quá hạn không đòi được) tháng này là 5,2% - cao hơn 4,1% quý trước. Phản xạ đầu tiên: "Chất lượng khách đang xuống, siết duyệt lại ngay."

Nhưng nếu tách các khoản vay theo **tháng giải ngân** rồi soi từng nhóm ở *cùng một độ tuổi đời*, bạn thấy điều ngược lại: lứa giải ngân tháng này, sau 3 tháng, chỉ hỏng 1,8% - tốt hơn hẳn lứa năm ngoái từng hỏng 2,9% ở cùng mốc. Chất lượng khách *đang tốt lên*, không phải xấu đi. Con số tổng 5,2% cao chỉ vì những lứa cũ - đã sống đủ lâu để bộc lộ hết nợ xấu - vẫn đè nặng lên mẫu số.

Đây là nghịch lý ít người chịu tin: **lứa mới có thể đang tốt hơn lứa cũ, mà nhìn con số tổng lại tưởng cả danh mục đang tệ đi.** Công cụ gỡ đúng cái bẫy này tên là **vintage analysis** (tạm dịch: *phân tích theo lứa*).

## Vintage analysis là gì - và vì sao dân tài chính nghĩ ra nó trước

**Vintage analysis (phân tích theo lứa)** là cách nhóm các đối tượng theo *thời điểm chúng hình thành*, rồi so sánh chất lượng của từng nhóm ở **cùng một tuổi đời**. Mỗi nhóm như vậy gọi là một **lứa** (*vintage* - như rượu vang đánh theo năm nho: lứa 2021, lứa 2022). **Tuổi đời** (*age* - số tháng đã trôi qua kể từ khi lứa đó hình thành) là trục so sánh công bằng giữa các lứa.

Khái niệm này ra đời từ ngành cho vay. Công ty tài chính tiêu dùng không thể chờ một khoản vay 36 tháng đáo hạn rồi mới biết nó tốt hay xấu - chậm mất ba năm. Họ gom mọi khoản giải ngân cùng một tháng thành một lứa, đo tỷ lệ nợ xấu tại các mốc **3, 6, 12 tháng tuổi**, rồi đặt các lứa cạnh nhau ở *cùng mốc tuổi*. Cách đó cho thấy chất lượng phê duyệt đang lên hay xuống - nhiều tháng trước khi con số tổng kịp phản ánh.

## Vì sao con số tổng luôn nói dối ở đây

Lý do nằm ở một bất đối xứng đơn giản: **lứa cũ đã có thời gian để hỏng, lứa mới thì chưa.** Một khoản vay tháng trước gần như chưa kịp quá hạn - còn quá trẻ. Một khoản 18 tháng tuổi thì đã đi qua đủ mọi cú sốc: mất việc, Tết tiêu lố, ốm đau. Cộng tất cả thành một tỷ lệ nợ xấu tổng, bạn đang trộn trẻ sơ sinh với người trung niên rồi than "dân số này ốm yếu quá". Tệ hơn, nếu lứa cũ lại đông thì chúng càng kéo lệch con số tổng, nhấn chìm tiếng nói của các lứa mới tuy tốt hơn nhưng còn non.

Đó là lý do bạn cần một cái bảng tách bạch theo *cả lứa lẫn tuổi đời* - gọi là **ma trận lứa × tuổi đời** (vintage table):

| Lứa giải ngân | 3 tháng | 6 tháng | 9 tháng | 12 tháng |
|---|---|---|---|---|
| T1/2026 | 2,9% | 4,4% | 5,6% | 6,3% |
| T4/2026 | 2,5% | 3,9% | 5,0% | - |
| T7/2026 | 2,1% | 3,3% | - | - |
| T10/2026 | 1,8% | - | - | - |

*Tỷ lệ nợ xấu tích lũy theo lứa (số minh họa).* Đọc theo **hàng**: một lứa hỏng nặng dần khi già đi - chuyện đương nhiên. Đọc theo **cột** mới là nơi sự thật lộ ra: ở mốc 3 tháng, lứa T1 hỏng 2,9% còn lứa T10 chỉ 1,8%. Cùng tuổi đời, lứa mới *tốt hơn rõ rệt*. Chất lượng phê duyệt đang lên - dù tổng danh mục, nặng vì các lứa cũ ở cột phải, trông vẫn xấu đi.

> Quy tắc vàng: **luôn so các lứa ở cùng một cột tuổi đời.** So lứa 12 tháng tuổi với lứa 3 tháng tuổi rồi kết luận "lứa cũ tệ hơn" cũng vô lý như chê đứa trẻ 3 tuổi vì nó thấp hơn người 30 tuổi.

Nhìn ma trận thành đường thì rõ hơn nữa: mỗi lứa là một đường, trục ngang là tuổi đời. Lứa mới nằm *thấp hơn* (ít nợ xấu hơn) ở mọi mốc tuổi - đó là dấu hiệu một danh mục đang khỏe lên:

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["3 tháng","6 tháng","9 tháng","12 tháng"],"yUnit":"%","series":[{"name":"Lứa T1/2026","values":[2.9,4.4,5.6,6.3],"color":"#ef4444","endLabel":true},{"name":"Lứa T4/2026","values":[2.5,3.9,5.0,null],"color":"#f59e0b","endLabel":true},{"name":"Lứa T7/2026","values":[2.1,3.3,null,null],"color":"#22d3ee","endLabel":true},{"name":"Lứa T10/2026","values":[1.8,null,null,null],"color":"#10b981","endLabel":true}]}'></div>
<div class="viz-caption">Mỗi đường là một lứa giải ngân, đo nợ xấu tích lũy theo tuổi đời (số minh họa). Lứa mới (xanh) nằm dưới lứa cũ (đỏ) ở cùng mốc tuổi - chất lượng đang tốt lên, dù con số tổng chưa kịp phản ánh.</div>
</div>

## Vintage analysis khác cohort retention chỗ nào

Nếu bạn đã đọc [Cohort Analysis](/blog/cohort-analysis/), bạn sẽ thấy hai thứ này là họ hàng gần - đều nhóm theo thời điểm bắt đầu, đều so ở cùng tuổi đời. Nhưng chúng trả lời hai câu hỏi khác nhau, và lẫn lộn là hỏng.

**Cohort retention** hỏi: *trong một nhóm khách, bao nhiêu phần trăm còn ở lại theo thời gian?* Nó đo độ bền của một nhóm - đường cong đi xuống vì người ta rời đi.

**Vintage analysis** hỏi: *chất lượng của các lứa đang TỐT LÊN hay XẤU ĐI theo thời điểm phát hành?* Trọng tâm không phải một lứa sống thế nào, mà là **so lứa-với-lứa** để bắt xu hướng: chính sách duyệt vay (hay chọn khách, chọn kênh) các tháng gần đây đang sinh ra lứa tốt hơn hay tệ hơn?

Nói gọn: cohort soi *vòng đời một nhóm*; vintage soi *xu hướng chất lượng giữa các nhóm*. Cùng một bảng heatmap, nhưng cohort đọc theo hàng để thấy hao mòn, còn vintage đọc theo cột để các lứa "xử nhau" ở cùng tuổi.

## Ra khỏi ngành cho vay: lứa khách của SME

Bạn không cho vay? Vintage analysis vẫn là một trong những công cụ đáng giá nhất cho SME (doanh nghiệp vừa và nhỏ) - chỉ cần đổi "khoản vay" thành "lứa khách", và "nợ xấu" thành bất kỳ chỉ số chất lượng nào bạn quan tâm.

**Lứa khách theo đợt sale.** Bạn giảm giá lớn dịp 9/9 và kéo về một lứa khách mới. Ba tháng sau, đặt lứa "9/9" cạnh lứa "khách thường ngày" ở cùng mốc 90 ngày: lứa nào mua lại nhiều hơn? Rất thường, khách săn sale có chất lượng lứa kém hẳn - mua một lần rồi biến - trong khi doanh thu tháng 9/9 đẹp long lanh che mất điều đó. Đây cũng là kiểu sự thật mà [growth accounting](/blog/growth-accounting/) phơi bày khi tách tăng trưởng thành khách mới, giữ chân và rời bỏ.

**Lứa khách theo kênh.** Lứa từ TikTok Shop và lứa từ KiotViet, soi ở cùng tuổi đời, lứa nào **hoàn đơn** nhiều hơn, lứa nào **trả góp đúng hạn** hơn? Nếu lứa một kênh đều đặn xấu hơn ở mọi mốc tuổi, bạn biết tiền marketing đang chảy nhầm chỗ - trước khi cả năm trôi qua. Cùng logic cho một đợt đổi onboarding: so lứa trước và sau ở cùng tuổi đời để biết thay đổi của bạn thật sự có tác dụng, hay chỉ là may mắn mùa vụ.

## Vintage analysis với Semantix

Trước đây, dựng một ma trận lứa × tuổi đời tử tế là việc của chuyên viên có nghề: gắn mỗi khoản vay vào đúng lứa, tính tuổi đời từng dòng, rồi pivot chéo lứa với tuổi - một câu SQL dài, sai một chỗ là lệch cả bảng.

Semantix không phải một chatbot cắm thẳng vào database rồi đoán bừa "lứa" nghĩa là gì. Bạn định nghĩa "lứa" và "chất lượng" **một lần** trong Semantic Layer - lứa theo tháng giải ngân hay tháng mua đầu? đo bằng nợ xấu hay tỷ lệ hoàn đơn? - rồi mọi câu hỏi sau đều dùng chung định nghĩa đó. Sau đó bạn hỏi thẳng bằng tiếng Việt:

> **"Phân tích theo lứa: tỷ lệ nợ xấu của các lứa giải ngân năm 2026 tại mốc 3, 6, 9, 12 tháng tuổi."**

Semantix hiểu đây là một vintage analysis, tự gắn lứa và tính tuổi đời khớp dữ liệu của bạn, rồi trả về ma trận kèm các đường lứa - không cần một dòng SQL, và không có chuyện "lứa" tháng này hiểu một kiểu, tháng sau hiểu kiểu khác.

## Tóm lại

| Nếu bạn chỉ nhìn... | Bạn sẽ tưởng... | Đọc vintage analysis, bạn thấy... |
|---|---|---|
| Nợ xấu tổng tăng | Chất lượng khách đang xuống | Lứa cũ kéo tổng; lứa mới thật ra tốt hơn |
| Doanh thu đợt sale đẹp | Đợt sale thành công | Lứa sale mua lại kém, chất lượng thấp |
| Một kênh ra nhiều đơn | Kênh đó hiệu quả | Lứa từ kênh đó hoàn đơn nhiều hơn ở mọi mốc tuổi |
| Một con số tổng duy nhất | Bức tranh đã đủ | Mỗi lứa một đường, so công bằng ở cùng tuổi đời |

Con số tổng trộn các lứa già trẻ rồi đưa bạn một mức trung bình vô nghĩa. Vintage analysis tách chúng ra, xếp theo tuổi đời, và lần đầu bạn thấy chất lượng của mình *thật sự* đang đi về đâu - theo từng lứa bạn tạo ra.

> Mental model: đừng hỏi "danh mục của tôi tốt hay xấu". Hãy hỏi "lứa tôi tạo ra tháng này có tốt hơn lứa tháng trước ở cùng tuổi đời không". Một bên là ảnh chụp mờ; một bên là cái la bàn.

---

*Muốn biết lứa khách nào của bạn đang khỏe lên và lứa nào đang xấu đi? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại ma trận lứa × tuổi đời - không cần SQL.*
