import { IKeycloakUser } from './keycloak-user.interface';

export interface IKeycloakTokenData extends IKeycloakUser {
  jti: string;
  exp: number;
  nbf: number;
  iat: number;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  auth_time: number;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  scope: string;
}
