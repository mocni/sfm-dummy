import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginationFilterSortOptionsDto } from '../dto';

export function applyDateFilter<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationFilterSortOptions: PaginationFilterSortOptionsDto,
  field = 'created_at',
) {
  const { maxSearchDate, minSearchDate } = paginationFilterSortOptions;

  if (minSearchDate || maxSearchDate) {
    if (minSearchDate && maxSearchDate) {
      queryBuilder.andWhere(
        `"${queryBuilder.alias}"."${field}" BETWEEN :minDate AND :maxDate`,
        { maxDate: maxSearchDate, minDate: minSearchDate },
      );
    } else if (minSearchDate) {
      queryBuilder.andWhere(`"${queryBuilder.alias}"."${field}" >= :minDate`, {
        minDate: minSearchDate,
      });
    } else if (maxSearchDate) {
      queryBuilder.andWhere(`"${queryBuilder.alias}"."${field}" <= :maxDate`, {
        maxDate: maxSearchDate,
      });
    }
  }
}
