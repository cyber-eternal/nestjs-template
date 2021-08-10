import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BootstrapConfigModule } from '@app/bootstrap/config.module';
import { AuthUserMiddleware } from '@app/common/middlewares/auth-user.middleware';
import { BootstrapTypeormModule } from './bootstrap/typeorm.module';
import { ConfigService } from '@nestjs/config';
import { PingModule } from './modules/ping/ping.module';

@Module({
  imports: [BootstrapConfigModule, BootstrapTypeormModule, PingModule],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
