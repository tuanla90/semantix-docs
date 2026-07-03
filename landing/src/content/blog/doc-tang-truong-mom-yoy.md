---
title: "Đọc tăng trưởng đúng cách: MoM, YoY và những cái bẫy số liệu"
code: "pt-008"
description: "Tháng này bạn khoe tăng 30% so tháng trước. Nhưng so cùng kỳ năm ngoái, bạn đang tụt. Cùng một dữ liệu, hai con số ngược nhau - đọc sao cho đúng?"
pubDate: 2026-01-12
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/doc-tang-truong-mom-yoy.png"
coverAlt: "Hai mũi tên tăng trưởng: MoM đi lên ảo, YoY đi xuống thật, trên cùng một bộ dữ liệu mùa vụ"
---

Tháng Ba, bạn mở dashboard lên và mỉm cười: doanh thu **tăng 30% so với tháng trước**. Bạn nhắn cả nhóm: "Quý này bùng nổ rồi anh em." Ai cũng vỗ tay.

Nhưng có một con số khác bạn chưa nhìn tới. Tháng Ba năm *ngoái*, cửa hàng bạn còn bán nhiều hơn tháng Ba năm nay 8%. Nghĩa là: so với tháng trước thì tăng vọt, nhưng so với chính mình một năm về trước thì bạn đang *đi lùi*.

Đây là nghịch lý ít người chịu tin: **cùng một bộ dữ liệu có thể vừa "tăng 30%" vừa "giảm 8%" - cả hai con số đều đúng.** Chúng chỉ đang đo hai thứ khác nhau. Và nếu bạn không biết mình đang đọc con số nào, bạn sẽ ăn mừng đúng vào lúc đáng lẽ phải lo.

Tin tốt: phân biệt được hai cách đọc tăng trưởng là kỹ năng học trong mười phút - và nó cứu bạn khỏi cả một họ những lần ra quyết định sai.

## Hai cách so sánh: MoM và YoY

Mọi con số "tăng trưởng" đều là một phép so sánh: kỳ này so với *một kỳ gốc nào đó*. Đổi cái mốc gốc, con số đổi theo. Có hai mốc thông dụng nhất:

- **MoM** (Month-over-Month - so với *tháng liền trước*): tháng Ba so tháng Hai. Nó đo nhịp ngắn hạn, phản ứng nhanh, hợp để theo dõi từng tuần từng tháng.
- **YoY** (Year-over-Year - so với *cùng kỳ năm trước*): tháng Ba năm nay so tháng Ba năm ngoái. Nó đo xu hướng dài hạn, và quan trọng nhất, nó *triệt tiêu mùa vụ*.

**Mùa vụ** (*seasonality* - quy luật lên xuống lặp lại theo lịch trong năm: Tết, hè, mùa tựu trường, ngày sale đôi 11/11) chính là thủ phạm đứng sau cái nghịch lý ở đầu bài. Và cách MoM xử lý mùa vụ là khác hẳn YoY.

## Bẫy 1: MoM bị mùa vụ đánh lừa

Hãy hình dung một shop bánh kẹo ở Hà Nội. Doanh thu của họ không phải một đường thẳng - nó có nhịp: vọt lên sát Tết, rồi rơi mạnh ngay sau Tết, ổn định giữa năm. Đây là một bộ số *ví dụ minh hoạ* (đơn vị: triệu đồng):

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="8" y="24" fill="#475569" font-size="15" font-weight="700">Doanh thu shop bánh kẹo qua các tháng (số minh hoạ)</text>
  <line x1="50" y1="230" x2="650" y2="230" stroke="#334155" stroke-width="1.5"/>
  <!-- bars: Dec, Jan(Tet), Feb(after Tet), Mar -->
  <rect x="80" y="150" width="80" height="80" rx="4" fill="#475569"/>
  <text x="120" y="250" fill="#94A3B8" font-size="12" text-anchor="middle">T12</text>
  <text x="120" y="142" fill="#94A3B8" font-size="12" text-anchor="middle" font-weight="700">600</text>
  <rect x="200" y="60" width="80" height="170" rx="4" fill="#34D399"/>
  <text x="240" y="250" fill="#94A3B8" font-size="12" text-anchor="middle">T1 (Tết)</text>
  <text x="240" y="52" fill="#34D399" font-size="12" text-anchor="middle" font-weight="700">1300</text>
  <rect x="320" y="180" width="80" height="50" rx="4" fill="#F87171"/>
  <text x="360" y="250" fill="#94A3B8" font-size="12" text-anchor="middle">T2 (sau Tết)</text>
  <text x="360" y="172" fill="#F87171" font-size="12" text-anchor="middle" font-weight="700">450</text>
  <rect x="440" y="155" width="80" height="75" rx="4" fill="#22D3EE"/>
  <text x="480" y="250" fill="#94A3B8" font-size="12" text-anchor="middle">T3</text>
  <text x="480" y="147" fill="#22D3EE" font-size="12" text-anchor="middle" font-weight="700">585</text>
  <!-- MoM annotations -->
  <text x="240" y="285" fill="#F87171" font-size="13" font-weight="700" text-anchor="middle">T2 so T1: MoM -65% (hoảng loạn?)</text>
  <text x="480" y="285" fill="#22D3EE" font-size="13" font-weight="700" text-anchor="middle">T3 so T2: MoM +30% (bùng nổ?)</text>
  <text x="340" y="310" fill="#64748B" font-size="12" text-anchor="middle">Cả hai đều là mùa vụ - không phải xu hướng. Cần YoY để biết thật.</text>
