---
code: "hd-009"
title: "Phân quyền theo hàng: muốn giữ bí mật lương, đừng giấu báo cáo — hãy cắt đúng phần mỗi người được thấy"
description: "Bạn không dám gửi dashboard cho quản lý chi nhánh vì sợ họ thấy lương cả công ty. Nên mỗi tuần lại ngồi cắt Excel tay cho từng người. Có cách khác."
pubDate: 2026-07-07
category: "Hướng Dẫn Thực Chiến"
readTime: 8
author: "Lê Thị Hương"
featured: false
cover: "/blog/covers/chia-se-bao-cao-khong-lo-data.svg"
coverAlt: "Một báo cáo được chia tới nhiều người, mỗi người chỉ thấy lát cắt dữ liệu của mình, phần còn lại bị che mờ"
---

Tối thứ Sáu. Anh chủ một chuỗi 4 cửa hàng mở file Excel doanh thu tổng, rồi bắt đầu một nghi thức quen thuộc: copy sheet ra, xóa cột lương, xóa biên lợi nhuận, lọc chỉ giữ chi nhánh Quận 7, lưu thành `bao-cao-Q7.xlsx`. Lặp lại cho Quận 1, Thủ Đức, Gò Vấp. Bốn file, bốn lần xóa cột, bốn lần "ủa file này mình cắt cột margin chưa nhỉ?". Đến file thứ ba thì anh không chắc nữa, nên mở lại từ đầu cho chắc. 40 phút mỗi tuần, chỉ để *giấu bớt* dữ liệu trước khi dám gửi đi. *(Cột "margin" ở đây là biên lợi nhuận.)*

Phản xạ của bạn lúc này có thể là: "Thôi để mình tự làm báo cáo cho chắc, gửi tay từng người, vậy mới kiểm soát được ai thấy gì." Nghe an toàn. Nhưng đây là chỗ ngược đời ít người chịu nhìn thẳng: **chính cái việc giấu thủ công đó đang vừa rò rỉ data vừa bóp nghẹt năng suất của cả đội.** Bạn tưởng đang kiểm soát, thực ra đang làm thủ kho cho dữ liệu của chính mình — và làm sai.

## Vấn đề gốc: không phải giấu hay không, mà là giấu thế nào

Chủ doanh nghiệp nào cũng có một nỗi sợ chính đáng: lộ lương, lộ doanh thu thật, lộ biên lợi nhuận. Nên phản xạ là *không chia sẻ gì cả* — giữ dashboard (bảng số trực quan) cho riêng mình, ai cần số thì mình cắt tay gửi. An toàn tuyệt đối, đúng không?

Không. Cái giá của "an toàn tuyệt đối" này là cả công ty mù. Quản lý chi nhánh không biết chi nhánh mình đang lời hay lỗ cho tới khi bạn rảnh tay cắt file. Sale không biết mình đứng đâu so với chỉ tiêu. Mọi quyết định đều phải đi vòng qua bạn — bạn thành nút thắt cổ chai của chính công ty mình.

Bài toán thật không phải "giấu hay chia sẻ". Mà là **giấu thế nào để vẫn chia sẻ được**. Câu trả lời có một cái tên: **Row-Level Security** (phân quyền theo hàng) — quy tắc cho phép nhiều người cùng mở *một* báo cáo, nhưng mỗi người chỉ nhìn thấy đúng những hàng dữ liệu thuộc về họ. Cùng một cánh cửa, khác nhau ở chỗ mỗi người được vào tới đâu.

Hãy hình dung một toà nhà văn phòng — tất cả nhân viên cùng đi qua một sảnh, dùng cùng một thang máy. Nhưng thẻ từ của mỗi người chỉ quẹt mở được tầng của họ. Bảo vệ không phải đứng phát từng bản đồ riêng cho từng người và bôi đen các tầng cấm. Một toà nhà, một hệ thống thẻ, mỗi người thấy đúng phần của mình. Phân quyền theo hàng vận hành y hệt.

## Sale chỉ thấy đơn của mình — không thấy bảng xếp hạng đồng nghiệp

