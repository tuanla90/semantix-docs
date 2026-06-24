# Content Plan — Blog Semantix

> Mục tiêu: **SEO + Nurture + Thought Leadership** (kết hợp). Backlog ~28 chủ đề đã ưu tiên, không ràng lịch cứng. Ngôn ngữ: **tiếng Việt**.
> Bài viết lưu tại `landing/src/content/blog/<slug>.md` (slug sạch, không số) — tự xuất hiện trên blog. **Mã bài & quy trình đăng ký BẮT BUỘC:** xem mục ⚙️ ngay dưới.

## ⚙️ Quy ước mã bài & quy trình đăng ký (BẮT BUỘC — đọc trước khi viết)

> Áp dụng cho **mọi người/AI** viết bài song song. Mục tiêu: không bao giờ trùng mã, trùng slug, hay trùng chủ đề.

### Quy ước mã bài
- Mỗi bài có **một mã duy nhất** dạng `<dm>-<NNN>` — `<dm>` là mã danh mục, `<NNN>` là số 3 chữ số **đếm riêng trong từng danh mục** (001–999 → hàng trăm bài/danh mục).
- Mã danh mục: `kt` Kiến Thức Nền Tảng · `pt` Phân Tích Dữ Liệu · `hd` Hướng Dẫn Thực Chiến · `ai` AI & Công Nghệ · `uc` Câu Chuyện & Use Case · `ss` So Sánh & Lựa Chọn.
- **Tên file = slug chủ đề, KHÔNG chứa số:** `landing/src/content/blog/<slug>.md` (vd `text-to-sql.md`) → URL `/blog/<slug>/`. Mã `<dm>-<NNN>` lưu ở frontmatter `code:` (đã khai trong `src/content/config.ts`), **không** nằm trong tên file/URL.
- Cover cùng slug: `landing/public/blog/covers/<slug>.svg`, khai báo `cover: "/blog/covers/<slug>.svg"`.

### Quy trình bắt buộc (ĐĂNG KÝ trước khi viết)
1. **Mở file này, chọn bài** trong backlog (mục C). Nếu là chủ đề mới chưa có dòng → **thêm dòng** vào đúng bảng danh mục, lấy **mã kế tiếp còn trống** của danh mục đó (số lớn nhất hiện có + 1).
2. **Xí chỗ:** đổi Tier dòng đó thành `✍️ <tên/agent>` rồi **lưu file này NGAY** — đây là bước chống hai người cùng lấy một mã/slug. Quét cả bảng để chắc slug + chủ đề chưa ai làm.
3. **Viết bài:** `code: "<dm>-<NNN>"` trong frontmatter, tên file = `<slug>.md`, thêm cover cùng slug.
4. **Viết xong:** quay lại file này, đổi dòng thành `✅` và điền slug vào cột "Slug / Nguồn".
5. **Nếu đổi slug** một bài đã có: sửa cột slug ở đây + đổi tên file cover + sửa mọi link `/blog/<slug-cũ>/` trong các bài khác.

> Quy tắc vàng: **mã lấy theo danh mục, không theo bộ đếm toàn cục.** Hai người viết hai danh mục khác nhau không bao giờ đụng số; trong cùng danh mục, bảng C là "sổ cấp số" duy nhất — xí chỗ trước, viết sau.

## A. Chiến lược: 3 trụ × phễu × đối tượng

| Trụ | Mục tiêu | Tầng phễu | Đối tượng chính | Tỷ lệ |
|---|---|---|---|---|
| SEO / Organic | Kéo traffic từ search | TOFU | Người mới tìm hiểu BI/AI data | ~40% |
| Educate & Nurture | Dẫn dắt thấy giá trị → dùng thử | MOFU | Chủ SME đa kênh, COO/CMO | ~40% |
| Thought Leadership | Xây uy tín chuyên môn AI+BI | BOFU | BI analyst, data lead, đối tác | ~20% |

Nguyên tắc tone: *"viết cho người làm, không phải người nghiên cứu"* — hook tình huống thực, ví dụ Việt Nam (Shopee/TikTok Shop/KiotViet), kết bằng hành động.

> **🧭 Định vị sản phẩm cập nhật (2026-12 — BẮT BUỘC theo khi viết bài liên quan dữ liệu):**
> - **Đưa dữ liệu đa kênh về cùng chỗ → dùng góc BẢNG ẢO (virtual table)**: gộp (union) + làm sạch (clean) ngay *lúc truy vấn*, **không copy dữ liệu** (no-copy, real-time). KHÔNG còn quảng bá tính năng Sync/đồng bộ-copy-về-kho như giải pháp chính (tính năng sync vẫn tồn tại nhưng không phải thông điệp marketing).
> - **Database khuyến nghị = NocoBase** (database no-code Semantix cung cấp). Kết nối `nocobase` của Semantix **tự đọc định nghĩa** (tên cột, kiểu + loại ngữ nghĩa, enum kèm nhãn, quan hệ + khóa ngoại) từ metadata NocoBase → người dùng khỏi define lại trong Ngữ cảnh ngữ nghĩa. (Nhấn phần "tự đọc schema"; tránh hứa quá các năng lực khác.)
> - Thuật ngữ sản phẩm tiếng Việt: **Kết nối · Mô hình dữ liệu · Ngữ cảnh ngữ nghĩa · Bảng ảo**.


## B. Category (6)

