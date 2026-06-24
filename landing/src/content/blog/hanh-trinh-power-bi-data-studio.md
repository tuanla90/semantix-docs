---
title: "Từ Excel đến Semantix (Phần 2): lên Power BI & Data Studio — dashboard đẹp, nhưng cứng"
code: "uc-009"
series: "tu-excel-den-semantix"
seriesOrder: 2
description: "Lần đầu tôi thấy số của mình thành dashboard tự refresh. Tôi tưởng xong. Rồi sếp hỏi một câu mới — và tắc. Phần 2 của series: dashboard đẹp, nhưng cứng."
pubDate: 2027-04-13
category: "Câu Chuyện & Use Case"
readTime: 9
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: false
cover: "/blog/covers/hanh-trinh-power-bi-data-studio.svg"
coverAlt: "Dashboard đẹp với biểu đồ tương tác, nhưng một câu hỏi mới bị ổ khóa chặn lại"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Từ Excel đến Semantix · 4 phần</div>
  <ol>
    <li><a href="/blog/hanh-trinh-thoi-excel/">Phần 1 — Những năm bảng tính</a></li>
    <li class="current">Phần 2 — Lên Power BI &amp; Data Studio</li>
    <li><a href="/blog/hanh-trinh-superset-metabase/">Phần 3 — Sang Superset &amp; Metabase</a></li>
    <li><a href="/blog/hanh-trinh-tu-xay-semantix/">Phần 4 — Tự xây Semantix &amp; hấp thụ điểm mạnh</a></li>
  </ol>
</div>

*Đây là hành trình của chính tôi, kể lại theo trí nhớ. Tên công cụ là thật; vài con số là ví dụ để bạn hình dung, không phải số liệu kế toán của ai.*

Tôi vẫn nhớ buổi chiều mở Power BI lần đầu. Tôi kéo cái file Excel doanh thu — cái file mà ở [Phần 1](/blog/hanh-trinh-thoi-excel/) tôi đã copy-paste đến phát ốm — thả vào, chọn vài cột, và *bụp*: một biểu đồ cột hiện ra, có thể bấm vào lọc theo tháng, theo chi nhánh, theo nhóm hàng. Tôi bấm thử một ô. Cả màn hình đổi theo. Tôi ngồi nghịch nửa tiếng như đứa trẻ có đồ chơi mới.

Hôm đó tôi đã thật lòng tin mình vừa giải xong bài toán dữ liệu của công ty. **Tôi đã nhầm — nhưng phải mất gần một năm tôi mới hiểu mình nhầm ở đâu.**

## Cú "wow" đầu tiên: số của tôi cuối cùng cũng trông chuyên nghiệp

Phải công bằng: bước lên BI dashboard (Business Intelligence — bảng số trực quan, tương tác) là một nâng cấp *thật*, không phải ảo giác. Sau nhiều năm sống trong bảng tính tĩnh, lần đầu tiên tôi có:

- **Biểu đồ tương tác.** Không còn ảnh chụp chết cứng dán vào slide. Sếp bấm vào "Quý 2" là cả dashboard lọc theo, không cần tôi dựng lại.
- **Tự refresh.** Tôi nối Power BI vào file trên SharePoint, đặt lịch làm mới. Sáng ra số đã mới, tôi không phải mở file ra copy lúc 7 giờ.
- **Chia sẻ bằng một cái link.** Với Google Data Studio (giờ là Looker Studio), tôi gửi link, ai có quyền là xem được, trên cả điện thoại. Trông rất *ra dáng*.

Và càng dùng, tôi càng thấy nó mạnh hơn vẻ ngoài. Đây là chỗ tôi muốn nói rõ, vì sau này tôi đi tự xây nền tảng của riêng mình, chính những điểm mạnh này là thứ tôi cố giữ lại chứ không vứt đi.

## Những điểm mạnh thật mà tôi học được — và còn nể tới giờ

Thứ làm tôi đổi cách nghĩ là **data model** (mô hình hoá dữ liệu — cách định nghĩa các bảng dữ liệu liên kết với nhau ra sao). Trước đó tôi gộp mọi thứ vào một sheet phẳng khổng lồ. Power BI dạy tôi tách bảng bán hàng, bảng sản phẩm, bảng chi nhánh ra rồi *nối* chúng bằng khóa chung. Tự nhiên một con số có thể nhìn từ chục góc mà không phải nhân bản dữ liệu. Đó là một bài học kiến trúc tôi mang theo mãi.

