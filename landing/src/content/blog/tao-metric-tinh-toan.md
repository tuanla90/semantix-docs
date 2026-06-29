---
title: "Metric tính toán: vì sao lợi nhuận gộp nên định nghĩa một lần - chứ không gõ lại trong từng file Excel"
code: "hd-013"
description: "Mỗi báo cáo lại gõ lại 'lợi nhuận gộp = doanh thu - giá vốn'. Mỗi người một kiểu, sai một ô là lệch cả bảng. Có cách định nghĩa một lần, dùng mãi."
pubDate: 2026-02-09
category: "Hướng Dẫn Thực Chiến"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/tao-metric-tinh-toan.svg"
coverAlt: "Hai cột gốc doanh thu và giá vốn đi qua một công thức trừ, cho ra metric lợi nhuận gộp dùng chung"
---

Cuối tháng, bạn mở file báo cáo doanh số. Ở cột bên phải, bạn gõ lại cái công thức quen thuộc: `= doanh_thu - giá_vốn`. Lợi nhuận gộp hiện ra. Tuần sau, bạn dựng một bảng khác cho phòng marketing - lại gõ lại công thức ấy. Tháng sau, một bạn mới vào tự dựng dashboard của bạn ấy, cũng gõ lại - nhưng quên trừ phí sàn, nên "lợi nhuận gộp" của bạn ấy cao hơn của bạn 12%.

Không ai gõ sai cú pháp cả. Cả ba công thức **đều chạy, đều ra số**. Vấn đề là cùng một khái niệm - "lợi nhuận gộp" - đang được **viết lại từ đầu ở mỗi file**, mỗi lần một kiểu. Và quy tắc nghiệt ngã của bảng tính vẫn thế: sai một ô là lệch cả bảng, mà chẳng có dòng cảnh báo nào.

Tin tốt: có một cách định nghĩa **một lần, dùng mãi** - và bạn không cần biết một dòng SQL nào. Khái niệm đó tên là **calculated metric (metric tính toán - con số dẫn xuất từ các cột/metric gốc bằng một công thức)**. Bài này hướng dẫn bạn hiểu nó là gì, vài metric tính toán kinh điển cho SME, và vì sao nên định nghĩa nó *một chỗ* thay vì gõ trong từng báo cáo.

## Metric tính toán là gì - và khác gì với "đo trực tiếp"

Hãy chia metric của bạn làm hai loại.

Loại thứ nhất là **metric đo trực tiếp**: con số đã nằm sẵn trong dữ liệu, bạn chỉ cộng/đếm lại. *Doanh thu* (cộng cột thành tiền). *Số đơn* (đếm dòng). *Giá vốn* (cộng cột giá nhập). Đây là nguyên liệu thô - máy đọc thẳng từ bảng ra.

Loại thứ hai là **metric tính toán**: con số *không có sẵn*, phải dựng lên từ một công thức trên các metric gốc. *Lợi nhuận gộp = doanh thu - giá vốn.* *Biên gộp = lợi nhuận gộp ÷ doanh thu.* Không cột nào trong dữ liệu tên là "lợi nhuận gộp" cả - nó là kết quả của một phép tính bạn *định nghĩa*.

Ẩn dụ dễ hình dung: metric đo trực tiếp giống **nguyên liệu trong tủ lạnh** - trứng, bột, đường, có sẵn. Metric tính toán giống **công thức nấu ăn** - "đánh trứng với đường rồi trộn bột". Vấn đề của hầu hết các công ty là: công thức ấy không nằm trong một cuốn sổ chung. Nó nằm rải rác trong đầu từng người, và được chép lại - đôi khi sai - vào từng file Excel.

> Quy tắc vàng: nguyên liệu thì máy đọc được, nhưng *công thức* thì phải có người định nghĩa. Định nghĩa nó một lần ở chỗ ai cũng dùng - đừng để mỗi người tự nhớ.

## Vài metric tính toán kinh điển cho SME

Đây không phải lý thuyết xa vời. Gần như mọi quyết định kinh doanh đều dựa trên một nhúm metric tính toán quen thuộc. Dưới đây là những cái dùng nhiều nhất, kèm công thức ngắn:

