import { Permission } from "./permission.model";
import { TokenType } from "./token-type.model";
import { UserGroup } from "./user-group.model";

export interface JwtPayload {
  email: string;
  groups: UserGroup[];
  permissions: Permission[];
  sub: string;
  type: TokenType;
  username: string;
}
