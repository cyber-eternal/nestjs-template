export interface IResourceAccess {
  [key: string]: { roles: string[] };
}

export interface IRealmAccess {
  roles: string[];
}

export interface IKeycloakTokenData {
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
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  realm_access: IRealmAccess;
  resource_access: IResourceAccess;
  clientCode: string[];
}
