---
title: "Inmon vs Kimball: xây kho dữ liệu từ trên xuống, hay từ dưới lên?"
code: "kt-045"
description: "Kimball dựng nhanh từng phòng ban rồi ghép lại. Inmon dựng một kho chuẩn hoá cho cả công ty trước, rồi mới chia. Hai triết lý trái ngược — chọn sai có thể tốn hàng năm."
pubDate: 2027-07-31
category: "Kiến Thức Nền Tảng"
series: "thiet-ke-kho-du-lieu"
seriesOrder: 4
readTime: 10
author: "Lê Anh Tuấn"
authorTitle: "Nhà sáng lập Semantix"
featured: false
cover: "/blog/covers/inmon-vs-kimball.svg"
coverAlt: "Hai cách dựng kho dữ liệu: Inmon từ trên xuống (một kho trung tâm chia ra data mart) và Kimball từ dưới lên (các data mart ghép lại)"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Thiết kế kho dữ liệu · 9 phần</div>
  <ol>
    <li><a href="/blog/dimension-table-vs-dimension/">Phần 1 — Dimension vs Dimension table</a></li>
    <li><a href="/blog/star-vs-snowflake-schema/">Phần 2 — Star vs Snowflake schema</a></li>
    <li><a href="/blog/kimball-dimensional-modeling/">Phần 3 — Kimball: mô hình chiều</a></li>
    <li class="current">Phần 4 — Inmon vs Kimball</li>
    <li><a href="/blog/scd-slowly-changing-dimension/">Phần 5 — SCD: chiều thay đổi chậm</a></li>
    <li><a href="/blog/snapshot-table/">Phần 6 — Snapshot &amp; 3 loại fact</a></li>
    <li><a href="/blog/olap-cube-drill-pivot/">Phần 7 — OLAP cube: drill &amp; pivot</a></li>
    <li><a href="/blog/data-quality-la-gi/">Phần 8 — Data quality: 6 chiều</a></li>
    <li><a href="/blog/data-mart-la-gi/">Phần 9 — Data mart cho từng phòng</a></li>
  </ol>
</div>


Ở [phần trước](/blog/kimball-dimensional-modeling/), chúng ta gặp Ralph Kimball: dựng từng *data mart* (kho dữ liệu nhỏ phục vụ một phòng ban) theo mô hình chiều, rồi ghép dần lại. Nhanh, thực dụng, hợp với người cần câu trả lời sớm. Nhưng có một trường phái đối lập — và nó không sai, chỉ là chọn một điểm bắt đầu khác hẳn.

Người đứng đầu trường phái đó là **Bill Inmon**, thường được gọi là "cha đẻ của data warehouse". Triết lý của ông gói trong một câu: **đừng chia trước khi hợp nhất.** Xây cho cả công ty *một* kho dữ liệu chuẩn hoá, tích hợp, làm nguồn sự thật duy nhất — rồi *sau đó* mới rút ra các data mart cho từng phòng. Từ trên xuống, không phải từ dưới lên.

## Hai triết lý, hai chiều dựng ngược nhau

Khác biệt cốt lõi nằm ở **thứ tự** bạn làm việc, không phải ở công cụ.

- **Inmon — từ trên xuống (top-down).** Trước tiên dựng **Enterprise Data Warehouse (EDW — kho dữ liệu cấp doanh nghiệp)**: gom mọi nguồn, làm sạch, tích hợp, lưu ở dạng **chuẩn hoá (normalized — mỗi sự thật một chỗ, hạn chế trùng lặp)**. Kho này không phải để người dùng cuối hỏi trực tiếp; nó là *nền móng*. Từ nền đó, bạn rút ra các data mart dạng chiều cho marketing, bán hàng, kế toán.
- **Kimball — từ dưới lên (bottom-up).** Bắt đầu thẳng bằng một data mart dạng chiều (star schema) cho đúng phòng đang cần. Rồi mart thứ hai, thứ ba, gắn kết với nhau qua [bus matrix](/blog/kimball-dimensional-modeling/) (bộ dimension dùng chung). "Kho doanh nghiệp" hiện ra dần như tổng của các mart.

