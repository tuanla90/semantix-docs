---
title: "PCA: khi bạn có 15 cột chỉ số khách - và mắt không thấy nhóm nào với nhóm nào"
code: "pt-048"
description: "Dashboard 15 cột về khách. Số đơn, tần suất, giá trị, số kênh, số lần trả hàng... nhìn mãi không ra nhóm. PCA nén còn 2 trục để phân khúc tự lộ ra."
pubDate: 2025-02-25
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/pca-principal-component.png"
coverAlt: "PCA giảm chiều: nhiều mũi tên chỉ số nén còn hai trục, các cụm điểm tự tách ra"
---

Bạn mở một bảng khách hàng. Mỗi dòng là một khách, và có **15 cột chỉ số**: số đơn, tần suất mua, giá trị trung bình mỗi đơn, tổng chi, số ngày từ lần mua cuối, số kênh đã mua, số lần trả hàng, số voucher đã dùng, số lần vào app, số sản phẩm khác nhau đã mua. Bạn cuộn ngang, cuộn dọc, tô màu vài cột. Và rồi bạn nhận ra: **mắt người không nhìn ra nhóm.**

Phản xạ đầu tiên là vẽ biểu đồ. Nhưng vẽ biểu đồ gì? Một biểu đồ chỉ có hai trục. Bạn có 15 chiều. Bạn vẽ "số đơn theo tổng chi" thì thấy một đám mây; vẽ "tần suất theo số kênh" thì lại một đám mây khác. Mười lăm chiều nghĩa là **105 cặp biểu đồ** có thể vẽ - và không cái nào kể hết câu chuyện, vì mỗi cái chỉ nhìn được hai chiều một lúc.

Đây là chỗ **PCA (Principal Component Analysis - phân tích thành phần chính)** bước vào. Nói gọn trong một câu: PCA **gộp nhiều chỉ số tương quan với nhau thành vài "trục" mới**, giữ được phần lớn thông tin, để bạn vẽ được đám khách lên 2D và *nhìn thấy* các cụm đang ẩn trong 15 cột kia.

## PCA là gì: nén nhiều chỉ số thành vài trục

Hãy để ý một điều trong bảng 15 cột: rất nhiều cột **đi cùng nhau**. Khách mua nhiều đơn thì thường cũng tổng chi cao, cũng vào app nhiều, cũng mua nhiều sản phẩm khác nhau. Bốn cột đó không phải bốn thông tin độc lập - chúng đo gần như **cùng một thứ**: "khách này gắn bó cỡ nào". Đó là **tương quan** (correlation - mức độ hai con số cùng lên xuống với nhau). Nếu một bài về [tương quan và nhân quả](/blog/tuong-quan-nhan-qua/) đã cho bạn cảnh giác với nó, thì PCA là chỗ tương quan trở thành *bạn*: chính vì các cột dính nhau mà ta có thể nén chúng lại.

PCA làm đúng việc đó. Nó tìm ra một **trục mới** - gọi là **thành phần chính** (principal component) - chạy dọc theo hướng mà dữ liệu *biến thiên nhiều nhất*. Trục đầu tiên (**PC1**) gom phần lớn "sự khác nhau giữa các khách". Trục thứ hai (**PC2**) gom phần khác nhau còn lại mà PC1 chưa bắt được. Hai trục này là **tổ hợp** của 15 cột gốc, không phải một cột nào trong số đó.

Một ẩn dụ: khi bạn mô tả một người, bạn không đọc ra chiều dài từng đốt xương. Bạn nói **"chiều cao"** - một con số tổng hợp đã gói gọn hàng chục số đo xương lại, vì chúng đi cùng nhau. PC1 cũng vậy: nó là "chiều cao" của khách hàng, một trục tổng hợp thay cho cả nắm chỉ số tương quan. Đó là **giảm chiều** (dimensionality reduction - rút từ nhiều chiều xuống vài chiều mà mất ít thông tin nhất).

> Quy tắc vàng: **PCA không tạo thông tin mới - nó vứt bớt sự trùng lặp.** Mười lăm cột nói tám điều; PCA tìm tám điều đó và xếp chúng theo thứ tự quan trọng.

