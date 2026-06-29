---
title: "Funnel Analysis: phễu của bạn chỉ rò một chỗ - bịt đúng nó lời gấp 5 lần vá khắp nơi"
code: "pt-006"
description: "Một shop đổ tiền chạy ads kéo traffic nhưng doanh thu đứng im. Vấn đề không nằm ở traffic - mà ở một bước checkout đang chảy máu. Cách đọc phễu bán hàng để tìm đúng chỗ rò."
pubDate: 2025-09-21
category: "Phân Tích Dữ Liệu"
readTime: 8
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/funnel-analysis.svg"
coverAlt: "Phễu chuyển đổi thu hẹp dần qua 4 bước với một điểm rò rỉ chính được đánh dấu"
---

Một shop thời trang trên Shopee tháng vừa rồi tăng gấp đôi ngân sách ads. Traffic (lượng truy cập) vào trang sản phẩm tăng từ 40.000 lên 82.000 lượt. Chủ shop hài lòng - cho tới khi nhìn doanh thu: gần như đứng im. Tiền ads thì đã đốt thật.

Phản xạ đầu tiên của họ là kết luận "ads kém hiệu quả, đổi agency thôi". Nhưng đó là chẩn đoán sai bệnh. Khi mổ xẻ phễu, sự thật lộ ra: **67% khách thêm hàng vào giỏ rồi biến mất ở đúng một bước - nhập địa chỉ giao hàng.** *(ví dụ minh họa)* Traffic chưa bao giờ là vấn đề. Họ đang bơm thêm nước vào một cái xô mà lỗ thủng nằm gần đáy. Bơm càng mạnh, nước chảy ra càng nhiều.

Đây là nghịch lý ít người chịu tin: **mọi phễu bán hàng đều có MỘT điểm chảy máu chính. Bịt đúng điểm đó tạo impact gấp 3-5 lần so với tối ưu lặt vặt mọi bước.** Và bạn sẽ không thấy nó nếu chỉ nhìn doanh thu tổng. Chỉ **Funnel Analysis** (phân tích phễu chuyển đổi - chuỗi bước khách đi qua từ xem đến mua) kể được.

## Funnel Analysis là gì?

Phễu (funnel) là chuỗi các bước khách phải đi qua từ lúc biết đến bạn cho tới lúc trả tiền. Với một shop ecom điển hình, phễu có bốn tầng:

**Xem sản phẩm → Thêm vào giỏ → Bắt đầu thanh toán → Mua thành công.**

Mỗi tầng hẹp hơn tầng trước - vì luôn có người rơi rụng. Đó là chuyện bình thường: không phải ai xem cũng mua. Funnel Analysis không đếm số người ở mỗi tầng (số tuyệt đối), mà đo **tỷ lệ chuyển tiếp giữa hai tầng liền kề** (conversion rate - tỷ lệ chuyển đổi) - và đi tìm chỗ tỷ lệ đó tụt bất thường.

Hình dung cái phễu như một đường ống nhiều đoạn nối tiếp. Nước (khách) chảy từ trên xuống. Bạn không cần biết tổng lượng nước thất thoát - bạn cần biết *đoạn ống nào đang nứt to nhất*.

## Đọc một phễu: nhìn tỷ lệ giữa các bước, không nhìn số tuyệt đối

Đây là sai lầm phổ biến nhất. Người mới nhìn phễu thấy "tầng cuối chỉ còn vài nghìn người, ít quá" rồi hoảng. Nhưng con số tuyệt đối ở mỗi tầng gần như vô nghĩa - cái có nghĩa là **% rớt giữa hai tầng**.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- Tầng 1 -->
  <rect x="90" y="20" width="500" height="56" rx="8" fill="#0d9488"/>
  <text x="340" y="54" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">Xem sản phẩm - 82.000</text>
  <text x="610" y="92" fill="#94A3B8" font-size="13" text-anchor="end">↓ giữ 44%</text>
  <!-- Tầng 2 -->
  <rect x="165" y="96" width="350" height="56" rx="8" fill="#14b8a6"/>
  <text x="340" y="130" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">Thêm vào giỏ - 36.000</text>
  <text x="610" y="168" fill="#F87171" font-size="13" font-weight="700" text-anchor="end">↓ giữ 33% - RÒ RỈ</text>
  <!-- Tầng 3 - điểm chảy máu -->
  <rect x="225" y="172" width="230" height="56" rx="8" fill="#dc2626"/>
  <text x="340" y="206" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">Bắt đầu thanh toán - 12.000</text>
  <text x="610" y="244" fill="#94A3B8" font-size="13" text-anchor="end">↓ giữ 75%</text>
  <!-- Tầng 4 -->
  <rect x="260" y="248" width="160" height="56" rx="8" fill="#15803d"/>
  <text x="340" y="282" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">Mua thành công - 9.000</text>
  <!-- nhãn cảnh báo -->
  <circle cx="470" cy="200" r="6" fill="#FCA5A5"/>
  <text x="488" y="205" fill="#FCA5A5" font-size="13" font-weight="700">điểm chảy máu chính</text>
