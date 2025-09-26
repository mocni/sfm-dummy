import { z } from 'zod';

export const getEmployeesQueryFilterSearchField = {
  FIRSTAME: 'first_name',
  LASTNAME: 'last_name',
};

export type GetEmployeesQueryFilterSearchFields =
  (typeof getEmployeesQueryFilterSearchField)[keyof typeof getEmployeesQueryFilterSearchField];

export const getEmployeesSortByField = {
  CREATED_AT: 'created_at',
  FIRSTAME: 'first_name',
  LASTNAME: 'last_name',
};

export type GetEmployeesSortByField =
  (typeof getEmployeesSortByField)[keyof typeof getEmployeesSortByField];

export const getEmployeesQueryFiltersSchema = z.object({
  searchField: z.nativeEnum(getEmployeesQueryFilterSearchField).optional(),
  searchValue: z.string().optional(),
});
