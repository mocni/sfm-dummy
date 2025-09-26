import { createZodDto } from 'nestjs-zod';

import { createUserPayloadSchema } from '@smart-fleet-management/users';

export class CreateUserPayloadDto extends createZodDto(
  createUserPayloadSchema,
) {}
