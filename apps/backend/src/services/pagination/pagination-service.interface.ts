import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginationFilterSortOptionsDto } from './dto';
import { ResponseData } from './response-data.model';

export interface IPaginationService {
  paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationFilterSortOptions: PaginationFilterSortOptionsDto,
  ): Promise<ResponseData<T>>;
}
