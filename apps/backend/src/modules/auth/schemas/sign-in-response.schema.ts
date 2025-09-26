import { z } from 'zod';

export const signInResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: z.object({
    company: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    email: z.string(),
    employee: z
      .object({
        first_name: z.string(),
        id: z.string(),
        last_name: z.string(),
      })
      .optional(),
    groups: z.array(z.string()),
    id: z.string().uuid(),
    username: z.string(),
  }),
});
