import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { IExceptionService } from './exception-service.interface';
import { HttpError } from './http-error.interface';

@Injectable()
export class ExceptionService implements IExceptionService {
  throwBadRequestException(httpError: HttpError): never {
    throw new BadRequestException(httpError);
  }
  throwForbiddenException(httpError?: HttpError): never {
    throw new ForbiddenException(httpError);
  }
  throwInternalServerErrorException(httpError?: HttpError): never {
    throw new InternalServerErrorException(httpError);
  }
  throwUnauthorizedException(httpError?: HttpError): never {
    throw new UnauthorizedException(httpError);
  }
}
