import { ApiPropertyOptional } from '@nestjs/swagger';

import { EmployeeType } from '@smart-fleet-management/common';

import { PaginationFilterSortOptionsDto } from '@/services/pagination';

import {
  getEmployeesQueryFilterSearchField,
  GetEmployeesQueryFilterSearchFields,
  getEmployeesSortByField,
  GetEmployeesSortByField,
} from '../schemas/queries';

export class GetEmployeesQueryDto extends PaginationFilterSortOptionsDto {
  @ApiPropertyOptional({
    description: 'Search field to filter trucks',
    enum: getEmployeesQueryFilterSearchField,
    example: getEmployeesQueryFilterSearchField.FIRSTAME,
  })
  searchField?: GetEmployeesQueryFilterSearchFields;

  @ApiPropertyOptional({
    description: 'Search value to match against the specified field',
    example: 'ABC123',
  })
  searchValue?: string;

  @ApiPropertyOptional({
    default: getEmployeesSortByField.CREATED_AT,
    description: 'Sort by specified field',
    enum: getEmployeesSortByField,
    example: getEmployeesSortByField.FIRSTAME,
  })
  sortBy?: GetEmployeesSortByField;

  @ApiPropertyOptional({
    description: 'Get employees by specified type',
    enum: EmployeeType,
    example: EmployeeType.DRIVER,
  })
  type?: EmployeeType;
}
