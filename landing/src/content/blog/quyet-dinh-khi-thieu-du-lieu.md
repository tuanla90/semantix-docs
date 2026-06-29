---
title: "Quyết định khi dữ liệu chưa đủ: quy tắc 70% và chi phí của sự chờ"
code: "kt-023"
series: "tu-duy-du-lieu"
seriesOrder: 9
description: "Bạn đợi đủ số mới quyết. Nhưng chờ dữ liệu hoàn hảo cũng là một quyết định - thường là quyết định tệ nhất. Phần cuối của series: quyết khi mới có 70%."
pubDate: 2025-01-03
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/quyet-dinh-khi-thieu-du-lieu.svg"
coverAlt: "Thanh tiến độ dữ liệu dừng ở 70% bên nút Quyết định, đối lập với một vòng xoáy chờ mãi không quyết"
---

<div class="series-nav">
  <div class="series-nav-title">🧠 Series Tư duy dựa trên dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/tu-duy-du-lieu-la-gi/">Phần 1 - Tư duy dựa trên dữ liệu là gì</a></li>
    <li><a href="/blog/bat-dau-tu-cau-hoi/">Phần 2 - Bắt đầu từ câu hỏi, không từ dữ liệu</a></li>
    <li><a href="/blog/thien-kien-trong-doc-so/">Phần 3 - Những thiên kiến giết chết quyết định</a></li>
    <li><a href="/blog/tuong-quan-nhan-qua/">Phần 4 - Tương quan không phải nhân quả</a></li>
    <li><a href="/blog/trung-binh-noi-doi/">Phần 5 - Khi con số đánh lừa: trung bình</a></li>
    <li><a href="/blog/leading-lagging-indicator/">Phần 6 - Từ số đến quyết định: leading vs lagging</a></li>
    <li><a href="/blog/tin-hieu-vs-nhieu/">Phần 7 - Tín hiệu vs nhiễu</a></li>
    <li><a href="/blog/goodhart-guardrail-metrics/">Phần 8 - Goodhart &amp; guardrail metrics</a></li>
    <li class="current">Phần 9 - Quyết định khi dữ liệu chưa đủ</li>
  </ol>
</div>

Một chủ chuỗi cà phê ở TP.HCM phải chọn mặt bằng mới trước thứ Sáu - chủ nhà đang có người khác hỏi. Anh muốn "đủ số liệu mới quyết": lưu lượng người qua lại, sức mua khu vực, doanh thu dự phóng 12 tháng. Anh thuê khảo sát, đợi báo cáo. Thứ Sáu trôi qua. Mặt bằng về tay đối thủ. Anh không hề ra một quyết định sai - anh chỉ *không quyết*, và để hoàn cảnh quyết thay.

Đây là sự thật ngược đời khép lại chuỗi bài này: **chờ dữ liệu hoàn hảo cũng là một quyết định - và thường là quyết định tệ nhất.** Suốt tám phần trước, chúng ta học cách bắt dữ liệu phục vụ quyết định. Phần cuối nói về tình huống ngược lại, cái khó nhất: khi dữ liệu *không bao giờ* đủ, mà bạn vẫn phải quyết hôm nay.

## Hai cái cực, cùng một cái chết

Phản xạ đầu tiên của bạn có thể là "vậy thì cứ quyết đại cho nhanh". Khoan. Có *hai* cái cực đều giết doanh nghiệp, ở hai đầu đối nhau:

- **Quyết bừa.** Mới nghe một khách phàn nàn đã đổi cả thực đơn. Thấy đối thủ giảm giá là giảm theo trong đêm. Đây là quyết định không có *bất kỳ* dữ liệu nào đỡ lưng - chính là thứ chuỗi bài này tồn tại để chống lại.
- **Tê liệt phân tích.** Đây là *analysis paralysis* (tê liệt phân tích - trạng thái phân tích mãi mà không bao giờ chốt được quyết định). Bạn xin thêm một báo cáo, rồi một báo cáo nữa, rồi "để tuần sau họp lại cho chắc". Số liệu chất thành núi. Quyết định thì không bao giờ ra.

Cái bẫy: tê liệt phân tích *cảm giác* như đang làm việc cẩn thận. Nó đội lốt sự chuyên nghiệp. Nhưng kết quả của nó - bỏ lỡ mặt bằng, chậm tung sản phẩm, để đối thủ đi trước - thường tốn kém *hơn* một quyết định sai mà bạn sửa được sớm. Cẩn trọng quá đà không phải là an toàn; nó là rủi ro được nguỵ trang.

