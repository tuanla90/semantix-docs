---
title: "Input vs output metrics: cả công ty nhìn doanh thu mỗi sáng - nhưng đó là nút bạn không bấm được"
code: "pt-054"
description: "Doanh thu là kết quả của những việc làm hôm qua, không phải cái bạn bấm nút thay đổi hôm nay. Muốn lái được kết quả, hãy ám ảnh với chỉ số đầu vào."
pubDate: 2025-12-08
category: "Phân Tích Dữ Liệu"
series: "hieu-chi-so"
seriesOrder: 4
readTime: 9
author: "Lê Anh Tuấn"
featured: false
cover: "/blog/covers/input-vs-output-metrics.svg"
coverAlt: "Các nút bấm input lái được nối bằng mũi tên tới một đồng hồ output đo doanh thu"
---

<div class="series-nav">
  <div class="series-nav-title">🧭 Series Hiểu chỉ số · 6 phần</div>
  <ol>
    <li><a href="/blog/4-loai-thang-do-du-lieu/">Phần 1 - 4 loại thang đo</a></li>
    <li><a href="/blog/chi-so-dong-chay-vs-diem/">Phần 2 - Dòng chảy vs điểm</a></li>
    <li><a href="/blog/dong-tien-vs-loi-nhuan/">Phần 3 - Dòng tiền vs lợi nhuận</a></li>
    <li class="current">Phần 4 - Input vs output metrics</li>
    <li><a href="/blog/business-metrics-vs-customer-metrics/">Phần 5 - Chỉ số DN vs khách hàng</a></li>
    <li><a href="/blog/ne-so-lieu-bat-tien/">Phần 6 - 6 cách né số bất tiện</a></li>
  </ol>
</div>

Mỗi sáng, cả công ty mở cùng một con số: **doanh thu hôm qua**. Sếp nhìn, trưởng phòng nhìn, cả nhóm chat nhìn. Nó tụt thì cau mày, nó lên thì thở phào. Nhưng có một sự thật ít người chịu nhìn thẳng: **doanh thu là thứ bạn không bấm nút thay đổi được trực tiếp.**

Bạn không thể "quyết định" hôm nay doanh thu tăng 10%. Con số đó là *kết quả* của hàng loạt việc bạn đã làm - hoặc quên làm - từ hôm qua, tuần trước, tháng trước. Dán mắt vào nó mỗi sáng giống như đứng nhìn nhiệt kế và mong nó tự hạ sốt. Nhiệt kế không phải chỗ bạn tác động được.

Phản xạ tự nhiên là theo dõi cái rõ ràng nhất, "thật" nhất. Nhưng cái rõ ràng nhất thường lại là cái bạn lái được ít nhất.

## Output bạn muốn, input bạn lái

Mọi chỉ số rơi vào hai nhóm.

**Output metric** *(chỉ số đầu ra - kết quả cuối cùng bạn muốn đạt)* là đích đến: doanh thu, lợi nhuận, thị phần. Đây là thứ làm bạn vui hay buồn - nhưng bạn không *trực tiếp* điều khiển được nó. Nó có **độ trễ**: phản ánh việc đã làm, không phải việc đang làm.

**Input metric** *(chỉ số đầu vào - số việc cụ thể bạn làm được hôm nay, dẫn tới output)* là những thứ trong tầm tay bạn *ngay hôm nay*: số khách được tư vấn, tốc độ giao hàng, số mã hết hàng được bổ sung lại lên kệ, số cuộc gọi chăm sóc khách cũ. Bạn bấm được vào chúng. Bạn quyết được chúng tăng hay giảm.

Cách phân chia này không phải tôi nghĩ ra. Amazon vận hành cả tập đoàn quanh khái niệm **controllable input metrics** *(controllable - lái được, điều khiển được)*: thay vì ám ảnh giá cổ phiếu hay doanh thu (output không kiểm soát trực tiếp), từng đội tập trung vào nhúm input họ thật sự bấm được - và tin rằng nếu chăm đúng input, output sẽ tự đến.

> Quy tắc vàng: bạn không quản được cái bạn không bấm được. Hãy ám ảnh với những input bạn lái được hôm nay, rồi để output là hệ quả.

## Vì sao ám ảnh output gây bất lực

Nhìn nhiệt kế cả ngày không làm hạ cơn sốt. Bạn cần thuốc, nước, nghỉ ngơi - những *input*. Nhiệt độ chỉ là *output* báo cho bạn biết các input kia có hiệu quả hay chưa.

