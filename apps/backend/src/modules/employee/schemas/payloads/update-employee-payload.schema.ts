import { z } from 'zod';

import { createEmployeePayloadSchema } from './create-employee-payload.schema';

export const updateEmployeePayloadSchema = createEmployeePayloadSchema;

export type UpdateEmployeePayload = z.infer<typeof updateEmployeePayloadSchema>;
