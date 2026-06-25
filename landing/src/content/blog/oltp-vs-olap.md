---
title: "OLTP vs OLAP: vì sao đừng chạy báo cáo nặng thẳng trên database bán hàng"
code: "kt-013"
description: "Bạn chạy báo cáo doanh thu đúng lúc cao điểm sale — và cả app bán hàng treo theo. Không phải vì báo cáo sai, mà vì bạn hỏi nhầm chỗ."
pubDate: 2027-10-19
category: "Kiến Thức Nền Tảng"
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/oltp-vs-olap.svg"
coverAlt: "Database giao dịch với nhiều ghi nhỏ đặt cạnh database phân tích tổng hợp lớn, hai luồng được tách riêng"
---

Đợt sale 9.9 năm ngoái, một chuỗi điện máy ở Hà Nội kể lại buổi sáng đáng nhớ nhất của họ. Đơn về ầm ầm, quầy bận tối mặt — đúng lúc đó kế toán cần một con số gấp, nên mở thẳng phần mềm bán hàng ra chạy một báo cáo "doanh thu theo mã hàng, theo chi nhánh, từ đầu năm tới giờ". Báo cáo chạy. Và rồi cả hệ thống bán hàng *khựng lại*: máy ở quầy quay vòng vòng, nhân viên không lên được đơn, khách xếp hàng đứng chờ. Một câu truy vấn báo cáo, ngay giờ cao điểm, suýt làm sập cả buổi sale.

Phản xạ đầu tiên là trách cái máy chủ "yếu", hoặc trách phần mềm "dở". Nhưng đây mới là chỗ nghịch lý: báo cáo đó *không sai*, máy chủ đó *không yếu*. Vấn đề là bạn vừa bắt một hệ thống sinh ra để **ghi từng đơn thật nhanh** đi làm cái việc nó dở nhất — **tổng hợp cả núi dữ liệu cùng lúc**. Hai việc đó có tên riêng trong giới làm dữ liệu: **OLTP** và **OLAP**. Hiểu khác biệt này, bạn sẽ không bao giờ vô tình làm treo app bán hàng vì một cái báo cáo nữa.

## OLTP và OLAP là gì — nói cho người làm kinh doanh hiểu

Bỏ thuật ngữ sang một bên trước, rồi gắn tên sau.

**OLTP (Online Transaction Processing — hệ xử lý giao dịch trực tuyến)** là bộ não chạy *việc vận hành hằng ngày*: phần mềm bán hàng, app đặt đơn, hệ thống kho. Việc của nó là **ghi và sửa từng dòng thật nhanh, thật chính xác**: ghi một đơn, trừ một món tồn kho, cập nhật một trạng thái giao hàng. Cái **database vận hành** (hay database sản xuất — cơ sở dữ liệu đang trực tiếp chạy hoạt động kinh doanh thật) phía sau KiotViet, phía sau app bán hàng của bạn — đó là một hệ OLTP. Nó được tối ưu để hàng nghìn thao tác nhỏ chen nhau cùng lúc mà không vấp.

**OLAP (Online Analytical Processing — hệ xử lý phân tích trực tuyến)** thì ngược lại: nó sinh ra để *trả lời câu hỏi phân tích*. Tổng hợp, cắt lát theo nhiều chiều — doanh thu theo mã hàng, theo chi nhánh, theo tháng, so với năm ngoái. Chính cái việc xoay-cắt nhiều chiều này có hẳn bộ thao tác riêng đáng biết, đào sâu trong bài [OLAP cube: drill down, pivot, slice & dice](/blog/olap-cube-drill-pivot/). Nó không quan tâm ghi từng đơn nhanh thế nào; nó quan tâm quét và gộp hàng triệu dòng để ra một bảng tổng cho ra hồn.

> Quy tắc vàng: OLTP giỏi *ghi nhanh từng dòng*, OLAP giỏi *đọc và gộp cả khối*. Bắt cái này làm việc của cái kia, cái nào cũng chậm.

Nói cách khác: OLTP là quầy thu ngân — phục vụ từng khách thật nhanh. OLAP là phòng kế toán cuối tháng — ngồi cộng sổ của cả chuỗi. Bạn không bắt thu ngân vừa tính tiền cho khách vừa lập báo cáo tài chính năm, đúng không? Database của bạn cũng vậy.

