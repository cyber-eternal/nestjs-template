import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = this.getRequest(context);
    return AuthGuard.handleRequest(req);
  }

  getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  static handleRequest(req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
