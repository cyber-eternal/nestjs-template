import { ConfigService } from 'nestjs-config';
import { Injectable } from '@nestjs/common';
import { AMQPController } from '@app/lib/amqp/amqp.controller';
import { Exchange } from '@app/lib/amqp/exchange.enum';
import { DocumentProvider } from '@app/modules/document/document.provider';
import { PublishDto } from './dto/publish-payload.dto';
import { UpdateDto } from './dto/update-payload.dto';
import { DraftDto } from './dto/draft-payload.dto';
import { promiseOrPromiseAll } from '@app/utils/promise';

const QUEUE = process.env.AMQP_QUEUE || 'queue';

@Injectable()
export class AmqpProvider extends AMQPController {
  constructor(
    // protected readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly documentService: DocumentProvider,
  ) {
    super(
      // emailService,
      configService.get('amqp').connectionString,
      QUEUE,
      Exchange.testExchange,
      configService.get('amqp').queuePrefix,
    );
  }

  private createDocument = async (payload: any): Promise<void> => {
    await this.documentService.create(payload);
  };

  private updateDocument = async (payload: any): Promise<void> => {
    await this.documentService.update(payload);
  };

  private deleteDocument = async (payload: any): Promise<void> => {
    await this.documentService.delete(payload);
  };

  private createOrBatchCreateDocument = (data: PublishDto | PublishDto[]) =>
    promiseOrPromiseAll(data, this.createDocument);

  private updateOrBatchUpdateDocument = (data: UpdateDto | UpdateDto[]) =>
    promiseOrPromiseAll(data, this.updateDocument);

  private deleteOrBatchDeleteDocument = (data: DraftDto | DraftDto[]) =>
    promiseOrPromiseAll(data, this.deleteDocument);

  async handlePublish(payload: any): Promise<void> {
    await this.createOrBatchCreateDocument(payload);
  }

  async handleUpdate(payload: any): Promise<void> {
    await this.updateOrBatchUpdateDocument(payload);
  }

  async handleDraft(payload: any): Promise<void> {
    await this.deleteOrBatchDeleteDocument(payload);
  }
}
