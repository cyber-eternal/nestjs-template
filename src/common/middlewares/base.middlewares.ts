import { json, urlencoded } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from '@app/common/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';

const REQUESTS_LIMIT = process.env.MAX_REQUEST_SIZE || 50 + 'mb';

const setBaseMiddlewares = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const corsConfig = app.get<ConfigService>(ConfigService).get('cors');
  Logger.log(`Applying cors config: ${JSON.stringify(corsConfig)}`);
  app.enableCors(corsConfig);
  app.use(urlencoded({ extended: false, limit: REQUESTS_LIMIT }));
  app.use(json({ limit: REQUESTS_LIMIT }));
  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: configService.get('MAX_RATE_LIMIT') || 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
};

export default setBaseMiddlewares;
