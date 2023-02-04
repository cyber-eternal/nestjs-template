import { Injectable } from '@nestjs/common';
import { AMQPController } from '@app/common/lib/amqp/amqp.controller';
import { Exchange } from '@app/common/lib/amqp/exchange.enum';
import { ConfigService } from '@nestjs/config';

const QUEUE = process.env.AMQP_QUEUE || 'queue';

@Injectable()
export class AmqpProvider extends AMQPController {
  constructor(
    // protected readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    super(
      // emailService,
      configService.get('amqp').connectionString,
      QUEUE,
      Exchange.test,
      configService.get('amqp').queuePrefix,
    );
  }

  async handlePublish(payload: any): Promise<void> {
    //
  }

  async handleUpdate(payload: any): Promise<void> {
    //
  }

  async handleDraft(payload: any): Promise<void> {
    //
  }
}
