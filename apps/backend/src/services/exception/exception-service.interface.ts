import { HttpError } from './http-error.interface';

export abstract class IExceptionService {
  abstract throwBadRequestException(httpError: HttpError): never;
  abstract throwForbiddenException(httpError?: HttpError): never;
  abstract throwInternalServerErrorException(httpError?: HttpError): never;
  abstract throwUnauthorizedException(httpError?: HttpError): never;
}
