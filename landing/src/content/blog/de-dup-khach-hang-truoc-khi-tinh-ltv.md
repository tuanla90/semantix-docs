---
title: "Một khách, năm hồ sơ: vì sao chưa gộp trùng thì LTV và cohort đều sai"
code: "pt-031"
description: "Số khách tăng đều mỗi tháng, nghe như tin vui. Nhưng một nửa 'khách mới' chỉ là người cũ đổi SĐT. Chưa gộp trùng, mọi con số đều dối bạn."
pubDate: 2025-09-18
category: "Phân Tích Dữ Liệu"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/de-dup-khach-hang-truoc-khi-tinh-ltv.svg"
coverAlt: "Năm thẻ hồ sơ khách hàng trùng nhau được gộp lại thành một khách duy nhất"
---

Cuối quý, bạn mở báo cáo và mỉm cười: tệp khách hàng tăng từ 8.000 lên 11.000 người chỉ trong sáu tháng. Acquisition (thu hút khách mới) đang chạy tốt. Bạn định rót thêm ngân sách quảng cáo để giữ đà.

Rồi một nhân viên kho buột miệng: "Chị Lan hôm qua lại đặt đơn — mà em thấy chị ấy có tới ba tài khoản, mua Shopee một số, TikTok một số, ra quầy lại đưa số khác." Bạn gõ thử tên "Lan" vào hệ thống. Năm hồ sơ hiện ra. Cùng một người.

Đây là nghịch lý ít người chịu tin: **số khách của bạn có thể tăng đẹp đẽ trong khi bạn không hề có thêm một khách nào.** Bạn chỉ đang đếm cùng một người nhiều lần. Và một khi danh tính khách bị nhân bản như vậy, *mọi* phân tích dựng trên đó — LTV, cohort, retention — đều sai theo, một cách âm thầm và có hệ thống.

## Trùng lặp danh tính: khi một người hoá thành năm khách

Trùng lặp danh tính (*identity resolution* — bài toán nhận ra nhiều bản ghi cùng trỏ về một người) sinh ra tự nhiên ở mọi shop đa kênh Việt Nam. Không ai cố tình. Chị Lan mua trên Shopee bằng SĐT cá nhân, đặt TikTok Shop bằng số của chồng, ra quầy thì đọc số Zalo. Tên thì khi "Nguyễn Thị Lan", khi "Lan Nguyen", khi gõ vội thành "nguyen thi lna". Email lúc dùng cái chính, lúc cái phụ.

Hệ thống thấy năm bộ thông tin khác nhau, nên tạo năm hồ sơ. Với máy, đó là năm khách. Với thực tế, đó là một khách trung thành đáng giá — người bạn đang vô tình xé thành năm mảnh.

**Hậu quả không dừng ở việc đếm sai số khách.** Nó lan vào từng phép tính bạn dựa vào để ra quyết định:

| Chỉ số | Khi chưa gộp trùng (1 người = 5 hồ sơ) | Sau khi gộp (1 người = 1 hồ sơ) |
|---|---|---|
| Số khách | 11.000 (phồng ảo) | ~7.400 (thật) |
| LTV trung bình | 1,2 triệu/khách (bị chia nhỏ) | 4,8 triệu/khách |
| Retention 90 ngày | 31% ("khách rời nhanh") | 58% |
| Tỷ lệ khách mua lại | Thấp giả tạo | Đúng thực tế |
| Chi phí win-back | Lãng phí — gửi trùng 5 lần | Đúng một lần, đúng người |

*Các con số trên là ví dụ minh hoạ*, nhưng độ lệch thì rất thật. Hãy đi qua từng dòng để thấy vì sao.

## LTV bị chia nhỏ — và bạn tưởng khách của mình rẻ tiền

LTV (Lifetime Value — giá trị vòng đời, tổng tiền một khách mang lại trong suốt thời gian gắn bó) được tính rất đơn giản: tổng doanh thu chia cho số khách. Nếu mẫu số phồng ảo, LTV co lại.

