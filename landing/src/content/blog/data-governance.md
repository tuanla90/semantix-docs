---
title: "Data governance cho SME: ai sở hữu con số & ai chịu trách nhiệm khi nó sai"
code: "kt-015"
description: "Cả công ty dùng chung một con số mỗi sáng. Nhưng hỏi 'số sai thì ai sửa?' — không ai giơ tay. Ai cũng dùng, không ai sở hữu."
pubDate: 2027-12-28
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/data-governance.svg"
coverAlt: "Mỗi con số gắn với một người chủ và một khoá phân quyền — sơ đồ quản trị dữ liệu cho SME"
---

Cuộc họp giao ban, sếp chỉ vào dashboard (bảng số trực quan): "Con số tỷ lệ chuyển đổi này tháng trước là 3,1%, sao tháng này tụt còn 1,8%? Ai làm rớt?" Cả phòng im. Rồi marketing lên tiếng: "Em nghĩ do cách tính đổi rồi đấy ạ." Sales: "Đâu, em vẫn lấy y như cũ mà." Data: "Để em check lại công thức." Mười phút sau vẫn chưa ai biết con số đúng là bao nhiêu, càng không ai biết *ai có quyền chốt* nó đúng.

Đây là nghịch lý xương sống của gần như mọi SME (Small and Medium Enterprise — doanh nghiệp vừa và nhỏ) đang "dùng số để ra quyết định": **cả công ty dùng chung một con số mỗi ngày, nhưng không một ai sở hữu nó, và khi nó sai thì cũng không một ai chịu trách nhiệm.** Số trở thành tài sản chung vô chủ — kiểu sân chung của khu tập thể, ai cũng đi qua, không ai quét.

Phản xạ của bạn lúc này có thể là "chắc công ty mình cần làm **data governance** cho bài bản". Đúng — nhưng coi chừng hiểu sai chữ "bài bản". Bài này dành chín phút để chỉ ra: governance cho SME không phải bộ máy nặng nề của tập đoàn, mà chỉ là **vài quy ước tối thiểu để con số đáng tin** — và cái thiếu duy nhất khiến số loạn không phải công nghệ, mà là *một cái tên gắn vào mỗi con số.*

## Data governance là gì — và vì sao SME tưởng mình không cần

**Data governance** (tạm dịch: *quản trị dữ liệu* — tập hợp quy ước về việc ai sở hữu, ai được xem, định nghĩa ở đâu và ai chịu trách nhiệm về dữ liệu) nghe to tát đến mức đa số chủ SME gạt đi ngay: "Cái đó của ngân hàng, của tập đoàn nghìn người. Công ty em ba chục người, làm gì tới mức lập cả hội đồng dữ liệu."

Đúng một nửa. Bạn **không** cần hội đồng dữ liệu, không cần chức danh Chief Data Officer, không cần bộ quy trình bốn mươi trang. Đó là over-process (làm quá tay) — và over-process với SME còn hại hơn không làm gì, vì nó biến việc đơn giản thành thủ tục mà rồi chẳng ai theo.

Nhưng nửa còn lại mới đau: quản trị dữ liệu **không phải là quy mô, mà là quyền sở hữu.** Dù bạn ba người hay ba trăm người, mỗi con số quan trọng vẫn cần trả lời được bốn câu. Và càng nhỏ, càng dễ rơi vào cảnh "ai cũng tự tính một kiểu" vì chẳng có ai được giao chốt. Governance nhẹ chỉ là việc viết ra câu trả lời cho bốn câu hỏi đó — không hơn.

> Quy tắc vàng: data governance cho SME không đo bằng số trang quy trình, mà bằng việc mỗi con số quan trọng có trả lời được câu "ai chốt số này?" hay không.

## Bốn câu hỏi quyết định con số của bạn có đáng tin

Bỏ hết thuật ngữ sang một bên. Một con số chỉ đáng tin khi bạn trả lời gọn được bốn câu sau về nó. Đây là toàn bộ "data governance cho SME" gói trong bốn dòng.

