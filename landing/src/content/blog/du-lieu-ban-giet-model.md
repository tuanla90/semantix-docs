---
title: "Dữ liệu bẩn giết mô hình: đừng vội đổi model, hãy dọn data"
code: "pt-027"
description: "Đổi sang model xịn hơn, tinh chỉnh đủ kiểu - số vẫn sai. Vấn đề không ở model. Nó nằm ở data bẩn bạn đút vào."
pubDate: 2025-02-17
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/du-lieu-ban-giet-model.svg"
coverAlt: "Dữ liệu bẩn đưa vào model cho ra số sai, đối lại dữ liệu sạch giúp accuracy tăng"
---

Đội của bạn xây một model (mô hình - chương trình học từ dữ liệu cũ để dự đoán dữ liệu mới) dự báo khách nào sắp rời bỏ. Lúc test trên máy, **accuracy (độ chính xác - tỷ lệ dự đoán đúng) lên tới 94%**. Cả phòng ăn mừng. Rồi đem ra chạy thật một tháng: nó đoán trật gần một nửa.

Phản xạ đầu tiên gần như ai cũng giống nhau: *"Chắc model còn yếu. Đổi sang thuật toán mạnh hơn, tinh chỉnh lại tham số là xong."* Bạn thay XGBoost bằng một mạng neural to hơn, chỉnh hyperparameter (siêu tham số - các nút vặn cấu hình của model) suốt hai tuần. Số nhích lên vài phần trăm rồi đứng im. Vẫn sai.

Đây là sự thật ngược đời ít người chịu tin: **trong phần lớn trường hợp, model không phải là vấn đề - data mới là.** Và mọi giờ bạn đổ vào việc đổi model là giờ đổ vào sai chỗ.

## "Garbage in, garbage out" - vì sao model không cứu nổi data bẩn

Có một câu cũ trong giới kỹ thuật, gắn với máy tính từ thập niên 1950: **"garbage in, garbage out"** - rác vào, rác ra. Model học bằng cách tìm quy luật *trong chính dữ liệu bạn đưa cho nó*. Nếu dữ liệu đó sai, model học rất chăm chỉ - học thuộc cái sai.

Bài trước của chúng tôi, [Dữ liệu bẩn: vì sao 80% thời gian "phân tích" thật ra là dọn rác](/blog/du-lieu-ban/), nói về chuyện data bẩn ngốn *thời gian* của bạn. Bài này đi một góc khác và đáng sợ hơn: data bẩn ngốn *độ chính xác* của model - một cách âm thầm, không báo lỗi.

Hãy hình dung model như một học sinh học từ bộ đề cũ. Nếu đáp án trong sách giải bị in sai, em đó càng ôn kỹ càng trả lời sai trong kỳ thi thật - vì em học đúng theo cái sai được dạy. Đổi sang một học sinh thông minh hơn (model mạnh hơn) không cứu được gì, chừng nào sách giải vẫn sai. Phải sửa sách trước.

Dưới đây là năm kiểu data bẩn tấn công thẳng vào độ chính xác của model - và vì sao đổi model không chạm được tới chúng.

## Kiểu 1 - Nhãn sai và ngoại lệ rác kéo lệch việc học

Model học có giám sát cần **nhãn (label - đáp án đúng gắn cho mỗi dòng dữ liệu)** để bắt chước. *Ví dụ minh hoạ:* trong bộ dữ liệu "khách đã rời bỏ", có 8% khách bị gắn nhãn nhầm - họ vẫn đang mua nhưng bị đánh dấu là đã đi vì một lần export lỗi. Model ngoan ngoãn học rằng "khách như thế này là khách rời" - và mang luôn cái nhầm đó vào dự đoán thật.

Ngoại lệ rác (*outlier* do nhập sai) còn kéo mạnh hơn. Một đơn hàng gõ nhầm thành `4.200.000.000` đồng thay vì `4.200.000` sẽ một mình bẻ cong đường học của model, vì nó cố chiều theo điểm dị thường đó. Đổi model không xoá được điểm sai - nó chỉ đổi cách *cái sai đó được học*.

## Kiểu 2 - Rò rỉ dữ liệu: accuracy ảo cao lúc train, sập lúc thật

Đây là kiểu nguy hiểm nhất, vì nó *làm con số đẹp lên* - đúng cái bẫy của câu chuyện mở đầu. **Data leakage (rò rỉ dữ liệu - model vô tình "nhìn thấy" đáp án lúc học)** xảy ra khi một feature (đặc trưng - một cột đầu vào model dùng để dự đoán) chứa thông tin mà ở thực tế bạn *chưa thể có* tại thời điểm dự đoán.

*Ví dụ minh hoạ:* bạn dự báo khách sắp rời bỏ, và vô tình để lọt cột `ngày_hủy_dịch_vụ` vào tập feature. Model lập tức đạt 94% - vì nó chỉ việc đọc ngày hủy để "đoán" khách đã hủy. Tài tình mà vô dụng: lúc dự đoán thật, khách chưa hủy nên cột đó trống, và model mất hết phép màu. Con số 94% là **accuracy ảo**, sinh ra từ một cột rò rỉ chứ không từ năng lực thật.