<div class="viz">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <!-- Inmon -->
  <text x="170" y="30" fill="#6366F1" font-size="15" font-weight="800" text-anchor="middle">INMON · trên → xuống</text>
  <rect x="60" y="46" width="220" height="40" rx="8" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5"/>
  <text x="170" y="71" fill="#3730A3" font-size="13" font-weight="700" text-anchor="middle">1· Kho doanh nghiệp (chuẩn hoá)</text>
  <path d="M110 86 L92 120" stroke="#94A3B8" stroke-width="1.8"/><path d="M88 112 L90 124 L98 118 Z" fill="#94A3B8"/>
  <path d="M170 86 L170 120" stroke="#94A3B8" stroke-width="1.8"/><path d="M166 112 L170 124 L174 112 Z" fill="#94A3B8"/>
  <path d="M230 86 L248 120" stroke="#94A3B8" stroke-width="1.8"/><path d="M242 118 L250 124 L252 112 Z" fill="#94A3B8"/>
  <rect x="56" y="124" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="92" y="146" fill="#64748B" font-size="11" text-anchor="middle">2· mart</text>
  <rect x="134" y="124" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="170" y="146" fill="#64748B" font-size="11" text-anchor="middle">2· mart</text>
  <rect x="212" y="124" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="248" y="146" fill="#64748B" font-size="11" text-anchor="middle">2· mart</text>
  <!-- Kimball -->
  <text x="510" y="30" fill="#16A34A" font-size="15" font-weight="800" text-anchor="middle">KIMBALL · dưới → lên</text>
  <rect x="396" y="46" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="432" y="68" fill="#64748B" font-size="11" text-anchor="middle">1· mart</text>
  <rect x="474" y="46" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="510" y="68" fill="#64748B" font-size="11" text-anchor="middle">1· mart</text>
  <rect x="552" y="46" width="72" height="34" rx="6" fill="#F1F5F9"/><text x="588" y="68" fill="#64748B" font-size="11" text-anchor="middle">1· mart</text>
  <path d="M432 80 L450 116" stroke="#94A3B8" stroke-width="1.8"/><path d="M444 108 L452 120 L454 106 Z" fill="#94A3B8"/>
  <path d="M510 80 L510 116" stroke="#94A3B8" stroke-width="1.8"/><path d="M506 92 L510 80 L514 92 Z" fill="#94A3B8"/>
  <path d="M588 80 L570 116" stroke="#94A3B8" stroke-width="1.8"/><path d="M566 106 L568 120 L576 108 Z" fill="#94A3B8"/>
  <rect x="398" y="120" width="220" height="40" rx="8" fill="#F0FDF4" stroke="#22C55E" stroke-width="1.5"/>
  <text x="508" y="145" fill="#15803D" font-size="13" font-weight="700" text-anchor="middle">2· Bức tranh toàn công ty</text>
  <text x="340" y="210" fill="#475569" font-size="13.5" text-anchor="middle" font-weight="600">Cùng một đích đến — một nguồn sự thật cho cả công ty.</text>
  <text x="340" y="232" fill="#64748B" font-size="13" text-anchor="middle">Inmon hợp nhất trước rồi chia; Kimball chia trước rồi gắn kết dần.</text>
</svg>
<div class="viz-caption">Không phải cái nào "đúng" — chúng đi tới cùng một đích bằng hai con đường ngược chiều. Cái khác nhau là bạn trả giá <em>trước</em> hay <em>sau</em>.</div>
</div>

## Inmon đánh đổi gì để được gì

Cái Inmon mua được bằng việc hợp nhất trước là **tính nhất quán ở quy mô lớn**. Vì mọi data mart đều rút ra từ *một* kho chuẩn hoá đã được làm sạch và định nghĩa thống nhất, bạn rất khó rơi vào cảnh "ba phòng ba con số" — thứ mà tôi đã kể ở [một nguồn sự thật](/blog/mot-nguon-su-that/). Định nghĩa "khách hàng", "doanh thu" được chốt *một lần ở tầng nền*, mọi mart kế thừa.

Cái giá phải trả: **chậm thấy giá trị.** Bạn phải dựng xong (hoặc gần xong) cái nền chuẩn hoá trước khi phòng đầu tiên có dashboard để dùng. Với một SME cần câu trả lời trong tháng này, đó là một sự chờ đợi xa xỉ. Đây cũng đúng là lý do Kimball thắng thế ở phần lớn doanh nghiệp vừa và nhỏ: *giá trị sớm* quan trọng hơn *sự hoàn hảo về cấu trúc*.

