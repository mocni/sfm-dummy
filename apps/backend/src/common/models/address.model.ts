import { z } from 'zod';

import { addressSchema } from '../schemas/address.schema';

export type AddressModel = z.infer<typeof addressSchema>;