> Quy tắc vàng: một model nhảy vọt lên gần như hoàn hảo lúc train thường không phải tin vui - nó là dấu hiệu data leakage cho tới khi bạn chứng minh được điều ngược lại.

Không model nào trên đời tự sửa được leakage. Bạn phải dọn nó ở tầng data: loại các feature "tương lai", tách train/test theo đúng mốc thời gian.

## Kiểu 3 - Trùng lặp khiến model "học thuộc" thay vì học hiểu

Khi cùng một bản ghi xuất hiện nhiều lần, model gặp nó liên tục và *ghi nhớ* thay vì rút ra quy luật chung - đây chính là overfit (quá khớp - model thuộc lòng dữ liệu cũ, kém khi gặp dữ liệu mới). *Ví dụ minh hoạ:* 1.200 dòng bị nhân đôi do gộp hai file export trùng nhau. Nếu các bản trùng đó rơi vào cả tập train lẫn tập test, model "đoán đúng" những dòng nó đã thấy y hệt - accuracy lúc test cao giả tạo, rồi rơi tự do trên khách mới thật sự.

Đổi sang model phức tạp hơn ở đây *làm tình hình tệ hơn*: model càng nhiều tham số càng dễ học thuộc đám trùng lặp. Cách chữa duy nhất là khử trùng ở tầng data.

## Kiểu 4 - Đơn vị và định dạng lẫn lộn phá nát feature

Model không hiểu ngữ cảnh; nó chỉ thấy con số. *Ví dụ minh hoạ:* cột doanh thu trộn `4,2 tỷ` (dấu phẩy kiểu Việt là thập phân), `4.200.000.000`, và vài dòng lỡ nhập đơn vị nghìn đồng. Với mắt người, ai cũng hiểu. Với model, đây là ba thang đo khác nhau dồn vào một feature - và nó học ra một quy luật vô nghĩa.

Ngày tháng cũng vậy. Trộn `03/04/2026` kiểu Việt với kiểu Mỹ khiến một feature "tháng mua hàng" lệch hẳn, kéo mọi dự đoán theo mùa vụ (nghĩ tới cao điểm Tết) đi chệch. Feature bẩn thì model dù mạnh đến đâu cũng chỉ học được cái méo. Đây là cùng họ vấn đề mà [Text-to-SQL vẫn trả số sai dù SQL đúng cú pháp](/blog/llm-bia-sql/) đã chỉ ra: máy tính trung thực với dữ liệu bẩn đến mức nguy hiểm.

## Kiểu 5 - Phân bố lệch và nhãn mất cân bằng

*Ví dụ minh hoạ:* chỉ 3% khách thực sự rời bỏ. Một model lười có thể đoán "không ai rời bỏ cả" và vẫn đạt **97% accuracy** - đúng 97 lần trên 100, nhưng *bỏ sót sạch* nhóm khách bạn cần cứu. Con số accuracy đẹp lóa mắt mà rỗng tuếch. Đây không phải lỗi model; đó là phân bố nhãn mất cân bằng cần xử lý ở tầng data (lấy mẫu lại, đặt trọng số, hoặc đổi sang đo bằng precision/recall thay vì accuracy thuần).

## Cùng một model: dọn data thắng đổi model

Đây là điểm cốt lõi của cả bài. Giữ *nguyên* thuật toán, chỉ thay đổi việc bạn nuôi nó bằng data sạch hay bẩn:

<div class="viz">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="20" y="30" fill="#0F172A" font-size="17" font-weight="800">Cùng một model - cái gì tăng accuracy nhiều hơn?</text>
  <text x="20" y="52" fill="#64748B" font-size="12">Số minh hoạ, không phải benchmark thật</text>
  <!-- baseline line -->
  <line x1="60" y1="270" x2="660" y2="270" stroke="#CBD5E1" stroke-width="1.5"/>
  <text x="20" y="274" fill="#64748B" font-size="12">71%</text>
  <line x1="60" y1="120" x2="660" y2="120" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="20" y="124" fill="#94A3B8" font-size="11">90%</text>
  <!-- bar 1: baseline -->
  <rect x="110" y="200" width="110" height="70" rx="6" fill="#94A3B8"/>
  <text x="165" y="192" fill="#475569" font-size="15" font-weight="700" text-anchor="middle">71%</text>
  <text x="165" y="292" fill="#475569" font-size="12" text-anchor="middle">Data bẩn</text>
  <text x="165" y="308" fill="#94A3B8" font-size="11" text-anchor="middle">(model gốc)</text>
  <!-- bar 2: change model -->
  <rect x="290" y="180" width="110" height="90" rx="6" fill="#CBD5E1"/>
  <text x="345" y="172" fill="#475569" font-size="15" font-weight="700" text-anchor="middle">74%</text>
  <text x="345" y="292" fill="#475569" font-size="12" text-anchor="middle">Đổi model xịn</text>
  <text x="345" y="308" fill="#94A3B8" font-size="11" text-anchor="middle">(+3, vẫn data bẩn)</text>
  <!-- bar 3: clean data -->
  <rect x="470" y="100" width="110" height="170" rx="6" fill="#22C55E"/>
  <text x="525" y="92" fill="#15803D" font-size="15" font-weight="800" text-anchor="middle">89%</text>
  <text x="525" y="292" fill="#15803D" font-size="12" font-weight="700" text-anchor="middle">Dọn data</text>
  <text x="525" y="308" fill="#16A34A" font-size="11" text-anchor="middle">(+18, model gốc)</text>
  <text x="470" y="58" fill="#16A34A" font-size="13" font-weight="700">↑ +18 điểm chỉ nhờ dọn data</text>
