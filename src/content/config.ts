import { defineCollection, z } from 'astro:content';

// Definimos una nueva "colección" para nuestras noticias
const noticiasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Ocelotl Sistem'),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'noticias': noticiasCollection,
};