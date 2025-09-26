import { createZodDto } from 'nestjs-zod';

import { createUserResponseSchema } from '@smart-fleet-management/users';

export class CreateUserResponseDto extends createZodDto(
  createUserResponseSchema,
) {}
