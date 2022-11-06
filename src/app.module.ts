import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BootstrapConfigModule } from '@app/bootstrap/config.module';
import { AuthUserMiddleware } from '@app/common/middlewares/auth-user.middleware';
import { BootstrapTypeormModule } from '@app/bootstrap/typeorm.module';
// import { BootstrapRedisModule } from '@app/bootstrap/redis.module';
import { PingModule } from '@app/modules/ping/ping.module';
// import { AwsModule } from '@app/modules/aws/aws.module';
// import { BootstrapGraphqlModule } from '@app/bootstrap/graphql.module';

@Module({
  imports: [
    BootstrapConfigModule,
    BootstrapTypeormModule, // <-- For TypeORM
    // BootstrapRedisModule, // <-- For Redis
    // BootstrapGraphqlModule, // <-- For GraphQL
    // AwsModule, // <-- For AWS
    PingModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