1. **Kiến Thức Nền Tảng** *(có sẵn)* — SEO/TOFU
2. **Phân Tích Dữ Liệu** *(có sẵn)* — kỹ thuật phân tích
3. **Hướng Dẫn Thực Chiến** *(có sẵn)* — how-to/nurture
4. **AI & Công Nghệ** *(mới)* — chiều sâu kỹ thuật
5. **Câu Chuyện & Use Case** *(mới)* — theo ngành/phân khúc
6. **So Sánh & Lựa Chọn** *(mới)* — buyer guide/BOFU

## C. Backlog (Tier: 🔴 Làm trước · 🟡 Tiếp theo · ⚪ Sau · ✍️ Đang viết · ✅ Đã có) — *mã = `<dm>-<NNN>`, đếm riêng mỗi danh mục*

### 1 — Kiến Thức Nền Tảng (`kt`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| kt-001 | Semantic Layer là gì & vì sao mọi DN cần | ✅ | `semantic-layer` |
| kt-002 | Text-to-SQL là gì: AI biến câu hỏi tiếng Việt thành SQL ra sao | ✅ | `text-to-sql` |
| kt-003 | Business Intelligence cho SME: hiểu đúng trong 10 phút | ✅ | `bi-cho-sme` |
| kt-004 | Row-Level Security: vì sao mỗi nhân viên chỉ thấy data của mình | ✅ | `row-level-security` |
| kt-005 | RAG là gì & vì sao quan trọng với AI phân tích dữ liệu | ✅ | `rag-la-gi` |
| kt-006 | Metric – Dimension – KPI: vỡ lòng từ vựng dữ liệu | ✅ | `metric-dimension-kpi` |
| kt-007 | Self-service analytics: trả quyền hỏi data về tay business | ✅ | `self-service-analytics` |
| kt-008 | Data warehouse là gì — và vì sao SME chưa cần đến nó | ✅ | `data-warehouse-sme` |
| kt-009 | "Một nguồn sự thật" thật ra nghĩa là gì — và vì sao bạn đang có năm nguồn | ✅ | `mot-nguon-su-that` |
| kt-010 | Dữ liệu bẩn: vì sao 80% thời gian phân tích là dọn dẹp, không phải phân tích | ✅ | `du-lieu-ban` |
| kt-011 | ETL vs ELT: đưa data về một chỗ mà không cần biết một dòng code | ✅ | `etl-vs-elt` |
| kt-012 | Đưa data cho AI có an toàn không? Ai thấy gì, lưu ở đâu, ai kiểm soát | ✅ | `data-cho-ai-an-toan` |
| kt-013 | OLTP vs OLAP: vì sao đừng chạy báo cáo thẳng trên database bán hàng | ✅ | `oltp-vs-olap` |
| kt-014 | Data modeling (fact & dimension): cách sắp bảng quyết định câu hỏi hỏi được | ✅ | `data-modeling-fact-dimension` |
| kt-015 | Data governance: ai sở hữu con số & ai chịu trách nhiệm khi nó sai | ✅ | `data-governance` |
| kt-016 | Bảo vệ dữ liệu cá nhân (Nghị định 13/2023): SME thu data khách cần biết gì | ✅ | `bao-ve-du-lieu-ca-nhan-nghi-dinh-13` |
| kt-017 | Embedding & vector search: vì sao AI hiểu câu gần nghĩa — nền tảng dưới RAG | ✅ | `embedding-vector-search` |
| kt-027 | Data Lake vs Data Warehouse: SME cần cái nào và khi nào | ✅ | `data-lake-vs-warehouse` |
| kt-028 | Thống kê mô tả (Series · P1): độ lệch chuẩn & phương sai | ✅ | `do-lech-chuan` |
| kt-029 | Thống kê mô tả (P2): phân vị P50/P90/P99 | ✅ | `phan-vi-percentile` |
| kt-030 | Thống kê mô tả (P3): đọc hình dạng phân phối | ✅ | `doc-hinh-dang-phan-phoi` |
| kt-031 | Thống kê mô tả (P4): phần trăm vs điểm phần trăm | ✅ | `phan-tram-vs-diem-phan-tram` |
| kt-032 | Thống kê mô tả (P5): trung bình có trọng số | ✅ | `trung-binh-co-trong-so` |
| kt-018 | Tư duy dựa trên dữ liệu là gì (Series Tư duy dữ liệu · P1) | ✅ | `tu-duy-du-lieu-la-gi` |
| kt-019 | Bắt đầu từ câu hỏi, không từ dữ liệu (P2) | ✅ | `bat-dau-tu-cau-hoi` |
| kt-020 | Tín hiệu vs nhiễu (P7) | ✅ | `tin-hieu-vs-nhieu` |
| kt-021 | Sự tiến hóa của BI: 4 nấc trưởng thành (mô tả→đề xuất) | ✅ | `tien-hoa-bi` |
| kt-022 | Goodhart & guardrail metrics (P8) | ✅ | `goodhart-guardrail-metrics` |
| kt-023 | Quyết định khi dữ liệu chưa đủ (P9) | ✅ | `quyet-dinh-khi-thieu-du-lieu` |
| kt-024 | Thống kê cho KD (Series · P1): mẫu & tổng thể | ✅ | `mau-va-tong-the` |
| kt-025 | Thống kê cho KD (P2): độ tin cậy & p-value | ✅ | `do-tin-cay-p-value` |
| kt-026 | Thống kê cho KD (P3): base rate & xác suất ngược | ✅ | `base-rate-xac-suat-nguoc` |

