---
title: "Semantix vs Power BI cho SME Việt: vì sao công cụ BI phổ biến nhất lại đứng im — và lỗi không nằm ở Power BI"
code: "ss-002"
description: "Power BI mạnh, rẻ trên giấy, đi kèm Microsoft 365. Nhưng SME Việt vấp ở DAX, license Pro, gateway và Q&A không hiểu tiếng Việt. Vì sao — và khi nào vẫn nên chọn nó."
pubDate: 2026-05-20
category: "So Sánh & Lựa Chọn"
readTime: 13
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/semantix-vs-power-bi.svg"
coverAlt: "Hai cột so sánh: một bên là measure DAX và license Pro theo user, một bên là câu hỏi tiếng Việt cho ra câu trả lời ngay"
---

Một chủ chuỗi bán lẻ ở TP.HCM kể với tôi: anh đã dùng Microsoft 365 cho cả công ty, nên khi được tư vấn "Power BI đi kèm sẵn, gần như miễn phí", anh gật đầu ngay. Cài Power BI Desktop, kéo vài bảng, làm được một biểu đồ cột. Rồi anh muốn một con số đơn giản: **tỷ lệ tăng trưởng doanh thu so với tháng trước, lọc theo từng chi nhánh.** Kéo thả không ra. Người tư vấn bảo "cái đó phải viết DAX (Data Analysis Expressions — ngôn ngữ công thức riêng của Power BI)". Ba tháng sau, dashboard (bảng số trực quan) vẫn trống — không phải vì Power BI yếu, mà vì **không ai trong công ty viết được DAX**, và thuê ngoài thì mỗi lần đổi câu hỏi lại phải gọi điện chờ.

Phản xạ đầu tiên khi nghe chuyện này là kết luận "Power BI dở". Sai. Power BI là công cụ BI (Business Intelligence — biến dữ liệu thành quyết định) **phổ biến nhất hành tinh** và xứng đáng với danh tiếng đó. Vấn đề không nằm ở công cụ — nó nằm ở chỗ Power BI được thiết kế cho một bài toán khác với bài toán của anh chủ chuỗi kia. Bài này nói thẳng về **Power BI cụ thể**: DAX, mô hình license (giấy phép sử dụng trả phí), Desktop vs Service, gateway (cầu nối kéo dữ liệu về), Q&A (Question & Answer — hỏi đáp bằng ngôn ngữ tự nhiên) tiếng Việt — những thứ đặc thù mà một bài so sánh chung chung sẽ bỏ qua.

> Nếu bạn muốn so sánh ở tầm cả nhóm BI dashboard truyền thống (Power BI, Tableau, Looker, Qlik) — triết lý dashboard-first (báo cáo dựng sẵn trước) vs question-first (câu hỏi đặt trước) và bài toán chi phí per-user (tính tiền theo từng người dùng) — tôi đã viết riêng trong [Semantix vs BI dashboard truyền thống](/blog/vs-powerbi-tableau/). Bài này thì khoan vào **một mình Power BI**.

## Vì sao đây không phải so "ai mạnh hơn"

Hãy nói sòng phẳng điều ít vendor nào chịu nói: Power BI **rất mạnh**. Kho biểu đồ phong phú, tích hợp sâu vào toàn bộ hệ Microsoft (Excel, Teams, SharePoint, Azure), cộng đồng hàng triệu người, và là tiêu chuẩn de facto (mặc nhiên được công nhận) của các tập đoàn lớn. Nếu bạn cần một dashboard tài chính 40 chỉ số với drill-down (khoan sâu xuống chi tiết) ba tầng, đẹp như tạp chí — Power BI làm điều đó tốt hơn gần như mọi thứ khác.

Nhưng có một giả định ngầm bị chôn sâu trong thiết kế của nó: **Power BI giả định bạn có một người biết dựng.** Một người đọc được mô hình dữ liệu, viết được DAX, biết kéo bảng nào nối bảng nào, biết dựng gateway. Với một tập đoàn có phòng BI mười người, giả định đó hiển nhiên. Với một SME Việt — một chủ shop, một COO chuỗi F&B tám chi nhánh — giả định đó thường **không tồn tại**.

