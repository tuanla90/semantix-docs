---
title: "On-premise vs Cloud cho AI BI: chạy AI phân tích khi dữ liệu không được phép rời máy chủ"
code: "ai-008"
description: "Ngân hàng, bệnh viện muốn dùng AI phân tích nhưng 'data không được ra khỏi máy chủ'. Tưởng phải bỏ AI — thật ra chỉ cần đổi chỗ AI chạy."
pubDate: 2027-05-19
category: "AI & Công Nghệ"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/on-premise-vs-cloud-ai-bi.svg"
coverAlt: "Hai cách triển khai AI BI: bên trái dữ liệu đi lên đám mây của bên thứ ba, bên phải dữ liệu và AI cùng nằm trong tòa nhà máy chủ nội bộ của doanh nghiệp"
---

Một giám đốc CNTT ở ngân hàng ngồi xem demo một công cụ AI phân tích. Nó trả lời nhanh, đọc hiểu câu hỏi tiếng Việt, vẽ biểu đồ trong vài giây. Rồi anh lắc đầu: *"Hay thật, nhưng dữ liệu khách hàng của tôi bị ràng buộc — không được rời khỏi trung tâm dữ liệu nội bộ. Vậy là AI này dùng không được."*

Câu kết luận ấy nghe rất hợp lý. Và nó **sai**. Anh vừa gộp hai thứ hoàn toàn tách rời được làm một: *"dùng AI"* và *"đẩy dữ liệu lên đám mây của người khác"*. Phần lớn công cụ AI gắn chặt hai cái đó — nên với dữ liệu nhạy cảm, đúng là phải bỏ. Nhưng đó là lựa chọn *kiến trúc triển khai*, không phải bản chất của AI. Bài này tách bạch hai khái niệm hay bị nhầm — **cloud** và **on-premise** — để bạn thấy: có một cách chạy AI phân tích mà dữ liệu, *kể cả model*, không bao giờ ra khỏi tường lửa của bạn.

## Cloud vs On-premise: khác nhau ở chỗ DỮ LIỆU và AI chạy ở ĐÂU

Bỏ qua mọi thuật ngữ một giây. Khác biệt cốt lõi chỉ là một câu hỏi về *vị trí*: khi bạn hỏi AI một câu, **dữ liệu của bạn và con AI trả lời đang nằm trên máy chủ của ai?**

- **Cloud (điện toán đám mây — hạ tầng thuê qua internet):** phần mềm và thường cả dữ liệu chạy trên máy chủ của nhà cung cấp. Bạn mở trình duyệt, gõ câu hỏi, mọi xử lý diễn ra "ở đâu đó ngoài kia". Tiện, nhanh, không phải nuôi server.
- **On-premise (triển khai trên hạ tầng tự quản của doanh nghiệp):** phần mềm chạy *bên trong* trung tâm dữ liệu của bạn — máy chủ của bạn, tường lửa của bạn, phòng máy của bạn. Dữ liệu không bước qua cánh cổng nào ra ngoài.

Ẩn dụ cho dễ hình dung: cloud giống gửi quần áo ra tiệm giặt — nhanh, rẻ, có người lo máy móc, nhưng quần áo (dữ liệu) của bạn rời khỏi nhà và đi qua tay người khác. On-premise là mua máy giặt đặt trong nhà — tốn tiền mua, tốn điện, tự bảo trì, nhưng đồ bẩn của bạn chưa từng ra khỏi cửa. Không có cái nào "đúng" tuyệt đối — chỉ có cái **hợp với mức nhạy cảm của thứ bạn đem giặt**.

## Cloud: nhanh, rẻ, nhẹ đầu — đổi lại data đi qua bên thứ ba

Với phần lớn doanh nghiệp vừa và nhỏ, cloud là lựa chọn mặc định đúng, và đúng vì những lý do rất thực tế:

- **Khởi động trong vài phút, không phải vài tháng.** Không mua server, không thuê kỹ sư hạ tầng, không lo phiên bản. Đăng ký là chạy.
- **Chi phí trả theo mức dùng.** Bạn không gánh khoản đầu tư phần cứng vài trăm triệu nằm khấu hao. Nhà cung cấp lo nâng cấp, vá lỗi, sao lưu.
- **Co giãn theo nhu cầu.** Mùa sale Shopee đẩy tải lên gấp mười, hạ tầng cloud tự co giãn; qua mùa lại thu về.

Cái giá phải trả nằm ở một câu duy nhất: **dữ liệu của bạn đi qua hạ tầng của một bên thứ ba.** Với báo cáo doanh thu một cửa hàng thời trang, điều đó hoàn toàn ổn — chẳng ai mất ngủ vì con số "tháng này bán 1,8 tỷ" nằm trên server thuê. Nhưng với hồ sơ bệnh án, số dư tài khoản, dữ liệu sinh trắc học, thì "đi qua bên thứ ba" không còn là chuyện tiện hay không — nó là chuyện *được phép hay không*.