### 2 — Phân Tích Dữ Liệu (`pt`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| pt-001 | Cohort Analysis (Phần 1): ảo ảnh của con số tổng | ✅ | `cohort-analysis` |
| pt-002 | Cohort (Phần 2): Retention & PMF — đọc đường cong giữ chân | ✅ | `cohort-retention-pmf` |
| pt-003 | Cohort (Phần 3): Behavioral — theo kênh & activation moment | ✅ | `cohort-behavioral` |
| pt-004 | Cohort (Phần 4): Revenue & LTV theo ngành | ✅ | `cohort-revenue-ltv` |
| pt-005 | RFM Segmentation: phân khúc khách để bán đúng người | ✅ | `rfm-segmentation` |
| pt-006 | Funnel Analysis: tìm chỗ rò rỉ trong phễu bán hàng | ✅ | `funnel-analysis` |
| pt-007 | Pareto 80/20: 20% sản phẩm nào nuôi 80% lợi nhuận | ✅ | `pareto-80-20` |
| pt-008 | Đọc tăng trưởng đúng cách: MoM, YoY và bẫy số liệu | ✅ | `doc-tang-truong-mom-yoy` |
| pt-009 | Anomaly detection: tự phát hiện bất thường doanh thu | ✅ | `anomaly-detection` |
| pt-010 | Vintage analysis cho tài chính & cho vay | ✅ | `vintage-analysis` |
| pt-011 | Market Basket: sản phẩm nào "đi cùng nhau" — và cách bán kèm đúng | ✅ | `market-basket-ban-kem` |
| pt-012 | Churn prediction: nhận ra khách sắp rời đi trước khi họ rời | ✅ | `churn-prediction` |
| pt-013 | Giỏ hàng bỏ quên: tiền đang nằm ngay trước cửa checkout | ✅ | `gio-hang-bo-quen` |
| pt-014 | Mùa vụ & Tết: đọc seasonality để không vừa cháy hàng vừa tồn kho | ✅ | `mua-vu-tet-seasonality` |
| pt-015 | ABC inventory: 20% mã hàng giữ 80% vốn tồn — đừng quản như nhau | ✅ | `abc-inventory` |
| pt-016 | RFM nâng cao: scoring lệch, 11 nhóm, ma trận dịch chuyển | ✅ | `rfm-nang-cao` |
| pt-019 | Growth Accounting (Phần 3): từ user sang tiền — Net Dollar Retention | ✅ | `growth-accounting-revenue` |
| pt-017 | Growth Accounting (Phần 2): Quick Ratio — nhịp tim tăng trưởng | ✅ | `growth-accounting-quick-ratio` |
| pt-018 | Growth Accounting (Phần 1): phương trình tăng trưởng & con số tăng ròng giấu sự thật | ✅ | `growth-accounting` |
| pt-021 | Growth Accounting (Phần 4): thực chiến — dựng bảng growth accounting | ✅ | `growth-accounting-thuc-chien` |
| pt-020 | Funnel nâng cao: cái phễu là lời nói dối tiện lợi — khi nào nó khiến bạn sửa nhầm chỗ | ✅ | `funnel-nang-cao` |
| pt-022 | Bốn tầng phân tích (mô tả → chẩn đoán → dự đoán → đề xuất): bạn đang ở đâu | ✅ | `tien-hoa-bi` |
| pt-023 | Tương quan không phải nhân quả (Series Tư duy dữ liệu · P4) | ✅ | `tuong-quan-nhan-qua` |
| pt-024 | Trung bình nói dối (Series Tư duy dữ liệu · P5) | ✅ | `trung-binh-noi-doi` |
| pt-025 | Vanity metrics: những con số đẹp nhất thường dẫn tới quyết định tệ nhất | ✅ | `vanity-metrics` |
| pt-026 | Leading vs lagging (Series Tư duy dữ liệu · P6) | ✅ | `leading-lagging-indicator` |
| pt-027 | Dữ liệu bẩn giết mô hình: đừng vội đổi model, hãy dọn data | ✅ | `du-lieu-ban-giet-model` |
| pt-028 | 5 sai lầm kinh điển khi phân tích dữ liệu (và cách tránh) | ✅ | `sai-lam-khi-phan-tich-du-lieu` |
| pt-029 | Chia mô hình theo độ đầy của dữ liệu (data completeness) | ✅ | `phan-khuc-model-theo-do-day-du-lieu` |
| pt-030 | Outlier: rác cần bỏ hay mỏ vàng cần giữ | ✅ | `outlier-rac-hay-mo-vang` |
| pt-031 | Một khách, năm hồ sơ: de-dup trước khi tính LTV/cohort | ✅ | `de-dup-khach-hang-truoc-khi-tinh-ltv` |
| pt-032 | Ô trống cũng biết nói: "thiếu dữ liệu" là một tín hiệu | ✅ | `thieu-du-lieu-cung-la-tin-hieu` |
| pt-033 | Những thiên kiến giết chết quyết định (Series Tư duy dữ liệu · P3) | ✅ | `thien-kien-trong-doc-so` |
| pt-034 | Dự báo (Series · P1): mọi dự báo đều sai nhưng vẫn hữu ích | ✅ | `du-bao-la-gi` |
| pt-035 | Dự báo (P2): mùa vụ & Tết — seasonality | ✅ | `mua-vu-tet-seasonality` |
| pt-036 | Dự báo (P3): dự báo nhu cầu tồn kho thực chiến | ✅ | `du-bao-ton-kho-thuc-chien` |
| pt-037 | Thử nghiệm (Series · P1): HiPPO vs bằng chứng | ✅ | `hippo-vs-thu-nghiem` |
| pt-038 | Thử nghiệm (P2): thiết kế A/B test đúng cho SME | ✅ | `thiet-ke-ab-test` |
| pt-039 | Thử nghiệm (P3): đọc kết quả test không tự lừa mình | ✅ | `doc-ket-qua-ab-test` |
| pt-047 | Tương quan & hồi quy: đo độ mạnh quan hệ + định lượng/dự đoán bằng hồi quy | ✅ | `correlation-regression` |
| pt-049 | Sentiment Analysis: biến kho review tiếng Việt thành tín hiệu cảnh báo sớm | ✅ | `sentiment-analysis` |
| pt-040 | Roll rate: ma trận chuyển nhóm — báo sớm hơn churn tổng | ✅ | `roll-rate` |
| pt-042 | Survival analysis: đường cong sống sót (một dạng cohort) | ✅ | `survival-analysis` |
| pt-043 | Time Series & Forecast: trend/mùa vụ/nhiễu + dự báo | ✅ | `time-series-forecast` |
| pt-044 | AARRR (Series Khung đo lường · P1): phễu hải tặc | ✅ | `aarrr-pirate-metrics` |
| pt-045 | HEART (P2): khung trải nghiệm của Google | ✅ | `heart-framework` |
| pt-046 | Khung SP vs marketing (P3): nối AARRR/HEART với AIDA/5A | ✅ | `khung-san-pham-vs-marketing` |
| pt-048 | PCA: giảm chiều, lộ phân khúc ẩn | ✅ | `pca-principal-component` |
| pt-050 | Scenario analysis: vài tương lai từ vài giả định (what-if) | ✅ | `scenario-analysis` |
| pt-051 | WHY analysis: phân rã vì sao con số đổi (price-volume-mix) | ✅ | `why-analysis` |
| pt-052 | CLV framework: trần cho CAC, tính theo phân khúc | ✅ | `clv-framework` |

