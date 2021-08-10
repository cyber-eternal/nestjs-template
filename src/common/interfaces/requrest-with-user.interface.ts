import { Request } from 'express';
import { KeycloakUserFromToken } from '@app/common/classes/keycloak-user.class';

export interface IRequestWithUser extends Request {
  user: KeycloakUserFromToken;
}
