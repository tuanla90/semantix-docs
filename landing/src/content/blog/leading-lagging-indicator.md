---
title: "Leading vs lagging: vì sao nhìn doanh thu quý để lái công ty cũng như lái xe bằng gương chiếu hậu"
code: "pt-026"
series: "tu-duy-du-lieu"
seriesOrder: 6
description: "Doanh thu quý tụt là tin đã cũ - nó là hệ quả của những việc xảy ra ba tháng trước. Muốn lái được công ty, hãy đo chỉ số báo trước, không phải cái đã rồi."
pubDate: 2024-12-21
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/leading-lagging-indicator.svg"
coverAlt: "Gương chiếu hậu hiện doanh thu quý đã qua, kính chắn gió hiện tín hiệu báo trước phía trước"
---

<div class="series-nav">
  <div class="series-nav-title">🧠 Series Tư duy dựa trên dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/tu-duy-du-lieu-la-gi/">Phần 1 - Tư duy dựa trên dữ liệu là gì</a></li>
    <li><a href="/blog/bat-dau-tu-cau-hoi/">Phần 2 - Bắt đầu từ câu hỏi, không từ dữ liệu</a></li>
    <li><a href="/blog/thien-kien-trong-doc-so/">Phần 3 - Những thiên kiến giết chết quyết định</a></li>
    <li><a href="/blog/tuong-quan-nhan-qua/">Phần 4 - Tương quan không phải nhân quả</a></li>
    <li><a href="/blog/trung-binh-noi-doi/">Phần 5 - Khi con số đánh lừa: trung bình</a></li>
    <li class="current">Phần 6 - Từ số đến quyết định: leading vs lagging</li>
    <li><a href="/blog/tin-hieu-vs-nhieu/">Phần 7 - Tín hiệu vs nhiễu</a></li>
    <li><a href="/blog/goodhart-guardrail-metrics/">Phần 8 - Goodhart &amp; guardrail metrics</a></li>
    <li><a href="/blog/quyet-dinh-khi-thieu-du-lieu/">Phần 9 - Quyết định khi dữ liệu chưa đủ</a></li>
  </ol>
</div>

Cuối tháng 3, chủ một chuỗi cà phê ở TP.HCM mở báo cáo quý. Doanh thu xuống 18% so với quý trước. Anh triệu tập cả đội, cắt khuyến mãi, đổi menu, gọi điện cho nhà cung cấp. Nhưng đây là sự thật phũ phàng: **con số anh vừa nhìn thấy là tin của ba tháng trước.**

Khách đã bắt đầu thưa dần từ giữa tháng 1 - ít người ghé hơn, ngồi ngắn hơn, đơn nhỏ lại. Tín hiệu đã ở đó suốt mười tuần. Chỉ là không ai đo nó. Tới khi doanh thu quý kết sổ và đập vào mắt, cái xe đã trôi qua khúc cua từ lâu.

Phản xạ của hầu hết chủ doanh nghiệp là tin vào báo cáo doanh thu - vì nó là con số "thật" nhất, rõ ràng nhất. Nhưng chính sự rõ ràng đó là cái bẫy: lúc nó rõ thì đã muộn để làm gì.

## Leading vs lagging indicator là gì

Mọi chỉ số bạn theo dõi rơi vào một trong hai loại.

**Lagging indicator** *(chỉ số báo sau - phản ánh kết quả đã xảy ra)* là cái đã rồi. Doanh thu quý, lợi nhuận năm, tổng số khách mất trong tháng. Chúng chính xác, không cãi được - nhưng bạn không tác động trực tiếp vào chúng. Chúng là **kết quả**, không phải đòn bẩy.

**Leading indicator** *(chỉ số báo trước - dự báo kết quả tương lai và lái được)* là cái đến trước, đo được hôm nay, và bạn còn kịp lái. Số khách dùng thử tuần này, tỷ lệ khách quay lại trong 7 ngày, số đơn lặp lại, mức độ tương tác của khách cũ. Chúng "ồn" hơn, kém chắc chắn hơn - nhưng chúng đi **trước** doanh thu vài tuần đến vài tháng.

> Lái xe bằng gương chiếu hậu cho bạn hình ảnh sắc nét nhất về con đường - chỉ tiếc đó là đoạn đường bạn đã đi qua. Leading indicator là kính chắn gió: mờ hơn, rung hơn, nhưng nó cho bạn thấy khúc cua đang tới.

## Sự thật ngược đời: con số chắc chắn nhất lại vô dụng nhất để lái

Doanh thu quý có một sức hút chết người - nó tròn trịa, đã chốt sổ, không ai cãi. Nên người ta dán mắt vào nó. Nhưng một chỉ số càng chắc chắn thì thường càng **trễ**, và càng trễ thì càng ít chỗ để bạn xoay sở.

Hãy ghép từng lagging indicator quan trọng với cái báo trước nó:

- **Doanh thu tháng tới** ← số khách dùng thử và tỷ lệ giữ chân *tuần này*. Khách hôm nay là doanh thu của 4-8 tuần nữa.
- **Churn** *(khách rời bỏ - người dùng kỳ trước nhưng kỳ này thì không)* **của quý** ← tín hiệu giảm tương tác sớm: khách mở app ít hơn, bỏ qua tin nhắn, giãn khoảng cách giữa hai lần mua. Một khách "im lặng" hôm nay thường là một khách mất sau 60 ngày.
- **Lợi nhuận năm** ← biên đơn hàng và chi phí thu hút khách *từng tháng*.

