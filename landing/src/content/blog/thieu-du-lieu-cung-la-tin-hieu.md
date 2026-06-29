---
title: "Ô trống cũng biết nói: khi 'thiếu dữ liệu' chính là một tín hiệu"
code: "pt-032"
description: "Cột nguồn khách hàng để trống, bạn điền đại số 0. Vừa xong, bạn đã xoá mất một thông tin quý: việc nó trống tự nó là một tín hiệu."
pubDate: 2026-02-14
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/thieu-du-lieu-cung-la-tin-hieu.svg"
coverAlt: "Bảng dữ liệu có những ô trống được tô sáng như tín hiệu, bên cạnh là một cột cờ đã_trống vừa được thêm vào"
---

Bạn mở một bảng hồ sơ khách hàng để dự đoán ai sẽ chốt đơn. Cột "nguồn khách" có 18% dòng để trống. Phản xạ quen thuộc bật lên ngay: điền đại - cho 0, cho "không xác định", hoặc tệ hơn, xoá luôn những dòng đó cho gọn. Vài phút sau bảng nhìn sạch bong, không còn ô trống nào.

Vấn đề: bạn vừa **xoá mất một thông tin quý**. Việc một khách *không* để lại nguồn không phải là "thiếu dữ liệu cần lấp" - nó thường là một **tín hiệu** rằng người này đến theo một cách khác hẳn nhóm còn lại.

Phản xạ đầu tiên của bạn có thể là: *"Trống thì là trống, có gì mà tín hiệu."* Đây đúng là chỗ ít người chịu nhìn. Một **giá trị khuyết (missing value - ô không có dữ liệu)** đôi khi mang nhiều thông tin hơn cả một ô đã điền. Hiểu được điều đó là khác biệt giữa một mô hình đoán bừa và một mô hình thật sự nhìn ra điều bạn đang bỏ lỡ.

## Vì sao ô trống hiếm khi trống một cách ngẫu nhiên

Hãy hình dung dữ liệu của bạn như một biên bản lấy lời khai. Một câu hỏi bị bỏ trống không phải lúc nào cũng vì người ta quên - đôi khi họ **cố tình không trả lời**, và chính sự im lặng đó tố cáo nhiều thứ.

Trong dữ liệu kinh doanh, ô trống thường có lý do hệ thống:

- Khách **không để lại email** → có thể họ mua nhanh qua một kênh không yêu cầu đăng nhập, ý định khác hẳn người chịu khó điền form.
- Đơn hàng **không có mã giảm giá** → đơn này không đến từ một chiến dịch marketing nào cả.
- Trường **"lý do huỷ" để trống** → đây là một loại huỷ khác với những đơn có ghi rõ lý do.

Trong cả ba trường hợp, ô trống *là* dữ liệu. Nó nói cho bạn biết khách thuộc nhóm nào, đến bằng đường nào, hành xử ra sao. Lấp nó bằng một con số đại diện chẳng khác gì *bịt miệng nhân chứng* ngay khi họ sắp khai.

## Ba kiểu khuyết - và vì sao chỉ một kiểu mới thật sự nguy hiểm

Giới thống kê chia chuyện thiếu dữ liệu thành ba kiểu. Tên viết tắt nghe đáng sợ, nhưng ý thì rất đời thường.

| Kiểu khuyết | Nghĩa đơn giản | Ví dụ SME |
|---|---|---|
| **MCAR** *(thiếu ngẫu nhiên hoàn toàn)* | Trống hoàn toàn do may rủi, không liên quan gì đến ai | Máy quét lỗi ngẫu nhiên làm rớt vài ô |
| **MAR** *(thiếu có điều kiện)* | Trống phụ thuộc một trường *khác* mà bạn quan sát được | Khách lớn tuổi hay bỏ trống ô "mạng xã hội" hơn |
| **MNAR** *(thiếu không ngẫu nhiên)* | Việc trống phụ thuộc *chính giá trị* bị giấu đi | Người thu nhập cao hay từ chối khai thu nhập |

