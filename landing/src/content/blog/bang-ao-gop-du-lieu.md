---
title: "Bảng ảo: vì sao gộp dữ liệu ba kênh không cần copy về một chỗ - và dữ liệu luôn mới"
code: "hd-016"
description: "Cách quen thuộc để nhìn ba kênh cùng lúc là copy hết về một kho mỗi đêm. Bảng ảo lật ngược: gộp và làm sạch ngay lúc bạn hỏi, không nhân bản, dữ liệu luôn mới."
pubDate: 2026-03-12
category: "Hướng Dẫn Thực Chiến"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/bang-ao-gop-du-lieu.svg"
coverAlt: "Ba bảng nguồn từ ba kênh gộp vào một bảng ảo ở giữa, không copy, dữ liệu real-time"
---

11 giờ đêm. Bản đồng bộ dữ liệu Shopee hằng ngày bắt đầu chạy - kéo đơn của hôm nay về kho tổng. Nhưng đêm đó API Shopee chậm, job treo, rồi timeout lúc 0 giờ 40. Không ai để ý. 7 giờ sáng hôm sau, bạn mở dashboard doanh thu, đọc to trong cuộc họp: "Hôm qua ba kênh được 280 triệu." Con số trông tròn trịa, hợp lý. Nó sai. Trong kho tổng, dữ liệu Shopee dừng lại ở 0 giờ 40 - thiếu hẳn các đơn chốt sau nửa đêm, và toàn bộ đơn của buổi sáng vẫn chưa kịp về.

Phản xạ đầu tiên của bạn có thể là: "Vậy thì sửa cái job đồng bộ cho chạy ổn định hơn." Nhưng đây mới là chỗ ngược đời ít người chịu nhìn thẳng: **vấn đề không nằm ở cái job - mà ở chính ý tưởng phải copy dữ liệu về một kho trước khi nhìn được nó.** Cứ mỗi lần copy là một lần dữ liệu trễ một nhịp, một lần có thể hỏng, và một pipeline (đường ống dữ liệu) nữa phải bảo trì.

Tin tốt: có một cách khác, nhẹ hơn - không copy gì cả. Bạn gộp và làm sạch dữ liệu **ngay lúc hỏi**.

## Cách cũ: "đồng bộ" thật ra là "copy dữ liệu về kho"

Khi ai đó nói "để tôi đồng bộ ba kênh về một chỗ cho dễ nhìn", điều thực sự xảy ra bên dưới là: một quy trình ETL/đồng bộ (Extract-Transform-Load - trích xuất, biến đổi, nạp) chạy theo lịch, **đọc dữ liệu từ Shopee/TikTok Shop/KiotViet rồi chép một bản sao về kho tổng**. Báo cáo của bạn không đọc trên nguồn nữa - nó đọc trên bản sao đó.

Mô hình này có ba cái giá ít ai gọi tên lúc bắt đầu:

- **Trễ một nhịp.** Bản sao chỉ mới đến *lần chạy gần nhất*. Job chạy mỗi đêm thì sáng ra số đã cũ 7 tiếng. Job lỗi thì số đứng yên mà dashboard vẫn xanh.
- **Tốn lưu trữ.** Bạn đang giữ hai bản của cùng một dữ liệu - bản gốc ở sàn, bản sao ở kho. Dữ liệu càng lớn, hóa đơn lưu trữ càng phình.
- **Phải bảo trì.** Sàn đổi tên một cột, thêm một trạng thái đơn - pipeline gãy. Mà pipeline gãy thường im lặng: không báo đỏ, chỉ là số sai trông như đúng.

> Quy tắc vàng: mỗi bản copy dữ liệu là một nguồn trễ và một thứ phải bảo trì. Thứ rẻ nhất để vận hành là thứ bạn không phải copy.

## Bảng ảo là gì - và vì sao nó không cần copy

**Bảng ảo (virtual table - bảng định nghĩa bằng truy vấn, không lưu dữ liệu riêng)** là một bảng *trông như thật* khi bạn hỏi, nhưng bên trong nó không chứa một dòng dữ liệu nào của riêng mình. Nó chỉ chứa một *định nghĩa*: "bảng này = gộp đơn Shopee + đơn TikTok Shop + đơn KiotViet, làm sạch về một schema (cấu trúc bảng/cột) chung".

