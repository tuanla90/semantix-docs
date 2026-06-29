# Blog → Video: Quy trình viết kịch bản (Blog-to-Video Protocol)

> Nguồn: cẩm nang "script-writing-guide" (Antigravity brain) + góp ý chuyên gia MKT (2026-06).
> File này = **QUY TRÌNH**. Tông giọng chi tiết → `../STYLE.md` §TÔNG GIỌNG. Cơ chế kit/scenes → `../video-remotion/NOTES.md`.

Bê nguyên blog (văn viết) lên video (văn nói) = người xem lướt sau 3 giây. Video cần **nhịp nhanh · trực quan · cảm xúc**.

## 5 bước chuyển ngữ

**B1 — Hook = nỗi đau công sở (3 giây đầu).** Không chào hỏi. Ném thẳng khán giả vào bối cảnh họ thấy mình trong đó.
- Blog: "Metric và Dimension là hai khái niệm cơ bản…"
- Video: "Sáng thứ Hai, sếp đập bàn hỏi doanh thu. Sales báo 4 tỷ, Kế toán cãi 3,8. Ai sai?"

**B2 — Hình tượng hoá khái niệm (visual metaphor).** Biến trừu tượng → đồ vật/người đời thường.
- Metric/Dimension → **khối Rubik** (số trên mặt / cách xoay khối).
- Data Engineer vs Analyst → **thợ xây bếp, lắp ống nước** / **đầu bếp nấu ăn**.

**B3 — Văn viết → văn nói (5 kỹ thuật Human-Touch):**
1. **Băm nhỏ câu** — mỗi câu 1 ý. Đọc to thấy hụt hơi = còn dài, chặt tiếp.
2. **Nhịp thở bằng dấu câu** — `...` ép VO ngừng 1 nhịp suy ngẫm ("…Không ai sai cả."). → pipeline: dùng `\n` trong content.py.
3. **Từ cảm xúc + cảm thán** — *trần trụi, khô khốc, sứt đầu mẻ trán, tẩu hoả nhập ma, rác, chắp vá*; từ nối lấy nhịp *Đấy! · Á à! · Ơ · Dạ · đúng không? · Này nhé*.
4. **Câu hỏi tu từ** — hỏi ngược thay vì đáp ngay ("…Bạn thấy quen không?").
5. **Đại từ gần gũi** — *bạn, sếp, anh Sales, chị Kế toán, anh em* (tránh "chúng ta / doanh nghiệp"). Viết như ngồi cafe gỡ rối cho đàn em.
6. **Phát âm tên riêng/ngoại cho TTS** — AI hay đọc sai tên nước ngoài/thương hiệu (vd "KiotViet" → "ki ốt vi ét" sai, đúng là "ki ốt việt"). Khai báo `PRON` dict trong `content.py`: gen_audio **thay từ trong text gửi TTS**, còn **caption/màn hình giữ chính tả gốc**. Test bằng cách đọc to bản TTS, nghe chỗ nào lạ thì thêm vào PRON.

**B4 — Format BEAT** (mỗi beat 3 phần):
- 🎙️ **Voiceover + ▸ ghi chú đạo diễn** (giọng) ở đầu beat — vd `▸ Giọng bức xúc, nhanh` / `▸ Giọng trầm, tâm sự`.
- 🅰️ **On-screen** — rút VO 20 chữ → 2–3 từ khoá đập màn hình (**AI SAI?**).
- 🎬 **Visual / B-roll** — chỉ đạo hình (dashboard, biểu đồ nứt vỡ, meme).

**B5 — Câu thần chú (Aha!).** Kết = 1 câu ngắn, có nhịp, mang về dùng ngay (không kết luận dài như blog).
- "Mình đang nói **Metric** nào, cắt theo **Dimension** nào, so với **KPI** nào?"

## Ánh xạ vào pipeline này
| Guide | Cơ chế cụ thể |
|---|---|
| `...` ngừng nhịp | `\n` trong `content.py` BEATS |
| ▸ ghi chú giọng / beat | `TONE` dict trong `content.py` → audio-tag ElevenLabs lúc `gen_audio` |
| 🅰️ On-screen từ khoá | `scenes.json` moments (kit element) — **số nói = số item hiện** |
| 🎬 Visual | `scenes.json` bg / custom / chart |
| Câu thần chú | beat chốt + `cta` element |

### ▸ Ghi chú giọng → audio-tag ElevenLabs v3 (dùng khi re-voice)
| Ghi chú đạo diễn | Tag / cách đọc |
|---|---|
| bức xúc, nhanh | `[annoyed]` / `[frustrated]` |
| trầm, tâm sự | `[thoughtful]` |
| vỡ oà / phát hiện | `[surprised]` / `[excited]` |
| châm biếm nhẹ | `[sarcastic]` (hoặc nhấn nhá) |
| chốt chắc nịch | đọc chậm, dứt khoát (không tag) |

> **THỰC TẾ (2026-06): Eleven v3 chưa mở API** → tài khoản thường chỉ có v2.5/multilingual_v2 = **KHÔNG đọc được audio-tag**. `gen_audio` STRIP tag trước khi gửi; cảm xúc đến từ **voice_settings** (stability ~0.35, style ~0.4) + dấu câu. Bảng tag trên để dành cho khi v3 mở. VieNeu cũng không có tag.

## Check-list (trước khi chốt script)
- [ ] Vứt hết định nghĩa hàn lâm rườm rà?
- [ ] 5 giây đầu khiến người xem thấy nhột / đồng cảm?
- [ ] Thuật ngữ đã ví von bằng đồ vật / con người đời thường?
- [ ] Đọc to có tự nhiên như nói chuyện ở quán cafe?
- [ ] On-screen / Visual khớp 100% lời Voiceover?
