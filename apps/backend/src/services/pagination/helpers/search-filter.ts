import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function applySearchFilter<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  searchValue: string,
  searchField: string,
) {
  if (!searchValue || !searchField) {
    return;
  }

  const isJsonField = searchField.includes('->>');

  const formattedField = isJsonField
    ? searchField
    : searchField.includes('.')
      ? searchField
      : `${queryBuilder.alias}.${searchField}`;

  const searchCondition = `${formattedField} ILIKE :searchValue`;

  queryBuilder.andWhere(`(${searchCondition})`, {
    searchValue: `%${searchValue}%`,
  });
}
