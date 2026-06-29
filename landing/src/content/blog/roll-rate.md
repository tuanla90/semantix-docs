---
title: "Roll Rate Analysis: con số churn nói khách rời 8% - nhưng giấu mất họ đang trượt về đâu"
code: "pt-040"
description: "Churn quý này 8%, y hệt quý trước. Yên tâm? Chưa. Cùng một con số tổng có thể là khách đang leo lên - hoặc cả tệp đang lặng lẽ trượt xuống vực."
pubDate: 2025-10-23
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/roll-rate.svg"
coverAlt: "Ma trận roll rate: lưới ô tô đậm dần theo đường chéo với mũi tên trượt xuống"
---

Cuối quý, bạn mở báo cáo và đọc được một con số gọn gàng: **churn 8%** - tức 8% khách hoạt động kỳ trước thì kỳ này biến mất. Quý trước cũng 8%. Quý trước nữa cũng tầm đó. Phản xạ đầu tiên: "Ổn định, không có gì phải lo."

Nhưng con số tổng ấy là một bức ảnh chụp đứng yên - nó đếm được *bao nhiêu* người rời đi, mà không nói cho bạn biết **hướng dịch chuyển** của cả tệp khách. Hai doanh nghiệp có thể cùng churn 8%: một bên khách đang đều đặn *leo lên* các nhóm giá trị cao hơn, một bên thì cả đám đang lặng lẽ *trượt xuống* từng nấc một - và 8% rời đi hôm nay chỉ là phần nổi của một dòng người đang trôi về phía cửa thoát.

Đây là nghịch lý ít người chịu để ý: **một con số churn ổn định vẫn có thể là dấu hiệu một tệp khách đang sụp đổ chậm.** Để thấy được dòng chảy đó, bạn không nhìn con số tổng. Bạn nhìn **roll rate** (tỷ lệ chuyển nhóm - tỷ lệ một tập khách dịch chuyển từ nhóm này sang nhóm khác giữa hai kỳ liên tiếp).

## Roll rate là gì - ma trận chuyển nhóm giữa hai kỳ

Hãy quên con số tổng một lát. Roll rate hỏi một câu cụ thể hơn nhiều: **trong số khách đang ở nhóm A kỳ trước, bao nhiêu phần trăm đã "roll" (chuyển) sang nhóm B kỳ này?**

Nó được trình bày dưới dạng một **ma trận chuyển nhóm**: mỗi **hàng** là một nhóm (bucket - nhóm/trạng thái mà bạn xếp khách vào) ở *kỳ trước*, mỗi **cột** là nhóm ở *kỳ này*. Đọc một ô = "bao nhiêu % của nhóm A kỳ trước đã chuyển sang nhóm B kỳ này". Cộng một hàng lại luôn ra 100% - vì mỗi khách của nhóm đó phải đáp xuống đâu đó kỳ sau.

Khác với [cohort](/blog/cohort-analysis/) (theo dõi *một lứa* khách hao mòn dần theo nhiều kỳ), roll rate chỉ soi **đúng hai kỳ liền kề** - nhưng soi *toàn bộ* các đường dịch chuyển cùng lúc. Cohort hỏi "lứa tháng 1 còn lại bao nhiêu sau 6 tháng?"; roll rate hỏi "từ tháng này sang tháng sau, ai chuyển đi đâu?".

## Cách đọc ma trận: đường chéo, dưới chéo, trên chéo

Mẹo đọc một ma trận roll rate gói gọn trong ba vùng - và đây là phần đáng giá nhất của cả bài:

- **Đường chéo (góc trên-trái xuống góc dưới-phải)** = khách **ở yên** nhóm cũ. Champions vẫn là Champions, nợ nhóm 1 vẫn nhóm 1. Đường chéo càng đậm, tệp khách càng ổn định.
- **Dưới đường chéo** = khách **trượt xuống** nhóm xấu hơn. Đây là vùng nguy hiểm: một ô đậm bất thường dưới chéo nghĩa là cả một nhóm khách đang tụt hạng - *trước khi* họ kịp biến mất khỏi con số churn.
- **Trên đường chéo** = khách **cải thiện**, leo lên nhóm tốt hơn. Vùng này càng sáng đèn, chiến dịch nuôi dưỡng (nurture) của bạn càng có tác dụng.

