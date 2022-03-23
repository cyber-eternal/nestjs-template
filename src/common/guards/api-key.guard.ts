import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = this.getRequest(context);
    return ApiKeyAccessGuard.handleRequest(req);
  }

  getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  static handleRequest(req: Request) {
    const reqApiKey = req.headers['x-gateway-apikey'] || '';
    if (!reqApiKey || reqApiKey !== process.env.GATEWAY_API_KEY)
      throw new UnauthorizedException();

    return true;
  }
}
