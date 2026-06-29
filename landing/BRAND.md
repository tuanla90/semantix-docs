# Tuấn LA Lab — Brand & Logo Brief

Chốt 2026-06-25. Đây là nguồn duy nhất cho nhận diện kênh/video. Khi dựng video, các
giá trị này nạp vào `video-remotion/src/brand.ts` để mọi clip tự gắn (logo, màu, CTA).

## 1. Bản chất
- **Kênh**: rebrand từ `@mastergoogletools` (~1.6k sub) → hướng **data & AI cho doanh nghiệp Việt**, không bó hẹp Google Sheets.
- **Người dẫn**: Lê Anh Tuấn (mặt + giọng — video dùng giọng clone). `LA = Lê Anh` (họ + tên đệm), khớp email/handle `@tuanla`.
- **Tính cách**: thực chiến, gỡ vấn đề cụ thể, đáng tin, hiện đại, hơi tinh nghịch (cái "lab").
- **Đọc**: "Tuấn LA Láp". Viết **LA in hoa** (initials), không phải "La".

## 2. Concept logo
Monogram **LA** ghép hai ẩn dụ qua **không gian âm**:
- **L = database** — chồng đĩa dữ liệu (2–3 tầng) + chấm data.
- **A = tam giác chứa bình thí nghiệm** — bình Erlenmeyer nằm trong không gian âm ở **dưới-phải** chữ A, có chất lỏng + 2–3 bọt.
- Hợp nhất = **"data lab"**.

### Quy tắc dựng (giữ đúng)
- Chữ A **vẫn là chữ A**; bình **ẩn trong** ruột — **KHÔNG** chìa cổ lọ ra ngoài đỉnh A (lỗi cần tránh).
- Đúng **2 ẩn dụ** (database + flask) — không nhồi thêm icon.
- Cân **trọng lượng L và A** (L đặc/đủ nặng để không bị A lấn).

## 3. Màu
| Vai trò | Hex |
|---|---|
| Tím chủ đạo | `#783ABF` |
| Trắng (chữ/nét) | `#FFFFFF` |
| Bọt / data accent | `#C4B5FD` |
| Nền tối (video canvas) | `#08090C` |
| Semantic (giữ từ kit) | đúng `#00BC7D` · cảnh báo `#FE9A00` · sai `#FF6467` |

- Biến thể bắt buộc: **trắng trên tím** (chính), **tím trên trắng**, **trắng trên nền tối**, **đơn sắc đen/trắng**.
- Cập nhật `brand.ts` primary `#783ABF` (thay token kit cũ `#AD46FF`).

## 4. Cần giao (deliverables)
1. **Master logo** (chi tiết) — bản màu + đơn sắc trắng + đơn sắc đen. Định dạng **SVG** (gốc) + PNG.
2. **Bản RÚT GỌN cho avatar** — phải đọc được ở **48px**: bỏ đường database mảnh, giữ silhouette LA + bình. *Đây là bản dùng làm avatar YouTube.*
3. **Wordmark lockup** — glyph + chữ "Tuấn LA Lab" (font geometric sans, vd Inter Bold/800). Bản ngang + bản xếp dọc.
4. **Tagline**: "Data & AI cho người Việt".
5. **Khoảng trống an toàn** = chiều cao một đĩa database quanh mark. **Cỡ tối thiểu** 24px (bản rút gọn).

## 5. Nên / Không
- ❌ Không kéo méo, đổ bóng, gradient, xoay nghiêng, đổi màu ngoài palette, thêm icon lạ.
- ❌ Không dùng bản chi tiết dưới ~64px → dùng bản rút gọn.
- ✅ Trên nền ảnh/đa màu: đặt mark trong vòng/ô tím đặc để giữ tương phản.

## 6. File xuất
- SVG master · PNG @1x/2x/3x · avatar 800×800 (bản rút gọn) · banner 2048×1152 · biến thể đơn sắc.

## 7. Animation (intro/outro video)
- Database **đổ đầy từng tầng**, chấm data bật lên.
- Bình **dâng chất lỏng** + bọt nổi.
- Chữ **LA lắp lại**; tím trên nền tối. Tái dùng primitive của kit.

## Thumbnail (chuẩn) — 1280×720

Component data-driven: `video-remotion/src/thumbnail.tsx`; data mỗi video: `videos/<slug>/thumb.json`
`{category, kicker, bigNum, label, question:{pre,em}, person}`.
Render: `npx remotion still src/thumb.ts thumb-<slug> out/<slug>/thumb.png --browser-executable="$CHROME"`.

**Layout (cố định để nhất quán):**
- **Danh mục** — badge bo tròn viền tím, **góc trên-TRÁI**.
- **Brand pill** — logo trắng + "Tuấn LA Lab" trên nền tím `#783ABF`, **góc trên-PHẢI**; to vừa đủ đọc ở mobile, **xích xa mép** (né icon thời lượng/UI YouTube).
- **Hook** — **canh TRÁI, lệch trái**: kicker nhỏ → **1 số focal KHỔNG LỒ (đỏ)** + nhãn → **câu hỏi mở** (phần nhấn đỏ). Nêu rõ nghịch lý, GIẤU đáp án.
- **Presenter** — cutout, **LẬT** cho mặt hướng vào trong, **TO** (đầu gần chữ — *mặt/ánh mắt là yếu tố hút click số 1*), **góc dưới-PHẢI**, viền sáng tím + spotlight. Cùi chỏ crop được, miễn mặt rõ.

**Nguyên tắc CTR:** ≤7 chữ · ≤3 màu · tương phản cao (nền tối · trắng · đỏ · tím) · mặt to · số to · câu hỏi rõ-tò-mò · KHÔNG false-emotion.

**Asset:**
- Logo 2 bản: `logo.png` (trắng/nền tím — dùng nền tối) · `logo-light.png` (tím/nền trắng — nền sáng). Bản dùng trong pill = `logo-white.png` (key tím `#783ABF` ra trong suốt → mark trắng; pill nền cùng `#783ABF` nên liền khối).
- Presenter: ảnh greenscreen/removebg → crop về bbox (`tuan-crop.png`). Mặt rõ, sơ mi trắng + vest tối.
