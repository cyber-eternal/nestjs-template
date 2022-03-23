import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { IRequestWithUser } from '../interfaces/requrest-with-user.interface';
import { ConfigService } from '@nestjs/config';
import { KeycloakUserFromToken } from '@app/common/classes/keycloak-user.class';
import { IKeycloakTokenData } from '@app/common/interfaces/keycloak-token-data.interface';

const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'Bearer';

const tokenFromBearer = (scheme: string, headerValue: string): string => {
  return headerValue.startsWith(scheme)
    ? headerValue.split(' ')[1]
    : headerValue;
};

const unixToMilliseconds = (time: number) => time * 1000;

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(AuthUserMiddleware.name);
  async use(req: IRequestWithUser, res: Response, next: NextFunction) {
    const headerValue = req.headers && req.headers[AUTH_HEADER];

    if (!headerValue) {
      return next();
    }

    const token = tokenFromBearer(BEARER_AUTH_SCHEME, headerValue);
    if (!token) {
      return next();
    }

    const tokenData: IKeycloakTokenData = JWT.decode(token);
    const now = +new Date();
    const expiredAt = unixToMilliseconds(tokenData.exp);
    const notValidBefore = unixToMilliseconds(tokenData.nbf);

    if (notValidBefore > now) {
      this.logger.log(`Token not yet valid: ${tokenData.jti}`);
      return next();
    }

    if (expiredAt < now) {
      this.logger.log(`Token expired: ${tokenData.jti}`);
      return next();
    }

    req.user = new KeycloakUserFromToken(
      tokenData,
      this.configService.get<string>('app.keycloakClientId'),
    );

    next();
  }
}
