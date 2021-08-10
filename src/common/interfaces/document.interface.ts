export interface ISignatureRequest {
  readonly id: number;
  readonly status: string;
  readonly signingUrl: string;
  readonly lastReminderSentAt?: Date;
  readonly createdAt: Date;
}

export interface IDocument {
  readonly id: number;
  readonly name: string;
  readonly type?: string;
  readonly clientCode?: string;
  readonly fileCreatedAt: string;
  readonly fileUpdatedAt: string;
  readonly signatureRequest?: ISignatureRequest;
  readonly isOriginal: number;
  readonly originalId?: number;
  readonly docSyncId: string;
  readonly provider?: string;
  readonly path?: string;
}

export interface IUploadDocument {
  readonly path: string;
  readonly documentType: string;
  readonly contentBase64: string;
  readonly mimetype: string;
  readonly docSyncId?: string;
}

export interface IDuplicationResult {
  readonly path: string;
  readonly name: string;
  readonly docSyncId: string;
  readonly provider: string;
  readonly fileUpdatedAt: string;
  readonly fileCreatedAt: string;
}
