import { ForbiddenException } from '@nestjs/common';

export enum RoleValidationTypes {
  ADMINS_ONLY = 'ADMINS_ONLY',
  ADMINS_OR_MANAGERS_ONLY = 'ADMINS_OR_MANAGERS_ONLY',
  MANAGER_GROUP_NOT_FOUND = 'MANAGER_GROUP_NOT_FOUND',
  MANAGER_ROLES_HIERARCHY = 'MANAGER_IS_NOT_ALLOWED_TO_PERFORM_THIS_ACTION',
  MANAGER_GROUP_LIMITATION = 'MANAGER_CAN_ACCESS_ONLY_OWN_GROUPS',
}

export class RoleValidationException extends ForbiddenException {
  constructor(message: RoleValidationTypes) {
    super(message);
  }
}
