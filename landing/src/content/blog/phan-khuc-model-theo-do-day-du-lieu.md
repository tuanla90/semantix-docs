---
title: "Chia mô hình theo độ đầy của dữ liệu: vì sao một model bị 'kéo xuống' bởi nhóm thiếu data"
code: "pt-029"
description: "Bạn gom hết khách vào một model dự đoán. Accuracy 74%, không nhúc nhích. Tách theo độ đầy hồ sơ — vọt lên 88% và 91%. Một model cho tất cả thường tệ hơn nhiều model nhỏ."
pubDate: 2025-10-09
category: "Phân Tích Dữ Liệu"
readTime: 10
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/phan-khuc-model-theo-do-day-du-lieu.svg"
coverAlt: "Một khối dữ liệu gộp tách thành các nhóm theo độ đầy, accuracy tăng dần"
---

Bạn có một danh sách 10.000 khách hàng và muốn chấm điểm "ai dễ mua lại nhất". Bạn nạp tất cả vào một **model** (mô hình — một công thức học từ dữ liệu cũ để dự đoán điều chưa biết), bấm train, và nhận về **accuracy** (độ chính xác — tỷ lệ dự đoán đúng) 74%. Không tệ. Nhưng cũng không đủ tốt để dám gọi điện cho ai.

Phản xạ tiếp theo của hầu hết mọi người: *"Chắc cần thêm dữ liệu, hoặc một thuật toán xịn hơn."* Sai. Trong rất nhiều trường hợp, vấn đề không nằm ở lượng data hay thuật toán — mà ở chỗ bạn đã **trộn chung hai loại khách hàng có hành vi hoàn toàn khác nhau** vào một nồi. Tách họ ra theo *độ đầy của hồ sơ*, train riêng từng nhóm, và con số 74% có thể tách thành 88% và 91%.

Đây là nghịch lý ít người chịu tin: **một model "cho tất cả" thường kém hơn ba model nhỏ — không phải vì model yếu, mà vì nhóm thiếu data đang âm thầm kéo cả model xuống.**

## Vì sao "một model cho tất cả" lại là một cái bẫy

Hãy nhìn vào dữ liệu khách hàng thật của một SME đa kênh. Một số khách có hồ sơ **đầy đủ**: email, số điện thoại, nguồn đến (Shopee/TikTok Shop), lịch sử 12 đơn, ngày sinh, địa chỉ. Một số khác chỉ có *đúng một dòng*: số điện thoại, và một đơn hàng duy nhất.

Mỗi cột có giá trị là một **feature** (cột đặc trưng — một mẩu thông tin model dùng để đoán). Khách đầy đủ cho model 8–10 feature để học. Khách tối thiểu chỉ cho 1–2. Đây không phải "cùng một bài toán với ít dữ liệu hơn" — nó là **hai bài toán khác nhau**, vì hai nhóm này *hành xử* khác nhau và *được mô tả* khác nhau.

Khi ép cả hai vào một model, bạn buộc phải làm một việc tai hại: **impute** (điền khuyết — đoán giá trị cho những ô trống). Khách không có lịch sử mua? Điền bằng giá trị trung bình. Không có nguồn đến? Gán "unknown". Mỗi lần impute là một lần bạn **bịa ra dữ liệu không có thật** và đưa nó cho model như thể là sự thật.

> Quy tắc vàng: mỗi ô bạn impute là một lời nói dối nhỏ bạn dạy cho model. Vài lời nói dối thì vô hại. Một nửa bảng toàn lời nói dối thì model học cách tin vào điều không có thật.

Kết quả là model **học trung bình hoá**: nó tìm một bộ quy luật "tàm tạm đúng cho cả hai nhóm", nên *không thật sự giỏi với nhóm nào*. Với khách đầy đủ, nó bỏ phí 8 feature giàu thông tin vì phải hạ mình xuống mẫu số chung. Với khách tối thiểu, nó dựa vào những giá trị impute bịa ra nên đoán như tung đồng xu. Nhóm thiếu data trở thành **một lực kéo** — nó không chỉ tự dự đoán kém, nó còn làm hỏng cả những quy luật mà nhóm đầy đủ lẽ ra đã học được sạch sẽ.