> Power BI giống một chiếc xe số sàn cực mạnh: ai biết lái thì đi nhanh và êm. Vấn đề là bạn đang giao nó cho người chưa từng đạp côn. Xe không hỏng — nhưng nó sẽ đứng yên.

## DAX — chỗ "kéo thả" gặp bức tường

Đây là đặc thù số một của Power BI mà SME hay tính nhầm. Marketing nói "kéo thả không cần code", và điều đó đúng — *cho những phép tính đơn giản*. Tổng doanh thu, đếm số đơn: kéo thả ra ngay. Nhưng bất kỳ phép tính **nghiêm túc** nào — so sánh kỳ trước, tỷ lệ tăng trưởng, lũy kế từ đầu năm, tỷ trọng trên tổng — đều cần **DAX**, ngôn ngữ công thức riêng của Power BI.

DAX trông không giống công thức Excel. Một measure (phép đo — công thức tính một chỉ số) tính tăng trưởng so với tháng trước có thể trông như thế này:

```
Tăng trưởng MoM % =
VAR ThangNay = SUM ( DoanhThu[GiaTri] )
VAR ThangTruoc =
    CALCULATE (
        SUM ( DoanhThu[GiaTri] ),
        DATEADD ( 'Lich'[Ngay], -1, MONTH )
    )
RETURN
    DIVIDE ( ThangNay - ThangTruoc, ThangTruoc )
```

*(Ví dụ minh họa cú pháp DAX, không phải code production.)* `CALCULATE`, `DATEADD`, ngữ cảnh lọc (filter context), quan hệ giữa bảng `DoanhThu` và bảng `Lich` — đây là một mô hình tư duy riêng, không phải thứ một chủ shop tự học trong buổi chiều. Đó chính là lý do dashboard ở đầu bài đứng im: kéo thả ra biểu đồ trống thì được, nhưng câu hỏi thật cần DAX, và DAX cần người.

Với Semantix, người dùng cuối **không viết gì cả** — họ hỏi "tăng trưởng doanh thu tháng này so với tháng trước theo từng chi nhánh" bằng tiếng Việt, và câu trả lời ra trong vài giây. Bên dưới, câu hỏi được dịch qua một [Semantic Layer định nghĩa sẵn các khái niệm nghiệp vụ](/blog/semantic-layer/) thay vì để AI "đoán" — nên kết quả nhất quán. Cơ chế đó, và vì sao "AI viết SQL gần như không bao giờ lỗi cú pháp mà vẫn trả về số sai", tôi đã mổ xẻ trong [bài về Text-to-SQL](/blog/text-to-sql/) (AI biến câu hỏi tiếng Việt thành câu lệnh SQL).

## Mô hình license Power BI — cái bẫy khi muốn share rộng

"Power BI miễn phí" là một nửa sự thật. Power BI Desktop để **dựng** thì miễn phí. Nhưng để **chia sẻ** báo cáo cho người khác xem, mọi thứ đổi khác. Hệ license của Power BI có nhiều tầng, và đây là chỗ SME hay vỡ ngân sách:

- **Free** — chỉ dùng một mình, không share được cho người khác trong tổ chức.
- **Pro** — tính **theo user/tháng**. Cái bẫy lớn nhất: muốn ai đó *xem* báo cáo bạn chia sẻ, **người xem đó cũng phải có license Pro** (trừ khi dùng Premium capacity). Mười nhân viên cần xem = mười license Pro.
- **Premium Per User (PPU)** — đắt hơn Pro/user, mở thêm tính năng nâng cao, nhưng vẫn theo đầu người.
- **Fabric / Premium capacity** — mua theo "dung lượng" (capacity) thay vì theo user, cho phép người xem không cần license riêng — nhưng giá khởi điểm capacity là một con số đáng kể, hợp với doanh nghiệp lớn hơn là shop 8 người.