**MCAR (Missing Completely At Random - thiếu ngẫu nhiên hoàn toàn)** là kiểu hiền nhất: ô trống rải đều, không thiên vị ai. Lấp hay bỏ đều ít hại.

**MAR (Missing At Random - thiếu có điều kiện)** đã tinh vi hơn: chuyện trống phụ thuộc vào một cột khác bạn nhìn thấy được. Nếu biết khai thác cột đó, bạn lấp khuyết khôn ngoan hơn.

**MNAR (Missing Not At Random - thiếu không ngẫu nhiên)** là kiểu nguy hiểm nhất, và cũng là kiểu mang nhiều thông tin nhất. Ở đây, *bản thân việc trống đã nói lên giá trị bị giấu*. Người thu nhập cao bỏ trống ô thu nhập nhiều hơn người thu nhập thấp - nên cái ô trống đó *chính là* một manh mối về thu nhập. Xoá nó đi là vứt bỏ đúng phần thông tin đắt giá nhất.

> Quy tắc vàng: trước khi điền một ô trống, hãy hỏi "vì sao nó trống?". Nếu lý do liên quan đến chính con số bị thiếu, đừng vội lấp - hãy ghi lại rằng nó đã trống.

## Kỹ thuật thực chiến: thêm một cột cờ thay vì lấp mù quáng

Đây là mẹo mà dân làm mô hình dùng suốt nhưng ít khi nói ra cho người ngoài: thay vì chỉ **điền khuyết (impute - thay ô trống bằng một giá trị ước lượng)**, bạn tạo thêm một **cột cờ thiếu (missing indicator - cột nhị phân đánh dấu ô nào vốn để trống)**.

Cơ chế rất đơn giản. Với mỗi cột hay bị trống, bạn thêm một cột mới chỉ chứa 0 hoặc 1: `1` nếu ô gốc vốn trống, `0` nếu ô gốc có dữ liệu. Sau đó bạn vẫn điền ô gốc như bình thường (ví dụ theo median - số ở giữa của nhóm), *nhưng* cái cột cờ kia giữ lại nguyên vẹn thông tin "chỗ này từng trống". Mô hình giờ có thể học cả hai thứ: giá trị ước lượng, *và* sự thật rằng nó là ước lượng.

