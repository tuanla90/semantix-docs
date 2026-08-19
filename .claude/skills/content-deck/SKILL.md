---
name: content-deck
description: Dựng deck HTML slide tự bấm + kịch bản nói (facecam qua OBS) từ một bài blog đã chốt — thay cho video render. Dùng khi user muốn quay video trình bày trực tiếp cho bài <slug>.
---

# Content Deck — slide tự bấm + kịch bản nói

Format: user tự bấm slide trong Chrome, mặt nói realtime qua OBS (webcam góc dưới-phải). KHÔNG phải video render tự động — đừng đụng vào pipeline Remotion/engine.

## Template & rule
- Mẫu chuẩn: `landing/video-decks/llm-bia-sql/` (`deck.html` + `kich-ban-noi.md`). Copy cấu trúc: phím `→`/Space = reveal, `←` = lùi, `F` = fullscreen, `G` = hiện ô canh webcam, `H` = ẩn thanh đếm; ô trống ~470×470 góc dưới-phải cho webcam, không chữ nào đè.
- Chống slop deck (memory [[deck-anti-slop-feedback]]): CẤM slide liệt kê 01/02/03 + pill tag + gradient-highlight + fade-up đồng loạt. Mỗi slide kể MỘT beat có mạch; ưu tiên ẩn dụ hình (sơ đồ, hiện trường, con số lớn); motion đa dạng theo nội dung, không một kiểu animation cho cả deck.

## Quy trình
1. Đọc bài đã chốt (`landing/drafts/<slug>.md` hoặc `src/content/blog/<slug>.md`).
2. Bẻ bài thành 6–9 beat nói (~5–6 phút). Mỗi beat = 1 slide; trong slide, ý hiện dần theo `▸ bấm`. Không nhồi cả bài lên slide — slide là điểm neo, lời nói mới là nội dung.
3. Viết `kich-ban-noi.md` theo đúng format mẫu: header cách quay OBS, rồi từng slide với lời nói (tông cafe gỡ rối, ngôi "mình", "..." = nhịp ngừng) và các mốc `▸ bấm`.
4. Dựng `deck.html`: standalone một file (không CDN — inline hết CSS/JS/font), chữ to đọc được từ xa, nền tối đồng bộ brand tím `#783ABF`.
5. Tự verify: mở deck bằng browser preview, bấm thử hết reveal, chụp screenshot vài slide chốt để user duyệt. KHÔNG render video, KHÔNG tự quay.

## Output
`landing/video-decks/<slug>/deck.html` + `kich-ban-noi.md` + screenshot duyệt nhanh.
