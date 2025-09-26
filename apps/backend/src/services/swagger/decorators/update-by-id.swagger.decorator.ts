import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IUpdateByIdSwaggerOptions {
  apiBodySchema?: Type;
  apiOkResponseDto?: Type;
  authRequired?: boolean;
  description?: string;
  summary: string;
}

export function UpdateByIdSwaggerDocs(options: IUpdateByIdSwaggerOptions) {
  const {
    apiBodySchema,
    apiOkResponseDto,
    authRequired = true,
    description,
    summary,
  } = options;

  const decorators = [
    ApiOperation({ description, summary }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  ];

  if (authRequired) {
    decorators.push(ApiBearerAuth('access-token'));
  }

  if (apiBodySchema) {
    decorators.push(ApiBody({ type: apiBodySchema }));
  }

  if (apiOkResponseDto) {
    decorators.push(
      ApiOkResponse({
        description: 'Successful response',
        isArray: false,
        type: apiOkResponseDto,
      }),
    );
  }

  return applyDecorators(...decorators);
}
