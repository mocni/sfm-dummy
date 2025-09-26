import { z } from "zod";

import { createUserResponseSchema } from "../../schemas";

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
