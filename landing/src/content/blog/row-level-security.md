---
title: "Row-Level Security: vì sao muốn chia sẻ dữ liệu rộng hơn, bạn lại phải khoá nó chặt hơn"
code: "kt-004"
description: "Sếp muốn cả công ty tự xem số. Bạn sợ chi nhánh này thấy doanh thu chi nhánh kia. Nên bạn khoá data lại — và không ai dùng được gì. RLS phá đúng cái thế kẹt đó."
pubDate: 2026-10-06
category: "Kiến Thức Nền Tảng"
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/row-level-security.svg"
coverAlt: "Một bảng dữ liệu chung, mỗi người dùng chỉ soi thấy đúng những hàng thuộc về mình"
---

Một chuỗi cửa hàng 12 chi nhánh ở TP.HCM muốn các quản lý chi nhánh tự xem số mỗi sáng, không phải nhắn tin xin báo cáo. Nghe đơn giản. Nhưng ngay lập tức có một câu hỏi làm cả ý tưởng đứng hình: nếu mở bảng doanh thu cho quản lý chi nhánh Quận 1, anh ấy cũng thấy luôn số của Quận 7, Thủ Đức, cả 12 chi nhánh. Doanh thu, biên lợi nhuận, lương — của người khác.

Phản xạ thường thấy lúc này là khoá lại cho chắc: thôi, không mở nữa, ai cần thì xin. An toàn thật. Nhưng cũng vừa giết chết toàn bộ ý tưởng "để mọi người tự xem số". Đây chính là cái thế kẹt mà **Row-Level Security (RLS — phân quyền theo hàng dữ liệu)** sinh ra để gỡ — và nghịch lý ít người chịu tin là: muốn *chia sẻ* dữ liệu rộng hơn, bạn phải *khoá* nó chặt hơn, chứ không phải lỏng hơn.

## Row-Level Security là gì — và vấn đề gốc nó giải

**Row-Level Security (RLS)**, tạm dịch "phân quyền theo hàng", là cơ chế quyết định *mỗi người được thấy những hàng dữ liệu nào* trong cùng một bảng. Không phải mỗi người một bảng riêng. Cùng một bảng `don_hang`, cùng một báo cáo doanh thu — nhưng khi quản lý Quận 1 mở ra, hệ thống tự lọc chỉ trả về các hàng có `chi_nhanh = "Quận 1"`. Quận 7 mở cùng báo cáo đó, thấy đúng các hàng của Quận 7. Sales A mở danh sách khách, chỉ thấy khách do mình phụ trách.

Khác biệt với phân quyền thông thường nằm ở độ mịn. Phân quyền kiểu cũ trả lời câu hỏi *"ai được vào báo cáo nào"* — đóng/mở ở cấp cả file, cả màn hình. RLS trả lời câu hỏi sâu hơn một bậc: *"trong cùng một báo cáo ai cũng vào được, mỗi người được thấy những dòng nào"*. Một bên là cánh cửa phòng. Một bên là việc trong phòng đó, mỗi người chỉ đọc được đúng những trang hồ sơ mang tên mình.

Vấn đề gốc rất đời thường: dữ liệu của một công ty vốn nằm chung một chỗ, nhưng quyền được thấy thì không chia đều. Không có cơ chế lọc theo hàng, bạn chỉ còn hai lựa chọn, cả hai đều tệ — mở hết cho tất cả, hoặc khoá hết và quay về xin-cho thủ công.

> Quy tắc vàng: phân quyền theo file trả lời "ai vào được phòng nào". Phân quyền theo hàng trả lời "trong phòng đó, mỗi người đọc được trang nào". Self-service cần cái thứ hai.

## Cái bẫy: "tạo cho mỗi người một bản báo cáo riêng"

Khi chưa biết tới RLS, gần như ai cũng rơi vào cùng một giải pháp tưởng-là-hiển-nhiên: thôi thì làm cho mỗi chi nhánh một bản báo cáo riêng. Báo cáo cho Quận 1, báo cáo cho Quận 7, lọc sẵn dữ liệu rồi gửi đúng người. 12 chi nhánh, 12 bản. Sạch sẽ, an toàn.

