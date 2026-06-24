---
title: "WHY Analysis: vì sao 'doanh thu giảm 15%' là câu trả lời vô dụng — cho tới khi bạn bóc nó ra"
code: "pt-051"
description: "Sếp hỏi vì sao doanh thu giảm 15%. 'Do thị trường' không phải câu trả lời. Cách bóc một con số thay đổi thành các yếu tố đóng góp — để biết sửa ở đâu."
pubDate: 2027-04-28
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Trần Minh Khoa"
featured: false
cover: "/blog/covers/why-analysis.svg"
coverAlt: "Một con số doanh thu lớn tách thành các cột đóng góp waterfall: giá, lượng khách, đơn trung bình"
---

Cuộc họp đầu tháng. Sếp chỉ vào màn hình: "Doanh thu tháng này giảm 15%. Vì sao?" Cả phòng im. Rồi ai đó buột miệng: "Dạ chắc do thị trường ạ." Sếp gật, ghi vào biên bản, và cuộc họp trôi đi.

Đó là câu trả lời tệ nhất có thể đưa ra — không phải vì nó sai, mà vì nó **vô dụng**. "Do thị trường" không cho bạn một việc nào để làm vào sáng mai. Nó là cách lịch sự để nói "tôi không biết".

Con số "−15%" không phải một khối đặc. Nó là **tổng của nhiều thứ đang kéo nhau theo hai hướng**: có yếu tố kéo doanh thu xuống, có yếu tố kéo lên, và cái bạn nhìn thấy chỉ là phần còn lại sau khi chúng triệt tiêu nhau. Nhiệm vụ của bạn không phải đoán nguyên nhân — mà là **bóc** con số đó ra cho tới khi mỗi mảnh chỉ thẳng vào một việc cần sửa. Đó là WHY analysis.

## WHY analysis là gì: phân rã thay đổi theo driver

WHY analysis là phân tích **chẩn đoán** (diagnostic analytics — trả lời "vì sao con số này thay đổi", khác với mô tả chỉ nói "con số là bao nhiêu"). Nó thuộc họ **root cause analysis** (phân tích nguyên nhân gốc — truy ngược một kết quả về nguồn thật sự sinh ra nó), và cách làm cốt lõi rất giản dị: **phân rã** một thay đổi thành các **driver** (yếu tố tác động — những đại lượng mà khi đổi sẽ làm con số tổng đổi theo).

Lấy doanh thu làm ví dụ. Doanh thu hầu như luôn bằng một tích:

```
Doanh thu = Số khách × Đơn trung bình
          = Số khách × Số đơn/khách × Giá trị mỗi đơn
```

Khi doanh thu đổi, nó đổi vì **một (hoặc nhiều) trong các thừa số này** đổi. Khung kinh điển nhất là **price–volume–mix** (giá – lượng – cơ cấu):

- **Price (giá):** bạn bán đắt hơn hay rẻ hơn? Khuyến mãi sâu kéo giá trung bình xuống.
- **Volume (lượng):** bạn bán được nhiều món/nhiều khách hơn hay ít hơn?
- **Mix (cơ cấu):** tỷ trọng giữa các sản phẩm/kênh đổi. Bán nhiều hàng rẻ hơn, ít hàng cao cấp đi — tổng lượng y nguyên mà doanh thu vẫn tụt, chỉ vì **cơ cấu** lệch.

Mix là cái xảo quyệt nhất, vì nó tụt mà không có thừa số đơn lẻ nào "trông có vẻ" giảm. Bỏ qua mix là lý do nhiều người bóc số xong vẫn thấy "không khớp".

## 5 Whys: hỏi "vì sao" nhiều tầng để tới gốc

Phân rã cho bạn biết *yếu tố nào* đổi. Nhưng yếu tố đó vẫn chưa phải gốc — nó chỉ là tầng đầu. Kỹ thuật **5 Whys** (5 lần hỏi vì sao — hỏi "vì sao" liên tiếp, mỗi câu trả lời lại thành câu hỏi tiếp theo, cho tới khi chạm nguyên nhân có thể hành động) ép bạn đi sâu thêm:

1. *Vì sao doanh thu giảm 15%?* → Vì lượng khách giảm 8%.
2. *Vì sao lượng khách giảm?* → Vì khách từ kênh Shopee giảm mạnh.
3. *Vì sao khách Shopee giảm?* → Vì thứ hạng tìm kiếm của shop tụt.
4. *Vì sao thứ hạng tụt?* → Vì điểm đánh giá rớt sau một đợt giao hàng trễ.
5. *Vì sao giao hàng trễ?* → Vì đổi đơn vị vận chuyển hồi đầu tháng.

Tầng 1 ("lượng khách giảm") là thứ phân rã chỉ ra. Tầng 5 ("đổi đơn vị vận chuyển") mới là thứ bạn **sửa được vào sáng mai**. "Do thị trường" thậm chí không qua nổi câu hỏi thứ nhất.

<div class="viz">
<div class="viz-chart" data-chart="waterfall" data-chart-data='{"unit":" tỷ","items":[{"label":"DT tháng trước","value":10,"type":"total"},{"label":"− Giá bán giảm","value":-1.2},{"label":"− Lượng khách","value":-0.8},{"label":"+ Đơn TB tăng","value":0.5},{"label":"DT tháng này","value":8.5,"type":"total"}]}'></div>
<div class="viz-caption">Phân rã vì sao doanh thu đổi (số minh họa): con số "−15%" được bóc thành các yếu tố đóng góp — giá giảm và mất khách kéo xuống, đơn trung bình tăng kéo lên. Giờ bạn biết sửa ở đâu.</div>
</div>

