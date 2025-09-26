import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { userHasPermissions } from '@smart-fleet-management/users';

import { User } from '@/modules/user/entities/user.entity';
import { IExceptionService, loggerContext } from '@/services/exception';

import { decoratorMetadataKey } from '../decorators/constants/decorator-metadata-key.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly exceptionService: IExceptionService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      decoratorMetadataKey.IS_PUBLIC,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('permission guard: ', user);

    const { permissions: userPermissions } = user as User;
    const requiredPermissions = this.reflector.get(
      decoratorMetadataKey.PERMISSIONS,
      context.getHandler(),
    );

    // const { endpointName } = this.reflector.get<EndpointSpecificationsMetadata>(
    //   decoratorMetadataKey.ENDPOINT_SPECIFICATIONS,
    //   executionContext.getHandler(),
    // );

    if (!userHasPermissions(requiredPermissions, userPermissions)) {
      this.exceptionService.throwForbiddenException({
        context: loggerContext.INVALID_PERMISSION,
        response: {
          message: `You are not authorized to call that endpoint`,
        },
      });
    }
    return true;
  }
}
