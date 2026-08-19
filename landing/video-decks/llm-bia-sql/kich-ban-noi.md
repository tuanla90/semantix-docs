# Kịch bản nói — "AI bịa cả cột" (llm-bia-sql)

**Định dạng mới:** slide HTML bạn tự bấm chuyển + mặt nói realtime (webcam góc dưới-phải qua OBS).
**Thời lượng đích:** ~5–6 phút (nói chậm hơn giọng AI, cứ tự nhiên).
**Tông:** sếp data lão làng ngồi cafe gỡ rối cho đàn em. Ngôi "mình", gọi khán giả là "bạn / anh em". Câu ngắn, nhấn nhá, "..." là chỗ ngừng lấy nhịp. Không đọc như đọc bài.

> File slide: `deck.html` (mở bằng Chrome, bấm **F** để full màn hình).

---

## Cách quay (OBS)

1. Mở `deck.html` trong Chrome → bấm **F** (fullscreen).
2. OBS: thêm **Window Capture** (hoặc Display Capture) trỏ vào cửa sổ Chrome đó.
3. Thêm **Video Capture Device** (webcam) → kéo về **góc dưới-phải**. Slide đã chừa sẵn một ô ~470×470 ở đúng góc đó, không có chữ nào đè. Muốn thấy ranh giới ô chừa để canh: bấm **G** (bấm lần nữa để tắt trước khi quay).
4. Nhắc bài: để kịch bản này trên **điện thoại / màn hình 2**, không phải trên màn đang quay. (Bản này chưa có teleprompter gắn trong slide — mình thêm sau nếu bạn thấy cần.)
5. Phím khi trình bày: `→` hoặc **Space** = hiện ý kế / sang slide · `←` = lùi · **H** = ẩn thanh đếm + logo nếu muốn khung sạch.

**Mỗi dấu `▸ bấm` bên dưới = một lần nhấn `→`.** Cứ nói hết ý rồi bấm cho ý sau hiện ra — nhịp reveal chạy theo lời bạn, không phải bạn chạy theo nó.

---

## Slide 1 — Hook

*(Vào là thấy sẵn: "AI viết SQL đẹp long lanh.")*

> Bạn hỏi AI một câu về dữ liệu. Kiểu: "LTV trung bình của khách VIP là bao nhiêu?". Vài giây sau nó trả về một câu SQL. Gọn gàng. Thụt lề chuẩn. Đúng cú pháp từng dấu phẩy.

▸ **bấm** → hiện *"Mà bịa cả cột."*

> Chỉ có một vấn đề. Cái cột nó gọi tới... trong database của bạn không hề tồn tại.

▸ **bấm** → hiện dòng phụ

> Chào anh em, mình là Tuấn. Hôm nay mình kể chuyện này, vì nó là cái bẫy mà chín trên mười người đang cắm AI vào dữ liệu chưa nhìn ra.

---

## Slide 2 — Hiện trường

*(Thấy sẵn: câu hỏi "LTV trung bình của khách VIP?")*

> Câu hỏi rất đời thường thôi.

▸ **bấm** → hiện khối code

> Và đây là thứ nó trả về. Nhìn đẹp đúng không? Chạy thử một phát...

▸ **bấm** → hiện dòng cảnh báo đỏ

> Hai cái cột này — `customer_lifetime_value` với `segment` — trong kho của bạn không hề có. AI vừa bịa ra cả hai. Rất tự tin. Không một dòng nào bảo "tôi không chắc".

---

## Slide 3 — Phản xạ sai

> Phản xạ đầu tiên của gần như ai cũng giống nhau: "chắc con model này yếu, đổi con xịn hơn là xong".

▸ **bấm** → hiện *"✕ Không phải."*

> Không phải.

▸ **bấm** → hiện câu lớn

> Đây không phải lỗi vặt của một model dở. Nó là bản chất của cách mọi con LLM hoạt động. Mà hiểu được cái bản chất đó, mới là điều kiện đầu tiên để chặn nó.

---

## Slide 4 — Vì sao nó bịa

> Phải nhớ con LLM thực ra đang làm gì.

▸ **bấm** → *"không tra database"*

> Nó không tra database của bạn. Không hề.

▸ **bấm** → *"đoán chữ tiếp theo"*

> Nó đoán chữ tiếp theo nào nghe hợp lý nhất, dựa trên hàng tỷ dòng nó từng đọc.

▸ **bấm** → dòng phụ

