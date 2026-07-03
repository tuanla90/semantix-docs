---
title: "Thống kê mô tả (Phần 2): phân vị P50/P90/P99 - vì sao đo bằng trung bình là tự lừa"
code: "kt-029"
series: "thong-ke-mo-ta"
seriesOrder: 2
description: "Giao hàng trung bình 30 phút, nghe rất ổn. Nhưng cứ 10 khách thì 1 người đợi gần 2 tiếng. Trung bình đẹp che mất trải nghiệm tệ của thiểu số."
pubDate: 2025-01-29
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/phan-vi-percentile.png"
coverAlt: "Phân phối thời gian với các vạch P50, P90, P99 và đuôi phải tô đỏ"
---

<div class="series-nav">
  <div class="series-nav-title">📐 Series Thống kê mô tả cho người làm số · 5 phần</div>
  <ol>
    <li><a href="/blog/do-lech-chuan/">Phần 1 - Độ lệch chuẩn &amp; phương sai</a></li>
    <li class="current">Phần 2 - Phân vị (P50/P90/P99)</li>
    <li><a href="/blog/doc-hinh-dang-phan-phoi/">Phần 3 - Đọc hình dạng phân phối</a></li>
    <li><a href="/blog/phan-tram-vs-diem-phan-tram/">Phần 4 - Phần trăm vs điểm phần trăm</a></li>
    <li><a href="/blog/trung-binh-co-trong-so/">Phần 5 - Trung bình có trọng số</a></li>
  </ol>
</div>

Một quán bún bò ở Đà Nẵng tự hào với khách: "Bên em giao tận nơi, **trung bình 30 phút** là có đồ ăn." Nghe quá ổn. Chủ quán in luôn lên fanpage. Nhưng tháng đó có 6 review một sao, đều chung một câu: "Đợi gần 2 tiếng, nguội ngắt." Sao lại thế, khi trung bình chỉ 30 phút?

Vì trung bình là kẻ rất giỏi che giấu. Phần lớn đơn giao trong 20-25 phút, kéo con số trung bình xuống đẹp. Nhưng cứ khoảng 10 đơn thì có 1 đơn rơi vào giờ cao điểm, kẹt xe, shipper ôm 4 đơn cùng lúc - và khách đó đợi 90-110 phút. **Trung bình mượt mà không hề biết tới những người đang chờ dài cổ.** Sáu người đó không sống trong "trung bình"; họ sống trong cái đuôi mà trung bình giấu đi.

Phản xạ của bạn có thể là: "Thì 6 trên cả nghìn đơn, đáng kể gì." Nhưng 6 người đó để lại 6 ngôi sao một, và họ kể lại cho bạn bè. Họ không phải nhiễu - họ là **trải nghiệm tệ nhất mà sản phẩm của bạn đang tạo ra đều đặn.** Và có một cách đo chỉ thẳng vào họ: phân vị.

## Phân vị là gì - câu nói "bao nhiêu phần trăm tốt hơn mức này"

**Phân vị (percentile - mốc chia dữ liệu theo phần trăm)** trả lời đúng một câu, rất dễ hiểu: *"Bao nhiêu phần trăm trường hợp nằm dưới mức này?"*

- **P50 (phân vị thứ 50)** = mức mà 50% đơn nhanh hơn, 50% chậm hơn. P50 chính là **median (trung vị - con số nằm chính giữa khi xếp tất cả từ thấp đến cao)**. Đây là "người ở giữa hàng".
- **P90 (phân vị thứ 90)** = 90% đơn nhanh hơn mức này, chỉ 10% chậm hơn. Đây là "khách xui thứ 10".
- **P99 (phân vị thứ 99)** = 99% đơn nhanh hơn, 1% chậm hơn. Đây là "khách xui nhất trăm người".

