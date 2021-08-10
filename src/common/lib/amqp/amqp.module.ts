import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmqpService } from './amqp.service';

@Module({
  imports: [ConfigModule],
  providers: [AmqpService],
  exports: [AmqpService],
})
export class AmqpModule {}
