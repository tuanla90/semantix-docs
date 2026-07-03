---
title: "Customer Lifetime Value: con số quyết định bạn được phép chi bao nhiêu để có một khách - chứ không phải một chỉ số đẹp để báo cáo"
code: "pt-052"
description: "Đốt tiền ads kéo khách mà không biết một khách đáng bao nhiêu? Đó là lái xe bịt mắt. CLV đặt trần cho ngân sách thu hút - và lộ ra phân khúc đáng giữ."
pubDate: 2025-09-11
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/clv-framework.png"
coverAlt: "Các cột CLV theo phân khúc cao thấp khác nhau dưới một đường trần ngân sách CAC"
---

Bạn vừa duyệt thêm 50 triệu cho chiến dịch Shopee tháng này. Câu hỏi đơn giản: **mỗi khách kéo về được, bạn lời hay lỗ?** Nếu câu trả lời là "chắc là lời" hoặc "để bộ phận marketing báo cáo lại" - bạn đang lái xe bịt mắt. Đạp ga mạnh hơn không giúp gì nếu bạn không biết mình đang đi tới vực hay tới đích.

Hầu hết doanh nghiệp đo *chi phí* để có một khách rất kỹ - từng đồng quảng cáo đều có dashboard. Nhưng *giá trị* của khách đó suốt đời gắn bó thì lại đoán mò. Đó là một nửa phương trình bị bỏ trống. Và khi nửa phương trình bị bỏ trống, mọi quyết định ngân sách đều là cá cược.

Bài này không nói về LTV trong ngữ cảnh cohort (chuyện đó đã có ở [Cohort Revenue & LTV](/blog/cohort-revenue-ltv/)). Bài này coi **Customer Lifetime Value như một framework ra quyết định**: công thức để tính nó, và cách dùng con số đó để quyết bạn được chi bao nhiêu, giữ ai, buông ai.

## CLV là gì - và hai cách tính cho ra hai con số rất khác nhau

**CLV (Customer Lifetime Value - giá trị trọn đời của một khách)** là tổng **lợi nhuận** kỳ vọng từ một khách trong suốt thời gian họ còn gắn bó với bạn. Hai chữ quan trọng: *lợi nhuận*, không phải doanh thu. Một khách chi 10 triệu nhưng giá vốn 9 triệu thì "đáng" hơn hẳn một khách chi 10 triệu mà giá vốn chỉ 3 triệu - dù doanh thu như nhau.

Có hai cách tính, và chúng trả lời hai câu hỏi khác nhau:

**Historic CLV (CLV lịch sử - cộng lợi nhuận đã thực sự phát sinh).** Bạn nhìn vào quá khứ: khách này từ lúc mua lần đầu đến nay đã đem về bao nhiêu lợi nhuận thật? Đơn giản, không cãi được, nhưng *nhìn qua gương chiếu hậu* - nó không nói gì về khách mới chỉ vừa mua một lần.

**Predictive CLV (CLV dự đoán - ước lượng giá trị tương lai).** Đây mới là con số để ra quyết định, vì bạn cần biết một khách *sẽ* đáng bao nhiêu trước khi quyết chi tiền kéo họ. Công thức tối giản:

```
Predictive CLV = AOV × Tần suất mua/năm × Tuổi thọ khách (năm) × Biên lợi nhuận
```

Trong đó **AOV (Average Order Value - giá trị đơn hàng trung bình)**, tần suất là số lần mua mỗi năm, **tuổi thọ khách** suy ra từ **retention rate (tỷ lệ giữ chân)** - giữ chân càng cao thì khách càng "sống thọ", và **margin (biên lợi nhuận - phần lời trên mỗi đồng doanh thu)** là thứ kéo doanh thu về thành lợi nhuận thật.

*Ví dụ minh hoạ:* một khách spa có AOV 800 nghìn, đi 4 lần/năm, gắn bó trung bình 3 năm, biên lợi nhuận 60%. CLV = 800k × 4 × 3 × 60% = **5,76 triệu**. Đó là số trần bạn cần để nói chuyện ngân sách.

