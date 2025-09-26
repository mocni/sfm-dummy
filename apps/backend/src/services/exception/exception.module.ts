import { Module } from '@nestjs/common';

import { IExceptionService } from './exception-service.interface';
import { ExceptionService } from './exception.service';

@Module({
  providers: [
    {
      provide: IExceptionService,
      useClass: ExceptionService,
    },
  ],
  exports: [IExceptionService],
})
export class ExceptionsModule {}
