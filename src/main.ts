import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './bootstrap/setup-swagger';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');

  app.use(json({ limit: '15mb' })); //For JSON requests
  app.use(
    urlencoded({
      extended: true,
    }),
  );

  app.use(helmet());

  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: configService.get('MAX_RATE_LIMIT') || 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  setupSwagger(app);

  await app.listen(configService.get<number>('app.port'));
}

bootstrap();
