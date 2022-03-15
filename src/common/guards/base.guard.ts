import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = this.getRequest(context);
    return this.handleRequest(req);
  }

  protected getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleRequest(req): boolean {
    throw new InternalServerErrorException('Not implemented');
  }
}
