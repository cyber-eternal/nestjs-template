import * as Amqp from 'amqplib';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqpConnection from './amqp-connection';

@Injectable()
export class AmqpService {
  private connection: Amqp.Connection;

  constructor(private readonly configService: ConfigService) {
    this.init();
  }

  private async init() {
    this.connection = await amqpConnection(
      this.configService.get('amqp').connectionString,
    );
  }

  public async publishToQueue(queueName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName);

    const buffer = Buffer.from(JSON.stringify(data));
    channel.sendToQueue(queueName, buffer);
  }
}
