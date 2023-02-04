import { AppModule } from '@app/app.module';
import { setupSwagger } from '@app/bootstrap/swagger.module';
import setBaseMiddlewares from '@app/common/middlewares/base.middlewares';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');

  setBaseMiddlewares(app);
  setupSwagger(app);

  await app.listen(configService.get<number>('app.port'));
})();

process.on('unhandledRejection', (reason, p) => {
  // tslint:disable-next-line:no-console
  console.log(
    'possibly Unhandled Rejection at: Promise ',
    p,
    ' | reason: ',
    reason,
  );
});
