import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { SortOrder } from '@smart-fleet-management/common';

import { calculateSkip, PaginationFilterSortOptionsDto } from './dto';
import {
  applyDateFilter,
  applySearchFilter,
  applyStopsDateFilter,
} from './helpers';
import { IPaginationService } from './pagination-service.interface';
import { ResponseData } from './response-data.model';

// LOAD: with the load we need to be carefull when doing pagination. Stops in load are tricky

export class PaginationService implements IPaginationService {
  async paginate<
    T extends ObjectLiteral,
    Q extends PaginationFilterSortOptionsDto,
  >(
    queryBuilder: SelectQueryBuilder<T>,
    paginationOptions: Q,
    useCreatedAtFilter = true,
  ): Promise<ResponseData<T>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'created_at',
      sortOrder = SortOrder.ASC,
    } = paginationOptions;

    // useCreatedAtFilter = false is only for LOAD service because we want to filter loads by stop dates, not when they are created in the database
    if (useCreatedAtFilter) {
      applyDateFilter(queryBuilder, paginationOptions);
    } else {
      // THIS IS ONLY USED IN LOAD SERVICE
      applyStopsDateFilter(queryBuilder, paginationOptions);
    }

    if (paginationOptions.type) {
      queryBuilder.andWhere('employee.type = :type', {
        type: paginationOptions.type,
      });
    }

    if (
      paginationOptions.searchValue &&
      paginationOptions.searchValue.length >= 2 &&
      paginationOptions.searchField
    ) {
      applySearchFilter(
        queryBuilder,
        paginationOptions.searchValue,
        paginationOptions.searchField,
      );
    }

    // because of leftJoinAndSelect in queryBuilder I need to have alias for created_at becomes driver.created_at
    const alias = queryBuilder.alias || '';
    const sortColumn = alias ? `${alias}.${sortBy}` : sortBy;
    queryBuilder.orderBy(sortColumn, sortOrder);

    const skip = calculateSkip(page, limit);

    const [data, totalCount] = await queryBuilder
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      metadata: {
        pagination: {
          limit,
          page,
          totalCount,
          totalPages,
        },
      },
    };
  }
}