## On-premise: data và AI ở trong nhà — đổi lại bạn gánh vận hành

On-premise lật ngược đánh đổi đó. Toàn bộ hệ thống — phần mềm phân tích, cơ sở dữ liệu, và như ta sẽ thấy, cả model AI — đóng gói chạy *trong* hạ tầng của bạn. Dữ liệu không rời tường lửa lấy một byte.

Công cụ để làm việc này gọn gàng là **Docker (đóng gói phần mềm cùng mọi thứ nó cần vào một "container" chạy giống nhau ở mọi nơi)** và **Kubernetes (điều phối nhiều container trên cụm máy chủ, tự khởi động lại khi hỏng, tự co giãn)**. Hình dung Docker là một container hàng tiêu chuẩn — bên trong xếp sẵn phần mềm, thư viện, cấu hình — bốc nguyên kiện đặt lên server nào cũng chạy y hệt; Kubernetes là người điều độ cảng, sắp các container ấy lên đúng chỗ và trông cho chúng luôn sống. Nhờ vậy "cài đặt trên server của khách" không còn là dự án vài tháng, mà là triển khai một bộ container đã đóng gói sẵn.

Đổi lại sự kiểm soát tuyệt đối, bạn gánh phần vận hành: mua hoặc thuê server, có người trực hạ tầng, tự lo nâng cấp và sao lưu. Đây là chi phí thật, và nó là lý do on-premise không hợp với một shop online ba người. Nhưng với tổ chức đã có sẵn phòng máy và đội IT — ngân hàng, bệnh viện, tập đoàn, cơ quan nhà nước — phần "gánh thêm" này nhỏ, còn phần "data không ra ngoài" mới là thứ quyết định.

> Quy tắc vàng: đừng hỏi "cloud hay on-premise tốt hơn" — hỏi "dữ liệu này *có được phép* rời máy chủ của tôi không". Trả lời được câu đó, lựa chọn tự lộ ra.

## Khi nào chọn cái nào — quy mô, ngành, và ràng buộc pháp lý

Quyết định gói gọn trong ba câu hỏi:

**Một, dữ liệu nhạy cỡ nào?** Doanh thu cửa hàng, lượt xem sản phẩm — cloud thoải mái. Dữ liệu cá nhân khách hàng, hồ sơ y tế, thông tin tài chính — cân nhắc on-premise. Càng đi gần "định danh một con người cụ thể", cán cân càng nghiêng về trong nhà.

**Hai, ngành có bị quản chặt không?** Tài chính - ngân hàng, y tế, bảo hiểm, khu vực công ở Việt Nam đều có quy định riêng về nơi lưu trữ và xử lý dữ liệu. Trên nền đó, **Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân** đặt ra nghĩa vụ rõ ràng cho mọi tổ chức xử lý dữ liệu cá nhân của người Việt — bao gồm cả việc kiểm soát **data residency (nơi cư trú của dữ liệu — dữ liệu được lưu, xử lý ở đâu và theo quy định nào)**. Với nhiều tổ chức, on-premise là cách đơn giản nhất để chứng minh "dữ liệu chưa từng rời lãnh thổ kiểm soát của chúng tôi".

**Ba, đội ngũ kham nổi vận hành không?** Có sẵn phòng máy và đội IT thì on-premise là chi phí biên nhỏ. Một đội ba người không nên ôm cụm Kubernetes — cloud giải phóng họ khỏi việc không phải sở trường.

Tôi đang là trưởng nhóm BI ở một ngân hàng, nên ba câu hỏi này không phải lý thuyết — chúng là cuộc họp tôi ngồi trong đó. Có lần tôi đứng trước ban điều hành bảo vệ quan điểm chuyển từ Power BI sang Data Studio: lập luận thắng được không phải vì công cụ "xịn hơn", mà vì nó vẫn nằm gọn trong vùng kiểm soát dữ liệu mà nghiệp vụ ngân hàng đòi hỏi. Bài học tôi rút ra: ở ngành bị quản chặt, câu hỏi đầu tiên không bao giờ là "tính năng", mà là "dữ liệu này *có được phép* đi tới đó không". Trả lời xong câu đó rồi mới đến lượt so tính năng.

*Không phải chọn một lần cho mãi mãi.* Nhiều tổ chức đi cloud cho dữ liệu thường, on-premise cho phần nhạy cảm. Vấn đề là: công cụ bạn chọn *có cho bạn cả hai cửa* không, hay khóa chặt bạn vào một?

## Điểm then chốt: để cả model AI cũng không ra ngoài

Đây là chỗ nhiều người tưởng đã thua. *"Được, tôi tự host phần mềm phân tích trong nhà. Nhưng AI thì sao? Nó vẫn phải gọi ra OpenAI hay Google ngoài internet, đúng không? Vậy câu hỏi của tôi — kèm theo dữ liệu trong đó — vẫn bay ra ngoài."*

