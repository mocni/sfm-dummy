import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface ICreateSwaggerOptions {
  apiOkResponseDto?: Type;
  apiOkResponseExample?: object;
  authRequired?: boolean;
  bodyDto?: Type;
  customBody?: Record<string, ReferenceObject | SchemaObject>;
  description?: string;
  summary: string;
}

// rename to CreateSwaggerDocs
export function CreateSwaggerDocs(options: ICreateSwaggerOptions) {
  const {
    apiOkResponseDto,
    apiOkResponseExample,
    authRequired = true, // Default value
    bodyDto,
    customBody,
    description,
    summary,
  } = options;

  const decorators = [
    ApiOperation({ description, summary }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  ];

  if (bodyDto) {
    decorators.push(ApiBody({ type: bodyDto }));
  } else if (customBody) {
    decorators.push(ApiBody({ schema: { properties: customBody } }));
  }

  if (authRequired) {
    decorators.push(ApiBearerAuth('access-token'));
  }

  if (apiOkResponseExample) {
    decorators.push(
      ApiCreatedResponse({
        description: 'The record has been successfully created.',
        schema: { example: apiOkResponseExample },
      }),
    );
  } else if (apiOkResponseDto) {
    decorators.push(
      ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: apiOkResponseDto,
      }),
    );
  }

  return applyDecorators(...decorators);
}