Khi cả đội chỉ chăm chăm output, ba chuyện xảy ra. Một, **bất lực tập thể**: con số xấu hiện ra nhưng không ai biết đúng việc gì hôm nay sẽ làm nó tốt lên - vì doanh thu không có "nút" trực tiếp. Hai, **đổ lỗi cho thị trường**: vì input không được đặt lên bàn, người ta quy hết cho "Tết năm nay yếu", "khách thắt chặt chi tiêu". Ba, **phản ứng quá muộn**: lúc output rớt đủ rõ để báo động thì việc gây ra nó đã xảy ra từ nhiều tuần trước.

Đây cũng chính là lý do nhiều dashboard đẹp mà vô dụng: chúng trưng toàn output. Đọc xong biết mình *đang* thắng hay thua, nhưng không biết *làm gì* để đổi cục diện.

## Chọn input controllable đúng - đừng đo cái vô nghĩa

Hiểu ra điều này, cám dỗ tiếp theo là đo *mọi* thứ làm được trong ngày rồi gọi đó là "input". Sai. Một input metric đáng theo dõi phải vượt qua **hai cửa cùng lúc**:

1. **Thật sự lái được.** Có một hành động cụ thể trong tuần này tác động vào nó. "Tâm trạng thị trường" thì không - bỏ qua. "Số khách được tư vấn" thì có - bạn xếp ca, đào tạo, nhắc nhân viên là nó nhúc nhích.
2. **Thật sự dẫn tới output.** Nó phải có liên hệ nhân quả với kết quả bạn muốn. Đếm "số email nội bộ gửi đi mỗi ngày" thì lái được đấy - nhưng nó chẳng kéo doanh thu nào. Đó là một input *vô nghĩa*: bận rộn mà không sinh kết quả.

Thiếu cửa một, bạn có một [lagging indicator](/blog/leading-lagging-indicator/) đội lốt. Thiếu cửa hai, bạn có một dạng [vanity metric](/blog/vanity-metrics/) *(chỉ số đẹp mã nhưng không dẫn tới quyết định)* - con số leo lên đều đặn mà output đứng yên. Input đúng là giao điểm hẹp của cả hai: vừa bấm được, vừa thật sự đẩy kim đồng hồ output.

Một cách kiểm tra nhanh: nếu input bạn chọn tăng gấp đôi mà bạn *không* tin output sẽ nhúc nhích theo, bạn đã chọn nhầm.

## Ví dụ Việt: cặp input → output

Lý thuyết đủ rồi. Đây là cách nó trông ra sao ở những việc kinh doanh quanh ta *(các con số là ví dụ minh hoạ)*:

<div class="viz">
<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Segoe UI', Arial, sans-serif">
  <defs>
    <marker id="arrTree054" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#818CF8"/></marker>
  </defs>
  <text x="120" y="30" fill="#818CF8" font-size="15" font-weight="700" text-anchor="middle">INPUT • lái được hôm nay</text>
  <text x="580" y="30" fill="#4ADE80" font-size="15" font-weight="700" text-anchor="middle">OUTPUT • kết quả</text>
  <g font-size="14">
    <rect x="20" y="55" width="220" height="42" rx="9" fill="#1E293B" stroke="#818CF8"/>
    <text x="130" y="81" fill="#E2E8F0" text-anchor="middle">Số SP lên kệ đúng giờ vàng</text>
    <rect x="20" y="125" width="220" height="42" rx="9" fill="#1E293B" stroke="#818CF8"/>
    <text x="130" y="151" fill="#E2E8F0" text-anchor="middle">Thời gian chờ món</text>
    <rect x="20" y="195" width="220" height="42" rx="9" fill="#1E293B" stroke="#818CF8"/>
    <text x="130" y="221" fill="#E2E8F0" text-anchor="middle">Số mã hết hàng được bổ sung</text>
    <path d="M242 76 L470 76" stroke="#818CF8" stroke-width="2.5" fill="none" marker-end="url(#arrTree054)"/>
    <path d="M242 146 L470 146" stroke="#818CF8" stroke-width="2.5" fill="none" marker-end="url(#arrTree054)"/>
    <path d="M242 216 L470 216" stroke="#818CF8" stroke-width="2.5" fill="none" marker-end="url(#arrTree054)"/>
    <rect x="478" y="55" width="222" height="42" rx="9" fill="#0B1220" stroke="#4ADE80"/>
    <text x="589" y="81" fill="#4ADE80" text-anchor="middle">Số đơn shop</text>
    <rect x="478" y="125" width="222" height="42" rx="9" fill="#0B1220" stroke="#4ADE80"/>
    <text x="589" y="151" fill="#4ADE80" text-anchor="middle">Tỷ lệ khách quay lại</text>
    <rect x="478" y="195" width="222" height="42" rx="9" fill="#0B1220" stroke="#4ADE80"/>
    <text x="589" y="221" fill="#4ADE80" text-anchor="middle">Doanh thu</text>
  </g>
