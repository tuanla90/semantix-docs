---
title: "Xây Semantic Layer đầu tiên: định nghĩa 'doanh thu' chuẩn - bắt đầu bằng một metric, không phải cả vũ trụ"
code: "hd-018"
description: "Sales nói 4,2 tỷ, Finance nói 3,8 tỷ. Chưa định nghĩa 'doanh thu' thì mọi báo cáo cãi nhau. Hướng dẫn 4 bước dựng định nghĩa đầu tiên để cả công ty ra cùng một số."
pubDate: 2026-07-31
category: "Hướng Dẫn Thực Chiến"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/xay-semantic-layer-dau-tien.png"
coverAlt: "Ba con số doanh thu khác nhau quy về một định nghĩa chung rồi ra một con số duy nhất"
---

Phòng Sales báo doanh thu tháng vừa rồi là 4,2 tỷ. Phòng Finance bảo 3,8 tỷ. Bạn ngồi giữa, nhìn hai con số lệch nhau gần 400 triệu, và câu hỏi đầu tiên bật ra trong đầu là *"ai nhập sai?"*. Không ai nhập sai cả. Sales tính cả đơn đã chốt nhưng chưa giao; Finance chỉ tính đơn đã thu tiền và trừ đơn hoàn. Hai người, hai công thức, cùng gọi tên là "doanh thu" - và **chưa ai từng viết ra định nghĩa "doanh thu" ở một chỗ duy nhất.**

Chừng nào còn vậy, mọi báo cáo bạn dựng - dù đẹp đến đâu - đều chỉ là cái cớ để hai phòng cãi nhau ở phiên bản cao cấp hơn. Bài này không bàn *khái niệm* **Semantic Layer** (tầng định nghĩa nghiệp vụ dùng chung - nếu bạn muốn hiểu nó *là gì*, đọc [Semantic Layer là gì](/blog/semantic-layer/) trước). Bài này là hướng dẫn *thao tác*: dựng **định nghĩa đầu tiên** của bạn, từng bước, ngay hôm nay.

## Đừng định nghĩa cả vũ trụ - bắt đầu bằng MỘT metric

Sai lầm phổ biến nhất khi nghe "xây semantic layer" là tưởng phải ngồi định nghĩa *toàn bộ* nghiệp vụ trước khi dùng được: doanh thu, lợi nhuận, khách hàng, tồn kho, từng phễu, từng kênh... Nghĩ vậy là dự án chết yểu - vì nó biến một việc làm-được-trong-buổi-chiều thành một dự án sáu tháng không ai dám bắt đầu.

Semantic Layer không phải công trình. Nó là **một cuốn từ điển bạn viết dần từng mục.** Và mục đầu tiên - gần như luôn luôn - là **doanh thu**: con số bị cãi nhau nhiều nhất, xuất hiện trong nhiều báo cáo nhất, và đáng để chốt nhất.

> Quy tắc vàng: một metric (con số đo được) được cả công ty đồng thuận còn giá trị hơn năm mươi metric mỗi người hiểu một kiểu. Bắt đầu nhỏ, bắt đầu từ con số gây tranh cãi nhất.

Bốn bước dưới đây đưa bạn từ "ba phòng ba số" về "một định nghĩa, một con số".

## Bước 1: Viết định nghĩa thật ra bằng lời - trước khi đụng tới công thức

Đừng mở công cụ. Đừng viết SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu). Mở một trang giấy, gọi đúng những người đang cãi nhau (Sales, Finance, có thể cả kế toán), và viết ra **một câu tiếng Việt** mà tất cả gật đầu:

> *"Doanh thu = giá trị các đơn đã giao thành công, trừ đơn hoàn và đơn hủy, chưa gồm phí ship."*

Câu đó nhìn tầm thường, nhưng nó vừa trả lời dứt khoát bốn câu hỏi mà hôm nay mỗi phòng tự trả lời một kiểu:

- **Đơn nào được tính?** Chỉ đơn *đã giao thành công* - không tính đơn mới chốt, đơn đang giao.
- **Trừ gì?** Trừ *đơn hoàn và đơn hủy* - tiền trả lại khách thì không phải doanh thu.
- **Phí ship có gồm không?** *Không* - phí ship khách trả là tiền của đơn vị vận chuyển, không phải của bạn.
- **Tính theo thời điểm nào?** Theo *ngày giao thành công*, không phải ngày đặt.

