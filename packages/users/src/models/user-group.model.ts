export const userGroup = {
  // STAGE USER GROUPS or we can call that user roles
  ACCOUTING_ADMIN: "ACCOUTING_ADMIN",
  ACCOUTING_READONLY: "ACCOUTING_READONLY",
  ADMIN: "ADMIN",
  DISPATCHER_ADMIN: "DISPATCHER_ADMIN",
  DISPATCHER_READONLY: "DISPATCHER_READONLY",
  DRIVER_READONLY: "DRIVER_READONLY",
  OWNER: "OWNER",
} as const;

export type UserGroup = (typeof userGroup)[keyof typeof userGroup];

export function isInternalUserGroup(value: string | undefined): value is UserGroup {
  if (value) return (Object.values(userGroup) as string[]).includes(value);

  return false;
}