</svg>
<div class="viz-caption">Mỗi output đều có một input lái được đứng trước nó - số minh hoạ.</div>
</div>

**Shop đa kênh trên Shopee/TikTok Shop.** Output là *số đơn*. Nhưng số đơn không có nút bấm. Input lái được: **số sản phẩm được lên kệ đúng giờ vàng** (19h-22h). Nhân viên đăng đủ 30 mã trước 19h hay lác đác 8 mã lúc 21h là việc bạn quyết được hôm nay - và nó kéo theo đơn của tối nay.

**Quán F&B.** Output là *khách quay lại* và doanh thu tháng. Input lái được: **thời gian chờ món**. Khách chờ 8 phút khác hẳn khách chờ 25 phút. Bạn bấm được vào nó - thêm người bếp giờ cao điểm, cắt bớt món phức tạp khỏi menu trưa - và nó dẫn tới tỷ lệ quay lại, rồi mới tới doanh thu.

Để ý điểm chung: ở cả hai, người chủ *ngừng* hỏi "làm sao tăng doanh thu" (câu hỏi vô phương) và bắt đầu hỏi "hôm nay tôi đẩy được input nào". Đó là chỗ [phân tích phễu](/blog/funnel-analysis/) trở nên hữu ích - nó chỉ ra đúng input nào đang rò rỉ output.

## Khác leading indicator thế nào?

Nghe tới đây bạn sẽ nghĩ: "Vậy input metric chính là leading indicator à?". Gần, nhưng không trùng - và chỗ khác biệt rất đáng tiền.

Một **leading indicator** *(chỉ số báo trước - dự báo kết quả tương lai)* chỉ cần *báo trước* output. "Số lượt tìm kiếm thương hiệu" báo trước doanh thu khá tốt - nhưng bạn không trực tiếp bật tắt được nó. Nó leading, nhưng không controllable.

Input metric đòi hỏi *cả hai*: vừa **báo trước** output, vừa để bạn **trực tiếp điều khiển**. Mọi input tốt đều là leading indicator; nhưng không phải leading indicator nào cũng là input bạn lái được. Bài [leading vs lagging](/blog/leading-lagging-indicator/) đào sâu trục thời gian (trước/sau); bài này đào trục quyền lực (bấm được/không bấm được). Cái bạn thật sự muốn nằm ở giao của cả hai.

## ... trong Semantix

Vấn đề thực tế: input metric phải theo dõi **hằng ngày** mới có nghĩa, còn output thì cuối tháng mới chốt sổ. Mà ít ai đủ kỷ luật mở báo cáo mỗi sáng để đếm "số SP lên kệ đúng giờ vàng".

Đây là chỗ Semantix không phải một con bot đọc thuộc doanh thu hôm qua. Bạn định nghĩa input metric của mình **một lần** trong tầng ngữ nghĩa - "số mã lên kệ trước 19h", "thời gian chờ món trung bình" - rồi hỏi lại mỗi sáng bằng tiếng Việt. Quan trọng hơn, bạn đặt **cảnh báo** trên chính *input*, không chỉ output: khi số SP lên kệ tối qua tụt dưới ngưỡng, Semantix [bắn thông báo qua Telegram/Zalo](/blog/bao-cao-telegram-zalo/) ngay sáng - để bạn sửa cái nút bấm được, *trước* khi nó kịp kéo doanh thu cuối tháng đi xuống.

## Tóm lại

| Output metric (kết quả) | Input metric controllable (lái được) |
|---|---|
| Doanh thu, lợi nhuận, thị phần | Số khách tư vấn, tốc độ giao, số mã bổ sung |
| Bạn *muốn* nó | Bạn *bấm* được nó |
| Có độ trễ - phản ánh việc đã làm | Đo được hôm nay - là việc đang làm |
| Không có nút điều khiển trực tiếp | Có một hành động cụ thể trong tuần này |
| Cái nhiệt kế | Thuốc, nước, nghỉ ngơi |
| Chốt sổ cuối tháng | Theo dõi hằng ngày |

Đừng dán mắt vào nhiệt kế và mong nó tự hạ sốt. Con số làm bạn lo lắng mỗi sáng không phải con số bạn thay đổi được - hãy đi tìm nhúm input đứng *trước* nó, kiểm tra nó qua hai cửa (lái được + dẫn tới output), rồi ám ảnh với việc đẩy nó lên mỗi ngày. Output sẽ tự đến sau.

---

*Muốn theo dõi input metric mỗi sáng thay vì chờ output cuối tháng? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [leading vs lagging indicator](/blog/leading-lagging-indicator/) để phân biệt cái báo trước với cái đã rồi.*
