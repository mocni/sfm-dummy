import { z } from 'zod';

import { paginationMetadataSchema } from '../schemas';

export type PaginationMetadataModel = z.infer<typeof paginationMetadataSchema>;
