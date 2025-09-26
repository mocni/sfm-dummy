import { z } from 'zod';

// UUID
export const idSchemaUUIDRequired = z.string().uuid().nonempty();
export const idSchemaUUIDOptional = z.string().uuid().optional();