Rồi tới **measure** (đo lường — một chỉ số được tính bằng công thức, ví dụ "tỷ lệ tăng trưởng so với cùng kỳ") viết bằng **DAX** (ngôn ngữ công thức riêng của Power BI để tạo measure). Lần đầu viết được một measure tính "doanh thu lũy kế từ đầu năm" rồi thả vào biểu đồ nào cũng đúng, tôi thấy phục thật sự. Định nghĩa *một lần*, dùng *khắp nơi* — đó là một ý tưởng đẹp.

Chưa kể khả năng **kết nối nhiều nguồn**: kéo dữ liệu từ SQL, từ Excel, từ Google Sheets về cùng một chỗ; và một thư viện biểu đồ phong phú, tùy biến tới từng pixel. Về khoản trực quan hoá thuần túy, tôi vẫn xếp Power BI và Tableau ở chiếu trên — tôi đã viết kỹ chỗ này trong bài [Semantix vs BI dashboard truyền thống](/blog/vs-powerbi-tableau/), nên ở đây tôi không lặp lại.

> Tôi không kể chuyện này để dìm Power BI. Power BI là một công cụ tuyệt vời cho đúng việc nó sinh ra: dựng báo cáo chuẩn hoá, đẹp, sâu, cho người biết dùng nó. Vấn đề của tôi không phải nó *yếu*. Vấn đề là nó *không hợp với cách công ty tôi thực sự hỏi*.

## Bức tường lộ ra: dashboard chỉ trả lời câu đã được dựng sẵn

Bức tường không đổ sập. Nó lộ ra từ từ, qua những buổi họp giống hệt nhau.

Tôi dựng một dashboard doanh thu rất ngon: theo tháng, theo chi nhánh, theo nhóm hàng. Họp tháng, anh giám đốc nhìn một lúc rồi hỏi: *"Cái đợt sụt ở chi nhánh Đà Nẵng tháng trước — là do ít khách tới, hay khách tới mà mua ít hơn?"*

Trên dashboard không có câu trả lời đó. Tôi chưa dựng lát cắt "số hóa đơn" với "giá trị trung bình mỗi hóa đơn". Câu của anh ấy hoàn toàn hợp lý — chỉ là *mới*. Và một dashboard, dù đẹp đến mấy, **chỉ trả lời được những câu hỏi đã được dựng sẵn từ trước.** Mỗi câu nằm ngoài khung đều đẩy quả bóng về lại sân của tôi.

Tôi nói: "Để em về dựng thêm." Về, tôi mở Power BI, thêm bảng, viết thêm measure DAX, sửa data model, canh lại layout. Mất nửa ngày. Họp sau, anh ấy hài lòng — rồi hỏi câu *tiếp theo*, cũng hợp lý, cũng mới, cũng nằm ngoài. Và vòng lặp bắt đầu lại.

## Tôi nhận ra mình vừa trở thành nút cổ chai mới

Đây là chỗ làm tôi lạnh người khi nhìn lại. Ở thời Excel, nút cổ chai là *cái file* — chậm, dễ sai. Tôi tưởng lên BI là gỡ được nút đó. Hóa ra tôi chỉ **dời nút cổ chai từ cái file sang chính tôi.**

Mọi câu hỏi mới của cả công ty đều phải đi qua người biết dựng dashboard — và người đó là tôi (hoặc một bạn analyst nếu công ty đủ lớn để thuê). Sếp không tự hỏi được. Bạn nghiệp vụ ở kho, ở phòng bán hàng, muốn biết một con số là phải nhắn cho tôi rồi *chờ*. DAX và mô hình hoá thì dốc — tôi học được vì tôi mê, nhưng không thể bắt anh trưởng phòng kinh doanh đi học DAX để tự hỏi doanh thu của chính phòng anh ấy.

Tôi đã đọc đâu đó cụm "self-service analytics" (phân tích dữ liệu tự phục vụ — người cần số tự lấy được số mà không phải nhờ ai) và thấy nó mô tả đúng thứ tôi *thiếu*. Dashboard được quảng cáo là self-service, nhưng cái "self" đó chỉ đúng tới mức *lọc và bấm trong khung đã dựng*. Hễ bước ra ngoài khung là hết tự phục vụ — lại phải nhờ người. Tôi viết hẳn một bài riêng về khoảng cách này: [self-service analytics thật sự nghĩa là gì](/blog/self-service-analytics/).

