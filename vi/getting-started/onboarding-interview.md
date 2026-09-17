# Phỏng Vấn Nghiệp Vụ Onboarding (`/context-interview`)

Khi kết nối một nguồn dữ liệu mới vào Semantix, thách thức lớn nhất không phải là kỹ thuật mà là **ngữ cảnh nghiệp vụ (Business Context)**: Các thuật ngữ nội bộ, công thức tính đặc thù và các quy tắc ngầm định trong doanh nghiệp.

Thông thường, người dùng phải đối mặt với tab Cấu hình (Scope) gồm hàng chục ô trống rỗng mà không biết phải điền gì; hoặc nếu để AI tự suy đoán từ tên cột kỹ thuật, hệ thống rất dễ tạo ra các câu truy vấn sai logic.

Tính năng **Phỏng Vấn Nghiệp Vụ Onboarding** (`/context-interview`) ra đời để giải quyết triệt để bài toán này thông qua quy trình khảo sát tương tác thông minh 3 vòng.

---

## 1. Triết Lý Vận Hành: Phỏng Vấn Dựa Trên Schema Thật

Quy trình phỏng vấn của Semantix được xây dựng dựa trên **hai nguyên tắc nền tảng**:

```
  ┌─────────────────────────────────────────────────────────────┐
  │              HAI NGUYÊN TẮC VÀNG CỦA PHỎNG VẤN              │
  ├──────────────────────────────┬──────────────────────────────┤
  │    1. NEVER INVENT A NAME    │  2. NEVER ASK WHAT IS KNOWN  │
  │ Mọi lựa chọn đều gắn với ID  │ Bỏ qua câu hỏi nếu thông tin │
  │ cột, bảng hoặc metric thật.  │ đã được khai báo trong Scope.│
  └──────────────────────────────┴──────────────────────────────┘
```

1. **Không Bao Giờ Bịa Tên (`Never invent a name`)**:
   - Tất cả các phương án trắc nghiệm hiển thị cho người dùng đều lấy trực tiếp từ định danh vật lý (`PhysicalColumn.id`, `Metric.id`, bảng thật) trong kho dữ liệu.
   - Các giá trị tùy biến không thuộc schema đều sử dụng mã đặc biệt (`__sentinel__`, ví dụ: `__grain:month__`). Điều này ngăn chặn hoàn toàn việc AI ảo giác ra các trường dữ liệu không tồn tại.
2. **Không Bao Giờ Hỏi Lại Điều Đã Biết (`Never ask what is already answered`)**:
   - Khi chạy phỏng vấn cho một Context đã có sẵn thông tin (ví dụ: đã khai báo cột thời gian mặc định, hoặc đã có định nghĩa gotchas), hệ thống sẽ **tự động loại bỏ** các câu hỏi tương ứng.
   - Phỏng vấn bổ sung sẽ ngắn gọn và tập trung đúng vào các phần còn thiếu.

---

## 2. Quy Trình 3 Vòng Phỏng Vấn Thông Minh

Quy trình phỏng vấn được thiết kế có cấu trúc sư phạm cao, đi từ bức tranh vĩ mô đến các chi tiết nghiệp vụ sâu:

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     VÒNG 1       │  ───> │      VÒNG 2      │  ───> │      VÒNG 3      │
│ Đơn Vị & Kỳ Mốc  │       │  Chỉ Số Cốt Lõi  │       │ Kiêng Kỵ & Bẫy   │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

### Vòng 1: Đơn Vị, Người Đọc Báo Cáo & Kỳ Mốc Mặc Định

Mục tiêu của Vòng 1 là xác định **đối tượng phục vụ** và **khung thời gian chuẩn** của bộ dữ liệu:

| Câu Hỏi | Mã Nhận Diện | Ý Nghĩa Nghiệp Vụ | Cách Thức Thu Thập |
|---------|--------------|-------------------|---------------------|
| **Người đọc báo cáo** | `audience` | Ai là đối tượng tiêu thụ chính (Ban Giám Đốc, Đội Kinh Doanh, Kế Toán...)? | Người dùng nhập nhanh hoặc chọn gợi ý |
| **Đối tượng chính** | `mainEntity` | Bảng nào đại diện cho thực thể trung tâm của tập dữ liệu (Khách hàng, Đơn hàng, Giao dịch)? | Chọn từ danh sách các bảng vật lý thật (`tables`) |
| **Kỳ theo dõi mặc định** | `defaultPeriod` | Khi câu hỏi không nói rõ thời gian, mặc định phân tích theo kỳ nào? | Trắc nghiệm: Ngày (`day`), Tuần (`week`), Tháng (`month`), Quý (`quarter`), Năm (`year`) |
| **Cột mốc thời gian** | `timeColumn` | Cột nào là trục thời gian chính để lọc kỳ? | Chọn từ danh sách các cột kiểu Date/Timestamp do hệ thống tự lọc |

---

### Vòng 2: Chỉ Số Cốt Lõi & Công Thức Tính

Mục tiêu của Vòng 2 là xác lập các **thước đo thành công** của doanh nghiệp:

| Câu Hỏi | Mã Nhận Diện | Ý Nghĩa Nghiệp Vụ | Cách Thức Thu Thập |
|---------|--------------|-------------------|---------------------|
| **Chỉ số quan trọng nhất** | `keyMetrics` | 3-5 chỉ số quan trọng nhất cần luôn ưu tiên theo dõi? | Chọn nhiều từ danh sách Metrics đã khai báo |
| **Chỉ số cần làm rõ cách tính** | `metricsNeedingDefinition` | Những chỉ số nào có công thức phức tạp, dễ gây tranh cãi? | Chọn các metric chưa có mô tả/aiHint để người dùng bổ sung |
| **Chiều biến động tích cực** | `metricDirection` | Chỉ số nào mà **TĂNG là tốt**? (để tự động tô màu xanh/đỏ cho KPI) | Chọn danh sách metric (`up_good`); các chỉ số chi phí/lỗi sẽ được hiểu là giảm mới tốt |
| **Cột số hay dùng** | `numericColumnsOfInterest` | Nếu chưa có Metric định nghĩa trước: Cột số nào hay được cộng hoặc đếm nhất? | Chọn từ các cột định dạng số (`numeric`, `integer`) để AI đề xuất tạo Metric mới |

---

### Vòng 3: Điều Kiêng Kỵ & Bẫy Nghiệp Vụ (Gotchas & Taboos)

Đây là vòng quan trọng nhất giúp Semantix vượt trội hơn hẳn các công cụ BI truyền thống, loại bỏ triệt để các sai lầm ngớ ngẩn khi viết SQL:

| Câu Hỏi | Mã Nhận Diện | Rủi Ro Nghiệp Vụ Nếu Không Khai Báo | Giải Pháp Của Semantix |
|---------|--------------|-----------------------------------|------------------------|
| **Cột không được cộng dồn** | `nonAdditiveColumns` | Người dùng hỏi tổng, AI tự động dùng `SUM()` lên các cột tỷ lệ %, đơn giá hoặc số dư tài khoản tại cuối kỳ → Sai lệch số liệu nghiêm trọng. | Tự động sinh thẻ cảnh báo **Gotchas**: *"Không được cộng dồn (SUM) cột này — đây là tỷ lệ, số dư hoặc đơn giá."* |
| **Loại trừ nội bộ** | `internalExclusions` | Báo cáo bị nhiễu do lẫn các đơn hàng thử nghiệm (test), tài khoản nhân viên nội bộ, hoặc đơn vị demo. | Tự động bổ sung điều kiện lọc mặc định vào `aiInstructions`. |
| **Thuật ngữ dễ nhầm lẫn** | `confusableTerms` | Cột `ngay_tao` hay bị nhầm với `ngay_thanh_toan`; `doanh_thu_tam_tinh` bị nhầm với `thuc_thu`. | Tự động sinh ghi chú **Anti-Synonyms** ("cột này không phải là...") cho reviewer. |
| **Bảng không được dùng** | `unusedTables` | AI đọc nhầm vào các bảng log kỹ thuật, bảng sao lưu tạm (`_backup`, `_temp`) gây chậm và sai lệch. | Đưa các bảng đã chọn vào danh sách cấm truy cập (`excludedTables`). |