Hãy hình dung thế này. Cách cũ giống như mỗi đêm bạn thuê xe tải khuân hàng từ ba kho về một kho tổng, rồi sáng ra mới đi đếm ở kho tổng - hàng nào về muộn thì đếm thiếu. Bảng ảo thì ngược lại: bạn không khuân gì cả, bạn **lắp một ô cửa nhìn thấu cả ba kho cùng lúc**. Lúc cần đếm, bạn nhìn qua ô cửa và thấy đúng những gì đang có trong ba kho *ngay khoảnh khắc đó*.

Trong Semantix, bạn dựng một bảng ảo (loại `table_virtual`) theo một trong hai cách:

- **Bằng SQL** (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu): bạn viết thẳng một câu truy vấn định nghĩa bảng (`customSqlQuery`). Hợp với người đã quen SQL và cần logic phức tạp.
- **Bằng trình Visual UNION**: bạn chọn nhiều bảng nguồn bằng giao diện, hệ thống union (gộp các dòng từ nhiều bảng lại) chúng thành một, **tự thêm cột `nguồn`** để mỗi dòng vẫn biết nó đến từ kênh nào. Không gõ một dòng SQL.

## Clean lúc gộp: union không phải là "dán đại vào nhau"

Gộp ba bảng đa kênh mà không làm sạch thì chẳng khác gì đổ ba thùng ốc vít khác cỡ vào một thùng. Đây là lý do trình Visual UNION không chỉ chồng các dòng lên nhau - nó **làm sạch ngay lúc gộp**:

- **Map cột (đổi tên cột nguồn → cột chuẩn).** Shopee gọi `Tổng tiền người mua trả`, TikTok Shop gọi `SKU Subtotal After Discount`, KiotViet ghi `Thành tiền`. Bạn map cả ba về một cột chuẩn duy nhất, ví dụ `gia_tri_don`. Từ đó về sau chúng là *một* thứ.
- **Điền NULL cho cột thiếu.** Kênh nào không có cột `phi_affiliate` thì dòng đó để NULL, thay vì làm vỡ cả phép gộp. Schema vẫn vuông vức.
- **Chuẩn hóa về một schema chung.** Mọi dòng - dù từ kênh nào - ra cùng một bộ cột, cùng kiểu dữ liệu. Đây chính là *một nguồn sự thật* ở tầng dữ liệu, mà không phải chép dữ liệu đi đâu cả.

> **Tôi học việc map cột này bằng nước mắt.** Hồi ở một tập đoàn viễn thông đầu ngành, tôi đi khảo sát và làm giàu dữ liệu cho team Data Science - gộp nhiều nguồn có cùng nghĩa nhưng đặt tên mỗi nơi mỗi kiểu. Bài học thấm nhất: đừng vội union khi chưa thống nhất *cái mỗi cột thực sự đại diện cho điều gì*. Hai cột tên giống nhau mà một bên là "tiền trước giảm giá", một bên là "tiền sau giảm giá", ghép vào là tổng doanh thu sai mà nhìn vẫn rất "tròn trịa". Đó cũng là lý do tôi thích tách bạch bảng sự kiện và bảng chiều ([fact–dimension](/blog/data-modeling-fact-dimension/)): khi mỗi cột đã biết nó thuộc về đâu, việc map về schema chung mới hết mơ hồ.

Đây là phần nối tiếp tự nhiên của bài [Hợp nhất đa kênh](/blog/hop-nhat-da-kenh/): bài đó nói *vì sao* phải gộp ở tầng dữ liệu và ba cái bẫy khi gộp tay; bài này nói *cách làm* gộp đó **không cần copy về kho**.

## Không copy: định nghĩa được "tiêm" vào câu hỏi của bạn

Đây là điểm xoay kỹ thuật. Khi bạn hỏi một câu trên bảng ảo - *"doanh thu ba kênh hôm nay"* - Semantix không đi đọc một bản sao. Nó lấy *định nghĩa* của bảng ảo và **tiêm thẳng vào câu truy vấn** dưới dạng một CTE (Common Table Expression - bảng tạm đặt tên trong một câu truy vấn):

