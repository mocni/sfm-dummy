import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { createZodDto } from 'nestjs-zod';

// import { SortOrder } from '@smart-fleet-management/common';

import { SortOrder } from '@smart-fleet-management/common';

import { filterAndPaginationAndSortOptionsSchema } from '../schemas/filter-pagination-sort-options.schema';

export class PaginationFilterSortOptionsDto extends createZodDto(
  filterAndPaginationAndSortOptionsSchema,
) {
  @ApiPropertyOptional({
    description: 'Number of items per page, default is 10',
    example: 10,
    minimum: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  @ApiPropertyOptional({
    description: 'Filter results with date to',
    format: 'date-time',
    nullable: true,
    required: false,
    type: String,
  })
  maxSearchDate?: string;

  @ApiPropertyOptional({
    description: 'Filter results with date from',
    format: 'date-time',
    nullable: true,
    required: false,
    type: String,
  })
  minSearchDate?: string;

  // this PROPERTIES are the same for all modules where pagination is used
  @ApiPropertyOptional({
    description: 'Page number, default is 1',
    example: 1,
    minimum: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @ApiPropertyOptional({
    default: SortOrder.ASC,
    description: 'Sorting order, default is ASC',
    enum: SortOrder,
  })
  sortOrder: SortOrder;
}

export const calculateSkip = (page, limit): number => {
  return (page - 1) * limit;
};