> Trên mạng có cả nghìn cái kho đặt tên cột y như vậy. Nên với nó, viết ra `customer_lifetime_value` là lựa chọn hợp lý nhất. Bất kể kho của bạn có hay không.

---

## Slide 5 — Ẩn dụ (khúc này kể chậm, đây là "trái tim" của video)

*(Thấy sẵn: "AI = nhân viên mới cực tự tin, không ai đưa sơ đồ kho")*

> Mình hay hình dung thế này cho dễ. AI giống một bạn nhân viên mới, cực kỳ tự tin, ngày đầu đi làm mà không ai đưa cho cái sơ đồ kho.

▸ **bấm** → *"Lấy giúp anh số ở kệ B7"*

> Bạn bảo: "lấy giúp anh số ở kệ B bảy". Bạn này chưa từng thấy kho của mình bao giờ. Nhưng mọi cái kho cậu từng làm... đều có kệ B bảy.

▸ **bấm** → hiện dãy kệ B1–B5 + B7?

> Thế là cậu gật đầu chắc nịch, đi thẳng tới chỗ lẽ ra là B bảy, bê về một thùng hàng. Trông rất chuyên nghiệp.

▸ **bấm** → dòng chốt

> Chỉ có điều... kho của mình đánh số tới B năm là hết. Cậu lấp chỗ trống bằng thứ nghe hợp lý, chứ không phải thứ có thật. Con AI y hệt vậy.

---

## Slide 6 — Tệ hơn: chạy ngon mà số vẫn sai

> Mà bịa hẳn ra một cái cột thì... còn may. Chạy lên văng lỗi ngay, mình biết đường mà sửa.

▸ **bấm** → câu lớn

> Đáng sợ là mấy kiểu chạy ngon lành mà số vẫn sai.

▸ **bấm** → chuỗi "nối nhầm → đếm lặp → thổi phồng"

> Ví dụ nó nối hai bảng, đơn hàng với chi tiết đơn, mà nối nhầm. Mỗi đơn bị đếm lặp lại theo số món trong đơn.

▸ **bấm** → dòng phụ

> Một khách mua ba món trong một đơn, thế là doanh thu tự nhân ba. Bảng vẫn đẹp, vẫn ra số. Và không một ai biết là nó sai.

---

## Slide 7 — Kiểu đắt nhất: đoán định nghĩa nghiệp vụ

*(Thấy sẵn: "AI đoán định nghĩa nghiệp vụ")*

> Nhưng kiểu đắt nhất, là khi nó đoán định nghĩa nghiệp vụ. Vì cái này chạm thẳng vào con số bạn mang lên bàn họp.

▸ **bấm** → câu hỏi "trừ chiết khấu chưa?..."

> Bạn hỏi: "doanh thu tháng này bao nhiêu?". Khoan đã. Doanh thu của công ty bạn... trừ chiết khấu chưa? Có tính mấy đơn hoàn không?

▸ **bấm** → hiện hai con số 4,2 ≠ 3,8

> AI không biết. Nên nó đoán. Lần này lấy số gộp, ra bốn phẩy hai tỷ. Lần sau trừ chiết khấu, ra ba phẩy tám. *(số ví dụ thôi nhé.)*

▸ **bấm** → dòng chốt

> Hai con số lệch nhau mười lăm phần trăm. Cả hai đều đúng cú pháp. Và bạn không cách nào biết lần nào mới là định nghĩa thật của mình.

---

## Slide 8 — Chuyện thật (nhìn thẳng máy, kể như tâm sự)

> Cái bẫy này á... mình gặp mỗi ngày. Ở một ngân hàng mình đang làm.

▸ **bấm** → dòng "doanh thu không có một nghĩa"

> Nghiệp vụ ngân hàng nó phức tới mức chữ "doanh thu" không có một nghĩa duy nhất. Nó tách theo sản phẩm, theo thời điểm ghi nhận, theo đơn đã tất toán hay chưa.

▸ **bấm** → dòng "gắn thẳng LLM..."

> Bạn mà gắn thẳng con LLM vào kho, thiếu cái lớp neo định nghĩa ở giữa, thì nó đoán bừa một nhánh rồi trả về con số trông rất dứt khoát. Nguy chính ở chỗ trông dứt khoát đó.

---

## Slide 9 — Sai cách vs đúng cách

*(Thấy sẵn: "Cách chặn KHÔNG phải tìm một AI thông minh hơn")*

> Nên cách chặn, mình nói luôn: không phải đi tìm một con AI thông minh hơn.

▸ **bấm** → dòng "bịa mượt hơn"