## Cánh cửa một chiều vs hai chiều

Cách thoát khỏi cả hai cực không phải là "quyết nhanh hơn" hay "quyết chậm hơn", mà là **hỏi đúng loại quyết định trước đã.** Có một khung tư duy gọn: phân biệt *one-way door* (cửa một chiều - quyết định khó hoặc không thể đảo ngược) và *two-way door* (cửa hai chiều - quyết định đảo ngược được dễ dàng).

Hình dung đúng nghĩa đen: cửa một chiều, bước qua là khoá lại sau lưng, không quay lại được. Cửa hai chiều, đẩy ra thấy không ổn thì bước lại vào. Phần lớn quyết định kinh doanh là cửa hai chiều - nhưng ta thường đối xử với chúng như cửa một chiều, và đó là gốc của tê liệt.

| | Cửa một chiều | Cửa hai chiều |
|---|---|---|
| Đảo ngược? | Khó hoặc không thể | Dễ, chi phí thấp |
| Ví dụ SME | Ký thuê mặt bằng 5 năm, sa thải đội ngũ, đổi nhà cung cấp độc quyền | Thử một mẫu mã mới, đổi giá một SKU, chạy một chiến dịch quảng cáo nhỏ |
| Cần bao nhiêu dữ liệu | Nhiều - đáng để chờ và cẩn trọng | Vừa đủ - quyết nhanh, đo, sửa |
| Sai thì sao | Đau, lâu gỡ | Học được một bài, đổi lại trong tuần |
| Lỗi thường gặp | Quyết bừa vì sốt ruột | Tê liệt vì sợ sai |

Quy tắc rút ra: **với cửa hai chiều, tốc độ quan trọng hơn sự hoàn hảo.** Bạn không cần chắc chắn - bạn cần *thử rồi sửa*. Dồn sự cẩn trọng (và dữ liệu) vào những cánh cửa một chiều thật sự, là số ít. Còn lại, quyết nhanh và để thực tế dạy bạn.

## Quy tắc 70%: đủ để quyết, chưa cần để chắc

Vậy "vừa đủ dữ liệu" là bao nhiêu? Một quy tắc ngón tay cái đáng tin: **quyết khi bạn nắm được khoảng 70% thông tin mình *muốn* có.** Dưới ngưỡng đó, bạn đang quyết bừa. Nhưng cố chờ tới 90–100% thì gần như luôn quá muộn - vì hai lý do.

Thứ nhất, 30% thông tin cuối cùng tốn nhiều thời gian *nhất* nhưng thay đổi quyết định *ít nhất* - nó thường chỉ xác nhận điều bạn đã biết ở mốc 70% (đây chính là lúc *thiên kiến xác nhận* ở [Phần 3](/blog/thien-kien-trong-doc-so/) rình rập). Thứ hai, trong lúc bạn đợi, thị trường không đứng yên: khách đổi ý, đối thủ ra tay, mặt bằng có người khác hỏi.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="40" y="34" fill="#0F172A" font-size="15" font-weight="700">Vùng quyết định theo mức thông tin nắm được</text>
  <rect x="40" y="60" width="180" height="40" rx="6" fill="#FEE2E2"/>
  <rect x="220" y="60" width="220" height="40" rx="6" fill="#DCFCE7"/>
  <rect x="440" y="60" width="200" height="40" rx="6" fill="#FEF3C7"/>
  <text x="130" y="85" fill="#B91C1C" font-size="13" font-weight="700" text-anchor="middle">QUYẾT BỪA</text>
  <text x="330" y="85" fill="#15803D" font-size="13" font-weight="700" text-anchor="middle">VÙNG 70% - QUYẾT</text>
  <text x="540" y="85" fill="#B45309" font-size="13" font-weight="700" text-anchor="middle">TÊ LIỆT PHÂN TÍCH</text>
  <line x1="40" y1="120" x2="640" y2="120" stroke="#94A3B8" stroke-width="2"/>
  <text x="40" y="142" fill="#64748B" font-size="12">0%</text>
  <text x="320" y="142" fill="#15803D" font-size="12" font-weight="700">~70%</text>
  <text x="610" y="142" fill="#64748B" font-size="12">100%</text>
  <line x1="330" y1="50" x2="330" y2="125" stroke="#15803D" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="40" y="190" fill="#334155" font-size="13" font-weight="700">Chi phí của sự chờ tăng dần theo thời gian:</text>
  <path d="M60 270 C 220 268, 360 250, 460 210 C 540 178, 600 150, 640 138" fill="none" stroke="#EF4444" stroke-width="3"/>
  <text x="470" y="200" fill="#EF4444" font-size="12" font-weight="700">cost of delay ↑</text>
  <line x1="60" y1="272" x2="640" y2="272" stroke="#CBD5E1" stroke-width="1.5"/>
  <text x="60" y="290" fill="#94A3B8" font-size="11">hôm nay</text>
  <text x="560" y="290" fill="#94A3B8" font-size="11">chờ thêm 1 tháng</text>
