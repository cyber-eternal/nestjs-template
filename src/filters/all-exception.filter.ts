import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly DEFAULT_ERROR_MESSAGE = 'Internal server error';
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let errors = [];
    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      // TODO fix when we have 422 errors
      errors =
        (exception instanceof HttpException &&
          exception.getResponse()['errors']) || // tslint:disable-line
        [];
    } else {
      errors = [
        {
          message:
            exception instanceof HttpException
              ? exception.message
              : this.DEFAULT_ERROR_MESSAGE,
          statusCode: status,
        },
      ];
    }

    response.status(status).json({ errors });
  }
}