<div class="viz">
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- LEFT: raw table with empty cells -->
  <text x="20" y="28" fill="#64748B" font-size="14" font-weight="700">BẢNG GỐC (có ô trống)</text>
  <text x="40" y="60" fill="#475569" font-size="13" font-weight="700">Khách</text>
  <text x="150" y="60" fill="#475569" font-size="13" font-weight="700">Nguồn</text>
  <!-- rows -->
  <rect x="30" y="72" width="90" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="44" y="94" fill="#CBD5E1" font-size="13">KH001</text>
  <rect x="130" y="72" width="110" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="146" y="94" fill="#CBD5E1" font-size="13">Facebook</text>
  <rect x="30" y="112" width="90" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="44" y="134" fill="#CBD5E1" font-size="13">KH002</text>
  <rect x="130" y="112" width="110" height="34" rx="5" fill="#3B1D1D" stroke="#F87171" stroke-width="1.5"/><text x="185" y="134" fill="#FCA5A5" font-size="16" font-weight="800" text-anchor="middle">- trống</text>
  <rect x="30" y="152" width="90" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="44" y="174" fill="#CBD5E1" font-size="13">KH003</text>
  <rect x="130" y="152" width="110" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="146" y="174" fill="#CBD5E1" font-size="13">Google</text>
  <rect x="30" y="192" width="90" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="44" y="214" fill="#CBD5E1" font-size="13">KH004</text>
  <rect x="130" y="192" width="110" height="34" rx="5" fill="#3B1D1D" stroke="#F87171" stroke-width="1.5"/><text x="185" y="214" fill="#FCA5A5" font-size="16" font-weight="800" text-anchor="middle">- trống</text>
  <!-- ARROW -->
  <path d="M270 150 L330 150" stroke="#22D3EE" stroke-width="3"/>
  <path d="M322 142 L334 150 L322 158 Z" fill="#22D3EE"/>
  <text x="300" y="135" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">thêm cờ</text>
  <!-- RIGHT: with flag column -->
  <text x="360" y="28" fill="#34D399" font-size="14" font-weight="700">SAU XỬ LÝ (giữ tín hiệu)</text>
  <text x="380" y="60" fill="#475569" font-size="13" font-weight="700">Nguồn (đã điền)</text>
  <text x="585" y="60" fill="#22D3EE" font-size="13" font-weight="700">đã_trống</text>
  <rect x="370" y="72" width="190" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="386" y="94" fill="#CBD5E1" font-size="13">Facebook</text>
  <rect x="575" y="72" width="80" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="615" y="94" fill="#94A3B8" font-size="14" font-weight="700" text-anchor="middle">0</text>
  <rect x="370" y="112" width="190" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="386" y="134" fill="#94A3B8" font-size="13" font-style="italic">Google (median)</text>
  <rect x="575" y="112" width="80" height="34" rx="5" fill="#16241F" stroke="#34D399" stroke-width="1.5"/><text x="615" y="134" fill="#34D399" font-size="14" font-weight="800" text-anchor="middle">1</text>
  <rect x="370" y="152" width="190" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="386" y="174" fill="#CBD5E1" font-size="13">Google</text>
  <rect x="575" y="152" width="80" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="615" y="174" fill="#94A3B8" font-size="14" font-weight="700" text-anchor="middle">0</text>
  <rect x="370" y="192" width="190" height="34" rx="5" fill="#0F172A" stroke="#1E293B"/><text x="386" y="214" fill="#94A3B8" font-size="13" font-style="italic">Google (median)</text>
  <rect x="575" y="192" width="80" height="34" rx="5" fill="#16241F" stroke="#34D399" stroke-width="1.5"/><text x="615" y="214" fill="#34D399" font-size="14" font-weight="800" text-anchor="middle">1</text>
  <text x="20" y="270" fill="#64748B" font-size="12.5">Ô trống không bị xoá đi - nó được "ghi âm" lại thành một cột cờ mà mô hình đọc được.</text>
  <text x="20" y="294" fill="#64748B" font-size="12.5">Giá trị gốc vẫn được điền để bảng đủ dữ liệu, nhưng tín hiệu "vốn trống" thì còn nguyên.</text>
</svg>
<div class="viz-caption">Bảng gốc có ô trống (đỏ) được giữ lại tín hiệu bằng một cột cờ "đã_trống" (xanh), thay vì bị lấp đi và quên mất.</div>
</div>

Một cảnh báo quan trọng về số 0. Đừng bao giờ để mô hình hiểu nhầm **0** với **"không biết"**. Nếu cột "số lần mua trước" để trống vì khách mới (chưa từng mua), thì 0 là *đúng* nghĩa. Nhưng nếu nó trống vì hệ thống không ghi nhận được, thì điền 0 là **bịa ra một sự thật**: bạn đang khẳng định khách mua đúng 0 lần, trong khi thực tế bạn không hề biết. Hai tình huống trống nhìn giống hệt nhau trên màn hình, nhưng mang ý nghĩa trái ngược - và chỉ một cột cờ mới phân biệt được chúng.

## Một ví dụ SME: khi cái cờ làm mô hình chính xác hơn

*Ví dụ minh hoạ.* Một shop thương mại điện tử muốn dự đoán khách nào sẽ chuyển đổi (chốt đơn) dựa trên hồ sơ. Cột "nguồn khách" - kênh đưa khách đến - trống ở 18% hồ sơ.

Cách làm theo phản xạ: điền tất cả ô trống thành 0 (hiểu ngầm là "không nguồn"). Mô hình học rằng nhóm "nguồn = 0" chuyển đổi trung bình. Nhưng thực tế, những khách không có nguồn lại là khách *vãng lai gõ thẳng tên shop vào trình duyệt* - một nhóm có ý định mua rất cao. Bằng cách trộn họ vào một con số 0 vô nghĩa, mô hình **làm sai** dự đoán cho chính nhóm đáng giá nhất.

