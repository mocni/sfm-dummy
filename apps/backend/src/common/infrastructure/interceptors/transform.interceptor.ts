import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
// removes null from the respose - BE AWARE OF THAT, if frontend will need null of some checks
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data) => {
        // Convert class instances to plain objects
        const plainData = instanceToPlain(data);

        // Recursively remove null values
        return JSON.parse(
          JSON.stringify(plainData, (key, value) =>
            value === null ? undefined : value,
          ),
        );
      }),
    );
  }
}