| Metric tính toán | Công thức (trên metric gốc) | Trả lời câu hỏi |
|---|---|---|
| **Lợi nhuận gộp** | doanh thu - giá vốn hàng bán | Bán xong còn lại bao nhiêu trước chi phí vận hành? |
| **Biên lợi nhuận gộp (%)** | lợi nhuận gộp ÷ doanh thu | Cứ 100đ bán ra giữ được mấy đồng? |
| **AOV** *(Average Order Value - giá trị đơn trung bình)* | doanh thu ÷ số đơn | Mỗi đơn khách chi trung bình bao nhiêu? |
| **Tỷ lệ chuyển đổi (%)** | số đơn ÷ số lượt truy cập | Trong 100 người ghé, mấy người mua? |
| **Doanh thu thực sau phí** | doanh thu - phí sàn - phí ship - chiết khấu | Tiền *thật sự* về túi sau khi sàn cắt phần của họ? |

Để ý cái bẫy lớn nhất nằm ở dòng cuối. *"Doanh thu"* thì ai cũng tính được. Nhưng **doanh thu thực sau phí** - con số quyết định bạn lời hay lỗ trên Shopee, TikTok Shop - lại là nơi mỗi người trừ một kiểu: người quên phí ship, người quên voucher, người tính cả đơn đã hoàn. *Ví dụ minh họa:* một nhà bán trên sàn thấy doanh thu 1,8 tỷ tháng sale, nhưng sau khi trừ đúng phí sàn 11-13% cộng phí vận chuyển và voucher, "doanh thu thực" chỉ còn quanh 1,5 tỷ - chênh tới 15-18% so với con số thô mà nhiều người vẫn báo lên sếp.

Mỗi metric ở trên chỉ đáng tin khi **công thức của nó được chốt một lần**. Còn nếu mỗi báo cáo tự gõ lại, bạn không có năm cái metric - bạn có năm cuộc tranh cãi chờ nổ ra. *(Đây cũng đúng là gốc của chuyện ba phòng ban đọc ba con số doanh thu khác nhau, mổ kỹ trong bài [Metric, Dimension, KPI: ba từ ai cũng nói](/blog/metric-dimension-kpi/).)*

## Vì sao định nghĩa ở tầng dữ liệu tốt hơn gõ trong từng báo cáo

Đến đây nhiều người sẽ nghĩ: "Thì tôi gõ công thức cẩn thận là được, việc gì phải phức tạp." Nhưng vấn đề không phải bạn gõ cẩn thận hay không - mà là **công thức đang sống ở sai chỗ**.

Khi công thức "lợi nhuận gộp" nằm rải rác trong từng file Excel, mỗi bản sao là một điểm có thể hỏng độc lập:

- Bạn A trừ phí sàn, bạn B quên → hai con số lệch, không ai biết cái nào đúng.
- Tháng sau phí sàn đổi từ 11% lên 13% → phải đi sửa *từng file một*, sót một file là con số đó âm thầm sai mãi.
- Người dựng file nghỉ việc → cái công thức (và lý do nó được tính như vậy) đi theo họ.

Cách đúng là kéo công thức **xuống một tầng thấp hơn báo cáo** - định nghĩa nó **một lần** ở nơi mọi báo cáo cùng lấy về. Tầng đó có tên: **Semantic Layer (tầng định nghĩa nghiệp vụ dùng chung)**. Định nghĩa "lợi nhuận gộp" ở đó một lần, và mọi dashboard, mọi câu hỏi, mọi người - đều rút ra **cùng một con số**. Đổi công thức? Sửa đúng một chỗ, cả công ty cập nhật theo.

Đây chính là cái mà giới kỹ thuật gọi là **single source of truth (một nguồn sự thật chung - một định nghĩa thống nhất, không phải một database chung)**. Không phải vì nó nghe sang, mà vì nó xóa sổ cả một loại lỗi: *"số sai trông như đúng"*. Một công thức gõ tay trong Excel chạy ra số tròn trịa nhưng thiếu phí ship sẽ không bao giờ tự báo cho bạn biết nó sai. Một metric định nghĩa ở tầng dữ liệu thì chỉ có một phiên bản để mà đúng. *(Vì sao "một nguồn sự thật" không có nghĩa là gom hết data về một kho, đọc thêm [Một nguồn sự thật thật ra nghĩa là gì](/blog/mot-nguon-su-that/).)*