Để ý cái hay: P90 và P99 nhìn thẳng vào **cái đuôi xấu** - nhóm thiểu số có trải nghiệm tệ nhất. Trung bình thì gộp tất cả lại rồi chia đều, nên người chờ 2 tiếng bị hòa tan vào hàng nghìn người chờ 20 phút. Phân vị không cho phép hòa tan: nó tách riêng kẻ chờ lâu nhất ra và bắt bạn nhìn vào mặt họ.

Cách tính cũng bình dân, không cần công thức cao siêu: **xếp tất cả giá trị từ nhỏ đến lớn, rồi đếm tới đúng vị trí.** Có 1.000 đơn, xếp theo thời gian giao tăng dần. P90 là giá trị ở vị trí thứ 900 - tức 90% đơn nằm dưới nó. P99 là vị trí thứ 990. Vậy thôi. Bạn không cộng chia gì cả; bạn chỉ *xếp hàng rồi chỉ tay*.

<div class="viz">
<svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <text x="16" y="26" fill="#475569" font-size="15" font-weight="700">Thời gian giao hàng 1.000 đơn (phút) - đuôi phải mới là chỗ đau</text>
  <line x1="50" y1="230" x2="660" y2="230" stroke="#334155" stroke-width="1.5"/>
  <rect x="60"  y="150" width="30" height="80"  rx="3" fill="#34D399"/>
  <rect x="92"  y="100" width="30" height="130" rx="3" fill="#34D399"/>
  <rect x="124" y="78"  width="30" height="152" rx="3" fill="#34D399"/>
  <rect x="156" y="110" width="30" height="120" rx="3" fill="#34D399"/>
  <rect x="188" y="140" width="30" height="90"  rx="3" fill="#34D399"/>
  <rect x="220" y="168" width="30" height="62"  rx="3" fill="#64748B"/>
  <rect x="252" y="186" width="30" height="44"  rx="3" fill="#64748B"/>
  <rect x="284" y="196" width="30" height="34"  rx="3" fill="#64748B"/>
  <rect x="316" y="204" width="30" height="26"  rx="3" fill="#64748B"/>
  <rect x="348" y="210" width="30" height="20"  rx="3" fill="#F59E0B"/>
  <rect x="380" y="214" width="30" height="16"  rx="3" fill="#F59E0B"/>
  <rect x="412" y="217" width="30" height="13"  rx="3" fill="#F59E0B"/>
  <rect x="444" y="219" width="30" height="11"  rx="3" fill="#F87171"/>
  <rect x="476" y="221" width="30" height="9"   rx="3" fill="#F87171"/>
  <rect x="508" y="222" width="30" height="8"   rx="3" fill="#F87171"/>
  <rect x="540" y="223" width="30" height="7"   rx="3" fill="#F87171"/>
  <rect x="572" y="224" width="30" height="6"   rx="3" fill="#F87171"/>
  <rect x="604" y="225" width="30" height="5"   rx="3" fill="#F87171"/>
  <line x1="155" y1="60" x2="155" y2="234" stroke="#22D3EE" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="160" y="56" fill="#22D3EE" font-size="12" font-weight="700">P50 ≈ 25 phút</text>
  <line x1="365" y1="60" x2="365" y2="234" stroke="#FBBF24" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="370" y="56" fill="#FBBF24" font-size="12" font-weight="700">P90 ≈ 55 phút</text>
  <line x1="560" y1="60" x2="560" y2="234" stroke="#F87171" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="455" y="46" fill="#F87171" font-size="12" font-weight="700">P99 ≈ 105 phút</text>
  <text x="455" y="252" fill="#F87171" font-size="11">đuôi phải = 6 khách "đợi 2 tiếng"</text>
  <text x="16" y="300" fill="#475569" font-size="14" font-weight="700">Box plot tóm tắt cùng dữ liệu</text>
  <line x1="60" y1="350" x2="120" y2="350" stroke="#64748B" stroke-width="2"/>
  <line x1="60" y1="338" x2="60" y2="362" stroke="#64748B" stroke-width="2"/>
  <rect x="120" y="328" width="140" height="44" rx="4" fill="#162033" stroke="#22D3EE" stroke-width="2"/>
  <line x1="180" y1="328" x2="180" y2="372" stroke="#22D3EE" stroke-width="3"/>
  <text x="174" y="392" fill="#22D3EE" font-size="11" text-anchor="middle">P50</text>
  <text x="120" y="320" fill="#94A3B8" font-size="10">Q1 (P25)</text>
  <text x="232" y="320" fill="#94A3B8" font-size="10">Q3 (P75)</text>
  <line x1="260" y1="350" x2="470" y2="350" stroke="#64748B" stroke-width="2"/>
  <line x1="470" y1="338" x2="470" y2="362" stroke="#64748B" stroke-width="2"/>
  <circle cx="560" cy="350" r="6" fill="#F87171"/>
  <circle cx="610" cy="350" r="6" fill="#F87171"/>
  <text x="585" y="334" fill="#F87171" font-size="10" text-anchor="middle">outlier đuôi xa</text>
  <text x="120" y="408" fill="#475569" font-size="10">hộp = 50% dữ liệu giữa (IQR) · vạch giữa = P50 · chấm đỏ = đuôi xấu vượt ngưỡng</text>
