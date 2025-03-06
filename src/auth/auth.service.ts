import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AccountsService } from "src/accounts/accounts.service";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { checkIsSimpleUser } from "utils/general.utils";
import { AuthJwtRefreshToken, AuthJwtTokens } from "./types/jwt.types";
import { AuthLoginCredential, AuthLoginData } from "./types/login.types";
import { AuthRegCredential } from "./types/register.types";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountsService: AccountsService
  ) {}

  /**
   * метод авторизации
   * @param {AuthLoginCredential} credential
   * @returns AuthLoginData
   */
  async login(credential: AuthLoginCredential): Promise<AuthLoginData> {
    const { email, password } = credential;
    const account = await this.accountsService.getOne({ email });
    if (!account || !(await bcrypt.compare(password, account.password))) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return this.getAccountData(account);
  }

  /**
   * метод регистрации
   * @param {AuthRegCredential} credential
   * @returns AuthLoginData
   */
  async register(credential: AuthRegCredential): Promise<AuthLoginData> {
    const account = await this.accountsService.create(credential);
    return this.getAccountData(account);
  }

  /**
   * метод обновления токена
   * @param {AuthJwtRefreshToken} credential
   * @returns AuthLoginData
   */
  async refreshToken(credential: AuthJwtRefreshToken) {
    try {
      const payload = this.jwtService.verify(credential.refreshToken, { secret: process.env.JWT_SECRET });
      const account = await this.accountsService.getOne({ id: payload?.id });
      if (!account) throw new HttpException("Account not found", HttpStatus.UNAUTHORIZED);

      return this.getAccountData(account);
    } catch (error) {
      throw new HttpException(error?.message ?? "Unhandled error", HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * метод собирает данные по аккаунту
   * @param {AccountEntity} account
   * @returns AuthLoginData
   */
  async getAccountData(account: AccountEntity): Promise<AuthLoginData> {
    const { accessToken, refreshToken } = await this.generateTokens(account);
    const accountData: AuthLoginData = {
      id: account.id!,
      username: account.username,
      email: account.email,
      accessToken,
      refreshToken,
    };
    if (checkIsSimpleUser(account.roleId)) accountData.permissions = account.permissions;

    return accountData;
  }

  /**
   * метод генерирует новый токен и сохраняет его в бд
   * @param {AccountEntity} account
   * @returns AccountTokesData
   */
  private async generateTokens(account: AccountEntity): Promise<AuthJwtTokens> {
    const payload = { id: account.id, username: account.username, email: account.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "1h", secret: process.env.JWT_SECRET });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d", secret: process.env.JWT_SECRET });

    await this.accountsService.updateToken(account.id!, refreshToken);

    return { accessToken, refreshToken };
  }
}