## CLV đặt trần cho CAC: luật CLV > 3×CAC

Đây là lý do CLV không phải chỉ số để báo cáo cho đẹp, mà là một cái trần. **CAC (Customer Acquisition Cost - chi phí thu hút một khách mới)** là tiền bạn bỏ ra để có khách. CLV là tiền khách đó đem lại. Quan hệ giữa hai con số quyết định bạn sống hay chết:

- **CLV < CAC**: mỗi khách mới làm bạn *lỗ*. Càng chạy ads mạnh, càng phá sản nhanh. Đây là cái bẫy chết người - tăng trưởng nhìn đẹp trên top-line nhưng đang đốt vốn.
- **CLV ≈ CAC**: hoà vốn trên giấy, nhưng không còn biên nào cho vận hành, rủi ro, hay tái đầu tư.
- **CLV ≥ 3×CAC**: vùng lành mạnh. Cứ mỗi đồng bỏ ra thu hút, bạn thu về ít nhất ba đồng lợi nhuận trọn đời - đủ đệm để chi phí khác và tăng trưởng bền.

Tỷ số **CLV:CAC** vì thế là một trong những con số "khám sức khỏe" nhanh nhất của một mô hình kinh doanh. Với spa ở trên (CLV 5,76 triệu), trần CAC lành mạnh là khoảng **1,9 triệu/khách**. Chi quá ngưỡng đó để kéo một khách trung bình là đang phá luật - trừ khi bạn biết chính xác mình đang kéo *loại* khách nào. Mà điều đó dẫn tới vấn đề lớn nhất của CLV.

## Bẫy lớn nhất: CLV trung bình toàn tệp nói dối

Con số CLV 5,76 triệu ở trên là một cái *bẫy* nếu bạn dừng ở đó. Vì nó là **trung bình** - và trung bình của một tệp khách lệch nặng thì lừa người tin nó (đúng như [trung bình nội dối](/blog/trung-binh-noi-doi/) đã phân tích về mean và median). Một nhóm nhỏ khách VIP chi đậm sẽ kéo con số trung bình lên cao, làm bạn tưởng "khách trung bình" đáng nhiều tiền hơn thực tế. Kéo thêm khách "trung bình" theo cái trần ảo đó, bạn lỗ.

Cách đúng: **tính CLV theo từng phân khúc**, đừng gộp.

<div class="viz">
<div class="viz-chart" data-chart="bar" data-chart-data='{"categories":["VIP","Trung thành","Thường","Mới"],"unit":" triệu","series":[{"name":"CLV trung bình","values":[24,11,4.5,1.8],"color":"#6366f1"}]}'></div>
<div class="viz-caption">CLV theo phân khúc (số minh họa): khách VIP đáng gấp ~13 lần khách thường - nên ngân sách giữ chân và chi phí thu hút cho phép phải khác nhau hẳn giữa các nhóm.</div>
</div>

Nhìn vào biểu đồ, "khách trung bình 5,76 triệu" tan biến. Bạn không có một loại khách - bạn có bốn, với CLV chênh nhau hơn mười lần. Và nếu trần CAC của bạn là một con số duy nhất tính trên trung bình, bạn đang đồng thời *trả quá nhiều* để kéo khách Thường và *trả quá ít* để giành khách VIP khỏi tay đối thủ.

## Dùng CLV để phân bổ ngân sách: giữ đúng người, kéo đúng người

Khi đã có CLV theo phân khúc, ngân sách marketing thôi là "chia đều cho công bằng" mà trở thành một phép tính:

- **Giữ chân nhóm VIP bằng mọi giá hợp lý.** Một khách VIP đáng 24 triệu thì việc chi 2-3 triệu/năm để chăm sóc (ưu đãi riêng, hỗ trợ ưu tiên, quà Tết) là một khoản đầu tư lời, không phải chi phí. Mất một khách VIP = mất giá trị của hơn mười ba khách Thường.
- **Đặt trần CAC riêng cho từng nhóm.** Kéo một khách có hồ sơ giống nhóm Trung thành (CLV 11 triệu) cho phép bạn chi tới ~3,6 triệu; kéo khách giống nhóm Thường thì trần chỉ ~1,5 triệu. Cùng một chiến dịch, hai mức giá thầu khác nhau.
- **Buông nhóm không kinh tế.** Nếu một kênh chỉ kéo về khách nhóm Mới với CLV 1,8 triệu mà CAC ở đó đã 2 triệu, đó không phải kênh cần "tối ưu thêm" - đó là kênh cần *tắt*.

