import { z } from "zod";

import { userGroup } from "../../models";

export const createUserPayloadSchema = z.object({
  email: z.string().email().describe("Assign unique email address"),
  employee_id: z.string().uuid().describe("Unique employee identifier").optional(),
  groups: z.nativeEnum(userGroup).array().describe("Assign the user group or groupes you want the new user to have."),
  //   https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Passwords need to contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character",
    )
    .describe(
      "Passwords needs to contain at least 1 upper case letter, 1 lower case letter and 1 number or special character",
    ),
  username: z.string().min(4).max(30).describe("Unique username"),
});