Cho tới khi nó không còn sạch sẽ. 12 bản hôm nay, nhưng tháng sau mở thêm 3 chi nhánh là 15 bản. Có thêm cấp vùng — miền Đông gom 5 chi nhánh, miền Tây gom 4 — lại đẻ ra một lớp báo cáo nữa. Mỗi lần sửa một công thức (đổi cách tính "doanh thu thuần"), bạn phải đi sửa tay 15 chỗ. Quên một chỗ là chi nhánh đó đọc số sai mà không ai hay. Đây đúng là kiểu vấn đề mà việc nhân bản định nghĩa nghiệp vụ ra nhiều nơi luôn gây ra — cùng họ với chuyện một công ty có năm định nghĩa "doanh thu" mà một [Semantic Layer](/blog/semantic-layer/) sinh ra để dẹp.

Ẩn dụ cho dễ hình dung: làm 12 bản báo cáo riêng giống như photocopy 12 bản hợp đồng, mỗi bản bôi đen tay những dòng người kia không được đọc. Một hai bản thì được. Đến bản thứ 15, lại sửa điều khoản gốc, bạn sẽ bôi sót — và bản photo nào đó lộ ra thứ đáng lẽ phải che. RLS thì ngược lại: **một** bản hợp đồng gốc duy nhất, và một quy tắc tự động quyết định mỗi người đọc đến đó nhìn thấy những dòng nào.

> Quy tắc vàng: nếu lời giải cho bài toán phân quyền là "nhân bản báo cáo ra nhiều phiên bản", bạn đang tạo ra thứ sẽ phản bội mình ở phiên bản thứ N.

## RLS làm ở tầng dữ liệu, không phải tầng giao diện

Đây là chỗ phân biệt RLS thật với RLS giả — và là chỗ nhiều người làm sai mà tưởng đã an toàn.

Cách làm sai: ẩn bớt dòng ở **tầng giao diện**. Báo cáo vẫn lấy về toàn bộ dữ liệu 12 chi nhánh, rồi dùng một bộ lọc trên màn hình để chỉ *hiển thị* chi nhánh của người đang xem. Trông thì đúng. Nhưng dữ liệu của 11 chi nhánh kia *đã được tải về máy người dùng rồi*, chỉ là bị che đi bằng CSS hay một filter mặc định. Ai biết chút kỹ thuật — mở DevTools, gọi thẳng API, hay xuất file — là thấy hết. Che mắt, không phải khoá cửa.

RLS thật làm ở **tầng dữ liệu**: quy tắc lọc được áp ngay khi truy vấn chạm vào database, *trước khi* một byte nào rời khỏi máy chủ. Quản lý Quận 1 hỏi "doanh thu hôm nay", câu truy vấn tự động được gắn thêm điều kiện `WHERE chi_nhanh = 'Quận 1'` ngay tại nguồn. Dữ liệu 11 chi nhánh kia *không bao giờ* được lấy ra, không bao giờ rời server, nên không có gì để lộ.

```sql
-- Cùng một câu hỏi "doanh thu hôm nay", hai người hỏi:
-- Hệ thống tự gắn điều kiện theo danh tính người hỏi —
-- không phải người dùng tự gõ, và không thể bỏ qua.

-- Quản lý Quận 1 hỏi  -> WHERE chi_nhanh = 'Quận 1'
-- Quản lý Quận 7 hỏi  -> WHERE chi_nhanh = 'Quận 7'
-- Giám đốc vùng hỏi   -> WHERE chi_nhanh IN ('Quận 1','Quận 7', ...)
```

Khác biệt nghe có vẻ kỹ thuật, nhưng hệ quả thì rất thực tế: lọc ở giao diện là một *gợi ý lịch sự* mà người dùng có thể lách; lọc ở tầng dữ liệu là một *bức tường* mà người dùng không chạm tới được. Khi nói chuyện [chia sẻ báo cáo cho nhân viên mà không lộ data nhạy cảm](/blog/chia-se-bao-cao-khong-lo-data/), đây là ranh giới phân định an toàn thật với an toàn giả.

## Nghịch lý: khoá chặt hơn để dám mở rộng hơn

Giờ quay lại lời hứa ở đầu bài. Vì sao "khoá chặt hơn" lại dẫn tới "chia sẻ rộng hơn"?

Vì rủi ro chính là thứ quyết định bạn dám mở data cho bao nhiêu người. Khi không có cơ chế lọc theo hàng, mỗi lần mở thêm một người là thêm một rủi ro lộ chéo — chi nhánh thấy số chi nhánh khác, sales thấy khách của sales khác. Rủi ro đó lớn đến mức câu trả lời an toàn duy nhất là *đừng mở*. Thế là data nằm trong két, và "self-service" mãi chỉ là khẩu hiệu.