</svg>
<div class="viz-caption">MoM nhảy múa theo mùa vụ: sau Tết rơi 65% là chuyện năm nào cũng vậy, T3 nhích 30% cũng vậy. Bản thân các con số MoM này không nói lên doanh nghiệp đang tốt hay xấu.</div>
</div>

Nhìn riêng MoM, bạn sẽ phát điên. Tháng Hai rơi 65% so tháng Một - sa thải gấp? Tháng Ba nảy lại 30% so tháng Hai - tuyển thêm gấp? **Không.** Đó chỉ là cái nhịp Tết lặp lại y hệt mọi năm. MoM đang đo *mùa vụ*, không phải *sức khỏe doanh nghiệp*.

Đây là lúc YoY cứu bạn. Muốn biết tháng Ba năm nay thực sự tốt hay xấu, đừng so nó với tháng Hai - hãy so với **tháng Ba năm ngoái**, khi mùa vụ ở đúng cùng một vị trí. Tháng Ba so tháng Ba, Tết so Tết, mùa hè so mùa hè. Khi hai kỳ ở cùng pha mùa vụ, phần chênh lệch còn lại mới là tăng trưởng thật.

> Quy tắc vàng: nếu việc kinh doanh của bạn có mùa vụ rõ rệt - và gần như mọi SME Việt đều có vì Tết - thì **MoM dùng để theo dõi nhịp, còn YoY mới dùng để kết luận xu hướng.** Đừng bao giờ ăn mừng hay hoảng loạn chỉ vì một con số MoM.

## Bẫy 2: nền nhỏ làm phần trăm phồng to

Tháng trước kênh Zalo của bạn có 2 đơn. Tháng này có 4 đơn. MoM **+100%**! Bạn ghi vào báo cáo: "Zalo tăng trưởng gấp đôi."

Đúng về số học, nhưng cái **nền** (*base* - con số gốc bạn lấy làm mốc để so) chỉ là 2. Một thay đổi tí xíu - đúng *hai* đơn hàng - biến thành một phần trăm khổng lồ. Khi nền nhỏ, phần trăm thay đổi luôn phồng lên một cách lừa mắt: từ 1 lên 3 là "+200%", từ 2 lên 6 cũng "+200%".

Cái bẫy này nguy nhất với **sản phẩm mới hoặc kênh mới** - đúng lúc nền còn bé tí. Một dòng sản phẩm vừa lên kệ "tăng 300% tuần này" nghe như hiện tượng, nhưng có khi chỉ là từ 3 đơn lên 12. Cách tự vệ gói trong một câu hỏi: *"Tăng 100% - nhưng từ bao nhiêu lên bao nhiêu?"* Nếu người báo cáo né con số tuyệt đối, gần như chắc chắn nền đang nhỏ. Đây cũng là một biến thể của những cái bẫy trong [Growth Accounting](/blog/growth-accounting/): một con số phần trăm gộp luôn giấu đi quy mô thật bên dưới.

## Bẫy 3: "tăng 5%" - là phần trăm hay điểm phần trăm?

Tỷ lệ chuyển đổi của bạn YoY đi từ 10% lên 12%. Bạn viết "tăng 2%". Người đọc hiểu là "nhích tí xíu, gần như không đổi". Nhưng thật ra tỷ lệ đã to lên một phần năm.