Cái trực giác này tôi không học từ sách, mà từ việc tự tay xây database cho khách job ngoài — một xưởng may, một phòng khám, vài shop kho và xuất nhập khẩu. Khi ngồi thiết kế bảng cho nghiệp vụ "ghi đơn, trừ tồn, đổi trạng thái", tôi tổ chức dữ liệu theo một kiểu; nhưng đến lúc khách hỏi "tháng này so tháng trước thế nào", tôi nhận ra cái cấu trúc tối ưu cho ghi nhanh lại cồng kềnh khủng khiếp khi đi tổng hợp. Cùng một bộ dữ liệu, hai cách tổ chức cãi nhau — chính là OLTP và OLAP đang kéo về hai phía.

## Vì sao chạy báo cáo nặng trên OLTP lại làm treo việc bán hàng

Hình dung database vận hành như một quầy thu ngân duy nhất, đông khách. Mỗi đơn hàng là một khách bước tới: ghi nhanh, vài phần nghìn giây, xong, next. Cả hệ thống được thiết kế để cái hàng này *chảy* — không ai phải đợi lâu.

Bây giờ bạn chen vào một câu báo cáo "doanh thu toàn chuỗi từ đầu năm". Câu này bắt quầy thu ngân *đi quét từng dòng* trong cả triệu giao dịch, cộng dồn, nhóm lại. Trong lúc nó cặm cụi quét, nó *giữ tài nguyên* — bộ nhớ, ổ đĩa, có khi cả khóa trên bảng dữ liệu. Hàng khách thật phía sau? Đứng chờ. Đó chính là cảnh máy ở quầy quay vòng vòng trong câu chuyện đầu bài.

Điểm chí mạng: tác hại này **chỉ lộ ra đúng lúc bạn ít muốn nhất** — giờ cao điểm. Lúc vắng, chạy báo cáo nặng có thể chẳng ai để ý. Nhưng đúng đợt sale, đúng cao điểm trưa, khi database vận hành đang gồng để lên đơn, thì một truy vấn phân tích nặng chen vào là giọt nước tràn ly. Nó không làm *sai* số bán hàng — nó làm *chậm* việc bán hàng, và với một SME (Small &amp; Medium Enterprise — doanh nghiệp nhỏ và vừa) thì một giờ quầy đứng hình ngày sale là tiền thật chảy ra cửa.

Và chiều ngược lại cũng đúng, dù ít đau hơn: OLTP *không tối ưu* cho câu hỏi phân tích phức tạp. Cùng một báo cáo, chạy trên hệ phân tích đúng nghĩa mất vài giây; chạy thẳng trên database vận hành có khi mất vài phút — vừa lâu cho bạn, vừa hành cả hệ thống. Bạn đang dùng sai công cụ cho sai việc, cả hai đầu.

## Tách tải: đừng bắt một cái database làm hai việc cãi nhau

Lời giải không phải là "đừng chạy báo cáo nữa". Lời giải là **tách tải** (tách luồng phân tích ra khỏi luồng vận hành) — để câu hỏi phân tích nặng *không bao giờ* chạm vào database đang lên đơn. Có vài cách, từ rẻ tới bài bản:

