import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { patchNestJsSwagger } from 'nestjs-zod';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/infrastructure/guards/jwt-auth.guard';
import { PermissionsGuard } from './common/infrastructure/guards/permissions.guard';
import { IExceptionService } from './services/exception';
import { SwaggerService } from './services/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app routing
  app.setGlobalPrefix('api');

  app.enableCors();
  patchNestJsSwagger();

  // providers
  const exceptionService: IExceptionService = app.get(IExceptionService);
  const configService: ConfigService = app.get(ConfigService);

  const reflector = app.get(Reflector);

  // Guards
  app.useGlobalGuards(
    new JwtAuthGuard(reflector, exceptionService),
    new PermissionsGuard(reflector, exceptionService),
  );

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // INITIALIZE SWAGGER
  const swaggerService = app.get(SwaggerService);
  swaggerService.setupSwagger(app);

  const port = configService.get<number>('PORT', 3001);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