> Con model to hơn thì vẫn đoán token thôi. Nó chỉ bịa mượt hơn. Mà mượt hơn nghĩa là khó phát hiện hơn. Đặt cược vào "AI ngày càng giỏi" là đặt cược sai chỗ.

▸ **bấm** → câu thesis "thu hẹp không gian"

> Cách làm ngược lại: đừng cố làm AI giỏi hơn. Mà thu hẹp cái không gian nó được phép xoay xở... tới khi gần như không còn chỗ nào để bịa.

---

## Slide 10 — 5 tuyến, mỗi tuyến bịt một hướng

> Cụ thể là năm tuyến. Mỗi tuyến bịt một hướng.

▸ **bấm** → tuyến 1

> Một: đưa cho nó đúng danh sách bảng cột có thật, kiểm tên trước khi chạy. Thu hẹp cái nó được gọi tới.

▸ **bấm** → tuyến 2

> Hai: khai báo sẵn quan hệ giữa các bảng. Thu hẹp cách nó nối bảng.

▸ **bấm** → tuyến 3

> Ba: cấm mấy phép tính vô nghĩa. Thu hẹp phép nó được làm.

▸ **bấm** → tuyến 4

> Bốn, cái quan trọng nhất: mỗi khái niệm định nghĩa đúng một lần, chuẩn, một chỗ. Cái này gọi là semantic layer. Thu hẹp định nghĩa nó được dùng.

▸ **bấm** → tuyến 5

> Năm: gặp câu mơ hồ thì dừng lại hỏi, đừng đoán. Thu hẹp cái nó được tự ý trả lời.

---

## Slide 11 — Chốt (mic-drop) + mời theo dõi

> Quay lại bạn nhân viên mới lúc nãy. Cậu đáng tin hơn không phải vì mình tuyển được người thông minh hơn. Mà vì cuối cùng có người đưa cho cậu cái sơ đồ kho thật, đánh dấu rõ kệ nào không có, và dặn: gặp gì không chắc thì hỏi, đừng bịa.

▸ **bấm** → câu lớn 1

> Cho nên lần tới, ai đó hứa với bạn là "cứ gắn AI thẳng vào database, hỏi gì cũng trả lời được"...

▸ **bấm** → câu lớn 2 (nhấn mạnh, ngừng một nhịp)

> ...bạn hỏi lại đúng một câu thôi: thế khi nó không chắc — nó đoán, hay nó dừng lại?

▸ **bấm** → dòng brand

> Trả lời được câu đó, là bạn đã đứng trước cái bẫy mà phần lớn người ta chưa nhìn ra. Kênh mình mỗi tuần một khái niệm data kiểu này. Thấy có ích thì theo dõi để mình làm tiếp nhé. Cảm ơn anh em đã xem.

---

## Ghi chú diễn (đọc trước khi quay)

- **Hook 8 giây đầu quyết định**: slide 1 nói dồn, đừng lê thê. Chào ("mình là Tuấn") để *sau* khi cú "bịa cột" đã đáp xuống.
- **Chậm lại ở slide 5 và 8** — ẩn dụ cái kho và chuyện ngân hàng là hai chỗ giữ người xem. Nhìn thẳng camera ở slide 8.
- Số đọc kiểu Việt: "bốn phẩy hai tỷ", "mười lăm phần trăm". Đã cài câu "số ví dụ thôi nhé" ở slide 7 — giữ, đừng bỏ.
- Được phép vấp / nói lại một câu; cắt sau. Đừng quay lại từ đầu vì một lỗi nhỏ.
- Brand-light: cả video chỉ chạm sản phẩm nhẹ ở slide 10 (semantic layer, nói như *khái niệm*) và lời mời theo dõi cuối. Không quảng cáo Semantix.

## Sau khi quay
- **Short 9:16 (~40s)**: cắt từ slide 1 (hook "bịa cột") + ghép thẳng câu chốt slide 11 ("nó đoán hay nó dừng lại?"). Đủ tự đứng một mình.
- **Thumbnail**: dùng lại chất `thumb-src/ai-viet-sql-nghe-data.html` (SQL gạch đỏ + mặt bên phải). Mình dựng bản riêng cho bài này khi bạn gửi 1 ảnh mặt cắt sẵn (nền trong / xoá phông).
- **Tiêu đề gợi ý**: "AI viết SQL trong 3 giây — rồi bịa ra cột không tồn tại" · "Vì sao AI tự tin bịa số liệu (và cách chặn)".
