import { AccountPermissions } from "src/accounts/entities/account.entity";

export class AuthLoginCredential {
  email: string;
  password: string;
}

export class AuthLoginData {
  id: number;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  permissions?: AccountPermissions;
}
