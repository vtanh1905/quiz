import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { AllExceptionFilter, HttpExceptionFilter } from './common';
import { ConfigType } from './global/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigType>);

  // Compression
  app.use(compression());

  // Enable Cors
  app.enableCors();

  // Global Prefix Controller
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'meta/(.*)', method: RequestMethod.GET }],
  });

  // Setup Swagger UI
  const swaggerDocumentOptions = new DocumentBuilder().setTitle('Quiz API').setVersion('1.0').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  // Validator
  app.useGlobalPipes(new ValidationPipe());

  // Exception Handler
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost), new Logger()));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get('PORT'));
}
bootstrap();
