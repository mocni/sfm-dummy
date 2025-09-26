import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

interface IGetByIdSwaggerOptions {
  title: string;
  description?: string;
  authRequired?: boolean;
  apiOkResponseDto?: Type;
  pathParam?: {
    name: string;
    type?: Type | string;
    description?: string;
  };
}

export function GetByIdSwaggerDocs(options: IGetByIdSwaggerOptions) {
  const {
    title,
    description,
    authRequired = true,
    apiOkResponseDto,
    pathParam,
  } = options;

  const decorators = [
    ApiOperation({ summary: title, description }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  ];

  if (authRequired) {
    decorators.push(ApiBearerAuth('access-token'));
  }

  if (apiOkResponseDto) {
    decorators.push(
      ApiOkResponse({
        description: 'Successful response',
        type: apiOkResponseDto,
        isArray: false,
      }),
    );
  }

  if (pathParam) {
    decorators.push(
      ApiParam({
        name: pathParam.name,
        type: pathParam.type || String, // Default to String if type is not provided
        description: pathParam.description || '',
      }),
    );
  }

  return applyDecorators(...decorators);
}