RLS đảo ngược phương trình. Khi mỗi người *được bảo đảm* chỉ thấy đúng phần của mình bất kể họ hỏi gì, thì việc mở thêm một người không còn là thêm rủi ro. Bạn có thể mở cho cả 200 nhân viên cùng một báo cáo doanh thu — vì mỗi người tự động chỉ thấy lát cắt của mình. Cái khoá chặt ở tầng dữ liệu chính là thứ cho phép bạn buông tay ở tầng truy cập.

*Ví dụ minh hoạ:* một chuỗi F&B trước đây chỉ 3 người ở văn phòng được xem số, vì sợ mở rộng sẽ lộ chéo. Sau khi áp RLS theo `chi_nhanh`, họ mở báo cáo cho toàn bộ 40 quản lý ca — mỗi người chỉ thấy ca và cửa hàng mình. Số người tự phục vụ tăng hơn 10 lần, mà số dữ liệu nhạy cảm bị lộ vẫn bằng không. *(Con số là ví dụ minh hoạ.)* Đó là toàn bộ luận điểm gói trong một câu: RLS không phải để **giấu** data, mà để **dám** chia sẻ nó. Self-service rộng và an toàn không phải hai mục tiêu đánh đổi nhau — RLS là cái bản lề nối chúng lại, một chủ đề chạy xuyên suốt khi bàn về [BI cho SME](/blog/bi-cho-sme/).

## RLS trong Semantix

Semantix không coi phân quyền theo hàng là một "tính năng bảo mật" gắn thêm ở ngoài. Vấn đề chưa bao giờ là *ẩn bớt vài dòng trên màn hình* — mà là bảo đảm mỗi câu hỏi, kể cả câu hỏi tự do bằng tiếng Việt, đều trả về đúng phần dữ liệu người hỏi được phép thấy. Nên quy tắc lọc nằm ngay tại tầng dữ liệu, cùng chỗ với định nghĩa nghiệp vụ:

1. **Gắn quy tắc theo danh tính** — "chi nhánh mình", "khách mình phụ trách", "vùng mình quản" định nghĩa một lần, áp cho mọi báo cáo và mọi câu hỏi.
2. **Lọc tại nguồn, trước khi dữ liệu rời server** — quản lý ca gõ *"doanh thu hôm nay"*, điều kiện theo danh tính được gắn vào truy vấn tự động; dữ liệu ngoài phạm vi không bao giờ được lấy ra.
3. **Một báo cáo, đúng phần cho từng người** — không còn 15 bản báo cáo nhân bản tay; một bản duy nhất tự cắt lát theo người đang xem.

Nói cách khác, RLS ở đây không phải tấm rèm che màn hình, mà là một điều kiện được cài sẵn dưới đáy — để bạn dám mở data cho cả công ty mà không phải nín thở.

## Tóm lại

| Không có RLS (buộc phải khoá lại) | Có RLS (dám mở rộng) |
|---|---|
| Mở hết cho tất cả, hoặc khoá hết | Mở một báo cáo, mỗi người thấy phần mình |
| Nhân bản 15 bản báo cáo, sửa tay 15 chỗ | Một bản duy nhất, tự cắt lát theo người xem |
| Lọc ở giao diện — data đã rời server, lách được | Lọc ở tầng dữ liệu — chặn ngay tại nguồn |
| Mở thêm 1 người = thêm 1 rủi ro lộ chéo | Mở thêm 1 người = thêm 0 rủi ro |
| Self-service mãi là khẩu hiệu | Self-service rộng mà vẫn an toàn |

Câu hỏi đúng khi nghĩ về phân quyền dữ liệu không phải "làm sao giấu bớt số nhạy cảm" — mà là **"làm sao để dám mở data cho nhiều người hơn mà vẫn ngủ ngon?"** Trả lời được câu đó, bạn sẽ thấy nghịch lý kia hoá ra rất thẳng: khoá đúng chỗ — ở tầng dữ liệu, theo hàng — chính là điều kiện để buông tay ở mọi chỗ còn lại.

---

*Muốn để cả công ty tự xem số mà mỗi người chỉ thấy đúng phần của mình? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Chia sẻ báo cáo cho nhân viên mà không lộ data nhạy cảm](/blog/chia-se-bao-cao-khong-lo-data/).*
