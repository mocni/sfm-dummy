import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginationFilterSortOptionsDto } from '../dto';

export function applyStopsDateFilter<Entity extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<Entity>,
  paginationFilterSortOptions: PaginationFilterSortOptionsDto,
) {
  const { maxSearchDate, minSearchDate } = paginationFilterSortOptions;

  if (minSearchDate || maxSearchDate) {
    if (minSearchDate && maxSearchDate) {
      queryBuilder.andWhere(
        `"load"."stopStartDate" >= :minDate AND "load"."stopEndDate" <= :maxDate`,
        { maxDate: maxSearchDate, minDate: minSearchDate },
      );
    } else if (minSearchDate) {
      queryBuilder.andWhere(`"load"."stopStartDate" >= :minDate`, {
        minDate: minSearchDate,
      });
    } else if (maxSearchDate) {
      queryBuilder.andWhere(`"load"."stopEndDate" <= :maxDate`, {
        maxDate: maxSearchDate,
      });
    }
  }
}