*(Các con số license cụ thể thay đổi theo gói, theo vùng và theo thời điểm; ở đây tôi cố ý nói định tính thay vì trích giá có thể đã lỗi thời — bạn nên kiểm tra bảng giá hiện hành.)* Điểm cốt lõi: **càng muốn nhiều người trong công ty tự xem data, hóa đơn Power BI càng leo** — bạn bị phạt tiền vì dân chủ hóa dữ liệu. Semantix tính theo instance: một bản phục vụ cả công ty, thêm người xem không phải thêm đầu license.

> Tôi nói chuyện này từ góc người trong cuộc. Ở một ngân hàng tôi đang làm, tôi từng đứng trước ban điều hành để bảo vệ quan điểm chuyển từ Power BI sang Data Studio — và lập luận nặng ký nhất không phải tính năng, mà chính là bài toán license theo đầu người: mỗi lần muốn thêm một phòng ban tự xem báo cáo là một lần ngân sách nhân lên. Khi đích cuối là *dân chủ hóa dữ liệu* cho cả tổ chức, mô hình phạt-tiền-theo-người-xem đi ngược lại đúng cái mình muốn. Tôi kể chi tiết cuộc chuyển đổi đó — gồm cả những chỗ tôi tính sai trọng số khi chấm điểm công cụ — trong [hành trình từ Power BI sang Data Studio](/blog/hanh-trinh-power-bi-data-studio/).

## Power BI Desktop vs Service — và chuyện cái Mac

Power BI tách làm hai phần, và sự tách biệt này gây bất ngờ cho nhiều SME:

- **Power BI Desktop** — nơi bạn *dựng* mô hình, viết DAX, thiết kế báo cáo. Đây là phần mạnh nhất, nhưng nó **chỉ chạy trên Windows.** Nếu giám đốc hay nhân viên của bạn dùng MacBook — rất phổ biến ở các công ty trẻ Việt Nam — họ không cài được Power BI Desktop. Phải kiếm máy Windows, hoặc dựng máy ảo.
- **Power BI Service** — phần cloud để *xem và chia sẻ* báo cáo đã publish. Chạy trên trình duyệt, mọi nền tảng đều vào được.

Sự phân đôi tác giả/người xem này là cố hữu trong thiết kế: người dựng cần Windows + Desktop + DAX, người xem cần license + trình duyệt. Semantix tiếp cận hoàn toàn qua trình duyệt cho cả người thiết lập lẫn người hỏi — không phụ thuộc hệ điều hành, không có ranh giới "tác giả phải dùng Windows".

## Data gateway & refresh — gánh vận hành ẩn

Một dashboard chỉ đáng tin khi số liệu **tươi**. Với Power BI, nếu dữ liệu của bạn nằm ở nguồn on-premise (đặt trên máy chủ tự quản của doanh nghiệp) hoặc cần làm mới định kỳ, bạn phải dựng và **giữ chạy một on-premises data gateway** — một dịch vụ cầu nối để Power BI Service kéo dữ liệu về, cộng với lịch refresh (làm mới dữ liệu — mấy lần một ngày, lúc nào).

Nghe kỹ thuật, và đúng là kỹ thuật. Ai cài gateway? Ai để ý khi gateway sập lúc 2 giờ sáng và dashboard sáng hôm sau hiển thị số cũ? Với SME không có người IT chuyên trách, đây là một gánh vận hành lặng lẽ mà không ai cảnh báo lúc mua. Đây là một biểu hiện khác của cùng giả định nền: **Power BI giả định có người vận hành.**

## Q&A tiếng Anh-trung tâm — yếu với tiếng Việt