Đây là bảng tôi tự tổng kết lại sau chặng đó:

| | Lên BI dashboard được thêm gì | Nhưng vẫn vướng gì |
|---|---|---|
| **Hình thức** | Biểu đồ tương tác, tự refresh, link chia sẻ | Chỉ đẹp với câu hỏi *đã* dựng sẵn |
| **Câu hỏi mới** | — | Phải nhờ người dựng dashboard, chờ nửa ngày đến vài ngày |
| **Người nghiệp vụ / sếp** | Bấm lọc trong khung có sẵn | Không tự hỏi câu ngoài khung được |
| **Kỹ năng cần** | DAX, mô hình hoá dữ liệu — dốc | Không thể bắt cả công ty đi học |
| **Phụ thuộc con người** | Dời từ "cái file" sang "một-hai người dựng dashboard" | Vẫn là một nút cổ chai |
| **Chi phí** | Per-user license (trả phí theo từng người dùng) | Càng nhiều người xem càng đắt |

## Hai cái gai nhỏ mà tôi nhớ mãi

Hai chuyện cụ thể khiến tôi bắt đầu nghĩ phải có đường khác.

Thứ nhất là **per-user license** (mô hình tính tiền theo từng người dùng). Power BI Pro tính tiền theo đầu người mỗi tháng. Tôi muốn cho cả 20 người trong công ty đều xem được số — nhưng mỗi cái đầu thêm vào là thêm một khoản phí cố định hằng tháng. Nghịch lý: tôi *càng muốn dân chủ hóa dữ liệu*, hóa đơn càng phạt tôi. Cuối cùng tôi cấp quyền nhỏ giọt cho vài người, và thế là dữ liệu lại quay về nằm trong tay số ít.

Thứ hai là **Data Studio khi data lớn dần**. Báo cáo miễn phí, link đẹp, ai cũng xem được — tuyệt cho lúc đầu. Nhưng khi tôi nối nhiều nguồn và dữ liệu phình lên, nó bắt đầu chậm, hay lỗi quá hạn (timeout), và những phép tính phức tạp thì đụng trần. Cái miễn phí có cái giá của nó, chỉ là cái giá đó trả bằng thời gian chờ và sự bực mình.

## Điều tôi cuối cùng cũng hiểu ra

Ngồi lại sau gần một năm, tôi gọi tên được thứ làm mình day dứt. Công cụ trong tay tôi đã **mạnh hơn hẳn** thời Excel — model tốt hơn, biểu đồ đẹp hơn, tự động hơn. Vậy mà cảm giác bất lực thì *y hệt*: người cần câu trả lời vẫn không tự lấy được câu trả lời.

> Bài học của chặng này: nâng cấp công cụ không tự động trả "quyền hỏi" về tay người cần. Một dashboard đẹp vẫn là một cái khung — và mọi câu hỏi đáng giá nhất của doanh nghiệp đều có thói quen rơi ra *ngoài* khung.

Tôi không cần một dashboard đẹp hơn. Tôi cần một thứ cho phép anh trưởng phòng tự gõ câu hỏi của anh ấy — bằng tiếng Việt, ngay lúc câu hỏi nảy ra — mà không phải xếp hàng sau tôi, và không phải đi học DAX. Lúc đó tôi chưa biết thứ đó tên là gì. Tôi chỉ biết mình phải đi tìm sự **tự chủ**.

Và bước đầu tiên của hành trình tìm tự chủ ấy đưa tôi tới thế giới mã nguồn mở — Superset, Metabase. Đó là [Phần 3](/blog/hanh-trinh-superset-metabase/): nơi tôi giành lại quyền kiểm soát, nhưng phải đánh đổi bằng những thứ tôi không ngờ tới.

---

*Bạn cũng đang kẹt ở chỗ "dashboard đẹp nhưng mỗi câu hỏi mới lại phải nhờ người"? Hãy để người cần số tự hỏi bằng tiếng Việt — [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Rồi đọc tiếp [Phần 3 — Sang Superset &amp; Metabase](/blog/hanh-trinh-superset-metabase/) để xem chặng đường tìm tự chủ của tôi.*
