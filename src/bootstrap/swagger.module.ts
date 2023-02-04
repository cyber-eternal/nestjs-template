import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'express-basic-auth';

export const setupSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  if (configService.get<string>('NODE_ENV') !== 'prod') {
    const swaggerPath = configService.get<string>('swagger.swaggerPath');
    const swaggerHost = configService.get<string>('swagger.swaggerHost');
    const version = configService.get<string>('app.version');
    const swaggerUsername = configService.get<string>(
      'swagger.swaggerUsername',
    );
    const swaggerPassword = configService.get<string>(
      'swagger.swaggerPassword',
    );

    app.use(swaggerPath, (req: Request, res: Response, next: NextFunction) => {
      // A temporary solution to prevent security issues with query params
      // Can be removed when into the swagger module will be added ability to turn off query parameters of URL
      if (Object.keys(req.query).length) {
        res.redirect(swaggerPath);
      } else {
        next();
      }
    });

    const swaggerAuth = (username: string, password: string): boolean => {
      const userMatches = basicAuth.safeCompare(username, swaggerUsername);
      const passwordMatches = basicAuth.safeCompare(password, swaggerPassword);
      return userMatches && passwordMatches;
    };

    app.use(
      swaggerPath,
      basicAuth({
        authorizer: swaggerAuth.bind({ swaggerUsername, swaggerPassword }),
        challenge: true,
      }),
    );

    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API')
        .setVersion(version)
        .addBearerAuth()
        .addServer(swaggerHost)
        .build(),
    );

    SwaggerModule.setup(swaggerPath, app, document);
  }
};