</svg>
<div class="viz-caption">Phễu thu hẹp dần qua 4 bước. Bước "Thêm vào giỏ → Bắt đầu thanh toán" chỉ giữ 33% - thấp bất thường so với các bước khác. Đó là chỗ ống nứt to nhất. *(số liệu minh họa)*</div>
</div>

Nhìn bảng phễu trên: tầng cuối chỉ còn 9.000 đơn - nghe "ít". Nhưng đừng nhìn vào đó. Nhìn vào **tỷ lệ giữa các bước**:

- Xem → Giỏ: giữ **44%** (rớt 56%)
- Giỏ → Thanh toán: giữ **33%** (rớt 67%) ← thấp hẳn so với phần còn lại
- Thanh toán → Mua: giữ **75%** (rớt 25%)

Bước "Giỏ → Thanh toán" tụt xuống 33% trong khi các bước khác giữ 44% và 75%. Đó là chữ ký của một điểm chảy máu. Số tuyệt đối nói "tầng cuối ít người"; tỷ lệ nói "vấn đề nằm ở bước thứ hai".

> Quy tắc vàng: **một phễu không được đọc bằng độ cao của tầng cuối, mà bằng độ dốc giữa các tầng.** Tầng nào dốc bất thường, ống nứt nằm ở đó.

## Drop-off (tỷ lệ rơi rụng) bình thường vs bất thường: làm sao phân biệt?

Câu hỏi đúng không phải "bước này rớt bao nhiêu phần trăm?" mà là "bước này rớt **nhiều hơn mức nên rớt** bao nhiêu?". Rớt 56% ở bước "Xem → Giỏ" nghe khủng khiếp, nhưng với ecom đó là *bình thường* - phần lớn người xem chỉ lướt, chưa có ý định mua. Ngược lại, rớt 67% ở bước "Giỏ → Thanh toán" là *bất thường*: những người này đã bỏ công chọn hàng, bấm thêm vào giỏ - họ có ý định rõ ràng. Mất 2/3 trong số đó là máu chảy.

Ba cách tìm ngưỡng "bình thường" để so:

1. **So với chính bạn trong quá khứ.** Tháng này bước checkout (thanh toán) rớt 67%, ba tháng trước rớt 48% - vậy có gì đó vừa hỏng (đổi giao diện? thêm bước? phí ship tăng?).
2. **So với benchmark ngành.** Tỷ lệ bỏ giỏ hàng (cart abandonment) trung bình ngành ecom toàn cầu quanh **68-70%** theo nhiều khảo sát. Nếu bạn ở mức đó, đừng hoảng - đó là mặt bằng chung. Nếu bạn ở **85%**, mới đáng báo động.
3. **So sánh giữa các segment (phân khúc khách).** Cùng một bước, khách trên mobile (điện thoại) rớt 80% còn desktop (máy tính) rớt 50% - vấn đề nằm ở trải nghiệm mobile, không phải ở bản thân cái bước đó.

Không có con số "rớt bao nhiêu là xấu" tuyệt đối. Chỉ có *rớt nhiều hơn cái nên rớt* - và muốn biết, bạn phải có thứ để đối chiếu. (Đây cũng chính là tinh thần của một [câu hỏi dữ liệu tốt: luôn có đối chiếu](/blog/ai-questions/).)

## Cái bẫy lớn nhất: tối ưu bước không quan trọng

Đây là chỗ phần lớn shop đốt tiền oan. Họ thấy bước "Xem → Giỏ" rớt 56% - con số tuyệt đối lớn nhất - nên dồn toàn lực vào đó: đổi ảnh sản phẩm, viết lại mô tả, chạy thêm khuyến mãi. Giả sử nỗ lực anh hùng đó kéo tỷ lệ từ 44% lên 48%.

Hãy tính xem nó đáng giá bao nhiêu. Cải thiện 4 điểm phần trăm ở *đỉnh phễu* lan xuống tới đáy sẽ bị bào mòn qua từng tầng - cuối cùng chỉ nhích doanh thu vài phần trăm. Trong khi đó, nếu bịt bước checkout đang rò (kéo 33% lên 50% bằng cách cho thanh toán khách vãng lai + lưu địa chỉ sẵn), số đơn cuối cùng có thể nhảy 40-50%. *(ví dụ minh họa)*