| | **Inmon (top-down)** | **Kimball (bottom-up)** |
|---|---|---|
| Bắt đầu bằng | Kho doanh nghiệp chuẩn hoá | Data mart dạng chiều |
| Lưu trữ lõi | Chuẩn hoá (3NF) | Phi chuẩn hoá (star schema) |
| Thời gian tới giá trị | Chậm — dựng nền trước | **Nhanh — có mart là dùng** |
| Nhất quán toàn công ty | **Cao từ đầu** | Tăng dần, cần kỷ luật bus matrix |
| Chi phí & đội ngũ | Lớn, cần chuyên môn sâu | Vừa, linh hoạt |
| Hợp với | Doanh nghiệp lớn, ngành chặt chẽ | **Phần lớn SME, đội mỏng** |

## Tôi gặp Inmon ở đâu trong thực tế

Inmon nghe có vẻ "hàn lâm", nhưng tôi đụng nó mỗi ngày. Hiện tôi làm BI ở một ngân hàng, và kho dữ liệu lõi ở đó về bản chất là tư duy Inmon: một tầng nền chuẩn hoá, tích hợp dữ liệu từ corebanking, thẻ, tín dụng, kênh số — rồi mới chia ra các vùng phục vụ báo cáo. Lý do không phải vì ai đó thích lý thuyết, mà vì **ngành ngân hàng buộc phải truy vết và đối soát**: cùng một con số phải nhất quán giữa báo cáo nội bộ và báo cáo cho cơ quan quản lý, và phải giải thích được nó đến từ đâu. Trong bối cảnh đó, "dựng nhanh từng mart rồi tính sau" là một rủi ro, không phải một lối tắt.

Nhưng tôi cũng đã làm tư vấn cho nhiều doanh nghiệp nhỏ — một xưởng may, một phòng khám — và ở đó mà bê nguyên Inmon vào thì đúng là tự bắn vào chân: dựng cả một EDW chuẩn hoá cho một công ty 20 người là **over-engineer** kinh điển. Bài học của tôi gói gọn: *quy mô và mức độ ràng buộc của ngành quyết định bạn nghiêng về phía nào* — không phải sở thích kỹ thuật.

## Vậy SME nên chọn gì?

Gần như luôn là **Kimball** — hoặc đúng hơn, là *tư duy Kimball*: đừng dựng cả một kho doanh nghiệp đồ sộ, hãy mô hình hoá đúng câu hỏi bạn đang cần trả lời, bằng [fact và dimension](/blog/data-modeling-fact-dimension/), trên một [star schema](/blog/star-vs-snowflake-schema/) gọn gàng. Bạn lấy được 80% giá trị với 20% công sức, và quan trọng nhất: bạn *bắt đầu được ngay tuần này*.

Inmon trở nên đáng cân nhắc khi bạn lớn lên tới mức: nhiều nguồn dữ liệu phải đối soát chéo, nhiều phòng ban dễ "trôi" định nghĩa khỏi nhau, hoặc ngành của bạn đòi hỏi truy vết chặt (tài chính, y tế, bảo hiểm). Lúc đó, cái nền chuẩn hoá không còn là xa xỉ — nó là phanh an toàn.

> **Mental model:** Inmon và Kimball không phải "đúng vs sai" — chúng là "trả giá trước vs trả giá sau". Inmon trả công sức trước để mua sự nhất quán về sau. Kimball trả tốc độ trước và mua sự nhất quán dần bằng kỷ luật. SME hầu như nên đi Kimball; doanh nghiệp lớn, ngành chặt chẽ thì cái nền Inmon đáng đồng tiền.

## Semantix đứng ở đâu giữa hai trường phái

Tin tốt cho SME: với một sản phẩm như Semantix, bạn **không phải tự dựng kho nào theo phái nào.** Dù dữ liệu của bạn đang nằm trong một mart Kimball gọn nhẹ hay một EDW chuẩn hoá kiểu Inmon, [Semantic Layer](/blog/semantic-layer/) ngồi *bên trên* cả hai — nơi bạn định nghĩa "doanh thu", "khách hàng hoạt động" một lần và hỏi bằng tiếng Việt. Triết lý kho dữ liệu là chuyện của tầng dưới; còn việc cả công ty cùng đọc một con số là chuyện của tầng định nghĩa. Bạn lo tầng định nghĩa, để Semantix lo phần còn lại.

---

*Không muốn sa lầy vào tranh luận Inmon hay Kimball mà vẫn cần cả công ty ra cùng một số? [Dùng thử Semantix miễn phí với Google Sheets.](/docs/vi/free-trial/) Và đọc tiếp [Phần 5 — SCD: khi một chiều thay đổi theo thời gian](/blog/scd-slowly-changing-dimension/).*
