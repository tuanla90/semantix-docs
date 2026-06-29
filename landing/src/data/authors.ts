// Author registry - hồ sơ tác giả dùng cho khối bio cuối mỗi bài.
// Toàn bộ blog do một tác giả thật: "Lê Anh Tuấn" (bio + credential công khai).
// Giữ fallback authorTitle phòng khi có byline chưa khai báo ở đây.

export interface AuthorLink {
  label: string;
  href: string;
}

export interface AuthorInfo {
  title: string;
  bio?: string;
  links?: AuthorLink[];
}

export const AUTHORS: Record<string, AuthorInfo> = {
  'Lê Anh Tuấn': {
    title: 'Trưởng nhóm BI · Giảng viên BI & GA4',
    bio:
      'Hơn 10 năm trong nghề dữ liệu - từ Data Analyst tại một tập đoàn viễn thông ' +
      'đầu ngành, trưởng nhóm DA tại một công ty công nghệ lõi của hệ sinh thái ' +
      'e-commerce, đến trưởng nhóm BI tại một ngân hàng, nơi anh đang đưa semantic ' +
      'layer thành dự án trọng điểm. Anh giảng dạy GA4, BI trên Google Workspace và ' +
      'xây app no-code tích hợp AI, đồng thời tư vấn chuyển đổi số qua kênh ' +
      'mastergoogletools.',
    links: [
      { label: 'GA4 Advanced @ Vietmoz', href: 'https://vietmoz.edu.vn/ga4-advanced/' },
      {
        label: 'BI with Google Workspace @ MCI',
        href: 'https://www.mcivietnam.com/course-detail/khoa-hoc-business-intelligence-with-google-workspace-advanced-track/',
      },
      {
        label: 'App AI Chatbot @ Gitiho',
        href: 'https://gitiho.com/khoa-hoc/tao-app-quan-ly-chi-tieu-chuyen-nghiep-tich-hop-ai-chatbot',
      },
    ],
  },
};