## Phân khúc theo độ đầy: tách bài toán trước khi giải

Lời giải không phải là một thuật toán phức tạp hơn. Nó là một động tác *kiến trúc* đơn giản: **segment** (phân khúc — chia tập dữ liệu thành các nhóm đồng nhất) theo **số cột có giá trị** của mỗi bản ghi, rồi train một model riêng cho mỗi nhóm.

Ví dụ chia thành ba nhóm:

- **Hồ sơ đầy đủ** (≥ 7/10 cột có data): có lịch sử mua, nguồn, email, hành vi → train model giàu feature.
- **Hồ sơ trung bình** (3–6 cột): đủ để dự đoán có ý nghĩa, nhưng cần model gọn hơn.
- **Hồ sơ tối thiểu** (1–2 cột): gần như chỉ có SĐT + 1 đơn → ở đây model phức tạp là vô ích; một **luật** (rule — quy tắc if-then đơn giản) thường tốt hơn cả.

Điều kỳ diệu xảy ra vì mỗi model giờ chỉ phải giải *một* bài toán đồng nhất. Model "đầy đủ" không còn phải impute lung tung — nó được dùng trọn vẹn 8–10 feature thật. Model "tối thiểu" không còn bị ảo tưởng rằng nó có lịch sử mua; nó biết rõ mình chỉ có 2 mẩu thông tin và tối ưu đúng trong giới hạn đó.

<div class="viz">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- LEFT: one merged model -->
  <text x="20" y="28" fill="#475569" font-size="14" font-weight="700">1 MODEL GỘP</text>
  <rect x="20" y="44" width="180" height="120" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="110" y="92" fill="#94a3b8" font-size="13" text-anchor="middle">Mọi hồ sơ</text>
  <text x="110" y="114" fill="#94a3b8" font-size="13" text-anchor="middle">đầy + thiếu</text>
  <text x="110" y="136" fill="#64748b" font-size="12" text-anchor="middle">trộn chung</text>
  <path d="M210 104 L250 104" stroke="#475569" stroke-width="2"/>
  <path d="M244 98 L254 104 L244 110 Z" fill="#475569"/>
  <rect x="256" y="74" width="60" height="60" rx="8" fill="#7f1d1d" stroke="#f87171" stroke-width="1.5"/>
  <text x="286" y="100" fill="#fca5a5" font-size="13" font-weight="700" text-anchor="middle">74%</text>
  <text x="286" y="118" fill="#fca5a5" font-size="11" text-anchor="middle">accuracy</text>
  <text x="286" y="156" fill="#f87171" font-size="11" text-anchor="middle">tầm tầm</text>
  <!-- divider -->
  <line x1="340" y1="20" x2="340" y2="340" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
  <!-- RIGHT: split by completeness -->
  <text x="364" y="28" fill="#22d3ee" font-size="14" font-weight="700">3 MODEL THEO ĐỘ ĐẦY</text>
  <rect x="364" y="44" width="150" height="84" rx="10" fill="#0f172a" stroke="#164e45" stroke-width="1.5"/>
  <text x="376" y="68" fill="#cbd5e1" font-size="12">Hồ sơ đầy đủ</text>
  <text x="376" y="88" fill="#64748b" font-size="11">≥7 cột · giàu feature</text>
  <rect x="376" y="100" width="100" height="14" rx="4" fill="#1e293b"/>
  <rect x="376" y="100" width="91" height="14" rx="4" fill="#22c55e"/>
  <text x="528" y="92" fill="#4ade80" font-size="15" font-weight="700">91%</text>
  <rect x="364" y="138" width="150" height="84" rx="10" fill="#0f172a" stroke="#164e45" stroke-width="1.5"/>
  <text x="376" y="162" fill="#cbd5e1" font-size="12">Hồ sơ trung bình</text>
  <text x="376" y="182" fill="#64748b" font-size="11">3–6 cột · model gọn</text>
  <rect x="376" y="194" width="100" height="14" rx="4" fill="#1e293b"/>
  <rect x="376" y="194" width="88" height="14" rx="4" fill="#22c55e"/>
  <text x="528" y="186" fill="#4ade80" font-size="15" font-weight="700">88%</text>
  <rect x="364" y="232" width="150" height="84" rx="10" fill="#0f172a" stroke="#164e45" stroke-width="1.5"/>
  <text x="376" y="256" fill="#cbd5e1" font-size="12">Hồ sơ tối thiểu</text>
  <text x="376" y="276" fill="#64748b" font-size="11">1–2 cột · dùng luật</text>
  <rect x="376" y="288" width="100" height="14" rx="4" fill="#1e293b"/>
  <rect x="376" y="288" width="79" height="14" rx="4" fill="#34d399"/>
  <text x="528" y="280" fill="#4ade80" font-size="15" font-weight="700">79%</text>
  <text x="364" y="344" fill="#64748b" font-size="11">Mỗi nhóm một bài toán đồng nhất → không phải impute bừa</text>