Cái khó của bước này không phải kỹ thuật - mà là **buộc mọi người nói ra điều họ vẫn ngầm hiểu khác nhau.** Chính lúc viết câu này ra, bạn sẽ phát hiện Sales và Finance chưa bao giờ thật sự đồng ý với nhau. Đó là cả mục đích. Một định nghĩa chưa viết ra được bằng lời thì đừng mơ dịch nó thành công thức.

## Bước 2: Dịch câu đó thành quy tắc dùng chung

Giờ mới tới phần dịch định nghĩa bằng lời thành **logic nghiệp vụ** (business logic - các quy tắc tính toán phản ánh cách doanh nghiệp vận hành) mà máy hiểu được. Một định nghĩa metric trong Semantic Layer luôn gồm ba phần: **đơn vị tính, bộ lọc, và công thức.**

```yaml
metric: doanh_thu
  mô_tả: "Đơn đã giao thành công, trừ hoàn/hủy, chưa gồm phí ship"
  đơn_vị: VND
  bộ_lọc:                       # ai được tính vào
    - trạng_thái IN ('da_giao')
    - đơn_hoàn = false
  công_thức: SUM(gia_tri_hang - chiet_khau)   # KHÔNG cộng phi_ship
  mốc_thời_gian: ngay_giao      # không phải ngay_dat
```

Đối chiếu từng dòng với câu tiếng Việt ở Bước 1, bạn sẽ thấy không có gì bí ẩn: *"đã giao thành công"* thành bộ lọc `trạng_thái IN ('da_giao')`; *"trừ hoàn/hủy"* thành `đơn_hoàn = false`; *"chưa gồm phí ship"* thành việc công thức cố ý *không* cộng `phi_ship`. Mỗi mệnh đề trong câu nói thường biến thành đúng một dòng quy tắc.

Điểm mấu chốt: **bạn viết đoạn này đúng một lần.** Từ giờ trở đi, không ai gõ lại công thức `SUM(...)` trong báo cáo riêng của mình nữa - họ chỉ gọi tên `doanh_thu`. Đó là khác biệt giữa một semantic layer thật và một đống công thức Excel rải rác: logic nghiệp vụ trở thành **tài sản chung, định nghĩa một chỗ, không phải mật khẩu trong đầu một người.**

## Bước 3: Test với vài câu hỏi để mọi người ra CÙNG một số

Định nghĩa xong chưa phải là xong. Bạn phải *chứng minh* nó hoạt động - bằng cách bắt nó trả lời cùng một câu hỏi từ nhiều hướng và kiểm tra mọi đường đều ra **một** con số.

Lấy đúng tháng đang bị cãi, hỏi ba kiểu:

1. *"Doanh thu tháng 5 là bao nhiêu?"* → ra một số, ví dụ **3,95 tỷ**.
2. *"Cộng doanh thu từng ngày trong tháng 5 lại."* → phải ra **đúng 3,95 tỷ**, không lệch một đồng.
3. *"Doanh thu tháng 5 theo từng kênh Shopee / TikTok Shop / KiotViet, cộng lại."* → vẫn phải bằng **3,95 tỷ**.

*(Các con số trên là ví dụ minh họa.)* Nếu ba cách ra ba số khác nhau, định nghĩa của bạn còn lỗ hổng - thường là một bộ lọc bị quên hoặc một đơn bị đếm trùng khi tách kênh. Sửa định nghĩa *ở một chỗ*, test lại, cho đến khi mọi đường về cùng một đích.

Phép thử thật sự diễn ra ở cuộc họp kế tiếp: Sales mở báo cáo, Finance mở báo cáo, và lần đầu tiên cả hai thấy **3,95 tỷ** giống hệt nhau. Không phải vì họ thỏa hiệp - mà vì cả hai đang đọc cùng một định nghĩa. Khoảnh khắc đó mới là lúc semantic layer chứng minh nó đáng công.

## Bước 4: Mở rộng dần - mỗi lần thêm đúng một định nghĩa

