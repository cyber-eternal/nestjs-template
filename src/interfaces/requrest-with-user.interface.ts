import { Request } from 'express';
import { IKeycloakUser } from './keycloak-user.interface';

export interface IRequestWithUser extends Request {
  user: IKeycloakUser;
}