Power BI có tính năng **Q&A**: hỏi bằng ngôn ngữ tự nhiên, nó vẽ biểu đồ. Nghe rất giống thứ Semantix làm — nhưng có hai khác biệt lớn. Thứ nhất, Q&A vẫn cần mô hình được dựng sạch sẽ phía sau (lại quay về DAX và mô hình hóa). Thứ hai, và quan trọng với bạn: **Q&A tối ưu cho tiếng Anh.** Hỏi "show sales last quarter" thì ổn; hỏi "doanh thu quý vừa rồi", "doanh số đầu năm đến giờ", "mấy tháng cao điểm bán chạy nhất" — những cách nói tự nhiên của người Việt — thường không được hiểu đúng.

Semantix sinh ra để hỏi bằng tiếng Việt như nói với một analyst giỏi. "Quý vừa rồi", "đầu năm đến giờ", "so với cùng kỳ năm ngoái" là input (câu hỏi đầu vào) bình thường, không phải ca khó. Đây không phải khác biệt "có Q&A hay không có" — cả hai đều có — mà là Q&A được sinh ra cho ngôn ngữ nào.

## Nguồn dữ liệu Việt — Shopee, TikTok Shop, KiotViet

Đây là chỗ thực tế Việt Nam tạo khác biệt lớn nhất, mà các bảng so sánh quốc tế bỏ qua hoàn toàn. Một nhà bán lẻ Việt điển hình có dữ liệu rải ở Shopee, TikTok Shop, KiotViet, thêm vài file Google Sheets.

Power BI có hàng trăm connector (đầu nối tới nguồn dữ liệu) — nhưng phần lớn hướng tới hệ thống doanh nghiệp phương Tây (Dynamics, Salesforce, SQL Server, Azure). Để kéo Shopee và TikTok Shop về, thường phải qua **connector trung gian của bên thứ ba hoặc dựng pipeline (luồng xử lý dữ liệu) thủ công** — lại cần người kỹ thuật, lại cần gateway giữ chạy. Tệ hơn: ghép ba nguồn này để ra **một** con số doanh thu hợp nhất là một bài toán dữ liệu thật, không phải kéo thả.

Semantix tiếp cận thẳng các nguồn Việt và **gộp (union) + làm sạch chúng bằng bảng ảo ngay lúc bạn hỏi** — không kéo/copy dữ liệu về một kho, dữ liệu ở lại nguồn và luôn mới. Bạn hỏi "doanh thu toàn kênh tháng này" và nó cộng đúng cả ba sàn ngay tại thời điểm hỏi. *(Cơ chế bảng ảo này tôi mổ xẻ kỹ trong [Bảng ảo: gộp dữ liệu không cần copy về một chỗ](/blog/bang-ao-gop-du-lieu/). Đây là minh họa năng lực định hướng theo thị trường Việt, không phải con số benchmark.)*

## Hệ sinh thái Microsoft — lợi thế thật, nhưng có điều kiện

Cần công tâm: nếu công ty bạn **đã sống trong Microsoft** — Excel khắp nơi, dữ liệu trong SQL Server hoặc Azure, làm việc qua Teams và SharePoint — thì Power BI là một mảnh ghép cực kỳ tự nhiên. Single sign-on (đăng nhập một lần dùng cho mọi ứng dụng), nhúng báo cáo vào Teams, đẩy dữ liệu từ Excel sang mượt. Trong bối cảnh đó, lợi thế hệ sinh thái là thật và khó thay thế.

Nhưng lợi thế đó là một **con dao hai lưỡi**: nó mạnh khi bạn đã ở trong hệ Microsoft, và trở thành gánh nặng khi bạn không ở đó. Một shop dùng Google Workspace, bán trên Shopee/TikTok, nhân viên xài MacBook — gần như không hưởng được lợi thế Microsoft nào, mà vẫn phải gánh toàn bộ chi phí DAX, license, gateway, Windows-only.

## Bảng so sánh: Power BI vs Semantix

