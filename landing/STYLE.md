# STYLE.md — DNA kênh "Tuấn LA Lab"

> **Nguồn chuẩn** mà người/agent viết kịch bản video đọc TRƯỚC tiên.
> File này KHÔNG lặp lại cơ chế giọng đã có — cơ chế chi tiết nằm ở:
> - `CONTENT_PLAN.md §G1–G12` — DNA viết (tiêu đề nghịch lý, hook, ẩn dụ, số VN, khung thân bài, xử lý thuật ngữ…).
> - `VIDEO_PLAN.md §G/§H/§I/§J` — schema beat, chuyển văn→nói, đóng gói SEO, checklist.
>
> STYLE.md chỉ chốt **bản sắc kênh + những điều ĐÃ ĐỔI** so với khung cũ (viết thời còn xoay quanh sản phẩm). Khi mâu thuẫn, **STYLE.md thắng**.

## 0. Công thức cốt lõi (1 dòng)
**Một sự thật ngược đời → kể bằng cảnh + số Việt Nam → chốt bằng một quyết định.**
"À há" ở câu mở, "gật gù" ở câu kết. *(chi tiết: CONTENT_PLAN §G)*

## 1. Kênh là ai
- **Tên:** Tuấn LA Lab — rebrand từ `@mastergoogletools` (~1.6k sub). Brand: `BRAND.md`.
- **Chủ đề:** data & AI cho doanh nghiệp Việt — **rộng, không bó hẹp Google Sheets**.
- **Người dẫn:** Lê Anh Tuấn — *một mặt, một giọng* (giọng clone). ~10 năm data tại VCCorp/Viettel/VNLIFE → neo uy tín bằng **trải nghiệm thật, ngôi thứ nhất** ("hồi mình làm ở…"). Xem author bible trong memory.
- **Chất:** thực chiến, gỡ một vấn đề cụ thể, đáng tin, hiện đại, hơi nghịch (cái "lab").

## 2. Khán giả (mới — quan trọng nhất)
- **Gốc:** back-office SME Việt — HC nhân sự, kế toán, kho, dự án, marketing, báo cáo — đang làm báo cáo **thủ công** bằng Google Sheets/Looker. Họ theo Tuấn vì *mẹo data thực dụng*; đã trả tiền (hội viên/Zalo).
- **Đích:** dẫn họ từ "làm tay trong Sheets" → "tư duy data đúng + dùng AI/semantic layer".
- **Viết cho người này:** nghiệp vụ Việt (CCCD, mã số thuế, Tết, Shopee/TikTok Shop/KiotViet), đụng đúng nỗi đau báo cáo, không hàn lâm.

## 3. Căng thẳng phải xử lý (mới)
Kênh cũ dạy *"làm chủ Sheets thủ công"*; hướng mới nói *"để tư duy đúng / AI / semantic layer lo"*.
> **Đừng phủ định công sức cũ của khán giả.** Bắc cầu: *"Sheets tuyệt — đây là chỗ nó đụng trần → đó là lúc cần [khái niệm/AI]."*

Giai đoạn đầu ưu tiên **bridge content** (vs-google-sheets, hành-trình-thời-excel, tiến-hoá-bi) phục vụ sub cũ, rồi mới đi sâu.

## 4. Sản phẩm Semantix — nói thế nào (đổi)
- Giai đoạn này **brand-light**: kênh là *tài sản giáo dục*, KHÔNG phải kênh bán hàng (domain/sản phẩm còn chưa chốt).
- Semantix nếu nhắc = "công cụ mình đang xây" — soft, định vị bằng **phủ định** ("không phải chatbot cắm DB, mà là…"), **tối đa 1 beat cuối**, không brochure.
- Phần lớn clip xây kênh nên **0% sản phẩm** (kiến thức thuần).

## 5. Ngôi & persona (đổi so với blog §G9)
- Blog có 3 bút danh; **VIDEO chỉ MỘT giọng = Lê Anh Tuấn.** Dù bài blog gốc ký tên ai, kịch bản video kể ở ngôi của Tuấn.
- "bạn" cho khán giả · "mình/tôi" cho trải nghiệm · "Semantix/tụi mình" chỉ ở beat sản phẩm.

