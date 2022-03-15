import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseGuard } from '@app/common/guards/base.guard';

@Injectable()
export class AuthGuard extends BaseGuard {
  protected handleRequest(req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
