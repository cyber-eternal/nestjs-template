import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as Amqp from 'amqplib';
import { Observable, Subscriber } from 'rxjs';
import { safeJsonParse } from '@app/common/utils/json';
import amqpConnection from './amqp-connection';
import { validate } from 'class-validator';

const [PUBLISH, DRAFT, UPDATE, DELETE] = [
  'PUBLISH',
  'DRAFT',
  'UPDATE',
  'DELETE',
];

const ROUTING_KEY = '#';
const EXCHANGE_TYPE = 'direct';
const ERROR_QUEUE_KEY = 'error';

@Injectable()
export abstract class AMQPController {
  private connection: Amqp.Connection;
  private channel: Amqp.Channel;
  private queueListener;

  protected constructor(
    // protected readonly emailService: EmailService,
    connectionString: string,
    queue: string,
    exchangeName: string,
    queuePrefix: string,
  ) {
    const queueFullName = `${queuePrefix}-${queue}`;
    this.init(connectionString, queueFullName, exchangeName);
  }

  private async init(
    connectionString: string,
    queue: string,
    exchangeName: string,
  ) {
    this.connection = await amqpConnection(connectionString);
    this.queueListener = await this.listen(queue, exchangeName);

    const typeToMethodMap = {
      [PUBLISH]: this.handlePublish.bind(this),
      [DRAFT]: this.handleDraft.bind(this),
      [UPDATE]: this.handleUpdate.bind(this),
      [DELETE]: this.handleDraft.bind(this),
    };
    this.queueListener.subscribe(async (message) => {
      const content = safeJsonParse(message.content.toString());
      const { type, payload } = content || {
        type: undefined,
        payload: undefined,
      };

      const handler = typeToMethodMap[type];
      if (!type || !payload || !handler) {
        this.channel.reject(message, false);
        return;
      }

      try {
        await handler(payload);
        this.channel.ack(message);
      } catch (error) {
        console.error(error); // tslint:disable-line no-console
        this.channel.nack(message, false, false);

        await this.publishError(queue, payload, error);
      }
    });
  }

  private async publishError(
    queueName: string,
    payload: any,
    err: Error,
  ): Promise<void> {
    const errorQueueName = this.createErrorQueueName(queueName);
    const errorMessage = err.message || err;

    this.publishToQueue(errorQueueName, { payload, error: errorMessage });
    // await this.emailService.sendAmqpErrorNotice(err);
  }

  private async listen(
    queueName: string,
    exchangeName: string,
  ): Promise<Observable<Amqp.Message>> {
    const channel = await this.connection.createChannel();
    this.channel = channel;

    await this.initChanel(queueName, exchangeName);

    return new Observable<any>(
      (subscriber: Subscriber<Amqp.ConsumeMessage>) => {
        const handler = (message: Amqp.ConsumeMessage) => {
          subscriber.next(message);
        };
        const unsubscribe = async () => {
          await this.channel.close();
        };

        subscriber.add(unsubscribe);
        channel.consume(queueName, handler);
      },
    );
  }

  private async initChanel(
    queueName: string,
    exchangeName: string,
  ): Promise<void> {
    const errorQueueName = this.createErrorQueueName(queueName);

    await this.channel.assertQueue(queueName);
    await this.channel.assertQueue(errorQueueName);
    await this.channel.assertExchange(exchangeName, EXCHANGE_TYPE);
    await this.channel.bindQueue(queueName, exchangeName, ROUTING_KEY);
  }

  private createErrorQueueName(queueName: string): string {
    return queueName + '.' + ERROR_QUEUE_KEY;
  }

  private publishToQueue(queueName: string, data: any): void {
    try {
      const buffer = Buffer.from(JSON.stringify(data));
      this.channel.sendToQueue(queueName, buffer);
    } catch (error) {
      Logger.log(error);
      throw error;
    }
  }

  protected async handlePublish(payload) {
    throw new Error('Not Implemented');
  }

  protected async handleDraft(payload) {
    throw new Error('Not Implemented');
  }

  protected async handleUpdate(payload) {
    throw new Error('Not Implemented');
  }

  // TODO need find better solution
  protected validate(data: any): Promise<void> {
    return validate(data).then((errors) => {
      if (errors.length > 0) {
        Logger.log(errors, AMQPController.name);
        throw new BadRequestException('Validation failed');
      }
    });
  }
}
