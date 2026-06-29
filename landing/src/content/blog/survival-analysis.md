---
title: "Survival Analysis: 'khách của bạn sống được bao lâu' - câu hỏi y học mà cohort đã trả lời từ lâu"
code: "pt-042"
description: "Phân tích sống sót nghe như chuyện bệnh viện. Nhưng đường cong sống sót của tập khách hàng chính là đường retention của cohort - và bạn dựng được nó hôm nay."
pubDate: 2025-11-02
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/survival-analysis.svg"
coverAlt: "Ba đường cong sống sót giảm dần: một phẳng ra ở mức cao, một rơi gần như thẳng đứng"
---

Một câu hỏi nghe rất "hàn lâm": **một khách hàng mới của bạn sống được bao lâu trước khi biến mất?**

Câu này vốn của giới y sinh. Khi thử một loại thuốc, bác sĩ không chỉ hỏi "bao nhiêu phần trăm bệnh nhân khỏi" - họ hỏi "sau bao nhiêu tháng thì một nửa số bệnh nhân còn sống", rồi vẽ ra một **đường cong sống sót** giảm dần theo thời gian. Cả một nhánh thống kê tên là *survival analysis* (phân tích sống sót) sinh ra để trả lời đúng dạng câu hỏi đó.

Phản xạ của bạn có thể là: "Hay đấy, nhưng đó là chuyện bệnh viện, không phải chuyện shop của tôi." Sai một nửa. Đổi "bệnh nhân" thành "khách hàng", đổi "qua đời" thành "ngừng mua", và đường cong sống sót đó **chính là đường retention của cohort** mà bạn đã quen - chỉ gọi bằng một cái tên oai hơn. Tin tốt: bạn không cần học lại gì cả.

## Survival analysis là gì - và vì sao nó là họ hàng của cohort

**Survival analysis đo *thời gian đến một sự kiện*** - không phải "có hay không", mà "bao lâu thì xảy ra". Sự kiện có thể là khách rời bỏ (churn - khách ngừng mua), thiết bị hỏng, hợp đồng hết hạn, nhân viên nghỉ việc. Đầu ra kinh điển của nó là **survival curve (đường cong sống sót)**: trục dọc là *phần trăm còn "sống"* (còn hoạt động), trục ngang là *tuổi đời* tính từ thời điểm bắt đầu. Đường này luôn xuất phát ở 100% và chỉ đi xuống.

Giờ nhớ lại [đường cong giữ chân của cohort](/blog/cohort-retention-pmf/): gom khách theo tháng bắt đầu, rồi vẽ tỷ lệ còn hoạt động theo tuổi đời. Trục dọc là % còn lại, trục ngang là số tháng kể từ lần đầu, đường xuất phát 100% và đi xuống.

Đó là **cùng một đường cong**. Survival curve và retention curve là hai cái tên cho một thứ. Giới y sinh gọi là "sống sót" vì sự kiện của họ là cái chết; người làm SME (Small and Medium Enterprise - doanh nghiệp vừa và nhỏ) gọi là "giữ chân" vì sự kiện là khách rời đi. Bản chất phép đo không đổi.

Survival analysis có thêm một mánh kỹ thuật đáng nhắc: **censoring (dữ liệu cắt cụt)**. Một khách mua lần đầu tháng trước và *vẫn đang hoạt động* thì chưa "qua đời" - bạn chỉ biết họ sống *ít nhất* tới hôm nay, chứ chưa biết tổng tuổi thọ. Bỏ họ ra khỏi phép tính thì sai, mà coi như họ đã rời cũng sai. Các phương pháp như **Kaplan–Meier** (cách dựng đường cong sống sót xử lý đúng phần dữ liệu cắt cụt) hay **hazard rate** (tỷ lệ rủi ro rời bỏ *ngay tại* một mốc tuổi, với điều kiện đã sống tới đó) ra đời chính để xử lý chuyện này một cách chặt chẽ. Bạn không cần thuộc công thức - chỉ cần nhớ: *"khách chưa rời" không phải là "khách sẽ ở mãi".*

