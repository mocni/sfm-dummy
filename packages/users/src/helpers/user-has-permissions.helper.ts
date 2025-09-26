import { isPermission, Permission } from "../models";

export const userHasPermissions = (requiredPermissions: Permission[], userPermissions: Permission[] = []): boolean => {
  const hasPermissions: boolean = requiredPermissions
    .filter(isPermission)
    .some((requiredPermission) => userPermissions.find((userPermission) => userPermission === requiredPermission));
  return hasPermissions;
};
