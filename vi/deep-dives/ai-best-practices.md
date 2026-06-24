# Tối Ưu Hóa AI & Best Practices

Độ chính xác của AI phụ thuộc trực tiếp vào chất lượng cấu hình Data Model và Context. Đây là hướng dẫn đầy đủ để AI trả lời đúng mọi câu hỏi.

---

## Tại Sao AI Trả Lời Sai?

AI của Semantix không "biết" database của bạn — nó chỉ đọc những gì bạn mô tả trong Data Model. Khi AI sai, nguyên nhân thường là một trong:

1. **Thiếu Description** → AI đoán sai cột dùng để tính gì
2. **Thiếu Synonyms** → User gõ "doanh thu" nhưng Metric tên "revenue" → AI không match
3. **Label cột kỹ thuật** → Cột `trx_amt_vnd` không có Label → AI không biết đây là "Số tiền giao dịch"
4. **Metric thiếu Filter** → Tính doanh thu nhưng không lọc đơn đã hủy → kết quả cao hơn thực tế
5. **Relations sai** → AI JOIN sai bảng → dữ liệu bị nhân lên hoặc thiếu
6. **Default Time Column chưa đặt** → Hỏi "tháng này" → AI không biết dùng cột ngày nào

---

## Nguyên Tắc 1: Viết Description Chi Tiết

**Description là tín hiệu quan trọng nhất** cho AI hiểu cột/metric dùng để làm gì.

### Mẫu Description Tốt Cho Cột

```
[Tên dữ liệu] — [Đơn vị/Format] — [Bao gồm/Loại trừ gì] — [Cách tính nếu cần]
```

**Ví dụ thực tế:**

| Cột | Description Kém | Description Tốt |
|-----|----------------|----------------|
| `revenue` | "Doanh thu" | "Doanh thu gộp từ đơn hàng đã thanh toán, tính bằng VNĐ. Không bao gồm đơn hủy (status='cancelled') và đơn đang chờ (status='pending'). Đây là chỉ số doanh thu chính cho báo cáo tháng." |
| `status` | "Trạng thái" | "Trạng thái đơn hàng. Giá trị: 'pending'=chờ xác nhận, 'confirmed'=đã xác nhận, 'shipping'=đang giao, 'delivered'=đã giao, 'cancelled'=đã hủy, 'refunded'=đã hoàn tiền. Chỉ tính doanh thu với status IN ('confirmed','delivered')." |
| `created_at` | "Ngày tạo" | "Ngày và giờ khách hàng đặt đơn hàng (UTC+7). Đây là cột thời gian chính dùng để lọc và nhóm theo ngày/tháng/quý/năm." |
| `customer_type` | "Loại KH" | "Phân loại khách hàng: 'retail'=bán lẻ, 'wholesale'=bán sỉ, 'vip'=khách VIP. VIP được giảm thêm 5% và ưu tiên xử lý." |

### Mẫu Description Tốt Cho Metric

```
[Công thức tính] — [Điều kiện lọc] — [Đơn vị] — [Dùng khi nào]
```

**Ví dụ:**
> "Tổng doanh thu thuần = SUM(so_luong × don_gia × (1 - giam_gia / 100)) từ các đơn đã giao thành công. Tính bằng VNĐ. Dùng cho báo cáo doanh thu chính thức."

---

## Nguyên Tắc 2: Thêm Synonyms Rộng Rãi

Người dùng đặt câu hỏi theo nhiều cách khác nhau. Thêm Synonyms để AI match đúng dù người dùng dùng từ nào.

**Metric: Tổng Doanh Thu**

Synonyms nên bao gồm:
- Tiếng Việt thông dụng: `doanh thu`, `doanh số`, `tiền bán hàng`, `tiền thu được`, `thu nhập`
- Viết tắt: `DT`, `DS`
- Tiếng Anh: `revenue`, `sales`, `income`
- Cách gọi nội bộ công ty: `GMV`, `net revenue`, `gross sales`

**Metric: Số Đơn Hàng**

Synonyms: `đơn hàng`, `đơn`, `orders`, `số đơn`, `đơn đặt hàng`, `transactions`, `giao dịch`

> Thêm càng nhiều synonym càng tốt — không có hại gì, chỉ có lợi.

---

## Nguyên Tắc 3: Label Cột Thân Thiện

Database thường có tên kỹ thuật. Đặt **Label** để hiển thị tên thân thiện:

| Tên Cột Database | Label Kém | Label Tốt |
|----------------|-----------|-----------|
| `cust_id_fk` | Cust Id Fk | Mã Khách Hàng |
| `trx_amt_vnd` | Trx Amt Vnd | Số Tiền Giao Dịch (VNĐ) |
| `is_actv` | Is Actv | Đang Hoạt Động |
| `usr_loc_cd` | Usr Loc Cd | Mã Khu Vực |
| `dt_created_utc` | Dt Created Utc | Ngày Tạo (UTC+7) |
| `qty_sold_pcs` | Qty Sold Pcs | Số Lượng Bán (cái) |

---

## Nguyên Tắc 4: Filter Trong Metric

Sai lầm phổ biến nhất: tạo Metric `Tổng Doanh Thu` mà không có filter, khiến tính cả đơn hủy, đơn lỗi.

**Metric không có filter:**
```sql
SUM(revenue)  -- Tính tất cả đơn, kể cả đơn hủy
```