| Tiêu chí | Power BI | Semantix |
|---|---|---|
| Phép tính nghiêm túc | Cần viết **DAX** | Hỏi bằng tiếng Việt, không công thức |
| Mô hình license | Free / **Pro theo user** / PPU / Fabric capacity; người xem cũng cần Pro | Theo instance — thêm người xem không thêm license |
| Tác giả vs người xem | Desktop (**Windows-only**) để dựng + Service để xem | Toàn bộ qua trình duyệt, mọi hệ điều hành |
| Dữ liệu tươi | Cần dựng & giữ **data gateway** + lịch refresh | Kết nối nguồn, không tự vận hành gateway |
| Q&A ngôn ngữ tự nhiên | Có, nhưng **tối ưu tiếng Anh** | Tiếng Việt là cách dùng chính |
| Nguồn dữ liệu Việt | Thường qua connector trung gian / pipeline | Kết nối thẳng, gộp bằng bảng ảo lúc hỏi (không copy về kho) |
| Hệ sinh thái | Mạnh **nếu** đã trong Microsoft/Azure | Không phụ thuộc hệ M365 |
| Thời gian khởi động | Vài tuần (mô hình + DAX + gateway) | Vài giờ tới một ngày |

*(Bảng mang tính định hướng cho bối cảnh SME Việt, không phải benchmark đo lường. Chi tiết license thay đổi theo gói/thời điểm.)*

## Khi nào nên chọn Power BI

Sòng phẳng đến cùng: **không có công cụ thắng tuyệt đối** — có công cụ hợp với bài toán của bạn. Hãy chọn Power BI nếu:

- Bạn **đã có (hoặc sẵn sàng xây) một người/đội biết DAX** và mô hình hóa dữ liệu.
- Công ty bạn **nằm sâu trong hệ Microsoft/Azure** — dữ liệu trong SQL Server, làm việc qua Teams/SharePoint, có nhân sự IT vận hành gateway.
- Nhu cầu của bạn nghiêng về **visualization (trực quan hóa dữ liệu) phức tạp**, dashboard tài chính nhiều tầng, báo cáo trình bày cầu kỳ pixel-perfect.
- Bạn nhìn BI như một **nền tảng dài hạn có người vận hành**, không phải thứ phải tự chạy ngay tuần này.

Trong những điều kiện đó, sức mạnh của Power BI là thật và rất khó thay thế. *(Nếu bạn vẫn đang phân vân BI là gì và SME có cần không, đọc trước [Business Intelligence cho SME](/blog/bi-cho-sme/).)*

**Hãy chọn Semantix nếu:** bạn là SME không có người viết DAX; nhân viên dùng nhiều nền tảng kể cả Mac; bạn không ở sâu trong hệ Microsoft; dữ liệu nằm ở các sàn Việt cần hợp nhất; bạn muốn cả công ty tự hỏi data bằng tiếng Việt mà không tạo nút thắt ở một người; và bạn cần chạy được trong tuần này, không phải quý này.

## Tóm lại

| Bối cảnh của bạn | Lựa chọn hợp lý |
|---|---|
| Có người biết DAX + sâu trong Microsoft/Azure | Power BI |
| Cần visualization phức tạp, nền tảng dài hạn có người vận hành | Power BI |
| Không ai viết DAX, cần câu trả lời nhanh bằng tiếng Việt | Semantix |
| Dữ liệu rải ở Shopee/TikTok/KiotViet cần hợp nhất | Semantix |
| Nhân viên dùng Mac / công ty trên Google Workspace | Semantix |

Câu hỏi đúng không phải "Power BI hay Semantix mạnh hơn?" — mà là **"công ty mình có người viết DAX, dựng gateway và vận hành nó không?"** Power BI là một chiếc xe số sàn tuyệt vời cho ai biết lái. Nếu bạn không có người đó, đừng mua xe rồi để nó trùm mền ba tháng — hãy chọn thứ tự lái được.

---

*Muốn xem AI trả lời câu hỏi dữ liệu của chính bạn bằng tiếng Việt, không cần DAX, không cần gateway? [Đặt lịch demo hoặc dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/)*
