import { z } from "zod";

import { createUserPayloadSchema } from "../../schemas";

export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