</svg>
<div class="viz-caption">Cùng một thuật toán: đổi sang model phức tạp hơn nhích +3 điểm, còn dọn data sạch kéo accuracy từ 71% lên 89%. Các con số là minh hoạ để so độ lớn, không phải kết quả đo thật.</div>
</div>

Bảng dưới gom lại năm kiểu bẩn, chúng đánh vào đâu, và vì sao đổi model vô ích:

| Kiểu data bẩn | Hại gì cho model | Đổi model có cứu được? | Cách dọn ở tầng data |
|---|---|---|---|
| Nhãn sai / outlier rác | Học lệch theo cái sai | Không - vẫn học cùng data sai | Sửa nhãn, lọc/giới hạn ngoại lệ |
| Data leakage | Accuracy ảo cao, sập lúc thật | Không - cột rò rỉ vẫn còn | Bỏ feature "tương lai", tách theo thời gian |
| Trùng lặp | Học thuộc, overfit | Tệ hơn - model to nhớ kỹ hơn | Khử trùng trước khi tách train/test |
| Đơn vị / định dạng lẫn | Feature vô nghĩa | Không - đầu vào vẫn méo | Chuẩn hoá đơn vị, ngày tháng một định dạng |
| Nhãn mất cân bằng | Accuracy đẹp mà rỗng | Không - đo sai chỉ số | Lấy mẫu lại, đổi sang precision/recall |

Để ý điểm chung: cột "Đổi model có cứu được?" gần như toàn **Không**. Vì model phức tạp hơn chỉ học *kỹ hơn* - kể cả học kỹ hơn cái sai.

## Đúng từ gốc trong Semantix

Nói thẳng để khỏi hiểu lầm: Semantix **không phải** một cái máy "đổi giúp bạn sang model to hơn". Cách tiếp cận đi ngược lại - làm cho dữ liệu *đúng từ gốc* trước khi nó tới bất kỳ model hay AI nào:

1. **Kết nối nguồn** - Shopee, TikTok Shop, KiotViet, Google Sheets - rồi [gộp (union) + làm sạch bằng bảng ảo ngay lúc hỏi](/blog/bang-ao-gop-du-lieu/), không copy dữ liệu về kho nào nên số luôn ở nguồn và mới, hết cảnh export trùng và copy-paste tay sinh ra dòng lặp.
2. **Chuẩn hoá và định nghĩa một lần** trong [Semantic Layer (tầng định nghĩa nghiệp vụ dùng chung)](/blog/semantic-layer/): đơn vị tiền tệ, định dạng ngày, và mỗi chỉ số có *một* định nghĩa duy nhất - nên feature đưa vào model không còn lẫn thang đo.
3. **Validate trước khi dùng** - đối chiếu giá trị với schema, bắt outlier và trùng lặp *trước khi* chúng kịp kéo lệch việc học.

Nói cách khác, cái thông minh không nằm ở chỗ chọn được model oách nhất, mà ở chỗ model được nuôi *trên data đã sạch và đã có định nghĩa rõ*. Sạch từ gốc thì ngay cả một model đơn giản cũng vượt một model phức tạp ăn data bẩn.

## Tóm lại

| Phản xạ "đổi model" | Cách đúng "dọn data" |
|---|---|
| Đổ tuần lễ chỉnh hyperparameter | Đổ công sức sửa nhãn, khử trùng |
| Tin con số 94% lúc train | Nghi ngờ ngay leakage |
| Model càng to càng tốt | Data càng sạch càng tốt |
| Accuracy cao là yên tâm | Hỏi accuracy *trên nhóm nào* |
| Cứu chữa ở tầng thuật toán | Cứu chữa ở tầng nguồn |

> Mental model: model chỉ là người nấu. Đổi đầu bếp ba sao về mà nguyên liệu vẫn ôi thì món vẫn hỏng. Muốn món ngon, dọn cái chợ trước - đừng đổi bếp.

---

*Muốn model và AI của bạn đứng trên data sạch từ gốc thay vì rác đẹp? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