### 3 — Hướng Dẫn Thực Chiến (`hd`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| hd-001 | 5 câu hỏi nên hỏi AI hôm nay | ✅ | `ai-questions` |
| hd-002 | Hợp nhất Shopee + TikTok Shop + KiotViet về một chỗ | ✅ | `hop-nhat-da-kenh` |
| hd-003 | Từ Google Sheets đến dashboard trong 15 phút | ✅ | `google-sheets-dashboard` |
| hd-004 | Tự động gửi báo cáo hằng ngày qua Telegram/Zalo | ✅ | `bao-cao-telegram-zalo` |
| hd-017 | Viết câu hỏi cho AI để nhận đúng kết quả | 🟡 | deep-dives/ai-best-practices |
| hd-018 | Xây Semantic Layer đầu tiên: định nghĩa "doanh thu" chuẩn | 🟡 | studio/contexts, user-guide/06 |
| hd-019 | Xuất báo cáo PowerPoint 1-click cho cuộc họp | ⚪ | PROJECT_OVERVIEW (SlideJ) |
| hd-020 | Thiết lập cảnh báo KPI để không bỏ lỡ bất thường | ⚪ | notifications |
| hd-009 | Chia sẻ báo cáo cho nhân viên mà không lộ data nhạy cảm | ✅ | `chia-se-bao-cao-khong-lo-data` |
| hd-010 | Dashboard doanh thu cho chuỗi F&B nhiều chi nhánh | 🟡 | connections, studio |
| hd-011 | Theo dõi tồn kho realtime & tự cảnh báo sắp hết hàng | ⚪ | notifications, connections |
| hd-012 | 7 câu hỏi sai khiến AI trả lời lệch — và cách hỏi lại cho đúng | ⚪ | deep-dives/ai-best-practices |
| hd-013 | Tạo metric tính toán (lợi nhuận gộp, AOV) không cần công thức Excel | ⚪ | studio/metrics |
| hd-014 | Khi nào nên chuyển từ Google Sheets lên database | ✅ | `khi-nao-len-database` |
| hd-015 | NocoBase + Semantix: định nghĩa một lần, Semantix đọc hết | ✅ | `nocobase-semantix` |
| hd-016 | Bảng ảo: gộp + làm sạch dữ liệu đa kênh ngay lúc hỏi — không cần đồng bộ về kho | ✅ | `bang-ao-gop-du-lieu` |
| hd-005 | Trực quan hoá (Series · P1): chọn đúng biểu đồ | ✅ | `chon-dung-bieu-do` |
| hd-006 | Trực quan hoá (P2): chart junk — bớt mực, tăng nghĩa | ✅ | `chart-junk-toi-gian` |
| hd-007 | Trực quan hoá (P3): dashboard hành động được | ✅ | `dashboard-hanh-dong-duoc` |
| hd-008 | Trực quan hoá (P4): trình bày số cho sếp | ✅ | `trinh-bay-so-cho-sep` |

