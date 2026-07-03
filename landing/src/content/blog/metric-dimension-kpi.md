---
title: "Metric, Dimension, KPI: ba từ ai cũng nói - và vì sao dùng lẫn lộn khiến mọi báo cáo cãi nhau"
code: "kt-006"
description: "Sales nói doanh thu tháng này 4,2 tỷ. Kế toán nói 3,8 tỷ. Sếp gõ bàn hỏi ai sai. Không ai sai cả - ba người đang gọi ba thứ khác nhau bằng cùng một từ."
pubDate: 2026-01-26
category: "Kiến Thức Nền Tảng"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/metric-dimension-kpi.png"
coverAlt: "Một con số được cắt theo nhiều lát cắt và gắn một vạch mục tiêu phía trên"
---

Trong phòng họp sáng thứ Hai, anh Sales đứng lên: "Doanh thu tháng này 4,2 tỷ, vượt kế hoạch." Chị Kế toán liếc file của mình: "Em thấy có 3,8 tỷ thôi." Sếp gõ bàn: "Một con số doanh thu mà ba người nói ba kiểu, ai sai?"

Phản xạ đầu tiên của cả phòng là đi tìm lỗi tính toán - chắc ai đó cộng nhầm, hoặc Excel kéo công thức thiếu một dòng. Nhưng gần như chắc chắn **không ai cộng sai cả**. Anh Sales tính cả đơn đã chốt nhưng chưa giao. Chị Kế toán chỉ tính đơn đã thu tiền và đã trừ hàng hoàn. Hai con số khác nhau vì hai người đang gọi **hai thứ khác nhau** bằng đúng một từ: "doanh thu".

Đây là sự thật ngược đời ít người chịu tin: lý do hai báo cáo lệch nhau hiếm khi là sai số tính toán - mà là mọi người chưa thống nhất *cái gì đang được đo, cắt theo lát nào, và so với mục tiêu nào.* Gỡ được chuyện đó chỉ cần hiểu đúng ba từ vựng nền tảng: **Metric (con số đo được)**, **Dimension (lát cắt để xoay nhìn metric - đôi khi còn đổi cả con số)** và **KPI (Key Performance Indicator - chỉ số hiệu suất then chốt)**. Ba từ ai cũng nói, ít người phân biệt rạch ròi - và đó là gốc của hầu hết những cuộc cãi nhau quanh con số.

## Ba từ, ba việc hoàn toàn khác nhau

Hãy hình dung dữ liệu của bạn như một **khối Rubik**. **Metric** là con số ghi trên mặt khối - thứ bạn muốn biết. **Dimension** là cách bạn xoay khối để nhìn con số đó từ một góc khác. Còn **KPI** thì *không nằm trên khối* - nó là một vạch đích bạn đặt ở ngoài, để biết con số trên khối đã chạm tới đó hay chưa.

Hai cái đầu thuộc về *bản thân con số*; cái thứ ba thuộc về *tham vọng của bạn với con số đó*. Khi ba người trong phòng họp dùng lẫn lộn, họ tưởng đang cãi nhau về *con số*, trong khi thật ra mỗi người đang cầm một góc xoay khác nhau của cùng một khối - hoặc tệ hơn, chưa ai vẽ ra cái vạch đích.

## Metric: thứ bạn đo được bằng một con số

**Metric là một đại lượng đo được, gói gọn trong một con số.** Doanh thu. Số đơn hàng. Số khách mới. Giá trị đơn trung bình. Tỷ lệ hoàn hàng. Đặc điểm chung: hỏi "bao nhiêu" thì trả lời được bằng một con số duy nhất.

Nghe đơn giản, nhưng cái bẫy nằm ngay ở đây. Một metric chỉ rõ ràng khi **định nghĩa của nó rõ ràng** - và rõ luôn cả việc nó có thật sự *cộng, trung bình được* không, vì có những con số trông như số mà tính trung bình ra kết quả vô nghĩa (xem [4 loại thang đo dữ liệu](/blog/4-loai-thang-do-du-lieu/)). "Doanh thu" nghe như một con số ai cũng hiểu, nhưng thử hỏi năm người trong công ty:

- Tính theo đơn **đã chốt** hay đơn **đã thu tiền**?
- Có trừ đơn **hoàn, hủy** không?
- Có gồm **phí ship** khách trả không?

Mỗi câu trả lời khác nhau cho ra một con số khác nhau - và cả năm đều "đúng" theo cách mỗi người hiểu. *Doanh thu của anh Sales* (đã chốt, gồm ship, chưa trừ hoàn) là 4,2 tỷ. *Doanh thu của chị Kế toán* (đã thu, trừ hoàn, không gồm ship) là 3,8 tỷ. Không phải sai số. Là **hai metric khác nhau đeo chung một cái tên**. Những lựa chọn gồm-hay-trừ này chính là *định nghĩa* của metric - và đây là điểm mấu chốt nhiều người bỏ qua: chúng **không phải** dimension. Đổi định nghĩa là đổi *bản chất con số*; đổi dimension là đổi *góc nhìn vào con số*. Lát nữa ta sẽ thấy ranh giới đó quan trọng thế nào.