## Đọc biểu đồ hai thành phần chính: cụm tách ra là phân khúc tự lộ

Khi đã nén 15 cột còn 2 trục, bạn vẽ được mỗi khách thành một điểm trên mặt phẳng PC1-PC2. Và đây là phần "à há": **những khách hành vi giống nhau sẽ tụ thành cụm.** Không phải vì bạn dán nhãn cho họ - mà vì khoảng cách trên biểu đồ phản ánh khoảng cách thật trong cả 15 chiều.

<div class="viz">
<div class="viz-chart" data-chart="scatter" data-chart-data='{"xName":"Thành phần chính 1 (PC1)","yName":"Thành phần chính 2 (PC2)","showAxisValue":true,"hideLabels":true,"points":[{"x":-3,"y":2,"color":"#10b981"},{"x":-2.6,"y":2.6,"color":"#10b981"},{"x":-3.2,"y":1.4,"color":"#10b981"},{"x":-2.2,"y":2.1,"color":"#10b981"},{"x":3,"y":2.2,"color":"#6366f1"},{"x":2.6,"y":1.6,"color":"#6366f1"},{"x":3.4,"y":2.8,"color":"#6366f1"},{"x":2.9,"y":1.2,"color":"#6366f1"},{"x":0.2,"y":-2.6,"color":"#f59e0b"},{"x":-0.4,"y":-3,"color":"#f59e0b"},{"x":0.6,"y":-2.2,"color":"#f59e0b"},{"x":-0.1,"y":-3.3,"color":"#f59e0b"}]}'></div>
<div class="viz-caption">Khách trên 2 thành phần chính (số minh họa): 15 chỉ số gốc nén còn 2 trục, ba cụm màu tự tách ra - mỗi cụm là một phân khúc khách có hành vi giống nhau.</div>
</div>

Ba cụm tách bạch như trên là tín hiệu rõ ràng: trong tệp khách của bạn có **ba kiểu hành vi khác nhau**, dù trước đó chúng chìm trong 15 cột không ai đọc nổi. Bước tiếp theo của analyst là quay lại hỏi: *cụm xanh lá khác cụm tím ở những chỉ số nào?* - và thường sẽ thấy, ví dụ, một cụm là khách mua đều giá trị cao, một cụm mua nhiều kênh nhưng hay trả hàng, một cụm mới và còn dè dặt. Việc gán nghĩa cho cụm chính là **gom cụm** (clustering - nhóm các điểm gần nhau thành phân khúc), và PCA là bước dọn đường cho nó nhìn thấy.

Lưu ý một điều thành thật: hai trục PC1, PC2 **khó gọi tên bằng lời**. PC1 không phải "doanh thu", cũng chẳng phải "tần suất" - nó là một pha trộn của cả hai và mười ba cột khác. Bạn đọc *vị trí tương đối* của các cụm, không đọc giá trị tuyệt đối trên trục. Đó là cái giá của việc nén chiều, ta sẽ nói ngay dưới đây.

## Khi nào SME thật sự cần PCA - và khi nào không

PCA nghe sang, nhưng đa số shop **chưa cần đến nó**. Nó chỉ trả công khi đúng ba điều kiện:

- **Bạn có *nhiều* chỉ số - chục cột trở lên - và nhiều cột tương quan.** Nếu bạn chỉ theo dõi 3-4 chỉ số khách, bạn không có chiều để mà giảm. Lúc đó [RFM](/blog/rfm-segmentation/) hoặc phân khúc bằng tay đã quá đủ: ba con số Recency-Frequency-Monetary phân khúc khách gọn gàng mà không cần một dòng toán ma trận nào.
- **Bạn muốn *nhìn thấy* cấu trúc ẩn, không chỉ tính một con số.** PCA mạnh nhất khi mục tiêu là khám phá - "tệp khách của tôi thật ra chia thành mấy nhóm tự nhiên?" - chứ không phải khi bạn đã biết câu hỏi.
- **Bạn muốn gọn một dashboard quá tải.** Đôi khi PC1 và PC2 đủ tóm tắt một bảng 15 cột thành hai cột để theo dõi xu hướng, thay vì rải mắt khắp 15 đường.

