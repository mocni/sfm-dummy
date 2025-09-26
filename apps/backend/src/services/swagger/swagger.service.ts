import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  private readonly config = new DocumentBuilder()
    .setTitle('Smart Fleet Management Swagger')
    .setDescription('Smart Fleet Management API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        bearerFormat: 'Bearer',
        description: `Please enter token in the following format: <JWT_ACCESS_TOKEN>`,
        in: 'Header',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
      },
      'access-token',
    )
    .addServer('http://localhost:3001') // Add the correct base URL here
    .build();

  public setupSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config, {
      autoTagControllers: true,
    });

    // Setup Swagger at 'api-docs'
    SwaggerModule.setup('api-docs', app, document, {
      jsonDocumentUrl: 'swagger/json',
      swaggerOptions: {
        docExpansion: false,
      },
    });
  }
}
