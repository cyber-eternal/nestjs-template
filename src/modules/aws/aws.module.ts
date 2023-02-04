import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { Credentials } from 'aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          region: config.get('aws.awsRegion'),
          credentials: new Credentials({
            accessKeyId: config.get('aws.awsAccessKeyId'),
            secretAccessKey: config.get('aws.awsSecretAccessKey'),
          }),
        }),
      },
      services: [],
    }),
  ],
  providers: [],
  exports: [],
})
export class AwsModule {}