*Ví dụ minh hoạ:* chị Lan đã chi tổng 24 triệu qua năm hồ sơ — trung bình 4,8 triệu mỗi hồ sơ. Hệ thống nhìn vào và thấy "năm khách, mỗi người tầm 4,8 triệu", trong khi sự thật là **một khách 24 triệu** — một VIP. Nhân sai lầm này lên toàn tệp, LTV trung bình của bạn bị kéo xuống còn một phần ba, một phần tư giá trị thật.

Hệ quả là một chuỗi quyết định lệch. Bạn thấy LTV thấp nên không dám chi nhiều để giữ khách. Bạn thấy "khách rẻ" nên đối xử với họ như khách vãng lai. Nếu bạn từng đọc [RFM Segmentation](/blog/rfm-segmentation/), bạn sẽ nhận ra điều tệ hơn: chị Lan đáng lẽ là **Champions**, nhưng vì bị xé năm mảnh, mỗi mảnh chỉ mua một, hai lần nên rơi vào nhóm "New" hoặc "At-Risk" — và bạn gửi cho một khách trung thành đúng những voucher giảm giá dành cho người sắp bỏ đi.

## Cohort và retention: một khách trung thành bị tính thành "ba khách rồi rời đi"

Đây là chỗ trùng lặp tàn phá nặng nhất, vì nó bóp méo cả *hình dạng* của dữ liệu chứ không chỉ độ lớn.

Cohort (nhóm khách gộp theo thời điểm bắt đầu) và retention (tỷ lệ giữ chân — bao nhiêu phần trăm khách quay lại sau N tháng) đều dựa vào một giả định cốt lõi: **mỗi danh tính là một người, và bạn theo dõi được người đó qua thời gian.** Trùng lặp phá vỡ đúng giả định này.

Hình dung chị Lan trên dòng thời gian. Tháng 1 chị mua trên Shopee → hệ thống ghi nhận "khách mới tháng 1". Tháng 4 chị mua TikTok bằng số khác → "khách mới tháng 4". Tháng 8 ra quầy → lại "khách mới tháng 8". Một khách quay lại đều đặn suốt năm bị ghi thành **ba khách mới khác nhau, mỗi người chỉ mua một lần rồi biến mất.**

Kết quả: bảng cohort của bạn phình to cột "khách mới" và teo tóp cột "giữ chân". Retention trông thê thảm — không phải vì khách rời bỏ bạn, mà vì bạn không nhận ra họ khi họ quay lại. Như [Cohort Analysis](/blog/cohort-analysis/) đã chỉ ra, một con số tổng có thể nói dối; ở đây còn tệ hơn — *cả cấu trúc* nói dối. Bạn nhìn vào đường cong giữ chân dốc đứng và kết luận "sản phẩm không giữ được khách", trong khi vấn đề thật chỉ là bạn đang đeo kính nhìn đôi.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
<text x="20" y="28" fill="#64748B" font-size="13" font-weight="700">5 bản ghi rời rạc</text>
<text x="520" y="28" fill="#64748B" font-size="13" font-weight="700">1 khách thật</text>
<rect x="20" y="44" width="220" height="40" rx="8" fill="#7F1D1D" stroke="#F87171"/>
<text x="36" y="69" fill="#FCA5A5" font-size="13">Shopee · 0901xxx · "Nguyễn Thị Lan"</text>
<rect x="20" y="94" width="220" height="40" rx="8" fill="#7F1D1D" stroke="#F87171"/>
<text x="36" y="119" fill="#FCA5A5" font-size="13">TikTok · 0987xxx · "Lan Nguyen"</text>
<rect x="20" y="144" width="220" height="40" rx="8" fill="#7F1D1D" stroke="#F87171"/>
<text x="36" y="169" fill="#FCA5A5" font-size="13">Quầy · 0912xxx · "nguyen thi lna"</text>
<rect x="20" y="194" width="220" height="40" rx="8" fill="#7F1D1D" stroke="#F87171"/>
<text x="36" y="219" fill="#FCA5A5" font-size="13">Zalo · email phụ · "Lan"</text>
<rect x="20" y="244" width="220" height="40" rx="8" fill="#7F1D1D" stroke="#F87171"/>
<text x="36" y="269" fill="#FCA5A5" font-size="13">Web · 0901xxx · "Lan N."</text>
<path d="M250 164 L470 164" stroke="#22D3EE" stroke-width="3"/>
<path d="M462 156 L474 164 L462 172 Z" fill="#22D3EE"/>
<text x="360" y="154" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">gộp trùng</text>
<rect x="480" y="120" width="180" height="88" rx="10" fill="#15803d"/>
<text x="570" y="158" fill="#fff" font-size="17" font-weight="800" text-anchor="middle">Chị Lan</text>
<text x="570" y="184" fill="#bbf7d0" font-size="13" text-anchor="middle">24 triệu · VIP</text>
</svg>
<div class="viz-caption">Năm bản ghi rải khắp các kênh, mỗi cái một SĐT/tên khác, thật ra trỏ về cùng một khách trung thành.</div>
</div>

