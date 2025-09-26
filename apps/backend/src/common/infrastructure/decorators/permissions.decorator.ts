import { applyDecorators, SetMetadata } from '@nestjs/common';

import { Permission } from '@smart-fleet-management/users';

import { decoratorMetadataKey } from './constants/decorator-metadata-key.constants';

export function Permissions(permissions: Permission[]) {
  return applyDecorators(
    SetMetadata(decoratorMetadataKey.PERMISSIONS, permissions),
  );
}
