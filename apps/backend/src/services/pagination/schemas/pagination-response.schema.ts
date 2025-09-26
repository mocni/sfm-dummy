import { z } from 'zod';

export const paginationMetadataSchema = z.object({
  limit: z
    .number()
    .int()
    .min(1)
    .optional()
    .default(10)
    .describe('Number of items per page, default is 10'),
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .default(1)
    .describe('Page number, default is 1'),
  totalCount: z.number().int().nonnegative().describe('Number of total items'),
  totalPages: z.number().int().nonnegative().describe('Number of total pages'),
});

export const paginationResponseSchema = z.object({
  metadata: z.object({
    pagination: paginationMetadataSchema,
  }),
});
