import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        const corsConfig = config.get('cors');
        Logger.log(`Applying GRAPHQL cors: ${JSON.stringify(corsConfig)}`);
        return {
          cors: corsConfig,
          installSubscriptionHandlers: true,
          autoSchemaFile: 'schema.gql',
          context: ({ req }) => ({ req }),
        };
      },
    }),
  ],
})
export class BootstrapGraphqlModule {}