### 4 — AI & Công Nghệ (`ai`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| ai-001 | Vì sao LLM hay "bịa" SQL — và cách Semantix chống ảo giác | ✅ | `llm-bia-sql` |
| ai-002 | Kiến trúc Text2SQL 4 lớp của Semantix | ✅ | `kien-truc-text2sql-4-lop` |
| ai-003 | Dual-Agent Debate: 2 AI tranh luận để ra báo cáo đáng tin | ✅ | `dual-agent-debate` |
| ai-004 | Cắt 40–60% chi phí AI: chiến lược tối ưu token | ✅ | `toi-uu-chi-phi-token-ai` |
| ai-005 | Multi-provider AI & BYOK: chủ quyền dữ liệu cho DN | ✅ | `multi-provider-byok` |
| ai-006 | Vì sao AI tốt là AI biết hỏi lại — vòng lặp làm rõ trước khi trả lời | ✅ | `ai-biet-hoi-lai` |
| ai-007 | AI "đọc" được cấu trúc database của bạn như thế nào | ⚪ | 06-master-system-design |
| ai-008 | On-premise vs Cloud: chạy AI BI khi dữ liệu không được rời máy chủ | ⚪ | DEPLOYMENT_ARCHITECTURE |
| ai-009 | Semantic Layer vs "chatbot cắm thẳng vào database": khác nhau ở đâu | ✅ | `semantic-layer-vs-chatbot-database` |

### 5 — Câu Chuyện & Use Case (`uc`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| uc-001 | Chủ shop đa kênh: thay cả đội data bằng AI | ✅ | `chu-shop-da-kenh` |
| uc-002 | COO cần báo cáo 5 lần/tuần: từ Excel vài ngày → vài giây | ✅ | `coo-bao-cao-tuc-thi` |
| uc-003 | BI analyst: định nghĩa metric một lần, AI phục vụ cả công ty | ✅ | `bi-analyst-dinh-nghia-metric` |
| uc-004 | Chuỗi F&B 8 chi nhánh: từ 8 file Excel rời rạc đến một màn hình | ✅ | `chuoi-fnb-8-chi-nhanh` |
| uc-005 | Nhà bán TikTok Shop mùa sale: ra quyết định giá theo từng giờ | ✅ | `tiktok-shop-mua-sale-gia-theo-gio` |
| uc-006 | Phòng Marketing: đo ROI từng kênh ads mà không chờ data team | ✅ | `marketing-do-roi-ads` |
| uc-007 | Chuyện nghề Data Analyst: 80% công việc không ai khoe trên LinkedIn | ✅ | `chuyen-nghe-data-analyst` |
| uc-008 | Từ Excel đến Semantix (Series · P1): những năm bảng tính | ✅ | `hanh-trinh-thoi-excel` |
| uc-009 | Từ Excel đến Semantix (P2): lên Power BI & Data Studio | ✅ | `hanh-trinh-power-bi-data-studio` |
| uc-010 | Từ Excel đến Semantix (P3): sang Superset & Metabase | ✅ | `hanh-trinh-superset-metabase` |
| uc-011 | Từ Excel đến Semantix (P4): tự xây & hấp thụ điểm mạnh | ✅ | `hanh-trinh-tu-xay-semantix` |

### 6 — So Sánh & Lựa Chọn (`ss`)
| Mã | Tiêu đề | Tier | Slug / Nguồn |
|---|---|---|---|
| ss-001 | Semantix vs Power BI/Tableau (góc "công cụ mạnh hơn trả lời ít hơn", featured) | ✅ | `vs-powerbi-tableau` — cặp với ss-002 |
| ss-002 | Semantix vs Power BI/Tableau cho SME (góc "hai bài toán khác nhau") | ✅ | `semantix-vs-power-bi` — cặp với ss-001, góc nhìn khác (cố ý giữ riêng) |
| ss-003 | Semantix vs Metabase/Superset | ✅ | `vs-metabase-superset` |
| ss-004 | Semantix vs ThoughtSpot (BI AI-native) | ✅ | `vs-thoughtspot` |
| ss-005 | Nên thuê đội data hay dùng AI BI? Bài toán chi phí | ✅ | `thue-doi-data-hay-ai-bi` |
| ss-006 | Semantix vs Excel/Google Sheets: khi nào bảng tính hết "gánh" nổi | ✅ | `vs-google-sheets` |
| ss-007 | AI BI vs thuê freelancer dựng dashboard: chi phí thật sau 1 năm | ✅ | `vs-freelancer-dashboard` |
| ss-008 | Semantix vs WrenAI/text-to-SQL thuần: vì sao cần Semantic Layer | ✅ | `vs-wrenai-text2sql` |
| ss-009 | "Miễn phí" thường đắt nhất: tổng chi phí sở hữu (TCO) của một công cụ BI | ✅ | `tco-cong-cu-bi` |
| ss-010 | Checklist chọn công cụ BI cho SME: 7 câu hỏi trước khi trả tiền | ✅ | `checklist-chon-bi-cho-sme` |
| ss-011 | Tự dựng in-house vs mua sẵn: build-vs-buy cho SME | ✅ | `build-vs-buy-bi` |
| ss-012 | Semantix vs Looker Studio (Data Studio) — 'miễn phí, trả bằng gì' | ✅ | `vs-looker-studio` |
| ss-013 | Semantix vs dashboard sẵn trong Shopee/TikTok/KiotViet | ✅ | `vs-dashboard-saas-co-san` |
| ss-014 | Looker Studio Pro vs Semantix: Pro thêm gì + so giá | ✅ | `vs-looker-studio-pro` |

## D. Việc cần làm tiếp (🔴 chưa viết)

> **56 bài đã xuất bản** — xem các dòng `✅` kèm slug ở mục C. (đã chuẩn hoá: slug sạch, mã `<dm>-<NNN>` trong frontmatter, không còn trùng số/cover.)

Bốn bài 🔴 — đã viết xong đợt này (4 agent song song):

