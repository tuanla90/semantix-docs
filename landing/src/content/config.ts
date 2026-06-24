import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    readTime: z.number(),
    author: z.string().default('Đội Ngũ Semantix'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
