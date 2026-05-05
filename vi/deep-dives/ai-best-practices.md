# Tối Ưu Hóa AI & Best Practices

Semantix dựa vào các mô hình ngôn ngữ lớn (LLMs) để dịch ngôn ngữ tự nhiên thành SQL. Mặc dù AI rất tiên tiến, nhưng nó không thể đọc được suy nghĩ của bạn. Độ chính xác của AI phụ thuộc hoàn toàn vào cách bạn định nghĩa các mô hình dữ liệu (data models) và các chỉ số (metrics).

Hãy tuân theo các "best practices" dưới đây để đảm bảo Semantix luôn sinh ra SQL chính xác 100% cho các câu hỏi nghiệp vụ của bạn.

## 1. Viết Mô Tả (Description) Chi Tiết

Trường **Description** là tín hiệu quan trọng nhất đối với AI. Đừng chỉ viết lại tên cột. Hãy giải thích dữ liệu đó đại diện cho cái gì và nó nên được sử dụng như thế nào.

**Mô tả Kém:**
> "Doanh thu"

**Mô tả Tốt:**
> "Tổng doanh thu gộp từ các đơn hàng thành công, tính bằng VNĐ. Không bao gồm các đơn hàng đã hoàn tiền hoặc bị hủy. Đây là chỉ số chính để theo dõi doanh số tổng."

## 2. Sử Dụng Rộng Rãi Từ Đồng Nghĩa (Synonyms)

Người dùng sẽ đặt cùng một câu hỏi theo nhiều cách khác nhau. Hãy định nghĩa các **Từ đồng nghĩa (Synonyms)** cho các metric của bạn để bắt các biến thể này.

**Metric:** `Tổng Doanh Thu`
**Synonyms Tốt:**
- `"doanh số bán"`
- `"tiền thu được"`
- `"thu nhập gộp"`
- `"tiền bán hàng"`

## 3. Đặt Tên Cột (Label) Rõ Ràng

Các cột trong database thường có tên mang tính kỹ thuật hoặc viết tắt (ví dụ: `cust_id_fk`, `trx_amt`). Hãy sử dụng trường **Label** để đặt cho chúng những cái tên thân thiện với con người.

| Cột Database | Label Kém | Label Tốt |
|-----------------|-----------|------------|
| `trx_amt` | Trx Amt | Số tiền giao dịch |
| `is_actv` | Is Actv | Là user hoạt động |
| `usr_loc` | Usr Loc | Vị trí người dùng |

## 4. Tận Dụng Các Quy Tắc Ngữ Cảnh (Context Rules)

Nếu một số metric nhất định không bao giờ được phép nhóm (GROUP BY) theo một số dimension nhất định (ví dụ: vì nó gây ra trùng lặp dữ liệu hoặc sai logic nghiệp vụ), hãy chỉ định rõ ràng cho AI trong phần cài đặt Context.

**Ví dụ Quy tắc Ngữ cảnh:**
> "Không bao giờ GROUP BY theo `Mã Cửa Hàng` khi đang tính `Doanh thu bán hàng Online`."

## 5. Xử Lý Ngày Tháng (Dates) Rõ Ràng

Nhiều bảng có thể có nhiều cột ngày tháng (ví dụ: `created_at`, `shipped_at`, `paid_at`). Khi người dùng hỏi "Doanh số tuần trước", AI cần biết phải sử dụng cột ngày nào.

Luôn luôn thiết lập một **Cột Thời Gian Mặc Định (Default Time Column)** trong phần cài đặt Context của bạn.

## Checklist Tổng Kết Để Đạt Độ Chính Xác 100%
- [ ] Mọi Metric đều có mô tả chi tiết, không mơ hồ
- [ ] Mọi Metric đều có ít nhất 3-5 từ đồng nghĩa
- [ ] Các cột database khó hiểu đã được cấp Label thân thiện
- [ ] Cột thời gian mặc định đã được thiết lập cho Context
- [ ] Các logic nghiệp vụ phức tạp đã được trừu tượng hóa (abstracted) thành các Trường tính toán (Calculated Fields)
