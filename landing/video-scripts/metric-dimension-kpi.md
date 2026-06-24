---
slug: metric-dimension-kpi
videoCode: vkt-006
sourcePost: /blog/metric-dimension-kpi/
title: "Metric, Dimension, KPI: 3 từ ai cũng nói sai — và vì sao báo cáo cứ cãi nhau"
vbee_voice: "hn_male_manhdung_news_48k-fhg"   # ứng viên: thanhlong_talk / minhhoang_sg — nghe mẫu ở video-assets/, chốt 1
estDuration: "6:20"
author: "Lê Thị Hương"   # persona hướng dẫn gần gũi (khớp bài gốc)
---

> **Cách dùng file này:** mỗi BEAT sinh 1 file Vbee riêng (`audio/beat-NN.mp3`), chạy Whisper lấy timestamp từng từ, rồi dựng kinetic trong Remotion. Beat gắn ✂️ = render thêm bản 9:16 làm Short.
> **Quy tắc nhịp:** chỗ có `...` là khoảng lặng. Chữ **in đậm** trong On-screen = từ phát sáng/nhấn. Bài này là **kiến thức thuần** → beat Semantix giữ rất nhẹ, có thể bỏ khi xuất bản bản "pure-knowledge".

---

### BEAT 00 — Cold open: ba con số một cái tên  ·  KINETIC  ·  ⏱️ ~35s  ·  ✂️ SHORT-ABLE (clip #1 mạnh nhất)

**🎙️ Voiceover (đọc đúng từng chữ qua Vbee):**
> Sáng thứ Hai. Phòng họp. Sếp hỏi đúng một câu: "Doanh thu tháng này bao nhiêu?"
> Anh Sales đứng lên: bốn phẩy hai tỷ.
> Chị Kế toán liếc file của mình: ba phẩy tám tỷ.
> Cùng một công ty. Cùng một tháng. Hai con số.
> Sếp gõ bàn hỏi: ai sai?
> ... Câu trả lời ngược đời: không ai sai cả.

**🅰️ On-screen (chữ kinetic — nhấn từ khoá):**
- "Doanh thu tháng này?" (hiện như câu hỏi gõ ra)
- **4,2 tỷ** — nhãn *Sales* (xanh `#227FE1`)
- **3,8 tỷ** — nhãn *Kế toán* (amber `#FE9A00`)
- Hai số đập vào giữa màn, tia đỏ `#FF6467` nháy: **"AI SAI?"**
- Cú lật: chữ đỏ mờ đi, hiện trắng to: **KHÔNG AI SAI CẢ**