Cùng một con số churn tổng có thể trải ra thành một ma trận với đường chéo đậm và vài ô lác đác dưới chéo (lành mạnh) - hoặc một ma trận với cả một dải đậm chạy chéo *xuống dưới* (cả tệp đang trôi). Con số tổng không phân biệt được hai bức tranh này. Ma trận thì nói thẳng.

<div class="viz">
<div class="viz-chart" data-chart="rollrate" data-chart-data='{"from":["Champions","Trung thành","Có nguy cơ","Ngủ đông"],"to":["Champions","Trung thành","Có nguy cơ","Ngủ đông","Rời bỏ"],"matrix":[[70,18,8,3,1],[25,50,15,7,3],[8,20,40,22,10],[3,7,15,45,30]],"unit":"%"}'></div>
<div class="viz-caption">Ma trận roll rate RFM (số minh họa): mỗi hàng là nhóm khách kỳ trước, mỗi cột là nhóm kỳ này. Ô đậm dưới đường chéo = khách đang trượt xuống - tín hiệu cần can thiệp trước khi họ rời hẳn.</div>
</div>

Đọc thử hàng "Có nguy cơ": chỉ 8% leo lại được Champions và 20% lên Trung thành (trên chéo, tin tốt), nhưng 22% trượt xuống Ngủ đông và 10% rời hẳn (dưới chéo, đáng báo động). Hàng này là nơi tiền win-back nên đổ vào - chứ không phải hàng Champions vốn đã 70% ở yên.

## Ví dụ cho SME bán lẻ: khách trượt giữa các phân khúc RFM

Với một chủ shop đa kênh ở TP.HCM, "nhóm" không phải là gì xa lạ - đó chính là các phân khúc [RFM](/blog/rfm-segmentation/) (Recency, Frequency, Monetary - phân khúc khách theo lần mua gần nhất, tần suất và số tiền chi) hoặc các hạng thành viên (tier). Mỗi tháng, bạn chấm lại điểm RFM cho toàn tệp khách rồi xếp họ vào các nhóm: *Champions · Trung thành · Có nguy cơ · Ngủ đông · Rời bỏ.*

Roll rate biến việc chấm điểm tĩnh ấy thành một **dòng chảy**. Thay vì chỉ biết "tháng này có 1.200 khách Champions", bạn biết: trong số Champions tháng trước, 70% ở lại, 18% tụt xuống Trung thành, và 12% trượt thẳng xuống nhóm có nguy cơ trở xuống. *(Các con số là ví dụ minh họa.)* Mười hai phần trăm Champions đang rời quỹ đạo - đó là tín hiệu mà bảng "tổng số Champions" tháng này không bao giờ chỉ ra, vì lượng Champions mới bù vào có thể che lấp đúng bằng đó.

> Quy tắc vàng: **roll rate đo dòng chảy, không đo mực nước.** Một cái hồ giữ nguyên mực nước vẫn có thể đang vừa rò đáy vừa được bơm bù - và bạn chỉ phát hiện cái lỗ rò khi nhìn dòng chảy, không phải khi nhìn mực nước.

## Ví dụ gốc tài chính: roll rate theo nhóm nợ (DPD)

Roll rate không sinh ra từ thương mại điện tử - nó là công cụ kinh điển của ngành **cho vay và tài chính**. Ở đó, "nhóm" là các bậc nợ theo **DPD** (Days Past Due - số ngày quá hạn thanh toán). Một khoản vay "roll" từ Nhóm 1 (đúng hạn) sang Nhóm 2 (quá hạn 1–30 ngày), rồi Nhóm 3, rồi Nhóm 4... cho tới khi rơi vào nợ xấu.

Với người làm tín dụng, ma trận roll rate là tín hiệu cảnh báo sớm quý giá nhất. Tỷ lệ "roll" từ Nhóm 1 → Nhóm 2 nhích từ 2% lên 3,5% trong vài kỳ liên tiếp nghĩa là chất lượng danh mục đang xấu đi *trước khi* nợ xấu thực sự bùng lên ở Nhóm 5 - vốn là con số mà mọi báo cáo cuối kỳ đều nhìn, nhưng nhìn thì đã muộn. Đường chéo dưới của ma trận nợ là hệ thống cảnh báo cháy; còn tỷ lệ nợ xấu cuối kỳ là lúc khói đã bốc lên trần.