Cách làm khôn: thêm một **feature (đặc trưng - một cột đầu vào để mô hình học)** tên `thiếu_nguồn` = 1 cho những hồ sơ đó. Lập tức mô hình phát hiện nhóm "thiếu nguồn" có tỷ lệ chuyển đổi cao bất thường, và độ chính xác nhích lên đáng kể - không phải vì thuật toán giỏi hơn, mà vì bạn *ngừng giấu một tín hiệu khỏi nó*. Đây cũng chính là tinh thần của việc [biến dữ liệu bán hàng thô thành tín hiệu hành động](/blog/du-lieu-ban/): giá trị không nằm ở chỗ có nhiều cột, mà ở chỗ mỗi cột nói đúng điều nó biết.

Để cột cờ này dùng được nhất quán cho mọi câu hỏi về sau, định nghĩa "thiếu nguồn nghĩa là gì" nên nằm ở [tầng định nghĩa nghiệp vụ dùng chung](/blog/semantic-layer/) - chứ không phải mỗi người tự xử một kiểu trong file riêng. Và khi bạn đã có cờ thiếu rồi, nó trở thành một lát cắt cực hữu ích để [phân khúc khách theo RFM](/blog/rfm-segmentation/): nhóm khách "trống nguồn" thường hành xử khác hẳn nhóm đến từ campaign.

## Cảnh báo cân bằng: không phải lúc nào trống cũng có nghĩa

Đừng đi quá xa theo hướng ngược lại. Không phải mọi ô trống đều là kho báu - đôi khi trống chỉ vì lỗi nhập liệu, và lúc đó nó đúng là rác cần dọn, không phải tín hiệu cần giữ.

Làm sao phân biệt? Vài cách kiểm nhanh:

- **So tỷ lệ chuyển đổi (hoặc kết quả bạn quan tâm) giữa nhóm trống và nhóm có dữ liệu.** Nếu hai nhóm khác nhau rõ rệt → ô trống có tín hiệu, hãy giữ cờ. Nếu y hệt nhau → nhiều khả năng là MCAR, lấp thoải mái.
- **Hỏi người vận hành: ô này trống vì quy trình hay vì sơ suất?** Một câu hỏi với bạn kế toán hay nhân viên kho thường rẻ và chính xác hơn mọi phép thống kê.
- **Đếm tỷ lệ trống.** Nếu một cột trống tới 95% thì dù có tín hiệu, nó cũng quá thưa để mô hình học gì hữu ích - cân nhắc bỏ cả cột.

Mục tiêu không phải là *tôn thờ* mọi ô trống, mà là **dừng lại đủ lâu để hỏi vì sao nó trống** trước khi xoá dấu vết của nó vĩnh viễn.

## Tóm lại

| Cách xử ô trống | Hệ quả |
|---|---|
| Điền đại 0 / trung bình rồi quên | Trộn lẫn "không biết" với "bằng 0", giấu tín hiệu khỏi mô hình |
| Xoá dòng cho gọn | Mất nguyên thông tin "vì sao trống" - thường là phần đắt nhất |
| Coi trống là tín hiệu: thêm cột cờ + điền có chủ đích | Giữ cả giá trị ước lượng lẫn sự thật "vốn trống" → mô hình chính xác hơn |

Lần tới khi bạn định kéo chuột điền đại một cột trống, hãy khựng lại một giây. Cái ô trống đó có thể đang cố nói với bạn điều gì đó về khách hàng mà không một ô đã-điền nào nói được. Câu hỏi không phải *"lấp nó bằng gì?"* - mà là *"vì sao nó trống, và làm sao để mô hình nghe được điều đó?"*

> **Mental model:** ô trống không phải lỗ hổng cần vá - nó là một nhân chứng chưa khai. Trước khi bịt miệng nó bằng một con số, hãy hỏi nó vì sao im lặng.

---

*Muốn xem dữ liệu của bạn - cả những ô trống - biến thành câu trả lời đáng tin? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