**Metric có filter đúng:**
```sql
SUM(revenue) WHERE status IN ('delivered', 'confirmed')
-- Chỉ tính đơn đã giao hoặc đã xác nhận
```

**Trong cấu hình Metric của Semantix:**
- Field: **Filter**
- Giá trị: `status IN ('delivered', 'confirmed')`

### Các Filter Phổ Biến

| Metric | Filter Cần Có |
|--------|-------------|
| Doanh thu | `status IN ('paid','delivered')` |
| Đơn hàng hợp lệ | `status != 'cancelled'` |
| Khách hàng active | `is_active = true` |
| Sản phẩm trong kho | `stock > 0 AND is_discontinued = false` |
| User có hoạt động | `last_login IS NOT NULL` |

---

## Nguyên Tắc 5: Đặt Default Time Column

Khi người dùng hỏi "tháng này", "tuần qua", "năm ngoái" — AI cần biết dùng cột ngày nào.

**Cấu hình trong Context:**
- Studio → DABI → Data Models → Chọn model → Contexts → Chọn Context
- Field: **Default Time Column**
- Giá trị: `order_date` (hoặc cột ngày chính nhất của bảng)

**Nếu bảng có nhiều cột ngày:**

| Cột Ngày | Ý Nghĩa | Default? |
|----------|---------|---------|
| `order_date` | Ngày đặt hàng | ✅ (thường dùng nhất) |
| `payment_date` | Ngày thanh toán | ❌ |
| `shipped_date` | Ngày giao hàng | ❌ |
| `created_at` | Ngày tạo record | ❌ |

Đặt `order_date` làm default. Khi user hỏi "doanh thu tháng này" → query `WHERE order_date BETWEEN...`

---

## Nguyên Tắc 6: Dùng Calculated Fields Cho Logic Phức Tạp

Đừng để AI tự tính toán business logic phức tạp — định nghĩa sẵn trong Calculated Fields:

| Thay Vì | Làm Thế Này |
|---------|-------------|
| AI tự tính: `(revenue - cost) / revenue × 100` | Tạo Calculated Field `gross_margin_pct` |
| AI tự phân loại: `IF revenue > 10M THEN 'VIP'` | Tạo Calculated Field `customer_tier` |
| AI tự tính ngày: `DATEDIFF(current, last_order)` | Tạo Calculated Field `days_since_last_order` |

---

## Nguyên Tắc 7: Context Rules Cho Logic Nghiệp Vụ Đặc Thù

Trong phần **Context → Instructions** (hướng dẫn cho AI), viết các quy tắc mà AI không thể tự suy luận:

**Ví dụ instructions tốt:**
```
- Khi người dùng hỏi "doanh thu", luôn dùng metric "Doanh thu thuần" (net_revenue), không phải "gross_revenue"
- "Tháng này" nghĩa là từ ngày 1 đến hôm nay của tháng hiện tại
- Khi hỏi về "chi nhánh", đây là cột "branch_code", không phải "warehouse_code"
- Không GROUP BY theo "customer_id" khi đang tính "Doanh thu online" vì gây trùng lặp
- "Số lượng" khi nói về sản phẩm nghĩa là "qty_sold", khi nói về đơn hàng nghĩa là "order_count"
```

---

## Checklist Trước Khi Go-Live

### Data Model

- [ ] Mọi cột có Description rõ ràng (đặc biệt cột có giá trị enum)
- [ ] Mọi cột có Label thân thiện (không phải tên kỹ thuật)
- [ ] Calculated Fields đã định nghĩa cho các công thức phức tạp

### Metrics

- [ ] Mọi Metric có Description giải thích công thức và điều kiện
- [ ] Mọi Metric có ít nhất 3-5 Synonyms
- [ ] Mọi Metric có Filter đúng (không tính đơn hủy, record lỗi)
- [ ] Aggregation function phù hợp (SUM/COUNT/COUNT_DISTINCT/AVG)

### Context

- [ ] Default Time Column đã đặt
- [ ] Instructions/Rules viết các quy tắc nghiệp vụ đặc thù
- [ ] Suggestions đã tạo (5-10 câu hỏi gợi ý điển hình)

### Test Trước Khi Dùng

- [ ] Test ít nhất 10 câu hỏi phổ biến nhất
- [ ] Kiểm tra View SQL với mỗi câu hỏi — SQL có đúng logic không?
- [ ] Test các câu hỏi có nhiều cách diễn đạt khác nhau
- [ ] Test với người dùng thực (không phải chỉ admin)

---

## Chẩn Đoán Khi AI Sai

| Triệu Chứng | Kiểm Tra | Sửa Ở Đâu |
|-------------|---------|-----------|
| AI tính số sai | View SQL → xem filter | Thêm Filter vào Metric |
| AI không hiểu từ người dùng dùng | AI không match Metric | Thêm Synonym cho Metric |
| AI dùng sai cột | View SQL → xem cột nào được dùng | Cải thiện Description của cột |
| AI JOIN sai bảng | View SQL → xem JOIN clause | Sửa Relations trong Data Model |
| AI không biết "tháng này" là gì | Kết quả trống hoặc sai ngày | Đặt Default Time Column trong Context |
| Kết quả bị nhân đôi | View SQL → có JOIN tạo nhiều dòng | Đổi COUNT sang COUNT_DISTINCT, kiểm tra Relations |
