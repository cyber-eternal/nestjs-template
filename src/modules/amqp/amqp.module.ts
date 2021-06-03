import { Module } from '@nestjs/common';
import { AmqpProvider } from '@app/modules/amqp/amqp.provider';
import { DocumentModule } from '@app/modules/document/document.module';

@Module({
  imports: [DocumentModule],
  providers: [AmqpProvider],
  exports: [AmqpProvider],
})
export class AmqpModule {}
