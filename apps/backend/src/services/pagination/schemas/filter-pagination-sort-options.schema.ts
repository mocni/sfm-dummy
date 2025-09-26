import { z } from 'zod';

import { EmployeeType } from '@smart-fleet-management/common';

import { paginationAndSortOptionsSchema } from './pagination-sort-options.schema';

// here this schema will include all fields for filter, sort and pagination
export const filterAndPaginationAndSortOptionsSchema = z
  .object({
    isAssigned: z
      .string()
      .optional()
      .describe('1 - Assigned, 0 - Not assigned'),
    maxSearchDate: z
      .string()
      .datetime()
      .optional()
      .nullable()
      .describe('Filter results with date to'),
    minSearchDate: z
      .string()
      .datetime()
      .optional()
      .nullable()
      .describe('Filter results with date from'),
    searchField: z.string().optional().describe('Search field'),
    searchValue: z.string().optional().describe('Search value'),
    type: z
      .nativeEnum(EmployeeType)
      .optional()
      .describe('Get employees by specified type'),
  })
  .merge(paginationAndSortOptionsSchema);