---

## 3. Cơ Chế Tự Động Chuyển Đổi Thành Đề Xuất (Change Request)

Sau khi người dùng hoàn thành 3 vòng phỏng vấn, Semantix **không áp dụng trực tiếp ngay vào production** mà kích hoạt pipeline chuyển đổi tất định (`interviewAnswersToProposal`):

```
[Câu Trả Lời Khảo Sát] ───> [Deterministic Proposal Builder] ───> [Bản Nháp Change Request]
                               (Không gọi LLM, chuẩn hoá ID)        (Chờ Chuyên Gia Duyệt)
```

### Cấu Trúc Bản Đề Xuất Tự Động Tạo Ra

1. **`aiInstructions` (Hướng Dẫn Chung Cho Trợ Lý)**:
   - Tổng hợp đối tượng chính, kỳ mặc định, và các chỉ số ưu tiên thành văn bản chỉ dẫn ngắn gọn cho AI.
2. **`defaultTimeColumnId` & `defaultTimeGrain`**:
   - Thiết lập cấu hình thời gian chuẩn cho toàn bộ Context.
3. **`columns` (Gotchas Cho Từng Cột)**:
   - Gắn cờ cảnh báo cấm cộng dồn cho tất cả các cột được chọn trong mục `nonAdditiveColumns`.
4. **`metrics` (Trend Direction)**:
   - Cập nhật thuộc tính `trendDirection: 'up_good'` cho các chỉ số được xác nhận tăng là tốt.
5. **`metricCandidates` (Gợi Ý Chỉ Số Mới)**:
   - Nếu trong Vòng 2 bạn chọn các cột số hay dùng, hệ thống sẽ đề xuất tạo mới các Metric với công thức tính tương ứng.
6. **`note` (Ghi Chú Cho Chuyên Gia Review)**:
   - Liệt kê các chỉ số cần bổ sung mô tả và các cột dễ nhầm lẫn để người quản trị kiểm tra kỹ trước khi duyệt.

---

## 4. Quy Trình Phê Duyệt & Kích Hoạt (Governance)

Semantix áp dụng mô hình quản trị dữ liệu chặt chẽ:

> [!TIP]
> **Change Request Pipeline**: Mọi kết quả phỏng vấn đều được lưu dưới dạng một **Yêu Cầu Thay Đổi (Change Request)** trong trạng thái Nháp (Draft). Chỉ có người quản trị ngữ cảnh (**Context Owner** hoặc **Data Steward**) mới có quyền xem xét, điều chỉnh và bấm **Phê Duyệt (Approve)** để kích hoạt vào hệ sinh thái phân tích.

Quy trình này đảm bảo:
* Nghiệp vụ của người dùng cuối được lắng nghe đầy đủ.
* Nhưng toàn bộ cấu hình ngữ cảnh vẫn được kiểm duyệt chặt chẽ bởi đội ngũ dữ liệu, không gây hỗn loạn hay phá vỡ các quy chuẩn chung của tổ chức.

---

## 5. Cách Khởi Động Phỏng Vấn

Bạn có thể bắt đầu phỏng vấn nghiệp vụ bằng hai cách:
1. **Trong giao diện Studio**: Mở **Data Analytics > Contexts**, chọn Context cần bổ sung và nhấn nút **Phỏng Vấn Ngữ Cảnh (Context Interview)**.
2. **Trong AI Chat**: Gõ lệnh `/context-interview` để trợ lý kích hoạt bộ câu hỏi khảo sát trực tiếp dưới dạng thẻ tương tác.