</svg>
<div class="viz-caption">Dưới ~70% là quyết bừa; trên ~90% là tê liệt. Vùng 70% là nơi nên chốt - vì chi phí của sự chờ (cost of delay) leo dốc theo thời gian. (Sơ đồ minh hoạ khái niệm.)</div>
</div>

## Chi phí của sự chờ là một con số thật

Hầu hết người làm kinh doanh tính được chi phí của một *quyết định sai*. Rất ít người tính được chi phí của việc *chưa quyết* - dù nó thật không kém. Đó là *cost of delay* (chi phí chờ - thiệt hại sinh ra mỗi ngày một quyết định bị trì hoãn).

*Ví dụ minh hoạ:* một shop thời trang ở TP.HCM lưỡng lự ba tuần có nên nhập sớm bộ sưu tập Tết không, vì "muốn xem thêm dữ liệu xu hướng". Ba tuần đó, đối thủ lên hàng trước, gom luôn nhóm khách mua sớm và toàn bộ lượt tiếp cận tự nhiên trên TikTok Shop. Khi shop quyết xong, giá nhập đã tăng 15% và mùa cao điểm rút ngắn còn một nửa. Báo cáo xu hướng họ chờ đợi *chưa từng* bù nổi khoản đó.

Thử lượng hoá nó: nếu chờ thêm một tuần khiến bạn mất khoảng *80 triệu* doanh thu mùa vụ, thì sự "cẩn trọng" ấy có giá 80 triệu - một con số thật, đặt thẳng lên bàn cạnh rủi ro của việc quyết sớm. Đặt hai con số cạnh nhau, bạn mới ra quyết định công bằng. Cũng như khi một [COO cần báo cáo tức thì](/blog/coo-bao-cao-tuc-thi/), giá trị không nằm ở con số đẹp hơn, mà ở con số *kịp lúc* để hành động.

## Công thức thực chiến: 70% dữ liệu + phán đoán + thử nghiệm nhỏ

Khi dữ liệu chưa đủ, đừng chọn giữa "có dữ liệu" và "đoán mò". Ghép ba thứ lại:

1. **Lấy 70% dữ liệu bạn có được nhanh.** Không phải mọi con số - chỉ những con số đủ phân biệt *tín hiệu khỏi nhiễu* (như [Phần 7](/blog/tin-hieu-vs-nhieu/) đã chỉ). Một xu hướng rõ ở mốc 70% đáng tin hơn một bảng đầy đủ nhưng toàn nhiễu.
2. **Thêm phán đoán của người trong cuộc.** Dữ liệu cho bạn cái đã xảy ra; kinh nghiệm cho bạn cái *có khả năng* xảy ra mà số chưa kịp ghi lại. Đây đúng tinh thần *data-informed* ở [Phần 1](/blog/tu-duy-du-lieu-la-gi/): dữ liệu soi đường, người vẫn cầm lái.
3. **Biến quyết định lớn thành thử nghiệm nhỏ.** Thay vì đổi giá toàn bộ cửa hàng (cửa một chiều cảm giác), thử trên một SKU, một chi nhánh, một tuần (cửa hai chiều thật sự). Bạn mua được dữ liệu *thật* của chính mình với rủi ro nhỏ - thường rẻ và nhanh hơn mọi báo cáo mua ngoài.

Mẹo: nếu một quyết định khiến bạn tê liệt, hãy hỏi "**làm sao biến nó thành cửa hai chiều?**". Phần lớn cửa một chiều, khi nhìn kỹ, có thể chẻ nhỏ thành một loạt cửa hai chiều - và nỗi sợ tan đi.

## Đặt câu hỏi 70% với Semantix