Khi bạn so sánh hai *tỷ lệ phần trăm* qua thời gian, đừng nói tắt. Trừ thẳng hai tỷ lệ (12% - 10%) cho ra **+2 điểm phần trăm**; còn so phần tăng thêm với nền (2 ÷ 10) cho ra **+20%**. Đây là chỗ MoM/YoY hay vấp nhất, vì các chỉ số kiểu tỷ lệ chốt, tỷ lệ hoàn, biên lợi nhuận đều là phần trăm. Lẫn lộn "điểm" với "phần trăm" là đủ để cả phòng họp hiểu sai mức độ. Chuyện này đủ rắc rối để có hẳn một bài riêng: [phần trăm vs điểm phần trăm](/blog/phan-tram-vs-diem-phan-tram/).

## Bẫy 4: tăng trưởng kép - 10% mỗi tháng KHÔNG phải 120% một năm

Đây là cái bẫy gây sốc nhất khi bạn lần đầu nhìn ra. Sản phẩm mới của bạn tăng đều **10% mỗi tháng**. Cả năm 12 tháng, vậy là tăng 10 × 12 = 120% đúng không?

Không. Nó tăng khoảng **214%** - hơn gấp ba lần một năm trước, không phải gấp đôi.

Lý do: tăng trưởng *gộp lãi vào nền*. Tháng sau, 10% được tính trên cái nền đã lớn hơn của tháng trước, chứ không phải nền ban đầu. Bắt đầu từ 100: tháng 1 thành 110, tháng 2 là 110 × 1,1 = 121, cứ thế nhân dồn. Sau 12 tháng: 100 × 1,1¹² ≈ **314** - tức là *to lên 214%* so với mốc đầu.

| Cách tính | Phép tính | Kết quả sau 12 tháng |
|---|---|---|
| Cộng dồn ngây thơ (sai) | 10% × 12 tháng | tưởng +120% |
| Tăng trưởng kép (đúng) | 1,1 mũ 12 | thực ra ≈ +214% |

Con số dùng để mô tả nhịp gộp này là **CMGR** (Compound Monthly Growth Rate - tốc độ tăng trưởng kép *theo tháng*); người anh em theo năm của nó là **CAGR** (Compound Annual Growth Rate - tốc độ tăng trưởng kép *theo năm*). Cả hai đều là cách gọi một con số: *"trung bình mỗi kỳ tăng đều bao nhiêu phần để đi từ điểm đầu tới điểm cuối"*. Đây là **tăng trưởng kép** (*compound growth* - tăng trưởng mà mỗi kỳ tính lãi trên kết quả tích lũy của kỳ trước, giống lãi kép gửi ngân hàng).

Vì sao bạn cần nhớ điều này? Vì nó cắt cả hai chiều. Chiều vui: tăng đều 10%/tháng mạnh hơn nhiều so với cảm giác. Chiều buồn: khi ai đó hứa "mỗi tháng tăng 15%, cuối năm gấp ba", hãy bấm máy tính - họ đang *hứa ít hơn* hoặc *nói nhầm cách tính*. Đừng cộng các phần trăm tăng trưởng lại với nhau như cộng tiền.

## Bẫy 5: chọn mốc gốc tiện lợi để khoe

Cái bẫy cuối cùng không phải lỗi tính toán - nó là lỗi *thành thật*. Vì mọi con số tăng trưởng đều phụ thuộc vào mốc gốc, nên ai muốn khoe chỉ cần khéo chọn mốc.

"Doanh thu tăng 80% kể từ đáy tháng Hai!" - nghe đỉnh, cho đến khi bạn nhận ra tháng Hai là đáy sau Tết, so với đáy thì cái gì cũng tăng. "Gấp đôi so với cùng kỳ 2021!" - nhưng 2021 là năm giãn cách, gần như mọi shop đều chạm đáy. Chọn một mốc gốc thấp bất thường, bất kỳ con số nào sau đó cũng trông như phép màu.

Liều vắc-xin: luôn hỏi *"so với cái gì, và cái mốc đó có bình thường không?"* Một con số tăng trưởng trung thực thường đi kèm cả hai đầu - "từ X lên Y" - chứ không chỉ khoe phần trăm. Khi cả nền lẫn đích đều bày ra, không ai dối được.

## Vậy khi nào dùng MoM, khi nào dùng YoY?

