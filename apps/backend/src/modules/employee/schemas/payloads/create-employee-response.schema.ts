import { z } from 'zod';

import { idSchemaUUIDRequired } from '@/common/schemas/id.schema';

import { createEmployeePayloadSchema } from './create-employee-payload.schema';

// export const createEmployeeResponseSchema = createEmployeePayloadSchema.and(
//   z.object({
//     created_at: z.date().optional(),
//     id: idSchemaUUIDRequired,
//     updated_at: z.date().optional(),
//   }),
// );

export const createEmployeeResponseSchema = createEmployeePayloadSchema.and(
  z.object({
    created_at: z.date().optional(),
    id: idSchemaUUIDRequired,
    updated_at: z.date().optional(),
  }),
);
