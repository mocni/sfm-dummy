import { z } from 'zod';

export const companyCardSchema = z.array(
  z.object({
    name: z.string().max(50),
    number: z.string().max(50).nullish(),
  }),
);