1. ~~**kt-010** — Dữ liệu bẩn: 80% thời gian là dọn dữ liệu~~ ✅ *(đã viết → `du-lieu-ban`)*
2. ~~**hd-009** — Chia sẻ báo cáo không lộ data nhạy cảm~~ ✅ *(đã viết → `chia-se-bao-cao-khong-lo-data`)*
3. ~~**ai-009** — Semantic Layer vs "chatbot cắm thẳng DB"~~ ✅ *(đã viết → `semantic-layer-vs-chatbot-database`)*
4. ~~**ss-006** — Semantix vs Excel/Google Sheets~~ ✅ *(đã viết → `vs-google-sheets`)*

> `ss-001` (`vs-powerbi-tableau`) và `ss-002` (`semantix-vs-power-bi`) là **2 bài cố ý tách** cùng chủ đề Power BI/Tableau theo 2 góc nhìn khác nhau — giữ riêng, không gộp.

## E. Convention mỗi bài

- **Độ dài:** 800–1.200 từ (`readTime` 6–9); pillar (T1/T2/F1) có thể 1.300–1.600.
- **Cấu trúc:** Hook tình huống → "X là gì/vấn đề" → 3–5 mục H2 có ví dụ số liệu VN → cách Semantix giải quyết (ngắn, không bán quá) → CTA.
- **Frontmatter** (theo `src/content/config.ts`): `title`, `description` (≤160 ký tự, chứa keyword), `pubDate`, `category`, `readTime`, `author`, `featured`.
- **Bài series (nhiều phần):** BẮT BUỘC thêm `series: "<tên-series>"` (giống nhau cho mọi phần) + `seriesOrder: <N>` (1, 2, 3…) vào frontmatter. Trang blog dùng 2 trường này để gom các phần nằm cạnh nhau và xếp đúng Phần 1→N — thiếu thì series sẽ bị tách rời & đảo ngược theo ngày đăng.
- **Internal linking:** mỗi bài link 1–2 trang docs liên quan + 1–2 bài blog cùng chủ đề.
- **CTA:** TOFU → đọc thêm; MOFU → dùng thử free Google Sheets; BOFU → đặt lịch demo.
- **Tác giả:** giữ dàn bút danh hiện có (Lê Anh Tuấn, Trần Minh Khoa, Lê Thị Hương).
- **featured:** giữ 2–3 bài `featured: true`.

## F. Quy trình sản xuất

1. Chốt 10 bài 🔴 → viết outline chi tiết.
2. Viết bản đầy đủ theo lô 2–3 bài → review tone.
3. Lưu file `NN-slug.md`.
4. Rà internal link + cập nhật `featured` sau mỗi lô.

## G. DNA phong cách viết *(trích xuất từ 4 bài đã xuất bản — bám sát để giữ giọng nhất quán)*

> Công thức cốt lõi: **một sự thật ngược đời, kể bằng số liệu Việt Nam, kết bằng một quyết định.** Mỗi bài phải làm người đọc "à há" ở câu mở, rồi gật gù ở câu kết.

### G1. Tiêu đề & description — luôn có nghịch lý
- **Cấu trúc:** `[Khái niệm]: [mệnh đề ngược đời, có em-dash]`. Dùng dấu `:` rồi `—` để tạo cú twist.
  - *"Semantic Layer: vì sao công ty bạn có ba con số doanh thu — và không số nào sai"*
  - *"Cohort Analysis: vì sao tăng trưởng 40% vẫn có thể là dấu hiệu công ty đang chết"*
  - *"Text-to-SQL: vì sao AI viết SQL gần như không bao giờ lỗi — mà vẫn trả về số sai"*
- **Description (≤160 ký tự):** mở bằng tình huống/số gây sốc, KHÔNG tóm tắt khô. Thường là 2–3 câu cụt: *"Phòng Sales nói 4,2 tỷ. Finance nói 3,8 tỷ. Data Team nói 4,05 tỷ. Cả ba đều đúng."*

### G2. Hook (1–3 đoạn đầu) — đặt một cái bẫy nhận thức
- Mở bằng **cảnh thật/con số cụ thể**, không định nghĩa. Tung mâu thuẫn ngay câu 1–2.
- Gọi thẳng **phản xạ sai của người đọc** rồi bác bỏ: *"Phản xạ đầu tiên của bạn có thể là 'Vậy thì yên tâm rồi'. Nhưng đây mới đúng là chỗ nguy hiểm nhất."*
- Đóng hook bằng một lời hứa/ngưỡng cửa: *"Tin tốt: hỏi hay là kỹ năng học được trong vài phút."*

### G3. Giọng & ngôi kể
- **Ngôi 2 "bạn"** xuyên suốt; "chúng tôi/Semantix" chỉ xuất hiện ở đoạn giải pháp.
- Tự tin, phản biện, thầm thì bí mật: *"ít người để ý", "nghịch lý ít người chịu tin", "sự thật ngược đời", "đi trước 90% người dùng"*.
- **Câu cụt nhịp gõ** để nhấn: *"Đều chạy. Đều ra số. Đều đúng cú pháp."* / *"Một lần định nghĩa. Dùng mãi mãi."*
- **Em-dash `—`** là dấu chủ lực cho cú hích cuối câu. Bold **thuật ngữ khóa** lần đầu xuất hiện.

### G4. Ẩn dụ — bắt buộc có 1–2 hình ảnh đời thường mỗi bài
- Đã dùng: *cuốn từ điển nghiệp vụ · cái xô thủng đáy · chạy trên máy chạy bộ · lái xe bằng gương chiếu hậu · động cơ vs vô lăng & phanh · so chiều cao đứa 6 tuổi với đứa 1 tuổi.*
- Quy tắc: ẩn dụ phải **giải thích cơ chế**, không chỉ trang trí.

