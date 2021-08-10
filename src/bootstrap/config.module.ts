import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import schema from '@root/config/schema';
import configs from '@root/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      validationSchema: schema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
    }),
  ],
})
export class BootstrapConfigModule {}