Nhìn biểu đồ waterfall (bắc cầu) trên: nó kể đúng một câu chuyện mà "−15%" giấu kín. Hóa ra **giá giảm** (−1,2 tỷ) là thủ phạm lớn nhất, không phải mất khách (−0,8 tỷ). Và có một tin tốt bị che hẳn: **đơn trung bình đang tăng** (+0,5 tỷ), kéo ngược lên. Nếu bạn dừng ở con số tổng, bạn không bao giờ thấy cái lò xo đang đẩy lên này — và có thể vô tình bóp chết nó khi "chữa cháy" doanh thu bằng cách giảm giá thêm.

## Vì sao "một con số tổng" giấu hết nguyên nhân

Một con số tổng là kết quả của **phép cộng những lực ngược chiều**. −15% có thể là "−15% đều khắp" (cả thị trường yếu thật), hoặc là "−40% ở một kênh + 25% ở kênh khác" — hai tình huống đòi hai hành động hoàn toàn khác nhau, mà con số tổng nhìn y hệt.

Cách thoát ra là **cắt theo nhiều chiều** (dimension — lát cắt để xoay nhìn con số: theo kênh, khu vực, sản phẩm, nhóm khách) để **khoanh vùng**:

- **Theo kênh:** cú giảm nằm ở Shopee, TikTok Shop, hay cửa hàng offline?
- **Theo khu vực:** TP.HCM giảm hay tỉnh giảm?
- **Theo sản phẩm:** một dòng hàng tụt kéo cả tổng, hay tụt đều?

Gần như mọi lần, bạn sẽ thấy cú giảm **không trải đều** — nó dồn vào một hai chỗ. Đây chính là [Pareto 80/20](/blog/pareto-80-20/) áp vào *nguyên nhân*: thường **một nhúm nhỏ kênh/sản phẩm gây ra phần lớn cú giảm**. Tìm ra cái nhúm đó, bạn đã thu hẹp vấn đề từ "cả công ty" xuống "một việc cụ thể".

Một cảnh báo quan trọng: phân rã cho bạn biết *cái gì* đi cùng cú giảm, không tự động cho biết *cái gì gây ra* nó. "Doanh thu giảm trùng lúc ta đổi vận chuyển" là một manh mối, không phải bằng chứng — đừng nhầm [tương quan với nhân quả](/blog/tuong-quan-nhan-qua/). 5 Whys và một chút kiểm chứng (thử khôi phục, so với kỳ trước) là thứ biến manh mối thành kết luận.

WHY analysis cũng chính là nấc thứ hai trên [thang trưởng thành phân tích](/blog/tien-hoa-bi/): từ "chuyện gì đã xảy ra" (mô tả) bước lên "vì sao nó xảy ra" (chẩn đoán). Phần lớn doanh nghiệp Việt kẹt ở nấc một — có dashboard đẹp nhưng vẫn trả lời "do thị trường".

## … trong Semantix

Tự tay làm việc này tử tế — bóc doanh thu theo price–volume–mix, rồi cắt chéo theo kênh × khu vực × sản phẩm để khoanh vùng, rồi chạy 5 Whys — là cả buổi viết SQL cho một analyst. Và lần sau con số đổi, bạn lại làm lại từ đầu.

Semantix không phải chatbot cắm vào database rồi đoán mò "chắc do thị trường". Semantix **có sẵn tính năng phân tích "vì sao"**: khi một con số đổi, nó tự **bóc thay đổi đó theo từng chiều** để chỉ ra đâu là yếu tố đóng góp lớn nhất — thay vì bắt bạn tự dò. Bạn định nghĩa "doanh thu", "kênh", "sản phẩm" một lần trong [Semantic Layer](/blog/semantic-layer/), rồi hỏi bằng tiếng Việt:

> **"Vì sao doanh thu giảm tháng này? Bóc ra theo giá, lượng khách và sản phẩm, rồi cho biết kênh nào đóng góp nhiều nhất vào cú giảm."**

Semantix tự dựng phân rã và biểu đồ waterfall, chỉ thẳng vào driver lớn nhất — để câu trả lời trong cuộc họp tới không còn là "do thị trường", mà là "do giá ở Shopee, vì đợt khuyến mãi sâu — đây là chỗ cần sửa".

## Tóm lại

| Một con số tổng | Phân rã theo driver |
|---|---|
| "Doanh thu giảm 15%" | "−15% = giá −12% + khách −8% + đơn TB +5%" |
| "Do thị trường" | "Do giá ở kênh Shopee, sau đợt khuyến mãi" |
| Đoán nguyên nhân | Bóc tách đóng góp, rồi 5 Whys tới gốc |
| Nhìn tổng, tưởng giảm đều | Cắt theo chiều, thấy cú giảm dồn vào một chỗ |
| Không biết sửa ở đâu | Một việc cụ thể để làm sáng mai |

> Quy tắc vàng: **một con số thay đổi không bao giờ là một nguyên nhân — nó là tổng của nhiều lực ngược chiều.** Đừng đoán "vì sao". Hãy bóc con số ra cho tới khi mỗi mảnh chỉ vào đúng một việc bạn có thể sửa.

---

*Muốn biết chính xác vì sao con số của bạn đổi — không phải đoán, mà bóc theo từng chiều? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Pareto 80/20](/blog/pareto-80-20/) để khoanh đúng cái nhúm gây ra phần lớn cú giảm.*
