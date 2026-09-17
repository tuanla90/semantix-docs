# Bộ Nhớ Người Dùng (User Memory) & Cá Nhân Hóa

Bộ nhớ Người Dùng (**User Memory**) là tính năng giúp trợ lý Semantix thấu hiểu phong cách làm việc và thói quen phân tích dữ liệu của riêng bạn qua từng phiên hội thoại. Thay vì mỗi lần mở khung chat bạn đều phải nhắc lại các yêu cầu quen thuộc như *"hãy hiển thị số theo đơn vị tỷ đồng"* hay *"trả lời ngắn gọn"*, trợ lý ghi nhớ tự động và áp dụng xuyên suốt mà không cần cấu hình phức tạp.

---

## 1. Triết Lý Thiết Kế: Sở Thích Làm Việc, Không Phải Tính Cách

Khác với các hệ thống AI thông thường cố gắng "đọc vị" hoặc suy đoán cảm xúc của người dùng, Semantix tuân thủ một nguyên tắc đạo đức và kỹ thuật nghiêm ngặt:

> [!IMPORTANT]
> **Triết lý Cốt lõi**: Bộ nhớ Semantix chỉ ghi nhớ **sở thích trình bày** và **thói quen làm việc nghiệp vụ**. Hệ thống **tuyệt đối KHÔNG suy đoán, không đánh giá và không lưu trữ** bất kỳ thông tin nào về tính cách, thái độ, cảm xúc hay đặc điểm con người của bạn.

Hàng rào bảo vệ này được thực thi chặt chẽ ở cấp độ máy chủ thông qua hàm kiểm duyệt nghiêm ngặt:
* Mọi dữ liệu ghi nhớ đều phải đi qua danh sách trắng (**whitelist**) được kiểm tra bằng mã nguồn cứng (`validateMemoryEntry`).
* Bất kỳ nỗ lực nào nhằm lưu trữ các thông tin ngoài danh mục (kể cả do mô hình AI tự suy luận hay người dùng nhập vào) đều bị từ chối ngay lập tức.
* Bộ nhớ chỉ phục vụ mục đích duy nhất: **Giúp báo cáo và câu trả lời AI đúng ý bạn nhất ngay từ câu hỏi đầu tiên.**

---

## 2. Danh Sách Trắng 5 Sở Thích Chính (Preferences)

Hệ thống cung cấp danh mục 5 sở thích trình bày được chuẩn hóa và bảo vệ trong danh sách trắng:

| Khóa Sở Thích (`Key`) | Ý Nghĩa | Các Giá Trị Hợp Lệ | Giá Trị Mặc Định |
|----------------------|---------|---------------------|------------------|
| `answerLanguage` | Ngôn ngữ trợ lý ưu tiên trả lời | `vi` (Tiếng Việt), `en` (Tiếng Anh) | Tự nhận diện theo giao diện |
| `numberScale` | Đơn vị tỷ lệ rút gọn khi hiển thị số tiền/số lượng | `full` (nguyên bản), `thousand` (nghìn), `million` (triệu), `billion` (tỷ) | `full` |
| `defaultPeriod` | Khoảng thời gian mặc định khi câu hỏi không nói rõ kỳ | `day` (hôm nay), `week` (tuần này), `month` (tháng này), `quarter` (quý này), `year` (năm nay) | `month` |
| `detailLevel` | Mức độ chi tiết và độ sâu của câu trả lời | `brief` (ngắn gọn), `standard` (tiêu chuẩn), `detailed` (phân tích sâu) | `standard` |
| `preferredChart` | Loại biểu đồ trực quan hóa yêu thích | `bar`, `line`, `area`, `pie`, `pivot_table`, `scorecard` | Tùy ngữ cảnh câu hỏi |

### Minh Họa Tác Động Của Sở Thích Trong Thực Tế

Giả sử bạn hỏi câu ngắn gọn: *"Doanh thu gần đây thế nào?"*

* **Khi chưa có bộ nhớ:**
  > "Doanh thu tháng 09/2026 đạt 15.420.500.000 VNĐ, tăng trưởng 8,2% so với tháng 08/2026. Dưới đây là phân tích chi tiết các nhóm sản phẩm..." *(kèm bảng số liệu dài)*.
* **Khi đã ghi nhớ (`numberScale: billion`, `detailLevel: brief`, `preferredChart: scorecard`):**
  > "Doanh thu tháng này đạt **15,42 tỷ VNĐ** (▲ 8,2% so với tháng trước)." *(kèm widget thẻ KPI Scorecard duy nhất)*.

---

## 3. Cơ Chế Ghi Nhận Thói Quen Tất Định (`accumulateHabit`)