Tôi đã từng vấp đúng loại lỗi này, hồi còn làm sản phẩm ở một công ty giáo dục. Tôi `group by` theo chương rồi đếm số câu hỏi, thấy vài chương "thiếu câu" nên vội đề xuất soạn thêm. Công thức chạy đúng, số ra tròn trịa - nhưng tôi quên mất rằng đề thi còn có ma trận trọng số và độ khó: một chương ít câu không có nghĩa là thiếu, nó chỉ chiếm tỷ trọng nhỏ. Cái "metric" đếm-đầu-câu của tôi đúng cú pháp mà sai bản chất, vì nó bỏ quên ngữ cảnh nằm ngoài con số. Bài học: một công thức chỉ đáng tin khi định nghĩa của nó *bao trọn* ngữ cảnh, chứ không phải khi nó chịu chạy. *(Tôi viết kỹ hơn về chuyện chốt định nghĩa metric trước khi đếm trong bài [BI analyst định nghĩa metric thế nào](/blog/bi-analyst-dinh-nghia-metric/).)*

## Tạo metric tính toán trong Semantix

Semantix không giải bài này bằng cách cho bạn một ô Excel đẹp hơn để gõ lại công thức - vì gõ lại công thức ở đâu thì vẫn là gõ lại. Cách tiếp cận là dời công thức ra khỏi báo cáo, đặt vào tầng dữ liệu:

1. **Khai báo các metric gốc một lần:** *doanh thu*, *giá vốn*, *phí sàn*, *số đơn* - đọc thẳng từ dữ liệu của bạn (kết nối Shopee, TikTok Shop, KiotViet, hay Google Sheets).
2. **Định nghĩa metric tính toán bằng công thức trên các metric gốc đó:** *lợi nhuận gộp = doanh thu - giá vốn*, *biên gộp = lợi nhuận gộp ÷ doanh thu*. Định nghĩa **một lần** trong Semantic Layer.
3. **Mọi câu hỏi, mọi dashboard dùng chung con số đó** - và bạn hỏi *bằng tiếng Việt*: "biên lợi nhuận gộp tháng này theo kênh?" Không cần ô công thức, không cần một dòng SQL.

Một lần định nghĩa. Cả công ty đọc cùng một con số. Đổi phí sàn thì sửa một chỗ - không phải mở mười file đi sửa tay. *(Muốn dựng định nghĩa đầu tiên này trong vài phút? Bắt đầu với [bản dùng thử miễn phí trên Google Sheets](/docs/vi/free-trial/).)*

## Tóm lại

| Gõ công thức trong mỗi báo cáo | Định nghĩa metric một lần ở tầng dữ liệu |
|---|---|
| Mỗi file một phiên bản "lợi nhuận gộp" | Một định nghĩa duy nhất cho cả công ty |
| Sai một ô là lệch cả bảng, không cảnh báo | Một phiên bản để mà đúng |
| Phí sàn đổi → sửa từng file, sót là sai mãi | Đổi công thức → sửa một chỗ, cập nhật khắp nơi |
| Người dựng nghỉ việc → công thức đi theo | Công thức là tài sản chung, ai cũng dùng được |

Lần tới khi bạn định gõ `= doanh_thu - giá_vốn` vào một ô Excel mới, dừng một giây và hỏi: *công thức này đã được định nghĩa ở đâu chưa, hay mình lại đang chép tay một phiên bản nữa?* Định nghĩa nó **một lần** ở chỗ ai cũng dùng - đó là khác biệt giữa một bảng số đẹp và một con số đáng tin.

---

*Muốn tạo metric tính toán như lợi nhuận gộp, AOV mà không cần một ô công thức Excel nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì & vì sao mọi doanh nghiệp cần](/blog/semantic-layer/).*