<div class="viz">
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif"><rect width="720" height="320" rx="12" fill="#0F172A"/><text x="32" y="40" fill="#94A3B8" font-size="14" font-weight="700" letter-spacing="1">CÙNG MỘT DB: TẢI CÃI NHAU</text><text x="412" y="40" fill="#94A3B8" font-size="14" font-weight="700" letter-spacing="1">TÁCH TẢI: AI VIỆC NẤY</text><line x1="360" y1="24" x2="360" y2="296" stroke="#1E293B" stroke-width="1.5"/><g transform="translate(32,70)"><rect x="0" y="40" width="120" height="46" rx="8" fill="#162033" stroke="#FBBF24" stroke-width="1.5"/><text x="60" y="62" fill="#FBBF24" font-size="13" font-weight="700" text-anchor="middle">App bán hàng</text><text x="60" y="78" fill="#64748B" font-size="11" text-anchor="middle">ghi đơn</text><rect x="0" y="120" width="120" height="46" rx="8" fill="#162033" stroke="#F97316" stroke-width="1.5"/><text x="60" y="142" fill="#F97316" font-size="13" font-weight="700" text-anchor="middle">Báo cáo nặng</text><text x="60" y="158" fill="#64748B" font-size="11" text-anchor="middle">tổng hợp</text><ellipse cx="232" cy="98" rx="34" ry="14" fill="#1E293B" stroke="#475569" stroke-width="1.5"/><path d="M198 98 L198 150 A34 14 0 0 0 266 150 L266 98" fill="#0B1120" stroke="#475569" stroke-width="1.5"/><ellipse cx="232" cy="150" rx="34" ry="14" fill="#1E293B" stroke="#475569" stroke-width="1.5"/><text x="232" y="128" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">OLTP</text><path d="M120 63 L196 100" stroke="#FBBF24" stroke-width="2"/><path d="M120 143 L196 138" stroke="#F97316" stroke-width="2"/><text x="232" y="196" fill="#F87171" font-size="13" font-weight="700" text-anchor="middle">treo</text></g><g transform="translate(412,70)"><rect x="0" y="40" width="120" height="46" rx="8" fill="#162033" stroke="#FBBF24" stroke-width="1.5"/><text x="60" y="62" fill="#FBBF24" font-size="13" font-weight="700" text-anchor="middle">App bán hàng</text><text x="60" y="78" fill="#64748B" font-size="11" text-anchor="middle">ghi đơn</text><ellipse cx="226" cy="40" rx="30" ry="12" fill="#1E293B" stroke="#475569" stroke-width="1.5"/><path d="M196 40 L196 84 A30 12 0 0 0 256 84 L256 40" fill="#0B1120" stroke="#475569" stroke-width="1.5"/><ellipse cx="226" cy="84" rx="30" ry="12" fill="#1E293B" stroke="#475569" stroke-width="1.5"/><text x="226" y="66" fill="#94A3B8" font-size="11" font-weight="700" text-anchor="middle">OLTP</text><path d="M120 60 L194 56" stroke="#FBBF24" stroke-width="2"/><rect x="0" y="140" width="120" height="46" rx="8" fill="#162033" stroke="#34D399" stroke-width="1.5"/><text x="60" y="162" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">Báo cáo nặng</text><text x="60" y="178" fill="#64748B" font-size="11" text-anchor="middle">tổng hợp</text><ellipse cx="226" cy="148" rx="30" ry="12" fill="#0B2A24" stroke="#34D399" stroke-width="1.5"/><path d="M196 148 L196 192 A30 12 0 0 0 256 192 L256 148" fill="#0B1F1A" stroke="#34D399" stroke-width="1.5"/><ellipse cx="226" cy="192" rx="30" ry="12" fill="#0B2A24" stroke="#34D399" stroke-width="1.5"/><text x="226" y="174" fill="#34D399" font-size="11" font-weight="700" text-anchor="middle">OLAP</text><path d="M120 160 L194 162" stroke="#34D399" stroke-width="2"/><path d="M226 96 L226 134" stroke="#22D3EE" stroke-width="2" stroke-dasharray="4 4"/><text x="300" y="120" fill="#22D3EE" font-size="11" text-anchor="middle">đồng bộ</text><text x="60" y="232" fill="#34D399" font-size="13" font-weight="700" text-anchor="middle">cả hai chạy mượt</text></g></svg>
<div class="viz-caption">Bên trái: app bán hàng và báo cáo nặng tranh nhau một database vận hành — cao điểm là treo. Bên phải: tách luồng phân tích sang một bản dữ liệu riêng, ai việc nấy.</div>
</div>

- **Read-replica (bản sao chỉ-đọc — một bản nhân của database vận hành, cập nhật theo gần thời gian thực, chỉ để đọc).** Bạn cho báo cáo chạy trên bản sao này thay vì bản gốc. App bán hàng ghi vào bản gốc, không bị ai quấy; báo cáo quét thoải mái trên bản sao mà không làm quầy đứng hình. Đây là cách rẻ và nhanh nhất để gỡ cơn đau cấp tính.
- **Đẩy sang warehouse (kho dữ liệu — một cơ sở dữ liệu riêng, tách hẳn khỏi hệ vận hành, được tối ưu cho phân tích).** Khi dữ liệu lớn hơn và bạn cần gộp nhiều nguồn, dữ liệu được đưa định kỳ sang một kho phân tích đúng nghĩa. Đây thường là một hệ thiên về OLAP. Chuyện *đưa* dữ liệu sang đó theo thứ tự nào lại là một câu hỏi riêng — đáng đọc [ETL vs ELT](/blog/etl-vs-elt/) trước khi quyết.
- **Một tầng phân tích riêng đặt phía trên.** Thay vì cho người dùng cắm thẳng vào database, bạn cho họ hỏi qua một tầng trung gian — tầng này biết phải lấy dữ liệu ở đâu (bản sao, kho) và *không bao giờ* cắm tải phân tích thô vào database sản xuất.