## 6. Non-negotiables khi viết cho TAI *(rút gọn từ §G + §H)*
- **Hook ≤5s** = mâu thuẫn/cảnh thật, KHÔNG định nghĩa.
- Câu ngắn, một ý một câu; giữ "câu cụt nhịp gõ" (*"Đều chạy. Đều ra số. Đều đúng cú pháp."*).
- **≥1 ẩn dụ giải thích cơ chế** (Rubik, xô thủng…), không trang trí.
- Số định dạng VN, đọc trôi ("bốn phẩy hai tỷ"); **số minh hoạ phải nói rõ là ví dụ**.
- Em-dash của blog → khoảng lặng / `...` khi nói.
- Chia **4–7 beat module**, mỗi beat hook+chốt riêng; **≥1–2 beat KINETIC punchy** để cắt short.
- Kết bằng **một quyết định / việc làm được ngay**, không lý thuyết treo.

## 7. Checklist blog → script (chạy mỗi video)
- [ ] Chọn bài: hook mạnh · dễ kinetic · ít phụ thuộc sản phẩm.
- [ ] Rút bài về **1 mâu thuẫn lõi** → làm beat `00`.
- [ ] Bám schema `VIDEO_PLAN §G`; gắn nhãn **KINETIC/SCREENCAST** + cờ **✂️ short-able**.
- [ ] Chuyển văn→nói theo `§H`; chạy qua mục 6 ở trên.
- [ ] Bắc cầu (mục 3) nếu chủ đề đụng Google tools.
- [ ] Title/thumbnail/chapters theo `§I`.
- [ ] **Output = `videos/<slug>/content.py`** (`BEATS` dict + `ORDER`) cho kit — đây là đầu vào pipeline.

## 8. Tránh
- Đọc nguyên blog (essay) → vỡ nhịp tai.
- Phủ định Google Sheets / khán giả cũ.
- Brochure sản phẩm; nhồi >1 beat bán hàng.
- Ẩn dụ trang trí không giải thích cơ chế.
- Hàn lâm hoá; mất bối cảnh Việt; số minh hoạ không đánh dấu.

- [ ] **Số khớp hình ↔ lời**: lời nói "năm X" thì hình phải hiện đủ 5 item (đừng nói 5 mà list 4). Kiểm mọi con số đếm được.

## TÔNG GIỌNG (góp ý chuyên gia MKT — áp cho MỌI video)
> Viết như **một data analyst / sếp lão làng ngồi tâm sự, gỡ rối cho đàn em ở quán cafe** — KHÔNG giảng bài mô phạm.
- **Kịch tính hoá nỗi đau**: tả cảnh cho người nghe *thấy ngột ngạt* ("phòng họp căng như dây đàn", "sếp gõ tay xuống bàn"). Đừng kể đều đều.
- **Hội thoại trực tiếp**: cho Sếp/Sales/Kế toán *nói ra mồm* ("Dạ bốn phẩy hai tỷ.", "Đâu sếp, ba phẩy tám thôi.") → sống động hơn tường thuật.
- **Đồng cảm chốn công sở** ("Ôi đúng công ty mình rồi"): tình huống đời thật ai cũng gặp.
- **Châm biếm nhẹ** chỗ sai phổ biến ("nhồi ba bốn chục số xanh đỏ rồi gọi là KPI — nhân viên tẩu hỏa nhập ma").
- **Khẩu ngữ nói**: "nhé", "đấy", "á à", "đúng không?", xưng "bạn / anh em"; "..." cho nhịp nghỉ kịch tính.
- Vẫn giữ: số VN chính xác, chốt bằng quyết định, không lan man.

## STOP SLOP — soát trước khi chốt bài

Trước khi chốt **blog / script**, chạy skill **Stop Slop** (`.claude/skills/stop-slop/`) để cắt slop cơ học:
- Bỏ **em-dash** `—` (dùng `,` `.` `:`); bỏ **trạng từ/intensifier** (hoàn toàn, thật ra, thành thật, thú thật, rất, chính, sạch…).
- Bỏ câu mở **"hắng giọng"/meta** ("đây là điều cốt lõi", "mình muốn nói rõ chỗ này", "bạn biết mình nghĩ gì không?").
- Bỏ **đối-lập nhị phân** ("không phải X, mà Y" → nói thẳng Y); không **false agency**; không **pull-quote dạng prose**.
- Chấm 5 chiều (Directness · Rhythm · Trust · Authenticity · Density); < 35/50 thì sửa.

**NGOẠI LỆ — GIỮ NGUYÊN (bản sắc kênh, đừng để skill cắt):** slogan/hook ("ngữ cảnh là vua"), câu cụt nhịp gõ cố ý ("Đều chạy. Đều ra số."), ẩn dụ thesis ("con số trần trụi nói dối"), "..." nhịp nói. Dùng skill ở chế độ **"sửa cơ học, giữ giọng"**, không máy móc cắt.

> **Quy trình chuyển blog → kịch bản (5 bước + check-list + map audio-tag): `video-scripts/BLOG-TO-VIDEO.md`.**