Đây cũng là chỗ CLV khớp với **[RFM segmentation](/blog/rfm-segmentation/)**: RFM cho bạn cách *chia* tệp khách theo hành vi mua, CLV cho bạn biết mỗi nhóm đó *đáng bao nhiêu tiền* để giữ và để kéo. Hai mảnh ghép của cùng một quyết định.

## Tính CLV theo phân khúc thường vướng ở khâu dữ liệu

Đây là lý do nhiều doanh nghiệp biết rõ lý thuyết trên mà vẫn xài CLV trung bình toàn tệp: dữ liệu nằm rải rác. Doanh thu ở KiotViet, chi phí ads ở Facebook và TikTok, giá vốn trong một file Excel của kế toán, định nghĩa "khách VIP" thì mỗi phòng hiểu một kiểu. Ghép chúng lại để tính CLV cho từng phân khúc là một dự án, không phải một câu hỏi.

Semantix không phải là thêm một dashboard CLV để bạn ngắm. Nó có sẵn **CLV như một template phân tích nâng cao**: bạn chỉ cần trỏ ba thứ - cột khách hàng, cột ngày mua, chỉ số doanh thu - đặt **biên lợi nhuận (%)** và **tuổi thọ kỳ vọng (năm)** làm tham số (không cần cột giá vốn), rồi hỏi bằng tiếng Việt. Template trả về cho **từng khách**: số đơn, doanh thu, AOV, số đơn/năm, **CLV lịch sử**, **CLV dự đoán**, và cột **trần CAC** (= CLV dự đoán ÷ 3 - luật 3×CAC nhúng sẵn). Thêm một chiều phân khúc là cắt ngay con số đó theo nhóm:

> **"CLV theo phân khúc khách năm nay, kèm trần CAC từng nhóm"**

AOV, tần suất, margin được chốt một lần trong [Semantic Layer](/blog/semantic-layer/) - không còn cảnh ba phòng ban cãi nhau "VIP" là ai và CLV tính thế nào. Và vì nó cắt theo phân khúc chứ không gộp, cái bẫy "CLV trung bình toàn tệp" ở trên tự động biến mất.

## Tóm lại

| Câu hỏi | Cách dùng CLV sai | Cách dùng CLV đúng |
| --- | --- | --- |
| Một khách đáng bao nhiêu? | Nhìn doanh thu trọn đời | Tính **lợi nhuận** trọn đời (đã trừ giá vốn × margin) |
| Tính cho ai? | Một số trung bình toàn tệp | Một con số **cho từng phân khúc** |
| Được chi bao nhiêu để có khách? | Đoán theo cảm tính | Trần CAC theo luật **CLV ≥ 3×CAC**, riêng từng nhóm |
| Historic hay Predictive? | Chỉ cộng quá khứ rồi dừng | Historic để soi đã qua, **Predictive để ra quyết định** |
| Ngân sách giữ chân | Chia đều cho công bằng | Dồn vào nhóm CLV cao nhất |

> **Quy tắc vàng:** CLV không phải con số để treo lên báo cáo - nó là cái trần cho mọi đồng bạn chi để có một khách. Và phải là *cái trần theo phân khúc*, vì CLV trung bình toàn tệp luôn nói dối ở những tệp khách lệch.

---

*Muốn biết mỗi phân khúc khách của bạn thực sự đáng bao nhiêu - và bạn được phép chi tới đâu để có thêm một khách? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Cohort Revenue & LTV](/blog/cohort-revenue-ltv/) để xem giá trị khách tích luỹ theo thời gian.*
