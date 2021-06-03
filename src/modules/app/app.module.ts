import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AuthUserMiddleware } from '@app/middlewares/auth-user.middleware';
import { PingModule } from '@app/modules/ping/ping.module';
import { AmqpModule } from '@app/modules/amqp/amqp.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**/!(*.d).{ts,js}'),
    ),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => config.get('database'),
    // }),
    PingModule,
    // AmqpModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: '', method: RequestMethod.ALL });
  }
}
