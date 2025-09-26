import { filterAndPaginationAndSortOptionsSchema } from '@/services/pagination/schemas';

import { getEmployeesQueryFiltersSchema } from './get-employees-query-filters.schema';

export const getEmployeesQuerySchema =
  filterAndPaginationAndSortOptionsSchema.merge(getEmployeesQueryFiltersSchema);
