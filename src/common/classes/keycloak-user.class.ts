import { RoleEnum } from '@app/common/enums/role.enum';
import {
  IKeycloakTokenData,
  IRealmAccess,
  IResourceAccess,
} from '@app/common/interfaces/keycloak-token-data.interface';

export class KeycloakUserFromToken {
  public readonly keycloakId: string;
  public readonly email_verified: boolean;
  public readonly name: string;
  public readonly preferred_username: string;
  public readonly given_name: string;
  public readonly family_name: string;
  public readonly email: string;
  public readonly realm_access: IRealmAccess;
  public readonly resource_access: IResourceAccess;
  public readonly customerIds: number[];
  public readonly clientCodes: string[];
  public readonly clientRoles: string[];

  constructor(data: IKeycloakTokenData, clientId: string) {
    this.email_verified = data.email_verified;
    this.name = data.name;
    this.preferred_username = data.preferred_username;
    this.given_name = data.given_name;
    this.family_name = data.family_name;
    this.email = data.email;
    this.realm_access = data.realm_access;
    this.resource_access = data.resource_access;
    this.keycloakId = data.sub;
    this.clientRoles =
      data.resource_access[clientId]?.roles || ([] as RoleEnum[]);
    this.clientCodes = data.clientCode;
  }

  public isAdmin(): boolean {
    return this.clientRoles.includes(RoleEnum.ADMIN);
  }

  public isManager(): boolean {
    return !this.isAdmin() && this.clientRoles.includes(RoleEnum.MANGER);
  }
}