Khoảng cách lớn nhất từ "muốn quyết" tới "dám quyết" thường chỉ là *thời gian lấy số*. Nếu mỗi câu hỏi mới phải xếp hàng chờ người viết SQL vài ngày, bạn bị đẩy vào tê liệt - không phải vì thiếu can đảm, mà vì số về quá trễ.

Semantix không phải là một kho báo cáo để bạn ngồi chờ cho "đủ". Nó là chỗ bạn hỏi thẳng bằng tiếng Việt - *"doanh thu nhóm hàng Tết ba tuần gần nhất so với cùng kỳ năm ngoái"* - và có 70% bức tranh trong vài giây, ngay lúc cần quyết. Lấy số nhanh không khiến quyết định liều hơn; nó khiến *cost of delay* gần bằng không, để bạn quyết ở vùng 70% thay vì chờ tới lúc quá muộn.

## Tóm lại

| Cái bẫy cũ | Cách làm đúng |
|---|---|
| Đợi 100% dữ liệu mới quyết | Quyết ở ~70%, phần còn lại hiếm khi đổi kết luận |
| Coi mọi quyết định như cửa một chiều | Tách cửa một chiều (số ít) khỏi cửa hai chiều (số nhiều) |
| Chỉ tính chi phí quyết sai | Tính cả chi phí của sự chờ - một con số thật |
| Chọn giữa dữ liệu và phán đoán | Ghép 70% dữ liệu + kinh nghiệm + thử nghiệm nhỏ |
| Sốt ruột quyết bừa, không số nào đỡ lưng | Lấy đủ tín hiệu để loại nhiễu, rồi mới chốt |

## Khép lại chuỗi: dữ liệu để quyết tốt hơn, không thay người quyết

Chín phần, một sợi chỉ xuyên suốt. [Phần 1](/blog/tu-duy-du-lieu-la-gi/): phân biệt *data-driven* và *data-informed* - dữ liệu là vô lăng, không phải tài xế. [Phần 2](/blog/bat-dau-tu-cau-hoi/): định nghĩa quyết định *trước* khi đi tìm số. [Phần 3](/blog/thien-kien-trong-doc-so/): coi chừng các thiên kiến khi đọc số. [Phần 4](/blog/tuong-quan-nhan-qua/): tương quan không phải nhân quả. [Phần 5](/blog/trung-binh-noi-doi/): khi con số trung bình đánh lừa. [Phần 6](/blog/leading-lagging-indicator/): đo chỉ số còn lái được (leading), không phải cái đã rồi. [Phần 7](/blog/tin-hieu-vs-nhieu/): tách tín hiệu khỏi nhiễu, đừng giật mình vì một dao động ngẫu nhiên. [Phần 8](/blog/goodhart-guardrail-metrics/): khi một chỉ số thành mục tiêu, nó thôi là chỉ số tốt - nên cần guardrail. Và hôm nay, Phần 9: quyết được kể cả khi số chưa đủ.

Gộp lại, cả chuỗi nói đúng một điều: **dữ liệu tồn tại để bạn ra quyết định tốt hơn - chứ không phải để ra quyết định thay bạn.** Con số xuất sắc nhất cũng không tự ký hợp đồng thuê mặt bằng, không tự nhập hàng Tết, không tự sa thải hay tuyển ai. Nó thu hẹp vùng mù, định lượng rủi ro, phơi bày cái bạn đang né nhìn. Nhưng cú nhấn nút cuối cùng - và trách nhiệm đi kèm - vẫn là của bạn. Một doanh nghiệp trưởng thành về dữ liệu không phải nơi *con số quyết tất cả*, mà là nơi *con người quyết, với con số bên cạnh.*

> **Mental model:** Trước mỗi quyết định, hỏi ba câu. Đây là cửa một chiều hay hai chiều? Mình đã có 70% chưa? Chờ thêm tốn bao nhiêu? Trả lời xong ba câu đó, bạn sẽ vừa không quyết bừa, vừa không tê liệt - đúng chỗ cần đứng.

---

*Cảm ơn bạn đã đi hết chín phần. Muốn ra quyết định nhanh hơn mà vẫn dựa trên số? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/) Hoặc quay lại [Phần 1](/blog/tu-duy-du-lieu-la-gi/) đọc trọn chuỗi từ đầu - và xem [dữ liệu bẩn](/blog/du-lieu-ban/) âm thầm bẻ cong quyết định của bạn thế nào.*