Đội sale là nơi cắt tay đau nhất. Bạn muốn mỗi bạn sale thấy doanh số *của mình* để tự đốc thúc, nhưng không muốn bạn A nhìn thấy hoa hồng của bạn B — đó là mầm mống so bì, nghỉ việc.

Làm tay nghĩa là: mỗi tuần lọc đơn theo từng `mã_nhân_viên`, xuất ra ~10 file, gửi đúng người. Tuần nào cũng vậy.

*Ví dụ minh hoạ:* Một shop có 8 sale. Với phân quyền theo hàng, bạn định nghĩa đúng một quy tắc — *"mỗi người chỉ thấy hàng có `mã_sale` = mã của chính họ"*. Bạn Hương đăng nhập, dashboard tự lọc còn đơn của Hương. Bạn Tuấn đăng nhập, thấy đơn của Tuấn. Cùng một báo cáo, 8 góc nhìn, không file nào phải xuất tay.

## Quản lý chi nhánh chỉ thấy chi nhánh mình — không thấy bức tranh toàn công ty

Đây là tình huống của anh chủ chuỗi đầu bài. Quản lý Quận 7 cần thấy đầy đủ doanh thu, đơn hoàn, tồn kho *của Quận 7* để điều hành — nhưng không cần (và không nên) thấy chi nhánh Quận 1 đang lời gấp đôi.

*Ví dụ minh hoạ:* Quy tắc một dòng — *"quản lý chỉ thấy hàng có `chi_nhánh` = chi nhánh được gán cho họ"*. Người quản lý vùng phụ trách 2 chi nhánh thì gán 2 mã, họ thấy gộp đúng 2 cái đó. Bạn — chủ — đăng nhập thì thấy cả 4, vì vai trò của bạn là toàn quyền. Cùng một dashboard tồn kho, mỗi cấp thấy đúng tầm của mình.

## Kế toán thấy tiền nhưng không thấy lương — phân quyền cả theo cột

Có loại nhạy cảm không nằm ở *hàng* mà nằm ở *cột*. Kế toán cần thấy doanh thu, công nợ, dòng tiền — nhưng bảng lương nhân sự thì thuộc HR (Human Resources — bộ phận nhân sự), không phải việc của họ.

Lúc này phân quyền theo hàng đi kèm một người anh em: ẩn cột theo vai trò. Vai trò `kế_toán` thấy mọi cột tài chính nhưng cột `lương` bị che. Vai trò `nhân_sự` thì ngược lại — thấy lương, không thấy biên lợi nhuận từng đơn. Vẫn là một nguồn dữ liệu, định nghĩa một lần, mỗi vai trò một lát cắt.

> Quy tắc vàng: đừng tạo nhiều bản báo cáo để giấu data — hãy tạo một báo cáo, rồi định nghĩa ai được thấy hàng nào, cột nào. Mỗi bản sao bạn cắt tay là một bản sao sẽ lỗi thời và một cơ hội rò rỉ.

## 3 cái bẫy của việc cắt báo cáo bằng tay

Trước khi nói cách làm đúng, phải gọi tên ba cái bẫy đã làm rò rỉ data ở vô số công ty — không phải vì hack, mà vì con người mệt và làm tay.

**Bẫy 1 — Quên cắt một cột.** Bạn xóa cột `lương` nhưng để sót cột `chi_phí_nhân_sự` — từ đó người ta tính ngược ra lương. Hoặc đơn giản hơn: cuộn ngang chưa hết, cột margin nằm ở cột T mà mắt bạn dừng ở cột P. Một lần sót, lộ vĩnh viễn.

**Bẫy 2 — Gửi nhầm file.** File `bao-cao-Q7.xlsx` và `bao-cao-Q1.xlsx` nằm cạnh nhau trong cùng thư mục, tên gần giống. 11 giờ đêm, mệt, bạn kéo nhầm file Q1 đầy đủ margin vào tin nhắn gửi cho quản lý Q7. Không có nút thu hồi nào cứu được data đã rời tay bạn.