## Đọc một đường cong sống sót: nhìn độ dốc, không nhìn điểm xuất phát

Mọi đường cong đều bắt đầu ở 100%. Thông tin nằm ở **hình dạng nó đi xuống**, không phải chỗ nó xuất phát.

- **Dốc đứng ở đầu** = bạn mất khách nhanh ngay sau lần đầu. Đây thường là dấu hiệu lần mua đầu không tạo được lý do để quay lại - onboarding (dẫn dắt khách mới) hỏng, hoặc sản phẩm không giải quyết vấn đề đủ đau.
- **Phẳng ra ở một mức dương** = có một *lõi trung thành*. Khi đường ngừng rơi và nằm ngang ở, ví dụ, 40%, nghĩa là nhóm còn lại đã "miễn nhiễm" với việc rời đi - họ là tài sản thật của bạn.
- **Phẳng ở mức nào** quan trọng hơn **rơi nhanh cỡ nào lúc đầu**. Một tập khách rơi mạnh tháng đầu rồi phẳng ở 35% đáng giá hơn nhiều một tập rơi chậm nhưng cứ trượt dần về 0.

> Quy tắc vàng: đừng ăn mừng vì điểm xuất phát cao. Hỏi "đường cong nằm ngang ở đâu" - đó mới là tuổi thọ thật của tập khách.

## So các nhóm khách: mỗi nhóm một số phận sống sót

Sức mạnh thật xuất hiện khi bạn **vẽ nhiều đường cong cạnh nhau** cho các nhóm khách khác nhau. Cùng một shop, khách đến từ một đợt flash sale (giảm giá chớp nhoáng) và khách đến từ giới thiệu có "tuổi thọ" khác nhau một trời một vực - và bạn chỉ thấy điều đó khi tách đường cong ra.

<div class="viz">
<div class="viz-chart" data-chart="line" data-chart-data='{"xLabels":["M0","M1","M2","M3","M4","M5","M6"],"yUnit":"%","series":[{"name":"Khách giá trị cao","values":[100,82,74,70,68,67,67],"color":"#10b981","endLabel":true},{"name":"Khách trung bình","values":[100,60,42,32,26,22,20],"color":"#f59e0b","endLabel":true},{"name":"Khách mua 1 lần","values":[100,28,14,8,5,3,2],"color":"#ef4444","endLabel":true}]}'></div>
<div class="viz-caption">Đường cong sống sót theo nhóm khách (số minh họa): trục dọc là % còn hoạt động, trục ngang là số tháng kể từ lần đầu. Nhóm giá trị cao phẳng ra (có lõi trung thành); nhóm mua 1 lần rơi gần như thẳng đứng.</div>
</div>

Đọc ba đường này:

- **Khách giá trị cao** (xanh): rơi nhẹ rồi *phẳng ra quanh 67%*. Hai phần ba số họ trở thành lõi trung thành. Đây là tập khách đáng đổ tiền giữ chân và nhân rộng.
- **Khách trung bình** (cam): rơi đều, chững lại quanh 20%. Có một lõi nhỏ, nhưng mỏng - cần tìm xem 20% ấy khác gì 80% còn lại.
- **Khách mua 1 lần** (đỏ): rơi **gần như thẳng đứng**, về 2% sau sáu tháng. Đây không phải khách hàng, đây là *giao dịch một lần*. Mọi đồng quảng cáo đổ vào để kéo thêm nhóm này là tiền thuê doanh thu, không phải xây tài sản.

Một con số tổng - "tỷ lệ giữ chân trung bình 30%" - sẽ trộn cả ba đường này thành một, và che mất sự thật rằng bạn đang có *một mỏ vàng và một cái xô thủng* nằm cạnh nhau.

## Ứng dụng cho SME: ước lượng "tuổi thọ khách" và thời điểm nên can thiệp

Đường cong sống sót không chỉ để ngắm. Nó trả lời hai câu hỏi tiền bạc rất cụ thể:

**1. "Một khách trung bình đáng giá bao nhiêu?"** Diện tích dưới đường cong xấp xỉ *tuổi thọ trung bình* của tập khách (tính bằng số tháng họ ở lại). Nhân tuổi thọ đó với doanh thu trung bình mỗi tháng, bạn ra một ước lượng [LTV (Customer Lifetime Value - giá trị trọn đời của khách)](/blog/cohort-analysis/) có cơ sở, thay vì đoán mò. Nhóm xanh ở trên sống lâu hơn nhóm cam nhiều lần - nên LTV của họ cũng cao hơn nhiều lần, và bạn được phép chi nhiều hơn để có một khách như vậy.

**2. "Khi nào nên ra tay giữ chân?"** Nhìn chỗ đường cong *dốc nhất* - đó là khoảng tuổi mà rủi ro rời bỏ cao nhất (chính là hazard rate đạt đỉnh). Với nhóm trung bình ở trên, vực thẳm nằm ngay giữa M0 và M2: rơi từ 100% xuống 42%. Đó chính là cửa sổ nên đặt một cú can thiệp - tin nhắn chăm sóc, ưu đãi lần mua thứ hai, một lời nhắc đúng lúc - *trước* khi khách trượt qua mép vực, chứ không phải sau khi họ đã đi.

Đặt một ngưỡng can thiệp đúng chỗ dốc nhất thường rẻ hơn và hiệu quả hơn nhiều so với cố giành lại khách đã rời hẳn.

## ... trong Semantix

Nói thẳng cho rõ ràng: **Semantix không có một module Kaplan–Meier hay hazard rate học thuật.** Nếu bạn là nhà nghiên cứu cần ước lượng đường cong sống sót với censoring chuẩn thống kê, khoảng tin cậy và kiểm định log-rank, đó là việc của R hay Python, không phải của Semantix. Chúng tôi không giả vờ ngược lại.

Nhưng với người làm SME, *"đường cong sống sót thực dụng" của tập khách hàng chính là đường retention của cohort* - và **cái đó thì Semantix dựng được**, không cần một dòng code. Bạn hỏi thẳng bằng tiếng Việt:

> **"Vẽ đường cong giữ chân theo tháng cho khách 2026, tách riêng nhóm giá trị cao và nhóm mua một lần"**

Semantix gom khách theo cohort, tính tỷ lệ còn hoạt động theo tuổi đời, tách nhóm bạn quan tâm, và dựng đúng đường cong bạn vừa thấy ở trên. Đây không phải một tính năng "phân tích sống sót" tách rời - nó là **góc nhìn sống sót áp lên đúng công cụ [Cohort](/blog/cohort-analysis/) bạn đã có**. Cùng một dữ liệu, cùng một phép tính, chỉ là một cách gọi tên giúp bạn hỏi câu sắc hơn.

## Tóm lại

| Ngôn ngữ y sinh | Ngôn ngữ SME (cohort) |
|---|---|
| Survival curve (đường cong sống sót) | Đường retention của cohort |
| "Bệnh nhân qua đời" | Khách rời bỏ (churn) |
| Tuổi thọ trung bình | Diện tích dưới đường → vòng đời khách → LTV |
| Hazard rate cao | Đoạn đường cong dốc nhất → thời điểm can thiệp |
| Kaplan–Meier, censoring | Cohort xử lý khách "chưa rời" theo tuổi đời |
| Cần R / Python | Hỏi bằng tiếng Việt trong Semantix |

Survival analysis không phải một kỹ thuật mới phải học. Nó là một *lăng kính* - một cách hỏi "khách sống được bao lâu" - và lăng kính đó soi vào đúng đường cong cohort mà bạn đã có sẵn.

---

*Muốn biết tập khách của mình "sống" được bao lâu? [Dựng đường cong giữ chân với dữ liệu thật - miễn phí qua Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp về [hình dạng đường cong & product-market fit](/blog/cohort-retention-pmf/).*