Còn đây là lúc **đừng** đụng tới PCA:

- **Ít chỉ số.** Bốn năm cột thì RFM, Pareto, hay một cái filter trong bảng tính là đủ. Dùng PCA ở đây là lấy búa tạ đập hạt dẻ.
- **Bạn cần giải thích con số cho sếp.** Vì trục PCA khó diễn giải bằng lời, nó tệ cho báo cáo "vì sao". Một phân khúc RFM nói "đây là khách At-Risk giá trị cao" thì sếp gật ngay; một biểu đồ PC1-PC2 thì phải giải thích nửa buổi.

> Quy tắc vàng: **PCA là kính lúp để *khám phá*, không phải thước để *báo cáo*.** Dùng nó để tìm ra cụm, rồi mô tả cụm bằng ngôn ngữ nghiệp vụ quen thuộc.

Đây cũng là lý do nó nằm chung họ với việc phân biệt [metric, dimension và KPI](/blog/metric-dimension-kpi/): PCA giúp bạn tìm ra *những chiều quan trọng nhất* ẩn sau hàng chục metric rời rạc, trước khi bạn quyết định chiều nào đáng nâng thành KPI.

## PCA trong Semantix

Nói thẳng để bạn khỏi hiểu lầm: **Semantix không phải là nơi bấm một nút để "chạy PCA".** PCA là một kỹ thuật thống kê chuyên sâu, thường được làm bằng Python (thư viện scikit-learn) hoặc R - đó là việc của analyst, không phải của một câu hỏi tiếng Việt. Hứa rằng Semantix tự chạy PCA sẵn sẽ là nói quá, và chúng tôi không làm vậy.

Chỗ Semantix giúp nằm ở **hai đầu** của quy trình, là hai khâu thường ngốn nhiều công nhất:

1. **Đầu vào - gộp dữ liệu sạch về một mô hình.** PCA chỉ ăn được một bảng đẹp: mỗi dòng một khách, mỗi cột một chỉ số, không trùng, không lệch nguồn. Mà 15 chỉ số kia thường nằm rải khắp Shopee, TikTok Shop, KiotViet, CRM. Semantix dùng [bảng ảo](/blog/bang-ao-gop-du-lieu/) gộp và làm sạch chúng *ngay lúc truy vấn* - bạn lấy về đúng cái ma trận khách × chỉ số để đưa vào scikit-learn, thay vì copy-dán bốn file Excel.
2. **Đầu ra - vẽ và khám phá phân khúc.** Sau khi có nhãn cụm từ PCA/clustering, bạn đẩy nhãn đó trở lại mô hình dữ liệu và hỏi Semantix bằng tiếng Việt: *"doanh thu và tỷ lệ trả hàng của từng cụm khách quý này?"* - để biến một biểu đồ trừu tượng thành con số hành động được.

Nói cách khác: Semantix lo phần **dữ liệu sạch trước** và phần **kể chuyện sau**; phần toán PCA ở giữa vẫn là sân của analyst.

## Tóm lại

| Nhìn 15 cột chỉ số rời | Nén còn 2 trục bằng PCA |
|---|---|
| Mắt không thấy nhóm nào với nhóm nào | Cụm khách tự tách ra trên một biểu đồ |
| 105 cặp biểu đồ, không cái nào kể hết | Một biểu đồ PC1-PC2 giữ phần lớn thông tin |
| Tưởng mỗi cột là một thông tin riêng | Thấy nhiều cột thật ra đo cùng một thứ |
| Phân khúc bằng cảm giác | Phân khúc bằng cấu trúc thật của dữ liệu |

PCA không cho bạn thông tin mới. Nó **gỡ bỏ lớp trùng lặp** che mất cấu trúc - để cái vốn đã có trong dữ liệu, nhưng bị giấu sau quá nhiều chiều, cuối cùng hiện ra đủ rõ cho mắt người nhìn thấy.

---

*Muốn đưa 15 cột chỉ số rải khắp Shopee, TikTok Shop, KiotViet về đúng một bảng sạch để phân tích? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [RFM Segmentation](/blog/rfm-segmentation/) - cách phân khúc khách khi bạn chỉ cần ba con số.*