| Trụ | Câu hỏi cốt lõi | Thiếu nó thì | Công cụ trong Semantix |
|---|---|---|---|
| 1. Sở hữu | **Ai chốt** định nghĩa con số này? | Năm phòng năm cách tính, cãi nhau mãi | Data owner cho mỗi metric |
| 2. Phân quyền | **Ai được xem** dữ liệu nào? | Mở hết thì lộ; khoá hết thì tắc | Phân quyền / RLS |
| 3. Định nghĩa | Định nghĩa chuẩn **ở đâu**? | Mỗi file một công thức, lệch âm thầm | Semantic Layer |
| 4. Trách nhiệm | Số sai thì **ai sửa**, sửa **thế nào**? | Số sai trôi đi, không ai phát hiện | Quy trình đổi định nghĩa |

*(Cột công cụ là cách Semantix hiện thực bốn trụ — sẽ nói ở cuối bài.)*

Để ý: bốn câu này không có câu nào hỏi "mua phần mềm gì". Chúng hỏi về **con người và thỏa thuận** trước, công cụ sau. Đó là lý do governance là chuyện văn hóa nhiều hơn chuyện kỹ thuật. Giờ ta đi từng trụ.

## Trụ 1 — Ai sở hữu con số: "doanh thu" ai là người chốt?

Đây là trụ quan trọng nhất, và là cái SME hay bỏ quên nhất. **Data owner** (chủ sở hữu dữ liệu — người được giao quyền chốt định nghĩa và chịu trách nhiệm về một con số) không phải người *tính* ra số, mà là người *quyết định* số đó nghĩa là gì.

Lấy chữ "doanh thu". Câu hỏi không phải "doanh thu tháng này bao nhiêu" — câu hỏi là **"khi hai phòng cãi nhau doanh thu gồm hay không gồm đơn hoàn, ai là người nói câu cuối cùng?"** Nếu câu trả lời là "ờ thì… tùy", bạn đang không có owner. Và không có owner nghĩa là con số đó vô chủ — ai cũng được quyền sửa cách hiểu, nên nó lệch dần mà không ai chịu.

Cái bẫy "không ai sở hữu" sinh ra y hệt cách [một công ty âm thầm có năm nguồn sự thật](/blog/mot-nguon-su-that/): không ai cố ý, mỗi phòng chỉ tự tính theo cách hợp lý với mình, và vì đều hợp lý nên chẳng ai thấy cần bàn. Owner chính là cái phanh dừng quá trình đó: một con số, một người chốt định nghĩa.

Bảng phân vai owner nhẹ tênh, chỉ cần một bảng tính:

| Metric | Owner (người chốt) | Định nghĩa chốt |
|---|---|---|
| Doanh thu thuần | Chị Lan (Kế toán) | Đơn đã giao, trừ hoàn, trừ chiết khấu |
| Khách hàng mới | Anh Khoa (Sales) | Lần đầu mua trong tháng dương lịch |
| Tỷ lệ chuyển đổi | Chị Hương (Marketing) | Đơn chốt / phiên truy cập, theo kênh |

*(Tên và định nghĩa là ví dụ minh hoạ.)* Lưu ý: owner là một **người có tên**, không phải một phòng ban. "Phòng Sales sở hữu" nghe có vẻ ổn nhưng thực ra vẫn vô chủ — vì khi cãi nhau, không ai trong phòng có quyền nói câu cuối. Một metric, một cái tên.

## Trụ 2 — Ai được xem gì: phân quyền là một phần của governance

Sở hữu xong con số rồi, câu tiếp theo: **ai được nhìn thấy nó?** Đây là trụ **phân quyền** — quyết định mỗi người trong công ty thấy được lát cắt dữ liệu nào.

Nhiều người tách "bảo mật" ra khỏi "governance", coi như hai chuyện. Sai. Phân quyền chính là governance — nó trả lời câu "ai được xem gì", một trong bốn câu cốt lõi. Quản lý chi nhánh Quận 1 được xem số chi nhánh mình, nhưng không nên thấy lương và biên lợi nhuận của Quận 7. Sales A thấy khách mình phụ trách, không thấy khách của Sales B.

Cơ chế làm việc này gọn gàng là **RLS** (Row-Level Security — phân quyền theo hàng dữ liệu, mỗi người chỉ thấy đúng các dòng thuộc phạm vi mình). Như đã mổ kỹ trong bài [muốn chia sẻ dữ liệu rộng hơn, bạn phải khoá nó chặt hơn](/blog/row-level-security/): khoá đúng chỗ — ở tầng dữ liệu, theo hàng — lại chính là điều kiện để bạn *dám* mở số cho cả công ty. Không có phân quyền, bạn kẹt giữa "mở hết thì lộ" và "khoá hết thì tắc". Có nó, governance cho phép self-service mà vẫn ngủ ngon.