</svg>
<div class="viz-caption">Cùng một tập dữ liệu, hai cách nhìn. Phân phối cho thấy đám đông tụ ở 20-25 phút nhưng có đuôi đỏ kéo dài; box plot tóm gọn thành hộp + ngưỡng. Số liệu là ví dụ minh hoạ.</div>
</div>

## Tứ phân vị và box plot - tóm cả phân tán trong một cái hộp

Có một bộ phân vị đặc biệt hay dùng đến mức có tên riêng: **tứ phân vị (quartile - các mốc chia dữ liệu thành 4 phần bằng nhau)**. Q1 = P25 (25% nhanh hơn), Q2 = P50 = median, Q3 = P75 (75% nhanh hơn). Khoảng từ Q1 đến Q3 chứa đúng **50% dữ liệu ở giữa** - chính là IQR mà bạn đã gặp khi [phân biệt outlier là rác hay mỏ vàng](/blog/outlier-rac-hay-mo-vang/).

Gói tất cả lại, bạn được **box plot (biểu đồ hộp - hình tóm tắt phân tán qua Q1, P50, Q3 và đuôi)**: một cái hộp từ Q1 tới Q3, vạch giữa là P50, hai "râu" vươn ra hai phía, và những chấm rời rạc bên ngoài là đuôi/outlier. Nhìn một cái hộp, bạn biết ngay đám đông nằm đâu, lệch về phía nào, và có ai bị bỏ lại ở đuôi xa không - điều mà một con số trung bình không bao giờ kể được. (Đây cũng là lý do [trung bình một mình hay nói dối](/blog/trung-binh-noi-doi/): nó nén cả cái hộp lẫn cái đuôi vào một điểm.)

## Trung bình vs P90 - cùng dữ liệu, hai câu chuyện

Hãy đặt ba tình huống SME Việt cạnh nhau. Cả ba đều có **trung bình giống hệt nhau**, nhưng P90 lại kể chuyện hoàn toàn khác:

| Tình huống | Trung bình | P90 | P90 nói gì |
|---|---|---|---|
| Giao hàng quán bún (1.000 đơn) | 30 phút | 55 phút | 1/10 khách đợi gần 1 tiếng |
| Phản hồi inbox shop thời trang | 30 phút | 4 giờ | 1/10 tin nhắn bị bỏ quên nửa buổi |
| Thời gian chờ bàn quán F&B tối T7 | 30 phút | 75 phút | 1/10 khách bỏ về vì đợi quá lâu |

Ba con số trung bình bằng nhau, nhưng ba **P90** vạch ra ba mức độ "đau" rất khác. Nếu bạn chỉ báo cáo trung bình, sếp gật đầu cho qua cả ba. Nhìn P90, bạn biết ngay shop thời trang đang mất khách ở khâu trả lời tin nhắn, còn quán F&B đang để khách đứng chờ tới mức bỏ về. **Trung bình đo cái bình thường; P90 đo cái tệ mà bạn còn sửa được.**

