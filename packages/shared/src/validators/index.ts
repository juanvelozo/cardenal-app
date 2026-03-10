import { z } from 'zod';

export const createSongSchema = z.object({
  title: z.string().min(1).max(200),
  artist: z.string().max(200).optional(),
  key: z.string().max(10).optional(),
  bpm: z.number().int().min(20).max(300).optional(),
  timeSignature: z.string().max(10).optional(),
});

export const updateSongSchema = createSongSchema.partial();

export const createBlockSchema = z.object({
  type: z.enum([
    'VERSE', 'CHORUS', 'BRIDGE', 'INTRO', 'OUTRO',
    'SOLO', 'TAB', 'INSTRUMENTAL', 'CUSTOM', 'REPEAT',
  ]),
  label: z.string().max(100).optional(),
  content: z.string(),
  order: z.number().int().min(0),
  refBlockId: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const searchSchema = z.object({
  q: z.string().min(1).max(200),
  type: z.enum(['songs', 'artists', 'songbooks']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateSongInput = z.infer<typeof createSongSchema>;
export type UpdateSongInput = z.infer<typeof updateSongSchema>;
export type CreateBlockInput = z.infer<typeof createBlockSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
