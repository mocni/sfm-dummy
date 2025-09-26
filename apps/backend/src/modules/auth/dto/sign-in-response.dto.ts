import { createZodDto } from 'nestjs-zod';

import { signInResponseSchema } from '../schemas/sign-in-response.schema';

export class SignInResponseDto extends createZodDto(signInResponseSchema) {}
