import { z } from "zod";

import { permission } from "../../models";

import { createUserPayloadSchema } from "./create-user-payload.schema";

export const createUserResponseSchema = createUserPayloadSchema.extend({
  id: z.string().uuid().describe("The ID of the newly created user"),
  permissions: z.nativeEnum(permission).array().describe("Based on choosen user group, permissions will be added."),
});