## Cách gộp trùng đúng: chuẩn hoá trước, so khớp sau, gộp bảo thủ

De-dup (gộp trùng — hợp nhất các bản ghi cùng trỏ về một người) không phải phép màu, mà là một quy trình có kỷ luật. Làm đúng thứ tự thì an toàn; làm tắt thì gây hoạ.

**Bước 1 — Chọn khoá định danh.** Tìm trường ổn định nhất để nhận ra một người: SĐT chuẩn hoá thường là tốt nhất ở Việt Nam, sau đó là email, mã khách hàng (nếu có chương trình thành viên). Tên là khoá *tệ nhất* vì quá nhiều biến thể.

**Bước 2 — Chuẩn hoá trước khi so.** Đây là bước mà 90% người bỏ qua. Trước khi so hai SĐT, đưa chúng về cùng một dạng:

| Dấu hiệu trùng | Cách chuẩn hoá |
|---|---|
| `+84 90 1234 567`, `0901234567`, `84901234567` | Quy về một định dạng: bỏ dấu cách, đổi `+84`/`84` thành `0` |
| `Lan@Gmail.Com `, `lan@gmail.com` | Chữ thường hết, cắt khoảng trắng đầu/cuối |
| "Nguyễn Thị Lan", "NGUYEN THI LAN" | Chữ thường, bỏ dấu, gộp khoảng trắng thừa |
| Mã KH `KH-007` vs `kh007` | Bỏ ký tự phân cách, chuẩn hoá tiền tố |

Sau khi chuẩn hoá, ba SĐT "khác nhau" của chị Lan ở trên thật ra là một — và bạn gộp được mà không cần đoán mò gì cả. Đây cũng chính là tư duy "làm sạch nguồn trước, hỏi sau" trong bài [dữ liệu bẩn](/blog/du-lieu-ban/).

**Bước 3 — So khớp mờ, thật thận trọng.** Khi khoá cứng không trùng (chị Lan dùng hẳn ba số điện thoại), bạn cần fuzzy match (so khớp mờ — nhận hai chuỗi *gần* giống nhau là một, ví dụ "nguyen thi lna" và "nguyen thi lan" sai một ký tự). Nhưng fuzzy là con dao hai lưỡi: nới lỏng quá tay là bạn gộp nhầm hai người thật thành một.

**Bước 4 — Ưu tiên gộp bảo thủ.** Nguyên tắc vàng: **khi không chắc, đừng gộp.**

> Quy tắc vàng: bỏ sót một cặp trùng chỉ làm số liệu hơi phồng. Gộp nhầm hai người thật thành một thì bạn vĩnh viễn không tách lại được — và đã trộn lẫn lịch sử mua, đơn hàng, thậm chí địa chỉ giao của hai con người khác nhau.

## Cảnh báo ngược: gộp sai cũng nguy hiểm như không gộp