> Quy tắc vàng: một metric chưa có định nghĩa thống nhất thì chưa phải một con số - nó là một cuộc tranh cãi đang chờ nổ ra.

## Dimension: cách bạn cắt con số ra để nhìn

Nếu metric là con số, **dimension là lát cắt** - góc bạn xoay để nhìn con số đó. Bản thân dimension không phải con số. Nó là một *thuộc tính* để chia nhỏ.

Vẫn metric "doanh thu", nhưng cắt theo các dimension khác nhau:

- **Theo kênh:** Shopee bao nhiêu, TikTok Shop bao nhiêu, KiotViet bao nhiêu.
- **Theo thời gian:** tháng 1, tháng 2... hay so tháng này với tháng trước.
- **Theo sản phẩm:** áo khoác bán bao nhiêu, váy bao nhiêu.
- **Theo khu vực:** Hà Nội, Hải Phòng, các tỉnh.

Một con số tổng - *"doanh thu 3,8 tỷ"* - gần như vô dụng để ra quyết định. Cũng con số đó, cắt theo kênh, lập tức kể một câu chuyện: *Shopee 1,9 tỷ, TikTok Shop 1,4 tỷ, KiotViet 0,5 tỷ.* Giờ bạn mới biết nên dồn ngân sách vào đâu. Cùng một metric, nhiều dimension - đó là toàn bộ nghệ thuật xoay khối Rubik.

### Một dimension âm thầm *đổi cả con số*: cột ngày

Phần lớn dimension chỉ chia nhỏ một con số đã có - cắt kiểu nào thì các mảnh cộng lại vẫn ra cái tổng cũ. Nhưng có một dimension làm điều nguy hiểm hơn nhiều: **nó thay đổi chính con số tổng**, kể cả khi định nghĩa metric đã được thống nhất tuyệt đối.

Đó là **cột ngày**. Cùng một đơn hàng, hỏi "nó thuộc tháng nào?" lại có ba câu trả lời, vì mỗi phòng neo vào một mốc thời gian khác:

- Phòng kinh doanh tính theo **ngày tạo đơn** → đơn rơi vào tháng 5.
- Kế toán tính theo **ngày thanh toán** → cũng đơn đó, sang tháng 6.
- Vận hành tính theo **ngày giao thành công** → lại nhảy sang tháng 7.

Cùng một định nghĩa "doanh thu", cùng một đơn - nhưng "doanh thu tháng 6" ra ba con số khác nhau, **chỉ vì ba cột ngày**. Đây là chỗ khiến nhiều người ngỡ ngàng: họ tưởng cứ chốt xong định nghĩa là hết cãi, hóa ra chưa. *Ví dụ minh họa:* một nhà bán hàng mùa cao điểm thấy chênh 10-15% giữa "doanh thu" của Sales và Finance, truy mãi mới ra - không phải do định nghĩa, mà do một bên chốt theo ngày đặt, một bên theo ngày thu tiền.

> Quy tắc vàng: trước khi cãi nhau "ai tính sai", hỏi đúng một câu - *"tháng này tính theo cột ngày nào?"* Chốt định nghĩa thôi chưa đủ; phải chốt cả cột ngày thì con số mới chịu đứng yên.

Hiểu được điều này cũng giải tỏa nửa số hiểu lầm về dữ liệu: khi sếp hỏi "doanh thu bao nhiêu" và bạn hỏi lại "**theo kênh nào, tính theo cột ngày nào ạ?**", bạn không phải đang khó tính - bạn đang làm rõ dimension trước khi trả lời, để không đưa nhầm con số. *(Vì sao "doanh thu" cứ hóa ra năm con số khác nhau, chúng tôi mổ kỹ trong bài [Một nguồn sự thật thật ra nghĩa là gì](/blog/mot-nguon-su-that/).)*

## KPI: metric có một mục tiêu gắn vào

Giả sử cả công ty đã chốt cả định nghĩa lẫn cột ngày - giờ con số 3,8 tỷ cuối cùng đã đáng tin, ai hỏi cũng ra đúng nó. Nhưng *đáng tin* thôi chưa đủ. Câu sếp thật sự muốn biết không phải "doanh thu bao nhiêu", mà là: **3,8 tỷ - tốt hay chưa?** Một con số trần trụi không tự trả lời được điều đó. Nó chỉ có nghĩa khi được đặt cạnh một mục tiêu - và đó đúng là khoảnh khắc metric biến thành KPI.

Nên nói thẳng: **không phải metric nào cũng là KPI**. KPI - *Key Performance Indicator* - là một metric được chọn ra vì nó quan trọng, **và được gắn thêm một mục tiêu cùng một mốc thời gian**.

Sự khác biệt nằm gọn ở chữ "mục tiêu":

- "Doanh thu tháng này 3,8 tỷ" - đó là một **metric**. Một con số trần trụi.
- "Doanh thu tháng này phải đạt **4 tỷ**, hiện ở 3,8 tỷ - **đạt 95%**" - đó là một **KPI**. Con số ấy giờ có một cái thước để biết tốt hay chưa.