### G5. Số liệu & bối cảnh Việt Nam
- Luôn dùng số cụ thể, định dạng VN: `4,2 tỷ`, `15–20%`, `95–99%`, `67% khách`.
- Neo vào ngữ cảnh Việt: TP.HCM, Tết (mùa vụ), Shopee/TikTok Shop/KiotViet, "tháng này/quý vừa rồi" thay vì fiscal year Mỹ.
- **Đánh dấu rõ ví dụ minh họa:** `*Ví dụ kết quả:*` / "(các 'output' là ví dụ minh hoạ)" — không để người đọc tưởng là số thật.
- Trích **mỏ neo uy tín** khi nói về kỹ thuật: WrenAI, SuperSonic (Tencent), dbt/Cube/LookML, "nghiên cứu năm 2025".

### G6. Bộ khung thân bài
1. **Hook** (G2).
2. **"X là gì / Vấn đề gốc"** — một H2 làm rõ khái niệm hoặc phơi bày vấn đề.
3. **3–5 H2** có ví dụ số + đôi khi bảng/blockquote. H2 nên là **câu hỏi hoặc mệnh đề có thái độ** (*"Sự thật ngược đời: lỗi không nằm ở cú pháp"*), không phải nhãn khô.
4. **"… trong Semantix"** — soft sell: mô tả quy trình 1-2-3, định vị bằng phủ định (*"không phải chatbot cắm vào database, mà là…"*). Không liệt kê tính năng kiểu brochure.
5. **"Tóm lại"** — thường là **bảng đối chiếu 2 cột** (Không có / Có · Câu tồi / Câu tốt) chốt lại luận điểm.

### G7. Yếu tố định dạng đặc trưng
- **Nhấn mạnh — tách bạch hai vai trò (QUAN TRỌNG):**
  - `**đậm**` = **nhấn mạnh / làm nổi bật**: thuật ngữ khóa lần đầu, luận điểm chốt, từ cần "đập vào mắt". Hiển thị màu tối, đậm.
  - `*nghiêng*` = **giảm focus**: chú thích bên lề, mô tả, ví dụ minh hoạ, câu CTA, lời thì thầm. Hiển thị màu xám — KHÔNG dùng để làm nổi bật một từ giữa câu (sẽ bị mờ đi, phản tác dụng).
  - Muốn nhấn **rất mạnh**: dùng `**đậm**` (có thể kèm blockquote). Bold+italic lồng nhau (`**...*...*...**`) vẫn giữ màu đậm — nhưng hạn chế, dễ rối.
- **Blockquote cho "quy tắc vàng" / câu chốt ẩn dụ:** `> Quy tắc vàng: luôn so sánh cohort ở cùng tuổi đời.`
- **Bảng so sánh 2 cột** đối lập trước/sau, tồi/tốt.
- **Code block** SQL/pseudocode khi giải thích kỹ thuật (đặt định nghĩa nghiệp vụ ra giữa).
- **Inline SVG viz** bọc trong `<div class="viz">…<div class="viz-caption">`; series dùng `<div class="series-nav">`.
  - ⚠️ **TUYỆT ĐỐI không để dòng trống bên trong `<svg>…</svg>`** (kể cả giữa các nhóm `<g>`/`<rect>`). Markdown coi dòng trống là kết thúc khối HTML → cắt SVG làm nhiều mảnh, phần sau bị đẩy thành `<p>` khiến `<rect>`/`<text>` văng ra ngoài, biểu đồ vỡ. Dùng comment `<!-- -->` để ngăn nhóm thay cho dòng trống.
- **Internal link theo ngữ cảnh** ngay trong câu (không gom cuối bài): 1–2 docs + 1–2 blog cùng chủ đề.

### G8. CTA — luôn là dòng *in nghiêng* cuối bài, sau `---`
- Mẫu: `*Muốn [lợi ích cụ thể]? [Dùng thử miễn phí với Google Sheets.](/docs/vi/free-trial/) Hoặc đọc tiếp [bài liên quan](/blog/…/).*`
- Phân tầng phễu: TOFU → "đọc tiếp"; MOFU → "dùng thử free Google Sheets"; BOFU → "đặt lịch demo".

### G9. Bút danh = persona (giữ nhất quán)
- **Lê Anh Tuấn** — nền tảng & kỹ thuật lõi (Semantic Layer, Text-to-SQL). Giọng kiến trúc sư.
- **Trần Minh Khoa** — phân tích dữ liệu (Cohort, RFM, Funnel). Giọng analyst.
- **Lê Thị Hương** — hướng dẫn thực chiến & câu hỏi nghiệp vụ. Giọng tư vấn gần gũi.

### G10. Checklist trước khi xuất bản
- [ ] Tiêu đề có nghịch lý + em-dash?  - [ ] Hook tung mâu thuẫn trong 2 câu đầu?
- [ ] ≥1 ẩn dụ giải thích cơ chế?  - [ ] Số liệu định dạng VN + ví dụ được đánh dấu là minh họa?
- [ ] H2 có thái độ, không khô?  - [ ] Có "Tóm lại" dạng bảng đối chiếu?
- [ ] Soft sell định vị bằng phủ định, không brochure?  - [ ] 2–4 internal link theo ngữ cảnh?
- [ ] CTA in nghiêng phân tầng phễu?  - [ ] Bút danh khớp persona chủ đề?
- [ ] Thuật ngữ tiếng Anh/viết tắt được chú giải lần đầu?  - [ ] Đã thêm thuật ngữ vào [Từ điển thuật ngữ](src/pages/blog/tu-dien-thuat-ngu.astro)?

