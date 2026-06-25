---
title: "Data catalog: cuốn từ điển cho chính dữ liệu của bạn — và vì sao nó nằm trong đầu một người"
code: "kt-042"
description: "Cột rev_amt nghĩa là gì? dim_cust_v2 khác dim_cust chỗ nào? Chỉ một người biết, và hôm nay người đó nghỉ. Kiến thức dữ liệu không nên sống trong một cái đầu."
pubDate: 2025-05-03
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/data-catalog-tu-dien-du-lieu.svg"
coverAlt: "Cuốn từ điển dữ liệu mở ra các thẻ mục lục mô tả từng bảng và cột trong kho dữ liệu"
---

Bạn cần gấp con số doanh thu để chốt báo cáo cho sếp. Mở database (cơ sở dữ liệu) ra, thấy một cột tên `rev_amt`. Doanh thu đã trừ chiết khấu chưa? Có gồm thuế không? Đơn hoàn thì sao? Bạn không biết. Kế bên có hai bảng: `dim_cust` và `dim_cust_v2` — bảng nào mới, bảng nào còn ai dùng, vì sao lại có "v2"? Bạn cũng không biết.

Trong công ty, đúng một người biết tất cả những chuyện này. Anh ấy đã đặt tên cột đó ba năm trước, nhớ vì sao có `dim_cust_v2`, nhớ cái cột `status = 7` nghĩa là "đơn đã huỷ một phần". Và hôm nay anh ấy nghỉ phép. Phản xạ đầu tiên của bạn là nhắn Zalo hỏi. Nhưng đây mới đúng là chỗ nguy hiểm: **toàn bộ kiến thức về dữ liệu của công ty đang nằm trong đầu một người, không nằm ở đâu tra được.** Bài này dành chín phút để gỡ.

## Data catalog: cuốn từ điển cho chính dữ liệu của bạn

Bạn có từ điển cho tiếng Anh, có danh bạ cho số điện thoại, có mục lục cho cuốn sách. Nhưng cho hàng trăm bảng và hàng nghìn cột trong kho dữ liệu — thứ mà cả công ty ra quyết định dựa trên — bạn lại không có gì. Đó chính là khoảng trống mà **data catalog** (từ điển dữ liệu — danh mục mô tả mọi bảng/cột/metric để ai cũng tra được) lấp vào.

Hình dung nó như cuốn từ điển treo ở cửa thư viện: với mỗi bảng, mỗi cột, mỗi metric (con số đo được như doanh thu, số đơn), nó ghi rõ năm điều — **nghĩa là gì, ai sở hữu, lấy từ đâu, đáng tin tới đâu, và ai hay dùng.** Không phải để trang trí. Để khi người đặt tên cột nghỉ phép, bạn vẫn tra được `rev_amt` mà không cần nhắn Zalo cho ai.

Người ta hay nhầm data catalog với **data dictionary** (từ điển cấu trúc — bảng liệt kê tên cột và kiểu dữ liệu). Data dictionary chỉ trả lời "cột này tên gì, kiểu số hay chữ". Data catalog trả lời câu khó hơn nhiều: *"cột này nghĩa là gì trong nghiệp vụ, và tôi có nên tin nó không?"*

## Vấn đề gốc: "tri thức bộ lạc" và rủi ro một người nghỉ là sập

Cái biết về `rev_amt`, về `status = 7`, về vì sao có `dim_cust_v2` — giới làm dữ liệu gọi đó là **tribal knowledge** (tri thức bộ lạc — hiểu biết truyền miệng, sống trong đầu vài người chứ không được viết ra). Nó là loại tri thức không có trong tài liệu nào, không ai từng ghi lại, chỉ "ai làm lâu thì biết".

Tri thức bộ lạc êm ái cho tới ngày nó không còn êm. Người giữ nó nghỉ phép, nghỉ việc, hoặc đơn giản là quên. Lúc đó cả một mảng dữ liệu bỗng thành chữ tượng hình không ai đọc nổi. Giới kỹ thuật có một từ cho rủi ro này: **bus-factor** — *"cần bao nhiêu người bị xe buýt tông thì dự án đứng?"*. Bus-factor bằng 1 nghĩa là chỉ một người nghỉ là cả công ty mất khả năng đọc chính dữ liệu của mình. Nghe đùa, nhưng với đa số SME (doanh nghiệp nhỏ và vừa), con số đó đúng là 1.

Tôi từng sống đúng cảnh này hồi ráp báo cáo bằng tay. Một bạn trong nhóm nghỉ việc, để lại nguyên một thư mục query (câu truy vấn) với những cái tên cột mà chỉ bạn ấy hiểu. Tôi mất gần một tuần ngồi giải mã từng cột — không phải vì khó về kỹ thuật, mà vì *không có chỗ nào ghi lại nghĩa của chúng*. Một tuần đó lẽ ra chỉ tốn năm phút tra cứu, nếu có một cuốn từ điển. Đó là lúc tôi hiểu: thiếu data catalog không phải bất tiện — nó là một quả bom hẹn giờ, và bạn không biết kim đồng hồ đang chỉ mấy giờ.

## Một data catalog đầy đủ gồm những gì

Một cuốn từ điển dữ liệu tốt không chỉ liệt kê tên. Với mỗi bảng/cột/metric, nó trả lời năm câu:

- **Mô tả — nghĩa là gì.** `rev_amt` = "doanh thu sau chiết khấu, trước thuế, đã trừ đơn hoàn". Một dòng tiếng người, không phải tên kỹ thuật.
- **Chủ sở hữu — ai chịu trách nhiệm.** Số này sai thì hỏi ai, ai được sửa định nghĩa. Đây là gạch nối thẳng tới [data governance — ai sở hữu con số và ai chịu trách nhiệm khi nó sai](/blog/metric-dimension-kpi/).
- **Nguồn gốc — lấy từ đâu.** Giới kỹ thuật gọi là **data lineage** (nguồn gốc dữ liệu — đường đi của một con số từ bảng gốc, qua các bước biến đổi, tới báo cáo cuối). Biết lineage, bạn truy được một con số sai bắt nguồn từ đâu thay vì đoán mò.
- **Độ tin cậy — có đáng tin không.** Bảng này cập nhật hằng ngày hay đã chết từ quý trước? Cột `dim_cust_v2` là bản chuẩn, còn `dim_cust` là bản cũ sắp bỏ — nhãn này cứu bạn khỏi tính nhầm trên dữ liệu rác.
- **Ai hay dùng — bằng chứng xã hội.** Cột nào mười báo cáo đang dùng thì đáng tin hơn cột không ai đụng tới ba năm. Mức độ phổ biến tự nó là một tín hiệu chất lượng.

> Quy tắc vàng: một data catalog không trả lời "dữ liệu nằm ở đâu" — nó trả lời "dữ liệu này nghĩa là gì và tôi có nên tin nó không". Tên cột là chuyện máy tính cần; ý nghĩa là chuyện con người cần.

## Vì sao SME cũng cần, dù dữ liệu còn nhỏ

Phản xạ thường thấy: "Catalog là chuyện của tập đoàn có hàng nghìn bảng. Công ty tôi có mười bảng, cần gì." Đây là chỗ hiểu lầm tốn kém nhất.

Vấn đề chưa bao giờ là *số lượng* bảng — mà là **kiến thức về chúng có được viết ra hay không.** Mười bảng mà nghĩa nằm trong đầu một người vẫn nguy hiểm y hệt nghìn bảng. Bus-factor của bạn vẫn là 1. Người đó vẫn có thể nghỉ.

Và bạn không cần một phần mềm catalog đắt tiền để bắt đầu. Một sheet Google đơn giản — mỗi dòng một metric, kèm cột "nghĩa là gì" và "ai sở hữu" — đã đi trước 90% công ty cùng quy mô. *Ví dụ minh hoạ:* một chuỗi F&B chỉ cần một bảng mười dòng định nghĩa "doanh thu", "khách mới", "lợi nhuận sau phí sàn" là chấm dứt được cảnh ba phòng cãi nhau ba con số trong họp giao ban. Một bảng mô tả metric chuẩn còn hơn không có gì — đây cũng chính là hạt giống của [một nguồn sự thật](/blog/mot-nguon-su-that/): sự thật chung sống ở tầng định nghĩa, và data catalog là nơi tầng định nghĩa đó được viết ra cho mọi người tra.

## Data catalog trong Semantix

Semantix không định vị mình là "thêm một công cụ catalog để bạn đi điền tay". Vấn đề của bạn không phải thiếu chỗ ghi chú — mà là cái chỗ ghi chú đó luôn lạc hậu so với dữ liệu thật, và chẳng ai buồn cập nhật.

Cách tiếp cận ở đây ngược lại: định nghĩa và mô tả **sống chung một chỗ với chính dữ liệu**, nên tra cứu và sử dụng là một. Khi bạn định nghĩa một metric trong [Semantic Layer (tầng ngữ nghĩa — nơi định nghĩa metric một lần, dùng chung)](/blog/semantic-layer/), bạn viết kèm mô tả "doanh thu này gồm gì, trừ gì" ngay tại đó. Cái mô tả ấy không nằm trong một file Word bị bỏ quên — nó là *một dạng catalog sống*: ai hỏi "doanh thu" cũng được dẫn về đúng định nghĩa kèm giải thích, không phải đi gõ cửa hỏi người đặt tên cột.

Tinh thần "ai cũng tra được" này không chỉ ở trong sản phẩm. Ngay blog Semantix cũng có một [Từ điển thuật ngữ](/blog/tu-dien-thuat-ngu/) — mỗi khái niệm data/BI/AI một dòng nghĩa tiếng Việt, tra được, dùng chung. Đó đúng là tinh thần của một catalog, áp cho thuật ngữ thay vì cho bảng dữ liệu: viết một lần, ai cũng đọc được, không ai phải đoán.

## Tóm lại

| Không có data catalog | Có data catalog |
|---|---|
| Nghĩa của cột nằm trong đầu một người | Nghĩa được viết ra, ai cũng tra được |
| `rev_amt` gồm gì? — đi hỏi | `rev_amt` gồm gì? — tra một dòng |
| Người giữ kiến thức nghỉ là sập (bus-factor = 1) | Người nghỉ, từ điển vẫn còn |
| Số sai không biết bắt nguồn từ đâu | Lần theo lineage tới tận bảng gốc |
| Không biết bảng nào còn sống, bảng nào chết | Nhãn độ tin cậy + ai đang dùng |
| Mỗi người tự đoán một định nghĩa | Một định nghĩa chung, dùng lại mãi |

Câu hỏi đáng hỏi không phải "công ty mình có bao nhiêu bảng?" — mà là **"nếu người hiểu rõ dữ liệu nhất nghỉ việc ngày mai, công ty còn đọc được dữ liệu của chính mình không?"** Trả lời được câu đó, bạn biết mình đang có một cuốn từ điển, hay chỉ có một cái đầu.

---

*Muốn nghĩa của mọi con số nằm ở chỗ ai cũng tra được, thay vì trong đầu một người? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Semantic Layer là gì — tầng định nghĩa giúp mọi con số khớp nhau](/blog/semantic-layer/).*