**Bẫy 3 — Bản sao lỗi thời.** Bạn gửi file tháng 5 cho quản lý chi nhánh. Sang tháng 6 số liệu đổi, nhưng file cũ vẫn nằm trong máy họ, trong nhóm chat, trong email. Cả công ty đang ra quyết định trên *nhiều phiên bản sự thật* khác nhau — đúng cái bệnh "ba người ba con số" mà việc [hợp nhất về một nguồn sự thật](/blog/hop-nhat-da-kenh/) sinh ra để chữa.

Cả ba cái bẫy có chung một gốc: bạn đang dùng *sức người* để làm việc của *quy tắc*. Người thì mệt, quên, nhầm. Quy tắc thì không.

## Cách phân quyền theo hàng trong Semantix

Semantix không phải "công cụ giúp bạn cắt Excel cho nhanh hơn". Ngược lại — nó xoá luôn việc cắt. Bạn không tạo bản sao nào cả. Bạn chia sẻ đúng *một* báo cáo, và để quy tắc lo phần ai thấy gì. Quy trình ba bước:

1. **Định nghĩa quy tắc một lần, theo người hoặc theo vai trò.** Ví dụ: *"sale chỉ thấy hàng khớp `mã_sale` của họ"*, *"quản lý chỉ thấy `chi_nhánh` được gán"*, *"vai trò kế_toán ẩn cột `lương`"*. Bạn viết quy tắc gắn vào dữ liệu, không gắn vào từng file.
2. **Ai đăng nhập, hệ thống tự lọc.** Khi một người mở dashboard, Semantix đọc danh tính họ, áp quy tắc, và chỉ trả về đúng phần dữ liệu của họ — *trước khi* số hiện lên màn hình. Họ không thể cuộn ngang ra cột bị ẩn, vì cột đó chưa bao giờ được gửi tới máy họ.
3. **Cùng một báo cáo, nhiều góc nhìn.** Bạn xây một dashboard. Tám sale, bốn quản lý, hai kế toán cùng mở một đường link — mỗi người thấy một lát cắt khác nhau, tự động, theo thời gian thực. Số đổi thì cả tám người thấy số mới cùng lúc. Không bản nào lỗi thời.

Vì quy tắc nằm chung một chỗ với [định nghĩa nghiệp vụ](/blog/semantic-layer/) — "doanh thu", "lương", "biên lợi nhuận" là gì — nên phân quyền nhất quán với mọi cách bạn hỏi số: qua dashboard, qua câu hỏi tiếng Việt, hay qua [báo cáo tự gửi về Telegram/Zalo](/blog/bao-cao-telegram-zalo/) mỗi sáng. Quản lý Q7 nhận báo cáo tự động về Zalo cũng chỉ thấy số Q7 — vì quy tắc theo người, không theo kênh gửi.

## Tóm lại

| Cắt báo cáo bằng tay | Phân quyền theo hàng |
|---|---|
| Mỗi người một file, xuất tay mỗi tuần | Một báo cáo, mọi người cùng mở |
| Xóa cột nhạy cảm thủ công → quên là lộ | Quy tắc ẩn cột theo vai trò, không quên được |
| Gửi nhầm file là rò rỉ vĩnh viễn | Không có file để gửi nhầm |
| Bản sao tháng cũ nằm khắp nơi → lỗi thời | Một nguồn sống, ai cũng thấy số mới nhất |
| Bạn là nút thắt cổ chai của mọi quyết định | Mỗi người tự xem phần của mình, bạn rảnh tay |
| 40 phút mỗi tuần để *giấu bớt* | Định nghĩa một lần, dùng mãi |

Câu hỏi đầu tiên không phải "phần mềm nào cắt Excel nhanh nhất?" — mà là **"mình đã định nghĩa ai được thấy hàng nào chưa?"** Trả lời được câu đó, tối thứ Sáu của bạn sẽ không còn bắt đầu bằng việc xóa cột margin. Giữ bí mật không phải là giấu báo cáo đi — mà là chia sẻ nó một cách đúng đắn.

---

*Muốn thôi cắt Excel tay và chia sẻ báo cáo an toàn cho cả đội? [Dùng thử miễn phí — thiết lập phân quyền theo hàng trong vài phút.](/docs/vi/free-trial/)*
