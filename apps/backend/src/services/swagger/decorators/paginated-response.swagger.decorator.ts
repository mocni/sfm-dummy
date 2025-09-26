import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';

import { PaginationResponseDto } from '@/services/pagination';

export const PaginatedResponseSwaggerDocs = <TModel extends Type<any>>(
  model: TModel,
  summary?: string,
  description?: string,
) => {
  return applyDecorators(
    ApiOperation({
      summary: summary,
      description: description,
    }),
    ApiExtraModels(PaginationResponseDto, model),
    ApiBearerAuth('access-token'),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf ${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(PaginationResponseDto) },
        ],
      },
    }),
  );
};
