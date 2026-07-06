import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // .nullish() = chấp nhận cả null (Sveltia ghi `null` cho field trống) lẫn thiếu field.
    // z.optional() KHÔNG nhận null -> Sveltia lưu bài là build fail. Đừng đổi lại .optional().
    code: z.string().nullish(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    readTime: z.coerce.number(),
    author: z.string().default('Đội Ngũ Semantix'),
    authorTitle: z.string().nullish().default('Đội Ngũ Semantix'),
    featured: z.boolean().default(false),
    cover: z.string().nullish(),
    coverAlt: z.string().nullish(),
    series: z.string().nullish(),
    seriesOrder: z.number().nullish(),
  }),
});

export const collections = { blog };
