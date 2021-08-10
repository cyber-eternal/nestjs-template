import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

export const setupSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  if (configService.get<string>('NODE_ENV') === 'development') {
    const swaggerPath = configService.get<string>('app.swaggerPath');
    const swaggerHost = configService.get<string>('app.swaggerHost');

    app.use(swaggerPath, (req: Request, res: Response, next: NextFunction) => {
      // A temporary solution to prevent security issues with query params
      // Can be removed when into the swagger module will be added ability to turn off query parameters of URL
      if (Object.keys(req.query).length) {
        res.redirect(swaggerPath);
      } else {
        next();
      }
    });

    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(swaggerHost)
        .build(),
    );

    SwaggerModule.setup(swaggerPath, app, document);
  }
};