Hai con số không cạnh tranh nhau - chúng trả lời hai câu hỏi khác nhau. Đây là bảng đối chiếu cho cùng một bộ dữ liệu shop bánh kẹo ở trên:

| Tình huống | Nên đọc | Vì sao |
|---|---|---|
| Sản phẩm/kênh mới ra, nền còn nhỏ | **MoM** | Chưa có "cùng kỳ năm ngoái" để so; cần nhịp nhanh |
| Theo dõi ngắn hạn, phát hiện bất thường tuần này | **MoM** | Bắt sự cố sớm, phản ứng kịp |
| Doanh nghiệp có mùa vụ (Tết, hè, sale lễ) | **YoY** | Triệt tiêu mùa vụ, thấy xu hướng thật |
| Kết luận "năm nay khá hơn năm ngoái không" | **YoY** | So cùng pha mùa vụ mới công bằng |
| Đo tốc độ tăng trưởng trung bình nhiều kỳ | **CMGR/CAGR** | Gộp lãi kép, không cộng dồn ngây thơ |

Một cách nhớ gọn: **MoM là cái đồng hồ tốc độ - cho biết ngay lúc này bạn đang chạy nhanh hay chậm. YoY là tấm bản đồ - cho biết bạn đã thật sự đi được bao xa.** Nhìn đồng hồ tốc độ để lái, nhưng nhìn bản đồ để biết mình có đang về đúng đích không.

Với những ngành mùa vụ mạnh - bánh kẹo, thời trang, du lịch, quà Tết - bạn còn nên đọc thẳng *cấu trúc mùa vụ* thay vì chỉ chữa cháy bằng YoY; chủ đề này nằm ở bài [Mùa vụ &amp; Tết: đọc seasonality](/blog/mua-vu-tet-seasonality/).

## Trong Semantix

Semantix không phải một con bot bắn ra "+30%" rồi để bạn tự đoán đó là MoM hay YoY, là điểm hay phần trăm. Ý tưởng đi ngược lại: khi bạn hỏi *"tháng này bán thế nào"*, nó trả về **cả** MoM lẫn YoY cạnh nhau, ghi rõ từng con số so với mốc nào, và bày luôn hai con số gốc ("từ X lên Y") để bạn không bao giờ ăn mừng nhầm một cú "tăng 100%" đi từ 2 lên 4.

Bạn định nghĩa "doanh thu" và "cùng kỳ" *một lần* trong Semantic Layer, rồi hỏi thẳng bằng tiếng Việt - Semantix tự biết lùi đúng 12 tháng để so YoY, tự gắn nhãn đơn vị, tự cảnh báo khi nền quá nhỏ để phần trăm có ý nghĩa. Không SQL, không lẫn mốc.

## Tóm lại

| Bạn thấy... | Phản xạ sai | Câu hỏi cứu bạn |
|---|---|---|
| MoM +30% sau Tết | Bùng nổ rồi! | Đây là xu hướng hay chỉ là mùa vụ? Đọc YoY xem |
| "Zalo tăng 100%" | Kênh ngon | Từ bao nhiêu lên bao nhiêu? Nền có nhỏ không? |
| "Tỷ lệ chốt tăng 2%" | Nhích tí xíu | Là 2 *điểm %* hay 2% tương đối? |
| "10%/tháng = 120%/năm" | Cộng dồn là xong | Tăng kép ≈ 214%, không phải 120% |
| "Tăng 80% kể từ đáy" | Quá đỉnh | So với mốc nào? Mốc đó có bình thường không? |

Mọi con số tăng trưởng có chung một gốc rễ: nó không bao giờ tự đứng một mình - nó luôn dính vào một mốc gốc và một cái nền. Đổi mốc, con số đổi. Giấu nền, con số đánh lừa. Nói rõ mình đang đọc MoM hay YoY, ghi đúng đơn vị, bày luôn cái nền - và bạn đã đi trước phần lớn người đọc số.

> Mental model: tăng trưởng giống chiều cao của một đứa trẻ. MoM là so với tháng trước - nó cao thêm tí nào tuần này. YoY là so với sinh nhật năm ngoái - nó thật sự lớn lên bao nhiêu. Còn tăng trưởng kép là lời nhắc rằng mỗi phần trăm bồi lên một thân hình đã cao hơn của lần trước, nên nó dồn nhanh hơn ta tưởng.

---

*Muốn mọi con số tăng trưởng trong báo cáo tự ghi rõ MoM/YoY, đơn vị và cái nền - hết chuyện đọc lệch? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
