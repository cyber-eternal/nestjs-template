import { Module } from '@nestjs/common';
import { AmqpProvider } from '@app/modules/amqp/amqp.provider';

@Module({
  imports: [],
  providers: [AmqpProvider],
  exports: [AmqpProvider],
})
export class AmqpModule {}
