import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';
import { AppModule } from '@app/modules/app/app.module';
import { AllExceptionFilter } from '@app/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.setGlobalPrefix('api');
  // TODO Need change value max for production
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: configService.get('MAX_RATE_LIMIT') || 100, // limit each IP to 100 requests per windowMs
    }),
  );

  if (configService.get('app').nodeEnv === 'development') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Document module API')
        .setDescription('Document module API')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(configService.get('app').swaggerHost)
        .build(),
    );

    SwaggerModule.setup('api/doc', app, document);
  }

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  return app;
};
