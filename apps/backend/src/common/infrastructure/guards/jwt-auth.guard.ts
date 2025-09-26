import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IExceptionService, loggerContext } from '@/services/exception';

import { decoratorMetadataKey } from '../decorators/constants/decorator-metadata-key.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly exceptionService: IExceptionService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      decoratorMetadataKey.IS_PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.exceptionService.throwUnauthorizedException({
        context: loggerContext.AUTHENTICATION,
        response: {
          message: 'Authentication failed : missing token',
        },
      });
    }
    return super.canActivate(context);
    // return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as { authorization?: string };
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