Đừng vung tay quá trớn. Hai người có thể trùng tên ("Nguyễn Văn Hùng" ở Việt Nam nhiều vô kể), dùng chung một máy tính ở quán net, hay hai vợ chồng xài chung email. Gộp họ làm một, bạn tạo ra một "khách Frankenstein" với LTV gấp đôi ảo và lịch sử mua mâu thuẫn — sai theo chiều ngược lại.

Cách cân bằng thực tế: gộp tự động *chỉ* khi khoá cứng đã chuẩn hoá trùng khít (cùng SĐT hoặc cùng email). Với các cặp chỉ "ngờ ngợ" qua fuzzy, đưa vào một danh sách *chờ con người duyệt* thay vì gộp tự động. Vài chục cặp nghi vấn duyệt tay mỗi tuần rẻ hơn nhiều so với một tệp khách bị trộn bậy không thể gỡ.

## Gộp trùng với Semantix

Làm de-dup thủ công trong Excel là cơn ác mộng: lọc, sắp xếp, dò mắt từng cặp, rồi nhân lên hàng vạn dòng. Semantix tiếp cận từ gốc — việc đếm khách theo **khoá định danh** nằm ở tầng định nghĩa, *trước khi* bất kỳ con số nào được tính.

Bạn kết nối Shopee, TikTok Shop, KiotViet, Google Sheets rồi [gộp (union) + làm sạch bằng bảng ảo ngay lúc hỏi](/blog/bang-ao-gop-du-lieu/) — dữ liệu ở lại nguồn, không copy về kho nào. Trong [Semantic Layer](/blog/semantic-layer/), bạn **khai báo SĐT (hoặc email) đã chuẩn hoá làm khoá định danh khách hàng** — chuẩn hoá bằng một cột tính toán, ví dụ bỏ khoảng trắng hay thống nhất đầu số. Sau đó mọi chỉ số — đếm khách, LTV, cohort giữ chân — được **đếm theo khoá định danh đó** thay vì theo từng dòng đơn rời rạc, nên con số đứng trên tệp khách *gộp theo khoá*, không phải trên một đám hồ sơ phân mảnh.

Cần nói thẳng giới hạn: Semantix gộp **chính xác theo khoá bạn khai báo** — nó không tự đoán rằng hai hồ sơ *khác khoá* thực ra là một người. Những cặp trùng "ngờ ngợ" cần **khớp mờ (fuzzy)** vẫn là bước bạn tự xử lý ở khâu chuẩn bị dữ liệu (đúng như phần trên đã khuyến nghị: đưa vào danh sách chờ người duyệt). Cái Semantix lo cho bạn là phần còn lại — và là phần chiếm phần lớn khối lượng: gộp đúng theo khoá đã chuẩn hoá, một lần, cho mọi câu hỏi về sau.

## Tóm lại

| Nếu bạn không gộp trùng... | Bạn sẽ tin rằng... | Sự thật sau khi gộp |
|---|---|---|
| Đếm số khách | Tệp khách đang tăng nhanh | Phần lớn là người cũ đổi SĐT |
| LTV trung bình | Khách của tôi giá trị thấp | Có nhiều VIP đang bị giấu |
| Retention/cohort | Khách rời bỏ rất nhanh | Khách quay lại mà bị tính thành người mới |
| Khuyến mãi | Đã phủ rộng tệp khách | Gửi trùng một người 5 lần, bỏ sót người khác |

Trước khi tin bất kỳ con số nào về khách hàng, hãy hỏi một câu đơn giản: *mỗi dòng trong bảng này có chắc là một con người khác nhau không?* Nếu chưa chắc, thì LTV, cohort và retention bạn đang nhìn không phải là sự thật — chúng chỉ là cái bóng méo của một tệp dữ liệu chưa được gộp.

> **Mental model:** Đếm khách trước khi gộp trùng giống đếm người trong phòng qua một tấm gương vỡ — mỗi mảnh phản chiếu thêm vài cái đầu. Lau gương lành lại trước, rồi hãy đếm.

---

*Muốn biết tệp khách thật của bạn lớn cỡ nào — và ai trong đó là VIP đang bị giấu? [Dùng thử Semantix miễn phí.](/docs/vi/free-trial/)*
