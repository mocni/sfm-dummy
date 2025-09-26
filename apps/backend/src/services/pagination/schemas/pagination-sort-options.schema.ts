import { z } from 'zod';

import { SortOrder } from '@smart-fleet-management/common';

export const paginationAndSortOptionsSchema = z.object({
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
  sortBy: z.string().optional().describe('Field to sort by'),
  sortOrder: z
    .nativeEnum(SortOrder)
    .optional()
    .default(SortOrder.DESC)
    .describe('Sorting order, default is DESC'),
});