### G11. Xử lý thuật ngữ tiếng Anh & viết tắt (BẮT BUỘC)

> Mục tiêu: bài thân thiện với người làm kinh doanh Việt, nhưng **không mất** từ khóa SEO/chuyên ngành.

- **Giữ thuật ngữ gốc, KHÔNG dịch bỏ.** Thuật ngữ tiếng Anh/viết tắt (MAU, RAG, ETL, churn, semantic layer…) là từ khóa SEO và để người đọc tra cứu/khớp biểu đồ — giữ nguyên, đừng thay hẳn bằng tiếng Việt.
- **Chú giải NGAY lần đầu xuất hiện**, theo mẫu: `Thuật ngữ (Dạng đầy đủ — nghĩa tiếng Việt)`.
  - Viết tắt: `MAU (Monthly Active User — số khách hàng hoạt động hàng tháng)`.
  - Từ tiếng Anh không viết tắt: `acquisition (thu hút khách mới)`, `top-line (con số tổng ngoài cùng của báo cáo)`.
  - Từ thuần khái niệm: thêm bản dịch tạm — `growth accounting (tạm dịch: *kế toán tăng trưởng*)`.
- **Các lần sau** dùng thoải mái thuật ngữ gốc, hoặc luân phiên với từ thuần Việt (`user` → `người dùng`, `active` → `hoạt động`) cho đỡ chói.
- **Đồng bộ với Từ điển.** Mọi thuật ngữ chú giải trong bài PHẢI có mặt ở trang [Từ điển thuật ngữ](src/pages/blog/tu-dien-thuat-ngu.astro) (`/blog/tu-dien-thuat-ngu/`), sắp A–Z. Thuật ngữ mới chưa có → **thêm một mục** vào mảng `terms` của trang đó (kèm `slug` bài liên quan nếu có); nghĩa tiếng Việt trong bài và trong từ điển phải khớp nhau.
- Nhãn chỉ số nên để **song ngữ** khi gắn với biểu đồ: `Churned — rời bỏ`, để người đọc map được nhãn tiếng Anh trên chart.


### G12. Biểu đồ & bảng — dùng ECharts chuẩn Semantix (BẮT BUỘC)

> Chart **dữ liệu** vẽ bằng ECharts (theme + màu + quy ước chuẩn Semantix), KHÔNG vẽ tay SVG. SVG vẽ tay CHỈ dành cho **hình minh họa khái niệm/ẩn dụ** (tảng băng chi phí, ốc đảo dữ liệu, bản đồ định vị, sơ đồ hành trình…). Cơ chế render: `src/scripts/blog-charts.ts` (lazy-load ECharts 5.5.0 CDN, chỉ tải ở trang có chart).

- **Cú pháp trong markdown:**
  ```html
  <div class="viz">
    <div class="viz-chart" data-chart="KIND" data-chart-data='{JSON}'></div>
    <div class="viz-caption">…(số minh họa)…</div>
  </div>
  ```
- **KIND đã hỗ trợ + data shape:**
  - `growth` — cột chồng (dương lên, churn nạp **số âm** → tự xuống dưới trục 0; bo góc tự áp **chỉ khối trên-dương / dưới-âm**). Có thể thêm line trục phụ. `{"periods":[…],"series":[{"name","key":"retained|new|resurrected|expansion|churned|contraction|active|quickRatio","values":[…],"negative"?:true,"type"?:"line","yAxis"?:1}]}`. Màu auto theo `key`.
  - `cohort` — heatmap retention. `{"cohorts":[…],"periodLabels":["M0",…],"matrix":[[…|null]],"unit"?:"%"}`.
  - `line` — đa đường + **callout cuối đường** (`endLabel`) + **đường ngưỡng** (`markLine`) + **vùng tô** (`markArea`). `{"xLabels":[…],"yUnit"?:"%","series":[{"name","values":[…],"color"?,"dashed"?,"area"?,"endLabel"?}],"markLine"?:[{"y","label","color"?}],"markArea"?:[{"from","to","color"}]}`.
  - `waterfall` — bắc cầu. `{"items":[{"label","value","type"?:"total"}],"unit"?:""}` (value âm = giảm; `type:"total"` = cột mốc).
- **Cần loại chart CHƯA có builder** (funnel, pareto, scatter, histogram/distribution, pie…) → **bổ sung builder vào `blog-charts.ts`** rồi dùng `data-chart`; ĐỪNG vẽ tay SVG cho chart dữ liệu. (Backlog builder đang chờ: funnel, pareto, scatter, distribution; lưới RFM dùng lại `cohort`/heatmap.)
- **Nếu vẫn vẽ tay SVG** (chỉ cho minh họa khái niệm): TUYỆT ĐỐI **không để dòng trống bên trong `<svg>…</svg>`** (Markdown sẽ cắt khối, vỡ hình — xem G7).
- **Bảng dữ liệu:** viết markdown bình thường. `src/scripts/blog-tables.ts` tự: ô delta có dấu (`+22%`, `−3%`) → **chip** xanh/đỏ; ô số → **canh phải + tabular-nums**; số nguyên ≥5 chữ số → thêm dấu phân cách. Không reformat số có đơn vị viết tay ("1,8 tỷ").
- Số liệu trong chart/bảng vẫn là **ví dụ minh họa** — ghi rõ ở caption (theo G5).