</svg>
<div class="viz-caption">Một model gộp phải trung bình hoá cho cả nhóm đầy và nhóm thiếu nên chỉ đạt 74%. Tách theo độ đầy, mỗi model giải một bài toán sạch và đạt độ chính xác cao hơn hẳn. (Các con số là ví dụ minh hoạ.)</div>
</div>

*Ví dụ minh hoạ (không phải số thật):* một bài toán chấm điểm mua lại đi từ **accuracy chung 74%** sang **91% cho nhóm đầy đủ** và **88% cho nhóm trung bình** sau khi tách. Ngay cả nhóm tối thiểu — vốn là nhóm "khó" nhất — cũng lên ~79% nhờ một luật đơn giản thay vì một model phức tạp đoán bừa trên dữ liệu impute.

## Vì sao điều này lại đúng về mặt kỹ thuật

Có ba cơ chế đứng sau hiệu ứng này, và hiểu chúng giúp bạn biết *khi nào* nên tách:

**1. Impute là nguồn nhiễu, không phải thông tin.** Khi bạn điền 60% một cột bằng giá trị trung bình, model nhìn thấy một cột "có vẻ đầy" nhưng thực ra hơn nửa là bịa. Nó học mối quan hệ giả giữa giá trị bịa đó và kết quả — đúng định nghĩa của **overfit** (học vẹt — model bám vào nhiễu trong dữ liệu cũ thay vì quy luật thật, nên đoán sai trên dữ liệu mới). Tách nhóm ra, bạn không cần impute cột không tồn tại nữa.

**2. Hai nhóm có quan hệ nhân quả khác nhau.** Với khách đầy đủ, "tần suất mua trong 90 ngày" có thể là feature mạnh nhất. Với khách tối thiểu, feature đó *không tồn tại* — quy luật dự đoán phải dựa trên thứ khác hẳn (ví dụ: giá trị đơn đầu tiên). Một model duy nhất không thể giữ hai bộ quy luật mâu thuẫn nhau; nó buộc phải chọn một thoả hiệp tệ cho cả hai.

**3. Khả diễn giải tăng.** Khi tách, bạn có thể nói rõ với sếp: *"Với khách đủ thông tin, chúng ta đoán đúng 91% và đây là 3 yếu tố quyết định."* Một model gộp chỉ cho bạn một con số 74% mờ mịt không giải thích nổi nó giỏi với ai và dở với ai.

| Tiêu chí | Một model gộp | Chia theo độ đầy |
|---|---|---|
| Accuracy (minh hoạ) | 74% cho tất cả | 91% / 88% / 79% từng nhóm |
| Xử lý cột khuyết | Impute bừa → nhiễu | Không cần impute cột không có |
| Khả diễn giải | Một con số mờ, khó giải thích | Rõ từng nhóm giỏi/dở ở đâu |
| Bảo trì | 1 model nhưng khó gỡ lỗi | Nhiều model, mỗi cái đơn giản hơn |
| Rủi ro overfit | Cao (học trên data bịa) | Thấp hơn trong mỗi nhóm |