```sql
WITH don_da_kenh AS (
  SELECT 'Shopee'  AS nguon, gia_tri_don, trang_thai FROM shopee_orders
  UNION ALL
  SELECT 'TikTok'  AS nguon, gia_tri_don, trang_thai FROM tiktok_orders
  UNION ALL
  SELECT 'KiotViet' AS nguon, gia_tri_don, trang_thai FROM kiotviet_orders
)
SELECT nguon, SUM(gia_tri_don)
FROM don_da_kenh
WHERE trang_thai = 'thanh_cong'
GROUP BY nguon
```

Trình Visual UNION của bạn compile ra đúng khối `UNION ALL` đó. Câu truy vấn chạy **thẳng trên nguồn** ngay lúc bạn bấm hỏi. Hệ quả:

- **Dữ liệu luôn mới.** Bạn đọc đúng trạng thái nguồn *tại thời điểm hỏi* - không có khái niệm "bản chạy gần nhất" để mà trễ.
- **Không nhân bản.** Không một dòng `INSERT` nào chép dữ liệu sang chỗ khác. Không kho tổng, không hóa đơn lưu trữ kép.
- **Bảng ảo lồng nhau được.** Một bảng ảo có thể tham chiếu bảng ảo khác - bạn gộp ba kênh thành một bảng ảo "đơn hàng", rồi dựng tiếp bảng ảo "doanh thu theo tháng" lên trên nó, vẫn không copy gì.

So với việc "cắm chatbot thẳng vào database" thì đây vẫn là **gộp + làm sạch có định nghĩa** - chỉ khác là định nghĩa sống ngay trong câu truy vấn thay vì nằm trong một kho riêng. (Bảng ảo là một mảnh của bức tranh lớn hơn: lớp [Semantic Layer](/blog/semantic-layer/) đặt định nghĩa nghiệp vụ dùng chung lên trên nó.)

## Bảng ảo trong Semantix: ba bước

Quy trình gọn lại còn ba việc:

1. **Kết nối nguồn.** Cắm Shopee, TikTok Shop, KiotViet, Google Sheets hay database vào - mỗi nguồn giữ nguyên tại chỗ, không di dời. *(Database khuyến nghị là NocoBase, vì Semantix tự đọc được định nghĩa của nó - xem bài [NocoBase + Semantix](/blog/nocobase-semantix/).)*
2. **Tạo bảng ảo gộp + sạch.** Dùng trình Visual UNION chọn ba bảng nguồn → map cột về schema chung → để NULL cho cột thiếu → có ngay một bảng ảo "đơn hàng đa kênh", kèm cột `nguồn`.
3. **Hỏi bằng tiếng Việt.** *"Kênh nào doanh thu cao nhất hôm nay?"* - Semantix tiêm định nghĩa bảng ảo vào câu truy vấn, chạy thẳng trên nguồn, trả số *của ngay lúc này*.

Lưu ý cho công bằng: tính năng đồng bộ/copy-về-kho vẫn còn trong Semantix và có chỗ dùng riêng. Nhưng cho **bài toán gộp dữ liệu đa kênh để hỏi**, bảng ảo là cách được ưu tiên - nhẹ hơn, mới hơn, không nhân bản.

## Tóm lại

| Đồng bộ / copy về kho | Bảng ảo gộp lúc hỏi |
|---|---|
| Chép một bản sao về kho tổng theo lịch | Không copy - định nghĩa tiêm vào câu hỏi |
| Số mới tới *lần chạy gần nhất* | Dữ liệu luôn mới, đọc thẳng nguồn lúc hỏi |
| Giữ hai bản dữ liệu → tốn lưu trữ | Một bản duy nhất ở nguồn |
| Pipeline gãy âm thầm → số sai như đúng | Không pipeline để gãy |
| Gộp xong là "đông cứng" cấu trúc | Map cột, NULL cột thiếu, đổi schema ngay trong định nghĩa |

Câu hỏi đầu tiên không phải "làm sao cho cái job đồng bộ chạy ổn hơn?" - mà là **"mình có thật sự cần copy dữ liệu đi đâu không, hay chỉ cần một ô cửa nhìn thấu ba kho cùng lúc?"** Trả lời được câu đó, buổi họp 7 giờ sáng của bạn sẽ không còn đọc nhầm một con số đã chết từ 0 giờ 40.

---

*Muốn gộp ba kênh mà dữ liệu luôn mới, không phải bảo trì pipeline nào? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Hợp nhất đa kênh](/blog/hop-nhat-da-kenh/) để hiểu ba cái bẫy khi gộp tay.*
