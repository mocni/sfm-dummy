import { createZodDto } from 'nestjs-zod';

import { paginationResponseSchema } from '../schemas';

export class PaginationResponseDto extends createZodDto(
  paginationResponseSchema,
) {}