Bên cạnh các sở thích do bạn chủ động đặt, Semantix trang bị công cụ tự động nhận diện các chỉ số và chiều dữ liệu mà bạn quan tâm nhất thông qua thuật toán **tích luỹ thói quen tất định**.

```
[Phiên Chat #1] ───┐
                    ├──> Đếm tần suất sử dụng ──> Xếp hạng Top 10 ──> Tự quên sau 90 ngày
[Phiên Chat #2] ───┘    (Chống đếm trùng)       (Nhiều phiên & Gần nhất)  (Inferred Pruning)
```

### Các Đặc Điểm Vận Hành

1. **Hoàn toàn tất định, không gọi LLM**:
   - Hệ thống không dùng AI để đoán bạn thích gì. Thay vào đó, máy đếm số phiên làm việc thực tế (`sessions`) mà bạn đã truy vấn đến từng chỉ số (`frequentMetrics`) hoặc chiều dữ liệu (`frequentDimensions`).
2. **Chống đếm trùng phiên (`recentSessions`)**:
   - Nếu trong cùng một phiên hội thoại bạn hỏi lại chỉ số "Doanh thu thuần" 5 lần, hệ thống chỉ tính là **1 phiên**.
   - Semantix ghi nhớ tối đa 5 mã phiên gần nhất để đảm bảo kết quả phản ánh thói quen làm việc dài hạn, không bị bóp méo bởi một lần đào sâu đột xuất.
3. **Giới hạn và thứ tự ưu tiên**:
   - Tối đa **10 mục** cho mỗi nhóm thói quen.
   - Thứ tự xếp hạng: Ưu tiên mục xuất hiện ở **nhiều phiên hơn**, sau đó đến mục được truy vấn **gần đây nhất** (`lastSeen`).
4. **Cơ chế tự quên tự nhiên (`Inferred Forgetting`)**:
   - Những thói quen do hệ thống tự nhận diện (`source = inferred`) sẽ tự động được dọn dẹp và xóa bỏ nếu sau **90 ngày** bạn không còn nhắc tới (`INFERRED_FORGET_DAYS = 90`).
   - Điều này giúp bộ nhớ luôn tươi mới, không bị ứ đọng dữ liệu của các dự án cũ đã kết thúc.

---

## 4. Lệnh Dặn Trực Tiếp Qua Chat (`remember_preference`)

Bạn không cần phải vào trang cấu hình nếu muốn thay đổi cách trợ lý phản hồi. Bạn có thể dặn dò AI bằng câu thoại tự nhiên ngay trong khung chat:

### Ví Dụ Thực Tế

```text
Người dùng: "Từ nay hãy trả lời bằng tiếng Việt ngắn gọn và hiển thị số tiền theo đơn vị tỷ đồng nhé!"
```

Khi nhận được yêu cầu này, trợ lý Semantix sẽ kích hoạt công cụ chuyên dụng `remember_preference` để lưu sở thích trực tiếp (`source: 'explicit'`):
* `answerLanguage`: `"vi"`
* `detailLevel`: `"brief"`
* `numberScale`: `"billion"`

Trợ lý sẽ xác nhận lại ngay lập tức:
> *"Đã ghi nhớ! Từ bây giờ tôi sẽ luôn trả lời bạn bằng tiếng Việt ngắn gọn và quy đổi số tiền sang đơn vị tỷ đồng."*

> [!TIP]
> **Quyền ưu tiên của Explicit Memory**: Những sở thích do bạn trực tiếp dặn dò (Explicit) sẽ có độ ưu tiên cao nhất, lập tức ghi đè lên các thói quen hệ thống tự suy ra (Inferred), và sẽ **không bao giờ bị hệ thống tự động xóa** sau 90 ngày. Chúng chỉ thay đổi khi bạn dặn lại hoặc chủ động xóa trên giao diện.

---

## 5. Quản Lý Bộ Nhớ Trên Giao Diện Người Dùng

Bạn luôn có toàn quyền kiểm soát và minh bạch 100% đối với những gì hệ thống ghi nhớ về mình.

### Truy Cập Tab "Bộ Nhớ Của Tôi"