Có một metric chuẩn rồi, bạn không dừng lại - nhưng cũng đừng vội ôm cả vũ trụ. Mở rộng theo nhịp **mỗi lần một định nghĩa**, ưu tiên cái đang bị hỏi nhiều nhất:

- **Lợi nhuận sau phí** - lấy `doanh_thu` vừa định nghĩa, trừ giá vốn, phí sàn, phí ship, phí ads. Đây là **metric tính toán** (calculated metric - con số dẫn xuất từ các metric gốc bằng một công thức), dựng trên metric bạn đã có. Cách làm chi tiết xem [Tạo metric tính toán](/blog/tao-metric-tinh-toan/).
- **Khách quay lại** - khách từng mua, nay mua lại sau một thời gian vắng. Phải chốt "vắng bao lâu thì tính là quay lại".
- **Đơn hàng trung bình (AOV)** - `doanh_thu / số_đơn`, nhưng "số đơn" lại cần một định nghĩa con của riêng nó.

Mỗi định nghĩa mới đều **đứng trên định nghĩa cũ**, nên cuốn từ điển càng lúc càng dày mà không bao giờ mâu thuẫn với chính nó. Đây cũng là lúc bạn thật sự đang có [một nguồn sự thật](/blog/mot-nguon-su-that/) - không phải vì gom data về một chỗ, mà vì mọi con số đều quy về cùng một bộ định nghĩa gốc. *(Muốn phân biệt rạch ròi metric, dimension và KPI để đặt tên cho đúng? Xem [Metric - Dimension - KPI](/blog/metric-dimension-kpi/).)*

## ... làm việc này trong Semantix

Bạn có thể làm bốn bước trên trên giấy và trong file SQL - nhưng vấn đề cũ quay lại: định nghĩa nằm trong một file thì vẫn là *một người giữ chìa khóa*, ai hỏi cũng phải qua người đó. Semantix không phải "một chatbot AI cắm thẳng vào database rồi mong nó đoán đúng". Nó đặt đúng bốn bước này vào **Ngữ cảnh ngữ nghĩa** - nơi định nghĩa sống tập trung:

1. Bạn viết định nghĩa `doanh_thu` **một lần** (Bước 1-2) vào Ngữ cảnh ngữ nghĩa.
2. Từ đó, *bất kỳ ai* hỏi - gõ thẳng bằng **tiếng Việt**: *"doanh thu tháng 5 bao nhiêu?"* - đều được dịch về đúng định nghĩa gốc đó trước khi chạm vào dữ liệu.
3. Sales, Finance, CEO hỏi cùng câu, *cùng lúc hay cách nhau cả tháng*, đều nhận **cùng một con số** - vì không ai phải tự gõ lại công thức.

Định nghĩa một lần, cả công ty dùng mãi. Đó là khác biệt giữa "có báo cáo" và "có một nguồn sự thật".

## Tóm lại

| Trước: chưa có định nghĩa chung | Sau: một định nghĩa trong Semantic Layer |
|---|---|
| Sales 4,2 tỷ, Finance 3,8 tỷ - cãi nhau | Cả hai mở báo cáo đều ra 3,95 tỷ |
| Mỗi người tự gõ công thức trong file riêng | Gọi tên `doanh_thu`, không gõ lại lần nào |
| Đổi cách tính = đi sửa từng file | Sửa định nghĩa một chỗ, cả công ty cập nhật |
| AI đoán mò "doanh thu" là cột nào | AI dịch về đúng định nghĩa gốc trước khi tính |
| Họp giao ban thành phiên tòa xử ai sai | Hết tranh cãi, bàn thẳng vào quyết định |

Đừng đợi tới khi có "hệ thống hoàn chỉnh". Mở trang giấy, gọi Sales và Finance ngồi xuống, và viết ra một câu định nghĩa "doanh thu" mà cả hai gật đầu. Đó là dòng đầu tiên trong cuốn từ điển nghiệp vụ của công ty bạn - và là bước duy nhất tách bạn khỏi 90% doanh nghiệp vẫn đang để ba con số cãi nhau mỗi sáng thứ Hai.

---

*Muốn cả công ty cùng ra một con số "doanh thu" thay vì ba? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì - vì sao công ty bạn có ba con số doanh thu](/blog/semantic-layer/).*