Đúng — *nếu* bạn dùng model qua đám mây. Nhưng AI không bắt buộc phải ở trên trời. **Ollama (công cụ chạy mô hình ngôn ngữ lớn ngay trên máy chủ nội bộ)** cho phép tải các model mã nguồn mở về và chạy *bên trong* hạ tầng của bạn. Câu hỏi đi tới một server trong phòng máy của bạn, được model ở ngay đó xử lý, trả lời quay về — không một gói tin nào rời mạng nội bộ. Với tổ chức đã có hạ tầng riêng (như Azure tư nhân), **Azure OpenAI** là một lựa chọn khác giữ dữ liệu trong vùng kiểm soát.

Ghép lại, bức tranh hoàn chỉnh: phần mềm self-host trong nhà, dữ liệu trong nhà, *và* AI trong nhà. Lúc này "dữ liệu không được rời máy chủ" không còn là lý do để bỏ AI — nó chỉ đơn giản là đẩy chỗ-AI-chạy về cùng phía tường lửa với dữ liệu. Đây cũng là tầng sâu nhất của câu chuyện [đưa dữ liệu cho AI sao cho an toàn](/blog/data-cho-ai-an-toan/): không chỉ chọn *ai giữ khóa* gọi AI, mà chọn cả *AI chạy ở đâu*.

## Trong Semantix

Semantix không định vị mình là "một dịch vụ cloud mà bạn buộc phải đẩy dữ liệu lên đó". Với tổ chức có ràng buộc dữ liệu, cách tiếp cận đi đúng theo logic ở trên:

1. **Triển khai tự lưu trữ (self-host) ở gói Enterprise** — toàn bộ Semantix đóng gói chạy bằng **Docker / Kubernetes** ngay trong hạ tầng nội bộ của bạn. Dữ liệu không rời trung tâm dữ liệu của doanh nghiệp.
2. **AI provider riêng** — bạn cấu hình **Ollama chạy nội bộ** để cả model AI cũng nằm trong nhà, hoặc trỏ sang **Azure OpenAI** nếu đã có hạ tầng riêng. Không phụ thuộc một đường ra internet công cộng.
3. **Bạn vẫn giữ khóa** — kết hợp với **BYOK (Bring Your Own Key — tự mang khóa API của mình)** và định tuyến đa nhà cung cấp, bạn kiểm soát chính xác mỗi câu hỏi đi đâu. *(Vì sao chủ quyền khóa quan trọng đến vậy, xem [Multi-provider & BYOK: chủ quyền dữ liệu cho doanh nghiệp](/blog/multi-provider-byok/).)*

Nói cách khác, an toàn ở đây không phải lời hứa "chúng tôi không nhìn dữ liệu của bạn đâu", mà là một *kiến trúc* khiến việc dữ liệu ra ngoài gần như không có đường xảy ra — vì cả ba thứ (phần mềm, dữ liệu, model AI) đều ở chung một phía tường lửa với bạn. Còn nếu bạn là một [SME chưa cần đến mức ấy](/blog/bi-cho-sme/), bản cloud chạy ngay trong vài phút vẫn là lựa chọn gọn nhất.

## Tóm lại

| | Cloud | On-premise (self-hosted) |
|---|---|---|
| **Dữ liệu nằm ở đâu** | Máy chủ nhà cung cấp | Trung tâm dữ liệu của bạn |
| **AI chạy ở đâu** | Đám mây bên thứ ba | Nội bộ (Ollama / Azure OpenAI) |
| **Quyền kiểm soát** | Chia sẻ với nhà cung cấp | Tuyệt đối — trong tường lửa |
| **Chi phí** | Trả theo mức dùng, nhẹ đầu | Đầu tư hạ tầng + vận hành |
| **Khởi động** | Vài phút | Triển khai có kế hoạch |
| **Hợp với ai** | SME, dữ liệu ít nhạy cảm | Ngân hàng, y tế, khu vực công, dữ liệu theo quy định |

Lần tới khi ai đó nói "dữ liệu của chúng tôi không được ra khỏi máy chủ nên không dùng AI được", đừng gật đầu. Hãy hỏi lại: *vậy ta đặt AI vào đúng phía tường lửa với dữ liệu thì sao?* Ràng buộc dữ liệu chưa bao giờ là lý do để từ bỏ AI phân tích — nó chỉ là lý do để **chọn đúng nơi AI chạy.**

---

*Tổ chức của bạn cần AI BI chạy hoàn toàn trong nhà, dữ liệu không rời máy chủ? [Đặt lịch tư vấn triển khai Enterprise / on-premise.](/docs/vi/free-trial/) Hoặc đọc tiếp [Đưa dữ liệu cho AI có an toàn không](/blog/data-cho-ai-an-toan/) và [Multi-provider & BYOK](/blog/multi-provider-byok/).*
