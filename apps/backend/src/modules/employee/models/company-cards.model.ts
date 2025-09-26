import { z } from 'zod';

import { companyCardSchema } from '../schemas';

export type CompanyCardModel = z.infer<typeof companyCardSchema>;