## Trụ 3 — Định nghĩa chuẩn ở đâu: một nguồn, không phải năm file

Owner đã chốt "doanh thu thuần = đơn đã giao, trừ hoàn, trừ chiết khấu". Tốt. Nhưng định nghĩa đó **sống ở đâu?** Nếu nó nằm trong đầu chị Lan, hoặc trong một file Excel chị tự giữ, thì hôm chị nghỉ phép là cả công ty lại đoán mò.

Định nghĩa chuẩn phải sống ở một chỗ mà *mọi báo cáo đều buộc đi qua* — không phải dán lên tường, không phải nằm rải rác trong công thức của từng người. Chỗ đó gọi là **Semantic Layer** (tầng định nghĩa nghiệp vụ dùng chung — cuốn từ điển sống của tổ chức, nơi mỗi khái niệm được định nghĩa đúng một lần).

<div class="viz">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif" role="img" aria-label="Sơ đồ bốn trụ data governance: owner, phân quyền, định nghĩa, trách nhiệm cùng đỡ một con số đáng tin">
<rect width="760" height="300" rx="14" fill="#0F172A"/>
<text x="380" y="40" fill="#F1F5F9" font-size="20" font-weight="800" text-anchor="middle">Bốn trụ đỡ một con số đáng tin</text>
<rect x="280" y="62" width="200" height="48" rx="10" fill="#0B2A2E" stroke="#22D3EE" stroke-width="2"/>
<text x="380" y="83" fill="#22D3EE" font-size="15" font-weight="700" text-anchor="middle">CON SỐ ĐÁNG TIN</text>
<text x="380" y="101" fill="#94A3B8" font-size="12" text-anchor="middle">vd: doanh thu thuần</text>
<line x1="120" y1="200" x2="380" y2="110" stroke="#334155" stroke-width="1.5"/>
<line x1="293" y1="200" x2="380" y2="110" stroke="#334155" stroke-width="1.5"/>
<line x1="467" y1="200" x2="380" y2="110" stroke="#334155" stroke-width="1.5"/>
<line x1="640" y1="200" x2="380" y2="110" stroke="#334155" stroke-width="1.5"/>
<g>
<rect x="40" y="200" width="160" height="64" rx="10" fill="#162033" stroke="#334155" stroke-width="1.5"/>
<text x="120" y="226" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">1. Ai SỞ HỮU</text>
<text x="120" y="246" fill="#94A3B8" font-size="12" text-anchor="middle">data owner chốt</text>
</g>
<g>
<rect x="213" y="200" width="160" height="64" rx="10" fill="#162033" stroke="#334155" stroke-width="1.5"/>
<text x="293" y="226" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">2. Ai ĐƯỢC XEM</text>
<text x="293" y="246" fill="#94A3B8" font-size="12" text-anchor="middle">phân quyền / RLS</text>
</g>
<g>
<rect x="387" y="200" width="160" height="64" rx="10" fill="#162033" stroke="#334155" stroke-width="1.5"/>
<text x="467" y="226" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">3. ĐỊNH NGHĨA</text>
<text x="467" y="246" fill="#94A3B8" font-size="12" text-anchor="middle">semantic layer</text>
</g>
<g>
<rect x="560" y="200" width="160" height="64" rx="10" fill="#162033" stroke="#334155" stroke-width="1.5"/>
<text x="640" y="226" fill="#E2E8F0" font-size="14" font-weight="700" text-anchor="middle">4. TRÁCH NHIỆM</text>
<text x="640" y="246" fill="#94A3B8" font-size="12" text-anchor="middle">quy trình sửa</text>
</g>
</svg>
<div class="viz-caption">Rút một trụ ra, con số ngả nghiêng — không trụ nào thay được trụ nào.</div>
</div>

Đây là chỗ tinh tế: nhiều người tưởng [một nguồn sự thật là gom data về một database](/blog/semantic-layer/). Không. Sự thật chung sống ở **tầng định nghĩa**, không phải tầng lưu trữ. Owner quyết định *nghĩa*, Semantic Layer là *nơi cất cái nghĩa đó* để cả công ty dùng chung. Một lần định nghĩa. Dùng mãi mãi.