Khi nào *chưa* cần tách? Thành thật mà nói: nếu shop bạn còn nhỏ, dữ liệu ít — vài nghìn đơn, một câu báo cáo nặng nhất vẫn xong trong vài giây kể cả lúc đông — thì tạm chạy chung cũng được, không cần dựng gì cầu kỳ. Nhưng phải biết **ngưỡng đau**: ngày bạn nghe nhân viên quầy than "máy lag mỗi lần sếp xuất báo cáo", hoặc báo cáo bắt đầu mất vài phút thay vì vài giây — đó là lúc OLTP đang kêu cứu. Đừng đợi tới buổi sale mới phát hiện.

## OLTP/OLAP trong Semantix

Semantix **không** phải một con AI cắm thẳng vào database bán hàng của bạn rồi tha hồ quét. Định vị bằng phủ định cho rõ: nó không bắt bạn đánh đổi giữa "có báo cáo" và "app không treo". Cách tiếp cận đứng đúng về phía tách tải:

1. **Kết nối nguồn, gộp bằng [bảng ảo](/blog/bang-ao-gop-du-lieu/)** — Shopee, TikTok Shop, KiotViet, Google Sheets được nối rồi gộp lại ở tầng phân tích, thay vì bắt một database vận hành gánh cả tải báo cáo. Tải phân tích nằm ở chỗ của tải phân tích.
2. **Sinh SQL có kiểm soát, không thả rông.** Khi bạn hỏi bằng tiếng Việt, Semantix sinh câu truy vấn (SQL) đi qua tầng định nghĩa nghiệp vụ — [Semantic Layer](/blog/semantic-layer/) — chứ không để một câu truy vấn nặng tùy hứng đập thẳng vào hệ vận hành. Truy vấn có ranh giới, có ngữ cảnh, có kiểm soát.
3. **Trả số trong vài giây** mà không phải hy sinh quầy bán hàng — vì câu hỏi phân tích được chạy ở nơi tối ưu cho phân tích, không phải nơi tối ưu cho ghi đơn.

Nói gọn: ELT và warehouse là *một* lời giải cho bài toán tách tải; tầng phân tích có kiểm soát là *cách Semantix đảm bảo* bạn không vô tình cắm phân tích thô vào database sản xuất. Bạn vẫn hỏi thoải mái — app bán hàng vẫn chạy mượt.

## Tóm lại

| | OLTP — hệ giao dịch | OLAP — hệ phân tích |
|---|---|---|
| Mục đích | Chạy việc vận hành: ghi/sửa từng đơn | Trả lời câu hỏi: tổng hợp, cắt lát |
| Tối ưu cho | Nhiều ghi nhỏ, nhanh, đồng thời | Đọc và gộp khối lớn, nhiều chiều |
| Ví dụ | App bán hàng, KiotViet, hệ kho | Báo cáo doanh thu, dashboard, BI |
| Khi nào dùng | Lên đơn, trừ tồn, cập nhật trạng thái | Hỏi xu hướng, so sánh, tổng kết kỳ |

Lần tới khi bạn định mở phần mềm bán hàng ra chạy một báo cáo to đùng *ngay giờ cao điểm*, dừng lại một giây và hỏi: câu này là việc của OLTP hay của OLAP? Nếu nó là câu phân tích — tổng hợp, nhiều chiều, quét cả lịch sử — thì nó không nên chạy ở nơi đang lên đơn. Tách nó ra. Database bán hàng của bạn sẽ cảm ơn, và buổi sale tới sẽ không có ai đứng chờ vì một cái báo cáo.

> Mental model: database bán hàng là **quầy thu ngân** (OLTP) — phục vụ từng khách thật nhanh. Báo cáo phân tích là **phòng kế toán cuối kỳ** (OLAP) — ngồi cộng sổ cả chuỗi. Đừng bắt thu ngân vừa tính tiền cho khách vừa lập báo cáo năm; tách hai việc ra, cả hai cùng chạy ngon.

---

*Muốn hỏi dữ liệu bán hàng bằng tiếng Việt mà không sợ làm treo app lúc cao điểm? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [Data warehouse — khi nào SME thật sự cần một cái kho](/blog/data-warehouse-sme/).*