**🎬 Visual / b-roll:**
- Nền dark neutral (#0A0A0A) + lưới #383838 mờ. Hai "thẻ báo cáo" trượt vào từ trái/phải mang 2 con số, count-up từ 0.
- Khi "ai sai?": rung nhẹ (shake) + flash đỏ. Khi chốt: tất cả lặng, chỉ còn 1 dòng trắng giữa màn.

**✂️ Short note:** Đây là Short #1. Hook 3s = "Hai con số doanh thu — ai sai?". Caption chữ chạy theo giọng. Cuối short: "Vì sao? Xem trong video." Hashtag: #BI #dữliệu #doanhthu #SME #báocáo

---

### BEAT 01 — Khung Rubik: 3 từ, 3 việc khác nhau  ·  KINETIC  ·  ⏱️ ~50s  ·  —

**🎙️ Voiceover:**
> Lý do hai báo cáo lệch nhau, gần như không bao giờ là cộng sai.
> Mà là ba người đang gọi ba thứ khác nhau... bằng đúng một từ.
> Gỡ được nó chỉ cần hiểu đúng ba từ vựng: Metric, Dimension, và KPI.
> Hình dung dữ liệu của bạn như một khối Rubik.
> Metric là con số ghi trên mặt khối — thứ bạn muốn biết.
> Dimension là cách bạn xoay khối để nhìn con số đó từ một góc khác.
> KPI là vạch mục tiêu bạn kẻ lên tường — để biết con số đã chạm tới đó chưa.
> Cùng một khối. Xoay khác thì thấy khác. Treo mục tiêu khác thì đánh giá khác.

**🅰️ On-screen:**
- 3 chip trượt vào: **METRIC** · **DIMENSION** · **KPI**
- Khối Rubik 3D đơn giản hiện giữa màn; lần lượt highlight: mặt số (Metric) → xoay (Dimension) → vạch đứt nét xanh `#00BC7D` phía trên (KPI)

**🎬 Visual / b-roll:**
- Rubik low-poly, xoay mượt ease-out. Mỗi từ vựng sáng lên đồng bộ lúc Vbee đọc tên nó.
- Motif dashboard app: cột số (JetBrains Mono) + vạch KPI đứt nét xanh #00BC7D.

**✂️ Short note:** — (beat khung, không cắt riêng; nhưng dùng làm "intro 5s" ghép đầu các short kia nếu cần.)

---

### BEAT 02 — METRIC: con số mang một cái tên mơ hồ  ·  KINETIC  ·  ⏱️ ~55s  ·  ✂️ SHORT-ABLE

**🎙️ Voiceover:**
> Metric là một đại lượng đo được, gói trong một con số.
> Doanh thu. Số đơn. Số khách mới. Giá trị đơn trung bình.
> Hỏi "bao nhiêu" là trả lời được bằng một con số.
> Nghe đơn giản. Nhưng cái bẫy nằm ngay đây.
> Một metric chỉ rõ ràng khi định nghĩa của nó rõ ràng.
> "Doanh thu" — thử hỏi năm người trong công ty:
> Tính theo đơn đã chốt, hay đơn đã thu tiền? Có trừ đơn hoàn không? Có gồm phí ship không?
> Mỗi câu trả lời khác nhau... cho ra một con số khác nhau.
> Doanh thu của anh Sales: đã chốt, gồm ship, chưa trừ hoàn — bốn phẩy hai tỷ.
> Doanh thu của chị Kế toán: đã thu, trừ hoàn, không ship — ba phẩy tám tỷ.
> Không phải sai số. Là hai metric khác nhau... đeo chung một cái tên.

**🅰️ On-screen:**
- **METRIC = một con số đo được**
- Danh sách gõ ra: Doanh thu · Số đơn · Khách mới · AOV
- 4 câu hỏi bẫy hiện lần lượt (mỗi câu một dòng, từ khoá đỏ/cam): *đã chốt / đã thu* · *trừ hoàn?* · *gồm ship?*
- Hai "định nghĩa" tách đôi màn hình → **4,2 tỷ** vs **3,8 tỷ**
- Câu chốt sáng: **"2 metric khác nhau, chung 1 cái tên"**

**🎬 Visual / b-roll:**
- Một con số lớn ở giữa, rồi "nứt" làm hai khi các điều kiện (ship/hoàn) bật lên hai bên.
- Blockquote glow: *"Metric chưa có định nghĩa chung thì chưa phải con số — nó là cuộc cãi nhau đang chờ nổ."*

**✂️ Short note:** Short #2. Hook 3s = "Vì sao 'doanh thu' lại ra 2 con số?". Hashtag: #metric #dữliệu #BI #doanhthu

---

### BEAT 03 — DIMENSION: lát cắt biến con số thành câu chuyện  ·  KINETIC  ·  ⏱️ ~50s  ·  ✂️ SHORT-ABLE

**🎙️ Voiceover:**
> Nếu metric là con số, thì dimension là lát cắt — góc bạn xoay để nhìn.
> Bản thân dimension không phải con số. Nó là cách chia nhỏ.
> Vẫn metric "doanh thu", nhưng cắt theo các góc khác nhau.
> Theo kênh: Shopee, TikTok Shop, KiotViet.
> Theo thời gian: tháng này so tháng trước.
> Theo sản phẩm. Theo khu vực.
> Một con số tổng — "doanh thu ba phẩy tám tỷ" — gần như vô dụng để ra quyết định.
> Cũng con số đó, cắt theo kênh, lập tức kể một câu chuyện:
> Shopee một phẩy chín tỷ. TikTok Shop một phẩy tư tỷ. KiotViet năm trăm triệu.
> Giờ bạn mới biết nên dồn ngân sách vào đâu.
> Cùng một metric, nhiều dimension — đó là toàn bộ nghệ thuật xoay khối Rubik.

**🅰️ On-screen:**
- **DIMENSION = lát cắt, không phải con số**
- Một cột "3,8 tỷ" *tách* thành nhiều cột nhỏ khi chọn từng dimension
- Nhãn lát cắt: *Kênh · Thời gian · Sản phẩm · Khu vực*
- Khi cắt theo Kênh: **Shopee 1,9** · **TikTok Shop 1,4** · **KiotViet 0,5** (count-up, màu khác nhau)

**🎬 Visual / b-roll:**
- Một thanh tổng vỡ thành biểu đồ cột phân theo kênh (animation split). Rubik xoay đồng bộ.
- Cảnh nhỏ: sếp hỏi "doanh thu bao nhiêu?" → bong bóng đáp "theo **kênh nào, tháng nào** ạ?" (dạy: hỏi lại = làm rõ dimension, không phải khó tính).

**✂️ Short note:** Short #3. Hook 3s = "Con số tổng là con số vô dụng nhất". Hashtag: #dimension #dữliệu #phântíchdữliệu #BI

---

### BEAT 04 — KPI: metric có một cái thước  ·  KINETIC  ·  ⏱️ ~50s  ·  ✂️ SHORT-ABLE

**🎙️ Voiceover:**
> Đây là chỗ nhiều người nhầm nhất, nên nói thẳng:
> Không phải metric nào cũng là KPI.
> KPI là một metric được chọn ra vì nó quan trọng... và được gắn thêm một mục tiêu.
> "Doanh thu tháng này ba phẩy tám tỷ" — đó là một metric. Một con số trần trụi.
> "Doanh thu tháng này phải đạt bốn tỷ, hiện ba phẩy tám — đạt chín lăm phần trăm" — đó mới là KPI.
> Con số ấy giờ có một cái thước để biết tốt hay chưa.
> Một công ty đo hàng trăm metric. Nhưng chỉ nên chọn năm tới mười KPI thật sự.
> Cái bẫy phổ biến: nhồi ba mươi con số lên dashboard rồi gọi tất cả là KPI.
> Khi mọi thứ đều then chốt... thì không gì là then chốt cả.

**🅰️ On-screen:**
- **KPI = Metric + Mục tiêu + Mốc thời gian**
- "3,8 tỷ" (trần) → thêm vạch xanh `#00BC7D` mục tiêu **4 tỷ** → hiện **95%** + thanh tiến trình
- Cảnh phản diện: dashboard nhồi **30 số** nhấp nháy → mờ hết → chốt: **"đều then chốt = không gì then chốt"**

**🎬 Visual / b-roll:**
- Một cột số mọc lên chạm gần vạch đứt nét xanh; phần trăm count-up tới 95%.
- Lưới 30 ô số rối mắt → tối dần còn vài ô sáng (5–10 KPI).

**✂️ Short note:** Short #4. Hook 3s = "30 KPI nghĩa là bạn không có KPI nào". Hashtag: #KPI #quảntrị #dữliệu #SME

---

### BEAT 05 — Đọc lại cuộc cãi vã bằng 3 từ  ·  KINETIC  ·  ⏱️ ~45s  ·  —

**🎙️ Voiceover:**
> Giờ quay lại phòng họp sáng thứ Hai, đọc lại bằng đúng ba từ vựng.
> Một: Sales và Kế toán cãi nhau vì metric "doanh thu" chưa có một định nghĩa chung.
> Hai: họ tưởng nói cùng một con số, nhưng mỗi người cầm một dimension khác — đã giao hay đã thu, gồm ship hay không — mà không nói rõ.
> Ba: chẳng ai biết bốn phẩy hai hay ba phẩy tám là tốt, vì không ai chốt KPI để đối chiếu.
> Ba mầm lẫn lộn, gộp thành mười lăm phút cãi nhau...
> đáng ra chỉ cần một câu: "Mình đang nói metric nào, cắt theo dimension nào, so với KPI nào?"

**🅰️ On-screen:**
- Tua lại cảnh BEAT 00, lần này 3 nhãn dán lên: **METRIC?** **DIMENSION?** **KPI?**
- Câu thần chú hiện to, gõ từng chữ: **"Metric nào · Dimension nào · KPI nào?"**

**🎬 Visual / b-roll:**
- Replay nhanh cold open, freeze-frame, ba mũi tên chỉ vào ba chỗ hiểu lầm. Kết: cảnh dịu lại, ba người gật đầu.

**✂️ Short note:** — (cần context BEAT 00; không cắt riêng. Có thể ghép BEAT 00 + 05 thành 1 short "trước/sau" 50s nếu muốn.)

---

### BEAT 06 — (TUỲ CHỌN, NHẸ) Một định nghĩa dùng chung  ·  SCREENCAST/KINETIC  ·  ⏱️ ~30s  ·  —

> ⚠️ Bài "kiến thức thuần" — beat này **giữ rất nhẹ** hoặc **bỏ** khi xuất bản bản pure-knowledge. Nếu giữ: soft, định vị bằng phủ định, không liệt kê tính năng.

**🎙️ Voiceover:**
> Gốc của cãi vã không phải thiếu biểu đồ đẹp — mà là mỗi người mang một định nghĩa riêng.
> Cách chữa, đơn giản đến bất ngờ: định nghĩa "doanh thu" một lần, ở một chỗ, rồi ai hỏi cũng ra đúng con số ấy.
> Một lần định nghĩa. Cả công ty nói cùng một ngôn ngữ. Báo cáo ngừng cãi nhau — không phải vì ai thắng, mà vì không còn gì để cãi.

**🅰️ On-screen:**
- **"Một lần định nghĩa. Dùng mãi mãi."**
- (Nếu screencast) quay cảnh gõ định nghĩa "doanh thu" một chỗ → mọi báo cáo cập nhật theo.

**🎬 Visual / b-roll:**
- Năm file rời, năm con số → hội tụ về một định nghĩa → năm báo cáo cùng hiện một con số.

**✂️ Short note:** —

---

### BEAT 07 — Chốt + CTA  ·  KINETIC  ·  ⏱️ ~25s  ·  —

**🎙️ Voiceover:**
> Lần tới khi hai báo cáo lệch nhau, đừng vội đi tìm lỗi cộng trừ.
> Hỏi trước: mình đang nói metric nào, cắt theo dimension nào, so với KPI nào?
> Chín trên mười lần, "sai số" tan biến ngay khi ba từ này được gọi đúng tên.
> Nếu thấy hữu ích, theo dõi kênh — mỗi tuần một khái niệm data, gỡ trong vài phút.

**🅰️ On-screen — bảng "Tóm lại" 3 dòng (đối chiếu):**
| | Là gì | Ví dụ |
|---|---|---|
| **Metric** | Đại lượng đo được | Doanh thu, số đơn, AOV |
| **Dimension** | Lát cắt để nhìn | Theo kênh, tháng, sản phẩm |
| **KPI** | Metric + mục tiêu | "Đạt 4 tỷ — hiện 95%" |

- Chốt: **"Metric nào · Dimension nào · KPI nào?"** + nút *Theo dõi*

**🎬 Visual / b-roll:**
- Bảng 3 dòng build từng dòng theo giọng. End card: logo Semantix mờ ở góc + gợi ý video tiếp theo ("Một nguồn sự thật").

**✂️ Short note:** —

---

## Bản đồ cắt Short (tóm tắt)

| Short | Beat nguồn | Hook 3s | Độ dài |
|---|---|---|---|
| #1 | 00 | "Hai con số doanh thu — ai sai?" | ~35s |
| #2 | 02 | "Vì sao 'doanh thu' ra 2 con số?" | ~45s |
| #3 | 03 | "Con số tổng là con số vô dụng nhất" | ~40s |
| #4 | 04 | "30 KPI = bạn không có KPI nào" | ~40s |

## Ước lượng độ dài long-form
00(35) + 01(50) + 02(55) + 03(50) + 04(50) + 05(45) + 06(30) + 07(25) ≈ **5:40–6:20** (kèm nhịp nghỉ). Đạt khung 6–9 phút.