## Vì sao SLA luôn viết bằng phân vị, không bằng trung bình

Để ý mọi cam kết dịch vụ nghiêm túc đều dùng phân vị. **SLA (Service Level Agreement - cam kết mức chất lượng dịch vụ)** không bao giờ viết "thời gian giao trung bình 2 ngày", mà viết: *"95% đơn giao dưới 2 ngày."* Đó là một câu phân vị trá hình - chính là nói **P95 ≤ 2 ngày**.

Lý do rất thực tế: trung bình dễ bị "mua chuộc" bằng vài đơn siêu nhanh, còn cam kết bằng phân vị thì bắt bạn chịu trách nhiệm với *cái đuôi*. "95% dưới 2 ngày" nghĩa là bạn đồng ý rằng chỉ 5% được phép chậm hơn - và bạn phải kéo cả nhóm chậm đó về. Khi đo tốc độ tải trang, đội kỹ thuật cũng nhìn P95/P99 chứ không nhìn trung bình, vì người dùng nhớ lần trang đứng hình 8 giây, chứ không nhớ 99 lần nó tải trong 1 giây. **Cái khiến khách bỏ đi nằm ở đuôi, nên hãy đo đuôi.**

## Đọc phân vị trong Semantix

Semantix **không phải cái máy chỉ nhả ra mỗi con số trung bình** rồi để bạn tự đoán phần còn lại. Khi bạn hỏi bằng tiếng Việt, bạn hỏi luôn về cái đuôi:

1. **Hỏi cả P50 lẫn P90.** Bạn gõ: *"Thời gian giao hàng tháng này - cho tôi xem trung bình, P50, P90 và P99."* Hệ thống trả về cả bộ, để con số đuôi không bị trung bình che.
2. **Dựng box plot, không chỉ một số.** Bạn bảo *"vẽ phân phối thời gian phản hồi inbox theo từng nhân viên"* - Semantix dựng box plot từng nhóm để bạn thấy ai có đuôi dài.
3. **Bạn đặt ngưỡng SLA, hệ thống canh.** Định nghĩa "95% đơn dưới 2 ngày" một lần, mọi báo cáo sau đều soi đúng P95 - không phải mỗi lần lại tự tính tay.

## Tóm lại

| Đo bằng trung bình (tự lừa) | Đo bằng phân vị (nhìn thật) |
|---|---|
| "Giao trung bình 30 phút" | "P90 = 55 phút - 1/10 khách đợi lâu" |
| Đuôi xấu bị hòa tan | P99 chỉ thẳng vào khách xui nhất |
| "Nhanh trung bình, yên tâm" | SLA: 95% đơn dưới 2 ngày |
| Một số phẳng cho cả tệp | Box plot: hộp + đuôi + outlier |
| Không biết ai đang chờ lâu | Biết chính xác 5-10% nào cần cứu |

Trung bình không sai về số học - nó chỉ kể câu chuyện của người ở giữa, rồi im lặng về những người ở đuôi. Mà khách rời bỏ bạn, để lại review một sao, kể xấu với bạn bè - họ gần như luôn ở đuôi. Phân vị là cách bạn ngừng quay mặt đi khỏi họ.

> Mental model: trung bình kể chuyện của người ở giữa; phân vị kể chuyện của người ở đuôi. Mà khách bực mình luôn sống ở đuôi - nên đo thời gian giao hàng, phản hồi, tải trang, hãy nhìn P90 và P99 trước, trung bình sau.

---

*Muốn thấy P50/P90/P99 và box plot thay vì một con số trung bình đánh lừa? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Phần 3 - Đọc hình dạng phân phối](/blog/doc-hinh-dang-phan-phoi/) để biết vì sao "lệch phải" lại quyết định bạn nên tin median hay mean.*