1. Nhấn vào ảnh đại diện hoặc tên tài khoản ở góc dưới bên trái màn hình.
2. Chọn **Hồ sơ cá nhân (Profile Settings)**.
3. Chuyển sang thẻ **Bộ nhớ của tôi (User Memory)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Hồ Sơ Cá Nhân  >  Bộ Nhớ Của Tôi                                      │
├────────────────────────────────────────────────────────────────────────┤
│ Trạng thái tính năng: [ BẬT / TẮT BỘ NHỚ ]                             │
│                                                                        │
│ ⚙️ SỞ THÍCH TRÌNH BÀY (EXPLICIT PREFERENCES)                           │
│ ┌──────────────────────┬──────────────────────┬──────────────────────┐ │
│ │ Ngôn ngữ trả lời     │ Tỷ lệ hiển thị số    │ Mức độ chi tiết      │ │
│ │ [ Tiếng Việt      ▾] │ [ Tỷ đồng         ▾] │ [ Ngắn gọn        ▾] │ │
│ └──────────────────────┴──────────────────────┴──────────────────────┘ │
│                                                                        │
│ 📊 THÓI QUEN THƯỜNG DÙNG (LEARNED HABITS)                              │
│ • Chỉ số hay hỏi:   Doanh thu thuần (12 phiên), Số đơn hàng (8 phiên)   │
│ • Chiều hay phân tích: Chi nhánh (9 phiên), Kênh bán hàng (6 phiên)     │
│                                                                        │
│ [ Xóa từng mục ]                                   [ Xóa toàn bộ nhớ ] │
└────────────────────────────────────────────────────────────────────────┘
```

### Các Thao Tác Bạn Có Thể Thực Hiện

* **Bật / Tắt hoàn toàn bộ nhớ**:
  - Gạt công tắc `Cho phép ghi nhớ`. Khi tắt, AI sẽ hoạt động ở trạng thái tiêu chuẩn thuần túy, không đọc bất kỳ dữ liệu cá nhân hóa nào.
* **Chỉnh sửa sở thích**:
  - Nhấp vào các menu thả xuống để thay đổi đơn vị số, ngôn ngữ hoặc độ chi tiết mong muốn.
* **Xóa từng mục cụ thể**:
  - Nhấn biểu tượng thùng rác bên cạnh một chỉ số hoặc một sở thích để xóa riêng mục đó.
* **Xóa toàn bộ bộ nhớ (Clear All)**:
  - Khôi phục mọi cài đặt về trạng thái xuất xưởng ban đầu.

---

## 6. Bảo Mật & Riêng Tư Dữ Liệu Tuyệt Đối

Semantix áp dụng các tiêu chuẩn an toàn cấp doanh nghiệp để bảo vệ quyền riêng tư người dùng:

### Cách Ly Hoàn Toàn Giữa Các Người Dùng
* Bộ nhớ gắn liền với định danh duy nhất của từng cá nhân (`userId`).
* Dữ liệu bộ nhớ của người dùng A **tuyệt đối không bao giờ** bị rò rỉ hay đưa vào ngữ cảnh làm việc của người dùng B, ngay cả khi hai người cùng làm việc chung trong một tổ chức hay một dự án.

### Cơ Chế Khóa An Toàn Khi "Xem Như" (Impersonation Gate)
Để hỗ trợ kỹ thuật hoặc quản trị hệ thống, Quản trị viên (Admin) có tính năng "Xem như người dùng khác" (*Impersonate User*). Trong trường hợp này:

> [!CAUTION]
> **Khóa Toàn Diện Khi Impersonate**: Khi chế độ "Xem như" đang được kích hoạt, hệ thống lập tức **khóa hoàn toàn** tầng bộ nhớ:
> 1. Trợ lý AI **không đọc** bất kỳ sở thích hay thói quen nào của người bị mạo danh.
> 2. Các hành động chat của quản trị viên **không được phép ghi** hay thay đổi bất kỳ mục nào vào bộ nhớ của người dùng đó.

Điều này đảm bảo sự riêng tư tuyệt đối cho nhân viên và ngăn ngừa hiện tượng sai lệch thói quen của người dùng thật.

---

## 7. Tổng Kết Các Câu Lệnh Mẫu Nhanh

| Bạn Muốn | Câu Dặn AI Mẫu |
|----------|----------------|
| Đổi đơn vị hiển thị số tiền | *"Từ giờ hãy hiển thị số theo đơn vị triệu đồng nhé."* |
| Nhận câu trả lời tóm tắt nhanh | *"Chỉ cần trả lời ngắn gọn, đưa ra kết luận chính thôi."* |
| Phân tích dữ liệu chuyên sâu | *"Mỗi khi trả lời hãy phân tích chi tiết và nêu rõ nguyên nhân."* |
| Mặc định xem theo quý | *"Nếu tôi không nói rõ ngày tháng, hãy mặc định lấy số liệu của quý này."* |
| Ưu tiên biểu đồ cột | *"Tôi thích xem số liệu trực quan bằng biểu đồ cột (Bar Chart)."* |
| Xóa thói quen đã lưu | *"Hãy quên sở thích về đơn vị tiền tệ mà tôi đã dặn trước đây."* |