> Nguyên tắc đòn bẩy: **một điểm phần trăm cứu được ở bước đang rò có giá trị gấp nhiều lần một điểm phần trăm ở bước vốn đã khỏe.** Đừng tô lại bức tường đẹp khi mái đang dột.

Ẩn dụ cũ nhưng đúng: bịt phễu giống vá đường ống. Bạn không sơn lại đoạn ống lành cho bóng - bạn tìm đoạn nứt to nhất và hàn nó. Mọi nỗ lực dồn vào chỗ không rò đều là công sức bốc hơi.

Ba điểm chảy máu kinh điển của ecom Việt Nam, theo thứ tự hay gặp:

- **Giỏ hàng bỏ quên** vì phí ship hiện ra phút chót cao hơn dự kiến.
- **Bước nhập địa chỉ** quá dài, bắt gõ tay tỉnh/huyện/xã thay vì chọn nhanh.
- **Bắt đăng ký tài khoản** trước khi thanh toán - khách vãng lai bỏ đi ngay.

## Phễu vi mô vs vĩ mô: phóng to đúng chỗ

Phễu bốn tầng ở trên là phễu **vĩ mô** - nó chỉ cho bạn biết *tầng nào* rò. Để biết *vì sao* rò, bạn phải phóng to tầng đó thành một phễu **vi mô**.

Ví dụ, sau khi biết bước "Giỏ → Thanh toán" là thủ phạm, bạn mổ riêng nó ra: Mở trang thanh toán → Nhập địa chỉ → Chọn vận chuyển → Chọn thanh toán → Bấm đặt hàng. Lúc này phễu vi mô có thể chỉ thẳng: 40% khách rơi ngay ở ô "nhập địa chỉ". Giờ bạn không chỉ biết *bước* hỏng, mà biết *ô input* nào hỏng - đủ cụ thể để sửa trong một sprint.

Đọc phễu là một quá trình thu hẹp: từ "tầng nào" → "bước con nào" → "thao tác nào". Mỗi lần phóng to, bạn tiến gần hơn tới một hành động cụ thể thay vì một lời than chung chung "khách không mua".

## Funnel Analysis với Semantix

Trước đây, dựng một phễu tử tế là việc của analyst: viết SQL nối bảng sự kiện, tính tỷ lệ từng bước, vẽ biểu đồ, rồi lặp lại cho từng segment. Nửa ngày cho một câu hỏi. Với Semantix, bạn hỏi thẳng bằng tiếng Việt:

> **"Vẽ phễu từ lúc khách xem sản phẩm đến khi mua thành công trong tháng 3. Bước nào drop-off cao nhất? So mobile với desktop."**

Semantix không phải một chatbot cắm vào database rồi đoán mò. Nó hiểu "phễu", "drop-off", "mua thành công" nghĩa là gì trong *ngữ cảnh dữ liệu của bạn* - vì các khái niệm đó đã được định nghĩa một lần trong [Semantic Layer](/blog/semantic-layer/). Từ đó nó tự sinh SQL khớp cấu trúc bảng của bạn và trả về phễu kèm % rớt từng bước, tách theo segment - ngay lập tức. Bạn chỉ việc đọc chỗ nào dốc bất thường.

Phễu cũng không sống một mình. Sau khi tìm ra khách rớt ở đâu, câu hỏi tiếp theo thường là *ai* rớt và *họ có quay lại không* - đó là lúc bạn ghép Funnel với [Cohort Analysis](/blog/cohort-analysis/) (phân tích theo nhóm khách gộp theo thời điểm bắt đầu) để thấy bức tranh đầy đủ.

## Tóm lại

| | Đọc phễu sai | Đọc phễu đúng |
|---|---|---|
| **Nhìn vào** | Số tuyệt đối mỗi tầng | Tỷ lệ rớt giữa hai tầng |
| **Chuẩn so sánh** | "Rớt nhiều quá!" (cảm tính) | So quá khứ / benchmark / segment |
| **Ưu tiên sửa** | Bước có số rơi lớn nhất | Bước rớt *bất thường* nhất |
| **Kết quả** | Tối ưu khắp nơi, nhích vài % | Bịt một chỗ, nhảy 40-50% |

Mọi phễu đều rò. Câu hỏi không phải "làm sao chặn hết rò" - bất khả thi và lãng phí. Câu hỏi là: *chỗ nào đang chảy máu nhiều nhất, và tôi bịt nó trước.* Tìm đúng một chỗ đó, bạn đi trước phần lớn shop vẫn đang miệt mài sơn lại đoạn ống không nứt.

---

*Muốn biết phễu của bạn đang rò ở đâu? [Dùng thử miễn phí với Google Sheets](/docs/vi/free-trial/) - kết nối dữ liệu và hỏi câu phễu đầu tiên trong dưới 15 phút.*