Nói cách khác, KPI = metric + mục tiêu + ngữ cảnh đánh giá. Mọi KPI đều là metric, nhưng phần lớn metric chỉ là số đo bình thường, không phải KPI. Một công ty đo *hàng trăm* metric, nhưng chỉ nên chọn ra **5-10 KPI** thật sự phản ánh sức khỏe kinh doanh - nhiều hơn thì không ai nhìn nổi, mà nhìn không nổi thì coi như không có.

Cái bẫy phổ biến: nhồi 30 con số lên một dashboard (bảng số trực quan tổng hợp nhiều biểu đồ trên một màn hình) rồi gọi tất cả là "KPI". Khi mọi thứ đều là chỉ số then chốt thì **không gì là then chốt cả** - mắt người ta lướt qua hết, chẳng con số nào thúc được một hành động.

## Vì sao lẫn lộn ba từ này khiến báo cáo cãi nhau

Quay lại phòng họp sáng thứ Hai. Bây giờ ta đọc lại cuộc cãi vã bằng đúng ba từ vựng:

- Anh Sales và chị Kế toán cãi nhau vì **metric "doanh thu" chưa có một định nghĩa chung** - người gồm ship, người trừ hoàn, mỗi người một cách tính.
- Kể cả khi định nghĩa đã giống nhau, mỗi người vẫn có thể cầm một **dimension khác** - điển hình là *neo vào một cột ngày khác* (ngày đặt / ngày thu / ngày giao) - nên "tháng này" vẫn ra con số lệch.
- Và chẳng ai biết 3,8 tỷ hay 4,2 tỷ là *tốt*, vì không ai chốt **KPI** - con số mục tiêu - để mà đối chiếu.

Ba mầm mống lẫn lộn, gộp lại thành mười lăm phút cãi nhau mà đáng ra chỉ cần một câu: *"Mình đang nói metric nào, cắt theo dimension nào, so với KPI nào?"* Hỏi được ba câu đó từ đầu, cuộc họp ngắn đi một nửa.

## Ba từ vựng này trong Semantix

Semantix không giải bài này bằng cách thêm một dashboard đẹp hơn - vì cãi nhau về con số chưa bao giờ là do thiếu biểu đồ. Gốc rễ là mỗi người mang một định nghĩa riêng. Nên cách tiếp cận đi vào tận chỗ đó:

1. **Định nghĩa metric một lần** trong [Semantic Layer - tầng nghiệp vụ dùng chung](/blog/semantic-layer/): "doanh thu" được chốt là *đã thu tiền, đã trừ hoàn, không gồm phí ship, tính theo ngày thanh toán* - gồm cả cột ngày chuẩn - và từ đó **ai hỏi cũng ra đúng con số ấy**, dù là sếp, Sales hay kế toán.
2. **Khai báo dimension sẵn:** theo kênh, theo sản phẩm, theo cột ngày - để bất cứ ai cũng xoay khối Rubik được mà không cần biết một dòng SQL (Structured Query Language - ngôn ngữ truy vấn cơ sở dữ liệu).
3. **Gắn mục tiêu thành KPI:** chọn ra dăm con số then chốt, treo mốc lên, theo dõi tự động - thậm chí [cảnh báo ngay khi một KPI vượt ngưỡng](/blog/canh-bao-kpi/) để biết trong ngày thay vì đợi tới buổi họp.

Một lần định nghĩa. Cả công ty nói cùng một ngôn ngữ. Báo cáo ngừng cãi nhau - không phải vì ai đó thắng, mà vì không còn gì để cãi.

## Tóm lại

| Khái niệm | Là gì | Ví dụ |
|---|---|---|
| **Metric** | Một đại lượng **đo được** bằng một con số; giá trị phụ thuộc **định nghĩa** | Doanh thu (gồm ship? trừ hoàn?), số đơn |
| **Dimension** | **Lát cắt** để nhìn con số - có loại (cột ngày) còn *đổi cả con số* | Theo kênh, theo sản phẩm, theo cột ngày |
| **KPI** | Một metric **gắn mục tiêu** để đánh giá tốt/chưa | "Doanh thu tháng đạt 4 tỷ - hiện 95%" |

Lần tới khi hai báo cáo lệch nhau, đừng vội đi tìm lỗi cộng trừ. Hỏi trước: *mình đang nói **metric** nào, cắt theo **dimension** nào (kể cả **cột ngày** nào), so với **KPI** nào?* Chín trên mười lần, "sai số" sẽ tan biến ngay khi ba từ này được gọi đúng tên. Đó là bước đầu tiên để mọi con số trong công ty ngừng cãi nhau.

---

*Muốn cả công ty nói cùng một ngôn ngữ dữ liệu, định nghĩa "doanh thu" một lần dùng mãi? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Business Intelligence cho SME: hiểu đúng trong 10 phút](/blog/bi-cho-sme/).*