Lagging indicator nói cho bạn biết **bạn đã thắng hay thua**. Leading indicator cho bạn cơ hội **đổi kết cục khi trận đấu còn đang diễn ra**.

## Đừng đo cả rừng - chọn một hai chỉ số lái được

Cám dỗ lớn nhất khi hiểu ra điều này là dựng một dashboard 40 ô, mỗi ô một metric, và gọi đó là "data-driven". Đó là cách chắc chắn để không ai nhìn cái nào.

Một leading metric tốt phải vượt qua ba bài kiểm tra:

1. **Đi trước.** Nó thay đổi *trước* khi doanh thu thay đổi. Nếu nó nhúc nhích cùng lúc với doanh thu, nó không phải leading - nó chỉ là một lagging indicator mặc áo khác.
2. **Lái được.** Bạn có một hành động cụ thể tác động vào nó *trong tuần này* - đây chính là khác biệt giữa [chỉ số bạn bấm được và chỉ số kết quả](/blog/input-vs-output-metrics/). Số khách dùng thử thì bạn lái được bằng quảng cáo, ưu đãi, onboarding. "Tâm trạng thị trường" thì không - bỏ qua.
3. **Đo được đều đặn.** Hằng ngày hoặc hằng tuần, không phải quý. Một chỉ số báo trước mà mỗi quý mới biết một lần thì chẳng còn báo trước gì.

Với một quán cà phê, đó có thể chỉ là **số khách quay lại trong 14 ngày**. Với một nhà bán hàng đa kênh, có thể là **tỷ lệ khách mua lần 2**. Một, nhiều nhất là hai. Phần còn lại là tiếng ồn.

## Một con số chỉ có giá trị khi nó biến thành một hành động

Đây là chỗ cả series này hội tụ. Bạn hỏi đúng câu (Phần 1), tránh được thiên kiến (Phần 3), không bị trung bình đánh lừa (Phần 5) - để làm gì? Để **làm một việc gì đó khác đi**.

Một leading metric mà không gắn với hành động chỉ là một vanity metric *(chỉ số đẹp mã nhưng không dẫn tới quyết định)* sang trọng hơn. Hãy buộc mỗi chỉ số vào một quy tắc dạng "nếu - thì":

- *Nếu* tỷ lệ khách quay lại 14 ngày tụt dưới 30% trong hai tuần liên tiếp, *thì* tuần sau gọi lại 20 khách cũ vừa im lặng.
- *Nếu* số khách dùng thử tuần này thấp hơn 80% mức trung bình bốn tuần, *thì* tăng ngân sách kênh hiệu quả nhất ngay đầu tuần tới.

Và con số chỉ tạo ra hành động khi người ta **tin** nó. Một bảng số khô không lay chuyển ai. *"Khách quay lại đang rơi tuần thứ ba liên tiếp, đây là 20 cái tên cụ thể vừa biến mất"* - đó là một câu chuyện, và câu chuyện mới khiến đội ngũ nhấc máy lên. Kể bằng dữ liệu, không chỉ trưng dữ liệu.

## ... trong Semantix

Bạn không cần một đội phân tích để theo dõi leading metric. Trong Semantix, bạn định nghĩa "khách quay lại 14 ngày" hay "số dùng thử tuần này" **một lần** trong tầng ngữ nghĩa, rồi hỏi lại mỗi sáng bằng tiếng Việt: *"Tuần này số khách mua lần 2 so với trung bình bốn tuần thế nào?"*.

Quan trọng hơn, bạn đặt **cảnh báo sớm**: khi một leading metric vượt ngưỡng, Semantix [bắn thông báo qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/) - bạn biết khúc cua đang tới *trước* khi doanh thu quý kể lại chuyện đã rồi.

Semantix không phải một con bot đọc thuộc lòng doanh thu hôm qua. Nó là cái kính chắn gió - giúp bạn nhìn cái sắp đến, bằng đúng những leading metric mà [đường cong giữ chân](/blog/cohort-retention-pmf/) gợi ý, và phản ứng khi còn kịp.

## Tóm lại

| Đo cái ĐÃ RỒI (lagging) | Đo cái LÁI ĐƯỢC (leading) |
|---|---|
| Doanh thu quý, lợi nhuận năm | Số dùng thử, khách quay lại tuần này |
| Chính xác nhưng đã muộn | Hơi "ồn" nhưng còn kịp xoay |
| Là kết quả, không tác động được | Là đòn bẩy, hành động được hôm nay |
| Gương chiếu hậu | Kính chắn gió |
| Cả rừng chỉ số trên dashboard | Một, hai metric gắn với một hành động |

> Quy tắc vàng: đừng quản lý công ty bằng những con số bạn không còn lái được. Mỗi chỉ số đáng theo dõi phải trả lời được câu *"hôm nay tôi làm gì khác đi?"*.

Đây là chỗ cả chuỗi hội tụ: tư duy dựa trên dữ liệu không phải là gom thật nhiều số. Nó là một mạch - bắt đầu từ [một câu hỏi đúng](/blog/bat-dau-tu-cau-hoi/) (Phần 2), tránh những thiên kiến bóp méo cách ta đọc (Phần 3), không để tương quan giả và trung bình lừa mình (Phần 4-5), và quy về đúng nơi nó phải tới: **một hành động cụ thể, làm hôm nay, khi vẫn còn kịp**. Số nào không dẫn tới đó thì chỉ là số.

---

*Muốn biết hôm nay nên lái cái gì thay vì đọc lại chuyện quý trước? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 7 - Tín hiệu vs nhiễu](/blog/tin-hieu-vs-nhieu/): đừng phản ứng với mọi dao động của con số.*