Đây cũng là lý do tại sao chất lượng đầu vào quan trọng hơn người ta tưởng — phần lớn thời gian phân tích là dọn dẹp chứ không phải mô hình hoá, như đã nói trong bài [Dữ liệu bẩn: vì sao 80% thời gian phân tích là dọn dẹp](/blog/du-lieu-ban/). Độ đầy của hồ sơ chính là một chiều của "sạch".

## Cảnh báo: đừng chia quá nhỏ

Tách nhóm là con dao hai lưỡi. **Chia càng nhiều, mỗi nhóm càng ít mẫu để học** — và một model học từ 80 bản ghi sẽ overfit còn tệ hơn cả model gộp. Đây là chỗ phần lớn người mới đi quá đà: họ tách thành 9 nhóm theo combo cột, rồi mỗi nhóm chỉ còn vài chục dòng và mọi con số đều vô nghĩa.

Vài nguyên tắc quyết định ngưỡng chia:

- **Đủ mẫu trước đã.** Một nhóm nên có ít nhất vài trăm bản ghi (lý tưởng là 500+) thì model mới đáng tin. Nhóm quá nhỏ thì *gộp lại* hoặc thay model bằng luật.
- **Chia theo ngưỡng có ý nghĩa nghiệp vụ, không theo từng cột.** "Đầy đủ / trung bình / tối thiểu" tốt hơn "có-email × có-nguồn × có-lịch-sử" (8 combo). Tìm 2–3 ngưỡng nơi *hành vi thật sự đổi*, không phải mọi tổ hợp toán học.
- **Nhìn vào biểu đồ phân bố độ đầy.** Thường có một vài "cụm" tự nhiên — đa số khách rơi vào 2–3 mức độ đầy. Cắt ngay tại các khe trũng giữa các cụm đó.
- **Kiểm chứng bằng accuracy từng nhóm.** Nếu tách thêm một nhóm mà accuracy của nó *thấp hơn* khi gộp, thì đừng tách — bạn đang chia quá mịn.

> Quy tắc vàng: tách đến khi mỗi nhóm vẫn còn đủ mẫu để tự đứng vững — không tách thêm một bước nào nữa.

## Liên hệ thực tế: hồ sơ khách hàng SME

Bài toán này không hề trừu tượng. Mọi SME bán đa kênh đều có một bảng khách hàng *lổ chổ*: người đăng ký từ TikTok Shop có thể chỉ để lại SĐT; người mua trên website để lại đầy đủ email, địa chỉ, nguồn quảng cáo; người mua tại cửa hàng có khi chỉ có tên. Chấm điểm hay dự đoán **chung cho cả bảng này gần như chắc chắn sai** — vì bạn đang trộn một người bạn biết rất rõ với một người bạn gần như không biết gì.

Đây cũng là họ hàng gần của tư duy phân khúc trong [RFM Segmentation: phân khúc khách để bán đúng người](/blog/rfm-segmentation/): bạn không đối xử với mọi khách như nhau, và bạn cũng không nên *dự đoán* về mọi khách bằng cùng một công thức. Khi định nghĩa "độ đầy hồ sơ" được khai báo một lần ở [Semantic Layer](/blog/semantic-layer/) (tầng định nghĩa nghiệp vụ dùng chung), mọi báo cáo và model sau này đều phân khúc nhất quán — không ai phải đoán "đầy đủ" nghĩa là mấy cột.

> **Mental model:** Đừng hỏi *"Làm sao để một model giỏi với mọi khách hàng?"* — đó là câu hỏi sai. Hãy hỏi *"Tôi đang trộn mấy loại khách hàng khác nhau vào một nồi?"* — rồi tách họ ra trước khi train. Một model giỏi với một nhóm đồng nhất luôn đánh bại một model tàm tạm với một mớ hỗn độn.

---

*Muốn khai báo "độ đầy hồ sơ" một lần trong Semantic Layer rồi phân khúc khách nhất quán trong mọi báo cáo — hỏi bằng tiếng Việt? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