## Trụ 4 — Ai chịu trách nhiệm khi số sai, và quy trình sửa

Trụ cuối là trụ phân biệt governance thật với governance giả. Số *sẽ* sai — kênh mới mở, công thức cần đổi, dữ liệu nguồn lỗi. Câu hỏi không phải "làm sao để không bao giờ sai" (bất khả thi), mà là **"khi nó sai, ai phát hiện, ai sửa, và đổi định nghĩa thì báo cho ai?"**

Không có quy trình này, đổi định nghĩa thành thảm họa thầm lặng: một người đổi cách tính "tỷ lệ chuyển đổi" trong file của họ, ba phòng khác vẫn dùng cách cũ, và con số trên các dashboard lệch nhau mà không ai biết vì sao — đúng cảnh mở đầu bài. Quy trình đổi định nghĩa nhẹ cho SME chỉ cần ba bước:

1. **Đề xuất gửi owner** — ai muốn đổi cách tính một metric, nói với owner của metric đó, không tự sửa file riêng.
2. **Owner chốt và sửa một chỗ** — sửa định nghĩa tại Semantic Layer, nơi mọi báo cáo cùng đọc.
3. **Báo người dùng** — nhắn một dòng "từ hôm nay doanh thu thuần đã trừ thêm phí sàn" để cả công ty biết số nhảy là do đổi định nghĩa, không phải kinh doanh sụt.

Ba bước. Không hội đồng, không biểu mẫu. Nhưng có nó, số sai không còn trôi đi trong im lặng.

## Data governance trong Semantix

Semantix không bán cho bạn "một bộ quy trình governance" — vì bộ quy trình nằm trên giấy thì SME nào cũng bỏ xó. Thay vào đó, bốn trụ được **cài thẳng vào chỗ bạn làm việc với số**, để governance là thứ tự nhiên xảy ra chứ không phải việc phải nhớ làm.

1. **Owner gắn vào metric** — mỗi chỉ số trong Studio có một người chủ và một định nghĩa chốt; muốn đổi phải qua owner, không ai lặng lẽ sửa.
2. **Phân quyền tại tầng dữ liệu** — RLS định nghĩa "phần của tôi" một lần, áp cho mọi báo cáo và mọi câu hỏi tiếng Việt; lọc tại nguồn trước khi dữ liệu rời server.
3. **Định nghĩa sống ở Semantic Layer** — một nơi duy nhất giữ "doanh thu nghĩa là gì"; sửa một chỗ, cả công ty cập nhật theo.

Nói cách khác, Semantix không phải "một dashboard có thêm tính năng phân quyền", mà là hạ tầng để mỗi con số luôn có chủ, có định nghĩa, và có người chịu trách nhiệm — bốn trụ governance, không phải bốn cuốn sổ tay.

## Tóm lại

| Không có governance (số vô chủ) | Có governance nhẹ (số có chủ) |
|---|---|
| Ai cũng dùng số, không ai sở hữu | Mỗi metric một owner có tên |
| Số sai trôi đi, không ai chịu trách nhiệm | Có quy trình ai sửa, sửa thế nào |
| Mỗi file một định nghĩa, lệch âm thầm | Một định nghĩa chung ở Semantic Layer |
| Mở hết thì lộ, khoá hết thì tắc | Phân quyền theo hàng (RLS), mở mà an toàn |
| "Bài bản" = hội đồng + 40 trang quy trình | "Bài bản" = bốn câu hỏi trả lời gọn |

> Mental model: data governance cho SME không phải bộ máy — nó là việc gắn một cái tên vào mỗi con số. Hỏi về bất kỳ chỉ số nào trong công ty bạn: "ai chốt nó, ai được xem nó, định nghĩa ở đâu, sai thì ai sửa?" Trả lời trơn được bốn câu là số có chủ. Ậm ừ một câu là số đang vô chủ — và số vô chủ sớm muộn cũng phản bội bạn trong một cuộc họp thứ Hai.

---

*Muốn mỗi con số trong công ty đều có chủ và có định nghĩa chung thay vì năm cách tính? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Một nguồn sự thật nghĩa là gì](/blog/mot-nguon-su-that/).*