Cơ chế giống hệt ví dụ bán lẻ: nhóm trạng thái khác nhau (DPD thay vì RFM), nhưng câu hỏi và cách đọc *y nguyên* - bao nhiêu phần trăm của nhóm này, kỳ sau, rơi xuống nhóm xấu hơn?

## Vì sao roll rate báo sớm hơn churn tổng

Churn là một **lagging indicator** (chỉ số báo sau - phản ánh kết quả đã rồi): tới lúc một khách bị tính là "đã churn", họ đã đi rồi, không kéo lại được. Roll rate là **leading indicator** (chỉ số báo trước): nó bắt được khách *trên đường* trượt xuống, khi họ mới rời nhóm tốt sang nhóm kém - tức là còn vài kỳ để can thiệp.

Một khách Champions hiếm khi biến mất sau một đêm. Họ trượt: Champions → Trung thành → Có nguy cơ → Ngủ đông → mới rời. Con số churn tổng chỉ sáng đèn ở bước cuối. Roll rate sáng đèn ở bước *đầu tiên* - khi một tin nhắn chăm sóc còn rẻ và còn kịp. Nhìn churn để hành động chẳng khác nào lái xe chỉ bằng gương chiếu hậu: bạn chỉ thấy thứ đã ở lại phía sau.

## ... trong Semantix

Trước đây, dựng một ma trận roll rate tử tế là việc của analyst: gắn nhãn nhóm cho từng khách ở kỳ trước và kỳ này, ghép cặp theo từng khách, đếm chéo, rồi chia tỷ lệ trên từng hàng - vài chục dòng SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu) và rất dễ sai một mắt xích là cả ma trận lệch.

Semantix không phải một chatbot cắm thẳng vào database rồi đoán bừa loại phân tích bạn cần. Đây là một loại phân tích Semantix **có sẵn** - tên trong sản phẩm là **"Phân tích chuyển nhóm" / "Ma trận Roll Rate"**. Bạn kết nối dữ liệu một lần, định nghĩa "khách hàng" và nhóm phân khúc trong [Semantic Layer](/blog/semantic-layer/), rồi hỏi thẳng bằng tiếng Việt:

> **"Lập ma trận roll rate phân khúc RFM giữa tháng trước và tháng này, tô đậm các ô khách trượt xuống nhóm xấu hơn."**

Kết quả trả về là một **ma trận tô màu** (heatmap chéo): đường chéo đậm là khách ở yên, vùng dưới chéo càng đậm càng đáng lo. Đọc một ô là biết ngay "bao nhiêu % nhóm A kỳ trước đã chuyển sang nhóm B kỳ này" - không cần SQL, không cần dựng pivot (bảng tổng hợp xoay chiều). Nếu chưa quen cách đặt câu hỏi cho ra đúng phân tích, [bài về câu hỏi tốt cho AI](/blog/ai-questions/) có sẵn công thức; còn để hiểu cách roll rate bổ trợ cho việc đọc đường cong giữ chân, xem [Cohort & Retention](/blog/cohort-retention-pmf/).

## Tóm lại

| Khi bạn nhìn churn tổng | Khi bạn nhìn roll rate |
|---|---|
| Biết *bao nhiêu* khách rời đi | Biết khách đang trượt *về đâu* |
| Một con số chụp đứng yên | Một dòng chảy giữa hai kỳ |
| Chỉ số báo sau - đã muộn | Chỉ số báo trước - còn kịp can thiệp |
| 8% ổn định trông như yên ổn | Thấy cả tệp đang lặng lẽ tụt hạng |
| Không biết nhắm ngân sách vào ai | Biết chính xác nhóm nào đang trượt cần cứu |

Một con số churn ổn định không có nghĩa là tệp khách của bạn ổn định. Nó chỉ nghĩa là dòng người *vào* và dòng người *trượt ra* đang tình cờ cân nhau - cho tới ngày chúng thôi cân. Roll rate là cách rẻ nhất để nhìn thấy dòng chảy đó, trước khi mực nước kịp tụt.

---

*Muốn thấy khách của bạn đang trượt giữa các phân khúc ra sao? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hỏi một câu tiếng Việt, nhận lại ma trận chuyển nhóm - không cần SQL.*
