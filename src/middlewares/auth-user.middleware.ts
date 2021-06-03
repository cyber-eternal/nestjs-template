import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { IRequestWithUser } from '../interfaces/requrest-with-user.interface';
import { IKeycloakUser } from '../interfaces/keycloak-user.interface';

const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'Bearer';

const tokenFromBearer = (scheme: string, headerValue: string): string => {
  return headerValue.startsWith(scheme)
    ? headerValue.split(' ')[1]
    : headerValue;
};

const tokenDataToUser = (tokenData) => {
  return {
    email_verified: tokenData.email_verified,
    name: tokenData.name,
    preferred_username: tokenData.preferred_username,
    given_name: tokenData.given_name,
    family_name: tokenData.family_name,
    email: tokenData.email,
    realm_access: tokenData.realm_access,
    resource_access: tokenData.resource_access,
    keycloakId: tokenData.sub,
    customerIds: [].concat(tokenData.customerId || 11), // TODO: workaround until we have customer assigned in keycloak
    clientCodes: [].concat(tokenData.clientCode),
  } as IKeycloakUser;
};

const unixToMilliseconds = (time: number) => time * 1000;

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
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

    const tokenData: any = JWT.decode(token);
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

    req.user = tokenDataToUser(tokenData);

    next();
  }
}
